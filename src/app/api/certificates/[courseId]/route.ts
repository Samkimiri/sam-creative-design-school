import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB } from "@/lib/db";
import { courses, lessons } from "@/data/courses";
import type { ProgressRecord, Student } from "@/types";

export const runtime = "nodejs";

function cleanText(value: string): string {
  return value
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function escapePdfText(value: string): string {
  return cleanText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildCertificatePdf(studentName: string, courseTitle: string, certificateId: string): Buffer {
  const issuedOn = new Intl.DateTimeFormat("en-KE", {
    dateStyle: "long",
    timeZone: "Africa/Nairobi",
  }).format(new Date());

  const content = [
    "BT",
    "/F1 18 Tf",
    "60 540 Td",
    "(SAM CREATIVE DESIGN SCHOOL) Tj",
    "0 -52 Td",
    "/F1 34 Tf",
    "(Certificate of Completion) Tj",
    "0 -58 Td",
    "/F1 13 Tf",
    "(This certificate is proudly awarded to) Tj",
    "0 -48 Td",
    "/F1 28 Tf",
    `(${escapePdfText(studentName)}) Tj`,
    "0 -48 Td",
    "/F1 13 Tf",
    "(for successfully completing) Tj",
    "0 -38 Td",
    "/F1 22 Tf",
    `(${escapePdfText(courseTitle)}) Tj`,
    "0 -58 Td",
    "/F1 11 Tf",
    `(${escapePdfText(`Issued on ${issuedOn}`)}) Tj`,
    "0 -18 Td",
    `(${escapePdfText(`Certificate ID: ${certificateId}`)}) Tj`,
    "0 -18 Td",
    `(${escapePdfText(`Verify at /verify-certificate?id=${certificateId}`)}) Tj`,
    "0 -54 Td",
    "(Samuel Ndungu Kimiri) Tj",
    "0 -16 Td",
    "(Instructor, Sam Creative Design School) Tj",
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 792 612] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let index = 1; index <= objects.length; index++) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

export async function GET(
  _request: Request,
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

  const courseLessons = lessons.filter((lesson) => lesson.courseId === courseId);
  const progress = (await getDB<ProgressRecord>("progress.json")).find(
    (record) => record.studentId === session.user.id && record.courseId === courseId
  );
  const completed = new Set(progress?.completedLessons ?? []);
  const completedAllLessons =
    courseLessons.length > 0 && courseLessons.every((lesson) => completed.has(lesson.id));

  if (!completedAllLessons) {
    return NextResponse.json(
      { error: "Certificate unlocks after completing all lessons." },
      { status: 403 }
    );
  }

  const students = await getDB<Student>("students.json");
  const student = students.find((item) => item.id === session.user.id);
  const studentName = student?.name || session.user.name || "Student";
  const certificateId = `SCDS-${session.user.id}-${course.id}`;
  const pdf = buildCertificatePdf(studentName, course.title, certificateId);
  const body = new Uint8Array(pdf).buffer;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${course.id}-certificate.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
