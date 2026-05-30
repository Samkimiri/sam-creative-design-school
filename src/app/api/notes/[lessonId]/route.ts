import { NextResponse } from "next/server";
import { courses, lessons } from "@/data/courses";

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

function wrapText(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  for (const paragraph of cleanText(text).split("\n\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = "";

    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > maxChars) {
        if (line) lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }

    if (line) lines.push(line);
    lines.push("");
  }
  return lines;
}

function buildPdf(title: string, subtitle: string, body: string): Buffer {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 56;
  const lineHeight = 15;
  const maxLinesPerPage = 42;
  const bodyLines = wrapText(body, 88);
  const pages: string[] = [];

  for (let start = 0; start < bodyLines.length; start += maxLinesPerPage) {
    const pageLines = bodyLines.slice(start, start + maxLinesPerPage);
    const commands = [
      "BT",
      "/F1 18 Tf",
      `${margin} ${pageHeight - margin} Td`,
      `(${escapePdfText(title)}) Tj`,
      "0 -24 Td",
      "/F1 11 Tf",
      `(${escapePdfText(subtitle)}) Tj`,
      "0 -28 Td",
      "/F1 10 Tf",
    ];

    pageLines.forEach((line, index) => {
      if (index > 0) commands.push(`0 -${lineHeight} Td`);
      commands.push(`(${escapePdfText(line)}) Tj`);
    });

    commands.push("ET");
    pages.push(commands.join("\n"));
  }

  const objects: string[] = [];
  const addObject = (content: string) => {
    objects.push(content);
    return objects.length;
  };

  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  void catalogId;
  objects.push("");
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds: number[] = [];

  pages.forEach((content) => {
    const streamId = addObject(`<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`);
    const pageId = addObject(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${streamId} 0 R >>`
    );
    pageIds.push(pageId);
  });

  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((content, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${content}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params;
  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const course = courses.find((item) => item.id === lesson.courseId);
  const filename = `${lesson.id}-notes.pdf`;
  const pdf = buildPdf(
    lesson.title,
    course ? `${course.title} - Lesson ${lesson.order}` : `Lesson ${lesson.order}`,
    lesson.content
  );

  const body = new Uint8Array(pdf).buffer;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
