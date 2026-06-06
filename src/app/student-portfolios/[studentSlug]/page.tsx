import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, lessons } from "@/data/courses";
import { getDB } from "@/lib/db";
import { slugifyName } from "@/lib/slugs";
import type { ProgressRecord, ProjectSubmission, Student } from "@/types";

export const dynamic = "force-dynamic";

interface StudentPortfolioPageProps {
  params: Promise<{ studentSlug: string }>;
}

export async function generateMetadata({ params }: StudentPortfolioPageProps) {
  const { studentSlug } = await params;
  const projects = (await getDB<ProjectSubmission>("projects.json")).filter((project) => project.status === "approved");
  const profileProjects = projects.filter((project) => slugifyName(project.studentName) === studentSlug);
  const studentName = profileProjects[0]?.studentName || "Student";

  return {
    title: `${studentName} Portfolio | Sam Creative Design School`,
    description: `Approved projects, skills, and certificates for ${studentName}.`,
  };
}

export default async function StudentPortfolioPage({ params }: StudentPortfolioPageProps) {
  const { studentSlug } = await params;
  const [projects, students, progress] = await Promise.all([
    getDB<ProjectSubmission>("projects.json"),
    getDB<Student>("students.json"),
    getDB<ProgressRecord>("progress.json"),
  ]);

  const profileProjects = projects
    .filter((project) => project.status === "approved" && slugifyName(project.studentName) === studentSlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (profileProjects.length === 0) notFound();

  const studentName = profileProjects[0].studentName;
  const student = students.find((item) => slugifyName(item.name) === studentSlug);
  const projectCourses = courses.filter((course) =>
    profileProjects.some((project) => project.courseId === course.id || project.courseName === course.shortTitle)
  );
  const skills = Array.from(new Set(projectCourses.flatMap((course) => course.skills)));
  const completedCourses = student
    ? courses.filter((course) => {
        const courseLessons = lessons.filter((lesson) => lesson.courseId === course.id);
        const record = progress.find((item) => item.studentId === student.id && item.courseId === course.id);
        return courseLessons.length > 0 && record?.completedLessons.length === courseLessons.length;
      })
    : [];

  return (
    <main className="min-h-screen bg-white pt-24 pb-20 md:pt-32">
      <section className="container mx-auto px-6">
        <Link href="/student-portfolios" className="mb-8 inline-flex rounded-full bg-light-gray px-5 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white">
          Back to Portfolios
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <aside className="rounded-3xl border border-gray-100 bg-light-gray p-6">
            <div className="grid h-24 w-24 place-items-center rounded-3xl bg-primary text-4xl font-black text-white">
              {studentName.slice(0, 1)}
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.3em] text-primary">Public Student Portfolio</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-dark">{studentName}</h1>
            <p className="mt-4 text-gray-600">
              A shareable profile of approved course projects, practical skills, and verified LMS completion where available.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-4 text-center">
                <p className="text-2xl font-black text-dark">{profileProjects.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Projects</p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center">
                <p className="text-2xl font-black text-dark">{skills.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Skills</p>
              </div>
              <div className="rounded-2xl bg-white p-4 text-center">
                <p className="text-2xl font-black text-dark">{completedCourses.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Certificates</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-3 font-extrabold text-dark">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-600">{skill}</span>
                )) : <span className="text-sm text-gray-500">Skills appear after approved course projects.</span>}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-3 font-extrabold text-dark">Certificates</h2>
              {completedCourses.length > 0 ? (
                <div className="space-y-2">
                  {completedCourses.map((course) => (
                    <span key={course.id} className="block rounded-xl bg-white px-4 py-3 text-sm font-bold text-green-700">
                      {course.title}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-white px-4 py-3 text-sm text-gray-500">Certificates show here after LMS completion is recorded.</p>
              )}
            </div>
          </aside>

          <div>
            <div className="mb-5">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">Approved Projects</p>
              <h2 className="mt-2 text-3xl font-black text-dark">Portfolio work</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {profileProjects.map((project) => (
                <article key={project.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                  <div className="h-56 overflow-hidden bg-primary/10">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center text-6xl font-black text-primary">{project.courseName.slice(0, 1)}</div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-primary">{project.courseName}</p>
                    <h3 className="mt-2 text-xl font-extrabold text-dark">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-500">{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

