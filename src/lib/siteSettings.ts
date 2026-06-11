import { getDBRecord, upsertDBRecord } from "@/lib/db";
import type { UpcomingIntakeSettings } from "@/types";

export const defaultUpcomingIntakeSettings: UpcomingIntakeSettings = {
  id: "upcoming-intake",
  title: "Join the Next SCDS Class",
  subtitle:
    "The next class is open for enrollment with a structured schedule, guided assignments, and mentor feedback so students know exactly what happens after joining.",
  countdownTitle: "Live Intake Countdown",
  nextIntake: "July 6, 2026",
  nextIntakeLabel: "Next Intake",
  learningMode: "Online LMS + WhatsApp mentorship",
  learningModeLabel: "Learning Mode",
  classDuration: "2 to 6 weeks, based on course",
  classDurationLabel: "Class Duration",
  availableSeats: "280 seats total",
  availableSeatsLabel: "Available Seats",
  weeklyScheduleLabel: "Weekly Schedule",
  weeklySchedule: "Lessons unlock weekly, with assignments reviewed before certification.",
  badge: "Limited batch",
  updatedAt: new Date(0).toISOString(),
};

export async function getUpcomingIntakeSettings() {
  const saved = await getDBRecord<UpcomingIntakeSettings>(
    "site-settings.json",
    defaultUpcomingIntakeSettings.id
  );
  const savedSettings = saved
    ? {
        ...saved,
        nextIntake:
          saved.nextIntake === "June 10, 2026" || saved.nextIntake === "July 1, 2026"
            ? defaultUpcomingIntakeSettings.nextIntake
            : saved.nextIntake,
        availableSeats:
          saved.availableSeats === "24 seats open" || saved.availableSeats === "200 seats open"
            ? defaultUpcomingIntakeSettings.availableSeats
            : saved.availableSeats,
      }
    : saved;

  return {
    ...defaultUpcomingIntakeSettings,
    ...savedSettings,
    id: defaultUpcomingIntakeSettings.id,
  };
}

export async function saveUpcomingIntakeSettings(input: Record<string, unknown>) {
  const current = await getUpcomingIntakeSettings();
  const updated: UpcomingIntakeSettings = {
    ...current,
    title: clean(input.title, current.title, 90),
    subtitle: clean(input.subtitle, current.subtitle, 260),
    countdownTitle: clean(input.countdownTitle, current.countdownTitle, 50),
    nextIntake: clean(input.nextIntake, current.nextIntake, 60),
    nextIntakeLabel: clean(input.nextIntakeLabel, current.nextIntakeLabel, 40),
    learningMode: clean(input.learningMode, current.learningMode, 90),
    learningModeLabel: clean(input.learningModeLabel, current.learningModeLabel, 40),
    classDuration: clean(input.classDuration, current.classDuration, 90),
    classDurationLabel: clean(input.classDurationLabel, current.classDurationLabel, 40),
    availableSeats: clean(input.availableSeats, current.availableSeats, 60),
    availableSeatsLabel: clean(input.availableSeatsLabel, current.availableSeatsLabel, 40),
    weeklyScheduleLabel: clean(input.weeklyScheduleLabel, current.weeklyScheduleLabel, 40),
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
