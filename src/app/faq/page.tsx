export default function FAQPage() {
  const enrollmentSteps = [
    { step: 1, title: "Choose Course", desc: "Select the training program that fits your goals." },
    { step: 2, title: "Fill Details", desc: "Provide your name and phone number for enrollment." },
    { step: 3, title: "Pay via M-Pesa", desc: "Enter your PIN when the Safaricom prompt appears on your phone." },
    { step: 4, title: "Get Access", desc: "Receive login details for the LMS and start learning." }
  ];

  const faqs = [
    {
      category: "Courses & Enrollment",
      items: [
        {
          q: "Do I need any prior experience to join?",
          a: "No! All our courses are designed for beginners. You only need a computer, internet access, and the desire to learn. We start from absolute zero and build up your skills step by step."
        },
        {
          q: "How long are the courses?",
          a: "Course duration varies: Photoshop Masterclass (30 days), Illustrator Training (30 days), CapCut Masterclass (15 days), and SolidWorks for Engineers (45 days). All courses are self-paced, so you can learn at your own speed."
        },
        {
          q: "Can I enroll in multiple courses at once?",
          a: "Absolutely! Many students combine Photoshop and Illustrator for a complete graphic design skillset. You can enroll in as many courses as you like, and each gets its own dashboard in the LMS."
        },
        {
          q: "Will I get a certificate after completing a course?",
          a: "Yes! Every course includes a certificate of completion that you can add to your CV, LinkedIn profile, or portfolio. Certificates are awarded after you complete all lessons and pass the quizzes."
        }
      ]
    },
    {
      category: "Payment & Fees",
      items: [
        {
          q: "How do I pay for a course?",
          a: "Payment is via M-PESA only. Go to M-PESA → Send Money → Enter 0743475247 (Samuel Kimiri) → Enter the course fee → Use the reference number shown on your enrollment receipt."
        },
        {
          q: "What are the course fees?",
          a: "Photoshop: Ksh 1,000–1,500 | Illustrator: Ksh 1,000–1,500 | CapCut: Ksh 1,000 | SolidWorks: Ksh 2,000. These fees are all-inclusive — no hidden charges."
        },
        {
          q: "Can I get a refund?",
          a: "We offer a 48-hour refund window from the time of enrollment if you haven't accessed more than 2 lessons. Contact us on WhatsApp at 0748201131 with your reference number."
        },
        {
          q: "Do you offer group or corporate discounts?",
          a: "Yes! Groups of 3+ students enrolling together receive a 15% discount. Schools and companies can contact Samuel directly via email at samcreativegraphics7@gmail.com for corporate training packages."
        }
      ]
    },
    {
      category: "LMS & Technical",
      items: [
        {
          q: "How do I access the LMS after payment?",
          a: "After enrolling and sending M-PESA payment, send a screenshot of your payment to 0748201131 on WhatsApp with your reference number. Access is granted within 2 hours during business hours (8am–8pm EAT)."
        },
        {
          q: "Can I access the LMS on mobile?",
          a: "Yes! The LMS is fully mobile-responsive. You can watch lessons, take quizzes, and track your progress on any smartphone, tablet, or computer with a browser."
        },
        {
          q: "What software do I need to download?",
          a: "For Photoshop and Illustrator, you'll need Adobe Creative Cloud (subscription or trial). For CapCut, the free mobile or desktop app works perfectly. For SolidWorks, a trial or student version is available from the official SolidWorks website."
        },
        {
          q: "I forgot my password. What do I do?",
          a: "Contact us on WhatsApp at 0748201131 or email samcreativegraphics7@gmail.com with your registered email address and we'll reset it for you promptly."
        }
      ]
    },
    {
      category: "Career & Outcomes",
      items: [
        {
          q: "Can I earn money with skills from these courses?",
          a: "Absolutely! Our students regularly land freelance clients on Fiverr, PeoplePerHour, and locally. Graphic designers in Kenya earn Ksh 15,000–80,000+/month freelancing, and SolidWorks skills are in high demand in manufacturing and engineering firms."
        },
        {
          q: "Does Samuel provide mentorship?",
          a: "Yes. Every student gets access to a dedicated WhatsApp group for each course where Samuel provides feedback on your projects, answers questions, and shares industry tips throughout your training."
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know before joining Sam Creative Design School. Can&apos;t find your answer? WhatsApp us at 0748201131.
          </p>
        </div>

        <section className="mb-16 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-extrabold mb-8">Simple 4-Step <span className="text-primary">Enrollment</span></h2>
          <div className="grid gap-6 md:grid-cols-2">
            {enrollmentSteps.map((item) => (
              <div key={item.step} className="flex gap-4">
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

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-extrabold text-dark mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <details key={i} className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-dark hover:text-primary transition-colors list-none">
                      <span>{item.q}</span>
                      <span className="text-primary ml-4 shrink-0 text-xl group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-16 bg-dark rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -mr-24 -mt-24" />
          <h2 className="text-2xl font-extrabold mb-3 relative z-10">Still Have Questions?</h2>
          <p className="text-gray-400 mb-6 relative z-10">We&apos;re happy to help. Reach out directly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a
              href="https://wa.me/254748201131"
              className="bg-[#25D366] text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all"
              target="_blank" rel="noreferrer"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:samcreativegraphics7@gmail.com"
              className="bg-white/10 border border-white/20 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/20 transition-all"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
