"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { courses, lessons, Lesson } from "@/data/courses";
import { useParams } from "next/navigation";

type QuizResult = {
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
  const courseId = params.courseId as string;
  const course = courses.find((c) => c.id === courseId);
  const courseLessons = lessons.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);

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
    const isUnlocked = lessonIndex === 0 || courseLessons.slice(0, lessonIndex).every((item) => completedLessons.includes(item.id));
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
    const idx = courseLessons.findIndex((l) => l.id === activeLesson.id);
    if (completedLessons.includes(activeLesson.id) && idx < courseLessons.length - 1) {
      selectLesson(courseLessons[idx + 1]);
    }
  };

  const completedCourseLessons = courseLessons.filter((lesson) => completedLessons.includes(lesson.id));
  const progress = courseLessons.length > 0 ? Math.round((completedCourseLessons.length / courseLessons.length) * 100) : 0;
  const activeLessonIndex = courseLessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const isActiveLessonComplete = completedLessons.includes(activeLesson.id);
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

  if (!course) return <div className="pt-32 text-center text-2xl font-bold">Course not found</div>;

  return (
    <div className="relative isolate pt-20 bg-[#F8F8F8] min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10"
        aria-hidden="true"
      />
      <div className="fixed inset-0 -z-10 bg-white/75" aria-hidden="true" />
      {/* Top Course Bar */}
      <div className="bg-dark text-white px-6 py-3 flex items-center justify-between sticky top-20 z-40 shadow-xl">
        <div className="flex items-center gap-4">
          <Link href="/lms" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            ← Dashboard
          </Link>
          <span className="text-gray-600">|</span>
          <span className="font-bold text-sm truncate max-w-xs">{course.title}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-36 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
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
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors">
            {sidebarOpen ? "▶ Hide" : "◀ Show"} lessons
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? "md:mr-[340px]" : ""}`}>
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            {/* Video Player */}
            {!showQuiz ? (
              <>
                <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-gray-100 bg-white p-2 shadow-sm sm:grid-cols-5">
                  {(["video", "notes", "resources", "assignment", "quiz"] as LessonTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => openTab(tab)}
                      disabled={tab === "quiz" && !activeLesson.quiz}
                      className={`rounded-xl px-3 py-3 text-sm font-bold capitalize transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                        activeTab === tab ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-dark"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "video" && (
                <div className="bg-dark rounded-2xl overflow-hidden shadow-2xl aspect-video mb-6">
                  <iframe
                    key={activeLesson.id}
                    className="w-full h-full"
                    src={activeLesson.videoUrl}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                )}

                {/* Lesson Details */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Lesson {activeLesson.order}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">⏱ {activeLesson.duration}</span>
                        {completedLessons.includes(activeLesson.id) && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">✓ Done</span>
                        )}
                      </div>
                      <h1 className="text-2xl font-extrabold text-dark">{activeLesson.title}</h1>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      {!activeLesson.quiz && !completedLessons.includes(activeLesson.id) && (
                        <button
                          onClick={() => markComplete(activeLesson.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 transition-all"
                        >
                          ✓ Mark Complete
                        </button>
                      )}
                      {activeLesson.quiz && (
                        <button
                          onClick={() => openTab("quiz")}
                          className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all"
                        >
                          📝 Take Quiz
                        </button>
                      )}
                    </div>
                  </div>

                  {activeLesson.quiz && !isActiveLessonComplete && (
                    <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">
                      Pass this 5-question quiz with 70% or above to unlock the next lesson.
                    </div>
                  )}

                  {progress === 100 && (
                    <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest text-green-700">Course Completed</p>
                        <h3 className="text-xl font-extrabold text-green-950">Your certificate is ready.</h3>
                      </div>
                      <a
                        href={`/api/certificates/${course.id}`}
                        className="bg-green-600 text-white text-center font-bold px-5 py-3 rounded-xl hover:bg-green-700 transition-colors"
                      >
                        Download Certificate
                      </a>
                    </div>
                  )}

                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                      <span className="text-primary">📝</span> Lesson Notes
                    </h3>
                    <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <p className="text-sm font-bold text-primary uppercase tracking-widest">Student Notes</p>
                        <a
                          href={`/api/notes/${activeLesson.id}`}
                          className="inline-flex items-center justify-center bg-white border border-blue-200 text-primary px-4 py-2 rounded-xl text-sm font-bold hover:border-primary hover:shadow-sm transition-all"
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
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {activeLesson.resources && activeLesson.resources.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <h4 className="font-bold text-dark mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                        <span className="text-primary">📥</span> Downloadable Resources
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeLesson.resources.map((r, i) => (
                          <a key={i} href={r.url} className="flex items-center justify-between bg-white border border-gray-200 px-5 py-4 rounded-xl text-sm font-bold hover:border-primary hover:text-primary hover:shadow-md transition-all group">
                            <span className="flex items-center gap-3">
                              <span className="text-xl">{r.type === "pdf" ? "📄" : r.type === "zip" ? "📦" : "🔗"}</span>
                              {r.name}
                            </span>
                            <span className="text-xs bg-gray-100 group-hover:bg-primary/10 px-2 py-1 rounded text-gray-500 group-hover:text-primary uppercase">{r.type}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === "assignment" && (
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <h4 className="font-bold text-dark mb-4 text-sm uppercase tracking-wider">Submit Assignment</h4>
                      <form onSubmit={submitAssignment} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="grid grid-cols-1 gap-4">
                          <input
                            value={assignmentForm.fileUrl}
                            onChange={(event) => setAssignmentForm({ ...assignmentForm, fileUrl: event.target.value })}
                            placeholder="Project link, file URL, Google Drive link, or portfolio URL"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                          />
                          <textarea
                            value={assignmentForm.notes}
                            onChange={(event) => setAssignmentForm({ ...assignmentForm, notes: event.target.value })}
                            placeholder="Explain what you created or ask for feedback"
                            rows={5}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                          />
                        </div>
                        <button className="mt-4 rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90">
                          Submit for Marking
                        </button>
                        {assignmentStatus && <p className="mt-3 text-sm font-medium text-gray-600">{assignmentStatus}</p>}
                      </form>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      const idx = courseLessons.findIndex((l) => l.id === activeLesson.id);
                      if (idx > 0) selectLesson(courseLessons[idx - 1]);
                    }}
                    disabled={courseLessons.findIndex((l) => l.id === activeLesson.id) === 0}
                    className="bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold text-dark hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextLesson}
                    disabled={isLastLesson || !isActiveLessonComplete}
                    className="bg-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {isActiveLessonComplete ? "Next →" : "Pass Quiz to Continue"}
                  </button>
                </div>
              </>
            ) : (
              /* Quiz UI */
              <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
                {!quizResult ? (
                  <>
                    <div className="mb-8">
                      <button onClick={() => openTab("video")} className="text-sm text-gray-500 hover:text-dark mb-4 block">
                        ← Back to Lesson
                      </button>
                      <h2 className="text-2xl font-extrabold text-dark mb-1">Lesson Quiz</h2>
                      <p className="text-gray-500">{activeLesson.title} — Answer all questions to complete this lesson</p>
                    </div>

                    <div className="space-y-8">
                      {activeLesson.quiz?.questions.map((q, qi) => (
                        <div key={q.id}>
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
                                className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${
                                  quizAnswers[qi] === oi
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-gray-200 hover:border-gray-300 text-gray-700"
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
                      className="mt-10 w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg disabled:opacity-40"
                    >
                      Submit Answers
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className={`w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl ${quizResult.passed ? "bg-green-100" : "bg-red-100"}`}>
                      {quizResult.passed ? "🎉" : "😅"}
                    </div>
                    <h2 className="text-3xl font-extrabold mb-2">{quizResult.passed ? "Quiz Passed!" : "Not Quite"}</h2>
                    <p className="text-gray-500 mb-6">
                      You scored <span className="font-bold text-dark">{quizResult.score}/{quizResult.total}</span> ({quizResult.percentage}%)
                      {quizResult.passed ? " — Lesson marked complete! 🏆" : " — You need 70% to pass. Try again!"}
                    </p>
                    <div className="text-left max-w-3xl mx-auto mb-8 space-y-4">
                      {quizResult.results.map((result, index) => (
                        <div
                          key={result.questionId}
                          className={`border rounded-2xl p-5 ${
                            result.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                          }`}
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
                    <div className="flex gap-4 justify-center">
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
                        Next Lesson →
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
          <div className="hidden md:flex flex-col w-[340px] bg-white border-l border-gray-200 fixed right-0 top-[120px] bottom-0 overflow-hidden">
            <div className="p-5 bg-dark text-white shrink-0">
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
                  const isDone = completedLessons.includes(lesson.id);
                  const isLocked = index > 0 && !courseLessons.slice(0, index).every((item) => completedLessons.includes(item.id));
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(lesson)}
                      disabled={isLocked}
                      className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                        isLocked ? "cursor-not-allowed opacity-50" : isActive ? "bg-primary/10 border border-primary/20" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                        isDone ? "bg-green-500 text-white" : isLocked ? "bg-gray-100 text-gray-400" : isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                      }`}>
                        {isDone ? "✓" : isLocked ? "🔒" : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${isActive ? "text-primary" : isDone ? "text-gray-400" : "text-dark"}`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">⏱ {lesson.duration}</span>
                          {lesson.quiz && <span className="text-xs text-primary font-bold">📝 Quiz</span>}
                          {isLocked && <span className="text-xs font-bold text-gray-400">Locked</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
