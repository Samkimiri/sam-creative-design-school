import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { buildAnalyticsSummary } from "@/lib/analytics";
import type { AnalyticsEvent, VisitorSession } from "@/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sam-admin-2026";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body;

  const session = await getSession();
  const isAdminSession = session?.user.role === "admin";

  if (password !== ADMIN_PASSWORD && !isAdminSession) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const [sessions, events] = await Promise.all([
    getDB<VisitorSession>("analytics-sessions.json"),
    getDB<AnalyticsEvent>("analytics-events.json"),
  ]);

  const summary = buildAnalyticsSummary(sessions, events);
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 100);

  return NextResponse.json({
    success: true,
    summary,
    sessions: sessions.slice(0, 200),
    events: recentEvents,
  });
}
