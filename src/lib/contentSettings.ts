import { courses, lessons } from "@/data/courses";
import { getDBRecord, upsertDBRecord } from "@/lib/db";
import type { ContentSettings, FAQSection } from "@/types";

export const defaultFAQs: FAQSection[] = [
  {
    category: "Courses & Enrollment",
    items: [
      {
        q: "Do I need any prior experience to join?",
        a: "No. The courses are beginner-friendly and build practical skills step by step.",
      },
      {
        q: "How long are the courses?",
        a: "Duration depends on the course. Most courses run between 2 and 8 weeks with flexible LMS access.",
      },
      {
        q: "Can I enroll in multiple courses at once?",
        a: "Yes. Students can enroll in multiple courses and access each course from the LMS dashboard.",
      },
      {
        q: "Will I get a certificate after completing a course?",
        a: "Yes. Certificates unlock after completing the lessons and required quizzes for a course.",
      },
    ],
  },
  {
    category: "Payment & Fees",
    items: [
      {
        q: "How do I pay for a course?",
        a: "You can pay through M-Pesa Express or Flutterwave checkout during enrollment.",
      },
      {
        q: "Do you offer discounts?",
        a: "Referral, group, and seasonal discounts may be available. Valid referral codes are checked during enrollment.",
      },
      {
        q: "Can I get a refund?",
        a: "Contact support within 48 hours of enrollment if you need help with a payment or course access issue.",
      },
    ],
  },
  {
    category: "LMS & Technical",
    items: [
      {
        q: "Can I access the LMS on mobile?",
        a: "Yes. The LMS is mobile-friendly and can also be installed as an app from supported browsers.",
      },
      {
        q: "What software do I need?",
        a: "Requirements depend on the course. Each course page and lesson notes list the recommended tools.",
      },
    ],
  },
];

export const defaultContentSettings: ContentSettings = {
  id: "content-manager",
  homepage: {
    eyebrow: "Sam Creative Design School",
    title: "Master Creative & Tech Skills That Pay",
    subtitle:
      "Learn design, coding, AI, video editing, and CAD with practical, industry-level training. Join 500+ students who've already transformed their careers.",
    primaryCta: "Start Learning Today",
    secondaryCta: "Explore Courses",
  },
  courses: [],
  lessons: [],
  faqs: defaultFAQs,
  updatedAt: new Date(0).toISOString(),
};

export async function getContentSettings() {
  const saved = await getDBRecord<ContentSettings>("site-settings.json", defaultContentSettings.id);
  return normalizeContentSettings(saved);
}

export async function saveContentSettings(input: Partial<ContentSettings>) {
  const current = await getContentSettings();
  const updated: ContentSettings = normalizeContentSettings({
    ...current,
    ...input,
    id: defaultContentSettings.id,
    updatedAt: new Date().toISOString(),
  });

  await upsertDBRecord("site-settings.json", updated);
  return updated;
}

export async function getManagedCourses() {
  const settings = await getContentSettings();
  return mergeCourses(settings);
}

export async function getManagedLessons() {
  const settings = await getContentSettings();
  return mergeLessons(settings);
}

export async function getManagedFAQs() {
  const settings = await getContentSettings();
  return settings.faqs.length ? settings.faqs : defaultFAQs;
}

export function mergeCourses(settings: ContentSettings) {
  return courses.map((course) => {
    const override = settings.courses.find((item) => item.id === course.id);
    if (!override) return course;

    return {
      ...course,
      ...cleanEmpty(override),
      id: course.id,
      price: Number.isFinite(override.price) ? Number(override.price) : course.price,
      skills: Array.isArray(override.skills) && override.skills.length ? override.skills : course.skills,
      certificate: course.certificate,
    };
  });
}

export function mergeLessons(settings: ContentSettings) {
  return lessons.map((lesson) => {
    const override = settings.lessons.find((item) => item.id === lesson.id);
    if (!override) return lesson;

    return {
      ...lesson,
      ...cleanEmpty(override),
      id: lesson.id,
      courseId: lesson.courseId,
      order: lesson.order,
      resources: Array.isArray(override.resources) ? override.resources : lesson.resources,
      quiz: lesson.quiz,
    };
  });
}

function normalizeContentSettings(input?: Partial<ContentSettings> | null): ContentSettings {
  return {
    id: defaultContentSettings.id,
    homepage: {
      ...defaultContentSettings.homepage,
      ...(input?.homepage || {}),
    },
    courses: Array.isArray(input?.courses) ? input.courses.map((course) => ({
      ...course,
      id: String(course.id || ""),
      price: Number.isFinite(Number(course.price)) ? Number(course.price) : undefined,
      skills: Array.isArray(course.skills) ? course.skills.map(String).filter(Boolean) : undefined,
    })).filter((course) => course.id) : [],
    lessons: Array.isArray(input?.lessons) ? input.lessons.map((lesson) => ({
      ...lesson,
      id: String(lesson.id || ""),
      resources: Array.isArray(lesson.resources) ? lesson.resources.filter((resource) => resource.name && resource.url) : undefined,
    })).filter((lesson) => lesson.id) : [],
    faqs: normalizeFAQs(input?.faqs),
    updatedAt: input?.updatedAt || defaultContentSettings.updatedAt,
  };
}

function normalizeFAQs(faqs: unknown): FAQSection[] {
  if (!Array.isArray(faqs)) return defaultFAQs;
  const normalized = faqs.map((section) => ({
    category: String(section?.category || "").trim(),
    items: Array.isArray(section?.items)
      ? section.items.map((item: { q?: unknown; a?: unknown }) => ({
        q: String(item.q || "").trim(),
        a: String(item.a || "").trim(),
      })).filter((item: { q: string; a: string }) => item.q && item.a)
      : [],
  })).filter((section) => section.category && section.items.length);

  return normalized.length ? normalized : defaultFAQs;
}

function cleanEmpty<T extends object>(value: T) {
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(([, item]) => {
      if (item === undefined || item === null) return false;
      if (typeof item === "string") return item.trim() !== "";
      return true;
    })
  );
}
