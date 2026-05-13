import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import { getSession } from "@/lib/auth";

interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  amount: number;
  phone: string;
  reference: string;
  checkoutRequestId?: string;
  status: "pending" | "confirmed";
  whatsappConfirmed?: boolean;
  createdAt: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  enrolledCourses: string[];
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, courseId, courseName, amount } = body;

    if (!name || !phone || !courseId) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const phoneRegex = /^0[7|1][0-9]{8}$/; // Added 01 to Kenyan phone regex
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, message: "Please enter a valid Kenyan phone number (07XXXXXXXX or 01XXXXXXXX)" }, { status: 400 });
    }

    const reference = "SAM-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    const enrollments = readJSON<Enrollment>("enrollments.json");
    const session = await getSession();

    // --- REAL STK PUSH INTEGRATION ---
    let mpesaResponse: any = null;
    let pushSuccess = false;

    try {
      const { initiateStkPush } = await import("@/lib/mpesa");
      mpesaResponse = await initiateStkPush(phone, amount, reference);
      if (mpesaResponse?.ResponseCode === "0") {
        pushSuccess = true;
      }
    } catch (error) {
      console.error("M-Pesa STK Push Error:", error);
    }
    // ---------------------------------

    const newEnrollment: Enrollment = {
      id: "ENR-" + Date.now(),
      studentId: session?.user.id || "guest",
      studentName: name,
      studentEmail: session?.user.email || "",
      courseId: String(courseId),
      courseName: courseName || "Course",
      amount: amount || 0,
      phone,
      reference,
      checkoutRequestId: mpesaResponse?.CheckoutRequestID,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    enrollments.push(newEnrollment);
    writeJSON("enrollments.json", enrollments);

    return NextResponse.json({
      success: true,
      message: pushSuccess ? "STK Push sent to your phone!" : "Enrollment saved. Please pay manually if you didn't receive a prompt.",
      reference,
      pushSuccess,
      mpesaResponse,
      mpesaNumber: process.env.MPESA_SHORTCODE || "0743475247",
      recipientName: "Samuel Kimiri",
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json({ success: false, message: "Failed to process enrollment" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { reference, whatsappConfirmed } = await request.json();
    const enrollments = readJSON<Enrollment>("enrollments.json");
    const idx = enrollments.findIndex((e) => e.reference === reference);
    
    if (idx > -1) {
      enrollments[idx].whatsappConfirmed = whatsappConfirmed;
      writeJSON("enrollments.json", enrollments);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, message: "Enrollment not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  const enrollments = readJSON<Enrollment>("enrollments.json");
  return NextResponse.json({ success: true, data: enrollments });
}
