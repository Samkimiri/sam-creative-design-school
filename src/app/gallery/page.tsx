export default function GalleryPage() {
  const categories = ["All", "Photoshop", "Illustrator", "CapCut", "SolidWorks"];

  const projects = [
    { id: 1, student: "Grace Njeri", course: "Photoshop", title: "Brand Identity Poster", image: "/images/gallery-photoshop.png", emoji: "🎨", color: "from-blue-400 to-indigo-600", desc: "A premium brand poster created for a local coffee shop using advanced Photoshop techniques." },
    { id: 2, student: "Kevin Omondi", course: "Illustrator", title: "Vector Logo Pack", image: "/images/gallery-illustrator.png", emoji: "✏️", color: "from-sky-400 to-cyan-500", desc: "A complete logo system with 4 variations designed for a tech startup." },
    { id: 3, student: "Sharon Wanjiru", course: "CapCut", title: "Product Promo Reel", emoji: "🎬", color: "from-pink-500 to-rose-600", desc: "A 30-second Instagram Reel for a fashion brand with custom transitions and music sync." },
    { id: 4, student: "Brian Mutua", course: "SolidWorks", title: "Mechanical Bracket Assembly", emoji: "⚙️", color: "from-gray-500 to-gray-700", desc: "A fully constrained SolidWorks assembly with 12 parts and engineering drawings." },
    { id: 5, student: "Lydia Kamau", course: "Photoshop", title: "Social Media Content Kit", image: "/images/gallery-photoshop.png", emoji: "📱", color: "from-purple-400 to-pink-500", desc: "A 9-post Instagram grid for a beauty brand with consistent colour and typography." },
    { id: 6, student: "Daniel Otieno", course: "Illustrator", title: "Custom Icon Set", image: "/images/gallery-illustrator.png", emoji: "🎯", color: "from-teal-400 to-cyan-500", desc: "40 custom flat-design icons for a mobile app, delivered in SVG and PNG formats." },
    { id: 7, student: "Faith Chebet", course: "CapCut", title: "YouTube Intro Animation", emoji: "▶️", color: "from-rose-400 to-pink-500", desc: "An animated logo reveal and channel intro sequence for a YouTube cooking channel." },
    { id: 8, student: "Moses Kipchoge", course: "SolidWorks", title: "Sheet Metal Enclosure", emoji: "🔩", color: "from-slate-500 to-slate-700", desc: "A sheet metal enclosure design with bend reliefs, hardware cutouts and flat pattern." },
    { id: 9, student: "Patricia Adhiambo", course: "Photoshop", title: "Event Flyer Series", image: "/images/gallery-photoshop.png", emoji: "🪄", color: "from-violet-400 to-purple-600", desc: "A series of 6 event flyers for a music festival, featuring custom photo manipulation." },
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <div className="bg-dark text-white py-16 mb-16">
        <div className="container mx-auto px-6 text-center">
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
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                cat === "All"
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-light-gray text-dark hover:bg-primary hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Thumbnail */}
              <div className={`h-52 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{project.emoji}</span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                  {project.course}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-xs text-primary font-bold mb-3">by {project.student}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 bg-light-gray rounded-3xl p-12">
          <div className="text-5xl mb-4">🌟</div>
          <h2 className="text-3xl font-extrabold mb-4">Your Work Could Be Here</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Join Sam Creative Design School and build a portfolio that gets you hired or launched into freelancing.
          </p>
          <a
            href="/enroll"
            className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            Start Learning Today
          </a>
        </div>
      </div>
    </div>
  );
}
