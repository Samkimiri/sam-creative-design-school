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
assert(resetRoute.includes("resetCode"), "reset-password route must expose local reset codes when email delivery is unavailable");
assert(resetRoute.includes("await saveDB(\"password-resets.json\", nextResets);"), "reset-password route must save reset records before email delivery");
const resetConfirmRoute = read("src/app/api/auth/reset-password/confirm/route.ts");
assert(resetConfirmRoute.includes("codeHash"), "reset-password confirmation must accept reset codes");

const enrollRoute = read("src/app/api/enroll/route.ts");
assert(enrollRoute.includes("import { courses }"), "enroll route must validate course IDs against course data");
assert(enrollRoute.includes("Use the admin enrollments endpoint"), "public enrollments list must not be exposed");

const payRoute = read("src/app/api/pay/route.ts");
assert(!payRoute.includes("const { phone, amount, courseId }"), "pay route must not trust client-supplied amounts");
assert(payRoute.includes("const amount = course.price"), "pay route must charge the trusted course price");
assert(payRoute.includes("appendDBRecord(\"enrollments.json\""), "pay route must append enrollment records safely");
assert(payRoute.includes("mpesaPushInitiatedAt"), "pay route must persist initiated M-Pesa pushes for admin approval");
const mpesaStatusRoute = read("src/app/api/mpesa/status/route.ts");
assert(!mpesaStatusRoute.includes("grantEnrollmentAccess"), "M-Pesa status polling must not unlock courses without admin approval");
assert(mpesaStatusRoute.includes("approvalRequired: true"), "M-Pesa status polling must tell students admin approval is required");
const mpesaCallbackRoute = read("src/app/api/mpesa/callback/route.ts");
assert(!mpesaCallbackRoute.includes("grantEnrollmentAccess"), "M-Pesa callbacks must not unlock courses without admin approval");
assert(mpesaCallbackRoute.includes("Awaiting admin approval"), "M-Pesa callbacks must keep verified payments pending for admin approval");

const progressRoute = read("src/app/api/progress/route.ts");
assert(progressRoute.includes('from "@/data/courses"'), "progress route must validate course and lesson IDs");
assert(progressRoute.includes("item.id === lessonId && item.courseId === courseId"), "progress route must verify lesson belongs to course");

const quizRoute = read("src/app/api/quiz/submit/route.ts");
assert(quizRoute.includes("l.id === lessonId && l.courseId === courseId"), "quiz submissions must verify lesson belongs to course");

const profileRoute = read("src/app/api/auth/profile/route.ts");
assert(profileRoute.includes("request.json().catch"), "profile updates must handle invalid JSON");
assert(profileRoute.includes("phoneRegex"), "profile updates must validate phone numbers");
assert(profileRoute.includes("isAllowedAvatar"), "profile updates must validate avatar images");

const dbLib = read("src/lib/db.ts");
assert(dbLib.includes("Supabase upsertDBRecord error"), "database upserts must fall back when Supabase upsert fails");
assert(dbLib.includes("hasMongoConfig"), "database layer must skip MongoDB calls when Mongo is not configured");
assert(dbLib.includes("hasKVConfig"), "database layer must persist writes to Vercel KV when configured");

const mongoLib = read("src/lib/mongodb.ts");
assert(mongoLib.includes("export function hasMongoConfig"), "MongoDB helper must expose configuration status");

const middleware = read("src/middleware.ts");
assert(middleware.includes('pathname.startsWith("/admin")'), "middleware must protect admin routes");
assert(middleware.includes('sessionUser?.role !== "admin"'), "admin routes must require an admin session role");
assert(middleware.includes('loginUrl.searchParams.set("next", "/admin")'), "admin redirects must preserve the admin login target");
assert(middleware.includes('request.nextUrl.searchParams.get("preview") === "1"'), "middleware must allow public LMS lesson previews");

const adminPage = read("src/app/admin/page.tsx");
assert(adminPage.includes('fetch("/api/auth/me"'), "admin page must check the logged-in account role");
assert(!adminPage.includes("Enter admin password"), "admin page must not expose a standalone password prompt");

const footer = read("src/components/Footer.tsx");
assert(!footer.includes('href: "/admin"'), "public footer must not expose the admin panel link");

const projectsRoute = read("src/app/api/projects/route.ts");
assert(projectsRoute.includes("imageDataRegex"), "project submissions must validate uploaded image data");
assert(projectsRoute.includes("isAllowedProjectImage"), "project submissions must reject invalid image payloads");
assert(!projectsRoute.includes("imageUrl.slice(0, 300)"), "project image uploads must not be truncated");

const studentProjects = read("src/components/StudentProjects.tsx");
assert(studentProjects.includes('type="file"'), "student projects form must allow image uploads");
assert(studentProjects.includes("readAsDataURL"), "student project uploads must convert images for submission");

const registerRoute = read("src/app/api/auth/register/route.ts");
assert(!registerRoute.includes('enrolledCourses: ["photoshop-masterclass"]'), "registration must not auto-enroll unpaid students");
assert(registerRoute.includes("isAllowedAvatar"), "registration must validate avatar images");

const gamifiedRegistration = read("src/components/GamifiedRegistration.tsx");
assert(gamifiedRegistration.includes("masteryPaths"), "gamified registration must render mastery path choices from structured data");
assert(gamifiedRegistration.includes("file.size > maxUploadBytes"), "gamified registration must limit avatar upload size");
assert(gamifiedRegistration.includes("compressAvatar"), "gamified registration must compress avatar uploads before submission");

for (const file of ["src/app/robots.ts", "src/app/sitemap.ts", "supabase/schema.sql"]) {
  assert(exists(file), `${file} is required for production readiness`);
}

const coursesText = read("src/data/courses.ts");
const courseBlock = coursesText.slice(coursesText.indexOf("export const courses"), coursesText.indexOf("export const lessons"));
const courseIds = [...courseBlock.matchAll(/id:\s*"([^"]+)",\s*[\r\n]+\s*title:/g)].map((match) => match[1]);
assert(courseIds.length > 0, "course data must include courses");
assert.equal(new Set(courseIds).size, courseIds.length, "course IDs must be unique");

const expectedCourseOrder = [
  "photoshop-masterclass",
  "illustrator-training",
  "vibe-designing-uiux",
  "vibe-coding-web-dev",
  "ai-prompt-engineering",
  "capcut-masterclass",
  "solidworks-engineers",
];
assert.deepEqual(courseIds, expectedCourseOrder, "course order must match the published learning path order");

const imagePaths = [...courseBlock.matchAll(/image:\s*"([^"]+)"/g)].map((match) => match[1]);
for (const imagePath of imagePaths) {
  if (imagePath.startsWith("/")) {
    assert(exists(path.join("public", imagePath)), `missing course image: ${imagePath}`);
  }
}

const extractBlock = (start, end) => coursesText.slice(coursesText.indexOf(start), coursesText.indexOf(end));
const countModuleLessons = (block) =>
  [...block.matchAll(/lessons:\s*\[([^\]]+)\]/g)]
    .map((match) => [...match[1].matchAll(/"([^"]+)"/g)].length)
    .reduce((sum, count) => sum + count, 0);

assert.equal(countModuleLessons(extractBlock("const vibeDesigningLessons", "const vibeCodingLessons")), 35, "Vibe Designing must include 35 generated LMS lessons");
assert.equal(countModuleLessons(extractBlock("const vibeCodingLessons", "const aiPromptLessons")), 56, "Vibe Coding must include 56 generated LMS lessons");
assert.equal(countModuleLessons(extractBlock("const aiPromptLessons", "const enhancedContent")), 21, "AI Prompt Engineering must include 21 generated LMS lessons");
assert(coursesText.includes("isModuleCheckpoint"), "new module lessons must include checkpoint quizzes");

const lmsCoursePage = read("src/app/lms/[courseId]/page.tsx");
assert(lmsCoursePage.includes("useSearchParams"), "LMS course player must read preview search params");
assert(lmsCoursePage.includes('searchParams.get("preview") === "1"'), "LMS preview mode must be enabled by ?preview=1");
assert(lmsCoursePage.includes("? index > 0"), "LMS preview mode must keep all lessons after lesson one locked");

const lmsCourseLayout = read("src/app/lms/[courseId]/layout.tsx");
assert(lmsCourseLayout.includes("generateMetadata"), "LMS course pages must generate course-specific metadata");
assert(lmsCourseLayout.includes("openGraph"), "LMS course metadata must include Open Graph data");

const enrollPage = read("src/app/enroll/page.tsx");
assert(enrollPage.includes("courses.map"), "enrollment flow must render course options from the shared course list");
assert(enrollPage.includes("course.price"), "enrollment flow must show trusted course fees from course data");

const sitemap = read("src/app/sitemap.ts");
for (const route of ["/about", "/contact", "/courses", "/enroll", "/faq", "/gallery", "/reviews"]) {
  assert(sitemap.includes(route), `sitemap must include ${route}`);
}
assert(sitemap.includes("/courses/${course.id}"), "sitemap must include dynamic public course URLs");
assert(!sitemap.includes("/lms/${course.id}"), "sitemap must not include private LMS course URLs");

const robots = read("src/app/robots.ts");
assert(robots.includes('"/lms"'), "robots must disallow private LMS routes");
assert(robots.includes('"/admin"'), "robots must disallow admin routes");

const lmsLayout = read("src/app/lms/layout.tsx");
assert(lmsLayout.includes("index: false"), "LMS routes must emit noindex metadata");

const faq = read("src/app/faq/page.tsx");
for (const courseName of ["Vibe Designing", "Vibe Coding", "AI & Prompt Engineering"]) {
  assert(faq.includes(courseName), `FAQ must mention ${courseName}`);
}

const portfolioBuilder = read("src/app/portfolio-builder/page.tsx");
for (const courseId of ["vibe-designing-uiux", "vibe-coding-web-dev", "ai-prompt-engineering"]) {
  assert(portfolioBuilder.includes(courseId), `portfolio builder must include a brief for ${courseId}`);
}

console.log("Production checks passed");
