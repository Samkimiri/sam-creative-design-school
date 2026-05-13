import { courses } from "@/data/courses";
import Link from "next/link";

export default function Courses() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our <span className="text-primary">Professional</span> Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of industry-level training programs designed to give you practical, income-generating skills.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {courses.map((course, index) => (
            <div key={course.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center border-b border-gray-100 pb-16 last:border-0`}>
              <div className="flex-1 w-full">
                <div className="aspect-video bg-dark rounded-3xl overflow-hidden shadow-2xl relative group">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-lg font-bold">
                    {course.duration}
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{course.description}</p>
                
                <div className="mb-8">
                  <h3 className="font-bold text-dark mb-4 text-lg">What you will learn:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {course.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700 font-medium">
                        <svg className="text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-light-gray rounded-2xl">
                  <div>
                    <span className="text-sm text-gray-500 block">Course Fee</span>
                    <span className="text-2xl font-extrabold text-dark">Ksh {course.price}</span>
                  </div>
                  <Link
                    href={`/enroll?course=${course.id}`}
                    className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
