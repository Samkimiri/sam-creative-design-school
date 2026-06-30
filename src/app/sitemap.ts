import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { blogPosts } from "@/data/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sam-creative-design-school.vercel.app";

const routes = [
  "",
  "/about",
  "/blog",
  "/certificate-preview",
  "/contact",
  "/corporate-training",
  "/courses",
  "/design-challenge",
  "/enroll",
  "/faq",
  "/gallery",
  "/games",
  "/install",
  "/portfolio-builder",
  "/opportunities",
  "/resources",
  "/reviews",
  "/student-portfolios",
  "/student-works",
  "/testimonials",
  "/tool-setup-guides",
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
    url: `${siteUrl}/courses/${course.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const lmsRoutes = courses.map((course) => ({
    url: `${siteUrl}/lms/${course.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...lmsRoutes];
}
