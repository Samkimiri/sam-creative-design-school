export interface GalleryProject {
  id: string;
  student: string;
  course: string;
  title: string;
  image?: string;
  fallbackLabel: string;
  color: string;
  desc: string;
}

export const galleryProjects: GalleryProject[] = [
  {
    id: "naomis-kitchen-menu-poster",
    student: "Naomi",
    course: "Photoshop",
    title: "Naomi's Kitchen Menu Poster",
    image: "/images/gallery-naomis-hotel.jpg",
    fallbackLabel: "PS",
    color: "from-red-500 to-yellow-400",
    desc: "A bold restaurant menu poster designed for Naomi's Kitchen with vivid food imagery, clear menu hierarchy, and strong contact details.",
  },
  {
    id: "vector-logo-pack",
    student: "Kevin Omondi",
    course: "Illustrator",
    title: "Vector Logo Pack",
    image: "/images/gallery-illustrator.png",
    fallbackLabel: "AI",
    color: "from-sky-400 to-cyan-500",
    desc: "A complete logo system with 4 variations designed for a tech startup.",
  },
  {
    id: "product-promo-reel",
    student: "Sharon Wanjiru",
    course: "CapCut",
    title: "Product Promo Reel",
    fallbackLabel: "CC",
    color: "from-pink-500 to-rose-600",
    desc: "A 30-second Instagram Reel for a fashion brand with custom transitions and music sync.",
  },
  {
    id: "mechanical-bracket-assembly",
    student: "Brian Mutua",
    course: "SolidWorks",
    title: "Mechanical Bracket Assembly",
    fallbackLabel: "SW",
    color: "from-gray-500 to-gray-700",
    desc: "A fully constrained SolidWorks assembly with 12 parts and engineering drawings.",
  },
  {
    id: "social-media-content-kit",
    student: "Lydia Kamau",
    course: "Photoshop",
    title: "Social Media Content Kit",
    image: "/images/course-photoshop.png",
    fallbackLabel: "PS",
    color: "from-purple-400 to-pink-500",
    desc: "A 9-post Instagram grid for a beauty brand with consistent colour and typography.",
  },
  {
    id: "custom-icon-set",
    student: "Daniel Otieno",
    course: "Illustrator",
    title: "Custom Icon Set",
    image: "/images/gallery-illustrator.png",
    fallbackLabel: "AI",
    color: "from-teal-400 to-cyan-500",
    desc: "40 custom flat-design icons for a mobile app, delivered in SVG and PNG formats.",
  },
  {
    id: "youtube-intro-animation",
    student: "Faith Chebet",
    course: "CapCut",
    title: "YouTube Intro Animation",
    fallbackLabel: "CC",
    color: "from-rose-400 to-pink-500",
    desc: "An animated logo reveal and channel intro sequence for a YouTube cooking channel.",
  },
  {
    id: "sheet-metal-enclosure",
    student: "Moses Kipchoge",
    course: "SolidWorks",
    title: "Sheet Metal Enclosure",
    fallbackLabel: "SW",
    color: "from-slate-500 to-slate-700",
    desc: "A sheet metal enclosure design with bend reliefs, hardware cutouts and flat pattern.",
  },
  {
    id: "event-flyer-series",
    student: "Patricia Adhiambo",
    course: "Photoshop",
    title: "Event Flyer Series",
    image: "/images/gallery-naomis-hotel.jpg",
    fallbackLabel: "PS",
    color: "from-violet-400 to-purple-600",
    desc: "A series of 6 event flyers for a music festival, featuring custom photo manipulation.",
  },
];
