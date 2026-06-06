import type { Student } from "@/types";

export const REFERRAL_DISCOUNT_RATE = 0.1;

export function normalizeReferralCode(value: unknown) {
  return String(value || "").trim().toUpperCase();
}

export function createReferralCode(student: Pick<Student, "id" | "name" | "email">) {
  const namePart = (student.name || student.email || "SCDS")
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 6)
    .toUpperCase()
    .padEnd(4, "X");
  const idPart = String(student.id || "")
    .replace(/[^a-z0-9]/gi, "")
    .slice(-4)
    .toUpperCase()
    .padStart(4, "0");

  return `${namePart}-${idPart}`;
}

export function findReferrerByCode(students: Student[], referralCode: unknown) {
  const normalized = normalizeReferralCode(referralCode);
  if (!normalized) return undefined;

  return students.find((student) => createReferralCode(student) === normalized);
}

export function calculateReferralDiscount(amount: number) {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  return Math.round(amount * REFERRAL_DISCOUNT_RATE);
}

