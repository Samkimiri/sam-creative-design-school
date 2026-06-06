"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");
    
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
      setMessage(data.message || "Could not send reset instructions.");
    } catch {
      setStatus("error");
      setMessage("Could not send reset instructions. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="animate-fade-in text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img src="/images/scds-monogram.svg" alt="Sam Creative" className="w-full h-full object-contain rounded-xl" />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">Sam Creative <span className="text-primary">Graphics</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mt-8 mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        <div className="animate-fade-in bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 transition duration-300 hover:border-white/20 hover:bg-white/[0.07]" style={{ animationDelay: "120ms" }}>
          {status === "success" ? (
            <div className="animate-fade-in text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 animate-pulse">📧</div>
              <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
              <p className="text-gray-400 mb-8">
                {message || "If this email is registered, password reset instructions will be sent."}
              </p>
              <Link href="/auth/login" className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:bg-primary/90 transition-all duration-300 active:translate-y-0">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-xl text-sm font-medium" role="alert">
                  {message}
                </div>
              )}
              <div>
                <label htmlFor="reset-email" className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-4 outline-none focus:border-primary transition-all duration-300 focus:-translate-y-0.5 focus:shadow-lg focus:shadow-primary/10 placeholder:text-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:translate-y-0 active:translate-y-0"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Sending link...
                  </span>
                ) : "Send Reset Link"}
              </button>

              <div className="text-center pt-4">
                <Link href="/auth/login" className="text-gray-500 hover:text-white transition-colors text-sm font-bold">
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
