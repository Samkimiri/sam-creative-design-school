import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PWAInstaller from "@/components/PWAInstaller";
import StudyBreakPrompt from "@/components/StudyBreakPrompt";

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
  manifest: "/manifest.webmanifest",
  applicationName: "Sam Creative Design School",
  appleWebApp: {
    capable: true,
    title: "SCDS",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#0056FF",
  },
  openGraph: {
    title: "Sam Creative Design School",
    description: "Practical Photoshop, Illustrator, CapCut, and SolidWorks training for creatives and engineers.",
    url: siteUrl,
    siteName: "Sam Creative Design School",
    images: [
      {
        url: "/images/app-icon.svg",
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
    images: ["/images/app-icon.svg"],
  },
  icons: {
    icon: "/images/app-icon.svg",
    apple: "/images/app-icon.svg",
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
        <PWAInstaller />
        <StudyBreakPrompt />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
