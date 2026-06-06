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
        src: "/images/scds-monogram.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/scds-monogram.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/images/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Open LMS",
        short_name: "LMS",
        description: "Continue your lessons and assignments.",
        url: "/lms",
        icons: [{ src: "/images/scds-monogram.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "Enroll",
        short_name: "Enroll",
        description: "Join a course at Sam Creative Design School.",
        url: "/enroll",
        icons: [{ src: "/images/scds-monogram.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "Courses",
        short_name: "Courses",
        description: "Browse SCDS learning programs.",
        url: "/courses",
        icons: [{ src: "/images/scds-monogram.svg", sizes: "any", type: "image/svg+xml" }],
      },
    ],
  };
}
