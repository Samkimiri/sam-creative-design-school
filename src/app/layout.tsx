import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sam-creative-design-school.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sam Creative Design School | Graphic Design Training in Kenya",
    template: "%s | Sam Creative Design School",
  },
  description: "Learn Photoshop, Illustrator, CapCut, and SolidWorks with industry-level training in Kenya. Practical skills for young creatives and engineers.",
  keywords: ["Graphic design training Kenya", "Photoshop classes Kenya", "SolidWorks training", "Sam Creative Design School"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sam Creative Design School",
    description: "Practical Photoshop, Illustrator, CapCut, and SolidWorks training for creatives and engineers.",
    url: siteUrl,
    siteName: "Sam Creative Design School",
    images: [
      {
        url: "/images/logo.jpg",
        width: 800,
        height: 800,
        alt: "Sam Creative Design School logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Creative Design School",
    description: "Practical creative and engineering software training in Kenya.",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
