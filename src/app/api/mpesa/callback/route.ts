import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import type { Enrollment } from "@/types";

function getCallbackValue(
  metadata: { Item?: { Name?: string; Value?: string | number }[] } | undefined,
  name: string
) {
  return metadata?.Item?.find((item) => item.Name === name)?.Value;
}

export async function POST(request: Request) {
  try {
    const secret = process.env.MPESA_CALLBACK_SECRET;
    if (secret) {
      const url = new URL(request.url);
      if (url.searchParams.get("secret") !== secret) {
        return NextResponse.json(
          { ResultCode: 1, ResultDesc: "Unauthorized callback" },
          { status: 401 }
        );
      }
    }

    const body = await request.json();
    const { Body } = body;
    if (!Body?.stkCallback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const {
      ResultCode,
      ResultDesc,
      CheckoutRequestID,
      CallbackMetadata,
    } = Body.stkCallback;

    const enrollments = await getDB<Enrollment>("enrollments.json");
    const idx = enrollments.findIndex(
      (e) => e.checkoutRequestId === CheckoutRequestID
    );

    if (String(ResultCode) !== "0") {
      if (idx > -1 && enrollments[idx].status !== "confirmed") {
        enrollments[idx].status = "failed";
        enrollments[idx].mpesaResultCode = String(ResultCode);
        enrollments[idx].mpesaResultDesc = String(ResultDesc || "Payment failed");
        enrollments[idx].paymentVerificationStatus = "failed";
        enrollments[idx].adminNotificationMessage = "M-Pesa payment failed. No admin approval is needed.";
        await upsertDBRecord("enrollments.json", enrollments[idx]);
      }
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    if (idx > -1) {
      enrollments[idx].mpesaResultCode = String(ResultCode);
      enrollments[idx].mpesaResultDesc = String(ResultDesc || "Payment received. Awaiting admin approval.");
      enrollments[idx].mpesaReceiptNumber = String(
        getCallbackValue(CallbackMetadata, "MpesaReceiptNumber") || ""
      );
      enrollments[idx].mpesaAmount = Number(
        getCallbackValue(CallbackMetadata, "Amount") || enrollments[idx].amount
      );
      enrollments[idx].mpesaPhoneNumber = String(
        getCallbackValue(CallbackMetadata, "PhoneNumber") || enrollments[idx].phone
      );
      enrollments[idx].mpesaTransactionDate = String(
        getCallbackValue(CallbackMetadata, "TransactionDate") || ""
      );
      enrollments[idx].paymentConfirmedAt = enrollments[idx].paymentConfirmedAt || new Date().toISOString();
      enrollments[idx].paymentVerificationStatus = "verified";
      enrollments[idx].adminApprovalStatus = "pending";
      enrollments[idx].adminReviewRequestedAt = enrollments[idx].adminReviewRequestedAt || new Date().toISOString();
      enrollments[idx].adminNotificationMessage = "M-Pesa payment verified by callback. Admin confirmation is required to unlock LMS access.";
      enrollments[idx].accessGrantMessage = "M-Pesa payment verified. Awaiting admin approval to unlock LMS access.";
      await upsertDBRecord("enrollments.json", enrollments[idx]);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    console.error("M-Pesa callback error:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}
