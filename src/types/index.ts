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
  paymentProvider?: "mpesa" | string;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  mpesaPushInitiatedAt?: string;
  paymentConfirmedAt?: string;
  mpesaReceiptNumber?: string;
  mpesaAmount?: number;
  mpesaPhoneNumber?: string;
  mpesaPayerName?: string;
  mpesaNotes?: string;
  mpesaTransactionDate?: string;
  mpesaResultCode?: string;
  mpesaResultDesc?: string;
  paymentVerificationStatus?: "awaiting_payment" | "submitted" | "verified" | "failed" | string;
  adminApprovalStatus?: "pending" | "approved" | string;
  adminReviewRequestedAt?: string;
  adminApprovedAt?: string;
  adminNotificationMessage?: string;
  status: "pending" | "confirmed" | "failed" | string;
  whatsappConfirmed?: boolean;
  whatsappSentAt?: string;
  accessGrantedAt?: string;
  accessGrantMessage?: string;
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
  courseId?: string;
  courseName?: string;
  rating: number;
  text: string;
  approved?: boolean;
  createdAt: string;
}

export interface ProjectSubmission {
  id: string;
  studentName: string;
  courseId?: string;
  courseName: string;
  title: string;
  description: string;
  imageUrl?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  lessonId: string;
  lessonTitle: string;
  fileUrl?: string;
  notes?: string;
  status: "submitted" | "reviewed" | "revision";
  rubric?: AssignmentRubric;
  feedback?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AssignmentRubric {
  creativity: number;
  technicalSkill: number;
  completeness: number;
  presentation: number;
  revisionNotes?: string;
}

export interface UpcomingIntakeSettings {
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

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQSection {
  category: string;
  items: FAQItem[];
}

export interface HomepageContentSettings {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  mpesaPaymentText: string;
  stats: { value: string; label: string }[];
  trustBadges: string[];
  learningBundle: { value: string; label: string; detail: string }[];
  toolStacks: { title: string; note: string; tools: string[] }[];
}

export interface CourseContentOverride {
  id: string;
  title?: string;
  shortTitle?: string;
  description?: string;
  longDescription?: string;
  duration?: string;
  price?: number;
  priceRange?: string;
  skills?: string[];
  image?: string;
  icon?: string;
  color?: string;
  level?: string;
}

export interface LessonResourceOverride {
  name: string;
  url: string;
  type: "pdf" | "zip" | "link";
}

export interface LessonContentOverride {
  id: string;
  title?: string;
  duration?: string;
  videoUrl?: string;
  content?: string;
  resources?: LessonResourceOverride[];
}

export interface ContentSettings {
  id: "content-manager";
  homepage: HomepageContentSettings;
  courses: CourseContentOverride[];
  lessons: LessonContentOverride[];
  faqs: FAQSection[];
  updatedAt: string;
}

export interface PromoCode {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
  startsAt?: string;
  expiresAt?: string;
  usageLimit?: number;
  courseIds?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface ReferralRewardSettings {
  active: boolean;
  studentDiscountPercent: number;
  rewardNote: string;
}

export interface DiscountSettings {
  id: "discount-manager";
  referral: ReferralRewardSettings;
  promoCodes: PromoCode[];
  updatedAt: string;
}
