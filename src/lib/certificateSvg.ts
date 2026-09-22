import fs from "fs";
import {
  GOLD,
  INK,
  fitSize,
  formatSkillsLine,
  MUTED,
  NAVY,
  SKY,
  formatIssueDate,
  schoolLogoPath,
  starPoints,
  textWidth,
  wrapByWidth,
} from "@/lib/certificatePdf";

// Web (SVG) rendering of the certificate for the homepage slider and the public
// preview page. It mirrors the layout, palette and copy of buildCompletionCertificatePdf
// in certificatePdf.ts - when the PDF design changes, change this alongside it.
// PDF y-coordinates run bottom-up, so every y goes through Y() to flip it.

const W = 792;
const H = 612;
const CX = W / 2;
const Y = (y: number) => H - y;

const SERIF = "'Times New Roman', Times, 'Liberation Serif', serif";
const SANS = "Helvetica, Arial, 'Liberation Sans', sans-serif";

function color(triple: string): string {
  const [r, g, b] = triple.split(" ").map((part) => Math.round(Number(part) * 255));
  return `rgb(${r},${g},${b})`;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let cachedLogo: string | null | undefined;
function logoDataUri(): string | null {
  if (cachedLogo !== undefined) return cachedLogo;
  try {
    cachedLogo = `data:image/jpeg;base64,${fs.readFileSync(schoolLogoPath).toString("base64")}`;
  } catch {
    cachedLogo = null;
  }
  return cachedLogo;
}

type TextOptions = {
  size: number;
  fill: string;
  family?: string;
  weight?: "normal" | "bold";
  style?: "normal" | "italic";
  spacing?: number;
  opacity?: number;
};

function t(value: string, x: number, y: number, options: TextOptions): string {
  const spacing = options.spacing ?? 0;
  // Trailing letter-spacing pushes centred text left by half a gap; nudge it back.
  const cx = x + spacing / 2;
  return `<text x="${cx}" y="${Y(y)}" text-anchor="middle" font-family="${options.family ?? SANS}" font-size="${options.size}" font-weight="${options.weight ?? "normal"}" font-style="${options.style ?? "normal"}" letter-spacing="${spacing}" fill="${color(options.fill)}"${options.opacity ? ` fill-opacity="${options.opacity}"` : ""}>${escapeXml(value)}</text>`;
}

function line(x1: number, y1: number, x2: number, y2: number, width: number, stroke: string): string {
  return `<line x1="${x1}" y1="${Y(y1)}" x2="${x2}" y2="${Y(y2)}" stroke="${color(stroke)}" stroke-width="${width}"/>`;
}

function poly(points: [number, number][], fill: string): string {
  return `<polygon points="${points.map(([x, y]) => `${x},${Y(y)}`).join(" ")}" fill="${color(fill)}"/>`;
}

export function buildCertificateSvg(options: {
  studentName: string;
  courseTitle: string;
  certificateId: string;
  cohortLabel?: string;
  issuedAt?: string | Date;
  dateText?: string;
  placeholder?: boolean;
  skills?: string[];
}): string {
  const { studentName, courseTitle, certificateId, cohortLabel = "", placeholder = false, skills = [] } = options;
  const issuedOn = options.dateText ?? formatIssueDate(options.issuedAt);
  const logo = logoDataUri();

  const description = wrapByWidth(
    "at Sam Creative Design School (SCDS), demonstrating creativity, dedication, and practical skill in professional design.",
    "F1",
    11,
    470
  ).slice(0, 2);
  const skillsLine = formatSkillsLine(skills);
  const skillsSize = skillsLine ? fitSize(skillsLine, "F2", 9, 6.5, 610, 0.5) : 9;

  const rings = Array.from({ length: 8 }, (_, index) => {
    const radius = 70 + index * 22;
    return `<circle cx="${CX}" cy="${Y(306)}" r="${radius}" fill="none" stroke="rgb(241,245,249)" stroke-width="0.6"/>`;
  });

  const ofCompletionWidth = textWidth("OF COMPLETION", 13, "F2", 6);
  const sealY = 128;
  const starPath = starPoints(CX, sealY + 8, 13, 5.5);
  const placeholderOpacity = placeholder ? { opacity: 0.55 } : {};

  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Sam Creative Design School certificate of completion">`,
    `<rect width="${W}" height="${H}" fill="rgb(254,254,253)"/>`,
    ...rings,
    `<rect x="22" y="${Y(590)}" width="748" height="568" fill="none" stroke="${color(NAVY)}" stroke-width="1.4"/>`,
    `<rect x="31" y="${Y(581)}" width="730" height="550" fill="none" stroke="${color(GOLD)}" stroke-width="0.7"/>`,
    poly([[22, 590], [116, 590], [22, 496]], NAVY),
    poly([[126, 590], [136, 590], [22, 476], [22, 486]], GOLD),
    poly([[770, 22], [676, 22], [770, 116]], NAVY),
    poly([[666, 22], [656, 22], [770, 136], [770, 126]], GOLD),
    poly([[22, 590], [62, 590], [22, 550]], SKY),
    poly([[770, 22], [730, 22], [770, 62]], SKY),
    logo ? `<image href="${logo}" x="367" y="${Y(570)}" width="58" height="58"/>` : "",
    t("SAM CREATIVE DESIGN SCHOOL", CX, 496, { size: 11, fill: NAVY, weight: "bold", spacing: 3.2 }),
    line(CX - 22, 484, CX + 22, 484, 1.2, GOLD),
    t("CERTIFICATE", CX, 428, { size: 52, fill: NAVY, family: SERIF, weight: "bold", spacing: 7 }),
    t("OF COMPLETION", CX, 398, { size: 13, fill: SKY, weight: "bold", spacing: 6 }),
    line(CX - ofCompletionWidth / 2 - 76, 402, CX - ofCompletionWidth / 2 - 18, 402, 0.9, GOLD),
    line(CX + ofCompletionWidth / 2 + 18, 402, CX + ofCompletionWidth / 2 + 76, 402, 0.9, GOLD),
    t("This certificate is proudly presented to", CX, 362, { size: 14.5, fill: MUTED, family: SERIF, style: "italic" }),
    t(studentName, CX, 312, {
      size: fitSize(studentName, "F7", 48, 26, 540),
      fill: NAVY,
      family: SERIF,
      weight: "bold",
      style: "italic",
      ...placeholderOpacity,
    }),
    line(CX - 250, 297, CX + 250, 297, 1, GOLD),
    line(CX - 250, 293.5, CX + 250, 293.5, 0.4, GOLD),
    t("for successfully completing the", CX, 270, { size: 12, fill: INK }),
    t(courseTitle, CX, 244, {
      size: fitSize(courseTitle, "F2", 21, 14, 580),
      fill: SKY,
      weight: "bold",
      ...placeholderOpacity,
    }),
    ...description.map((row, index) => t(row, CX, 220 - index * 16, { size: 11, fill: INK })),
    skillsLine ? t(skillsLine, CX, 183, { size: skillsSize, fill: GOLD, weight: "bold", spacing: 0.5 }) : "",
    t(issuedOn, 190, 122, { size: 12.5, fill: NAVY, weight: "bold", ...placeholderOpacity }),
    line(100, 114, 280, 114, 0.9, NAVY),
    t("DATE OF ISSUE", 190, 100, { size: 7.5, fill: MUTED, weight: "bold", spacing: 1.8 }),
    cohortLabel ? t(cohortLabel.toUpperCase(), 190, 87, { size: 7.5, fill: SKY, weight: "bold", spacing: 1.8 }) : "",
    t("Samuel Ndung'u", 586, 124, { size: 26, fill: NAVY, family: SERIF, style: "italic" }),
    line(496, 114, 676, 114, 0.9, NAVY),
    t("SAMUEL NDUNG'U", 586, 100, { size: 9.5, fill: NAVY, weight: "bold", spacing: 1.2 }),
    t("TRAINER, SCDS", 586, 87, { size: 7.5, fill: MUTED, weight: "bold", spacing: 1.8 }),
    poly([[CX - 26, sealY - 30], [CX - 8, sealY - 38], [CX - 20, sealY - 58], [CX - 30, sealY - 47], [CX - 44, sealY - 50]], SKY),
    poly([[CX + 26, sealY - 30], [CX + 8, sealY - 38], [CX + 20, sealY - 58], [CX + 30, sealY - 47], [CX + 44, sealY - 50]], NAVY),
    `<circle cx="${CX}" cy="${Y(sealY)}" r="44" fill="${color(GOLD)}"/>`,
    `<circle cx="${CX}" cy="${Y(sealY)}" r="41" fill="none" stroke="#fff" stroke-width="1"/>`,
    `<circle cx="${CX}" cy="${Y(sealY)}" r="36" fill="${color(NAVY)}"/>`,
    `<circle cx="${CX}" cy="${Y(sealY)}" r="32" fill="none" stroke="${color(GOLD)}" stroke-width="0.8"/>`,
    poly(starPath, GOLD),
    t("SCDS", CX, sealY - 12, { size: 9.5, fill: "1 1 1", weight: "bold", spacing: 2 }),
    t("CERTIFIED", CX, sealY - 22, { size: 5.2, fill: GOLD, weight: "bold", spacing: 1.4 }),
    t(`Certificate ID: ${certificateId}`, CX, 46, { size: 7, fill: MUTED, spacing: 0.4 }),
    t("Verify this certificate at sam-creative-design-school.vercel.app/verify-certificate", CX, 37, { size: 6.5, fill: MUTED }),
    `</svg>`,
  ];

  return parts.filter(Boolean).join("");
}
