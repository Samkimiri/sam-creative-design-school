import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import type { Student } from "@/types";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const students = await getDB<Student>("students.json");
  const participants = students
    .filter((student) => student.id !== session.user.id && (student.enrolledCourses?.length ?? 0) > 0)
    .map((student) => ({
      id: student.id,
      name: student.name,
      avatar: student.profileImage || student.avatar || null,
      role: student.role || "student",
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({ success: true, data: participants });
}
