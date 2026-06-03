import type { Metadata } from "next";
import Link from "next/link";
import { courses } from "@/data/courses";

export const metadata: Metadata = {
  title: "Portfolio Builder | Student Project Briefs",
  description:
    "Build a graduation-ready portfolio with guided project briefs for design, coding, AI, video, and CAD students at Sam Creative Design School.",
};

const projectBriefs = [
  {
    courseId: "photoshop-masterclass",
    theme: "Campaign Design Kit",
    audience: "A small business launching a weekend offer",
    deliverables: ["Poster", "Instagram square post", "WhatsApp status artwork", "Product mockup"],
    skills: ["Photo cleanup", "Layout hierarchy", "Color correction", "Export settings"],
    proof: "Show the original image, final artwork, and two mockups in one case-study slide.",
    accent: "bg-sky-500",
  },
  {
    courseId: "illustrator-training",
    theme: "Mini Brand Identity",
    audience: "A new local food, fashion, beauty, or tech brand",
    deliverables: ["Logo system", "Color palette", "Typography sheet", "Business card front and back"],
    skills: ["Vector paths", "Logo construction", "Typography pairing", "Print setup"],
    proof: "Include your logo grid, black-and-white version, and final brand preview.",
    accent: "bg-amber-500",
  },
  {
    courseId: "vibe-designing-uiux",
    theme: "Mobile App UI/UX Case Study",
    audience: "A local service business that needs a smoother booking or ordering flow",
    deliverables: ["User persona", "Wireframe flow", "High-fidelity Figma screens", "Clickable prototype"],
    skills: ["User research", "Journey mapping", "Auto layout", "Prototype testing"],
    proof: "Show the problem statement, before-and-after flow, final screens, and usability notes.",
    accent: "bg-teal-500",
  },
  {
    courseId: "vibe-coding-web-dev",
    theme: "Responsive Business Website",
    audience: "A real or imagined client who needs an online presence with a contact or booking flow",
    deliverables: ["Responsive landing page", "Course or service cards", "Interactive form", "Deployment link"],
    skills: ["Semantic HTML", "Responsive CSS", "React components", "API-ready forms"],
    proof: "Include the live URL, GitHub repository, mobile screenshot, and short build notes.",
    accent: "bg-lime-500",
  },
  {
    courseId: "ai-prompt-engineering",
    theme: "AI Workflow System",
    audience: "A small team that wants repeatable content, research, or customer-support assistance",
    deliverables: ["Prompt library", "Workflow map", "Output examples", "Quality checklist"],
    skills: ["Prompt structure", "Context design", "Evaluation", "Responsible AI review"],
    proof: "Show the prompt template, sample outputs, review checklist, and final use-case summary.",
    accent: "bg-fuchsia-500",
  },
  {
    courseId: "capcut-masterclass",
    theme: "Short-Form Content Pack",
    audience: "A creator or business promoting one clear offer",
    deliverables: ["15 second reel", "30 second explainer", "Caption set", "Thumbnail frame"],
    skills: ["Pacing", "Text animation", "Audio sync", "Hook writing"],
    proof: "Present the final video, timeline screenshot, hook notes, and export settings.",
    accent: "bg-rose-500",
  },
  {
    courseId: "solidworks-engineers",
    theme: "Functional Product Model",
    audience: "An engineering reviewer checking design intent",
    deliverables: ["Part model", "Assembly", "Technical drawing", "Rendered product view"],
    skills: ["Sketch constraints", "Feature planning", "Assembly mates", "Drawing standards"],
    proof: "Show the model tree, drawing sheet, exploded view, and final render.",
    accent: "bg-emerald-500",
  },
];

const milestones = [
  { week: "01", title: "Choose a brief", text: "Pick one project that matches the course you are currently taking." },
  { week: "02", title: "Collect references", text: "Gather 6 to 10 examples, then write what you will borrow and improve." },
  { week: "03", title: "Build the first version", text: "Create the main deliverable and save every major revision clearly." },
  { week: "04", title: "Package the case study", text: "Export final files, screenshots, notes, and a short result summary." },
];

const readinessChecks = [
  "The project solves a clear real-world problem.",
  "Final files are exported in the right formats.",
  "You can explain the tools and decisions used.",
  "Your case study shows process, not only the final image.",
  "The work is named and organized for quick review.",
  "At least one piece is ready to submit to the student gallery.",
];

export default function PortfolioBuilderPage() {
  const briefs = projectBriefs.map((brief) => ({
    ...brief,
    course: courses.find((course) => course.id === brief.courseId),
  }));

  return (
    <div className="bg-white pt-28">
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-white" aria-hidden="true" />
        <div className="container relative mx-auto grid min-h-[620px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary-light">
              Portfolio Builder
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Graduate with work that looks ready for real clients.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Follow guided project briefs for each course, build a focused case study, and leave school with practical evidence of what you can create.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#briefs"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                View Project Briefs
              </Link>
              <Link
                href="/gallery#submit-project"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-7 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Submit Finished Work
              </Link>
            </div>
          </div>

          <div className="relative pb-16 lg:pb-0">
            <div className="grid grid-cols-2 gap-4">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className={`overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 ${index % 2 === 1 ? "translate-y-8" : ""}`}
                >
                  <img src={course.image} alt={course.title} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-primary">{course.shortTitle}</p>
                    <p className="mt-1 text-sm font-extrabold leading-snug text-dark">{course.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        <section className="-mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
          {milestones.map((item) => (
            <div key={item.week} className="relative rounded-xl border border-gray-100 bg-white p-5 shadow-lg shadow-slate-900/5">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Step {item.week}</span>
              <h2 className="mt-3 text-lg font-extrabold text-dark">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
            </div>
          ))}
        </section>

        <section id="briefs" className="py-20">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-primary">Guided Briefs</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-dark md:text-4xl">
                Pick one strong project and present it like a professional case study.
              </h2>
            </div>
            <Link href="/courses" className="font-extrabold text-primary transition hover:text-primary-dark">
              Match a brief to a course
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {briefs.map((brief) => (
              <article key={brief.courseId} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr]">
                  <div className="relative min-h-64 bg-dark">
                    {brief.course && (
                      <img src={brief.course.image} alt={brief.course.title} className="absolute inset-0 h-full w-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className={`mb-3 inline-block h-2 w-14 rounded-full ${brief.accent}`} />
                      <p className="text-xs font-black uppercase tracking-widest text-white/75">{brief.course?.shortTitle}</p>
                      <h3 className="mt-1 text-2xl font-extrabold text-white">{brief.theme}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-bold text-gray-500">Client scenario</p>
                    <p className="mt-1 text-base font-extrabold text-dark">{brief.audience}</p>

                    <div className="mt-6">
                      <p className="mb-3 text-sm font-black uppercase tracking-widest text-primary">Deliverables</p>
                      <div className="flex flex-wrap gap-2">
                        {brief.deliverables.map((item) => (
                          <span key={item} className="rounded-full bg-light-gray px-3 py-2 text-xs font-extrabold text-dark">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {brief.skills.map((skill) => (
                        <div key={skill} className="border-l-4 border-primary/30 pl-3 text-sm font-semibold text-gray-700">
                          {skill}
                        </div>
                      ))}
                    </div>

                    <p className="mt-6 rounded-xl bg-[#fff7ed] p-4 text-sm font-semibold leading-6 text-[#9a3412]">
                      Portfolio proof: {brief.proof}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 rounded-3xl bg-[#f8fafc] p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-primary">Graduation Standard</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-dark">
              Your portfolio is ready when it can be reviewed in under five minutes.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              A strong student portfolio is focused, tidy, and easy to judge. Use this checklist before submitting work to the gallery or sharing it with a client.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/lms" className="rounded-xl bg-dark px-6 py-4 text-center text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-primary">
                Continue in LMS
              </Link>
              <Link href="/enroll" className="rounded-xl border border-gray-300 px-6 py-4 text-center text-sm font-extrabold text-dark transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                Join a Course
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {readinessChecks.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-6 text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
