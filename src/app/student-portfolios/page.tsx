import Link from "next/link";
import { courses } from "@/data/courses";
import { getDB } from "@/lib/db";
import { slugifyName } from "@/lib/slugs";
import type { ProjectSubmission } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Student Portfolios | Sam Creative Design School",
  description: "Browse public student portfolio pages with approved projects, course skills, and certificate progress.",
};

export default async function StudentPortfoliosPage() {
  const projects = (await getDB<ProjectSubmission>("projects.json")).filter((project) => project.status === "approved");
  const profileMap = projects.reduce((map, project) => {
      const slug = slugifyName(project.studentName);
      const existing = map.get(slug) || {
        slug,
        studentName: project.studentName,
        projects: [] as ProjectSubmission[],
        skills: new Set<string>(),
      };
      existing.projects.push(project);
      const course = courses.find((item) => item.id === project.courseId || item.shortTitle === project.courseName);
      course?.skills.slice(0, 4).forEach((skill) => existing.skills.add(skill));
      map.set(slug, existing);
      return map;
    }, new Map<string, { slug: string; studentName: string; projects: ProjectSubmission[]; skills: Set<string> }>());
  const profiles = Array.from(profileMap.values()).sort((a, b) => b.projects.length - a.projects.length);

  return (
    <main className="min-h-screen bg-light-gray pt-24 pb-20 md:pt-32">
      <section className="container mx-auto px-6">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-primary">Student Portfolios</p>
          <h1 className="text-4xl font-black tracking-tight text-dark md:text-5xl">Public proof of student work</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Approved student projects are grouped into shareable profile pages for marketing, internship applications, and client trust.
          </p>
        </div>

        {profiles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <h2 className="text-2xl font-extrabold text-dark">No published student portfolios yet</h2>
            <p className="mt-2 text-gray-500">Approved gallery submissions will appear here automatically.</p>
            <Link href="/gallery#submit-project" className="mt-5 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary/90">
              Submit a Project
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => {
              const cover = profile.projects.find((project) => project.imageUrl);
              return (
                <Link key={profile.slug} href={`/student-portfolios/${profile.slug}`} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="h-44 overflow-hidden bg-primary/10">
                    {cover?.imageUrl ? (
                      <img src={cover.imageUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="grid h-full place-items-center text-6xl font-black text-primary">{profile.studentName.slice(0, 1)}</div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-primary">{profile.projects.length} approved project{profile.projects.length === 1 ? "" : "s"}</p>
                    <h2 className="mt-2 text-2xl font-extrabold text-dark">{profile.studentName}</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {Array.from(profile.skills).slice(0, 4).map((skill) => (
                        <span key={skill} className="rounded-full bg-light-gray px-3 py-1 text-xs font-bold text-gray-600">{skill}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
