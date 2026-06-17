import Link from "next/link";
import { notFound } from "next/navigation";
import { galleryProjects, type GalleryProject } from "@/data/galleryProjects";
import { seedProjects } from "@/data/projectSubmissions";
import { getDB } from "@/lib/db";
import type { ProjectSubmission } from "@/types";

export const dynamic = "force-dynamic";

interface GalleryProjectPageProps {
  params: Promise<{ projectId: string }>;
}

interface ProjectView {
  id: string;
  student: string;
  course: string;
  title: string;
  description: string;
  image?: string;
  fallbackLabel: string;
  color: string;
}

export async function generateMetadata({ params }: GalleryProjectPageProps) {
  const { projectId } = await params;
  const project = await findProject(projectId);

  if (!project) {
    return {
      title: "Project Not Found | Sam Creative Design School",
    };
  }

  return {
    title: `${project.title} | Student Gallery`,
    description: `${project.title} by ${project.student} in ${project.course}.`,
  };
}

export default async function GalleryProjectPage({ params }: GalleryProjectPageProps) {
  const { projectId } = await params;
  const project = await findProject(projectId);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-white pt-24 pb-20 md:pt-32">
      <section className="container mx-auto px-6">
        <Link href="/gallery" className="mb-8 inline-flex rounded-full bg-light-gray px-5 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-white">
          Back to Gallery
        </Link>

        <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className={`min-h-[320px] bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden md:min-h-[520px]`}>
              {project.image ? (
                <img src={project.image} alt={project.title} className="h-full min-h-[320px] w-full object-cover md:min-h-[520px]" />
              ) : (
                <span className="text-7xl font-black text-white">{project.fallbackLabel}</span>
              )}
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">{project.course}</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-dark md:text-5xl">{project.title}</h1>
              <p className="mt-3 text-sm font-bold text-primary">by {project.student}</p>
              <p className="mt-6 text-base leading-8 text-gray-600">{project.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/gallery#submit-project" className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90">
                  Submit your project
                </Link>
                <Link href="/student-portfolios" className="rounded-full bg-light-gray px-6 py-3 text-sm font-bold text-dark transition hover:bg-gray-200">
                  View portfolios
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

async function findProject(projectId: string): Promise<ProjectView | undefined> {
  const decodedProjectId = decodeURIComponent(projectId);
  const staticProject = galleryProjects.find((project) => project.id === decodedProjectId);
  if (staticProject) return fromGalleryProject(staticProject);

  const submittedProjects = await getDB<ProjectSubmission>("projects.json");
  const approvedProjects = [...submittedProjects.filter((project) => project.status === "approved"), ...seedProjects];
  const submittedProject = approvedProjects.find((project) => project.id === decodedProjectId);

  return submittedProject ? fromSubmission(submittedProject) : undefined;
}

function fromGalleryProject(project: GalleryProject): ProjectView {
  return {
    id: project.id,
    student: project.student,
    course: project.course,
    title: project.title,
    description: project.desc,
    image: project.image,
    fallbackLabel: project.fallbackLabel,
    color: project.color,
  };
}

function fromSubmission(project: ProjectSubmission): ProjectView {
  return {
    id: project.id,
    student: project.studentName,
    course: project.courseName,
    title: project.title,
    description: project.description,
    image: project.imageUrl,
    fallbackLabel: project.courseName.slice(0, 1).toUpperCase() || "P",
    color: "from-primary to-sky-500",
  };
}
