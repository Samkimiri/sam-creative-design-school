import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, saveDB } from "@/lib/db";
import type { ProjectSubmission } from "@/types";

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
  const projects = await getDB<ProjectSubmission>("projects.json");
  return NextResponse.json({ success: true, data: projects });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!(await isAllowed(body.password))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const projects = await getDB<ProjectSubmission>("projects.json");
  const index = projects.findIndex((project) => project.id === body.id);
  if (index === -1) {
    return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
  }

  projects[index] = {
    ...projects[index],
    status: body.status === "approved" || body.status === "rejected" ? body.status : "pending",
  };
  await saveDB("projects.json", projects);
  return NextResponse.json({ success: true, data: projects[index] });
}
