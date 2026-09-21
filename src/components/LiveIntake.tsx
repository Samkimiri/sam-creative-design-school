"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { UpcomingIntakeSettings } from "@/types";

const POLL_INTERVAL_MS = 30000;

const LiveIntakeContext = createContext<UpcomingIntakeSettings | null>(null);

// Keeps every intake/cohort detail on the site in sync with what the admin last
// saved. The server-rendered page can be up to a few minutes stale (ISR), and a tab
// that is already open never re-renders on its own, so this re-checks on mount, on
// an interval, and whenever the visitor returns to the tab.
export function LiveIntakeProvider({ initial, children }: { initial: UpcomingIntakeSettings; children: ReactNode }) {
  const [intake, setIntake] = useState(initial);
  const latestUpdatedAt = useRef(initial.updatedAt);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        const res = await fetch("/api/intake", { cache: "no-store" });
        const json = await res.json();
        if (cancelled || !json?.success || !json.data) return;
        const next = json.data as UpcomingIntakeSettings;
        if (next.updatedAt === latestUpdatedAt.current) return;
        latestUpdatedAt.current = next.updatedAt;
        setIntake(next);
      } catch {
        // Keep showing the last known settings if a check fails.
      }
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };

    void check();
    const interval = window.setInterval(check, POLL_INTERVAL_MS);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
  }, []);

  return <LiveIntakeContext.Provider value={intake}>{children}</LiveIntakeContext.Provider>;
}

export function useLiveIntake() {
  return useContext(LiveIntakeContext);
}

type TextField = {
  [K in keyof UpcomingIntakeSettings]: UpcomingIntakeSettings[K] extends string ? K : never;
}[keyof UpcomingIntakeSettings];

// Renders one intake field as text, showing the live value when available and
// the server-rendered value otherwise.
export function LiveIntakeField({ field, fallback }: { field: TextField; fallback: string }) {
  const intake = useLiveIntake();
  return <>{intake ? intake[field] : fallback}</>;
}
