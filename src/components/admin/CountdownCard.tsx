"use client";

import { useEffect, useRef, useState } from "react";
import { siteName } from "@/lib/seo";

interface CountdownCardProps {
  nextIntake: string;
  cohortLabel?: string;
  whatsappDisplay?: string;
}

const CARD_SIZE = 1080;

// The four mastery-path accent colors used everywhere else in the app
// (registration, leaderboard) - reused here as small splash/chip colors so
// the card visually says "many creative disciplines" without spelling it out.
const PATH_COLORS = ["#38BDF8", "#FBBF24", "#FB7185", "#34D399"];

function getDaysRemaining(targetDate: string) {
  const target = new Date(targetDate).getTime();
  if (!Number.isFinite(target)) return null;
  const diffMs = target - Date.now();
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / 86400000);
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawBlob(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, alpha: number) {
  const gradient = ctx.createRadialGradient(x, y, radius * 0.05, x, y, radius);
  gradient.addColorStop(0, `${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`);
  gradient.addColorStop(1, `${color}00`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);
}

/** Small L-shaped print crop marks in each corner - a real design-studio detail, not decoration for its own sake. */
function drawCropMarks(ctx: CanvasRenderingContext2D) {
  const inset = 42;
  const len = 26;
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 2;
  const corners: [number, number, number, number][] = [
    [inset, inset, 1, 1],
    [CARD_SIZE - inset, inset, -1, 1],
    [inset, CARD_SIZE - inset, 1, -1],
    [CARD_SIZE - inset, CARD_SIZE - inset, -1, -1],
  ];
  for (const [x, y, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + len * dx, y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + len * dy);
    ctx.stroke();
  }
}

function drawGrain(ctx: CanvasRenderingContext2D) {
  for (let i = 0; i < 260; i++) {
    ctx.fillStyle = `rgba(255,255,255,${(Math.random() * 0.035).toFixed(3)})`;
    ctx.fillRect(Math.random() * CARD_SIZE, Math.random() * CARD_SIZE, 1.4, 1.4);
  }
}

function drawCalendarGlyph(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.strokeStyle = "#FFFFFF";
  ctx.fillStyle = "#FFFFFF";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(cx - 14, cy - 11, 28, 24, 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy - 4);
  ctx.lineTo(cx + 14, cy - 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx - 7, cy - 13, 1.8, 0, Math.PI * 2);
  ctx.arc(cx + 7, cy - 13, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawStampBadge(ctx: CanvasRenderingContext2D, text: string) {
  ctx.save();
  ctx.translate(CARD_SIZE - 195, 150);
  ctx.rotate((-9 * Math.PI) / 180);
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "#1A8FE3";
  ctx.beginPath();
  ctx.roundRect(-95, -34, 190, 68, 34);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 5]);
  ctx.beginPath();
  ctx.roundRect(-84, -23, 168, 46, 23);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "800 22px Arial, Helvetica, sans-serif";
  ctx.fillText(text, 0, 1);
  ctx.restore();
}

async function drawCard(canvas: HTMLCanvasElement, days: number | null, nextIntake: string, whatsappDisplay?: string, cohortLabel?: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = CARD_SIZE;
  canvas.height = CARD_SIZE;
  ctx.textBaseline = "alphabetic";

  // Diagonal studio-poster background, richer than a flat fill.
  const bg = ctx.createLinearGradient(0, 0, CARD_SIZE, CARD_SIZE);
  bg.addColorStop(0, "#0A0F1E");
  bg.addColorStop(1, "#131B3A");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);

  // Splash of the four mastery-path colors, kept low-alpha so they read as
  // ambient light rather than competing with the type.
  drawBlob(ctx, CARD_SIZE * 0.1, CARD_SIZE * 0.92, 440, "#1A8FE3", 0.6);
  drawBlob(ctx, CARD_SIZE * 0.96, CARD_SIZE * 0.06, 340, "#FB7185", 0.4);
  drawBlob(ctx, CARD_SIZE * 0.92, CARD_SIZE * 0.98, 300, "#FBBF24", 0.38);
  drawBlob(ctx, CARD_SIZE / 2, CARD_SIZE * 0.4, 480, "#1A8FE3", 0.22);

  drawGrain(ctx);
  drawCropMarks(ctx);

  ctx.textAlign = "center";

  // School name (top)
  const logo = await loadImage("/images/scds-monogram.svg");
  const topY = 108;
  if (logo) {
    const logoSize = 60;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.roundRect(CARD_SIZE / 2 - logoSize / 2 - 4, topY - logoSize + 4, logoSize + 8, logoSize + 8, 16);
    ctx.fill();
    ctx.restore();
    ctx.drawImage(logo, CARD_SIZE / 2 - logoSize / 2, topY - logoSize + 8, logoSize, logoSize);
  }
  ctx.fillStyle = "#5AB4F0";
  ctx.font = "700 28px Arial, Helvetica, sans-serif";
  ctx.fillText(siteName.toUpperCase(), CARD_SIZE / 2, topY + 58, CARD_SIZE - 260);

  if (days !== null && days !== 0) {
    drawStampBadge(ctx, "ENROLLING");
  }

  if (days === null) {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 60px Arial, Helvetica, sans-serif";
    ctx.fillText("Next intake date", CARD_SIZE / 2, CARD_SIZE / 2 - 20);
    ctx.fillText("coming soon", CARD_SIZE / 2, CARD_SIZE / 2 + 60);
  } else if (days === 0) {
    const openGrad = ctx.createLinearGradient(0, CARD_SIZE / 2 - 140, 0, CARD_SIZE / 2 + 120);
    openGrad.addColorStop(0, "#FFFFFF");
    openGrad.addColorStop(1, "#BFE0FB");
    ctx.fillStyle = openGrad;
    ctx.font = "800 88px Arial, Helvetica, sans-serif";
    ctx.fillText("Enrollment is", CARD_SIZE / 2, CARD_SIZE / 2 - 10);
    ctx.font = "900 108px Arial, Helvetica, sans-serif";
    ctx.fillText("OPEN NOW", CARD_SIZE / 2, CARD_SIZE / 2 + 110);
  } else {
    ctx.save();
    ctx.shadowColor = "rgba(26,143,227,0.55)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 18;
    const numGrad = ctx.createLinearGradient(0, CARD_SIZE / 2 - 260, 0, CARD_SIZE / 2 + 90);
    numGrad.addColorStop(0, "#FFFFFF");
    numGrad.addColorStop(1, "#8FCBFA");
    ctx.fillStyle = numGrad;
    ctx.font = "800 330px Arial, Helvetica, sans-serif";
    ctx.fillText(String(days), CARD_SIZE / 2, CARD_SIZE / 2 + 90);
    ctx.restore();

    const label = days === 1 ? "DAY TO GO" : "DAYS TO GO";
    ctx.font = "800 42px Arial, Helvetica, sans-serif";
    const labelWidth = ctx.measureText(label).width;
    ctx.fillStyle = "#5AB4F0";
    ctx.fillText(label, CARD_SIZE / 2, CARD_SIZE / 2 + 165);
    ctx.strokeStyle = "rgba(90,180,240,0.55)";
    ctx.lineWidth = 2;
    const ruleGap = 26;
    ctx.beginPath();
    ctx.moveTo(CARD_SIZE / 2 - labelWidth / 2 - ruleGap - 46, CARD_SIZE / 2 + 155);
    ctx.lineTo(CARD_SIZE / 2 - labelWidth / 2 - ruleGap, CARD_SIZE / 2 + 155);
    ctx.moveTo(CARD_SIZE / 2 + labelWidth / 2 + ruleGap, CARD_SIZE / 2 + 155);
    ctx.lineTo(CARD_SIZE / 2 + labelWidth / 2 + ruleGap + 46, CARD_SIZE / 2 + 155);
    ctx.stroke();
  }

  // Next-intake ticket, with a small calendar glyph and a dashed inner edge.
  const pillText = `${cohortLabel ? `${cohortLabel} · ` : "Next Intake · "}${nextIntake}`;
  ctx.font = "700 29px Arial, Helvetica, sans-serif";
  const pillTextWidth = ctx.measureText(pillText).width;
  const pillWidth = pillTextWidth + 118;
  const pillHeight = 70;
  const pillX = CARD_SIZE / 2 - pillWidth / 2;
  const pillY = CARD_SIZE - 262;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = "#1A8FE3";
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([2, 6]);
  ctx.beginPath();
  ctx.roundRect(pillX + 8, pillY + 8, pillWidth - 16, pillHeight - 16, (pillHeight - 16) / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  drawCalendarGlyph(ctx, pillX + 46, pillY + pillHeight / 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.fillText(pillText, pillX + 76, pillY + pillHeight / 2 + 10);
  ctx.textAlign = "center";

  // Footer contact + discipline chips
  ctx.fillStyle = "#8CA0C4";
  ctx.font = "600 28px Arial, Helvetica, sans-serif";
  const footerLine = whatsappDisplay ? `WhatsApp / Call: ${whatsappDisplay}` : "Enroll today to secure your seat";
  ctx.fillText(footerLine, CARD_SIZE / 2, CARD_SIZE - 128);

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, CARD_SIZE - 88);
  ctx.lineTo(CARD_SIZE - 140, CARD_SIZE - 88);
  ctx.stroke();

  const disciplines = ["Design", "Branding", "Video", "CAD"];
  ctx.font = "700 25px Arial, Helvetica, sans-serif";
  const chipGap = 30;
  const dotGap = 12;
  const widths = disciplines.map((label) => ctx.measureText(label).width);
  const rowWidth = widths.reduce((sum, w) => sum + w + dotGap + chipGap, -chipGap);
  let cursorX = CARD_SIZE / 2 - rowWidth / 2;
  const rowY = CARD_SIZE - 48;
  disciplines.forEach((label, index) => {
    ctx.fillStyle = PATH_COLORS[index % PATH_COLORS.length];
    ctx.beginPath();
    ctx.arc(cursorX + 6, rowY - 8, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "left";
    ctx.fillText(label, cursorX + 6 + dotGap, rowY);
    cursorX += 6 + dotGap + widths[index] + chipGap;
  });
  ctx.textAlign = "center";
}

export default function CountdownCard({ nextIntake, whatsappDisplay, cohortLabel }: CountdownCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloading, setDownloading] = useState(false);
  const days = getDaysRemaining(nextIntake);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    void drawCard(canvas, days, nextIntake, whatsappDisplay, cohortLabel);
  }, [days, nextIntake, whatsappDisplay, cohortLabel]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);
    try {
      await drawCard(canvas, days, nextIntake, whatsappDisplay, cohortLabel);
      const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const safeDays = days ?? "soon";
      link.href = url;
      link.download = `scds-intake-countdown-${safeDays}-days.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[260px] shrink-0 rounded-2xl border border-gray-100 shadow-sm sm:w-64"
        aria-label="Countdown card preview"
      />
      <div className="flex-1">
        <p className="text-sm font-bold text-dark">Share the days remaining until the next intake</p>
        <p className="mt-1 text-xs text-gray-500">
          A poster-style square graphic - crop marks, a splash of the four course-path colors, and a wax-stamp
          &ldquo;Enrolling&rdquo; badge - with the school name, days remaining, the next intake date, and your WhatsApp
          contact. Ready to post on Instagram, Facebook, WhatsApp Status, or send directly to leads. Updates
          automatically to match the intake date saved above.
        </p>
        <button
          type="button"
          onClick={() => void handleDownload()}
          disabled={downloading}
          className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-50"
        >
          {downloading ? "Preparing..." : "Download Card (PNG)"}
        </button>
      </div>
    </div>
  );
}
