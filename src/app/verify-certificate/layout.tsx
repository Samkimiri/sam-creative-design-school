import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify a Certificate | Sam Creative Design School",
  description:
    "Verify the authenticity of a Sam Creative Design School certificate by entering its certificate ID.",
  alternates: {
    canonical: "/verify-certificate",
  },
};

export default function VerifyCertificateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
