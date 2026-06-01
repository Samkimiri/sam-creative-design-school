import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDBRecord, upsertDBRecord } from "@/lib/db";
import type { Student } from "@/types";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { name, phone, profileImage, avatar, interest } = await request.json();
    const student = await getDBRecord<Student>("students.json", session.user.id);

    if (student) {
      if (name) student.name = name;
      if (phone) student.phone = phone;
      if (profileImage) student.profileImage = profileImage;
      if (avatar) student.avatar = avatar;
      if (interest) student.interest = interest;
      
      await upsertDBRecord("students.json", student);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}
