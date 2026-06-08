import Link from "next/link";
import GamifiedRegistration from "@/components/GamifiedRegistration";
import ReviewsSection from "@/components/ReviewsSection";
import FeaturedCoursesCarousel from "@/components/FeaturedCoursesCarousel";
import IntakeCountdown from "@/components/IntakeCountdown";
import { getContentSettings, getManagedCourses } from "@/lib/contentSettings";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Clock,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  HelpCircle,
  Image as ImageIcon,
  MessageCircle,
  PlayCircle,
  UsersRound,
  UserRound,
} from "lucide-react";

export const dynamic = "force-dynamic";

function renderHeroTitle(title: string) {
  const normalizedTitle = title.trim().toLowerCase();

  if (normalizedTitle === "master creative & tech skills that pay") {
    return (
      <>
        <span className="text-white">Master Creative &amp; Tech</span>{" "}
        <span className="text-primary-light">Skills That Pay</span>
      </>
    );
  }

  return title;
}

export default async function Home() {
  const [intake, content, courses] = await Promise.all([
    getUpcomingIntakeSettings(),
    getContentSettings(),
    getManagedCourses(),
  ]);
  const stats = [
    { value: "500+", label: "Students Trained" },
    { value: "7", label: "Professional Courses" },
    { value: "5+", label: "Years of Excellence" },
    { value: "95%", label: "Completion Rate" },
  ];
  const trustBadges = [
    { label: "Certificate Included", Icon: BadgeCheck },
    { label: "WhatsApp Mentorship", Icon: MessageCircle },
    { label: "Beginner Friendly", Icon: GraduationCap },
    { label: "Pay via MPESA", Icon: CreditCard },
  ];
  const intakeDetails = [
    { label: intake.nextIntakeLabel, value: intake.nextIntake, Icon: CalendarDays },
    { label: intake.learningModeLabel, value: intake.learningMode, Icon: MessageCircle },
    { label: intake.classDurationLabel, value: intake.classDuration, Icon: Clock },
    { label: intake.availableSeatsLabel, value: intake.availableSeats, Icon: UsersRound },
  ];
  const learningBundle = [
    { value: "7", label: "Skill tracks", detail: "Design, coding, AI, video, and CAD" },
    { value: "30+", label: "Guided lessons", detail: "Step-by-step videos, notes, quizzes, and assignments" },
    { value: "12+", label: "Portfolio projects", detail: "Posters, brand assets, reels, CAD parts, and presentations" },
    { value: "24/7", label: "LMS access", detail: "Rewatch lessons and keep improving after class" },
  ];
  const toolStacks = [
    {
      title: "Design Software",
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Mockup tools"],
      note: "Build posters, social media kits, logos, print files, and brand presentations.",
    },
    {
      title: "Video Workflow",
      tools: ["CapCut", "Audio cleanup", "Reels formats", "Export presets"],
      note: "Plan, cut, caption, and export short-form videos for TikTok, Reels, Shorts, and business pages.",
    },
    {
      title: "Engineering Setup",
      tools: ["SolidWorks", "Technical drawings", "Assemblies", "Rendering"],
      note: "Model real parts, prepare drawings, and present mechanical ideas clearly.",
    },
  ];
  const outcomeTiers = [
    { tier: "Starter", range: "Practice work", note: "Build confidence with class assignments and instructor feedback." },
    { tier: "Portfolio", range: "Client-ready samples", note: "Package your best designs, videos, or CAD models for sharing." },
    { tier: "Freelance", range: "Small paid jobs", note: "Use posters, logos, reels, edits, and drawings to approach first clients." },
    { tier: "Professional", range: "Job and business growth", note: "Keep improving your workflow, speed, communication, and delivery." },
  ];

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-dark pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-[linear-gradient(105deg,rgba(5,9,20,0.92)_0%,rgba(5,9,20,0.72)_45%,rgba(10,15,30,0.26)_100%)]" />
          <div
            className="h-full w-full bg-cover bg-center opacity-70"
            style={{ backgroundImage: "url('/images/hero.png')" }}
          />
        </div>

        <div className="container relative z-20 mx-auto flex flex-col items-center px-6 py-20 text-center md:items-start md:text-left lg:py-28">
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-2xl shadow-black/20 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {content.homepage.eyebrow}
          </div>

          <h1 className="animate-fade-in mb-6 max-w-5xl text-5xl font-extrabold leading-[0.95] text-white md:text-7xl">
            {renderHeroTitle(content.homepage.title)}
          </h1>
          <p className="animate-fade-in mb-10 max-w-2xl text-lg leading-8 text-white/80 md:text-xl" style={{ animationDelay: "0.2s" }}>
            {content.homepage.subtitle}
          </p>
          <div className="animate-fade-in flex w-full flex-col gap-4 sm:w-auto sm:flex-row" style={{ animationDelay: "0.4s" }}>
            <Link href="#start" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-extrabold text-white shadow-2xl shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:px-10">
              {content.homepage.primaryCta}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/courses" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-extrabold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/20 sm:px-10">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              {content.homepage.secondaryCta}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-in mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4" style={{ animationDelay: "0.6s" }}>
            {trustBadges.map(({ label, Icon }) => (
              <span key={label} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center text-xs font-bold text-white/80 backdrop-blur-md">
                <Icon className="h-4 w-4 text-primary-light" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="animate-fade-in border-b border-gray-100 bg-white py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-transform duration-300 motion-safe:hover:-translate-y-1">
                <div className="mb-1 text-4xl font-extrabold text-primary transition-colors duration-300 md:text-5xl">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="animate-fade-in">
              <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-primary">
                What You Get
              </span>
              <h2 className="mb-5 text-3xl font-extrabold text-dark md:text-4xl">
                Lessons, practice files, feedback, and a portfolio path in one place.
              </h2>
              <p className="max-w-2xl text-base leading-7 text-gray-600">
                The training is built around doing the work: watch the lesson, complete a practical task, submit your assignment, and improve it with guidance. By the end, you have visible work to show, not just notes.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/enroll"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Enroll and Start Practicing
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/lms"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-7 py-3.5 text-sm font-bold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Preview LMS
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {learningBundle.map((item, index) => (
                <div
                  key={item.label}
                  className="animate-fade-in rounded-2xl border border-gray-100 bg-light-gray p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-md"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <p className="text-4xl font-extrabold tracking-tight text-primary">
                    {item.value}
                  </p>
                  <h3 className="mt-3 text-lg font-extrabold text-dark">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light-gray py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl animate-fade-in">
            <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-primary">
              Tool Stack
            </span>
            <h2 className="text-3xl font-extrabold text-dark md:text-4xl">
              Learn the tools students actually use after class.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Each program connects software skills to real creative or engineering work, so your practice time feels close to what clients, employers, and school projects expect.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {toolStacks.map((stack, index) => (
              <div
                key={stack.title}
                className="animate-fade-in rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="mb-3 text-xs font-black uppercase tracking-widest text-primary">
                  Category {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-xl font-extrabold text-dark">{stack.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{stack.note}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {stack.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-bold text-primary"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Intake */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <div className="animate-fade-in rounded-2xl bg-dark p-7 text-white shadow-xl shadow-dark/10 md:p-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-primary-light">
                  Upcoming Intake
                </span>
              </div>
              <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">
                {intake.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75">
                {intake.subtitle}
              </p>
              <div className="mt-8 grid gap-3 border-y border-white/10 py-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40">{intake.nextIntakeLabel}</p>
                  <p className="mt-2 text-lg font-extrabold text-white">{intake.nextIntake}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40">{intake.availableSeatsLabel}</p>
                  <p className="mt-2 text-lg font-extrabold text-primary-light">{intake.availableSeats}</p>
                </div>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/enroll"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Reserve Your Seat
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light hover:bg-white/15"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Compare Courses
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <IntakeCountdown targetDate={intake.nextIntake} title={intake.countdownTitle} />
              </div>
              {intakeDetails.map(({ Icon, ...item }, index) => (
                <div
                  key={item.label}
                  className="animate-fade-in rounded-2xl border border-gray-100 bg-light-gray p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-md"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                  <p className="mt-2 text-xl font-extrabold leading-snug text-dark">{item.value}</p>
                </div>
              ))}
              <div className="animate-fade-in overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 sm:col-span-2">
                <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                      <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">
                      {intake.weeklyScheduleLabel}
                    </p>
                    <p className="mt-2 text-lg font-extrabold leading-7 text-dark">
                      {intake.weeklySchedule}
                    </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
                    {intake.badge}
                  </span>
                </div>
                <div className="h-1.5 bg-primary" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GamifiedRegistration />

      <section className="bg-dark py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="animate-fade-in">
              <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-primary">
                Career Reality
              </span>
              <h2 className="mb-5 text-3xl font-extrabold md:text-4xl">
                Skill pays when you practice, improve, and show your work.
              </h2>
              <p className="max-w-xl text-base leading-7 text-gray-300">
                We do not promise instant riches. We help you build the practical work, workflow discipline, and confidence needed to start small and grow steadily.
              </p>
              <Link
                href="/student-works"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <ImageIcon className="h-4 w-4" aria-hidden="true" />
                View Student Work
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {outcomeTiers.map((item, index) => (
                <div
                  key={item.tier}
                  className="animate-fade-in rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/10"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <p className="text-xs font-black uppercase tracking-widest text-primary">
                    Step {String(index + 1).padStart(2, "0")} - {item.tier}
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold">{item.range}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Why Choose Sam Creative Design School?</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Practical Training", desc: "Learn by building real projects: posters, logos, videos, and 3D parts, not just theory." },
              { title: "Portfolio Projects", desc: "Every course produces portfolio-ready work you can show clients from day one." },
              { title: "Affordable Fees", desc: "Courses start at just Ksh 1,000. Premium education shouldn't cost a fortune." },
              { title: "Personal Mentorship", desc: "Get direct feedback from Samuel Kimiri via WhatsApp throughout your training." },
              { title: "LMS Access", desc: "Learn anytime on our online portal. Rewatch lessons, take quizzes, track your progress." },
              { title: "Certificates", desc: "Earn a verified certificate on completion and add it to your CV and LinkedIn." },
              { title: "Small Batches", desc: "We keep classes small to ensure every student gets individual attention." },
              { title: "Career Support", desc: "Tips on freelancing, job applications, and building your client base after graduation." },
            ].map((item, i) => (
              <div key={i} className="group rounded-2xl border border-gray-100 bg-light-gray p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white hover:shadow-md">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-primary shadow-sm transition-transform duration-300 motion-safe:group-hover:scale-105">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Preview */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="animate-fade-in">
              <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-3xl bg-light-gray shadow-2xl lg:mx-0">
                <img
                  src="/images/samuel.png"
                  alt="Samuel Kimiri, instructor at Sam Creative Design School"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary-light">
                    Lead Instructor
                  </p>
                  <h3 className="mt-1 text-2xl font-extrabold">Samuel Kimiri</h3>
                </div>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-primary">
                Meet Your Trainer
              </span>
              <h2 className="mb-5 text-3xl font-extrabold text-dark md:text-4xl">
                Learn Directly From a Practical Design Coach
              </h2>
              <p className="max-w-2xl text-base leading-7 text-gray-600">
                Samuel Kimiri guides students through creative and technical courses using real projects, clear weekly targets, and personal feedback. The focus is simple: help every learner build practical work they can show, improve, and confidently use.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "5+", label: "Years mentoring creatives" },
                  { value: "500+", label: "Students trained" },
                  { value: "7", label: "Professional programs" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-gray-100 bg-light-gray p-5">
                    <p className="text-3xl font-extrabold text-primary">{item.value}</p>
                    <p className="mt-1 text-sm font-medium text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border-l-4 border-primary bg-primary/5 p-6">
                <p className="text-sm font-black uppercase tracking-widest text-primary">
                  Teaching Promise
                </p>
                <p className="mt-2 text-lg font-bold leading-7 text-dark">
                  Every student gets structured lessons, assignment guidance, and honest feedback before certification.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-dark px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
                >
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                  View Instructor Profile
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-7 py-3.5 text-sm font-bold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses Preview ───────────────────────────────── */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-in">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Our Programs</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">Popular Courses</h2>
              <p className="text-gray-400 mt-2">Join 500+ students already mastering these skills.</p>
            </div>
            <Link href="/courses" className="inline-flex items-center gap-2 text-primary font-bold hover:underline whitespace-nowrap">
              View All Courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <FeaturedCoursesCarousel courses={courses} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 card-hover transition-all duration-300">
                <div className="h-48 relative overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-40`} />
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-primary font-bold uppercase tracking-wider">{course.duration}</span>
                    <span className="text-xs text-gray-500">{course.level}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-5 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                    <span className="font-extrabold text-primary">{course.priceRange}</span>
                    <Link href={`/enroll?course=${course.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-dark px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 motion-safe:hover:-translate-y-0.5">
                      Enroll
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Student Work</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Real Projects by Real Students</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {[
              { mark: "PS", color: "from-blue-500 to-indigo-700", label: "Brand Poster - Photoshop" },
              { mark: "AI", color: "from-sky-500 to-cyan-600", label: "Logo Pack - Illustrator" },
              { mark: "CP", color: "from-rose-500 to-pink-700", label: "Product Reel - CapCut" },
              { mark: "SW", color: "from-slate-500 to-slate-800", label: "CAD Assembly - SolidWorks" },
              { mark: "SM", color: "from-violet-500 to-fuchsia-700", label: "Social Media Kit - Photoshop" },
              { mark: "IC", color: "from-teal-500 to-cyan-700", label: "Icon Set - Illustrator" },
            ].map((item, i) => (
              <div key={i} className={`bg-gradient-to-br ${item.color} rounded-2xl aspect-square flex flex-col items-center justify-center text-white group hover:scale-[1.02] transition-all duration-300 cursor-pointer motion-safe:hover:-translate-y-1`}>
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-2xl font-black tracking-tight backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">{item.mark}</span>
                <span className="text-xs font-bold text-white/80 text-center px-3">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/gallery" className="inline-flex items-center gap-2 bg-dark text-white px-10 py-4 rounded-full font-bold hover:bg-primary transition-all duration-300 shadow-lg motion-safe:hover:-translate-y-1">
              <ImageIcon className="h-4 w-4" aria-hidden="true" />
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      <ReviewsSection mode="preview" />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-center text-white shadow-2xl shadow-primary/25 md:p-16 lg:p-20">
            <div className="absolute inset-x-0 top-0 h-1 bg-white/35" />
            <div className="relative z-10">
              <span className="text-white/70 text-sm font-bold uppercase tracking-widest block mb-4">Your Journey Starts Here</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Start Your Creative Journey Today</h2>
              <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
                Don&apos;t wait to build the skills that will shape your future. Join hundreds of students mastering design and engineering with Samuel Kimiri.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/enroll" className="inline-flex items-center justify-center gap-2 bg-dark text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl">
                  Enroll Now
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link href="/faq" className="inline-flex items-center justify-center gap-2 bg-white/20 border border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/30 transition-all duration-300 motion-safe:hover:-translate-y-1">
                  <HelpCircle className="h-5 w-5" aria-hidden="true" />
                  Read FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
