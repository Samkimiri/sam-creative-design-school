import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { name: "Facebook", handle: "Sam Creatives", href: "https://www.facebook.com/SamCreatives", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    )},
    { name: "Instagram", handle: "@samcreativegraphics", href: "https://www.instagram.com/samcreativegraphics", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
    )},
    { name: "TikTok", handle: "@samkim7", href: "https://www.tiktok.com/@samkim7", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.35 6.35 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.13a8.32 8.32 0 0 0 4.87 1.56V7.24a4.85 4.85 0 0 1-1.1-.55z"/></svg>
    )},
    { name: "LinkedIn", handle: "Samuel Ndung'u Kimiri", href: "https://www.linkedin.com/in/samuel-ndungu-kimiri", icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
    )},
  ];

  const quickLinks = [
    { href: "/courses", label: "All Courses" },
    { href: "/portfolio-builder", label: "Portfolio Builder" },
    { href: "/about", label: "About Us" },
    { href: "/gallery", label: "Student Gallery" },
    { href: "/blog", label: "Blog & Tips" },
    { href: "/faq", label: "FAQ" },
    { href: "/enroll", label: "Enroll Now" },
  ];

  const lmsLinks = [
    { href: "/auth/login", label: "Student Login" },
    { href: "/auth/register", label: "Create Account" },
    { href: "/lms", label: "My Dashboard" },
  ];

  return (
    <footer className="relative z-20 border-t border-primary/25 bg-[#050914] text-white shadow-[0_-18px_60px_rgba(5,9,20,0.35)] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 hover:opacity-90 transition-all group">
              <img
                src="/images/logo.jpg"
                alt="SCDS Logo"
                className="w-12 h-12 rounded-2xl object-cover shadow-2xl shadow-primary/20"
              />
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none text-white">SCDS<span className="text-primary">.</span></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-1">Design School</span>
              </div>
            </Link>
            <p className="text-white/85 text-sm leading-relaxed mb-6">
              Empowering Kenyan creatives and engineers with practical, income-generating digital skills.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 text-sm hover:text-primary-light transition-colors font-semibold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Portal */}
          <div>
            <h4 className="font-extrabold text-white mb-5 text-sm uppercase tracking-wider">Student Portal</h4>
            <ul className="space-y-3">
              {lmsLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 text-sm hover:text-primary-light transition-colors font-semibold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-extrabold text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:0748201131" className="flex items-center gap-3 text-white/80 hover:text-primary-light transition-colors text-sm font-semibold group">
                <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-primary shrink-0">📞</span>
                0748201131
              </a>
              <a href="mailto:samcreativegraphics7@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-primary-light transition-colors text-sm font-semibold group">
                <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-primary shrink-0">✉️</span>
                <span className="truncate">samcreativegraphics7@gmail.com</span>
              </a>
              <a href="https://wa.me/254748201131" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/80 hover:text-[#25D366] transition-colors text-sm font-semibold group">
                <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-[#25D366] shrink-0">💬</span>
                WhatsApp Support
              </a>
              <div className="pt-2">
                <p className="text-xs text-white/60 font-semibold">MPESA Payments:</p>
                <p className="text-white/85 text-sm font-bold">0743475247 (Samuel Kimiri)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/65 text-sm">
            © {year} Sam Creative Design School. All rights reserved.
          </p>
          <p className="text-white/55 text-sm font-medium italic">
            Empowering Creatives. Building Professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
