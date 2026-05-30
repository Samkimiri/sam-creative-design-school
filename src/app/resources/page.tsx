import type { Metadata } from "next";
import Link from "next/link";
import { courses, lessons } from "@/data/courses";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Student Resources | Sam Creative Design School",
  description:
    "Download lesson notes, preview lessons, submit assignments, verify certificates, and read current learning guides from Sam Creative Design School.",
};

export default function ResourcesPage() {
  const sampleLessons = lessons.slice(0, 6);

  return (
    <div className="pt-32 pb-24">
      <div className="bg-dark py-16 text-white">
        <div className="container mx-auto px-6">
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">Resource Library</p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
            Notes, previews, assignments, and certificate tools in one place.
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-6 py-14">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { title: "Verify Certificate", text: "Employers can confirm a student's certificate ID.", href: "/verify-certificate" },
            { title: "Submit Project", text: "Students can send finished work for gallery review.", href: "/gallery#submit-project" },
            { title: "Preview Lessons", text: "Try lesson one before enrolling in a full course.", href: "/courses" },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <h2 className="mb-2 text-xl font-extrabold text-dark">{item.title}</h2>
              <p className="text-sm leading-6 text-gray-500">{item.text}</p>
            </Link>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-primary">Downloadable Notes</p>
              <h2 className="text-2xl font-extrabold text-dark">Lesson PDFs</h2>
            </div>
            <Link href="/lms" className="font-bold text-primary hover:text-dark">Open LMS</Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sampleLessons.map((lesson) => {
              const course = courses.find((item) => item.id === lesson.courseId);
              return (
                <a key={lesson.id} href={`/api/notes/${lesson.id}`} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-primary hover:shadow-md">
                  <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary">{course?.shortTitle}</p>
                  <h3 className="font-extrabold text-dark">{lesson.title}</h3>
                  <p className="mt-3 text-sm text-gray-500">Download PDF notes</p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-14">
          <p className="text-sm font-black uppercase tracking-widest text-primary">Latest Guides</p>
          <h2 className="mb-6 text-2xl font-extrabold text-dark">Blog resources</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {blogPosts.slice(0, 4).map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl sm:grid-cols-3">
                <img src={post.image} alt={post.title} className="h-44 w-full object-cover sm:h-full" />
                <div className="p-5 sm:col-span-2">
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
