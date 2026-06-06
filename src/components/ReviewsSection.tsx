"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Pencil } from "lucide-react";
import type { Review } from "@/types";

type FormState = {
  id?: string;
  name: string;
  role: string;
  text: string;
  rating: number;
};

type ReviewsSectionProps = {
  mode?: "full" | "preview";
};

const editableStorageKey = "scds-editable-review-ids";

const initialForm: FormState = {
  name: "",
  role: "",
  text: "",
  rating: 5,
};

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "S";
}

function sortReviews(reviews: Review[]): Review[] {
  return [...reviews].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function readEditableIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(editableStorageKey) || "[]") as string[];
  } catch {
    return [];
  }
}

function writeEditableIds(ids: string[]) {
  window.localStorage.setItem(editableStorageKey, JSON.stringify(Array.from(new Set(ids))));
}

function Stars({
  rating,
  className = "text-lg",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`${star <= rating ? "text-primary" : "text-gray-300"} ${className}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  index,
  editable,
  onEdit,
}: {
  review: Review;
  index: number;
  editable: boolean;
  onEdit?: (review: Review) => void;
}) {
  return (
    <article className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg motion-safe:hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3 mb-4">
        <Stars rating={review.rating} />
        <div className="flex items-center gap-2">
        {review.approved === false && (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">Pending approval</span>
        )}
        {editable && onEdit && (
          <button
            type="button"
            onClick={() => onEdit(review)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 motion-safe:hover:-translate-y-0.5"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Edit
          </button>
        )}
        </div>
      </div>
      <p className="text-gray-600 mb-6 italic leading-relaxed">&ldquo;{review.text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 ${index % 2 === 0 ? "bg-blue-500" : "bg-pink-500"} rounded-full flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 motion-safe:hover:scale-105`}>
          {initials(review.name)}
        </div>
        <div>
          <h4 className="font-bold text-dark text-sm">{review.name}</h4>
          <span className="text-xs text-gray-500">{review.role || "Student"}</span>
        </div>
      </div>
    </article>
  );
}

export default function ReviewsSection({ mode = "full" }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editableIds, setEditableIds] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setEditableIds(readEditableIds());

    const loadReviews = async () => {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const data = await res.json();
        if (data.success) setReviews(sortReviews(data.data));
      } catch {
        // Keep the section usable even if reviews fail to load.
      }
    };
    void loadReviews();
  }, []);

  const sortedReviews = useMemo(() => sortReviews(reviews), [reviews]);
  const topReview = sortedReviews[0];

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 5;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const beginEdit = (review: Review) => {
    setForm({
      id: review.id,
      name: review.name,
      role: review.role || "",
      text: review.text,
      rating: review.rating,
    });
    setMessage("Editing your review. Save changes when ready.");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const editing = Boolean(form.id);

    try {
      const res = await fetch("/api/reviews", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        setMessage(data.message || "Could not save review.");
        return;
      }

      if (editing) {
        setReviews((current) =>
          sortReviews(current.map((review) => (review.id === data.data.id ? data.data : review)))
        );
        setMessage("Your review has been updated.");
      } else {
        setReviews((current) => sortReviews([data.data, ...current]).slice(0, 12));
        const nextEditableIds = [data.data.id, ...editableIds];
        setEditableIds(nextEditableIds);
        writeEditableIds(nextEditableIds);
        setMessage("Thank you. Your review has been submitted for admin approval. You can still edit it on this browser.");
      }

      setForm(initialForm);
    } catch {
      setMessage("Could not save review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (mode === "preview") {
    if (!topReview) return null;

    return (
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center">
            <div className="animate-fade-in">
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Top Review</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">What Students Are Saying</h2>
              <p className="text-gray-600 mb-6 max-w-xl">
                See how students rate their learning experience, then add your own review on the reviews page.
              </p>
              <Link href="/reviews" className="inline-flex bg-primary text-white px-7 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 motion-safe:hover:-translate-y-0.5">
                View and Add Reviews
              </Link>
            </div>
            <ReviewCard review={topReview} index={0} editable={false} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 animate-fade-in">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Student Reviews</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">Reviews & Ratings</h1>
            <p className="text-gray-600 max-w-2xl">
              Share your learning experience and help future students choose the right course.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 shadow-sm transition-all duration-300 hover:shadow-lg motion-safe:hover:-translate-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Average Rating</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-dark">{averageRating}</span>
              <Stars rating={Math.round(averageRating)} className="text-xl" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="flex items-start justify-between gap-4 mb-5">
              <h2 className="text-xl font-bold text-dark">{form.id ? "Edit Your Review" : "Leave a Review"}</h2>
              {form.id && (
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setMessage("");
                  }}
                  className="text-xs font-bold text-gray-400 hover:text-red-500"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Your name"
                className="w-full bg-light-gray border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium"
                required
              />
              <input
                value={form.role}
                onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                placeholder="Course or role"
                className="w-full bg-light-gray border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium"
              />
            </div>

            <div className="mb-4">
              <p className="text-sm font-bold text-gray-500 mb-2">Your Rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= (hoverRating || form.rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setForm((current) => ({ ...current, rating: star }))}
                      className={`text-3xl transition-transform duration-200 hover:scale-110 ${active ? "text-primary" : "text-gray-300"}`}
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
            </div>

            <textarea
              value={form.text}
              onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
              placeholder="Write your review..."
              maxLength={280}
              className="w-full min-h-32 bg-light-gray border border-gray-100 rounded-xl px-4 py-3 outline-none focus:border-primary font-medium resize-none mb-4"
              required
            />

            <button
              disabled={submitting}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 motion-safe:hover:-translate-y-0.5"
            >
              {submitting ? "Saving..." : form.id ? "Save Changes" : "Submit Review"}
            </button>
            {message && <p className="text-sm text-gray-500 font-medium mt-4">{message}</p>}
          </form>

          <div>
            {topReview && (
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Highest Rated Review</p>
                <ReviewCard
                  review={topReview}
                  index={0}
                  editable={editableIds.includes(topReview.id)}
                  onEdit={beginEdit}
                />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedReviews.slice(1).map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  index={index + 1}
                  editable={editableIds.includes(review.id)}
                  onEdit={beginEdit}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
