import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Gift,
  Layers,
  Trophy,
  UploadCloud,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Weekly Design Challenge | Sam Creative Design School",
  description:
    "Join weekly design challenges at Sam Creative Design School, submit portfolio-ready work, win rewards, and practice across branding, social media, UI, video, and CAD categories.",
};

const weeklyChallenges = [
  {
    week: "Week 01",
    title: "Local Brand Refresh",
    category: "Brand Identity",
    brief: "Redesign a small business logo and create a simple one-page brand preview.",
    deliverables: ["Logo lockup", "Color palette", "Business card mockup"],
    image: "/images/course-illustrator.png",
  },
  {
    week: "Week 02",
    title: "Launch Poster Sprint",
    category: "Poster Design",
    brief: "Design a bold campaign poster for a weekend offer, class event, or product launch.",
    deliverables: ["A3 poster", "Instagram square", "WhatsApp status"],
    image: "/images/course-photoshop.png",
  },
  {
    week: "Week 03",
    title: "Mobile Booking Flow",
    category: "UI/UX",
    brief: "Create three mobile screens that make booking a service faster and easier.",
    deliverables: ["Wireframe", "High-fidelity screens", "Prototype link"],
    image: "/images/course-vibe-designing-uiux.png",
  },
  {
    week: "Week 04",
    title: "Product Reel Edit",
    category: "Video Editing",
    brief: "Edit a 20 second product reel with captions, pacing, and a clear call to action.",
    deliverables: ["Vertical video", "Thumbnail frame", "Caption set"],
    image: "/images/course-capcut.png",
  },
];

const categories = [
  { name: "Branding", text: "Logo systems, identity boards, packaging, and client-ready mockups." },
  { name: "Social Media", text: "Post sets, posters, ads, thumbnails, and campaign visuals." },
  { name: "UI/UX", text: "Wireframes, app screens, landing pages, flows, and prototypes." },
  { name: "Video", text: "Reels, intros, captions, edits, thumbnails, and motion layouts." },
  { name: "CAD", text: "Part models, assemblies, drawings, renders, and product concepts." },
  { name: "AI Assisted", text: "Prompt workflows, concept boards, image direction, and review systems." },
];

const submissionSteps = [
  {
    title: "Read the brief",
    text: "Check the target audience, format, deadline, and judging criteria before opening your design tool.",
  },
  {
    title: "Create and export",
    text: "Prepare final files in the requested sizes and keep your editable working file organized.",
  },
  {
    title: "Submit your proof",
    text: "Upload final exports, process screenshots, and a short note explaining your design choices.",
  },
  {
    title: "Review and improve",
    text: "Use mentor feedback to refine the work before adding it to your portfolio or gallery submission.",
  },
];

const rewards = [
  "Featured placement in the student gallery",
  "Certificate badge for monthly winners",
  "Mentor feedback on portfolio presentation",
  "Priority showcase in school social posts",
  "Discount vouchers for selected advanced classes",
  "Winner interview for the community blog",
];

export default function DesignChallengePage() {
  return (
    <div className="bg-white pt-28">
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-white" aria-hidden="true" />
        <div className="container relative mx-auto grid min-h-[600px] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-primary-light">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              Weekly Design Challenge
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Practice like a pro, submit real work, and grow your portfolio every week.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              SCDS challenges give students focused briefs, clear submission rules, public recognition, and practical feedback across design, video, coding, and CAD workflows.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#weekly-briefs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                View Weekly Briefs
              </Link>
              <Link
                href="/gallery#submit-project"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <UploadCloud className="h-4 w-4" aria-hidden="true" />
                Submit Work
              </Link>
            </div>
          </div>

          <div className="relative pb-14 lg:pb-0">
            <div className="grid grid-cols-2 gap-4">
              {weeklyChallenges.map((challenge, index) => (
                <article
                  key={challenge.title}
                  className={`overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 ${index % 2 === 1 ? "translate-y-8" : ""}`}
                >
                  <img src={challenge.image} alt="" className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-primary">{challenge.week}</p>
                    <h2 className="mt-1 text-base font-extrabold leading-snug text-dark">{challenge.title}</h2>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 pb-24">
        <section className="-mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { value: "4", label: "new briefs every month" },
            { value: "6", label: "creative categories" },
            { value: "48h", label: "mentor review window" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg shadow-slate-900/5">
              <p className="text-4xl font-extrabold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
            </div>
          ))}
        </section>

        <section id="weekly-briefs" className="py-20">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-primary">Current Challenge Calendar</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-dark md:text-4xl">
                Weekly briefs built for portfolio practice, not busywork.
              </h2>
            </div>
            <Link href="/portfolio-builder" className="font-extrabold text-primary transition hover:text-primary-dark">
              Package work for your portfolio
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {weeklyChallenges.map((challenge) => (
              <article key={challenge.title} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-[0.82fr_1.18fr]">
                  <div className="relative min-h-64 bg-dark">
                    <img src={challenge.image} alt={challenge.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-black uppercase tracking-widest text-white/75">{challenge.week}</p>
                      <h3 className="mt-1 text-2xl font-extrabold text-white">{challenge.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-black uppercase tracking-widest text-primary">{challenge.category}</p>
                    <p className="mt-3 text-base font-semibold leading-7 text-gray-700">{challenge.brief}</p>
                    <div className="mt-6">
                      <p className="mb-3 text-sm font-bold text-dark">Submission deliverables</p>
                      <div className="flex flex-wrap gap-2">
                        {challenge.deliverables.map((item) => (
                          <span key={item} className="rounded-full bg-light-gray px-3 py-2 text-xs font-extrabold text-dark">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-6 rounded-xl bg-[#eff6ff] p-4 text-sm font-semibold leading-6 text-[#1e3a8a]">
                      Deadline: submit by Sunday 8:00 PM with final exports and one process screenshot.
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-10 rounded-3xl bg-[#f8fafc] p-6 md:p-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-primary">Submission Flow</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-dark">
              A clean process keeps every challenge fair and useful.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              Each submission is reviewed for clarity, execution, file organization, and whether the final result answers the brief.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/gallery#submit-project" className="rounded-xl bg-dark px-6 py-4 text-center text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-primary">
                Submit to Gallery
              </Link>
              <Link href="/courses" className="rounded-xl border border-gray-300 px-6 py-4 text-center text-sm font-extrabold text-dark transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                Improve Your Skills
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {submissionSteps.map((step, index) => (
              <div key={step.title} className="rounded-xl bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-primary">Challenge Categories</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-dark">
              Choose a lane, or stretch into something new.
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600">
              Categories rotate so beginners, designers, editors, developers, and engineering students all get practical prompts.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <div key={category.name} className="flex gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <Layers className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-extrabold text-dark">{category.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{category.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-dark p-6 text-white md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary-light">
                <Gift className="h-4 w-4" aria-hidden="true" />
                Rewards
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight">
                Winners earn visibility, feedback, and proof they can finish.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {rewards.map((reward) => (
                <div key={reward} className="flex gap-3 rounded-xl bg-white/8 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-white/80">{reward}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/12 bg-white/8 p-4 text-sm font-semibold leading-6 text-white/75">
            <BadgeCheck className="h-5 w-5 shrink-0 text-primary-light" aria-hidden="true" />
            Winners are selected monthly from completed weekly entries, with special recognition for consistency and improvement.
          </div>
        </section>
      </main>
    </div>
  );
}
