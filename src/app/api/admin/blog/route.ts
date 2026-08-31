import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { badRequest, getRequiredString, notFound, requireFullAdminRequest } from "@/lib/adminAuth";
import { containsAbusiveLanguage } from "@/lib/moderation";
import {
  deleteCmsBlogPost,
  estimateReadTime,
  getCmsBlogPosts,
  isStaticBlogSlug,
  saveCmsBlogPost,
  slugifyTitle,
} from "@/lib/blogCms";
import { logAdminAction } from "@/lib/auditLog";
import type { BlogPost } from "@/data/blog";

const MAX_TITLE_LENGTH = 140;
const MAX_EXCERPT_LENGTH = 300;

export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const posts = await getCmsBlogPosts();
  return NextResponse.json({ success: true, data: posts });
}

export async function PATCH(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const title = getRequiredString(auth.body, "title", "Title");
  if ("response" in title) return title.response;
  if (title.value.length > MAX_TITLE_LENGTH) return badRequest("Title is too long.");

  const bodyText = getRequiredString(auth.body, "body", "Article body");
  if ("response" in bodyText) return bodyText.response;

  const category = typeof auth.body.category === "string" && auth.body.category.trim() ? auth.body.category.trim() : "General";
  const excerptInput = typeof auth.body.excerpt === "string" ? auth.body.excerpt.trim().slice(0, MAX_EXCERPT_LENGTH) : "";
  const image = typeof auth.body.image === "string" && auth.body.image.trim() ? auth.body.image.trim() : "/images/hero.png";
  const tags = typeof auth.body.tags === "string"
    ? auth.body.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];
  const existingId = typeof auth.body.id === "string" ? auth.body.id.trim() : "";

  const paragraphs = bodyText.value
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return badRequest("Write at least one paragraph.");
  if (containsAbusiveLanguage(title.value) || paragraphs.some((p) => containsAbusiveLanguage(p))) {
    return badRequest("That content isn't allowed. Please revise it.");
  }

  const excerpt = excerptInput || paragraphs[0].slice(0, MAX_EXCERPT_LENGTH);

  let id = existingId;
  if (id) {
    if (isStaticBlogSlug(id)) return badRequest("That article is built into the site and can't be edited here.");
  } else {
    id = slugifyTitle(title.value);
    if (!id) return badRequest("That title couldn't be turned into a valid URL. Try adding some letters.");
    if (isStaticBlogSlug(id)) return badRequest("A built-in article already uses that URL. Choose a different title.");
    const posts = await getCmsBlogPosts();
    if (posts.some((p) => p.id === id)) return badRequest("A post with that title already exists. Choose a different title.");
  }

  const post: BlogPost = {
    id,
    title: title.value,
    excerpt,
    category,
    date: new Date().toLocaleDateString("en-KE", { month: "long", day: "numeric", year: "numeric" }),
    readTime: estimateReadTime(paragraphs),
    image,
    gradient: "from-primary to-primary/70",
    tags,
    content: paragraphs,
  };

  await saveCmsBlogPost(post);
  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: existingId ? "blog.updated" : "blog.created",
    targetType: "blog_post",
    targetId: post.id,
    targetLabel: post.title,
  });

  return NextResponse.json({ success: true, data: post });
}

export async function DELETE(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Post ID");
  if ("response" in id) return id.response;

  const deleted = await deleteCmsBlogPost(id.value);
  if (!deleted) return notFound("Post not found");

  revalidatePath("/blog");
  revalidatePath(`/blog/${id.value}`);

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: "blog.deleted",
    targetType: "blog_post",
    targetId: id.value,
  });

  return NextResponse.json({ success: true, message: "Post deleted." });
}
