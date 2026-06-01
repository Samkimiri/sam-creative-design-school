import { courses } from "@/data/courses";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses in Kenya | Photoshop, Illustrator, CapCut and SolidWorks",
  description:
    "Enroll in practical Photoshop, Illustrator, CapCut, and SolidWorks training at Sam Creative Design School in Kenya, with LMS access, notes, quizzes, and certificates.",
};

export default function Courses() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our <span className="text-primary">Professional</span> Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of industry-level training programs designed to give you practical, income-generating skills.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {courses.map((course, index) => (
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
                <p className="text-lg text-gray-600 mb-8">{course.description}</p>
                
                <div className="mb-8">
                  <h3 className="font-bold text-dark mb-4 text-lg">What you will learn:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {course.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700 font-medium transition-colors duration-300 hover:text-dark">
                        <svg className="text-primary transition-transform duration-300 motion-safe:hover:scale-110" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
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
                      href={`/lms/${course.id}?preview=1`}
                      className="border border-primary text-primary px-6 py-4 rounded-xl font-bold text-center hover:bg-primary hover:text-white transition-all duration-300 motion-safe:hover:-translate-y-0.5"
                    >
                      Preview Lesson
                    </Link>
                    <Link
                      href={`/enroll?course=${course.id}`}
                      className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-center hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
