import Link from "next/link";
import { getManagedAbout } from "@/lib/contentSettings";

export default async function About() {
  const about = await getManagedAbout();

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase mb-4 block">{about.eyebrow}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-8">{about.title}</h1>
            {about.storyParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg text-gray-600 mb-6 last:mb-8">
                {paragraph}
              </p>
            ))}
            <div className="p-8 bg-dark text-white rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-primary mb-2">Our Mission</h3>
              <p className="text-2xl font-bold italic leading-relaxed">&ldquo;{about.mission}&rdquo;</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-light-gray rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src={about.instructorImage}
                alt={about.instructorName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <span className="text-5xl font-bold block mb-1">{about.yearsExperience}</span>
              <span className="text-sm font-medium uppercase tracking-wider">Years of Excellence</span>
            </div>
          </div>
        </div>

        <div className="mb-24 rounded-3xl border border-primary/10 bg-white p-8 shadow-sm md:p-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-primary font-bold tracking-widest uppercase mb-3 block">Our Vision</span>
            <p className="text-2xl md:text-3xl font-extrabold text-dark leading-snug">{about.vision}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {about.coreValues.map((value) => (
              <div key={value.title} className="rounded-2xl bg-light-gray p-6">
                <h3 className="mb-2 text-lg font-bold text-dark">{value.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-light-gray rounded-3xl p-12 md:p-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Meet Your Instructor</h2>
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden shadow-lg border-4 border-primary bg-white">
              <img
                src={about.instructorImage}
                alt={about.instructorName}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">{about.instructorName}</h3>
            <p className="text-primary font-bold mb-6 uppercase tracking-widest">{about.instructorRole}</p>
            <p className="text-gray-600 text-lg leading-relaxed">{about.instructorBio}</p>
          </div>
        </div>

        {/* Board of Management CTA */}
        <div className="mt-24 bg-dark text-white rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,143,227,0.1),transparent)] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">{about.boardCtaTitle}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{about.boardCtaText}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:scale-105"
            >
              Reach Out to Us
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
