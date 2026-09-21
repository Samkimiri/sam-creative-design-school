"use client";

import { useEffect, useMemo, useState } from "react";
import { Zap } from "lucide-react";
import { useLiveIntake } from "@/components/LiveIntake";

interface IntakeCountdownProps {
  targetDate: string;
  title?: string;
}

function getRemaining(target: number) {
  const distance = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(distance / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    ended: distance === 0,
  };
}

function UnitTile({ value, label }: { value: number; label: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-b from-light-gray to-white px-2 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 sm:py-6">
      <div className="relative h-9 overflow-hidden sm:h-12">
        <p
          key={value}
          className="countdown-unit-in absolute inset-0 flex items-center justify-center bg-gradient-to-b from-dark to-dark/70 bg-clip-text text-3xl font-black tabular-nums text-transparent sm:text-5xl"
        >
          {String(value).padStart(2, "0")}
        </p>
      </div>
      <p className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</p>
    </div>
  );
}

export default function IntakeCountdown({ targetDate, title = "Live Intake Countdown" }: IntakeCountdownProps) {
  // The shared LiveIntakeProvider keeps these in sync with whatever the admin last
  // saved, including in tabs that were already open; props are the server-rendered fallback.
  const live = useLiveIntake();
  const liveTargetDate = live?.nextIntake ?? targetDate;
  const liveTitle = live?.countdownTitle ?? title;

  const target = useMemo(() => new Date(liveTargetDate).getTime(), [liveTargetDate]);
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    if (!Number.isFinite(target)) return;

    const tick = () => setRemaining(getRemaining(target));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  if (!Number.isFinite(target)) {
    return (
      <div className="rounded-3xl border border-primary/20 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="h-10 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary">{liveTitle}</p>
            <p className="mt-1 text-lg font-extrabold text-dark">Next intake date will be announced soon.</p>
          </div>
        </div>
      </div>
    );
  }

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="premium-card relative overflow-hidden rounded-3xl border border-primary/15 bg-white p-5 shadow-xl shadow-primary/5 sm:p-6">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-3 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Zap className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary">{liveTitle}</p>
            <p className="mt-0.5 text-sm font-semibold text-gray-500">
              {remaining.ended ? "This intake has started." : `Counting down to ${liveTargetDate}`}
            </p>
          </div>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-primary">
          <span className="relative flex h-1.5 w-1.5">
            {!remaining.ended && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" aria-hidden="true" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          </span>
          {remaining.ended ? "Open now" : "Live"}
        </span>
      </div>
      <div className="relative grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <UnitTile key={unit.label} value={unit.value} label={unit.label} />
        ))}
      </div>
    </div>
  );
}
