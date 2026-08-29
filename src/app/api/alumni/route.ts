import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { courses, lessons } from "@/data/courses";
import type { ProgressRecord, Student } from "@/types";

export async function GET() {
  const [students, progress] = await Promise.all([
    getDB<Student>("students.json"),
    getDB<ProgressRecord>("progress.json"),
  ]);

  const alumni = students
    .filter((student) => student.isAlumni)
    .map((student) => {
      const enrolledCourseIds = student.enrolledCourses ?? [];
      const completedCourses = enrolledCourseIds
        .map((courseId) => {
          const course = courses.find((item) => item.id === courseId);
          const total = lessons.filter((item) => item.courseId === courseId).length;
          const completed = new Set(
            progress.find((item) => item.studentId === student.id && item.courseId === courseId)?.completedLessons ?? []
          ).size;
          return total > 0 && completed >= total ? course?.title ?? courseId : null;
        })
        .filter((title): title is string => Boolean(title));

      return {
        id: student.id,
        name: student.name,
        avatar: student.profileImage || student.avatar || null,
        completedCourses,
        alumniSince: student.alumniSince ?? student.createdAt ?? null,
      };
    })
    .sort((a, b) => new Date(b.alumniSince ?? 0).getTime() - new Date(a.alumniSince ?? 0).getTime());

  return NextResponse.json(
    { success: true, data: alumni },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
