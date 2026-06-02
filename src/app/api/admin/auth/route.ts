import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  return NextResponse.json({ success: true, message: "Admin verified" });
}
