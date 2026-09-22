import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { ensureCompletionStamp } from "@/lib/completionStamp";
import { courses } from "@/data/courses";
import { certificateIdFor, getCourseCompletion } from "@/lib/courseCompletion";
import { getStudentWithConfirmedEnrollmentAccess, hasCourseAccess } from "@/lib/enrollmentAccess";
import type { ProgressRecord } from "@/types";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";
import { buildCompletionCertificatePdf, cleanText } from "@/lib/certificatePdf";
import { buildCertificateSvg } from "@/lib/certificateSvg";
import sharp from "sharp";

export const runtime = "nodejs";

// The certificate SVG's viewBox is 792x612 units. sharp rasterizes an SVG assuming
// 72 units per inch unless told otherwise, so density 72*N gives an N x output -
// explicit rather than relying on sharp's default, which has changed across versions.
const RASTER_SCALE = 4; // -> 3168x2448, crisp for print and full-screen viewing
const SVG_BASE_DENSITY = 72;
const CONTENT_TYPES = { pdf: "application/pdf", png: "image/png", jpeg: "image/jpeg" } as const;
type CertificateFormat = keyof typeof CONTENT_TYPES;

function parseFormat(value: string | null): CertificateFormat | null {
  const normalized = (value || "pdf").toLowerCase();
  if (normalized === "jpg") return "jpeg";
  if (normalized === "pdf" || normalized === "png" || normalized === "jpeg") return normalized;
  return null;
}

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
  const format = parseFormat(searchParams.get("format"));
  if (!format) {
    return NextResponse.json({ error: "Unsupported format. Use pdf, png, or jpeg." }, { status: 400 });
  }
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
    : searchParams.get("view") !== "1";
  const intake = await getUpcomingIntakeSettings();

  // The issue date and cohort come from the moment the course was actually finished (stamped
  // by the progress API), so the same certificate reads identically on every download.
  // Students who finished before completion dates were recorded get an estimated date
  // stamped here on first download, with no cohort claimed.
  let stampedRecord = completedRecord;
  if (stampedRecord && !isAdminPreview) {
    stampedRecord = await ensureCompletionStamp(stampedRecord);
  }
  const issuedAt = stampedRecord?.courseCompletedAt;
  const cohort = stampedRecord?.completionCohort ?? intake.currentCohort;

  const filename = `${course.id}-certificate.${format === "jpeg" ? "jpg" : format}`;
  const headers = {
    "Content-Type": CONTENT_TYPES[format],
    "Content-Disposition": `${shouldDownload ? "attachment" : "inline"}; filename="${filename}"`,
    "Cache-Control": "no-store",
  };

  if (format === "pdf") {
    const pdf = buildCompletionCertificatePdf(studentName, course.title, certificateId, cohort, issuedAt);
    return new NextResponse(new Uint8Array(pdf).buffer, { headers });
  }

  // PNG/JPEG are rasterized from the same SVG design the homepage preview uses, filled in
  // with this student's real details, so every format shows an identical-looking certificate.
  const svg = buildCertificateSvg({ studentName, courseTitle: course.title, certificateId, cohortLabel: cohort, issuedAt });
  const image = sharp(Buffer.from(svg), { density: SVG_BASE_DENSITY * RASTER_SCALE }).resize(792 * RASTER_SCALE, 612 * RASTER_SCALE, {
    fit: "fill",
  });
  const raster =
    format === "jpeg"
      ? await image.flatten({ background: "#ffffff" }).jpeg({ quality: 92 }).toBuffer()
      : await image.png().toBuffer();

  return new NextResponse(new Uint8Array(raster).buffer, { headers });
}
