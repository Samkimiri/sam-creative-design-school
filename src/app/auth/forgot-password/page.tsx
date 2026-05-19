"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // In this mock version, we just simulate a reset
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-lg group-hover:scale-105 transition-transform">
              <img src="/images/logo.jpg" alt="Sam Creative" className="w-full h-full object-cover rounded-xl" />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">Sam Creative <span className="text-primary">Graphics</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mt-8 mb-2">Reset Password</h1>
          <p className="text-gray-400">Enter your email to receive a reset link</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          {status === "success" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">📧</div>
              <h3 className="text-xl font-bold text-white mb-2">Check Your Email</h3>
              <p className="text-gray-400 mb-8">We&apos;ve sent a password reset link to <span className="text-white font-bold">{email}</span>.</p>
              <Link href="/auth/login" className="block w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-4 outline-none focus:border-primary transition-all placeholder:text-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {status === "loading" ? "Sending link..." : "Send Reset Link"}
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
