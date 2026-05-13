import { NextResponse } from "next/server";
import { readJSON, getDB, saveDB } from "@/lib/db";
import { verifyPassword, setSession, UserSession } from "@/lib/auth";

interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log(`Login attempt for: ${email}`);

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const students = await getDB<Student>("students.json");
    const student = students.find((s) => s.email.toLowerCase() === email.toLowerCase());

    if (!student) {
      console.log(`User not found: ${email}`);
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    console.log(`Verifying password for: ${email}`);
    const isMatch = await verifyPassword(password, student.password);
    
    if (!isMatch) {
      console.log(`Invalid password for: ${email}`);
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const userSession: UserSession = {
      id: student.id,
      name: student.name,
      email: student.email,
      role: student.role || "student"
    };
    
    console.log(`Setting session for: ${email}`);
    await setSession(userSession);

    console.log(`Login successful for: ${email}`);
    return NextResponse.json({ success: true, user: userSession });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    console.error("Login API Error:", error);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
