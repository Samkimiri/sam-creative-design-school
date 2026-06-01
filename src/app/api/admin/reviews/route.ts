import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import type { Review } from "@/types";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const reviews = await getDB<Review>("reviews.json");
  return NextResponse.json({
    success: true,
    data: reviews.filter((review) => !review.id.startsWith("seed-")),
  });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Review ID");
  if ("response" in id) return id.response;
  if (typeof auth.body.approved !== "boolean") {
    return badRequest("Approved must be true or false");
  }

  const reviews = await getDB<Review>("reviews.json");
  const index = reviews.findIndex((review) => review.id === id.value && !review.id.startsWith("seed-"));
  if (index === -1) {
    return notFound("Review not found");
  }

  reviews[index] = {
    ...reviews[index],
    approved: auth.body.approved,
  };
  await saveDB("reviews.json", reviews);
  return NextResponse.json({ success: true, data: reviews[index] });
}

export async function DELETE(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Review ID");
  if ("response" in id) return id.response;

  const reviews = await getDB<Review>("reviews.json");
  const index = reviews.findIndex((review) => review.id === id.value && !review.id.startsWith("seed-"));
  if (index === -1) {
    return notFound("Review not found");
  }

  const [deleted] = reviews.splice(index, 1);
  await saveDB("reviews.json", reviews);
  return NextResponse.json({ success: true, data: deleted, message: "Review deleted" });
}
