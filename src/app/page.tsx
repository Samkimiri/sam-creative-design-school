import Link from "next/link";
import { courses } from "@/data/courses";
import GamifiedRegistration from "@/components/GamifiedRegistration";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  const stats = [
    { value: "500+", label: "Students Trained" },
    { value: "4", label: "Professional Courses" },
    { value: "5+", label: "Years of Excellence" },
    { value: "95%", label: "Completion Rate" },
  ];

  const testimonials = [
    {
      name: "Grace Njeri", role: "Freelance Graphic Designer", stars: 5,
      text: "The Photoshop masterclass completely changed my life. Within 3 weeks of finishing I had my first paid client — a local salon that paid me Ksh 8,000 for social media designs. Samuel's teaching style is unmatched.",
      initials: "GN", color: "bg-blue-500"
    },
    {
      name: "Kevin Omondi", role: "Content Creator & Influencer", stars: 5,
      text: "CapCut training helped my Instagram grow from 800 to 12,000 followers in 2 months. I now earn from brand deals and Samuel showed me exactly how to edit videos that get views. 100% worth every shilling.",
      initials: "KO", color: "bg-pink-500"
    },
    {
      name: "Daniel Otieno", role: "Mechanical Engineer", stars: 5,
      text: "I joined SolidWorks training as a fresh engineering graduate. Six weeks later I landed a job as a CAD designer at a Nairobi manufacturing company. The practical approach made all the difference.",
      initials: "DO", color: "bg-gray-600"
    },
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
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GamifiedRegistration />

      {/* ── Why Choose Us ────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
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
              <div key={i} className="p-7 rounded-2xl bg-light-gray card-hover group">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses Preview ───────────────────────────────── */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
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
              <div key={course.id} className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 card-hover">
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
                    <Link href={`/enroll?course=${course.id}`} className="text-xs font-bold bg-white text-dark px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all">
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
          <div className="text-center mb-16">
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
              <div key={i} className={`bg-gradient-to-br ${item.color} rounded-2xl aspect-square flex flex-col items-center justify-center text-white group hover:scale-[1.02] transition-all cursor-pointer`}>
                <span className="text-5xl mb-2 group-hover:scale-110 transition-transform">{item.emoji}</span>
                <span className="text-xs font-bold text-white/80 text-center px-3">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/gallery" className="inline-block bg-dark text-white px-10 py-4 rounded-full font-bold hover:bg-primary transition-all shadow-lg">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="py-24 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Success Stories</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">What Our Students Say</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm relative">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <span key={s} className="text-primary text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm">{t.name}</h4>
                    <span className="text-xs text-gray-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full -ml-30 -mb-30" />
            <div className="relative z-10">
              <span className="text-white/70 text-sm font-bold uppercase tracking-widest block mb-4">Your Journey Starts Here</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Start Your Creative Journey Today</h2>
              <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto">
                Don&apos;t wait to build the skills that will shape your future. Join hundreds of students mastering design and engineering with Samuel Kimiri.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/enroll" className="inline-block bg-dark text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-all shadow-xl">
                  Enroll Now
                </Link>
                <Link href="/faq" className="inline-block bg-white/20 border border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/30 transition-all">
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
