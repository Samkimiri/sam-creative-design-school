import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enroll Online",
  description:
    "Enroll at Sam Creative Design School in Kenya and submit M-Pesa payment details for admin approval and LMS access.",
  alternates: {
    canonical: "/enroll",
  },
};

export default function EnrollLayout({ children }: { children: React.ReactNode }) {
  return children;
}
