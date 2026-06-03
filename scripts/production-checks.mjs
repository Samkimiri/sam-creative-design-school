import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFileSync(path.join(root, file), "utf8");
const exists = (file) => existsSync(path.join(root, file));

const nextConfig = read("next.config.ts");
assert(!nextConfig.includes("ignoreBuildErrors"), "next.config.ts must not ignore TypeScript build errors");
assert(!nextConfig.includes("ignoreDuringBuilds"), "next.config.ts must not ignore ESLint during builds");

const resetRoute = read("src/app/api/auth/reset-password/route.ts");
assert(!resetRoute.includes("newPassword"), "reset-password route must not accept direct password changes");
assert(!resetRoute.includes("hash("), "reset-password route must not hash a supplied password without token verification");

const enrollRoute = read("src/app/api/enroll/route.ts");
assert(enrollRoute.includes("import { courses }"), "enroll route must validate course IDs against course data");
assert(enrollRoute.includes("Use the admin enrollments endpoint"), "public enrollments list must not be exposed");

const payRoute = read("src/app/api/pay/route.ts");
assert(!payRoute.includes("const { phone, amount, courseId }"), "pay route must not trust client-supplied amounts");
assert(payRoute.includes("const amount = course.price"), "pay route must charge the trusted course price");
assert(payRoute.includes("appendDBRecord(\"enrollments.json\""), "pay route must append enrollment records safely");

const progressRoute = read("src/app/api/progress/route.ts");
assert(progressRoute.includes('from "@/data/courses"'), "progress route must validate course and lesson IDs");
assert(progressRoute.includes("item.id === lessonId && item.courseId === courseId"), "progress route must verify lesson belongs to course");

const quizRoute = read("src/app/api/quiz/submit/route.ts");
assert(quizRoute.includes("l.id === lessonId && l.courseId === courseId"), "quiz submissions must verify lesson belongs to course");

const profileRoute = read("src/app/api/auth/profile/route.ts");
assert(profileRoute.includes("request.json().catch"), "profile updates must handle invalid JSON");
assert(profileRoute.includes("phoneRegex"), "profile updates must validate phone numbers");

const middleware = read("src/middleware.ts");
assert(middleware.includes('pathname.startsWith("/admin")'), "middleware must protect admin routes");
assert(middleware.includes('sessionUser?.role !== "admin"'), "admin routes must require an admin session role");
assert(middleware.includes('loginUrl.searchParams.set("next", "/admin")'), "admin redirects must preserve the admin login target");

const adminPage = read("src/app/admin/page.tsx");
assert(adminPage.includes('fetch("/api/auth/me"'), "admin page must check the logged-in account role");
assert(!adminPage.includes("Enter admin password"), "admin page must not expose a standalone password prompt");

const footer = read("src/components/Footer.tsx");
assert(!footer.includes('href: "/admin"'), "public footer must not expose the admin panel link");

const registerRoute = read("src/app/api/auth/register/route.ts");
assert(!registerRoute.includes('enrolledCourses: ["photoshop-masterclass"]'), "registration must not auto-enroll unpaid students");

for (const file of ["src/app/robots.ts", "src/app/sitemap.ts", "supabase/schema.sql"]) {
  assert(exists(file), `${file} is required for production readiness`);
}

const coursesText = read("src/data/courses.ts");
const courseBlock = coursesText.slice(coursesText.indexOf("export const courses"), coursesText.indexOf("export const lessons"));
const courseIds = [...courseBlock.matchAll(/id:\s*"([^"]+)",\s*[\r\n]+\s*title:/g)].map((match) => match[1]);
assert(courseIds.length > 0, "course data must include courses");
assert.equal(new Set(courseIds).size, courseIds.length, "course IDs must be unique");

const imagePaths = [...courseBlock.matchAll(/image:\s*"([^"]+)"/g)].map((match) => match[1]);
for (const imagePath of imagePaths) {
  if (imagePath.startsWith("/")) {
    assert(exists(path.join("public", imagePath)), `missing course image: ${imagePath}`);
  }
}

const sitemap = read("src/app/sitemap.ts");
for (const route of ["/about", "/contact", "/courses", "/enroll", "/faq", "/gallery", "/reviews"]) {
  assert(sitemap.includes(route), `sitemap must include ${route}`);
}

console.log("Production checks passed");
