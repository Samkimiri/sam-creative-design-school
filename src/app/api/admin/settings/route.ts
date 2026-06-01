import { NextResponse } from "next/server";
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
    nextIntake: auth.body.nextIntake,
    learningMode: auth.body.learningMode,
    classDuration: auth.body.classDuration,
    availableSeats: auth.body.availableSeats,
    weeklySchedule: auth.body.weeklySchedule,
    badge: auth.body.badge,
  });

  return NextResponse.json({ success: true, data: { intake } });
}
