import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { blogPosts } from "@/data/blog";
import { siteUrl } from "@/lib/seo";

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

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
