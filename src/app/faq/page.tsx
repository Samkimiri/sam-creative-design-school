import { getManagedFAQs } from "@/lib/contentSettings";
import type { CSSProperties } from "react";

export default async function FAQPage() {
  const enrollmentSteps = [
    { step: 1, title: "Choose Course", desc: "Select the training program that fits your goals." },
    { step: 2, title: "Fill Details", desc: "Provide your name, phone number, and preferred payment method." },
    { step: 3, title: "Complete Payment", desc: "Confirm the M-Pesa STK Push sent to your phone." },
    { step: 4, title: "Get Access", desc: "Admin approves the verified payment, then LMS access unlocks." },
  ];
  const faqs = await getManagedFAQs();

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16" data-reveal>
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know before joining Sam Creative Design School, from Vibe Designing and Vibe Coding to AI & Prompt Engineering. Can&apos;t find your answer? WhatsApp us at 0748201131.
          </p>
        </div>

        <section className="premium-card mb-16 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8" data-reveal>
          <h2 className="text-2xl font-extrabold mb-8">Simple 4-Step <span className="text-primary">Enrollment</span></h2>
          <div className="grid gap-6 md:grid-cols-2">
            {enrollmentSteps.map((item, index) => (
              <div key={item.step} className="flex gap-4" data-reveal style={{ "--reveal-delay": `${index * 50}ms` } as CSSProperties}>
                <div className="w-11 h-11 bg-dark text-white rounded-full flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-12">
          {faqs.map((section, sectionIndex) => (
            <div key={section.category} data-reveal style={{ "--reveal-delay": `${sectionIndex * 60}ms` } as CSSProperties}>
              <h2 className="text-xl font-extrabold text-dark mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <details key={`${section.category}-${i}`} className="premium-card group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden" data-reveal style={{ "--reveal-delay": `${i * 40}ms` } as CSSProperties}>
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-dark hover:text-primary transition-colors list-none">
                      <span>{item.q}</span>
                      <span className="text-primary ml-4 shrink-0 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <div className="faq-panel-motion px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="premium-card mt-16 bg-dark rounded-3xl p-10 text-center text-white relative overflow-hidden" data-reveal>
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -mr-24 -mt-24" />
          <h2 className="text-2xl font-extrabold mb-3 relative z-10">Still Have Questions?</h2>
          <p className="text-gray-400 mb-6 relative z-10">We&apos;re happy to help. Reach out directly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a href="https://wa.me/254748201131" className="premium-button bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all" target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
            <a href="mailto:samcreativegraphics7@gmail.com" className="premium-button bg-white/10 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all">
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
