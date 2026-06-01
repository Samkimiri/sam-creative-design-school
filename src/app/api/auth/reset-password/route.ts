import { NextResponse } from "next/server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "If this email is registered, password reset instructions will be sent.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not process this request. Please try again." },
      { status: 500 }
    );
  }
}
