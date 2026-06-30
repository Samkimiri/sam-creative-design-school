import Link from "next/link";
import type { CSSProperties } from "react";
import { lessons } from "@/data/courses";
import { getSession } from "@/lib/auth";
import { getDB, getDBRecord } from "@/lib/db";
import { getManagedCourses } from "@/lib/contentSettings";
import { getCourseVisual } from "@/lib/courseVisuals";
import { createReferralCode } from "@/lib/referrals";
import { Award, BadgeCheck, Flame, Medal, Sparkles, Trophy } from "lucide-react";

interface ProgressRecord {
  studentId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; total: number; date: string }[];
  lastAccessed: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  role?: string;
  enrolledCourses: string[];
  profileImage?: string;
}

function isProgressRecord(record: Partial<ProgressRecord>): record is ProgressRecord {
  return Boolean(record.studentId && record.courseId && Array.isArray(record.completedLessons));
}

function getProgressMeta(progress: number) {
  if (progress === 100) return { label: "Completed", tone: "bg-green-50 text-green-700 border-green-200", action: "Review Course" };
  if (progress > 0) return { label: "In Progress", tone: "bg-blue-50 text-blue-700 border-blue-200", action: "Continue Learning" };
  return { label: "Unlocked", tone: "bg-primary/10 text-primary border-primary/20", action: "Start Course" };
}

const achievementIcons = [Sparkles, Flame, Medal, Trophy, Award];

function getBadges(progress: number) {
  const badges = [{ label: "Starter", detail: "Portal opened", threshold: 0 }];
  if (progress >= 25) badges.push({ label: "Momentum", detail: "25% complete", threshold: 25 });
  if (progress >= 50) badges.push({ label: "Halfway Hero", detail: "50% complete", threshold: 50 });
  if (progress >= 75) badges.push({ label: "Quiz Champion", detail: "75% complete", threshold: 75 });
  if (progress === 100) badges.push({ label: "Certified", detail: "Certificate ready", threshold: 100 });
  return badges;
}

export default async function LMSDashboard() {
  const session = await getSession();
  const courses = await getManagedCourses();

  let enrolledCourses = courses;
  let studentName = "Student";
  let allProgress: ProgressRecord[] = [];
  let student: Student | undefined = undefined;

  if (session) {
    student = await getDBRecord<Student>("students.json", session.user.id) ?? undefined;
    studentName = session.user.name;

    const isAdmin = session.user.role === "admin" || student?.role === "admin";
    const studentEnrolledIds = isAdmin
      ? courses.map((course) => course.id)
      : student?.enrolledCourses || ["photoshop-masterclass"];
    enrolledCourses = courses.filter((course) => studentEnrolledIds.includes(course.id));
    allProgress = (await getDB<ProgressRecord>("progress.json")).filter(
      (record) => isProgressRecord(record) && record.studentId === session.user.id
    );
  } else {
    enrolledCourses = [courses[0]];
  }

  const courseStats = enrolledCourses.map((course) => {
    const courseLessons = lessons.filter((lesson) => lesson.courseId === course.id).sort((a, b) => a.order - b.order);
    const record = allProgress.find((progress) => progress.courseId === course.id);
    const completedLessons = courseLessons
      .filter((lesson) => record?.completedLessons.includes(lesson.id))
      .map((lesson) => lesson.id);
    const progress = courseLessons.length > 0 ? Math.round((completedLessons.length / courseLessons.length) * 100) : 0;
    const nextLesson = courseLessons.find((lesson) => !completedLessons.includes(lesson.id)) || courseLessons[0];
    return { course, courseLessons, completedLessons, progress, nextLesson, record };
  });

  const continueCourse =
    courseStats.find((item) => item.progress > 0 && item.progress < 100) ||
    courseStats.find((item) => item.progress === 0) ||
    courseStats[0];
  const totalCompleted = courseStats.reduce((sum, item) => sum + item.completedLessons.length, 0);
  const totalAssignedLessons = courseStats.reduce((sum, item) => sum + item.courseLessons.length, 0);
  const averageProgress = courseStats.length
    ? Math.round(courseStats.reduce((sum, item) => sum + item.progress, 0) / courseStats.length)
    : 0;
  const certificatesEarned = courseStats.filter((item) => item.progress === 100).length;
  const lockedCourses = session
    ? courses.filter((course) => !enrolledCourses.some((enrolled) => enrolled.id === course.id))
    : courses.slice(1);
  const referralCode = session
    ? createReferralCode({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      })
    : "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const referralLink = referralCode ? `${siteUrl}/enroll?ref=${encodeURIComponent(referralCode)}` : "";

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#F6FAFF] pb-16 pt-24 md:pb-24 md:pt-28">
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-white/80" aria-hidden="true" />

      <main className="container mx-auto px-4 sm:px-6">
        <section className="lms-hero mb-6 overflow-hidden rounded-2xl border border-white/70 bg-dark p-5 text-white shadow-2xl md:mb-10 md:rounded-[28px] md:p-8">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="animate-lms-rise">
              <p className="mb-3 text-sm font-black uppercase tracking-widest text-primary-light">Learning Portal</p>
              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">
                Welcome back, <span className="text-primary-light">{studentName.split(" ")[0]}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                Your classes, progress, badges, assignments, and certificates are organized here so you can keep moving.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                {continueCourse && (
                  <Link
                    href={`/lms/${continueCourse.course.id}`}
                  className="rounded-xl bg-primary px-5 py-3 text-center font-bold text-white shadow-lg shadow-primary/25 transition duration-300 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-primary/35 active:translate-y-0 sm:px-6"
                  >
                    Continue Learning
                  </Link>
                )}
                {!session && (
                  <Link
                    href="/auth/login"
                    className="rounded-xl border border-white/20 px-5 py-3 text-center font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light sm:px-6"
                  >
                    Sign In to Save Progress
                  </Link>
                )}
                {session && (
                  <Link
                    href="/lms/profile"
                    className="rounded-xl border border-white/20 px-5 py-3 text-center font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light sm:px-6"
                  >
                    View Profile
                  </Link>
                )}
                <Link
                  href="/lms/leaderboard"
                  className="rounded-xl border border-white/20 px-5 py-3 text-center font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light sm:px-6"
                >
                  View Leaderboard
                </Link>
              </div>
            </div>

            <div className="animate-lms-float rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full bg-white/10">
                  <div
                    className="lms-progress-ring h-24 w-24"
                    style={{ "--progress": `${averageProgress}%` } as CSSProperties}
                  />
                  <div className="absolute text-center">
                    <div className="text-2xl font-extrabold">{averageProgress}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/60">Overall</div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-light">Portal progress</p>
                  <h2 className="text-2xl font-extrabold">{totalCompleted}/{totalAssignedLessons} lessons</h2>
                  <p className="mt-1 text-sm text-white/65">{certificatesEarned} certificate{certificatesEarned === 1 ? "" : "s"} earned</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-2 gap-3 md:mb-10 md:grid-cols-4 md:gap-5">
          {[
            { label: "Courses Active", value: enrolledCourses.length },
            { label: "Lessons Done", value: totalCompleted },
            { label: "Total Lessons", value: totalAssignedLessons },
            { label: "Certificates", value: certificatesEarned },
          ].map((stat, index) => (
            <div key={stat.label} className="animate-lms-rise rounded-2xl border border-white bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5" style={{ animationDelay: `${index * 80}ms` }}>
              <p className="text-xs font-bold text-gray-500 sm:text-sm">{stat.label}</p>
              <p className="mt-2 text-2xl font-extrabold text-dark sm:text-3xl">{stat.value}</p>
            </div>
          ))}
        </section>

        {continueCourse && (
          <section className="mb-8 animate-fade-in rounded-2xl border border-primary/15 bg-white p-5 shadow-sm md:mb-10 md:rounded-3xl md:p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_220px_320px] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-primary">Continue Where You Left Off</p>
                <h2 className="mt-2 text-2xl font-extrabold text-dark">{continueCourse.nextLesson?.title || continueCourse.course.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  {continueCourse.course.title} - {continueCourse.progress}% complete - next lesson ready.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={`/lms/${continueCourse.course.id}`} className="rounded-xl bg-dark px-5 py-3 text-center font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-primary active:translate-y-0 sm:px-6">
                    Open Lesson
                  </Link>
                  <a href={`/api/notes/${continueCourse.nextLesson?.id}`} className="rounded-xl border border-gray-200 px-5 py-3 text-center font-bold text-dark transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary sm:px-6">
                    Download Notes
                  </a>
                </div>
              </div>

              <div className="hidden justify-center md:flex" aria-hidden="true">
                <div className="study-buddy-mobile">
                  <div className="study-buddy">
                    <div className="study-buddy-shadow" />
                    <div className="study-buddy-spark study-buddy-spark-one" />
                    <div className="study-buddy-spark study-buddy-spark-two" />
                    <div className="study-buddy-head">
                      <span className="study-buddy-hair study-buddy-hair-left" />
                      <span className="study-buddy-hair study-buddy-hair-top" />
                      <span className="study-buddy-cheek study-buddy-cheek-left" />
                      <span className="study-buddy-cheek study-buddy-cheek-right" />
                      <span className="study-buddy-eye study-buddy-eye-left" />
                      <span className="study-buddy-eye study-buddy-eye-right" />
                      <span className="study-buddy-smile" />
                    </div>
                    <div className="study-buddy-body">
                      <span className="study-buddy-collar" />
                      <span className="study-buddy-book" />
                      <span className="study-buddy-arm study-buddy-arm-left" />
                      <span className="study-buddy-arm study-buddy-arm-right" />
                    </div>
                    <span className="study-buddy-leg study-buddy-leg-left" />
                    <span className="study-buddy-leg study-buddy-leg-right" />
                    <div className="study-buddy-bubble">{studentName.split(" ")[0]}, keep going!</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-light-gray p-5">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="font-bold text-gray-600">Course progress</span>
                  <span className="font-black text-primary">{continueCourse.progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${continueCourse.progress}%` }} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {continueCourse.courseLessons.slice(0, 6).map((lesson) => (
                    <span
                      key={lesson.id}
                      className={`h-2 rounded-full transition-colors duration-500 ${continueCourse.completedLessons.includes(lesson.id) ? "bg-primary" : "bg-white"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {session && (
          <section className="mb-8 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm md:mb-10 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">Referral Program</p>
                <h2 className="mt-2 text-2xl font-extrabold text-dark">Invite a learner, help them save 10%</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Share your code or link. Admin can track successful referrals from enrollment records.
                </p>
              </div>
              <div className="rounded-2xl bg-light-gray p-4 md:min-w-80">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Code</p>
                <p className="mt-1 font-mono text-2xl font-black text-primary">{referralCode}</p>
                <Link href={referralLink || `/enroll?ref=${referralCode}`} className="mt-3 inline-flex w-full justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary/90">
                  Open Referral Link
                </Link>
              </div>
            </div>
          </section>
        )}

        <section className="mb-10">
          <div className="mb-5 flex flex-col gap-3 md:mb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-primary">My Courses</p>
              <h2 className="text-2xl font-extrabold tracking-tight text-dark sm:text-3xl">Unlocked learning paths</h2>
            </div>
            <Link href="/resources" className="rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-primary shadow-sm ring-1 ring-primary/10 transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white">
              Open Resources
            </Link>
          </div>

          <div className="mb-7 grid gap-4 md:grid-cols-3">
            {[
              { title: "Achievement Badges", text: "Badges unlock as students complete course milestones.", Icon: BadgeCheck },
              { title: "Colour Tracks", text: "Each course uses its own visual colour so progress is easy to identify.", Icon: Sparkles },
              { title: "Certificate Goal", text: "The final badge appears when the certificate is ready.", Icon: Award },
            ].map(({ Icon, ...item }) => (
              <div key={item.title} className="rounded-2xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-extrabold text-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:gap-7 lg:grid-cols-2">
            {courseStats.map(({ course, courseLessons, progress, completedLessons, nextLesson }, index) => {
              const meta = getProgressMeta(progress);
              const previewLessons = courseLessons.slice(0, 3);
              const visual = getCourseVisual(course.id);
              return (
                <article
                  key={course.id}
                  className="group animate-lms-rise overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_18px_55px_rgba(10,15,30,0.08)] ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(26,143,227,0.18)] md:rounded-[28px]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative min-h-40 overflow-hidden p-5 text-white sm:min-h-48 sm:p-6">
                    <img src={course.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient} opacity-80 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/38 to-black/10" />
                    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/20 bg-white/10 blur-[1px]" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />
                    <div className="relative flex items-start justify-between gap-5">
                      <div className="min-w-0">
                        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/18 text-lg font-black shadow-lg ring-1 ring-white/20 backdrop-blur">
                          {visual.icon}
                        </span>
                        <span className={`ml-3 inline-flex rounded-full border bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-widest shadow-sm ${meta.tone}`}>
                          {meta.label}
                        </span>
                        <h3 className="mt-4 max-w-sm text-xl font-extrabold leading-tight drop-shadow-sm sm:text-2xl">{course.title}</h3>
                        <p className="mt-2 text-sm font-semibold text-white/82">{course.level}</p>
                      </div>
                      <div className="relative hidden h-24 w-24 shrink-0 place-items-center rounded-full bg-white/15 shadow-2xl ring-1 ring-white/25 backdrop-blur sm:grid">
                        <div className="absolute inset-2 rounded-full bg-white/10" />
                        <div
                          className="lms-progress-ring h-20 w-20"
                          style={{ "--progress": `${progress}%` } as CSSProperties}
                        />
                        <span className="absolute text-sm font-black drop-shadow">{progress}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="progress-sheen h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-emerald-400 transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-light-gray to-white p-4 shadow-sm">
                        <p className="text-lg font-black text-dark">{completedLessons.length}/{courseLessons.length}</p>
                        <p className="text-xs font-bold text-gray-500">Lessons complete</p>
                      </div>
                      <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-light-gray to-white p-4 shadow-sm">
                        <p className="text-lg font-black text-dark">{course.duration}</p>
                        <p className="text-xs font-bold text-gray-500">Course duration</p>
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="mb-3 text-xs font-black uppercase tracking-widest text-gray-400">Lesson Preview</p>
                      <div className="space-y-2">
                        {previewLessons.map((lesson) => {
                          const isDone = completedLessons.includes(lesson.id);
                          return (
                            <div key={lesson.id} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm transition duration-300 hover:border-primary/20 hover:bg-primary/5">
                              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-black transition-colors duration-500 ${isDone ? "bg-emerald-500 text-white" : "bg-primary/10 text-primary"}`}>
                                {isDone ? "OK" : lesson.order}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-sm font-bold text-dark">{lesson.title}</span>
                              <span className="rounded-full bg-slate-50 px-2 py-1 text-xs font-bold text-gray-400">{lesson.duration}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mb-5 flex flex-wrap gap-2">
                      {getBadges(progress).map((badge, badgeIndex) => {
                        const Icon = achievementIcons[badgeIndex] || BadgeCheck;
                        return (
                        <span
                          key={badge.label}
                          title={badge.detail}
                          className={`animate-lms-badge inline-flex items-center gap-2 rounded-2xl border ${visual.border} ${visual.soft} px-3 py-2 text-xs font-black uppercase tracking-wider ${visual.text} shadow-sm ring-1 ${visual.ring}`}
                          style={{ animationDelay: `${badgeIndex * 120}ms` }}
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          {badge.label}
                        </span>
                      );
                      })}
                    </div>

                    {nextLesson && (
                      <p className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
                        Next: <span className="font-black">{nextLesson.title}</span>
                      </p>
                    )}

                    {progress === 100 && (
                      <a href={`/api/certificates/${course.id}`} className="mb-3 block rounded-xl border border-green-500 bg-green-50 py-3 text-center font-bold text-green-700 transition hover:bg-green-100">
                        Download Certificate
                      </a>
                    )}

                    <Link href={`/lms/${course.id}`} className="block rounded-2xl bg-dark py-3.5 text-center font-bold text-white shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-primary/25 active:translate-y-0">
                      {meta.action}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {lockedCourses.length > 0 && (
          <section>
            <div className="mb-6">
              <p className="text-sm font-black uppercase tracking-widest text-primary">Locked Courses</p>
              <h2 className="text-2xl font-extrabold text-dark">Available when you enroll</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {lockedCourses.map((course) => (
                <article key={course.id} className="group overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-36 overflow-hidden">
                    <img src={course.image} alt="" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-widest text-white backdrop-blur">
                      Locked
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-extrabold text-dark">{course.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">{course.description}</p>
                    <Link href={`/enroll?course=${course.id}`} className="mt-5 block rounded-2xl border border-primary/30 bg-primary/5 py-2.5 text-center text-sm font-bold text-primary transition duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white">
                    Enroll to Unlock
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
