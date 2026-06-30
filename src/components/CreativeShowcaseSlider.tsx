"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";

const slides = [
  {
    title: "Food product poster",
    label: "Clean Ad Design",
    image: "/images/showcase-food-poster.png",
    alt: "Minimal food product advertising poster",
  },
  {
    title: "Orange juice advert",
    label: "Product Campaign",
    image: "/images/showcase-orange-juice-poster.png",
    alt: "Clean orange juice advertising poster",
  },
  {
    title: "Cookie pack design",
    label: "Bakery Branding",
    image: "/images/showcase-cookie-poster.png",
    alt: "Clean cookie packaging advertising poster",
  },
  {
    title: "Berry smoothie poster",
    label: "Fresh Food Ad",
    image: "/images/showcase-berry-smoothie-poster.png",
    alt: "Clean berry smoothie advertising poster",
  },
  {
    title: "Illustrator branding",
    label: "Vector Work",
    image: "/images/gallery-illustrator.png",
    alt: "Illustrator student branding work",
  },
  {
    title: "Website development",
    label: "Vibe Coding",
    image: "/images/course-vibe-coding-web-dev.png",
    alt: "Website development course preview",
  },
  {
    title: "AI design workflow",
    label: "AI Design",
    image: "/images/course-ai-prompt-engineering.png",
    alt: "AI prompt engineering and design workflow preview",
  },
  {
    title: "Motion graphics",
    label: "CapCut",
    image: "/images/course-capcut.png",
    alt: "Motion graphics and video editing preview",
  },
  {
    title: "Blank certificate preview",
    label: "Completion Design",
    image: "/images/certificate-preview-blank.svg",
    alt: "Blank Sam Creative Design School certificate preview",
    href: "/certificate-preview",
    cta: "View Blank Certificate",
    fit: "contain",
  },
];

export default function CreativeShowcaseSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const activeSlide = slides[active];
  const progress = useMemo(() => ((active + 1) / slides.length) * 100, [active]);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4300);

    return () => window.clearInterval(timer);
  }, [paused]);

  const goTo = (next: number) => {
    setActive((next + slides.length) % slides.length);
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) return;
    const distance = touchStart - clientX;

    if (Math.abs(distance) > 42) {
      goTo(active + (distance > 0 ? 1 : -1));
    }
    setTouchStart(null);
  };

  return (
    <section className="bg-white py-16" data-reveal>
      <div className="container mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-primary">
              Creative Showcase
            </span>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-dark md:text-4xl">
              A quick look at the work students build.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-gray-600">
              Practical classes, portfolio projects, online learning, and certificate-ready progress.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous showcase slide"
                onClick={() => goTo(active - 1)}
                className="premium-button grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-dark shadow-sm hover:border-primary hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next showcase slide"
                onClick={() => goTo(active + 1)}
                className="premium-button grid h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-dark shadow-sm hover:border-primary hover:text-primary"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-light-gray shadow-2xl shadow-primary/10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
            onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              {slides.map((slide, index) => (
                <img
                  key={slide.title}
                  src={slide.image}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-1000 ease-out ${
                    "fit" in slide && slide.fit === "contain" ? "object-contain p-4 md:p-6" : "object-cover"
                  } ${
                    index === active
                      ? `opacity-100 ${"fit" in slide && slide.fit === "contain" ? "scale-100" : "scale-105"}`
                      : "opacity-0 scale-100"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
                <p className="text-xs font-black uppercase tracking-widest text-primary-light">
                  {activeSlide.label}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold md:text-4xl">{activeSlide.title}</h3>
                {"href" in activeSlide && activeSlide.href && (
                  <a
                    href={activeSlide.href}
                    className="premium-button mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-dark shadow-lg hover:text-primary"
                  >
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    {activeSlide.cta}
                  </a>
                )}
              </div>
            </div>
            <div className="h-1.5 bg-white/80">
              <span
                className="block h-full rounded-r-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="absolute right-5 top-5 flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  aria-label={`Show ${slide.title}`}
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === active ? "w-8 bg-primary" : "w-2.5 bg-white/70 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
