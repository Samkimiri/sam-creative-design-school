import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import type { AssignmentSubmission } from "@/types";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const assignments = await getDB<AssignmentSubmission>("assignments.json");
  return NextResponse.json({ success: true, data: assignments });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Assignment ID");
  if ("response" in id) return id.response;
  const status = getRequiredString(auth.body, "status", "Status");
  if ("response" in status) return status.response;
  if (status.value !== "reviewed" && status.value !== "revision") {
    return badRequest("Status must be reviewed or revision");
  }

  const assignments = await getDB<AssignmentSubmission>("assignments.json");
  const index = assignments.findIndex((assignment) => assignment.id === id.value);
  if (index === -1) {
    return notFound("Assignment not found");
  }

  assignments[index] = {
    ...assignments[index],
    status: status.value,
    feedback: String(auth.body.feedback || "").slice(0, 800),
    updatedAt: new Date().toISOString(),
  };
  await saveDB("assignments.json", assignments);
  return NextResponse.json({ success: true, data: assignments[index] });
}

export async function DELETE(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Assignment ID");
  if ("response" in id) return id.response;

  const assignments = await getDB<AssignmentSubmission>("assignments.json");
  const index = assignments.findIndex((assignment) => assignment.id === id.value);
  if (index === -1) {
    return notFound("Assignment not found");
  }

  const [deleted] = assignments.splice(index, 1);
  await saveDB("assignments.json", assignments);
  return NextResponse.json({ success: true, data: deleted, message: "Assignment deleted" });
}
