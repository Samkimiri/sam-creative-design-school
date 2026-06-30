"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, Laptop, MonitorDown, Share2, Smartphone } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function AppInstallPanel() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone));

    setIsInstalled(standalone);

    const registerServiceWorker = async () => {
      if (!("serviceWorker" in navigator)) return;
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch {
        setStatus("App install support is still loading. Try again after refreshing this page.");
      }
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setStatus("");
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setStatus("SCDS has been installed on this device.");
    };

    void registerServiceWorker();
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installSteps = useMemo(() => [
    {
      title: "Android Chrome",
      icon: Smartphone,
      steps: ["Open this page in Chrome.", "Tap Install App when the button is available.", "If not shown, open the menu and choose Add to Home screen."],
    },
    {
      title: "iPhone Safari",
      icon: Share2,
      steps: ["Open this page in Safari.", "Tap the Share button.", "Choose Add to Home Screen, then tap Add."],
    },
    {
      title: "Laptop or Desktop",
      icon: Laptop,
      steps: ["Open this page in Chrome or Edge.", "Click the install icon in the address bar, or use the button here.", "Pin SCDS to your taskbar or dock for quick LMS access."],
    },
  ], []);

  const installApp = async () => {
    if (!installPrompt) {
      setStatus("If the install button is not available, use the device instructions below.");
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setInstallPrompt(null);
      setStatus("SCDS is installing. You can open it from your home screen or desktop.");
    } else {
      setStatus("Install was dismissed. You can try again later from this page.");
    }
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="premium-card motion-rise rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-4">
          <img src="/images/app-icon-192.png" alt="SCDS app icon" className="motion-scale h-20 w-20 rounded-3xl shadow-xl shadow-primary/20" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">Install SCDS</p>
            <h2 className="mt-2 text-2xl font-black text-dark md:text-3xl">Add the school app to this device</h2>
          </div>
        </div>

        <p className="text-sm leading-7 text-gray-600">
          Install Sam Creative Design School for faster access to courses, LMS lessons, assignments, gallery projects, and study break games.
        </p>

        <button
          type="button"
          onClick={installApp}
          disabled={isInstalled}
          className="premium-button mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-black text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-green-600 md:w-auto"
        >
          {isInstalled ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : <Download className="h-5 w-5" aria-hidden="true" />}
          {isInstalled ? "App Installed" : installPrompt ? "Install App" : "Show Install Help"}
        </button>

        {status && <p className="mt-4 rounded-2xl bg-light-gray px-4 py-3 text-sm font-semibold text-gray-600" role="status" aria-live="polite">{status}</p>}

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {["Fast LMS access", "Works like an app", "Cleaner student portal"].map((item, index) => (
            <div key={item} className={`interactive-lift motion-soft motion-delay-${index + 1} rounded-2xl bg-light-gray p-4 text-sm font-bold text-dark`}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {installSteps.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="premium-card motion-rise rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-black text-dark">{item.title}</h3>
              </div>
              <ol className="space-y-2">
                {item.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-gray-600">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-light-gray text-xs font-black text-primary">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          );
        })}

        <div className="motion-soft rounded-2xl bg-dark p-6 text-white">
          <div className="mb-3 flex items-center gap-3">
            <MonitorDown className="h-5 w-5 text-primary-light" aria-hidden="true" />
            <h3 className="font-black">Best after login</h3>
          </div>
          <p className="text-sm leading-6 text-white/75">
            Install the app, then sign in once. After that, students can return to the LMS from the installed SCDS icon.
          </p>
        </div>
      </div>
    </section>
  );
}
