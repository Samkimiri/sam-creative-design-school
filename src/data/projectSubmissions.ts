import type { ProjectSubmission } from "@/types";

export const seedProjects: ProjectSubmission[] = [
  {
    id: "seed-photoshop-poster",
    studentName: "Grace Njeri",
    courseId: "photoshop-masterclass",
    courseName: "Photoshop",
    title: "Brand Identity Poster",
    description: "A polished restaurant menu poster created with Photoshop layout, color, and typography skills.",
    imageUrl: "/images/gallery-naomis-hotel.jpg",
    status: "approved",
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "seed-illustrator-logo",
    studentName: "Kevin Omondi",
    courseId: "illustrator-training",
    courseName: "Illustrator",
    title: "Vector Logo Pack",
    description: "A clean logo system with multiple lockups and export formats for a technology startup concept.",
    imageUrl: "/images/gallery-illustrator.png",
    status: "approved",
    createdAt: "2026-01-18T09:00:00.000Z",
  },
];
