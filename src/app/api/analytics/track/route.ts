import { NextResponse } from "next/server";
import { appendDBRecord, getDBRecord, upsertDBRecord } from "@/lib/db";
import {
  isValidEventType,
  parseUserAgent,
  upsertSession,
} from "@/lib/analytics";
import type { AnalyticsEvent, VisitorSession } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      visitorId,
      sessionId,
      type,
      path,
      label,
      metadata,
      userId,
      userName,
      userEmail,
      referrer,
    } = body;

    if (!visitorId || !sessionId || !type || !path) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (!isValidEventType(type)) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ success: true });
    }

    const ua = request.headers.get("user-agent") || "";
    const { device, browser } = parseUserAgent(ua);

    const event: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      visitorId,
      sessionId,
      type,
      path,
      label,
      metadata,
      userId,
      userName,
      userEmail,
      referrer: referrer || request.headers.get("referer") || "Direct",
      device,
      browser,
      createdAt: new Date().toISOString(),
    };

    const currentSession = await getDBRecord<VisitorSession>(
      "analytics-sessions.json",
      sessionId
    );
    const updatedSessions = upsertSession(currentSession ? [currentSession] : [], event);
    const updatedSession = updatedSessions.find((session) => session.sessionId === event.sessionId);

    await Promise.all([
      appendDBRecord("analytics-events.json", event),
      updatedSession
        ? upsertDBRecord("analytics-sessions.json", updatedSession, { idKey: "sessionId" })
        : Promise.resolve(),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
