"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import { slugifyName } from "@/lib/slugs";
import type { ProjectSubmission } from "@/types";

export default function StudentProjects() {
  const [projects, setProjects] = useState<ProjectSubmission[]>([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ studentName: "", courseId: courses[0]?.id || "", title: "", description: "", imageUrl: "" });
  const [imagePreview, setImagePreview] = useState("");
  const approvedProjects = useMemo(() => projects.filter((project) => project.status === "approved"), [projects]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.data);
      })
      .catch(() => undefined);
  }, []);

  const submitProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) {
        setStatus(data.message || "Could not submit project.");
        return;
      }
      setForm({ studentName: "", courseId: courses[0]?.id || "", title: "", description: "", imageUrl: "" });
      setImagePreview("");
      setStatus("Project submitted. It will appear publicly after admin approval.");
    } catch {
      setStatus("Could not submit project. Please try again.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus("Please choose a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setStatus("Please choose an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = typeof reader.result === "string" ? reader.result : "";
      setForm((current) => ({ ...current, imageUrl }));
      setImagePreview(imageUrl);
      setStatus("");
    };
    reader.onerror = () => setStatus("Could not read this image. Please try another file.");
    reader.readAsDataURL(file);
  };

  return (
    <section id="submit-project" className="mt-16">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-primary">Student Projects</p>
          <h2 className="text-3xl font-extrabold text-dark">Submitted work</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-gray-500">
          Students can submit finished course work here. Approved projects appear publicly in the gallery.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {approvedProjects.map((project, index) => {
            const projectHref = `/gallery/${project.id}`;

            return (
              <article key={project.id} className="premium-card group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg motion-safe:hover:-translate-y-1" data-reveal style={{ "--reveal-delay": `${index * 55}ms` } as CSSProperties}>
                <Link href={projectHref} className="block h-48 bg-primary/10 overflow-hidden" aria-label={`View ${project.title}`}>
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl font-black text-primary transition-transform duration-300 motion-safe:group-hover:scale-110">{project.courseName.slice(0, 1)}</div>
                  )}
                </Link>
                <div className="p-5">
                  <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary">{project.courseName}</p>
                  <h3 className="font-extrabold text-dark">
                    <Link href={projectHref} className="transition-colors hover:text-primary">
                      {project.title}
                    </Link>
                  </h3>
                  <Link href={`/student-portfolios/${slugifyName(project.studentName)}`} className="mt-1 inline-flex text-xs font-bold text-primary hover:underline">
                    by {project.studentName}
                  </Link>
                  <p className="mt-3 text-sm leading-6 text-gray-500">{project.description}</p>
                  <Link href={projectHref} className="premium-button mt-4 inline-flex rounded-full bg-light-gray px-4 py-2 text-xs font-black uppercase tracking-widest text-primary transition hover:bg-primary hover:text-white">
                    View project
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <form onSubmit={submitProject} className="premium-card rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg" data-reveal>
          <h3 className="mb-5 text-xl font-extrabold text-dark">Submit your project</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="project-student-name" className="mb-2 block text-sm font-bold text-dark">Your name</label>
              <input id="project-student-name" required value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder="Your name" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-colors duration-300 focus:border-primary" />
            </div>
            <div>
              <label htmlFor="project-course" className="mb-2 block text-sm font-bold text-dark">Course</label>
              <select id="project-course" required value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-colors duration-300 focus:border-primary">
              {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="project-title" className="mb-2 block text-sm font-bold text-dark">Project title</label>
              <input id="project-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project title" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-colors duration-300 focus:border-primary" />
            </div>
            <div>
              <label htmlFor="project-image-file" className="mb-2 block text-sm font-bold text-dark">Upload image</label>
              <input id="project-image-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleImageUpload} className="w-full rounded-xl border border-dashed border-gray-300 bg-light-gray/50 px-4 py-3 text-sm font-semibold text-gray-600 outline-none transition-colors duration-300 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:font-bold file:text-white hover:border-primary focus:border-primary" />
              <p className="mt-2 text-xs font-medium text-gray-500">PNG, JPG, WebP, or GIF. Max 2 MB.</p>
              {imagePreview && (
                <div className="mt-3 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  <img src={imagePreview} alt="Selected project preview" className="h-36 w-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="project-image-url" className="mb-2 block text-sm font-bold text-dark">Or paste image URL</label>
              <input id="project-image-url" type="url" value={form.imageUrl.startsWith("data:") ? "" : form.imageUrl} onChange={(e) => { setForm({ ...form, imageUrl: e.target.value }); setImagePreview(e.target.value); }} placeholder="https://example.com/project-image.jpg" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-colors duration-300 focus:border-primary" />
            </div>
            <div>
              <label htmlFor="project-description" className="mb-2 block text-sm font-bold text-dark">Description</label>
              <textarea id="project-description" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe what you created" rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-colors duration-300 focus:border-primary" />
            </div>
          </div>
          <button disabled={status === "Submitting..."} className="premium-button mt-5 w-full rounded-xl bg-primary px-5 py-3 font-bold text-white transition-all duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 motion-safe:hover:-translate-y-0.5">
            {status === "Submitting..." ? "Submitting..." : "Submit for Review"}
          </button>
          {status && <p className="mt-4 text-sm font-medium text-gray-600" role="status" aria-live="polite">{status}</p>}
        </form>
      </div>
    </section>
  );
}
