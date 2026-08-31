import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleView from "@/components/BlogArticleView";
import { getCmsBlogPost } from "@/lib/blogCms";

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCmsBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Sam Creative Design School`,
    description: post.excerpt,
    keywords: post.tags,
  };
}

export default async function BlogSlugPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const post = await getCmsBlogPost(slug);
  if (!post) notFound();

  return <BlogArticleView post={post} />;
}
