export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  gradient: string;
  tags: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "photoshop-course-in-kenya-portfolio-plan",
    title: "Photoshop Course in Kenya: A 30-Day Portfolio Plan",
    excerpt:
      "A practical roadmap for turning Photoshop lessons into posters, social graphics, mockups, and a portfolio that can win real client work.",
    category: "Photoshop",
    date: "May 30, 2026",
    readTime: "7 min read",
    image: "/images/course-photoshop.png",
    gradient: "from-blue-500 to-indigo-600",
    tags: ["Photoshop course in Kenya", "Portfolio", "Freelancing"],
    content: [
      "A strong Photoshop course should not only teach tools. It should help a student build proof. In the first week, focus on workspace control, document setup, layers, masks, export formats, and clean file organization.",
      "In week two, move into practical design tasks: a social media poster, a simple product advert, a church or event flyer, and a business promotion graphic. Every file should be saved as an editable PSD and exported as a web-ready image.",
      "In week three, add retouching, typography, mockups, and brand consistency. Students should learn how to present work professionally, because clients judge both the final image and the way the designer communicates.",
      "By the final week, each student should have a small portfolio: at least one poster, one product advert, one social media kit, one retouched image, and one mockup presentation. That portfolio becomes the bridge between class and paid work.",
    ],
  },
  {
    id: "solidworks-training-kenya-engineering-projects",
    title: "SolidWorks Training in Kenya: Projects Students Should Build",
    excerpt:
      "The best CAD learning happens through parts, assemblies, and drawings that feel close to real engineering work.",
    category: "Engineering",
    date: "May 24, 2026",
    readTime: "6 min read",
    image: "/images/course-solidworks.png",
    gradient: "from-gray-600 to-gray-800",
    tags: ["SolidWorks training Kenya", "CAD", "Engineering"],
    content: [
      "SolidWorks students need more than button knowledge. They need modeling discipline: fully defined sketches, correct relations, clear dimensions, sensible feature order, and drawings that another person can understand.",
      "A beginner project can start with a bracket, phone stand, clamp, or simple enclosure. These objects teach extrudes, cuts, fillets, chamfers, hole placement, and drawing views without overwhelming the student.",
      "Intermediate students should build assemblies. A hinge, mini vice, wheel assembly, or sheet metal box teaches mates, tolerances, exploded views, and bill of materials thinking.",
      "The final project should include a part file, assembly file, rendered image, and technical drawing PDF. This gives students evidence they can show employers or clients.",
    ],
  },
  {
    id: "capcut-video-editing-course-content-workflow",
    title: "CapCut Course Kenya: A Simple Workflow for Better Reels",
    excerpt:
      "Plan the hook, clean the timeline, add captions, then use effects only where they support the message.",
    category: "Video Editing",
    date: "May 18, 2026",
    readTime: "5 min read",
    image: "/images/course-capcut.png",
    gradient: "from-pink-500 to-rose-600",
    tags: ["CapCut course Kenya", "Reels", "Content Creation"],
    content: [
      "CapCut is powerful because it makes mobile editing fast, but speed should not replace structure. A good lesson starts with the purpose of the video: teach, sell, entertain, announce, or document.",
      "The first job is the hook. Students should cut weak openings and start with the strongest visual or sentence. After that, the timeline should remove pauses, repeated words, and clips that do not move the story forward.",
      "Captions should be readable, short, and placed away from faces and products. Music and effects should match the energy of the content instead of fighting for attention.",
      "A finished student project should include a vertical 9:16 export, clean captions, balanced audio, and a short caption text ready for posting.",
    ],
  },
  {
    id: "how-to-submit-school-assignments-online",
    title: "How Online Assignment Feedback Helps Creative Students Improve",
    excerpt:
      "Submitting assignments inside the LMS makes it easier for tutors to mark work, leave feedback, and track progress.",
    category: "LMS",
    date: "May 12, 2026",
    readTime: "4 min read",
    image: "/images/graphic-design.png",
    gradient: "from-emerald-500 to-teal-600",
    tags: ["Assignments", "Feedback", "Learning Portal"],
    content: [
      "Creative skills improve when students receive feedback on actual work. That is why each lesson should connect to an assignment: a design file, a video export, a drawing, a screenshot, or a project link.",
      "A good submission includes the final work, a short explanation of the goal, and any question the student wants the tutor to answer. This helps the tutor give useful feedback instead of only saying pass or fail.",
      "Inside the LMS, assignments also help the school understand who is active, who needs help, and which lessons may need clearer notes or examples.",
      "Students should treat each assignment as a portfolio step. By the end of the course, the submitted work can become a public project gallery after review.",
    ],
  },
  {
    id: "illustrator-training-in-kenya-logo-branding",
    title: "Illustrator Training in Kenya: Learn Logo and Brand Design",
    excerpt:
      "A practical guide for students who want to use Adobe Illustrator for logos, vector artwork, business cards, and brand identity projects.",
    category: "Illustrator",
    date: "June 8, 2026",
    readTime: "6 min read",
    image: "/images/course-illustrator.png",
    gradient: "from-orange-500 to-amber-600",
    tags: ["Illustrator training in Kenya", "Logo Design", "Branding"],
    content: [
      "Good Illustrator training in Kenya should help students move from tracing shapes to building clean, editable vector artwork. The first lessons should cover artboards, shapes, strokes, fills, alignment, the Pen tool, typography, and exporting files for print and digital use.",
      "Logo and brand design need more than software speed. Students should learn how to create simple concepts, refine marks, choose readable type, prepare color variations, and present designs in a way that clients can understand.",
      "A strong Illustrator class should include practical work such as a logo set, business card, flyer layout, icon pack, and social media brand kit. These projects help students prove they can design for real businesses.",
      "By the end of the course, each student should have editable AI files, export-ready PNG/PDF files, and a small branding portfolio that can support freelance work, internships, or business marketing.",
    ],
  },
  {
    id: "graphic-design-school-in-kenya-career-path",
    title: "Graphic Design School in Kenya: What to Look for Before Enrolling",
    excerpt:
      "Choose a design school that teaches tools, portfolio projects, feedback, certificates, and practical workflows for Kenyan business needs.",
    category: "Graphic Design",
    date: "June 7, 2026",
    readTime: "7 min read",
    image: "/images/graphic-design.png",
    gradient: "from-sky-500 to-blue-700",
    tags: ["Graphic design school in Kenya", "Creative Career", "Portfolio"],
    content: [
      "A good graphic design school in Kenya should teach students how to solve communication problems, not only how to click tools. The best training connects software lessons with posters, flyers, logos, adverts, social media content, and brand presentations.",
      "Students should check whether the school gives assignments, feedback, examples, downloadable notes, and certificate support. These details matter because design skill grows through practice and correction.",
      "Portfolio work is also important. A student should finish with visible projects that show layout, typography, image editing, color control, and brand consistency. This is what helps a beginner approach clients or apply for creative roles.",
      "For online learners, WhatsApp mentorship and LMS access can make a big difference. Students can rewatch lessons, submit assignments, and ask questions while still learning at their own pace.",
    ],
  },
  {
    id: "online-design-courses-with-certificate-kenya",
    title: "Online Design Courses with Certificate in Kenya",
    excerpt:
      "Learn how online design classes can combine videos, assignments, mentor feedback, portfolio projects, and certificates.",
    category: "Online Learning",
    date: "June 6, 2026",
    readTime: "6 min read",
    image: "/images/course-vibe-designing-ui-ux.png",
    gradient: "from-violet-500 to-fuchsia-600",
    tags: ["Online design courses with certificate", "Kenya", "LMS"],
    content: [
      "Online design courses with certificate support are useful when they are structured around real practice. Students should not only watch videos. They should follow a lesson path, complete assignments, receive feedback, and build portfolio pieces.",
      "A certificate becomes more valuable when it sits beside visible proof of skill. For design students, that proof can include posters, logos, social media graphics, UI mockups, video edits, CAD models, or complete brand kits.",
      "A good online course should provide lesson notes, downloadable resources, quizzes, assignment uploads, and mentor access. These features help students stay accountable even when learning remotely.",
      "Before enrolling, check the course duration, software requirements, payment process, and whether the school offers support through WhatsApp or an LMS. The right setup makes online learning feel guided instead of lonely.",
    ],
  },
];

export function getBlogPost(id: string) {
  return blogPosts.find((post) => post.id === id);
}
