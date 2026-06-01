import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sam-creative-secret-key-2026"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect LMS routes. The admin page can render its password prompt for everyone;
  // admin API routes perform the real authorization checks.
  if (pathname.startsWith("/lms") || pathname.startsWith("/admin")) {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      if (pathname.startsWith("/lms")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }

    try {
      if (token) {
        await jwtVerify(token, SECRET);
      }
    } catch {
      if (pathname.startsWith("/lms")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/lms/:path*", "/admin/:path*"],
};
