import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDBRecord, upsertDBRecord } from "@/lib/db";
import type { Student } from "@/types";

const phoneRegex = /^(?:0[17]\d{8}|\+254[17]\d{8}|254[17]\d{8})$/;
const imageUrlRegex = /^https?:\/\/.+/i;
const imageDataRegex = /^data:image\/(?:png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i;
const maxAvatarLength = 6 * 1024 * 1024;
const clean = (value: unknown, maxLength: number) =>
  String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);
const cleanImage = (value: unknown) => String(value || "").trim();

function isAllowedAvatar(value: string) {
  if (!value) return true;
  if (value.length > maxAvatarLength) return false;
  return imageUrlRegex.test(value) || imageDataRegex.test(value);
}

function optionalAvatar(value: string) {
  return isAllowedAvatar(value) ? value : "";
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const name = clean(body.name, 80);
    const phone = clean(body.phone, 20);
    const profileImage = cleanImage(body.profileImage);
    const avatar = cleanImage(body.avatar);
    const interest = clean(body.interest, 80);

    if (phone && !phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, message: "Enter a valid Kenyan phone number." }, { status: 400 });
    }

    const safeProfileImage = optionalAvatar(profileImage);
    const safeAvatar = optionalAvatar(avatar);

    const student = await getDBRecord<Student>("students.json", session.user.id);

    if (student) {
      if (name) student.name = name;
      if (phone) student.phone = phone;
      if (safeProfileImage) student.profileImage = safeProfileImage;
      if (safeAvatar) student.avatar = safeAvatar;
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
