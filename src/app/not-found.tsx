import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home, MessageCircle, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | Sam Creative Design School",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { href: "/courses", label: "Browse Courses", icon: Compass },
  { href: "/blog", label: "Read the Blog", icon: Search },
  { href: "/contact", label: "Contact Support", icon: MessageCircle },
];

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden bg-dark px-6 py-32 text-white">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(26,143,227,0.16),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary-light">Error 404</p>
        <h1 className="text-6xl font-black tracking-tight text-white sm:text-7xl">
          Page Not <span className="text-primary">Found</span>
        </h1>
        <p className="mt-6 text-lg leading-7 text-white/70">
          The page you&apos;re looking for doesn&apos;t exist, may have moved, or the link might be broken. Let&apos;s
          get you back on track.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="premium-button inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Homepage
          </Link>
          <Link
            href="/courses"
            className="premium-button inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light hover:bg-white/15"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            Explore Courses
          </Link>
        </div>

        <div className="mt-14 grid gap-3 border-t border-white/10 pt-10 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="premium-card flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-bold text-white/80 transition-all duration-300 hover:border-primary-light hover:text-white"
            >
              <link.icon className="h-4 w-4 text-primary-light" aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
