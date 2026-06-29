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
    "1 1 1 rg 0 0 792 612 re f",
    dotPattern,
    leftDiamondPattern,
    rightDiamondPattern,
    "1 1 1 rg 205 0 m 792 0 l 792 612 l 182 612 l f",
    "0.12 0.60 0.90 rg 32 0 m 210 0 l 184 612 l 32 612 l f",
    "0.10 0.55 0.84 rg 184 612 m 210 612 l 178 0 l 154 0 l f",
    "0.96 0.98 1.00 rg 84 430 m 104 430 l 112 404 l 92 414 l 72 404 l 80 430 l f",
    "1 1 1 rg 72 440 78 78 re f",
    "0.12 0.60 0.90 RG 6 w 91 478 m 108 458 l 132 494 l S",
    "0.12 0.60 0.90 RG 5 w 84 450 56 56 re S",
    "1 1 1 rg 448 531 112 52 re f",
    "0.72 0.74 0.76 RG 1.2 w 448 531 112 52 re S",
    "0.12 0.60 0.90 RG 2 w 456 538 m 472 571 528 572 546 539 c S",
    "0.12 0.60 0.90 RG 2 w 456 576 m 488 548 521 548 546 576 c S",
    "0.96 0.38 0.08 RG 2 w 474 557 m 491 551 511 560 531 553 c S",
    "0.96 0.75 0.12 RG 2 w 475 562 m 492 556 510 566 530 558 c S",
    textLine("Sam Creative Graphics", 504, 552, 9.5, {
      font: "F2",
      color: "0.12 0.60 0.90",
      align: "center",
    }),
    textLine("Exceptional  Strategic  Realistic", 504, 541, 3.8, {
      color: "0.10 0.10 0.10",
      align: "center",
    }),
    "0.03 0.05 0.08 rg 698 572 m 774 588 l 782 548 l 704 532 l f",
    "0.96 0.75 0.12 rg 684 505 78 8 re f",
    "0.91 0.20 0.15 rg 690 518 78 8 re f",
    "0.12 0.60 0.90 rg 680 492 78 8 re f",
    "0.20 0.28 0.34 RG 1.5 w 716 498 m 718 548 l S",
    "0.20 0.28 0.34 RG 1.5 w 742 502 m 752 545 l S",
    "0.86 0.05 0.08 rg 707 569 m 709 540 l 713 537 l 716 542 l 712 570 l f",
    "0.12 0.60 0.90 rg 374 482 198 30 re f",
    textLine("BATCH 005", 473, 490, 20, {
      font: "F2",
      color: "1 1 1",
      align: "center",
    }),
    textLine("SAM CREATIVE DESIGN SCHOOL", 473, 446, 17, {
      color: "0.00 0.34 1.00",
      align: "center",
    }),
    textLine("CERTIFICATE OF COMPLETION", 473, 392, 31, {
      font: "F2",
      color: "0.12 0.60 0.90",
      align: "center",
    }),
    textLine("This certifies that :", 473, 350, 19, {
      color: "0.30 0.30 0.32",
      align: "center",
    }),
    textLine(studentName, 473, 300, nameSize, {
      font: "F3",
      color: "0.24 0.24 0.25",
      align: "center",
    }),
    "0.25 0.25 0.26 RG 2 w 260 276 m 688 276 l S",
    ...completionLines.map((line, index) =>
      textLine(line, 473, 250 - index * 17, 13.5, {
        color: "0.28 0.28 0.30",
        align: "center",
      })
    ),
    textLine("Congratulations", 473, 130, 23, {
      font: "F2",
      color: "0.12 0.60 0.90",
      align: "center",
    }),
    "0.24 0.24 0.25 RG 1.4 w 395 105 m 422 116 446 99 473 111 c 500 124 526 99 555 112 c S",
    "0.25 0.25 0.26 RG 1.4 w 342 91 m 604 91 l S",
    textLine("SAMUEL NDUNG'U  |  TRAINER SCDS", 473, 69, 13.5, {
      color: "0.26 0.26 0.28",
      align: "center",
    }),
    "0.12 0.60 0.90 rg 300 18 346 27 re f",
    textLine('"Equipping Creatives for Excellence"', 473, 26, 15, {
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
  const pdf = buildCompletionCertificatePdf(studentName, course.title, certificateId);
  const body = new Uint8Array(pdf).buffer;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${course.id}-certificate.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
