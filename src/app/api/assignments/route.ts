import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, getDBRecord, saveDB } from "@/lib/db";
import { courses, lessons } from "@/data/courses";
import { hasCourseAccess } from "@/lib/enrollmentAccess";
import type { AssignmentSubmission, Student } from "@/types";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Login required" }, { status: 401 });
  }
  const submissions = await getDB<AssignmentSubmission>("assignments.json");
  return NextResponse.json({
    success: true,
    data: submissions.filter((item) => item.studentId === session.user.id),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Login required" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const course = courses.find((item) => item.id === body.courseId);
  const lesson = lessons.find((item) => item.id === body.lessonId && item.courseId === body.courseId);
  const fileUrl = String(body.fileUrl || "").trim();
  const notes = String(body.notes || "").trim();

  if (!course || !lesson || (!fileUrl && !notes)) {
    return NextResponse.json({ success: false, message: "Choose a lesson and add a project link or notes." }, { status: 400 });
  }

  const student = await getDBRecord<Student>("students.json", session.user.id);
  const canAccess = session.user.role === "admin" || hasCourseAccess(student, course.id);
  if (!canAccess) {
    return NextResponse.json({ success: false, message: "Course access requires admin approval." }, { status: 403 });
  }

  const submissions = await getDB<AssignmentSubmission>("assignments.json");
  const assignment: AssignmentSubmission = {
    id: `ASG-${Date.now()}`,
    studentId: session.user.id,
    studentName: session.user.name,
    courseId: course.id,
    courseName: course.title,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    fileUrl: fileUrl.slice(0, 300),
    notes: notes.slice(0, 800),
    status: "submitted",
    createdAt: new Date().toISOString(),
  };

  await saveDB("assignments.json", [assignment, ...submissions].slice(0, 200));
  return NextResponse.json({ success: true, data: assignment });
}
