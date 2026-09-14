import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, getDBRecord, upsertDBRecord } from "@/lib/db";
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
    const force = body.force === true;

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
    const cappedPosition = durationSeconds ? Math.min(rawPosition, durationSeconds) : rawPosition;

    const recordId = `${session.user.id}__${lessonId}`;

    // Two tabs open on the same lesson both report periodically while playing;
    // whichever fires last would otherwise win outright, silently rewinding
    // the saved resume position if the other tab had actually progressed
    // further. Only an explicit reset (restart, or the video ending) is
    // allowed to move the position backward - every other report can only
    // advance it, using the furthest point reached across all tabs.
    let positionSeconds = cappedPosition;
    if (!force) {
      const existing = await getDBRecord<VideoProgressRecord>("video-progress.json", recordId);
      if (existing && existing.positionSeconds > positionSeconds) {
        positionSeconds = existing.positionSeconds;
      }
    }

    const record: VideoProgressRecord = {
      id: recordId,
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
