import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Student Resources | Sam Creative Design School",
  description:
    "Preview lessons, submit assignments, verify certificates, and read current learning guides from Sam Creative Design School.",
};

const resources = [
  { title: "Verify Certificate", text: "Employers can confirm a student's certificate ID.", href: "/verify-certificate" },
  { title: "Portfolio Builder", text: "Follow guided briefs and package graduation-ready projects.", href: "/portfolio-builder" },
  { title: "Student Portfolios", text: "View approved public profiles with projects, skills, and certificates.", href: "/student-portfolios" },
  { title: "Submit Project", text: "Students can send finished work for gallery review.", href: "/gallery#submit-project" },
  { title: "Open LMS", text: "Continue lessons, notes, quizzes, and assignments.", href: "/lms" },
  { title: "Study Break Games", text: "Refresh with quick games that can work inside the app.", href: "/games" },
  { title: "Preview Courses", text: "Try lesson one before enrolling in a full course.", href: "/courses" },
];

export default function ResourcesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="bg-dark py-16 text-white">
        <div className="container mx-auto px-6">
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">Resource Library</p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
            Student tools, guides, and learning links.
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-6 py-14">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <h2 className="mb-2 text-xl font-extrabold text-dark">{item.title}</h2>
              <p className="text-sm leading-6 text-gray-500">{item.text}</p>
            </Link>
          ))}
        </section>

        <section className="mt-14">
          <p className="text-sm font-black uppercase tracking-widest text-primary">Latest Guides</p>
          <h2 className="mb-6 text-2xl font-extrabold text-dark">Blog resources</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl">
                <img src={post.image} alt={post.title} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary">{post.category}</p>
                  <h3 className="font-extrabold leading-snug text-dark">{post.title}</h3>
                  <p className="mt-3 text-sm text-gray-500">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
