import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import type { Review } from "@/types";

const seedReviews: Review[] = [
  {
    id: "seed-grace-njeri",
    name: "Grace Njeri",
    role: "Freelance Graphic Designer",
    rating: 5,
    text: "The Photoshop masterclass completely changed my life. Within 3 weeks of finishing I had my first paid client.",
    approved: true,
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "seed-kevin-omondi",
    name: "Kevin Omondi",
    role: "Content Creator",
    rating: 5,
    text: "CapCut training helped me understand how to edit videos that keep people watching. The lessons are very practical.",
    approved: true,
    createdAt: "2026-01-18T09:00:00.000Z",
  },
  {
    id: "seed-daniel-otieno",
    name: "Daniel Otieno",
    role: "Mechanical Engineer",
    rating: 5,
    text: "SolidWorks training gave me confidence to create proper CAD models and explain my design process professionally.",
    approved: true,
    createdAt: "2026-02-02T09:00:00.000Z",
  },
];

function normalizeRating(value: unknown): number {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return 5;
  return Math.min(5, Math.max(1, Math.round(rating)));
}

export async function GET() {
  const reviews = await getDB<Review>("reviews.json");
  const customReviews = reviews.filter((review) => !review.id.startsWith("seed-") && review.approved === true);
  return NextResponse.json({
    success: true,
    data: [...customReviews, ...seedReviews].slice(0, 12),
  });
}

export async function POST(request: Request) {
  try {
    const { name, role, rating, text } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanText = String(text || "").trim();
    const cleanRole = String(role || "").trim();

    if (!cleanName || !cleanText) {
      return NextResponse.json(
        { success: false, message: "Name and review are required." },
        { status: 400 }
      );
    }

    const reviews = await getDB<Review>("reviews.json");
    const newReview: Review = {
      id: `REV-${Date.now()}`,
      name: cleanName.slice(0, 80),
      role: cleanRole.slice(0, 80),
      rating: normalizeRating(rating),
      text: cleanText.slice(0, 280),
      approved: false,
      createdAt: new Date().toISOString(),
    };

    const customReviews = reviews.filter((review) => !review.id.startsWith("seed-"));
    await saveDB("reviews.json", [newReview, ...customReviews].slice(0, 50));

    return NextResponse.json({ success: true, data: newReview });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not save review." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, name, role, rating, text } = await request.json();
    const cleanId = String(id || "").trim();
    const cleanName = String(name || "").trim();
    const cleanText = String(text || "").trim();
    const cleanRole = String(role || "").trim();

    if (!cleanId || cleanId.startsWith("seed-")) {
      return NextResponse.json(
        { success: false, message: "This review cannot be edited." },
        { status: 403 }
      );
    }

    if (!cleanName || !cleanText) {
      return NextResponse.json(
        { success: false, message: "Name and review are required." },
        { status: 400 }
      );
    }

    const reviews = await getDB<Review>("reviews.json");
    const customReviews = reviews.filter((review) => !review.id.startsWith("seed-"));
    const reviewIndex = customReviews.findIndex((review) => review.id === cleanId);

    if (reviewIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Review not found." },
        { status: 404 }
      );
    }

    const updatedReview: Review = {
      ...customReviews[reviewIndex],
      name: cleanName.slice(0, 80),
      role: cleanRole.slice(0, 80),
      rating: normalizeRating(rating),
      text: cleanText.slice(0, 280),
    };

    customReviews[reviewIndex] = updatedReview;
    await saveDB("reviews.json", customReviews.slice(0, 50));

    return NextResponse.json({ success: true, data: updatedReview });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not update review." },
      { status: 500 }
    );
  }
}
