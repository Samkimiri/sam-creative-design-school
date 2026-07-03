import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sam Creative Design School",
  description:
    "Contact Sam Creative Design School in Kenya for Photoshop, Illustrator, CapCut, SolidWorks, UI/UX, web development, and AI training support.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
