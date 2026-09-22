import fs from "fs";
import path from "path";
import { FONT_WIDTHS } from "@/lib/pdfFontMetrics";

export const schoolLogoPath = path.join(process.cwd(), "public", "images", "scds-logo.jpeg");

const PAGE_WIDTH = 792;
const PAGE_HEIGHT = 612;
const CENTER_X = PAGE_WIDTH / 2;

// Palette
export const NAVY = "0.04 0.12 0.28";
const NAVY_STROKE = NAVY;
export const SKY = "0.12 0.60 0.90";
export const GOLD = "0.78 0.60 0.22";
export const INK = "0.24 0.27 0.33";
export const MUTED = "0.45 0.49 0.56";

type PdfFont = "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7";

// Resource name -> [PDF base font, metrics table]
const FONTS: Record<PdfFont, { base: string; metrics: string }> = {
  F1: { base: "Helvetica", metrics: "Helvetica" },
  F2: { base: "Helvetica-Bold", metrics: "Helvetica-Bold" },
  F3: { base: "Helvetica-Oblique", metrics: "Helvetica" },
  F4: { base: "Times-Roman", metrics: "Times-Roman" },
  F5: { base: "Times-Bold", metrics: "Times-Bold" },
  F6: { base: "Times-Italic", metrics: "Times-Italic" },
  F7: { base: "Times-BoldItalic", metrics: "Times-BoldItalic" },
};
const FONT_ORDER: PdfFont[] = ["F1", "F2", "F3", "F4", "F5", "F6", "F7"];

export function cleanText(value: string): string {
  return value
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function escapePdfText(value: string): string {
  return cleanText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function textWidth(value: string, size: number, font: PdfFont, spacing = 0): number {
  const table = FONT_WIDTHS[FONTS[font].metrics];
  const text = cleanText(value);
  let units = 0;
  for (const char of text) {
    const code = char.charCodeAt(0);
    units += table[code - 32] ?? 500;
  }
  return (units * size) / 1000 + spacing * Math.max(0, text.length - 1);
}

export function fitSize(value: string, font: PdfFont, maxSize: number, minSize: number, maxWidth: number, spacing = 0): number {
  let size = maxSize;
  while (size > minSize && textWidth(value, size, font, spacing) > maxWidth) size -= 0.5;
  return size;
}

export function wrapByWidth(value: string, font: PdfFont, size: number, maxWidth: number): string[] {
  const words = cleanText(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (textWidth(next, size, font) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function text(
  value: string,
  x: number,
  y: number,
  size: number,
  options: { font?: PdfFont; color?: string; align?: "left" | "center" | "right"; spacing?: number } = {}
): string {
  const font = options.font ?? "F1";
  const color = options.color ?? INK;
  const spacing = options.spacing ?? 0;
  const width = textWidth(value, size, font, spacing);
  let tx = x;
  if (options.align === "center") tx = x - width / 2;
  if (options.align === "right") tx = x - width;

  return [
    "BT",
    `/${font} ${size} Tf`,
    `${color} rg`,
    `${spacing} Tc`,
    `${tx.toFixed(2)} ${y.toFixed(2)} Td`,
    `(${escapePdfText(value)}) Tj`,
    "ET",
  ].join("\n");
}

function line(x1: number, y1: number, x2: number, y2: number, width: number, color: string): string {
  return `${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`;
}

function polygon(points: [number, number][], color: string): string {
  const [first, ...rest] = points;
  return `${color} rg ${first[0]} ${first[1]} m ${rest.map(([x, y]) => `${x} ${y} l`).join(" ")} f`;
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

export function starPoints(cx: number, cy: number, outer: number, inner: number): [number, number][] {
  return Array.from({ length: 10 }, (_, index) => {
    const angle = Math.PI / 2 + (index * Math.PI) / 5;
    const radius = index % 2 === 0 ? outer : inner;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius] as [number, number];
  });
}

type JpegImage = { data: Buffer; height: number; width: number };

function readJpegImage(filePath: string): JpegImage | null {
  try {
    const data = fs.readFileSync(filePath);
    let index = 2;

    while (index < data.length) {
      if (data[index] !== 0xff) {
        index += 1;
        continue;
      }

      const marker = data[index + 1];
      const length = data.readUInt16BE(index + 2);
      const isStartOfFrame =
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf);

      if (isStartOfFrame) {
        return { data, height: data.readUInt16BE(index + 5), width: data.readUInt16BE(index + 7) };
      }

      index += 2 + length;
    }
  } catch {
    return null;
  }

  return null;
}

type RasterAsset = { rgb: Buffer; alpha: Buffer; width: number; height: number };

// The founder's actual signature, pre-processed (background removed, recoloured
// to NAVY, deflate-compressed) by scripts/_build_signature_assets.mjs into a
// separate RGB layer and an 8-bit grey alpha layer, since this hand-rolled PDF
// writer has no general PNG decoder - these are already in the exact form a PDF
// image XObject (+ SMask) needs, so they're embedded as-is.
const signatureAssetDir = path.join(process.cwd(), "src", "lib", "certFonts");
function readSignatureAsset(): RasterAsset | null {
  try {
    const meta = JSON.parse(
      fs.readFileSync(path.join(signatureAssetDir, "signature-meta.json"), "utf8")
    ) as { width: number; height: number };
    return {
      rgb: fs.readFileSync(path.join(signatureAssetDir, "signature-rgb.zz")),
      alpha: fs.readFileSync(path.join(signatureAssetDir, "signature-alpha.zz")),
      width: meta.width,
      height: meta.height,
    };
  } catch {
    return null;
  }
}

export function formatIssueDate(value?: string | Date): string {
  const parsed = value ? new Date(value) : new Date();
  const date = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  return new Intl.DateTimeFormat("en-KE", { dateStyle: "long", timeZone: "Africa/Nairobi" }).format(date);
}

export function buildCompletionCertificatePdf(
  studentName: string,
  courseTitle: string,
  certificateId: string,
  cohortLabel = "",
  issuedAt?: string | Date,
  certificateFocus = "professional design"
): Buffer {
  const issuedOn = formatIssueDate(issuedAt);
  const verifyUrl = `https://sam-creative-design-school.vercel.app/verify-certificate?id=${certificateId}`;
  const schoolLogo = readJpegImage(schoolLogoPath);
  const signatureAsset = readSignatureAsset();
  const sigHeight = 50;
  const sigWidth = signatureAsset ? sigHeight * (signatureAsset.width / signatureAsset.height) : 0;
  const sigX = 586 - sigWidth / 2;
  const sigY = 120; // just above the underline at y=114

  const nameSize = fitSize(studentName, "F7", 48, 26, 540);
  const courseSize = fitSize(courseTitle, "F2", 21, 14, 580);
  const signatureSize = fitSize("Founder & Director", "F6", 26, 15, 170);
  const descriptionLines = wrapByWidth(
    `at Sam Creative Design School (SCDS), demonstrating creativity, dedication, and practical skill in ${cleanText(certificateFocus).trim() || "professional design"}.`,
    "F1",
    11,
    470
  ).slice(0, 2);

  const rings = Array.from({ length: 8 }, (_, index) => {
    const radius = 70 + index * 22;
    return `0.945 0.960 0.978 RG 0.6 w ${circlePath(CENTER_X, 306, radius)} S`;
  });

  const ofCompletionWidth = textWidth("OF COMPLETION", 13, "F2", 6);
  const sealX = CENTER_X;
  const sealY = 128;

  const content = [
    // Paper
    "0.998 0.998 0.995 rg 0 0 792 612 re f",
    ...rings,

    // Frame: navy outer rule, gold inner hairline
    `${NAVY_STROKE} RG 1.4 w 22 22 748 568 re S`,
    `${GOLD} RG 0.7 w 31 31 730 550 re S`,

    // Corner accents (top-left, bottom-right)
    polygon([[22, 590], [116, 590], [22, 496]], NAVY),
    polygon([[126, 590], [136, 590], [22, 476], [22, 486]], GOLD),
    polygon([[770, 22], [676, 22], [770, 116]], NAVY),
    polygon([[666, 22], [656, 22], [770, 136], [770, 126]], GOLD),
    polygon([[22, 590], [62, 590], [22, 550]], SKY),
    polygon([[770, 22], [730, 22], [770, 62]], SKY),

    // Logo and school name
    schoolLogo ? "q 58 0 0 58 367 512 cm /SchoolLogo Do Q" : "",
    text("SAM CREATIVE DESIGN SCHOOL", CENTER_X, 496, 11, { font: "F2", color: NAVY, align: "center", spacing: 3.2 }),
    line(CENTER_X - 22, 484, CENTER_X + 22, 484, 1.2, GOLD),

    // Title
    text("CERTIFICATE", CENTER_X, 428, 52, { font: "F5", color: NAVY, align: "center", spacing: 7 }),
    text("OF COMPLETION", CENTER_X, 398, 13, { font: "F2", color: SKY, align: "center", spacing: 6 }),
    line(CENTER_X - ofCompletionWidth / 2 - 76, 402, CENTER_X - ofCompletionWidth / 2 - 18, 402, 0.9, GOLD),
    line(CENTER_X + ofCompletionWidth / 2 + 18, 402, CENTER_X + ofCompletionWidth / 2 + 76, 402, 0.9, GOLD),

    // Recipient
    text("This certificate is proudly presented to", CENTER_X, 362, 14.5, { font: "F6", color: MUTED, align: "center" }),
    text(studentName, CENTER_X, 312, nameSize, { font: "F7", color: NAVY, align: "center" }),
    line(CENTER_X - 250, 297, CENTER_X + 250, 297, 1, GOLD),
    line(CENTER_X - 250, 293.5, CENTER_X + 250, 293.5, 0.4, GOLD),

    // Achievement
    text("for successfully completing the", CENTER_X, 270, 12, { font: "F1", color: INK, align: "center" }),
    text(courseTitle, CENTER_X, 244, courseSize, { font: "F2", color: SKY, align: "center" }),
    ...descriptionLines.map((descriptionLine, index) =>
      text(descriptionLine, CENTER_X, 220 - index * 16, 11, { font: "F1", color: INK, align: "center" })
    ),

    // Left: date of issue
    text(issuedOn, 190, 122, 12.5, { font: "F2", color: NAVY, align: "center" }),
    line(100, 114, 280, 114, 0.9, NAVY_STROKE),
    text("DATE OF ISSUE", 190, 100, 7.5, { font: "F2", color: MUTED, align: "center", spacing: 1.8 }),
    cohortLabel
      ? text(cohortLabel.toUpperCase(), 190, 87, 7.5, { font: "F2", color: SKY, align: "center", spacing: 1.8 })
      : "",

    // Right: role-based signature (an institutional title rather than a
    // person's name, so the certificate doesn't need reissuing if the signer changes)
    signatureAsset
      ? `q ${sigWidth.toFixed(2)} 0 0 ${sigHeight.toFixed(2)} ${sigX.toFixed(2)} ${sigY} cm /Signature Do Q`
      : text("Founder & Director", 586, 124, signatureSize, { font: "F6", color: NAVY, align: "center" }),
    line(496, 114, 676, 114, 0.9, NAVY_STROKE),
    text("SAM CREATIVE DESIGN SCHOOL", 586, 100, 8.3, { font: "F2", color: NAVY, align: "center", spacing: 0.8 }),
    text("AUTHORIZED SIGNATORY", 586, 87, 7.5, { font: "F2", color: MUTED, align: "center", spacing: 1.8 }),

    // Center: seal with ribbon tails
    polygon([[sealX - 26, sealY - 30], [sealX - 8, sealY - 38], [sealX - 20, sealY - 58], [sealX - 30, sealY - 47], [sealX - 44, sealY - 50]], SKY),
    polygon([[sealX + 26, sealY - 30], [sealX + 8, sealY - 38], [sealX + 20, sealY - 58], [sealX + 30, sealY - 47], [sealX + 44, sealY - 50]], NAVY),
    `${GOLD} rg ${circlePath(sealX, sealY, 44)} f`,
    `1 1 1 RG 1 w ${circlePath(sealX, sealY, 41)} S`,
    `${NAVY} rg ${circlePath(sealX, sealY, 36)} f`,
    `${GOLD} RG 0.8 w ${circlePath(sealX, sealY, 32)} S`,
    polygon(starPoints(sealX, sealY + 8, 13, 5.5), GOLD),
    text("SCDS", sealX, sealY - 12, 9.5, { font: "F2", color: "1 1 1", align: "center", spacing: 2 }),
    text("CERTIFIED", sealX, sealY - 22, 5.2, { font: "F2", color: GOLD, align: "center", spacing: 1.4 }),

    // Footer
    text(`Certificate ID: ${certificateId}`, CENTER_X, 46, 7, { font: "F1", color: MUTED, align: "center", spacing: 0.4 }),
    text(`Verify this certificate at ${verifyUrl}`, CENTER_X, 37, 6.5, { font: "F1", color: MUTED, align: "center" }),
  ]
    .filter(Boolean)
    .join("\n");

  const fontObjectStart = 4;
  let objectCursor = fontObjectStart + FONT_ORDER.length;
  const logoObjectNumber = schoolLogo ? objectCursor++ : null;
  const signatureImageObjectNumber = signatureAsset ? objectCursor++ : null;
  const signatureAlphaObjectNumber = signatureAsset ? objectCursor++ : null;
  const contentObjectNumber = objectCursor;

  const fontResources = FONT_ORDER.map((name, index) => `/${name} ${fontObjectStart + index} 0 R`).join(" ");
  const xObjectEntries = [
    schoolLogo ? `/SchoolLogo ${logoObjectNumber} 0 R` : "",
    signatureAsset ? `/Signature ${signatureImageObjectNumber} 0 R` : "",
  ]
    .filter(Boolean)
    .join(" ");
  const xObjectResource = xObjectEntries ? `/XObject << ${xObjectEntries} >>` : "";
  const logoObject = schoolLogo
    ? `<< /Type /XObject /Subtype /Image /Width ${schoolLogo.width} /Height ${schoolLogo.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${schoolLogo.data.length} >>\nstream\n${schoolLogo.data.toString("latin1")}\nendstream`
    : "";
  const signatureImageObject = signatureAsset
    ? `<< /Type /XObject /Subtype /Image /Width ${signatureAsset.width} /Height ${signatureAsset.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /SMask ${signatureAlphaObjectNumber} 0 R /Length ${signatureAsset.rgb.length} >>\nstream\n${signatureAsset.rgb.toString("latin1")}\nendstream`
    : "";
  const signatureAlphaObject = signatureAsset
    ? `<< /Type /XObject /Subtype /Image /Width ${signatureAsset.width} /Height ${signatureAsset.height} /ColorSpace /DeviceGray /BitsPerComponent 8 /Filter /FlateDecode /Length ${signatureAsset.alpha.length} >>\nstream\n${signatureAsset.alpha.toString("latin1")}\nendstream`
    : "";

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << ${fontResources} >> ${xObjectResource} >> /Contents ${contentObjectNumber} 0 R >>`,
    ...FONT_ORDER.map((name) => `<< /Type /Font /Subtype /Type1 /BaseFont /${FONTS[name].base} >>`),
    ...(schoolLogo ? [logoObject] : []),
    ...(signatureAsset ? [signatureImageObject, signatureAlphaObject] : []),
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
