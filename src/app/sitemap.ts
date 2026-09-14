import type { MetadataRoute } from "next";
import { getManagedCourses } from "@/lib/contentSettings";
import { getCmsBlogPosts } from "@/lib/blogCms";
import { blogPosts as staticBlogPosts } from "@/data/blog";
import { galleryProjects } from "@/data/galleryProjects";
import { getDB } from "@/lib/db";
import { slugifyName } from "@/lib/slugs";
import { siteUrl } from "@/lib/seo";
import type { ProjectSubmission } from "@/types";

// certificate-preview is an interactive tool with no unique indexable content
// of its own (it renders whatever the visitor is currently working on) -
// robots.ts disallows crawling it, so it must not appear here either or the
// two signals contradict each other. /testimonials and /student-works are
// pure redirect stubs (see their page.tsx) with no content of their own, so
// they're intentionally omitted too - their canonical destinations
// (/reviews and /gallery) are already listed below.
const routes = [
  "",
  "/about",
  "/blog",
  "/contact",
  "/corporate-training",
  "/courses",
  "/design-challenge",
  "/enroll",
  "/faq",
  "/gallery",
  "/opportunities",
  "/portfolio-builder",
  "/privacy-policy",
  "/resources",
  "/reviews",
  "/student-portfolios",
  "/terms-of-service",
  "/tool-setup-guides",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.7,
  }));

  const [managedCourses, cmsBlogPosts, approvedProjects] = await Promise.all([
    getManagedCourses().catch(() => []),
    getCmsBlogPosts().catch(() => []),
    getDB<ProjectSubmission>("projects.json").catch(() => []),
  ]);

  const courseRoutes = managedCourses.map((course) => ({
    url: `${siteUrl}/courses/${course.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const allBlogPosts = [...staticBlogPosts, ...cmsBlogPosts.filter((post) => !staticBlogPosts.some((s) => s.id === post.id))];
  const blogRoutes = allBlogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const galleryRoutes = galleryProjects.map((project) => ({
    url: `${siteUrl}/gallery/${project.id}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const studentSlugs = Array.from(
    new Set(
      approvedProjects
        .filter((project) => project.status === "approved")
        .map((project) => slugifyName(project.studentName))
        .filter(Boolean)
    )
  );
  const studentPortfolioRoutes = studentSlugs.map((slug) => ({
    url: `${siteUrl}/student-portfolios/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...galleryRoutes, ...studentPortfolioRoutes];
}
