"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Step = "start" | "login" | "identity" | "contact" | "security" | "ambition" | "success";

const masteryPaths = [
  { id: "ps", label: "Graphic Design", tag: "Design", code: "GD", tone: "from-sky-500 to-blue-600", ring: "border-sky-400 bg-sky-500/15 shadow-sky-500/20" },
  { id: "ai", label: "Branding", tag: "Brand", code: "BR", tone: "from-amber-400 to-orange-500", ring: "border-amber-300 bg-amber-500/15 shadow-amber-500/20" },
  { id: "cc", label: "Video Editing", tag: "Video", code: "VE", tone: "from-rose-500 to-pink-600", ring: "border-rose-300 bg-rose-500/15 shadow-rose-500/20" },
  { id: "sw", label: "Engineering", tag: "Tech", code: "EN", tone: "from-emerald-400 to-teal-600", ring: "border-emerald-300 bg-emerald-500/15 shadow-emerald-500/20" },
];

export default function GamifiedRegistration() {
  const [step, setStep] = useState<Step>("start");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    interest: "",
    avatar: null as string | null,
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<"idle" | "loading" | "error">("idle");
  const [loginError, setLoginError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) return;

        const data = await res.json();
        if (data.success && data.student) {
          setIsLoggedIn(true);
          setFormData({
            name: data.student.name || "",
            email: data.student.email || "",
            phone: data.student.phone || "",
            password: "********",
            interest: data.student.interest || "",
            avatar: data.student.profileImage || data.student.avatar || null,
          });
        }
      } catch (err) {
        console.error("Failed checking auth status:", err);
      }
    }

    checkSession();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Choose a PNG, JPG, WebP, or GIF profile image.");
      event.target.value = "";
      return;
    }

    if (file.size > 700 * 1024) {
      setFormError("Choose a profile image smaller than 700 KB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
      setFormError("");
    };
    reader.onerror = () => setFormError("Could not read that profile image. Try another file.");
    reader.readAsDataURL(file);
  };

  const register = async () => {
    setLoading(true);
    setFormError("");

    try {
      if (isLoggedIn) {
        const res = await fetch("/api/auth/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            profileImage: formData.avatar,
            avatar: formData.avatar,
            interest: formData.interest,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStep("success");
        } else {
          setFormError(data.message || "Failed to update details.");
        }
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          setStep("success");
        } else {
          setFormError(data.message || data.error || "Registration failed.");
        }
      }
    } catch {
      setFormError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = (current: Step) => {
    setFormError("");

    if (current === "start") {
      setStep("identity");
      return;
    }

    if (current === "identity") {
      if (!formData.name.trim()) {
        setFormError("Please enter your name.");
        return;
      }
      setStep("contact");
      return;
    }

    if (current === "contact") {
      if (!formData.email.trim() || !formData.phone.trim()) {
        setFormError("Please enter your email and phone number.");
        return;
      }
      setStep("security");
      return;
    }

    if (current === "security") {
      if (!isLoggedIn && !formData.password) {
        setFormError("Please set a password.");
        return;
      }
      setStep("ambition");
      return;
    }

    if (current === "ambition") {
      if (!formData.interest) {
        setFormError("Please choose a learning path.");
        return;
      }
      void register();
    }
  };

  const renderStep = () => {
    switch (step) {
      case "start":
        return (
          <div className="text-center py-20 animate-fade-in">
            <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-[2rem] bg-primary/15 text-xl font-black text-primary ring-1 ring-primary/25 shadow-2xl shadow-primary/20">
              XP
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to START the Journey?
            </h2>
            <button
              type="button"
              onClick={() => setStep("identity")}
              className="group relative overflow-hidden rounded-[1.6rem] bg-gradient-to-r from-primary via-sky-400 to-emerald-400 px-12 py-6 text-2xl font-black text-white shadow-[0_0_50px_rgba(26,143,227,0.38)] transition-all hover:scale-105"
            >
              <span className="relative z-10">To START the Journey Click here</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
            </button>
            <p className="mt-8 text-gray-400 font-bold uppercase tracking-[0.3em] text-sm">
              Press Start to Begin Your Quest
            </p>
            <div className="mt-8 text-gray-400 font-bold">
              {isLoggedIn ? (
                <div className="flex flex-col items-center gap-2">
                  <span>
                    Welcome back, <span className="text-primary">{formData.name}</span>!
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep("identity")}
                    className="text-primary underline hover:text-primary/80 transition-all text-lg"
                  >
                    Resume Quest & Review Details
                  </button>
                </div>
              ) : (
                <span>
                  Already a member?{" "}
                  <button
                    type="button"
                    onClick={() => setStep("login")}
                    className="text-primary underline hover:text-primary/80 ml-1 transition-all"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>
          </div>
        );

      case "login":
        return (
          <div className="max-w-md mx-auto text-center animate-slide-up">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-sm font-black text-primary ring-1 ring-primary/20">LMS</div>
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back</h3>
            <p className="text-gray-400 mb-8 font-medium">Sign in to resume your SCDS quest</p>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm font-medium" role="alert">
                {loginError}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <input
                required
                type="email"
                aria-label="Email address"
                placeholder="Email Address"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 outline-none focus:border-primary text-white font-bold text-lg transition-all"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.target.value)}
              />
              <input
                required
                type="password"
                aria-label="Password"
                placeholder="Password"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 outline-none focus:border-primary text-white font-bold text-lg transition-all"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
              />
            </div>

            <button
              type="button"
              disabled={loginStatus === "loading"}
              onClick={async () => {
                if (!loginEmail || !loginPassword) {
                  setLoginError("Please enter your details.");
                  return;
                }
                setLoginStatus("loading");
                setLoginError("");
                try {
                  const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    const student = data.student || data.user;
                    if (student) {
                      setIsLoggedIn(true);
                      setFormData({
                        name: student.name || "",
                        email: student.email || "",
                        phone: student.phone || "",
                        password: "********",
                        interest: student.interest || "",
                        avatar: student.profileImage || student.avatar || null,
                      });
                      setStep("identity");
                    }
                  } else {
                    setLoginStatus("error");
                    setLoginError(data.message || data.error || "Login failed.");
                  }
                } catch {
                  setLoginStatus("error");
                  setLoginError("An error occurred during sign in.");
                } finally {
                  setLoginStatus("idle");
                }
              }}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary/95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginStatus === "loading" ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Signing in" />
              ) : "Sign In & Resume Quest"}
            </button>

            <button
              type="button"
              onClick={() => setStep("start")}
              className="mt-6 text-sm text-gray-500 hover:text-white font-bold transition-all"
            >
              Back to Start
            </button>
          </div>
        );

      case "identity":
        return (
          <div className="max-w-md mx-auto text-center animate-slide-up">
            <div className="mb-8 relative inline-block">
              <button
                type="button"
                className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-[2rem] border-4 border-primary bg-gradient-to-br from-dark to-primary/20 text-sm font-black text-primary shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1 hover:opacity-90"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Choose profile photo"
              >
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Selected profile preview" className="w-full h-full object-cover" />
                ) : "Avatar"}
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-primary text-white px-3 py-2 rounded-full text-xs shadow-xl"
              >
                Photo
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" aria-label="Upload profile photo" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Choose Your Identity</h3>
            <p className="text-gray-400 mb-8 font-medium">What should we call you in the LMS?</p>
            <input
              required
              type="text"
              aria-label="Full name"
              placeholder="Your Full Name"
              className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 outline-none focus:border-primary text-white font-bold text-lg mb-6 transition-all"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            />
            <button
              type="button"
              onClick={() => nextStep("identity")}
              className="w-full bg-white text-dark py-5 rounded-2xl font-black text-lg hover:bg-primary hover:text-white transition-all shadow-xl"
            >
              Next Phase
            </button>
          </div>
        );

      case "contact":
        return (
          <div className="max-w-md mx-auto text-center animate-slide-up">
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Establish Connection</h3>
            <p className="text-gray-400 mb-8 font-medium">Where should we send your certificates?</p>
            <div className="space-y-4">
              <input
                required
                type="email"
                aria-label="Email address"
                placeholder="Email Address"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 outline-none focus:border-primary text-white font-bold text-lg transition-all"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              />
              <input
                required
                type="tel"
                aria-label="M-Pesa phone number"
                placeholder="M-Pesa Phone Number"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 outline-none focus:border-primary text-white font-bold text-lg transition-all"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={() => nextStep("contact")}
              className="w-full bg-white text-dark py-5 rounded-2xl font-black text-lg hover:bg-primary hover:text-white transition-all shadow-xl mt-8"
            >
              Sync Channels
            </button>
          </div>
        );

      case "security":
        return (
          <div className="max-w-md mx-auto text-center animate-slide-up">
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Secure the Vault</h3>
            <p className="text-gray-400 mb-8 font-medium">
              {isLoggedIn ? "You are logged in. Your account is already secure." : "Create a strong master key for your portal."}
            </p>
            {!isLoggedIn ? (
              <input
                required
                type="password"
                aria-label="Password"
                placeholder="Strong Password"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-5 outline-none focus:border-primary text-white font-bold text-lg mb-6 transition-all"
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              />
            ) : (
              <div className="w-full bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl p-5 font-bold mb-6">
                Account Authenticated
              </div>
            )}
            <button
              type="button"
              onClick={() => nextStep("security")}
              className="w-full bg-white text-dark py-5 rounded-2xl font-black text-lg hover:bg-primary hover:text-white transition-all shadow-xl"
            >
              {isLoggedIn ? "Continue Quest" : "Lock It In"}
            </button>
          </div>
        );

      case "ambition":
        return (
          <div className="max-w-md mx-auto text-center animate-slide-up">
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Choose Your Mastery Path</h3>
            <p className="text-gray-400 mb-8 font-medium">Which skill are you aiming to master first?</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {masteryPaths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, interest: path.label })}
                  className={`group relative overflow-hidden rounded-2xl border-2 p-4 text-left font-bold shadow-lg transition-all hover:-translate-y-1 ${
                    formData.interest === path.label ? `${path.ring} text-white` : "border-white/10 bg-white/[0.03] text-gray-400 shadow-transparent hover:border-white/25 hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${path.tone}`} />
                  <span className={`mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${path.tone} text-xs font-black text-white shadow-lg transition-transform group-hover:scale-105`}>
                    {path.code}
                  </span>
                  <span className="block text-xs uppercase tracking-widest mb-1">{path.tag}</span>
                  <span className="block text-sm text-white">{path.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => nextStep("ambition")}
              className="flex w-full items-center justify-center gap-3 rounded-[1.4rem] bg-gradient-to-r from-primary via-sky-400 to-emerald-400 py-5 text-lg font-black text-white shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/35 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Creating account" />
              ) : "Initialize Quest!"}
            </button>
          </div>
        );

      case "success":
        return (
          <div className="text-center py-10 animate-scale-up">
            <div className="text-5xl mb-6 font-black text-primary">SCDS</div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Level Up!</h2>
            <p className="text-gray-400 mb-10 text-lg">
              Welcome to SCDS, <span className="text-primary font-bold">{formData.name}</span>. Your student account is now active.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login" className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
                Enter LMS Dashboard
              </Link>
              <Link href="/courses" className="bg-white/10 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                Browse Courses
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="start" className="relative overflow-hidden border-y border-white/5 bg-[#07111f] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(26,143,227,0.28),transparent_28%),radial-gradient(circle_at_82%_25%,rgba(16,185,129,0.18),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(244,114,182,0.12),transparent_30%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto max-w-4xl rounded-[3rem] border border-white/12 bg-white/[0.06] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-3xl md:p-14">
          {step !== "start" && step !== "login" && step !== "success" && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Quest Progress</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {step === "identity" ? "25%" : step === "contact" ? "50%" : step === "security" ? "75%" : "90%"} Complete
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/8 ring-1 ring-white/10">
                <div
                  className="progress-sheen h-full rounded-full bg-gradient-to-r from-primary via-sky-400 to-emerald-400 transition-all duration-500"
                  style={{ width: step === "identity" ? "25%" : step === "contact" ? "50%" : step === "security" ? "75%" : "90%" }}
                />
              </div>
            </div>
          )}
          {formError && (
            <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300" role="alert">
              {formError}
            </div>
          )}
          {renderStep()}
        </div>
      </div>
    </section>
  );
}
