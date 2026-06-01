import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { requireAdminRequest } from "@/lib/adminAuth";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  avatar?: string | null;
  profileImage?: string | null;
  enrolledCourses: string[];
  createdAt: string;
}

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const students = await getDB<Student>("students.json");
  const safeStudents = students.map(({ password: _password, avatar: _avatar, profileImage: _profileImage, ...student }) => {
    void _password;
    void _avatar;
    void _profileImage;
    return student;
  });
  
  return NextResponse.json({ success: true, data: safeStudents });
}
