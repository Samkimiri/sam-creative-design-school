import { NextResponse } from "next/server";
import {
  getContentSettings,
  getManagedCourses,
  getManagedFAQs,
  getManagedLessons,
} from "@/lib/contentSettings";

export async function GET() {
  const [content, courses, lessons, faqs] = await Promise.all([
    getContentSettings(),
    getManagedCourses(),
    getManagedLessons(),
    getManagedFAQs(),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      content,
      courses,
      lessons,
      faqs,
    },
  });
}

