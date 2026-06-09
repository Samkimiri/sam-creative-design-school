import type { Metadata } from "next";
import BlogArticleView from "@/components/BlogArticleView";
import { getBlogPost } from "@/data/blog";

const id = "graphic-design-school-in-kenya-career-path";
const post = getBlogPost(id);

export const metadata: Metadata = {
  title: `${post?.title ?? "Graphic Design School in Kenya"} | Sam Creative Design School`,
  description: post?.excerpt,
  keywords: post?.tags,
};

export default function GraphicDesignSchoolKenyaPage() {
  return <BlogArticleView id={id} />;
}
