"use client";

import { useEffect, useMemo, useState } from "react";
import { courses } from "@/data/courses";
import type { ProjectSubmission } from "@/types";

export default function StudentProjects() {
  const [projects, setProjects] = useState<ProjectSubmission[]>([]);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ studentName: "", courseId: courses[0]?.id || "", title: "", description: "", imageUrl: "" });
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
    setStatus("Project submitted. It will appear publicly after admin approval.");
  };

  return (
    <section id="submit-project" className="mt-16">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
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
          {approvedProjects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="h-48 bg-primary/10">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl font-black text-primary">{project.courseName.slice(0, 1)}</div>
                )}
              </div>
              <div className="p-5">
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary">{project.courseName}</p>
                <h3 className="font-extrabold text-dark">{project.title}</h3>
                <p className="mt-1 text-xs font-bold text-primary">by {project.studentName}</p>
                <p className="mt-3 text-sm leading-6 text-gray-500">{project.description}</p>
              </div>
            </article>
          ))}
        </div>

        <form onSubmit={submitProject} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-xl font-extrabold text-dark">Submit your project</h3>
          <div className="space-y-4">
            <input value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder="Your name" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary" />
            <select value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary">
              {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
            </select>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project title" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary" />
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Image link or uploaded file URL" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe what you created" rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary" />
          </div>
          <button className="mt-5 w-full rounded-xl bg-primary px-5 py-3 font-bold text-white hover:bg-primary/90">
            Submit for Review
          </button>
          {status && <p className="mt-4 text-sm font-medium text-gray-600">{status}</p>}
        </form>
      </div>
    </section>
  );
}
