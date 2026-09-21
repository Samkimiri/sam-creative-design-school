import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, upsertDBRecord } from "@/lib/db";
import { courses } from "@/data/courses";
import { certificateIdFor, getCourseCompletion } from "@/lib/courseCompletion";
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

  let completedRecord: ProgressRecord | undefined;

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
    if (!getCourseCompletion(courseId, targetProgress?.completedLessons).isComplete) {
      return NextResponse.json(
        { error: "This student has not completed all lessons in this course yet." },
        { status: 403 }
      );
    }

    studentName = targetStudent.name || "Student";
    certificateId = certificateIdFor(adminStudentId as string, course.id);
    completedRecord = targetProgress;
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
    if (!isAdmin && !getCourseCompletion(courseId, progress?.completedLessons).isComplete) {
      return NextResponse.json(
        { error: "Certificate unlocks after completing all lessons." },
        { status: 403 }
      );
    }

    studentName = student?.name || session.user.name || "Student";
    certificateId = certificateIdFor(session.user.id, course.id);
    completedRecord = progress;
  }

  const shouldDownload = (isAdminPreview || isAdminIssuedView)
    ? searchParams.get("download") === "1"
    : true;
  const intake = await getUpcomingIntakeSettings();

  // The issue date and cohort come from the moment the course was actually finished (stamped
  // by the progress API), so the same certificate reads identically on every download. Students
  // who finished before that stamp existed get it recorded now, the first time they download.
  let issuedAt: string | undefined = completedRecord?.courseCompletedAt;
  let cohort = completedRecord?.completionCohort ?? intake.currentCohort;
  if (
    completedRecord &&
    !issuedAt &&
    !isAdminPreview &&
    getCourseCompletion(courseId, completedRecord.completedLessons).isComplete
  ) {
    issuedAt = new Date().toISOString();
    cohort = intake.currentCohort;
    try {
      await upsertDBRecord("progress.json", {
        ...completedRecord,
        id: completedRecord.id ?? `${completedRecord.studentId}:${completedRecord.courseId}`,
        courseCompletedAt: issuedAt,
        completionCohort: cohort,
      });
    } catch (error) {
      console.error("Could not record certificate issue date (non-fatal):", error);
    }
  }

  const pdf = buildCompletionCertificatePdf(studentName, course.title, certificateId, cohort, issuedAt);
  const body = new Uint8Array(pdf).buffer;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${shouldDownload ? "attachment" : "inline"}; filename="${course.id}-certificate.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
