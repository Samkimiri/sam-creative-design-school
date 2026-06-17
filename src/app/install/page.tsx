import type { Metadata } from "next";
import AppInstallPanel from "@/components/AppInstallPanel";

export const metadata: Metadata = {
  title: "Install SCDS App",
  description: "Install the Sam Creative Design School app for quick access to the LMS, courses, assignments, and student resources.",
};

export default function InstallPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="bg-dark py-16 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-widest text-primary">SCDS App</p>
            <h1 className="text-4xl font-black leading-tight md:text-5xl">
              Install the school app for faster learning access.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
              Add Sam Creative Design School to your phone, tablet, or computer and open your student portal like a normal app.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-14">
        <AppInstallPanel />
      </main>
    </div>
  );
}
