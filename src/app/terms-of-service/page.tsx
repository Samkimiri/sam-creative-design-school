import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Sam Creative Design School",
  description:
    "The terms that govern enrolling in and using Sam Creative Design School's courses, LMS, certificates, and student community.",
  alternates: { canonical: "/terms-of-service" },
};

const LAST_UPDATED = "September 14, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-extrabold text-dark">{title}</h2>
      <div className="space-y-4 text-base leading-7 text-gray-600">{children}</div>
    </section>
  );
}

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-24">
      <div className="bg-dark py-16 text-white">
        <div className="container mx-auto px-6">
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">Legal</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-white/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 py-14">
        <p className="mb-10 text-base leading-7 text-gray-600">
          These Terms of Service (&quot;Terms&quot;) govern your use of the Sam Creative Design School (&quot;SCDS&quot;,
          &quot;we&quot;, &quot;us&quot;) website, Learning Management System (LMS), and student community. By creating
          an account, enrolling in a course, or otherwise using the site, you agree to these Terms. Please also read
          our{" "}
          <a href="/privacy-policy" className="font-bold text-primary hover:underline">
            Privacy Policy
          </a>
          , which explains how we handle your data.
        </p>

        <Section title="1. Who Can Use SCDS">
          <p>
            Our courses are intended for learners aged 16 and above. If you are under 18, a parent or guardian should
            be aware of your enrollment and, where payment is involved, assist with it. You must provide accurate,
            current information when creating an account and enrolling in a course.
          </p>
        </Section>

        <Section title="2. Accounts">
          <p>
            You are responsible for keeping your login credentials confidential and for all activity under your
            account. Let us know immediately if you suspect unauthorized access. We may suspend or close an account
            that provides false information, is used to violate these Terms, or is inactive for an extended period.
          </p>
        </Section>

        <Section title="3. Enrollment and Payment">
          <p>
            Courses are paid for via M-Pesa to the Till or PayBill number shown at checkout. After you submit an
            enrollment request, it is reviewed by an admin against the M-Pesa payment before LMS access is unlocked -
            this review is not instant. Prices, discounts, referral codes, and promo codes shown on the site are set by
            SCDS and may change at any time; the price you agreed to at the time of a confirmed enrollment will not
            change for that enrollment.
          </p>
        </Section>

        <Section title="4. Refunds">
          <p>
            Refund requests must be submitted to SCDS support within 48 hours of enrollment and before the student has
            substantially accessed course lessons, downloads, live class placement, or mentorship support. Course fees
            are generally non-refundable once access to paid learning materials or services has been provided. A
            refund may be considered where there is a duplicate payment, an incorrect payment amount, or a verified
            access issue that SCDS is unable to resolve within a reasonable time. Approved refunds are returned to the
            original payer where possible and may exclude M-Pesa, bank, or payment processing charges. Each request is
            reviewed fairly, in good faith, and subject to applicable consumer protection laws.
          </p>
        </Section>

        <Section title="5. Course Access and Certificates">
          <p>
            Enrolled courses remain accessible through your LMS account for as long as SCDS operates the platform,
            unless your access is revoked under these Terms. Certificates are issued once the required lessons and
            assessments for a course are completed and are tied to your account; certificate authenticity can be
            checked using our certificate verification tool.
          </p>
        </Section>

        <Section title="6. Student Community Conduct">
          <p>
            The student community is for encouragement, questions, and sharing progress. You agree not to post
            abusive, harassing, hateful, or illegal content. Messages are automatically screened for abusive language,
            and admins may remove content or restrict an account that violates this rule. You can block another
            student from contacting you directly; blocking does not remove content already posted. Content you post
            publicly (messages, posts, comments, portfolio work) may be visible to other students.
          </p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>
            Course videos, notes, quizzes, assignments briefs, and other learning materials are the property of SCDS
            (or licensed to SCDS) and are provided for your personal, non-commercial learning use only. You may not
            copy, resell, or redistribute course materials. Work you create as part of a course or the community -
            your projects, portfolio pieces, and posts - remains yours, but by submitting it for the public gallery,
            student portfolio, or community you grant SCDS a non-exclusive right to display it on the site for
            promotional and educational purposes, with credit to you.
          </p>
        </Section>

        <Section title="8. Acceptable Use">
          <p>
            You agree not to misuse the site: no attempting to bypass payment or access controls, no scraping or
            automated abuse of the platform, no impersonating another person or SCDS staff, and no using the site for
            any unlawful purpose.
          </p>
        </Section>

        <Section title="9. Disclaimer and Limitation of Liability">
          <p>
            SCDS courses are provided to build practical skills, but we do not guarantee specific employment,
            income, or business outcomes from completing a course. The service is provided &quot;as is&quot;. To the
            extent permitted by Kenyan law, SCDS is not liable for indirect, incidental, or consequential damages
            arising from your use of the site or courses, and our total liability for any claim is limited to the
            amount you paid for the course giving rise to the claim.
          </p>
        </Section>

        <Section title="10. Termination">
          <p>
            We may suspend or terminate access to the LMS or community for a violation of these Terms, including
            abusive conduct, payment fraud, or unauthorized account sharing. You may stop using the site and request
            account closure at any time.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms as the platform evolves. The &quot;Last updated&quot; date above shows the most
            recent revision. Continuing to use the site after a change means you accept the updated Terms.
          </p>
        </Section>

        <Section title="12. Governing Law">
          <p>
            These Terms are governed by the laws of Kenya. Any dispute arising from these Terms or your use of SCDS
            will first be addressed through good-faith discussion with our support team before any formal action.
          </p>
        </Section>

        <Section title="13. Contact Us">
          <p>
            Questions about these Terms can be sent to{" "}
            <a href="mailto:samcreativegraphics7@gmail.com" className="font-bold text-primary hover:underline">
              samcreativegraphics7@gmail.com
            </a>{" "}
            or via WhatsApp through the contact link in the site footer.
          </p>
        </Section>
      </div>
    </div>
  );
}
