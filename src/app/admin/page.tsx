"use client";
import { useState, useEffect } from "react";
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

interface Enrollment {
  id: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  amount: number;
  phone: string;
  reference: string;
  status: "pending" | "confirmed";
  whatsappConfirmed?: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"students" | "enrollments" | "content">("enrollments");
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (pw?: string) => {
    setLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({ password: pw });
      
      const [sRes, eRes] = await Promise.all([
        fetch("/api/admin/students", { method: "POST", headers, body }),
        fetch("/api/admin/enrollments", { method: "POST", headers, body }),
      ]);
      
      const [sData, eData] = await Promise.all([sRes.json(), eRes.json()]);
      
      if (sData.success) {
        setStudents(sData.data);
        setEnrollments(eData.data);
        setAuthed(true);
        if (pw) setPassword(pw);
      } else if (pw) {
        setError("Incorrect password");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Check for session-based auth on mount
  useEffect(() => {
    fetchData();
  }, []);

  const confirmEnrollment = async (enrollmentId: string) => {
    await fetch("/api/admin/enrollments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, enrollmentId, status: "confirmed" }),
    });
    setEnrollments((prev) => prev.map((e) => e.id === enrollmentId ? { ...e, status: "confirmed" } : e));
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🔐</div>
            <h1 className="text-2xl font-extrabold text-white">Admin Access</h1>
            <p className="text-gray-400 text-sm mt-1">Sam Creative Design School</p>
          </div>
          {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); fetchData(password); }} className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3.5 outline-none focus:border-primary placeholder:text-gray-500"
              required
            />
            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50">
              {loading ? "Verifying..." : "Enter Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingCount = enrollments.filter((e) => e.status === "pending").length;
  const revenue = enrollments.filter((e) => e.status === "confirmed").reduce((s, e) => s + e.amount, 0);

  return (
    <div className="pt-24 pb-24 bg-[#F8F8F8] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
          <div>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-1">Admin Panel</p>
            <h1 className="text-3xl font-extrabold text-dark">School Dashboard</h1>
          </div>
          <Link href="/" className="text-sm text-gray-500 hover:text-primary font-bold">← Back to Website</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Students", value: students.length, icon: "👥", color: "bg-blue-50 text-blue-600" },
            { label: "Total Enrollments", value: enrollments.length, icon: "📋", color: "bg-primary/10 text-primary" },
            { label: "Pending Payments", value: pendingCount, icon: "⏳", color: "bg-yellow-50 text-yellow-600" },
            { label: "Confirmed Revenue", value: `Ksh ${revenue.toLocaleString()}`, icon: "💰", color: "bg-green-50 text-green-600" },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl p-5 ${stat.color}`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-extrabold">{stat.value}</div>
              <div className="text-xs font-medium opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["enrollments", "students", "content"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${tab === t ? "bg-dark text-white" : "bg-white text-gray-500 hover:text-dark border border-gray-200"}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1).replace("Content", " Content")}
            </button>
          ))}
        </div>

        {/* Enrollments Table */}
        {tab === "enrollments" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">Student</th>
                    <th className="px-6 py-4 text-left">Course</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Ref</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enrollments.length === 0 ? (
                    <tr><td colSpan={7} className="text-center py-12 text-gray-400">No enrollments yet</td></tr>
                  ) : enrollments.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-dark">{e.studentName}</div>
                        <div className="text-gray-500 text-xs">{e.studentEmail || e.phone}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-dark">{e.courseName}</td>
                      <td className="px-6 py-4 font-bold text-primary">Ksh {e.amount}</td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-600">{e.reference}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(e.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${e.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {e.status}
                        </span>
                        {e.whatsappConfirmed && (
                          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-[#25D366] text-white rounded-full text-[10px]" title="WhatsApp Confirmation Sent">
                            WA
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {e.status === "pending" && (
                          <button
                            onClick={() => confirmEnrollment(e.id)}
                            className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition-all"
                          >
                            Confirm
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Students Table */}
        {tab === "students" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">Courses</th>
                    <th className="px-6 py-4 text-left">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-12 text-gray-400">No registered students yet</td></tr>
                  ) : students.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs overflow-hidden">
                            {s.profileImage ? (
                              <img src={s.profileImage} alt={s.name} className="w-full h-full object-cover" />
                            ) : (
                              s.name.charAt(0)
                            )}
                          </div>
                          <span className="font-bold text-dark">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{s.email}</td>
                      <td className="px-6 py-4 text-gray-600">{s.phone}</td>
                      <td className="px-6 py-4">
                        <span className="bg-primary/10 text-primary font-bold text-xs px-2 py-1 rounded-full">
                          {s.enrolledCourses.length} enrolled
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Content View */}
        {tab === "content" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-3">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    selectedCourseId === course.id ? "bg-primary text-white border-primary shadow-lg" : "bg-white border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{course.icon}</span>
                  <div>
                    <div className="font-bold">{course.title}</div>
                    <div className={`text-xs ${selectedCourseId === course.id ? "text-white/80" : "text-gray-500"}`}>{course.level}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              {selectedCourseId ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl">{courses.find(c => c.id === selectedCourseId)?.icon}</span>
                    <h2 className="text-2xl font-bold text-dark">{courses.find(c => c.id === selectedCourseId)?.title}</h2>
                  </div>
                  <div className="space-y-6">
                    {lessons.filter(l => l.courseId === selectedCourseId).sort((a, b) => a.order - b.order).map((lesson) => (
                      <div key={lesson.id} className="border border-gray-100 rounded-2xl p-5">
                        <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
                          <span className="text-primary">{lesson.order}.</span> {lesson.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed bg-gray-50 p-4 rounded-xl italic">"{lesson.content}"</p>
                        {lesson.quiz && (
                          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                            <p className="text-xs font-bold text-primary uppercase mb-2">Quiz Preview ({lesson.quiz.questions.length} Qs)</p>
                            <div className="space-y-2">
                              {lesson.quiz.questions.map((q, i) => (
                                <div key={i} className="text-xs text-gray-700">
                                  <span className="font-bold">{i+1}.</span> {q.question}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="font-bold text-xl text-dark">Course Material Review</h3>
                  <p className="text-gray-500">Select a course to view all lessons, notes, and quiz questions.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
