import { getDBRecord, upsertDBRecord } from "@/lib/db";
import type { UpcomingIntakeSettings } from "@/types";

export const defaultUpcomingIntakeSettings: UpcomingIntakeSettings = {
  id: "upcoming-intake",
  title: "Join the Next SCDS Class",
  subtitle:
    "The next class is open for enrollment with a structured schedule, guided assignments, and mentor feedback so students know exactly what happens after joining.",
  nextIntake: "June 10, 2026",
  learningMode: "Online LMS + WhatsApp mentorship",
  classDuration: "2 to 6 weeks, based on course",
  availableSeats: "24 seats open",
  weeklySchedule: "Lessons unlock weekly, with assignments reviewed before certification.",
  badge: "Limited batch",
  updatedAt: new Date(0).toISOString(),
};

export async function getUpcomingIntakeSettings() {
  const saved = await getDBRecord<UpcomingIntakeSettings>(
    "site-settings.json",
    defaultUpcomingIntakeSettings.id
  );

  return {
    ...defaultUpcomingIntakeSettings,
    ...saved,
    id: defaultUpcomingIntakeSettings.id,
  };
}

export async function saveUpcomingIntakeSettings(input: Record<string, unknown>) {
  const current = await getUpcomingIntakeSettings();
  const updated: UpcomingIntakeSettings = {
    ...current,
    title: clean(input.title, current.title, 90),
    subtitle: clean(input.subtitle, current.subtitle, 260),
    nextIntake: clean(input.nextIntake, current.nextIntake, 60),
    learningMode: clean(input.learningMode, current.learningMode, 90),
    classDuration: clean(input.classDuration, current.classDuration, 90),
    availableSeats: clean(input.availableSeats, current.availableSeats, 60),
    weeklySchedule: clean(input.weeklySchedule, current.weeklySchedule, 180),
    badge: clean(input.badge, current.badge, 40),
    id: defaultUpcomingIntakeSettings.id,
    updatedAt: new Date().toISOString(),
  };

  await upsertDBRecord("site-settings.json", updated);
  return updated;
}

function clean(value: unknown, fallback: string, maxLength: number) {
  const text = String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
  return text || fallback;
}
