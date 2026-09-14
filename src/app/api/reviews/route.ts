import { randomBytes, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { getManagedCourses } from "@/lib/contentSettings";
import { getPublicReviews } from "@/lib/reviews";
import { getClientIp, isSubmissionRateLimited } from "@/lib/rateLimit";
import type { Review } from "@/types";

const REVIEW_RATE_LIMIT = { maxAttempts: 5, windowMs: 10 * 60 * 1000 };

function generateEditToken(): string {
  return randomBytes(24).toString("hex");
}

// Constant-time compare so a mismatched token can't be brute-forced by timing
// how long the comparison takes.
function tokensMatch(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

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
    const ip = getClientIp(request);
    if (await isSubmissionRateLimited(`review:${ip}`, REVIEW_RATE_LIMIT)) {
      return NextResponse.json(
        { success: false, message: "Too many reviews submitted. Please try again later." },
        { status: 429 }
      );
    }

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
    const editToken = generateEditToken();
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
      editToken,
    };

    const customReviews = reviews.filter((review) => !review.id.startsWith("seed-"));
    await saveDB("reviews.json", [newReview, ...customReviews].slice(0, 50));

    // The edit token is handed back exactly once, here - it's the caller's
    // only proof they submitted this review, since nothing else identifies
    // them (no login is required to leave a review).
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
    const { id, editToken, name, role, rating, text } = await request.json();
    const cleanId = String(id || "").trim();
    const cleanEditToken = String(editToken || "").trim();
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

    // Only whoever received this review's editToken at creation time may
    // edit it - without this, anyone who reads a review's public id from
    // the GET response could overwrite it with arbitrary content.
    const existingToken = customReviews[reviewIndex].editToken;
    if (!existingToken || !cleanEditToken || !tokensMatch(existingToken, cleanEditToken)) {
      return NextResponse.json(
        { success: false, message: "You don't have permission to edit this review." },
        { status: 403 }
      );
    }

    const updatedReview: Review = {
      ...customReviews[reviewIndex],
      name: cleanName.slice(0, 80),
      role: cleanRole.slice(0, 80),
      rating: normalizeRating(rating),
      text: cleanText.slice(0, 280),
      // An edited review goes back through moderation, same as a new one -
      // otherwise an already-approved review could be silently rewritten
      // into something that was never actually reviewed.
      approved: false,
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
