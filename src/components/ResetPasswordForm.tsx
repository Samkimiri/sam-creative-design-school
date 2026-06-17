"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle, ShieldCheck } from "lucide-react";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    if (form.password.length < 6) {
      setStatus("error");
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirm) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: form.password }),
      });
      const data = await response.json();
      setStatus(data.success ? "success" : "error");
      setMessage(data.message || "Could not reset password. Please try again.");
      if (data.success) setForm({ password: "", confirm: "" });
    } catch {
      setStatus("error");
      setMessage("Could not reset password. Please check your connection and try again.");
    }
  };

  if (!token) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <h1 className="text-2xl font-extrabold text-white">Reset link missing</h1>
        <p className="mt-3 text-sm leading-6 text-gray-400">Request a new password reset link from the forgot password page.</p>
        <Link href="/auth/forgot-password" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary/90">
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
      <div className="mb-7 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary-light">
          <ShieldCheck className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Create New Password</h1>
        <p className="mt-2 text-sm text-gray-400">Choose a strong password for your SCDS account.</p>
      </div>

      {status === "success" ? (
        <div className="text-center">
          <p className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-300">
            {message}
          </p>
          <Link href="/auth/login" className="mt-6 inline-flex w-full justify-center rounded-xl bg-primary px-6 py-4 font-bold text-white transition hover:bg-primary/90">
            Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === "error" && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300" role="alert">
              {message}
            </div>
          )}
          <div>
            <label htmlFor="new-password" className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-400">New Password</label>
            <input
              id="new-password"
              required
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:-translate-y-0.5 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-400">Confirm Password</label>
            <input
              id="confirm-password"
              required
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={(event) => setForm({ ...form, confirm: event.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:-translate-y-0.5 focus:border-primary focus:shadow-lg focus:shadow-primary/10"
              placeholder="Repeat new password"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {status === "loading" && <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />}
            {status === "loading" ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}
