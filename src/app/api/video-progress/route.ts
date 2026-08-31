import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, upsertDBRecord } from "@/lib/db";
import { courses, lessons } from "@/data/courses";
import { getStudentWithConfirmedEnrollmentAccess, hasCourseAccess } from "@/lib/enrollmentAccess";

interface VideoProgressRecord {
  id: string;
  studentId: string;
  courseId: string;
  lessonId: string;
  positionSeconds: number;
  durationSeconds?: number;
  updatedAt: string;
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (!courseId || !courses.some((course) => course.id === courseId)) {
    return NextResponse.json({ error: "Invalid course" }, { status: 400 });
  }

  const student = await getStudentWithConfirmedEnrollmentAccess(session.user.id);
  const canAccess = session.user.role === "admin" || hasCourseAccess(student, courseId);
  if (!canAccess) {
    return NextResponse.json({ error: "Course access requires admin approval" }, { status: 403 });
  }

  const records = await getDB<VideoProgressRecord>("video-progress.json");
  const positions: Record<string, { positionSeconds: number; durationSeconds?: number }> = {};

  for (const record of records) {
    if (record.studentId === session.user.id && record.courseId === courseId) {
      positions[record.lessonId] = {
        positionSeconds: record.positionSeconds,
        durationSeconds: record.durationSeconds,
      };
    }
  }

  return NextResponse.json({ success: true, data: positions });
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const courseId = typeof body.courseId === "string" ? body.courseId : "";
    const lessonId = typeof body.lessonId === "string" ? body.lessonId : "";
    const rawPosition = Number(body.positionSeconds);
    const rawDuration = Number(body.durationSeconds);

    if (!courseId || !lessonId || !Number.isFinite(rawPosition) || rawPosition < 0) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const lesson = lessons.find((item) => item.id === lessonId && item.courseId === courseId);
    if (!lesson) {
      return NextResponse.json({ error: "Invalid lesson" }, { status: 400 });
    }

    const student = await getStudentWithConfirmedEnrollmentAccess(session.user.id);
    const canAccess = session.user.role === "admin" || hasCourseAccess(student, courseId);
    if (!canAccess) {
      return NextResponse.json({ error: "Course access requires admin approval" }, { status: 403 });
    }

    const durationSeconds = Number.isFinite(rawDuration) && rawDuration > 0 ? rawDuration : undefined;
    const positionSeconds = durationSeconds ? Math.min(rawPosition, durationSeconds) : rawPosition;

    const record: VideoProgressRecord = {
      id: `${session.user.id}__${lessonId}`,
      studentId: session.user.id as string,
      courseId,
      lessonId,
      positionSeconds,
      durationSeconds,
      updatedAt: new Date().toISOString(),
    };

    await upsertDBRecord("video-progress.json", record);

    return NextResponse.json({ success: true, data: record });
  } catch (err) {
    console.error("Video progress POST Error:", err);
    return NextResponse.json({ error: "Failed to update video progress" }, { status: 500 });
  }
}
