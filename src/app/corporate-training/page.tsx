import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle2, GraduationCap, Handshake, Users } from "lucide-react";
import { groupTrainingAudiences, groupTrainingTracks, trainingProcess } from "@/data/professionalPages";

export const metadata: Metadata = {
  title: "Corporate and Group Training in Kenya | Sam Creative Design School",
  description:
    "Book practical design, AI, video editing, and digital skills training for schools, churches, cyber cafes, companies, and youth groups in Kenya.",
};

const stats = [
  { value: "4", label: "group formats" },
  { value: "6+", label: "training tracks" },
  { value: "100%", label: "practical projects" },
];

export default function CorporateTrainingPage() {
  return (
    <div className="bg-white pt-32 pb-24">
      <section className="bg-dark py-16 text-white">
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">Corporate / Group Training</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
              Practical creative training for teams, schools, churches, and community groups.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              Sam Creative Design School helps Kenyan groups build useful digital skills through guided workshops,
              custom lesson plans, portfolio projects, and certificate-ready learning experiences.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 font-bold text-white shadow-lg transition hover:bg-primary/90"
              >
                Request Training
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-bold text-white transition hover:border-primary hover:text-primary"
              >
                View Course Tracks
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white p-4 text-center text-dark">
                  <span className="block text-3xl font-black text-primary">{item.value}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-primary p-6 text-white">
              <Briefcase className="mb-4 h-9 w-9" aria-hidden="true" />
              <h2 className="text-2xl font-extrabold">Built around real work</h2>
              <p className="mt-3 text-sm leading-6 text-white/90">
                Every session can include local examples: school posters, church media, cyber cafe services,
                company campaigns, youth projects, and client-ready portfolio briefs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-widest text-primary">Who We Train</p>
            <h2 className="mt-2 text-3xl font-extrabold text-dark">Programs for the groups already doing the work.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {groupTrainingAudiences.map((audience) => (
              <article key={audience.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-4 inline-flex rounded-xl bg-light-gray p-3 text-primary">
                  {audience.name.includes("Schools") ? (
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  ) : audience.name.includes("Companies") ? (
                    <Briefcase className="h-6 w-6" aria-hidden="true" />
                  ) : audience.name.includes("Churches") ? (
                    <Users className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Handshake className="h-6 w-6" aria-hidden="true" />
                  )}
                </div>
                <h3 className="text-xl font-extrabold text-dark">{audience.name}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{audience.need}</p>
                <p className="mt-4 rounded-xl bg-light-gray p-4 text-sm font-semibold leading-6 text-dark">{audience.format}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-light-gray p-8">
            <p className="text-sm font-black uppercase tracking-widest text-primary">Training Tracks</p>
            <h2 className="mt-2 text-3xl font-extrabold text-dark">Choose a focused workshop or combine tracks.</h2>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Sessions can be delivered as a one-day workshop, weekend intensive, holiday bootcamp, staff training,
              or multi-week cohort with LMS support.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {groupTrainingTracks.map((track) => (
              <div key={track} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span className="font-semibold leading-6 text-dark">{track}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl bg-dark p-8 text-white md:p-12">
          <p className="text-sm font-black uppercase tracking-widest text-primary">How Booking Works</p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">
            {trainingProcess.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-gray-200">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-extrabold text-dark">Ready to train your group?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Share your group size, location, preferred dates, and the skills you want to build. SCDS will recommend a
            practical format and quote.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105"
          >
            Plan a Training Session
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  );
}
