import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, saveDB } from "@/lib/db";
import type { Student } from "@/types";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { name, phone, profileImage, avatar, interest } = await request.json();
    const students = await getDB<Student>("students.json");
    const index = students.findIndex((s) => s.id === session.user.id);

    if (index > -1) {
      if (name) students[index].name = name;
      if (phone) students[index].phone = phone;
      if (profileImage) students[index].profileImage = profileImage;
      if (avatar) students[index].avatar = avatar;
      if (interest) students[index].interest = interest;
      
      await saveDB("students.json", students);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
}
