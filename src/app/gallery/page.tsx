import Link from "next/link";
import type { CSSProperties } from "react";
import StudentProjects from "@/components/StudentProjects";
import { galleryProjects } from "@/data/galleryProjects";

export default function GalleryPage() {
  const categories = ["All", "Photoshop", "Illustrator", "CapCut", "SolidWorks"];

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <div className="bg-dark text-white py-16 mb-16">
        <div className="container mx-auto px-6 text-center" data-reveal>
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Student Work</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our Student <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real work by real students. Every project below was created during one of our practical training courses.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat, index) => (
            <button
              key={cat}
              className={`premium-button px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 motion-safe:hover:-translate-y-0.5 ${
                cat === "All"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-light-gray text-dark hover:bg-primary hover:text-white"
              }`}
              data-reveal
              style={{ "--reveal-delay": `${index * 40}ms` } as CSSProperties}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/gallery/${project.id}`}
              className="premium-card group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden motion-safe:hover:-translate-y-1"
              data-reveal
              style={{ "--reveal-delay": `${index * 55}ms` } as CSSProperties}
            >
              {/* Thumbnail */}
              <div className={`h-52 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <span className="text-5xl font-black text-white group-hover:scale-110 transition-transform duration-300">{project.fallbackLabel}</span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 transition-transform duration-300 motion-safe:group-hover:scale-105">
                  {project.course}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-xs text-primary font-bold mb-3">by {project.student}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{project.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <StudentProjects />

        {/* CTA */}
        <div className="premium-card text-center mt-16 bg-light-gray rounded-3xl p-12 transition-shadow duration-300 hover:shadow-lg" data-reveal>
          <div className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-primary">Build with SCDS</div>
          <h2 className="text-3xl font-extrabold mb-4">Your Work Could Be Here</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Join Sam Creative Design School and build a portfolio that gets you hired or launched into freelancing.
          </p>
          <a
            href="/enroll"
            className="premium-button inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Start Learning Today
          </a>
        </div>
      </div>
    </div>
  );
}
