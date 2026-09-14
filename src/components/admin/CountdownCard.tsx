"use client";

import { useEffect, useRef, useState } from "react";
import { siteName } from "@/lib/seo";

interface CountdownCardProps {
  nextIntake: string;
  whatsappDisplay?: string;
}

const CARD_SIZE = 1080;

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

async function drawCard(canvas: HTMLCanvasElement, days: number | null, nextIntake: string, whatsappDisplay?: string) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = CARD_SIZE;
  canvas.height = CARD_SIZE;

  // Background
  ctx.fillStyle = "#0A0F1E";
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);

  // Soft glow behind the number
  const glow = ctx.createRadialGradient(CARD_SIZE / 2, CARD_SIZE / 2 - 40, 60, CARD_SIZE / 2, CARD_SIZE / 2 - 40, 460);
  glow.addColorStop(0, "rgba(26, 143, 227, 0.35)");
  glow.addColorStop(1, "rgba(26, 143, 227, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE);

  ctx.textAlign = "center";

  // School name (top)
  const logo = await loadImage("/images/scds-monogram.svg");
  const topY = 110;
  if (logo) {
    const logoSize = 64;
    ctx.drawImage(logo, CARD_SIZE / 2 - logoSize / 2, topY - logoSize + 8, logoSize, logoSize);
  }
  ctx.fillStyle = "#5AB4F0";
  ctx.font = "700 30px Arial, Helvetica, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(siteName.toUpperCase(), CARD_SIZE / 2, topY + 60, CARD_SIZE - 120);

  if (days === null) {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 64px Arial, Helvetica, sans-serif";
    ctx.fillText("Next intake date", CARD_SIZE / 2, CARD_SIZE / 2 - 20);
    ctx.fillText("coming soon", CARD_SIZE / 2, CARD_SIZE / 2 + 60);
  } else if (days === 0) {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 92px Arial, Helvetica, sans-serif";
    ctx.fillText("Enrollment is", CARD_SIZE / 2, CARD_SIZE / 2 - 10);
    ctx.fillText("OPEN NOW", CARD_SIZE / 2, CARD_SIZE / 2 + 100);
  } else {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 340px Arial, Helvetica, sans-serif";
    ctx.fillText(String(days), CARD_SIZE / 2, CARD_SIZE / 2 + 90);

    ctx.fillStyle = "#5AB4F0";
    ctx.font = "800 46px Arial, Helvetica, sans-serif";
    ctx.fillText(days === 1 ? "DAY TO GO" : "DAYS TO GO", CARD_SIZE / 2, CARD_SIZE / 2 + 165);
  }

  // Next intake pill
  const pillText = `Next Intake: ${nextIntake}`;
  ctx.font = "700 30px Arial, Helvetica, sans-serif";
  const pillTextWidth = ctx.measureText(pillText).width;
  const pillWidth = pillTextWidth + 72;
  const pillHeight = 68;
  const pillX = CARD_SIZE / 2 - pillWidth / 2;
  const pillY = CARD_SIZE - 260;
  ctx.fillStyle = "#1A8FE3";
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(pillText, CARD_SIZE / 2, pillY + pillHeight / 2 + 10);

  // Footer contact info
  ctx.fillStyle = "#8CA0C4";
  ctx.font = "600 28px Arial, Helvetica, sans-serif";
  const footerLine = whatsappDisplay ? `WhatsApp / Call: ${whatsappDisplay}` : "Enroll today to secure your seat";
  ctx.fillText(footerLine, CARD_SIZE / 2, CARD_SIZE - 130);

  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(140, CARD_SIZE - 90);
  ctx.lineTo(CARD_SIZE - 140, CARD_SIZE - 90);
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 26px Arial, Helvetica, sans-serif";
  ctx.fillText("Design · Coding · AI · Video · CAD", CARD_SIZE / 2, CARD_SIZE - 50);
}

export default function CountdownCard({ nextIntake, whatsappDisplay }: CountdownCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloading, setDownloading] = useState(false);
  const days = getDaysRemaining(nextIntake);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    void drawCard(canvas, days, nextIntake, whatsappDisplay);
  }, [days, nextIntake, whatsappDisplay]);

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);
    try {
      await drawCard(canvas, days, nextIntake, whatsappDisplay);
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
          A simple square graphic with the school name, days remaining, the next intake date, and your WhatsApp contact -
          ready to post on Instagram, Facebook, WhatsApp Status, or send directly to leads. Updates automatically to match
          the intake date saved above.
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
