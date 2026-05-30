import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { courses } from "@/data/courses";
import type { ProjectSubmission } from "@/types";

const seedProjects: ProjectSubmission[] = [
  {
    id: "seed-photoshop-poster",
    studentName: "Grace Njeri",
    courseId: "photoshop-masterclass",
    courseName: "Photoshop",
    title: "Brand Identity Poster",
    description: "A premium brand poster created for a local coffee shop using Photoshop layout, color, and typography skills.",
    imageUrl: "/images/gallery-photoshop.png",
    status: "approved",
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "seed-illustrator-logo",
    studentName: "Kevin Omondi",
    courseId: "illustrator-training",
    courseName: "Illustrator",
    title: "Vector Logo Pack",
    description: "A clean logo system with multiple lockups and export formats for a technology startup concept.",
    imageUrl: "/images/gallery-illustrator.png",
    status: "approved",
    createdAt: "2026-01-18T09:00:00.000Z",
  },
];

export async function GET() {
  const projects = await getDB<ProjectSubmission>("projects.json");
  const approved = projects.filter((project) => project.status === "approved");
  return NextResponse.json({ success: true, data: [...approved, ...seedProjects].slice(0, 24) });
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

  const course = courses.find((item) => item.id === courseId);
  const projects = await getDB<ProjectSubmission>("projects.json");
  const project: ProjectSubmission = {
    id: `PROJ-${Date.now()}`,
    studentName: studentName.slice(0, 80),
    courseId: course?.id,
    courseName: course?.shortTitle || String(body.courseName || "Student Project").slice(0, 80),
    title: title.slice(0, 120),
    description: description.slice(0, 360),
    imageUrl: imageUrl.slice(0, 300),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await saveDB("projects.json", [project, ...projects].slice(0, 100));
  return NextResponse.json({ success: true, data: project });
}
