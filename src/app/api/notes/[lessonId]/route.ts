import { NextResponse } from "next/server";
import { getManagedCourses, getManagedLessons } from "@/lib/contentSettings";

export const runtime = "nodejs";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const ACCENT_COLOR = "0.05 0.35 0.85";
const TEXT_COLOR = "0.16 0.18 0.22";
const MUTED_COLOR = "0.45 0.47 0.52";
const HEADING_GAP = 20;
const PARAGRAPH_LINE_HEIGHT = 15.5;
const BULLET_LINE_HEIGHT = 15.5;

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

function wrapLine(text: string, fontSize: number, bold: boolean, maxWidth: number, indent = 0): string[] {
  const charWidth = fontSize * (bold ? 0.58 : 0.51);
  const maxChars = Math.max(10, Math.floor((maxWidth - indent) / charWidth));
  const words = cleanText(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.length > 0 ? lines : [""];
}

type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] };

function parseContentBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const paragraphs = content.split("\n\n").map((p) => p.trim()).filter(Boolean);

  paragraphs.forEach((paragraph, index) => {
    // The first paragraph is always the course/module/lesson title restatement line,
    // never an actual "Label: content" section - skip heading detection for it.
    const match = index > 0 ? paragraph.match(/^([^:]{3,45}):\s+([\s\S]+)$/) : null;
    if (match) {
      blocks.push({ type: "heading", text: match[1] });
      blocks.push({ type: "paragraph", text: match[2] });
    } else {
      blocks.push({ type: "paragraph", text: paragraph });
    }
  });

  return blocks;
}

type DrawLine = {
  text: string;
  font: "F1" | "F2";
  size: number;
  color: string;
  height: number;
  gapBefore: number;
};

function buildDrawLines(blocks: ContentBlock[]): DrawLine[] {
  const lines: DrawLine[] = [];

  blocks.forEach((block, blockIndex) => {
    if (block.type === "heading") {
      lines.push({
        text: block.text.toUpperCase(),
        font: "F2",
        size: 11.5,
        color: ACCENT_COLOR,
        height: 16,
        gapBefore: blockIndex === 0 ? 0 : HEADING_GAP,
      });
      return;
    }

    if (block.type === "paragraph") {
      const wrapped = wrapLine(block.text, 10.5, false, CONTENT_WIDTH);
      wrapped.forEach((line, index) => {
        lines.push({
          text: line,
          font: "F1",
          size: 10.5,
          color: TEXT_COLOR,
          height: PARAGRAPH_LINE_HEIGHT,
          gapBefore: index === 0 ? 6 : 0,
        });
      });
      return;
    }

    block.items.forEach((item, itemIndex) => {
      const wrapped = wrapLine(item, 10.5, false, CONTENT_WIDTH, 22);
      wrapped.forEach((line, lineIndex) => {
        lines.push({
          text: lineIndex === 0 ? `${itemIndex + 1}.  ${line}` : `     ${line}`,
          font: "F1",
          size: 10.5,
          color: TEXT_COLOR,
          height: BULLET_LINE_HEIGHT,
          gapBefore: lineIndex === 0 ? (itemIndex === 0 ? 6 : 5) : 0,
        });
      });
    });
  });

  return lines;
}

function textCommand(text: string, x: number, y: number, size: number, font: "F1" | "F2", color: string): string {
  return ["BT", `/${font} ${size} Tf`, `${color} rg`, `${x.toFixed(2)} ${y.toFixed(2)} Td`, `(${escapePdfText(text)}) Tj`, "ET"].join("\n");
}

function buildPdf(input: { title: string; subtitle: string; content: string; keyPoints: string[] }): Buffer {
  const blocks = parseContentBlocks(input.content);
  if (input.keyPoints.length > 0) {
    blocks.push({ type: "heading", text: "Key Takeaways From This Class" });
    blocks.push({ type: "bullets", items: input.keyPoints });
  }

  const drawLines = buildDrawLines(blocks);
  const headerHeight = 96;
  const footerHeight = 34;
  const firstPageUsableHeight = PAGE_HEIGHT - MARGIN * 2 - headerHeight - footerHeight;
  const otherPageUsableHeight = PAGE_HEIGHT - MARGIN * 2 - footerHeight;

  const pages: DrawLine[][] = [];
  let current: DrawLine[] = [];
  let consumed = 0;

  drawLines.forEach((line, index) => {
    const usable = pages.length === 0 ? firstPageUsableHeight : otherPageUsableHeight;
    let lineSpace = line.height + line.gapBefore;

    if (line.font === "F2") {
      const nextLine = drawLines[index + 1];
      if (nextLine) lineSpace += nextLine.height + nextLine.gapBefore;
    }

    if (consumed + lineSpace > usable && current.length > 0) {
      pages.push(current);
      current = [];
      consumed = 0;
    }
    current.push(line);
    consumed += line.height + line.gapBefore;
  });
  if (current.length > 0 || pages.length === 0) pages.push(current);

  const totalPages = pages.length;
  const pageContents = pages.map((lines, pageIndex) => {
    const commands: string[] = [];
    const isFirstPage = pageIndex === 0;

    commands.push(`${ACCENT_COLOR} rg 0 ${PAGE_HEIGHT - 10} ${PAGE_WIDTH} 10 re f`);

    let y = PAGE_HEIGHT - MARGIN;

    if (isFirstPage) {
      commands.push(textCommand(input.title, MARGIN, y, 18, "F2", "0.05 0.08 0.18"));
      y -= 24;
      commands.push(textCommand(input.subtitle, MARGIN, y, 11, "F1", MUTED_COLOR));
      y -= 14;
      commands.push(`${ACCENT_COLOR} RG 1 w ${MARGIN} ${y} m ${PAGE_WIDTH - MARGIN} ${y} l S`);
      y -= 26;
    } else {
      y -= 8;
    }

    lines.forEach((line) => {
      y -= line.gapBefore + line.height;
      commands.push(textCommand(line.text, MARGIN, y, line.size, line.font, line.color));
    });

    commands.push(`0.85 0.87 0.90 RG 0.75 w ${MARGIN} ${footerHeight - 10} m ${PAGE_WIDTH - MARGIN} ${footerHeight - 10} l S`);
    commands.push(textCommand("Sam Creative Design School", MARGIN, footerHeight - 22, 8, "F1", MUTED_COLOR));
    commands.push(textCommand(`Page ${pageIndex + 1} of ${totalPages}`, PAGE_WIDTH - MARGIN - 70, footerHeight - 22, 8, "F1", MUTED_COLOR));

    return commands.join("\n");
  });

  const objects: string[] = [];
  const addObject = (content: string) => {
    objects.push(content);
    return objects.length;
  };

  addObject("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("");
  const regularFontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const boldFontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds: number[] = [];

  pageContents.forEach((content) => {
    const streamId = addObject(`<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`);
    const pageId = addObject(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${streamId} 0 R >>`
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
  const [courses, lessons] = await Promise.all([getManagedCourses(), getManagedLessons()]);
  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  const course = courses.find((item) => item.id === lesson.courseId);
  const filename = `${lesson.id}-notes.pdf`;
  const pdf = buildPdf({
    title: lesson.title,
    subtitle: course ? `${course.title} - Lesson ${lesson.order}` : `Lesson ${lesson.order}`,
    content: lesson.content,
    keyPoints: lesson.keyPoints ?? [],
  });

  const body = new Uint8Array(pdf).buffer;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
