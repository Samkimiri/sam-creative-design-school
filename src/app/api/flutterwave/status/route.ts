import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import {
  getFlutterwaveCurrency,
  verifyFlutterwaveTransaction,
  verifyFlutterwaveTransactionByReference,
} from "@/lib/flutterwave";
import type { Enrollment, Student } from "@/types";

async function updateStudentCourses(enrollment: Enrollment) {
  const students = await getDB<Student>("students.json");
  const studentIdx = students.findIndex(
    (student) =>
      (enrollment.studentEmail && student.email === enrollment.studentEmail) ||
      (enrollment.phone && student.phone === enrollment.phone)
  );

  if (studentIdx === -1) return;

  const enrolled = students[studentIdx].enrolledCourses ?? [];
  enrollment.courseId.split(",").forEach((courseId) => {
    const trimmed = courseId.trim();
    if (trimmed && !enrolled.includes(trimmed)) enrolled.push(trimmed);
  });
  students[studentIdx].enrolledCourses = enrolled;
  await upsertDBRecord("students.json", students[studentIdx]);
}

async function verifyEnrollmentPayment(reference: string, transactionId = "") {
  const enrollments = await getDB<Enrollment>("enrollments.json");
  const enrollment = enrollments.find(
    (item) => item.reference === reference || item.flutterwaveTxRef === reference
  );

  if (!enrollment) {
    return { status: 404, body: { success: false, paid: false, message: "Enrollment not found" } };
  }

  if (enrollment.status === "confirmed") {
    return {
      status: 200,
      body: {
        success: true,
        paid: true,
        status: "confirmed",
        reference: enrollment.reference,
        transactionId: enrollment.flutterwaveTransactionId,
      },
    };
  }

  const verification = transactionId
    ? await verifyFlutterwaveTransaction(transactionId)
    : await verifyFlutterwaveTransactionByReference(enrollment.reference);

  const expectedCurrency = getFlutterwaveCurrency();
  const paidAmount = Number(verification.chargedAmount || verification.amount || 0);
  const amountIsValid = paidAmount >= enrollment.amount;
  const currencyIsValid = verification.currency === expectedCurrency;
  const referenceIsValid = verification.txRef === enrollment.reference;

  if (verification.success && amountIsValid && currencyIsValid && referenceIsValid) {
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

    return {
      status: 200,
      body: {
        success: true,
        paid: true,
        status: "confirmed",
        reference: enrollment.reference,
        transactionId: enrollment.flutterwaveTransactionId,
      },
    };
  }

  const terminalFailure = verification.status === "cancelled" || verification.status === "failed";
  if (terminalFailure) {
    enrollment.status = "failed";
    enrollment.flutterwaveStatus = verification.status;
    enrollment.flutterwaveFailureReason = verification.message || "Flutterwave payment failed";
    await upsertDBRecord("enrollments.json", enrollment);
  }

  return {
    status: 200,
    body: {
      success: true,
      paid: false,
      status: enrollment.status,
      reference: enrollment.reference,
      resultDesc:
        !referenceIsValid ? "Transaction reference mismatch"
        : !currencyIsValid ? "Currency mismatch"
        : !amountIsValid ? "Payment amount is lower than expected"
        : verification.message || "Payment is still pending",
    },
  };
}

export async function POST(request: Request) {
  try {
    const { reference, transactionId } = await request.json();
    if (typeof reference !== "string" || !reference.trim()) {
      return NextResponse.json(
        { success: false, paid: false, message: "Reference is required" },
        { status: 400 }
      );
    }

    const result = await verifyEnrollmentPayment(reference.trim(), String(transactionId || ""));
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error("Flutterwave status check error:", error);
    return NextResponse.json(
      { success: false, paid: false, message: "Failed to check Flutterwave payment status" },
      { status: 500 }
    );
  }
}
