import { NextResponse, after } from "next/server";
import { appendDBRecord, getDB, hasPersistentStorageConfig, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getManagedCourses } from "@/lib/contentSettings";
import { findReferrerByCode, normalizeReferralCode } from "@/lib/referrals";
import { applyPromoCode, calculateReferralDiscount, getDiscountSettings, normalizePromoCode } from "@/lib/discountSettings";
import { sendAdminNewEnrollmentAlertEmail } from "@/lib/email";
import { absoluteUrl } from "@/lib/seo";
import type { Enrollment, Student } from "@/types";

const clean = (value: unknown, maxLength: number) =>
  String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);

function enrollmentCourseIds(enrollment: Enrollment): string[] {
  return enrollment.courseId.split(",").map((id) => id.trim()).filter(Boolean);
}

function joinTitles(titles: string[]): string {
  if (titles.length <= 1) return titles[0] || "";
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(", ")}, and ${titles[titles.length - 1]}`;
}

function getPaymentDetails() {
  const paymentNumber =
    process.env.MPESA_TILL_NUMBER ||
    process.env.MPESA_PARTY_B ||
    process.env.MPESA_SHORTCODE ||
    "9322260";
  const paymentLabel =
    (process.env.MPESA_PAYMENT_MODE || "").toLowerCase().includes("paybill")
      ? "PayBill"
      : "Buy Goods Till";

  return {
    mpesaConfigured: false,
    paymentMode: paymentLabel === "PayBill" ? "paybill" : "buygoods",
    paymentLabel,
    paymentNumber,
    paybillNumber: paymentLabel === "PayBill" ? paymentNumber : "",
    tillNumber: paymentLabel === "Buy Goods Till" ? paymentNumber : "",
    recipientName: process.env.MPESA_ACCOUNT_NAME || "Samuel Kimiri",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 80);
    const phone = clean(body.phone, 20);
    const email = clean(body.email, 120);
    const referralCode = normalizeReferralCode(body.referralCode).slice(0, 24);
    const promoCode = normalizePromoCode(body.promoCode);
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

    const session = await getSession();
    if (!session?.user.id) {
      return NextResponse.json(
        { success: false, message: "Create a free account or sign in before enrolling.", requiresAuth: true },
        { status: 401 }
      );
    }

    const phoneRegex = /^0[71]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid Kenyan phone number (07XXXXXXXX or 01XXXXXXXX)." },
        { status: 400 }
      );
    }

    const requestedCourseIds = new Set(courseIds);
    const managedCourses = await getManagedCourses();
    const validCourseIds = new Set(managedCourses.map((course) => course.id));
    const missingCourse = [...requestedCourseIds].some((id) => !validCourseIds.has(id));

    if (missingCourse || requestedCourseIds.size === 0) {
      return NextResponse.json(
        { success: false, message: "Select a valid course before enrolling." },
        { status: 400 }
      );
    }

    const selectedCourses = managedCourses.filter((course) => requestedCourseIds.has(course.id));
    const reference = "SAM-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    const now = new Date().toISOString();
    const [students, discountSettings, enrollments] = await Promise.all([
      getDB<Student>("students.json"),
      getDiscountSettings(),
      getDB<Enrollment>("enrollments.json"),
    ]);
    const referrer = findReferrerByCode(students, referralCode);
    const isSelfReferral = Boolean(referrer && referrer.id === session.user.id);

    // Enrolling requires an account (enforced by the /enroll middleware gate too),
    // so the student record must already exist - link the enrollment to it.
    const student = students.find((candidate) => candidate.id === session.user.id);
    if (!student) {
      return NextResponse.json(
        { success: false, message: "Your account could not be found. Please sign in again.", requiresAuth: true },
        { status: 401 }
      );
    }

    // A student re-submitting the enroll form for a course they already have an
    // active request for (still pending review, or already confirmed) used to
    // create a brand-new duplicate enrollment record every time - cluttering the
    // admin dashboard with repeats of the same request. Course-by-course: skip
    // anything already pending/confirmed, only submit genuinely new courses.
    // A previously rejected or revoked course is NOT a duplicate - the student
    // is expected to be able to try again for that one.
    const pendingByCourseId = new Map<string, Enrollment>();
    const confirmedCourseIds = new Set<string>();
    for (const existing of enrollments) {
      if (existing.studentId !== student.id) continue;
      const ids = enrollmentCourseIds(existing);
      if (existing.status === "confirmed") {
        ids.forEach((id) => confirmedCourseIds.add(id));
      } else if (existing.status === "pending") {
        ids.forEach((id) => {
          const current = pendingByCourseId.get(id);
          if (!current || new Date(existing.createdAt).getTime() > new Date(current.createdAt).getTime()) {
            pendingByCourseId.set(id, existing);
          }
        });
      }
    }

    const duplicatePendingCourses = selectedCourses.filter((course) => pendingByCourseId.has(course.id));
    const alreadyConfirmedCourses = selectedCourses.filter((course) => confirmedCourseIds.has(course.id));
    const newCourses = selectedCourses.filter(
      (course) => !pendingByCourseId.has(course.id) && !confirmedCourseIds.has(course.id)
    );

    if (newCourses.length === 0) {
      if (duplicatePendingCourses.length > 0) {
        const mostRecentPending = duplicatePendingCourses
          .map((course) => pendingByCourseId.get(course.id)!)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
        const pendingNote = `You already submitted ${joinTitles(duplicatePendingCourses.map((c) => c.title))} and it's awaiting admin review. Our admin is already working on it - please wait a short while for confirmation instead of submitting again.`;
        const confirmedNote = alreadyConfirmedCourses.length > 0
          ? ` You also already have access to ${joinTitles(alreadyConfirmedCourses.map((c) => c.title))}.`
          : "";
        return NextResponse.json({
          success: true,
          reviewPending: true,
          alreadyPending: true,
          message: pendingNote + confirmedNote,
          reference: mostRecentPending.reference,
          amount: mostRecentPending.amount,
          ...getPaymentDetails(),
        });
      }

      return NextResponse.json({
        success: false,
        alreadyEnrolled: true,
        message: `You already have access to ${joinTitles(alreadyConfirmedCourses.map((c) => c.title))}. Open your LMS dashboard to continue learning.`,
      });
    }

    const parsedAmount = newCourses.reduce((sum, course) => sum + course.price, 0);
    const referralDiscount = referrer && !isSelfReferral ? calculateReferralDiscount(parsedAmount, discountSettings) : 0;
    const promoResult = applyPromoCode({
      amount: Math.max(0, parsedAmount - referralDiscount),
      selectedCourses: newCourses,
      promoCode,
      settings: discountSettings,
      enrollments,
    });
    const promoDiscount = promoResult.valid ? promoResult.discount : 0;
    const payableAmount = Math.max(0, parsedAmount - referralDiscount - promoDiscount);
    const paymentDetails = getPaymentDetails();

    if (payableAmount < 1) {
      return NextResponse.json(
        { success: false, message: "The payable amount must be at least Ksh 1.", ...paymentDetails },
        { status: 400 }
      );
    }

    const newEnrollment: Enrollment = {
      id: "ENR-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      studentId: student.id,
      studentName: name,
      studentEmail: session.user.email || email,
      courseId: newCourses.map((course) => course.id).join(","),
      courseName: newCourses.map((course) => course.title).join(", ") || "Course",
      originalAmount: parsedAmount,
      amount: payableAmount,
      referralCode: referralCode || undefined,
      referralDiscount: referralDiscount || undefined,
      promoCode: promoResult.valid ? promoResult.promo?.code : promoCode || undefined,
      promoDiscount: promoDiscount || undefined,
      promoDescription: promoResult.valid ? promoResult.promo?.description : undefined,
      referredByStudentId: referrer && !isSelfReferral ? referrer.id : undefined,
      referredByName: referrer && !isSelfReferral ? referrer.name : undefined,
      referredByEmail: referrer && !isSelfReferral ? referrer.email : undefined,
      phone,
      reference,
      paymentProvider: "mpesa",
      mpesaAmount: payableAmount,
      mpesaPhoneNumber: phone,
      paymentVerificationStatus: "submitted",
      adminApprovalStatus: "pending",
      adminReviewRequestedAt: now,
      adminNotificationMessage: `Student submitted an access request for ${paymentDetails.paymentLabel} ${paymentDetails.paymentNumber}. Confirm payment in M-Pesa, then approve to unlock LMS access.`,
      accessGrantMessage: "Enrollment submitted for admin approval. LMS access unlocks after approval.",
      status: "pending",
      createdAt: now,
    };

    await appendDBRecord("enrollments.json", newEnrollment);
    const savedEnrollments = await getDB<Enrollment>("enrollments.json");
    const savedEnrollment = savedEnrollments.some(
      (enrollment) => enrollment.id === newEnrollment.id || enrollment.reference === reference
    );

    if (!savedEnrollment) {
      throw new Error(
        "Enrollment storage verification failed. Configure Supabase, MongoDB, or Vercel KV so requests can appear in the admin dashboard before students pay."
      );
    }

    const adminAlertEmail = process.env.SCDS_ADMIN_ALERT_EMAIL
      || students.find((s) => s.role === "admin")?.email
      || process.env.SCDS_EMAIL_REPLY_TO;
    if (adminAlertEmail) {
      after(() =>
        sendAdminNewEnrollmentAlertEmail({
          to: adminAlertEmail,
          studentName: name,
          courseNames: newCourses.map((course) => course.title),
          amount: payableAmount,
          reference,
          adminUrl: absoluteUrl("/admin"),
        }).catch(() => {})
      );
    }

    const skippedDuplicates = [...duplicatePendingCourses, ...alreadyConfirmedCourses];
    const successMessage = skippedDuplicates.length > 0
      ? `Enrollment submitted for admin approval. ${joinTitles(skippedDuplicates.map((c) => c.title))} ${skippedDuplicates.length > 1 ? "were" : "was"} already submitted or enrolled, so only the new course(s) above were sent. Pay to the Till shown if you have not already paid.`
      : "Enrollment submitted for admin approval. Pay to the Till shown if you have not already paid.";

    return NextResponse.json({
      success: true,
      message: successMessage,
      reference,
      amount: payableAmount,
      originalAmount: parsedAmount,
      referralDiscount,
      referralApplied: Boolean(referrer && !isSelfReferral),
      referredByName: referrer && !isSelfReferral ? referrer.name : "",
      promoDiscount,
      promoApplied: promoResult.valid,
      promoMessage: promoCode ? promoResult.message : "",
      promoDescription: promoResult.valid ? promoResult.promo?.description : "",
      reviewPending: true,
      approvalRequired: true,
      paymentProvider: "mpesa",
      ...paymentDetails,
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    const rawMessage = error instanceof Error ? error.message : "";
    const storageUnavailable =
      rawMessage === "fetch failed" ||
      rawMessage.includes("persistent storage") ||
      rawMessage.includes("storage verification failed");
    const message = storageUnavailable
      ? hasPersistentStorageConfig()
        ? "Enrollment storage is configured but currently unavailable. Check the database connection and schema, then try again. Please contact the school on WhatsApp before paying."
        : "Enrollment storage is not configured. Add Supabase, MongoDB, or Vercel KV environment variables, redeploy, then try again. Please contact the school on WhatsApp before paying."
      : rawMessage || "Failed to process enrollment";
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
      enrollments[idx].whatsappSentAt = whatsappConfirmed ? new Date().toISOString() : undefined;
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
