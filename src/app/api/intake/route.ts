import { NextResponse } from "next/server";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";

export async function GET() {
  const intake = await getUpcomingIntakeSettings();

  return NextResponse.json(
    {
      success: true,
      data: {
        nextIntake: intake.nextIntake,
        countdownTitle: intake.countdownTitle,
      },
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
