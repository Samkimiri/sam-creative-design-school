"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

const VISITOR_KEY = "scds_visitor_id";
const SESSION_KEY = "scds_session_id";

function getOrCreateId(storage: Storage, key: string, prefix: string): string {
  let id = storage.getItem(key);
  if (!id) {
    id = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    storage.setItem(key, id);
  }
  return id;
}

function shouldTrack(path: string): boolean {
  return !path.startsWith("/admin") && !path.startsWith("/api");
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const userRef = useRef<{
    userId?: string;
    userName?: string;
    userEmail?: string;
  }>({});
  const scrollSent = useRef<Set<number>>(new Set());

  const track = useCallback(
    (
      type: string,
      extra?: { label?: string; metadata?: Record<string, string> }
    ) => {
      if (!pathname || !shouldTrack(pathname)) return;

      const payload = {
        visitorId: getOrCreateId(localStorage, VISITOR_KEY, "v"),
        sessionId: getOrCreateId(sessionStorage, SESSION_KEY, "s"),
        type,
        path: pathname,
        label: extra?.label,
        metadata: extra?.metadata,
        referrer: document.referrer || "Direct",
        ...userRef.current,
      };

      const body = JSON.stringify(payload);

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/analytics/track",
          new Blob([body], { type: "application/json" })
        );
      } else {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    },
    [pathname]
  );

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.student) {
          userRef.current = {
            userId: data.user?.id,
            userName: data.student.name,
            userEmail: data.student.email,
          };
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!pathname || !shouldTrack(pathname)) return;

    scrollSent.current = new Set();
    track("session_start");
    track("page_view");

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const pct = Math.round((window.scrollY / maxScroll) * 100);
      for (const threshold of [25, 50, 75, 100]) {
        if (pct >= threshold && !scrollSent.current.has(threshold)) {
          scrollSent.current.add(threshold);
          track("scroll_depth", {
            metadata: { depth: String(threshold) },
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [data-track], input[type=submit]"
      );
      if (!el || el.closest("[data-no-track]")) return;

      const label =
        el.getAttribute("data-track") ||
        el.getAttribute("aria-label") ||
        el.getAttribute("href") ||
        (el as HTMLElement).innerText?.trim().slice(0, 80) ||
        el.tagName;

      track("click", { label });
    };

    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      if (form.closest("[data-no-track]")) return;
      track("form_submit", {
        label: form.getAttribute("name") || form.id || "form",
      });
    };

    const onUnload = () => track("session_end");

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [pathname, track]);

  return null;
}
