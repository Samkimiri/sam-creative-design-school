"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setStatus(data.success ? "success" : "error");
    setMsg(data.message);
    if (data.success) setFormData({ name: "", email: "", message: "" });
  };

  const contacts = [
    { icon: "📞", label: "Phone", value: "0748201131", href: "tel:0748201131" },
    { icon: "✉️", label: "Email", value: "samcreativegraphics7@gmail.com", href: "mailto:samcreativegraphics7@gmail.com" },
    { icon: "💬", label: "WhatsApp", value: "0748201131 (Instant Support)", href: "https://wa.me/254748201131" },
    { icon: "💳", label: "MPESA Payments", value: "0743475247 — Samuel Kimiri", href: "#" },
  ];

  const socials = [
    { name: "Facebook", handle: "Sam Creatives", icon: "f", href: "https://facebook.com" },
    { name: "Instagram", handle: "@samcreativegraphics", icon: "📸", href: "https://instagram.com" },
    { name: "TikTok", handle: "@samkim7", icon: "🎵", href: "https://tiktok.com" },
    { name: "LinkedIn", handle: "Samuel Ndung'u Kimiri", icon: "in", href: "https://linkedin.com" },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      {/* Hero */}
      <div className="bg-dark py-16 mb-16">
        <div className="container mx-auto px-6 text-center">
          <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            We&apos;re Here to <span className="text-primary">Help</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions about enrollment, payment, or the LMS? Reach out and we&apos;ll respond within a few hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left: Info */}
          <div>
            <div className="space-y-5 mb-10">
              {contacts.map((c, i) => (
                <a key={i} href={c.href} className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">{c.label}</div>
                    <div className="font-bold text-dark group-hover:text-primary transition-colors">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-dark rounded-2xl p-7">
              <h3 className="font-extrabold text-white mb-5">Follow Us</h3>
              <div className="space-y-3">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm font-bold text-white group-hover:bg-primary transition-all">
                        {s.icon}
                      </span>
                      <div>
                        <div className="font-bold text-white text-sm">{s.name}</div>
                        <div className="text-gray-400 text-xs">{s.handle}</div>
                      </div>
                    </div>
                    <span className="text-primary text-sm">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-extrabold mb-2 text-dark">Send a Message</h3>
              <p className="text-gray-500 text-sm mb-8">We usually respond within 2–4 hours.</p>

              {status === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl mb-6 font-medium text-sm">
                  ✓ {msg}
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6 font-medium text-sm">
                  {msg}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-bold mb-2">Your Name</label>
                  <input
                    required type="text"
                    className="w-full bg-light-gray border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input
                    required type="email"
                    className="w-full bg-light-gray border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Message</label>
                  <textarea
                    required rows={5}
                    className="w-full bg-light-gray border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  disabled={status === "loading"}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">Prefer instant help?</p>
                <a
                  href="https://wa.me/254748201131"
                  className="inline-flex items-center gap-2 mt-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all text-sm"
                  target="_blank" rel="noreferrer"
                >
                  💬 Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
