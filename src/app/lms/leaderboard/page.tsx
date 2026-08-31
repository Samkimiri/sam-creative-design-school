import Link from "next/link";
import type { Metadata } from "next";
import { Award, BookOpenCheck, GraduationCap, Medal, MessageCircle, Sparkles, Trophy } from "lucide-react";
import { getLeaderboardEntries, type LeaderboardEntry } from "@/lib/leaderboard";

function Avatar({ entry, className }: { entry: LeaderboardEntry; className: string }) {
  if (entry.avatar) {
    return <img src={entry.avatar} alt={entry.name} className={`${className} object-cover`} />;
  }
  return (
    <div className={`${className} grid place-items-center bg-primary/10 font-black text-primary`}>
      {entry.name.charAt(0).toUpperCase()}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Student Leaderboard | Sam Creative Design School",
  description:
    "See the most active learners at Sam Creative Design School ranked by lessons completed, quizzes, course activity, and certificates.",
};

function formatDate(date: string) {
  if (!date) return "No recent activity";
  return new Intl.DateTimeFormat("en-KE", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}

export default async function LMSLeaderboardPage() {
  const entries = await getLeaderboardEntries();
  const topThree = entries.slice(0, 3);
  const remaining = entries.slice(3);

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#F6FAFF] pb-20 pt-28">
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-white/80" aria-hidden="true" />

      <main className="container mx-auto px-4 sm:px-6">
        <section className="mb-8 overflow-hidden rounded-3xl bg-dark p-6 text-white shadow-2xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-widest text-primary-light">Student Leaderboard</p>
              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
                Celebrate learners who keep showing up.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                Rankings combine completed lessons, courses studied, quiz activity, certificates, and recent LMS activity.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/lms" className="rounded-xl bg-primary px-5 py-3 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-light">
                  Back to LMS
                </Link>
                <Link href="/courses" className="rounded-xl border border-white/20 px-5 py-3 text-center font-bold text-white transition hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light">
                  Study More Courses
                </Link>
                <Link href="/lms/community" className="rounded-xl border border-white/20 px-5 py-3 text-center font-bold text-white transition hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light">
                  Join the Community
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-white">
                  <Trophy className="h-8 w-8" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-light">Current leaders</p>
                  <p className="text-3xl font-black">{entries.length}</p>
                  <p className="text-sm text-white/65">enrolled students ranked</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          {topThree.map((entry, index) => (
            <article key={entry.studentId} className="rounded-3xl border border-white bg-white p-5 text-center shadow-sm ring-1 ring-slate-900/5">
              <div className="relative mx-auto mb-4 h-16 w-16">
                <Avatar entry={entry} className="h-16 w-16 rounded-2xl" />
                <div className="absolute -bottom-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-primary text-white shadow-md">
                  {index === 0 ? <Trophy className="h-3.5 w-3.5" aria-hidden="true" /> : <Medal className="h-3.5 w-3.5" aria-hidden="true" />}
                </div>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">Rank {index + 1}</p>
              <h2 className="mt-2 text-xl font-extrabold text-dark">{entry.name}</h2>
              <p className="mt-1 text-sm font-bold text-primary">{entry.rankLabel}</p>
              <p className="mt-4 text-3xl font-black text-dark">{entry.score}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">points</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl border border-white bg-white shadow-sm ring-1 ring-slate-900/5">
          <div className="border-b border-gray-100 p-5 md:p-6">
            <p className="text-sm font-black uppercase tracking-widest text-primary">Full Ranking</p>
            <h2 className="mt-2 text-2xl font-extrabold text-dark">Learning activity table</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {remaining.length === 0 && topThree.length === 0 && (
              <div className="p-8 text-center text-sm font-bold text-gray-500">
                No leaderboard activity yet. Complete lessons in the LMS to start ranking.
              </div>
            )}

            {entries.map((entry, index) => (
              <div key={entry.studentId} className="grid gap-4 p-5 md:grid-cols-[80px_1fr_130px_130px_130px_150px] md:items-center md:p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-light-gray text-sm font-black text-dark">
                    #{index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar entry={entry} className="h-10 w-10 shrink-0 rounded-full" />
                  <div className="min-w-0">
                    <h3 className="truncate font-extrabold text-dark">{entry.name}</h3>
                    <p className="text-sm font-bold text-primary">{entry.rankLabel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <BookOpenCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  {entry.completedLessons} lessons
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                  {entry.activeCourses} courses
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                  <GraduationCap className="h-4 w-4 text-primary" aria-hidden="true" />
                  {entry.certificates} certs
                </div>
                <div>
                  <p className="text-lg font-black text-dark">{entry.score} pts</p>
                  <p className="text-xs font-bold text-gray-400">{formatDate(entry.recentActivity)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpenCheck, title: "Finish Lessons", text: "Each completed lesson adds steady points to your ranking." },
            { icon: Award, title: "Pass Quizzes", text: "Quiz attempts and strong scores improve your activity score." },
            { icon: GraduationCap, title: "Earn Certificates", text: "Completing full courses gives the biggest leaderboard boost." },
            { icon: MessageCircle, title: "Chat on Weekends", text: "Encourage classmates in the Community on Saturdays and Sundays - every 10 messages earns a point." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
              <item.icon className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="font-extrabold text-dark">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">{item.text}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
