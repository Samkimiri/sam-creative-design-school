import Link from "next/link";
import { courses } from "@/data/courses";
import GamifiedRegistration from "@/components/GamifiedRegistration";
import ReviewsSection from "@/components/ReviewsSection";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const intake = await getUpcomingIntakeSettings();
  const stats = [
    { value: "500+", label: "Students Trained" },
    { value: "4", label: "Professional Courses" },
    { value: "5+", label: "Years of Excellence" },
    { value: "95%", label: "Completion Rate" },
  ];
  const intakeDetails = [
    { label: "Next Intake", value: intake.nextIntake },
    { label: "Learning Mode", value: intake.learningMode },
    { label: "Class Duration", value: intake.classDuration },
    { label: "Available Seats", value: intake.availableSeats },
  ];
  const learningBundle = [
    { value: "4", label: "Skill tracks", detail: "Photoshop, Illustrator, CapCut, and SolidWorks" },
    { value: "30+", label: "Guided lessons", detail: "Step-by-step videos, notes, quizzes, and assignments" },
    { value: "12+", label: "Portfolio projects", detail: "Posters, brand assets, reels, CAD parts, and presentations" },
    { value: "∞", label: "LMS access", detail: "Rewatch lessons and keep improving after class" },
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-primary/20 z-10" />
          <div
            className="w-full h-full bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/images/hero.png')" }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full opacity-60 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center md:text-left flex flex-col items-center md:items-start py-32">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Kenya&apos;s #1 Creative Design School
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight animate-fade-in">
            Master Creative &<br />
            <span className="text-primary">Engineering Skills</span><br />
            That Pay
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Learn Photoshop, Illustrator, CapCut & SolidWorks with practical, industry-level training. Join 500+ students who&apos;ve already transformed their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link href="#start" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 hover:scale-105">
              To START the Journey Click here
            </Link>
            <Link href="/courses" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              View Courses →
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {["✓ Certificate Included", "✓ WhatsApp Mentorship", "✓ Beginner Friendly", "✓ Pay via MPESA"].map((badge, i) => (
              <span key={i} className="text-white/70 text-sm font-medium">{badge}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-gray-100 animate-fade-in">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center transition-transform duration-300 motion-safe:hover:-translate-y-1">
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-1 transition-colors duration-300">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
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
                  className="inline-flex justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Enroll and Start Practicing
                </Link>
                <Link
                  href="/lms"
                  className="inline-flex justify-center rounded-xl border border-gray-200 px-7 py-3.5 text-sm font-bold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
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
      <section className="bg-light-gray py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="animate-fade-in">
              <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-primary">
                Upcoming Intake
              </span>
              <h2 className="mb-4 text-3xl font-extrabold text-dark md:text-4xl">
                {intake.title}
              </h2>
              <p className="max-w-xl text-base leading-7 text-gray-600">
                {intake.subtitle}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/enroll"
                  className="inline-flex justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Reserve Your Seat
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex justify-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-bold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  Compare Courses
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {intakeDetails.map((item, index) => (
                <div
                  key={item.label}
                  className="animate-fade-in rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <p className="mb-2 text-xs font-black uppercase tracking-widest text-gray-400">
                    {item.label}
                  </p>
                  <p className="text-xl font-extrabold leading-snug text-dark">
                    {item.value}
                  </p>
                </div>
              ))}
              <div className="animate-fade-in rounded-2xl border border-primary/20 bg-primary/10 p-6 sm:col-span-2">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary">
                      Weekly Schedule
                    </p>
                    <p className="mt-2 text-lg font-extrabold text-dark">
                      {intake.weeklySchedule}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm">
                    {intake.badge}
                  </span>
                </div>
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
                className="mt-7 inline-flex rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
              >
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
              { title: "Practical Training", desc: "Learn by building real projects — posters, logos, videos, and 3D parts — not just theory.", icon: "🛠️" },
              { title: "Portfolio Projects", desc: "Every course produces portfolio-ready work you can show clients from day one.", icon: "📂" },
              { title: "Affordable Fees", desc: "Courses start at just Ksh 1,000. Premium education shouldn't cost a fortune.", icon: "💰" },
              { title: "Personal Mentorship", desc: "Get direct feedback from Samuel Kimiri via WhatsApp throughout your training.", icon: "🤝" },
              { title: "LMS Access", desc: "Learn anytime on our online portal. Rewatch lessons, take quizzes, track your progress.", icon: "💻" },
              { title: "Certificates", desc: "Earn a verified certificate on completion — add it to your CV and LinkedIn.", icon: "🏆" },
              { title: "Small Batches", desc: "We keep classes small to ensure every student gets individual attention.", icon: "👥" },
              { title: "Career Support", desc: "Tips on freelancing, job applications, and building your client base after graduation.", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} className="p-7 rounded-2xl bg-light-gray card-hover group transition-all duration-300">
                <div className="text-4xl mb-4 transition-transform duration-300 motion-safe:group-hover:scale-110">{item.icon}</div>
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
                Samuel Kimiri guides students through Photoshop, Illustrator, CapCut, and SolidWorks using real projects, clear weekly targets, and personal feedback. The focus is simple: help every learner build practical work they can show, improve, and confidently use.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { value: "5+", label: "Years mentoring creatives" },
                  { value: "500+", label: "Students trained" },
                  { value: "4", label: "Professional programs" },
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
                  className="inline-flex justify-center rounded-xl bg-dark px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
                >
                  View Instructor Profile
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center rounded-xl border border-gray-200 px-7 py-3.5 text-sm font-bold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
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
            <Link href="/courses" className="text-primary font-bold hover:underline whitespace-nowrap">
              View All Courses →
            </Link>
          </div>

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
                    <Link href={`/enroll?course=${course.id}`} className="text-xs font-bold bg-white text-dark px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 motion-safe:hover:-translate-y-0.5">
                      Enroll
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
              { emoji: "🎨", color: "from-blue-400 to-indigo-600", label: "Brand Poster — Photoshop" },
              { emoji: "✏️", color: "from-sky-400 to-cyan-500", label: "Logo Pack — Illustrator" },
              { emoji: "🎬", color: "from-pink-500 to-rose-600", label: "Product Reel — CapCut" },
              { emoji: "⚙️", color: "from-gray-500 to-gray-700", label: "CAD Assembly — SolidWorks" },
              { emoji: "📱", color: "from-purple-400 to-pink-500", label: "Social Media Kit — Photoshop" },
              { emoji: "🎯", color: "from-teal-400 to-cyan-500", label: "Icon Set — Illustrator" },
            ].map((item, i) => (
              <div key={i} className={`bg-gradient-to-br ${item.color} rounded-2xl aspect-square flex flex-col items-center justify-center text-white group hover:scale-[1.02] transition-all duration-300 cursor-pointer motion-safe:hover:-translate-y-1`}>
                <span className="text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                <span className="text-xs font-bold text-white/80 text-center px-3">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/gallery" className="inline-block bg-dark text-white px-10 py-4 rounded-full font-bold hover:bg-primary transition-all duration-300 shadow-lg motion-safe:hover:-translate-y-1">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      <ReviewsSection mode="preview" />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30 animate-fade-in">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full -ml-30 -mb-30" />
            <div className="relative z-10">
              <span className="text-white/70 text-sm font-bold uppercase tracking-widest block mb-4">Your Journey Starts Here</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Start Your Creative Journey Today</h2>
              <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
                Don&apos;t wait to build the skills that will shape your future. Join hundreds of students mastering design and engineering with Samuel Kimiri.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/enroll" className="inline-block bg-dark text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-xl">
                  Enroll Now
                </Link>
                <Link href="/faq" className="inline-block bg-white/20 border border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/30 transition-all duration-300 motion-safe:hover:-translate-y-1">
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
