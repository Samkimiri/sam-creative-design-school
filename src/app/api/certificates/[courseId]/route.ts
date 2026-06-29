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

function estimateTextWidth(value: string, fontSize: number): number {
  return cleanText(value).length * fontSize * 0.52;
}

function textLine(
  value: string,
  x: number,
  y: number,
  size: number,
  options: {
    font?: "F1" | "F2" | "F3";
    color?: string;
    align?: "left" | "center" | "right";
  } = {}
): string {
  const font = options.font || "F1";
  const color = options.color || "0.05 0.08 0.18";
  const align = options.align || "left";
  let tx = x;

  if (align === "center") {
    tx = x - estimateTextWidth(value, size) / 2;
  }

  if (align === "right") {
    tx = x - estimateTextWidth(value, size);
  }

  return [
    "BT",
    `/${font} ${size} Tf`,
    `${color} rg`,
    `${tx.toFixed(2)} ${y.toFixed(2)} Td`,
    `(${escapePdfText(value)}) Tj`,
    "ET",
  ].join("\n");
}

function wrapText(value: string, maxCharacters: number): string[] {
  const words = cleanText(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxCharacters && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function circlePath(cx: number, cy: number, r: number): string {
  const c = 0.5522847498 * r;
  return [
    `${cx + r} ${cy} m`,
    `${cx + r} ${cy + c} ${cx + c} ${cy + r} ${cx} ${cy + r} c`,
    `${cx - c} ${cy + r} ${cx - r} ${cy + c} ${cx - r} ${cy} c`,
    `${cx - r} ${cy - c} ${cx - c} ${cy - r} ${cx} ${cy - r} c`,
    `${cx + c} ${cy - r} ${cx + r} ${cy - c} ${cx + r} ${cy} c`,
  ].join(" ");
}

function buildCompletionCertificatePdf(studentName: string, courseTitle: string, certificateId: string): Buffer {
  const issuedOn = new Intl.DateTimeFormat("en-KE", {
    dateStyle: "long",
    timeZone: "Africa/Nairobi",
  }).format(new Date());
  const verifyUrl = `https://sam-creative-design-school.vercel.app/verify-certificate?id=${certificateId}`;
  const nameSize = cleanText(studentName).length > 24 ? 35 : 43;
  const completionLines = wrapText(
    `has successfully completed the ${courseTitle} course at Sam Creative Design School (SCDS), demonstrating creativity, dedication, and skill in professional design.`,
    68
  ).slice(0, 4);
  const dotPattern = Array.from({ length: 20 }, (_, row) =>
    Array.from({ length: 28 }, (_, col) => {
      const x = 16 + col * 24;
      const y = 22 + row * 28;
      return `0.88 0.90 0.92 rg ${x} ${y} 1.4 1.4 re f`;
    }).join("\n")
  ).join("\n");
  const leftDiamondPattern = Array.from({ length: 13 }, (_, row) =>
    Array.from({ length: 9 }, (_, col) => {
      const x = 6 + col * 16 + (row % 2) * 8;
      const y = 14 + row * 16;
      return `0.90 0.92 0.94 rg ${x} ${y} m ${x + 4} ${y + 4} l ${x} ${y + 8} l ${x - 4} ${y + 4} l f`;
    }).join("\n")
  ).join("\n");
  const rightDiamondPattern = Array.from({ length: 12 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => {
      const x = 694 + col * 16 + (row % 2) * 8;
      const y = 74 + row * 16;
      return `0.92 0.94 0.96 rg ${x} ${y} m ${x + 4} ${y + 4} l ${x} ${y + 8} l ${x - 4} ${y + 4} l f`;
    }).join("\n")
  ).join("\n");

  const content = [
    "0.99 0.995 1 rg 0 0 792 612 re f",
    dotPattern,
    leftDiamondPattern,
    rightDiamondPattern,
    "0.12 0.60 0.90 RG 6 w 14 14 764 584 re S",
    "0.98 0.72 0.18 RG 1.8 w 27 27 738 558 re S",
    "0.94 0.98 1 rg 210 45 535 500 re f",
    "1 1 1 rg 226 64 503 462 re f",
    "0.82 0.90 0.97 RG 1.2 w 226 64 503 462 re S",
    "0.12 0.60 0.90 rg 28 0 m 215 0 l 184 612 l 28 612 l f",
    "0.08 0.43 0.72 rg 176 612 m 218 612 l 188 0 l 148 0 l f",
    "0.72 0.88 0.98 rg 184 612 m 224 612 l 202 174 l 162 154 l f",
    "0.08 0.43 0.72 rg 28 58 m 206 28 l 215 0 l 28 0 l f",
    "0.98 0.72 0.18 rg 55 560 105 8 re f",
    "0.98 0.72 0.18 rg 55 43 105 8 re f",
    "0.96 0.98 1.00 rg 83 422 m 107 422 l 118 382 l 95 396 l 72 382 l 83 422 l f",
    `1 1 1 rg ${circlePath(95, 480, 45)} f`,
    `0.12 0.60 0.90 RG 6 w ${circlePath(95, 480, 35)} S`,
    `0.93 0.97 1 RG 2 w ${circlePath(95, 480, 44)} S`,
    "0.12 0.60 0.90 RG 8 w 73 480 m 89 463 l 121 500 l S",
    textLine("VERIFIED", 95, 436, 10, {
      font: "F2",
      color: "1 1 1",
      align: "center",
    }),
    "0.91 0.96 1 rg 590 454 m 760 454 l 736 418 l 612 418 l f",
    "0.12 0.60 0.90 rg 600 464 90 8 re f",
    "0.98 0.72 0.18 rg 610 448 100 8 re f",
    "0.91 0.20 0.15 rg 620 432 94 8 re f",
    "0.20 0.28 0.34 RG 2 w 650 426 m 664 493 l S",
    "0.20 0.28 0.34 RG 2 w 704 425 m 722 492 l S",
    "0.03 0.05 0.08 rg 656 552 m 738 572 l 762 530 l 676 510 l f",
    "0.86 0.05 0.08 rg 674 553 m 677 515 l 682 511 l 687 517 l 682 554 l f",
    `1 1 1 rg ${circlePath(502, 546, 43)} f`,
    `0.12 0.60 0.90 RG 2.4 w ${circlePath(502, 546, 37)} S`,
    "0.12 0.60 0.90 RG 2.4 w 462 546 m 477 576 524 579 544 548 c S",
    "0.12 0.60 0.90 RG 2.4 w 462 566 m 486 535 519 535 544 566 c S",
    "0.96 0.38 0.08 RG 2.2 w 475 552 m 492 545 511 555 531 548 c S",
    "0.98 0.72 0.18 RG 2.2 w 475 558 m 492 551 510 562 531 555 c S",
    "0.10 0.10 0.10 rg 492 523 20 13 re f",
    "0.12 0.60 0.90 RG 1.3 w 489 523 m 502 515 516 523 529 515 c S",
    textLine("Sam Creative Graphics", 504, 552, 9.5, {
      font: "F2",
      color: "0.12 0.60 0.90",
      align: "center",
    }),
    textLine("Exceptional  Strategic  Realistic", 504, 541, 3.8, {
      color: "0.10 0.10 0.10",
      align: "center",
    }),
    "0.12 0.60 0.90 rg 364 483 216 34 re f",
    "0.08 0.43 0.72 rg 364 483 216 6 re f",
    "0.98 0.72 0.18 rg 382 477 180 3 re f",
    textLine("BATCH 005", 472, 493, 21, {
      font: "F2",
      color: "1 1 1",
      align: "center",
    }),
    textLine("SAM CREATIVE DESIGN SCHOOL", 472, 449, 18,
    {
      color: "0.00 0.34 1.00",
      align: "center",
    }),
    textLine("CERTIFICATE OF COMPLETION", 472, 397, 32, {
      font: "F2",
      color: "0.12 0.60 0.90",
      align: "center",
    }),
    "0.98 0.72 0.18 RG 1.4 w 285 383 m 660 383 l S",
    textLine("This certifies that :", 472, 348, 19, {
      color: "0.30 0.30 0.32",
      align: "center",
    }),
    textLine(studentName, 472, 301, nameSize, {
      font: "F3",
      color: "0.24 0.24 0.25",
      align: "center",
    }),
    "0.25 0.25 0.26 RG 2.5 w 260 276 m 688 276 l S",
    ...completionLines.map((line, index) =>
      textLine(line, 472, 249 - index * 17, 13.7, {
        color: "0.28 0.28 0.30",
        align: "center",
      })
    ),
    "0.92 0.97 1.00 rg 342 142 260 38 re f",
    "0.12 0.60 0.90 RG 1.2 w 342 142 260 38 re S",
    textLine("Congratulations", 472, 154, 24, {
      font: "F2",
      color: "0.12 0.60 0.90",
      align: "center",
    }),
    "0.24 0.24 0.25 RG 1.6 w 392 112 m 422 126 446 104 472 116 c 502 131 527 104 557 119 c S",
    "0.25 0.25 0.26 RG 1.8 w 342 96 m 604 96 l S",
    textLine("SAMUEL NDUNG'U  |  TRAINER SCDS", 472, 73, 13.8, {
      color: "0.26 0.26 0.28",
      align: "center",
    }),
    "0.12 0.60 0.90 rg 282 18 380 31 re f",
    "0.08 0.43 0.72 rg 282 18 380 5 re f",
    textLine('"Equipping Creatives for Excellence"', 472, 28, 16, {
      color: "1 1 1",
      align: "center",
    }),
    textLine(`Issued on ${issuedOn}  |  Certificate ID: ${certificateId}`, 216, 19, 7.4, {
      color: "0.35 0.38 0.44",
    }),
    textLine(`Verify: ${verifyUrl}`, 788, 8, 6.3, {
      color: "0.50 0.54 0.60",
      align: "right",
    }),
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 792 612] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>",
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
  const isAdminPreview = session.user.role === "admin" && searchParams.get("preview") === "1";
  const shouldDownload = !isAdminPreview || searchParams.get("download") === "1";

  const courseLessons = lessons.filter((lesson) => lesson.courseId === courseId);
  const progress = (await getDB<ProgressRecord>("progress.json")).find(
    (record) => record.studentId === session.user.id && record.courseId === courseId
  );
  const completed = new Set(progress?.completedLessons ?? []);
  const completedAllLessons =
    courseLessons.length > 0 && courseLessons.every((lesson) => completed.has(lesson.id));

  if (!isAdminPreview && !completedAllLessons) {
    return NextResponse.json(
      { error: "Certificate unlocks after completing all lessons." },
      { status: 403 }
    );
  }

  const students = await getDB<Student>("students.json");
  const student = students.find((item) => item.id === session.user.id);
  const previewName = cleanText(searchParams.get("studentName") || "").trim().slice(0, 60);
  const studentName = isAdminPreview
    ? previewName || "Robert Rangoma"
    : student?.name || session.user.name || "Student";
  const certificateId = isAdminPreview
    ? `SCDS-PREVIEW-${course.id}`
    : `SCDS-${session.user.id}-${course.id}`;
  const pdf = buildCompletionCertificatePdf(studentName, course.title, certificateId);
  const body = new Uint8Array(pdf).buffer;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${shouldDownload ? "attachment" : "inline"}; filename="${course.id}-certificate.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
