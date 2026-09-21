import { getDB, upsertDBRecord } from "@/lib/db";
import { getCourseCompletion, getCourseLessonIds } from "@/lib/courseCompletion";
import type { ProgressRecord } from "@/types";

interface QuizAttemptDate {
  studentId: string;
  lessonId: string;
  passed: boolean;
  date: string;
}

function isValidDate(value: string | undefined): value is string {
  return Boolean(value) && !Number.isNaN(new Date(value as string).getTime());
}

// Students who finished a course before completion dates were recorded have no exact
// finish date. The best evidence we have is the last quiz they passed in that course,
// then their last recorded activity. It is an estimate, and no cohort is claimed for
// them because we cannot know which one they were in.
export function estimateCompletionDate(record: ProgressRecord, attempts: QuizAttemptDate[]): string {
  const lessonIds = new Set(getCourseLessonIds(record.courseId));
  const passedDates = attempts
    .filter((attempt) => attempt.studentId === record.studentId && attempt.passed && lessonIds.has(attempt.lessonId))
    .map((attempt) => attempt.date)
    .filter(isValidDate)
    .sort();

  const lastPassedQuiz = passedDates[passedDates.length - 1];
  if (lastPassedQuiz) return lastPassedQuiz;
  if (isValidDate(record.lastAccessed)) return record.lastAccessed;
  return new Date().toISOString();
}

function needsStamp(record: ProgressRecord) {
  return !record.courseCompletedAt && getCourseCompletion(record.courseId, record.completedLessons).isComplete;
}

async function stamp(record: ProgressRecord, attempts: QuizAttemptDate[]): Promise<ProgressRecord> {
  const stamped: ProgressRecord = {
    ...record,
    id: record.id ?? `${record.studentId}:${record.courseId}`,
    courseCompletedAt: estimateCompletionDate(record, attempts),
    completionCohort: record.completionCohort ?? "",
  };
  await upsertDBRecord("progress.json", stamped);
  return stamped;
}

// Stamps one student's finished course if it has no completion date yet.
export async function ensureCompletionStamp(record: ProgressRecord): Promise<ProgressRecord> {
  if (!needsStamp(record)) return record;
  try {
    const attempts = (await getDB<QuizAttemptDate>("quiz-attempts.json")).filter(
      (attempt) => attempt.studentId === record.studentId
    );
    return await stamp(record, attempts);
  } catch (error) {
    console.error("Could not record completion date (non-fatal):", error);
    return record;
  }
}

// Stamps every finished-but-unstamped course. Safe to run repeatedly.
export async function backfillCompletionStamps(): Promise<{ checked: number; stamped: number; failed: number }> {
  const [records, attempts] = await Promise.all([
    getDB<ProgressRecord>("progress.json"),
    getDB<QuizAttemptDate>("quiz-attempts.json"),
  ]);

  let stamped = 0;
  let failed = 0;
  for (const record of records) {
    if (!record.studentId || !record.courseId || !Array.isArray(record.completedLessons)) continue;
    if (!needsStamp(record)) continue;
    try {
      await stamp(record, attempts);
      stamped += 1;
    } catch (error) {
      failed += 1;
      console.error("Completion backfill failed for a record:", error);
    }
  }

  return { checked: records.length, stamped, failed };
}
