"use client";

import { useState } from "react";
import { Send, Star } from "lucide-react";

interface CourseReviewFormProps {
  courseId: string;
  courseName: string;
}

export default function CourseReviewForm({ courseId, courseName }: CourseReviewFormProps) {
  const [form, setForm] = useState({ name: "", role: "", rating: 5, text: "" });
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, courseId }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus(data.message || "Could not submit review.");
        return;
      }
      setForm({ name: "", role: "", rating: 5, text: "" });
      setStatus("Review submitted. It will appear after admin approval.");
    } catch {
      setStatus("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submitReview} className="premium-card rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" data-reveal>
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-widest text-primary">Course Review</p>
        <h3 className="mt-1 font-extrabold text-dark">Review {courseName}</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Your name" />
        <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-primary" placeholder="Role or class" />
      </div>
      <div className="mt-3 flex gap-1" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button key={rating} type="button" onClick={() => setForm({ ...form, rating })} className="premium-button rounded-lg p-1 text-primary transition hover:bg-primary/10" aria-label={`${rating} stars`}>
            <Star className={`h-5 w-5 ${rating <= form.rating ? "fill-primary" : ""}`} aria-hidden="true" />
          </button>
        ))}
      </div>
      <textarea required value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} maxLength={280} className="mt-3 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary" placeholder="What changed after taking this course?" />
      <button disabled={submitting} className="premium-button mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-50">
        <Send className="h-4 w-4" aria-hidden="true" />
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
      {status && <p className="mt-3 text-sm font-semibold text-gray-600" role="status">{status}</p>}
    </form>
  );
}
