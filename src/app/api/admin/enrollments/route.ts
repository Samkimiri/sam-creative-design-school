import { NextResponse } from "next/server";
import { getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireFullAdminRequest } from "@/lib/adminAuth";
import {
  backfillLegacyEnrollments,
  findStudentForEnrollment,
  grantEnrollmentAccess,
  revokeEnrollmentAccess,
} from "@/lib/enrollmentAccess";
import { sendDisenrollmentEmail, sendEnrollmentApprovedEmail, sendEnrollmentRejectedEmail } from "@/lib/email";
import { absoluteUrl } from "@/lib/seo";
import { logAdminAction } from "@/lib/auditLog";

function courseNamesFromEnrollment(courseName: string) {
  return courseName.split(",").map((name) => name.trim()).filter(Boolean);
}

interface Enrollment {
  id: string;
  studentId?: string;
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
  paymentVerificationStatus?: string;
  adminApprovalStatus?: string;
  adminReviewRequestedAt?: string;
  adminApprovedAt?: string;
  adminNotificationMessage?: string;
  status: string;
  whatsappConfirmed?: boolean;
  whatsappSentAt?: string;
  accessGrantedAt?: string;
  accessGrantMessage?: string;
  revokedAt?: string;
  revokedReason?: string;
  rejectedAt?: string;
  rejectedReason?: string;
  createdAt: string;
}

async function listEnrollments(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  try {
    const storedEnrollments = await getDB<Enrollment>("enrollments.json");
    const enrollments = await backfillLegacyEnrollments(storedEnrollments);
    return NextResponse.json(
      { success: true, data: enrollments },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Enrollment storage is not available. Try again after database configuration is fixed.";
    return NextResponse.json(
      { success: false, message },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}

export async function POST(request: Request) {
  return listEnrollments(request);
}

export async function PATCH(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const enrollmentId = getRequiredString(auth.body, "enrollmentId", "Enrollment ID");
  if ("response" in enrollmentId) return enrollmentId.response;

  const status = getRequiredString(auth.body, "status", "Status");
  if ("response" in status) return status.response;
  if (status.value !== "pending" && status.value !== "confirmed" && status.value !== "revoked" && status.value !== "rejected") {
    return badRequest("Status must be pending, confirmed, revoked, or rejected");
  }

  const reasonField = auth.body.reason;
  const reason = typeof reasonField === "string" ? reasonField.trim().slice(0, 300) : "";

  const enrollments = await getDB<Enrollment>("enrollments.json");
  const index = enrollments.findIndex((e) => e.id === enrollmentId.value);

  if (index === -1) {
    return notFound("Enrollment not found");
  }

  const now = new Date().toISOString();
  enrollments[index].status = status.value;

  if (status.value === "confirmed") {
    enrollments[index].paymentConfirmedAt = now;
    enrollments[index].adminApprovalStatus = "approved";
    enrollments[index].adminApprovedAt = now;
    enrollments[index].revokedAt = undefined;
    enrollments[index].revokedReason = undefined;
    enrollments[index].rejectedAt = undefined;
    enrollments[index].rejectedReason = undefined;

    const enrollment = enrollments[index];
    const grant = await grantEnrollmentAccess(enrollment);

    if (grant.granted) {
      enrollments[index].accessGrantedAt = now;
      enrollments[index].accessGrantMessage = grant.addedCourses.length > 0
        ? `Access granted to ${grant.student?.name || "student"} for ${grant.addedCourses.length} course(s).`
        : `${grant.student?.name || "Student"} already had access to these course(s).`;
    } else {
      enrollments[index].accessGrantMessage = "Payment approved. Student should create or sign in with the same email or phone to receive course access.";
    }

    const recipientEmail = grant.student?.email || enrollment.studentEmail;
    if (recipientEmail) {
      const emailResult = await sendEnrollmentApprovedEmail({
        to: recipientEmail,
        studentName: grant.student?.name || enrollment.studentName || "there",
        courseNames: courseNamesFromEnrollment(enrollment.courseName),
        reference: enrollment.reference,
        amount: enrollment.amount,
        lmsUrl: absoluteUrl("/lms"),
      });
      enrollments[index].accessGrantMessage += emailResult.sent
        ? " Confirmation email sent."
        : " Confirmation email could not be sent (check email settings).";
    }
  } else if (status.value === "revoked") {
    enrollments[index].adminApprovalStatus = "revoked";
    enrollments[index].accessGrantedAt = undefined;
    enrollments[index].revokedAt = now;
    enrollments[index].revokedReason = reason || undefined;
    enrollments[index].rejectedAt = undefined;
    enrollments[index].rejectedReason = undefined;

    const enrollment = enrollments[index];
    const revoke = await revokeEnrollmentAccess(enrollment);

    enrollments[index].accessGrantMessage = revoke.revoked && revoke.removedCourses.length > 0
      ? `Access revoked for ${revoke.student?.name || "the student"}. They must enroll and pay again for ${revoke.removedCourses.length} course(s).`
      : "Enrollment marked as revoked. No matching student record was found to update.";

    const recipientEmail = revoke.student?.email || enrollment.studentEmail;
    if (recipientEmail) {
      const emailResult = await sendDisenrollmentEmail({
        to: recipientEmail,
        studentName: revoke.student?.name || enrollment.studentName || "there",
        courseNames: courseNamesFromEnrollment(enrollment.courseName),
        reason: reason || undefined,
        enrollUrl: absoluteUrl("/enroll"),
      });
      enrollments[index].accessGrantMessage += emailResult.sent
        ? " Notification email sent."
        : " Notification email could not be sent (check email settings).";
    }
  } else if (status.value === "rejected") {
    enrollments[index].adminApprovalStatus = "rejected";
    enrollments[index].accessGrantedAt = undefined;
    enrollments[index].rejectedAt = now;
    enrollments[index].rejectedReason = reason || undefined;
    enrollments[index].accessGrantMessage = "Enrollment rejected. Payment could not be confirmed.";

    const enrollment = enrollments[index];
    const student = await findStudentForEnrollment(enrollment);
    const recipientEmail = student?.email || enrollment.studentEmail;
    if (recipientEmail) {
      const emailResult = await sendEnrollmentRejectedEmail({
        to: recipientEmail,
        studentName: student?.name || enrollment.studentName || "there",
        courseNames: courseNamesFromEnrollment(enrollment.courseName),
        reference: enrollment.reference,
        reason: reason || undefined,
        enrollUrl: absoluteUrl("/enroll"),
      });
      enrollments[index].accessGrantMessage += emailResult.sent
        ? " Notification email sent."
        : " Notification email could not be sent (check email settings).";
    }
  } else {
    enrollments[index].adminApprovalStatus = "pending";
    enrollments[index].accessGrantedAt = undefined;
    enrollments[index].revokedAt = undefined;
    enrollments[index].revokedReason = undefined;
    enrollments[index].rejectedAt = undefined;
    enrollments[index].rejectedReason = undefined;
    enrollments[index].accessGrantMessage = "Enrollment is pending admin approval. LMS access unlocks after approval.";
  }

  await upsertDBRecord("enrollments.json", enrollments[index]);

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: `enrollment.${status.value}`,
    targetType: "enrollment",
    targetId: enrollments[index].id,
    targetLabel: `${enrollments[index].studentName} - ${enrollments[index].courseName}`,
    details: reason || undefined,
  });

  return NextResponse.json(
    { success: true, data: enrollments[index] },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

export async function DELETE(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const enrollmentId = getRequiredString(auth.body, "enrollmentId", "Enrollment ID");
  if ("response" in enrollmentId) return enrollmentId.response;

  const enrollments = await getDB<Enrollment>("enrollments.json");
  const index = enrollments.findIndex((e) => e.id === enrollmentId.value);

  if (index === -1) {
    return notFound("Enrollment not found");
  }

  if (enrollments[index].status !== "revoked" && enrollments[index].status !== "rejected") {
    return badRequest("Only revoked or rejected enrollments can be deleted.");
  }

  const [deleted] = enrollments.splice(index, 1);
  await saveDB("enrollments.json", enrollments);

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: "enrollment.deleted",
    targetType: "enrollment",
    targetId: deleted.id,
    targetLabel: `${deleted.studentName} - ${deleted.courseName}`,
  });

  return NextResponse.json(
    { success: true, data: deleted, message: "Enrollment record deleted." },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
