import type { Metadata } from "next";
import BlogArticleView from "@/components/BlogArticleView";
import { getBlogPost } from "@/data/blog";

const id = "photoshop-course-in-kenya-portfolio-plan";
const post = getBlogPost(id);

export const metadata: Metadata = {
  title: `${post?.title} | Sam Creative Design School`,
  description: post?.excerpt,
  keywords: post?.tags,
};

export default function Page() {
  return <BlogArticleView id={id} />;
}
