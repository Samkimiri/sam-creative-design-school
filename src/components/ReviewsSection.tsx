"use client";

import { useEffect, useMemo, useState } from "react";
import type { Review } from "@/types";

type FormState = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

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

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const data = await res.json();
        if (data.success) setReviews(data.data);
      } catch {
        // Keep the section usable even if reviews fail to load.
      }
    };
    void loadReviews();
  }, []);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 5;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }, [reviews]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        setMessage(data.message || "Could not save review.");
        return;
      }

      setReviews((current) => [data.data, ...current].slice(0, 12));
      setForm(initialForm);
      setMessage("Thank you. Your review has been added.");
    } catch {
      setMessage("Could not save review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-light-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Student Reviews</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Rate Your Experience</h2>
            <p className="text-gray-600 max-w-2xl">
              Share your learning experience and help future students choose the right course.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Average Rating</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-dark">{averageRating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= Math.round(averageRating) ? "text-primary text-xl" : "text-gray-300 text-xl"}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-5">Leave a Review</h3>
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
                      className={`text-3xl transition-transform hover:scale-110 ${active ? "text-primary" : "text-gray-300"}`}
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
              className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            {message && <p className="text-sm text-gray-500 font-medium mt-4">{message}</p>}
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <article key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= review.rating ? "text-primary text-lg" : "text-gray-300 text-lg"}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 ${index % 2 === 0 ? "bg-blue-500" : "bg-pink-500"} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {initials(review.name)}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-sm">{review.name}</h4>
                    <span className="text-xs text-gray-500">{review.role || "Student"}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
