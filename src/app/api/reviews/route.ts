import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { getManagedCourses } from "@/lib/contentSettings";
import { getPublicReviews } from "@/lib/reviews";
import type { Review } from "@/types";

function normalizeRating(value: unknown): number {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return 5;
  return Math.min(5, Math.max(1, Math.round(rating)));
}

export async function GET(request: Request) {
  const courseId = new URL(request.url).searchParams.get("courseId") || "";
  const data = await getPublicReviews(courseId || undefined);
  return NextResponse.json({ success: true, data });
}

export async function POST(request: Request) {
  try {
    const { name, role, rating, text, courseId } = await request.json();
    const cleanName = String(name || "").trim();
    const cleanText = String(text || "").trim();
    const cleanRole = String(role || "").trim();
    const cleanCourseId = String(courseId || "").trim();

    if (!cleanName || !cleanText) {
      return NextResponse.json(
        { success: false, message: "Name and review are required." },
        { status: 400 }
      );
    }

    const reviews = await getDB<Review>("reviews.json");
    const managedCourses = await getManagedCourses();
    const course = managedCourses.find((item) => item.id === cleanCourseId);
    const newReview: Review = {
      id: `REV-${Date.now()}`,
      name: cleanName.slice(0, 80),
      role: cleanRole.slice(0, 80),
      courseId: course?.id,
      courseName: course?.title,
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
