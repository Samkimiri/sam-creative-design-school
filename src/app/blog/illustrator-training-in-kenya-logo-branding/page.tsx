import type { Metadata } from "next";
import BlogArticleView from "@/components/BlogArticleView";
import { getBlogPost } from "@/data/blog";

const id = "illustrator-training-in-kenya-logo-branding";
const post = getBlogPost(id);

export const metadata: Metadata = {
  title: `${post?.title ?? "Illustrator Training in Kenya"} | Sam Creative Design School`,
  description: post?.excerpt,
  keywords: post?.tags,
};

export default function IllustratorTrainingKenyaPage() {
  return <BlogArticleView id={id} />;
}
