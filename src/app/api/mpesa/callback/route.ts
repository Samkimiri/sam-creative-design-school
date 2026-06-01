import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import type { Enrollment, Student } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Body } = body;
    if (!Body?.stkCallback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const { ResultCode, ResultDesc, CheckoutRequestID } = Body.stkCallback;

    const enrollments = await getDB<Enrollment>("enrollments.json");
    const idx = enrollments.findIndex(
      (e) => e.checkoutRequestId === CheckoutRequestID
    );

    if (String(ResultCode) !== "0") {
      if (idx > -1) {
        enrollments[idx].status = "failed";
        enrollments[idx].mpesaResultCode = String(ResultCode);
        enrollments[idx].mpesaResultDesc = String(ResultDesc || "Payment failed");
        await upsertDBRecord("enrollments.json", enrollments[idx]);
      }
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    if (idx > -1) {
      enrollments[idx].status = "confirmed";
      enrollments[idx].mpesaResultCode = String(ResultCode);
      enrollments[idx].mpesaResultDesc = String(ResultDesc || "Success");
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
        enrollment.courseId.split(",").forEach((cid: string) => {
          const trimmed = cid.trim();
          if (trimmed && !enrolled.includes(trimmed)) enrolled.push(trimmed);
        });
        students[studentIdx].enrolledCourses = enrolled;
        await upsertDBRecord("students.json", students[studentIdx]);
      }
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    console.error("M-Pesa callback error:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}
