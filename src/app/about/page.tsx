import Link from "next/link";

export default function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-8">
              Empowering Creatives Through <span className="text-primary">Excellence</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              SCDS (Sam Creative Design School) was founded with a single mission: to bridge the gap between academic theory and practical, industry-level creative skills.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We believe that everyone has a creative spark, and with the right tools, mentorship, and practical projects, that spark can be turned into a professional career that pays.
            </p>
            <div className="p-8 bg-dark text-white rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-primary mb-2">Our Mission</h3>
              <p className="text-2xl font-bold italic leading-relaxed">
                “Being Exceptional, Strategic, and Realistic”
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-light-gray rounded-3xl overflow-hidden shadow-2xl relative">
              <img 
                src="/images/samuel.png" 
                alt="Samuel Kimiri" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-primary text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <span className="text-5xl font-bold block mb-1">5+</span>
              <span className="text-sm font-medium uppercase tracking-wider">Years of Excellence</span>
            </div>
          </div>
        </div>

        <div className="bg-light-gray rounded-3xl p-12 md:p-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Meet Your Instructor</h2>
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden shadow-lg border-4 border-primary bg-white">
              <img 
                src="/images/samuel.png" 
                alt="Samuel Kimiri" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">Samuel Kimiri</h3>
            <p className="text-primary font-bold mb-6 uppercase tracking-widest">Founder of SCDS | Instructor</p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Samuel is the Founder and Lead Instructor at Sam Creative Design School (SCDS). He is a multi-talented professional with a background in both Engineering and Creative Design. With years of experience in industry-level design work and technical engineering projects, he brings a unique perspective to training—focusing on precision, strategy, and real-world application.
            </p>
          </div>
        </div>

        {/* Board of Management CTA */}
        <div className="mt-24 bg-dark text-white rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,143,227,0.1),transparent)] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
              Join Our Board of Management
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We are looking for visionary leaders, industry experts, and passionate individuals to help shape the future of creative education at SCDS. If you share our mission, we would love to connect with you.
            </p>
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
