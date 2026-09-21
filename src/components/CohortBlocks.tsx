"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, GraduationCap, Sparkles, X } from "lucide-react";
import { useLiveIntake } from "@/components/LiveIntake";

const BAR_HEIGHT = "36px";
const HIDDEN_PREFIXES = ["/admin", "/lms"];

// Slim announcement strip above the navbar: which cohort is running and when the
// next one opens. It disappears on its own when the admin clears the cohort name.
export function CohortAnnouncementBar() {
  const intake = useLiveIntake();
  const pathname = usePathname();
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);

  const cohort = intake?.currentCohort ?? "";
  const key = `${cohort}|${intake?.nextCohort ?? ""}|${intake?.nextIntake ?? ""}`;
  const onHiddenRoute = HIDDEN_PREFIXES.some((prefix) => pathname?.startsWith(prefix));
  const visible = Boolean(cohort) && !onHiddenRoute && dismissedKey !== key;

  useEffect(() => {
    try {
      setDismissedKey(window.sessionStorage.getItem("scds-cohort-bar-dismissed"));
    } catch {
      // Storage blocked - the bar simply stays visible.
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--cohort-bar-h", visible ? BAR_HEIGHT : "0px");
  }, [visible]);

  if (!visible || !intake) return null;

  const dismiss = () => {
    setDismissedKey(key);
    try {
      window.sessionStorage.setItem("scds-cohort-bar-dismissed", key);
    } catch {
      // Ignore storage failures.
    }
  };

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 bg-dark px-10 text-white"
      style={{ height: BAR_HEIGHT }}
      role="region"
      aria-label="Cohort announcement"
    >
      <p className="truncate text-[11px] font-bold sm:text-xs">
        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">{cohort}</span>
        {intake.currentCohortStatus ? <span className="ml-2 text-white/80">{intake.currentCohortStatus}</span> : null}
        {intake.nextCohort ? (
          <span className="hidden text-white/80 sm:inline">
            {" "}
            · {intake.nextCohort} opens {intake.nextIntake}
          </span>
        ) : null}
      </p>
      <Link
        href="/enroll"
        className="hidden shrink-0 items-center gap-1 text-xs font-black text-primary-light hover:text-white sm:inline-flex"
      >
        Reserve a seat <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

// "Cohort 11 - In session" beside "Cohort 12 - Enrolling", shown inside the intake card.
export function CohortStatusChips() {
  const intake = useLiveIntake();
  if (!intake || (!intake.currentCohort && !intake.nextCohort)) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {intake.currentCohort ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          {intake.currentCohort}
          {intake.currentCohortStatus ? <span className="text-white/60">· {intake.currentCohortStatus}</span> : null}
        </span>
      ) : null}
      {intake.nextCohort ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-white">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          {intake.nextCohort}
          <span className="text-white/80">· Enrolling now</span>
        </span>
      ) : null}
    </div>
  );
}

// "Meet Cohort 11": social proof strip fed by the admin's highlights list.
export function CohortSpotlight() {
  const intake = useLiveIntake();
  const highlights = (intake?.cohortHighlights ?? "").split("\n").filter(Boolean);
  if (!intake || !intake.currentCohort || (highlights.length === 0 && !intake.cohortStudents)) return null;

  return (
    <section className="bg-light-gray py-14">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl rounded-3xl border border-primary/15 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">Meet {intake.currentCohort}</p>
                <h2 className="text-xl font-extrabold text-dark md:text-2xl">
                  {intake.currentCohortStatus ? `${intake.currentCohortStatus} right now` : "Learning right now"}
                </h2>
              </div>
            </div>
            {intake.cohortStudents ? (
              <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-black text-primary">{intake.cohortStudents}</span>
            ) : null}
          </div>
          {highlights.length > 0 ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((line) => (
                <li key={line} className="flex items-start gap-3 rounded-2xl bg-light-gray p-4 text-sm font-semibold leading-6 text-dark">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
