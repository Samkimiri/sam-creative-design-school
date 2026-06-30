export type CourseVisual = {
  accent: string;
  gradient: string;
  soft: string;
  border: string;
  text: string;
  ring: string;
  icon: string;
};

const defaultVisual: CourseVisual = {
  accent: "bg-primary",
  gradient: "from-blue-500 via-sky-500 to-cyan-400",
  soft: "bg-blue-50",
  border: "border-blue-100",
  text: "text-blue-700",
  ring: "ring-blue-200/70",
  icon: "SC",
};

const courseVisuals: Record<string, CourseVisual> = {
  "photoshop-masterclass": {
    accent: "bg-blue-500",
    gradient: "from-blue-600 via-sky-500 to-indigo-600",
    soft: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-700",
    ring: "ring-blue-200/70",
    icon: "PS",
  },
  "illustrator-training": {
    accent: "bg-amber-500",
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    soft: "bg-amber-50",
    border: "border-amber-100",
    text: "text-amber-700",
    ring: "ring-amber-200/70",
    icon: "AI",
  },
  "vibe-designing-uiux": {
    accent: "bg-emerald-500",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    soft: "bg-emerald-50",
    border: "border-emerald-100",
    text: "text-emerald-700",
    ring: "ring-emerald-200/70",
    icon: "UX",
  },
  "vibe-coding-web-dev": {
    accent: "bg-lime-500",
    gradient: "from-lime-500 via-green-500 to-emerald-600",
    soft: "bg-lime-50",
    border: "border-lime-100",
    text: "text-green-700",
    ring: "ring-lime-200/70",
    icon: "</>",
  },
  "ai-prompt-engineering": {
    accent: "bg-violet-500",
    gradient: "from-violet-600 via-fuchsia-500 to-rose-500",
    soft: "bg-violet-50",
    border: "border-violet-100",
    text: "text-violet-700",
    ring: "ring-violet-200/70",
    icon: "AI",
  },
  "capcut-masterclass": {
    accent: "bg-rose-500",
    gradient: "from-rose-500 via-pink-500 to-red-500",
    soft: "bg-rose-50",
    border: "border-rose-100",
    text: "text-rose-700",
    ring: "ring-rose-200/70",
    icon: "CC",
  },
  "solidworks-engineers": {
    accent: "bg-slate-700",
    gradient: "from-slate-700 via-zinc-600 to-cyan-700",
    soft: "bg-slate-50",
    border: "border-slate-200",
    text: "text-slate-700",
    ring: "ring-slate-200/80",
    icon: "3D",
  },
};

export function getCourseVisual(courseId: string) {
  return courseVisuals[courseId] || defaultVisual;
}
