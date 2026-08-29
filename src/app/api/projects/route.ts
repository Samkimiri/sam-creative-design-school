import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { courses } from "@/data/courses";
import { seedProjects } from "@/data/projectSubmissions";
import type { ProjectSubmission } from "@/types";

const maxUploadedImageLength = 2.8 * 1024 * 1024;
const imageUrlRegex = /^https?:\/\/.+/i;
const imageDataRegex = /^data:image\/(?:png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i;

export async function GET() {
  const projects = await getDB<ProjectSubmission>("projects.json");
  const approved = projects.filter((project) => project.status === "approved");
  return NextResponse.json(
    { success: true, data: [...approved, ...seedProjects].slice(0, 24) },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const studentName = String(body.studentName || "").trim();
  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const courseId = String(body.courseId || "").trim();
  const imageUrl = String(body.imageUrl || "").trim();

  if (!studentName || !title || !description) {
    return NextResponse.json({ success: false, message: "Name, title, and description are required." }, { status: 400 });
  }

  if (imageUrl && !isAllowedProjectImage(imageUrl)) {
    return NextResponse.json({ success: false, message: "Upload a PNG, JPG, WebP, or GIF under 2 MB, or paste a valid image URL." }, { status: 400 });
  }

  const course = courses.find((item) => item.id === courseId);
  const projects = await getDB<ProjectSubmission>("projects.json");
  const project: ProjectSubmission = {
    id: `PROJ-${Date.now()}`,
    studentName: studentName.slice(0, 80),
    courseId: course?.id,
    courseName: course?.shortTitle || String(body.courseName || "Student Project").slice(0, 80),
    title: title.slice(0, 120),
    description: description.slice(0, 360),
    imageUrl,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await saveDB("projects.json", [project, ...projects].slice(0, 100));
  return NextResponse.json({ success: true, data: project });
}

function isAllowedProjectImage(value: string) {
  if (value.length > maxUploadedImageLength) return false;
  return imageUrlRegex.test(value) || imageDataRegex.test(value);
}
