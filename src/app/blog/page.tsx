import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog and Resources | Sam Creative Design School",
  description:
    "Current design, Photoshop, CapCut, Illustrator, SolidWorks, freelancing, and LMS learning resources from Sam Creative Design School in Kenya.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="bg-dark py-16 mb-16">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Blog & Resources</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Practical <span className="text-primary">Learning Guides</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Current articles and resources for students building creative and engineering skills in Kenya.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-primary">Latest Articles</p>
            <h2 className="text-2xl font-extrabold text-dark">Fresh school resources</h2>
          </div>
          <Link href="/resources" className="font-bold text-primary hover:text-dark">
            Browse resource library
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/blog/${post.id}`} className="block">
                <div className="h-48 bg-light-gray">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <span className="text-primary">{post.category}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-extrabold leading-snug text-dark">{post.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">{post.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <span className="font-bold text-primary">Read More</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
