"use client";

import { useEffect, useMemo, useState } from "react";

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

export default function IntakeCountdown({ targetDate, title = "Live Intake Countdown" }: IntakeCountdownProps) {
  // The page itself is revalidated the moment an admin saves a new intake date, so a
  // fresh page load always gets the right date. But a tab a visitor already has open
  // would otherwise stay locked to whatever date it loaded with - polling here means
  // an admin changing the date is picked up by open tabs too, not just new page loads.
  const [liveTargetDate, setLiveTargetDate] = useState(targetDate);
  const [liveTitle, setLiveTitle] = useState(title);

  useEffect(() => {
    setLiveTargetDate(targetDate);
  }, [targetDate]);

  useEffect(() => {
    setLiveTitle(title);
  }, [title]);

  useEffect(() => {
    let cancelled = false;

    const pollIntake = async () => {
      try {
        const res = await fetch("/api/intake", { cache: "no-store" });
        const json = await res.json();
        if (cancelled || !json?.success) return;
        if (json.data?.nextIntake) setLiveTargetDate(json.data.nextIntake);
        if (json.data?.countdownTitle) setLiveTitle(json.data.countdownTitle);
      } catch {
        // Keep showing the last known date if a poll fails
      }
    };

    const interval = window.setInterval(pollIntake, 45000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

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
      <div className="rounded-2xl border border-primary/20 bg-white p-5 shadow-sm">
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
    <div className="overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-primary">{liveTitle}</p>
          <p className="mt-1 text-sm font-semibold text-gray-500">
            {remaining.ended ? "This intake has started." : `Counting down to ${liveTargetDate}`}
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">
          {remaining.ended ? "Open now" : "Live"}
        </span>
      </div>
      <div className="grid grid-cols-4 divide-x divide-gray-100">
        {units.map((unit) => (
          <div key={unit.label} className="min-h-24 bg-white px-2 py-5 text-center transition-colors hover:bg-light-gray sm:min-h-28">
            <p className="text-2xl font-black tabular-nums text-dark sm:text-4xl">{String(unit.value).padStart(2, "0")}</p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">{unit.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
