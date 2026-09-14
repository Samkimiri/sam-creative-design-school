import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { findDBRecordByField } from "@/lib/db";
import { verifyPassword, setSession, UserSession } from "@/lib/auth";
import { getConfiguredAdminPassword } from "@/lib/adminAuth";
import { clearFailedAttempts, isRateLimited, recordFailedAttempt } from "@/lib/rateLimit";

const LOGIN_RATE_LIMIT = { maxAttempts: 8, windowMs: 15 * 60 * 1000 };

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

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

    const rateLimitKey = `login:${normalizedEmail}`;
    if (await isRateLimited(rateLimitKey, LOGIN_RATE_LIMIT)) {
      return NextResponse.json(
        { success: false, message: "Too many attempts. Please wait a while before trying again." },
        { status: 429 }
      );
    }

    const student = await findDBRecordByField<Student>("students.json", "email", normalizedEmail);

    if (!student || !student.password) {
      await recordFailedAttempt(rateLimitKey, LOGIN_RATE_LIMIT);
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const adminPassword = getConfiguredAdminPassword();
    const isAdminPasswordMatch = Boolean(
      student.role === "admin" &&
      adminPassword &&
      timingSafeStringEqual(submittedPassword, adminPassword)
    );
    const isHashMatch = isAdminPasswordMatch
      ? true
      : await verifyPassword(submittedPassword, student.password).catch(() => false);

    if (!isHashMatch) {
      await recordFailedAttempt(rateLimitKey, LOGIN_RATE_LIMIT);
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    await clearFailedAttempts(rateLimitKey);

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
