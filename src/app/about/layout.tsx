import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Sam Creative Design School",
  description:
    "Learn about Sam Creative Design School, a Kenya-based online creative and technical training school founded by Samuel Kimiri.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
