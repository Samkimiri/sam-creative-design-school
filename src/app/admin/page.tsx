"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { courses, lessons } from "@/data/courses";
import type { ContentSettings, CourseContentOverride, FAQSection, LessonContentOverride, LessonResourceOverride } from "@/types";

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
  originalAmount?: number;
  amount: number;
  referralCode?: string;
  referralDiscount?: number;
  referredByStudentId?: string;
  referredByName?: string;
  referredByEmail?: string;
  phone: string;
  reference: string;
  status: "pending" | "confirmed" | "failed";
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

interface UpcomingIntakeSettings {
  id: "upcoming-intake";
  title: string;
  subtitle: string;
  nextIntake: string;
  learningMode: string;
  classDuration: string;
  availableSeats: string;
  weeklySchedule: string;
  badge: string;
  updatedAt: string;
}

interface AdminSettings {
  intake: UpcomingIntakeSettings;
  content?: ContentSettings;
}

interface AdminDashboardPayload {
  students?: Student[];
  enrollments?: Enrollment[];
  reviews?: AdminReview[];
  projects?: AdminProject[];
  assignments?: AdminAssignment[];
  settings?: AdminSettings;
  analytics?: {
    summary?: AnalyticsSummary;
    sessions?: VisitorSession[];
    events?: AnalyticsEvent[];
  };
}

type AdminTab = "analytics" | "enrollments" | "students" | "reviews" | "projects" | "assignments" | "settings" | "content";

type AdminResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  warnings?: number;
  summary?: AnalyticsSummary;
  sessions?: VisitorSession[];
  events?: AnalyticsEvent[];
};

const adminTabs: AdminTab[] = ["analytics", "enrollments", "students", "reviews", "projects", "assignments", "settings", "content"];
const defaultIntakeSettings: UpcomingIntakeSettings = {
  id: "upcoming-intake",
  title: "Join the Next SCDS Class",
  subtitle: "The next class is open for enrollment with a structured schedule, guided assignments, and mentor feedback so students know exactly what happens after joining.",
  nextIntake: "June 10, 2026",
  learningMode: "Online LMS + WhatsApp mentorship",
  classDuration: "2 to 6 weeks, based on course",
  availableSeats: "24 seats open",
  weeklySchedule: "Lessons unlock weekly, with assignments reviewed before certification.",
  badge: "Limited batch",
  updatedAt: "",
};
const defaultContentSettings: ContentSettings = {
  id: "content-manager",
  homepage: {
    eyebrow: "Sam Creative Design School",
    title: "Master Creative & Tech Skills That Pay",
    subtitle: "Learn design, coding, AI, video editing, and CAD with practical, industry-level training.",
    primaryCta: "Start Learning Today",
    secondaryCta: "Explore Courses",
  },
  courses: [],
  lessons: [],
  faqs: [
    {
      category: "Courses & Enrollment",
      items: [
        { q: "Do I need prior experience?", a: "No. Our courses are beginner-friendly and practical." },
      ],
    },
  ],
  updatedAt: "",
};

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
const adminFetchTimeoutMs = 15000;

function resourcesToText(resources?: LessonResourceOverride[]) {
  return (resources || []).map((resource) => `${resource.type}|${resource.name}|${resource.url}`).join("\n");
}

function textToResources(value: string): LessonResourceOverride[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [type, name, ...urlParts] = line.split("|");
      const safeType = type === "zip" || type === "link" ? type : "pdf";
      return {
        type: safeType,
        name: (name || "Resource").trim(),
        url: urlParts.join("|").trim() || "#",
      };
    });
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [tab, setTab] = useState<AdminTab>("analytics");
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [assignments, setAssignments] = useState<AdminAssignment[]>([]);
  const [visitorSessions, setVisitorSessions] = useState<VisitorSession[]>([]);
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [intakeSettings, setIntakeSettings] = useState<UpcomingIntakeSettings>(defaultIntakeSettings);
  const [contentSettings, setContentSettings] = useState<ContentSettings>(defaultContentSettings);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingAction, setPendingAction] = useState("");
  const [assignmentFeedback, setAssignmentFeedback] = useState<Record<string, string>>({});

  const fetchAdminJson = useCallback(async <T,>(url: string, init: RequestInit): Promise<{ res: Response; data: AdminResponse<T> }> => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), adminFetchTimeoutMs);

    try {
      const res = await fetch(url, { ...init, signal: controller.signal });
      const data = await res.json().catch(() => ({ success: false, message: "Invalid server response" })) as AdminResponse<T>;
      return { res, data };
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  const fetchData = useCallback(async (pw?: string) => {
    setLoading(true);
    setError("");
    setNotice("");
    try {
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify(pw ? { password: pw } : {});

      const { res, data } = await fetchAdminJson<AdminDashboardPayload>("/api/admin/dashboard", {
        method: "POST",
        headers,
        body,
      });

      if (res.ok && data.success) {
        const dashboard = data.data ?? {};
        setStudents(Array.isArray(dashboard.students) ? dashboard.students : []);
        setEnrollments(Array.isArray(dashboard.enrollments) ? dashboard.enrollments : []);
        setReviews(Array.isArray(dashboard.reviews) ? dashboard.reviews : []);
        setProjects(Array.isArray(dashboard.projects) ? dashboard.projects : []);
        setAssignments(Array.isArray(dashboard.assignments) ? dashboard.assignments : []);
        setVisitorSessions(Array.isArray(dashboard.analytics?.sessions) ? dashboard.analytics.sessions : []);
        setAnalyticsEvents(Array.isArray(dashboard.analytics?.events) ? dashboard.analytics.events : []);
        setAnalyticsSummary(dashboard.analytics?.summary ?? null);
        if (dashboard.settings?.intake) setIntakeSettings(dashboard.settings.intake);
        if (dashboard.settings?.content) setContentSettings(dashboard.settings.content);
        setAuthed(true);
        setAccessChecked(true);
        if (pw) setPassword(pw);
        if (data.warnings && data.warnings > 0) {
          setNotice(`${data.warnings} dashboard section${data.warnings === 1 ? "" : "s"} used fallback data. Try refreshing if something looks stale.`);
        }
      } else {
        setAuthed(false);
        setAccessChecked(true);
        setError(data.message || "Admin access required.");
      }
    } catch (err) {
      setAccessChecked(true);
      setError(err instanceof DOMException && err.name === "AbortError"
        ? "The admin backend took too long to respond. Try again."
        : "Could not load dashboard data. Try again.");
    } finally {
      setLoading(false);
    }
  }, [fetchAdminJson]);

  // Check account role before loading any admin data.
  useEffect(() => {
    let cancelled = false;

    const checkAdminSession = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json().catch(() => null) as {
          success?: boolean;
          user?: { role?: string };
        } | null;

        if (cancelled) return;

        if (!res.ok || !data?.success || !data.user) {
          setAuthed(false);
          setAccessChecked(true);
          setError("Sign in with an admin account to open the dashboard.");
          return;
        }

        if (data.user.role !== "admin") {
          setAuthed(false);
          setAccessChecked(true);
          setError("This signed-in account does not have admin access.");
          return;
        }

        await fetchData();
      } catch {
        if (!cancelled) {
          setAuthed(false);
          setAccessChecked(true);
          setError("Could not verify admin access. Try signing in again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void checkAdminSession();
    return () => {
      cancelled = true;
    };
  }, [fetchData]);

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
    const feedback = assignmentFeedback[id] || "";
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

  const saveIntakeSettings = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPendingAction("settings-intake");
    setNotice("");
    try {
      const { res, data } = await fetchAdminJson<AdminSettings>("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, ...intakeSettings }),
      });
      if (!res.ok || !data.success || !data.data?.intake) {
        setNotice(data.message || "Could not update intake settings.");
        return;
      }
      setIntakeSettings(data.data.intake);
      setNotice("Upcoming intake updated. Refresh the homepage to see the latest version.");
    } catch (err) {
      setNotice(err instanceof DOMException && err.name === "AbortError"
        ? "The settings update took too long. Please try again."
        : "Could not update intake settings. Check your connection and try again.");
    } finally {
      setPendingAction("");
    }
  };

  const updateCourseContent = (courseId: string, patch: Partial<CourseContentOverride>) => {
    setContentSettings((current) => {
      const existing = current.courses.find((course) => course.id === courseId) || { id: courseId };
      const next = { ...existing, ...patch, id: courseId };
      return {
        ...current,
        courses: [...current.courses.filter((course) => course.id !== courseId), next],
      };
    });
  };

  const updateLessonContent = (lessonId: string, patch: Partial<LessonContentOverride>) => {
    setContentSettings((current) => {
      const existing = current.lessons.find((lesson) => lesson.id === lessonId) || { id: lessonId };
      const next = { ...existing, ...patch, id: lessonId };
      return {
        ...current,
        lessons: [...current.lessons.filter((lesson) => lesson.id !== lessonId), next],
      };
    });
  };

  const updateFAQSection = (index: number, patch: Partial<FAQSection>) => {
    setContentSettings((current) => ({
      ...current,
      faqs: current.faqs.map((section, sectionIndex) => sectionIndex === index ? { ...section, ...patch } : section),
    }));
  };

  const updateFAQItem = (sectionIndex: number, itemIndex: number, patch: { q?: string; a?: string }) => {
    setContentSettings((current) => ({
      ...current,
      faqs: current.faqs.map((section, currentSectionIndex) => currentSectionIndex === sectionIndex
        ? {
            ...section,
            items: section.items.map((item, currentItemIndex) => currentItemIndex === itemIndex ? { ...item, ...patch } : item),
          }
        : section),
    }));
  };

  const saveContentSettings = async () => {
    setPendingAction("content-save");
    setNotice("");
    try {
      const { res, data } = await fetchAdminJson<{ content: ContentSettings }>("/api/admin/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, content: contentSettings }),
      });
      if (!res.ok || !data.success || !data.data?.content) {
        setNotice(data.message || "Could not save content updates.");
        return;
      }
      setContentSettings(data.data.content);
      setNotice("Content updates saved. Public pages will use the latest published copy.");
    } catch (err) {
      setNotice(err instanceof DOMException && err.name === "AbortError"
        ? "The content update took too long. Please try again."
        : "Could not save content updates. Check your connection and try again.");
    } finally {
      setPendingAction("");
    }
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
      const { res, data } = await fetchAdminJson<T>(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok || !data.success || !data.data) {
        setNotice(data.message || "Action failed. Refresh and try again.");
        return;
      }
      onSuccess(data.data);
    } catch (err) {
      setNotice(err instanceof DOMException && err.name === "AbortError"
        ? "The admin action took too long. Please try again."
        : "Action failed. Check your connection and try again.");
    } finally {
      setPendingAction("");
    }
  };

  if (!accessChecked) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-sm font-black text-white">
            ADMIN
          </div>
          <h1 className="text-2xl font-extrabold text-white">Checking Access</h1>
          <p className="mt-2 text-sm leading-6 text-gray-400">Verifying that this login belongs to an admin account.</p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-sm font-black text-white mx-auto mb-4">ADMIN</div>
            <h1 className="text-2xl font-extrabold text-white">Admin Access</h1>
            <p className="text-gray-400 text-sm mt-1">Sam Creative Design School</p>
          </div>
          {error && <p className="text-red-400 text-sm text-center mb-4" role="alert">{error}</p>}
          <div className="space-y-3">
            <Link href="/auth/login?next=/admin" className={`block w-full rounded-xl bg-primary py-4 text-center font-bold text-white hover:bg-primary/90 ${adminActionMotion}`}>
              Sign In as Admin
            </Link>
            <Link href="/" className={`block w-full rounded-xl border border-white/10 py-4 text-center font-bold text-gray-300 hover:border-primary hover:text-white ${adminActionMotion}`}>
              Back to Website
            </Link>
          </div>
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
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void fetchData(password)}
              disabled={loading}
              className={`rounded-xl bg-white px-4 py-2 text-sm font-bold text-dark border border-gray-200 disabled:opacity-50 ${adminActionMotion}`}
            >
              {loading ? "Refreshing..." : "Refresh Data"}
            </button>
            <Link href="/" className={`rounded-xl bg-white px-4 py-2 text-sm font-bold text-gray-500 hover:text-primary border border-gray-200 ${adminActionMotion}`}>
              Back to Website
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Unique Visitors", value: analyticsSummary?.uniqueVisitors ?? 0, icon: "UV", color: "bg-purple-50 text-purple-600" },
            { label: "Page Views", value: analyticsSummary?.pageViews ?? 0, icon: "PV", color: "bg-indigo-50 text-indigo-600" },
            { label: "Today's Visitors", value: analyticsSummary?.todayVisitors ?? 0, icon: "TD", color: "bg-blue-50 text-blue-600" },
            { label: "Engagements", value: analyticsSummary?.engagements ?? 0, icon: "EG", color: "bg-orange-50 text-orange-600" },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl p-5 ${stat.color} ${adminCardMotion}`}>
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 text-xs font-black">{stat.icon}</div>
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
                            <div className="font-mono text-xs text-gray-600">{s.visitorId.slice(0, 18)}...</div>
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
                    <th className="px-6 py-4 text-left">Referral</th>
                    <th className="px-6 py-4 text-left">Ref</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enrollments.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-12 text-gray-400">No enrollments yet</td></tr>
                  ) : enrollments.map((e) => (
                    <tr key={e.id} className={adminRowMotion}>
                      <td className="px-6 py-4">
                        <div className="font-bold text-dark">{e.studentName}</div>
                        <div className="text-gray-500 text-xs">{e.studentEmail || e.phone}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-dark">{e.courseName}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-primary">Ksh {e.amount}</div>
                        {e.referralDiscount ? (
                          <div className="text-xs font-semibold text-green-700">
                            Saved Ksh {e.referralDiscount}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {e.referredByName ? (
                          <div>
                            <div className="font-bold text-dark">{e.referredByName}</div>
                            <div className="font-mono text-gray-500">{e.referralCode}</div>
                          </div>
                        ) : e.referralCode ? (
                          <span className="rounded-full bg-yellow-50 px-3 py-1 font-bold text-yellow-700">Code not matched</span>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </td>
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
                    <p className="font-bold text-dark">{review.name} - {review.rating}/5</p>
                    <p className="text-xs text-gray-400">{review.role || "Student"} - {review.approved ? "Approved" : "Pending"}</p>
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
                    <p className="text-xs text-primary font-bold">{project.courseName} - {project.studentName}</p>
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
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-dark">{assignment.studentName}</p>
                    <p className="text-xs text-primary font-bold">{assignment.courseName} - {assignment.lessonTitle}</p>
                    {assignment.fileUrl && <a href={assignment.fileUrl} className={`mt-2 block text-sm font-bold text-primary ${adminTabMotion}`} target="_blank" rel="noreferrer">Open submitted file</a>}
                    {assignment.notes && <p className="mt-2 text-sm text-gray-600">{assignment.notes}</p>}
                    <p className="mt-2 text-xs text-gray-400">Status: {assignment.status}{assignment.feedback ? ` - Feedback: ${assignment.feedback}` : ""}</p>
                  </div>
                  <div className="w-full space-y-3 md:w-80">
                    <label htmlFor={`assignment-feedback-${assignment.id}`} className="block text-xs font-black uppercase tracking-widest text-gray-400">Feedback</label>
                    <textarea
                      id={`assignment-feedback-${assignment.id}`}
                      value={assignmentFeedback[assignment.id] ?? assignment.feedback ?? ""}
                      onChange={(e) => setAssignmentFeedback((prev) => ({ ...prev, [assignment.id]: e.target.value }))}
                      className="min-h-24 w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
                      maxLength={800}
                      placeholder="Write clear next steps for the student"
                    />
                    <div className="flex flex-wrap gap-2">
                    <button disabled={pendingAction === `assignment-${assignment.id}`} onClick={() => markAssignment(assignment.id, "reviewed")} className={`rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50 ${adminActionMotion}`}>{pendingAction === `assignment-${assignment.id}` ? "Saving..." : "Mark Reviewed"}</button>
                    <button disabled={pendingAction === `assignment-${assignment.id}`} onClick={() => markAssignment(assignment.id, "revision")} className={`rounded-xl bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-800 disabled:opacity-50 ${adminActionMotion}`}>Needs Revision</button>
                    <button disabled={pendingAction === `assignment-delete-${assignment.id}`} onClick={() => deleteAssignment(assignment.id, assignment.studentName)} className={`rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-100 disabled:opacity-50 ${adminActionMotion}`}>{pendingAction === `assignment-delete-${assignment.id}` ? "Deleting..." : "Delete"}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-dark">Homepage Upcoming Intake</h3>
              <p className="text-xs text-gray-500 mt-1">Update the intake section shown on the homepage. Changes are saved to the backend and appear after the homepage is refreshed.</p>
            </div>
            <form onSubmit={saveIntakeSettings} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Section Title</label>
                  <input
                    value={intakeSettings.title}
                    onChange={(e) => setIntakeSettings((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    maxLength={90}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Next Intake Date</label>
                  <input
                    value={intakeSettings.nextIntake}
                    onChange={(e) => setIntakeSettings((prev) => ({ ...prev, nextIntake: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    maxLength={60}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Learning Mode</label>
                  <input
                    value={intakeSettings.learningMode}
                    onChange={(e) => setIntakeSettings((prev) => ({ ...prev, learningMode: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    maxLength={90}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Class Duration</label>
                  <input
                    value={intakeSettings.classDuration}
                    onChange={(e) => setIntakeSettings((prev) => ({ ...prev, classDuration: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    maxLength={90}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Available Seats</label>
                  <input
                    value={intakeSettings.availableSeats}
                    onChange={(e) => setIntakeSettings((prev) => ({ ...prev, availableSeats: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    maxLength={60}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Badge</label>
                  <input
                    value={intakeSettings.badge}
                    onChange={(e) => setIntakeSettings((prev) => ({ ...prev, badge: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    maxLength={40}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Intro Text</label>
                <textarea
                  value={intakeSettings.subtitle}
                  onChange={(e) => setIntakeSettings((prev) => ({ ...prev, subtitle: e.target.value }))}
                  className="min-h-28 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                  maxLength={260}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Weekly Schedule Note</label>
                <textarea
                  value={intakeSettings.weeklySchedule}
                  onChange={(e) => setIntakeSettings((prev) => ({ ...prev, weeklySchedule: e.target.value }))}
                  className="min-h-24 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                  maxLength={180}
                  required
                />
              </div>

              <div className="rounded-2xl bg-light-gray p-5">
                <p className="text-xs font-black uppercase tracking-widest text-primary">Homepage Preview</p>
                <h4 className="mt-2 text-2xl font-extrabold text-dark">{intakeSettings.title}</h4>
                <p className="mt-2 text-sm text-gray-600">{intakeSettings.subtitle}</p>
                <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <span><strong>Next:</strong> {intakeSettings.nextIntake}</span>
                  <span><strong>Mode:</strong> {intakeSettings.learningMode}</span>
                  <span><strong>Duration:</strong> {intakeSettings.classDuration}</span>
                  <span><strong>Seats:</strong> {intakeSettings.availableSeats}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={pendingAction === "settings-intake"}
                className={`rounded-xl bg-primary px-6 py-3 font-bold text-white disabled:opacity-50 ${adminActionMotion}`}
              >
                {pendingAction === "settings-intake" ? "Saving..." : "Save Homepage Intake"}
              </button>
            </form>
          </div>
        )}

        {/* Content View */}
        {tab === "content" && (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-dark">Content Manager</h3>
                <p className="mt-1 text-sm text-gray-500">Edit homepage copy, course descriptions, pricing, lesson videos, notes, resources, and FAQs without touching code.</p>
              </div>
              <button
                type="button"
                onClick={() => void saveContentSettings()}
                disabled={pendingAction === "content-save"}
                className={`rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white disabled:opacity-50 ${adminActionMotion}`}
              >
                {pendingAction === "content-save" ? "Saving..." : "Save All Content"}
              </button>
            </div>

            <section className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ${adminPanelMotion}`}>
              <h4 className="mb-5 text-lg font-extrabold text-dark">Homepage Hero</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <input value={contentSettings.homepage.eyebrow} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, eyebrow: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Hero eyebrow" />
                <input value={contentSettings.homepage.title} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, title: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Hero title" />
                <input value={contentSettings.homepage.primaryCta} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, primaryCta: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Primary CTA" />
                <input value={contentSettings.homepage.secondaryCta} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, secondaryCta: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Secondary CTA" />
                <textarea value={contentSettings.homepage.subtitle} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, subtitle: e.target.value } }))} rows={3} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2" placeholder="Hero subtitle" />
              </div>
            </section>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-3">
                {courses.map((course) => {
                  const draft = contentSettings.courses.find((item) => item.id === course.id);
                  return (
                    <button
                      key={course.id}
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        setSelectedLessonId(null);
                      }}
                      className={`w-full rounded-2xl border p-4 text-left ${adminPanelMotion} ${selectedCourseId === course.id ? "border-primary bg-primary text-white shadow-lg" : "border-gray-100 bg-white hover:border-gray-300"}`}
                    >
                      <div className="font-bold">{draft?.title || course.title}</div>
                      <div className={`text-xs ${selectedCourseId === course.id ? "text-white/80" : "text-gray-500"}`}>{draft?.level || course.level}</div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-2">
                {selectedCourseId ? (() => {
                  const course = courses.find((item) => item.id === selectedCourseId);
                  if (!course) return null;
                  const draft = contentSettings.courses.find((item) => item.id === selectedCourseId) || { id: selectedCourseId };
                  const courseLessons = lessons.filter((lesson) => lesson.courseId === selectedCourseId).sort((a, b) => a.order - b.order);
                  const selectedLesson = courseLessons.find((lesson) => lesson.id === selectedLessonId) || courseLessons[0];
                  const lessonDraft = selectedLesson ? contentSettings.lessons.find((item) => item.id === selectedLesson.id) || { id: selectedLesson.id } : null;

                  return (
                    <div className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ${adminPanelMotion}`}>
                      <h4 className="mb-5 text-xl font-extrabold text-dark">Course Details & Pricing</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <input value={draft.title ?? course.title} onChange={(e) => updateCourseContent(course.id, { title: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Course title" />
                        <input value={draft.shortTitle ?? course.shortTitle} onChange={(e) => updateCourseContent(course.id, { shortTitle: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Short title" />
                        <input value={draft.duration ?? course.duration} onChange={(e) => updateCourseContent(course.id, { duration: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Duration" />
                        <input value={draft.level ?? course.level} onChange={(e) => updateCourseContent(course.id, { level: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Level" />
                        <input type="number" value={draft.price ?? course.price} onChange={(e) => updateCourseContent(course.id, { price: Number(e.target.value) })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Price" />
                        <input value={draft.priceRange ?? course.priceRange} onChange={(e) => updateCourseContent(course.id, { priceRange: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Price range" />
                        <input value={draft.image ?? course.image} onChange={(e) => updateCourseContent(course.id, { image: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary md:col-span-2" placeholder="Image URL" />
                        <textarea value={draft.description ?? course.description} onChange={(e) => updateCourseContent(course.id, { description: e.target.value })} rows={3} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2" placeholder="Short description" />
                        <textarea value={draft.longDescription ?? course.longDescription} onChange={(e) => updateCourseContent(course.id, { longDescription: e.target.value })} rows={4} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2" placeholder="Long description" />
                        <textarea value={(draft.skills ?? course.skills).join(", ")} onChange={(e) => updateCourseContent(course.id, { skills: e.target.value.split(",").map((skill) => skill.trim()).filter(Boolean) })} rows={2} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2" placeholder="Skills separated by commas" />
                      </div>

                      <div className="mt-8 border-t border-gray-100 pt-6">
                        <h4 className="mb-4 text-xl font-extrabold text-dark">Lessons, Videos & Notes</h4>
                        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
                          {courseLessons.map((lesson) => (
                            <button key={lesson.id} type="button" onClick={() => setSelectedLessonId(lesson.id)} className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-bold ${selectedLesson?.id === lesson.id ? "border-primary bg-primary text-white" : "border-gray-200 text-gray-600"}`}>
                              {lesson.order}. {lesson.title}
                            </button>
                          ))}
                        </div>

                        {selectedLesson && lessonDraft && (
                          <div className="grid gap-4">
                            <input value={lessonDraft.title ?? selectedLesson.title} onChange={(e) => updateLessonContent(selectedLesson.id, { title: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Lesson title" />
                            <input value={lessonDraft.duration ?? selectedLesson.duration} onChange={(e) => updateLessonContent(selectedLesson.id, { duration: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Lesson duration" />
                            <input value={lessonDraft.videoUrl ?? selectedLesson.videoUrl} onChange={(e) => updateLessonContent(selectedLesson.id, { videoUrl: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="YouTube embed URL" />
                            <textarea value={lessonDraft.content ?? selectedLesson.content} onChange={(e) => updateLessonContent(selectedLesson.id, { content: e.target.value })} rows={6} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Lesson notes/content" />
                            <textarea value={resourcesToText(lessonDraft.resources ?? selectedLesson.resources)} onChange={(e) => updateLessonContent(selectedLesson.id, { resources: textToResources(e.target.value) })} rows={4} className="rounded-xl border border-gray-200 px-4 py-3 font-mono text-xs outline-none focus:border-primary" placeholder="pdf|Notes PDF|https://..." />
                            <p className="text-xs font-semibold text-gray-500">Resources format: type|name|url. Types: pdf, zip, link. Add one resource per line.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })() : (
                  <div className={`rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center ${adminPanelMotion}`}>
                    <div className="mb-4 text-sm font-black uppercase tracking-widest text-primary">Content</div>
                    <h3 className="font-bold text-xl text-dark">Select a course to edit content</h3>
                    <p className="text-gray-500">You can update pricing, descriptions, videos, notes, and resources.</p>
                  </div>
                )}
              </div>
            </div>

            <section className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ${adminPanelMotion}`}>
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-xl font-extrabold text-dark">FAQs</h4>
                  <p className="text-sm text-gray-500">Edit public FAQ categories, questions, and answers.</p>
                </div>
                <button type="button" onClick={() => setContentSettings((prev) => ({ ...prev, faqs: [...prev.faqs, { category: "New Category", items: [{ q: "New question?", a: "Answer goes here." }] }] }))} className={`rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-dark ${adminActionMotion}`}>
                  Add FAQ Section
                </button>
              </div>
              <div className="space-y-5">
                {contentSettings.faqs.map((section, sectionIndex) => (
                  <div key={`${section.category}-${sectionIndex}`} className="rounded-2xl border border-gray-100 p-4">
                    <input value={section.category} onChange={(e) => updateFAQSection(sectionIndex, { category: e.target.value })} className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="FAQ category" />
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="grid gap-3 md:grid-cols-2">
                          <input value={item.q} onChange={(e) => updateFAQItem(sectionIndex, itemIndex, { q: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Question" />
                          <textarea value={item.a} onChange={(e) => updateFAQItem(sectionIndex, itemIndex, { a: e.target.value })} rows={2} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" placeholder="Answer" />
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={() => updateFAQSection(sectionIndex, { items: [...section.items, { q: "New question?", a: "Answer goes here." }] })} className={`mt-3 rounded-xl bg-light-gray px-4 py-2 text-xs font-bold text-primary ${adminActionMotion}`}>
                      Add Question
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
