import type { AnalyticsEvent, AnalyticsEventType, VisitorSession } from "@/types";

const MAX_EVENTS = 3000;

export function parseUserAgent(ua: string): { device: string; browser: string } {
  const lower = ua.toLowerCase();
  let device = "Desktop";
  if (/mobile|android|iphone|ipod/i.test(ua)) device = "Mobile";
  else if (/ipad|tablet/i.test(ua)) device = "Tablet";

  let browser = "Other";
  if (lower.includes("edg/")) browser = "Edge";
  else if (lower.includes("chrome/") && !lower.includes("edg/")) browser = "Chrome";
  else if (lower.includes("firefox/")) browser = "Firefox";
  else if (lower.includes("safari/") && !lower.includes("chrome/")) browser = "Safari";

  return { device, browser };
}

export function trimEvents(events: AnalyticsEvent[]): AnalyticsEvent[] {
  if (events.length <= MAX_EVENTS) return events;
  return events.slice(-MAX_EVENTS);
}

export function upsertSession(
  sessions: VisitorSession[],
  event: AnalyticsEvent
): VisitorSession[] {
  const idx = sessions.findIndex((s) => s.sessionId === event.sessionId);
  const now = event.createdAt;

  if (idx === -1) {
    return [
      {
        id: event.sessionId,
        visitorId: event.visitorId,
        sessionId: event.sessionId,
        firstSeen: now,
        lastSeen: now,
        pageViews: event.type === "page_view" ? 1 : 0,
        engagements: event.type !== "page_view" ? 1 : 0,
        landingPage: event.path,
        lastPage: event.path,
        pages: [event.path],
        referrer: event.referrer || "Direct",
        device: event.device || "Unknown",
        browser: event.browser || "Unknown",
        userId: event.userId,
        userName: event.userName,
        userEmail: event.userEmail,
      },
      ...sessions,
    ].slice(0, 500);
  }

  const session = { ...sessions[idx] };
  session.lastSeen = now;
  session.lastPage = event.path;
  if (event.type === "page_view") session.pageViews += 1;
  else session.engagements += 1;
  if (!session.pages.includes(event.path)) {
    session.pages = [...session.pages, event.path];
  }
  if (event.userId) {
    session.userId = event.userId;
    session.userName = event.userName;
    session.userEmail = event.userEmail;
  }

  const updated = [...sessions];
  updated[idx] = session;
  return updated.sort(
    (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
  );
}

export function buildAnalyticsSummary(
  sessions: VisitorSession[],
  events: AnalyticsEvent[]
) {
  const today = new Date().toDateString();
  const uniqueVisitors = new Set(sessions.map((s) => s.visitorId)).size;
  const todaySessions = sessions.filter(
    (s) => new Date(s.lastSeen).toDateString() === today
  );
  const pageViews = events.filter((e) => e.type === "page_view").length;
  const engagements = events.filter((e) => e.type !== "page_view").length;

  const pageCounts: Record<string, number> = {};
  events
    .filter((e) => e.type === "page_view")
    .forEach((e) => {
      pageCounts[e.path] = (pageCounts[e.path] || 0) + 1;
    });

  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }));

  const clickCounts: Record<string, number> = {};
  events
    .filter((e) => e.type === "click" && e.label)
    .forEach((e) => {
      const key = e.label!;
      clickCounts[key] = (clickCounts[key] || 0) + 1;
    });

  const topClicks = Object.entries(clickCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([label, count]) => ({ label, count }));

  return {
    uniqueVisitors,
    totalSessions: sessions.length,
    todayVisitors: new Set(todaySessions.map((s) => s.visitorId)).size,
    todaySessions: todaySessions.length,
    pageViews,
    engagements,
    topPages,
    topClicks,
  };
}

export function isValidEventType(type: string): type is AnalyticsEventType {
  return [
    "page_view",
    "click",
    "form_submit",
    "scroll_depth",
    "session_start",
    "session_end",
  ].includes(type);
}
