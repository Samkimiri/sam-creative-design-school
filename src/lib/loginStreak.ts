// Shared between the login API route (recording a login) and the login page
// (rendering the streak strip from a client-readable hint cookie), so both
// agree on what day it is. No framework-specific APIs, so it's safe to
// import from either a server route or a "use client" component.

// Nairobi is UTC+3 year-round (no DST) - matches the day-boundary logic
// already used elsewhere in the app (the weekend check in the community page).
export function nairobiDateString(date: Date = new Date()): string {
  const shifted = new Date(date.getTime() + 3 * 60 * 60 * 1000);
  return shifted.toISOString().slice(0, 10);
}

const MAX_TRACKED_DAYS = 14;

/** Adds today (Nairobi time) to a student's recent login dates: deduped, capped, sorted. */
export function recordLoginDate(existingDates: string[] | undefined, now: Date = new Date()): string[] {
  const set = new Set(existingDates || []);
  set.add(nairobiDateString(now));
  return [...set].sort().slice(-MAX_TRACKED_DAYS);
}

export interface StreakSummary {
  streak: number;
  /** oldest -> today, exactly 7 entries. */
  week: { date: string; filled: boolean; isToday: boolean }[];
}

/** Current consecutive-day streak and a 7-day (oldest->today) fill grid, from a set of login dates. */
export function summarizeStreak(dates: string[], now: Date = new Date()): StreakSummary {
  const dateSet = new Set(dates);
  const todayStr = nairobiDateString(now);

  const week: StreakSummary["week"] = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayStr = nairobiDateString(day);
    week.push({ date: dayStr, filled: dateSet.has(dayStr), isToday: dayStr === todayStr });
  }

  let streak = 0;
  // A streak that hasn't been renewed yet today isn't broken until the day
  // actually ends - so if today has no login yet, count from yesterday.
  let cursor = dateSet.has(todayStr) ? now : new Date(now.getTime() - 24 * 60 * 60 * 1000);
  while (dateSet.has(nairobiDateString(cursor))) {
    streak++;
    cursor = new Date(cursor.getTime() - 24 * 60 * 60 * 1000);
  }

  return { streak, week };
}
