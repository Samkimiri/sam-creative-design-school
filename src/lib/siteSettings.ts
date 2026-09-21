import { getDBRecord, upsertDBRecord } from "@/lib/db";
import type { UpcomingIntakeSettings } from "@/types";

export const defaultUpcomingIntakeSettings: UpcomingIntakeSettings = {
  id: "upcoming-intake",
  title: "Join the Next SCDS Class",
  subtitle:
    "The next class is open for enrollment with a structured schedule, guided assignments, and mentor feedback so students know exactly what happens after joining.",
  countdownTitle: "Live Intake Countdown",
  nextIntake: "October 5, 2026",
  nextIntakeLabel: "Next Intake",
  learningMode: "Online LMS + Zoom classes + WhatsApp mentorship",
  learningModeLabel: "Learning Mode",
  classDuration: "2 to 6 weeks, based on course",
  classDurationLabel: "Class Duration",
  availableSeats: "280 seats total",
  availableSeatsLabel: "Available Seats",
  weeklyScheduleLabel: "Weekly Schedule",
  weeklySchedule: "Classes will happen on Zoom, with lessons unlocking weekly and assignments reviewed before certification.",
  badge: "Limited batch",
  currentCohort: "Cohort 11",
  currentCohortStatus: "In session",
  nextCohort: "Cohort 12",
  cohortStudents: "",
  cohortHighlights: "",
  updatedAt: new Date(0).toISOString(),
};

export async function getUpcomingIntakeSettings() {
  let saved: UpcomingIntakeSettings | null = null;
  try {
    saved = await getDBRecord<UpcomingIntakeSettings>(
      "site-settings.json",
      defaultUpcomingIntakeSettings.id
    );
  } catch (error) {
    console.error("Intake settings read failed; using defaults:", error);
  }

  const savedSettings = saved
    ? {
        ...saved,
        nextIntake:
          saved.nextIntake === "June 10, 2026" || saved.nextIntake === "July 1, 2026" || saved.nextIntake === "July 6, 2026"
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
    currentCohort: cleanOptional(input.currentCohort, current.currentCohort, 30),
    currentCohortStatus: cleanOptional(input.currentCohortStatus, current.currentCohortStatus, 30),
    nextCohort: cleanOptional(input.nextCohort, current.nextCohort, 30),
    cohortStudents: cleanOptional(input.cohortStudents, current.cohortStudents, 40),
    cohortHighlights: cleanMultiline(input.cohortHighlights, current.cohortHighlights, 400),
    id: defaultUpcomingIntakeSettings.id,
    updatedAt: new Date().toISOString(),
  };

  await upsertDBRecord("site-settings.json", updated);
  return updated;
}

// Cohort fields may be deliberately cleared by an admin (e.g. hide the announcement
// bar between cohorts), so an empty string is saved as empty instead of falling back.
function cleanOptional(value: unknown, fallback: string, maxLength: number) {
  if (value === undefined || value === null) return fallback;
  return String(value).trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function cleanMultiline(value: unknown, fallback: string, maxLength: number) {
  if (value === undefined || value === null) return fallback;
  return String(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n")
    .slice(0, maxLength);
}

function clean(value: unknown, fallback: string, maxLength: number) {
  const text = String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
  return text || fallback;
}
