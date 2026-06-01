import { NextResponse } from "next/server";
import { appendDBRecord, getDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { initiateStkPush, isMpesaConfigured } from "@/lib/mpesa";
import { courses } from "@/data/courses";
import type { Enrollment } from "@/types";

const clean = (value: unknown, maxLength: number) =>
  String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 80);
    const phone = clean(body.phone, 20);
    const courseIds = String(body.courseId || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (!name || !phone || courseIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Name, phone, and at least one course are required." },
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

    const selectedCourses = courses.filter((course) => courseIds.includes(course.id));
    const missingCourse = selectedCourses.length !== new Set(courseIds).size;

    if (missingCourse || selectedCourses.length === 0) {
      return NextResponse.json(
        { success: false, message: "Select a valid course before enrolling." },
        { status: 400 }
      );
    }

    const courseName = selectedCourses.map((course) => course.title).join(", ");
    const parsedAmount = selectedCourses.reduce((sum, course) => sum + course.price, 0);
    const reference = "SAM-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    const session = await getSession();

    let pushSuccess = false;
    let checkoutRequestId: string | undefined;
    let merchantRequestId: string | undefined;
    let mpesaMessage = "";
    const mpesaConfigured = isMpesaConfigured();

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
      courseId: selectedCourses.map((course) => course.id).join(","),
      courseName: courseName || "Course",
      amount: parsedAmount,
      phone,
      reference,
      checkoutRequestId,
      merchantRequestId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await appendDBRecord("enrollments.json", newEnrollment);

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
    if (typeof reference !== "string" || reference.trim() === "") {
      return NextResponse.json({ success: false, message: "Reference is required" }, { status: 400 });
    }

    const enrollments = await getDB<Enrollment>("enrollments.json");
    const idx = enrollments.findIndex((e) => e.reference === reference.trim());

    if (idx > -1) {
      enrollments[idx].whatsappConfirmed = Boolean(whatsappConfirmed);
      await upsertDBRecord("enrollments.json", enrollments[idx]);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, message: "Enrollment not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, message: "Use the admin enrollments endpoint." },
    { status: 405 }
  );
}
