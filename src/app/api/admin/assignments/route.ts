import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, saveDB } from "@/lib/db";
import type { AssignmentSubmission } from "@/types";

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
  const assignments = await getDB<AssignmentSubmission>("assignments.json");
  return NextResponse.json({ success: true, data: assignments });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!(await isAllowed(body.password))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const assignments = await getDB<AssignmentSubmission>("assignments.json");
  const index = assignments.findIndex((assignment) => assignment.id === body.id);
  if (index === -1) {
    return NextResponse.json({ success: false, message: "Assignment not found" }, { status: 404 });
  }

  assignments[index] = {
    ...assignments[index],
    status: body.status === "revision" ? "revision" : "reviewed",
    feedback: String(body.feedback || "").slice(0, 800),
    updatedAt: new Date().toISOString(),
  };
  await saveDB("assignments.json", assignments);
  return NextResponse.json({ success: true, data: assignments[index] });
}
