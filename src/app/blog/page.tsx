import Link from "next/link";

const posts = [
  {
    id: "how-to-start-freelancing-with-photoshop",
    title: "How to Start Freelancing with Photoshop in Kenya (2025 Guide)",
    excerpt: "You've just finished your Photoshop course. Now what? This step-by-step guide shows you exactly how to land your first paying client in Kenya — from setting up your profile on Fiverr to pitching local businesses.",
    category: "Career",
    date: "April 20, 2025",
    readTime: "6 min read",
    emoji: "💼",
    color: "from-blue-400 to-indigo-600",
    content: `Starting a freelance design career in Kenya has never been more accessible. With Photoshop skills and the right strategy, you can earn your first Ksh 5,000–15,000 within your first month. Here's how:\n\n**1. Build a Portfolio First**\nBefore approaching clients, create 5–10 sample projects. Design posters for fictional brands, create social media kits, and retouch photos. Your portfolio is your most powerful sales tool.\n\n**2. Create a Fiverr Profile**\nFiverr is perfect for beginners. Create gigs for: "I will design a professional poster", "I will create social media graphics", or "I will retouch your photos professionally." Charge Ksh 1,000–2,500 per gig to start.\n\n**3. Target Local Businesses**\nMany small businesses in Kenya need quality design but can't afford agencies. Walk into salons, restaurants, and shops and offer to redesign their social media graphics for Ksh 2,000–5,000. This builds both income and a local reputation.\n\n**4. Use Instagram as Your Portfolio**\nPost your designs consistently on Instagram. Use hashtags like #KenyaDesigner, #GraphicDesignKenya, and #Nairobi. This gets you organic inquiries from local businesses.`
  },
  {
    id: "capcut-tips-for-viral-content",
    title: "10 CapCut Tricks That Will Make Your Videos Go Viral",
    excerpt: "Most people use CapCut at 10% of its potential. These 10 techniques — used by Kenya's top content creators — will transform your videos and dramatically increase your reach on TikTok and Instagram.",
    category: "Tips & Tricks",
    date: "April 10, 2025",
    readTime: "5 min read",
    emoji: "🎬",
    color: "from-pink-500 to-rose-600",
    content: `Content creation is one of the fastest growing income streams in Kenya. These CapCut techniques will set your videos apart:\n\n**1. Beat Sync Editing**\nImport your video clips, tap "Auto Captions", then use the "Beats" feature to automatically cut your clips to the beat of your music. This creates instant professional-level editing.\n\n**2. Velocity Edits**\nSelect a clip, tap "Speed" → "Curve Speed" → "Custom". Add speed points to create dramatic slow-mo and fast-forward effects that look cinematic.\n\n**3. Trending Sound + Text Combo**\nUse trending audio from TikTok's discovery page. Pair it with bold, animated text captions. This combination consistently performs well because it works with sound off (captions) AND on.\n\n**4. Smooth Cut Transition**\nEnd one clip with a hand moving toward the camera, start the next with your hand moving away. Edit the cut to be seamless. This transition gets millions of views.`
  },
  {
    id: "why-solidworks-pays-in-kenya",
    title: "Why SolidWorks is the Most Valuable Skill for Engineers in Kenya",
    excerpt: "Mechanical engineers with SolidWorks certification earn 30–60% more than those without. Here's why this CAD software is in such high demand and how you can leverage it to accelerate your engineering career.",
    category: "Engineering",
    date: "March 28, 2025",
    readTime: "7 min read",
    emoji: "⚙️",
    color: "from-gray-500 to-gray-700",
    content: `Kenya's manufacturing sector is growing, and companies are increasingly demanding engineers who can hit the ground running with modern CAD tools. SolidWorks is the most widely adopted 3D CAD software among Kenyan manufacturers.\n\n**Why Companies Choose SolidWorks Engineers**\nSolidWorks proficiency means faster product development cycles. An engineer who can design, simulate, and generate production-ready drawings — all in one software — is worth significantly more to a company than one who relies on 2D AutoCAD drawings alone.\n\n**Salary Difference**\nBased on current Kenyan job listings, mechanical engineers with SolidWorks skills earn Ksh 50,000–120,000/month compared to Ksh 30,000–60,000 for those without CAD specialization. That's a 30–60% premium.\n\n**Freelance Opportunities**\nBeyond employment, SolidWorks opens doors to freelance product design work for startups, small manufacturers, and international clients on platforms like Upwork. Rates of $15–40/hour are common for experienced SolidWorks freelancers.`
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <div className="bg-dark py-16 mb-16">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Blog & Resources</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Design <span className="text-primary">Insights</span> & Career Tips
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Practical guides, career strategies, and creative tips from Samuel Kimiri and the Sam Creative team.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl">
        {/* Featured Post */}
        <div className="mb-16">
          <div className={`bg-gradient-to-br ${posts[0].color} rounded-3xl p-10 md:p-16 text-white relative overflow-hidden mb-8`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                {posts[0].category} • {posts[0].readTime}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{posts[0].title}</h2>
              <p className="text-white/80 text-lg mb-6 max-w-2xl">{posts[0].excerpt}</p>
              <span className="text-sm text-white/60">{posts[0].date}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
            {posts[0].content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return <h3 key={i} className="text-xl font-extrabold text-dark mt-6 mb-2">{para.replace(/\*\*/g, '')}</h3>;
              }
              if (para.includes('**')) {
                const parts = para.split('**');
                return <p key={i} className="text-gray-600 leading-relaxed mb-3">{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-dark">{p}</strong> : p)}</p>;
              }
              return <p key={i} className="text-gray-600 leading-relaxed mb-3">{para}</p>;
            })}
          </div>
        </div>

        {/* Other Posts */}
        <h2 className="text-2xl font-extrabold text-dark mb-8">More Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(1).map((post) => (
            <div key={post.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className={`h-40 bg-gradient-to-br ${post.color} flex items-center justify-center text-6xl`}>
                {post.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-extrabold text-dark mb-3 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <span className="text-primary font-bold text-sm">Read More →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-primary rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mt-24" />
          <h2 className="text-3xl font-extrabold mb-3 relative z-10">Level Up Your Skills</h2>
          <p className="text-white/80 mb-8 relative z-10">Join a course today and get access to hands-on training that pays.</p>
          <Link href="/courses" className="inline-block bg-dark text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl relative z-10">
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
