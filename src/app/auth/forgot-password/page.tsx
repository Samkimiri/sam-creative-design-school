"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle, MailCheck } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");
    setResetUrl("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setStatus(data.success ? "success" : "error");
      setMessage(data.message || "Could not send reset instructions.");
      setResetUrl(data.resetUrl || "");
    } catch {
      setStatus("error");
      setMessage("Could not send reset instructions. Please try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-dark px-6 py-20">
      <div className="absolute right-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center animate-fade-in">
          <Link href="/" className="inline-flex flex-col items-center gap-3 transition hover:opacity-90">
            <div className="h-16 w-16 rounded-2xl bg-white p-1 shadow-lg transition-transform duration-300 hover:scale-105">
              <img src="/images/scds-monogram.svg" alt="Sam Creative" className="h-full w-full rounded-xl object-contain" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">Sam Creative <span className="text-primary">Graphics</span></span>
          </Link>
          <h1 className="mb-2 mt-8 text-3xl font-extrabold text-white">Reset Password</h1>
          <p className="text-gray-400">Enter your email and we will send a secure reset link</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-white/[0.07] animate-fade-in">
          {status === "success" ? (
            <div className="py-6 text-center animate-fade-in">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                <MailCheck className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Check Your Email</h3>
              <p className="mb-8 text-gray-400">
                {message || "If this email is registered, password reset instructions will be sent."}
              </p>
              {resetUrl && (
                <Link href={resetUrl} className="mb-4 block w-full rounded-xl border border-primary/40 bg-primary/10 py-4 font-bold text-primary-light transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/20">
                  Open Local Reset Link
                </Link>
              )}
              <Link href="/auth/login" className="block w-full rounded-xl bg-primary py-4 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300" role="alert">
                  {message}
                </div>
              )}
              <div>
                <label htmlFor="reset-email" className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:-translate-y-0.5 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-50 disabled:hover:translate-y-0 active:translate-y-0"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Sending link...
                  </span>
                ) : "Send Reset Link"}
              </button>

              <div className="pt-4 text-center">
                <Link href="/auth/login" className="text-sm font-bold text-gray-500 transition-colors hover:text-white">
                  Remember your password? <span className="text-primary">Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
