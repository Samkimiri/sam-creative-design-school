import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sam-creative-design-school.vercel.app";

const routes = [
  "",
  "/about",
  "/blog",
  "/contact",
  "/courses",
  "/enroll",
  "/faq",
  "/gallery",
  "/portfolio-builder",
  "/resources",
  "/reviews",
  "/student-works",
  "/testimonials",
  "/verify-certificate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.7,
  }));

  const courseRoutes = courses.map((course) => ({
    url: `${siteUrl}/lms/${course.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes];
}
