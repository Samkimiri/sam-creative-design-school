import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "sam-creative-secret-key-2026"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isCoursePreview = pathname.startsWith("/lms/") && request.nextUrl.searchParams.get("preview") === "1";

  if ((pathname.startsWith("/lms") && !isCoursePreview) || pathname.startsWith("/admin")) {
    const token = request.cookies.get("session")?.value;

    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      if (pathname.startsWith("/admin")) loginUrl.searchParams.set("next", "/admin");
      return NextResponse.redirect(loginUrl);
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
      const loginUrl = new URL("/auth/login", request.url);
      if (pathname.startsWith("/admin")) loginUrl.searchParams.set("next", "/admin");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/lms/:path*", "/admin/:path*"],
};
