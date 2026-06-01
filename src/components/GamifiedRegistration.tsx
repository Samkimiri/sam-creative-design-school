"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Step = "start" | "login" | "identity" | "contact" | "security" | "ambition" | "success";

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

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
    };
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
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter">
              Ready to START the Journey?
            </h2>
            <button
              type="button"
              onClick={() => setStep("identity")}
              className="group relative bg-primary text-white px-12 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-[0_0_50px_rgba(26,143,227,0.4)] overflow-hidden"
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
                className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden bg-dark flex items-center justify-center text-sm font-black text-primary cursor-pointer hover:opacity-80 transition-opacity"
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
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Choose Your Mastery Path</h3>
            <p className="text-gray-400 mb-8 font-medium">Which skill are you aiming to master first?</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { id: "ps", label: "Graphic Design", tag: "Design" },
                { id: "ai", label: "Branding", tag: "Brand" },
                { id: "cc", label: "Video Editing", tag: "Video" },
                { id: "sw", label: "Engineering", tag: "Tech" },
              ].map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, interest: path.label })}
                  className={`p-4 rounded-xl border-2 font-bold transition-all ${
                    formData.interest === path.label ? "border-primary bg-primary/10 text-white" : "border-white/10 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <span className="block text-xs uppercase tracking-widest mb-1">{path.tag}</span>
                  <span className="block text-sm">{path.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => nextStep("ambition")}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary/90 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
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
    <section id="start" className="py-24 bg-dark relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(26,143,227,0.1),transparent)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-3xl">
          {step !== "start" && step !== "login" && step !== "success" && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Quest Progress</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {step === "identity" ? "25%" : step === "contact" ? "50%" : step === "security" ? "75%" : "90%"} Complete
                </span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
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
