import Link from "next/link";
import { courses, lessons } from "@/data/courses";
import { getSession } from "@/lib/auth";
import { getDB } from "@/lib/db";

interface ProgressRecord {
  studentId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; total: number; date: string }[];
  lastAccessed: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  profileImage?: string;
}

export default async function LMSDashboard() {
  const session = await getSession();

  let enrolledCourses = courses;
  let studentName = "Student";
  let allProgress: ProgressRecord[] = [];
  let student: Student | undefined = undefined;

  if (session) {
    const allStudents = await getDB<Student>("students.json");
    student = allStudents.find((s) => s.id === session.user.id);
    studentName = session.user.name;
    
    // Fallback: If student not found in JSON (Vercel ephemeral), 
    // we still give them Photoshop access if they are logged in
    const studentEnrolledIds = student?.enrolledCourses || ["photoshop-masterclass"]; 
    enrolledCourses = courses.filter((c) => studentEnrolledIds.includes(c.id));
    
    allProgress = (await getDB<ProgressRecord>("progress.json")).filter((p) => p.studentId === session.user.id);
  } else {
    enrolledCourses = [courses[0]]; // Preview first course
  }

  const getProgress = (courseId: string) => {
    const record = allProgress.find((p) => p.courseId === courseId);
    const total = lessons.filter((l) => l.courseId === courseId).length;
    const completed = record?.completedLessons?.length || 0;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getBadges = (progress: number) => {
    const badges = ["Starter"];
    if (progress >= 25) badges.push("Beginner");
    if (progress >= 50) badges.push("Layer Master");
    if (progress >= 75) badges.push("Quiz Champion");
    if (progress === 100) badges.push("Course Completed");
    return badges;
  };

  const totalCompleted = allProgress.reduce((sum, p) => sum + (p.completedLessons?.length || 0), 0);
  const totalLessons = lessons.length;

  return (
    <div className="relative isolate pt-28 pb-24 bg-[#F8F8F8] min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-white/75" aria-hidden="true" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-1">Learning Portal</p>
            <h1 className="text-4xl font-extrabold text-dark">
              Welcome back, <span className="text-primary">{studentName.split(" ")[0]}</span> 👋
            </h1>
            <p className="text-gray-500 mt-2">Continue your learning journey below.</p>
          </div>
          <div className="flex items-center gap-4">
            {!session && (
              <Link
                href="/auth/login"
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Sign In to Save Progress
              </Link>
            )}
            {session && (
              <Link
                href="/lms/profile"
                className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm overflow-hidden border border-primary/20">
                  {student?.profileImage ? (
                    <img src={student.profileImage} alt={studentName} className="w-full h-full object-cover" />
                  ) : (
                    studentName.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="font-bold text-dark">{studentName}</span>
              </Link>
            )}
          </div>
        </div>

        {session && enrolledCourses.length > 0 && (
          <div className="mb-10 bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-center gap-6 animate-pulse-slow">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-blue-100">✅</div>
            <div>
              <h2 className="text-xl font-bold text-blue-900">Your Course is Now Active!</h2>
              <p className="text-blue-700 opacity-80 font-medium">Your payment has been verified. You can now start learning below.</p>
            </div>
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Courses Enrolled", value: enrolledCourses.length.toString(), icon: "📚" },
            { label: "Lessons Completed", value: totalCompleted.toString(), icon: "✅" },
            { label: "Total Lessons", value: totalLessons.toString(), icon: "🎯" },
            { label: "Certificates Earned", value: enrolledCourses.filter((_, i) => getProgress(enrolledCourses[i]?.id) === 100).length.toString(), icon: "🏆" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-dark">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {enrolledCourses.map((course) => {
            const progress = getProgress(course.id);
            const courseLessons = lessons.filter((l) => l.courseId === course.id);
            return (
              <div key={course.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className={`h-36 bg-gradient-to-br ${course.color} relative flex items-center justify-center`}>
                  <span className="text-6xl">{course.icon}</span>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {course.level}
                  </div>
                  {progress === 100 && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      ✓ Completed
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors leading-tight">
                      {course.title}
                    </h3>
                    <span className="text-primary font-bold text-sm shrink-0 ml-2">{course.duration}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                    <span>📖 {courseLessons.length} lessons</span>
                    <span>🏅 Certificate</span>
                  </div>

                  <div className="mb-5">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-500 font-medium">Progress</span>
                      <span className="text-primary font-bold">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-wrap gap-2">
                    {getBadges(progress).map((badge) => (
                      <span key={badge} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary">
                        {badge}
                      </span>
                    ))}
                  </div>

                  {progress === 100 && (
                    <a
                      href={`/api/certificates/${course.id}`}
                      className="mb-3 block w-full border border-green-500 bg-green-50 text-green-700 text-center font-bold py-3.5 rounded-xl hover:bg-green-100 transition-all"
                    >
                      Download Certificate
                    </a>
                  )}

                  <Link
                    href={`/lms/${course.id}`}
                    className="block w-full bg-dark text-white text-center font-bold py-3.5 rounded-xl hover:bg-primary transition-all shadow-sm"
                  >
                    {progress > 0 ? "Continue Learning →" : "Start Course →"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Other Available Courses */}
        {session && courses.filter(c => !enrolledCourses.find(ec => ec.id === c.id)).length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-dark mb-6">Available to Enroll</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.filter(c => !enrolledCourses.find(ec => ec.id === ec.id && ec.id === c.id)).map((course) => (
                <div key={course.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl`}>
                      {course.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark leading-tight">{course.title}</h4>
                      <p className="text-xs text-gray-500">{course.level}</p>
                    </div>
                  </div>
                  <Link
                    href={`/enroll?course=${course.id}`}
                    className="block w-full border border-primary text-primary text-center font-bold py-2 rounded-lg text-sm hover:bg-primary hover:text-white transition-all"
                  >
                    Enroll Now
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Browse More */}
        {session && enrolledCourses.length < courses.length && (
          <div className="mt-12 bg-white rounded-3xl border border-dashed border-gray-200 p-10 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-2">Expand Your Skills</h3>
            <p className="text-gray-500 mb-6">Enroll in more courses to unlock your full creative potential.</p>
            <Link href="/courses" className="inline-block bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all">
              Browse All Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
