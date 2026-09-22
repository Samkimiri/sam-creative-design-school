import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
  // The certificate routes embed src/lib/certFonts/*.ttf into the SVG they render
  // (so PNG/JPEG downloads don't depend on the serverless host having system
  // fonts installed). Those files are read at runtime via a path built from an
  // array rather than a single literal fs.readFileSync(...) call, so this makes
  // sure Vercel's build-time file tracing packages them regardless.
  outputFileTracingIncludes: {
    "/api/certificates/[courseId]": ["./src/lib/certFonts/**/*"],
    "/api/certificate-preview": ["./src/lib/certFonts/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Course, blog post, and student project images can be admin- or
    // student-provided external URLs (not just local /images/* files), so
    // next/image needs a broad remote allowlist rather than a fixed list of
    // known hosts.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(svg|ico|png|jpg|jpeg|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
