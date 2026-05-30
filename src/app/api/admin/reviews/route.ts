import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, saveDB } from "@/lib/db";
import type { Review } from "@/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sam-admin-2026";

async function isAllowed(password?: string) {
  const session = await getSession();
  return password === ADMIN_PASSWORD || session?.user.role === "admin";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!(await isAllowed(body.password))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const reviews = await getDB<Review>("reviews.json");
  return NextResponse.json({
    success: true,
    data: reviews.filter((review) => !review.id.startsWith("seed-")),
  });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!(await isAllowed(body.password))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const reviews = await getDB<Review>("reviews.json");
  const index = reviews.findIndex((review) => review.id === body.id && !review.id.startsWith("seed-"));
  if (index === -1) {
    return NextResponse.json({ success: false, message: "Review not found" }, { status: 404 });
  }

  reviews[index] = {
    ...reviews[index],
    approved: Boolean(body.approved),
  };
  await saveDB("reviews.json", reviews);
  return NextResponse.json({ success: true, data: reviews[index] });
}
