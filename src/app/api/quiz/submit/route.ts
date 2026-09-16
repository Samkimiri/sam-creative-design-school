import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDBRecord, upsertDBRecord } from "@/lib/db";
import { lessons } from "@/data/courses";
import { getStudentWithConfirmedEnrollmentAccess, hasCourseAccess } from "@/lib/enrollmentAccess";

interface QuizAttempt {
  id?: string;
  studentId: string;
  courseId: string;
  lessonId: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  date: string;
}

interface ProgressRecord {
  id?: string;
  studentId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; total: number; date: string }[];
  lastAccessed: string;
}

function isProgressRecord(record: Partial<ProgressRecord>): record is ProgressRecord {
  return Boolean(record.studentId && record.courseId && Array.isArray(record.completedLessons));
}

function progressRecordId(studentId: string, courseId: string) {
  return `${studentId}:${courseId}`;
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid quiz submission" }, { status: 400 });
    }

    const { courseId, lessonId, answers } = body as {
      courseId?: unknown;
      lessonId?: unknown;
      answers?: unknown;
    };

    if (typeof courseId !== "string" || typeof lessonId !== "string") {
      return NextResponse.json({ error: "Course and lesson are required" }, { status: 400 });
    }

    const lesson = lessons.find(l => l.id === lessonId && l.courseId === courseId);
    if (!lesson || !lesson.quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const student = await getStudentWithConfirmedEnrollmentAccess(session.user.id);
    const canAccess = session.user.role === "admin" || hasCourseAccess(student, courseId);
    if (!canAccess) {
      return NextResponse.json({ error: "Course access requires admin approval" }, { status: 403 });
    }

    if (!Array.isArray(answers) && (!answers || typeof answers !== "object")) {
      return NextResponse.json({ error: "Answers are required" }, { status: 400 });
    }

    const submittedAnswers = Array.isArray(answers)
      ? answers
      : lesson.quiz.questions.map((q) => (answers as Record<string, unknown>)[q.id]);

    const hasInvalidAnswer = submittedAnswers.some((answer, index) => {
      const optionCount = lesson.quiz?.questions[index]?.options.length ?? 0;
      return typeof answer !== "number" || !Number.isInteger(answer) || answer < 0 || answer >= optionCount;
    });

    if (hasInvalidAnswer) {
      return NextResponse.json({ error: "Every question needs a valid answer" }, { status: 400 });
    }

    let score = 0;
    const results = lesson.quiz.questions.map((q, index) => {
      const selectedAnswer = Number(submittedAnswers[index]);
      const isCorrect = selectedAnswer === q.answer;
      if (isCorrect) score++;
      return {
        questionId: q.id,
        question: q.question,
        selectedAnswer,
        selectedOption: q.options[selectedAnswer] ?? "No answer selected",
        correctAnswer: q.answer,
        correctOption: q.options[q.answer],
        correct: isCorrect,
        explanation: q.explanation ?? "Review the lesson notes for this concept.",
      };
    });

    const total = lesson.quiz.questions.length;
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 70;

    // Each attempt is its own row under a unique id - a plain insert, never a
    // read-modify-write of the whole collection, so concurrent submissions
    // from other students (or this student's own retakes) can never race.
    const attemptId = `${session.user.id}:${lessonId}:${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
    await upsertDBRecord<QuizAttempt>("quiz-attempts.json", {
      id: attemptId,
      studentId: session.user.id as string,
      courseId,
      lessonId,
      score,
      total,
      percentage,
      passed,
      date: new Date().toISOString(),
    });

    // Quiz results also live on the student's progress record so the leaderboard's
    // quiz-average bonus and the admin Students tab's per-lesson quiz breakdown have
    // something to read - quiz-attempts.json alone only powers the completion gate above.
    // Read and write only this student's one course record (by a deterministic
    // id), not the whole progress collection - see /api/progress for why a
    // full-collection read-modify-write was silently erasing other students'
    // progress.
    const recordId = progressRecordId(session.user.id, courseId);
    const existing = await getDBRecord<ProgressRecord>("progress.json", recordId);
    const quizResultEntry = { lessonId, score, total, date: new Date().toISOString() };

    const savedProgress: ProgressRecord =
      existing && isProgressRecord(existing)
        ? {
            ...existing,
            id: recordId,
            quizScores: [
              ...(existing.quizScores || []).filter((entry) => entry.lessonId !== lessonId),
              quizResultEntry,
            ],
            lastAccessed: new Date().toISOString(),
          }
        : {
            id: recordId,
            studentId: session.user.id as string,
            courseId,
            completedLessons: [],
            quizScores: [quizResultEntry],
            lastAccessed: new Date().toISOString(),
          };

    await upsertDBRecord("progress.json", savedProgress);

    return NextResponse.json({ success: true, score, total, percentage, passed, results });
  } catch (error) {
    console.error("Quiz submission failed:", error);
    return NextResponse.json({ error: "Quiz submission failed" }, { status: 500 });
  }
}
