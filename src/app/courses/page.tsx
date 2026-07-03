import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, CheckCircle2, Eye, Star, UserPlus } from "lucide-react";
import { getManagedCourses } from "@/lib/contentSettings";
import { getDB } from "@/lib/db";
import CourseReviewForm from "@/components/CourseReviewForm";
import type { Review } from "@/types";
import { absoluteUrl, jsonLdScript, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Courses in Kenya | Design, Coding, AI, Video and CAD",
  description:
    "Enroll in practical Photoshop, Illustrator, UI/UX, web development, AI prompt engineering, CapCut, and SolidWorks training in Kenya, with LMS access, notes, quizzes, and certificates.",
  openGraph: {
    title: "Professional Creative and Tech Courses in Kenya",
    description:
      "Build portfolio-ready skills in design, coding, AI, video editing, and 3D CAD at Sam Creative Design School.",
    images: [
      {
        url: "/images/course-vibe-coding-web-dev.png",
        alt: "Sam Creative Design School courses",
      },
    ],
  },
  alternates: {
    canonical: "/courses",
  },
};

export default async function Courses() {
  const [courses, savedReviews] = await Promise.all([
    getManagedCourses(),
    getDB<Review>("reviews.json"),
  ]);
  const approvedReviews = savedReviews.filter((review) => review.approved === true);
  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Creative and technical courses in Kenya",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: course.description,
        url: absoluteUrl(`/courses/${course.id}`),
        image: absoluteUrl(course.image),
        provider: {
          "@type": "EducationalOrganization",
          name: siteName,
          sameAs: absoluteUrl("/"),
        },
      },
    })),
  };

  return (
    <div className="pt-32 pb-24 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(coursesJsonLd)} />
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our <span className="text-primary">Professional</span> Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of industry-level training programs designed to give you practical, income-generating skills.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {courses.map((course, index) => {
            const courseReviews = approvedReviews.filter((review) => review.courseId === course.id);
            const ratingAverage = courseReviews.length
              ? courseReviews.reduce((sum, review) => sum + review.rating, 0) / courseReviews.length
              : 0;

            return (
            <div key={course.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center border-b border-gray-100 pb-16 last:border-0 animate-fade-in`}>
              <div className="flex-1 w-full">
                <div className="aspect-video bg-dark rounded-3xl overflow-hidden shadow-2xl relative group transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-primary/20">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-lg font-bold transition-transform duration-300 motion-safe:group-hover:scale-105">
                    {course.duration}
                  </div>
                </div>
              </div>
              <div className="flex-1 transition-transform duration-300 motion-safe:hover:translate-x-1">
                <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                {courseReviews.length > 0 && (
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-primary">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary" aria-hidden="true" />
                      {ratingAverage.toFixed(1)}
                    </span>
                    <span className="text-gray-400">from {courseReviews.length} review{courseReviews.length === 1 ? "" : "s"}</span>
                  </div>
                )}
                <p className="text-lg text-gray-600 mb-8">{course.description}</p>
                
                <div className="mb-8">
                  <h3 className="font-bold text-dark mb-4 text-lg">What you will learn:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {course.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700 font-medium transition-colors duration-300 hover:text-dark">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 motion-safe:hover:scale-110" aria-hidden="true" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-5 p-6 bg-light-gray rounded-2xl sm:flex-row sm:items-center sm:justify-between transition-shadow duration-300 hover:shadow-lg">
                  <div>
                    <span className="text-sm text-gray-500 block">Course Fee</span>
                    <span className="text-2xl font-extrabold text-dark">Ksh {course.price}</span>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-dark px-6 py-4 rounded-xl font-bold text-center hover:border-primary hover:text-primary transition-all duration-300 motion-safe:hover:-translate-y-0.5"
                    >
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                      View Details
                    </Link>
                    <Link
                      href={`/lms/${course.id}?preview=1`}
                      className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-6 py-4 rounded-xl font-bold text-center hover:bg-primary hover:text-white transition-all duration-300 motion-safe:hover:-translate-y-0.5"
                    >
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      Preview Lesson
                    </Link>
                    <Link
                      href={`/enroll?course=${course.id}`}
                      className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-center hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <UserPlus className="h-4 w-4" aria-hidden="true" />
                      Enroll Now
                    </Link>
                  </div>
                </div>
                <div className="mt-6 grid gap-4">
                  {courseReviews.slice(0, 2).map((review) => (
                    <blockquote key={review.id} className="rounded-2xl border border-gray-100 bg-white p-4 text-sm text-gray-600 shadow-sm">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="font-bold text-dark">{review.name}</span>
                        <span className="text-xs font-black text-primary">{review.rating}/5</span>
                      </div>
                      <p>{review.text}</p>
                    </blockquote>
                  ))}
                  <CourseReviewForm courseId={course.id} courseName={course.title} />
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>
    </div>
  );
}
