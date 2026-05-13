import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/db";

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

    // Simulate STK Push delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success
    const enrollments = readJSON<Record<string, unknown>>("enrollments.json");
    const newEnrollment = {
      id: "MPESA_" + Math.random().toString(36).substring(2, 9),
      studentId: session.user.id,
      courseId,
      amount,
      phone,
      status: "paid",
      date: new Date().toISOString(),
    };

    enrollments.push(newEnrollment);
    writeJSON("enrollments.json", enrollments);

    return NextResponse.json({ 
      success: true, 
      message: "Payment successful! You are now enrolled.",
      enrollment: newEnrollment 
    });
  } catch {
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
