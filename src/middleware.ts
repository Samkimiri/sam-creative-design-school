import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sam-creative-secret-key-2026"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isCoursePreview = pathname.startsWith("/lms/") && request.nextUrl.searchParams.get("preview") === "1";
  const isEnroll = pathname.startsWith("/enroll");

  if ((pathname.startsWith("/lms") && !isCoursePreview) || pathname.startsWith("/admin") || isEnroll) {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      // Enrollment requires an account first, so send guests to sign up rather than sign in.
      const authUrl = new URL(isEnroll ? "/auth/register" : "/auth/login", request.url);
      if (pathname.startsWith("/admin")) authUrl.searchParams.set("next", "/admin");
      else if (isEnroll) authUrl.searchParams.set("next", pathname + request.nextUrl.search);
      return NextResponse.redirect(authUrl);
    }

    try {
      const { payload } = await jwtVerify(token, SECRET);
      if (pathname.startsWith("/admin")) {
        const sessionUser = payload.user as { role?: string } | undefined;
        if (sessionUser?.role !== "admin") {
          return NextResponse.redirect(new URL("/lms", request.url));
        }
      }
    } catch {
      const authUrl = new URL(isEnroll ? "/auth/register" : "/auth/login", request.url);
      if (pathname.startsWith("/admin")) authUrl.searchParams.set("next", "/admin");
      else if (isEnroll) authUrl.searchParams.set("next", pathname + request.nextUrl.search);
      return NextResponse.redirect(authUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/lms/:path*", "/admin/:path*", "/enroll"],
};
