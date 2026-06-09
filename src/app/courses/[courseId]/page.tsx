import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  Layers3,
  MessageCircle,
  Star,
  UserPlus,
  Wrench,
} from "lucide-react";
import { getManagedCourses, getManagedLessons } from "@/lib/contentSettings";
import { getDB } from "@/lib/db";
import CourseReviewForm from "@/components/CourseReviewForm";
import type { Review } from "@/types";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

const courseTools: Record<string, string[]> = {
  "photoshop-masterclass": ["Adobe Photoshop", "Canva", "Freepik", "Mockup resources", "Laptop or desktop"],
  "illustrator-training": ["Adobe Illustrator", "Pen tablet optional", "Font libraries", "Brand reference boards"],
  "capcut-masterclass": ["CapCut", "Smartphone or laptop", "Microphone optional", "Short-form video templates"],
  "solidworks-engineers": ["SolidWorks", "Mouse", "Engineering notebook", "Technical drawing templates"],
  "vibe-designing-ui-ux": ["Figma", "FigJam", "Canva", "Browser research tools", "Portfolio mockup tools"],
  "vibe-coding-web-dev": ["VS Code", "GitHub", "Browser DevTools", "Node.js", "Vercel"],
  "ai-prompt-engineering": ["ChatGPT", "Claude", "Perplexity", "Google Workspace", "Prompt notebooks"],
};

const courseProjects: Record<string, string[]> = {
  "photoshop-masterclass": ["Social media campaign kit", "Event poster", "Product mockup", "Photo retouching before/after"],
  "illustrator-training": ["Logo system", "Icon pack", "Brand guideline sheet", "Vector illustration"],
  "capcut-masterclass": ["TikTok/Reels edit", "Product promo video", "Captioned talking-head clip", "Before/after edit breakdown"],
  "solidworks-engineers": ["3D part model", "Assembly drawing", "Technical drawing sheet", "Rendered product presentation"],
  "vibe-designing-ui-ux": ["Landing page wireframe", "Mobile app screen flow", "Design system mini-kit", "Clickable prototype"],
  "vibe-coding-web-dev": ["Responsive landing page", "Portfolio website", "Form/API project", "Deployed web app"],
  "ai-prompt-engineering": ["Prompt library", "AI content workflow", "Research brief", "Automation-ready content plan"],
};

function getCourseFAQs(courseTitle: string) {
  return [
    {
      q: `Who is the ${courseTitle} course for?`,
      a: "It is for beginners, students, freelancers, and professionals who want practical, portfolio-ready skills.",
    },
    {
      q: "Will I build real projects?",
      a: "Yes. Each course includes guided assignments and project briefs that help you create work you can show.",
    },
    {
      q: "Can I learn online?",
      a: "Yes. You get LMS access, lesson notes, assignments, quizzes, and WhatsApp support.",
    },
    {
      q: "Do I get a certificate?",
      a: "Yes. Certificates are issued after completing the required lessons, quizzes, and assignments.",
    },
  ];
}

export async function generateStaticParams() {
  const courses = await getManagedCourses();
  return courses.map((course) => ({ courseId: course.id }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params;
  const courses = await getManagedCourses();
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return {
      title: "Course Not Found | Sam Creative Design School",
    };
  }

  return {
    title: `${course.title} in Kenya | Sam Creative Design School`,
    description: `${course.description} Learn with LMS access, practical projects, mentorship, and a certificate.`,
    keywords: [
      `${course.shortTitle} course Kenya`,
      `${course.title} training`,
      "online design courses with certificate",
      "Sam Creative Design School",
    ],
    openGraph: {
      title: `${course.title} in Kenya`,
      description: course.description,
      images: [{ url: course.image, alt: course.title }],
    },
  };
}

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const [courses, lessons, reviews] = await Promise.all([
    getManagedCourses(),
    getManagedLessons(),
    getDB<Review>("reviews.json"),
  ]);
  const course = courses.find((item) => item.id === courseId);

  if (!course) notFound();

  const courseLessons = lessons
    .filter((lesson) => lesson.courseId === course.id)
    .sort((a, b) => a.order - b.order);
  const courseReviews = reviews.filter((review) => review.courseId === course.id && review.approved === true);
  const ratingAverage = courseReviews.length
    ? courseReviews.reduce((sum, review) => sum + review.rating, 0) / courseReviews.length
    : 0;
  const tools = courseTools[course.id] || ["Laptop or smartphone", "Stable internet", "LMS access", "Practice files"];
  const projects = courseProjects[course.id] || course.skills.map((skill) => `${skill} practice project`);
  const faqs = getCourseFAQs(course.title);

  return (
    <div className="bg-white pt-28">
      <section className="bg-dark py-16 text-white md:py-20">
        <div className="container mx-auto px-6">
          <Link href="/courses" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary-light hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to courses
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-primary-light">{course.level}</p>
              <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">{course.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{course.longDescription || course.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                  <Clock className="h-4 w-4 text-primary-light" aria-hidden="true" />
                  {course.duration}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                  <BadgeCheck className="h-4 w-4 text-primary-light" aria-hidden="true" />
                  Certificate Included
                </span>
                {courseReviews.length > 0 && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                    <Star className="h-4 w-4 fill-primary-light text-primary-light" aria-hidden="true" />
                    {ratingAverage.toFixed(1)} from {courseReviews.length} reviews
                  </span>
                )}
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
              <img src={course.image} alt={course.title} className="h-72 w-full object-cover md:h-96" />
              <div className="p-6">
                <p className="text-sm font-bold text-white/60">Course Fee</p>
                <p className="mt-1 text-4xl font-extrabold text-primary-light">Ksh {course.price.toLocaleString()}</p>
                <p className="mt-1 text-sm text-white/60">{course.priceRange}</p>
                <Link href={`/enroll?course=${course.id}`} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary-dark">
                  <UserPlus className="h-5 w-5" aria-hidden="true" />
                  Enroll in this course
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-primary">Full Curriculum</p>
            <h2 className="mt-3 text-3xl font-extrabold text-dark">What you will learn week by week</h2>
            <p className="mt-4 text-gray-600">Lessons include notes, resources, assignments, and quizzes where available.</p>
          </div>
          <div className="space-y-3">
            {courseLessons.map((lesson) => (
              <div key={lesson.id} className="rounded-2xl border border-gray-100 bg-light-gray p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-extrabold text-dark">{lesson.order}. {lesson.title}</h3>
                  <span className="text-xs font-black uppercase tracking-widest text-primary">{lesson.duration}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{lesson.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light-gray py-16">
        <div className="container mx-auto grid gap-6 px-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <Wrench className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-extrabold text-dark">Software and tools</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{tool}</span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm lg:col-span-2">
            <Layers3 className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-extrabold text-dark">Projects you will build</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {projects.map((project) => (
                <div key={project} className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-700">{project}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-gray-100 p-7">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="h-7 w-7 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-extrabold text-dark">Student testimonials</h2>
            </div>
            <div className="space-y-4">
              {courseReviews.length ? courseReviews.slice(0, 3).map((review) => (
                <blockquote key={review.id} className="rounded-2xl bg-light-gray p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-bold text-dark">{review.name}</span>
                    <span className="text-xs font-black text-primary">{review.rating}/5</span>
                  </div>
                  <p className="text-sm leading-6 text-gray-600">{review.text}</p>
                </blockquote>
              )) : (
                <p className="rounded-2xl bg-light-gray p-5 text-sm font-semibold text-gray-600">Be among the first students to review this course after completing your projects.</p>
              )}
            </div>
            <div className="mt-5">
              <CourseReviewForm courseId={course.id} courseName={course.title} />
            </div>
          </div>
          <div className="rounded-3xl border border-gray-100 p-7">
            <div className="mb-5 flex items-center gap-3">
              <HelpCircle className="h-7 w-7 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-extrabold text-dark">Course FAQ</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl bg-light-gray p-5">
                  <h3 className="font-extrabold text-dark">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <FileText className="mx-auto mb-4 h-10 w-10" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold md:text-4xl">Ready to start {course.shortTitle}?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">Enroll today, complete the lessons, submit your projects, and build work you can show with confidence.</p>
          <Link href={`/enroll?course=${course.id}`} className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-dark px-8 py-4 text-base font-extrabold text-white transition-all hover:-translate-y-0.5">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            Enroll in this course
          </Link>
        </div>
      </section>
    </div>
  );
}
