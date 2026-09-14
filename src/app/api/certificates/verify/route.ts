import { NextResponse } from "next/server";
import { courses, lessons } from "@/data/courses";
import { getDB } from "@/lib/db";
import { hasCourseAccess } from "@/lib/enrollmentAccess";
import type { ProgressRecord, Student } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = String(searchParams.get("id") || "").trim();

  if (!id.startsWith("SCDS-")) {
    return NextResponse.json({ success: false, message: "Enter a valid certificate ID." }, { status: 400 });
  }

  const students = await getDB<Student>("students.json");
  const progress = await getDB<ProgressRecord>("progress.json");

  for (const student of students) {
    for (const course of courses) {
      const certificateId = `SCDS-${student.id}-${course.id}`;
      if (certificateId !== id) continue;

      const courseLessons = lessons.filter((lesson) => lesson.courseId === course.id);
      const record = progress.find((item) => item.studentId === student.id && item.courseId === course.id);
      const completed = new Set(record?.completedLessons ?? []);
      const allLessonsCompleted = courseLessons.length > 0 && courseLessons.every((lesson) => completed.has(lesson.id));
      // A certificate for a course the student no longer has access to (paused,
      // or the enrollment was later revoked - e.g. a refund) should stop
      // verifying as valid, even though the lessons were genuinely completed
      // in the past - otherwise a revoked student's certificate keeps checking
      // out forever via this public tool.
      const valid = allLessonsCompleted && hasCourseAccess(student, course.id);

      return NextResponse.json({
        success: true,
        data: {
          valid,
          certificateId,
          studentName: student.name,
          courseTitle: course.title,
          completedLessons: completed.size,
          totalLessons: courseLessons.length,
        },
      });
    }
  }

  return NextResponse.json({ success: false, message: "Certificate was not found." }, { status: 404 });
}
