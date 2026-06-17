import type { Metadata } from "next";
import Link from "next/link";
import {
  Box,
  CheckCircle2,
  Code2,
  Download,
  FileCheck2,
  FolderOpen,
  Monitor,
  PenTool,
  PlayCircle,
  Settings,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tool Setup Guides | Photoshop, Illustrator, CapCut, VS Code, Figma and SolidWorks",
  description:
    "Set up the creative and technical tools used at Sam Creative Design School, including Photoshop, Illustrator, CapCut, VS Code, Figma, and SolidWorks.",
};

const setupGuides = [
  {
    name: "Adobe Photoshop",
    role: "Photo editing, posters, digital art, and mockups",
    course: "Photoshop Masterclass",
    image: "/images/course-photoshop.png",
    icon: PenTool,
    checklist: [
      "Install Creative Cloud, then install Photoshop from the Apps tab.",
      "Sign in and confirm Photoshop opens without trial, payment, or license warnings.",
      "Set scratch disk space and keep at least 20 GB free for class files.",
      "Create folders for PSD working files, exports, fonts, and source images.",
    ],
    firstProject: "Open a new 1080 x 1080 px document and export a PNG test file.",
  },
  {
    name: "Adobe Illustrator",
    role: "Vector logos, icons, branding, print artwork, and illustrations",
    course: "Illustrator Training",
    image: "/images/course-illustrator.png",
    icon: PenTool,
    checklist: [
      "Install Illustrator through Creative Cloud and launch it once before class.",
      "Enable common panels: Properties, Layers, Pathfinder, Align, and Swatches.",
      "Save a workspace named SCDS Vector so your panels are easy to restore.",
      "Create a test A4 CMYK document and a web RGB artboard for comparison.",
    ],
    firstProject: "Draw three simple vector shapes and export SVG plus PDF copies.",
  },
  {
    name: "CapCut",
    role: "Short-form video editing, captions, templates, audio, and effects",
    course: "CapCut Masterclass",
    image: "/images/course-capcut.png",
    icon: PlayCircle,
    checklist: [
      "Install CapCut desktop or mobile, depending on the device you will use in class.",
      "Sign in so projects, templates, captions, and cloud assets remain available.",
      "Confirm your device has enough free storage for video cache and exports.",
      "Create folders for raw clips, music, exports, thumbnails, and project backups.",
    ],
    firstProject: "Import a 10 second clip, trim it, add captions, and export 1080p vertical video.",
  },
  {
    name: "Visual Studio Code",
    role: "Web development, React projects, extensions, Git, and deployment work",
    course: "Vibe Coding",
    image: "/images/course-vibe-coding-web-dev.png",
    icon: Code2,
    checklist: [
      "Install VS Code and add the recommended extensions for ESLint and Prettier.",
      "Install Node.js LTS and confirm npm runs from the integrated terminal.",
      "Connect Git so you can commit class projects and portfolio code safely.",
      "Create a projects folder with separate directories for practice and final work.",
    ],
    firstProject: "Create an HTML file, open it in the browser, then make your first Git commit.",
  },
  {
    name: "Figma",
    role: "UI design, wireframes, prototypes, design systems, and handoff",
    course: "UI/UX Masterclass",
    image: "/images/course-vibe-designing-uiux.png",
    icon: Monitor,
    checklist: [
      "Create a Figma account and install the desktop app if your computer supports it.",
      "Set up a class workspace with pages for research, wireframes, UI, and prototype.",
      "Install helpful community resources only after checking they match the brief.",
      "Practice sharing a file link with view access so mentors can review your work.",
    ],
    firstProject: "Design one mobile login screen and connect a second screen in prototype mode.",
  },
  {
    name: "SolidWorks",
    role: "3D CAD, part modelling, assemblies, drawings, simulation, and renders",
    course: "SolidWorks for Engineers",
    image: "/images/course-solidworks.png",
    icon: Box,
    checklist: [
      "Install the correct SolidWorks version from your school, employer, or licensed source.",
      "Confirm your graphics driver, storage, and RAM meet the class project requirements.",
      "Set units to MMGS unless your assignment brief asks for another standard.",
      "Create folders for parts, assemblies, drawings, renders, and reference dimensions.",
    ],
    firstProject: "Model a fully defined rectangular bracket and export a PDF drawing sheet.",
  },
];

const universalSteps = [
  {
    title: "Check your device",
    text: "Confirm operating system, storage, RAM, and internet access before downloading large installers.",
  },
  {
    title: "Install from trusted sources",
    text: "Use official stores, licensed school access, or vendor portals so updates and sign-in work correctly.",
  },
  {
    title: "Create project folders",
    text: "Keep source files, exports, assets, references, and backups separate from the first day.",
  },
  {
    title: "Run a test export",
    text: "Before class starts, open the tool, create a small file, export it, and save it in the right folder.",
  },
];

const readinessChecks = [
  "You can open the software without account or license blockers.",
  "You know where class files and exports will be saved.",
  "Your first test file opens again after closing the app.",
  "You can share or upload the exported file for review.",
  "Your device has enough battery, storage, and internet for lessons.",
  "You have a backup plan for large projects and final submissions.",
];

export default function ToolSetupGuidesPage() {
  return (
    <div className="bg-white pt-28">
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-white" aria-hidden="true" />
        <div className="container relative mx-auto grid min-h-[590px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary-light">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Tool Setup Guides
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Get every class tool installed, organized, and ready before lesson one.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Use these setup checklists for Photoshop, Illustrator, CapCut, VS Code, Figma, and SolidWorks so class time goes into making work, not hunting for missing panels or broken exports.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#guides"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                View Setup Guides
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <FolderOpen className="h-4 w-4" aria-hidden="true" />
                Match a Course
              </Link>
            </div>
          </div>

          <div className="relative pb-14 lg:pb-0">
            <div className="grid grid-cols-2 gap-4">
              {setupGuides.slice(0, 4).map((guide, index) => {
                const Icon = guide.icon;

                return (
                  <article
                    key={guide.name}
                    className={`overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 ${index % 2 === 1 ? "translate-y-8" : ""}`}
                  >
                    <img src={guide.image} alt="" className="h-36 w-full object-cover" />
                    <div className="p-4">
                      <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
                      <h2 className="text-base font-extrabold leading-snug text-dark">{guide.name}</h2>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        <section className="-mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
          {universalSteps.map((step, index) => (
            <div key={step.title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-lg shadow-slate-900/5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                {index + 1}
              </span>
              <h2 className="mt-4 text-lg font-extrabold text-dark">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{step.text}</p>
            </div>
          ))}
        </section>

        <section id="guides" className="py-20">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-primary">Software Setup</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-dark md:text-4xl">
                Six practical setup guides for the tools used across SCDS courses.
              </h2>
            </div>
            <Link href="/resources" className="font-extrabold text-primary transition hover:text-primary-dark">
              Back to student resources
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {setupGuides.map((guide) => {
              const Icon = guide.icon;

              return (
                <article key={guide.name} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr]">
                    <div className="relative min-h-64 bg-dark">
                      <img src={guide.image} alt={guide.name} className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Icon className="mb-3 h-7 w-7 text-primary-light" aria-hidden="true" />
                        <p className="text-xs font-black uppercase tracking-widest text-white/75">{guide.course}</p>
                        <h3 className="mt-1 text-2xl font-extrabold text-white">{guide.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm font-semibold leading-6 text-gray-600">{guide.role}</p>
                      <div className="mt-6 space-y-3">
                        {guide.checklist.map((item) => (
                          <div key={item} className="flex gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                            <p className="text-sm font-semibold leading-6 text-gray-700">{item}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-6 rounded-xl bg-[#eff6ff] p-4 text-sm font-semibold leading-6 text-[#1e3a8a]">
                        First test: {guide.firstProject}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 rounded-3xl bg-[#f8fafc] p-6 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
              <Settings className="h-4 w-4" aria-hidden="true" />
              Ready for Class
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-dark">
              Finish this checklist before the first live or recorded lesson.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              Setup is complete when you can open the app, create a test file, export it, and find it again without help.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/lms" className="rounded-xl bg-dark px-6 py-4 text-center text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-primary">
                Continue in LMS
              </Link>
              <Link href="/contact" className="rounded-xl border border-gray-300 px-6 py-4 text-center text-sm font-extrabold text-dark transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                Ask for Help
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

        <section className="mt-20 rounded-3xl bg-dark p-6 text-white md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary-light">
                <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                File Hygiene
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight">
                Good setup also means clean files.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["Working files", "Final exports", "Reference assets"].map((item) => (
                <div key={item} className="rounded-xl bg-white/8 p-5">
                  <FolderOpen className="mb-4 h-6 w-6 text-primary-light" aria-hidden="true" />
                  <h3 className="font-extrabold">{item}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">Keep this folder named clearly for each class project.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
