import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, Award, BadgeCheck, Download, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Blank Certificate Preview",
  description: "View the blank Sam Creative Design School certificate structure before student details are added.",
};

export default function CertificatePreviewPage() {
  return (
    <main className="bg-light-gray pt-28">
      <section className="container mx-auto px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-primary">
              <Award className="h-4 w-4" aria-hidden="true" />
              Certificate Preview
            </span>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-dark md:text-5xl">
              Blank SCDS certificate structure.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              This public preview shows the certificate design before a graduate name, course, issue date, and certificate ID are added.
            </p>
          </div>
          <a
            href="/images/certificate-preview-blank.svg"
            target="_blank"
            rel="noreferrer"
            className="premium-button inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Open Certificate Image
          </a>
        </div>

        <div className="premium-card overflow-hidden rounded-3xl border border-primary/15 bg-white p-3 shadow-2xl shadow-primary/10 md:p-5" data-reveal>
          <img
            src="/images/certificate-preview-blank.svg"
            alt="Blank Sam Creative Design School certificate preview with no student name"
            className="certificate-preview-image w-full rounded-2xl border border-gray-100 bg-white"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: "Official Logo", text: "Uses the SCDS school identity.", Icon: ShieldCheck },
            { title: "Blank Name Line", text: "No student name is shown on this public preview.", Icon: BadgeCheck },
            { title: "Completion Ready", text: "Final issued certificates include course and verification details.", Icon: Award },
          ].map(({ Icon, ...item }, index) => (
            <div key={item.title} className="premium-card rounded-2xl border border-gray-100 bg-white p-5" data-reveal style={{ "--reveal-delay": `${index * 55}ms` } as CSSProperties}>
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="text-lg font-extrabold text-dark">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
