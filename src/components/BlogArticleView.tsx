import Link from "next/link";
import { getBlogPost } from "@/data/blog";

export default function BlogArticleView({ id }: { id: string }) {
  const post = getBlogPost(id);

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-extrabold text-dark">Article not found</h1>
        <Link href="/blog" className="mt-6 inline-block font-bold text-primary">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <article>
        <div className="bg-dark text-white">
          <div className="container mx-auto grid min-h-[420px] items-end gap-8 px-6 py-16 md:grid-cols-2">
            <div>
              <Link href="/blog" className="mb-8 inline-block text-sm font-bold text-white/80 hover:text-white">
                Back to blog
              </Link>
              <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">
                {post.category} · {post.readTime}
              </p>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">{post.title}</h1>
              <p className="mt-5 max-w-2xl text-lg text-white/85">{post.excerpt}</p>
              <p className="mt-6 text-sm text-white/70">{post.date}</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl">
              <img src={post.image} alt={post.title} className="h-72 w-full object-cover md:h-96" />
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-3xl px-6 py-14">
          <div className="space-y-6 text-lg leading-8 text-gray-700">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
