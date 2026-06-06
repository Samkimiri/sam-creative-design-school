"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { courses, lessons } from "@/data/courses";
import type { ProgressRecord } from "@/types";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  enrolledCourses: string[];
  createdAt: string;
}

export default function ProfilePage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.success) {
        setStudent(data.student);
        setProgress(data.progress || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    try {
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (res.ok) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
        fetchProfile();
      }
    } catch {
      setMessage({ text: "Failed to update profile", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setSaving(true);
      try {
        const res = await fetch("/api/auth/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileImage: base64 }),
        });
        if (res.ok) {
          setMessage({ text: "Profile picture updated!", type: "success" });
          fetchProfile();
        }
      } catch {
        setMessage({ text: "Failed to upload image", type: "error" });
      } finally {
        setSaving(false);
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!student && !loading) {
    if (typeof window !== "undefined") window.location.href = "/auth/login";
    return null;
  }

  if (loading || !student) return <div className="pt-32 text-center font-bold text-gray-500">Loading profile...</div>;

  const enrolledCourses = courses.filter((c) => student.enrolledCourses.includes(c.id));
  const totalLessonsDone = progress.reduce((acc, p) => acc + (p.completedLessons?.length || 0), 0);

  return (
    <div className="relative isolate pt-24 pb-16 md:pt-28 md:pb-24 bg-[#F8F8F8] min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-white/75" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
          
          {/* Left Column: Avatar & Basic Info */}
          <div className="lg:col-span-1 space-y-5 md:space-y-6">
            <div className="animate-fade-in bg-white rounded-2xl md:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm text-center transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-5 sm:mb-6">
                <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-primary/10 overflow-hidden flex items-center justify-center border-4 border-white shadow-xl">
                  {student.profileImage ? (
                    <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl sm:text-4xl font-black text-primary">{student.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload profile picture"
                  className="absolute -bottom-2 -right-2 bg-dark text-white px-3 py-2 rounded-xl text-xs font-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary active:translate-y-0"
                >
                  Edit
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              <h2 className="text-xl font-black text-dark">{student.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{student.email}</p>
              <div className="bg-primary/5 text-primary text-[10px] uppercase font-black py-1.5 px-3 rounded-full inline-block tracking-widest">
                Student Portal
              </div>
            </div>

            <div className="animate-fade-in bg-dark rounded-2xl md:rounded-3xl p-5 sm:p-6 text-white overflow-hidden relative transition duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ animationDelay: "80ms" }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              <h3 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 relative z-10">Study Stats</h3>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Courses</span>
                  <span className="font-bold">{enrolledCourses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Lessons Done</span>
                  <span className="font-bold">{totalLessonsDone}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Joined</span>
                  <span className="font-bold text-xs">{new Date(student.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Progress */}
          <div className="lg:col-span-2 space-y-5 md:space-y-8">
            
            {/* Success/Error Message */}
            {message.text && (
              <div className={`animate-fade-in p-4 rounded-2xl font-bold text-center shadow-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            {/* Profile Settings */}
            <div className="animate-fade-in bg-white rounded-2xl md:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm transition duration-300 hover:shadow-md" style={{ animationDelay: "120ms" }}>
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-5 sm:mb-6 flex items-center gap-2">
                Profile Settings
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                    <input 
                      name="name"
                      defaultValue={student.name}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium transition-all duration-300 focus:-translate-y-0.5 focus:shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                    <input 
                      name="phone"
                      defaultValue={student.phone}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium transition-all duration-300 focus:-translate-y-0.5 focus:shadow-sm"
                    />
                  </div>
                </div>
                <button 
                  disabled={saving}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:-translate-y-0.5 hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {saving ? "Saving Changes..." : "Update Profile Info"}
                </button>
              </form>
            </div>

            {/* Courses Progress */}
            <div className="animate-fade-in bg-white rounded-2xl md:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm transition duration-300 hover:shadow-md" style={{ animationDelay: "180ms" }}>
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-5 sm:mb-6 flex items-center gap-2">
                Your Courses
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {enrolledCourses.length > 0 ? enrolledCourses.map(course => {
                  const record = progress.find(p => p.courseId === course.id);
                  const courseLessons = lessons.filter(l => l.courseId === course.id);
                  const completed = record?.completedLessons?.length || 0;
                  const pct = Math.round((completed / courseLessons.length) * 100);
                  return (
                    <div key={course.id} className="group rounded-2xl p-3 -mx-3 transition duration-300 hover:-translate-y-0.5 hover:bg-gray-50">
                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-3">
                        <div>
                          <h4 className="font-bold text-dark group-hover:text-primary transition-colors">{course.title}</h4>
                          <p className="text-xs text-gray-500">{completed} of {courseLessons.length} lessons completed</p>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:justify-end">
                          {pct === 100 && (
                            <a href={`/api/certificates/${course.id}`} className="text-xs font-bold bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg hover:-translate-y-0.5 hover:bg-green-100 transition-all duration-300">
                              Certificate
                            </a>
                          )}
                          <Link href={`/lms/${course.id}`} className="text-xs font-bold bg-dark text-white px-4 py-2 rounded-lg hover:-translate-y-0.5 hover:bg-primary transition-all duration-300">
                            {pct === 100 ? "Review" : pct > 0 ? "Continue" : "Start"}
                          </Link>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-sm mb-4">You haven&apos;t enrolled in any courses yet.</p>
                    <Link href="/courses" className="bg-dark text-white px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary">
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
               <Link href="/lms" className="text-sm font-bold text-gray-400 hover:text-dark">
                 Back to Dashboard
               </Link>
               <button 
                 onClick={async () => {
                   await fetch("/api/auth/logout", { method: "POST" });
                   window.location.href = "/";
                 }}
                 className="text-sm font-bold text-red-400 hover:text-red-600"
               >
                 Sign Out
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
