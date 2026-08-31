"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LoaderCircle, Smile, Trash2, Undo2, X } from "lucide-react";
import { STICKERS, type CommunityMessage } from "@/lib/community";

const POLL_INTERVAL_MS = 5000;
const MAX_MESSAGE_LENGTH = 500;

type CurrentUser = { id: string; role?: string; avatar?: string | null; name?: string } | null;

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-KE", { hour: "numeric", minute: "2-digit", month: "short", day: "numeric" }).format(
    new Date(iso)
  );
}

function isWeekendNow() {
  const nairobiNow = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const day = nairobiNow.getUTCDay();
  return day === 0 || day === 6;
}

function Avatar({ name, avatar, className }: { name: string; avatar?: string | null; className: string }) {
  if (avatar) {
    return <img src={avatar} alt={name} className={`${className} object-cover`} />;
  }
  return (
    <div className={`${className} grid place-items-center bg-primary/10 font-black text-primary`}>
      {name.charAt(0).toUpperCase() || "?"}
    </div>
  );
}

export default function CommunityPage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [trash, setTrash] = useState<CommunityMessage[]>([]);
  const [showTrash, setShowTrash] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCurrentUser({
            id: data.user?.id,
            role: data.user?.role || data.student?.role,
            avatar: data.student?.profileImage || data.student?.avatar || null,
            name: data.student?.name || data.user?.name,
          });
        }
      })
      .catch(() => undefined);
  }, []);

  const loadMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/community/messages", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setMessages(data.data);
    } catch {
      // Keep showing the last known messages if the network hiccups.
    } finally {
      setLoaded(true);
    }
  }, []);

  const loadTrash = useCallback(async () => {
    try {
      const res = await fetch("/api/community/messages?view=trash", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setTrash(data.data);
    } catch {
      // Non-critical - the trash panel just stays stale until the next successful poll.
    }
  }, []);

  useEffect(() => {
    void loadMessages();
    const interval = window.setInterval(() => void loadMessages(), POLL_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [loadMessages]);

  useEffect(() => {
    if (showTrash) void loadTrash();
  }, [showTrash, loadTrash]);

  useEffect(() => {
    if (!showTrash) listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, showTrash]);

  const sendMessage = async (payload: { text?: string; stickerId?: string }) => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/community/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not send your message.");
        return;
      }
      setText("");
      setPickerOpen(false);
      await loadMessages();
    } catch {
      setError("Could not send your message. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    void sendMessage({ text: trimmed });
  };

  const startEdit = (message: CommunityMessage) => {
    setEditingId(message.id);
    setEditText(message.text || "");
  };

  const saveEdit = async (messageId: string) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setError("");
    try {
      const res = await fetch("/api/community/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "edit", messageId, text: trimmed }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not save your edit.");
        return;
      }
      setEditingId(null);
      await loadMessages();
    } catch {
      setError("Could not save your edit. Please try again.");
    }
  };

  const deleteMessage = async (messageId: string) => {
    setError("");
    try {
      const res = await fetch("/api/community/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not delete this message.");
        return;
      }
      await loadMessages();
    } catch {
      setError("Could not delete this message. Please try again.");
    }
  };

  const restoreMessage = async (messageId: string) => {
    setError("");
    try {
      const res = await fetch("/api/community/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", messageId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not restore this message.");
        return;
      }
      await loadTrash();
      await loadMessages();
    } catch {
      setError("Could not restore this message. Please try again.");
    }
  };

  const weekend = isWeekendNow();

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#F6FAFF] pb-16 pt-24 md:pb-24 md:pt-28">
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-white/80" aria-hidden="true" />

      <main className="container mx-auto max-w-4xl px-4 sm:px-6">
        <section className="mb-6 overflow-hidden rounded-3xl bg-dark p-6 text-white shadow-2xl md:p-8">
          <p className="mb-2 text-sm font-black uppercase tracking-widest text-primary-light">Student Community</p>
          <h1 className="text-2xl font-extrabold sm:text-3xl">Encourage each other, keep each other going.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
            Share wins, ask questions, and cheer on classmates. Keep it respectful - abusive messages are blocked automatically
            and admins can remove anything inappropriate.
          </p>
          <div className={`mt-4 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold ${
            weekend ? "border-primary-light/40 bg-primary-light/10 text-primary-light" : "border-white/15 bg-white/5 text-white/60"
          }`}>
            {weekend
              ? "It's the weekend - every 10 messages you send earns +1 leaderboard point!"
              : "Weekend chat bonus: +1 point per 10 messages, Saturdays and Sundays only."}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/lms" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light">
              Back to LMS
            </Link>
            <Link href="/lms/leaderboard" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light">
              View Leaderboard
            </Link>
            <button
              type="button"
              onClick={() => setShowTrash((current) => !current)}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-primary-light hover:text-primary-light"
            >
              {showTrash ? "Back to Chat" : `My Trash${trash.length ? ` (${trash.length})` : ""}`}
            </button>
          </div>
        </section>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        {showTrash ? (
          <section className="rounded-3xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5 md:p-6">
            <h2 className="text-lg font-extrabold text-dark">Your Trash</h2>
            <p className="mt-1 text-sm text-gray-500">Deleted messages stay here for 24 hours before they&apos;re gone for good.</p>
            <div className="mt-5 space-y-3">
              {trash.length === 0 ? (
                <p className="py-8 text-center text-sm font-bold text-gray-400">Nothing in your trash.</p>
              ) : (
                trash.map((message) => (
                  <div key={message.id} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <Avatar name={message.studentName} avatar={message.avatar} className="h-9 w-9 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-dark">{message.studentName}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        {message.stickerId ? STICKERS[message.stickerId]?.emoji : message.text}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">Deleted {formatTime(message.deletedAt || message.createdAt)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void restoreMessage(message.id)}
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/30 bg-white px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5"
                    >
                      <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Restore
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        ) : (
          <section className="flex h-[65vh] flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-sm ring-1 ring-slate-900/5">
            <div className="flex-1 space-y-4 overflow-y-auto p-5 md:p-6">
              {!loaded ? (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
                </div>
              ) : messages.length === 0 ? (
                <p className="py-16 text-center text-sm font-bold text-gray-400">
                  No messages yet. Be the first to say hello!
                </p>
              ) : (
                messages.map((message) => {
                  const isOwner = currentUser?.id === message.studentId;
                  const isAdmin = currentUser?.role === "admin";
                  const isEditing = editingId === message.id;
                  return (
                    <div key={message.id} className="flex items-start gap-3">
                      <Avatar name={message.studentName} avatar={message.avatar} className="h-9 w-9 shrink-0 rounded-full" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-sm font-bold text-dark">{message.studentName}</span>
                          {message.role === "admin" && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-black uppercase text-primary">Admin</span>
                          )}
                          <span className="text-xs text-gray-400">{formatTime(message.createdAt)}</span>
                          {message.editedAt && <span className="text-xs italic text-gray-400">(edited)</span>}
                        </div>

                        {isEditing ? (
                          <div className="mt-2 space-y-2">
                            <textarea
                              value={editText}
                              onChange={(event) => setEditText(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                              rows={2}
                              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => void saveEdit(message.id)}
                                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/90"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-1">
                            {message.stickerId ? (
                              <span className="text-3xl leading-none">{STICKERS[message.stickerId]?.emoji}</span>
                            ) : (
                              <p className="whitespace-pre-wrap break-words text-sm text-gray-700">{message.text}</p>
                            )}
                          </div>
                        )}

                        {!isEditing && (isOwner || (isAdmin && !isOwner)) && (
                          <div className="mt-1.5 flex gap-3">
                            {isOwner && message.text && !message.stickerId && (
                              <button
                                type="button"
                                onClick={() => startEdit(message)}
                                className="text-xs font-bold text-gray-400 hover:text-primary"
                              >
                                Edit
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => void deleteMessage(message.id)}
                              className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-3 w-3" aria-hidden="true" />
                              {isAdmin && !isOwner ? "Remove (admin)" : "Delete"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={listEndRef} />
            </div>

            <div className="border-t border-gray-100 p-4">
              {pickerOpen && (
                <div className="mb-3 flex flex-wrap gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-3">
                  {Object.entries(STICKERS).map(([id, sticker]) => (
                    <button
                      key={id}
                      type="button"
                      title={sticker.label}
                      disabled={sending}
                      onClick={() => void sendMessage({ stickerId: id })}
                      className="grid h-10 w-10 place-items-center rounded-xl bg-white text-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition disabled:opacity-50"
                    >
                      {sticker.emoji}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPickerOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 text-gray-400 hover:text-dark"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => setPickerOpen((current) => !current)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                  title="Send a sticker"
                >
                  <Smile className="h-5 w-5" aria-hidden="true" />
                </button>
                <textarea
                  value={text}
                  onChange={(event) => setText(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSubmit(event);
                    }
                  }}
                  placeholder="Say something encouraging..."
                  rows={1}
                  className="min-h-[44px] flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={sending || !text.trim()}
                  className="h-11 shrink-0 rounded-xl bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-40"
                >
                  {sending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Send"}
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
