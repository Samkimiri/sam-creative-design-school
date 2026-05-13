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

    let score = 0;
    const results = lesson.quiz.questions.map((q) => {
      const isCorrect = answers[q.id] === q.answer;
      if (isCorrect) score++;
      return { questionId: q.id, correct: isCorrect };
    });

    const total = lesson.quiz.questions.length;
    const percent = (score / total) * 100;

    // Save quiz attempt
    const progress = readJSON<Record<string, unknown>>("progress.json");
    progress.push({
      studentId: session.user.id as string,
      courseId,
      lessonId,
      type: "quiz",
      score,
      total,
      percent,
      date: new Date().toISOString(),
    });
    writeJSON("progress.json", progress);

    return NextResponse.json({ success: true, score, total, percent, results });
  } catch {
    return NextResponse.json({ error: "Quiz submission failed" }, { status: 500 });
  }
}
