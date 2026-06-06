"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Gamepad2, X } from "lucide-react";

const ONE_HOUR_MS = 60 * 60 * 1000;
const DISMISS_KEY = "scds-study-break-dismissed-at";

export default function StudyBreakPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const activeTimeRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY) || 0);
    if (Date.now() - dismissedAt < ONE_HOUR_MS) return;

    const tick = () => {
      const now = Date.now();
      if (document.visibilityState === "visible") {
        if (lastTickRef.current) activeTimeRef.current += now - lastTickRef.current;
        if (activeTimeRef.current >= ONE_HOUR_MS) {
          setShowPrompt(true);
        }
      }
      lastTickRef.current = now;
    };

    lastTickRef.current = Date.now();
    const interval = window.setInterval(tick, 30000);

    return () => window.clearInterval(interval);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-primary/25 bg-white p-4 text-dark shadow-2xl shadow-black/20 sm:left-auto sm:right-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Gamepad2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold">Time for a short refresh?</p>
          <p className="mt-1 text-xs leading-5 text-gray-600">
            You have been learning for a while. Take a quick study break, then continue class sharper.
          </p>
          <Link
            href="/games"
            onClick={dismiss}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <Gamepad2 className="h-4 w-4" aria-hidden="true" />
            Open Games
          </Link>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-dark"
          aria-label="Dismiss study break prompt"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
