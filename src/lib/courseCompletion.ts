import { lessons } from "@/data/courses";

// The single definition of "finished a course", shared by the certificate download,
// certificate verification, the leaderboard, the admin eligibility list, the LMS
// dashboard and the progress API. A course is complete only when every one of its
// current lessons is in the student's completed list - counting entries instead
// would let a stale or duplicated lesson id stand in for a lesson never finished.

export function getCourseLessonIds(courseId: string): string[] {
  return lessons.filter((lesson) => lesson.courseId === courseId).map((lesson) => lesson.id);
}

export function getCourseCompletion(courseId: string, completedLessonIds: readonly string[] = []) {
  const lessonIds = getCourseLessonIds(courseId);
  const completed = new Set(completedLessonIds);
  const completedCount = lessonIds.filter((id) => completed.has(id)).length;
  const total = lessonIds.length;

  return {
    total,
    completedCount,
    percent: total > 0 ? Math.round((completedCount / total) * 100) : 0,
    isComplete: total > 0 && completedCount === total,
  };
}

export function isCourseComplete(courseId: string, completedLessonIds: readonly string[] = []): boolean {
  return getCourseCompletion(courseId, completedLessonIds).isComplete;
}

export function certificateIdFor(studentId: string, courseId: string): string {
  return `SCDS-${studentId}-${courseId}`;
}
