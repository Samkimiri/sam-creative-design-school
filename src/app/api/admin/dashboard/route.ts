import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { buildAnalyticsSummary } from "@/lib/analytics";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";
import { requireAdminRequest } from "@/lib/adminAuth";
import type {
  AnalyticsEvent,
  AssignmentSubmission,
  Enrollment,
  ProjectSubmission,
  Review,
  Student,
  VisitorSession,
} from "@/types";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const [
    studentsResult,
    enrollmentsResult,
    sessionsResult,
    eventsResult,
    reviewsResult,
    projectsResult,
    assignmentsResult,
    intakeResult,
  ] = await Promise.allSettled([
    getDB<Student>("students.json"),
    getDB<Enrollment>("enrollments.json"),
    getDB<VisitorSession>("analytics-sessions.json"),
    getDB<AnalyticsEvent>("analytics-events.json"),
    getDB<Review>("reviews.json"),
    getDB<ProjectSubmission>("projects.json"),
    getDB<AssignmentSubmission>("assignments.json"),
    getUpcomingIntakeSettings(),
  ]);

  const students = fulfilled(studentsResult, []).map(({ password: _password, avatar: _avatar, profileImage: _profileImage, ...student }) => {
    void _password;
    void _avatar;
    void _profileImage;
    return student;
  });
  const enrollments = fulfilled(enrollmentsResult, []);
  const sessions = fulfilled(sessionsResult, []);
  const events = fulfilled(eventsResult, []);
  const reviews = fulfilled(reviewsResult, []).filter((review) => !review.id.startsWith("seed-"));
  const projects = fulfilled(projectsResult, []);
  const assignments = fulfilled(assignmentsResult, []);
  const intake = fulfilled(intakeResult, undefined);
  const summary = buildAnalyticsSummary(sessions, events);
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 100);

  return NextResponse.json({
    success: true,
    data: {
      students,
      enrollments,
      reviews,
      projects,
      assignments,
      settings: intake ? { intake } : undefined,
      analytics: {
        summary,
        sessions: sessions.slice(0, 200),
        events: recentEvents,
      },
    },
    warnings: countRejected([
      studentsResult,
      enrollmentsResult,
      sessionsResult,
      eventsResult,
      reviewsResult,
      projectsResult,
      assignmentsResult,
      intakeResult,
    ]),
  });
}

function fulfilled<T>(result: PromiseSettledResult<T>, fallback: T) {
  return result.status === "fulfilled" ? result.value : fallback;
}

function countRejected(results: PromiseSettledResult<unknown>[]) {
  return results.filter((result) => result.status === "rejected").length;
}
