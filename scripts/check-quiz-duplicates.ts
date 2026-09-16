// Guards against the exact bug this script was written to catch: a course's
// lesson-generator (or a hand-authored lesson) reusing the same literal quiz
// question text across multiple lessons. Run via `npm run check:quizzes`
// (also part of `npm test`) - fails loudly with the offending lesson ids so
// it catches this for every course that exists today AND any course added
// in the future, without needing per-course maintenance.
import { lessons } from "../src/data/courses";

type Occurrence = { lessonId: string; courseId: string; questionId: string };

const byQuestionText = new Map<string, Occurrence[]>();

for (const lesson of lessons) {
  if (!lesson.quiz) continue;
  for (const question of lesson.quiz.questions) {
    const key = question.question.trim().toLowerCase();
    const list = byQuestionText.get(key) ?? [];
    list.push({ lessonId: lesson.id, courseId: lesson.courseId, questionId: question.id });
    byQuestionText.set(key, list);
  }
}

const duplicates = [...byQuestionText.entries()].filter(([, occurrences]) => occurrences.length > 1);

if (duplicates.length > 0) {
  console.error(`Found ${duplicates.length} quiz question(s) repeated across more than one lesson:\n`);
  for (const [text, occurrences] of duplicates) {
    console.error(`  "${text}"`);
    for (const occ of occurrences) {
      console.error(`    - ${occ.courseId} / ${occ.lessonId} (${occ.questionId})`);
    }
    console.error("");
  }
  console.error(
    "Fix: give the question wording something lesson-specific (title, module, or theme) so no two lessons ask the literal same question - see checkpointSubmissionStems / expansionSubmissionStems in src/data/courses.ts for the existing pattern."
  );
  process.exit(1);
}

const totalQuestions = [...byQuestionText.values()].reduce((sum, list) => sum + list.length, 0);
console.log(`OK: ${totalQuestions} quiz questions across ${lessons.filter((l) => l.quiz).length} lessons, no duplicates.`);
