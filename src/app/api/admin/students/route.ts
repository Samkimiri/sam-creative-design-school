import { NextResponse } from "next/server";
import { readJSON } from "@/lib/db";
import { getSession } from "@/lib/auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sam-admin-2026";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  enrolledCourses: string[];
  createdAt: string;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body;

  const session = await getSession();
  const isAdminSession = session?.user.role === "admin";

  if (password !== ADMIN_PASSWORD && !isAdminSession) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const students = readJSON<Student>("students.json");
  // Remove sensitive data
  const safeStudents = students.map((s) => {
    const safeStudent = { ...s };
    delete safeStudent.password;
    return safeStudent;
  });
  
  return NextResponse.json({ success: true, data: safeStudents });
}
