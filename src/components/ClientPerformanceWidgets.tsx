"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

const PWAInstaller = dynamic(() => import("@/components/PWAInstaller"), { ssr: false });
const StudyBreakPrompt = dynamic(() => import("@/components/StudyBreakPrompt"), { ssr: false });
const AnalyticsTracker = dynamic(() => import("@/components/AnalyticsTracker"), { ssr: false });
const PremiumMotion = dynamic(() => import("@/components/PremiumMotion"), { ssr: false });

function runWhenIdle(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const requestIdle =
    window.requestIdleCallback ||
    ((handler: IdleRequestCallback) => window.setTimeout(handler, 900));
  const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
  const id = requestIdle(callback);

  return () => cancelIdle(id);
}

export default function ClientPerformanceWidgets({ whatsappNumber }: { whatsappNumber: string }) {
  const [loadDeferredWidgets, setLoadDeferredWidgets] = useState(false);

  useEffect(() => runWhenIdle(() => setLoadDeferredWidgets(true)), []);

  return (
    <>
      <WhatsAppButton number={whatsappNumber} />
      {loadDeferredWidgets ? (
        <>
          <PWAInstaller />
          <StudyBreakPrompt />
          <AnalyticsTracker />
          <PremiumMotion />
        </>
      ) : null}
    </>
  );
}
