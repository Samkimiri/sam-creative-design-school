"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { courses } from "@/data/courses";

function EnrollForm() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get("course") || "";
  const initialReferralCode = searchParams.get("ref") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    referralCode: initialReferralCode,
    paymentMethod: "mpesa" as "mpesa" | "flutterwave",
    selectedCourses: initialCourse ? [initialCourse] : ([] as string[]),
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "stk" | "success" | "failed">("idle");
  const [ref, setRef] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState("");
  const [stkMessage, setStkMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [referralMessage, setReferralMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.student) {
          setFormData((prev) => ({
            ...prev,
            name: data.student.name || "",
            email: data.student.email || "",
            phone: data.student.phone || "",
          }));
        }
      } catch {
        // Visitors can enroll without being logged in.
      }
    };

    fetchProfile();
  }, []);

  const selectedCourses = courses.filter((course) => formData.selectedCourses.includes(course.id));
  const totalAmount = selectedCourses.reduce((sum, course) => sum + course.price, 0);
  const amountForStatus = paymentAmount || totalAmount;
  const returnedPayment = searchParams.get("payment") || "";
  const returnedMessage = searchParams.get("message") || "";
  const activePaymentLabel =
    formData.paymentMethod === "flutterwave" || returnedPayment.startsWith("flutterwave")
      ? "Flutterwave"
      : "M-Pesa";

  useEffect(() => {
    if (!returnedPayment.startsWith("flutterwave")) return;

    setRef(searchParams.get("reference") || "");
    if (returnedPayment === "flutterwave-success") {
      setStkMessage(returnedMessage || "Flutterwave payment verified.");
      setStatus("success");
      return;
    }

    setErrorMessage(returnedMessage || "Flutterwave payment was not completed.");
    setStatus("failed");
  }, [returnedMessage, returnedPayment, searchParams]);

  const checkPaymentStatus = useCallback(async () => {
    if (!checkoutRequestId) return;

    const res = await fetch("/api/mpesa/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkoutRequestId, reference: ref }),
    });
    const data = await res.json();
    if (data.paid) {
      setStatus("success");
    } else if (data.status === "failed") {
      setErrorMessage(data.resultDesc || "M-Pesa payment was not completed.");
      setStatus("failed");
    } else if (data.resultDesc) {
      setStkMessage(data.resultDesc);
    }
  }, [checkoutRequestId, ref]);

  useEffect(() => {
    if (status !== "stk" || !checkoutRequestId) return;

    const poll = async () => {
      try {
        await checkPaymentStatus();
      } catch {
        // Keep polling while Safaricom confirmation is pending.
      }
    };

    const interval = setInterval(poll, 5000);
    poll();
    return () => clearInterval(interval);
  }, [status, checkoutRequestId, checkPaymentStatus]);

  const toggleCourse = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(id)
        ? prev.selectedCourses.filter((courseId) => courseId !== id)
        : [...prev.selectedCourses, id],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (formData.selectedCourses.length === 0) {
      setErrorMessage("Please select at least one course.");
      setStatus("failed");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    setReferralMessage("");

    try {
      const courseNames = selectedCourses.map((course) => course.title).join(", ");
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod,
          courseId: formData.selectedCourses.join(","),
          courseName: courseNames,
          amount: totalAmount,
          referralCode: formData.referralCode,
        }),
      });

      const data = await res.json();
      if (data.success && data.checkoutUrl) {
        setRef(data.reference);
        setPaymentAmount(Number(data.amount) || totalAmount);
        if (data.referralApplied) setReferralMessage(`Referral applied from ${data.referredByName}. Discount: Ksh ${Number(data.referralDiscount || 0).toLocaleString()}.`);
        window.location.href = data.checkoutUrl;
      } else if (data.success && data.pushSuccess) {
        setRef(data.reference);
        setPaymentAmount(Number(data.amount) || totalAmount);
        if (data.referralApplied) setReferralMessage(`Referral applied from ${data.referredByName}. Discount: Ksh ${Number(data.referralDiscount || 0).toLocaleString()}.`);
        setCheckoutRequestId(data.checkoutRequestId || "");
        setStkMessage(data.message || "M-Pesa prompt sent to your phone.");
        setStatus("stk");
      } else if (data.success) {
        setRef(data.reference);
        setPaymentAmount(Number(data.amount) || totalAmount);
        if (data.referralApplied) setReferralMessage(`Referral applied from ${data.referredByName}. Discount: Ksh ${Number(data.referralDiscount || 0).toLocaleString()}.`);
        setErrorMessage(data.message || "Enrollment saved but M-Pesa prompt was not sent.");
        setStatus("failed");
      } else {
        setErrorMessage(data.message || "Enrollment failed.");
        setStatus("failed");
      }
    } catch {
      setErrorMessage("An error occurred. Please try again.");
      setStatus("failed");
    }
  };

  if (status === "failed") {
    return (
      <div className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-red-200 animate-fade-in">
        <div className="text-center py-4 sm:py-6">
          <div className="text-4xl sm:text-5xl mb-4 animate-pulse text-red-500">!</div>
          <h2 className="text-2xl font-black text-dark mb-3">Payment Not Started</h2>
          <p className="text-gray-600 mb-6" role="alert">{errorMessage}</p>
          {ref && (
            <p className="text-sm text-gray-500 mb-6">
              Reference: <span className="font-bold text-primary">{ref}</span>
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setErrorMessage("");
            }}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (status === "stk") {
    return (
      <div className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl border-4 border-primary relative overflow-hidden animate-fade-in">
        <div className="text-center py-5 sm:py-10">
          <div className="text-4xl sm:text-5xl mb-5 sm:mb-6 animate-pulse font-black text-primary">M-PESA</div>
          <h2 className="text-2xl sm:text-3xl font-black text-dark mb-4">Check Your Phone</h2>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            Safaricom sent an M-Pesa prompt to <span className="font-bold text-primary">{formData.phone}</span>.
          </p>
          {stkMessage && (
            <p className="text-sm text-green-700 bg-green-50 rounded-xl px-4 py-2 mb-6 inline-block font-medium">
              {stkMessage}
            </p>
          )}
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Enter your <span className="font-bold text-dark">M-Pesa PIN</span> to pay:
            <span className="font-bold text-primary block text-3xl mt-2 tracking-tighter">
              Ksh {amountForStatus.toLocaleString()}
            </span>
          </p>
          {referralMessage && (
            <p className="mx-auto mb-5 max-w-md rounded-xl bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
              {referralMessage}
            </p>
          )}

          <div className="bg-primary/5 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-primary/10">
            <div className="flex items-center justify-center gap-3 text-primary font-bold mb-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              Waiting for Safaricom confirmation...
            </div>
            <p className="text-xs text-gray-400">
              This page updates automatically when payment is received. Ref: {ref}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              void checkPaymentStatus();
            }}
            className="w-full bg-dark text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:bg-primary transition-all duration-300 shadow-lg mb-4 active:translate-y-0"
          >
            I have entered my PIN - check status
          </button>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
          >
            Cancel and try again
          </button>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-primary animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 text-xl font-black animate-fade-in">
            OK
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Payment Received for Review</h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
            {formData.name ? (
              <>Thank you, <span className="font-bold text-dark">{formData.name}</span>. Your {activePaymentLabel} payment details are ready to send to WhatsApp so the school can activate your LMS access quickly.</>
            ) : (
              <>Your {activePaymentLabel} payment has been verified. Send the reference to WhatsApp so the school can activate your LMS access quickly.</>
            )}
          </p>

          <div className="bg-light-gray p-5 sm:p-8 rounded-2xl mb-6 sm:mb-8 text-left border-l-4 border-primary animate-fade-in">
            <h3 className="font-bold text-lg mb-4">WhatsApp Activation Message</h3>
            <p className="text-gray-700 mb-4">The button below opens a prepared message with your name, course, reference, amount, and next step.</p>
            <div className="space-y-2">
              <p className="flex justify-between"><span>Reference:</span> <span className="font-bold text-primary">{ref}</span></p>
              {amountForStatus > 0 && (
                <p className="flex justify-between"><span>Total Amount:</span> <span className="font-bold">Ksh {amountForStatus.toLocaleString()}</span></p>
              )}
              {referralMessage && <p className="text-sm font-bold text-green-700">{referralMessage}</p>}
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              try {
                await fetch("/api/enroll", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ reference: ref, whatsappConfirmed: true }),
                });
              } catch {}

              const courseNames = selectedCourses.map((course) => course.title).join(", ");
              const amountText = amountForStatus > 0 ? ` of Ksh ${amountForStatus}` : "";
              const courseText = courseNames ? ` for ${courseNames}` : "";
              const message = `Hi, my name is ${formData.name || "a student"}. I just completed a ${activePaymentLabel} payment${amountText}${courseText}. Reference: ${ref}. Please activate my LMS access and send the next steps.`;
              window.open(`https://wa.me/254743475247?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="inline-block w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:opacity-90 transition-all duration-300 text-center shadow-lg active:translate-y-0"
          >
            Send WhatsApp Confirmation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 transition duration-300 hover:shadow-primary/10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 tracking-tight">Course Enrollment</h2>
      <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="enroll-name" className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-[0.2em]">Full Name</label>
            <input
              id="enroll-name"
              required
              type="text"
              autoComplete="name"
              className="w-full bg-light-gray border-none rounded-xl p-3.5 sm:p-4 outline-none focus:ring-2 focus:ring-primary font-bold transition-all duration-300 focus:-translate-y-0.5 focus:shadow-sm"
              placeholder="e.g., John Kamau"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            />
          </div>
          <div>
            <label htmlFor="enroll-phone" className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-[0.2em]">Phone Number</label>
            <input
              id="enroll-phone"
              required
              type="tel"
              autoComplete="tel"
              pattern="0[17][0-9]{8}"
              className="w-full bg-light-gray border-none rounded-xl p-3.5 sm:p-4 outline-none focus:ring-2 focus:ring-primary font-bold transition-all duration-300 focus:-translate-y-0.5 focus:shadow-sm"
              placeholder="07XXXXXXXX"
              value={formData.phone}
              onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
            />
          </div>
        </div>

        <div>
          <label htmlFor="enroll-email" className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-[0.2em]">Email Address</label>
          <input
            id="enroll-email"
            required={formData.paymentMethod === "flutterwave"}
            type="email"
            autoComplete="email"
            className="w-full bg-light-gray border-none rounded-xl p-3.5 sm:p-4 outline-none focus:ring-2 focus:ring-primary font-bold transition-all duration-300 focus:-translate-y-0.5 focus:shadow-sm"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          />
        </div>

        <div>
          <label htmlFor="enroll-referral" className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-[0.2em]">Referral Code</label>
          <input
            id="enroll-referral"
            type="text"
            inputMode="text"
            autoComplete="off"
            className="w-full bg-light-gray border-none rounded-xl p-3.5 sm:p-4 outline-none focus:ring-2 focus:ring-primary font-bold uppercase transition-all duration-300 focus:-translate-y-0.5 focus:shadow-sm"
            placeholder="Optional student code"
            value={formData.referralCode}
            onChange={(event) => setFormData({ ...formData, referralCode: event.target.value.toUpperCase() })}
          />
          <p className="mt-2 text-xs font-semibold text-gray-500">Valid student referral codes apply a 10% enrollment discount and are tracked for admin review.</p>
        </div>

        <div>
          <p className="block text-xs font-black mb-4 text-gray-400 uppercase tracking-[0.2em]">Payment Method</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: "mpesa", label: "M-Pesa Express", note: "STK Push to your phone" },
              { id: "flutterwave", label: "Flutterwave", note: "Card, mobile money, or bank options" },
            ].map((option) => {
              const selected = formData.paymentMethod === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      paymentMethod: option.id as "mpesa" | "flutterwave",
                    })
                  }
                  className={`rounded-xl border-2 p-3.5 sm:p-4 text-left transition-all duration-300 ${
                    selected
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-gray-100 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <span className="block font-black text-dark text-sm">{option.label}</span>
                  <span className="mt-1 block text-xs font-medium text-gray-500">{option.note}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="block text-xs font-black mb-4 text-gray-400 uppercase tracking-[0.2em]">Select Courses to Join</p>
          <div className="grid grid-cols-1 gap-3">
            {courses.map((course) => {
              const isSelected = formData.selectedCourses.includes(course.id);
              return (
                <button
                  type="button"
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  aria-pressed={isSelected}
                  className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    isSelected ? "scale-[1.01] border-primary bg-primary/5 shadow-md shadow-primary/10" : "border-gray-100 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 text-[9px] font-black ${
                      isSelected ? "bg-primary border-primary text-white" : "border-gray-300"
                    }`}>
                      {isSelected ? "OK" : ""}
                    </span>
                    <span>
                      <span className="block font-bold text-dark text-sm">{course.title}</span>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">{course.duration}</span>
                    </span>
                  </span>
                  <span className="shrink-0 font-black text-primary text-sm">Ksh {course.price.toLocaleString()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sticky bottom-3 z-20 rounded-2xl border border-primary/10 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur md:static md:border-0 md:bg-transparent md:p-0 md:pt-4 md:shadow-none">
          <div className="flex justify-between items-end gap-4 mb-4 sm:mb-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total to Pay</p>
              <p className="text-2xl sm:text-3xl font-black text-dark tracking-tighter">Ksh {totalAmount.toLocaleString()}</p>
              {formData.referralCode.trim() && (
                <p className="mt-1 text-xs font-bold text-green-700">Referral code will be validated before payment.</p>
              )}
            </div>
            <p className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {formData.selectedCourses.length} Course(s) Selected
            </p>
          </div>

          <button
            disabled={status === "submitting" || formData.selectedCourses.length === 0}
            className="w-full bg-primary text-white font-black py-3.5 sm:py-4 rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-primary/40 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 text-base sm:text-lg flex items-center justify-center gap-3"
          >
            {status === "submitting" ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                {formData.paymentMethod === "flutterwave" ? "Opening Checkout..." : "Initializing STK..."}
              </>
            ) : formData.paymentMethod === "flutterwave" ? "Enroll & Pay via Flutterwave" : "Enroll & Pay via M-Pesa"}
          </button>
          <p className="text-[10px] text-center text-gray-400 mt-4 font-medium uppercase tracking-widest">
            Security Verified | {formData.paymentMethod === "flutterwave" ? "Hosted Checkout" : "Instant STK Push"}
          </p>
        </div>
      </form>
    </div>
  );
}

export default function Enroll() {
  return (
    <div className="pt-24 pb-28 md:pt-32 md:pb-24 min-h-screen bg-light-gray">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <header className="mb-6 sm:mb-8 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-primary">Enrollment</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-dark">Join Sam Creative Design School</h1>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <EnrollForm />
        </Suspense>

        <div className="mt-6 sm:mt-8 animate-fade-in p-5 sm:p-6 bg-white/70 rounded-2xl border border-dashed border-gray-300 text-center transition duration-300 hover:border-primary/40 hover:bg-white" style={{ animationDelay: "120ms" }}>
          <h2 className="font-bold mb-2 text-base">Need Help?</h2>
          <p className="text-gray-600 mb-3">If you encounter any issues during enrollment, contact our support team immediately.</p>
          <span className="font-bold text-primary">WhatsApp: 0748201131</span>
        </div>
      </div>
    </div>
  );
}
