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
  status: string;
  whatsappConfirmed?: boolean;
  createdAt: string;
}

export interface MpesaStkResponse {
  ResponseCode?: string;
  CheckoutRequestID?: string;
}
