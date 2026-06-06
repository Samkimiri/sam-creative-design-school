import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import {
  getFlutterwaveCurrency,
  verifyFlutterwaveTransaction,
  verifyFlutterwaveTransactionByReference,
} from "@/lib/flutterwave";
import type { Enrollment, Student } from "@/types";

function redirectToEnroll(request: Request, params: Record<string, string>) {
  const url = new URL("/enroll", request.url);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  return NextResponse.redirect(url);
}

async function updateStudentCourses(enrollment: Enrollment) {
  const students = await getDB<Student>("students.json");
  const studentIdx = students.findIndex(
    (student) =>
      (enrollment.studentEmail && student.email === enrollment.studentEmail) ||
      (enrollment.phone && student.phone === enrollment.phone)
  );

  if (studentIdx === -1) return;

  const enrolled = students[studentIdx].enrolledCourses ?? [];
  enrollment.courseId.split(",").forEach((cid) => {
    const trimmed = cid.trim();
    if (trimmed && !enrolled.includes(trimmed)) enrolled.push(trimmed);
  });
  students[studentIdx].enrolledCourses = enrolled;
  await upsertDBRecord("students.json", students[studentIdx]);
}

async function handleFlutterwaveConfirmation(
  transactionId: string,
  txRef: string
) {
  const verification = transactionId
    ? await verifyFlutterwaveTransaction(transactionId)
    : await verifyFlutterwaveTransactionByReference(txRef);
  const enrollments = await getDB<Enrollment>("enrollments.json");
  const enrollment = enrollments.find(
    (item) => item.reference === txRef || item.flutterwaveTxRef === txRef
  );

  if (!enrollment) {
    return { ok: false, reference: txRef, message: "Enrollment not found" };
  }

  if (enrollment.paymentProvider && enrollment.paymentProvider !== "flutterwave") {
    return { ok: false, reference: enrollment.reference, message: "Enrollment is not a Flutterwave payment" };
  }

  if (enrollment.status === "confirmed") {
    return { ok: true, reference: enrollment.reference, message: "Payment already confirmed" };
  }

  const expectedCurrency = getFlutterwaveCurrency();
  const paidAmount = Number(verification.chargedAmount || verification.amount || 0);
  const amountIsValid = paidAmount >= enrollment.amount;
  const currencyIsValid = verification.currency === expectedCurrency;
  const referenceIsValid = verification.txRef === enrollment.reference;
  const emailIsValid =
    !enrollment.studentEmail ||
    !verification.customerEmail ||
    verification.customerEmail.toLowerCase() === enrollment.studentEmail.toLowerCase();

  if (
    verification.success &&
    amountIsValid &&
    currencyIsValid &&
    referenceIsValid &&
    emailIsValid
  ) {
    enrollment.status = "confirmed";
    enrollment.flutterwaveTransactionId = verification.transactionId;
    enrollment.flutterwaveTxRef = verification.txRef;
    enrollment.flutterwaveFlwRef = verification.flwRef;
    enrollment.flutterwavePaymentType = verification.paymentType;
    enrollment.flutterwaveCurrency = verification.currency;
    enrollment.flutterwaveAmount = verification.amount;
    enrollment.flutterwaveChargedAmount = verification.chargedAmount;
    enrollment.flutterwaveStatus = verification.status;
    enrollment.paymentConfirmedAt = new Date().toISOString();
    await upsertDBRecord("enrollments.json", enrollment);
    await updateStudentCourses(enrollment);
    return { ok: true, reference: enrollment.reference, message: "Payment confirmed" };
  }

  enrollment.status = verification.status === "cancelled" || verification.status === "failed" ? "failed" : "pending";
  enrollment.flutterwaveTransactionId = verification.transactionId || transactionId;
  enrollment.flutterwaveTxRef = verification.txRef || txRef;
  enrollment.flutterwaveFlwRef = verification.flwRef;
  enrollment.flutterwavePaymentType = verification.paymentType;
  enrollment.flutterwaveCurrency = verification.currency;
  enrollment.flutterwaveAmount = verification.amount;
  enrollment.flutterwaveChargedAmount = verification.chargedAmount;
  enrollment.flutterwaveStatus = verification.status;
  enrollment.flutterwaveFailureReason =
    !referenceIsValid ? "Transaction reference mismatch"
    : !currencyIsValid ? "Currency mismatch"
    : !amountIsValid ? "Payment amount is lower than expected"
    : !emailIsValid ? "Customer email mismatch"
    : verification.message || "Flutterwave payment could not be verified";
  await upsertDBRecord("enrollments.json", enrollment);

  return {
    ok: false,
    reference: enrollment.reference,
    message: verification.message || "Flutterwave payment could not be verified",
  };
}

async function markFlutterwaveEnrollmentFailed(txRef: string, reason: string) {
  const enrollments = await getDB<Enrollment>("enrollments.json");
  const enrollment = enrollments.find(
    (item) => item.reference === txRef || item.flutterwaveTxRef === txRef
  );

  if (!enrollment || enrollment.status === "confirmed") return;

  enrollment.status = "failed";
  enrollment.flutterwaveStatus = "failed";
  enrollment.flutterwaveFailureReason = reason;
  await upsertDBRecord("enrollments.json", enrollment);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") || "";
  const transactionId = url.searchParams.get("transaction_id") || "";
  const txRef = url.searchParams.get("tx_ref") || "";

  if (!txRef) {
    return redirectToEnroll(request, {
      payment: "flutterwave-failed",
      message: "Missing Flutterwave transaction details",
    });
  }

  if (status && status !== "successful" && !transactionId) {
    await markFlutterwaveEnrollmentFailed(txRef, "Flutterwave payment was not completed");
    return redirectToEnroll(request, {
      payment: "flutterwave-failed",
      reference: txRef,
      message: "Flutterwave payment was not completed",
    });
  }

  const result = await handleFlutterwaveConfirmation(transactionId, txRef);
  return redirectToEnroll(request, {
    payment: result.ok ? "flutterwave-success" : "flutterwave-failed",
    reference: result.reference,
    message: result.message,
  });
}

export async function POST(request: Request) {
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH;
  if (secretHash && request.headers.get("verif-hash") !== secretHash) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const transactionId = String(payload?.id || payload?.data?.id || "");
  const txRef = String(payload?.tx_ref || payload?.data?.tx_ref || "");

  if (!txRef) {
    return NextResponse.json({ success: false, message: "Missing transaction details" }, { status: 400 });
  }

  const result = await handleFlutterwaveConfirmation(transactionId, txRef);
  return NextResponse.json({ success: result.ok, message: result.message });
}
