import { NextResponse } from "next/server";
import { appendDBRecord, findDBRecordByField } from "@/lib/db";
import { hashPassword, setSession, UserSession } from "@/lib/auth";
import { getConfirmedEnrollmentCourseIdsForStudent } from "@/lib/enrollmentAccess";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  avatar?: string;
  interest?: string;
  enrolledCourses: string[];
  createdAt: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    const body = await request.json().catch(() => ({}));
    const name = clean(body.name, 80);
    const email = clean(body.email, 120).toLowerCase();
    const phone = clean(body.phone, 20);
    const password = String(body.password || "");
    const avatar = cleanImage(body.avatar);
    const interest = clean(body.interest, 80);

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (phone && !phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid Kenyan phone number." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const safeAvatar = optionalAvatar(avatar);

    const existingStudent = await findDBRecordByField<Student>("students.json", "email", email);
    if (existingStudent) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const id = Math.random().toString(36).substring(2, 9);
    
    const role = "student";

    const newStudent: Student = {
      id,
      name,
      email,
      phone: phone || "",
      password: hashedPassword,
      role,
      avatar: safeAvatar || undefined,
      interest,
      enrolledCourses: [],
      createdAt: new Date().toISOString(),
    };
    newStudent.enrolledCourses = await getConfirmedEnrollmentCourseIdsForStudent(newStudent);

    await appendDBRecord("students.json", newStudent);

    // Create session user object
    const userSession: UserSession = {
      id,
      name,
      email,
      role
    };
    
    await setSession(userSession);

    return NextResponse.json({ success: true, user: userSession });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
