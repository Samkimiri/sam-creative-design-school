"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { courses } from "@/data/courses";

function EnrollForm() {
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get("course") || "";
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    selectedCourses: initialCourse ? [initialCourse] : [] as string[],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.student) {
          setFormData(prev => ({
            ...prev,
            name: data.student.name || "",
            phone: data.student.phone || "",
          }));
        }
      } catch (err) {
        // Not logged in or error, silent fail
      }
    };
    fetchProfile();
  }, []);
  
  const [status, setStatus] = useState<"idle" | "submitting" | "stk" | "success" | "failed">("idle");
  const [ref, setRef] = useState("");
  const [checkoutRequestId, setCheckoutRequestId] = useState("");
  const [stkMessage, setStkMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkPaymentStatus = async () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedCourses.length === 0) {
      alert("Please select at least one course");
      return;
    }
    setStatus("submitting");
    
    try {
      const selectedCoursesData = courses.filter(c => formData.selectedCourses.includes(c.id));
      const totalAmount = selectedCoursesData.reduce((sum, c) => sum + c.price, 0);
      const courseNames = selectedCoursesData.map(c => c.title).join(", ");
      
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          courseId: formData.selectedCourses.join(","), // Send as comma separated
          courseName: courseNames,
          amount: totalAmount
        }),
      });
      
      const data = await res.json();
      if (data.success && data.pushSuccess) {
        setRef(data.reference);
        setCheckoutRequestId(data.checkoutRequestId || "");
        setStkMessage(data.message || "M-Pesa prompt sent to your phone.");
        setStatus("stk");
      } else if (data.success && !data.pushSuccess) {
        setRef(data.reference);
        setErrorMessage(data.message || "Enrollment saved but M-Pesa prompt was not sent.");
        setStatus("failed");
      } else {
        setErrorMessage(data.message || "Enrollment failed");
        setStatus("failed");
      }
    } catch {
      setErrorMessage("An error occurred. Please try again.");
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (status !== "stk" || !checkoutRequestId) return;

    const poll = async () => {
      try {
        await checkPaymentStatus();
      } catch {
        // keep polling
      }
    };

    const interval = setInterval(poll, 5000);
    poll();
    return () => clearInterval(interval);
  }, [status, checkoutRequestId, ref]);

  const toggleCourse = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(id)
        ? prev.selectedCourses.filter(cid => cid !== id)
        : [...prev.selectedCourses, id]
    }));
  };

  const totalAmount = courses
    .filter((c) => formData.selectedCourses.includes(c.id))
    .reduce((s, c) => s + c.price, 0);

  if (status === "failed") {
    return (
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-red-200 animate-fade-in">
        <div className="text-center py-6">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-black text-dark mb-3">Payment Not Started</h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          {ref && (
            <p className="text-sm text-gray-500 mb-6">
              Reference: <span className="font-bold text-primary">{ref}</span>
            </p>
          )}
          <button
            onClick={() => { setStatus("idle"); setErrorMessage(""); }}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (status === "stk") {
    return (
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-primary relative overflow-hidden animate-fade-in">
        <div className="text-center py-10">
          <div className="text-6xl mb-6 animate-bounce">📲</div>
          <h2 className="text-3xl font-black text-dark mb-4">Check Your Phone</h2>
          <p className="text-gray-600 mb-4 max-w-md mx-auto">
            Safaricom sent an M-Pesa prompt to{" "}
            <span className="font-bold text-primary">{formData.phone}</span>.
          </p>
          {stkMessage && (
            <p className="text-sm text-green-700 bg-green-50 rounded-xl px-4 py-2 mb-6 inline-block font-medium">
              {stkMessage}
            </p>
          )}
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Enter your <span className="font-bold text-dark">M-Pesa PIN</span> to pay:
            <span className="font-bold text-primary block text-3xl mt-2 tracking-tighter">
              Ksh {totalAmount.toLocaleString()}
            </span>
          </p>
          
          <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/10">
            <div className="flex items-center justify-center gap-3 text-primary font-bold mb-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              Waiting for Safaricom confirmation…
            </div>
            <p className="text-xs text-gray-400">
              This page updates automatically when payment is received. Ref: {ref}
            </p>
          </div>

          <button 
            onClick={() => {
              void checkPaymentStatus();
            }}
            className="w-full bg-dark text-white font-bold py-4 rounded-xl hover:bg-primary transition-all shadow-lg mb-4"
          >
            I have entered my PIN - check status
          </button>
          
          <button 
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
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-primary animate-fade-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h2 className="text-3xl font-bold mb-4">Payment Received for Review</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you, <span className="font-bold text-dark">{formData.name}</span>. Your payment details are ready to send to WhatsApp so the school can activate your LMS access quickly.
          </p>
          
          <div className="bg-light-gray p-8 rounded-2xl mb-8 text-left border-l-4 border-primary">
            <h3 className="font-bold text-lg mb-4">WhatsApp Activation Message</h3>
            <p className="text-gray-700 mb-4">The button below opens a prepared message with your name, course, reference, amount, and next step.</p>
            <div className="space-y-2">
              <p className="flex justify-between"><span>Reference:</span> <span className="font-bold text-primary">{ref}</span></p>
              <p className="flex justify-between"><span>Total Amount:</span> <span className="font-bold">Ksh {courses.filter(c => formData.selectedCourses.includes(c.id)).reduce((s, c) => s + c.price, 0).toLocaleString()}</span></p>
            </div>
          </div>
          
          <button
            onClick={async () => {
              try {
                await fetch("/api/enroll", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ reference: ref, whatsappConfirmed: true }),
                });
              } catch (e) {}
              
              const selected = courses.filter(c => formData.selectedCourses.includes(c.id));
              const courseNames = selected.map((course) => course.title).join(", ");
              const total = selected.reduce((s, c) => s + c.price, 0);
              const message = `Hi, my name is ${formData.name}. I just authorized an STK payment of Ksh ${total} for ${courseNames}. Reference: ${ref}. Please activate my LMS access and send the next steps.`;
              window.open(`https://wa.me/254743475247?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="inline-block w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-center shadow-lg"
          >
            Send WhatsApp Confirmation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-bold mb-8 tracking-tight">Course Enrollment</h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-[0.2em]">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-light-gray border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary font-bold transition-all" 
              placeholder="e.g., John Kamau"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-black mb-2 text-gray-400 uppercase tracking-[0.2em]">MPESA Phone</label>
            <input 
              required
              type="tel" 
              className="w-full bg-light-gray border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary font-bold transition-all" 
              placeholder="07XXXXXXXX"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black mb-4 text-gray-400 uppercase tracking-[0.2em]">Select Courses to Join</label>
          <div className="grid grid-cols-1 gap-3">
            {courses.map(course => {
              const isSelected = formData.selectedCourses.includes(course.id);
              return (
                <button
                  type="button"
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected ? "border-primary bg-primary/5 shadow-md" : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      isSelected ? "bg-primary border-primary text-white" : "border-gray-300"
                    }`}>
                      {isSelected && <span className="text-xs font-black">✓</span>}
                    </div>
                    <div>
                      <div className="font-bold text-dark text-sm">{course.title}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{course.duration}</div>
                    </div>
                  </div>
                  <div className="font-black text-primary text-sm">Ksh {course.price.toLocaleString()}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total to Pay</p>
              <p className="text-3xl font-black text-dark tracking-tighter">
                Ksh {courses.filter(c => formData.selectedCourses.includes(c.id)).reduce((s, c) => s + c.price, 0).toLocaleString()}
              </p>
            </div>
            <p className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {formData.selectedCourses.length} Course(s) Selected
            </p>
          </div>
          
          <button 
            disabled={status === "submitting" || formData.selectedCourses.length === 0}
            className="w-full bg-primary text-white font-black py-4 rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 text-lg flex items-center justify-center gap-3"
          >
            {status === "submitting" ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Initializing STK...
              </>
            ) : "Enroll & Pay via MPESA"}
          </button>
          <p className="text-[10px] text-center text-gray-400 mt-4 font-medium uppercase tracking-widest">
            Security Verified • Instant STK Push
          </p>
        </div>
      </form>
    </div>
  );
}

export default function Enroll() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-light-gray">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold mb-6">Simple 4-Step <span className="text-primary">Enrollment</span></h1>
            
            <div className="space-y-12 mt-12">
              {[
                { step: 1, title: "Choose Course", desc: "Select the training program that fits your goals." },
                { step: 2, title: "Fill Details", desc: "Provide your name and phone number for enrollment." },
                { step: 3, title: "Pay via M-Pesa", desc: "Enter your PIN when the Safaricom prompt appears on your phone." },
                { step: 4, title: "Get Access", desc: "Receive login details for the LMS and start learning." }
              ].map(item => (
                <div key={item.step} className="flex gap-6">
                  <div className="w-12 h-12 bg-dark text-white rounded-full flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 p-8 bg-white/50 rounded-2xl border border-dashed border-gray-300">
              <h5 className="font-bold mb-4">Need Help?</h5>
              <p className="text-gray-600 mb-4">If you encounter any issues during enrollment, contact our support team immediately.</p>
              <span className="font-bold text-primary">WhatsApp: 0748201131</span>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <Suspense fallback={<div>Loading...</div>}>
              <EnrollForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
