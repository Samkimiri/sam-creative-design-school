"use client";

import { Suspense, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { courses as fallbackCourses, type Course } from "@/data/courses";

function EnrollForm() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get("course") || "";
  const initialReferralCode = searchParams.get("ref") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    referralCode: initialReferralCode,
    promoCode: "",
    paymentMethod: "mpesa" as const,
    selectedCourses: initialCourse ? [initialCourse] : ([] as string[]),
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failed">("idle");
  const [ref, setRef] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    paymentLabel: "Buy Goods Till",
    paymentNumber: "9322260",
    recipientName: "Samuel Kimiri",
  });
  const [referralMessage, setReferralMessage] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);

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

    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data?.courses)) setCourses(data.data.courses);
      })
      .catch(() => undefined);
  }, []);

  const selectedCourses = courses.filter((course) => formData.selectedCourses.includes(course.id));
  const totalAmount = selectedCourses.reduce((sum, course) => sum + course.price, 0);
  const amountForStatus = paymentAmount || totalAmount;
  const activePaymentLabel = "M-Pesa";

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
    setPromoMessage("");

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
          promoCode: formData.promoCode,
        }),
      });

      const data = await res.json();
      if (data.success && data.reviewPending) {
        setRef(data.reference);
        setPaymentAmount(Number(data.amount) || totalAmount);
        setPaymentDetails({
          paymentLabel: data.paymentLabel || "Buy Goods Till",
          paymentNumber: data.paymentNumber || "9322260",
          recipientName: data.recipientName || "Samuel Kimiri",
        });
        if (data.referralApplied) setReferralMessage(`Referral applied from ${data.referredByName}. Discount: Ksh ${Number(data.referralDiscount || 0).toLocaleString()}.`);
        if (data.promoApplied) setPromoMessage(`${data.promoDescription || "Promo code"} applied. Discount: Ksh ${Number(data.promoDiscount || 0).toLocaleString()}.`);
        if (!data.promoApplied && data.promoMessage) setPromoMessage(data.promoMessage);
        setStatus("success");
      } else if (data.success) {
        setRef(data.reference);
        setPaymentAmount(Number(data.amount) || totalAmount);
        if (data.referralApplied) setReferralMessage(`Referral applied from ${data.referredByName}. Discount: Ksh ${Number(data.referralDiscount || 0).toLocaleString()}.`);
        if (data.promoApplied) setPromoMessage(`${data.promoDescription || "Promo code"} applied. Discount: Ksh ${Number(data.promoDiscount || 0).toLocaleString()}.`);
        if (!data.promoApplied && data.promoMessage) setPromoMessage(data.promoMessage);
        setErrorMessage(data.message || "Enrollment could not be submitted for admin review.");
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
      <div className="motion-scale bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-red-200">
        <div className="text-center py-4 sm:py-6">
          <div className="text-4xl sm:text-5xl mb-4 animate-pulse text-red-500">!</div>
          <h2 className="text-2xl font-black text-dark mb-3">Enrollment Not Submitted</h2>
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
            className="premium-button w-full bg-primary text-white font-bold py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="motion-scale bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-primary">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 text-xl font-black animate-fade-in">
            OK
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Enrollment Sent to Admin</h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
            {formData.name ? (
              <>Thank you, <span className="font-bold text-dark">{formData.name}</span>. Your enrollment has been prioritized in the admin dashboard for {activePaymentLabel} payment confirmation.</>
            ) : (
              <>Your enrollment has been prioritized in the admin dashboard for {activePaymentLabel} payment confirmation.</>
            )}
          </p>

          <div className="bg-light-gray p-5 sm:p-8 rounded-2xl mb-6 sm:mb-8 text-left border-l-4 border-primary animate-fade-in">
            <h3 className="font-bold text-lg mb-4">Admin Approval Pending</h3>
            <p className="text-gray-700 mb-4">Pay to the Till below if you have not already paid. Your LMS access unlocks after admin confirms the payment.</p>
            <div className="space-y-2">
              <p className="flex justify-between"><span>Reference:</span> <span className="font-bold text-primary">{ref}</span></p>
              <p className="flex justify-between"><span>{paymentDetails.paymentLabel}:</span> <span className="font-bold">{paymentDetails.paymentNumber}</span></p>
              <p className="flex justify-between"><span>Recipient:</span> <span className="font-bold">{paymentDetails.recipientName}</span></p>
              {amountForStatus > 0 && (
                <p className="flex justify-between"><span>Total Amount:</span> <span className="font-bold">Ksh {amountForStatus.toLocaleString()}</span></p>
              )}
              <p className="flex justify-between"><span>Approval:</span> <span className="font-bold text-amber-700">Waiting for admin</span></p>
              {referralMessage && <p className="text-sm font-bold text-green-700">{referralMessage}</p>}
              {promoMessage && <p className="text-sm font-bold text-blue-700">{promoMessage}</p>}
            </div>
          </div>

          <Link
            href="/lms"
            className="premium-button inline-block w-full bg-primary text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:bg-primary/90 transition-all duration-300 text-center shadow-lg active:translate-y-0"
          >
            Go to LMS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-card bg-white p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 transition duration-300 hover:shadow-primary/10" data-reveal>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 tracking-tight">Course Enrollment</h2>
      <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
        <div className="motion-soft motion-delay-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

        <div className="motion-soft motion-delay-2">
          <label htmlFor="enroll-email" className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-[0.2em]">Email Address</label>
          <input
            id="enroll-email"
            type="email"
            autoComplete="email"
            className="w-full bg-light-gray border-none rounded-xl p-3.5 sm:p-4 outline-none focus:ring-2 focus:ring-primary font-bold transition-all duration-300 focus:-translate-y-0.5 focus:shadow-sm"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
          />
        </div>

        <div className="motion-soft motion-delay-3">
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

        <div className="motion-soft motion-delay-4">
          <label htmlFor="enroll-promo" className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-[0.2em]">Promo Code</label>
          <input
            id="enroll-promo"
            type="text"
            inputMode="text"
            autoComplete="off"
            className="w-full bg-light-gray border-none rounded-xl p-3.5 sm:p-4 outline-none focus:ring-2 focus:ring-primary font-bold uppercase transition-all duration-300 focus:-translate-y-0.5 focus:shadow-sm"
            placeholder="Optional discount code"
            value={formData.promoCode}
            onChange={(event) => setFormData({ ...formData, promoCode: event.target.value.toUpperCase() })}
          />
          <p className="mt-2 text-xs font-semibold text-gray-500">Promo codes are checked before payment and may apply to selected courses only.</p>
        </div>

        <div className="motion-soft motion-delay-5">
          <p className="block text-xs font-black mb-4 text-gray-400 uppercase tracking-[0.2em]">Payment Method</p>
          <div className="rounded-2xl border-2 border-primary bg-primary/5 p-4 text-left shadow-md shadow-primary/10">
            <span className="block font-black text-dark text-sm">M-Pesa Till Review</span>
            <span className="mt-1 block text-xs font-medium text-gray-500">Pay to the Till, submit this form, and admin will confirm payment before unlocking LMS access.</span>
          </div>
        </div>

        <div className="motion-soft rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">M-Pesa Till</p>
              <h3 className="mt-1 text-lg font-black text-dark">Till 9322260</h3>
              <p className="mt-2 text-sm font-semibold text-gray-600">
                Pay the selected course total to this Till, then submit this form so admin can confirm and approve your LMS access.
              </p>
            </div>
            <div className="rounded-xl bg-white px-4 py-3 text-sm shadow-sm">
              <p className="font-black text-dark">Buy Goods and Services</p>
              <p className="text-xs font-bold text-gray-500">Recipient: Samuel Kimiri</p>
            </div>
          </div>
        </div>

        <div className="motion-soft">
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
                  className={`interactive-lift flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-300 text-left ${
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

        <div className="motion-soft sticky bottom-3 z-20 rounded-2xl border border-primary/10 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur md:static md:border-0 md:bg-transparent md:p-0 md:pt-4 md:shadow-none">
          <div className="flex justify-between items-end gap-4 mb-4 sm:mb-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total to Pay</p>
              <p className="text-2xl sm:text-3xl font-black text-dark tracking-tighter">Ksh {totalAmount.toLocaleString()}</p>
              {formData.referralCode.trim() && (
                <p className="mt-1 text-xs font-bold text-green-700">Referral code will be validated before payment.</p>
              )}
              {formData.promoCode.trim() && (
                <p className="mt-1 text-xs font-bold text-blue-700">Promo code will be validated before payment.</p>
              )}
            </div>
            <p className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {formData.selectedCourses.length} Course(s) Selected
            </p>
          </div>

          <button
            disabled={status === "submitting" || formData.selectedCourses.length === 0}
            className="premium-button w-full bg-primary text-white font-black py-3.5 sm:py-4 rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-primary/40 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 text-base sm:text-lg flex items-center justify-center gap-3"
          >
            {status === "submitting" ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                Sending to Admin Review...
              </>
            ) : "Submit for Admin Approval"}
          </button>
          <p className="text-[10px] text-center text-gray-400 mt-4 font-medium uppercase tracking-widest">
            M-Pesa Till payment | Priority admin approval
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
        <header className="mb-6 sm:mb-8 text-center" data-reveal style={{ "--reveal-delay": "80ms" } as CSSProperties}>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-primary">Enrollment</p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-dark">Join Sam Creative Design School</h1>
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <EnrollForm />
        </Suspense>

        <div className="premium-card mt-6 sm:mt-8 p-5 sm:p-6 bg-white/70 rounded-2xl border border-dashed border-gray-300 text-center transition duration-300 hover:border-primary/40 hover:bg-white" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <h2 className="font-bold mb-2 text-base">Need Help?</h2>
          <p className="text-gray-600 mb-3">If you encounter any issues during enrollment, contact our support team immediately.</p>
          <span className="font-bold text-primary">WhatsApp: 0748201131</span>
        </div>
      </div>
    </div>
  );
}
