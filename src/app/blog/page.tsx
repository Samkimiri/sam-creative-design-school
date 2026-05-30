import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog and Resources | Sam Creative Design School",
  description:
    "Current design, Photoshop, CapCut, Illustrator, SolidWorks, freelancing, and LMS learning resources from Sam Creative Design School in Kenya.",
};

export default function BlogPage() {
  const [featured, ...morePosts] = blogPosts;

  return (
    <div className="pt-32 pb-24">
      <div className="bg-dark py-16 mb-16">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Blog & Resources</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Practical <span className="text-primary">Learning Guides</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Responsive, current articles for students building creative and engineering skills in Kenya.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-6 max-w-6xl">
        <Link
          href={`/blog/${featured.id}`}
          className={`mb-12 grid overflow-hidden rounded-3xl bg-gradient-to-br ${featured.gradient} text-white shadow-xl md:grid-cols-[1.05fr_0.95fr]`}
        >
          <div className="p-8 md:p-12">
            <span className="mb-4 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-widest">
              Featured · {featured.readTime}
            </span>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight md:text-5xl">{featured.title}</h2>
            <p className="mb-6 max-w-2xl text-white/85">{featured.excerpt}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
              <span>{featured.date}</span>
              <span>Read full article</span>
            </div>
          </div>
          <div className="min-h-64 bg-black/10 md:min-h-full">
            <img src={featured.image} alt={featured.title} className="h-full w-full object-cover mix-blend-screen opacity-90" />
          </div>
        </Link>

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
          {morePosts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/blog/${post.id}`} className="block">
                <div className={`h-44 bg-gradient-to-br ${post.gradient}`}>
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover mix-blend-screen opacity-90" />
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
