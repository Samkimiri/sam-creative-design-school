"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileImage, Heart, LoaderCircle, MessageSquare, Newspaper, PenLine, Trash2, Type, Undo2, X } from "lucide-react";
import { REACTIONS, type PostKind } from "@/lib/community";

const FEED_POLL_INTERVAL_MS = 12000;
const COMMENTS_POLL_INTERVAL_MS = 6000;
const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

type CurrentUser = { id: string; role?: string } | null;

interface ReactionSummary {
  counts: Record<string, number>;
  total: number;
  myReaction: string | null;
}

interface FeedPost {
  id: string;
  studentId: string;
  studentName: string;
  avatar?: string | null;
  role?: string;
  kind: PostKind;
  title?: string;
  body?: string;
  imageUrl?: string;
  createdAt: string;
  editedAt?: string;
  deletedAt?: string;
  commentCount: number;
  reactionSummary: ReactionSummary;
}

interface FeedComment {
  id: string;
  postId: string;
  studentId: string;
  studentName: string;
  avatar?: string | null;
  role?: string;
  text: string;
  parentCommentId?: string;
  createdAt: string;
  editedAt?: string;
  reactionSummary: ReactionSummary;
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-KE", { hour: "numeric", minute: "2-digit", month: "short", day: "numeric" }).format(
    new Date(iso)
  );
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

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function ReactionBar({
  summary,
  onReact,
  disabled,
}: {
  summary: ReactionSummary;
  onReact: (type: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-wrap items-center gap-1.5">
      {Object.entries(summary.counts).map(([type, count]) => (
        <button
          key={type}
          type="button"
          disabled={disabled}
          onClick={() => onReact(type)}
          className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold transition disabled:opacity-50 ${
            summary.myReaction === type ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-gray-500 hover:border-gray-300"
          }`}
        >
          <span>{REACTIONS[type]?.emoji}</span>
          <span>{count}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        disabled={disabled}
        className="flex items-center gap-1 rounded-full border border-gray-200 px-2 py-0.5 text-xs font-bold text-gray-400 hover:border-primary hover:text-primary disabled:opacity-50"
      >
        <Heart className="h-3 w-3" aria-hidden="true" /> React
      </button>
      {open && (
        <div className="absolute bottom-full left-0 z-10 mb-1 flex gap-1 rounded-xl border border-gray-100 bg-white p-1.5 shadow-lg">
          {Object.entries(REACTIONS).map(([type, reaction]) => (
            <button
              key={type}
              type="button"
              title={reaction.label}
              onClick={() => { onReact(type); setOpen(false); }}
              className="grid h-8 w-8 place-items-center rounded-lg text-lg hover:bg-gray-50"
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PostsFeed({ currentUser }: { currentUser: CurrentUser }) {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const [kind, setKind] = useState<PostKind>("text");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageInputMode, setImageInputMode] = useState<"upload" | "link">("upload");
  const [posting, setPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<FeedComment | null>(null);
  const [commentSending, setCommentSending] = useState(false);

  const [showTrash, setShowTrash] = useState(false);
  const [trash, setTrash] = useState<FeedPost[]>([]);

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/community/posts", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setPosts(data.data);
    } catch {
      // Keep showing the last known feed if the network hiccups.
    } finally {
      setLoaded(true);
    }
  }, []);

  const loadTrash = useCallback(async () => {
    try {
      const res = await fetch("/api/community/posts?view=trash", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setTrash(data.data);
    } catch {
      // Non-critical.
    }
  }, []);

  const loadComments = useCallback(async (postId: string) => {
    try {
      const res = await fetch(`/api/community/posts/${encodeURIComponent(postId)}/comments`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setComments(data.data);
    } catch {
      // Non-critical.
    }
  }, []);

  useEffect(() => {
    void loadPosts();
    const interval = window.setInterval(() => void loadPosts(), FEED_POLL_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [loadPosts]);

  useEffect(() => {
    if (showTrash) void loadTrash();
  }, [showTrash, loadTrash]);

  useEffect(() => {
    if (!activePostId) return;
    void loadComments(activePostId);
    const interval = window.setInterval(() => void loadComments(activePostId), COMMENTS_POLL_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [activePostId, loadComments]);

  const resetComposer = () => {
    setTitle("");
    setBody("");
    setImageUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      setError("That image is too large - please use a file under 1.5MB.");
      event.target.value = "";
      return;
    }
    try {
      const dataUrl = await fileToDataUrl(file);
      setImageUrl(dataUrl);
      setError("");
    } catch {
      setError("Could not read that image. Please try another file.");
    }
  };

  const submitPost = async (event: React.FormEvent) => {
    event.preventDefault();
    if (posting) return;
    setPosting(true);
    setError("");
    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, title, body, imageUrl }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not publish your post.");
        return;
      }
      resetComposer();
      await loadPosts();
    } catch {
      setError("Could not publish your post. Check your connection and try again.");
    } finally {
      setPosting(false);
    }
  };

  const react = async (targetType: "post" | "comment", targetId: string, reactionType: string) => {
    try {
      const res = await fetch("/api/community/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType, targetId, reactionType }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not save your reaction.");
        return;
      }
      if (targetType === "post") {
        setPosts((prev) => prev.map((post) => (post.id === targetId ? { ...post, reactionSummary: data.data.reactionSummary } : post)));
      } else {
        setComments((prev) => prev.map((comment) => (comment.id === targetId ? { ...comment, reactionSummary: data.data.reactionSummary } : comment)));
      }
    } catch {
      setError("Could not save your reaction. Please try again.");
    }
  };

  const deletePost = async (postId: string) => {
    setError("");
    try {
      const res = await fetch("/api/community/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not delete this post.");
        return;
      }
      if (activePostId === postId) setActivePostId(null);
      await loadPosts();
    } catch {
      setError("Could not delete this post. Please try again.");
    }
  };

  const restorePost = async (postId: string) => {
    setError("");
    try {
      const res = await fetch("/api/community/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", postId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not restore this post.");
        return;
      }
      await loadTrash();
      await loadPosts();
    } catch {
      setError("Could not restore this post. Please try again.");
    }
  };

  const submitComment = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed || !activePostId || commentSending) return;
    setCommentSending(true);
    setError("");
    try {
      const res = await fetch(`/api/community/posts/${encodeURIComponent(activePostId)}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, parentCommentId: replyingTo?.id }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not post your comment.");
        return;
      }
      setCommentText("");
      setReplyingTo(null);
      await loadComments(activePostId);
      await loadPosts();
    } catch {
      setError("Could not post your comment. Please try again.");
    } finally {
      setCommentSending(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    setError("");
    try {
      const res = await fetch(`/api/community/posts/${encodeURIComponent(activePostId || "")}/comments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Could not delete this comment.");
        return;
      }
      if (activePostId) {
        await loadComments(activePostId);
        await loadPosts();
      }
    } catch {
      setError("Could not delete this comment. Please try again.");
    }
  };

  const activePost = posts.find((post) => post.id === activePostId) || null;

  const kindTabs: { id: PostKind; label: string; icon: typeof Type }[] = [
    { id: "text", label: "Text", icon: Type },
    { id: "image", label: "Photo", icon: FileImage },
    { id: "article", label: "Article", icon: Newspaper },
  ];

  return (
    <div className="space-y-5">
      {error && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
          <button type="button" onClick={() => setError("")} className="shrink-0 text-red-400 hover:text-red-700">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowTrash((current) => !current)}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-500 hover:border-primary hover:text-primary"
        >
          {showTrash ? "Back to Feed" : "My Deleted Posts"}
        </button>
      </div>

      {showTrash ? (
        <div className="space-y-3 rounded-2xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
          {trash.length === 0 ? (
            <p className="py-8 text-center text-sm font-bold text-gray-400">Nothing in your trash.</p>
          ) : (
            trash.map((post) => (
              <div key={post.id} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-dark">{post.title || post.body?.slice(0, 60) || "Photo post"}</p>
                  <p className="mt-1 text-xs text-gray-400">Deleted {formatTime(post.deletedAt || post.createdAt)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => void restorePost(post.id)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/30 bg-white px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5"
                >
                  <Undo2 className="h-3.5 w-3.5" aria-hidden="true" /> Restore
                </button>
              </div>
            ))
          )}
        </div>
      ) : activePost ? (
        <div className="space-y-4">
          <button type="button" onClick={() => setActivePostId(null)} className="text-sm font-bold text-gray-500 hover:text-dark">
            &larr; Back to feed
          </button>

          <article className="rounded-2xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5 md:p-6">
            <PostHeader post={activePost} currentUser={currentUser} onDelete={() => void deletePost(activePost.id)} />
            <PostBody post={activePost} />
            <div className="mt-4 border-t border-gray-100 pt-3">
              <ReactionBar summary={activePost.reactionSummary} onReact={(type) => void react("post", activePost.id, type)} />
            </div>
          </article>

          <div className="rounded-2xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5 md:p-6">
            <h3 className="mb-4 flex items-center gap-2 font-extrabold text-dark">
              <MessageSquare className="h-4 w-4 text-primary" aria-hidden="true" /> Comments ({comments.length})
            </h3>
            <div className="space-y-4">
              {comments.filter((c) => !c.parentCommentId).map((comment) => (
                <div key={comment.id}>
                  <CommentRow
                    comment={comment}
                    currentUser={currentUser}
                    onReact={(type) => void react("comment", comment.id, type)}
                    onDelete={() => void deleteComment(comment.id)}
                    onReply={() => setReplyingTo(comment)}
                  />
                  {comments.filter((c) => c.parentCommentId === comment.id).map((reply) => (
                    <div key={reply.id} className="ml-9 mt-2">
                      <CommentRow
                        comment={reply}
                        currentUser={currentUser}
                        onReact={(type) => void react("comment", reply.id, type)}
                        onDelete={() => void deleteComment(reply.id)}
                      />
                    </div>
                  ))}
                </div>
              ))}
              {comments.length === 0 && <p className="py-6 text-center text-sm font-bold text-gray-400">No comments yet.</p>}
            </div>

            <form onSubmit={submitComment} className="mt-4 space-y-2">
              {replyingTo && (
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                  Replying to <span className="font-bold">{replyingTo.studentName}</span>
                  <button type="button" onClick={() => setReplyingTo(null)} className="text-gray-400 hover:text-dark">
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
              <div className="flex items-end gap-2">
                <textarea
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value.slice(0, 800))}
                  placeholder="Write a comment..."
                  rows={1}
                  className="min-h-[42px] flex-1 resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={commentSending || !commentText.trim()}
                  className="h-[42px] shrink-0 rounded-xl bg-primary px-4 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-40"
                >
                  {commentSending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Comment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={submitPost} className="space-y-3 rounded-2xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5 md:p-6">
            <div className="flex gap-2">
              {kindTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setKind(tab.id)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    kind === tab.id ? "bg-primary text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5" aria-hidden="true" /> {tab.label}
                </button>
              ))}
            </div>

            {kind === "article" && (
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value.slice(0, 140))}
                placeholder="Article title"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold outline-none focus:border-primary"
              />
            )}

            {kind !== "image" && (
              <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder={kind === "article" ? "Write your article..." : "Share something with the community..."}
                rows={kind === "article" ? 6 : 3}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            )}

            {(kind === "image" || imageUrl) && (
              <div className="space-y-2">
                <div className="flex gap-2 text-xs font-bold text-gray-500">
                  <button type="button" onClick={() => setImageInputMode("upload")} className={imageInputMode === "upload" ? "text-primary" : ""}>
                    Upload a photo
                  </button>
                  <span>|</span>
                  <button type="button" onClick={() => setImageInputMode("link")} className={imageInputMode === "link" ? "text-primary" : ""}>
                    Use an image link
                  </button>
                </div>
                {imageInputMode === "upload" ? (
                  <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleFileChange} className="text-sm" />
                ) : (
                  <input
                    value={imageUrl.startsWith("data:") ? "" : imageUrl}
                    onChange={(event) => setImageUrl(event.target.value.trim())}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                )}
                {imageUrl && (
                  <div className="relative inline-block">
                    <img src={imageUrl} alt="Preview" className="max-h-48 rounded-xl border border-gray-100 object-cover" />
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-white text-gray-500 shadow-md hover:text-red-600"
                    >
                      <X className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={posting}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary/90 disabled:opacity-40"
              >
                {posting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <PenLine className="h-4 w-4" aria-hidden="true" />}
                Publish
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {!loaded ? (
              <div className="flex justify-center py-10 text-gray-400">
                <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
              </div>
            ) : posts.length === 0 ? (
              <p className="py-10 text-center text-sm font-bold text-gray-400">No posts yet. Share something with your classmates!</p>
            ) : (
              posts.map((post) => (
                <article key={post.id} className="rounded-2xl border border-white bg-white p-5 shadow-sm ring-1 ring-slate-900/5 md:p-6">
                  <PostHeader post={post} currentUser={currentUser} onDelete={() => void deletePost(post.id)} />
                  <PostBody post={post} truncate onOpen={() => setActivePostId(post.id)} />
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <ReactionBar summary={post.reactionSummary} onReact={(type) => void react("post", post.id, type)} />
                    <button
                      type="button"
                      onClick={() => setActivePostId(post.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary"
                    >
                      <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" /> {post.commentCount} comments
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

function PostHeader({ post, currentUser, onDelete }: { post: FeedPost; currentUser: CurrentUser; onDelete: () => void }) {
  const isOwner = currentUser?.id === post.studentId;
  const isAdmin = currentUser?.role === "admin";
  const kindLabel = post.kind === "article" ? "Article" : post.kind === "image" ? "Photo" : "Post";

  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <Avatar name={post.studentName} avatar={post.avatar} className="h-10 w-10 shrink-0 rounded-full" />
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-dark">{post.studentName}</span>
            {post.role === "admin" && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-black uppercase text-primary">Admin</span>
            )}
          </div>
          <p className="text-xs text-gray-400">
            {kindLabel} - {formatTime(post.createdAt)}
            {post.editedAt && " - edited"}
          </p>
        </div>
      </div>
      {(isOwner || isAdmin) && (
        <button type="button" onClick={onDelete} className="text-gray-300 hover:text-red-600" title={isAdmin && !isOwner ? "Remove (admin)" : "Delete"}>
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function PostBody({ post, truncate, onOpen }: { post: FeedPost; truncate?: boolean; onOpen?: () => void }) {
  const body = post.body || "";
  const isLong = truncate && post.kind === "article" && body.length > 300;
  const shown = isLong ? `${body.slice(0, 300)}...` : body;

  return (
    <div>
      {post.title && <h3 className="mb-2 text-lg font-extrabold text-dark">{post.title}</h3>}
      {shown && <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-700">{shown}</p>}
      {isLong && onOpen && (
        <button type="button" onClick={onOpen} className="mt-1 text-xs font-bold text-primary hover:underline">
          Read more
        </button>
      )}
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title || "Post image"} className="mt-3 max-h-[420px] w-full rounded-xl border border-gray-100 object-cover" />
      )}
    </div>
  );
}

function CommentRow({
  comment,
  currentUser,
  onReact,
  onDelete,
  onReply,
}: {
  comment: FeedComment;
  currentUser: CurrentUser;
  onReact: (type: string) => void;
  onDelete: () => void;
  onReply?: () => void;
}) {
  const isOwner = currentUser?.id === comment.studentId;
  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="flex items-start gap-2.5">
      <Avatar name={comment.studentName} avatar={comment.avatar} className="h-8 w-8 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl bg-gray-100 px-3.5 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-dark">{comment.studentName}</span>
            {comment.role === "admin" && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-black uppercase text-primary">Admin</span>
            )}
          </div>
          <p className="whitespace-pre-wrap break-words text-sm text-gray-700">{comment.text}</p>
        </div>
        <div className="mt-1 flex items-center gap-3 px-1 text-xs text-gray-400">
          <span>{formatTime(comment.createdAt)}</span>
          {onReply && (
            <button type="button" onClick={onReply} className="font-bold hover:text-primary">Reply</button>
          )}
          {(isOwner || isAdmin) && (
            <button type="button" onClick={onDelete} className="font-bold hover:text-red-600">
              {isAdmin && !isOwner ? "Remove" : "Delete"}
            </button>
          )}
        </div>
        <div className="mt-1 px-1">
          <ReactionBar summary={comment.reactionSummary} onReact={onReact} />
        </div>
      </div>
    </div>
  );
}
