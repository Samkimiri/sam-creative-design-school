import type { Metadata } from "next";
import type { ReactNode } from "react";
import { courses } from "@/data/courses";

type CourseLayoutProps = {
  children: ReactNode;
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Pick<CourseLayoutProps, "params">): Promise<Metadata> {
  const { courseId } = await params;
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return {
      title: "Course Not Found | Sam Creative Design School",
    };
  }

  return {
    title: `${course.title} | Sam Creative Design School LMS`,
    description: course.description,
    openGraph: {
      title: `${course.title} | Sam Creative Design School`,
      description: course.description,
      images: [
        {
          url: course.image,
          alt: course.title,
        },
      ],
    },
  };
}

export default function CourseLayout({ children }: CourseLayoutProps) {
  return children;
}
