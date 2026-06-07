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

function buildCertificatePdf(studentName: string, courseTitle: string, certificateId: string): Buffer {
  const issuedOn = new Intl.DateTimeFormat("en-KE", {
    dateStyle: "long",
    timeZone: "Africa/Nairobi",
  }).format(new Date());
  const verifyUrl = `https://sam-creative-design-school.vercel.app/verify-certificate?id=${certificateId}`;
  const courseLines = wrapText(courseTitle, 48).slice(0, 2);

  const content = [
    "0.98 0.99 1 rg 0 0 792 612 re f",
    "0.02 0.10 0.32 RG 8 w 30 30 732 552 re S",
    "0.00 0.34 1.00 RG 2 w 46 46 700 520 re S",
    "0.95 0.68 0.00 rg 46 548 700 18 re f",
    "0.00 0.34 1.00 rg 46 46 700 10 re f",
    "0.02 0.10 0.32 rg 0 0 m 0 612 l 170 612 l 95 548 l 46 548 l 46 46 l 92 46 l 170 0 l 0 0 l f",
    "0.00 0.34 1.00 rg 622 612 m 792 612 l 792 0 l 622 0 l 700 46 l 746 46 l 746 548 l 700 548 l 622 612 l f",
    "q",
    "1 1 1 rg 113 503 m 187 503 l 203 570 l 150 592 l 97 570 l 113 503 l f",
    "0.02 0.10 0.32 RG 3 w 113 503 m 187 503 l 203 570 l 150 592 l 97 570 l 113 503 l S",
    "0.00 0.34 1.00 RG 2 w 120 512 m 180 512 l 193 566 l 150 584 l 107 566 l 120 512 l S",
    "0.02 0.10 0.32 rg 105 580 m 195 580 l 150 602 l f",
    "0.95 0.68 0.00 rg 145 515 m 155 515 l 162 548 l 150 563 l 138 548 l f",
    "0.95 0.68 0.00 rg 148 505 4 20 re f",
    "0.00 0.34 1.00 rg 122 548 20 36 re f",
    "0.02 0.10 0.32 rg 158 548 20 36 re f",
    "Q",
    textLine("SCDS", 150, 532, 16, { font: "F2", color: "0.02 0.10 0.32", align: "center" }),
    textLine("SAM CREATIVE DESIGN SCHOOL", 396, 522, 17, {
      font: "F2",
      color: "0.02 0.10 0.32",
      align: "center",
    }),
    textLine("Exceptional, Strategic & Realistic", 396, 498, 11, {
      font: "F3",
      color: "0.00 0.34 1.00",
      align: "center",
    }),
    "0.75 0.82 0.93 RG 1.2 w 234 482 m 558 482 l S",
    textLine("CERTIFICATE OF COMPLETION", 396, 433, 31, {
      font: "F2",
      color: "0.02 0.10 0.32",
      align: "center",
    }),
    textLine("This certificate is proudly awarded to", 396, 393, 12, {
      color: "0.28 0.33 0.43",
      align: "center",
    }),
    textLine(studentName, 396, 344, 32, {
      font: "F2",
      color: "0.00 0.34 1.00",
      align: "center",
    }),
    "0.95 0.68 0.00 RG 2 w 210 326 m 582 326 l S",
    textLine("for successfully completing the professional course", 396, 292, 12, {
      color: "0.28 0.33 0.43",
      align: "center",
    }),
    ...courseLines.map((line, index) =>
      textLine(line, 396, 252 - index * 25, 20, {
        font: "F2",
        color: "0.02 0.10 0.32",
        align: "center",
      })
    ),
    "0.94 0.97 1.00 rg 160 150 472 54 re f",
    "0.72 0.82 0.95 RG 1 w 160 150 472 54 re S",
    textLine(`Issued on ${issuedOn}`, 186, 183, 10, { font: "F2", color: "0.05 0.08 0.18" }),
    textLine(`Certificate ID: ${certificateId}`, 186, 164, 9, { color: "0.28 0.33 0.43" }),
    textLine("Verified digital certificate", 606, 183, 10, {
      font: "F2",
      color: "0.00 0.34 1.00",
      align: "right",
    }),
    textLine("Completion status: 100%", 606, 164, 9, {
      color: "0.28 0.33 0.43",
      align: "right",
    }),
    "0.00 0.34 1.00 RG 2 w 133 128 m 155 142 178 111 205 129 c 226 143 250 126 275 139 c S",
    "0.95 0.68 0.00 RG 1.2 w 162 119 m 190 132 218 116 255 128 c S",
    "0.02 0.10 0.32 RG 1.4 w 132 104 m 302 104 l S",
    textLine("Samuel Ndungu Kimiri", 217, 82, 11, {
      font: "F2",
      color: "0.05 0.08 0.18",
      align: "center",
    }),
    textLine("Instructor & Director", 217, 66, 9, {
      color: "0.28 0.33 0.43",
      align: "center",
    }),
    "0.02 0.10 0.32 RG 1.4 w 490 104 m 660 104 l S",
    textLine("SCDS Academic Office", 575, 82, 11, {
      font: "F2",
      color: "0.05 0.08 0.18",
      align: "center",
    }),
    textLine("Certificate Verification", 575, 66, 9, {
      color: "0.28 0.33 0.43",
      align: "center",
    }),
    textLine(`Verify: ${verifyUrl}`, 396, 42, 7.8, {
      color: "0.28 0.33 0.43",
      align: "center",
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
