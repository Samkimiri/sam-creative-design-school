import { getDB } from "@/lib/db";
import type { Review } from "@/types";

export const seedReviews: Review[] = [
  {
    id: "seed-grace-njeri",
    name: "Grace Njeri",
    role: "Freelance Graphic Designer",
    courseId: "photoshop-masterclass",
    courseName: "Adobe Photoshop Masterclass",
    rating: 5,
    text: "The Photoshop masterclass completely changed my life. Within 3 weeks of finishing I had my first paid client.",
    approved: true,
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "seed-kevin-omondi",
    name: "Kevin Omondi",
    role: "Content Creator",
    courseId: "capcut-masterclass",
    courseName: "CapCut Video Editing Masterclass",
    rating: 5,
    text: "CapCut training helped me understand how to edit videos that keep people watching. The lessons are very practical.",
    approved: true,
    createdAt: "2026-01-18T09:00:00.000Z",
  },
  {
    id: "seed-daniel-otieno",
    name: "Daniel Otieno",
    role: "Mechanical Engineer",
    courseId: "solidworks-engineers",
    courseName: "SolidWorks for Engineers",
    rating: 5,
    text: "SolidWorks training gave me confidence to create proper CAD models and explain my design process professionally.",
    approved: true,
    createdAt: "2026-02-02T09:00:00.000Z",
  },
];

// Same combine-and-filter rule the public /api/reviews GET endpoint uses, so
// server-rendered content (e.g. the reviews page's AggregateRating JSON-LD)
// never shows a different rating than what visitors actually see on the page.
export async function getPublicReviews(courseId?: string): Promise<Review[]> {
  const reviews = await getDB<Review>("reviews.json");
  const customReviews = reviews.filter((review) => !review.id.startsWith("seed-") && review.approved === true);
  const allReviews = [...customReviews, ...seedReviews];
  const filtered = courseId ? allReviews.filter((review) => review.courseId === courseId) : allReviews;
  return filtered.slice(0, 12);
}
