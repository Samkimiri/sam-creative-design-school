import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Gamepad2 } from "lucide-react";
import StudyBreakGames from "@/components/StudyBreakGames";

export const metadata: Metadata = {
  title: "Study Break Games",
  description:
    "Short offline-friendly games for Sam Creative Design School students to refresh before continuing class.",
};

export default function GamesPage() {
  return (
    <div className="bg-light-gray pt-32 pb-20">
      <section className="bg-dark py-16 text-white">
        <div className="container mx-auto px-6">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
            <Gamepad2 className="h-5 w-5" aria-hidden="true" />
            Study Break
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
            Quick games to refresh your mind before continuing class.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
            Use these when you are tired, offline, or need a short reset. They are light, fast, and built into the SCDS app.
          </p>
          <Link
            href="/lms"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Return to LMS
          </Link>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12">
        <StudyBreakGames />
      </main>
    </div>
  );
}
