import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Brain, Gamepad2, Sparkles, Timer, Trophy } from "lucide-react";
import StudyBreakGames from "@/components/StudyBreakGames";

export const metadata: Metadata = {
  title: "Study Break Games",
  description:
    "Short offline-friendly games including Sudoku, Snake, memory, and creative puzzles for Sam Creative Design School students.",
};

export default function GamesPage() {
  const highlights = [
    { label: "Logic", value: "Sudoku", Icon: Brain },
    { label: "Speed", value: "Snake", Icon: Gamepad2 },
    { label: "Focus", value: "Memory", Icon: Trophy },
  ];

  return (
    <div className="bg-[#F4F8FF] pb-20 pt-24">
      <section className="relative isolate overflow-hidden bg-slate-950 py-16 text-white md:py-20">
        <div className="absolute inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(5,9,20,0.96),rgba(12,34,58,0.88),rgba(26,143,227,0.34))]" />
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-widest text-primary-light backdrop-blur">
                <Gamepad2 className="h-5 w-5" aria-hidden="true" />
                SCDS Games Centre
              </p>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
                Modern focus games for short, useful study breaks.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
                Play sharper versions of Snake, Sudoku, memory, reflex, word, sequence, and layout games. They are built to feel more interactive while keeping breaks short and productive.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#play"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Start Playing
                </Link>
                <Link
                  href="/lms"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Return to LMS
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="grid gap-3">
                {highlights.map(({ Icon, ...item }) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-white/45">{item.label}</p>
                        <p className="font-extrabold text-white">{item.value}</p>
                      </div>
                    </div>
                    <Timer className="h-5 w-5 text-primary-light" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-slate-800">
                Recommended: play one game for 3 to 5 minutes, then continue your lesson.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main id="play" className="container mx-auto px-6 py-12">
        <StudyBreakGames />
      </main>
    </div>
  );
}
