import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sam-creative-secret-key-2026"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect LMS and Admin routes
  if (pathname.startsWith("/lms") || pathname.startsWith("/admin")) {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      if (pathname.startsWith("/lms")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
      // For /admin, we allow it to load the password prompt if not logged in
      // but ideally we'd want admin to login via /auth/login too
    }

    try {
      if (token) {
        const { payload } = await jwtVerify(token, SECRET);
        
        // If it's an admin route, check role
        if (pathname.startsWith("/admin")) {
          const user = payload.user as { role?: string };
          if (user.role !== "admin") {
             // If not admin, redirect to dashboard
             return NextResponse.redirect(new URL("/lms", request.url));
          }
        }
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
