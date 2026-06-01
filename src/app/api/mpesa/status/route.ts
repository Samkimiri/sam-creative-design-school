import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import { isMpesaConfigured, queryStkPushStatus } from "@/lib/mpesa";
import type { Enrollment, Student } from "@/types";

async function confirmEnrollment(checkoutRequestId: string): Promise<boolean> {
  const enrollments = await getDB<Enrollment>("enrollments.json");
  const idx = enrollments.findIndex((e) => e.checkoutRequestId === checkoutRequestId);
  if (idx === -1) return false;

  if (enrollments[idx].status === "confirmed") return true;

  enrollments[idx].status = "confirmed";
  enrollments[idx].mpesaResultCode = "0";
  await upsertDBRecord("enrollments.json", enrollments[idx]);

  const enrollment = enrollments[idx];
  const students = await getDB<Student>("students.json");
  const studentIdx = students.findIndex(
    (s) =>
      (enrollment.studentEmail && s.email === enrollment.studentEmail) ||
      (enrollment.phone && s.phone === enrollment.phone)
  );

  if (studentIdx > -1) {
    const enrolled = students[studentIdx].enrolledCourses ?? [];
    enrollment.courseId.split(",").forEach((cid) => {
      const trimmed = cid.trim();
      if (trimmed && !enrolled.includes(trimmed)) enrolled.push(trimmed);
    });
    students[studentIdx].enrolledCourses = enrolled;
    await upsertDBRecord("students.json", students[studentIdx]);
  }

  return true;
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
        message: "M-Pesa not configured — awaiting manual confirmation",
      });
    }

    const query = await queryStkPushStatus(enrollment.checkoutRequestId);

    if (query.success) {
      await confirmEnrollment(enrollment.checkoutRequestId);
      return NextResponse.json({
        success: true,
        paid: true,
        status: "confirmed",
        reference: enrollment.reference,
        resultDesc: query.resultDesc,
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
        await upsertDBRecord("enrollments.json", enrollments[idx]);
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
