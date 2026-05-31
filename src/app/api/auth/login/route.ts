import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { verifyPassword, setSession, UserSession } from "@/lib/auth";

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
  profileImage?: string;
  avatar?: string;
  interest?: string;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const students = await getDB<Student>("students.json");
    const student = students.find((s) => s.email.toLowerCase() === normalizedEmail);

    if (!student) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await verifyPassword(password, student.password);
    
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const userSession: UserSession = {
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role || "student"
    };
    
    await setSession(userSession);

    return NextResponse.json({
      success: true,
      user: userSession,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone || "",
        role: student.role || "student",
        profileImage: student.profileImage || student.avatar || "",
        avatar: student.avatar || student.profileImage || "",
        interest: student.interest || "",
      },
      redirectTo: "/lms",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    console.error("Login API Error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
