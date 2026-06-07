import type { DiscountSettings, Enrollment, PromoCode } from "@/types";
import { getDBRecord, upsertDBRecord } from "@/lib/db";
import type { Course } from "@/data/courses";

export const defaultDiscountSettings: DiscountSettings = {
  id: "discount-manager",
  referral: {
    active: true,
    studentDiscountPercent: 10,
    rewardNote: "Referring students help new learners save during enrollment. Admin can review referral records from enrollments.",
  },
  promoCodes: [],
  updatedAt: new Date(0).toISOString(),
};

export async function getDiscountSettings() {
  const saved = await getDBRecord<DiscountSettings>("site-settings.json", defaultDiscountSettings.id);
  return normalizeDiscountSettings(saved);
}

export async function saveDiscountSettings(input: Partial<DiscountSettings>) {
  const current = await getDiscountSettings();
  const updated = normalizeDiscountSettings({
    ...current,
    ...input,
    id: defaultDiscountSettings.id,
    updatedAt: new Date().toISOString(),
  });

  await upsertDBRecord("site-settings.json", updated);
  return updated;
}

export function normalizePromoCode(value: unknown) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 32);
}

export function calculateReferralDiscount(amount: number, settings: DiscountSettings) {
  if (!settings.referral.active || amount <= 0) return 0;
  const percent = Math.min(100, Math.max(0, settings.referral.studentDiscountPercent));
  return Math.round(amount * (percent / 100));
}

export function applyPromoCode(input: {
  amount: number;
  selectedCourses: Course[];
  promoCode: string;
  settings: DiscountSettings;
  enrollments: Enrollment[];
  now?: Date;
}) {
  const code = normalizePromoCode(input.promoCode);
  if (!code) return { valid: false, discount: 0, message: "", promo: undefined as PromoCode | undefined };

  const promo = input.settings.promoCodes.find((item) => item.active && normalizePromoCode(item.code) === code);
  if (!promo) return { valid: false, discount: 0, message: "Promo code is not active.", promo: undefined };

  const now = input.now || new Date();
  if (promo.startsAt && new Date(promo.startsAt).getTime() > now.getTime()) {
    return { valid: false, discount: 0, message: "Promo code is not active yet.", promo };
  }
  if (promo.expiresAt && new Date(promo.expiresAt).getTime() < now.getTime()) {
    return { valid: false, discount: 0, message: "Promo code has expired.", promo };
  }

  const usedCount = input.enrollments.filter((enrollment) => normalizePromoCode(enrollment.promoCode) === code && enrollment.status !== "failed").length;
  if (promo.usageLimit && usedCount >= promo.usageLimit) {
    return { valid: false, discount: 0, message: "Promo code usage limit has been reached.", promo };
  }

  const eligibleCourses = promo.courseIds?.length
    ? input.selectedCourses.filter((course) => promo.courseIds?.includes(course.id))
    : input.selectedCourses;
  const eligibleAmount = eligibleCourses.reduce((sum, course) => sum + course.price, 0);
  if (eligibleAmount <= 0) {
    return { valid: false, discount: 0, message: "Promo code does not apply to the selected course.", promo };
  }

  const rawDiscount = promo.type === "percentage"
    ? Math.round(eligibleAmount * (Math.min(100, Math.max(0, promo.value)) / 100))
    : Math.round(Math.max(0, promo.value));
  const discount = Math.min(input.amount, eligibleAmount, rawDiscount);

  return {
    valid: discount > 0,
    discount,
    message: discount > 0 ? "Promo code applied." : "Promo code has no discount value.",
    promo,
  };
}

function normalizeDiscountSettings(input?: Partial<DiscountSettings> | null): DiscountSettings {
  return {
    id: defaultDiscountSettings.id,
    referral: {
      ...defaultDiscountSettings.referral,
      ...(input?.referral || {}),
      studentDiscountPercent: Math.min(100, Math.max(0, Number(input?.referral?.studentDiscountPercent ?? defaultDiscountSettings.referral.studentDiscountPercent))),
      active: Boolean(input?.referral?.active ?? defaultDiscountSettings.referral.active),
    },
    promoCodes: Array.isArray(input?.promoCodes)
      ? input.promoCodes.map(normalizePromo).filter((promo) => promo.code)
      : [],
    updatedAt: input?.updatedAt || defaultDiscountSettings.updatedAt,
  };
}

function normalizePromo(input: PromoCode): PromoCode {
  const now = new Date().toISOString();
  return {
    id: String(input.id || `PROMO-${Date.now()}`),
    code: normalizePromoCode(input.code),
    description: String(input.description || "").trim().slice(0, 120),
    type: input.type === "fixed" ? "fixed" : "percentage",
    value: Math.max(0, Number(input.value) || 0),
    active: Boolean(input.active),
    startsAt: input.startsAt ? String(input.startsAt) : undefined,
    expiresAt: input.expiresAt ? String(input.expiresAt) : undefined,
    usageLimit: input.usageLimit ? Math.max(1, Math.round(Number(input.usageLimit))) : undefined,
    courseIds: Array.isArray(input.courseIds) ? input.courseIds.map(String).filter(Boolean) : [],
    createdAt: input.createdAt || now,
    updatedAt: now,
  };
}

