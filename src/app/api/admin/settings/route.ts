import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getUpcomingIntakeSettings,
  saveUpcomingIntakeSettings,
} from "@/lib/siteSettings";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const intake = await getUpcomingIntakeSettings();
  return NextResponse.json({ success: true, data: { intake } });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const intake = await saveUpcomingIntakeSettings({
    title: auth.body.title,
    subtitle: auth.body.subtitle,
    countdownTitle: auth.body.countdownTitle,
    nextIntake: auth.body.nextIntake,
    nextIntakeLabel: auth.body.nextIntakeLabel,
    learningMode: auth.body.learningMode,
    learningModeLabel: auth.body.learningModeLabel,
    classDuration: auth.body.classDuration,
    classDurationLabel: auth.body.classDurationLabel,
    availableSeats: auth.body.availableSeats,
    availableSeatsLabel: auth.body.availableSeatsLabel,
    weeklyScheduleLabel: auth.body.weeklyScheduleLabel,
    weeklySchedule: auth.body.weeklySchedule,
    badge: auth.body.badge,
  });
  revalidatePath("/");

  return NextResponse.json({ success: true, data: { intake } });
}
