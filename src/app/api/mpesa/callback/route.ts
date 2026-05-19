import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import type { Enrollment, Student } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("M-Pesa Callback Received:", JSON.stringify(body, null, 2));

    const { Body } = body;
    if (!Body || !Body.stkCallback) {
      return NextResponse.json({ success: false, message: "Invalid callback payload" });
    }

    const { ResultCode, ResultDesc, CheckoutRequestID } = Body.stkCallback;

    if (ResultCode === 0) {
      // Payment successful
      const enrollments = readJSON<Enrollment>("enrollments.json");
      const idx = enrollments.findIndex((e) => e.checkoutRequestId === CheckoutRequestID);

      if (idx > -1) {
        enrollments[idx].status = "confirmed";
        writeJSON("enrollments.json", enrollments);

        // Also assign course to student profile
        const students = readJSON<Student>("students.json");
        const enrollment = enrollments[idx];
        const studentIdx = students.findIndex(
          (s) => s.email === enrollment.studentEmail || s.phone === enrollment.phone
        );

        if (studentIdx > -1) {
          const enrolled = students[studentIdx].enrolledCourses ?? [];
          const courseIds = enrollment.courseId.split(",");
          courseIds.forEach((cid: string) => {
            const trimmed = cid.trim();
            if (trimmed && !enrolled.includes(trimmed)) {
              enrolled.push(trimmed);
            }
          });
          students[studentIdx].enrolledCourses = enrolled;
          writeJSON("students.json", students);
        }
      }
      
      return NextResponse.json({ success: true });
    } else {
      console.log(`Payment failed: ${ResultDesc}`);
      return NextResponse.json({ success: false, message: ResultDesc });
    }
  } catch (error) {
    console.error("Callback Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
