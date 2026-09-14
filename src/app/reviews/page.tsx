import type { Metadata } from "next";
import ReviewsSection from "@/components/ReviewsSection";
import { getPublicReviews } from "@/lib/reviews";
import { jsonLdScript, reviewsJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reviews and Ratings | Sam Creative Design School",
  description:
    "Read real student reviews and ratings for Sam Creative Design School's Photoshop, Illustrator, UI/UX, web development, AI, CapCut, and SolidWorks courses in Kenya.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const publicReviews = await getPublicReviews();
  const jsonLd = reviewsJsonLd(publicReviews);

  return (
    <main className="pt-24 bg-light-gray min-h-screen">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      )}
      <ReviewsSection />
    </main>
  );
}
