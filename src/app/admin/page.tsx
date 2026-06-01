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

interface VisitorSession {
  id: string;
  visitorId: string;
  sessionId: string;
  firstSeen: string;
  lastSeen: string;
  pageViews: number;
  engagements: number;
  landingPage: string;
  lastPage: string;
  pages: string[];
  referrer: string;
  device: string;
  browser: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
}

interface AnalyticsEvent {
  id: string;
  type: string;
  path: string;
  label?: string;
  device?: string;
  browser?: string;
  userName?: string;
  userEmail?: string;
  createdAt: string;
}

interface AnalyticsSummary {
  uniqueVisitors: number;
  totalSessions: number;
  todayVisitors: number;
  todaySessions: number;
  pageViews: number;
  engagements: number;
  topPages: { path: string; count: number }[];
  topClicks: { label: string; count: number }[];
}

interface AdminReview {
  id: string;
  name: string;
  role?: string;
  rating: number;
  text: string;
  approved?: boolean;
  createdAt: string;
}

interface AdminProject {
  id: string;
  studentName: string;
  courseName: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface AdminAssignment {
  id: string;
  studentName: string;
  courseName: string;
  lessonTitle: string;
  fileUrl?: string;
  notes?: string;
  status: "submitted" | "reviewed" | "revision";
  feedback?: string;
  createdAt: string;
}

type AdminTab = "analytics" | "enrollments" | "students" | "reviews" | "projects" | "assignments" | "content";

type AdminResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  summary?: AnalyticsSummary;
  sessions?: VisitorSession[];
  events?: AnalyticsEvent[];
};

type SectionLoad<T> =
  | { ok: true; status: number; data: AdminResponse<T> }
  | { ok: false; status: number; message: string };

const adminTabs: AdminTab[] = ["analytics", "enrollments", "students", "reviews", "projects", "assignments", "content"];

const statusClass = {
  approved: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  submitted: "bg-blue-50 text-blue-700 border-blue-200",
  reviewed: "bg-green-50 text-green-700 border-green-200",
  revision: "bg-yellow-50 text-yellow-800 border-yellow-200",
};

const adminCardMotion = "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:-translate-y-0.5 hover:shadow-md";
const adminPanelMotion = "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out hover:-translate-y-0.5 hover:shadow-md";
const adminRowMotion = "motion-safe:transition-colors motion-safe:duration-150 hover:bg-gray-50";
const adminActionMotion = "motion-safe:transition-all motion-safe:duration-150 motion-safe:ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const adminTabMotion = "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:-translate-y-px active:translate-y-0";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<AdminTab>("analytics");
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [assignments, setAssignments] = useState<AdminAssignment[]>([]);
  const [visitorSessions, setVisitorSessions] = useState<VisitorSession[]>([]);
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingAction, setPendingAction] = useState("");

  const fetchData = async (pw?: string) => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({ password: pw });

      const loadSection = async <T,>(url: string): Promise<SectionLoad<T>> => {
        const res = await fetch(url, { method: "POST", headers, body });
        const data = await res.json().catch(() => ({ success: false, message: "Invalid server response" })) as AdminResponse<T>;
        if (!res.ok || !data.success) {
          return { ok: false, status: res.status, message: data.message || "Could not load dashboard data" };
        }
        return { ok: true, status: res.status, data };
      };

      const [sData, eData, aData, rData, pData, asData] = await Promise.all([
        loadSection<Student[]>("/api/admin/students"),
        loadSection<Enrollment[]>("/api/admin/enrollments"),
        loadSection<never>("/api/admin/analytics"),
        loadSection<AdminReview[]>("/api/admin/reviews"),
        loadSection<AdminProject[]>("/api/admin/projects"),
        loadSection<AdminAssignment[]>("/api/admin/assignments"),
      ]);

      const results = [sData, eData, aData, rData, pData, asData];
      const authorized = results.some((result) => result.ok);

      if (authorized) {
        if (sData.ok) setStudents(Array.isArray(sData.data.data) ? sData.data.data : []);
        if (eData.ok) setEnrollments(Array.isArray(eData.data.data) ? eData.data.data : []);
        if (aData.ok) {
          setVisitorSessions(Array.isArray(aData.data.sessions) ? aData.data.sessions : []);
          setAnalyticsEvents(Array.isArray(aData.data.events) ? aData.data.events : []);
          setAnalyticsSummary(aData.data.summary ?? null);
        }
        if (rData.ok) setReviews(Array.isArray(rData.data.data) ? rData.data.data : []);
        if (pData.ok) setProjects(Array.isArray(pData.data.data) ? pData.data.data : []);
        if (asData.ok) setAssignments(Array.isArray(asData.data.data) ? asData.data.data : []);
        setAuthed(true);
        if (pw) setPassword(pw);
        const failedSections = results.filter((result) => !result.ok && result.status !== 401).length;
        if (failedSections > 0) {
          setNotice(`${failedSections} dashboard section${failedSections === 1 ? "" : "s"} could not load. Try refreshing.`);
        }
      } else if (pw) {
        setError("Incorrect password.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not load dashboard data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check for session-based auth on mount
  useEffect(() => {
    fetchData();
  }, []);

  const confirmEnrollment = async (enrollmentId: string) => {
    await runMutation<Enrollment>(
      `enrollment-${enrollmentId}`,
      "/api/admin/enrollments",
      { password, enrollmentId, status: "confirmed" },
      (updated) => {
        setEnrollments((prev) => prev.map((e) => e.id === enrollmentId ? { ...e, ...updated } : e));
        void fetchData(password);
      }
    );
  };

  const setReviewApproval = async (id: string, approved: boolean) => {
    await runMutation<AdminReview>(
      `review-${id}`,
      "/api/admin/reviews",
      { password, id, approved },
      (updated) => setReviews((prev) => prev.map((review) => review.id === id ? { ...review, ...updated } : review))
    );
  };

  const deleteReview = async (id: string, name: string) => {
    if (!window.confirm(`Delete ${name}'s review permanently? This removes it from the public reviews too.`)) return;
    await runMutation<AdminReview>(
      `review-delete-${id}`,
      "/api/admin/reviews",
      { password, id },
      () => setReviews((prev) => prev.filter((review) => review.id !== id)),
      "DELETE"
    );
  };

  const setProjectStatus = async (id: string, status: AdminProject["status"]) => {
    await runMutation<AdminProject>(
      `project-${id}`,
      "/api/admin/projects",
      { password, id, status },
      (updated) => setProjects((prev) => prev.map((project) => project.id === id ? { ...project, ...updated } : project))
    );
  };

  const deleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}" permanently? This removes it from the gallery and student project lists.`)) return;
    await runMutation<AdminProject>(
      `project-delete-${id}`,
      "/api/admin/projects",
      { password, id },
      () => setProjects((prev) => prev.filter((project) => project.id !== id)),
      "DELETE"
    );
  };

  const markAssignment = async (id: string, status: "reviewed" | "revision") => {
    const feedback = window.prompt("Feedback for the student?") || "";
    await runMutation<AdminAssignment>(
      `assignment-${id}`,
      "/api/admin/assignments",
      { password, id, status, feedback },
      (updated) => setAssignments((prev) => prev.map((item) => item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteAssignment = async (id: string, studentName: string) => {
    if (!window.confirm(`Delete ${studentName}'s assignment permanently? This removes it from the student's assignment records too.`)) return;
    await runMutation<AdminAssignment>(
      `assignment-delete-${id}`,
      "/api/admin/assignments",
      { password, id },
      () => setAssignments((prev) => prev.filter((assignment) => assignment.id !== id)),
      "DELETE"
    );
  };

  const runMutation = async <T,>(
    actionKey: string,
    url: string,
    payload: Record<string, unknown>,
    onSuccess: (data: T) => void,
    method: "PATCH" | "DELETE" = "PATCH"
  ) => {
    setPendingAction(actionKey);
    setNotice("");
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({ success: false, message: "Invalid server response" })) as AdminResponse<T>;
      if (!res.ok || !data.success || !data.data) {
        setNotice(data.message || "Action failed. Refresh and try again.");
        return;
      }
      onSuccess(data.data);
    } catch {
      setNotice("Action failed. Check your connection and try again.");
    } finally {
      setPendingAction("");
    }
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
            <button type="submit" disabled={loading} className={`w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 disabled:opacity-50 ${adminActionMotion}`}>
              {loading ? "Verifying..." : "Enter Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

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
            { label: "Unique Visitors", value: analyticsSummary?.uniqueVisitors ?? 0, icon: "👁️", color: "bg-purple-50 text-purple-600" },
            { label: "Page Views", value: analyticsSummary?.pageViews ?? 0, icon: "📄", color: "bg-indigo-50 text-indigo-600" },
            { label: "Today's Visitors", value: analyticsSummary?.todayVisitors ?? 0, icon: "📈", color: "bg-blue-50 text-blue-600" },
            { label: "Engagements", value: analyticsSummary?.engagements ?? 0, icon: "🖱️", color: "bg-orange-50 text-orange-600" },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl p-5 ${stat.color} ${adminCardMotion}`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-extrabold">{stat.value}</div>
              <div className="text-xs font-medium opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>

        {notice && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
            {notice}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {adminTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm ${adminTabMotion} ${tab === t ? "bg-dark text-white shadow-sm" : "bg-white text-gray-500 hover:text-dark border border-gray-200 hover:border-gray-300"}`}
            >
              {t === "analytics" ? "Visitors" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "analytics" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm ${adminPanelMotion}`}>
                <h3 className="font-bold text-dark mb-4">Top Pages</h3>
                {analyticsSummary?.topPages.length ? (
                  <ul className="space-y-3">
                    {analyticsSummary.topPages.map((p) => (
                      <li key={p.path} className={`flex justify-between items-center text-sm rounded-xl px-2 py-1 ${adminRowMotion}`}>
                        <span className="text-gray-700 truncate mr-4">{p.path}</span>
                        <span className="font-bold text-primary shrink-0">{p.count} views</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No page views yet. Browse the site to collect data.</p>
                )}
              </div>
              <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm ${adminPanelMotion}`}>
                <h3 className="font-bold text-dark mb-4">Top Clicks &amp; Actions</h3>
                {analyticsSummary?.topClicks.length ? (
                  <ul className="space-y-3">
                    {analyticsSummary.topClicks.map((c) => (
                      <li key={c.label} className={`flex justify-between items-center text-sm gap-4 rounded-xl px-2 py-1 ${adminRowMotion}`}>
                        <span className="text-gray-700 truncate">{c.label}</span>
                        <span className="font-bold text-primary shrink-0">{c.count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No click events yet.</p>
                )}
              </div>
            </div>

            <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-dark">Visitor Sessions</h3>
                <p className="text-xs text-gray-500 mt-1">Everyone who viewed or engaged with the website</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4 text-left">Visitor</th>
                      <th className="px-6 py-4 text-left">Device</th>
                      <th className="px-6 py-4 text-left">Pages</th>
                      <th className="px-6 py-4 text-left">Views</th>
                      <th className="px-6 py-4 text-left">Engagements</th>
                      <th className="px-6 py-4 text-left">Referrer</th>
                      <th className="px-6 py-4 text-left">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {visitorSessions.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-12 text-gray-400">No visitors tracked yet</td></tr>
                    ) : visitorSessions.map((s) => (
                      <tr key={s.sessionId} className={adminRowMotion}>
                        <td className="px-6 py-4">
                          {s.userName ? (
                            <>
                              <div className="font-bold text-dark">{s.userName}</div>
                              <div className="text-xs text-gray-500">{s.userEmail}</div>
                            </>
                          ) : (
                            <div className="font-mono text-xs text-gray-600">{s.visitorId.slice(0, 18)}…</div>
                          )}
                          <div className="text-xs text-gray-400 mt-1">Landing: {s.landingPage}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{s.device}</div>
                          <div className="text-xs text-gray-500">{s.browser}</div>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-600 max-w-[180px]">
                          {s.pages.slice(0, 3).join(", ")}
                          {s.pages.length > 3 && ` +${s.pages.length - 3}`}
                        </td>
                        <td className="px-6 py-4 font-bold text-primary">{s.pageViews}</td>
                        <td className="px-6 py-4 font-bold text-orange-600">{s.engagements}</td>
                        <td className="px-6 py-4 text-xs text-gray-500 max-w-[120px] truncate">{s.referrer}</td>
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                          {new Date(s.lastSeen).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-dark">Live Activity Feed</h3>
                <p className="text-xs text-gray-500 mt-1">Recent page views, clicks, and form submissions</p>
              </div>
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left">Time</th>
                      <th className="px-6 py-3 text-left">Type</th>
                      <th className="px-6 py-3 text-left">Page</th>
                      <th className="px-6 py-3 text-left">Detail</th>
                      <th className="px-6 py-3 text-left">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {analyticsEvents.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-8 text-gray-400">No activity yet</td></tr>
                    ) : analyticsEvents.map((ev) => (
                      <tr key={ev.id} className={adminRowMotion}>
                        <td className="px-6 py-3 text-gray-500 whitespace-nowrap text-xs">
                          {new Date(ev.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                            {ev.type.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-700">{ev.path}</td>
                        <td className="px-6 py-3 text-xs text-gray-600 max-w-[200px] truncate">
                          {ev.label || "—"}
                        </td>
                        <td className="px-6 py-3 text-xs">
                          {ev.userName || <span className="text-gray-400">Anonymous</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Enrollments Table */}
        {tab === "enrollments" && (
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
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
                    <tr key={e.id} className={adminRowMotion}>
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
                            disabled={pendingAction === `enrollment-${e.id}`}
                            className={`bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 disabled:opacity-50 ${adminActionMotion}`}
                          >
                            {pendingAction === `enrollment-${e.id}` ? "Saving..." : "Confirm"}
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
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
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
                    <tr key={s.id} className={adminRowMotion}>
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
                          {(s.enrolledCourses ?? []).length} enrolled
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

        {tab === "reviews" && (
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-dark">Review Moderation</h3>
              <p className="text-xs text-gray-500 mt-1">Approve, hide, or permanently delete submitted reviews. Deleted reviews are removed from public review lists too.</p>
            </div>
            <div className="divide-y divide-gray-100">
              {reviews.length === 0 ? (
                <p className="p-6 text-sm text-gray-400">No student reviews submitted yet.</p>
              ) : reviews.map((review) => (
                <div key={review.id} className={`p-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between ${adminRowMotion}`}>
                  <div>
                    <p className="font-bold text-dark">{review.name} · {review.rating}/5</p>
                    <p className="text-xs text-gray-400">{review.role || "Student"} · {review.approved ? "Approved" : "Pending"}</p>
                    <p className="mt-3 text-sm text-gray-600">{review.text}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button disabled={pendingAction === `review-${review.id}`} onClick={() => setReviewApproval(review.id, true)} className={`rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50 ${adminActionMotion}`}>{pendingAction === `review-${review.id}` ? "Saving..." : "Approve"}</button>
                    <button disabled={pendingAction === `review-${review.id}`} onClick={() => setReviewApproval(review.id, false)} className={`rounded-xl bg-gray-100 px-4 py-2 text-sm font-bold text-dark disabled:opacity-50 ${adminActionMotion}`}>Hide</button>
                    <button disabled={pendingAction === `review-delete-${review.id}`} onClick={() => deleteReview(review.id, review.name)} className={`rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-50 ${adminActionMotion}`}>{pendingAction === `review-delete-${review.id}` ? "Deleting..." : "Delete"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-dark">Student Project Gallery Moderation</h3>
              <p className="text-xs text-gray-500 mt-1">Approve finished work, reject drafts, or delete records from the shared gallery feed.</p>
            </div>
            <div className="divide-y divide-gray-100">
              {projects.length === 0 ? (
                <p className="p-6 text-sm text-gray-400">No projects submitted yet.</p>
              ) : projects.map((project) => (
                <div key={project.id} className={`p-6 grid gap-4 md:grid-cols-4 ${adminRowMotion}`}>
                  <div className="h-24 overflow-hidden rounded-xl bg-gray-100">
                    {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 hover:scale-[1.03]" />}
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-bold text-dark">{project.title}</p>
                    <p className="text-xs text-primary font-bold">{project.courseName} · {project.studentName}</p>
                    <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                    <p className="mt-2">
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${statusClass[project.status]}`}>
                        {project.status}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:flex-col">
                    <button disabled={pendingAction === `project-${project.id}`} onClick={() => setProjectStatus(project.id, "approved")} className={`rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50 ${adminActionMotion}`}>{pendingAction === `project-${project.id}` ? "Saving..." : "Approve"}</button>
                    <button disabled={pendingAction === `project-${project.id}`} onClick={() => setProjectStatus(project.id, "rejected")} className={`rounded-xl bg-gray-100 px-4 py-2 text-sm font-bold text-dark disabled:opacity-50 ${adminActionMotion}`}>Reject</button>
                    <button disabled={pendingAction === `project-delete-${project.id}`} onClick={() => deleteProject(project.id, project.title)} className={`rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-50 ${adminActionMotion}`}>{pendingAction === `project-delete-${project.id}` ? "Deleting..." : "Delete"}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "assignments" && (
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-dark">Course Assignment Uploads</h3>
              <p className="text-xs text-gray-500 mt-1">Review submissions, request revisions, leave feedback, or delete invalid assignment records.</p>
            </div>
            <div className="divide-y divide-gray-100">
              {assignments.length === 0 ? (
                <p className="p-6 text-sm text-gray-400">No assignments submitted yet.</p>
              ) : assignments.map((assignment) => (
                <div key={assignment.id} className={`p-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between ${adminRowMotion}`}>
                  <div>
                    <p className="font-bold text-dark">{assignment.studentName}</p>
                    <p className="text-xs text-primary font-bold">{assignment.courseName} · {assignment.lessonTitle}</p>
                    {assignment.fileUrl && <a href={assignment.fileUrl} className={`mt-2 block text-sm font-bold text-primary ${adminTabMotion}`} target="_blank">Open submitted file</a>}
                    {assignment.notes && <p className="mt-2 text-sm text-gray-600">{assignment.notes}</p>}
                    <p className="mt-2 text-xs text-gray-400">Status: {assignment.status}{assignment.feedback ? ` · Feedback: ${assignment.feedback}` : ""}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button disabled={pendingAction === `assignment-${assignment.id}`} onClick={() => markAssignment(assignment.id, "reviewed")} className={`rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50 ${adminActionMotion}`}>{pendingAction === `assignment-${assignment.id}` ? "Saving..." : "Mark Reviewed"}</button>
                    <button disabled={pendingAction === `assignment-${assignment.id}`} onClick={() => markAssignment(assignment.id, "revision")} className={`rounded-xl bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800 disabled:opacity-50 ${adminActionMotion}`}>Needs Revision</button>
                    <button disabled={pendingAction === `assignment-delete-${assignment.id}`} onClick={() => deleteAssignment(assignment.id, assignment.studentName)} className={`rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-50 ${adminActionMotion}`}>{pendingAction === `assignment-delete-${assignment.id}` ? "Deleting..." : "Delete"}</button>
                  </div>
                </div>
              ))}
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
                  className={`w-full text-left p-4 rounded-2xl border flex items-center gap-4 ${adminPanelMotion} ${
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
                <div className={`bg-white rounded-3xl border border-gray-100 p-8 shadow-sm ${adminPanelMotion}`}>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl">{courses.find(c => c.id === selectedCourseId)?.icon}</span>
                    <h2 className="text-2xl font-bold text-dark">{courses.find(c => c.id === selectedCourseId)?.title}</h2>
                  </div>
                  <div className="space-y-6">
                    {lessons.filter(l => l.courseId === selectedCourseId).sort((a, b) => a.order - b.order).map((lesson) => (
                      <div key={lesson.id} className={`border border-gray-100 rounded-2xl p-5 ${adminCardMotion}`}>
                        <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
                          <span className="text-primary">{lesson.order}.</span> {lesson.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed bg-gray-50 p-4 rounded-xl italic">&quot;{lesson.content}&quot;</p>
                        {lesson.quiz && (
                          <div className={`bg-blue-50/50 rounded-xl p-4 border border-blue-100 ${adminCardMotion}`}>
                            <p className="text-xs font-bold text-primary uppercase mb-2">Quiz Preview ({lesson.quiz.questions.length} Qs)</p>
                            <div className="space-y-2">
                              {lesson.quiz.questions.map((q, i) => (
                                <div key={i} className={`text-xs text-gray-700 rounded-lg px-2 py-1 ${adminRowMotion}`}>
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
                <div className={`bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center ${adminPanelMotion}`}>
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
