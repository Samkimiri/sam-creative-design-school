"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setStatus("error");
      setErrorMsg("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setStatus("error");
      setErrorMsg("Password must be at least 6 characters");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, password: formData.password }),
    });
    const data = await res.json();

    if (data.success) {
      router.push("/lms");
      router.refresh();
    } else {
      setStatus("error");
      setErrorMsg(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6 py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-3 group">
            <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-lg group-hover:scale-105 transition-transform">
              <img src="/images/logo.jpg" alt="Sam Creative" className="w-full h-full object-cover rounded-xl" />
            </div>
            <span className="text-white font-extrabold text-2xl tracking-tight">Sam Creative <span className="text-primary">Graphics</span></span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white mb-2">Join the Academy</h1>
          <p className="text-gray-400">Create your account and start learning today</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Full Name</label>
              <input
                required type="text"
                className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500"
                placeholder="e.g., John Kamau"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
              <input
                required type="email"
                className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Phone Number</label>
              <input
                required type="tel" pattern="[0-9]{10}"
                className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500"
                placeholder="07XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
              <input
                required type="password" minLength={6}
                className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Confirm Password</label>
              <input
                required type="password"
                className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500"
                placeholder="Repeat password"
                value={formData.confirm}
                onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 mt-2"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
