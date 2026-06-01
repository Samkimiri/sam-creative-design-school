import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { buildAnalyticsSummary } from "@/lib/analytics";
import type { AnalyticsEvent, VisitorSession } from "@/types";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

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
