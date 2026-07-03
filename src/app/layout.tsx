import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import PWAInstaller from "@/components/PWAInstaller";
import StudyBreakPrompt from "@/components/StudyBreakPrompt";
import PremiumMotion from "@/components/PremiumMotion";
import { getContentSettings } from "@/lib/contentSettings";
import {
  defaultOgImage,
  defaultSeoDescription,
  jsonLdScript,
  organizationJsonLd,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sam Creative Design School | Online Graphic Design Courses in Kenya",
    template: `%s | ${siteName}`,
  },
  description: defaultSeoDescription,
  keywords: [
    "graphic design course Kenya",
    "Photoshop course in Kenya",
    "Illustrator training Kenya",
    "CapCut course Kenya",
    "SolidWorks training Kenya",
    "online design courses with certificate Kenya",
    "Sam Creative Design School",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  applicationName: siteName,
  authors: [{ name: "Samuel Kimiri" }],
  creator: "Samuel Kimiri",
  publisher: siteName,
  category: "Education",
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
    title: "Sam Creative Design School | Online Graphic Design Courses in Kenya",
    description: defaultSeoDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 512,
        height: 512,
        alt: "Sam Creative Design School logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam Creative Design School | Online Graphic Design Courses in Kenya",
    description: defaultSeoDescription,
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/app-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/app-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContentSettings();

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton number={content.homepage.whatsappNumber} />
        <PWAInstaller />
        <StudyBreakPrompt />
        <AnalyticsTracker />
        <PremiumMotion />
      </body>
    </html>
  );
}
