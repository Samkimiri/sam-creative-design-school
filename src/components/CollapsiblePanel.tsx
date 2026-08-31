"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsiblePanelProps {
  title: ReactNode;
  subtitle?: ReactNode;
  headerExtra?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  children: ReactNode;
}

export default function CollapsiblePanel({
  title,
  subtitle,
  headerExtra,
  defaultOpen = true,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  children,
}: CollapsiblePanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <div className={`flex items-center justify-between gap-3 ${headerClassName}`}>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
          aria-expanded={open}
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-primary hover:text-primary">
            {open ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
          </span>
          <span className="min-w-0">
            <span className="block font-bold text-dark">{title}</span>
            {subtitle && <span className="mt-1 block text-xs font-medium text-slate-500">{subtitle}</span>}
          </span>
        </button>
        {headerExtra}
      </div>
      {open && <div className={bodyClassName}>{children}</div>}
    </div>
  );
}
