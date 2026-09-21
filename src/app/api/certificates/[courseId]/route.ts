import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { courses, lessons } from "@/data/courses";
import { getStudentWithConfirmedEnrollmentAccess, hasCourseAccess } from "@/lib/enrollmentAccess";
import type { ProgressRecord } from "@/types";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";
import { buildCompletionCertificatePdf, cleanText } from "@/lib/certificatePdf";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { courseId } = await params;
  const course = courses.find((item) => item.id === courseId);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const isAdmin = session.user.role === "admin";
  const isAdminPreview = isAdmin && searchParams.get("preview") === "1";
  const adminStudentId = isAdmin ? searchParams.get("studentId") : null;
  const isAdminIssuedView = isAdmin && Boolean(adminStudentId) && !isAdminPreview;

  const courseLessons = lessons.filter((lesson) => lesson.courseId === courseId);

  let studentName: string;
  let certificateId: string;

  if (isAdminPreview) {
    const previewName = cleanText(searchParams.get("studentName") || "").trim().slice(0, 60);
    studentName = previewName || "Robert Rangoma";
    certificateId = `SCDS-PREVIEW-${course.id}`;
  } else if (isAdminIssuedView) {
    const targetStudent = await getStudentWithConfirmedEnrollmentAccess(adminStudentId as string);
    if (!targetStudent) {
      return NextResponse.json({ error: "Student not found." }, { status: 404 });
    }

    const targetProgress = (await getDB<ProgressRecord>("progress.json")).find(
      (record) => record.studentId === adminStudentId && record.courseId === courseId
    );
    const targetCompleted = new Set(targetProgress?.completedLessons ?? []);
    const targetCompletedAllLessons =
      courseLessons.length > 0 && courseLessons.every((lesson) => targetCompleted.has(lesson.id));

    if (!targetCompletedAllLessons) {
      return NextResponse.json(
        { error: "This student has not completed all lessons in this course yet." },
        { status: 403 }
      );
    }

    studentName = targetStudent.name || "Student";
    certificateId = `SCDS-${adminStudentId}-${course.id}`;
  } else {
    const student = await getStudentWithConfirmedEnrollmentAccess(session.user.id);

    if (!isAdmin && !hasCourseAccess(student, courseId)) {
      return NextResponse.json(
        { error: "Course access requires admin approval." },
        { status: 403 }
      );
    }

    const progress = (await getDB<ProgressRecord>("progress.json")).find(
      (record) => record.studentId === session.user.id && record.courseId === courseId
    );
    const completed = new Set(progress?.completedLessons ?? []);
    const completedAllLessons =
      courseLessons.length > 0 && courseLessons.every((lesson) => completed.has(lesson.id));

    if (!isAdmin && !completedAllLessons) {
      return NextResponse.json(
        { error: "Certificate unlocks after completing all lessons." },
        { status: 403 }
      );
    }

    studentName = student?.name || session.user.name || "Student";
    certificateId = `SCDS-${session.user.id}-${course.id}`;
  }

  const shouldDownload = (isAdminPreview || isAdminIssuedView)
    ? searchParams.get("download") === "1"
    : true;
  const intake = await getUpcomingIntakeSettings();
  const pdf = buildCompletionCertificatePdf(studentName, course.title, certificateId, intake.currentCohort);
  const body = new Uint8Array(pdf).buffer;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${shouldDownload ? "attachment" : "inline"}; filename="${course.id}-certificate.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
