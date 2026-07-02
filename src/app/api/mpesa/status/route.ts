import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import { isMpesaConfigured, queryStkPushStatus } from "@/lib/mpesa";
import type { Enrollment } from "@/types";

async function markPaymentVerified(checkoutRequestId: string, resultDesc?: string): Promise<Enrollment | null> {
  const enrollments = await getDB<Enrollment>("enrollments.json");
  const idx = enrollments.findIndex((e) => e.checkoutRequestId === checkoutRequestId);
  if (idx === -1) return null;

  if (enrollments[idx].status === "confirmed") return enrollments[idx];

  enrollments[idx].mpesaResultCode = "0";
  enrollments[idx].mpesaResultDesc = resultDesc || "M-Pesa payment verified. Awaiting admin approval.";
  enrollments[idx].paymentConfirmedAt = enrollments[idx].paymentConfirmedAt || new Date().toISOString();
  enrollments[idx].paymentVerificationStatus = "verified";
  enrollments[idx].adminApprovalStatus = "pending";
  enrollments[idx].adminReviewRequestedAt = enrollments[idx].adminReviewRequestedAt || new Date().toISOString();
  enrollments[idx].adminNotificationMessage = "M-Pesa payment verified by status check. Admin confirmation is required to unlock LMS access.";
  enrollments[idx].accessGrantMessage = "M-Pesa payment verified. Awaiting admin approval to unlock LMS access.";
  await upsertDBRecord("enrollments.json", enrollments[idx]);

  return enrollments[idx];
}

export async function POST(request: Request) {
  try {
    const { checkoutRequestId, reference } = await request.json();

    if (!checkoutRequestId && !reference) {
      return NextResponse.json(
        { success: false, message: "checkoutRequestId or reference required" },
        { status: 400 }
      );
    }

    const enrollments = await getDB<Enrollment>("enrollments.json");
    const enrollment = enrollments.find(
      (e) =>
        e.checkoutRequestId === checkoutRequestId || e.reference === reference
    );

    if (!enrollment) {
      return NextResponse.json({ success: false, message: "Enrollment not found" }, { status: 404 });
    }

    if (enrollment.status === "confirmed") {
      return NextResponse.json({
        success: true,
        paid: true,
        approvalRequired: false,
        status: "confirmed",
        reference: enrollment.reference,
      });
    }

    if (enrollment.status === "failed") {
      return NextResponse.json({
        success: true,
        paid: false,
        status: "failed",
        reference: enrollment.reference,
        resultCode: enrollment.mpesaResultCode,
        resultDesc: enrollment.mpesaResultDesc || "Payment failed",
      });
    }

    if (enrollment.paymentConfirmedAt) {
      return NextResponse.json({
        success: true,
        paid: true,
        approvalRequired: true,
        status: enrollment.status,
        reference: enrollment.reference,
        resultCode: enrollment.mpesaResultCode,
        resultDesc: "Payment received. Admin approval is required before LMS access is unlocked.",
      });
    }

    if (!enrollment.checkoutRequestId) {
      return NextResponse.json({
        success: true,
        paid: false,
        status: enrollment.status,
        reference: enrollment.reference,
      });
    }

    if (!isMpesaConfigured()) {
      return NextResponse.json({
        success: true,
        paid: false,
        status: enrollment.status,
        message: "M-Pesa not configured - awaiting manual confirmation",
      });
    }

    const query = await queryStkPushStatus(enrollment.checkoutRequestId);

    if (query.success) {
      const updatedEnrollment = await markPaymentVerified(enrollment.checkoutRequestId, query.resultDesc);
      return NextResponse.json({
        success: true,
        paid: true,
        approvalRequired: true,
        status: updatedEnrollment?.status || "pending",
        reference: enrollment.reference,
        resultDesc: "Payment received. Admin approval is required before LMS access is unlocked.",
      });
    }

    if (query.resultCode && query.resultCode !== "0") {
      const idx = enrollments.findIndex(
        (e) => e.checkoutRequestId === enrollment.checkoutRequestId
      );
      if (idx > -1) {
        enrollments[idx].status = "failed";
        enrollments[idx].mpesaResultCode = query.resultCode;
        enrollments[idx].mpesaResultDesc = query.resultDesc || "Payment failed";
        enrollments[idx].paymentVerificationStatus = "failed";
        enrollments[idx].adminNotificationMessage = "M-Pesa payment failed. No admin approval is needed.";
        await upsertDBRecord("enrollments.json", enrollments[idx]);
        return NextResponse.json({
          success: true,
          paid: false,
          status: "failed",
          reference: enrollments[idx].reference,
          resultCode: query.resultCode,
          resultDesc: enrollments[idx].mpesaResultDesc,
        });
      }
    }

    return NextResponse.json({
      success: true,
      paid: false,
      status: enrollment.status,
      reference: enrollment.reference,
      resultCode: query.resultCode,
      resultDesc: query.resultDesc,
    });
  } catch (error) {
    console.error("M-Pesa status check error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to check payment status" },
      { status: 500 }
    );
  }
}
