export interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role?: string;
  profileImage?: string;
  avatar?: string;
  interest?: string;
  enrolledCourses?: string[];
  createdAt?: string;
}

export interface ProgressRecord {
  studentId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; total: number; date: string }[];
  lastAccessed: string;
}

export interface Enrollment {
  id: string;
  studentId?: string;
  studentName: string;
  studentEmail?: string;
  courseId: string;
  courseName: string;
  amount: number;
  phone: string;
  reference: string;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  mpesaResultCode?: string;
  mpesaResultDesc?: string;
  status: "pending" | "confirmed" | string;
  whatsappConfirmed?: boolean;
  createdAt: string;
}

export type AnalyticsEventType =
  | "page_view"
  | "click"
  | "form_submit"
  | "scroll_depth"
  | "session_start"
  | "session_end";

export interface AnalyticsEvent {
  id: string;
  visitorId: string;
  sessionId: string;
  type: AnalyticsEventType;
  path: string;
  label?: string;
  metadata?: Record<string, string>;
  userId?: string;
  userName?: string;
  userEmail?: string;
  referrer?: string;
  device?: string;
  browser?: string;
  createdAt: string;
}

export interface VisitorSession {
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

export interface Review {
  id: string;
  name: string;
  role?: string;
  rating: number;
  text: string;
  createdAt: string;
}
