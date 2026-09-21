import { NextResponse } from "next/server";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  const intake = await getUpcomingIntakeSettings();

  return NextResponse.json(
    {
      success: true,
      data: intake,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
