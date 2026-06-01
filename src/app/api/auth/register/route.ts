import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { hashPassword, setSession, UserSession } from "@/lib/auth";

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

export async function POST(request: Request) {
  try {
    const { name, email, phone, password, avatar, interest } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const students = await getDB<Student>("students.json");
    if (students.find((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
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
      avatar: avatar || null,
      interest: interest || "",
      enrolledCourses: ["photoshop-masterclass"], // Auto-enroll in Photoshop course for immediate access
      createdAt: new Date().toISOString(),
    };

    students.push(newStudent);
    await saveDB("students.json", students);

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
