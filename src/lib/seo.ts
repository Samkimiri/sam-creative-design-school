export const siteName = "Sam Creative Design School";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://sam-creative-design-school.vercel.app"
).replace(/\/$/, "");

export const defaultSeoDescription =
  "Learn graphic design, Photoshop, Illustrator, UI/UX, web development, AI, CapCut, and SolidWorks online in Kenya with practical projects, mentorship, LMS access, and certificates.";

export const defaultOgImage = "/images/app-icon-512.png";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteName,
    alternateName: "SCDS",
    url: siteUrl,
    logo: absoluteUrl("/images/app-icon-512.png"),
    image: absoluteUrl("/images/hero.png"),
    description: defaultSeoDescription,
    founder: {
      "@type": "Person",
      name: "Samuel Kimiri",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
      addressRegion: "Kenya",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+254748201131",
        contactType: "customer support",
        areaServed: "KE",
        availableLanguage: ["English", "Swahili"],
      },
    ],
    sameAs: [
      "https://www.instagram.com/samcreativedesignschool",
      "https://www.facebook.com/profile.php?id=61591155443815",
      "https://www.linkedin.com/in/samuel-ndung-u-20b89b41a",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/courses?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
