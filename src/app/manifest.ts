import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sam Creative Design School",
    short_name: "SCDS",
    description:
      "Learn design, coding, AI, video editing, and CAD with Sam Creative Design School.",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#050914",
    theme_color: "#0056FF",
    categories: ["education", "productivity", "business"],
    icons: [
      {
        src: "/images/app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Open LMS",
        short_name: "LMS",
        description: "Continue your lessons and assignments.",
        url: "/lms",
        icons: [{ src: "/images/app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "Enroll",
        short_name: "Enroll",
        description: "Join a course at Sam Creative Design School.",
        url: "/enroll",
        icons: [{ src: "/images/app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "Courses",
        short_name: "Courses",
        description: "Browse SCDS learning programs.",
        url: "/courses",
        icons: [{ src: "/images/app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "Study Break Games",
        short_name: "Games",
        description: "Refresh with quick offline-friendly games.",
        url: "/games",
        icons: [{ src: "/images/app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
    ],
  };
}
