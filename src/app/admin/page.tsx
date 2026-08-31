"use client";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { courses, lessons } from "@/data/courses";
import type { ContentSettings, CourseContentOverride, CourseFeedback, DiscountSettings, FAQSection, LessonContentOverride, LessonResourceOverride, ProgressRecord, PromoCode } from "@/types";
import type { LeaderboardEntry } from "@/lib/leaderboard";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  enrolledCourses: string[];
  pausedCourses?: string[];
  isAlumni?: boolean;
  alumniSince?: string;
  createdAt: string;
}

interface Enrollment {
  id: string;
  studentId?: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  originalAmount?: number;
  amount: number;
  referralCode?: string;
  referralDiscount?: number;
  promoCode?: string;
  promoDiscount?: number;
  promoDescription?: string;
  referredByStudentId?: string;
  referredByName?: string;
  referredByEmail?: string;
  phone: string;
  reference: string;
  paymentProvider?: string;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  mpesaPushInitiatedAt?: string;
  paymentConfirmedAt?: string;
  mpesaReceiptNumber?: string;
  mpesaAmount?: number;
  mpesaPhoneNumber?: string;
  mpesaPayerName?: string;
  mpesaNotes?: string;
  paymentVerificationStatus?: string;
  adminApprovalStatus?: string;
  adminReviewRequestedAt?: string;
  adminApprovedAt?: string;
  adminNotificationMessage?: string;
  status: "pending" | "confirmed" | "revoked" | "rejected" | "failed";
  whatsappConfirmed?: boolean;
  whatsappSentAt?: string;
  accessGrantedAt?: string;
  accessGrantMessage?: string;
  revokedAt?: string;
  revokedReason?: string;
  rejectedAt?: string;
  rejectedReason?: string;
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
  courseId?: string;
  courseName?: string;
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
  studentId?: string;
  studentName: string;
  courseName: string;
  lessonTitle: string;
  fileUrl?: string;
  notes?: string;
  status: "submitted" | "reviewed" | "revision";
  rubric?: {
    creativity: number;
    technicalSkill: number;
    completeness: number;
    presentation: number;
    revisionNotes?: string;
  };
  feedback?: string;
  createdAt: string;
}

interface UpcomingIntakeSettings {
  id: "upcoming-intake";
  title: string;
  subtitle: string;
  countdownTitle: string;
  nextIntake: string;
  nextIntakeLabel: string;
  learningMode: string;
  learningModeLabel: string;
  classDuration: string;
  classDurationLabel: string;
  availableSeats: string;
  availableSeatsLabel: string;
  weeklyScheduleLabel: string;
  weeklySchedule: string;
  badge: string;
  updatedAt: string;
}

interface AdminSettings {
  intake: UpcomingIntakeSettings;
  content?: ContentSettings;
  discounts?: DiscountSettings;
}

interface AdminDashboardPayload {
  students?: Student[];
  enrollments?: Enrollment[];
  enrollmentStorageWarning?: string;
  reviews?: AdminReview[];
  projects?: AdminProject[];
  assignments?: AdminAssignment[];
  progress?: ProgressRecord[];
  courseFeedback?: CourseFeedback[];
  leaderboard?: LeaderboardEntry[];
  settings?: AdminSettings;
  analytics?: {
    summary?: AnalyticsSummary;
    sessions?: VisitorSession[];
    events?: AnalyticsEvent[];
  };
}

type AdminTab = "analytics" | "enrollments" | "students" | "reviews" | "projects" | "assignments" | "certificates" | "discounts" | "settings" | "content";

type AdminResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  warnings?: number;
  summary?: AnalyticsSummary;
  sessions?: VisitorSession[];
  events?: AnalyticsEvent[];
};

const adminTabs: AdminTab[] = ["analytics", "enrollments", "students", "reviews", "projects", "assignments", "certificates", "discounts", "settings", "content"];
const defaultIntakeSettings: UpcomingIntakeSettings = {
  id: "upcoming-intake",
  title: "Join the Next SCDS Class",
  subtitle: "The next class is open for enrollment with a structured schedule, guided assignments, and mentor feedback so students know exactly what happens after joining.",
  countdownTitle: "Live Intake Countdown",
  nextIntake: "July 20, 2026",
  nextIntakeLabel: "Next Intake",
  learningMode: "Online LMS + Zoom classes + WhatsApp mentorship",
  learningModeLabel: "Learning Mode",
  classDuration: "2 to 6 weeks, based on course",
  classDurationLabel: "Class Duration",
  availableSeats: "280 seats total",
  availableSeatsLabel: "Available Seats",
  weeklyScheduleLabel: "Weekly Schedule",
  weeklySchedule: "Classes will happen on Zoom, with lessons unlocking weekly and assignments reviewed before certification.",
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
    whatsappNumber: "254748201131",
    whatsappDisplay: "0748201131",
    mpesaPaymentText: "0743475247 (Samuel Kimiri)",
    stats: [
      { value: "500+", label: "Students Trained" },
      { value: "7", label: "Professional Courses" },
      { value: "5+", label: "Years of Excellence" },
      { value: "95%", label: "Completion Rate" },
    ],
    trustBadges: ["Certificate Included", "WhatsApp Mentorship", "Beginner Friendly", "Pay via MPESA"],
    learningBundle: [
      { value: "7", label: "Skill tracks", detail: "Design, coding, AI, video, and CAD" },
      { value: "30+", label: "Guided lessons", detail: "Step-by-step videos, notes, quizzes, and assignments" },
      { value: "12+", label: "Portfolio projects", detail: "Posters, brand assets, reels, CAD parts, and presentations" },
      { value: "24/7", label: "LMS access", detail: "Rewatch lessons and keep improving after class" },
    ],
    toolStacks: [
      {
        title: "Design Software",
        tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Mockup tools"],
        note: "Build posters, social media kits, logos, print files, and brand presentations.",
      },
      {
        title: "Video Workflow",
        tools: ["CapCut", "Audio cleanup", "Reels formats", "Export presets"],
        note: "Plan, cut, caption, and export short-form videos for TikTok, Reels, Shorts, and business pages.",
      },
      {
        title: "Engineering Setup",
        tools: ["SolidWorks", "Technical drawings", "Assemblies", "Rendering"],
        note: "Model real parts, prepare drawings, and present mechanical ideas clearly.",
      },
    ],
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
const defaultDiscountSettings: DiscountSettings = {
  id: "discount-manager",
  referral: {
    active: true,
    studentDiscountPercent: 10,
    rewardNote: "Students who share referral links help new learners save during enrollment.",
  },
  promoCodes: [],
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

function statsToText(stats?: { value: string; label: string }[]) {
  return (stats || []).map((item) => `${item.value}|${item.label}`).join("\n");
}

function textToStats(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [statValue, ...labelParts] = line.split("|");
      return { value: statValue.trim(), label: labelParts.join("|").trim() };
    })
    .filter((item) => item.value && item.label);
}

function listToText(items?: string[]) {
  return (items || []).join("\n");
}

function textToList(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function bundleToText(items?: { value: string; label: string; detail: string }[]) {
  return (items || []).map((item) => `${item.value}|${item.label}|${item.detail}`).join("\n");
}

function textToBundle(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [itemValue, label, ...detailParts] = line.split("|");
      return { value: itemValue.trim(), label: (label || "").trim(), detail: detailParts.join("|").trim() };
    })
    .filter((item) => item.value && item.label && item.detail);
}

function toolStacksToText(items?: { title: string; note: string; tools: string[] }[]) {
  return (items || []).map((item) => `${item.title}|${item.note}|${item.tools.join(", ")}`).join("\n");
}

function textToToolStacks(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, note, ...toolParts] = line.split("|");
      return {
        title: (title || "").trim(),
        note: (note || "").trim(),
        tools: toolParts.join("|").split(",").map((tool) => tool.trim()).filter(Boolean),
      };
    })
    .filter((item) => item.title && item.note && item.tools.length);
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
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [courseFeedback, setCourseFeedback] = useState<CourseFeedback[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [progressStudentId, setProgressStudentId] = useState<string | null>(null);
  const [feedbackDraft, setFeedbackDraft] = useState<Record<string, string>>({});
  const [suggestedCourseByStudent, setSuggestedCourseByStudent] = useState<Record<string, string>>({});
  const [visitorSessions, setVisitorSessions] = useState<VisitorSession[]>([]);
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [intakeSettings, setIntakeSettings] = useState<UpcomingIntakeSettings>(defaultIntakeSettings);
  const [contentSettings, setContentSettings] = useState<ContentSettings>(defaultContentSettings);
  const [discountSettings, setDiscountSettings] = useState<DiscountSettings>(defaultDiscountSettings);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [certificateCourseId, setCertificateCourseId] = useState(courses[0]?.id || "");
  const [certificateStudentName, setCertificateStudentName] = useState("Robert Rangoma");
  const [loading, setLoading] = useState(false);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(false);
  const [enrollmentsLastUpdated, setEnrollmentsLastUpdated] = useState<string>("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pendingAction, setPendingAction] = useState("");
  const [assignmentFeedback, setAssignmentFeedback] = useState<Record<string, string>>({});
  const [assignmentRubrics, setAssignmentRubrics] = useState<Record<string, NonNullable<AdminAssignment["rubric"]>>>({});

  const fetchAdminJson = useCallback(async <T,>(url: string, init: RequestInit): Promise<{ res: Response; data: AdminResponse<T> }> => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), adminFetchTimeoutMs);

    try {
      const res = await fetch(url, { cache: "no-store", ...init, signal: controller.signal });
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
        setEnrollmentsLastUpdated(new Date().toISOString());
        if (dashboard.enrollmentStorageWarning) setNotice(dashboard.enrollmentStorageWarning);
        setReviews(Array.isArray(dashboard.reviews) ? dashboard.reviews : []);
        setProjects(Array.isArray(dashboard.projects) ? dashboard.projects : []);
        setAssignments(Array.isArray(dashboard.assignments) ? dashboard.assignments : []);
        setProgress(Array.isArray(dashboard.progress) ? dashboard.progress : []);
        setCourseFeedback(Array.isArray(dashboard.courseFeedback) ? dashboard.courseFeedback : []);
        setLeaderboard(Array.isArray(dashboard.leaderboard) ? dashboard.leaderboard : []);
        setVisitorSessions(Array.isArray(dashboard.analytics?.sessions) ? dashboard.analytics.sessions : []);
        setAnalyticsEvents(Array.isArray(dashboard.analytics?.events) ? dashboard.analytics.events : []);
        setAnalyticsSummary(dashboard.analytics?.summary ?? null);
        if (dashboard.settings?.intake) {
          setIntakeSettings({ ...defaultIntakeSettings, ...dashboard.settings.intake });
        }
        if (dashboard.settings?.content) setContentSettings(dashboard.settings.content);
        if (dashboard.settings?.discounts) setDiscountSettings(dashboard.settings.discounts);
        setAuthed(true);
        setAccessChecked(true);
        if (pw) setPassword(pw);
        if (!dashboard.enrollmentStorageWarning && data.warnings && data.warnings > 0) {
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

  const refreshEnrollments = useCallback(async (pw?: string, options?: { silent?: boolean }) => {
    if (!options?.silent) setEnrollmentsLoading(true);
    if (!options?.silent) setNotice("");
    try {
      const { res, data } = await fetchAdminJson<Enrollment[]>("/api/admin/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pw ? { password: pw } : {}),
      });

      if (!res.ok || !data.success || !Array.isArray(data.data)) {
        setNotice(data.message || "Could not load enrollment requests. Try refreshing again.");
        return;
      }

      setEnrollments(data.data);
      setEnrollmentsLastUpdated(new Date().toISOString());
    } catch (err) {
      if (!options?.silent) {
        setNotice(err instanceof DOMException && err.name === "AbortError"
          ? "Enrollment requests took too long to load. Try again."
          : "Could not load enrollment requests. Check your connection and try again.");
      }
    } finally {
      if (!options?.silent) setEnrollmentsLoading(false);
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

  useEffect(() => {
    if (!authed || tab !== "enrollments") return;
    void refreshEnrollments(password);
  }, [authed, password, refreshEnrollments, tab]);

  useEffect(() => {
    if (!authed || tab !== "enrollments") return;
    const interval = window.setInterval(() => {
      void refreshEnrollments(password, { silent: true });
    }, 20000);
    return () => window.clearInterval(interval);
  }, [authed, password, refreshEnrollments, tab]);

  const confirmEnrollment = async (enrollmentId: string) => {
    await runMutation<Enrollment>(
      `enrollment-${enrollmentId}`,
      "/api/admin/enrollments",
      { password, enrollmentId, status: "confirmed" },
      (updated) => {
        setEnrollments((prev) => prev.map((e) => e.id === enrollmentId ? { ...e, ...updated } : e));
        void refreshEnrollments(password);
      }
    );
  };

  const rejectEnrollment = async (enrollmentId: string, studentName: string, courseName: string) => {
    const confirmed = window.confirm(
      `Reject ${studentName}'s enrollment request for ${courseName}? Use this when payment could not be confirmed. No LMS access will be granted.`
    );
    if (!confirmed) return;

    const reason = window.prompt("Optional reason for rejection (e.g. payment not received):", "") || "";

    await runMutation<Enrollment>(
      `enrollment-${enrollmentId}`,
      "/api/admin/enrollments",
      { password, enrollmentId, status: "rejected", reason },
      (updated) => {
        setEnrollments((prev) => prev.map((e) => e.id === enrollmentId ? { ...e, ...updated } : e));
        void refreshEnrollments(password);
      }
    );
  };

  const disenrollEnrollment = async (enrollmentId: string, studentName: string, courseName: string) => {
    const confirmed = window.confirm(
      `Disenroll ${studentName} from ${courseName}? They will lose LMS access immediately and must pay and enroll again to regain it.`
    );
    if (!confirmed) return;

    const reason = window.prompt("Optional reason for disenrollment (kept in enrollment history):", "") || "";

    await runMutation<Enrollment>(
      `enrollment-${enrollmentId}`,
      "/api/admin/enrollments",
      { password, enrollmentId, status: "revoked", reason },
      (updated) => {
        setEnrollments((prev) => prev.map((e) => e.id === enrollmentId ? { ...e, ...updated } : e));
        void fetchData(password);
      }
    );
  };

  const toggleEnrollmentPause = async (enrollment: Enrollment, pause: boolean) => {
    if (!enrollment.studentId || enrollment.studentId === "guest") {
      setNotice("This enrollment isn't linked to a registered student account, so access can't be paused.");
      return;
    }

    if (pause && !window.confirm(
      `Pause ${enrollment.studentName}'s access to ${enrollment.courseName} until payment is completed? Their progress is kept, and access resumes as soon as you unpause.`
    )) return;

    const courseIds = enrollment.courseId.split(",").map((id) => id.trim()).filter(Boolean);

    for (const courseId of courseIds) {
      await runMutation<{ student: Student; message?: string }>(
        `pause-enrollment-${enrollment.id}`,
        "/api/admin/students",
        { password, studentId: enrollment.studentId, courseId, action: pause ? "pause-course" : "unpause-course" },
        ({ student, message }) => {
          setStudents((prev) =>
            prev.some((s) => s.id === student.id)
              ? prev.map((s) => (s.id === student.id ? { ...s, ...student } : s))
              : [...prev, student]
          );
          setNotice(message || (pause ? "Course paused." : "Course resumed."));
        }
      );
    }
  };

  const deleteEnrollment = async (enrollmentId: string, studentName: string, courseName: string) => {
    if (!window.confirm(`Permanently delete this ${courseName} enrollment record for ${studentName}? This cannot be undone.`)) return;

    await runMutation<Enrollment>(
      `enrollment-delete-${enrollmentId}`,
      "/api/admin/enrollments",
      { password, enrollmentId },
      () => {
        setEnrollments((prev) => prev.filter((e) => e.id !== enrollmentId));
      },
      "DELETE"
    );
  };

  const sendStudentEmail = async (
    studentId: string,
    emailType: "inactivity-nudge" | "new-course-suggestion",
    suggestedCourseId?: string
  ) => {
    await runMutation<{ sent: boolean; message?: string }>(
      `student-email-${studentId}-${emailType}`,
      "/api/admin/students",
      { password, studentId, emailType, ...(suggestedCourseId ? { suggestedCourseId } : {}) },
      (result) => {
        setNotice(result.message || (result.sent ? "Email sent." : "Email could not be sent."));
      }
    );
  };

  const toggleCoursePause = async (studentId: string, courseId: string, pause: boolean) => {
    if (pause && !window.confirm("Pause this student's access to the course until payment is completed?")) return;

    await runMutation<{ student: Student; message?: string }>(
      `pause-${studentId}-${courseId}`,
      "/api/admin/students",
      { password, studentId, courseId, action: pause ? "pause-course" : "unpause-course" },
      ({ student, message }) => {
        setStudents((prev) => prev.map((s) => (s.id === student.id ? { ...s, ...student } : s)));
        setNotice(message || (pause ? "Course paused." : "Course resumed."));
      }
    );
  };

  const toggleAlumniStatus = async (studentId: string, makeAlumni: boolean) => {
    await runMutation<{ student: Student; message?: string }>(
      `alumni-${studentId}`,
      "/api/admin/students",
      { password, studentId, action: makeAlumni ? "set-alumni" : "remove-alumni" },
      ({ student, message }) => {
        setStudents((prev) =>
          prev.some((s) => s.id === student.id)
            ? prev.map((s) => (s.id === student.id ? { ...s, ...student } : s))
            : [...prev, student]
        );
        setNotice(message || (makeAlumni ? "Added to Alumni Network." : "Removed from Alumni Network."));
      }
    );
  };

  const deleteStudent = async (studentId: string, studentName: string) => {
    const typed = window.prompt(
      `This permanently deletes ${studentName}'s account and everything linked to it - enrollments, progress, submissions, feedback, and analytics. This cannot be undone.\n\nType the student's name to confirm: ${studentName}`
    );
    if (typed === null) return;
    if (typed.trim().toLowerCase() !== studentName.trim().toLowerCase()) {
      setNotice("Name didn't match, so nothing was deleted.");
      return;
    }

    await runMutation<{ id: string; message?: string }>(
      `delete-student-${studentId}`,
      "/api/admin/students",
      { password, studentId },
      ({ id, message }) => {
        setStudents((prev) => prev.filter((s) => s.id !== id));
        setEnrollments((prev) => prev.filter((e) => e.studentId !== id));
        setNotice(message || "Student deleted.");
      },
      "DELETE"
    );
  };

  const saveFeedback = async (studentId: string, studentName: string, courseId: string, courseName: string) => {
    const message = (feedbackDraft[courseId] || "").trim();
    if (!message) return;

    await runMutation<CourseFeedback>(
      `feedback-${studentId}-${courseId}`,
      "/api/admin/feedback",
      { password, studentId, studentName, courseId, courseName, message },
      (created) => {
        setCourseFeedback((prev) => [created, ...prev]);
        setFeedbackDraft((prev) => ({ ...prev, [courseId]: "" }));
      }
    );
  };

  const deleteFeedback = async (id: string) => {
    if (!window.confirm("Delete this feedback entry?")) return;

    await runMutation<CourseFeedback>(
      `feedback-delete-${id}`,
      "/api/admin/feedback",
      { password, id },
      () => setCourseFeedback((prev) => prev.filter((f) => f.id !== id)),
      "DELETE"
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
    const rubric = assignmentRubrics[id] || assignments.find((assignment) => assignment.id === id)?.rubric || {
      creativity: 0,
      technicalSkill: 0,
      completeness: 0,
      presentation: 0,
      revisionNotes: "",
    };
    await runMutation<AdminAssignment>(
      `assignment-${id}`,
      "/api/admin/assignments",
      { password, id, status, feedback, rubric },
      (updated) => setAssignments((prev) => prev.map((item) => item.id === id ? { ...item, ...updated } : item))
    );
  };

  const setRubricValue = (assignment: AdminAssignment, key: keyof NonNullable<AdminAssignment["rubric"]>, value: string) => {
    setAssignmentRubrics((prev) => {
      const current = prev[assignment.id] || assignment.rubric || {
        creativity: 0,
        technicalSkill: 0,
        completeness: 0,
        presentation: 0,
        revisionNotes: "",
      };
      return {
        ...prev,
        [assignment.id]: {
          ...current,
          [key]: key === "revisionNotes" ? value : Number(value),
        },
      };
    });
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
      setIntakeSettings({ ...defaultIntakeSettings, ...data.data.intake });
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

  const updatePromoCode = (id: string, patch: Partial<PromoCode>) => {
    setDiscountSettings((current) => ({
      ...current,
      promoCodes: current.promoCodes.map((promo) => promo.id === id ? { ...promo, ...patch, updatedAt: new Date().toISOString() } : promo),
    }));
  };

  const addPromoCode = () => {
    const now = new Date().toISOString();
    setDiscountSettings((current) => ({
      ...current,
      promoCodes: [
        {
          id: `PROMO-${Date.now()}`,
          code: "NEWCODE",
          description: "New discount code",
          type: "percentage",
          value: 10,
          active: true,
          courseIds: [],
          createdAt: now,
          updatedAt: now,
        },
        ...current.promoCodes,
      ],
    }));
  };

  const removePromoCode = (id: string) => {
    setDiscountSettings((current) => ({
      ...current,
      promoCodes: current.promoCodes.filter((promo) => promo.id !== id),
    }));
  };

  const saveDiscountSettings = async () => {
    setPendingAction("discounts-save");
    setNotice("");
    try {
      const { res, data } = await fetchAdminJson<{ discounts: DiscountSettings }>("/api/admin/discounts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, discounts: discountSettings }),
      });
      if (!res.ok || !data.success || !data.data?.discounts) {
        setNotice(data.message || "Could not save discount settings.");
        return;
      }
      setDiscountSettings(data.data.discounts);
      setNotice("Discount settings saved. New enrollments will use the updated rules.");
    } catch (err) {
      setNotice(err instanceof DOMException && err.name === "AbortError"
        ? "The discount update took too long. Please try again."
        : "Could not save discount settings. Check your connection and try again.");
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

  const intakeDetailFields = [
    {
      key: "nextIntake",
      labelKey: "nextIntakeLabel",
      fallbackLabel: "Next Intake",
      valueLabel: "Date / Display Value",
      maxLength: 60,
    },
    {
      key: "learningMode",
      labelKey: "learningModeLabel",
      fallbackLabel: "Learning Mode",
      valueLabel: "Mode Text",
      maxLength: 90,
    },
    {
      key: "classDuration",
      labelKey: "classDurationLabel",
      fallbackLabel: "Class Duration",
      valueLabel: "Duration Text",
      maxLength: 90,
    },
    {
      key: "availableSeats",
      labelKey: "availableSeatsLabel",
      fallbackLabel: "Available Seats",
      valueLabel: "Seats Text",
      maxLength: 60,
    },
  ] as const;
  const certificatePreviewUrl = certificateCourseId
    ? `/api/certificates/${certificateCourseId}?preview=1&studentName=${encodeURIComponent(certificateStudentName)}`
    : "";
  const certificateCourseLessonCount = lessons.filter((l) => l.courseId === certificateCourseId).length;
  const eligibleCertificateStudents = certificateCourseId
    ? students.filter((s) => {
        if (!(s.enrolledCourses ?? []).includes(certificateCourseId)) return false;
        if (certificateCourseLessonCount === 0) return false;
        const completed = new Set(
          progress.find((p) => p.studentId === s.id && p.courseId === certificateCourseId)?.completedLessons ?? []
        ).size;
        return completed >= certificateCourseLessonCount;
      })
    : [];
  const pendingAccessRequests = enrollments.filter((enrollment) => enrollment.status === "pending");
  const approvalReadyRequests = pendingAccessRequests.filter((enrollment) =>
    enrollment.paymentVerificationStatus === "verified" ||
    enrollment.paymentVerificationStatus === "submitted" ||
    enrollment.whatsappConfirmed ||
    Boolean(enrollment.paymentConfirmedAt || enrollment.mpesaReceiptNumber || enrollment.adminApprovalStatus === "pending")
  );
  const approvalReadyRequestIds = new Set(approvalReadyRequests.map((enrollment) => enrollment.id));
  const whatsappReviewRequests = enrollments.filter((enrollment) => enrollment.status === "pending" && enrollment.whatsappConfirmed);
  const confirmedEnrollments = enrollments.filter((enrollment) => enrollment.status === "confirmed");
  const sortedEnrollments = [...enrollments].sort((a, b) => {
    const aNeedsApproval = approvalReadyRequestIds.has(a.id);
    const bNeedsApproval = approvalReadyRequestIds.has(b.id);
    const aPriority = a.status === "pending" && aNeedsApproval ? 0 : a.status === "pending" && a.whatsappConfirmed ? 1 : a.status === "pending" ? 2 : 3;
    const bPriority = b.status === "pending" && bNeedsApproval ? 0 : b.status === "pending" && b.whatsappConfirmed ? 1 : b.status === "pending" ? 2 : 3;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return new Date(b.adminReviewRequestedAt || b.whatsappSentAt || b.createdAt).getTime() - new Date(a.adminReviewRequestedAt || a.whatsappSentAt || a.createdAt).getTime();
  });
  const studentsByEnrollmentOrder = [...students].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24 pt-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" data-reveal>
          <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div>
              <p className="mb-1 text-xs font-black uppercase tracking-widest text-primary">Admin Panel</p>
              <h1 className="text-2xl font-extrabold text-dark md:text-3xl">School Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Monitor visitors, approve course access, review submissions, and keep public content current from one focused workspace.</p>
          </div>
            <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void fetchData(password)}
              disabled={loading}
                className={`rounded-xl border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-50 ${adminActionMotion}`}
            >
              {loading ? "Refreshing..." : "Refresh Data"}
            </button>
              <Link href="/" className={`rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:text-primary ${adminActionMotion}`}>
              Back to Website
            </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Unique Visitors", value: analyticsSummary?.uniqueVisitors ?? 0, icon: "UV", color: "bg-primary/10 text-primary" },
            { label: "Page Views", value: analyticsSummary?.pageViews ?? 0, icon: "PV", color: "bg-emerald-50 text-emerald-700" },
            { label: "Today's Visitors", value: analyticsSummary?.todayVisitors ?? 0, icon: "TD", color: "bg-amber-50 text-amber-700" },
          ].map((stat, i) => (
            <div key={i} className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${adminCardMotion}`} data-reveal style={{ "--reveal-delay": `${i * 45}ms` } as CSSProperties}>
              <div className="mb-4 flex items-center justify-between">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black ${stat.color}`}>{stat.icon}</div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">Live</span>
              </div>
              <div className="text-3xl font-extrabold text-dark">{stat.value}</div>
              <div className="mt-1 text-sm font-semibold text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {notice && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
            {notice}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          {adminTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold sm:px-5 ${adminTabMotion} ${tab === t ? "admin-tab-active bg-dark text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-dark"}`}
            >
              {t === "analytics" ? "Visitors" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "analytics" && (
          <div key="analytics-panel" className="admin-tab-panel space-y-6">
            <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${adminPanelMotion}`}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-dark">Top Pages</h3>
                  <p className="mt-1 text-xs font-medium text-slate-500">Most visited routes</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black text-primary">{analyticsSummary?.topPages.length ?? 0}</span>
              </div>
              {analyticsSummary?.topPages.length ? (
                <ul className="space-y-2">
                  {analyticsSummary.topPages.map((p) => (
                    <li key={p.path} className={`flex items-center justify-between gap-4 rounded-xl border border-transparent px-3 py-2 text-sm ${adminRowMotion}`}>
                      <span className="min-w-0 truncate font-medium text-slate-700">{p.path}</span>
                      <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-primary">{p.count} views</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No page views yet. Browse the site to collect data.</p>
              )}
            </div>

            <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${adminPanelMotion}`}>
              <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <h3 className="font-bold text-dark">Visitor Sessions</h3>
                <p className="mt-1 text-xs font-medium text-slate-500">Everyone who viewed or engaged with the website</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4 text-left">Visitor</th>
                      <th className="px-6 py-4 text-left">Device</th>
                      <th className="px-6 py-4 text-left">Views</th>
                      <th className="px-6 py-4 text-left">Referrer</th>
                      <th className="px-6 py-4 text-left">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {visitorSessions.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-12 text-gray-400">No visitors tracked yet</td></tr>
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
                        <td className="px-6 py-4 font-bold text-primary">{s.pageViews}</td>
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
          </div>
        )}

        {/* Enrollments Table */}
        {tab === "enrollments" && (
          <div key="enrollments-panel" className="admin-tab-panel space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/10 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-[#128C43]">Access Requests</p>
                <p className="mt-2 text-3xl font-black text-dark">{pendingAccessRequests.length}</p>
                <p className="mt-1 text-sm font-medium text-gray-600">Students who submitted enrollment requests and are waiting for admin approval.</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-amber-700">Ready for Approval</p>
                <p className="mt-2 text-3xl font-black text-dark">{approvalReadyRequests.length}</p>
                <p className="mt-1 text-sm font-medium text-gray-600">Requests with submitted payment details. WhatsApp review clicks: {whatsappReviewRequests.length}.</p>
              </div>
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-green-700">Approved Access</p>
                <p className="mt-2 text-3xl font-black text-dark">{confirmedEnrollments.length}</p>
                <p className="mt-1 text-sm font-medium text-gray-600">Students approved and ready for LMS course access.</p>
              </div>
            </div>

            <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
              <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-black text-dark">Enrollment Access Requests</h2>
                  <p className="mt-1 text-sm text-gray-500">Approve an enrollment request after checking the payment details. Approval unlocks the selected LMS courses for the matching student account.</p>
                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    {enrollmentsLastUpdated
                      ? `Auto-sync active. Last checked ${new Date(enrollmentsLastUpdated).toLocaleTimeString()}.`
                      : "Auto-sync starts when this tab opens."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void refreshEnrollments(password)}
                  disabled={enrollmentsLoading}
                  className={`shrink-0 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-dark disabled:opacity-50 ${adminActionMotion}`}
                >
                  {enrollmentsLoading ? "Checking..." : "Refresh Enrollments"}
                </button>
              </div>
              <div className="border-b border-gray-100 bg-[#F6FAFF] px-6 py-4">
                <div className="grid gap-3 text-sm md:grid-cols-3">
                  <div className="rounded-xl border border-blue-100 bg-white p-4">
                    <p className="font-black text-dark">1. Verify payment</p>
                    <p className="mt-1 text-gray-500">Match the M-Pesa receipt, payer phone, amount, and enrollment reference before approval.</p>
                  </div>
                  <div className="rounded-xl border border-green-100 bg-white p-4">
                    <p className="font-black text-dark">2. Approve LMS access</p>
                    <p className="mt-1 text-gray-500">Use the approval button to mark the request confirmed and attach the selected course to the student.</p>
                  </div>
                  <div className="rounded-xl border border-amber-100 bg-white p-4">
                    <p className="font-black text-dark">3. Student signs in</p>
                    <p className="mt-1 text-gray-500">The student must use the same email or phone from enrollment to see the approved course in the LMS.</p>
                  </div>
                </div>
              </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">Student</th>
                    <th className="px-6 py-4 text-left">Course</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Payment</th>
                    <th className="px-6 py-4 text-left">Referral</th>
                    <th className="px-6 py-4 text-left">Ref</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enrollmentsLoading && enrollments.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-12 text-gray-400">Loading enrollment requests...</td></tr>
                  ) : enrollments.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-12 text-gray-400">No enrollment requests found yet</td></tr>
                  ) : sortedEnrollments.map((e) => {
                    const isApprovalReady = approvalReadyRequestIds.has(e.id);
                    const isRecentEnrollment = Date.now() - new Date(e.createdAt).getTime() < 24 * 60 * 60 * 1000;
                    const enrollmentCourseIds = e.courseId.split(",").map((id) => id.trim()).filter(Boolean);
                    const enrollmentStudent = students.find((s) => s.id === e.studentId);
                    const isEnrollmentPaused = enrollmentCourseIds.length > 0 && enrollmentCourseIds.every((id) =>
                      (enrollmentStudent?.pausedCourses ?? []).includes(id)
                    );
                    return (
                      <tr key={e.id} className={`${adminRowMotion} ${isApprovalReady ? "bg-[#25D366]/5" : ""}`}>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-dark">{e.studentName}</span>
                          {isRecentEnrollment && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary">
                              New
                            </span>
                          )}
                        </div>
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
                        {e.promoDiscount ? (
                          <div className="text-xs font-semibold text-blue-700">
                            Promo Ksh {e.promoDiscount}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <div className="font-bold uppercase text-dark">{e.paymentProvider || "mpesa"}</div>
                        {e.mpesaReceiptNumber ? (
                          <div className="mt-2 space-y-1 rounded-xl bg-green-50 p-3 text-green-900">
                            <div className="font-mono font-black">{e.mpesaReceiptNumber}</div>
                            <div>Paid by: <span className="font-bold">{e.mpesaPayerName || e.studentName}</span></div>
                            <div>Phone: <span className="font-bold">{e.mpesaPhoneNumber || e.phone}</span></div>
                            {e.mpesaNotes && <div className="text-green-700">{e.mpesaNotes}</div>}
                          </div>
                        ) : (
                          <span className="mt-2 inline-block text-gray-400">Awaiting admin payment check</span>
                        )}
                        {e.paymentVerificationStatus && (
                          <div className="mt-2 rounded-lg bg-blue-50 px-2 py-1 font-bold text-blue-700">
                            {e.paymentVerificationStatus.replace("_", " ")}
                          </div>
                        )}
                        {e.adminNotificationMessage && (
                          <div className="mt-2 max-w-[240px] text-[11px] font-semibold text-gray-500">
                            {e.adminNotificationMessage}
                          </div>
                        )}
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
                        {e.promoCode && (
                          <div className="mt-2 rounded-lg bg-blue-50 px-2 py-1 font-mono font-bold text-blue-700">
                            {e.promoCode}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-600">{e.reference}</td>
                      <td className="px-6 py-4 text-gray-500">
                        <div>{new Date(e.createdAt).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">{new Date(e.createdAt).toLocaleTimeString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          e.status === "confirmed" ? "bg-green-100 text-green-700"
                          : e.status === "revoked" ? "bg-red-100 text-red-700"
                          : e.status === "rejected" ? "bg-gray-200 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {e.status}
                        </span>
                        {e.whatsappConfirmed && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-[#25D366] px-2 py-1 text-[10px] font-black text-white" title={e.whatsappSentAt ? `WhatsApp sent ${new Date(e.whatsappSentAt).toLocaleString()}` : "WhatsApp review requested"}>
                            Review request
                          </span>
                        )}
                        {e.adminApprovalStatus === "pending" && e.status === "pending" && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-[10px] font-black text-blue-700" title={e.adminReviewRequestedAt ? `Requested ${new Date(e.adminReviewRequestedAt).toLocaleString()}` : "Admin approval required"}>
                            Admin approval
                          </span>
                        )}
                        {e.accessGrantMessage && (
                          <p className={`mt-2 max-w-[220px] text-xs font-semibold ${
                            e.accessGrantedAt ? "text-green-700"
                            : e.status === "revoked" ? "text-red-700"
                            : e.status === "rejected" ? "text-gray-600"
                            : "text-amber-700"
                          }`}>
                            {e.accessGrantMessage}
                          </p>
                        )}
                        {e.revokedReason && (
                          <p className="mt-2 max-w-[220px] text-xs font-semibold text-red-600">
                            Reason: {e.revokedReason}
                          </p>
                        )}
                        {e.rejectedReason && (
                          <p className="mt-2 max-w-[220px] text-xs font-semibold text-gray-600">
                            Reason: {e.rejectedReason}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {e.status === "pending" && (
                          <div className="flex flex-col items-start gap-1.5">
                            <button
                              type="button"
                              title="Approve this payment and unlock the selected LMS course for the matching student account"
                              onClick={() => void confirmEnrollment(e.id)}
                              disabled={pendingAction === `enrollment-${e.id}`}
                              className={`bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 disabled:opacity-50 ${adminActionMotion}`}
                            >
                              {pendingAction === `enrollment-${e.id}` ? "Approving..." : "Approve LMS"}
                            </button>
                            <button
                              type="button"
                              title="Reject this enrollment because payment could not be confirmed. No LMS access will be granted."
                              onClick={() => void rejectEnrollment(e.id, e.studentName, e.courseName)}
                              disabled={pendingAction === `enrollment-${e.id}`}
                              className={`bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 disabled:opacity-50 ${adminActionMotion}`}
                            >
                              {pendingAction === `enrollment-${e.id}` ? "Rejecting..." : "Reject"}
                            </button>
                          </div>
                        )}
                        {e.status === "confirmed" && (
                          <div className="flex flex-col items-start gap-1.5">
                            <span className={`text-xs font-bold ${isEnrollmentPaused ? "text-amber-700" : "text-green-700"}`}>
                              {isEnrollmentPaused ? "Approved (Paused)" : "Approved"}
                            </span>
                            <button
                              type="button"
                              title={isEnrollmentPaused
                                ? "Resume this student's LMS access now that payment is complete."
                                : "Temporarily pause this student's LMS access if payment is incomplete. Reversible, keeps their progress."}
                              onClick={() => void toggleEnrollmentPause(e, !isEnrollmentPaused)}
                              disabled={pendingAction === `pause-enrollment-${e.id}`}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50 ${adminActionMotion} ${
                                isEnrollmentPaused ? "bg-green-500 text-white hover:bg-green-600" : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                              }`}
                            >
                              {pendingAction === `pause-enrollment-${e.id}` ? "Saving..." : isEnrollmentPaused ? "Resume" : "Pause"}
                            </button>
                            <button
                              type="button"
                              title="Revoke this student's LMS access for these course(s). They will need to pay and enroll again."
                              onClick={() => void disenrollEnrollment(e.id, e.studentName, e.courseName)}
                              disabled={pendingAction === `enrollment-${e.id}`}
                              className={`bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 disabled:opacity-50 ${adminActionMotion}`}
                            >
                              {pendingAction === `enrollment-${e.id}` ? "Revoking..." : "Disenroll"}
                            </button>
                          </div>
                        )}
                        {(e.status === "revoked" || e.status === "rejected") && (
                          <div className="flex flex-col items-start gap-1.5">
                            <span className={`text-xs font-bold ${e.status === "revoked" ? "text-red-700" : "text-gray-600"}`}>
                              {e.status === "revoked" ? "Revoked" : "Rejected"}
                            </span>
                            <button
                              type="button"
                              title="Permanently delete this enrollment record to keep the list tidy."
                              onClick={() => void deleteEnrollment(e.id, e.studentName, e.courseName)}
                              disabled={pendingAction === `enrollment-delete-${e.id}`}
                              className={`bg-gray-100 text-gray-500 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 disabled:opacity-50 ${adminActionMotion}`}
                            >
                              {pendingAction === `enrollment-delete-${e.id}` ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        )}
                      </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}

        {/* Students Table */}
        {tab === "students" && (
          <div key="students-panel" className={`admin-tab-panel bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">#</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Phone</th>
                    <th className="px-6 py-4 text-left">Courses</th>
                    <th className="px-6 py-4 text-left">Joined</th>
                    <th className="px-6 py-4 text-left">Alumni</th>
                    <th className="px-6 py-4 text-left">Progress</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-12 text-gray-400">No registered students yet</td></tr>
                  ) : studentsByEnrollmentOrder.map((s, index) => (
                    <tr key={s.id} className={adminRowMotion}>
                      <td className="px-6 py-4 font-bold text-gray-400">{index + 1}</td>
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
                      <td className="px-6 py-4">
                        {s.isAlumni ? (
                          <span className="bg-green-100 text-green-700 font-bold text-xs px-2 py-1 rounded-full">
                            Alumni
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => setProgressStudentId(s.id)}
                          className={`font-bold text-primary text-xs hover:underline ${adminActionMotion}`}
                        >
                          View Progress
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => void toggleAlumniStatus(s.id, !s.isAlumni)}
                            disabled={pendingAction === `alumni-${s.id}`}
                            className={`rounded-lg px-3 py-1.5 text-xs font-bold disabled:opacity-50 ${s.isAlumni ? "bg-gray-100 text-dark" : "bg-green-50 text-green-700 hover:bg-green-100"} ${adminActionMotion}`}
                          >
                            {pendingAction === `alumni-${s.id}` ? "Saving..." : s.isAlumni ? "Remove Alumni" : "Make Alumni"}
                          </button>
                          <button
                            type="button"
                            onClick={() => void deleteStudent(s.id, s.name)}
                            disabled={pendingAction === `delete-student-${s.id}`}
                            className={`rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50 ${adminActionMotion}`}
                          >
                            {pendingAction === `delete-student-${s.id}` ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {progressStudentId && (() => {
          const progressStudent = students.find((item) => item.id === progressStudentId);
          if (!progressStudent) return null;

          const studentId = progressStudent.id;
          const studentProgress = progress.filter((p) => p.studentId === studentId);
          const studentAssignments = assignments.filter((a) => a.studentId === studentId);
          const studentProjects = projects.filter((p) => p.studentName === progressStudent.name);
          const studentFeedback = courseFeedback.filter((f) => f.studentId === studentId);
          const enrolledCourseIds = progressStudent.enrolledCourses ?? [];

          const studentSessions = visitorSessions.filter((s) =>
            s.userId === studentId || (Boolean(s.userEmail) && s.userEmail === progressStudent.email)
          );
          const studentEvents = analyticsEvents
            .filter((e) => Boolean(e.userEmail) && e.userEmail === progressStudent.email)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          const latestSession = [...studentSessions].sort(
            (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
          )[0];
          const totalPageViews = studentSessions.reduce((sum, s) => sum + (s.pageViews || 0), 0);

          const leaderboardIndex = leaderboard.findIndex((entry) => entry.studentId === studentId);
          const leaderboardEntry = leaderboardIndex > -1 ? leaderboard[leaderboardIndex] : null;

          const availableCourses = courses.filter((c) => !enrolledCourseIds.includes(c.id));
          const selectedSuggestedCourseId = suggestedCourseByStudent[studentId] || availableCourses[0]?.id || "";

          const closeModal = () => {
            setProgressStudentId(null);
            setFeedbackDraft({});
            setSuggestedCourseByStudent({});
          };

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
              <div className="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-dark">{progressStudent.name}&apos;s Progress</h3>
                    <p className="text-xs text-gray-500">{progressStudent.email} - {progressStudent.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-4 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      title="Email this student encouraging them to continue their in-progress course(s)"
                      onClick={() => void sendStudentEmail(studentId, "inactivity-nudge")}
                      disabled={pendingAction === `student-email-${studentId}-inactivity-nudge`}
                      className={`rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-50 ${adminActionMotion}`}
                    >
                      {pendingAction === `student-email-${studentId}-inactivity-nudge` ? "Sending..." : "Send Inactivity Nudge"}
                    </button>
                    {availableCourses.length > 0 && (
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedSuggestedCourseId}
                          onChange={(e) => setSuggestedCourseByStudent((prev) => ({ ...prev, [studentId]: e.target.value }))}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-2 py-1.5 text-xs font-bold text-blue-700 outline-none focus:ring-2 focus:ring-primary"
                        >
                          {availableCourses.map((c) => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          title="Email this student suggesting the selected course, for after they've completed one"
                          onClick={() => void sendStudentEmail(studentId, "new-course-suggestion", selectedSuggestedCourseId)}
                          disabled={pendingAction === `student-email-${studentId}-new-course-suggestion` || !selectedSuggestedCourseId}
                          className={`rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 disabled:opacity-50 ${adminActionMotion}`}
                        >
                          {pendingAction === `student-email-${studentId}-new-course-suggestion` ? "Sending..." : "Suggest This Course"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-primary/15 bg-primary/5 p-4">
                      <p className="text-xs font-black uppercase tracking-wider text-primary">Leaderboard Position</p>
                      {leaderboardEntry ? (
                        <>
                          <p className="mt-1 text-2xl font-black text-dark">#{leaderboardIndex + 1}</p>
                          <p className="text-xs text-gray-500">{leaderboardEntry.rankLabel} - {leaderboardEntry.score} pts</p>
                        </>
                      ) : (
                        <p className="mt-1 text-sm text-gray-400">Not ranked yet - no LMS activity recorded.</p>
                      )}
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <p className="text-xs font-black uppercase tracking-wider text-gray-400">Site Activity</p>
                      {latestSession ? (
                        <>
                          <p className="mt-1 text-sm font-bold text-dark">Last seen {new Date(latestSession.lastSeen).toLocaleString()}</p>
                          <p className="text-xs text-gray-500">
                            Last page: {latestSession.lastPage || "-"} - {latestSession.device || "Unknown device"} - {totalPageViews} page view(s)
                          </p>
                        </>
                      ) : (
                        <p className="mt-1 text-sm text-gray-400">No tracked site visits yet.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Course Progress & Feedback</h4>
                    {enrolledCourseIds.length === 0 ? (
                      <p className="text-sm text-gray-400">Not enrolled in any course yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {enrolledCourseIds.map((courseId) => {
                          const course = courses.find((c) => c.id === courseId);
                          const courseLessons = [...lessons.filter((l) => l.courseId === courseId)].sort((a, b) => a.order - b.order);
                          const record = studentProgress.find((p) => p.courseId === courseId);
                          const completedSet = new Set(record?.completedLessons ?? []);
                          const completed = completedSet.size;
                          const total = courseLessons.length;
                          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                          const currentLesson = courseLessons.find((l) => !completedSet.has(l.id));
                          const quizScores = record?.quizScores ?? [];
                          const avgQuiz = quizScores.length > 0
                            ? Math.round((quizScores.reduce((sum, q) => sum + (q.total > 0 ? q.score / q.total : 0), 0) / quizScores.length) * 100)
                            : null;
                          const courseFeedbackEntries = studentFeedback.filter((f) => f.courseId === courseId);
                          const courseTitle = course?.title || courseId;
                          const feedbackActionKey = `feedback-${studentId}-${courseId}`;
                          const isPaused = (progressStudent.pausedCourses ?? []).includes(courseId);
                          const pauseActionKey = `pause-${studentId}-${courseId}`;

                          return (
                            <div key={courseId} className={`rounded-xl border p-4 ${isPaused ? "border-amber-200 bg-amber-50" : "border-gray-100 bg-gray-50"}`}>
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-dark text-sm">{courseTitle}</span>
                                  {isPaused && (
                                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-amber-700">
                                      Paused
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-bold text-primary">{percent}% complete</span>
                                  <button
                                    type="button"
                                    title={isPaused ? "Resume access once payment is completed" : "Pause access while payment is outstanding"}
                                    onClick={() => void toggleCoursePause(studentId, courseId, !isPaused)}
                                    disabled={pendingAction === pauseActionKey}
                                    className={`rounded-lg px-3 py-1 text-xs font-bold disabled:opacity-50 ${adminActionMotion} ${
                                      isPaused ? "bg-green-500 text-white hover:bg-green-600" : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                    }`}
                                  >
                                    {pendingAction === pauseActionKey ? "Saving..." : isPaused ? "Resume" : "Pause"}
                                  </button>
                                </div>
                              </div>
                              {isPaused && (
                                <p className="mt-2 text-xs font-semibold text-amber-700">
                                  This student cannot access lessons, quizzes, or the certificate for this course until an admin resumes it.
                                </p>
                              )}
                              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                                <span>{completed} of {total} lessons completed</span>
                                <span>Currently on: {total === 0 ? "-" : currentLesson ? currentLesson.title : "Course completed"}</span>
                                {record?.lastAccessed && (
                                  <span>Last accessed: {new Date(record.lastAccessed).toLocaleString()}</span>
                                )}
                                {total > 0 && completed >= total && (
                                  <a
                                    href={`/api/certificates/${courseId}?studentId=${studentId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-bold text-primary hover:underline"
                                  >
                                    View Certificate
                                  </a>
                                )}
                              </div>

                              {quizScores.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs font-bold text-gray-500 mb-1">Quiz results (avg {avgQuiz}%)</p>
                                  <div className="space-y-1">
                                    {quizScores.map((q, i) => {
                                      const lesson = lessons.find((l) => l.id === q.lessonId);
                                      const pct = q.total > 0 ? Math.round((q.score / q.total) * 100) : 0;
                                      return (
                                        <div key={`${q.lessonId}-${i}`} className="flex items-center justify-between text-xs text-gray-600">
                                          <span>{lesson?.title || q.lessonId}</span>
                                          <span className={`font-bold ${pct >= 70 ? "text-green-700" : pct >= 40 ? "text-amber-700" : "text-red-700"}`}>
                                            {q.score}/{q.total} ({pct}%)
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              <div className="mt-3 border-t border-gray-200 pt-3">
                                <p className="text-xs font-bold text-gray-500 mb-1">Admin Feedback</p>
                                {courseFeedbackEntries.length > 0 && (
                                  <div className="mb-2 space-y-2">
                                    {courseFeedbackEntries.map((f) => (
                                      <div key={f.id} className="flex items-start justify-between gap-2 rounded-lg bg-white p-2 text-xs">
                                        <div>
                                          <p className="text-gray-700">{f.message}</p>
                                          <p className="mt-1 text-[10px] text-gray-400">{new Date(f.createdAt).toLocaleString()}</p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => void deleteFeedback(f.id)}
                                          className="shrink-0 text-gray-400 hover:text-red-600"
                                          title="Delete feedback"
                                        >
                                          x
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <textarea
                                  value={feedbackDraft[courseId] || ""}
                                  onChange={(e) => setFeedbackDraft((prev) => ({ ...prev, [courseId]: e.target.value }))}
                                  placeholder={`Write feedback for ${progressStudent.name} on ${courseTitle}...`}
                                  rows={2}
                                  maxLength={1000}
                                  className="w-full rounded-lg border border-gray-200 p-2 text-xs outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button
                                  type="button"
                                  disabled={!feedbackDraft[courseId]?.trim() || pendingAction === feedbackActionKey}
                                  onClick={() => void saveFeedback(studentId, progressStudent.name, courseId, courseTitle)}
                                  className={`mt-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white disabled:opacity-40 ${adminActionMotion}`}
                                >
                                  {pendingAction === feedbackActionKey ? "Saving..." : "Save Feedback"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Assignment Submissions</h4>
                    {studentAssignments.length === 0 ? (
                      <p className="text-sm text-gray-400">No assignments submitted yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {studentAssignments.map((a) => (
                          <div key={a.id} className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 px-3 py-2 text-xs">
                            <div>
                              <span className="font-bold text-dark">{a.lessonTitle}</span>
                              <span className="text-gray-400"> - {a.courseName}</span>
                            </div>
                            <span className={`rounded-full px-2 py-1 font-bold ${
                              a.status === "reviewed" ? "bg-green-100 text-green-700"
                              : a.status === "revision" ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                            }`}>
                              {a.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Project Gallery Submissions</h4>
                    {studentProjects.length === 0 ? (
                      <p className="text-sm text-gray-400">No projects submitted yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {studentProjects.map((p) => (
                          <div key={p.id} className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 px-3 py-2 text-xs">
                            <div>
                              <span className="font-bold text-dark">{p.title}</span>
                              <span className="text-gray-400"> - {p.courseName}</span>
                            </div>
                            <span className={`rounded-full px-2 py-1 font-bold ${
                              p.status === "approved" ? "bg-green-100 text-green-700"
                              : p.status === "rejected" ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {p.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Recent Site Activity</h4>
                    {studentEvents.length === 0 ? (
                      <p className="text-sm text-gray-400">No tracked activity yet. Game play is only saved on the student&apos;s own browser and isn&apos;t tracked here.</p>
                    ) : (
                      <div className="space-y-1">
                        {studentEvents.slice(0, 10).map((ev) => (
                          <div key={ev.id} className="flex items-center justify-between gap-2 text-xs text-gray-600">
                            <span>{ev.type.replace(/_/g, " ")} - {ev.path}{ev.label ? ` (${ev.label})` : ""}</span>
                            <span className="shrink-0 text-gray-400">{new Date(ev.createdAt).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {tab === "reviews" && (
          <div key="reviews-panel" className={`admin-tab-panel bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
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
                    <p className="text-xs text-gray-400">{review.role || "Student"} - {review.courseName || "General review"} - {review.approved ? "Approved" : "Pending"}</p>
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
          <div key="projects-panel" className={`admin-tab-panel bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
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
                    {project.status === "approved" && (
                      <Link href={`/gallery/${project.id}`} className="mt-3 inline-flex text-xs font-black uppercase tracking-widest text-primary hover:underline">
                        View public page
                      </Link>
                    )}
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
          <div key="assignments-panel" className={`admin-tab-panel bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
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
                    {assignment.rubric && (
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
                        {[
                          ["Creativity", assignment.rubric.creativity],
                          ["Technical", assignment.rubric.technicalSkill],
                          ["Complete", assignment.rubric.completeness],
                          ["Presentation", assignment.rubric.presentation],
                        ].map(([label, value]) => (
                          <span key={label} className="rounded-lg bg-gray-50 px-3 py-2 font-bold text-gray-600">{label}: {value}/5</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-full space-y-3 md:w-80">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["creativity", "Creativity"],
                        ["technicalSkill", "Technical Skill"],
                        ["completeness", "Completeness"],
                        ["presentation", "Presentation"],
                      ].map(([key, label]) => {
                        const rubric = assignmentRubrics[assignment.id] || assignment.rubric;
                        return (
                          <label key={key} className="block text-xs font-black uppercase tracking-widest text-gray-400">
                            {label}
                            <input
                              type="number"
                              min={0}
                              max={5}
                              value={Number(rubric?.[key as keyof NonNullable<AdminAssignment["rubric"]>] || 0)}
                              onChange={(e) => setRubricValue(assignment, key as keyof NonNullable<AdminAssignment["rubric"]>, e.target.value)}
                              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-bold text-dark outline-none focus:border-primary"
                            />
                          </label>
                        );
                      })}
                    </div>
                    <label htmlFor={`assignment-revision-${assignment.id}`} className="block text-xs font-black uppercase tracking-widest text-gray-400">Revision Notes</label>
                    <textarea
                      id={`assignment-revision-${assignment.id}`}
                      value={assignmentRubrics[assignment.id]?.revisionNotes ?? assignment.rubric?.revisionNotes ?? ""}
                      onChange={(e) => setRubricValue(assignment, "revisionNotes", e.target.value)}
                      className="min-h-20 w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
                      maxLength={800}
                      placeholder="Specific revision instructions tied to the rubric"
                    />
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

        {tab === "certificates" && (
          <div key="certificates-panel" className="admin-tab-panel space-y-6">
            <section className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ${adminPanelMotion}`} data-reveal>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-dark">Certificate Preview</h3>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-500">
                    Preview the exact designed PDF certificate students receive after completing any course. This admin preview does not require lesson completion.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {certificatePreviewUrl && (
                    <>
                      <a
                        href={certificatePreviewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`premium-button rounded-xl bg-dark px-5 py-3 text-sm font-bold text-white ${adminActionMotion}`}
                      >
                        Open Full Preview
                      </a>
                      <a
                        href={`${certificatePreviewUrl}&download=1`}
                        target="_blank"
                        rel="noreferrer"
                        className={`premium-button rounded-xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-bold text-primary ${adminActionMotion}`}
                      >
                        Download Sample PDF
                      </a>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr]">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400">
                  Course
                  <select
                    value={certificateCourseId}
                    onChange={(event) => setCertificateCourseId(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-dark outline-none focus:border-primary"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400">
                  Preview Student Name
                  <input
                    value={certificateStudentName}
                    onChange={(event) => setCertificateStudentName(event.target.value)}
                    maxLength={60}
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-dark outline-none focus:border-primary"
                    placeholder="Student name on certificate"
                  />
                </label>
              </div>
            </section>

            <section className={`overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm ${adminPanelMotion}`} data-reveal>
              <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-extrabold text-dark">Students Eligible for This Certificate</h4>
                  <p className="text-xs text-gray-500">
                    Students enrolled in {courses.find((c) => c.id === certificateCourseId)?.title || "this course"} who have completed all {certificateCourseLessonCount} lesson(s). Each download is their real, verifiable certificate.
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">
                  {eligibleCertificateStudents.length} eligible
                </span>
              </div>
              {eligibleCertificateStudents.length === 0 ? (
                <p className="p-6 text-sm text-gray-400">No students have completed every lesson in this course yet.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {eligibleCertificateStudents.map((s) => (
                    <div key={s.id} className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-bold text-dark">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.email}</p>
                      </div>
                      <a
                        href={`/api/certificates/${certificateCourseId}?studentId=${s.id}&download=1`}
                        target="_blank"
                        rel="noreferrer"
                        className={`premium-button inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary/90 ${adminActionMotion}`}
                      >
                        Download Certificate
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className={`overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm ${adminPanelMotion}`} data-reveal>
              <div className="flex flex-col gap-2 border-b border-gray-100 px-6 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="font-extrabold text-dark">Issued Certificate Structure</h4>
                  <p className="text-xs text-gray-500">Landscape PDF with logo, seal, graphics, course completion copy, signature, certificate ID, and verification URL.</p>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-green-700">PDF Preview</span>
              </div>
              {certificatePreviewUrl ? (
                <iframe
                  key={certificatePreviewUrl}
                  title="Certificate PDF preview"
                  src={certificatePreviewUrl}
                  className="admin-preview-frame h-[560px] w-full bg-gray-50"
                />
              ) : (
                <p className="p-6 text-sm text-gray-400">Select a course to preview its certificate.</p>
              )}
            </section>
          </div>
        )}

        {tab === "discounts" && (
          <div key="discounts-panel" className="admin-tab-panel space-y-8">
            <div className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ${adminPanelMotion}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-dark">Coupon & Discount Manager</h3>
                  <p className="mt-1 text-sm text-gray-500">Create promo codes, referral reward rules, expiry dates, usage limits, and course-specific discounts.</p>
                </div>
                <button
                  type="button"
                  onClick={() => void saveDiscountSettings()}
                  disabled={pendingAction === "discounts-save"}
                  className={`rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white disabled:opacity-50 ${adminActionMotion}`}
                >
                  {pendingAction === "discounts-save" ? "Saving..." : "Save Discounts"}
                </button>
              </div>
            </div>

            <section className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ${adminPanelMotion}`}>
              <h4 className="mb-5 text-lg font-extrabold text-dark">Referral Reward Rules</h4>
              <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                <label className="flex items-center gap-3 rounded-2xl bg-light-gray px-4 py-3 text-sm font-bold text-dark">
                  <input
                    type="checkbox"
                    checked={discountSettings.referral.active}
                    onChange={(e) => setDiscountSettings((prev) => ({ ...prev, referral: { ...prev.referral, active: e.target.checked } }))}
                    className="h-4 w-4 accent-primary"
                  />
                  Active
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={discountSettings.referral.studentDiscountPercent}
                  onChange={(e) => setDiscountSettings((prev) => ({ ...prev, referral: { ...prev.referral, studentDiscountPercent: Number(e.target.value) } }))}
                  className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary"
                  placeholder="Student referral discount percent"
                />
                <textarea
                  value={discountSettings.referral.rewardNote}
                  onChange={(e) => setDiscountSettings((prev) => ({ ...prev, referral: { ...prev.referral, rewardNote: e.target.value } }))}
                  rows={3}
                  className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2"
                  placeholder="Admin note about referral rewards"
                />
              </div>
            </section>

            <section className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ${adminPanelMotion}`}>
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-lg font-extrabold text-dark">Promo Codes</h4>
                  <p className="text-sm text-gray-500">Leave course selection empty to apply a code to all courses.</p>
                </div>
                <button type="button" onClick={addPromoCode} className={`rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-primary ${adminActionMotion}`}>
                  Add Promo Code
                </button>
              </div>

              <div className="space-y-5">
                {discountSettings.promoCodes.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-gray-300 p-6 text-sm text-gray-400">No promo codes yet.</p>
                ) : discountSettings.promoCodes.map((promo) => (
                  <div key={promo.id} className="rounded-2xl border border-gray-100 p-5">
                    <div className="grid gap-4 md:grid-cols-4">
                      <input value={promo.code} onChange={(e) => updatePromoCode(promo.id, { code: e.target.value.toUpperCase() })} className="rounded-xl border border-gray-200 px-4 py-3 font-mono text-sm font-bold uppercase outline-none focus:border-primary" placeholder="CODE" />
                      <select value={promo.type} onChange={(e) => updatePromoCode(promo.id, { type: e.target.value as PromoCode["type"] })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary">
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                      </select>
                      <input type="number" min={0} value={promo.value} onChange={(e) => updatePromoCode(promo.id, { value: Number(e.target.value) })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder={promo.type === "percentage" ? "Percent" : "Amount"} />
                      <label className="flex items-center gap-3 rounded-xl bg-light-gray px-4 py-3 text-sm font-bold text-dark">
                        <input type="checkbox" checked={promo.active} onChange={(e) => updatePromoCode(promo.id, { active: e.target.checked })} className="h-4 w-4 accent-primary" />
                        Active
                      </label>
                      <input value={promo.description} onChange={(e) => updatePromoCode(promo.id, { description: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary md:col-span-2" placeholder="Description" />
                      <input type="date" value={promo.startsAt ? promo.startsAt.slice(0, 10) : ""} onChange={(e) => updatePromoCode(promo.id, { startsAt: e.target.value || undefined })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" />
                      <input type="date" value={promo.expiresAt ? promo.expiresAt.slice(0, 10) : ""} onChange={(e) => updatePromoCode(promo.id, { expiresAt: e.target.value || undefined })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" />
                      <input type="number" min={1} value={promo.usageLimit || ""} onChange={(e) => updatePromoCode(promo.id, { usageLimit: e.target.value ? Number(e.target.value) : undefined })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Usage limit" />
                      <div className="md:col-span-3">
                        <p className="mb-2 text-xs font-black uppercase tracking-widest text-gray-400">Applies To</p>
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {courses.map((course) => {
                            const selected = promo.courseIds?.includes(course.id) || false;
                            const nextCourseIds = selected
                              ? (promo.courseIds || []).filter((id) => id !== course.id)
                              : [...(promo.courseIds || []), course.id];
                            return (
                              <label key={course.id} className="flex items-center gap-2 rounded-xl bg-light-gray px-3 py-2 text-xs font-bold text-gray-600">
                                <input type="checkbox" checked={selected} onChange={() => updatePromoCode(promo.id, { courseIds: nextCourseIds })} className="h-4 w-4 accent-primary" />
                                {course.shortTitle}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <button type="button" onClick={() => removePromoCode(promo.id)} className={`rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 hover:bg-red-100 ${adminActionMotion}`}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {tab === "settings" && (
          <div key="settings-panel" className={`admin-tab-panel bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${adminPanelMotion}`}>
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
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Countdown Heading</label>
                  <input
                    value={intakeSettings.countdownTitle}
                    onChange={(e) => setIntakeSettings((prev) => ({ ...prev, countdownTitle: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                    maxLength={50}
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

              <div className="rounded-2xl border border-gray-100 bg-light-gray p-4">
                <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-dark">Homepage Cards</p>
                    <p className="text-xs text-gray-500">Edit both the small uppercase card label and the bold value shown underneath.</p>
                  </div>
                  <span className="text-xs font-bold text-primary">Live preview below</span>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {intakeDetailFields.map((field) => (
                    <div key={field.key} className="rounded-2xl border border-gray-100 bg-white p-4">
                      <div className="grid gap-3 sm:grid-cols-[0.85fr_1.15fr]">
                        <div>
                          <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">Card Label</label>
                          <input
                            value={intakeSettings[field.labelKey] || field.fallbackLabel}
                            onChange={(e) => setIntakeSettings((prev) => ({ ...prev, [field.labelKey]: e.target.value }))}
                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-bold outline-none focus:border-primary"
                            maxLength={40}
                            required
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-gray-400">{field.valueLabel}</label>
                          <input
                            value={intakeSettings[field.key]}
                            onChange={(e) => setIntakeSettings((prev) => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-bold outline-none focus:border-primary"
                            maxLength={field.maxLength}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="grid gap-4 md:grid-cols-[0.4fr_1fr]">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Schedule Label</label>
                    <input
                      value={intakeSettings.weeklyScheduleLabel}
                      onChange={(e) => setIntakeSettings((prev) => ({ ...prev, weeklyScheduleLabel: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                      maxLength={40}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Schedule Note</label>
                    <textarea
                      value={intakeSettings.weeklySchedule}
                      onChange={(e) => setIntakeSettings((prev) => ({ ...prev, weeklySchedule: e.target.value }))}
                      className="min-h-24 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary"
                      maxLength={180}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-light-gray p-5">
                <p className="text-xs font-black uppercase tracking-widest text-primary">Homepage Preview</p>
                <div className="mt-3 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <h4 className="text-2xl font-extrabold text-dark">{intakeSettings.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{intakeSettings.subtitle}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-primary/20 bg-white p-4 sm:col-span-2">
                      <p className="text-xs font-black uppercase tracking-widest text-primary">{intakeSettings.countdownTitle}</p>
                      <p className="mt-1 text-sm font-semibold text-gray-500">Counting down to {intakeSettings.nextIntake}</p>
                    </div>
                    {intakeDetailFields.map((field) => (
                      <div key={field.key} className="rounded-xl bg-white p-4">
                        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">{intakeSettings[field.labelKey] || field.fallbackLabel}</p>
                        <p className="mt-2 text-lg font-extrabold leading-snug text-dark">{intakeSettings[field.key]}</p>
                      </div>
                    ))}
                    <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 sm:col-span-2">
                      <p className="text-[11px] font-black uppercase tracking-widest text-primary">{intakeSettings.weeklyScheduleLabel}</p>
                      <p className="mt-2 text-base font-extrabold text-dark">{intakeSettings.weeklySchedule}</p>
                      <span className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">{intakeSettings.badge}</span>
                    </div>
                  </div>
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
          <div key="content-panel" className="admin-tab-panel space-y-8">
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
                <input value={contentSettings.homepage.whatsappNumber} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, whatsappNumber: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="WhatsApp number, e.g. 254748201131" />
                <input value={contentSettings.homepage.whatsappDisplay} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, whatsappDisplay: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Displayed phone number" />
                <input value={contentSettings.homepage.primaryCta} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, primaryCta: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Primary CTA" />
                <input value={contentSettings.homepage.secondaryCta} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, secondaryCta: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Secondary CTA" />
                <input value={contentSettings.homepage.mpesaPaymentText} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, mpesaPaymentText: e.target.value } }))} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary md:col-span-2" placeholder="M-Pesa payment display text" />
                <textarea value={contentSettings.homepage.subtitle} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, subtitle: e.target.value } }))} rows={3} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2" placeholder="Hero subtitle" />
                <textarea value={statsToText(contentSettings.homepage.stats)} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, stats: textToStats(e.target.value) } }))} rows={4} className="rounded-xl border border-gray-200 px-4 py-3 font-mono text-xs outline-none focus:border-primary md:col-span-2" placeholder="Stats: 500+|Students Trained" />
                <textarea value={listToText(contentSettings.homepage.trustBadges)} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, trustBadges: textToList(e.target.value) } }))} rows={4} className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary md:col-span-2" placeholder="Trust badges, one per line" />
                <textarea value={bundleToText(contentSettings.homepage.learningBundle)} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, learningBundle: textToBundle(e.target.value) } }))} rows={5} className="rounded-xl border border-gray-200 px-4 py-3 font-mono text-xs outline-none focus:border-primary md:col-span-2" placeholder="What You Get: 7|Skill tracks|Design, coding, AI..." />
                <textarea value={toolStacksToText(contentSettings.homepage.toolStacks)} onChange={(e) => setContentSettings((prev) => ({ ...prev, homepage: { ...prev.homepage, toolStacks: textToToolStacks(e.target.value) } }))} rows={5} className="rounded-xl border border-gray-200 px-4 py-3 font-mono text-xs outline-none focus:border-primary md:col-span-2" placeholder="Tool stack: Design Software|Build posters...|Photoshop, Illustrator, Canva" />
              </div>
              <p className="mt-4 text-xs font-semibold text-gray-500">Use | to separate columns in stats, What You Get, and tool stack fields. Put each item on a new line.</p>
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
