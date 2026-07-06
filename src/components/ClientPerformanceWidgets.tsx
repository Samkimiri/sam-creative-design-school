"use client";

import dynamic from "next/dynamic";
import WhatsAppButton from "@/components/WhatsAppButton";

const PWAInstaller = dynamic(() => import("@/components/PWAInstaller"), { ssr: false });
const StudyBreakPrompt = dynamic(() => import("@/components/StudyBreakPrompt"), { ssr: false });
const AnalyticsTracker = dynamic(() => import("@/components/AnalyticsTracker"), { ssr: false });
const PremiumMotion = dynamic(() => import("@/components/PremiumMotion"), { ssr: false });

export default function ClientPerformanceWidgets({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <>
      <WhatsAppButton number={whatsappNumber} />
      <PWAInstaller />
      <StudyBreakPrompt />
      <AnalyticsTracker />
      <PremiumMotion />
    </>
  );
}
