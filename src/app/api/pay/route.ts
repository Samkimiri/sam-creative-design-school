import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, saveDB } from "@/lib/db";
import { isMpesaConfigured, initiateStkPush } from "@/lib/mpesa";
import { courses } from "@/data/courses";
import type { Enrollment } from "@/types";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { phone, amount, courseId } = await request.json();

    if (!phone || !amount || !courseId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isMpesaConfigured()) {
      return NextResponse.json({ error: "M-Pesa API is not configured on the server." }, { status: 500 });
    }

    const reference = `SCDS_${session.user.id.substring(0, 5)}`;
    const course = courses.find((item) => item.id === courseId);
    
    // Initiate actual STK Push via Daraja API
    const pushResult = await initiateStkPush(phone, amount, reference);

    if (!pushResult.success) {
      return NextResponse.json({ error: pushResult.errorMessage || "M-Pesa STK Push failed." }, { status: 400 });
    }

    // Save as "pending" enrollment, containing the checkoutRequestId
    const enrollments = await getDB<Enrollment>("enrollments.json");
    const newEnrollment: Enrollment = {
      id: "ENR_" + Math.random().toString(36).substring(2, 9),
      studentId: session.user.id,
      studentName: session.user.name || session.user.email || "Student",
      studentEmail: session.user.email,
      courseId,
      courseName: course?.title || String(courseId),
      amount,
      phone,
      status: "pending",
      createdAt: new Date().toISOString(),
      checkoutRequestId: pushResult.checkoutRequestId,
      merchantRequestId: pushResult.merchantRequestId,
      reference,
    };

    enrollments.push(newEnrollment);
    await saveDB("enrollments.json", enrollments);

    return NextResponse.json({ 
      success: true, 
      message: "Please check your phone and enter your M-Pesa PIN to complete the payment.",
      checkoutRequestId: pushResult.checkoutRequestId,
      reference,
      enrollment: newEnrollment 
    });
  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
