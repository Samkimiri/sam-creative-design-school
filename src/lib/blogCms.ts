import { getDB, saveDB } from "@/lib/db";
import { blogPosts as staticBlogPosts, type BlogPost } from "@/data/blog";

export async function getCmsBlogPosts(): Promise<BlogPost[]> {
  return getDB<BlogPost>("blog-posts.json");
}

export async function getCmsBlogPost(id: string): Promise<BlogPost | null> {
  const posts = await getCmsBlogPosts();
  return posts.find((post) => post.id === id) ?? null;
}

export function isStaticBlogSlug(id: string): boolean {
  return staticBlogPosts.some((post) => post.id === id);
}

export function estimateReadTime(paragraphs: string[]): string {
  const words = paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function saveCmsBlogPost(post: BlogPost): Promise<void> {
  const posts = await getCmsBlogPosts();
  const index = posts.findIndex((item) => item.id === post.id);
  if (index > -1) posts[index] = post;
  else posts.push(post);
  await saveDB("blog-posts.json", posts);
}

export async function deleteCmsBlogPost(id: string): Promise<boolean> {
  const posts = await getCmsBlogPosts();
  const next = posts.filter((post) => post.id !== id);
  if (next.length === posts.length) return false;
  await saveDB("blog-posts.json", next);
  return true;
}
