import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import { getFlutterwaveCurrency, verifyFlutterwaveTransaction } from "@/lib/flutterwave";
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
  const verification = await verifyFlutterwaveTransaction(transactionId);
  const enrollments = await getDB<Enrollment>("enrollments.json");
  const enrollment = enrollments.find(
    (item) => item.reference === txRef || item.flutterwaveTxRef === txRef
  );

  if (!enrollment) {
    return { ok: false, reference: txRef, message: "Enrollment not found" };
  }

  const expectedCurrency = getFlutterwaveCurrency();
  const amountIsValid = Number(verification.amount || 0) >= enrollment.amount;
  const currencyIsValid = verification.currency === expectedCurrency;
  const referenceIsValid = verification.txRef === enrollment.reference;

  if (
    verification.success &&
    amountIsValid &&
    currencyIsValid &&
    referenceIsValid
  ) {
    enrollment.status = "confirmed";
    enrollment.flutterwaveTransactionId = verification.transactionId;
    enrollment.flutterwaveTxRef = verification.txRef;
    enrollment.flutterwaveFlwRef = verification.flwRef;
    enrollment.flutterwavePaymentType = verification.paymentType;
    enrollment.flutterwaveCurrency = verification.currency;
    await upsertDBRecord("enrollments.json", enrollment);
    await updateStudentCourses(enrollment);
    return { ok: true, reference: enrollment.reference, message: "Payment confirmed" };
  }

  enrollment.status = "failed";
  enrollment.flutterwaveTransactionId = verification.transactionId || transactionId;
  enrollment.flutterwaveTxRef = verification.txRef || txRef;
  enrollment.flutterwaveFlwRef = verification.flwRef;
  enrollment.flutterwavePaymentType = verification.paymentType;
  enrollment.flutterwaveCurrency = verification.currency;
  await upsertDBRecord("enrollments.json", enrollment);

  return {
    ok: false,
    reference: enrollment.reference,
    message: verification.message || "Flutterwave payment could not be verified",
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const transactionId = url.searchParams.get("transaction_id") || "";
  const txRef = url.searchParams.get("tx_ref") || "";

  if (!transactionId || !txRef) {
    return redirectToEnroll(request, {
      payment: "flutterwave-failed",
      message: "Missing Flutterwave transaction details",
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

  if (!transactionId || !txRef) {
    return NextResponse.json({ success: false, message: "Missing transaction details" }, { status: 400 });
  }

  const result = await handleFlutterwaveConfirmation(transactionId, txRef);
  return NextResponse.json({ success: result.ok, message: result.message });
}
