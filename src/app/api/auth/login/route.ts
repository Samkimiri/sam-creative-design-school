import { NextResponse } from "next/server";
import { findDBRecordByField } from "@/lib/db";
import { verifyPassword, setSession, UserSession } from "@/lib/auth";
import { getConfiguredAdminPassword } from "@/lib/adminAuth";

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

type LoginRequestBody =
  | { email?: unknown; password?: unknown }
  | { response: NextResponse };

export async function POST(request: Request) {
  try {
    const body = await readLoginBody(request);
    if ("response" in body) return body.response;

    const { email, password } = body;
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const submittedPassword = String(password || "");

    if (!normalizedEmail || !submittedPassword) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json({ success: false, message: "Enter a valid email address" }, { status: 400 });
    }

    const student = await findDBRecordByField<Student>("students.json", "email", normalizedEmail);

    if (!student || !student.password) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const adminPassword = getConfiguredAdminPassword();
    const isAdminPasswordMatch = Boolean(
      student.role === "admin" &&
      adminPassword &&
      submittedPassword === adminPassword
    );
    const isHashMatch = isAdminPasswordMatch
      ? true
      : await verifyPassword(submittedPassword, student.password).catch(() => false);
    
    if (!isHashMatch) {
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
      redirectTo: userSession.role === "admin" ? "/admin" : "/lms",
    }, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: unknown) {
    console.error("Login API Error:", error);
    return NextResponse.json({ success: false, message: "Login failed. Please try again." }, { status: 500 });
  }
}

async function readLoginBody(request: Request): Promise<LoginRequestBody> {
  const text = await request.text();
  if (text.trim() === "") {
    return {
      response: NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 }),
    };
  }

  try {
    const body = JSON.parse(text) as Record<string, unknown>;
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return {
        response: NextResponse.json({ success: false, message: "Invalid login request" }, { status: 400 }),
      };
    }
    return body;
  } catch {
    return {
      response: NextResponse.json({ success: false, message: "Invalid login request" }, { status: 400 }),
    };
  }
}
