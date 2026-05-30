import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { initiateStkPush, isMpesaConfigured } from "@/lib/mpesa";
import type { Enrollment } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, courseId, courseName, amount } = body;

    if (!name || !phone || !courseId) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const phoneRegex = /^0[71]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid Kenyan phone number (07XXXXXXXX or 01XXXXXXXX)",
        },
        { status: 400 }
      );
    }

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount < 1) {
      return NextResponse.json(
        { success: false, message: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const reference = "SAM-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    const enrollments = await getDB<Enrollment>("enrollments.json");
    const session = await getSession();

    let pushSuccess = false;
    let checkoutRequestId: string | undefined;
    let merchantRequestId: string | undefined;
    let mpesaMessage = "";
    let mpesaConfigured = isMpesaConfigured();

    if (mpesaConfigured) {
      const stk = await initiateStkPush(phone, parsedAmount, reference);
      pushSuccess = stk.success;
      checkoutRequestId = stk.checkoutRequestId;
      merchantRequestId = stk.merchantRequestId;
      mpesaMessage =
        stk.customerMessage ||
        stk.responseDescription ||
        stk.errorMessage ||
        "";

      if (!stk.success) {
        return NextResponse.json(
          {
            success: false,
            message:
              stk.errorMessage ||
              "Could not send M-Pesa prompt. Check your phone number and try again.",
            mpesaConfigured: true,
            mpesaError: stk.raw,
          },
          { status: 502 }
        );
      }
    } else {
      mpesaMessage =
        "M-Pesa API credentials are not configured on the server. Contact support to complete payment.";
    }

    const newEnrollment: Enrollment = {
      id: "ENR-" + Date.now(),
      studentId: session?.user.id || "guest",
      studentName: name,
      studentEmail: session?.user.email || "",
      courseId: String(courseId),
      courseName: courseName || "Course",
      amount: parsedAmount,
      phone,
      reference,
      checkoutRequestId,
      merchantRequestId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    enrollments.push(newEnrollment);
    await saveDB("enrollments.json", enrollments);

    return NextResponse.json({
      success: true,
      message: pushSuccess
        ? mpesaMessage || "M-Pesa prompt sent! Check your phone and enter your PIN."
        : mpesaMessage,
      reference,
      pushSuccess,
      mpesaConfigured,
      checkoutRequestId,
      merchantRequestId,
      paybillNumber: process.env.MPESA_SHORTCODE || "",
      recipientName: process.env.MPESA_ACCOUNT_NAME || "Samuel Kimiri",
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to process enrollment";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { reference, whatsappConfirmed } = await request.json();
    const enrollments = await getDB<Enrollment>("enrollments.json");
    const idx = enrollments.findIndex((e) => e.reference === reference);

    if (idx > -1) {
      enrollments[idx].whatsappConfirmed = whatsappConfirmed;
      await saveDB("enrollments.json", enrollments);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, message: "Enrollment not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  const enrollments = await getDB<Enrollment>("enrollments.json");
  return NextResponse.json({ success: true, data: enrollments });
}
