"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AtSign, CornerUpLeft, LoaderCircle, Lock, MessageCircle, MoreHorizontal, Newspaper, Shield, Smile, Trash2, Undo2, UserX, X } from "lucide-react";
import { STICKERS, type CommunityMessage } from "@/lib/community";
import PostsFeed from "@/components/community/PostsFeed";

const POLL_INTERVAL_MS = 5000;
const MAX_MESSAGE_LENGTH = 500;

type CurrentUser = { id: string; role?: string; avatar?: string | null; name?: string } | null;
type Participant = { id: string; name: string; avatar?: string | null; role?: string };
type BlockedUser = { blockedId: string; blockedName: string };
type DmPartner = { id: string; name: string; avatar?: string | null; lastMessage: CommunityMessage };
type ReplyTarget = { message: CommunityMessage; mode: "public" | "private" };
type ChatView = "chat" | "feed" | "trash" | "dmList" | "dm" | "blocked";

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

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
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

function MentionText({ text }: { text: string }) {
  const parts = text.split(/(@\w+)/g);
  return (
    <>
      {parts.map((part, index) =>
        /^@\w+$/.test(part) ? (
          <span key={index} className="font-bold text-primary">{part}</span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

function ReplyQuote({ replyPreview }: { replyPreview: NonNullable<CommunityMessage["replyPreview"]> }) {
  return (
    <div className="mb-1.5 flex items-center gap-1.5 rounded-lg border-l-2 border-primary/40 bg-black/5 px-2.5 py-1.5 text-xs text-gray-500">
      <CornerUpLeft className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span className="truncate">
        <span className="font-bold">{replyPreview.studentName}: </span>
        {replyPreview.stickerId ? STICKERS[replyPreview.stickerId]?.emoji : replyPreview.text}
      </span>
    </div>
  );
}

export default function CommunityPage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [trash, setTrash] = useState<CommunityMessage[]>([]);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [dmPartners, setDmPartners] = useState<DmPartner[]>([]);
  const [dmThread, setDmThread] = useState<CommunityMessage[]>([]);
  const [activeDmPartner, setActiveDmPartner] = useState<{ id: string; name: string; avatar?: string | null } | null>(null);
  const [view, setView] = useState<ChatView>("chat");

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    fetch("/api/community/participants", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) setParticipants(data.data);
      })
      .catch(() => undefined);
  }, []);

  const markSeen = useCallback(() => {
    fetch("/api/community/notifications", { method: "POST" }).catch(() => undefined);
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
      markSeen();
    }
  }, [markSeen]);

  const loadTrash = useCallback(async () => {
    try {
      const res = await fetch("/api/community/messages?view=trash", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setTrash(data.data);
    } catch {
      // Non-critical - the trash panel just stays stale until the next successful poll.
    }
  }, []);

  const loadBlocked = useCallback(async () => {
    try {
      const res = await fetch("/api/community/block", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setBlockedUsers(data.data.map((b: { blockedId: string; blockedName: string }) => ({ blockedId: b.blockedId, blockedName: b.blockedName })));
      }
    } catch {
      // Non-critical.
    }
  }, []);

  const loadDmList = useCallback(async () => {
    try {
      const res = await fetch("/api/community/messages?view=dmList", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setDmPartners(data.data);
    } catch {
      // Non-critical.
    }
  }, []);

  const loadDmThread = useCallback(async (partnerId: string) => {
    try {
      const res = await fetch(`/api/community/messages?view=dm&with=${encodeURIComponent(partnerId)}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setDmThread(data.data);
    } catch {
      // Non-critical.
    } finally {
      markSeen();
    }
  }, [markSeen]);

  useEffect(() => {
    void loadMessages();
    const interval = window.setInterval(() => void loadMessages(), POLL_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [loadMessages]);

  useEffect(() => {
    if (view === "trash") void loadTrash();
    if (view === "blocked") void loadBlocked();
    if (view === "dmList") void loadDmList();
  }, [view, loadTrash, loadBlocked, loadDmList]);

  useEffect(() => {
    if (view !== "dm" || !activeDmPartner) return;
    void loadDmThread(activeDmPartner.id);
    const interval = window.setInterval(() => void loadDmThread(activeDmPartner.id), POLL_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [view, activeDmPartner, loadDmThread]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, dmThread.length, view]);

  const openDm = (partner: { id: string; name: string; avatar?: string | null }) => {
    setActiveDmPartner(partner);
    setView("dm");
    setReplyTarget(null);
    setText("");
  };

  const sendMessage = async (payload: { text?: string; stickerId?: string }) => {
    setSending(true);
    setError("");
    try {
      const body: Record<string, unknown> = { ...payload };
      if (replyTarget) body.replyToId = replyTarget.message.id;
      if (view === "dm" && activeDmPartner) body.recipientId = activeDmPartner.id;

      const res = await fetch("/api/community/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not send your message.");
        return;
      }
      setText("");
      setPickerOpen(false);
      setReplyTarget(null);
      setMentionQuery(null);
      if (view === "dm" && activeDmPartner) await loadDmThread(activeDmPartner.id);
      else await loadMessages();
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

  const handleTextChange = (value: string) => {
    setText(value);
    const match = value.match(/(?:^|\s)@(\w*)$/);
    setMentionQuery(match ? match[1] : null);
  };

  const pickMention = (name: string) => {
    const mention = `@${firstName(name)} `;
    setText((current) => current.replace(/(?:^|\s)@(\w*)$/, (matched) => (matched.startsWith(" ") ? " " : "") + mention));
    setMentionQuery(null);
    textareaRef.current?.focus();
  };

  const mentionCandidates = mentionQuery === null
    ? []
    : participants.filter((person) => firstName(person.name).toLowerCase().startsWith(mentionQuery.toLowerCase())).slice(0, 6);

  const startEdit = (message: CommunityMessage) => {
    setEditingId(message.id);
    setEditText(message.text || "");
    setOpenMenuId(null);
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
      if (view === "dm" && activeDmPartner) await loadDmThread(activeDmPartner.id);
      else await loadMessages();
    } catch {
      setError("Could not save your edit. Please try again.");
    }
  };

  const deleteMessage = async (messageId: string) => {
    setError("");
    setOpenMenuId(null);
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
      if (view === "dm" && activeDmPartner) await loadDmThread(activeDmPartner.id);
      else await loadMessages();
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

  const blockUser = async (blockedId: string) => {
    setError("");
    setOpenMenuId(null);
    try {
      const res = await fetch("/api/community/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not block this student.");
        return;
      }
      await loadMessages();
    } catch {
      setError("Could not block this student. Please try again.");
    }
  };

  const unblockUser = async (blockedId: string) => {
    setError("");
    try {
      await fetch("/api/community/block", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedId }),
      });
      await loadBlocked();
    } catch {
      setError("Could not unblock this student. Please try again.");
    }
  };

  const weekend = isWeekendNow();
  const composerVisible = view === "chat" || view === "dm";
  const activeList = view === "dm" ? dmThread : messages;

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#F6FAFF] pb-16 pt-24 md:pb-24 md:pt-28">
      <div className="absolute inset-0 -z-10 bg-[url('/images/hero.png')] bg-cover bg-center opacity-10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-white/80" aria-hidden="true" />

      <main className="container mx-auto max-w-4xl px-4 sm:px-6">
        <section className="mb-6 overflow-hidden rounded-3xl bg-dark p-6 text-white shadow-2xl md:p-8">
          <p className="mb-2 text-sm font-black uppercase tracking-widest text-primary-light">Student Community</p>
          <h1 className="text-2xl font-extrabold sm:text-3xl">Encourage each other, keep each other going.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
            Share wins, ask questions, and cheer on classmates. Type <span className="font-bold text-primary-light">@name</span> to
            tag someone. Keep it respectful - abusive messages are blocked automatically, you can block anyone who bothers you,
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
              onClick={() => setView(view === "feed" ? "chat" : "feed")}
              className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${
                view === "feed" ? "border-primary-light bg-primary-light/10 text-primary-light" : "border-white/20 text-white hover:border-primary-light hover:text-primary-light"
              }`}
            >
              <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
              {view === "feed" ? "Live Chat" : "Feed"}
            </button>
            <button
              type="button"
              onClick={() => setView(view === "chat" ? "dmList" : "chat")}
              className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${
                view === "dmList" || view === "dm" ? "border-primary-light bg-primary-light/10 text-primary-light" : "border-white/20 text-white hover:border-primary-light hover:text-primary-light"
              }`}
            >
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Messages{dmPartners.length ? ` (${dmPartners.length})` : ""}
            </button>
            <button
              type="button"
              onClick={() => setView(view === "chat" ? "trash" : "chat")}
              className={`rounded-xl border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${
                view === "trash" ? "border-primary-light bg-primary-light/10 text-primary-light" : "border-white/20 text-white hover:border-primary-light hover:text-primary-light"
              }`}
            >
              {`My Trash${trash.length ? ` (${trash.length})` : ""}`}
            </button>
            <button
              type="button"
              onClick={() => setView(view === "chat" ? "blocked" : "chat")}
              className={`flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${
                view === "blocked" ? "border-primary-light bg-primary-light/10 text-primary-light" : "border-white/20 text-white hover:border-primary-light hover:text-primary-light"
              }`}
            >
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
              Blocked
            </button>
          </div>
        </section>

        {error && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
            <button type="button" onClick={() => setError("")} className="shrink-0 text-red-400 hover:text-red-700">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {view === "feed" && <PostsFeed currentUser={currentUser} />}

        {view === "trash" && (
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
        )}

        {view === "blocked" && (
          <section className="rounded-3xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5 md:p-6">
            <h2 className="text-lg font-extrabold text-dark">Blocked Students</h2>
            <p className="mt-1 text-sm text-gray-500">You won&apos;t see their messages, and they can&apos;t message you privately.</p>
            <div className="mt-5 space-y-2">
              {blockedUsers.length === 0 ? (
                <p className="py-8 text-center text-sm font-bold text-gray-400">You haven&apos;t blocked anyone.</p>
              ) : (
                blockedUsers.map((blocked) => (
                  <div key={blocked.blockedId} className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <span className="text-sm font-bold text-dark">{blocked.blockedName}</span>
                    <button
                      type="button"
                      onClick={() => void unblockUser(blocked.blockedId)}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:border-primary hover:text-primary"
                    >
                      Unblock
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {view === "dmList" && (
          <section className="rounded-3xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5 md:p-6">
            <h2 className="text-lg font-extrabold text-dark">Private Messages</h2>
            <p className="mt-1 text-sm text-gray-500">Only you and the other student can see these.</p>
            <div className="mt-5 space-y-2">
              {dmPartners.length === 0 ? (
                <p className="py-8 text-center text-sm font-bold text-gray-400">
                  No private conversations yet. Reply privately to someone in the chat to start one.
                </p>
              ) : (
                dmPartners.map((partner) => (
                  <button
                    key={partner.id}
                    type="button"
                    onClick={() => openDm(partner)}
                    className="flex w-full items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
                  >
                    <Avatar name={partner.name} avatar={partner.avatar} className="h-10 w-10 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-dark">{partner.name}</p>
                      <p className="truncate text-xs text-gray-500">
                        {partner.lastMessage.stickerId ? STICKERS[partner.lastMessage.stickerId]?.emoji : partner.lastMessage.text}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">{formatTime(partner.lastMessage.createdAt)}</span>
                  </button>
                ))
              )}
            </div>
          </section>
        )}

        {composerVisible && (
          <section className="flex h-[65vh] flex-col overflow-hidden rounded-3xl border border-white bg-white shadow-sm ring-1 ring-slate-900/5">
            {view === "dm" && activeDmPartner && (
              <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-5 py-3">
                <button type="button" onClick={() => setView("dmList")} className="text-gray-400 hover:text-dark">
                  <CornerUpLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <Avatar name={activeDmPartner.name} avatar={activeDmPartner.avatar} className="h-8 w-8 shrink-0 rounded-full" />
                <div>
                  <p className="text-sm font-bold text-dark">{activeDmPartner.name}</p>
                  <p className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                    <Lock className="h-2.5 w-2.5" aria-hidden="true" /> Private conversation
                  </p>
                </div>
              </div>
            )}

            <div className="flex-1 space-y-1 overflow-y-auto p-4 md:p-5">
              {!loaded ? (
                <div className="flex h-full items-center justify-center text-gray-400">
                  <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
                </div>
              ) : activeList.length === 0 ? (
                <p className="py-16 text-center text-sm font-bold text-gray-400">
                  {view === "dm" ? `Say hello to ${activeDmPartner?.name}!` : "No messages yet. Be the first to say hello!"}
                </p>
              ) : (
                activeList.map((message) => {
                  const isOwner = currentUser?.id === message.studentId;
                  const isAdmin = currentUser?.role === "admin";
                  const isEditing = editingId === message.id;
                  const menuOpen = openMenuId === message.id;

                  return (
                    <div key={message.id} className={`group flex items-end gap-2.5 py-1.5 ${isOwner ? "flex-row-reverse" : ""}`}>
                      <Avatar name={message.studentName} avatar={message.avatar} className="h-7 w-7 shrink-0 rounded-full" />
                      <div className={`flex max-w-[78%] flex-col ${isOwner ? "items-end" : "items-start"}`}>
                        {!isOwner && (
                          <div className="mb-0.5 flex items-center gap-1.5 px-1">
                            <span className="text-xs font-bold text-gray-500">{message.studentName}</span>
                            {message.role === "admin" && (
                              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-black uppercase text-primary">Admin</span>
                            )}
                          </div>
                        )}

                        {isEditing ? (
                          <div className="w-full min-w-[220px] space-y-2 rounded-2xl border border-primary/30 bg-white p-3 shadow-sm">
                            <textarea
                              value={editText}
                              onChange={(event) => setEditText(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                              rows={2}
                              className="w-full resize-none rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm outline-none focus:border-primary"
                            />
                            <div className="flex gap-2">
                              <button type="button" onClick={() => void saveEdit(message.id)} className="rounded-lg bg-primary px-3 py-1 text-xs font-bold text-white hover:bg-primary/90">
                                Save
                              </button>
                              <button type="button" onClick={() => setEditingId(null)} className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-bold text-gray-600 hover:bg-gray-50">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`relative rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                              isOwner ? "rounded-br-md bg-primary text-white" : "rounded-bl-md bg-gray-100 text-gray-800"
                            } ${message.stickerId ? "bg-transparent px-1 py-0 shadow-none" : ""}`}
                          >
                            {message.replyPreview && <ReplyQuote replyPreview={message.replyPreview} />}
                            {message.stickerId ? (
                              <span className="text-4xl leading-none">{STICKERS[message.stickerId]?.emoji}</span>
                            ) : (
                              <p className="whitespace-pre-wrap break-words leading-relaxed">
                                <MentionText text={message.text || ""} />
                              </p>
                            )}
                          </div>
                        )}

                        <div className={`mt-1 flex items-center gap-2 px-1 ${isOwner ? "flex-row-reverse" : ""}`}>
                          <span className="text-[11px] text-gray-400">{formatTime(message.createdAt)}</span>
                          {message.editedAt && <span className="text-[11px] italic text-gray-400">edited</span>}

                          {!isEditing && (
                            <div className="relative opacity-0 transition-opacity group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => setOpenMenuId(menuOpen ? null : message.id)}
                                className="grid h-6 w-6 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-dark"
                              >
                                <MoreHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                              {menuOpen && (
                                <div className={`absolute z-10 mt-1 w-44 rounded-xl border border-gray-100 bg-white p-1.5 text-left shadow-lg ${isOwner ? "right-0" : "left-0"}`}>
                                  {view === "chat" && (
                                    <button
                                      type="button"
                                      onClick={() => { setReplyTarget({ message, mode: "public" }); setOpenMenuId(null); textareaRef.current?.focus(); }}
                                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
                                    >
                                      <CornerUpLeft className="h-3.5 w-3.5" aria-hidden="true" /> Reply
                                    </button>
                                  )}
                                  {view === "chat" && !isOwner && (
                                    <button
                                      type="button"
                                      onClick={() => { setOpenMenuId(null); openDm({ id: message.studentId, name: message.studentName, avatar: message.avatar }); setReplyTarget({ message, mode: "private" }); }}
                                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
                                    >
                                      <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Reply Privately
                                    </button>
                                  )}
                                  {view === "dm" && (
                                    <button
                                      type="button"
                                      onClick={() => { setReplyTarget({ message, mode: "private" }); setOpenMenuId(null); textareaRef.current?.focus(); }}
                                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
                                    >
                                      <CornerUpLeft className="h-3.5 w-3.5" aria-hidden="true" /> Reply
                                    </button>
                                  )}
                                  {isOwner && message.text && !message.stickerId && (
                                    <button type="button" onClick={() => startEdit(message)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50">
                                      Edit
                                    </button>
                                  )}
                                  {(isOwner || isAdmin) && (
                                    <button type="button" onClick={() => void deleteMessage(message.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">
                                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" /> {isAdmin && !isOwner ? "Remove (admin)" : "Delete"}
                                    </button>
                                  )}
                                  {!isOwner && view === "chat" && (
                                    <button type="button" onClick={() => void blockUser(message.studentId)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">
                                      <UserX className="h-3.5 w-3.5" aria-hidden="true" /> Block {firstName(message.studentName)}
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={listEndRef} />
            </div>

            <div className="border-t border-gray-100 p-4">
              {replyTarget && (
                <div className="mb-2 flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-3 py-2 text-xs">
                  <span className="flex min-w-0 items-center gap-1.5 text-gray-600">
                    {replyTarget.mode === "private" ? <Lock className="h-3 w-3 shrink-0" aria-hidden="true" /> : <CornerUpLeft className="h-3 w-3 shrink-0" aria-hidden="true" />}
                    <span className="truncate">
                      Replying {replyTarget.mode === "private" ? "privately " : ""}to <span className="font-bold">{replyTarget.message.studentName}</span>
                    </span>
                  </span>
                  <button type="button" onClick={() => setReplyTarget(null)} className="shrink-0 text-gray-400 hover:text-dark">
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}

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
                  <button type="button" onClick={() => setPickerOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl border border-gray-200 text-gray-400 hover:text-dark">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
                {mentionQuery !== null && mentionCandidates.length > 0 && (
                  <div className="absolute bottom-full left-12 mb-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                    {mentionCandidates.map((person) => (
                      <button
                        key={person.id}
                        type="button"
                        onClick={() => pickMention(person.name)}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        <Avatar name={person.name} avatar={person.avatar} className="h-6 w-6 shrink-0 rounded-full" />
                        <span className="truncate font-medium text-gray-700">{person.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setPickerOpen((current) => !current)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                  title="Send a sticker"
                >
                  <Smile className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => handleTextChange(`${text}${text && !text.endsWith(" ") ? " " : ""}@`)}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                  title="Tag someone"
                >
                  <AtSign className="h-5 w-5" aria-hidden="true" />
                </button>
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(event) => handleTextChange(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSubmit(event);
                    }
                  }}
                  placeholder={view === "dm" ? `Message ${activeDmPartner?.name}...` : "Say something encouraging..."}
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

        {view === "chat" && messages.length === 0 && loaded && (
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-bold text-gray-400">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Community is quiet right now - say hi!
          </p>
        )}
      </main>
    </div>
  );
}
