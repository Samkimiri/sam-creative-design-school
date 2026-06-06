"use client";

import { useEffect, useMemo, useState } from "react";

interface IntakeCountdownProps {
  targetDate: string;
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

export default function IntakeCountdown({ targetDate }: IntakeCountdownProps) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
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
        <p className="text-xs font-black uppercase tracking-widest text-primary">Countdown</p>
        <p className="mt-2 text-lg font-extrabold text-dark">Next intake date will be announced soon.</p>
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
    <div className="rounded-2xl border border-primary/20 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-primary">Live Intake Countdown</p>
          <p className="mt-1 text-sm font-semibold text-gray-500">
            {remaining.ended ? "This intake has started." : `Counting down to ${targetDate}`}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((unit) => (
          <div key={unit.label} className="rounded-xl bg-light-gray p-3 text-center">
            <p className="text-xl font-black text-dark sm:text-2xl">{String(unit.value).padStart(2, "0")}</p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-gray-400">{unit.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

