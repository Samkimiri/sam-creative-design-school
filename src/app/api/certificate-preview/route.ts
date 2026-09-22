import { buildCertificateSvg } from "@/lib/certificateSvg";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";

export const runtime = "nodejs";

// Public, blank version of the real certificate design - the same layout and
// palette the PDF download uses - shown on the homepage slider and preview page.
export async function GET() {
  const intake = await getUpcomingIntakeSettings();
  const svg = buildCertificateSvg({
    studentName: "Graduate Name",
    courseTitle: "Course Title",
    certificateId: "SCDS-XXXXXXXX-COURSE",
    cohortLabel: intake.currentCohort,
    dateText: "DD Month YYYY",
    placeholder: true,
    skills: ["Skill One", "Skill Two", "Skill Three", "Skill Four"],
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
