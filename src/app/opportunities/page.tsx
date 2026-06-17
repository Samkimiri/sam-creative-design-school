import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle2, ClipboardList, GraduationCap, Trophy } from "lucide-react";
import { boardGuidelines, featuredOpportunities, opportunityTypes } from "@/data/professionalPages";

export const metadata: Metadata = {
  title: "Jobs and Freelance Opportunities Board | Sam Creative Design School",
  description:
    "Explore student-ready design gigs, internships, contests, and client project opportunities connected to Sam Creative Design School in Kenya.",
};

export default function OpportunitiesPage() {
  return (
    <div className="bg-white pt-32 pb-24">
      <section className="bg-dark py-16 text-white">
        <div className="container mx-auto px-6">
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">Job & Freelance Opportunities Board</p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
            A professional bridge between SCDS learners and real creative work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Find student-friendly design gigs, internships, contests, and mentored client projects across Kenya.
            Clients and partners can also share opportunities for capable creative learners.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 font-bold text-white shadow-lg transition hover:bg-primary/90"
            >
              Submit an Opportunity
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/student-portfolios"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 font-bold text-white transition hover:border-primary hover:text-primary"
            >
              View Student Portfolios
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {opportunityTypes.map((item) => (
            <article key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 inline-flex rounded-xl bg-light-gray p-3 text-primary">
                {item.title.includes("Gigs") ? (
                  <Briefcase className="h-6 w-6" aria-hidden="true" />
                ) : item.title.includes("Internships") ? (
                  <GraduationCap className="h-6 w-6" aria-hidden="true" />
                ) : item.title.includes("Contests") ? (
                  <Trophy className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <ClipboardList className="h-6 w-6" aria-hidden="true" />
                )}
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-primary">{item.label}</p>
              <h2 className="mt-2 text-xl font-extrabold text-dark">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
              <p className="mt-4 text-sm font-semibold leading-6 text-dark">{item.fit}</p>
            </article>
          ))}
        </section>

        <section className="mt-16">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-primary">Featured Openings</p>
              <h2 className="mt-2 text-3xl font-extrabold text-dark">Current opportunity examples.</h2>
            </div>
            <Link href="/contact" className="font-bold text-primary hover:text-dark">
              Share a brief
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {featuredOpportunities.map((opportunity) => (
              <article key={opportunity.role} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-light-gray px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">
                        {opportunity.type}
                      </span>
                      <span className="rounded-full bg-light-gray px-3 py-1 text-xs font-bold text-gray-600">
                        {opportunity.location}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-dark">{opportunity.role}</h3>
                    <p className="mt-1 text-sm font-bold text-gray-500">{opportunity.partner}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 font-bold text-dark transition hover:border-primary hover:text-primary"
                  >
                    Express Interest
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <p className="mt-5 text-sm leading-6 text-gray-600">{opportunity.brief}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl bg-light-gray p-8 md:p-10">
            <p className="text-sm font-black uppercase tracking-widest text-primary">Professional Standards</p>
            <h2 className="mt-2 text-3xl font-extrabold text-dark">A clearer board helps students and clients work well.</h2>
            <div className="mt-8 grid gap-4">
              {boardGuidelines.map((guideline) => (
                <div key={guideline} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm font-semibold leading-6 text-dark">{guideline}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-dark p-8 text-white md:p-10">
            <h2 className="text-3xl font-extrabold">For partners, schools, churches, and businesses.</h2>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              SCDS can help turn suitable briefs into student challenges, short-term gigs, internships, or mentored
              delivery projects. This gives learners real experience while clients access fresh creative support.
            </p>
            <Link
              href="/corporate-training"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 font-bold text-white shadow-lg transition hover:bg-primary/90"
            >
              Explore Group Training
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
