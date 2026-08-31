import type { Enrollment } from "@/types";

export interface FinanceCourseBreakdown {
  courseId: string;
  courseName: string;
  confirmedCount: number;
  collected: number;
  pendingCount: number;
  pendingAmount: number;
}

export interface FinanceDayBucket {
  date: string;
  collected: number;
}

export interface FinanceSummary {
  totalCollected: number;
  totalPending: number;
  totalLegacyUnconfirmed: number;
  confirmedCount: number;
  pendingCount: number;
  revokedCount: number;
  rejectedCount: number;
  totalReferralDiscounts: number;
  totalPromoDiscounts: number;
  thisMonthCollected: number;
  averageOrderValue: number;
  byCourse: FinanceCourseBreakdown[];
  last30Days: FinanceDayBucket[];
}

function isReal(enrollment: Enrollment) {
  return enrollment.paymentProvider !== "legacy";
}

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

export function getFinanceSummary(enrollments: Enrollment[]): FinanceSummary {
  const now = new Date();
  const thisMonthKey = now.toISOString().slice(0, 7);

  const confirmed = enrollments.filter((e) => e.status === "confirmed");
  const realConfirmed = confirmed.filter(isReal);
  const legacyConfirmed = confirmed.filter((e) => !isReal(e));
  const pending = enrollments.filter((e) => e.status === "pending");
  const revoked = enrollments.filter((e) => e.status === "revoked");
  const rejected = enrollments.filter((e) => e.status === "rejected");

  const totalCollected = realConfirmed.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalPending = pending.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalLegacyUnconfirmed = legacyConfirmed.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalReferralDiscounts = enrollments.reduce((sum, e) => sum + (e.referralDiscount || 0), 0);
  const totalPromoDiscounts = enrollments.reduce((sum, e) => sum + (e.promoDiscount || 0), 0);
  const thisMonthCollected = realConfirmed
    .filter((e) => (e.paymentConfirmedAt || e.createdAt).slice(0, 7) === thisMonthKey)
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  const byCourseMap = new Map<string, FinanceCourseBreakdown>();
  for (const e of enrollments) {
    if (e.status !== "confirmed" && e.status !== "pending") continue;
    const key = e.courseId;
    const row = byCourseMap.get(key) || {
      courseId: e.courseId,
      courseName: e.courseName,
      confirmedCount: 0,
      collected: 0,
      pendingCount: 0,
      pendingAmount: 0,
    };
    if (e.status === "confirmed" && isReal(e)) {
      row.confirmedCount += 1;
      row.collected += e.amount || 0;
    } else if (e.status === "pending") {
      row.pendingCount += 1;
      row.pendingAmount += e.amount || 0;
    }
    byCourseMap.set(key, row);
  }
  const byCourse = [...byCourseMap.values()].sort((a, b) => b.collected - a.collected);

  const dayMap = new Map<string, number>();
  const thirtyDaysAgo = new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000);
  for (let cursor = new Date(thirtyDaysAgo); cursor <= now; cursor.setDate(cursor.getDate() + 1)) {
    dayMap.set(cursor.toISOString().slice(0, 10), 0);
  }
  for (const e of realConfirmed) {
    const key = dayKey(e.paymentConfirmedAt || e.createdAt);
    if (dayMap.has(key)) dayMap.set(key, (dayMap.get(key) || 0) + (e.amount || 0));
  }
  const last30Days = [...dayMap.entries()].map(([date, collected]) => ({ date, collected }));

  return {
    totalCollected,
    totalPending,
    totalLegacyUnconfirmed,
    confirmedCount: realConfirmed.length,
    pendingCount: pending.length,
    revokedCount: revoked.length,
    rejectedCount: rejected.length,
    totalReferralDiscounts,
    totalPromoDiscounts,
    thisMonthCollected,
    averageOrderValue: realConfirmed.length > 0 ? Math.round(totalCollected / realConfirmed.length) : 0,
    byCourse,
    last30Days,
  };
}
