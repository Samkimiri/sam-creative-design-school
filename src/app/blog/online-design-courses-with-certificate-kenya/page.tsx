import type { Metadata } from "next";
import BlogArticleView from "@/components/BlogArticleView";
import { getBlogPost } from "@/data/blog";

const id = "online-design-courses-with-certificate-kenya";
const post = getBlogPost(id);

export const metadata: Metadata = {
  title: `${post?.title ?? "Online Design Courses with Certificate in Kenya"} | Sam Creative Design School`,
  description: post?.excerpt,
  keywords: post?.tags,
};

export default function OnlineDesignCertificateKenyaPage() {
  return <BlogArticleView id={id} />;
}
