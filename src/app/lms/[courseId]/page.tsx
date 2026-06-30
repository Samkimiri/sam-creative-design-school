"use client";
import { useState, useEffect, useCallback, type CSSProperties } from "react";
import Link from "next/link";
import { courses as fallbackCourses, lessons as fallbackLessons, type Course, type Lesson } from "@/data/courses";
import { useParams, useSearchParams } from "next/navigation";

type QuizResult = {
  error?: string;
  score: number;
  total: number;
  passed: boolean;
  percentage: number;
  results: {
    questionId: string;
    question: string;
    selectedAnswer: number;
    selectedOption: string;
    correctAnswer: number;
    correctOption: string;
    correct: boolean;
    explanation: string;
  }[];
};

type LessonTab = "video" | "notes" | "resources" | "assignment" | "quiz";

const mergeLessonIds = (...lessonGroups: string[][]) => Array.from(new Set(lessonGroups.flat()));

export default function CoursePlayer() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params.courseId as string;
  const isPreview = searchParams.get("preview") === "1";
  const [managedCourses, setManagedCourses] = useState<Course[]>(fallbackCourses);
  const [managedLessons, setManagedLessons] = useState<Lesson[]>(fallbackLessons);
  const course = managedCourses.find((c) => c.id === courseId);
  const courseLessons = managedLessons.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);

  const [activeLesson, setActiveLesson] = useState<Lesson>(courseLessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState<LessonTab>("video");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [assignmentForm, setAssignmentForm] = useState({ fileUrl: "", notes: "" });
  const [assignmentStatus, setAssignmentStatus] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const progressStorageKey = `scds-progress-${courseId}`;

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;
        if (Array.isArray(data.data?.courses)) setManagedCourses(data.data.courses);
        if (Array.isArray(data.data?.lessons)) {
          setManagedLessons(data.data.lessons);
          const refreshedLesson = data.data.lessons.find((lesson: Lesson) => lesson.id === activeLesson?.id);
          if (refreshedLesson) setActiveLesson(refreshedLesson);
        }
      })
      .catch(() => undefined);
  }, [activeLesson?.id]);

  const readLocalProgress = useCallback(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedProgress = window.localStorage.getItem(progressStorageKey);
      const parsedProgress = savedProgress ? JSON.parse(savedProgress) : [];
      return Array.isArray(parsedProgress) ? parsedProgress.filter((id) => typeof id === "string") : [];
    } catch {
      return [];
    }
  }, [progressStorageKey]);

  const writeLocalProgress = useCallback((lessonIds: string[]) => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(progressStorageKey, JSON.stringify(mergeLessonIds(lessonIds)));
    } catch {
      // Browser storage can be unavailable in private mode; backend progress still handles signed-in users.
    }
  }, [progressStorageKey]);

  const syncLessonProgress = useCallback(async (lessonId: string) => {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId }),
      });
      const data = await res.json();

      if (data.success && data.data?.completedLessons) {
        setCompletedLessons((currentLessons) => {
          const mergedLessons = mergeLessonIds(currentLessons, data.data.completedLessons);
          writeLocalProgress(mergedLessons);
          return mergedLessons;
        });
      }
    } catch {
      // Keep the local progress backup when the student is offline or the session needs refreshing.
    }
  }, [courseId, writeLocalProgress]);

  const loadProgress = useCallback(async () => {
    const localLessons = readLocalProgress();
    if (localLessons.length > 0) {
      setCompletedLessons(localLessons);
    }

    try {
      const res = await fetch(`/api/progress?courseId=${courseId}`);
      const data = await res.json();

      if (data.success && data.data?.completedLessons) {
        const serverLessons = Array.isArray(data.data.completedLessons) ? data.data.completedLessons : [];
        const mergedLessons = mergeLessonIds(localLessons, serverLessons);
        setCompletedLessons(mergedLessons);
        writeLocalProgress(mergedLessons);

        localLessons
          .filter((lessonId) => !serverLessons.includes(lessonId))
          .forEach((lessonId) => {
            void syncLessonProgress(lessonId);
          });
      }
    } catch {
      // Leave any local progress visible if the backend cannot be reached.
    }
  }, [courseId, readLocalProgress, syncLessonProgress, writeLocalProgress]);

  useEffect(() => { loadProgress(); }, [loadProgress]);

  const markComplete = async (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return;
    const nextLessons = mergeLessonIds(completedLessons, [lessonId]);
    setCompletedLessons(nextLessons);
    writeLocalProgress(nextLessons);
    await syncLessonProgress(lessonId);
  };

  const handleQuizSubmit = async () => {
    if (!activeLesson.quiz) return;
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId: activeLesson.id, answers: quizAnswers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setQuizResult({
          error: data.error || "Could not submit quiz. Please try again.",
          score: 0,
          total: activeLesson.quiz.questions.length,
          passed: false,
          percentage: 0,
          results: [],
        });
        return;
      }
      setQuizResult(data);
      if (data.passed) {
        const nextLessons = mergeLessonIds(completedLessons, [activeLesson.id]);
        setCompletedLessons(nextLessons);
        writeLocalProgress(nextLessons);
        await syncLessonProgress(activeLesson.id);
      }
    } catch { /* handle offline */ }
  };

  const selectLesson = (lesson: Lesson) => {
    const lessonIndex = courseLessons.findIndex((item) => item.id === lesson.id);
    const isUnlocked = isPreview
      ? lessonIndex === 0
      : lessonIndex === 0 || courseLessons.slice(0, lessonIndex).every((item) => completedLessons.includes(item.id));
    if (!isUnlocked) return;

    setActiveLesson(lesson);
    setShowQuiz(false);
    setActiveTab("video");
    setQuizResult(null);
    setQuizAnswers([]);
    setAssignmentForm({ fileUrl: "", notes: "" });
    setAssignmentStatus("");
  };

  const nextLesson = () => {
    if (isPreview) return;
    const idx = courseLessons.findIndex((l) => l.id === activeLesson.id);
    if (completedLessons.includes(activeLesson.id) && idx < courseLessons.length - 1) {
      selectLesson(courseLessons[idx + 1]);
    }
  };

  const completedCourseLessons = isPreview ? [] : courseLessons.filter((lesson) => completedLessons.includes(lesson.id));
  const progress = courseLessons.length > 0 ? Math.round((completedCourseLessons.length / courseLessons.length) * 100) : 0;
  const activeLessonIndex = courseLessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const isActiveLessonComplete = !isPreview && completedLessons.includes(activeLesson.id);
  const isLastLesson = activeLessonIndex === courseLessons.length - 1;

  const openTab = (tab: LessonTab) => {
    setActiveTab(tab);
    setShowQuiz(tab === "quiz");
    if (tab !== "quiz") setQuizResult(null);
  };

  const submitAssignment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAssignmentStatus("Submitting...");
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId: activeLesson.id, ...assignmentForm }),
      });
      const data = await res.json();
      setAssignmentStatus(data.success ? "Assignment submitted for tutor feedback." : data.message || "Could not submit assignment.");
      if (data.success) setAssignmentForm({ fileUrl: "", notes: "" });
    } catch {
      setAssignmentStatus("Could not submit assignment. Please login and try again.");
    }
  };

  if (!course) return <div className="pt-28 text-center text-2xl font-bold">Course not found</div>;

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#F5F7FB] pt-20 sm:pt-24">
      <div
        className="fixed inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10"
        aria-hidden="true"
      />
      <div className="fixed inset-0 -z-10 bg-white/80" aria-hidden="true" />
      {/* Top Course Bar */}
      <div className="mx-4 mb-4 mt-3 flex max-w-7xl flex-col gap-3 rounded-2xl border border-white/70 bg-slate-950 px-4 py-4 text-white shadow-2xl shadow-slate-900/10 sm:mx-auto sm:mb-6 sm:mt-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between" data-reveal>
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link href="/lms" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Dashboard
          </Link>
          <span className="text-gray-600">|</span>
          <span className="font-bold text-sm truncate max-w-xs">{course.title}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-2">
            <div className="w-36 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm text-primary font-bold">{progress}%</span>
          </div>
          {progress === 100 && (
            <a
              href={`/api/certificates/${course.id}`}
              className="hidden sm:inline-flex bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-600 transition-colors"
            >
              Certificate
            </a>
          )}
          <Link href="/lms/leaderboard" className="rounded-xl border border-white/10 px-3 py-2 text-sm font-bold text-gray-300 transition hover:border-primary-light hover:text-primary-light">
            Leaders
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
            {sidebarOpen ? "Hide" : "Show"} lessons
          </button>
        </div>
      </div>

      <div className={`mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 sm:px-6 lg:px-8 ${sidebarOpen ? "lg:grid-cols-[minmax(0,1fr)_340px]" : "lg:grid-cols-1"}`}>
        {/* Main Content */}
        <div className="min-w-0 transition-all duration-300">
          <div className="mx-auto max-w-4xl">
            {isPreview && (
              <div className="mb-6 rounded-2xl border border-primary/20 bg-white p-5 text-sm font-bold text-dark shadow-sm shadow-primary/5">
                Preview mode unlocks Module 1 Lesson 1 only. Enroll to access every lesson, quiz, assignment, progress tracker, and certificate.
              </div>
            )}
            {/* Video Player */}
            {!showQuiz ? (
              <>
                <div className="mb-4 grid grid-cols-3 gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm sm:mb-6 sm:grid-cols-5" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
                  {(["video", "notes", "resources", "assignment", "quiz"] as LessonTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => openTab(tab)}
                      disabled={tab === "quiz" && !activeLesson.quiz}
                      className={`rounded-xl px-2 py-2.5 text-xs font-bold capitalize transition-all disabled:cursor-not-allowed disabled:opacity-40 sm:px-3 sm:py-3 sm:text-sm ${
                        activeTab === tab ? "scale-[1.02] bg-primary text-white shadow-sm shadow-primary/20" : "text-gray-600 hover:-translate-y-0.5 hover:bg-gray-50 hover:text-dark"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "video" && (
                  isPreview ? (
                    <div key={`${activeLesson.id}-preview`} className="lesson-panel-enter mb-6 overflow-hidden rounded-[1.5rem] border border-white bg-slate-950 shadow-2xl shadow-slate-900/10">
                      <div className="relative aspect-video">
                        <img
                          src={activeLesson.image || course.image}
                          alt={activeLesson.imageAlt || activeLesson.title}
                          className="h-full w-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/60 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-primary-light">Preview Lesson</p>
                          <h2 className="max-w-2xl text-2xl font-black text-white sm:text-3xl">{activeLesson.title}</h2>
                          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">
                            Watch the guided video after enrollment. This preview keeps the page clean while showing the lesson context and learning path.
                          </p>
                          <Link
                            href={`/enroll?course=${course.id}`}
                            className="premium-button mt-5 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                          >
                            Enroll to watch
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={`${activeLesson.id}-video`} className="lesson-panel-enter mb-6 aspect-video overflow-hidden rounded-[1.5rem] bg-dark shadow-2xl shadow-slate-900/10">
                      <iframe
                        key={activeLesson.id}
                        className="h-full w-full"
                        src={activeLesson.videoUrl}
                        title={activeLesson.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )
                )}

                {/* Lesson Details */}
                <div key={`${activeLesson.id}-${activeTab}-details`} className="lesson-panel-enter bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100 mb-5 sm:mb-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Lesson {activeLesson.order}</span>
                        <span className="text-gray-300">-</span>
                        <span className="text-xs text-gray-500">{activeLesson.duration}</span>
                        {completedLessons.includes(activeLesson.id) && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Done</span>
                        )}
                      </div>
                      <h1 className="text-xl font-extrabold text-dark sm:text-2xl">{activeLesson.title}</h1>
                    </div>
                    <div className="flex w-full flex-col gap-3 shrink-0 sm:w-auto sm:flex-row">
                      {!isPreview && !activeLesson.quiz && !completedLessons.includes(activeLesson.id) && (
                        <button
                          onClick={() => markComplete(activeLesson.id)}
                          className="premium-button bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:-translate-y-0.5 hover:bg-green-600 active:translate-y-0 transition-all duration-300"
                        >
                          Mark Complete
                        </button>
                      )}
                      {activeLesson.quiz && (
                        <button
                          onClick={() => openTab("quiz")}
                          className="premium-button bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 transition-all duration-300"
                        >
                          Take Quiz
                        </button>
                      )}
                    </div>
                  </div>

                  {activeLesson.quiz && !isActiveLessonComplete && (
                    <div className="mb-6 animate-fade-in rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">
                      Pass this 5-question quiz with 70% or above to unlock the next lesson.
                    </div>
                  )}

                  {progress === 100 && (
                    <div className="premium-card mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-reveal>
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-green-700">Course Completed</p>
                        <h3 className="text-xl font-extrabold text-green-950">Your certificate is ready.</h3>
                      </div>
                      <a
                        href={`/api/certificates/${course.id}`}
                        className="premium-button bg-green-600 text-white text-center font-bold px-5 py-3 rounded-xl hover:bg-green-700 transition-colors"
                      >
                        Download Certificate
                      </a>
                    </div>
                  )}

                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                      Lesson Notes
                    </h3>
                    <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-5 md:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <p className="text-sm font-bold text-primary uppercase tracking-widest">Student Notes</p>
                        <a
                          href={`/api/notes/${activeLesson.id}`}
                          className="premium-button inline-flex items-center justify-center bg-white border border-blue-200 text-primary px-4 py-2 rounded-xl text-sm font-bold hover:border-primary hover:shadow-sm transition-all"
                        >
                          Download PDF
                        </a>
                      </div>
                      {activeLesson.image && (
                        <figure className="mb-6 overflow-hidden rounded-2xl border border-blue-100 bg-white">
                          <img
                            src={activeLesson.image}
                            alt={activeLesson.imageAlt || activeLesson.title}
                            className="h-56 w-full object-cover"
                          />
                          <figcaption className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                            {activeLesson.title}
                          </figcaption>
                        </figure>
                      )}
                      <div className="prose prose-blue max-w-none">
                        <div className="space-y-5 text-gray-700 leading-relaxed">
                          {activeLesson.content.split("\n\n").map((paragraph, index) => (
                            <p key={index} className="animate-fade-in" style={{ animationDelay: `${index * 60}ms` }}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {activeLesson.resources && activeLesson.resources.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <h4 className="font-bold text-dark mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                        Downloadable Resources
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeLesson.resources.map((r, i) => (
                          <a key={i} href={r.url} className="flex items-center justify-between gap-3 bg-white border border-gray-200 px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl text-sm font-bold hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md transition-all duration-300 group">
                            <span className="flex items-center gap-3">
                              <span className="text-xs font-black uppercase text-primary">{r.type}</span>
                              {r.name}
                            </span>
                            <span className="text-xs bg-gray-100 group-hover:bg-primary/10 px-2 py-1 rounded text-gray-500 group-hover:text-primary uppercase">{r.type}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "assignment" && (
                    <div className="mt-8 animate-fade-in pt-8 border-t border-gray-100">
                      <h4 className="font-bold text-dark mb-4 text-sm uppercase tracking-wider">Submit Assignment</h4>
                      <form onSubmit={submitAssignment} className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition duration-300 focus-within:border-primary/30 focus-within:shadow-lg focus-within:shadow-primary/5">
                        <div className="grid grid-cols-1 gap-4">
                          <input
                            value={assignmentForm.fileUrl}
                            onChange={(event) => setAssignmentForm({ ...assignmentForm, fileUrl: event.target.value })}
                            placeholder="Project link, file URL, Google Drive link, or portfolio URL"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:border-primary focus:shadow-sm"
                          />
                          <textarea
                            value={assignmentForm.notes}
                            onChange={(event) => setAssignmentForm({ ...assignmentForm, notes: event.target.value })}
                            placeholder="Explain what you created or ask for feedback"
                            rows={5}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-300 focus:-translate-y-0.5 focus:border-primary focus:shadow-sm"
                          />
                        </div>
                        <button className="mt-4 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0">
                          Submit for Marking
                        </button>
                        {assignmentStatus && <p className="mt-3 animate-fade-in text-sm font-medium text-gray-600">{assignmentStatus}</p>}
                      </form>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex gap-3 sm:justify-between">
                  <button
                    onClick={() => {
                      const idx = courseLessons.findIndex((l) => l.id === activeLesson.id);
                      if (idx > 0) selectLesson(courseLessons[idx - 1]);
                    }}
                    disabled={courseLessons.findIndex((l) => l.id === activeLesson.id) === 0}
                    className="flex-1 bg-white border border-gray-200 px-4 py-3 rounded-xl text-sm font-bold text-dark hover:-translate-y-0.5 hover:border-primary hover:text-primary transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 sm:flex-none sm:px-6 sm:text-base"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextLesson}
                    disabled={isPreview || isLastLesson || !isActiveLessonComplete}
                    className="flex-1 bg-dark text-white px-4 py-3 rounded-xl text-sm font-bold hover:-translate-y-0.5 hover:bg-primary transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0 sm:flex-none sm:px-6 sm:text-base"
                  >
                    {isPreview ? "Enroll to Continue" : isActiveLessonComplete ? "Next" : "Pass Quiz to Continue"}
                  </button>
                </div>
              </>
            ) : (
              /* Quiz UI */
              <div className="animate-fade-in bg-white rounded-2xl p-5 md:p-10 shadow-sm border border-gray-100">
                {!quizResult ? (
                  <>
                    <div className="mb-6 sm:mb-8">
                      <button onClick={() => openTab("video")} className="text-sm text-gray-500 hover:text-dark mb-4 block">
                        Back to Lesson
                      </button>
                      <h2 className="text-2xl font-extrabold text-dark mb-1">Lesson Quiz</h2>
                      <p className="text-gray-500">{activeLesson.title} - Answer all questions to complete this lesson</p>
                    </div>

                    <div className="space-y-6 sm:space-y-8">
                      {activeLesson.quiz?.questions.map((q, qi) => (
                        <div key={q.id} className="animate-fade-in" style={{ animationDelay: `${qi * 80}ms` }}>
                          <p className="font-bold text-dark mb-4">Q{qi + 1}. {q.question}</p>
                          <div className="space-y-3">
                            {q.options.map((opt, oi) => (
                              <button
                                key={oi}
                                onClick={() => {
                                  const newAnswers = [...quizAnswers];
                                  newAnswers[qi] = oi;
                                  setQuizAnswers(newAnswers);
                                }}
                                className={`w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl border-2 font-medium transition-all duration-300 ${
                                  quizAnswers[qi] === oi
                                    ? "scale-[1.01] border-primary bg-primary/5 text-primary shadow-sm"
                                    : "border-gray-200 hover:-translate-y-0.5 hover:border-gray-300 text-gray-700"
                                }`}
                              >
                                <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span> {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleQuizSubmit}
                      disabled={(activeLesson.quiz?.questions ?? []).some((_, index) => quizAnswers[index] === undefined)}
                      className="mt-10 w-full bg-primary text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:bg-primary/90 transition-all duration-300 shadow-lg disabled:opacity-40 disabled:hover:translate-y-0"
                    >
                      Submit Answers
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    {quizResult.error ? (
                      <div className="mx-auto mb-6 max-w-xl rounded-2xl border border-red-200 bg-red-50 p-5 text-left">
                        <p className="font-bold text-red-800">Quiz could not be submitted</p>
                        <p className="mt-1 text-sm text-red-700">{quizResult.error}</p>
                      </div>
                    ) : null}
                    <div className={`w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl animate-fade-in ${quizResult.passed ? "bg-green-100" : "bg-red-100"}`}>
                      {quizResult.passed ? "OK" : "!"}
                    </div>
                    <h2 className="text-3xl font-extrabold mb-2">{quizResult.passed ? "Quiz Passed!" : "Not Quite"}</h2>
                    <p className="text-gray-500 mb-6">
                      You scored <span className="font-bold text-dark">{quizResult.score}/{quizResult.total}</span> ({quizResult.percentage}%)
                      {quizResult.passed ? " - Lesson marked complete!" : " - You need 70% to pass. Try again!"}
                    </p>
                    <div className="text-left max-w-3xl mx-auto mb-8 space-y-4">
                      {quizResult.results.map((result, index) => (
                        <div
                          key={result.questionId}
                          className={`animate-fade-in border rounded-2xl p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-sm ${
                            result.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                          }`}
                          style={{ animationDelay: `${index * 70}ms` }}
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <p className="font-bold text-dark">Q{index + 1}. {result.question}</p>
                            <span className={`text-xs font-black px-3 py-1 rounded-full ${
                              result.correct ? "bg-green-600 text-white" : "bg-red-600 text-white"
                            }`}>
                              {result.correct ? "Correct" : "Review"}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>Your answer: <span className="font-bold">{result.selectedOption}</span></p>
                            {!result.correct && (
                              <p>Correct answer: <span className="font-bold">{result.correctOption}</span></p>
                            )}
                            <p className="bg-white/70 border border-white rounded-xl p-3">{result.explanation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3 justify-center sm:flex-row sm:gap-4">
                      <button
                        onClick={() => { setQuizResult(null); setQuizAnswers([]); }}
                        className="bg-gray-100 text-dark px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => { openTab("video"); setQuizResult(null); nextLesson(); }}
                        className="bg-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-all"
                      >
                        Next Lesson
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="hidden max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-[1.5rem] border border-gray-200 bg-white shadow-xl shadow-slate-900/5 md:flex lg:sticky lg:top-28">
            <div className="shrink-0 bg-slate-950 p-5 text-white">
              <h3 className="font-bold text-base">{course.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <span className="text-primary text-sm font-bold">{progress}%</span>
              </div>
              <p className="text-gray-400 text-xs mt-1">{completedCourseLessons.length}/{courseLessons.length} lessons done</p>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-1">
                {courseLessons.map((lesson, index) => {
                  const isActive = lesson.id === activeLesson.id;
                  const isDone = !isPreview && completedLessons.includes(lesson.id);
                  const isLocked = isPreview
                    ? index > 0
                    : index > 0 && !courseLessons.slice(0, index).every((item) => completedLessons.includes(item.id));
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(lesson)}
                      disabled={isLocked}
                      className={`lesson-row-motion w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                        isLocked ? "cursor-not-allowed opacity-50" : isActive ? "scale-[1.01] bg-primary/10 border border-primary/20 shadow-sm" : "hover:-translate-y-0.5 hover:bg-gray-50"
                      }`}
                      style={{ "--reveal-delay": `${index * 35}ms` } as CSSProperties}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                        isDone ? "bg-green-500 text-white" : isLocked ? "bg-gray-100 text-gray-400" : isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                      }`}>
                        {isDone ? "OK" : isLocked ? "-" : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${isActive ? "text-primary" : isDone ? "text-gray-400" : "text-dark"}`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">{lesson.duration}</span>
                          {lesson.quiz && <span className="text-xs text-primary font-bold">Quiz</span>}
                          {isLocked && <span className="text-xs font-bold text-gray-400">Locked</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
