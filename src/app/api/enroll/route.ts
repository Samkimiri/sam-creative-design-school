import { NextResponse } from "next/server";
import { appendDBRecord, getDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import {
  createFlutterwaveCheckout,
  getFlutterwaveCurrency,
  isFlutterwaveConfigured,
} from "@/lib/flutterwave";
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
    const paymentMethod = clean(body.paymentMethod || "mpesa", 20);
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

    if (paymentMethod !== "mpesa" && paymentMethod !== "flutterwave") {
      return NextResponse.json(
        { success: false, message: "Choose a valid payment method." },
        { status: 400 }
      );
    }

    if (paymentMethod === "flutterwave" && !email) {
      return NextResponse.json(
        { success: false, message: "Email is required for Flutterwave checkout." },
        { status: 400 }
      );
    }

    if (paymentMethod === "mpesa" && !mpesaReceiptNumber) {
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
    let checkoutUrl = "";
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

    if (paymentMethod === "flutterwave") {
      if (!isFlutterwaveConfigured()) {
        return NextResponse.json(
          {
            success: false,
            message: "Flutterwave is not configured on the server.",
          },
          { status: 500 }
        );
      }

      const redirectUrl =
        process.env.FLUTTERWAVE_REDIRECT_URL ||
        new URL("/api/flutterwave/callback", request.url).toString();
      const checkout = await createFlutterwaveCheckout({
        amount: payableAmount,
        txRef: reference,
        redirectUrl,
        customer: {
          email,
          name,
          phone,
        },
        courseName,
      });

      if (!checkout.success || !checkout.link) {
        return NextResponse.json(
          {
            success: false,
            message:
              checkout.message || "Could not create Flutterwave checkout.",
            flutterwaveError: checkout.raw,
          },
          { status: 502 }
        );
      }

      checkoutUrl = checkout.link;
    }

    const newEnrollment: Enrollment = {
      id: "ENR-" + Date.now(),
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
      mpesaReceiptNumber: paymentMethod === "mpesa" ? mpesaReceiptNumber : undefined,
      mpesaAmount: paymentMethod === "mpesa" ? payableAmount : undefined,
      mpesaPhoneNumber: paymentMethod === "mpesa" ? mpesaPhoneNumber : undefined,
      mpesaPayerName: paymentMethod === "mpesa" ? mpesaPayerName || name : undefined,
      mpesaNotes: paymentMethod === "mpesa" ? mpesaNotes : undefined,
      flutterwaveTxRef: paymentMethod === "flutterwave" ? reference : undefined,
      flutterwaveCurrency:
        paymentMethod === "flutterwave" ? getFlutterwaveCurrency() : undefined,
      flutterwaveCheckoutCreatedAt:
        paymentMethod === "flutterwave" ? new Date().toISOString() : undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await appendDBRecord("enrollments.json", newEnrollment);

    return NextResponse.json({
      success: true,
      message: paymentMethod === "mpesa"
        ? "Payment details saved. Send them on WhatsApp so the school can approve your LMS access."
        : "Opening secure checkout.",
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
      checkoutUrl,
      manualPayment: paymentMethod === "mpesa",
      paymentProvider: paymentMethod,
      flutterwaveConfigured:
        paymentMethod === "flutterwave" ? isFlutterwaveConfigured() : false,
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
