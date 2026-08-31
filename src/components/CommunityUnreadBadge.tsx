"use client";

import { useEffect, useState } from "react";

export default function CommunityUnreadBadge({ className = "" }: { className?: string }) {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      fetch("/api/community/notifications", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled && data.success) setUnread(data.data?.unreadCount || 0);
        })
        .catch(() => undefined);
    };

    poll();
    const interval = window.setInterval(poll, 20000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  if (unread === 0) return null;

  return (
    <span className={`grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1.5 text-[10px] font-black text-white ${className}`}>
      {unread > 9 ? "9+" : unread}
    </span>
  );
}
