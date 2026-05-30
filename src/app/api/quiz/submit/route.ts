import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readJSON, writeJSON } from "@/lib/db";
import { lessons } from "@/data/courses";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { courseId, lessonId, answers } = await request.json();

    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson || !lesson.quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const submittedAnswers = Array.isArray(answers)
      ? answers
      : lesson.quiz.questions.map((q) => answers?.[q.id]);

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

    // Save quiz attempt
    const progress = readJSON<Record<string, unknown>>("progress.json");
    progress.push({
      studentId: session.user.id as string,
      courseId,
      lessonId,
      type: "quiz",
      score,
      total,
      percentage,
      passed,
      date: new Date().toISOString(),
    });
    writeJSON("progress.json", progress);

    return NextResponse.json({ success: true, score, total, percentage, passed, results });
  } catch {
    return NextResponse.json({ error: "Quiz submission failed" }, { status: 500 });
  }
}
