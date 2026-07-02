import { NextResponse } from "next/server";
import { appendDBRecord, getDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getManagedCourses } from "@/lib/contentSettings";
import { courses } from "@/data/courses";
import { findReferrerByCode, normalizeReferralCode } from "@/lib/referrals";
import { applyPromoCode, calculateReferralDiscount, getDiscountSettings, normalizePromoCode } from "@/lib/discountSettings";
import type { Enrollment, Student } from "@/types";

const clean = (value: unknown, maxLength: number) =>
  String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 80);
    const phone = clean(body.phone, 20);
    const email = clean(body.email, 120);
    const paymentMethod = "mpesa";
    const mpesaReceiptNumber = clean(body.mpesaReceiptNumber, 40).toUpperCase();
    const mpesaPayerName = clean(body.mpesaPayerName, 80);
    const mpesaPhoneNumber = clean(body.mpesaPhoneNumber || phone, 20);
    const mpesaNotes = clean(body.mpesaNotes, 240);
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

    if (!mpesaReceiptNumber) {
      return NextResponse.json(
        { success: false, message: "Enter the M-Pesa confirmation code before sending payment details." },
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

    const requestedCourseIds = new Set(courseIds);
    const validCourseIds = new Set(courses.map((course) => course.id));
    const missingCourse = [...requestedCourseIds].some((id) => !validCourseIds.has(id));

    if (missingCourse || requestedCourseIds.size === 0) {
      return NextResponse.json(
        { success: false, message: "Select a valid course before enrolling." },
        { status: 400 }
      );
    }

    const managedCourses = await getManagedCourses();
    const selectedCourses = managedCourses.filter((course) => requestedCourseIds.has(course.id));

    const courseName = selectedCourses.map((course) => course.title).join(", ");
    const parsedAmount = selectedCourses.reduce((sum, course) => sum + course.price, 0);
    const reference = "SAM-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    const now = new Date().toISOString();
    const session = await getSession();
    const students = referralCode ? await getDB<Student>("students.json") : [];
    const referrer = findReferrerByCode(students, referralCode);
    const isSelfReferral = Boolean(referrer && session?.user.id && referrer.id === session.user.id);
    const [discountSettings, enrollments] = await Promise.all([
      getDiscountSettings(),
      getDB<Enrollment>("enrollments.json"),
    ]);
    const referralDiscount = referrer && !isSelfReferral ? calculateReferralDiscount(parsedAmount, discountSettings) : 0;
    const promoResult = applyPromoCode({
      amount: Math.max(0, parsedAmount - referralDiscount),
      selectedCourses,
      promoCode,
      settings: discountSettings,
      enrollments,
    });
    const promoDiscount = promoResult.valid ? promoResult.discount : 0;
    const payableAmount = Math.max(0, parsedAmount - referralDiscount - promoDiscount);

    const pushSuccess = false;
    const paymentNumber =
      process.env.MPESA_TILL_NUMBER ||
      process.env.MPESA_PARTY_B ||
      process.env.MPESA_SHORTCODE ||
      "9322260";
    const paymentLabel =
      (process.env.MPESA_PAYMENT_MODE || "").toLowerCase().includes("paybill")
        ? "PayBill"
        : "Buy Goods Till";
    const recipientName = process.env.MPESA_ACCOUNT_NAME || "Samuel Kimiri";

    const newEnrollment: Enrollment = {
      id: "ENR-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      studentId: session?.user.id || "guest",
      studentName: name,
      studentEmail: session?.user.email || email,
      courseId: selectedCourses.map((course) => course.id).join(","),
      courseName: courseName || "Course",
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
      paymentProvider: paymentMethod,
      mpesaReceiptNumber,
      mpesaAmount: payableAmount,
      mpesaPhoneNumber,
      mpesaPayerName: mpesaPayerName || name,
      mpesaNotes,
      paymentVerificationStatus: "submitted",
      adminApprovalStatus: "pending",
      adminReviewRequestedAt: now,
      adminNotificationMessage: "Student submitted M-Pesa payment details. Admin should confirm the receipt before unlocking LMS access.",
      accessGrantMessage: "M-Pesa details submitted. Awaiting admin approval to unlock LMS access.",
      status: "pending",
      createdAt: now,
    };

    await appendDBRecord("enrollments.json", newEnrollment);

    return NextResponse.json({
      success: true,
      message: "Payment details saved. Send them on WhatsApp so the school can approve your LMS access.",
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
      pushSuccess,
      manualPayment: true,
      paymentProvider: paymentMethod,
      mpesaConfigured: true,
      paymentMode: paymentLabel === "PayBill" ? "paybill" : "buygoods",
      paymentLabel,
      paymentNumber,
      paybillNumber: paymentLabel === "PayBill" ? paymentNumber : "",
      tillNumber: paymentLabel === "Buy Goods Till" ? paymentNumber : "",
      recipientName,
      mpesaReceiptNumber,
      mpesaPayerName: mpesaPayerName || name,
      mpesaPhoneNumber,
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
