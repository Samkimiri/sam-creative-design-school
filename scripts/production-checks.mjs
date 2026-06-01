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
