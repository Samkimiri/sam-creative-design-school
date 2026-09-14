import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sam Creative Design School",
  description:
    "How Sam Creative Design School collects, uses, and protects student and visitor data across the website, enrollment, LMS, and community features.",
  alternates: { canonical: "/privacy-policy" },
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

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="bg-dark py-16 text-white">
        <div className="container mx-auto px-6">
          <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">Legal</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-white/70">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 py-14">
        <p className="mb-10 text-base leading-7 text-gray-600">
          Sam Creative Design School (&quot;SCDS&quot;, &quot;we&quot;, &quot;us&quot;) operates this website and its
          associated Learning Management System (LMS) in Kenya. This policy explains what information we collect
          from students and visitors, why we collect it, and the choices you have. By using this website, enrolling
          in a course, or creating an account, you agree to the practices described here.
        </p>

        <Section title="1. Information We Collect">
          <p>We collect the information you give us directly, and some information automatically:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Account information:</strong> name, email address, phone number, and a securely hashed password
              when you register for an account.
            </li>
            <li>
              <strong>Enrollment and payment information:</strong> the course(s) selected, the M-Pesa phone number and
              transaction reference used to pay, and any receipt/payment confirmation details an admin verifies. We do
              not collect or store your M-Pesa PIN, and we do not process card payments directly.
            </li>
            <li>
              <strong>Profile information:</strong> a profile photo, interests, and any bio you choose to add.
            </li>
            <li>
              <strong>Learning activity:</strong> lesson progress, quiz scores, assignments, project submissions, and
              certificates earned.
            </li>
            <li>
              <strong>Community activity:</strong> messages, posts, comments, and reactions you post in the student
              community, along with any content you report or block.
            </li>
            <li>
              <strong>Usage and device data:</strong> pages visited, session timestamps, and general device/browser
              information, collected for basic analytics and to keep the site secure.
            </li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc space-y-2 pl-6">
            <li>To create and manage your student account and LMS access.</li>
            <li>To review and confirm enrollment payments, and unlock the courses you paid for.</li>
            <li>To track your learning progress, issue certificates, and show you (and, where you opt in, other
              students) your standing on features like the leaderboard.</li>
            <li>To operate the student community, including moderating content for abusive language and enforcing
              blocks between students.</li>
            <li>To send you transactional emails - enrollment confirmations, payment approvals or rejections,
              password resets, and admin alerts about your account.</li>
            <li>To respond to support requests sent by email or WhatsApp.</li>
            <li>To improve the website and detect misuse, fraud, or technical problems.</li>
          </ul>
        </Section>

        <Section title="3. Cookies and Local Storage">
          <p>
            We use a small number of essential cookies to keep you signed in (a session cookie) and to remember basic
            preferences. Some features - such as remembering which of your own community reviews you can still edit -
            use your browser&apos;s local storage rather than a cookie. We do not use third-party advertising
            trackers.
          </p>
        </Section>

        <Section title="4. Sharing Your Information">
          <p>We do not sell your personal information. We share limited data with:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Payment verification:</strong> Safaricom M-Pesa, to the extent needed to confirm a payment you
              initiated.
            </li>
            <li>
              <strong>Email delivery:</strong> our transactional email provider, solely to deliver the emails listed
              above.
            </li>
            <li>
              <strong>Database hosting:</strong> our database provider, which stores your account and enrollment
              records on our behalf under their own security and confidentiality commitments.
            </li>
            <li>
              <strong>Legal requirements:</strong> if required by Kenyan law or a valid legal request.
            </li>
          </ul>
        </Section>

        <Section title="5. Community and Public Content">
          <p>
            Content you post in the student community (messages, posts, comments) is visible to other signed-in
            students. Your public student portfolio, if you choose to have one, and your leaderboard rank and name
            are visible to other students. You can delete your own community messages and posts (soft-deleted to a
            personal trash for 24 hours before permanent removal), and you can block another student from contacting
            you. Admins can remove content that violates our community standards.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We keep account, enrollment, and payment records for as long as your account is active and for a
            reasonable period afterward, to meet accounting, legal, and dispute-resolution obligations. Community
            messages and posts you delete are permanently removed after a short grace period. You can request deletion
            of your account and associated data at any time using the contact details below, subject to records we are
            legally required to keep.
          </p>
        </Section>

        <Section title="7. Data Security">
          <p>
            Passwords are stored using industry-standard hashing, never in plain text. Access to admin tools that can
            view student records is restricted to authorized school staff. No online system can be guaranteed
            completely secure, but we take reasonable technical and organizational steps to protect your data.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>
            You can review and update most of your account details from your LMS profile at any time. You may also
            contact us to request a copy of the personal data we hold about you, ask us to correct it, or ask us to
            delete your account. We will respond within a reasonable time.
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>
            Our courses are designed for learners aged 16 and above. If you are under 18, we ask that a parent or
            guardian be aware of your enrollment and, where payment is involved, assist with it. We do not knowingly
            collect personal information from children under 13.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this policy from time to time as the platform changes. The &quot;Last updated&quot; date at
            the top of this page shows when it was last revised. Continued use of the website after a change means
            you accept the updated policy.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            Questions about this policy or your data can be sent to{" "}
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
