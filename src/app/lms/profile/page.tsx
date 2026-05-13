"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { courses, lessons } from "@/data/courses";

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
  const [progress, setProgress] = useState<any[]>([]);
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

  if (loading || !student) return <div className="pt-40 text-center font-bold text-gray-500">Loading profile...</div>;

  const enrolledCourses = courses.filter((c) => student.enrolledCourses.includes(c.id));
  const totalLessonsDone = progress.reduce((acc, p) => acc + (p.completedLessons?.length || 0), 0);

  return (
    <div className="pt-28 pb-24 bg-[#F8F8F8] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Basic Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-3xl bg-primary/10 overflow-hidden flex items-center justify-center border-4 border-white shadow-xl">
                  {student.profileImage ? (
                    <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-black text-primary">{student.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-dark text-white p-2.5 rounded-xl shadow-lg hover:bg-primary transition-all"
                >
                  📸
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

            <div className="bg-dark rounded-3xl p-6 text-white overflow-hidden relative">
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
          <div className="lg:col-span-2 space-y-8">
            
            {/* Success/Error Message */}
            {message.text && (
              <div className={`p-4 rounded-2xl font-bold text-center animate-bounce ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            {/* Profile Settings */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                <span className="text-primary">⚙️</span> Profile Settings
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                    <input 
                      name="name"
                      defaultValue={student.name}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                    <input 
                      name="phone"
                      defaultValue={student.phone}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium"
                    />
                  </div>
                </div>
                <button 
                  disabled={saving}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Update Profile Info"}
                </button>
              </form>
            </div>

            {/* Courses Progress */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                <span className="text-primary">📈</span> Your Courses
              </h3>
              <div className="space-y-6">
                {enrolledCourses.length > 0 ? enrolledCourses.map(course => {
                  const record = progress.find(p => p.courseId === course.id);
                  const courseLessons = lessons.filter(l => l.courseId === course.id);
                  const completed = record?.completedLessons?.length || 0;
                  const pct = Math.round((completed / courseLessons.length) * 100);
                  return (
                    <div key={course.id} className="group">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-bold text-dark group-hover:text-primary transition-colors">{course.title}</h4>
                          <p className="text-xs text-gray-500">{completed} of {courseLessons.length} lessons completed</p>
                        </div>
                        <Link href={`/lms/${course.id}`} className="text-xs font-bold bg-dark text-white px-4 py-2 rounded-lg hover:bg-primary transition-all">
                          {pct === 100 ? "Review" : pct > 0 ? "Continue" : "Start"}
                        </Link>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000" 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-sm mb-4">You haven't enrolled in any courses yet.</p>
                    <Link href="/courses" className="bg-dark text-white px-6 py-2 rounded-lg text-sm font-bold">
                      Browse Courses
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
               <Link href="/lms" className="text-sm font-bold text-gray-400 hover:text-dark">
                 ← Back to Dashboard
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
