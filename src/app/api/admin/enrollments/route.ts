import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";
import { grantEnrollmentAccess } from "@/lib/enrollmentAccess";

interface Enrollment {
  id: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  amount: number;
  phone: string;
  reference: string;
  paymentProvider?: string;
  mpesaReceiptNumber?: string;
  mpesaAmount?: number;
  mpesaPhoneNumber?: string;
  mpesaPayerName?: string;
  mpesaNotes?: string;
  paymentConfirmedAt?: string;
  status: string;
  whatsappConfirmed?: boolean;
  whatsappSentAt?: string;
  accessGrantedAt?: string;
  accessGrantMessage?: string;
  createdAt: string;
}

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const enrollments = await getDB<Enrollment>("enrollments.json");
  return NextResponse.json({ success: true, data: enrollments });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const enrollmentId = getRequiredString(auth.body, "enrollmentId", "Enrollment ID");
  if ("response" in enrollmentId) return enrollmentId.response;

  const status = getRequiredString(auth.body, "status", "Status");
  if ("response" in status) return status.response;
  if (status.value !== "pending" && status.value !== "confirmed") {
    return badRequest("Status must be pending or confirmed");
  }

  const enrollments = await getDB<Enrollment>("enrollments.json");
  const index = enrollments.findIndex((e) => e.id === enrollmentId.value);
  
  if (index === -1) {
    return notFound("Enrollment not found");
  }

  enrollments[index].status = status.value;
  if (status.value === "confirmed") {
    enrollments[index].paymentConfirmedAt = new Date().toISOString();
  }
  await saveDB("enrollments.json", enrollments);

  if (status.value === "confirmed") {
    const enrollment = enrollments[index];
    const grant = await grantEnrollmentAccess(enrollment);

    if (grant.granted) {
      enrollments[index].accessGrantedAt = new Date().toISOString();
      enrollments[index].accessGrantMessage = grant.addedCourses.length > 0
        ? `Access granted to ${grant.student?.name || "student"} for ${grant.addedCourses.length} course(s).`
        : `${grant.student?.name || "Student"} already had access to these course(s).`;
    } else {
      enrollments[index].accessGrantMessage = "Payment approved. Student should create or sign in with the same email or phone to receive course access.";
    }

    await saveDB("enrollments.json", enrollments);
  }

  return NextResponse.json({ success: true, data: enrollments[index] });
}
