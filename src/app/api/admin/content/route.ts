import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getContentSettings, saveContentSettings } from "@/lib/contentSettings";
import { requireFullAdminRequest } from "@/lib/adminAuth";

const contentPaths = [
  "/",
  "/courses",
  "/enroll",
  "/faq",
  "/lms",
  "/portfolio-builder",
  "/student-portfolios",
];

export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const content = await getContentSettings();
  return NextResponse.json({ success: true, data: { content } });
}

export async function PATCH(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const content = await saveContentSettings(auth.body.content || auth.body);
  contentPaths.forEach((path) => revalidatePath(path));

  return NextResponse.json({ success: true, data: { content } });
}

