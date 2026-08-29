import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { buildAnalyticsSummary } from "@/lib/analytics";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";
import { getContentSettings } from "@/lib/contentSettings";
import { getDiscountSettings } from "@/lib/discountSettings";
import { requireAdminRequest } from "@/lib/adminAuth";
import type {
  AnalyticsEvent,
  AssignmentSubmission,
  Enrollment,
  ProgressRecord,
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
    progressResult,
    intakeResult,
    contentResult,
    discountsResult,
  ] = await Promise.allSettled([
    getDB<Student>("students.json"),
    getDB<Enrollment>("enrollments.json"),
    getDB<VisitorSession>("analytics-sessions.json"),
    getDB<AnalyticsEvent>("analytics-events.json"),
    getDB<Review>("reviews.json"),
    getDB<ProjectSubmission>("projects.json"),
    getDB<AssignmentSubmission>("assignments.json"),
    getDB<ProgressRecord>("progress.json"),
    getUpcomingIntakeSettings(),
    getContentSettings(),
    getDiscountSettings(),
  ]);

  const students = fulfilled(studentsResult, []).map(({ password: _password, avatar: _avatar, profileImage: _profileImage, ...student }) => {
    void _password;
    void _avatar;
    void _profileImage;
    return student;
  });
  const enrollments = fulfilled(enrollmentsResult, []);
  const enrollmentStorageWarning = enrollmentsResult.status === "rejected"
    ? "Enrollment storage is not available. New student requests cannot appear here until persistent storage is configured."
    : undefined;
  const sessions = fulfilled(sessionsResult, []);
  const events = fulfilled(eventsResult, []);
  const reviews = fulfilled(reviewsResult, []).filter((review) => !review.id.startsWith("seed-"));
  const projects = fulfilled(projectsResult, []);
  const assignments = fulfilled(assignmentsResult, []);
  const progress = fulfilled(progressResult, []);
  const intake = fulfilled(intakeResult, undefined);
  const content = fulfilled(contentResult, undefined);
  const discounts = fulfilled(discountsResult, undefined);
  const summary = buildAnalyticsSummary(sessions, events);
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 100);

  return NextResponse.json(
    {
      success: true,
      data: {
        students,
        enrollments,
        enrollmentStorageWarning,
        reviews,
        projects,
        assignments,
        progress,
        settings: intake || content || discounts ? { intake, content, discounts } : undefined,
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
        progressResult,
        intakeResult,
        contentResult,
        discountsResult,
      ]),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

function fulfilled<T>(result: PromiseSettledResult<T>, fallback: T) {
  return result.status === "fulfilled" ? result.value : fallback;
}

function countRejected(results: PromiseSettledResult<unknown>[]) {
  return results.filter((result) => result.status === "rejected").length;
}
