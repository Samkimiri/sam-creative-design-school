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
  
  const [status, setStatus] = useState<"idle" | "submitting" | "stk" | "success">("idle");
  const [ref, setRef] = useState("");

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
      if (data.success) {
        setRef(data.reference);
        setStatus("stk");
      } else {
        alert(data.message || "Enrollment failed");
        setStatus("idle");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
      setStatus("idle");
    }
  };

  const toggleCourse = (id: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(id)
        ? prev.selectedCourses.filter(cid => cid !== id)
        : [...prev.selectedCourses, id]
    }));
  };

  if (status === "stk") {
    return (
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-primary relative overflow-hidden animate-fade-in">
        <div className="text-center py-10">
          <div className="text-6xl mb-6 animate-bounce">📲</div>
          <h2 className="text-3xl font-black text-dark mb-4">STK Push Sent!</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Please check your phone (<span className="font-bold text-primary">{formData.phone}</span>). 
            Enter your <span className="font-bold text-dark">MPESA PIN</span> to authorize the payment of:
            <span className="font-bold text-primary block text-3xl mt-2 tracking-tighter">
              Ksh {courses.filter(c => formData.selectedCourses.includes(c.id)).reduce((s, c) => s + c.price, 0).toLocaleString()}
            </span>
          </p>
          
          <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/10">
            <div className="flex items-center justify-center gap-3 text-primary font-bold mb-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              Waiting for Safaricom Confirmation...
            </div>
            <p className="text-xs text-gray-400">Do not close this page until the process is complete.</p>
          </div>

          <button 
            onClick={() => setStatus("success")}
            className="w-full bg-dark text-white font-bold py-4 rounded-xl hover:bg-primary transition-all shadow-lg mb-4"
          >
            I have entered my PIN
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
          <h2 className="text-3xl font-bold mb-4">Enrollment Initiated!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you, <span className="font-bold text-dark">{formData.name}</span>. Your enrollment for <span className="font-bold text-dark">{formData.selectedCourses.length} courses</span> is being processed.
          </p>
          
          <div className="bg-light-gray p-8 rounded-2xl mb-8 text-left border-l-4 border-primary">
            <h3 className="font-bold text-lg mb-4">Payment Verification</h3>
            <p className="text-gray-700 mb-4">For faster activation, please confirm via WhatsApp:</p>
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
              
              window.open(`https://wa.me/254743475247?text=Hi, my name is ${formData.name}. I just authorized an STK payment of Ksh ${courses.filter(c => formData.selectedCourses.includes(c.id)).reduce((s, c) => s + c.price, 0)} with Reference ${ref}.`, '_blank');
            }}
            className="inline-block w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-center shadow-lg"
          >
            Confirm via WhatsApp
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
                { step: 3, title: "Pay via MPESA", desc: "Use Send Money to 0743475247 (Samuel Kimiri)." },
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
