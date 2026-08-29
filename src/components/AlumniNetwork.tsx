"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Briefcase, GraduationCap, Send, Trash2, Users } from "lucide-react";

interface AlumniProfile {
  id: string;
  name: string;
  avatar: string | null;
  completedCourses: string[];
  alumniSince: string | null;
}

interface AlumniReferralPost {
  id: string;
  postedByStudentId: string;
  postedByName: string;
  title: string;
  company?: string;
  description: string;
  contactInfo: string;
  createdAt: string;
}

const initialForm = { title: "", company: "", description: "", contactInfo: "" };

function initials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A"
  );
}

export default function AlumniNetwork() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [referrals, setReferrals] = useState<AlumniReferralPost[]>([]);
  const [viewer, setViewer] = useState<{ id: string; isAlumni: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/alumni", { cache: "no-store" }).then((r) => r.json()).catch(() => null),
      fetch("/api/alumni/referrals", { cache: "no-store" }).then((r) => r.json()).catch(() => null),
      fetch("/api/auth/me", { cache: "no-store" }).then((r) => r.json()).catch(() => null),
    ]).then(([alumniData, referralData, meData]) => {
      if (alumniData?.success) setAlumni(alumniData.data);
      if (referralData?.success) setReferrals(referralData.data);
      if (meData?.success && meData.student) {
        setViewer({ id: meData.student.id, isAlumni: Boolean(meData.student.isAlumni) });
      }
      setLoading(false);
    });
  }, []);

  const submitReferral = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Posting...");

    try {
      const res = await fetch("/api/alumni/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) {
        setStatus(data.message || "Could not post this opportunity.");
        return;
      }
      setReferrals((prev) => [data.data, ...prev]);
      setForm(initialForm);
      setStatus("Posted! Fellow alumni can now see this opportunity.");
    } catch {
      setStatus("Could not post this opportunity. Please try again.");
    }
  };

  const deleteReferral = async (id: string) => {
    if (!window.confirm("Remove this opportunity post?")) return;

    try {
      const res = await fetch("/api/alumni/referrals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setReferrals((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      // silently ignore - the post simply stays visible if this fails
    }
  };

  if (loading || alumni.length === 0) return null;

  return (
    <section className="bg-light-gray py-20" data-reveal>
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center" data-reveal>
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
            Alumni Network
          </span>
          <h2 className="text-3xl font-extrabold text-dark md:text-4xl">Graduates Who Made It</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Students who completed a course join our Alumni Network - they connect here, share wins, and refer each other to real job and freelance opportunities.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400">
              <Users className="h-4 w-4" aria-hidden="true" />
              Meet the Alumni ({alumni.length})
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {alumni.slice(0, 8).map((person, index) => (
                <div
                  key={person.id}
                  className="premium-card flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 50}ms` } as CSSProperties}
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-primary text-sm font-black text-white">
                    {person.avatar ? (
                      <img src={person.avatar} alt={person.name} className="h-full w-full object-cover" />
                    ) : (
                      initials(person.name)
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-dark">{person.name}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
                      {person.completedCourses.length > 0 ? person.completedCourses.join(", ") : "SCDS Graduate"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
                Opportunities Board
              </h3>
              {viewer?.isAlumni && (
                <button
                  type="button"
                  onClick={() => setShowForm((prev) => !prev)}
                  className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary/90"
                >
                  {showForm ? "Close" : "Post an Opportunity"}
                </button>
              )}
            </div>

            {viewer?.isAlumni && showForm && (
              <form onSubmit={submitReferral} className="premium-card mb-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm">
                <div className="space-y-3">
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Role or opportunity title"
                    maxLength={120}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company or client (optional)"
                    maxLength={80}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <textarea
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="What's the opportunity? Who is it a good fit for?"
                    rows={3}
                    maxLength={500}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                  <input
                    required
                    value={form.contactInfo}
                    onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
                    placeholder="How should interested alumni reach out? (WhatsApp, email...)"
                    maxLength={160}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "Posting..."}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {status === "Posting..." ? "Posting..." : "Post Opportunity"}
                </button>
                {status && status !== "Posting..." && <p className="mt-2 text-xs font-semibold text-gray-500">{status}</p>}
              </form>
            )}

            {!viewer?.isAlumni && (
              <p className="mb-4 rounded-2xl border border-dashed border-gray-200 bg-white p-4 text-xs text-gray-500">
                Complete a course, or ask the school to add you, to join the Alumni Network and post opportunities here.
              </p>
            )}

            <div className="space-y-3">
              {referrals.length === 0 ? (
                <p className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-400">
                  No opportunities posted yet - check back soon.
                </p>
              ) : (
                referrals.slice(0, 6).map((post) => (
                  <div key={post.id} className="premium-card rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-bold text-dark">{post.title}</p>
                        {post.company && <p className="text-xs font-semibold text-primary">{post.company}</p>}
                      </div>
                      {viewer && (viewer.id === post.postedByStudentId) && (
                        <button
                          type="button"
                          onClick={() => void deleteReferral(post.id)}
                          title="Remove this post"
                          className="shrink-0 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{post.description}</p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                      <span>Posted by {post.postedByName}</span>
                      <span className="font-bold text-primary">{post.contactInfo}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
