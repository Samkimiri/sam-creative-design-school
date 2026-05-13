"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { courses, lessons, Lesson } from "@/data/courses";
import { useParams } from "next/navigation";

export default function CoursePlayer() {
  const params = useParams();
  const courseId = params.courseId as string;
  const course = courses.find((c) => c.id === courseId);
  const courseLessons = lessons.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);

  const [activeLesson, setActiveLesson] = useState<Lesson>(courseLessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number; passed: boolean; percentage: number } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loadProgress = useCallback(async () => {
    try {
      const res = await fetch(`/api/progress?courseId=${courseId}`);
      const data = await res.json();
      // Safety check for Grouped structure
      if (data.success && data.data?.completedLessons) {
        setCompletedLessons(data.data.completedLessons);
      }
    } catch {
      // Not logged in, use local state
    }
  }, [courseId]);

  useEffect(() => { loadProgress(); }, [loadProgress]);

  const markComplete = async (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return;
    setCompletedLessons((prev) => [...prev, lessonId]);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, lessonId }),
      });
    } catch { /* offline mode */ }
  };

  const handleQuizSubmit = async () => {
    if (!activeLesson.quiz) return;
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: activeLesson.id, answers: quizAnswers }),
      });
      const data = await res.json();
      setQuizResult(data);
      if (data.passed) {
        setCompletedLessons((prev) => prev.includes(activeLesson.id) ? prev : [...prev, activeLesson.id]);
        // Also save to backend
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, lessonId: activeLesson.id }),
        });
      }
    } catch { /* handle offline */ }
  };

  const selectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setShowQuiz(false);
    setQuizResult(null);
    setQuizAnswers([]);
  };

  const nextLesson = () => {
    const idx = courseLessons.findIndex((l) => l.id === activeLesson.id);
    if (idx < courseLessons.length - 1) selectLesson(courseLessons[idx + 1]);
  };

  const progress = courseLessons.length > 0 ? Math.round((completedLessons.length / courseLessons.length) * 100) : 0;

  if (!course) return <div className="pt-32 text-center text-2xl font-bold">Course not found</div>;

  return (
    <div className="pt-20 bg-[#F8F8F8] min-h-screen">
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
                      {!completedLessons.includes(activeLesson.id) && (
                        <button
                          onClick={() => markComplete(activeLesson.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 transition-all"
                        >
                          ✓ Mark Complete
                        </button>
                      )}
                      {activeLesson.quiz && (
                        <button
                          onClick={() => setShowQuiz(true)}
                          className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all"
                        >
                          📝 Take Quiz
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                      <span className="text-primary">📝</span> Lesson Notes
                    </h3>
                    <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-6 md:p-8">
                      <div className="prose prose-blue max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg italic font-medium mb-6">
                          "{activeLesson.content}"
                        </p>
                        <div className="space-y-4 text-gray-600">
                          <p>In this lesson, we cover the essential skills needed for {course.title}. Follow along with the video and use these notes as a quick reference guide.</p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Apply the techniques demonstrated in the video</li>
                            <li>Download the exercise materials provided</li>
                            <li>Take the quiz to test your understanding</li>
                          </ul>
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
                    disabled={courseLessons.findIndex((l) => l.id === activeLesson.id) === courseLessons.length - 1}
                    className="bg-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </>
            ) : (
              /* Quiz UI */
              <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
                {!quizResult ? (
                  <>
                    <div className="mb-8">
                      <button onClick={() => setShowQuiz(false)} className="text-sm text-gray-500 hover:text-dark mb-4 block">
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
                      disabled={quizAnswers.length < (activeLesson.quiz?.questions.length || 0)}
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
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => { setQuizResult(null); setQuizAnswers([]); }}
                        className="bg-gray-100 text-dark px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => { setShowQuiz(false); setQuizResult(null); nextLesson(); }}
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
              <p className="text-gray-400 text-xs mt-1">{completedLessons.length}/{courseLessons.length} lessons done</p>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-1">
                {courseLessons.map((lesson, index) => {
                  const isActive = lesson.id === activeLesson.id;
                  const isDone = completedLessons.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(lesson)}
                      className={`w-full text-left p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                        isActive ? "bg-primary/10 border border-primary/20" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                        isDone ? "bg-green-500 text-white" : isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                      }`}>
                        {isDone ? "✓" : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-bold text-sm truncate ${isActive ? "text-primary" : isDone ? "text-gray-400" : "text-dark"}`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-gray-400">⏱ {lesson.duration}</span>
                          {lesson.quiz && <span className="text-xs text-primary font-bold">📝 Quiz</span>}
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
