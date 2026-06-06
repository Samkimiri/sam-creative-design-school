"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Course } from "@/data/courses";

type FeaturedCoursesCarouselProps = {
  courses: Course[];
};

export default function FeaturedCoursesCarousel({ courses }: FeaturedCoursesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "previous" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-carousel-card]");
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 24;
    track.scrollBy({
      left: direction === "next" ? cardWidth + gap : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-14 animate-fade-in">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-primary">
            Featured Paths
          </p>
          <h3 className="text-2xl font-extrabold text-white md:text-3xl">
            Swipe through the skills students ask for most.
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous featured course"
            onClick={() => scrollByCard("previous")}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-xl font-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary"
          >
            &lt;
          </button>
          <button
            type="button"
            aria-label="Next featured course"
            onClick={() => scrollByCard("next")}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-xl font-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary"
          >
            &gt;
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        data-carousel-track
        className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {courses.map((course, index) => (
          <article
            key={course.id}
            data-carousel-card
            className="group relative min-h-[420px] w-[82vw] max-w-[380px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 sm:w-[360px]"
          >
            <img
              src={course.image}
              alt={course.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-55`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

            <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur-md">
                  Track {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-xl bg-primary px-3 py-2 text-xs font-black text-white shadow-lg shadow-primary/20">
                  {course.priceRange}
                </span>
              </div>

              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary-light">
                  {course.duration} - {course.level}
                </p>
                <h4 className="text-2xl font-extrabold leading-tight text-white">
                  {course.title}
                </h4>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/75">
                  {course.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {course.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/85 backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/lms/${course.id}?preview=1`}
                    className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-center text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/enroll?course=${course.id}`}
                    className="flex-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    Enroll
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
