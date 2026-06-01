import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import type { ProjectSubmission } from "@/types";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const projects = await getDB<ProjectSubmission>("projects.json");
  return NextResponse.json({ success: true, data: projects });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Project ID");
  if ("response" in id) return id.response;
  const status = getRequiredString(auth.body, "status", "Status");
  if ("response" in status) return status.response;
  if (status.value !== "pending" && status.value !== "approved" && status.value !== "rejected") {
    return badRequest("Status must be pending, approved, or rejected");
  }

  const projects = await getDB<ProjectSubmission>("projects.json");
  const index = projects.findIndex((project) => project.id === id.value);
  if (index === -1) {
    return notFound("Project not found");
  }

  projects[index] = {
    ...projects[index],
    status: status.value,
  };
  await saveDB("projects.json", projects);
  return NextResponse.json({ success: true, data: projects[index] });
}

export async function DELETE(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Project ID");
  if ("response" in id) return id.response;

  const projects = await getDB<ProjectSubmission>("projects.json");
  const index = projects.findIndex((project) => project.id === id.value);
  if (index === -1) {
    return notFound("Project not found");
  }

  const [deleted] = projects.splice(index, 1);
  await saveDB("projects.json", projects);
  return NextResponse.json({ success: true, data: deleted, message: "Project deleted" });
}
