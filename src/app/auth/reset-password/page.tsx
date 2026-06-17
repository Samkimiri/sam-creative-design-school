import Link from "next/link";
import ResetPasswordForm from "@/components/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { token = "" } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark px-6 py-24">
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3 transition hover:opacity-90">
            <div className="h-16 w-16 rounded-2xl bg-white p-1 shadow-lg">
              <img src="/images/scds-monogram.svg" alt="Sam Creative" className="h-full w-full rounded-xl object-contain" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">Sam Creative <span className="text-primary">Graphics</span></span>
          </Link>
        </div>

        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
