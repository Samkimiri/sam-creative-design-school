"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, Menu, X } from "lucide-react";

function runWhenIdle(callback: () => void) {
  const requestIdle = window.requestIdleCallback || ((handler: IdleRequestCallback) => window.setTimeout(handler, 300));
  const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
  const id = requestIdle(callback);

  return () => cancelIdle(id);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role?: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 20;
        setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return runWhenIdle(() => {
      fetch("/api/auth/me")
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.user) setUser(d.user);
          else setUser(null);
        })
        .catch(() => setUser(null));
    });
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/gallery", label: "Gallery" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/reviews", label: "Reviews" },
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Resources" },
    { href: "/games", label: "Games" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const isLmsPage = pathname.startsWith("/lms") || pathname.startsWith("/auth") || pathname.startsWith("/admin");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || isLmsPage
          ? "bg-white/95 backdrop-blur-xl shadow-[0_18px_45px_rgba(10,15,30,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-all group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
            <Image
              src="/images/scds-monogram.svg"
              alt="SCDS Logo"
              width={48}
              height={48}
              priority
              className="relative w-12 h-12 rounded-2xl bg-white object-contain p-1 shadow-2xl shadow-primary/30 border border-white/20 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-lg border-2 border-white shadow-lg" />
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-black tracking-tighter leading-none flex items-center gap-0.5 ${scrolled || isLmsPage ? "text-dark" : "text-white"}`}>
              SCDS<span className="text-primary">.</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-1">
              Design School
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        {!isLmsPage && (
          <div className="hidden items-center gap-1 xl:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative rounded-lg px-3 py-2 text-sm font-bold transition-all 2xl:px-4 ${
                  pathname === link.href
                    ? "text-primary"
                    : scrolled || isLmsPage
                    ? "text-gray-600 hover:text-primary"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 ${
                    pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={`text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                    scrolled || isLmsPage ? "text-dark hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                >
                  Admin Panel
                </Link>
              )}
              <Link
                href="/lms"
                className="premium-button flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20"
              >
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-black">
                  {user.name.charAt(0)}
                </span>
                My Portal
              </Link>
              <button
                onClick={handleLogout}
                className={`font-bold text-sm px-4 py-2.5 rounded-xl transition-all ${
                  scrolled || isLmsPage ? "text-red-500 hover:text-red-600" : "text-white/90 hover:text-white"
                }`}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="premium-button bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Sign In
              </Link>
              <Link
                href="/enroll"
                className={`font-bold text-sm px-4 py-2.5 rounded-xl transition-all ${
                  scrolled || isLmsPage ? "text-dark hover:text-primary" : "text-white/90 hover:text-white"
                }`}
              >
                Enroll Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2 rounded-lg transition-all ${scrolled || isLmsPage ? "text-dark" : "text-white"}`}
        >
          {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-y-auto max-h-[80vh] motion-soft">
          <div className="container mx-auto px-6 py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  pathname === link.href ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} className="text-center font-bold py-3 rounded-xl text-dark border border-gray-200">
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/lms" onClick={() => setMobileOpen(false)} className="bg-primary text-white text-center font-bold py-3 rounded-xl">
                    My Dashboard
                  </Link>
                  <button onClick={handleLogout} className="text-red-500 font-bold py-3 text-center">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                   <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="bg-primary text-white text-center font-bold py-3 rounded-xl">Sign In</Link>
                   <Link href="/enroll" onClick={() => setMobileOpen(false)} className="text-center font-bold py-3 rounded-xl text-dark border border-gray-200">Enroll Now</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
