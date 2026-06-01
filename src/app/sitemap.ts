import type { MetadataRoute } from "next";

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
  "/resources",
  "/reviews",
  "/student-works",
  "/testimonials",
  "/verify-certificate",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
