export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  duration: string;
  price: number;
  priceRange: string;
  skills: string[];
  image: string;
  icon: string;
  color: string;
  level: string;
  certificate: boolean;
}

export const courses: Course[] = [
  {
    id: "photoshop-masterclass",
    title: "Adobe Photoshop Masterclass",
    shortTitle: "Photoshop",
    description: "Master the world's most powerful image editing software. Learn professional photo retouching, manipulation, and digital art creation.",
    longDescription: "This comprehensive 30-day program takes you from absolute beginner to professional-level Photoshop user. You'll work on real client projects, build a portfolio of finished designs, and gain the skills to take on paid freelance work. Samuel Kimiri walks you through every tool, panel, and workflow with patience and clarity.",
    duration: "4 Weeks (30 Days)",
    price: 4000,
    priceRange: "Ksh 1,000 / week",
    skills: ["Poster Design", "Brand Identity", "Social Media Content", "Photo Retouching", "Digital Painting", "Mockup Design"],
    image: "/images/course-photoshop.png",
    icon: "🎨",
    color: "from-blue-500 to-indigo-600",
    level: "Beginner to Intermediate",
    certificate: true
  },
  {
    id: "illustrator-training",
    title: "Adobe Illustrator Training",
    shortTitle: "Illustrator",
    description: "Unlock your creativity with vector graphics. Create logos, icons, and complex illustrations that scale perfectly at any size.",
    longDescription: "Vector design is the backbone of professional branding. In this 30-day course you'll master every key tool in Adobe Illustrator—from pen paths to pattern fills—and complete real-world projects: logo systems, icon packs, infographics, and full brand guides. Your work will be ready for print and digital use from day one.",
    duration: "4 Weeks (30 Days)",
    price: 4000,
    priceRange: "Ksh 1,000 / week",
    skills: ["Logo Design", "Vector Illustration", "Typography", "Print Design", "Icon Design", "Brand Identity"],
    image: "/images/course-illustrator.png",
    icon: "✏️",
    color: "from-sky-400 to-cyan-500",
    level: "Beginner to Intermediate",
    certificate: true
  },
  {
    id: "vibe-designing-uiux",
    title: "Vibe Designing - UI/UX Masterclass",
    shortTitle: "Vibe Designing",
    description: "Design modern apps and websites with user research, wireframes, visual systems, interactive prototypes, and polished case studies.",
    longDescription: "This 35-day UI/UX program helps students think like product designers. You will research real users, map journeys, plan information architecture, create wireframes, design clean interfaces in Figma, prototype user flows, and package your work into a portfolio-ready case study before graduation.",
    duration: "5 Weeks (35 Days)",
    price: 5500,
    priceRange: "Ksh 1,100 / week",
    skills: ["User Research", "Wireframing", "Figma UI Design", "Prototyping", "Design Systems", "UX Case Studies"],
    image: "/images/course-vibe-designing-uiux.png",
    icon: "UX",
    color: "from-emerald-400 to-teal-600",
    level: "Beginner to Intermediate",
    certificate: true
  },
  {
    id: "vibe-coding-web-dev",
    title: "Vibe Coding - Web Development Bootcamp",
    shortTitle: "Vibe Coding",
    description: "Build responsive websites and full-stack web apps with HTML, CSS, JavaScript, React, Next.js, APIs, and deployment workflows.",
    longDescription: "This 56-day web development bootcamp turns beginner students into practical builders. You will code responsive pages, interactive components, reusable layouts, API-powered features, authentication-ready flows, and deployable Next.js projects while building a portfolio that proves you can ship real websites.",
    duration: "8 Weeks (56 Days)",
    price: 8500,
    priceRange: "Ksh 1,065 / week",
    skills: ["HTML & CSS", "JavaScript", "React Components", "Next.js Routing", "API Integration", "Deployment"],
    image: "/images/course-vibe-coding-web-dev.png",
    icon: "</>",
    color: "from-lime-400 to-green-600",
    level: "Beginner to Job-Ready",
    certificate: true
  },
  {
    id: "ai-prompt-engineering",
    title: "AI & Prompt Engineering",
    shortTitle: "AI Prompts",
    description: "Use AI tools responsibly for content, design, business workflows, automation, research, and practical prompt systems.",
    longDescription: "This 21-day AI and prompt engineering course teaches students how to get useful, reliable outputs from modern AI tools. You will learn prompt structure, context design, image and content workflows, AI-assisted research, automation planning, evaluation, safety, and how to package AI workflows for real business use.",
    duration: "3 Weeks (21 Days)",
    price: 3500,
    priceRange: "Ksh 1,165 / week",
    skills: ["Prompt Design", "AI Content Workflows", "Image Prompting", "Automation Planning", "Research Synthesis", "Responsible AI"],
    image: "/images/course-ai-prompt-engineering.png",
    icon: "AI",
    color: "from-fuchsia-500 to-red-500",
    level: "Beginner",
    certificate: true
  },
  {
    id: "capcut-masterclass",
    title: "CapCut Video Editing Masterclass",
    shortTitle: "CapCut",
    description: "Create viral video content using CapCut. Perfect for content creators, influencers, and businesses wanting to grow on social media.",
    longDescription: "In 15 intensive days you'll go from basic trimming to producing highly polished, engagement-ready videos for TikTok, Instagram Reels, and YouTube Shorts. You'll learn the latest trending effects, transitions, colour-grading techniques and how to sync audio with visuals for maximum impact. Every lesson comes with practice files.",
    duration: "2 Weeks (15 Days)",
    price: 2000,
    priceRange: "Ksh 1,000 / week",
    skills: ["Video Trimming", "Effects & Transitions", "Color Grading", "Audio Editing", "Text Animations", "Trending Templates"],
    image: "/images/course-capcut.png",
    icon: "🎬",
    color: "from-pink-500 to-rose-600",
    level: "Beginner",
    certificate: true
  },
  {
    id: "solidworks-engineers",
    title: "SolidWorks for Engineers",
    shortTitle: "SolidWorks",
    description: "Master 3D CAD design for mechanical engineering. Create complex parts, assemblies, and technical drawings for real-world projects.",
    longDescription: "This 45-day engineering course is built for students and professionals who need industry-standard 3D modelling skills. You'll create parts from scratch, assemble full mechanisms, generate engineering drawings, and run basic simulation tests. Every project mirrors real-world industrial requirements so your skills are immediately transferable to the job market.",
    duration: "6 Weeks (45 Days)",
    price: 9000,
    priceRange: "Ksh 1,500 / week",
    skills: ["3D Part Modelling", "Assembly Design", "Engineering Drawing", "Simulation Basics", "Sheet Metal Design", "Rendering"],
    image: "/images/course-solidworks.png",
    icon: "⚙️",
    color: "from-gray-600 to-gray-800",
    level: "Intermediate",
    certificate: true
  }
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  videoUrl: string;
  image?: string;
  imageAlt?: string;
  content: string;
  keyPoints?: string[];
  resources: { name: string; url: string; type: "pdf" | "zip" | "link" }[];
  quiz?: { questions: QuizQuestion[] };
  order: number;
}

const baseLessons: Lesson[] = [
  // ─── PHOTOSHOP MASTERCLASS ───────────────────────────────────────────────
  {
    id: "ps-1", courseId: "photoshop-masterclass", order: 1,
    title: "Introduction to the Photoshop Workspace",
    duration: "18:30",
    videoUrl: "https://www.youtube.com/embed/IyR_uYsRdPs",
    content: "Overview: Welcome to Sam Creative Design School! Photoshop is a raster-based image editor, which means it works with pixels rather than mathematical paths. This first lesson orients you in the workspace so every later lesson builds on solid footing.\n\nWhy it matters: Understanding pixels versus vectors and choosing the right resolution from day one prevents blurry exports and wasted rework later in the course.",
    keyPoints: [
      "Workspace: the Toolbar (V for Move, B for Brush), the Options Bar for contextual settings, and Panels like Layers and History.",
      "Pixels vs vectors: Photoshop deals with pixels - tiny squares of color that can blur when scaled up too far.",
      "DPI standards: use 72 DPI for web and social media, and 300 DPI for high-quality printing such as flyers, posters, and banners.",
      "New document: press Ctrl+N to start, and always name your files properly from the start.",
    ],
    resources: [{ name: "Workspace Cheatsheet.pdf", url: "#", type: "pdf" }],
    quiz: {
      questions: [
        { id: "ps-1-q1", question: "What is the industry standard DPI for high-quality printing?", options: ["72 DPI", "150 DPI", "300 DPI", "600 DPI"], answer: 2 },
        { id: "ps-1-q2", question: "Which tool is used to move objects around the canvas?", options: ["Brush Tool", "Move Tool (V)", "Eraser Tool", "Zoom Tool"], answer: 1 }
      ]
    }
  },
  {
    id: "ps-2", courseId: "photoshop-masterclass", order: 2,
    title: "Mastering Layers & Blending Modes",
    duration: "22:15",
    videoUrl: "https://www.youtube.com/embed/IyR_uYsRdPs",
    content: "Overview: Layers are the foundation of non-destructive editing in Photoshop. Instead of editing pixels directly, you stack independent pieces on top of each other so any change can be undone or adjusted later.\n\nWhy it matters: Understanding layer order and blending modes early means you will not have to redo work when a client asks for a change - you simply adjust the relevant layer.",
    keyPoints: [
      "Layer order: elements higher in the panel appear in front on the canvas.",
      "Blending modes: Multiply removes whites (great for textures), Screen removes blacks (great for light effects), and Overlay adds contrast.",
      "Opacity vs Fill: Opacity affects the whole layer, while Fill does not affect layer styles like drop shadows.",
      "Organization: group your layers with Ctrl+G to stay organized as a file grows.",
    ],
    resources: [{ name: "Layer Exercise Assets.zip", url: "#", type: "zip" }],
    quiz: {
      questions: [
        { id: "ps-2-q1", question: "Which blending mode is best for removing a black background from a light effect?", options: ["Multiply", "Screen", "Overlay", "Color Burn"], answer: 1 },
        { id: "ps-2-q2", question: "What is the shortcut to group selected layers?", options: ["Ctrl+T", "Ctrl+J", "Ctrl+G", "Ctrl+E"], answer: 2 }
      ]
    }
  },
  {
    id: "ps-3", courseId: "photoshop-masterclass", order: 3,
    title: "Selections & Advanced Masking",
    duration: "25:00",
    videoUrl: "https://www.youtube.com/embed/IyR_uYsRdPs",
    content: "Overview: Cutting a subject cleanly out of its background is one of the most requested Photoshop skills, from product photography to social media graphics.\n\nWhy it matters: Using layer masks instead of the Eraser tool keeps your edit reversible, so a mistake never means starting over.",
    keyPoints: [
      "Quick Selection Tool (W): fast for simple, high-contrast backgrounds.",
      "Pen Tool (P): the most precise option for smooth, clean edges.",
      "Select and Mask workspace: use Refine Edge for complex details like hair or fur.",
      "Layer masks: never use the Eraser tool - a mask lets white reveal and black hide, so you can bring back hidden areas later.",
    ],
    resources: [{ name: "Cutout Practice Photos.zip", url: "#", type: "zip" }],
    quiz: {
      questions: [
        { id: "ps-3-q1", question: "In a Layer Mask, what color is used to hide parts of the layer?", options: ["White", "Black", "Grey", "Red"], answer: 1 }
      ]
    }
  },
  {
    id: "ps-4", courseId: "photoshop-masterclass", order: 4,
    title: "Professional Skin Retouching",
    duration: "28:45",
    videoUrl: "https://www.youtube.com/embed/IyR_uYsRdPs",
    content: "Overview: Professional beauty retouching goes far beyond a simple blur - it separates texture from tone so skin looks natural, not plastic.\n\nWhy it matters: Frequency separation is the single technique that distinguishes amateur retouching from professional beauty work, and it is a skill clients specifically pay for.",
    keyPoints: [
      "Spot Healing Brush: best for quick blemish removal.",
      "Clone Stamp (S): copies pixels from one area of the image to another.",
      "Frequency separation: splits the image into a texture layer and a color layer, so skin can be smoothed without losing natural detail.",
      "Dodge and Burn: adds highlights and shadows to give the face more depth and structure.",
    ],
    resources: [{ name: "Retouching Workflow.pdf", url: "#", type: "pdf" }],
  },
  {
    id: "ps-5", courseId: "photoshop-masterclass", order: 5,
    title: "Dynamic Typography & Poster Design",
    duration: "31:20",
    videoUrl: "https://www.youtube.com/embed/IyR_uYsRdPs",
    content: "Overview: Strong poster design comes down to two things: hierarchy (what the eye sees first) and balance (how elements sit together on the page).\n\nWhy it matters: A poster with confusing hierarchy loses its message no matter how nice the individual graphics look, so typography and layout decisions matter as much as imagery.",
    keyPoints: [
      "Tracking and kerning: adjusting the space between letters for better readability.",
      "Layer styles: use drop shadows, glows, and inner shadows to make text pop off the background.",
      "Clipping masks: place an image inside text with Ctrl+Alt+G for a bold editorial effect.",
      "Layout: use the rule of thirds to place elements where the eye naturally looks first.",
    ],
    resources: [{ name: "Poster Templates.zip", url: "#", type: "zip" }],
  },

  // ─── ILLUSTRATOR TRAINING ─────────────────────────────────────────────────
  {
    id: "ai-1", courseId: "illustrator-training", order: 1,
    title: "Vector vs Raster & UI Layout",
    duration: "16:40",
    videoUrl: "https://www.youtube.com/embed/Ib8UBwu3yGA",
    content: "Overview: Illustrator is built for branding work because vector artwork stays crisp at any size - from a business card to a billboard.\n\nWhy it matters: Choosing the correct color mode and understanding vectors from lesson one avoids the most common beginner mistake: designing a logo that looks blurry once it is printed large.",
    keyPoints: [
      "Vectors: made of points and paths, so they never pixelate no matter how large you scale them.",
      "Artboards: work like separate pages inside one Illustrator file.",
      "Selection (V) vs Direct Selection (A): use Direct Selection to edit individual points on a path.",
      "Print vs web: use CMYK color mode for logos that will be printed, and RGB only for screens.",
    ],
    resources: [{ name: "Vector Basics.pdf", url: "#", type: "pdf" }],
    quiz: {
      questions: [
        { id: "ai-1-q1", question: "What happens to a vector image when you scale it up 1000%?", options: ["It becomes blurry", "It remains perfectly sharp", "It changes color", "It disappears"], answer: 1 }
      ]
    }
  },
  {
    id: "ai-2", courseId: "illustrator-training", order: 2,
    title: "The Holy Grail: Pen Tool Mastery",
    duration: "29:15",
    videoUrl: "https://www.youtube.com/embed/Ib8UBwu3yGA",
    content: "Overview: The Pen Tool is the single most important tool in Illustrator - once you can control it confidently, you can draw almost any shape you can imagine.\n\nWhy it matters: Clean, minimal anchor points are what separate a professional vector file from a messy one that is hard to edit later.",
    keyPoints: [
      "Anchor points: click for sharp corners, or click and drag for smooth curves.",
      "Handle management: hold Alt to break a handle when you need a sharp change in direction.",
      "Curvature Tool: a faster, beginner-friendly way to draw smooth curves.",
      "Practice: tracing existing logos is one of the fastest ways to train your hand and eye for precision.",
    ],
    resources: [{ name: "Pen Tool Tracing Pack.pdf", url: "#", type: "pdf" }],
  },
  {
    id: "ai-3", courseId: "illustrator-training", order: 3,
    title: "Shape Builder & Logo Construction",
    duration: "25:30",
    videoUrl: "https://www.youtube.com/embed/Ib8UBwu3yGA",
    content: "Overview: Many iconic logos are built from a handful of simple shapes combined cleverly, not complex illustration.\n\nWhy it matters: Learning Shape Builder and Pathfinder means you can construct clean, geometric logos quickly instead of hand-drawing every curve.",
    keyPoints: [
      "Shape Builder (Shift+M): drag over shapes to join them, or Alt+click to remove parts.",
      "Pathfinder: a panel-based alternative for uniting, subtracting, or intersecting shapes.",
      "Grids: use circles and lines to build a balanced, golden-ratio-style logo structure.",
      "Expanding: convert strokes into filled shapes so the logo scales correctly everywhere.",
    ],
    resources: [{ name: "Logo Grid Template.zip", url: "#", type: "zip" }],
  },

  // ─── CAPCUT MASTERCLASS ──────────────────────────────────────────────────
  {
    id: "cc-1", courseId: "capcut-masterclass", order: 1,
    title: "Viral Video Foundations",
    duration: "14:20",
    videoUrl: "https://www.youtube.com/embed/nEwHL9GRuFk",
    content: "Overview: Short-form video on TikTok, Reels, and Shorts has become one of the most important skills for any creator or small business to have.\n\nWhy it matters: Getting the basics right - the correct aspect ratio, a clean timeline, and tight cuts - matters more to viewer retention than any fancy effect.",
    keyPoints: [
      "Aspect ratios: use 9:16 for mobile-first platforms like Reels and Shorts, and 16:9 for YouTube or TV.",
      "The timeline: get comfortable scrubbing, cutting, and trimming clips precisely.",
      "Audio extraction: pull the audio track from one video to reuse on another.",
      "Smooth cuts: remove gaps and dead air between words to keep the energy high and viewers watching.",
    ],
    resources: [{ name: "Practice Clips.zip", url: "#", type: "zip" }],
    quiz: {
      questions: [
        { id: "cc-1-q1", question: "Which aspect ratio is best for Instagram Reels?", options: ["16:9", "4:3", "9:16", "2:1"], answer: 2 }
      ]
    }
  },
  {
    id: "cc-2", courseId: "capcut-masterclass", order: 2,
    title: "Transitions & Keyframe Animation",
    duration: "22:10",
    videoUrl: "https://www.youtube.com/embed/nEwHL9GRuFk",
    content: "Overview: Motion carries emotion in video - a well-timed zoom or slide can make a moment feel exciting, while a static shot can feel flat.\n\nWhy it matters: Keyframes and velocity editing are what separate a scroll-stopping edit from a plain one, and both are core CapCut skills used constantly by professional editors.",
    keyPoints: [
      "Keyframes: set a start and end point for an effect, useful for custom zooms and sliding text.",
      "Overlays: layer one video on top of another for creative effects.",
      "Blending: adjust overlays so they look like a natural part of the original scene.",
      "Velocity editing: speed up or slow down clips for dramatic impact.",
    ],
    resources: [],
  },

  // ─── SOLIDWORKS ──────────────────────────────────────────────────────────
  {
    id: "sw-1", courseId: "solidworks-engineers", order: 1,
    title: "Precision Sketching & Smart Dimensions",
    duration: "26:00",
    videoUrl: "https://www.youtube.com/embed/1du6w97Rsm4",
    content: "Overview: Engineering design demands precision, and SolidWorks gives you the tools to describe exact geometry rather than approximate shapes.\n\nWhy it matters: A sketch that is not fully defined can shift unexpectedly when you change a dimension later, which is one of the most common causes of broken CAD models.",
    keyPoints: [
      "Relations: horizontal, vertical, tangent, and coincident relations tell lines how to behave.",
      "Smart Dimensions: drive the size of your sketch using numeric values instead of dragging by eye.",
      "Fully defined sketches: black lines mean geometry cannot move accidentally - blue lines are a warning sign in engineering.",
      "Mirror Entities: design one half of a symmetric part and mirror it to save time and guarantee symmetry.",
    ],
    resources: [{ name: "Sketch Exercises.pdf", url: "#", type: "pdf" }],
    quiz: {
      questions: [
        { id: "sw-1-q1", question: "What color does a sketch turn when it is 'Fully Defined'?", options: ["Blue", "Red", "Black", "Green"], answer: 2 },
        { id: "sw-1-q2", question: "Which relation makes two circles share the same center point?", options: ["Tangent", "Concentric", "Coincident", "Parallel"], answer: 1 }
      ]
    }
  },
  {
    id: "sw-2", courseId: "solidworks-engineers", order: 2,
    title: "3D Extrusions & Revolves",
    duration: "31:15",
    videoUrl: "https://www.youtube.com/embed/cIKOwZhzh6Q",
    content: "Overview: Once a 2D sketch is fully defined, SolidWorks lets you turn it into real 3D geometry using a small set of core features.\n\nWhy it matters: Extrude, Revolve, and Cut are used in almost every part you will ever model, so mastering them here makes every later lesson faster.",
    keyPoints: [
      "Extrude Boss/Base: gives a flat sketch real thickness.",
      "Revolve: spins a profile around an axis - ideal for bottles, wheels, and gears.",
      "Extrude Cut: removes material from an existing solid.",
      "Fillet and Chamfer: round or flatten edges for safety and manufacturing quality.",
    ],
    resources: [{ name: "Part Design Brief.pdf", url: "#", type: "pdf" }],
  }
];

type ModulePlan = {
  title: string;
  theme: string;
  lessons: string[];
};

const youtubeEmbed = (videoId: string) => `https://www.youtube.com/embed/${videoId}`;

const verifiedLessonVideos = {
  photoshopWorkspace: youtubeEmbed("IyR_uYsRdPs"),
  figmaUiDesign: youtubeEmbed("jwCmIBJ8Jtc"),
  frontendBootcamp: youtubeEmbed("zJSY8tbf_ys"),
  javascriptBasics: youtubeEmbed("W6NZfCO5SIk"),
  reactCourse: youtubeEmbed("CgkZ7MvWUAA"),
  nextAppRouter: youtubeEmbed("k7o9R6eaSes"),
  nodeApis: youtubeEmbed("Oe421EPjeBE"),
  promptEngineering: youtubeEmbed("8ib4Qnh2HFE"),
} as const;

const defaultVideoUrl = verifiedLessonVideos.photoshopWorkspace;

function getGeneratedLessonVideo(courseId: string, moduleIndex: number, lessonTitle: string) {
  const normalizedTitle = lessonTitle.toLowerCase();

  if (courseId === "vibe-designing-uiux") {
    return verifiedLessonVideos.figmaUiDesign;
  }

  if (courseId === "ai-prompt-engineering") {
    return verifiedLessonVideos.promptEngineering;
  }

  if (courseId === "vibe-coding-web-dev") {
    if (moduleIndex <= 1) return verifiedLessonVideos.frontendBootcamp;
    if (moduleIndex === 2 || normalizedTitle.includes("javascript") || normalizedTitle.includes("local storage")) {
      return verifiedLessonVideos.javascriptBasics;
    }
    if (moduleIndex === 3 || normalizedTitle.includes("react") || normalizedTitle.includes("component")) {
      return verifiedLessonVideos.reactCourse;
    }
    if (moduleIndex === 4 || normalizedTitle.includes("next") || normalizedTitle.includes("app router") || normalizedTitle.includes("metadata")) {
      return verifiedLessonVideos.nextAppRouter;
    }
    if (moduleIndex === 5 || normalizedTitle.includes("api") || normalizedTitle.includes("http") || normalizedTitle.includes("json") || normalizedTitle.includes("fetch")) {
      return verifiedLessonVideos.nodeApis;
    }
    if (moduleIndex >= 6) return verifiedLessonVideos.nextAppRouter;
    return verifiedLessonVideos.frontendBootcamp;
  }

  return defaultVideoUrl;
}

type CourseModuleVoice = {
  expertNotes: string;
  workflow: string;
};

function splitIntoSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

// Stem phrasings for the questions every module checkpoint quiz asks beyond
// Q1 - cycled by module index and always naming the module itself, so no two
// checkpoints (in this course or any other course built with this same
// generator) ever ask the literal same question.
const checkpointSubmissionStems = [
  (title: string) => `Before submitting the ${title} checkpoint, what should it include?`,
  (title: string) => `What makes a ${title} checkpoint submission complete?`,
  (title: string) => `Which combination best describes a ready-to-review ${title} checkpoint?`,
  (title: string) => `What should reviewers expect to see in a finished ${title} checkpoint?`,
];
const checkpointFeedbackStems = [
  (title: string) => `Why is tutor feedback valuable after finishing ${title}?`,
  (title: string) => `Why should you get feedback before moving past ${title}?`,
  (title: string) => `What is the benefit of tutor review at the ${title} stage?`,
  (title: string) => `Why does a second opinion matter once ${title} is done?`,
];
const checkpointHabitStems = [
  (title: string) => `Which habit makes revisiting your ${title} work easier later?`,
  (title: string) => `What habit during ${title} makes future revisions simpler?`,
  (title: string) => `Which practice keeps ${title} work easy to revise later?`,
  (title: string) => `What organizing habit pays off most during ${title}?`,
];
const checkpointNextStepStems = [
  (title: string) => `What is the best next step after finishing the ${title} project?`,
  (title: string) => `Once your ${title} project is done, what should come next?`,
  (title: string) => `After completing ${title}, what is the smartest next move?`,
  (title: string) => `What should follow right after wrapping up ${title}?`,
];

function createModuleLessons(
  courseId: string,
  prefix: string,
  courseLabel: string,
  image: string,
  imageAlt: string,
  modules: ModulePlan[],
  voice: CourseModuleVoice,
): Lesson[] {
  return modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lessonTitle, lessonIndex) => {
      const order = moduleIndex * 7 + lessonIndex + 1;
      const id = `${prefix}-${moduleIndex + 1}-${lessonIndex + 1}`;
      const isModuleCheckpoint = lessonIndex === module.lessons.length - 1;
      const previousLessonTitle = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;

      const bridge = isModuleCheckpoint
        ? `This checkpoint closes out the ${module.title} module.`
        : previousLessonTitle
          ? `Following on from "${previousLessonTitle}", this lesson moves into ${lessonTitle.toLowerCase()}.`
          : `This is the opening lesson of the ${module.title} module.`;

      const checkpointRecap = isModuleCheckpoint
        ? `\n\nModule recap: this checkpoint brings together everything covered in ${module.title} - ${module.lessons.slice(0, -1).join(", ")}. Look back at your work from each of these lessons before submitting this checkpoint, and make sure it reflects what you learned across the whole module, not just the most recent lesson.`
        : "";

      return {
        id,
        courseId,
        order,
        title: `Module ${moduleIndex + 1}: ${lessonTitle}`,
        duration: `${16 + ((moduleIndex + lessonIndex) % 7) * 2}:00`,
        videoUrl: getGeneratedLessonVideo(courseId, moduleIndex, lessonTitle),
        image,
        imageAlt,
        content: `${courseLabel} - ${module.title}: ${lessonTitle}.

${bridge} ${module.theme}

${voice.expertNotes}

${voice.workflow}${checkpointRecap}`,
        keyPoints: isModuleCheckpoint
          ? [`Review checkpoint covering: ${module.lessons.slice(0, -1).join(", ")}.`, ...splitIntoSentences(module.theme)]
          : [`This lesson's focus: ${lessonTitle}.`, ...splitIntoSentences(module.theme)],
        resources: [{ name: `${courseLabel} ${module.title} Workbook.pdf`, url: "#", type: "pdf" }],
        ...(isModuleCheckpoint
          ? {
              quiz: {
                questions: [
                  {
                    id: `${id}-q1`,
                    question: `What is the main purpose of ${module.title}?`,
                    options: ["To skip planning", "To guide a practical project milestone", "To avoid feedback", "To remove documentation"],
                    answer: 1,
                    explanation: `${module.title} gives the student a clear milestone that can be reviewed and improved.`,
                  },
                  {
                    id: `${id}-q2`,
                    question: checkpointSubmissionStems[moduleIndex % checkpointSubmissionStems.length](module.title),
                    options: ["A goal, process notes, and final evidence", "Only a screenshot", "Only the software name", "Nothing until graduation"],
                    answer: 0,
                    explanation: "Portfolio work is stronger when it shows the brief, process, choices, and finished result.",
                  },
                  {
                    id: `${id}-q3`,
                    question: checkpointFeedbackStems[moduleIndex % checkpointFeedbackStems.length](module.title),
                    options: ["It makes the project slower only", "It helps improve weak choices before final delivery", "It replaces practice", "It removes the need for a portfolio"],
                    answer: 1,
                    explanation: "Feedback helps students correct gaps and present cleaner graduation work.",
                  },
                  {
                    id: `${id}-q4`,
                    question: checkpointHabitStems[moduleIndex % checkpointHabitStems.length](module.title),
                    options: ["Naming files and layers clearly", "Deleting all drafts", "Avoiding notes", "Saving only screenshots"],
                    answer: 0,
                    explanation: "Clear naming and organized files make revision, feedback, and final presentation easier.",
                  },
                  {
                    id: `${id}-q5`,
                    question: checkpointNextStepStems[moduleIndex % checkpointNextStepStems.length](module.title),
                    options: ["Archive it without review", "Test, document, and improve it", "Start over without checking", "Hide the source files"],
                    answer: 1,
                    explanation: "Testing, documenting, and improving the project turns practice into portfolio-ready work.",
                  },
                ],
              },
            }
          : {}),
      };
    }),
  );
}

const capcutProfessionalPlans = [
  {
    module: "Story Planning",
    title: "Story Planning and Shot Selection",
    theme: "Plan the message before editing. Define the viewer, platform, opening hook, proof points, and call-to-action, then choose clips that move the story forward.",
    practice: "Write a 30-second school advert plan with a hook, three key shots, B-roll ideas, and a final call-to-action.",
  },
  {
    module: "Story Planning",
    title: "Rough Cut and Story Flow",
    theme: "Build the first complete edit without heavy effects. Arrange the hook, context, value, proof, and call-to-action, then trim repeated moments and dead space.",
    practice: "Create a rough cut from 8 to 12 clips and export a draft for review before adding transitions or text animation.",
  },
  {
    module: "Story Planning",
    title: "Audio Cleanup and Music Timing",
    theme: "Clean audio makes a video feel professional. Balance voice, music, and sound effects, then time important cuts to music beats without overpowering the message.",
    practice: "Edit a short clip with voice, background music, three beat cuts, and controlled sound effects.",
  },
  {
    module: "Visual Communication",
    title: "Captions, Lower Thirds, and Text Hierarchy",
    theme: "Use text to make the video easier to understand. Captions must be readable on phones, lower thirds should identify people clearly, and text hierarchy should guide attention.",
    practice: "Add captions and a lower third to a 30-second talking clip, then preview it at mobile size.",
  },
  {
    module: "Visual Communication",
    title: "B-Roll, Overlays, and Visual Proof",
    theme: "Use supporting footage to prove what the main clip says. B-roll, screenshots, logos, and before-after overlays should clarify the message instead of decorating randomly.",
    practice: "Add five relevant B-roll moments to a talking-head video and explain what each one proves.",
  },
  {
    module: "Visual Communication",
    title: "Color Correction and Visual Consistency",
    theme: "Correct exposure, contrast, white balance, and saturation before adding creative style. Match clips so the sequence feels consistent across lighting conditions.",
    practice: "Correct three clips shot in different lighting and export before-after screenshots with notes.",
  },
  {
    module: "Motion and Effects",
    title: "Keyframes, Motion, and Smooth Movement",
    theme: "Keyframes create controlled movement. Animate position, scale, rotation, and opacity with intention so motion guides attention without distracting from the story.",
    practice: "Animate a product photo, a text title, and a logo using simple consistent keyframe motion.",
  },
  {
    module: "Motion and Effects",
    title: "Speed Ramps and Transition Control",
    theme: "Speed ramps and transitions should support rhythm and meaning. Use fast motion to skip weak time, slow motion to emphasize important moments, and cuts when clean timing is enough.",
    practice: "Create a 15-second montage with three speed ramps and two controlled transitions.",
  },
  {
    module: "Motion and Effects",
    title: "Brand Templates for Reels and Shorts",
    theme: "Templates help creators publish consistently. Set reusable caption styles, colors, title movement, logo placement, intro structure, and outro call-to-action.",
    practice: "Build a reusable 9:16 school reel template with intro text, captions, lower third, logo outro, and export settings.",
  },
  {
    module: "Delivery and Portfolio",
    title: "Social Media Export and Platform Delivery",
    theme: "Export for the platform. Use 9:16 for TikTok, Reels, Shorts, and Status, 16:9 for YouTube landscape and presentations, and clear versioned filenames for client review.",
    practice: "Export one video in 9:16 and 16:9, then compare what gets cropped and what must change for each platform.",
  },
  {
    module: "Delivery and Portfolio",
    title: "Client Review and Revision Workflow",
    theme: "Professional editors manage feedback clearly. Send labelled drafts, ask for time-coded comments, separate mistakes from creative preferences, and keep revision deadlines visible.",
    practice: "Write a mock client review message with feedback instructions, version label, and revision deadline.",
  },
  {
    module: "Delivery and Portfolio",
    title: "Portfolio Packaging and Case Study Notes",
    theme: "A video portfolio should show process, not only final exports. Document the brief, audience, platform, timeline decisions, improvements, final file, and selected screenshots.",
    practice: "Create a mini case study for one CapCut edit with timeline screenshots, final export link, and three improvements made.",
  },
  {
    module: "Delivery and Portfolio",
    title: "Graduation Edit and Final Quality Check",
    theme: "The final project combines planning, story, audio, captions, motion, color, export, and presentation into one portfolio-ready video.",
    practice: "Submit a 30 to 60-second edited video with planning notes, revision evidence, final export, and reflection.",
  },
];

const capcutSubmissionStems = [
  (title: string) => `What should every "${title}" portfolio checkpoint include?`,
  (title: string) => `Before wrapping up "${title}", what should the checkpoint include?`,
  (title: string) => `What makes a "${title}" checkpoint ready to show a client?`,
  (title: string) => `Which combination is expected in the "${title}" checkpoint?`,
];
const capcutMobileReviewStems = [
  (title: string) => `Why should the "${title}" export be reviewed on a phone?`,
  (title: string) => `After finishing "${title}", why check the export on mobile?`,
  (title: string) => `What is the reason to preview "${title}" on a phone screen?`,
  (title: string) => `Why does "${title}" call for a mobile playback check?`,
];

const capcutProfessionalLessons: Lesson[] = capcutProfessionalPlans.map((plan, index) => {
  const order = index + 3;
  const id = `cc-${order}`;
  const previousPlan = index > 0 ? capcutProfessionalPlans[index - 1] : null;
  const isFirstInModule = !previousPlan || previousPlan.module !== plan.module;
  const bridge = isFirstInModule
    ? `This opens the ${plan.module} stage of CapCut Video Editing Masterclass.`
    : `Building on the previous lesson on "${previousPlan!.title}", this lesson moves into ${plan.title.toLowerCase()}.`;

  return {
    id,
    courseId: "capcut-masterclass",
    order,
    title: `Module ${Math.floor(index / 3) + 2}: ${plan.title}`,
    duration: `${18 + (index % 6)}:00`,
    videoUrl: "https://www.youtube.com/embed/nEwHL9GRuFk",
    image: "/images/course-capcut.png",
    imageAlt: "CapCut professional video editing lesson workspace",
    content: `CapCut Video Editing Masterclass - ${plan.module}: ${plan.title}.

${bridge} ${plan.theme}

CapCut notes: work from a rough cut to a fine cut instead of perfecting one section first, keep raw footage, audio, and exports in clearly named folders, and always preview edits on a phone screen since most short-form viewers watch on mobile. Data from major platforms shows most viewers decide whether to keep watching within the first three seconds, and burned-in captions alone can lift retention by 15 to 25 percent - the opening moment and readable captions matter more than any transition effect.

Production workflow: define the objective and audience, assemble a rough version, review it against the brief, refine pacing and audio, then export a clean final version sized for the platform it will be published on.

Practice task: ${plan.practice}

Portfolio checkpoint: save the final export, one timeline screenshot, one before-after comparison where relevant, and three notes explaining what improved in this lesson compared to the previous one.`,
    keyPoints: [...splitIntoSentences(plan.theme), `Practice focus: ${plan.practice}`],
    resources: [{ name: `${plan.title} Workbook.pdf`, url: "#", type: "pdf" }],
    quiz: {
      questions: [
        {
          id: `${id}-q1`,
          question: `What is the main focus of ${plan.title}?`,
          options: ["Improving a practical editing decision", "Skipping planning", "Hiding the message", "Deleting all project files"],
          answer: 0,
          explanation: `${plan.title} builds a specific professional video editing skill that improves the final project.`,
        },
        {
          id: `${id}-q2`,
          question: capcutSubmissionStems[index % capcutSubmissionStems.length](plan.title),
          options: ["Final export, evidence, and process notes", "Only an unnamed draft", "Only the app icon", "Nothing until graduation"],
          answer: 0,
          explanation: "Portfolio evidence shows the brief, process, improvements, and final result.",
        },
        {
          id: `${id}-q3`,
          question: capcutMobileReviewStems[index % capcutMobileReviewStems.length](plan.title),
          options: ["Most short-form viewers watch on mobile", "It deletes bad clips automatically", "It changes the course price", "It removes all captions"],
          answer: 0,
          explanation: "Mobile review helps catch caption, cropping, sound, and readability issues before publishing.",
        },
      ],
    },
  };
});

type CourseExpansionPlan = {
  courseId: string;
  prefix: string;
  courseLabel: string;
  image: string;
  imageAlt: string;
  videoUrl: string;
  startOrder: number;
  lessons: {
    module: string;
    title: string;
    theme: string;
    practice: string;
  }[];
};

type DisciplineVoice = {
  expertNotes: string;
  workflow: string;
  checkpointClosing: string;
};

// Same idea as the checkpoint stems above, but for every lesson these
// professional-expansion courses generate (not just checkpoints) - cycled by
// lesson index and always naming the lesson itself.
const expansionSubmissionStems = [
  (title: string) => `What should a strong submission for "${title}" include?`,
  (title: string) => `Before marking "${title}" complete, what should the submission show?`,
  (title: string) => `What makes a "${title}" submission ready for review?`,
  (title: string) => `Which combination is expected in a "${title}" submission?`,
];
const expansionEditableStems = [
  (title: string) => `Why should your working files for "${title}" stay editable?`,
  (title: string) => `During "${title}", why keep source files editable rather than flattened?`,
  (title: string) => `What is the benefit of editable files while working on "${title}"?`,
  (title: string) => `Why does "${title}" call for keeping the working file editable?`,
];

function createProfessionalExpansionLessons(plan: CourseExpansionPlan & { voice: DisciplineVoice }): Lesson[] {
  return plan.lessons.map((lesson, index) => {
    const order = plan.startOrder + index;
    const id = `${plan.prefix}-${order}`;
    const previousLesson = index > 0 ? plan.lessons[index - 1] : null;
    const isFirstInModule = !previousLesson || previousLesson.module !== lesson.module;

    const bridge = isFirstInModule
      ? `This opens the ${lesson.module} stage of ${plan.courseLabel}.`
      : `Building on the previous lesson on "${previousLesson!.title}", this lesson moves into ${lesson.title.toLowerCase()}.`;

    return {
      id,
      courseId: plan.courseId,
      order,
      title: `Module ${Math.floor(index / 3) + 2}: ${lesson.title}`,
      duration: `${20 + (index % 7) * 2}:00`,
      videoUrl: plan.videoUrl,
      image: plan.image,
      imageAlt: plan.imageAlt,
      content: `${plan.courseLabel} - ${lesson.module}: ${lesson.title}.

${bridge} ${lesson.theme}

${plan.voice.expertNotes}

${plan.voice.workflow}

Practice task: ${lesson.practice}

Portfolio checkpoint: ${plan.voice.checkpointClosing}`,
      keyPoints: [...splitIntoSentences(lesson.theme), `Practice focus: ${lesson.practice}`],
      resources: [{ name: `${lesson.title} Workbook.pdf`, url: "#", type: "pdf" }],
      quiz: {
        questions: [
          {
            id: `${id}-q1`,
            question: `What is the main goal of ${lesson.title}?`,
            options: ["To complete a practical professional checkpoint", "To skip planning", "To delete editable files", "To avoid tutor review"],
            answer: 0,
            explanation: `${lesson.title} is designed to create a reviewable skill checkpoint, not just a passive note.`,
          },
          {
            id: `${id}-q2`,
            question: expansionSubmissionStems[index % expansionSubmissionStems.length](lesson.title),
            options: ["Working file, final export, process evidence, and notes", "Only a screenshot", "Only a file name", "Nothing until graduation"],
            answer: 0,
            explanation: "A complete submission shows both the final result and the process used to create it.",
          },
          {
            id: `${id}-q3`,
            question: expansionEditableStems[index % expansionEditableStems.length](lesson.title),
            options: ["So corrections and client changes are easier", "So the file cannot open", "So layers disappear", "So the project loses quality"],
            answer: 0,
            explanation: "Editable files make review, revision, and professional delivery much easier.",
          },
        ],
      },
    };
  });
}

const photoshopProfessionalLessons = createProfessionalExpansionLessons({
  courseId: "photoshop-masterclass",
  prefix: "ps",
  courseLabel: "Adobe Photoshop Masterclass",
  image: "/images/course-photoshop.png",
  imageAlt: "Photoshop professional design lesson workspace",
  videoUrl: verifiedLessonVideos.photoshopWorkspace,
  startOrder: 6,
  voice: {
    expertNotes: "Photoshop notes: work non-destructively with adjustment layers and layer masks instead of erasing pixels permanently, keep a clear layer naming and folder convention as files grow, and turn repeated elements into Smart Objects so they stay easy to resize or swap out later. Professional retouchers organize source images in Bridge with ratings and keywords before they ever open Photoshop, so nothing gets lost in a messy folder.",
    workflow: "Production workflow: sketch the composition roughly first, build the base layout and imagery, apply your color and typography system, then finish with fine detail and export presets sized correctly for web or print.",
    checkpointClosing: "save the layered PSD file, a flattened export, and a short note on which Photoshop technique made the biggest difference in this lesson.",
  },
  lessons: [
    {
      module: "Design Foundations",
      title: "Color Theory for Posters and Social Media",
      theme: "Learn how hue, saturation, contrast, temperature, and color harmony affect emotion and readability. Build palettes that support the message instead of decorating randomly.",
      practice: "Create three color palettes for a school intake poster: calm, energetic, and premium. Apply one palette to a finished layout.",
    },
    {
      module: "Design Foundations",
      title: "Composition, Grids, and Visual Balance",
      theme: "Use margins, alignment, rule of thirds, focal points, and spacing to make posters feel intentional. Composition decides what the viewer sees first, second, and last.",
      practice: "Redesign a crowded flyer into a balanced layout using a grid, one strong headline, and clear call-to-action placement.",
    },
    {
      module: "Design Foundations",
      title: "Photo Correction and Camera Raw Basics",
      theme: "Correct exposure, contrast, white balance, highlights, shadows, sharpness, and noise before starting heavy design work. Clean source images make professional designs easier.",
      practice: "Correct three low-quality photos, export before-after previews, and explain which settings improved each image.",
    },
    {
      module: "Brand and Marketing Design",
      title: "Social Media Campaign Design",
      theme: "Plan a complete campaign with consistent colors, typography, logo placement, spacing, and message hierarchy across square, story, and status formats.",
      practice: "Design a three-post campaign for a course launch: announcement, benefits, and deadline reminder.",
    },
    {
      module: "Brand and Marketing Design",
      title: "Product Mockups and Smart Object Workflow",
      theme: "Use Smart Objects to place designs on phones, t-shirts, packaging, posters, and billboards while preserving shadows, perspective, and editability.",
      practice: "Place one poster design into three mockups and export a presentation board for client review.",
    },
    {
      module: "Brand and Marketing Design",
      title: "Print Preparation and Export Standards",
      theme: "Prepare files for printing with correct size, bleed, safe margins, 300 DPI images, CMYK awareness, and professional PDF delivery.",
      practice: "Prepare a print-ready A4 flyer with bleed, safe margins, and export versions for print and WhatsApp sharing.",
    },
    {
      module: "Advanced Compositing",
      title: "Lighting, Shadows, and Realistic Blending",
      theme: "Match subjects to backgrounds using direction of light, contact shadows, color balance, depth, blur, and edge cleanup so composites feel believable.",
      practice: "Place a cutout subject into a new background and create matching shadows, color, and depth.",
    },
    {
      module: "Advanced Compositing",
      title: "Creative Effects and Double Exposure",
      theme: "Combine masks, gradients, blending modes, textures, and adjustment layers to create expressive editorial effects without destroying the original photo.",
      practice: "Create a double exposure portrait using at least two images, masks, and one adjustment layer group.",
    },
    {
      module: "Advanced Compositing",
      title: "Brand Poster Graduation Project",
      theme: "Bring together layout, typography, color, image correction, masking, mockups, and export into one polished brand poster project.",
      practice: "Submit a final campaign poster with PSD, social export, print export, mockup, and reflection notes.",
    },
    {
      module: "Client Workflow",
      title: "Client Briefs and Design Research",
      theme: "Translate client goals into a design direction by asking better questions, studying competitors, collecting references, and defining deliverables.",
      practice: "Write a design brief for a real or imagined small business and collect six reference images with notes.",
    },
    {
      module: "Client Workflow",
      title: "Revision Management and File Handover",
      theme: "Handle feedback professionally by labeling versions, separating corrections from preferences, and preparing organized final files for the client.",
      practice: "Create a revision log and final handover folder structure for one completed Photoshop project.",
    },
    {
      module: "Client Workflow",
      title: "Photoshop Portfolio Packaging",
      theme: "Present finished work with project goals, process screenshots, before-after comparisons, mockups, and clear captions so clients can trust your skill.",
      practice: "Build a one-page portfolio case study for your strongest Photoshop project.",
    },
  ],
});

const illustratorProfessionalLessons = createProfessionalExpansionLessons({
  courseId: "illustrator-training",
  prefix: "ai",
  courseLabel: "Adobe Illustrator Training",
  image: "/images/course-illustrator.png",
  imageAlt: "Illustrator vector design lesson workspace",
  videoUrl: "https://www.youtube.com/embed/Ib8UBwu3yGA",
  startOrder: 4,
  voice: {
    expertNotes: "Illustrator notes: build shapes with the Pen tool and Shape Builder rather than tracing loosely, keep anchor points to the minimum needed for a clean curve, and use the Appearance panel to adjust stroke and fill without duplicating objects. Strong logos usually stick to 2 to 3 colors for faster brand recognition, and clever use of negative space is what separates a memorable mark from a generic one.",
    workflow: "Production workflow: block out the concept with simple shapes, refine proportions on a grid, apply your swatch-based color system, then export both editable AI or PDF source files and flattened SVG or PNG assets for delivery.",
    checkpointClosing: "save the editable AI file, an exported PNG or SVG, and a short note on how you kept the artwork scalable and clean.",
  },
  lessons: [
    {
      module: "Vector Foundations",
      title: "Stroke, Fill, and Appearance Control",
      theme: "Understand how fills, strokes, stroke weight, caps, corners, opacity, and the Appearance panel control clean vector artwork.",
      practice: "Create an icon set using consistent stroke weights, rounded corners, and aligned fills.",
    },
    {
      module: "Vector Foundations",
      title: "Typography and Text Outlines",
      theme: "Use type professionally, choose readable fonts, control spacing, and convert text to outlines only when preparing final logo or print files.",
      practice: "Design three wordmark options and convert a final copy to outlines for delivery.",
    },
    {
      module: "Vector Foundations",
      title: "Color Systems, Swatches, and Gradients",
      theme: "Build reusable color swatches, global colors, gradients, and tints so brand artwork stays consistent across many assets.",
      practice: "Create a brand palette with primary, secondary, neutral, and accent swatches.",
    },
    {
      module: "Brand Identity",
      title: "Logo Research and Sketch Development",
      theme: "Start logo design with research, audience understanding, rough sketches, symbol exploration, and visual direction before opening final vector files.",
      practice: "Create ten rough logo concepts for a food, fashion, or school brand and choose the strongest three.",
    },
    {
      module: "Brand Identity",
      title: "Logo Refinement and Grid Alignment",
      theme: "Refine chosen logo concepts with grids, spacing, alignment, optical balance, shape cleanup, and black-and-white testing.",
      practice: "Refine one logo using a grid and present black, white, and color versions.",
    },
    {
      module: "Brand Identity",
      title: "Brand Guide and Usage Rules",
      theme: "Create a simple brand guide that explains logo versions, clear space, color codes, fonts, wrong usage, and sample applications.",
      practice: "Build a one-page brand guide for your final logo system.",
    },
    {
      module: "Illustration and Layout",
      title: "Icon Design and Consistency",
      theme: "Design icons that share the same stroke weight, corner style, visual size, spacing, and level of detail.",
      practice: "Create six matching icons for a school website or mobile app feature list.",
    },
    {
      module: "Illustration and Layout",
      title: "Infographic and Data Layout",
      theme: "Turn facts, steps, comparisons, and numbers into clear visual layouts using hierarchy, icons, charts, labels, and spacing.",
      practice: "Design an infographic explaining a course journey from enrollment to certificate.",
    },
    {
      module: "Illustration and Layout",
      title: "Pattern Design and Reusable Assets",
      theme: "Create repeatable patterns, background elements, badges, stickers, and supporting graphics for brand systems.",
      practice: "Design a simple brand pattern and apply it to a mock package or social media background.",
    },
    {
      module: "Professional Delivery",
      title: "Preparing Files for Print and Web",
      theme: "Export SVG, PNG, PDF, and EPS files correctly while keeping editable AI source files organized for future revisions.",
      practice: "Export one logo package with AI, PDF, SVG, PNG, black, white, and color versions.",
    },
    {
      module: "Professional Delivery",
      title: "Client Presentation Boards",
      theme: "Present vector work professionally using clean boards that show the problem, concept, logo variations, colors, fonts, and mockups.",
      practice: "Create a client presentation board for one complete logo identity.",
    },
    {
      module: "Professional Delivery",
      title: "Illustrator Graduation Brand Kit",
      theme: "Combine logo, icons, color system, typography, pattern, brand guide, and export package into a complete portfolio project.",
      practice: "Submit a complete brand kit with source files, exports, mockups, and a short project explanation.",
    },
  ],
});

const solidworksProfessionalLessons = createProfessionalExpansionLessons({
  courseId: "solidworks-engineers",
  prefix: "sw",
  courseLabel: "SolidWorks for Engineers",
  image: "/images/course-solidworks.png",
  imageAlt: "SolidWorks mechanical engineering CAD lesson workspace",
  videoUrl: "https://www.youtube.com/embed/cIKOwZhzh6Q",
  startOrder: 3,
  voice: {
    expertNotes: "SolidWorks notes: define design intent early with reference planes, origins, and sketch relations so the model updates predictably when dimensions change, and keep feature names descriptive in the FeatureManager tree rather than leaving default names. A good test of design intent: if changing one dimension breaks the model or produces a strange shape, the sketch relations were not planned carefully enough.",
    workflow: "Production workflow: sketch with fully-defined geometry first, build features in a logical order from base shape to detail features, check fit inside an assembly if relevant, then move to drawings only once the model itself is correct.",
    checkpointClosing: "save the part or assembly file, a screenshot of the FeatureManager tree, and a short note on one design decision you made and why.",
  },
  lessons: [
    {
      module: "Part Modeling",
      title: "Reference Planes and Design Intent",
      theme: "Use reference planes, origins, symmetry, and design intent so parts update predictably when dimensions change.",
      practice: "Model a simple bracket using the origin, symmetry, and named reference planes.",
    },
    {
      module: "Part Modeling",
      title: "Holes, Slots, Patterns, and Mirroring",
      theme: "Create repeated engineering features using Hole Wizard thinking, linear patterns, circular patterns, mirror features, and controlled spacing.",
      practice: "Design a mounting plate with four holes, two slots, and a mirrored feature pattern.",
    },
    {
      module: "Part Modeling",
      title: "Shells, Ribs, Drafts, and Manufacturing Features",
      theme: "Add realistic manufacturing features that reduce weight, strengthen parts, and prepare models for molding or fabrication.",
      practice: "Create a lightweight plastic cover with shell, ribs, draft, fillets, and mounting bosses.",
    },
    {
      module: "Assemblies",
      title: "Assembly Mates and Motion Control",
      theme: "Use concentric, coincident, distance, angle, parallel, and limit mates to control how parts fit and move inside an assembly.",
      practice: "Assemble a hinge or clamp mechanism and test its movement with limit mates.",
    },
    {
      module: "Assemblies",
      title: "Fasteners, Subassemblies, and Interference Checks",
      theme: "Organize assemblies with fasteners, subassemblies, exploded structure, and interference checks before drawings are produced.",
      practice: "Build a small bolted assembly and run an interference check with notes.",
    },
    {
      module: "Assemblies",
      title: "Exploded Views and Assembly Presentation",
      theme: "Create exploded views that show how parts fit together and help non-technical viewers understand the product.",
      practice: "Produce an exploded assembly view with labels and a short assembly sequence.",
    },
    {
      module: "Drawings and Documentation",
      title: "Engineering Drawing Views and Dimensions",
      theme: "Create front, top, side, section, detail, and isometric views with correct dimensions and clean drawing standards.",
      practice: "Make a drawing sheet for one modeled part with at least four views and complete dimensions.",
    },
    {
      module: "Drawings and Documentation",
      title: "Tolerances, Notes, and Bill of Materials",
      theme: "Add manufacturing notes, material callouts, tolerances, hole information, and a bill of materials for assemblies.",
      practice: "Create an assembly drawing with BOM, balloons, and at least three manufacturing notes.",
    },
    {
      module: "Drawings and Documentation",
      title: "Sheet Metal Basics and Flat Patterns",
      theme: "Understand sheet metal features such as base flange, edge flange, bends, reliefs, and flat pattern output.",
      practice: "Model a simple folded sheet metal tray and export a flat pattern view.",
    },
    {
      module: "Simulation and Rendering",
      title: "Materials, Mass Properties, and Basic Checks",
      theme: "Apply materials, calculate mass properties, inspect center of mass, and check whether the model matches the engineering requirement.",
      practice: "Assign materials to three parts and compare weight, volume, and center of mass.",
    },
    {
      module: "Simulation and Rendering",
      title: "Basic Stress Thinking and Design Improvement",
      theme: "Learn how loads, fixtures, weak points, thickness, fillets, and material choice affect whether a part is likely to fail.",
      practice: "Review a bracket design and suggest three changes that would make it stronger.",
    },
    {
      module: "Simulation and Rendering",
      title: "SolidWorks Graduation Mechanical Project",
      theme: "Combine sketching, features, assemblies, drawings, BOM, material notes, and presentation renders into one complete engineering project.",
      practice: "Submit a complete mechanical project with part files, assembly, drawing sheet, exploded view, and project summary.",
    },
  ],
});

const vibeDesigningLessons = createModuleLessons(
  "vibe-designing-uiux",
  "vd",
  "Vibe Designing",
  "/images/course-vibe-designing-uiux.png",
  "Modern UI UX workspace with app screens, journey maps, and Figma interface designs",
  [
    {
      title: "UX Foundations",
      theme: "Start by understanding what UI and UX mean, how users move through products, and how designers solve real problems before making screens.",
      lessons: ["Product Design Mindset", "User Problems and Goals", "Personas and Empathy Maps", "User Journeys", "Information Architecture", "Mobile First Thinking", "UX Foundations Checkpoint"],
    },
    {
      title: "Wireframes and Flows",
      theme: "Plan structure before styling so every screen has a clear purpose and every user action has a logical next step.",
      lessons: ["Sketching Fast Ideas", "Low Fidelity Wireframes", "Screen Flow Mapping", "Navigation Patterns", "Forms and Input States", "Feedback and Error States", "Wireframe Review Checkpoint"],
    },
    {
      title: "Visual Interface Design",
      theme: "Use spacing, typography, color, icons, and layout rhythm to make interfaces clean, attractive, and easy to scan.",
      lessons: ["Typography for Interfaces", "Color Systems and Contrast", "Spacing and Layout Grids", "Buttons and Components", "Cards, Lists, and Tables", "Responsive UI Decisions", "Visual Design Checkpoint"],
    },
    {
      title: "Figma Prototyping",
      theme: "Turn static screens into clickable flows that can be tested with users, tutors, and clients before development begins.",
      lessons: ["Figma File Setup", "Reusable Components", "Auto Layout Basics", "Interactive Prototypes", "Microcopy and Empty States", "Usability Testing", "Prototype Checkpoint"],
    },
    {
      title: "Portfolio Case Study",
      theme: "Package the full design process into a professional story that shows the brief, research, decisions, final screens, and lessons learned.",
      lessons: ["Choosing a Capstone Brief", "Before and After Improvements", "Case Study Storytelling", "Exporting Screens and Assets", "Presentation Deck Design", "Portfolio Review", "Graduation Case Study Checkpoint"],
    },
  ],
  {
    expertNotes: "Design notes: base every decision on a real user problem rather than personal taste, keep spacing and type scale consistent across screens, and test your flow with at least one other person before calling it finished. Three well-known UX laws are worth remembering: Fitts's Law (bigger, closer targets are faster to tap), Hick's Law (more choices slow down decisions), and Jakob's Law (people expect your app to behave like the other apps they already use).",
    workflow: "Working process: sketch the flow roughly first, build a low-fidelity wireframe to confirm structure, then move to visual design and finally an interactive Figma prototype once the structure is approved.",
  },
);

const vibeCodingLessons = createModuleLessons(
  "vibe-coding-web-dev",
  "vc",
  "Vibe Coding",
  "/images/course-vibe-coding-web-dev.png",
  "Web development workspace with code editor, responsive website layouts, and deployment dashboard",
  [
    {
      title: "Web Foundations",
      theme: "Build a solid understanding of how websites are structured, styled, loaded, and viewed across devices.",
      lessons: ["How the Web Works", "HTML Document Structure", "Semantic Content", "CSS Selectors", "Box Model and Spacing", "Responsive Units", "Foundations Checkpoint"],
    },
    {
      title: "Modern Layouts",
      theme: "Create professional layouts that adapt across phones, tablets, and desktops without breaking content.",
      lessons: ["Flexbox Patterns", "CSS Grid Systems", "Navigation Bars", "Hero and Section Layouts", "Cards and Lists", "Responsive Debugging", "Layout Checkpoint"],
    },
    {
      title: "JavaScript Essentials",
      theme: "Make pages interactive by reading state, responding to events, and changing the user interface safely.",
      lessons: ["Variables and Types", "Functions and Scope", "DOM Selection", "Events and Forms", "Arrays and Objects", "Local Storage", "JavaScript Checkpoint"],
    },
    {
      title: "React Components",
      theme: "Break interfaces into reusable components with props, state, lists, and predictable interaction patterns.",
      lessons: ["React Mental Model", "Components and Props", "State and Events", "Rendering Lists", "Forms in React", "Component Styling", "React Checkpoint"],
    },
    {
      title: "Next.js App Building",
      theme: "Use routing, layouts, metadata, assets, and server-ready patterns to build production-friendly web apps.",
      lessons: ["App Router Basics", "Pages and Layouts", "Links and Navigation", "Images and Assets", "Loading and Error States", "Metadata and SEO", "Next.js Checkpoint"],
    },
    {
      title: "APIs and Data",
      theme: "Connect interfaces to data sources and understand how requests, responses, validation, and errors work.",
      lessons: ["HTTP and JSON", "Fetching Data", "API Route Basics", "Form Submission", "Validation and Errors", "Saving User Progress", "API Checkpoint"],
    },
    {
      title: "Project Polish",
      theme: "Improve performance, accessibility, visual quality, and reliability before showing a project to a client.",
      lessons: ["Accessibility Basics", "Keyboard and Focus States", "Performance Checks", "Empty and Error UI", "Mobile QA", "Code Cleanup", "Polish Checkpoint"],
    },
    {
      title: "Deployment and Portfolio",
      theme: "Ship a working web project, document it clearly, and present it as proof that you can build real products.",
      lessons: ["Git Workflow", "Environment Variables", "Production Build", "Deployment Setup", "Domain and SEO Basics", "Project README", "Graduation Deployment Checkpoint"],
    },
  ],
  {
    expertNotes: "Coding notes: write small pieces of code you can test immediately, name variables and components clearly, and check your work in the browser after every meaningful change rather than writing large blocks blind. Modern web standards treat load speed and accessibility as requirements, not nice-to-haves - aim to keep pages loading fast and usable with a keyboard alone, since both real users and search engines reward it.",
    workflow: "Working process: get a basic version working end to end first, then improve structure, styling, and edge cases in separate passes rather than trying to make everything perfect on the first attempt.",
  },
);

const aiPromptLessons = createModuleLessons(
  "ai-prompt-engineering",
  "ape",
  "AI Prompt Engineering",
  "/images/course-ai-prompt-engineering.png",
  "AI prompt engineering dashboard with structured prompts, automation cards, and creative outputs",
  [
    {
      title: "Prompt Foundations",
      theme: "Learn how context, task, constraints, examples, and evaluation turn vague prompts into useful AI instructions.",
      lessons: ["How AI Assistants Respond", "Prompt Anatomy", "Context and Role Design", "Constraints and Output Formats", "Few Shot Examples", "Testing Prompt Quality", "Prompt Foundations Checkpoint"],
    },
    {
      title: "Creative and Business Workflows",
      theme: "Use AI to support design, writing, research, planning, and customer-facing workflows without losing human judgment.",
      lessons: ["Content Planning Prompts", "Design Brief Prompts", "Image Prompting Basics", "Research Summaries", "Customer Response Drafts", "Workflow Templates", "Workflow Checkpoint"],
    },
    {
      title: "Responsible AI Systems",
      theme: "Create practical AI systems that are reviewed, documented, safe, and ready for real school or business use.",
      lessons: ["Fact Checking Outputs", "Bias and Safety Review", "Prompt Libraries", "Automation Planning", "Human Approval Steps", "AI Portfolio Project", "Graduation AI System Checkpoint"],
    },
  ],
  {
    expertNotes: "Prompting notes: state the task, the audience, and the format you want before adding examples, and always review AI output for accuracy rather than accepting it automatically. Two techniques used by professional prompt engineers are few-shot prompting (showing the AI two or three examples of the output style you want) and chain-of-thought prompting (asking the AI to reason step by step before giving a final answer) - both noticeably improve response quality.",
    workflow: "Working process: draft a prompt, test it, note what went wrong, and revise it. Treat prompt writing as an iterative skill you improve through testing, not a one-shot request.",
  },
);

const vibeDesigningContent: Record<string, string> = {
  "vd-1-1": `Overview: **Product design is the discipline of shaping a digital product around real human needs rather than around whatever looks good on a moodboard.** UI (user interface) is what a person sees and touches — buttons, screens, colors, type. UX (user experience) is everything they feel while trying to accomplish a goal — whether the app is fast, clear, trustworthy, and worth coming back to. The most important idea in this lesson is that a designer's first job is not decoration, it is problem-solving: every screen you will ever draw exists to help a specific person do a specific thing.

UI vs UX, precisely: **UI is the visual and interactive layer — layout, color, iconography, motion, and the components a user directly manipulates.** UX is the full journey around that layer — onboarding friction, load times, error recovery, and whether the product's mental model matches what the user already expects. A beautiful UI on top of a confusing UX still fails; a plain UI that removes friction at every step often wins. Treat UI as the outfit and UX as the whole relationship.

The designer's mindset: **Product designers work from constraints inward, not from inspiration outward.** Before opening Figma, a working designer asks who the user is, what job they are hiring the product to do, what business goal the screen must serve, and what technical constraints (platform, data, existing components) shape the answer. This is called "framing" the problem, and skipping it is the single biggest reason redesigns miss the mark.

Jakob's Law and existing mental models: Jakob's Law states that users spend most of their time on other people's products, so they arrive at yours with expectations already formed — a cart icon means shopping, a hamburger icon means a hidden menu, pull-down means refresh. Good product designers borrow familiar patterns deliberately and save true innovation for the parts of the product that actually differentiate it, rather than reinventing basic navigation for its own sake.

How this course builds the skill: Across five modules you will move from research and structure (Modules 1-2) into visual craft (Module 3) into interactive prototyping in Figma (Module 4) and finally into telling the story of your work as a portfolio case study (Module 5). Each lesson builds on the last, so the mindset habit you build here — always ask "whose problem am I solving and how will I know it's solved" — should follow you into every wireframe, every color choice, and every button you place for the rest of the course.`,
  "vd-1-2": `Overview: **No design decision means anything until you know precisely what problem you are solving and for whom.** This lesson is about separating a user's stated want from their actual underlying goal, and learning to write problems down in a form that can actually be tested against a design. The most important idea here is that a vague problem produces a vague design — precision at this stage saves weeks of rework later.

Problems vs symptoms: Users usually describe symptoms, not root problems — "the app is slow" might really mean "I can't tell if my payment went through." Good researchers use the "5 Whys" technique, repeatedly asking why a stated frustration exists until they reach a cause a design can actually address. Confusing a symptom for the real problem leads to redesigns that look different but solve nothing.

User goals vs business goals: Every product sits at the intersection of what the user wants (get a task done quickly, feel confident, avoid embarrassment) and what the business needs (revenue, retention, lower support costs). A strong designer states both explicitly for every feature, for example: "User goal: pay a bill in under 60 seconds. Business goal: reduce failed-payment support tickets by 20%." When the two goals conflict, that tension is exactly what design decisions need to resolve.

Writing a problem statement: **A usable problem statement follows a simple structure: [user] needs a way to [need] because [insight], but [current obstacle].** This format, borrowed from design-thinking practice, forces you to name a real person, a real need, and a real barrier instead of jumping straight to a solution like "we need a new app." Keep it to one or two sentences — if it needs a paragraph, the problem hasn't been narrowed enough yet.

Validating the problem before designing: Before sketching anything, check the problem against real signals — support tickets, app store reviews, analytics drop-off points, or five minutes of conversation with an actual user. Even informal validation (asking three people the same question) catches wrong assumptions cheaply, while designing first and validating later means the mistake is now baked into components, copy, and flows that are expensive to unwind.`,
  "vd-1-3": `Overview: **Personas and empathy maps exist to stop designers from designing for themselves.** It is dangerously easy to assume every user thinks the way you do; personas force a team to agree on who they're actually building for, and empathy maps force them to think in that person's context, not just their demographics. The most important idea in this lesson is that these tools are only useful when built from real observation, not guesswork.

What a persona actually is: A persona is a composite, research-grounded profile representing a cluster of real users with shared goals and behaviors — not a fictional biography with a stock photo and a made-up favorite coffee order. A working persona includes a goal, key frustrations (pain points), relevant behavior (device used, tech comfort, context of use), and a representative quote. Skip invented details like hobbies or family status unless they genuinely affect product decisions — extra flavor text that doesn't inform a decision is just decoration.

Building personas from evidence: **Strong personas come from interviews, support data, surveys, or analytics segments — never from a single designer's imagination.** If you can't point to where a trait came from, question whether it belongs. For a student project without access to real interviews, secondary research (forum threads, reviews of similar apps, published market data) is an acceptable substitute, as long as you cite it rather than presenting it as verified fact.

Empathy maps: **An empathy map is a four-quadrant tool — Says, Thinks, Does, Feels — used to capture a user's context around a specific task rather than their whole life story.** "Says" and "Does" come from observable, quotable evidence; "Thinks" and "Feels" are informed inferences you make explicit so the team can challenge them. Empathy maps work best filled out immediately after a user interview or usability session, while details are fresh.

Using personas without stereotyping: The risk with personas is turning a research tool into a cardboard stereotype that excuses lazy thinking ("our persona wouldn't like that" used to shut down debate instead of open it). Treat a persona as a living hypothesis: revisit and revise it as you learn more, and always be ready to say which specific research finding backs each trait on the page.`,
  "vd-1-4": `Overview: A user journey maps what a real person experiences over time as they try to accomplish a goal with your product — including the parts outside the screen, like discovering the app exists or getting frustrated enough to quit. The most important idea in this lesson is that journeys reveal problems screens alone can't show: drop-off points, emotional dips, and moments where the product fights the user instead of helping them.

Anatomy of a journey map: A typical journey map has stages (Awareness, Consideration, Onboarding, Usage, Support, Renewal, for example), and for each stage it tracks the user's actions, their touchpoints (app screen, email, customer support, push notification), their thoughts, and their emotional state — often drawn as a rising and falling line. The emotional curve is the most diagnostic part: sharp dips point exactly to where redesign effort should go first.

Stages vs screens: **A common beginner mistake is mapping journeys screen-by-screen instead of stage-by-stage.** A journey stage like "first payment" might span five screens, a push notification, and a wait for bank confirmation — map the stage as the user experiences it, then zoom into screens afterward during wireframing. Journey mapping happens before screen design specifically so structural problems get caught before visual work begins.

Finding friction and moments of truth: **Every journey has "moments of truth" — points where the user decides whether to trust the product (a slow first load, a confusing permission request, a surprise fee).** Mark these explicitly on the map. These are the highest-leverage places to invest design and engineering effort, because a bad moment of truth early in a journey can undo good design everywhere else.

From journey to backlog: **A completed journey map should produce a prioritized list of problems, not just a pretty diagram.** For each friction point, note its severity (does it cause drop-off or just mild annoyance?) and a rough fix direction. This list becomes the input to the wireframing work in Module 2 — you are not sketching screens yet, you are deciding which parts of the journey deserve a screen redesign first.`,
  "vd-1-5": `Overview: **Information architecture (IA) is the practice of organizing and labeling content so people can find what they need without thinking hard about it.** It is invisible when done well and infuriating when done badly — think of a menu with three different places a user might reasonably look for "Settings." The most important idea in this lesson is that IA decisions made now determine how confusing or effortless every future screen will feel, so they deserve real research, not guesswork.

Card sorting: Card sorting is the core IA research method — you write content items or features on individual cards (physical or digital, using tools like Optimal Workshop or Figma's own sorting templates) and ask real users to group them in ways that make sense to them. An open card sort lets users create and name their own categories, revealing their mental model from scratch; a closed card sort asks users to place items into categories you've already defined, which is useful for testing an existing structure. Run this with 5-15 participants for patterns to emerge reliably.

Site maps and hierarchy: A site map is the resulting tree diagram showing how screens or sections relate — what's a top-level destination, what's nested underneath, and how deep a user has to click to reach something. Keep hierarchies shallow: research on navigation consistently shows users get lost faster in deep, narrow trees than in shallow, broad ones, so prefer more items at one level over many click-throughs to reach content.

Labeling and language: Labels must match the user's own vocabulary, not internal company jargon — if users call it "My Orders" in an interview, don't rename it "Purchase History" in the UI to sound more formal. Test ambiguous labels with a tree test (asking users to find something using only the label hierarchy, no visuals) before committing to it in a wireframe.

How IA feeds the next lessons: A validated site map becomes the skeleton for screen flow mapping and navigation pattern choices in Module 2 — you cannot design a tab bar or menu sensibly until you know what actually needs to live in it. Treat IA as the plumbing behind the walls: unglamorous, but the reason nothing leaks later.`,
  "vd-1-6": `Overview: **Mobile-first thinking means designing for the smallest, most constrained screen and context first, then expanding upward to tablet and desktop — not the reverse.** In markets like Kenya, where most users access the internet primarily or exclusively through a smartphone, this isn't a stylistic preference, it's a reflection of how the product will actually be used. The most important idea in this lesson is that constraints make you prioritize, and prioritizing on mobile makes every larger screen easier to design well.

Why mobile-first, not mobile-only: Starting with the smallest viewport (roughly 360-430px wide for most Android and iPhone devices) forces hard decisions about what truly matters on a screen, because there is no room for everything. Once the mobile layout is solid, progressive enhancement adds content and secondary actions as screen space grows — this is far easier than starting with a spacious desktop design and then trying to cram it down into a phone, which usually just hides things behind more taps.

Touch targets and thumb zones: Apple's Human Interface Guidelines and Google's Material Design both recommend a minimum touch target of roughly 44-48 points/dp, translating to about 44x44pt on iOS or 48x48dp on Android, so buttons and tap areas need real breathing room, not just visually-sized icons. Fitts's Law explains why this matters: the time to accurately hit a target depends on its size and distance from the current touch point, so small, far-apart buttons cause real, measurable mis-taps, especially for one-handed use where the thumb naturally reaches the bottom half of the screen more easily than the top.

Connectivity and data constraints: Designing for markets with variable mobile data speeds and costs means treating performance as a UX feature: compress images, avoid auto-playing heavy media, design meaningful loading and offline states, and never let a slow network look like a broken app. A skeleton loading state or a clear "no connection" message communicates system status far better than a screen that silently hangs.

Responsive vs adaptive: **Responsive design uses flexible grids and breakpoints so one layout reflows across sizes; adaptive design serves distinct fixed layouts per device category.** Most modern product teams default to responsive with a mobile-first breakpoint strategy (base styles for small screens, then min-width media queries adding complexity upward), which is also how Module 3's spacing and grid lessons will assume your layouts behave.`,
  "vd-1-7": `Overview: This checkpoint lesson pulls together every skill from Module 1 — problem framing, personas and empathy maps, journey mapping, information architecture, and mobile-first thinking — into a single research deliverable you can defend and later show in a portfolio. The most important idea here is that a checkpoint is not busywork; it is the first real test of whether your research actually holds together as evidence for the design decisions you're about to make in Module 2.

What a strong checkpoint submission includes: A complete submission names a specific product and a specific, validated problem statement (from Lesson 1-2), a persona and empathy map grounded in cited evidence (Lesson 1-3), a journey map showing at least one clear emotional dip and moment of truth (Lesson 1-4), a site map or IA sketch showing your content hierarchy (Lesson 1-5), and a short note on how mobile constraints shape your priorities (Lesson 1-6). Missing any one of these leaves a gap a reviewer will immediately notice.

The consistency check: The single biggest weakness in student checkpoints is internal contradiction — a persona described as impatient and mobile-only, but a journey map that assumes long desktop sessions; or a problem statement about speed, but an IA with six nested menu levels. Before submitting, read your own documents back to back and ask whether every artifact tells the same story about the same user.

How reviewers evaluate this stage: **A tutor or peer reviewer at this checkpoint is not grading visual polish — there are no screens yet — they are grading reasoning.** Can you explain why this persona, why this journey stage matters most, why this IA structure over an alternative? Being able to say "I chose X over Y because of Z evidence" is worth more than a beautifully formatted document with no justification behind it.

Setting up Module 2 for success: **Everything in Module 2 (sketching, wireframes, flows, navigation, forms, error states) will directly reference this research.** Treat this checkpoint as the brief you're handing to your future self — the clearer and more specific it is now, the less you'll have to guess or backtrack once you start drawing actual screens.`,
  "vd-2-1": `Overview: **Sketching is the fastest, cheapest way to generate and discard ideas before any pixel is placed in Figma.** The point of this lesson is not artistic skill — it's speed and volume, because the first idea is rarely the best one, and sketching lets you find that out in minutes instead of hours. The most important idea in this lesson is that low commitment breeds better ideas: a pencil sketch is easy to throw away, a polished mockup is not.

Crazy 8s and rapid ideation: A widely used sketching exercise, popularized by Google Ventures' design sprint process, is "Crazy 8s": fold a sheet of paper into eight sections and sketch eight distinct variations of one screen or flow in eight minutes, roughly one minute per sketch. The time pressure is deliberate — it prevents overthinking any single idea and forces genuinely different directions instead of eight small variations of the same concept.

What to sketch and what to skip: **Sketch structure and flow, not visual polish — boxes for content blocks, arrows for navigation, rough labels for buttons.** Skip color, exact spacing, and typography entirely at this stage; including them signals false precision and tempts you to fall in love with details before the underlying structure is validated. If you catch yourself picking a font in a sketch, you've moved past sketching into premature visual design.

Sketching for flows, not just single screens: **Beyond individual screens, sketch the connections between them — draw a rough screen, an arrow, the next rough screen, labeling what action triggers the transition.** This catches structural problems (a dead end, a missing back path, a step that needs information you haven't collected yet) far earlier and cheaper than catching them in a Figma prototype.

From sketch to selection: After a sketching session, don't pick a winner by personal taste alone — hold a quick "dot voting" round with teammates or your tutor, where each person marks the elements they find strongest across all sketches, even if it means combining pieces from different ones. The output of this lesson should be one or two chosen directions, annotated with why they were chosen, feeding directly into the low-fidelity wireframes in the next lesson.`,
  "vd-2-2": `Overview: Low-fidelity wireframes turn a chosen sketch direction into a cleaner, more precise structural layout — still without color, real copy, or final typography — so structure can be evaluated and agreed on before visual design begins. The most important idea in this lesson is that low fidelity is a deliberate choice, not a lack of skill: keeping wireframes rough on purpose keeps feedback focused on layout and hierarchy instead of color opinions.

What belongs in a low-fi wireframe: Grayscale boxes, placeholder text (often labeled "Heading," "Body copy," or Lorem ipsum), simple line icons or labeled rectangles for icons, and basic proportions for buttons, cards, and images. The goal is to communicate what exists on a screen and roughly how important each element is relative to the others, established through size and position, not through color or decoration.

Why fidelity level controls the feedback you get: Showing a stakeholder a polished, colorful mockup too early tends to generate comments about color and font choices, because that's what's easiest for a non-designer to react to — even if the underlying structure is broken. Showing a rough wireframe instead keeps the conversation on the right questions: does this layout make sense, is anything missing, is the priority order right. This is sometimes called the "fidelity trap," and deliberately staying low-fi protects a review session from it.

Tools for low-fi work: **Figma's own shape and frame tools are enough for digital low-fi wireframes — rectangles, a default gray fill, and its built-in font at one or two weights.** Many teams also use dedicated wireframing kits or plugins, but the core discipline matters more than the tool: constrain yourself to grayscale and generic type even inside a full-featured tool like Figma.

Annotating wireframes: Add short annotations next to non-obvious elements explaining behavior — "this card is horizontally scrollable," "this button is disabled until the form is valid." Annotations let a wireframe communicate interaction intent that a static image alone cannot, which matters most once you move into screen flow mapping in the next lesson, where these individual screens get connected into a full flow.`,
  "vd-2-3": `Overview: Screen flow mapping connects individual wireframes into a navigable diagram showing every path a user can take through a product — the digital equivalent of a floor plan with doors and hallways. The most important idea in this lesson is that a flow diagram exposes structural problems (dead ends, missing back paths, screens with no way in) that are invisible when you only look at screens one at a time.

Building the flow diagram: Lay out each wireframe as a node and connect them with labeled arrows showing the action that causes the transition — "tap Continue," "swipe left," "payment succeeds," "payment fails." Branch points (like a payment succeeding or failing) should show both outcomes as separate arrows, because designing only the happy path and forgetting the failure path is one of the most common and costly mistakes at this stage.

Happy path vs edge cases: **The happy path is the ideal sequence where everything goes right — form filled correctly, network available, payment approved.** Map that first for clarity, then deliberately map at least the most important edge cases: what happens on a validation error, a timeout, an empty state, or a permission denial. Each edge case you map now is one fewer surprise gap when the flow reaches development.

Entry points and exits: A flow needs more than one entry point mapped realistically — users can land on a product screen from a push notification, a shared link, a search result, or the home screen, not only from a fresh app launch. Similarly map exits: where can a user back out, cancel, or abandon a flow, and does the product handle that gracefully (saved draft, confirmation dialog) or just lose their progress?

Tools and conventions: **Figma (using its own frames connected with arrows, or FigJam for a looser diagram), Miro, and Whimsical are common tools for flow mapping.** Use consistent shapes — rectangles for screens, diamonds for decision points, arrows labeled with the triggering action — so anyone reading the diagram, including a developer later, can follow it without you narrating it out loud.`,
  "vd-2-4": `Overview: **Navigation is the system that lets users move between the destinations mapped in your information architecture and screen flows.** Choosing the right navigation pattern is a structural decision, not a visual one — the wrong pattern makes even well-organized content feel lost. The most important idea in this lesson is that navigation choice should follow the shape of your content and the platform's own conventions, not personal preference.

Common mobile patterns: A bottom tab bar (2-5 top-level destinations, always visible, following Jakob's Law expectations from apps like Instagram or M-Pesa) works best for a small number of frequently-used top-level sections. A hamburger menu hides more destinations behind one icon, trading discoverability for screen space — appropriate for secondary or infrequently used items, but risky for anything a user needs often, since hidden items get used less simply because they're hidden. A hybrid pattern (visible tab bar plus a "More" tab that opens a fuller list) is common when there are more sections than a tab bar can comfortably hold.

Hierarchical vs flat navigation: Hierarchical navigation nests content in parent-child relationships (category > subcategory > item), matching a deep site map; flat navigation puts more destinations at one level, trading depth for fewer taps. Given what Lesson 1-5 covered about users getting lost faster in deep trees, default toward flatter structures unless the content genuinely has strong natural hierarchy, like an e-commerce catalog.

Platform conventions matter: iOS and Android have different default patterns and back-navigation behavior (iOS commonly favors a bottom tab bar with a top navigation bar showing a back chevron; Android's system back gesture/button changes what an in-app back button even needs to do). Departing too far from platform convention forces users to relearn basic navigation, which fights Jakob's Law directly.

Signaling current location: Whatever pattern you choose, always give users a clear "you are here" signal — a highlighted tab icon, a breadcrumb, a page title — since Nielsen's heuristic of visibility of system status applies directly to navigation. A user who can't tell where they are in an app loses trust quickly, even if every individual screen is well designed.`,
  "vd-2-5": `Overview: Forms are where products most often lose users, because every additional field or unclear instruction adds friction at the exact moment a user is trying to commit to an action. This lesson is about designing forms and their many states so they guide rather than obstruct. The most important idea in this lesson is that a form's default (empty), focused, filled, error, and disabled states all need to be designed on purpose, not left to whatever the browser or framework does by default.

Field reduction and grouping: The single highest-leverage form improvement is usually removing fields, not styling them better — ask whether each field is truly required now, or could be collected later or inferred. Group related fields logically (name fields together, address fields together) and order them in the sequence a person would naturally think of them, since Hick's Law shows that more choices and more fields presented at once increase decision time and abandonment.

Labels, placeholders, and input types: Use persistent labels above fields rather than relying on placeholder text alone — placeholder text disappears once a user starts typing, which removes context exactly when they might need to double-check what a field wants, especially on longer forms. Match input types to the data (a numeric keypad for a phone number field, a date picker for dates) so mobile users aren't fighting the wrong keyboard.

Validation timing: Validate on blur (when a user leaves a field) or on submit, not on every keystroke, since flagging an email as "invalid" while someone is still mid-typing it feels punishing rather than helpful. Inline, field-level error messages that explain exactly what's wrong and how to fix it ("Enter a valid phone number, e.g. 07XX XXX XXX") perform far better than a generic banner at the top of the form saying "there were errors."

Disabled and loading states: A disabled submit button should visually read as disabled (lower contrast, no hover affordance) so users don't wonder if it's broken, and it should become active the moment requirements are met — not require an extra unrelated action. During submission, show a loading state on the button itself (spinner, "Submitting..." label) so the system status stays visible, directly supporting Nielsen's heuristic that systems should always keep users informed of what's happening.`,
  "vd-2-6": `Overview: **Feedback and error states are how a product communicates its own status back to the user — success, failure, loading, or emptiness.** Designing these deliberately, rather than leaving them as an afterthought for developers to improvise, is directly tied to Nielsen's heuristic of visibility of system status: users should always know what's happening, what just happened, and what to do next. The most important idea in this lesson is that silence is the worst state a product can be in — an unlabeled blank screen or a frozen button reads as broken even when it technically isn't.

The four core states: **Every data-dependent screen needs at minimum a loading state, an empty state, a success state, and an error state designed on purpose.** Loading states (skeleton screens, spinners, progress bars) reassure users something is happening during a wait; empty states (a first-use screen with no data yet) should explain what belongs there and how to add it, not just show blank space; success states confirm an action worked, often briefly, before moving on; error states explain what went wrong in plain language and, wherever possible, a concrete next step.

Writing good error messages: **A good error message names the problem specifically and avoids blame or jargon — "We couldn't reach the server.** Check your connection and try again" beats "Error 500" or "Something went wrong." Where the cause is on the user's side (like an invalid field), point directly at it; where the cause is on the system's side, don't imply the user did something wrong.

Empty states as an opportunity: A well-designed empty state does more than say "nothing here" — it can explain the feature's value and offer a clear first action, functioning as a small piece of onboarding at exactly the moment a user needs direction. A to-do app's empty task list, for instance, is a natural place for a prominent "Add your first task" prompt rather than a bare, unexplained blank list.

Toasts, banners, and inline feedback: Match the feedback mechanism to the severity and scope of the event — a small, temporary toast for a low-stakes confirmation ("Saved"), a persistent banner for something the user must act on (an expired session), and inline, field-level feedback for form-specific issues. Overusing intrusive modals for minor feedback trains users to dismiss dialogs without reading them, weakening feedback for the moments that truly need attention.`,
  "vd-2-7": `Overview: This checkpoint tests whether your Module 2 work — sketches, low-fi wireframes, screen flows, navigation choices, forms, and feedback states — forms one coherent, navigable structure grounded in the Module 1 research. The most important idea here is that a wireframe set is only successful if a stranger could follow it end to end without you explaining anything out loud.

What a strong submission includes: A complete flow diagram covering at least one full happy-path journey plus its major edge cases, low-fidelity wireframes for every screen in that flow, an explicit navigation pattern choice with a one-line justification tied to your content and platform, at least one form screen with its states (empty, error, disabled, success) designed, and at least one non-form screen with loading/empty/error states designed.

The walkthrough test: Before submitting, do a cold walkthrough — hand the wireframes (or a link) to someone who hasn't seen the project and ask them to narrate what they'd tap and why, without your help. Every place they hesitate, ask "what happens if...," or guess wrong is a real structural gap, not a taste disagreement, and it should be fixed before adding any visual polish in Module 3.

Tracing back to research: A strong checkpoint explicitly ties structural decisions back to Module 1 evidence — "bottom tab navigation was chosen because the persona is a frequent, task-focused mobile user," not just "it looked cleaner." Reviewers at this stage are checking whether your structure actually serves the problem you defined, not whether it resembles an app you admire.

What NOT to fix yet: Resist the urge to add color, real typography, or brand personality at this stage even if you're tempted — that's Module 3's job, and doing it now reintroduces the "fidelity trap" from Lesson 2-2, where surface polish distracts reviewers from remaining structural gaps. A wireframe checkpoint that's still gray and rough, but flawless, is a stronger submission than one that looks pretty but hides broken flows underneath.`,
  "vd-3-1": `Overview: **Typography carries most of the information in any interface, so it deserves the same systematic thinking as layout or color, not last-minute font-picking.** The most important idea in this lesson is that a type system — a small, deliberate set of sizes, weights, and line heights — reads as more professional and is far easier to maintain than a page where every heading was sized by eye.

Type scale and hierarchy: A type scale is a limited set of font sizes (commonly following a ratio like 1.125 or 1.25 between steps, e.g. 14/16/18/20/24/32/40px) used consistently across an interface so headings, body text, and captions stay visually distinct and predictable. Hierarchy is communicated through size, weight, and color together — a heading doesn't need to be huge if its weight and spacing already separate it clearly from body text, and over-relying on size alone often produces headlines that dominate a screen more than the content warrants.

Line height, line length, and readability: Body text generally reads best with a line height (leading) of around 1.4-1.6x the font size and a line length of roughly 45-75 characters per line — lines that are too long make it hard for the eye to track back to the start of the next line, and lines that are too short break reading rhythm. On mobile, where columns are narrow by default, line length is rarely the problem, but line height and paragraph spacing still need deliberate values rather than defaults.

Font pairing and choosing typefaces: Most interfaces work well with one or two typefaces total — a single versatile family (like Inter, Roboto, or SF Pro) used across weights is often enough, and if pairing two, contrast them clearly (a geometric sans for headings, a humanist sans or serif for body) rather than choosing two similar fonts that look like a mismatch rather than an intentional choice. Prioritize typefaces with strong legibility at small sizes and full character support if your product needs it, since local language or currency symbols can expose gaps in a font's character set.

Accessibility in type choices: Keep body text at a minimum of 16px equivalent on mobile web to avoid iOS auto-zoom-on-focus behavior and general legibility issues, avoid setting large blocks of text in all-caps or fully justified (which creates uneven word spacing), and make sure font weight differences are strong enough to read clearly at small sizes, not just barely distinguishable at 100% zoom.`,
  "vd-3-2": `Overview: Color in interface design is a functional system, not just a brand decision — it signals state, hierarchy, and meaning, and it must remain usable for people with low vision or color blindness. The most important idea in this lesson is that a defensible color system is built from a small palette with clear roles, tested against real contrast ratios, not chosen purely by eye.

Building a color system: A working UI palette typically includes a primary brand color, one or two secondary/accent colors, a neutral gray scale (5-9 steps, from near-white to near-black, used for text, borders, and backgrounds), and semantic colors for success, warning, and error states. Each color should exist in a small set of tints and shades (often expressed as numbered steps like 100-900) so the same blue used for a button can also appear as a lighter background or a darker pressed state without introducing a new, uncoordinated color.

Contrast and WCAG standards: WCAG 2.2 sets minimum contrast ratios of 4.5:1 for normal text against its background and 3:1 for large text (roughly 24px regular or 18.66px bold and up) at the AA level, with 7:1 and 4.5:1 respectively for the stricter AAA level; non-text UI elements like icons and input borders need at least 3:1 against adjacent colors. Check every text/background and icon/background pairing against these ratios using a contrast checker before finalizing a palette — a color that looks readable to a designer on a bright monitor can still fail these numeric thresholds.

Don't rely on color alone: Never use color as the only signal for meaning — a red border on an invalid field should be paired with an icon and text message, because color-blind users (affecting a meaningful percentage of men in particular, most commonly red-green color blindness) may not perceive the difference at all. This is also a core WCAG success criterion (Use of Color), not just a nice-to-have.

Light and dark modes: If a product supports dark mode, colors need re-mapping, not simple inversion — pure white text on pure black background actually reduces readability for many users due to halation, so dark-mode UI typically uses off-white text on a dark gray (not pure black) surface, and saturated colors often need desaturating slightly since they can appear to vibrate against dark backgrounds.`,
  "vd-3-3": `Overview: Spacing and layout grids give an interface its sense of order and calm — most of what reads as "clean design" is actually just consistent, deliberate spacing rather than any single visual flourish. The most important idea in this lesson is that spacing should follow a system (a base unit and its multiples), not arbitrary pixel values chosen per screen.

The spacing scale: Most modern design systems build spacing from a base unit, commonly 4px or 8px, with all padding, margins, and gaps chosen as multiples of it (4, 8, 12, 16, 24, 32, 48, 64px). This constraint makes layouts feel intentional and makes it trivial to keep components aligned to the same rhythm across an entire product, and it maps cleanly onto Figma's own spacing and Auto Layout gap values.

Grids and columns: A layout grid divides a screen into consistent columns with defined gutters (space between columns) and margins (space at the edges) — a common mobile grid uses 4 columns with 16-20px margins, while desktop layouts often use 12 columns with wider margins, giving both a consistent structure to align content against. Figma's Layout Grid feature (in the right-hand Design panel) lets you overlay these grids directly on a frame while designing, so alignment can be checked visually as you work rather than guessed.

White space as a design tool: Generous white space (negative space) isn't wasted space — it groups related elements, separates unrelated ones, and gives important elements room to stand out, directly applying the Gestalt principle of proximity (elements placed close together are perceived as related). Cramming more content into a screen to "use the space" usually reduces scannability rather than adding value, especially on mobile where visual clutter compounds quickly.

Auto Layout and consistent spacing in Figma: Figma's Auto Layout feature lets you set fixed spacing values (gap, padding) on a frame that automatically apply as content is added, removed, or resized, which is the practical mechanism for actually enforcing a spacing scale rather than just intending to follow one. Setting up components with Auto Layout early avoids the common problem of spacing quietly drifting inconsistent across dozens of screens as a project grows.`,
  "vd-3-4": `Overview: Buttons and other reusable components are the vocabulary of an interface — get their states and variations right once, and every screen that uses them inherits that quality automatically. The most important idea in this lesson is that a component isn't finished when it looks good in one state; it's finished when every state (default, hover, pressed, focused, disabled, loading) has been considered.

Button hierarchy: Interfaces typically need at least three button levels — primary (the single main action on a screen, strongest visual weight), secondary (an alternative action, lower visual weight, often an outline or ghost style), and tertiary/text buttons (low-emphasis actions like "Cancel"). Using more than one primary-style button on a screen undermines the whole point of hierarchy, because it forces the user to make a decision the design should be helping them avoid — this connects directly to Hick's Law, where more equally-weighted choices slow decision-making.

Component states in Figma: **Figma's Variants feature groups related versions of a component (e.g.** Button/Primary/Default, Button/Primary/Hover, Button/Primary/Disabled) into a single component set, letting designers swap between states from one dropdown in the right panel instead of managing dozens of disconnected duplicate layers. Combined with Interactive Components (prototyping variant swaps triggered by hover, press, or click directly in prototype mode), this lets a button convincingly demonstrate its hover and pressed states inside a clickable prototype.

Building with Auto Layout for resilience: **Buttons and cards built with Auto Layout resize gracefully when their label text changes length (a button that says "Continue" vs.** "Continue to payment" should stretch, not overflow or clip), which matters enormously once real copy replaces placeholder text later in the project. A component that only looks right with the exact original sample text is fragile and will break in production.

Disabled and loading states specifically: A disabled button should be visually distinct (typically reduced opacity or a muted fill) and never rely on color alone per accessibility guidance, and cursor/interaction should communicate it's inactive. A loading state (spinner replacing or accompanying the label) should preserve the button's original size so the layout doesn't jump when the state changes — a small detail that meaningfully affects perceived polish.`,
  "vd-3-5": `Overview: Cards, lists, and tables are the three most common ways interfaces display collections of content, and choosing the right one — and designing it to handle real, messy data — is a distinct skill from designing a single hero screen. The most important idea in this lesson is that these components must be designed for their worst-case content (long titles, missing images, huge numbers), not just the clean sample data used in a mockup.

When to use cards vs lists vs tables: Cards work well for visually distinct, browsable items where an image or thumbnail matters (products, articles, profiles) and users are scanning rather than comparing precisely. Lists suit denser, more linear content where users scan top to bottom quickly (notifications, chat threads, simple settings). Tables suit structured, comparable data with multiple attributes per row (transaction history, admin data, anything users might sort or filter by a specific column) — using a card grid for data that's really tabular usually makes comparison harder, not easier.

Designing for real content: Always test a component with a long title that wraps to two lines, a short title, a missing thumbnail (does a placeholder or initials avatar appear?), and an unusually large number (KSh 1,250,000 vs KSh 50) to see whether the layout holds up. This is where Auto Layout's resizing behavior (Lesson 3-3, 3-4) becomes essential — a card built to only fit exactly the sample text will visibly break the moment real content is loaded.

List and table density: Density (how much vertical padding surrounds each row) is a deliberate trade-off — dense rows show more content per screen but are harder to scan and tap accurately on mobile (reconnecting to Fitts's Law and touch target sizing from Lesson 1-6); looser rows are easier to scan and tap but show less at once. Match density to the platform and task: a mobile app usually needs looser rows than a desktop admin table used by a power user.

Empty, loading, and overflow states for collections: Every card grid, list, or table needs its own empty state (Lesson 2-6) distinct from a single record's empty state, a loading skeleton that mimics the eventual layout's shape, and a defined behavior for overflow — pagination, infinite scroll, or a "show more" action — chosen deliberately based on how users are likely to browse that specific type of content.`,
  "vd-3-6": `Overview: Responsive UI decisions are about how a single design adapts as available screen width changes, from a narrow phone up through tablets to wide desktop monitors, without the underlying structure or content falling apart. The most important idea in this lesson is that responsiveness is a layout strategy decided during design, not something left entirely to whoever writes the code afterward.

Breakpoints: A breakpoint is a defined screen width where the layout intentionally changes — common reference points are roughly 360-430px (mobile), 768px (tablet), and 1024-1440px+ (desktop), though exact values should be driven by where your specific content actually breaks, not copied blindly from a generic list. At each breakpoint, decide explicitly what changes: column count, navigation pattern (bottom tab bar becoming a top nav or sidebar), image sizing, and how much secondary content becomes visible versus hidden behind a tap.

Fluid vs fixed elements: Some elements should scale fluidly with available width (body text columns, image containers, card grids reflowing more columns as space allows), while others should stay fixed regardless of screen size (touch target minimums, base font size, maximum reading line length for long-form text). Mixing these correctly, rather than either fully fixed or fully fluid, is what makes a responsive layout feel considered instead of just stretched.

Figma's tools for responsive design: Auto Layout combined with constraints (pinning elements to left/right/center/scale within a frame, set in the right-hand Design panel) lets a single Figma frame preview reasonably how a layout behaves at different sizes, and creating separate frames per breakpoint (mobile, tablet, desktop) as needed lets you show intentional structural changes rather than just a stretched version of one layout. Figma's Variables feature can also drive responsive sizing tokens (spacing, radius) consistently across these frames.

Content priority across breakpoints: The content and actions that matter most on mobile (Lesson 1-6) should stay the most prominent even as more space becomes available on desktop — resist the temptation to fill extra desktop space with lower-priority content just because there's room, since that can bury the primary task under decorative padding or secondary widgets that dilute focus rather than adding value.`,
  "vd-3-7": `Overview: This checkpoint tests whether your visual design work — typography, color, spacing, components, collections, and responsive behavior — comes together as a coherent, accessible design system applied consistently across your Module 2 flow, not just a single pretty screen. The most important idea here is that visual design quality is judged by consistency and legibility across many screens, not by how good any one hero screen looks in isolation.

What a strong submission includes: A short style reference (type scale, color palette with roles, spacing scale) applied consistently across every screen in your flow, a component set (buttons, cards, form fields) built with Variants and Auto Layout showing their key states, at least one collection (card grid, list, or table) tested with realistic content lengths, and at least two breakpoints (mobile and one larger size) showing a deliberate, not just stretched, layout change.

The accessibility check: Run your actual color pairings through a contrast checker and confirm your key text/background combinations meet at least WCAG AA (4.5:1 normal text, 3:1 large text and UI components) — this is not optional polish, it's a baseline your design should meet before being called finished. Also confirm no meaning depends on color alone (error states, required fields, status indicators).

Consistency over cleverness: Reviewers at this stage are looking for whether the same button looks and behaves the same way on every screen, whether spacing values repeat from a defined scale rather than drifting, and whether type hierarchy is legible and consistent — not for a single visually daring screen that doesn't match the rest of the flow. A system that is 90% consistent and slightly plain will usually score better than one wildly creative screen next to four inconsistent ones.

Preparing for Module 4: Because Module 4 turns these screens into a clickable Figma prototype, components built loosely now (not using real Variants, not using Auto Layout, inconsistent naming) will cause real friction later when trying to wire up interactive states. Treat this checkpoint as an opportunity to clean up component structure, not just visual appearance, before prototyping begins.`,
  "vd-4-1": `Overview: A well-organized Figma file is the foundation everything else in this module depends on — messy files with unnamed layers and scattered frames make prototyping, handoff, and collaboration painfully slow. The most important idea in this lesson is that file structure is a design skill in its own right, not just tidiness for its own sake.

Pages, sections, and frame organization: A typical project file separates work into pages (using the left sidebar's Pages panel) such as "Cover," "Design System," "Wireframes," and "Final Screens," and within a page, Figma's Sections feature groups related frames visually (e.g. "Onboarding flow," "Checkout flow") with a labeled header, which is far easier to navigate than one long page of loose frames. Name every frame descriptively and consistently ("Checkout / 02 Payment / Error" beats "Frame 47"), since names are what show up later in prototype connections, comments, and dev handoff.

Styles and shared libraries: Rather than repeating raw hex codes and font sizes across every frame, define color and text Styles (or, more powerfully, Variables for colors, spacing, and other tokens) once and apply them everywhere — this means a single palette change propagates across the whole file instead of requiring manual updates on every screen. For team or multi-file projects, publishing a shared Library lets components and styles stay in sync across separate files, which is how real product teams keep a consistent design system across many product areas.

Setting up frames for real devices: Use Figma's built-in frame presets (iPhone, Android, common desktop widths) as a starting point, matching the breakpoints decided in Lesson 3-6, and keep consistent canvas positioning so related screens read left-to-right or top-to-bottom in the order a user would experience them — this alone makes a file dramatically easier for a reviewer or teammate to follow without narration.

Version history and collaboration hygiene: Figma auto-saves version history, but naming key milestones (via the version history panel, accessible from the file's top-left menu) makes it possible to return to a specific known-good state later, which matters once multiple people or multiple work sessions start touching the same file. Establishing this discipline before building components (Lesson 4-2) and prototypes (Lesson 4-4) prevents rework caused purely by file chaos rather than design decisions.`,
  "vd-4-2": `Overview: Reusable components are what let a design system scale — build a button, card, or input field once as a true Figma component, and every instance of it across dozens of screens can be updated from a single source. The most important idea in this lesson is the distinction between a main component and its instances, and why editing discipline matters enormously once a file has hundreds of instances depending on it.

Main components vs instances: A main component (marked with a purple diamond icon in Figma) is the original, editable source; every copy placed elsewhere in the file is an instance (marked with a filled purple diamond, linked back to the main component). Editing the main component pushes that change to every instance automatically; editing an individual instance directly only overrides that one copy, which is intentional for one-off exceptions but a problem if done accidentally at scale, since it silently breaks the connection to future updates.

Variants and component properties: Group related components (a button in primary/secondary styles, at small/medium/large sizes, in default/hover/disabled states) into a single component set using Figma's Variants, selectable from a dropdown in the right-hand panel rather than hunting for separate, disconnected components. Component Properties go further, exposing swappable text, boolean visibility toggles (show/hide an icon), and instance swaps (swap which icon appears) directly in the right panel, so a designer using the component doesn't need to dig into its internal layers to customize it correctly.

Naming and organizing components: Use a consistent naming convention with forward slashes to create automatic groupings in the Assets panel ("Button/Primary/Large," "Icon/Navigation/Home"), which keeps a growing component library searchable and prevents duplicate, near-identical components from being created by accident because an existing one wasn't easy to find.

Why this matters for Module 4's later lessons: Auto Layout (Lesson 4-3) and interactive prototyping (Lesson 4-4) both depend on components being built cleanly now — a button component with proper Auto Layout and well-named Variants can demonstrate real hover and pressed states in a prototype, while a set of loose, duplicated rectangles cannot. Time invested in clean components here pays off directly in how convincing the eventual clickable prototype feels.`,
  "vd-4-3": `Overview: Auto Layout is Figma's system for building frames that behave like real, responsive code — rather than a static arrangement of shapes, an Auto Layout frame reflows its children automatically when content, spacing, or resizing changes, much like CSS Flexbox. The most important idea in this lesson is that Auto Layout is what makes a Figma design resilient to real content, not just accurate for the one piece of sample text used while designing.

Core properties: An Auto Layout frame has a direction (horizontal or vertical stacking), a gap (space between children, following your Lesson 3-3 spacing scale), padding (space inside the frame's edges), and alignment (how children align on the cross-axis). These four properties, set in the right-hand Design panel once a frame has Auto Layout applied (shortcut Shift+A), replace what would otherwise be dozens of manually-positioned, individually-adjusted elements.

Resizing behavior: Each child inside an Auto Layout frame can be set to Fixed (stays its set size regardless of content), Hug contents (grows or shrinks exactly to fit its content, useful for buttons and tags), or Fill container (expands to take up all remaining available space, useful for input fields or content that should stretch). Choosing the right resizing behavior per element is what makes a card handle a two-line title gracefully instead of clipping or overflowing.

Nested Auto Layout: Auto Layout frames can be nested inside other Auto Layout frames (a card containing an Auto Layout row of tags, inside an Auto Layout column of card content, inside an Auto Layout grid of cards), letting complex, real-world layouts stay fully responsive at every level rather than only at the outermost frame. This nesting is also what lets a single component like a card resize correctly when placed inside different contexts, like a narrow mobile column versus a wider desktop grid.

Auto Layout and Variables together: Combining Auto Layout's gap and padding values with Figma Variables (numeric tokens for your spacing scale) means a global spacing change can propagate through every nested Auto Layout frame that references that variable, which is the closest a static design tool gets to true design tokens used in production code — directly setting up the handoff quality developers expect in Module 4's later, more interactive work.`,
  "vd-4-4": `Overview: Interactive prototypes turn static screens into a clickable, testable experience — connecting frames with triggers, actions, and transitions so a stakeholder, tutor, or real user can navigate the product as if it were built, without a single line of code. The most important idea in this lesson is that a prototype's job is to make the flow feel real enough that problems surface before development, not to be visually perfect.

Triggers, actions, and transitions: In Figma's Prototype tab (right-hand panel), a connection between two frames is defined by a trigger (what the user does: Click/Tap, Drag, While Hovering, While Pressing, Mouse Enter, or Key/Gamepad), an action (what happens: Navigate to, Open Overlay, Swap Overlay, Scroll To, Open Link, Change to a component's Variant), and a transition (how it animates: Instant, Dissolve, Smart Animate, Move In, Push, Slide). Smart Animate is especially powerful because it automatically animates matching layers between two frames (same layer name and structure) — it's how a button convincingly appears to shift from default into a pressed or loading Variant, or how a tab indicator slides between tabs.

Overlays and interactive components: Overlays let one frame appear on top of another without a full navigation (used for modals, dropdown menus, bottom sheets, toasts) and can be configured to close on an outside click, which matters for realistic modal behavior. Interactive Components (built on the Variants from Lesson 4-2) let a single component demonstrate its own internal state changes — a checkbox toggling checked/unchecked, a button showing its pressed state — directly within the prototype, without needing separate connected frames for every micro-interaction.

Scroll behavior and fixed elements: Setting a frame's scroll behavior (vertical, horizontal, both) combined with fixing specific elements (like a sticky header or bottom tab bar) to stay in place while content scrolls underneath makes a prototype behave convincingly like a real mobile app rather than a flat, static image with clickable hotspots.

Testing the whole flow, not just one screen: Use the Present mode (top-right Play button) to click through your entire Module 2 flow end to end, checking that every branch from your screen flow map (Lesson 2-3) — including error paths, not just the happy path — is actually wired up and navigable, since an unconnected screen or dead-end button undermines the realism the whole prototype is meant to provide.`,
  "vd-4-5": `Overview: Microcopy is the small pieces of interface text — button labels, error messages, placeholder text, tooltips, confirmation dialogs — that quietly shape how confident and understood a user feels at every step. Empty states are a specific, high-leverage type of microcopy moment. The most important idea in this lesson is that words are a UI material exactly like color or spacing, and sloppy microcopy undermines even a well-structured, well-styled prototype.

Principles of good microcopy: Effective microcopy is specific rather than generic ("Payment declined by your bank" beats "Something went wrong"), written in the user's own vocabulary rather than internal system language (avoid raw error codes or backend terms), and consistent in tone and terminology across the whole product (don't call the same thing "Delete" on one screen and "Remove" on another). Button labels should describe the action's actual outcome, not just a generic verb — "Send KSh 500" is clearer than a bare "Confirm."

Writing for different states: Building on Lesson 2-6's feedback states, write actual final copy (not placeholder Lorem ipsum) for at least one loading message, one success confirmation, one specific error message, and one empty state per major screen in your prototype — this is where structural planning becomes a real, testable user experience, and where hidden ambiguity in a flow (what exactly should this message say?) tends to surface.

Designing strong empty states: A strong empty state answers three questions in a short space: what belongs here, why it's currently empty, and what the user should do next (often a single clear call-to-action button). An illustration or icon can support the message but should never replace clear, specific text — a beautiful empty-state graphic with no explanation still leaves a first-time user confused about what to do.

Microcopy and localization awareness: **For a Kenyan audience, be deliberate about currency formatting (KSh with comma separators, e.g.** KSh 12,500), phone number formats, and date conventions, and keep sentences short and direct rather than relying on idioms that may not translate cleanly if the product later supports Swahili or other local languages — clear, simple English microcopy now also makes future localization work significantly easier.`,
  "vd-4-6": `Overview: **Usability testing is how you find out whether your prototype actually works for real people, rather than just for you and your assumptions.** The most important idea in this lesson is that watching someone struggle silently through a task teaches you more than any amount of internal debate about whether a design "feels right."

Planning a test: Write 3-5 realistic task scenarios phrased as goals, not instructions — "You want to send KSh 500 to a friend" rather than "Tap the Send button" — since instructing the exact steps defeats the purpose of testing whether the flow is discoverable on its own. Recruit 5 participants where possible; usability research popularized by Jakob Nielsen has long shown that around 5 users typically surface most of a design's major usability problems, with diminishing returns from testing many more at once, making it realistic for a student project with limited time.

Moderated testing with a Figma prototype: Share your prototype's Present-mode link and ask the participant to think aloud — narrating what they're looking at, what they expect to happen, and what confuses them — while you observe without helping or hinting, even when you can see them heading toward a wrong path. Figma's own commenting and observation tools can capture notes directly on frames where issues occurred, which keeps findings tied precisely to the screen and element involved rather than a vague general impression.

What to record: For each task, note whether it was completed, how long it took, how many wrong turns or hesitations occurred, and the participant's own words about confusion or frustration — direct quotes are often more persuasive to a reviewer than a designer's paraphrased summary of the same moment. Distinguish between a fatal error (task not completed) and a minor friction point (completed, but with visible hesitation), since they warrant very different levels of fix priority.

From findings to fixes: **After testing, group findings by severity and frequency — an issue that stopped 4 of 5 participants outranks a minor visual quibble raised by one person.** Update the prototype based on the highest-priority findings and, where time allows, retest the changed flow, since usability testing is most valuable as a short, repeated loop rather than a single one-off event done right before a deadline.`,
  "vd-4-7": `Overview: This checkpoint tests whether your Figma file, components, and prototype come together as a genuinely clickable, testable product experience — not just a set of connected static screens. The most important idea here is that a strong prototype checkpoint should survive being handed to a stranger with zero explanation and still make sense.

What a strong submission includes: A cleanly organized Figma file (Lesson 4-1) with named pages, sections, and frames; a component library (Lesson 4-2) built with real Variants and Auto Layout (Lesson 4-3); a fully wired prototype (Lesson 4-4) covering your complete Module 2 flow including at least one error path, using Smart Animate or overlays where they genuinely improve realism rather than just for decoration; final microcopy (Lesson 4-5) replacing all placeholder text; and a short usability test summary (Lesson 4-6) with at least 3 participants, their key findings, and what you changed in response.

The cold-share test: Before submitting, send only the Present-mode link (no verbal walkthrough, no screen share narration) to someone unfamiliar with the project and watch whether they can complete your core task scenario unaided. Any point of confusion here is a real, fixable problem — and finding it now, inside a controlled checkpoint, is far cheaper than finding it after the project is considered "done."

Demonstrating iteration, not just output: Reviewers at this stage specifically want to see evidence of change — what did usability testing reveal, and what did you actually do differently because of it? A prototype that looks identical before and after testing (or a testing summary that reports zero findings) usually signals the testing wasn't looked at critically enough, not that the design was already perfect.

Setting up Module 5: Because Module 5 turns this whole project into a portfolio case study, keep clean before/after screenshots and a written note of every meaningful design decision and its reasoning now, while it's fresh — reconstructing your own reasoning weeks later from memory alone is far harder than capturing it in the moment.`,
  "vd-5-1": `Overview: The capstone brief is the foundation of your entire portfolio case study, so choosing well matters more than most students expect — a weak or vague brief produces a weak case study no matter how polished the final screens look. The most important idea in this lesson is that a strong capstone brief has a real, specific problem, a defined user, and enough constraint to force meaningful design decisions rather than open-ended exploration.

What makes a brief strong: A strong brief names a specific product type and context (not "a social app," but "a savings-groups app for Kenyan chama members to track contributions"), has a believable user with real constraints (limited data, older Android devices, low tech confidence, or the opposite — power users who want speed and shortcuts), and has enough real-world complexity to require actual trade-offs, like balancing simplicity against a genuinely feature-rich task. Overly broad or overly simple briefs ("redesign Instagram" or "design a single settings screen") tend to produce shallow case studies because there isn't enough real problem-solving to narrate.

Sources for a good brief: Strong capstone ideas often come from a real frustration you or someone you know has experienced with an existing product (a genuine "why is this so hard" moment), a local business or organization that would realistically benefit from better digital design (a matatu sacco, a small clinic's booking system, a school's fee payment flow), or a deliberate redesign of an existing product's specific weak flow, chosen because you can point to concrete evidence of the problem, not because it "needs a facelift."

Scoping for the time available: Choose a brief scoped to roughly 5-8 core screens covering one complete, meaningful user flow end to end, rather than trying to design an entire multi-feature app shallowly. A smaller flow designed deeply — with real research, considered edge cases, and a tested prototype — makes a far stronger portfolio piece than a large app sketched thinly across many screens.

Writing the brief document: Document your chosen brief in the same problem-statement format from Lesson 1-2, plus a one-paragraph scope statement naming exactly which flow and screens are in scope and, just as importantly, what's explicitly out of scope — this scope boundary is what will keep the project achievable and is itself a piece of professional judgment worth showing in the final case study.`,
  "vd-5-2": `Overview: A before-and-after comparison is one of the most persuasive things a portfolio can contain, because it makes your specific design decisions and their impact visible at a glance, rather than asking a reviewer to take your word for it. The most important idea in this lesson is that a convincing before-and-after needs a fair, honest "before" and a clearly explained reason for every visible change — not just a prettier version of the same screen.

Choosing a fair baseline: If redesigning an existing product, screenshot the real current flow honestly, at the state it actually exists in, rather than cherry-picking its worst possible moment to make your redesign look better by comparison — a before-and-after that feels manipulated undermines credibility with anyone reviewing it, including a future employer. If your capstone brief was a new concept without an existing product to compare against, use your own early low-fidelity wireframes from Module 2 as the "before," showing your own evolution instead.

Annotating what changed and why: For each significant change, write a short caption naming the specific problem it solved, tying back to real evidence where possible — "Reduced the signup form from 9 fields to 4, based on the drop-off pattern found in Lesson 1-4's journey map" is far stronger than "Made the form cleaner." Reviewers and interviewers respond to reasoning, not adjectives; avoid vague claims like "more modern" or "better UX" without a specific mechanism behind them.

Measuring impact where possible: If you ran usability testing (Lesson 4-6) on both versions, or even just the redesigned version against your task scenarios, report concrete before/after numbers — task completion rate, time on task, number of errors — since specific data is more convincing than a subjective before/after visual comparison alone. If real numbers aren't available, be honest that the comparison is qualitative rather than inventing statistics to sound more rigorous.

Layout for the comparison: Present before-and-after screens side by side at matching scale and cropping, ideally with matching viewport sizes, so the visual comparison itself is fair and the viewer's eye can move directly between equivalent points on each screen rather than needing to mentally resize or reorient between two differently-framed images.`,
  "vd-5-3": `Overview: Case study storytelling is the skill of turning a folder of screens and research documents into a narrative a stranger can follow and find compelling in a few minutes, which is exactly how most reviewers and hiring managers actually engage with a portfolio. The most important idea in this lesson is that a case study is a story about your thinking and decisions, not a gallery of final screens with captions.

A reliable structure: A strong case study generally follows: Context (what is this product, who is it for, in one or two sentences), Problem (the specific problem statement from Lesson 1-2 or 5-1), Process (a condensed view of research, key decisions, and at least one meaningful pivot or rejected direction), Solution (the final screens, organized by flow, not dumped as a random grid), and Outcome/Reflection (what you learned, what you'd do differently, and any real results from testing). Skipping Process is the single most common weakness in student case studies — it reduces the whole project to "here are some screens," with no visible reasoning behind them.

Showing process, including what didn't work: Include at least one rejected direction or early idea that changed significantly, along with why it changed — this is often the most credible and interesting part of a case study, because it demonstrates real iterative thinking rather than a suspiciously perfect first attempt. A case study that shows only the polished final result reads as less trustworthy to experienced reviewers than one that shows a believable, messier path to that result.

Writing style: Write in plain, direct language and keep each section genuinely short — a busy reviewer skimming a portfolio will read the first paragraph of each section closely and skim the rest, so put the most important sentence first in every section rather than building up to a conclusion. Avoid unexplained jargon (referencing "Fitts's Law" or "Hick's Law" is fine, but briefly say what it means in context so a non-designer reader isn't lost).

Visual pacing: Alternate text and visuals rather than long blocks of either — a paragraph of reasoning followed by the specific screen or diagram it refers to keeps a reader oriented and makes claims verifiable at a glance, which matters more for credibility than any single beautifully composed screen.`,
  "vd-5-4": `Overview: Exporting screens and assets correctly is what turns a Figma file into a portfolio people can actually view without opening Figma, or that a developer could realistically use for handoff. The most important idea in this lesson is that export settings should be chosen deliberately per use case, not left at whatever default Figma suggests.

Export formats and when to use them: PNG is the default choice for portfolio screenshots and UI mockups because it's lossless and supports transparency, useful for isolated components on a transparent background. JPG suits photographic content where file size matters more than pixel-perfect edges, but should be avoided for UI screens with flat colors and text, since JPG compression introduces visible artifacts around sharp edges. SVG is the right format for icons, logos, and simple vector illustrations that need to stay crisp at any size, since it's resolution-independent rather than a fixed pixel grid. PDF suits printed or presentation-style deliverables, like a printable one-pager of your case study.

Resolution and scale: In Figma's Export panel (bottom of the right-hand Design panel, when a frame or object is selected), set export scale multiples (1x, 2x, 3x) to control output resolution — 2x or 3x exports are standard for anything that might be viewed on a high-density (Retina-class) display, which includes essentially all portfolio website usage, so avoid exporting flat 1x screenshots that look soft on modern screens.

Handoff-ready exports for developers: If your case study or checkpoint includes a developer handoff component, use Figma's Dev Mode to inspect exact spacing, color values, and generated CSS/code snippets per element, and export any needed assets (icons, images) at the resolutions and formats a developer actually requested, rather than guessing — asking "what formats and sizes do you need" is a real, professional habit worth demonstrating even in a student project.

Organizing exported files: Name exported files clearly and consistently ("vd-capstone-onboarding-01.png," not "Untitled 4.png"), and keep them organized in folders matching your case study's flow structure — this file hygiene becomes directly visible the moment you start assembling the presentation deck in the next lesson.`,
  "vd-5-5": `Overview: A presentation deck is how your case study gets seen in real settings — a portfolio review, a job interview, a client pitch — and it has different constraints than a scrollable web case study, since it's often walked through live and needs to work as a spoken narrative, not just a read document. The most important idea in this lesson is that a deck should support you talking, not replace you talking — dense slides fight against a live presentation rather than helping it.

Slide structure mirroring the case study: Follow the same Context, Problem, Process, Solution, Outcome structure from Lesson 5-3, but compress ruthlessly — a strong capstone deck is often 10-15 slides, with one clear idea per slide rather than paragraphs of text. A title slide, one problem slide, two or three process slides (including at least one showing a rejected direction), several solution slides organized by flow, and a closing outcome/reflection slide is a reasonable target structure.

Designing slides using what you already know: Apply the same typography, spacing, and color principles from Module 3 directly to the deck itself — a consistent type scale, a clear visual hierarchy per slide, and generous white space make a deck easier to follow live than one crammed with small text and multiple competing ideas. Treat each slide as its own small piece of interface design, since the skills transfer directly.

Showing screens at readable size: When placing UI screens on a slide, size them large enough to actually read on a shared screen or projector rather than shrinking several screens onto one slide — it's usually better to show one flow across two or three slides at real, legible size than to compress it into a single busy slide nobody in the back of a room can actually read.

Practical tools and export: Figma Slides (Figma's own presentation tool) is well suited here since it can pull directly from your existing Figma screens and component library without re-exporting into a separate tool, keeping a consistent visual system between your product screens and the deck presenting them; alternatives like Google Slides or PowerPoint work too, as long as the same discipline around simplicity and legibility is maintained regardless of tool.`,
  "vd-5-6": `Overview: A portfolio review is a structured opportunity to get honest, critical feedback on your case study before it goes in front of real employers or clients, and how you prepare for and respond to that feedback is itself a professional skill being assessed. The most important idea in this lesson is that a portfolio review works best when you actively steer it toward the feedback you actually need, rather than passively waiting to hear whatever a reviewer happens to mention.

Preparing specific questions: Walk into a review with 2-4 specific questions rather than a general "what do you think" — for example, "Does the Process section explain my reasoning clearly, or does it read as an afterthought?" or "If you only had 30 seconds, would you understand what problem this solves?" Specific questions produce specific, actionable answers; open-ended requests for feedback often produce vague, hard-to-act-on comments.

Presenting vs. narrating: Practice walking through your case study in the time you'll realistically have (often just a few minutes), leading with the problem and your reasoning rather than diving straight into visuals — a reviewer who understands the problem in the first 30 seconds evaluates everything that follows more generously and accurately than one who's still trying to figure out what they're looking at.

Receiving feedback without over-defending: When a reviewer raises a concern, resist the urge to immediately explain why it's not actually a problem — first make sure you've fully understood the concern, then decide afterward, with distance, whether it changes anything. Feedback that feels wrong in the moment is sometimes the most valuable, precisely because it reveals an assumption you didn't realize you were making.

Acting on feedback: Not every piece of feedback should be applied — weigh each comment against your actual problem statement and user, and be ready to explain, in the final case study, both the feedback you incorporated and the feedback you consciously chose not to, along with why. This closing judgment call is itself a strong thing to include in the reflection section of your case study, since it shows a designer who can evaluate input critically rather than simply complying with the last thing anyone said.`,
  "vd-5-7": `Overview: This final checkpoint is the graduation deliverable — the complete case study, assembled from every module of the course, submitted as a professional artifact ready to show a real employer, client, or design community. The most important idea here is that this checkpoint is judged as a finished professional piece, not as a class assignment, so it should read as something you would genuinely be proud to link from a CV or LinkedIn profile.

What a complete submission includes: A capstone brief and scope statement (Lesson 5-1), a fair and well-annotated before/after comparison (Lesson 5-2), a full case study following the Context/Problem/Process/Solution/Outcome structure (Lesson 5-3) with correctly exported, readable assets (Lesson 5-4), a presentation deck version of the same story (Lesson 5-5), and a short written reflection incorporating what you learned from your portfolio review (Lesson 5-6), including feedback you accepted and feedback you consciously declined.

The full-course consistency check: Trace the thread from Module 1 through Module 5 explicitly in your reflection — does the final design actually solve the problem statement from Lesson 1-2, does it reflect the persona and journey map from Module 1, does the flow match your Module 2 structure (or explain deliberately where and why it diverged), and does the visual system stay consistent with Module 3's principles? A case study that can trace this thread end to end demonstrates a complete design process, not just a nice-looking final screen.

Final presentation quality bar: Before submitting, check every exported image for resolution and cropping issues (Lesson 5-4), read the entire case study for typos and unclear sentences, and time yourself presenting the deck version to make sure it fits realistically within a short review window — small polish issues are exactly what separate a genuinely portfolio-ready piece from one that merely fulfills the assignment's requirements.

What happens after graduation: This case study is meant to keep working for you after the course ends — update it as your skills grow, add real usability data if you later get access to it, and be ready to talk through every decision in it in an interview, since the process behind the work, more than the final screens themselves, is usually what a hiring conversation actually probes.`,
};

const vibeCodingContent: Record<string, string> = {
  "vc-1-1": `Overview: Every website you visit is the result of a conversation between two computers: a client (your browser) and a server (a computer somewhere that stores the website's files). Understanding this conversation is the foundation for everything else in this course, because debugging, performance, and even security all come back to knowing what happens between typing a URL and seeing a page render.

DNS and the request: When you type a domain like example.com, your browser first asks a DNS (Domain Name System) server to translate that human-readable name into an IP address, the numeric address of the server that actually hosts the site. Once your browser has the IP address, it opens a connection and sends an HTTP request asking for a specific resource, usually the homepage. DNS lookups are cached by your browser and operating system so repeat visits are faster.

HTTP requests and responses: **HTTP (HyperText Transfer Protocol) is the language browsers and servers use to talk.** A request has a method (GET to fetch data, POST to send data, and others like PUT and DELETE), a URL, and headers describing the request. The server replies with a response that includes a status code (200 for success, 404 for not found, 500 for server error) and a body, usually HTML, CSS, JavaScript, JSON, or images. HTTPS adds TLS encryption on top of HTTP so the conversation cannot be read or tampered with in transit.

Rendering the page: **Once the browser receives the HTML, it builds the DOM (Document Object Model), a tree structure representing every element on the page.** As the browser encounters linked CSS files it builds the CSSOM (CSS Object Model) for styles, and as it encounters script tags it downloads and runs JavaScript, which can further change the DOM. The browser combines DOM and CSSOM into a render tree, calculates layout, and paints pixels to the screen. This sequence explains why a page can appear to load in stages rather than all at once.

Client versus server: **Some work happens on the server before anything is sent, such as querying a database or applying business logic.** Other work happens on the client, in the browser, such as validating a form before submission or updating the interface without a full page reload. Modern frameworks like Next.js, which this course covers, deliberately blur this line by letting you choose per component whether code runs on the server or the client.

Why this matters for developers: **When a site feels slow, the cause is almost always in this pipeline: a slow DNS lookup, a large HTML or JavaScript payload, a blocking script, or a slow server response.** Learning to read browser developer tools, particularly the Network and Performance tabs, lets you see each of these steps happening and diagnose real problems instead of guessing.`,
  "vc-1-2": `Overview: **HTML (HyperText Markup Language) is the skeleton of every web page.** It does not describe how things look, that is CSS's job, it describes what things are: a heading, a paragraph, a list, a link. A correctly structured HTML document is the foundation that makes styling, accessibility, and search engines all work properly, so getting this right early saves pain later.

The document skeleton: **Every HTML document starts with a doctype declaration, <!DOCTYPE html>, which tells the browser to render in standards mode.** Inside the <html> element sit two children: <head>, which holds metadata not shown directly on the page such as the <title>, <meta charset="UTF-8">, and linked stylesheets, and <body>, which holds everything visible to the user. Every tag that opens must close, and tags must nest properly, an unclosed or mismatched tag is one of the most common sources of layout bugs.

Meta tags and character encoding: The <meta charset="UTF-8"> tag should be the first element inside <head> so the browser reads the rest of the document correctly, especially important for names and text with special characters common in Kenyan and Swahili content. The <meta name="viewport" content="width=device-width, initial-scale=1"> tag tells mobile browsers to render at the device's actual width instead of a shrunk desktop layout, without it responsive design will not work correctly on phones.

Attributes and elements: **HTML elements can carry attributes that add information or behavior, such as href on a link, src and alt on an image, or class and id for styling and JavaScript hooks.** Void elements like <img>, <br>, and <input> do not wrap content and do not need a closing tag. Understanding the difference between an element (the full tag pair with its content) and an attribute (a property inside the opening tag) makes reading documentation much easier.

Comments and readability: HTML comments, written as <!-- like this -->, are ignored by the browser but help you and teammates understand a file's structure, especially useful for marking where major sections begin in a long page. Consistent indentation, one nested level per tag, also makes structure easy to scan even before adding CSS.

Why structure matters before styling: A page with sloppy, non-nested markup will still often render something in the browser, because browsers are forgiving, but that forgiveness hides bugs that surface later when you add CSS or JavaScript. Starting every project with a clean, valid skeleton means the tools you add next, CSS selectors, JavaScript event listeners, screen readers, all have a reliable structure to work with.`,
  "vc-1-3": `Overview: **Semantic HTML means choosing elements based on their meaning, not just their default appearance.** A <div> and a <nav> can look identical after styling, but only one tells the browser, screen readers, and search engines what that section actually is. This lesson is about writing markup that communicates, which pays off in accessibility, SEO, and code that other developers can understand at a glance.

Landmark elements: HTML5 introduced structural elements that replace generic <div> soup: <header> for introductory content, <nav> for navigation links, <main> for the primary content of the page (there should only be one per page), <section> for a thematic grouping of content usually with its own heading, <article> for self-contained content like a blog post, <aside> for tangential content like a sidebar, and <footer> for closing information. Screen readers expose these as landmarks, letting users jump directly to the navigation or main content instead of tabbing through everything.

Headings and document outline: Headings from <h1> through <h6> should form a logical outline, one <h1> per page describing its main topic, with <h2> for major sections and <h3> for subsections nested beneath them. Skipping levels purely for font size, such as jumping from <h1> to <h4> because it looks smaller, breaks the outline that assistive technology relies on; font size should be controlled with CSS instead.

Text-level semantics: Not all emphasis is equal. <strong> marks text of strong importance and is announced differently by screen readers, while <em> marks stressed emphasis, both differ from simply styling text bold or italic with CSS, which carries no semantic meaning. <p> for paragraphs, <ul> and <ol> for unordered and ordered lists, and <blockquote> for quoted content all give meaning that a generic <div> cannot.

When div and span are correct: <div> and <span> are not wrong, they are the right choice when an element exists purely for styling or scripting purposes and has no semantic meaning of its own, a wrapping <div> for a CSS grid layout is a perfectly normal use case. The rule of thumb is to reach for a semantic element first and fall back to <div> or <span> only when no meaningful element fits.

Why this matters in practice: **Search engines weigh content inside <main>, <article>, and proper headings more heavily when determining what a page is about, directly affecting SEO.** Screen reader users navigate by landmarks and headings as their primary way of skimming a page, so semantic markup is not a nice-to-have, it is what makes a site usable at all for a meaningful share of visitors.`,
  "vc-1-4": `Overview: **CSS selectors are how you tell the browser which elements a rule applies to.** Mastering selectors means you can target exactly the elements you intend, no more and no less, instead of adding classes everywhere or fighting unexpected styles. This lesson builds the vocabulary you will use in every layout from here on.

Basic selectors: **A type selector targets an element by tag name, like p or h1.** A class selector, written with a leading dot like .card, targets every element carrying that class attribute, and is the most commonly used selector because it is reusable across many elements. An ID selector, written with a leading hash like #site-header, targets a single unique element, since IDs must be unique per page; IDs are best reserved for JavaScript hooks and anchor links rather than styling, because they carry high specificity that is hard to override later.

Combinators: **Selectors can be combined to target relationships between elements.** A descendant combinator, a space like .card p, selects any p anywhere inside a .card. A child combinator, > like .card > p, selects only direct children. An adjacent sibling combinator, + like h2 + p, selects a p immediately following an h2, and a general sibling combinator, ~, selects all matching siblings that follow. These let you style based on document structure without adding extra classes.

Pseudo-classes and pseudo-elements: Pseudo-classes like :hover, :focus, :first-child, and :nth-child(2) target elements based on state or position rather than an attribute. :focus-visible specifically targets keyboard focus rather than mouse clicks, which matters for accessible focus styles. Pseudo-elements like ::before and ::after let you insert generated content or decorative styling without adding extra markup, commonly used for icons, quotation marks, or decorative shapes.

Specificity and the cascade: When multiple rules target the same element, the browser resolves conflicts using specificity, calculated roughly as inline styles beat IDs, IDs beat classes and attribute selectors, and classes beat type selectors, with later rules in the stylesheet winning ties. Understanding specificity explains why a style you wrote is not applying, usually because another rule elsewhere has a higher specificity score, not because CSS is broken.

Writing maintainable selectors: The best practice for most projects is to keep specificity low and consistent by relying mainly on class selectors, avoiding deeply nested combinators and ID selectors for styling, and avoiding the !important flag except as a last resort, since it overrides the cascade and makes future overrides very difficult.`,
  "vc-1-5": `Overview: **The CSS box model describes how every element on a page is structured as nested boxes: content, padding, border, and margin.** Nearly every layout bug, from unexpected overflow to mismatched spacing, comes back to misunderstanding how these boxes are measured and combined, so this is one of the most practically important lessons in the whole course.

The four layers: **The content box holds the actual text or child elements and is sized by width and height.** Padding is space inside the border, between the content and the border edge, and it takes on the element's background color. The border sits outside the padding and can have its own width, style, and color. Margin is space outside the border, between this element and its neighbors, and it is always transparent since it is not part of the element itself, just spacing around it.

box-sizing, the setting that fixes most confusion: By default, the browser uses box-sizing: content-box, meaning width and height apply only to the content box, so padding and border are added on top, making an element wider than its declared width. Setting box-sizing: border-box makes width and height include padding and border, so a 300 pixel wide box stays 300 pixels wide no matter how much padding you add. Most modern CSS resets apply border-box globally with a rule like * { box-sizing: border-box; }, and this course follows that convention because it makes sizing predictable.

Margin collapsing: Vertical margins between adjacent block-level elements can collapse, meaning the space between them becomes the larger of the two margins rather than their sum, a behavior that surprises many beginners. This does not happen with horizontal margins, and it does not happen inside flex or grid containers, only in normal block flow, which is one more reason modern layouts increasingly favor flexbox and grid.

Shorthand properties: Padding and margin accept shorthand values: a single value applies to all four sides, two values apply to vertical then horizontal, and four values apply top, right, bottom, left in that clockwise order. Border shorthand combines width, style, and color in one declaration, like border: 1px solid #ccc.

Debugging spacing issues: When spacing looks wrong, opening browser DevTools and inspecting the box model diagram for that element is the fastest way to see exactly how much padding, border, and margin are being applied, rather than guessing by trial and error in the CSS file.`,
  "vc-1-6": `Overview: **Responsive units let a design adapt to different screen sizes instead of breaking.** Choosing the right unit for the right job, fixed versus relative, is what separates a layout that looks intentional on a phone, tablet, and desktop from one that only ever looked right on the screen it was designed on.

Absolute units: **Pixels (px) are an absolute unit, a fixed number of device pixels regardless of context.** Pixels are predictable and useful for things like borders that should genuinely stay one pixel thick, but using them for font sizes and layout widths ignores the user's browser zoom and font size preferences, which is an accessibility problem for anyone who has increased their default text size.

Font-relative units: em is relative to the font size of the current element's parent, which means em values compound as you nest elements, a common source of confusing, unpredictable sizing. rem (root em) is relative to the font size of the root html element only, not any parent, making it predictable and the preferred unit for font sizes, spacing, and even widths in most modern CSS, since it scales cleanly when a user changes their browser's base font size.

Viewport-relative units: **vw and vh are percentages of the viewport's width and height respectively, so 50vw is always half the browser window's width.** These are powerful for full-bleed sections and fluid typography but risky when used alone for font sizes, because at very narrow or very wide viewports text can become unreadably small or huge.

percent: The % unit is relative to the parent element's corresponding dimension, commonly used for widths in fluid layouts, such as an image set to width: 100% so it never exceeds its container.

clamp() for fluid values: The clamp(min, preferred, max) function lets a single declaration set a minimum, a preferred fluid value, and a maximum, for example font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem) scales smoothly between screen sizes while never going smaller or larger than the bounds you set. Combining a rem term with the vw term in the preferred value, rather than using vw alone, matters for accessibility, because it means the text still responds correctly to the user's browser zoom level even as it also scales with viewport width. This one function has reduced how many media queries are needed purely for typography.

Choosing units in practice: A solid default for this course is rem for font sizes and spacing, percent or fractional units for flexible widths inside flex and grid containers, and clamp() wherever you want smooth scaling across breakpoints instead of abrupt jumps.`,
  "vc-1-7": `Overview: This checkpoint closes Module 1 by pulling together everything you have learned about how the web works, HTML structure, semantic markup, selectors, the box model, and responsive units into a single small project you can show in a portfolio. The goal is not new syntax, it is proving you can combine these foundations cleanly and explain the choices you made.

What a strong submission demonstrates: A strong checkpoint page starts with valid, semantic HTML, a single h1, a logical heading outline, and real landmark elements (header, nav, main, footer) instead of an unlabeled stack of divs. It applies box-sizing: border-box globally, uses class selectors as the primary styling hook rather than IDs or deep combinators, and uses rem and percentage units rather than hardcoded pixel widths so the page does not break when the viewport changes.

Common mistakes to catch before submitting: **Missing the viewport meta tag is the single most common reason a page looks fine on desktop and broken on a phone.** Others include using a div where a semantic element existed for that exact purpose, skipping heading levels for visual sizing instead of controlling size with CSS, and forgetting alt text on meaningful images, a preview of the accessibility work coming in Module 7 but worth building as a habit now.

Self-review checklist: Before considering the page done, validate the HTML structure by reading it top to bottom without the CSS applied, does it still make sense as an outline? Resize the browser window from narrow to wide and watch for any element that overflows its container or text that becomes unreadably small. Check that every interactive element (links, buttons) is reachable and visibly identifiable.

How this connects forward: **Everything from this module becomes the raw material for Module 2's layout work.** Flexbox and grid do not replace the box model, semantics, or selectors, they build directly on top of them, so a shaky foundation here will resurface as confusing layout bugs later. Treat this checkpoint as the moment to lock in habits (border-box by default, semantic tags by default, rem by default) that you will not want to rebuild later under deadline pressure.

Presenting the work: When you add this to a portfolio or share it for review, briefly note the structural decisions you made, why you chose a particular landmark element or unit, since being able to explain your reasoning is itself part of what makes a submission look like the work of a developer rather than someone copying a template.`,
  "vc-2-1": `Overview: **Flexbox is a one-dimensional layout model built for arranging items in a row or a column and distributing space between them.** It solved problems that used to require hacks like floats and negative margins, and it remains the right tool whenever you are laying out a single row or column of items, like a navigation bar, a button group, or a card's internal content.

Container and items: **Flexbox has two roles.** Setting display: flex on a parent makes it a flex container, and every direct child automatically becomes a flex item, arranged in a row by default. flex-direction controls the main axis: row (default), row-reverse, column, or column-reverse. Understanding that flexbox always has a main axis (the direction items flow) and a cross axis (perpendicular to it) is essential, because alignment properties behave differently depending on which axis they control.

Aligning along the main axis: justify-content controls spacing along the main axis, with common values flex-start, center, flex-end, space-between (equal gaps between items, none at the edges), and space-around (equal gaps including edges, though edge gaps are visually half-size). This single property solves most horizontal centering and spacing problems that used to require manual margin calculations.

Aligning along the cross axis: align-items controls how items align along the cross axis within the container, with values like stretch (default, items fill the cross axis), center, flex-start, and flex-end. align-self overrides align-items for a single individual item when you need one item to behave differently from its siblings.

Controlling item sizing: The flex shorthand property, flex: grow shrink basis, controls how an item grows or shrinks relative to its siblings when there is extra or insufficient space. flex: 1 is a common pattern meaning an item should grow to fill available space equally with any other flex: 1 siblings. flex-wrap: wrap allows items to move to a new line when they no longer fit, which combined with gap for consistent spacing between items (without the collapsing issues of margins) is the standard modern approach to a wrapping row of cards or buttons.

When to reach for flexbox: **Flexbox shines for one-dimensional problems: centering a single item, distributing navigation links, aligning a card's icon and text, or building a button row.** When you need to control both rows and columns together as a cohesive grid, that is the signal to reach for CSS Grid instead, covered next.`,
  "vc-2-2": `Overview: **CSS Grid is a two-dimensional layout system that lets you control rows and columns at the same time, something flexbox cannot do natively.** Grid is the right tool whenever a layout has a genuine grid-like structure, a page shell with a header, sidebar, main content, and footer, or a gallery of evenly sized cards, and it dramatically reduces the amount of CSS needed to build layouts that used to require complex float or flexbox workarounds.

Defining the grid: Setting display: grid on a container turns it into a grid container, and its direct children become grid items placed into an implicit single-column grid by default. grid-template-columns and grid-template-rows explicitly define the size of each column and row track, for example grid-template-columns: 1fr 2fr 1fr creates three columns where the middle one is twice as wide as the others, using the fr (fractional) unit which distributes remaining space proportionally.

The repeat() and minmax() functions: **Writing out many equal columns by hand is tedious, so repeat(3, 1fr) is shorthand for three equal fr columns.** Combined with minmax(), grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) creates a genuinely responsive grid with zero media queries: as many columns as fit at a minimum of 200px each, growing to fill leftover space, and automatically reflowing to fewer columns as the viewport narrows. This single pattern replaces a large amount of manual breakpoint logic for card grids.

Gap and placement: **The gap property (with row-gap and column-gap available separately) sets spacing between grid tracks without the margin-collapsing issues of older techniques.** Items can be explicitly placed using grid-column and grid-row with line numbers or the span keyword, for example grid-column: span 2 makes an item occupy two column tracks, useful for featured cards or hero sections inside an otherwise uniform grid.

Named template areas: grid-template-areas lets you lay out a page shell by naming regions in a visual ASCII-like map, then assigning each child to a named area with grid-area, which makes complex page layouts like "header / sidebar / main / footer" far more readable in the CSS than a series of line-number placements.

Grid versus flexbox in practice: Grid excels when you are thinking in both rows and columns at once, page shells, photo galleries, dashboards, while flexbox excels for simpler, single-direction groupings. In real projects it is normal and expected to nest flexbox inside grid items, using each tool for the part of the layout it fits best.`,
  "vc-2-3": `Overview: A navigation bar is one of the first real components students build because it combines flexbox alignment, responsive behavior, and semantic HTML in one recognizable piece. A well-built nav bar is not just visually correct, it should be keyboard accessible and adapt sensibly on narrow screens rather than simply shrinking until it breaks.

Semantic structure: A navigation bar belongs inside a <nav> element, ideally with an aria-label such as aria-label="Primary" if there is more than one nav region on the page (a footer nav, for instance). Links live in a <ul> of <li> elements, not bare <a> tags side by side, because a list communicates to assistive technology that these are a set of related navigation options, and CSS then removes the default list bullets and spacing.

Layout with flexbox: The typical structure is a flex container with justify-content: space-between to push a logo to one side and the link list to the other, with align-items: center keeping everything vertically aligned regardless of differing heights between a logo image and text links. The link list itself is also commonly a flex container with a gap between individual links, avoiding the old technique of margin-right which suffers from margin collapsing and awkward last-child handling.

Sticky and fixed positioning: **Many nav bars use position: sticky combined with top: 0 so the bar stays visible as the user scrolls, without the layout jump issues position: fixed can cause.** Sticky positioning only takes effect within its containing block, so it is worth testing that the nav bar's parent does not have overflow settings that prevent the sticky behavior from working.

Mobile navigation patterns: Below a chosen breakpoint, the common pattern is to collapse links behind a toggle button, often called a hamburger menu, implemented as a real <button> (never a div, for keyboard and screen reader accessibility) that toggles a class or an aria-expanded attribute, which JavaScript then uses to show or hide the link list, commonly as a full-width dropdown or slide-in panel. The toggle button needs a clear accessible name, such as aria-label="Toggle navigation menu", since a hamburger icon alone conveys nothing to a screen reader.

Focus and current-page indication: Every link needs a visible :focus-visible style so keyboard users can see where they are, and marking the active page's link with aria-current="page" gives both sighted and assistive-technology users a reliable way to know where they currently are on the site.`,
  "vc-2-4": `Overview: **A hero section is the large, attention-grabbing block at the top of a page, and how you structure it sets the tone for the rest of the page's sections.** This lesson focuses on building sections that stay legible and well-proportioned across screen sizes, not just on the designer's original viewport.

Hero section anatomy: A typical hero combines a heading, supporting text, a call-to-action button, and often a background image or illustration, all centered within a section that usually gets extra vertical padding to feel spacious. Wrapping the hero's inner content in a max-width container (commonly max-width: 1200px with margin-inline: auto to center it) prevents text lines from stretching uncomfortably wide on large monitors, since very long lines of text are measurably harder to read.

Section rhythm and spacing: Consistent vertical spacing between sections, often using a shared CSS custom property like --section-padding, gives a page rhythm rather than feeling like several unrelated fragments stitched together. Using semantic <section> elements, each with its own heading, keeps the page's outline meaningful and gives you natural anchor points for in-page navigation.

Background images and overlays: A common hero pattern layers a semi-transparent dark overlay over a background image using either a linear-gradient combined with background-image, or an absolutely positioned pseudo-element, ensuring text placed on top remains readable regardless of what is happening in the image behind it. background-size: cover keeps the image filling its container proportionally without distortion, and background-position adjusts which part of the image stays visible when the container's aspect ratio does not match the image's.

Responsive behavior: Hero and section layouts often switch structure entirely between mobile and desktop, for example a two-column hero (text beside an image) on desktop that stacks to a single column on mobile. This is typically achieved with flexbox or grid plus a media query that changes flex-direction from row to column, or changes grid-template-columns from two tracks to one, below a chosen breakpoint, combined with clamp()-based font sizes so headings scale smoothly rather than jumping abruptly.

Why structure over decoration: A hero section's real job is to communicate what the page or product is about within seconds, so the structural decisions, heading hierarchy, contrast between text and background, and call-to-action prominence, matter more than any single visual flourish. A working checklist is: is the message clear, is the text readable against its background at every screen size, and does the primary action stand out visually.`,
  "vc-2-5": `Overview: Cards and lists are the most repeated pattern in real websites, product grids, blog previews, team member listings, so getting the underlying structure right pays off across an entire project. This lesson focuses on building a single reusable card pattern with CSS Grid or flexbox, rather than hand-styling each instance separately.

Card anatomy: A card is typically an <article> element, since each card represents a self-contained piece of content, containing an image, a heading, supporting text, and sometimes a call-to-action link or button. Using article rather than a generic div gives semantic meaning to something that will often be dynamically repeated for many items, such as products or posts.

Internal layout with flexbox: Inside a card, flexbox with flex-direction: column is the standard pattern, and setting the card itself to display: flex with flex-direction: column while giving a middle content area flex: 1 lets footers (like a price or button) sit flush at the bottom of every card even when card text content is different lengths, keeping a row of cards visually even.

Arranging cards in a grid: The parent container holding multiple cards is a great use case for grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) combined with gap, producing a responsive grid where the number of columns naturally adjusts to the container's width without a single media query. This is more resilient than a flexbox row with manual width percentages, especially when the number of cards varies.

Lists versus card grids: When content is more textual and sequentially ordered, a semantic <ul> or <ol> is usually the better choice over a grid of cards, reserving card layouts for content that benefits from visual grouping like an image plus metadata. Removing default list styling (list-style: none, and resetting margin and padding) is standard when a list is being restyled into a horizontal or grid layout, since the semantic meaning is kept even though bullets are visually removed.

Image consistency inside cards: Images inside cards vary in natural size, so setting a fixed aspect-ratio (for example aspect-ratio: 16 / 9) combined with object-fit: cover keeps every card's image area visually uniform without distorting the image itself, a much cleaner modern approach than the older technique of a fixed-height container with overflow: hidden.`,
  "vc-2-6": `Overview: **Responsive debugging is the practical skill of finding and fixing layout problems across screen sizes, rather than designing blind and hoping it works.** This lesson is less about new CSS properties and more about a systematic process, because most responsive bugs come from a small, recognizable set of causes once you know what to look for.

Using DevTools device mode: **Every major browser's DevTools includes a device toolbar that simulates different viewport widths and device pixel ratios.** Rather than only checking a handful of fixed device presets, drag the viewport width freely from very narrow to very wide, since real bugs often appear at in-between widths that no preset device happens to match, not just at common breakpoints like 375px or 768px.

The usual suspects for overflow bugs: Horizontal scrollbars appearing unexpectedly are almost always caused by one of a few things: an element with a fixed width or min-width wider than its container, an image without max-width: 100%, long unbroken text or URLs without overflow-wrap: break-word, or negative margins pushing content outside its parent. Setting overflow-x: hidden on the body can hide the symptom but does not fix the underlying cause, so it should be a last resort, not a first response.

Finding the exact offending element: Adding a temporary outline: 1px solid red to * (the universal selector) in DevTools' inline style editor is a fast, low-effort way to visually spot which element is wider than expected, since the outlined boxes make overflow obvious at a glance. Once found, checking that element's computed width, padding, and margin in the DevTools box model panel usually reveals the cause immediately.

Media query strategy: A mobile-first approach, writing base styles for small screens and adding min-width media queries to enhance the layout for larger screens, tends to produce fewer bugs than a desktop-first approach with max-width overrides, because it means every screen size gets an intentional, complete style rather than leftover desktop styles that were never fully unwound.

Testing on real constraints: Beyond DevTools, testing text at larger zoom levels (simulating low-vision users) and testing with a genuinely slow network throttle setting catches problems that a fast desktop connection at 100% zoom will never reveal, both of which are common real-world conditions for site visitors, especially relevant for mobile-heavy audiences.`,
  "vc-2-7": `Overview: **This checkpoint closes Module 2 by combining flexbox, grid, navigation, hero sections, cards, and responsive debugging into one complete, multi-section landing page.** The goal is demonstrating layout judgment, knowing which tool fits which part of a page, rather than showing off every technique in one cramped design.

What a strong submission demonstrates: A strong layout checkpoint has a sticky or clearly structured nav bar built with flexbox, a hero section with a constrained max-width and readable contrast, a responsive card grid built with CSS Grid's auto-fit/minmax pattern, and consistent spacing rhythm between sections. Crucially, it should look intentional, not just functional, at three genuinely different widths: a narrow phone, a tablet, and a wide desktop, not only at the exact breakpoints you happened to test.

Common mistakes to catch before submitting: Cards that do not align evenly when text length varies (missing flex-direction: column plus flex: 1 on the content area), a nav bar that overflows or wraps awkwardly on mobile without a proper toggle pattern, and hero text that becomes unreadably large or small at extreme viewport widths because clamp() bounds were not set or were set too loosely.

Self-review checklist: Resize the browser continuously from 320px to 1600px and watch for any point where content jumps, overlaps, or overflows, rather than only checking a couple of fixed widths. Confirm every section uses semantic elements underneath the flex or grid styling, layout technique and semantic meaning are not in conflict, you can have both. Run through keyboard tab order on the nav bar to confirm focus is visible and logical.

How this connects forward: The layout skills here, flexbox for one-dimensional groupings, grid for two-dimensional structure, mobile-first responsive thinking, are exactly what you will reuse when building real interactive components with JavaScript and React starting in Module 3. A page that already lays out correctly in plain HTML and CSS is much easier to make interactive than one where layout and behavior are being debugged simultaneously.

Presenting the work: When sharing this checkpoint, briefly explain one layout decision you are proud of and one bug you found and fixed during responsive debugging, since narrating your debugging process is a skill professional developers are explicitly evaluated on in real interviews and code reviews.`,
  "vc-3-1": `Overview: Variables and types are how JavaScript stores and works with information, everything interactive on a page, a counter, a form value, a toggled state, starts as a variable holding a value of some type. Getting comfortable with how JavaScript declares variables and handles types is the foundation for every interactive feature built in the rest of this course.

Declaring variables: Modern JavaScript uses let and const to declare variables, and var should be avoided in new code because of confusing scoping behavior covered in the next lesson. const declares a variable that cannot be reassigned after its initial value, and should be your default choice, using it signals to anyone reading the code that this value will not change. let declares a variable that can be reassigned later, appropriate for things like a counter or a value that genuinely changes over time, such as loop counters or state that gets updated. Importantly, const on an object or array still allows changing the contents of that object or array, it only prevents reassigning the variable itself to a completely different value.

Primitive types: JavaScript has a small set of primitive types: string for text (written with quotes or backticks), number for both integers and decimals (JavaScript does not have separate int and float types), boolean for true or false, undefined for a variable that has been declared but not assigned a value, and null representing an intentional absence of value, which is subtly different from undefined. The typeof operator lets you check a value's type at runtime, useful when debugging unexpected behavior.

Template literals: Backtick-delimited strings, called template literals, allow embedding expressions directly inside a string using \${expression} syntax, for example \`Hello, \${name}!\`, which is far more readable than string concatenation with the + operator and is the standard modern way to build dynamic strings.

Type coercion and equality: JavaScript will automatically convert types in certain operations, called coercion, which can produce surprising results, for example "5" + 3 produces the string "53" while "5" - 3 produces the number 2. Because of this, always use the strict equality operator === (and !== for inequality) rather than == and !=, since strict equality compares both value and type without performing coercion, avoiding an entire category of subtle bugs.

Why this matters early: Every bug caused by an unexpected undefined, a string where a number was expected, or a variable that changed when it should not have, traces back to the concepts in this lesson, making careful variable and type habits one of the highest-leverage things to get right from day one.`,
  "vc-3-2": `Overview: Functions are reusable blocks of logic, and scope determines where a variable can be accessed from. Together they are how you organize JavaScript code into predictable, testable pieces instead of one long script where anything can change anything else at any time.

Function syntax: JavaScript offers several ways to write a function. A function declaration, function greet(name) { return \`Hi, \${name}\`; }, is hoisted, meaning it can be called before its definition appears in the file. A function expression assigns an anonymous or named function to a variable. Arrow functions, const greet = (name) => \`Hi, \${name}\`, are the most common modern style, offering shorter syntax and, importantly, not creating their own this binding, which makes them predictable inside callbacks and, as you will see in Module 4, inside React components.

Parameters, arguments, and return values: A function's parameters are placeholders defined in its signature, while arguments are the actual values passed in when it is called. Functions can define default parameter values, function greet(name = "friend"), so a sensible fallback applies when no argument is passed. A function without an explicit return statement returns undefined, a common source of bugs when a function is expected to produce a value.

Block scope versus function scope: Variables declared with let and const are block-scoped, meaning they only exist within the nearest enclosing curly braces {}, whether that is a function, an if statement, or a loop. This is a deliberate improvement over var, which is function-scoped and can leak out of blocks like if statements and for loops in confusing ways, one of the main reasons modern JavaScript avoids var entirely.

Closures: A closure occurs when a function retains access to variables from the scope in which it was defined, even after that outer function has finished running. This sounds abstract but is genuinely common in practice, for example a function that returns another function pre-configured with certain values, or an event handler that still remembers a variable from when it was created. Understanding closures explains a lot of behavior in both vanilla JavaScript event handling and React hooks later in the course.

Why structuring logic in functions matters: Breaking logic into small, well-named functions with clear inputs and outputs makes code easier to test, reuse, and reason about, the same underlying discipline that later becomes the foundation for React components, which are, at their core, just functions that return UI.`,
  "vc-3-3": `Overview: **DOM selection is how JavaScript finds elements on a page so it can read or change them.** Every interactive feature, showing a menu, updating text, toggling a class, starts with selecting the right element, so precise, efficient selection is a core skill before anything about events or state matters.

Modern selection methods: **document.querySelector(selector) returns the first element matching a CSS selector, and document.querySelectorAll(selector) returns all matching elements as a NodeList.** Because these accept any valid CSS selector, the exact same selector knowledge from Module 1 (classes, IDs, combinators, pseudo-classes like :first-child) transfers directly into JavaScript, making querySelector the standard, flexible choice for most selection needs today, favored over older methods like getElementById and getElementsByClassName in modern code because of that flexibility and consistency.

NodeList behavior: **A NodeList returned by querySelectorAll is not a true array, but it does support forEach directly, so elements.forEach(el => { ... }) works without conversion.** If you need array methods like map or filter, wrap it with Array.from(elements) or the spread syntax [...elements] first, since NodeLists lack those array-specific methods.

Reading and changing content: Once an element is selected, element.textContent reads or sets its plain text content, while element.innerHTML reads or sets its HTML markup, allowing new elements to be inserted, though innerHTML should be used cautiously with any content that includes user input, since it can introduce cross-site scripting vulnerabilities if untrusted text is inserted directly as HTML.

Working with classes and attributes: element.classList provides add(), remove(), toggle(), and contains() methods for managing CSS classes, the standard way to change an element's appearance from JavaScript rather than directly manipulating its style property for anything beyond one-off inline adjustments. element.setAttribute() and element.getAttribute() read and write arbitrary HTML attributes, useful for things like aria-expanded when building accessible interactive components.

Traversal and timing: Once you have one element, properties like parentElement, children, and closest(selector) (which walks up the DOM tree to find the nearest matching ancestor) let you navigate relative to it without a fresh query. A common beginner mistake is running selection code before the DOM has finished parsing, placing script tags at the end of the body, or wrapping code in a DOMContentLoaded event listener, avoids selecting elements that do not exist yet.`,
  "vc-3-4": `Overview: **Events are how JavaScript responds to what a user does, clicking, typing, submitting a form, and forms are the primary way users send information into a page.** Together, event handling and form interaction are what turn a static page into something a user can actually interact with.

Adding event listeners: element.addEventListener("click", handlerFunction) is the standard way to respond to events, preferred over inline onclick attributes in HTML because it keeps behavior separate from markup and allows attaching multiple listeners to the same element. The handler function receives an event object as its argument, which carries useful information such as event.target (the exact element that triggered the event) and methods like event.preventDefault(), essential for stopping a form's default full-page-reload submission behavior.

Event delegation: Rather than attaching a listener to every individual item in a list, event delegation attaches a single listener to a shared parent element and checks event.target inside the handler to determine which child was actually interacted with. This is more efficient and, importantly, automatically works for elements added to the page later, a pattern that becomes especially relevant once you are rendering dynamic lists.

Common events: "click" for buttons and links, "input" for real-time changes as a user types into a text field, "change" for form controls like select and checkbox where the value updates once and on blur/selection rather than every keystroke, and "submit" on the <form> element itself, which should generally be paired with event.preventDefault() when you intend to handle the submission with JavaScript instead of a full page reload.

Reading form values: **Each form control exposes its current value through element.value (for text inputs and selects) or element.checked (for checkboxes and radio buttons).** A well-structured form pairs every <input> with a <label>, connected either by wrapping the input inside the label or by matching a label's for attribute to the input's id, which is both an accessibility requirement and a usability improvement, since clicking a label then focuses or toggles its associated input.

Basic validation: **Before relying entirely on JavaScript, native HTML attributes like required, type="email", minlength, and pattern provide built-in browser validation with no code at all.** JavaScript-based validation, checking values in a submit handler, becomes necessary for more complex rules like confirming two password fields match, and should always show clear, specific feedback about what needs to be corrected rather than a generic error.`,
  "vc-3-5": `Overview: **Arrays and objects are how JavaScript organizes collections of data, arrays for ordered lists, objects for structured records with named properties.** Nearly every piece of real data you will work with, a list of products, a user profile, a set of quiz answers, is represented as some combination of these two structures.

Array fundamentals: **An array, const colors = ["red", "green", "blue"], is an ordered list accessed by numeric index starting at 0.** Common mutating methods include push() and pop() (add/remove from the end) and splice() (insert or remove at any position), while methods like slice() and the spread operator [...array] create a new array without modifying the original, an important distinction when working with predictable state, especially once you reach React's state model in Module 4.

Array iteration methods: map() transforms every item in an array into a new array of the same length, the standard way to convert raw data into a list of values or UI elements. filter() returns a new array containing only the items that pass a test function, commonly used to remove items matching a condition. reduce() combines every item in an array down to a single value, such as a total or a grouped object, and is the most flexible but also the most complex of the three, worth learning after map and filter feel comfortable. forEach() runs a function for each item purely for side effects, like logging, and does not return a new array, unlike map.

Object fundamentals: An object, const user = { name: "Amina", age: 24 }, stores related values under named keys called properties, accessed with dot notation (user.name) or bracket notation (user["name"]), the latter necessary when the key is dynamic or stored in a variable. Object.keys(), Object.values(), and Object.entries() let you inspect and iterate over an object's structure programmatically.

Destructuring and the spread operator: Destructuring, const { name, age } = user; or const [first, second] = colors;, pulls values out of objects and arrays into standalone variables in one concise line, extremely common in modern JavaScript and in React component code. The spread operator, { ...user, age: 25 } or [...colors, "yellow"], creates a shallow copy with specific properties added or overridden, the standard pattern for updating data immutably rather than mutating the original object or array directly.

Why immutability matters going forward: Frameworks like React detect changes by comparing references, so directly mutating an array or object in place (like calling push() on state) often fails to trigger a re-render. Building the habit now of using map, filter, and spread to produce new arrays and objects instead of mutating existing ones pays off directly once state management begins.`,
  "vc-3-6": `Overview: **localStorage is a browser API that lets a website store data on the user's device that persists across page reloads and browser sessions, no backend server required.** It is the simplest way to add features like remembering a theme preference, saving a draft, or persisting quiz progress purely on the client side.

The core API: localStorage.setItem(key, value) saves a value under a string key, localStorage.getItem(key) retrieves it (returning null if the key does not exist), and localStorage.removeItem(key) deletes a single entry, while localStorage.clear() removes everything the site has stored. Data persists indefinitely until explicitly cleared by code or by the user through browser settings, unlike sessionStorage, which shares the same API but clears automatically when the browser tab closes.

Strings only, always: **localStorage can only store strings.** To save anything more structured, an object or array, you must convert it first with JSON.stringify(value) before saving, and convert it back with JSON.parse(storedValue) after retrieving it. Forgetting this conversion is the most common bug with localStorage, either saving "[object Object]" as a literal string, or crashing when trying to call array or object methods on a raw string that was never parsed back.

Handling missing or corrupted data: Because getItem returns null when a key has never been set, and because JSON.parse throws an error on invalid input, defensive code should check for null before parsing and wrap parsing in a try/catch block, falling back to a sensible default value (like an empty array) if anything goes wrong, rather than letting the whole page crash because of one bad stored value.

Limitations to know: localStorage has a storage limit, typically around 5 to 10 megabytes depending on the browser, sufficient for text-based data like preferences or progress but not for large files or images. It is also synchronous, meaning reading or writing blocks the main thread briefly, which matters only for very large amounts of data. Critically, localStorage is per-browser and per-device, not per-user-account, so it is not a substitute for a real backend when data needs to sync across a student's devices or survive a cleared browser cache, a limitation this course revisits directly in Module 6 when building real persistence with an API route.

A practical pattern: A common, safe pattern is a small pair of helper functions, saveProgress(key, data) that stringifies and saves, and loadProgress(key, fallback) that reads, parses defensively, and returns the fallback on any failure, so the rest of the application code never has to think about JSON conversion directly.`,
  "vc-3-7": `Overview: This checkpoint closes Module 3 by combining variables, functions, DOM selection, events, arrays/objects, and localStorage into one small interactive application, commonly a to-do list, quiz, or tracker. The goal is proving you can manage real, changing data in the browser reliably, not just wire up a single button click.

What a strong submission demonstrates: A strong JavaScript checkpoint keeps data as a single source of truth in an array or object, rather than reading values directly out of the DOM to determine state, and re-renders the visible list from that data whenever it changes, rather than manually adding or removing individual DOM nodes in scattered places. It uses const by default, arrow functions for handlers, and array methods (map, filter) instead of manual for loops where they fit naturally. Any data that should survive a page refresh is saved to localStorage with JSON.stringify and safely restored with a defensive JSON.parse.

Common mistakes to catch before submitting: **Reading and writing directly to the DOM as the only source of truth, which quickly becomes inconsistent once multiple actions can change the same data.** Forgetting event.preventDefault() on a form submit, causing an unwanted page reload. Mutating an array in place with push() or splice() when a fresh array from spread or filter would be safer and easier to reason about. Not handling the case where localStorage is empty on first visit, leaving the page broken until something has been saved once.

Self-review checklist: Trace one full user action, adding an item, for example, from the event listener through to the data update, through to the re-render, through to the localStorage save, and confirm each step actually happens in that order. Refresh the page after adding data and confirm it reappears exactly as expected. Try triggering the same action rapidly or with empty/invalid input, and confirm nothing crashes or silently corrupts the stored data.

How this connects forward: This exact pattern, data as the source of truth, a render function driven by that data, and events that update the data rather than the DOM directly, is precisely the mental model React formalizes with state and JSX starting in Module 4. Getting comfortable with it here in plain JavaScript makes React's approach feel like a natural next step rather than an entirely new way of thinking.`,
  "vc-4-1": `Overview: **React is a JavaScript library for building user interfaces out of components, small, reusable pieces of UI that manage their own logic and rendering.** This lesson is about the mental shift from the DOM manipulation you practiced in Module 3, where you directly find and change elements, to React's declarative model, where you describe what the UI should look like for a given state, and React figures out how to update the actual DOM to match.

Declarative versus imperative: **In vanilla JavaScript, you write imperative instructions: select this element, then change its class, then update its text.** In React, you write declarative descriptions: given this piece of state, render this UI. When the state changes, you do not manually update the DOM at all, you simply describe the new UI for the new state, and React calculates the minimal set of actual DOM changes needed and applies them. This shift removes an entire category of bugs where the DOM and your data quietly drift out of sync.

JSX: **React components are typically written using JSX, a syntax extension that looks like HTML embedded directly inside JavaScript, for example return <h1>Hello, {name}</h1>;.** JSX is not a string or real HTML, it compiles down to function calls that create React elements, and any JavaScript expression can be embedded inside curly braces {}. Because JSX is JavaScript, a few names differ from HTML: className instead of class (since class is a reserved JavaScript word), and event handlers are camelCase, like onClick instead of onclick.

Components as functions: A React component is, at its core, just a JavaScript function that returns JSX describing some UI, and by convention its name starts with a capital letter so React can distinguish it from a regular HTML tag. Components can be composed, nested inside one another, which is how complex interfaces are built from small, focused, reusable pieces rather than one massive template.

The virtual DOM, briefly: React keeps an in-memory representation of the UI, often called the virtual DOM, and when state changes, it compares the new description to the previous one and updates only the real DOM nodes that actually changed, rather than re-rendering the entire page. You do not need to manage this process directly, but understanding that it exists explains why React can be both declarative and performant at the same time.

Why this mental model matters: Every concept in the rest of this module, props, state, rendering lists, forms, builds directly on top of this shift: stop thinking about which DOM nodes to change, and start thinking about what the UI should look like as a function of your data.`,
  "vc-4-2": `Overview: Components and props are how React lets you build one reusable piece of UI and configure it differently each time it is used, exactly the way an HTML <img> tag accepts different src and alt values. This lesson is about designing components that are genuinely reusable rather than one-off copies with slightly different hardcoded text.

What props are: **Props (short for properties) are how a parent component passes data down into a child component, similar to how HTML attributes configure an element.** A component receives its props as a single object argument, function Card(props) { return <h2>{props.title}</h2>; }, or more commonly destructured directly in the function signature, function Card({ title, description }) { ... }, which is the standard modern style since it makes exactly which props a component expects immediately visible.

Using a component with props: A component is used in JSX like an HTML tag, <Card title="Web Foundations" description="Learn HTML and CSS" />, with each attribute becoming a key on the props object inside the component. Any JavaScript value can be passed as a prop, including numbers, arrays, objects, and even functions, passing a function down as a prop is the standard way a child component notifies its parent that something happened, covered further in the next lesson on state and events.

Props are read-only: A component must never modify its own props directly, props flow one way, from parent to child, and treating them as read-only is what keeps data flow predictable in a React application. If a component needs to change a value over time, that value belongs in state, not in a prop it receives, which is exactly the distinction the next lesson builds on.

The children prop: **Every component automatically receives a special children prop representing whatever JSX was nested between its opening and closing tags, <Card>{someContent}</Card>.** This is what makes wrapper components, like a reusable Modal, Panel, or Layout component, possible, since the wrapper does not need to know in advance what content it will contain.

Default values and prop validation: Destructured props can specify default values directly in the function signature, function Button({ variant = "primary" }) { ... }, so a sensible fallback applies when a prop is omitted. In TypeScript, which this course's Next.js modules build toward, prop types are explicitly declared, catching an entire category of bugs, like a missing or mistyped prop, before the code ever runs in the browser.

Designing reusable components: A good component asks for exactly the data it needs through props and nothing more, avoids hardcoding text or values that vary between uses, and stays focused on one clear responsibility, the same single-responsibility instinct that makes functions in Module 3 easier to test and reuse.`,
  "vc-4-3": `Overview: **State is data that a component manages internally and that can change over time, and events are how user interaction triggers those changes.** Together, state and events are what make a React component interactive rather than a static description of UI, and the useState hook is the primary tool for managing that internal data.

The useState hook: **const [count, setCount] = useState(0); creates a piece of state, count, initialized to 0, and a function, setCount, used to update it.** Calling the setter function does two things: it updates the stored value, and it tells React to re-render the component (and its children) with the new value, this is what actually causes the UI to change on screen, simply reassigning a normal variable would not. State is scoped to the component instance that created it, so two instances of the same component each maintain entirely independent state.

Handling events in JSX: Event handlers are passed as props using camelCase names like onClick, onChange, and onSubmit, and crucially you pass a reference to a function, onClick={handleClick}, not the result of calling it, onClick={handleClick()} would call the function immediately during render instead of waiting for the click. Inline arrow functions, onClick={() => setCount(count + 1)}, are common for short handlers, especially ones that need to pass an argument.

Updating state correctly: When a new state value depends on the previous one, React recommends the functional updater form, setCount(prevCount => prevCount + 1), rather than setCount(count + 1), because state updates can be batched and asynchronous, so referencing the current count variable directly can sometimes use a stale value, while the updater function always receives the true latest state. This matters especially when multiple updates happen close together, such as in rapid clicks or multiple state updates in one handler.

State is not mutated directly: Just as with plain JavaScript arrays and objects in Module 3, state that is an object or array must be updated by creating a new copy with the spread operator and passing that new value to the setter, never by mutating the existing state object or array in place, since React determines whether to re-render by comparing references, and a mutated object still has the same reference.

Why this replaces manual DOM updates: Where Module 3 taught you to manually find an element and update its text after a click, React's model is to update state and let the component's return statement (its JSX) describe what the new UI should look like for that state, React then handles applying the actual DOM changes, which is the declarative shift introduced in the first lesson of this module made concrete.`,
  "vc-4-4": `Overview: **Rendering lists is how React turns an array of data into repeated pieces of UI, a list of products, a set of quiz questions, a table of results.** This lesson focuses on doing it correctly, particularly around the key prop, since getting keys wrong is one of the most common sources of subtle React bugs.

Mapping data to JSX: The standard pattern for rendering a list is calling map() on an array of data and returning a piece of JSX for each item, {items.map(item => <li key={item.id}>{item.name}</li>)}, placed directly inside the surrounding JSX, usually wrapped in a <ul> or similar container. This is a direct continuation of the array methods covered in Module 3, applied specifically to producing UI elements instead of transformed data.

Why the key prop matters: Every element produced inside a list render needs a unique key prop, and React uses these keys behind the scenes to match elements between renders, so it can correctly determine which items were added, removed, or reordered rather than re-rendering the entire list from scratch. Without a stable, unique key, React can misattribute state between list items, for example an input's typed text jumping to the wrong row after the list is reordered or filtered.

Choosing a good key: A key should be a stable, unique identifier for that specific piece of data, ideally an ID that already exists in the data itself, like item.id from a database or generated when the item was created. Using the array index as a key, key={index}, works only when the list is static and never reordered, filtered, or has items inserted or removed, in any other case it can cause the exact state-mismatch bugs described above, so it should be treated as a last resort, not a default habit.

Rendering conditionally within a list: It is common to filter data before mapping it, {items.filter(item => item.completed).map(item => ...)}, chaining array methods exactly as in vanilla JavaScript, keeping the transformation logic close to the render rather than scattered across the component.

Empty and loading states: A list render should always account for the case where the array is empty, showing a clear message like "No items yet" rather than silently rendering nothing, which from a user's perspective is indistinguishable from a broken page. This habit becomes especially important once list data comes from an API in Module 6, where empty results, loading states, and errors are all real, common outcomes a component must handle gracefully.`,
  "vc-4-5": `Overview: Forms in React work differently from plain HTML forms because React typically keeps form input values in state rather than letting the DOM manage them independently, a pattern called controlled components. This lesson covers how to build forms where React state is always the single source of truth for what the user has typed or selected.

Controlled inputs: A controlled input has its value prop set from state and an onChange handler that updates that state on every keystroke, <input value={email} onChange={e => setEmail(e.target.value)} />. This means the input's displayed value always reflects React state exactly, rather than the browser's internal, independent input state, which is what makes it possible to validate, transform, or react to input changes in real time, disabling a submit button until a field is valid, for example.

Handling multiple fields efficiently: Rather than a separate useState call and onChange handler for every single field, a common pattern for forms with many fields is a single state object, const [form, setForm] = useState({ name: "", email: "" }), updated with one generic handler that uses the input's name attribute to know which field changed, setForm(prev => ({ ...prev, [e.target.name]: e.target.value })), using the spread operator to preserve the other fields while updating only the one that changed.

Handling submission: The form's onSubmit handler should call event.preventDefault() first, exactly as in vanilla JavaScript, to stop the browser's default full-page reload, and then work with the current state values directly, since they are already up to date thanks to the controlled input pattern, no need to read values back out of the DOM at submission time the way Module 3's vanilla JavaScript forms required.

Validation and feedback: Validation logic, checking that a field is filled in, an email looks valid, or two password fields match, typically runs either on every change for real-time feedback or specifically inside the submit handler before proceeding, with error messages stored in their own piece of state and rendered conditionally next to the relevant field, keeping the user informed about exactly what needs fixing rather than a single generic error banner.

Uncontrolled inputs, briefly: React also supports uncontrolled inputs, where the DOM manages the value directly and you read it only when needed via a ref, useful for simple cases like an uncontrolled file input or when integrating with non-React code, but controlled inputs remain the standard default for most application forms because of the predictability of having state as the single source of truth.`,
  "vc-4-6": `Overview: Component styling in React covers the practical choices for applying CSS to components, from plain stylesheets to CSS Modules to conditional class logic, and choosing an approach that scales as an application grows beyond a handful of components. This lesson focuses on the tradeoffs so you can choose deliberately rather than by habit.

Plain CSS and imports: The simplest approach is a regular CSS file imported directly into a component file, import "./Card.css";, with class names applied via className exactly as covered in the first lesson of this module. This works well for small projects but risks class name collisions as an application grows, since all imported CSS is effectively global by default.

CSS Modules: A CSS Module, a file named with the .module.css suffix, automatically scopes every class name to the specific component that imports it, avoiding naming collisions entirely without any special naming convention discipline required from the developer. You import it as an object, import styles from "./Card.module.css";, and apply classes via that object, className={styles.card}, which is a standard, low-overhead approach that this course's Next.js modules build on directly, since Next.js supports CSS Modules out of the box with zero extra configuration.

Conditional and dynamic classes: Applying a class conditionally, such as an "active" state on a nav link or an "error" state on an input, is commonly done with a template literal, className={\`input \${hasError ? "input-error" : ""}\`}, or more cleanly with a small utility function or library that joins class names together and filters out any falsy values, avoiding a mess of nested ternary expressions as the number of conditions grows.

Inline styles and when to use them: The style prop accepts a JavaScript object with camelCased CSS properties, style={{ backgroundColor: color }}, useful specifically for values computed at runtime that cannot be expressed as a predefined CSS class, like a dynamic width based on data. Inline styles should stay the exception rather than the default, since they cannot use pseudo-classes like :hover, cannot use media queries, and bypass the cascade entirely.

Utility-first and component libraries, briefly: Many production React and Next.js projects adopt a utility-first CSS approach (applying many small, single-purpose classes directly in JSX) or a component library with pre-built, accessible components, both valid choices at scale, but understanding plain CSS, CSS Modules, and conditional class logic first gives you the foundation to evaluate those tools rather than depending on them blindly.`,
  "vc-4-7": `Overview: This checkpoint closes Module 4 by combining components, props, state, list rendering, forms, and styling into one small, complete React application, commonly a task manager, quiz, or interactive tracker with multiple connected components. The goal is demonstrating component design judgment: knowing what belongs in state, what belongs in props, and how components should be split.

What a strong submission demonstrates: A strong React checkpoint has state lifted to the appropriate level, living in the closest common parent of every component that needs to read or update it, rather than duplicated across siblings or held unnecessarily high. Components are split by responsibility, a list component that only renders items it receives as props, an item component that receives data and callback functions rather than reaching into shared state directly, and a form component that manages its own local input state until submission. Every rendered list uses a real, stable key, and every input is a controlled component backed by state.

Common mistakes to catch before submitting: **Mutating an array or object in state directly instead of using spread to create a new one, which can cause the UI to silently fail to update.** Using array index as a key on a list that can be reordered, filtered, or have items removed. Forgetting event.preventDefault() on form submission. Passing too many unrelated props into one component instead of splitting it, a sign a component is doing more than one job.

Self-review checklist: **Pick one piece of state and trace it: where it is declared, which components receive it as a prop, and which event handler ultimately calls its setter.** Confirm that filtering, sorting, or adding items in the list does not cause any input's typed value to jump to the wrong row, a direct test of whether keys are set correctly. Check that removing all items shows a clear empty state rather than a blank area.

How this connects forward: The component-thinking practiced here, breaking an interface into focused pieces connected by props and state, is exactly the architecture Next.js builds on top of starting in Module 5, where components become pages and layouts within a real file-based routing system, and this same discipline about where state lives becomes even more important once server and client components are both in play.`,
  "vc-5-1": `Overview: **Next.js is a React framework that adds file-based routing, built-in performance optimizations, and both server-side and client-side rendering in one coherent system.** This course uses the App Router (the app/ directory, current since Next.js 13 and the standard approach going forward), not the older Pages Router, so the file conventions and rendering model covered here reflect how production Next.js apps are actually built today.

File-based routing: **Inside the app/ directory, folders define URL segments, and a page.tsx file inside a folder makes that segment a publicly visitable route.** For example, app/about/page.tsx becomes the route /about, with no separate router configuration file needed, the file system itself is the route map. Dynamic segments use square brackets, app/blog/[slug]/page.tsx matches any URL like /blog/my-first-post, with the actual value available to the page through its params.

Server components by default: **In the App Router, every component is a React Server Component unless explicitly marked otherwise.** Server components render on the server and send only the resulting HTML (plus minimal necessary JavaScript) to the browser, which means they can directly access server-only resources like databases or file systems, and they do not increase the JavaScript bundle sent to the client. This is a meaningful shift from the plain React you learned in Module 4, where every component ran in the browser.

Opting into client components: Adding the directive "use client" at the very top of a file marks that component and everything it imports as a client component, meaning it renders in the browser and can use interactive features like useState, useEffect, and event handlers, exactly as in Module 4. The practical rule of thumb is to keep components as server components by default and only add "use client" where interactivity is genuinely needed, keeping the JavaScript sent to the browser as small as possible.

Special files with reserved meaning: Beyond page.tsx, the App Router recognizes several other reserved filenames per folder: layout.tsx wraps a segment and its children with shared UI that persists across navigation, loading.tsx automatically shows while that segment's data is being fetched, and error.tsx catches runtime errors in that segment, all covered in more depth in upcoming lessons this module.

Why this matters for real projects: This file-based, server-first model means routing, data fetching, and rendering strategy are decided largely by where you put a file and whether you add "use client", rather than through separate routing libraries or manual server setup, which is a large part of why Next.js has become the default choice for production React applications.`,
  "vc-5-2": `Overview: Pages and layouts are the building blocks of a Next.js App Router site's structure, pages define the unique content at a route, while layouts define shared UI, like a nav bar or footer, that wraps multiple pages without re-rendering on every navigation. Understanding how they nest is essential for building multi-page sites without duplicating shared UI everywhere.

The root layout: Every Next.js App Router project requires a root layout at app/layout.tsx, and unlike every other layout, it must render the <html> and <body> tags itself, since it is the outermost wrapper for the entire application. It receives a children prop representing whatever page or nested layout is being rendered for the current route, export default function RootLayout({ children }) { return <html><body>{children}</body></html>; }.

Nested layouts: **Any folder can contain its own layout.tsx, which wraps only the pages within that folder and its subfolders, nesting inside any parent layouts above it.** This is how a section of a site, a dashboard area, for example, can have its own persistent sidebar navigation that stays mounted (preserving its scroll position and internal state) as a user navigates between pages within that section, without affecting the rest of the site.

How pages and layouts compose: When a user visits a route, Next.js renders every layout.tsx from the root down to that route's folder, each nesting inside the one above it, with the matching page.tsx rendered innermost as the final children. This composition happens automatically based purely on folder structure, there is no separate configuration describing which layout applies to which page.

Route groups: Wrapping a folder name in parentheses, like (marketing) or (dashboard), creates a route group that organizes routes and can apply a layout to a set of pages, without that folder name appearing in the actual URL. This is useful for applying different layouts to different sections of a site, a marketing section with one layout and an authenticated dashboard section with a completely different one, while keeping the project's file structure organized by purpose.

Why this structure matters: Because layouts persist across navigations within their scope rather than fully remounting, this model is naturally efficient, a shared nav bar or sidebar does not re-fetch or re-animate on every page change, and it keeps shared UI defined in exactly one place instead of duplicated at the top of every individual page component, the same DRY discipline that made reusable React components valuable in Module 4.`,
  "vc-5-3": `Overview: Links and navigation in Next.js use a dedicated component and hooks that integrate with the App Router's routing system, enabling fast client-side transitions between pages instead of full page reloads. Using these correctly is what makes a Next.js site feel instantaneous compared to a traditional multi-page website.

The Link component: next/link's Link component replaces the plain HTML <a> tag for internal navigation, <Link href="/about">About</Link>, and Next.js automatically prefetches the linked page's code in the background when the link enters the viewport (in production builds), so that when the user actually clicks, the navigation feels instant because the necessary resources are often already loaded. Using a plain <a> tag for internal links still works but forces a full page reload, losing this prefetching and the smoother client-side transition.

Programmatic navigation: For navigation triggered by code rather than a direct click, such as redirecting after a successful form submission, the useRouter hook from next/navigation provides a router.push("/success") method inside a client component. This hook is specific to the App Router, imported from next/navigation rather than the older next/router used by the Pages Router, an important distinction to get right since mixing them up is a common source of import errors.

Active link styling: Highlighting the current page's link in a nav bar requires knowing the current route, which the usePathname hook from next/navigation provides inside a client component, const pathname = usePathname();, then comparing it to each link's href to conditionally apply an active class or an aria-current="page" attribute, directly building on the accessible navigation patterns from Module 2.

Dynamic route links: When linking to a dynamic route, such as a blog post, the href is built with a template literal incorporating the actual value, <Link href={\`/blog/\${post.slug}\`}>{post.title}</Link>, matching whatever dynamic segment pattern (like [slug]) was defined in the folder structure for that route.

Why this matters for perceived performance: Because Link-based navigation only swaps the parts of the page that actually changed rather than reloading the entire document, shared layout components like a nav bar or footer are not re-fetched or remounted on every navigation, which is a major part of why well-built Next.js sites feel notably faster to navigate than traditional server-rendered multi-page sites, without sacrificing the SEO and initial-load benefits of server rendering.`,
  "vc-5-4": `Overview: Next.js provides a dedicated Image component and a conventions-based system for static assets that together handle a large share of real-world performance work automatically, work that would otherwise require manual, error-prone optimization in a plain HTML or React project.

The Image component: next/image's Image component, <Image src="/hero.jpg" alt="Students collaborating" width={800} height={600} />, automatically serves appropriately sized images for the requesting device, converts to modern efficient formats like WebP where supported, lazy-loads images that are off-screen by default, and prevents layout shift by reserving the correct space before the image finishes loading, since width and height (or a fill layout with a sized parent) are required. The alt attribute remains required and just as important as in plain HTML, Next.js optimizes delivery, it does not replace the accessibility responsibility from Module 1.

Local versus remote images: **Images imported directly from the project's local files, import heroImg from "./hero.jrg";, let Next.js automatically determine width and height from the file itself.** Images loaded from an external URL require width and height to be specified manually, and the external domain must be explicitly allowed in the project's Next.js configuration file for security reasons, an intentional safeguard against serving arbitrary external images through the optimization pipeline without the developer's awareness.

The public folder: Static assets that need a stable, predictable URL, favicons, downloadable files, or images referenced outside the Image component, live in the top-level public/ folder and are served from the root URL path, a file at public/logo.png is accessible at /logo.png, no import statement or build step needed.

Fonts: Next.js includes a font optimization system, next/font, that self-hosts and preloads fonts (including Google Fonts) automatically, avoiding the layout shift and the external network request that a traditional <link> to a font CDN would cause, and it works by importing and configuring a font directly in code rather than adding a stylesheet link tag.

Why this matters for real projects: Unoptimized images are consistently one of the largest contributors to slow page loads, and Next.js's built-in Image and font handling means a well-structured Next.js project gets a meaningful share of performance best practices essentially for free, work this course revisits directly in Module 7's performance and polish lessons.`,
  "vc-5-5": `Overview: Loading and error states are first-class, automatic concepts in the App Router, rather than something you must manually wire up with conditional state in every single component. This lesson covers loading.tsx and error.tsx, the reserved files that let Next.js handle these states for you at the routing level.

Automatic loading UI: A loading.tsx file placed in a route folder is automatically shown while that segment (and anything it depends on for data) is loading, and Next.js implements this by automatically wrapping the corresponding page in a React Suspense boundary behind the scenes, you do not write the Suspense boundary yourself. A simple loading.tsx typically exports a component rendering a skeleton screen or a spinner, export default function Loading() { return <p>Loading...</p>; }, and Next.js swaps it in and out automatically as navigation occurs, without any manual isLoading state in the page component itself.

Automatic error boundaries: An error.tsx file placed in a route folder automatically catches runtime errors thrown anywhere within that segment during rendering, and displays a fallback UI instead of crashing the whole application. Because error.tsx relies on React error boundary behavior under the hood, it must be a client component, requiring the "use client" directive at the top of the file, one of the few places the App Router requires this by convention rather than by your own choice about interactivity.

The error component's props: A component in error.tsx automatically receives an error object describing what went wrong, and a reset function that attempts to re-render the segment again, commonly wired to a "Try again" button, export default function Error({ error, reset }) { return <button onClick={() => reset()}>Try again</button>; }, giving users a way to recover from a transient failure, like a failed network request, without a full page reload.

Scoping loading and error states: Because these files apply per route segment, different parts of a site can have entirely independent loading and error handling, a slow-loading dashboard widget shows its own loading.tsx without blocking or affecting the rest of the page, and an error in one nested section is caught locally by the nearest error.tsx rather than crashing unrelated sibling content.

Why this matters: This built-in, file-based approach to loading and error states removes a large amount of repetitive isLoading and try/catch boilerplate that a plain React or vanilla JavaScript project would need to hand-write for every single data-dependent section, while still producing genuinely good user experience for the two most common real-world states beyond the happy path.`,
  "vc-5-6": `Overview: Metadata and SEO in the App Router are handled through a typed, code-based system rather than manually writing <meta> tags by hand in a document head, making titles, descriptions, and social preview tags consistent and far less error-prone across a whole site.

Static metadata: Any page.tsx or layout.tsx can export a metadata object, export const metadata = { title: "About Us", description: "Learn about our program" };, and Next.js automatically injects the corresponding tags into the rendered page's <head>. Metadata exported from a layout applies to every page nested beneath it unless a more specific page overrides individual fields, following the same nesting logic as layouts themselves.

Dynamic metadata: When a page's title or description depends on data that is not known until runtime, such as a specific blog post's title, the page exports an async generateMetadata function instead of a static object, export async function generateMetadata({ params }) { const post = await getPost(params.slug); return { title: post.title }; }, which runs on the server before the page renders and can fetch whatever data it needs to build accurate, unique metadata per route.

Title templates: A layout can define a title as an object with a template string, title: { template: "%s | My Course", default: "My Course" }, so that any page beneath it only needs to provide its own specific title, and Next.js automatically combines it into the full pattern, keeping consistent branding across every page's browser tab title without repeating it manually everywhere.

Open Graph and social sharing: The metadata object also supports an openGraph field for controlling how a page appears when shared on social platforms and messaging apps, including a title, description, and preview image, directly affecting whether a shared link looks professional and clickable versus generic and blank when pasted into WhatsApp or another platform.

Why structured metadata matters: Search engines and social platforms read this information to decide how to display a page in results and in shared previews, so metadata is not decoration, it directly affects whether a project gets discovered and clicked. Handling it through this typed, code-based system, rather than scattered manual head tags, also makes it far easier to audit an entire site's metadata for consistency and to avoid duplicate or missing titles, a common real-world SEO problem.`,
  "vc-5-7": `Overview: This checkpoint closes Module 5 by combining routing, layouts, navigation, images, loading/error states, and metadata into one small, multi-page Next.js App Router application. The goal is demonstrating that you understand how Next.js's file-based conventions replace manual configuration, not just that you can copy files into the right folders.

What a strong submission demonstrates: A strong Next.js checkpoint has a real root layout with shared navigation built using the Link component (not plain <a> tags for internal routes), at least one dynamic route using a bracketed segment, a loading.tsx and error.tsx covering at least one route that fetches or depends on data, images served through the Image component with meaningful alt text, and metadata, static or dynamic via generateMetadata, set on every page rather than left to Next.js's bare defaults.

Common mistakes to catch before submitting: **Using plain <a> tags for internal navigation, losing prefetching and client-side transitions.** Forgetting "use client" on error.tsx, which will fail since error boundaries require it. Putting page-specific UI inside the root layout instead of the actual page component, which then incorrectly persists across unrelated routes. Leaving default, generic metadata (or none at all) on pages that should have specific, descriptive titles.

Self-review checklist: **Click through every internal link and confirm navigation feels instant, without a visible full-page reload flash.** Temporarily throttle the network in DevTools to confirm loading.tsx actually appears during a slow load rather than only in theory. Intentionally trigger an error (like requesting nonexistent data) to confirm error.tsx catches it gracefully with a working reset action. Check each page's browser tab title to confirm metadata is unique and descriptive per page, not identical everywhere.

How this connects forward: Everything in this module assumes data eventually comes from somewhere real, an API, a database, a form submission, which is exactly what Module 6 builds on top of this same file-based structure: API routes live alongside pages in the same app/ directory, and the loading and error patterns from this module become directly relevant once real network requests, which can genuinely be slow or fail, are involved.`,
  "vc-6-1": `Overview: **HTTP and JSON are the two foundations of how modern web applications exchange data with servers and APIs.** Understanding them precisely, not just vaguely, is what makes the difference between confidently debugging a failed request and guessing randomly when something does not work.

HTTP methods and their intent: **GET requests retrieve data and should never change anything on the server, making them safe to retry or cache.** POST requests submit new data, typically creating something. PUT and PATCH update existing data, with PUT conventionally replacing a full resource and PATCH updating only specific fields. DELETE removes data. Using the semantically correct method, rather than defaulting to GET or POST for everything, matters both for clarity and because browsers, proxies, and caching systems all behave differently depending on the method used.

Status codes as a first debugging signal: Status codes are grouped by their first digit: 2xx means success (200 OK, 201 Created), 3xx means redirection, 4xx means the client made a mistake (400 Bad Request for malformed data, 401 Unauthorized for missing authentication, 403 Forbidden for insufficient permission, 404 Not Found for a missing resource), and 5xx means the server itself failed (500 Internal Server Error). Checking the status code first, before reading any response body, immediately narrows down whether a bug is in the request being sent or in how the server processed it.

Headers: **Headers carry metadata about a request or response separate from the actual body content.** The Content-Type header tells the receiving side what format the body is in, commonly application/json for API data, and must be set correctly on requests that send a JSON body or the server may fail to parse it. Authorization headers carry credentials like an API token, a pattern this course uses when connecting to real backend services.

JSON as the standard data format: JSON (JavaScript Object Notation) represents structured data as text using a syntax that closely mirrors JavaScript objects and arrays, but with stricter rules: keys must be double-quoted strings, trailing commas are not allowed, and values are limited to strings, numbers, booleans, null, objects, and arrays, functions and undefined have no JSON representation. JSON.stringify() converts a JavaScript value into a JSON string, and JSON.parse() converts a JSON string back into a JavaScript value, the same two functions used with localStorage in Module 3, now applied to network requests and responses instead.

Why this grounding matters before fetching data: Module 6 is entirely about connecting interfaces to real data, and every fetch call, every API route, and every error you will encounter from here forward is expressed in exactly these terms: a method, a status code, headers, and a JSON body, making this lesson's vocabulary the basis for reading any error message you will hit for the rest of the course.`,
  "vc-6-2": `Overview: Fetching data is how a page requests information from a server or API after it has already loaded, the mechanism behind everything from loading a list of posts to checking a login status. This lesson covers the fetch() API and how to fetch data correctly inside React and Next.js components.

The fetch API: **fetch(url) sends an HTTP GET request by default and returns a Promise that resolves to a Response object.** Critically, that Promise resolves successfully even for error responses like a 404 or 500, fetch only rejects on a network-level failure (like being offline), so checking response.ok (true only for 2xx status codes) is required before trusting the response, a common source of bugs when developers assume a resolved fetch always means success. Calling response.json() reads and parses the body as JSON, itself returning another Promise, so a typical pattern chains two awaits: const response = await fetch(url); const data = await response.json();.

Async/await syntax: Modern JavaScript and React code almost always uses async/await rather than .then() chains for readability, an async function can use the await keyword to pause execution until a Promise resolves, while the rest of the code (and the rest of the page) continues running normally, this is non-blocking. Any function using await must itself be declared async, and errors from a rejected Promise are caught with a standard try/catch block wrapped around the await calls.

Fetching in Server Components: In the App Router, a server component (the default, as covered in Module 5) can be declared async directly and await a fetch call right in the component body, with the resulting data available immediately in the JSX returned, no useEffect or loading state management needed for this case, since the component only renders once the data is ready, on the server.

Fetching in Client Components: **A client component (marked "use client") that needs data cannot simply await inside its function body outside of an effect, since components must render synchronously.** The standard pattern is the useEffect hook: fetch data inside an effect that runs after the component mounts, store the result in state via useState, and track loading and error states explicitly, since here, unlike a server component, the component renders first (in a loading state) and then updates once the fetch completes.

Choosing where to fetch: The general rule this course follows is to fetch data in server components whenever possible, since it avoids shipping fetching logic and loading states to the client entirely, and reach for client-side fetching with useEffect specifically when data depends on user interaction after the page has already loaded, like a search box that fetches results as the user types.`,
  "vc-6-3": `Overview: API routes let a Next.js application define its own backend endpoints directly inside the same project, no separate server needed, using the App Router's route.ts convention. This is where a project stops only consuming external data and starts controlling its own server-side logic.

Defining a route handler: A file named route.ts (or route.js) inside an app/ folder defines an API endpoint at that folder's path, for example app/api/courses/route.ts creates an endpoint at /api/courses. Inside it, you export an async function named after the HTTP method it should handle, export async function GET(request) { ... } for GET requests, export async function POST(request) { ... } for POST requests, and so on, each function receives the incoming Request object and must return a Response.

Returning JSON responses: Next.js provides a NextResponse helper (from next/server) with a convenient json() method, return NextResponse.json({ courses }); automatically sets the correct Content-Type header and serializes the data to JSON, and it accepts a second argument for setting a custom status code, NextResponse.json({ error: "Not found" }, { status: 404 }), matching the status code vocabulary from the HTTP lesson earlier in this module.

Reading the incoming request: For a POST or PUT request, the request body is read with await request.json(), returning the parsed data sent by the client, mirroring how the client side parses a fetch response. Query string parameters on a GET request are read via the URL, const { searchParams } = new URL(request.url); const query = searchParams.get("search");, giving access to values like /api/courses?search=react.

Dynamic API routes: Exactly like page routes, a folder named with brackets, app/api/courses/[id]/route.ts, creates a dynamic endpoint where the value is available through the function's params, allowing routes like /api/courses/vc-5-1 to look up and return one specific item rather than the whole collection.

Why this matters architecturally: API routes mean a Next.js project can own its own backend logic, talking to a database, validating input, checking authentication, entirely within the same codebase and deployment as the frontend, which is a major part of why Next.js is described as a full-stack framework rather than only a frontend tool, and it sets up directly for the form submission and validation work in the next two lessons.`,
  "vc-6-4": `Overview: Form submission connects the controlled forms built in Module 4 to a real backend, sending user input to an API route and handling the result, success or failure, in the interface. This lesson focuses on the full round trip: client state, a network request, a server response, and updating the UI accordingly.

Submitting form data with fetch: Inside a form's onSubmit handler (after event.preventDefault(), as covered in Module 4), the standard pattern sends the current form state as a JSON body: fetch("/api/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });. Setting the Content-Type header explicitly matters, without it the receiving API route may not correctly parse the incoming JSON body.

Tracking submission state: A well-built form tracks more than just its field values, it also tracks whether a submission is currently in progress (commonly a boolean isSubmitting state), disabling the submit button and showing a loading indicator while waiting, which prevents a user from accidentally submitting the same form multiple times by clicking repeatedly before the first request finishes.

Handling the response: After the fetch resolves, checking response.ok determines whether to show a success state (clearing the form, showing a confirmation message, or redirecting via useRouter from Module 5) or an error state (showing what went wrong, parsed from the response body, which a well-built API route returns as a JSON object with a clear message field). Wrapping the entire request in a try/catch also handles genuine network failures, like the user losing internet connectivity mid-submission, separately from a server-returned error response.

Optimistic versus pessimistic updates: **A pessimistic update waits for the server's confirmed response before updating the UI, simpler and safer, the standard default for this course.** An optimistic update immediately updates the UI as if the request will succeed, then rolls back if it actually fails, which can feel faster to the user but adds real complexity in handling the rollback case correctly, worth knowing exists but not necessary for every form.

Server Actions, briefly: Next.js also supports Server Actions, async functions marked with "use server" that can be called directly from a form's action prop without manually writing a fetch call or a separate API route, a newer pattern worth being aware of, though this course's API route approach makes the client-server request cycle explicit and is more directly transferable to working with any backend, not just a Next.js one.`,
  "vc-6-5": `Overview: Validation and error handling are what separate a form or API that works in the happy-path demo from one that survives real users, who will submit empty fields, malformed data, and unexpected input constantly. This lesson covers validating on both the client and the server, and returning errors that are actually useful.

Why client-side validation is not enough: Client-side validation (native HTML attributes from Module 3, or JavaScript checks before submission) gives immediate, friendly feedback and reduces unnecessary network requests, but it can always be bypassed, by disabling JavaScript, or by any request sent directly to the API without going through your form at all. Because of this, every API route must independently validate incoming data on the server, treating client-side validation purely as a user experience improvement, never as a security or data-integrity guarantee.

Validating on the server: Inside an API route's handler, after reading the request body with request.json(), each required field should be checked explicitly: is it present, is it the correct type, does it meet length or format constraints, before any further processing happens. If validation fails, the route should return early with a 400 Bad Request status and a clear JSON error message describing exactly what was invalid, rather than allowing bad data to reach a database or crashing with an unrelated error further down the code.

Structuring error responses: A consistent error response shape across every API route in a project, commonly { error: "message" } or { errors: { field: "message" } } for field-specific validation, makes it possible for the client-side code to handle errors predictably in one place rather than needing custom parsing logic for every single endpoint.

Handling unexpected server errors: Beyond validation, an API route should wrap its core logic in a try/catch to handle genuinely unexpected failures, a database being unreachable, for example, returning a generic 500 status with a safe, non-technical message to the client, while logging the actual detailed error on the server for debugging, never exposing raw stack traces or internal error details directly to the client, which can leak sensitive implementation details.

Surfacing errors to the user: On the client, a caught error or a non-ok response should update a piece of error state that the form or page renders as a clear, specific, human-readable message near the relevant field or action, echoing the same principle from Module 4's form validation lesson, generic messages like "Something went wrong" should be the fallback, not the default, whenever a more specific message is available.`,
  "vc-6-6": `Overview: **Saving user progress means persisting data tied to a specific user reliably, a step beyond Module 3's localStorage, which only lives in one browser on one device.** This lesson covers the shift to server-backed persistence and why it matters for anything meant to scale beyond a single-device demo.

Why localStorage is not enough for real progress: localStorage is scoped to one browser on one device, so a student's progress saved on a phone will not appear when they log in on a laptop, and clearing browser data or switching devices silently loses everything. Real user progress, course completion, quiz scores, saved work, needs to live on a server, typically in a database, associated with that specific user's account, and retrieved through an API route whenever needed.

The save pattern: Saving progress typically follows the same form-submission pattern from earlier in this module: the client sends a POST or PATCH request to an API route with the relevant data (which lesson was completed, what score was achieved), the API route validates that data and the user's identity, then writes it to the database, and returns a confirmation, at which point the client can update its own local state to reflect the save succeeded.

Avoiding lost progress under load: A system built for one student saving progress occasionally behaves very differently once many students are saving simultaneously, at scale, writes should be designed to avoid silently overwriting one field's update with another's, for example updating only the specific lesson marked complete rather than replacing an entire progress record, and any save operation that fails should be retried or clearly surfaced as an error rather than silently dropped, since a student believing their progress was saved when it was not is a serious, trust-breaking failure.

Optimizing for perceived speed without losing reliability: Rather than freezing the interface while every single small save happens, well-built systems often debounce frequent updates (waiting for a short pause in activity before sending a save) or show a lightweight, non-blocking "saving..." indicator, so the interface stays responsive without giving up on confirming that data actually persisted.

Why this closes out the module this way: Fetching data (an earlier lesson this module) is read-only and relatively low-stakes if it is briefly wrong, but saving user progress is a write operation where correctness and reliability directly affect trust in the product, making it the natural, higher-stakes culmination of everything this module has covered: HTTP, fetching, API routes, form submission, and validation, all applied to data that genuinely matters to the person using it.`,
  "vc-6-7": `Overview: This checkpoint closes Module 6 by combining HTTP fundamentals, fetching, API routes, form submission, validation, and progress-saving into one small full-stack feature, commonly a form that saves data through a real API route and displays it back from a data source rather than hardcoded content. The goal is proving you can build a reliable, complete client-to-server round trip, not just a form that looks correct.

What a strong submission demonstrates: A strong API checkpoint has at least one API route (in route.ts) that validates its input on the server independent of any client-side checks, returns proper status codes (200/201 for success, 400 for invalid input, 500 for unexpected failure) with a consistent JSON error shape, and a client form that tracks isSubmitting state, disables itself appropriately during a request, and shows specific, distinct feedback for success versus each kind of failure rather than one generic message covering everything.

Common mistakes to catch before submitting: Trusting only client-side validation and skipping server-side checks entirely, forgetting to check response.ok before treating a fetch result as successful, missing Content-Type: application/json on a POST request's headers, and allowing a form to be submitted multiple times because isSubmitting was never tracked or the button was never disabled.

Self-review checklist: **Test the happy path first, does valid data save and confirm correctly.** Then deliberately test the unhappy paths: submit with a required field empty, submit malformed data if applicable, and (if feasible) simulate a network failure by throttling to offline in DevTools, confirming each case shows a specific, useful message rather than a silent failure or a crash. Refresh the page after a successful save and confirm the saved data is genuinely retrievable again, not just reflected in local component state.

How this connects forward: This module's full request-response cycle, client state, network request, server validation, response handling, is the backbone of nearly every real web application, and Module 7's focus on polish, accessible error states, performance, mobile QA, applies directly to the exact form and data-loading patterns built here, refining a working feature rather than introducing an entirely new one.`,
  "vc-7-1": `Overview: Accessibility basics ensure a site is usable by people with a wide range of abilities, including those using screen readers, keyboard-only navigation, or assistive technology. This is not a separate add-on step at the end of a project, most accessibility comes from decisions already covered earlier in this course, semantic HTML, proper labels, and logical structure, applied consistently and deliberately.

Semantic HTML as the foundation: The single highest-leverage accessibility practice is using the correct semantic element for the job, a real <button> instead of a clickable <div>, a real <nav> instead of an unlabeled wrapper, exactly as covered in Module 1. Semantic elements come with built-in keyboard support and screen reader announcements for free, a <button> is automatically focusable and triggerable with both Enter and Space, while a <div> with a click handler has neither unless you manually add that behavior yourself.

Alt text and meaningful labels: Every meaningful image needs descriptive alt text that conveys the same information a sighted user would get, while a purely decorative image should have an empty alt="" so screen readers skip it entirely rather than announcing an irrelevant filename. Every form input needs an associated label, as covered in Module 3, and every icon-only button needs an aria-label describing its action, since an icon alone communicates nothing to a screen reader.

Color contrast: WCAG (Web Content Accessibility Guidelines) recommends a minimum contrast ratio of 4.5:1 between normal text and its background (3:1 for large text, generally 18pt or larger, or 14pt bold), ensuring text remains readable for users with low vision or color blindness, and for users in bright outdoor lighting on a phone screen, a genuinely common real-world condition. Browser DevTools and dedicated contrast checker tools can measure a specific color pairing directly rather than relying on visual guesswork.

Do not rely on color alone: Information should never be conveyed by color alone, a red border on an invalid form field should be paired with visible error text, since color-blind users or anyone viewing a page in certain lighting conditions may not reliably perceive the color difference at all.

Why this matters practically: Accessibility is frequently treated as optional, but a meaningful share of real users navigate with a keyboard, a screen reader, or reduced vision, and in many markets accessibility compliance is also a legal requirement for public-facing products, making these basics a practical, professional skill rather than an idealistic afterthought, and the direct foundation for the keyboard and focus work in the next lesson.`,
  "vc-7-2": `Overview: Keyboard and focus states cover how a site behaves for users who navigate without a mouse or touchscreen, using Tab, Shift+Tab, Enter, and Space, either by choice, by necessity due to a motor impairment, or because they are using a screen reader, which relies on keyboard navigation as its primary interaction method.

Tab order and focusability: By default, interactive elements, links, buttons, inputs, selects, are focusable and reachable via the Tab key in the order they appear in the HTML document, which is exactly why writing markup in a logical visual and reading order (rather than reordering things purely with CSS) matters for keyboard usability. The tabindex attribute can adjust this: tabindex="0" adds a non-interactive element like a custom div-based widget into the natural tab order, while a positive tabindex value should generally be avoided, since it overrides the natural document order and tends to create a confusing, hard-to-maintain navigation sequence.

Visible focus indicators: Every focusable element needs a clearly visible focus style so a keyboard user can always see exactly where they are on the page, using the :focus-visible pseudo-class from Module 1, which shows a focus ring specifically for keyboard interaction while not showing it for a mouse click, matching how focus indicators behave in most modern operating systems and browsers. Removing focus outlines entirely with outline: none and providing no visible replacement is one of the most damaging and, unfortunately, common accessibility mistakes, it leaves keyboard users with no way to tell where they are on the page at all.

Skip links: A "skip to main content" link, visually hidden until it receives keyboard focus, is a standard pattern placed as the very first focusable element on a page, letting keyboard and screen reader users bypass a long navigation menu and jump directly to the main content instead of tabbing through every nav link on every single page load.

Focus management for dynamic UI: When JavaScript opens a modal, a dropdown, or a mobile nav menu (as covered in Module 2), focus should move into that newly opened UI, and closing it should return focus to the element that opened it, otherwise a keyboard user can become lost, with focus still sitting on a now-hidden trigger button, unable to reach the content that just appeared.

Testing the fastest way: The fastest, most honest test of keyboard accessibility is unplugging your mouse (or simply not touching it) and attempting to complete every core action on the page using only Tab, Shift+Tab, Enter, and Space, any point where you cannot proceed or lose track of where you are is a real, concrete bug to fix.`,
  "vc-7-3": `Overview: Performance checks are about measuring, not guessing, whether a page loads and responds quickly enough for real users, particularly important in contexts with slower mobile networks and a wide range of device capabilities, common across much of this course's Kenyan student and user base.

Core Web Vitals: **Google's Core Web Vitals are the standard metrics for real-world page performance.** Largest Contentful Paint (LCP) measures how long the largest visible element takes to render, a good target is under 2.5 seconds. Cumulative Layout Shift (CLS) measures unexpected visual movement as a page loads, caused by things like images without reserved dimensions or fonts loading late and shifting text, a good target is under 0.1. Interaction to Next Paint (INP) measures how responsive the page feels to actual user interactions like clicks and taps, having replaced the older First Input Delay metric as the standard responsiveness measure. These three together describe loading speed, visual stability, and interactivity.

Measuring with real tools: Browser DevTools' Lighthouse panel runs an automated audit covering performance, accessibility, and SEO in one report, generating a numeric score alongside specific, actionable recommendations, and is the standard first tool to reach for on any page. The Network tab's throttling options simulate a slower connection (like "Slow 4G"), revealing how a page actually behaves for the many real users who are not on a fast, unthrottled office or home connection.

Common performance culprits: Unoptimized images (addressed directly by Module 5's Image component), render-blocking scripts loaded in the head without a defer or async attribute, excessive third-party scripts (analytics, chat widgets, ad trackers) each adding their own network requests and JavaScript execution time, and layout shift from images or ads without reserved space are the most common, high-impact issues found in real audits.

Measuring versus assuming: A page that feels fast on a developer's high-end laptop over fast broadband can feel dramatically slower on a mid-range phone over a mobile connection, so performance work should always be grounded in an actual measurement, Lighthouse's score and specific recommendations, or a throttled Network tab test, rather than a subjective impression formed on ideal hardware and connectivity.

Why this matters for a portfolio project: Being able to run Lighthouse, read its Core Web Vitals results, and explain concretely what you improved and why is a genuinely practical, in-demand skill that goes well beyond simply building a feature that works once under ideal conditions.`,
  "vc-7-4": `Overview: Empty and error UI cover the states a real application spends a surprising amount of time in, no data yet, no results found, or something went wrong, states that are easy to skip in a quick demo but define whether a product feels genuinely finished and trustworthy.

Why empty states matter: A list, dashboard, or search result with zero items and no explanatory message is, from a user's perspective, indistinguishable from a broken page, they cannot tell whether the feature is working correctly with genuinely no data, or whether something has failed silently. A well-designed empty state explains clearly what the user is looking at ("No courses yet"), and where relevant, what action they can take next ("Browse courses to get started"), turning a dead end into clear guidance rather than confusion.

Designing error states: An error state should distinguish between different kinds of failure where possible, a network error ("Check your connection and try again") is a genuinely different problem from a permission error ("You don't have access to this") or a not-found error ("This page doesn't exist"), and showing the specific, relevant message rather than one generic "Something went wrong" for every case helps a user actually understand and, where possible, resolve the problem themselves.

Recoverable actions: Wherever technically possible, an error state should include a concrete way forward, a "Try again" button that retries the failed request (directly reusable from Module 5's error.tsx reset function), a link back to a known-working page, or clear contact information for support, rather than leaving the user at a dead end with no path except reloading the entire page and hoping.

Loading, empty, and error as one cohesive set: These three states, loading (Module 5), empty, and error, together with the successful "happy path" state, are the complete set of states any data-dependent piece of UI can realistically be in, and a genuinely finished feature has a deliberate, considered design for all four, not just the happy path that was easiest to build and demo first.

Visual consistency across states: Empty and error states should be styled consistently with the rest of the application, using the same typography, spacing, and color language established elsewhere, rather than looking like an unstyled placeholder or debug output, since a jarring visual inconsistency at exactly the moment something has already gone wrong compounds a user's frustration rather than reassuring them.`,
  "vc-7-5": `Overview: Mobile QA (quality assurance) is the deliberate process of testing a site specifically on and for mobile devices, rather than assuming a responsive layout that looks correct in a resized desktop browser window will automatically behave correctly on a real phone, where touch, viewport quirks, and performance constraints all differ.

Touch target sizing: Interactive elements on mobile need to be large enough to tap reliably with a finger, a widely cited minimum is roughly 44 by 44 CSS pixels (Apple's Human Interface Guidelines) or 48 by 48 (Google's Material Design guidance), and elements smaller than this, or placed too close together, cause frustrating mis-taps, especially on dense UI like icon toolbars or closely packed navigation links.

Viewport and safe areas: Beyond the viewport meta tag from Module 1, mobile testing should check that content does not get obscured by device-specific UI, the notch or rounded corners on modern phones, or the on-screen keyboard covering a form's submit button. CSS environment variables like env(safe-area-inset-bottom) exist specifically to account for device safe areas on supporting devices, relevant for any fixed-position UI like a bottom navigation bar.

Real device testing versus emulation: Browser DevTools' device mode is a fast first check but simulates screen size without fully replicating real touch behavior, on-device performance, or how the mobile browser's own UI (address bar, bottom toolbar) affects available screen space. Testing on at least one real physical device, or with a cloud device-testing service, catches issues DevTools emulation alone can miss, particularly interaction feel and true network conditions.

Common mobile-specific bugs: Hover-dependent interactions (like a tooltip that only appears on :hover) simply do not work on touch devices at all, since there is no hover state, and need a tap-based alternative. Fixed-position elements can behave inconsistently when the mobile browser's address bar shows and hides during scroll. Forms should use appropriate input types (type="email", type="tel", type="number") since mobile browsers show a matching, more convenient on-screen keyboard for each specific input type, a small detail with an outsized effect on real usability.

Why this deserves a dedicated pass: Given that a large and often majority share of real-world traffic for many sites, especially across Kenya and much of the African market, is mobile-first, sometimes mobile-only, a site that has not been deliberately tested on real mobile conditions has not actually been tested for how most of its real users will experience it.`,
  "vc-7-6": `Overview: Code cleanup is the deliberate pass of removing dead code, fixing warnings, and improving readability before a project is considered finished, the difference between code that merely works and code that looks and reads like the work of a careful professional developer, something reviewers and future collaborators (including your future self) will notice immediately.

Removing dead code and console logs: Unused variables, commented-out old code left in "just in case," and console.log() statements added for debugging should all be removed before a project is considered done. Leftover console.log calls specifically clutter the browser console for anyone inspecting the deployed site and can, in some cases, leak internal data or logic that was never meant to be publicly visible.

Fixing linter and build warnings: Tools like ESLint flag real issues, unused variables, missing dependencies in a useEffect dependency array, inconsistent formatting, and warnings should be treated as problems to actually fix, not noise to ignore, since a growing pile of ignored warnings tends to bury the one warning that actually mattered, exactly the kind of exhaustive-deps warning this course's own codebase has had to fix before. A clean build with zero warnings is a genuinely achievable, meaningful bar for a finished project.

Consistent naming and formatting: Variable and function names should clearly describe what they hold or do, getUser() rather than g() or data2, and consistent formatting (indentation, spacing, quote style) across a whole project, ideally enforced automatically by a formatter tool like Prettier rather than manually, removes an entire category of noisy, low-value differences between files and makes real logic differences much easier to spot during review.

Removing unused dependencies and files: Over the course of building a project, it is common to install a package or create a file that ends up unused once the approach changes, and a cleanup pass should identify and remove these, both to reduce the project's final size and to avoid confusing a future reader into thinking that unused code is still relevant or in active use.

Why this is not just cosmetic: Clean, warning-free, consistently formatted code is measurably easier and faster to review, debug, and extend, all things that matter directly once a project moves toward the deployment and portfolio-presentation work of Module 8, where the underlying code itself, not just the running demo, is often exactly what an employer or client is actually being asked to evaluate.`,
  "vc-7-7": `Overview: This checkpoint closes Module 7 by applying accessibility, keyboard support, performance measurement, empty/error UI, mobile QA, and code cleanup as a complete polish pass over a project built earlier in the course, most commonly the Module 6 API checkpoint. The goal is demonstrating that you can take something that already works and make it genuinely presentable, not build something new from scratch.

What a strong submission demonstrates: A strong polish checkpoint runs Lighthouse and shows a genuine before-and-after improvement with specific numbers, has been tested with the mouse unplugged to confirm every core action is reachable by keyboard with visible focus states throughout, has deliberately designed empty and error states rather than blank areas or unstyled default messages, has been checked on an actual mobile viewport (or ideally a real device) for touch target sizing and layout, and has a clean, warning-free codebase with no leftover console.log statements or dead code.

Common mistakes to catch before submitting: Treating accessibility as only a visual color-contrast check while skipping actual keyboard testing, relying solely on DevTools device mode without ever checking a real phone, fixing the obvious happy-path UI while leaving empty and error states as an afterthought, and running Lighthouse once without addressing any of its specific, actionable recommendations.

Self-review checklist: Run Lighthouse before starting and note the baseline scores, then again after your polish pass and note the improvement, specific numbers make the work concrete and demonstrable rather than a vague claim of "it's better now." Tab through the entire page with the mouse unplugged. Trigger every empty and error state deliberately (clear all data, disconnect the network) and confirm each one shows clear, styled, helpful messaging. Check the deployed or local build's console for any remaining warnings or leftover logs.

How this connects forward: A project that has been through this polish pass, measured, accessible, mobile-tested, and clean, is genuinely ready for the deployment and portfolio-presentation work of Module 8, where the emphasis shifts from building and refining the product itself to shipping it publicly and describing it clearly to someone (a client, an employer) who has never seen the code before.`,
  "vc-8-1": `Overview: A solid Git workflow is what makes a project's history trustworthy and collaborative work possible, tracking every meaningful change, allowing safe experimentation on branches, and giving you the ability to undo mistakes confidently rather than fearfully. This lesson covers the core commands and habits used in essentially every professional codebase.

The basic save cycle: git add stages specific changed files (or git add . stages everything changed) to be included in the next commit, git commit -m "message" records a snapshot of the staged changes with a descriptive message explaining what changed and, ideally, why, and git push uploads local commits to a remote repository like GitHub, making them visible and backed up beyond your own machine. Committing frequently, in small, logical, working chunks rather than one enormous commit at the end of a session, makes a project's history genuinely useful for understanding what changed and when, and for undoing a specific mistake without losing unrelated work.

Writing good commit messages: A good commit message describes the why behind a change, not just a restatement of the diff, "fix cron schedule that was blocking deployment" is far more useful to a future reader (including future you) than "fix bug" or "update file.js", since the code diff itself already shows what changed, the message's job is to explain the reasoning and context that the diff alone cannot.

Branching: A branch is an independent line of development, created with git branch new-feature or the combined git checkout -b new-feature, allowing you to work on a new feature or experiment without touching the stable main branch until the work is ready. Once finished, a branch is merged back, or more commonly in team settings, opened as a pull request for review before merging, a workflow this course's own repository follows.

Avoiding common Git mistakes: Never commit files containing secrets, like API keys or passwords, since once pushed, even a later deletion leaves that secret visible in the project's history; a .gitignore file lists files and folders (commonly node_modules, .env, and build output) that Git should never track in the first place. Destructive commands like git reset --hard or git push --force can permanently discard work and should be used deliberately and rarely, with a clear understanding of exactly what will be lost.

Why this matters for a portfolio: A project's commit history is itself visible and reviewable on GitHub, a clean history of small, well-described commits demonstrates professional process to anyone evaluating the project, not just the final working result, exactly the same principle behind this course's own recent commit history of clear, specific messages.`,
  "vc-8-2": `Overview: Environment variables let an application store configuration and secrets, API keys, database connection strings, separately from the codebase itself, so that sensitive values are never committed to Git and different values can be used in development versus production without changing any code.

What environment variables are for: Any value that differs between environments (a local development database versus a live production database) or that must stay secret (an API key, a database password) belongs in an environment variable rather than hardcoded directly in a source file. This achieves two things at once: it keeps secrets out of the Git history covered in the previous lesson, and it lets the exact same codebase run correctly in different contexts, local development, a testing environment, and production, simply by changing which values are provided.

Using environment variables in Next.js: Environment variables are conventionally stored in a .env.local file at the project root during development, which must be listed in .gitignore so it is never committed, and read in server-side code via process.env.VARIABLE_NAME. Next.js has a specific and important rule for exposing a variable to client-side (browser) code: only variables prefixed with NEXT_PUBLIC_, like NEXT_PUBLIC_ANALYTICS_ID, are made available in the browser bundle, every other environment variable stays server-only by design, a deliberate safeguard preventing a secret key from accidentally ending up in client-side JavaScript where anyone could view it.

Setting variables for deployment: A local .env.local file only affects your own machine, so when deploying (Module 8's later lessons), the same variables must be configured separately in the hosting platform's project settings, commonly Vercel's dashboard for a Next.js project, so the live, deployed application has access to the same configuration values it needs to run correctly.

Common mistakes: Accidentally committing a .env file with real secrets because it was not added to .gitignore in time, prefixing a genuinely sensitive value with NEXT_PUBLIC_ by mistake and unintentionally exposing it to every visitor's browser, and forgetting to set the same variables in the deployment platform, causing a project that works locally to fail once deployed because a variable it expects is simply missing.

Why this matters beyond convenience: Handling environment variables correctly is a genuine security practice, not just a configuration convenience, mishandling secrets is one of the most common and most damaging real-world mistakes in web development, and getting this habit right early prevents it from becoming a serious problem later on a real project handling real user data.`,
  "vc-8-3": `Overview: A production build compiles and optimizes a project for real users, a fundamentally different process from the development server used while building features, and understanding the difference is essential before deploying anything live.

Development versus production mode: The development server (started with a command like next dev) prioritizes fast rebuilds and helpful debugging information, detailed error overlays, unminified code, hot module reloading that updates the browser instantly as files are saved, all genuinely useful while actively coding but unnecessary and often actively harmful for real visitors. A production build (next build) instead prioritizes final output quality: minified and bundled JavaScript and CSS, optimized images, and dead code elimination (removing code that is never actually used, called tree-shaking), all of which make the deployed site meaningfully smaller and faster than the same code running in development mode.

What the build step actually catches: Running a production build locally before deploying surfaces real problems that the more forgiving development server can silently tolerate, TypeScript type errors, unresolved imports, and certain runtime issues that only appear under production's stricter compilation, making a successful local build an important checkpoint to pass before ever pushing code that will trigger an automatic deployment.

Starting a production build locally: After running the build command, a separate start command (next start) serves the already-built, optimized output, letting you verify locally that the production version actually behaves as expected, rather than assuming the development server's behavior will carry over unchanged, since some bugs (like code that accidentally depends on development-only behavior) only surface in this genuinely production-like mode.

Build output and what changes: The build process generates a dedicated output directory (.next for Next.js) containing the optimized, deployable version of the application, this directory should never be committed to Git, since it is regenerated fresh on every deployment and would only add noise and potential inconsistency to the repository's history.

Why this step cannot be skipped: Deploying straight from a working development server, or assuming that "it worked in npm run dev" is equivalent to "it will work in production," is a common and avoidable mistake, since production mode's stricter compilation and different runtime behavior can reveal real bugs that development mode's more forgiving defaults never expose, making a clean local production build the honest, final check before deployment.`,
  "vc-8-4": `Overview: Deployment setup is the process of making a project publicly accessible on the internet through a hosting platform, turning a project that only exists on your own machine into a real, shareable, live website. This lesson focuses on the modern Git-connected deployment workflow that platforms like Vercel (built by the creators of Next.js, and the natural default for a Next.js project) use.

Connecting a Git repository: Modern hosting platforms connect directly to a GitHub (or similar) repository, and once connected, automatically detect the project type, a Next.js project needs essentially no manual server configuration, the platform recognizes the framework and knows how to run its build command and serve its output correctly by default.

Automatic deployments on push: Once connected, every push to the main branch (or whichever branch is configured as production) automatically triggers a new production build and deployment, no manual upload or server restart required, and this automation is exactly why the production build check from the previous lesson matters so much, a broken build pushed to main can mean a broken live site if it is not caught first.

Preview deployments: Most modern platforms also automatically deploy a separate, unique preview URL for every pull request or non-main branch, letting you (or a reviewer, or a client) see and test a specific change running live before it is merged into production, entirely separate from and without affecting the live production site, a genuinely valuable safety net this course's own workflow benefits from.

Environment variables at deployment: As covered in the earlier lesson on environment variables, the deployment platform needs its own copy of any required environment variables configured directly in its project settings, since a local .env.local file has no effect on the deployed environment, one of the most common reasons a project works perfectly locally but fails or behaves incorrectly once deployed.

Verifying a live deployment: After a deployment completes, checking the actual live URL, not just trusting that a green "deployment successful" status means everything genuinely works, catches real issues, a missing environment variable causing a feature to silently fail, an image path that worked locally but not in production, or a build that succeeded but still has a runtime error only visible in the browser console on the real, live site.

Why this workflow matters: This connected, automatic deployment model means shipping a change is as simple as merging good code, removing an entire category of manual, error-prone deployment steps, but it also means broken code reaches production quickly if the checks from earlier lessons, a clean production build, correct environment variables, are skipped.`,
  "vc-8-5": `Overview: Domain and SEO basics cover the final steps that make a deployed project feel like a real, discoverable product rather than a temporary platform-generated URL, connecting a custom domain and ensuring the site is set up correctly for search engines to find and represent it accurately.

Custom domains: A hosting platform typically assigns a free subdomain automatically (like a project name on vercel.app), but a custom domain (yourproject.com) can be connected by purchasing it through a domain registrar and then configuring DNS records, commonly an A record or CNAME record, to point that domain at the hosting platform, a process the platform's dashboard usually walks through directly, along with automatically issuing an HTTPS certificate so the custom domain is secure by default.

The robots.txt and sitemap: A robots.txt file at a site's root tells search engine crawlers which parts of a site they are allowed to crawl and index, and a sitemap.xml file lists every important page's URL to help crawlers discover content efficiently, particularly useful for larger sites. Next.js supports generating both directly through special files in the app/ directory (robots.ts and sitemap.ts), which programmatically produce the correct output rather than requiring a hand-maintained static file that can drift out of date as pages are added or removed.

Structured, accurate metadata across the site: Building on Module 5's metadata lesson, every page should have a unique, accurate title and description, since search engines and, again, social platforms, use exactly this information to represent a page, generic or duplicate titles across many pages actively hurt both search ranking and how professional shared links look.

Basic technical SEO checks: Beyond metadata, a few concrete, checkable things matter: the site should be crawlable (not accidentally blocked by an overly broad robots.txt), pages should return correct status codes (a genuinely missing page should return a real 404, not a 200 with an error message inside otherwise-normal-looking content, which confuses crawlers), and Core Web Vitals from Module 7 are themselves a search ranking factor, tying performance work directly to discoverability.

Why this matters for a portfolio project: A project reachable only through a temporary platform URL, with default or missing metadata, reads as unfinished, while a project on a real custom domain with accurate metadata, a working sitemap, and solid Core Web Vitals reads as a genuinely shipped, production-ready product, exactly the impression this final module is meant to leave with anyone evaluating your work.`,
  "vc-8-6": `Overview: A project README is the first thing anyone, an employer, a client, a collaborator, sees when they land on a project's repository, and a genuinely good one explains what the project is, how to run it, and what decisions went into it, doing real work toward getting your project understood and taken seriously rather than being a formality.

What belongs at the top: A README should open with a clear, concise description of what the project actually is and who it is for, followed by a live demo link if one exists (which it should, after this module's deployment work) and ideally a screenshot or short GIF, since many reviewers will judge a project's polish within seconds purely from what they see at the top of the README before reading a single line further.

Setup and run instructions: Clear, accurate setup instructions, cloning the repository, installing dependencies (npm install), configuring required environment variables (referencing the environment variables lesson, listing which variables are needed without exposing their real secret values), and the command to run the project locally (npm run dev), let someone actually try the project themselves rather than only reading about it, and are worth testing personally on a fresh checkout to confirm nothing was missed or assumed.

Documenting technical decisions: A strong README briefly explains key technical choices, why Next.js, why a particular data-fetching approach, what tradeoffs were made and why, since this is exactly the kind of reasoning an interviewer or reviewer is often specifically trying to assess, and a project that can explain its own decisions reads as meaningfully more sophisticated than one that only lists the technologies used.

Structure and scanability: Using clear Markdown headings (Features, Getting Started, Tech Stack, Deployment), bullet points over dense paragraphs, and code blocks for any commands, makes a README scannable, since most readers will skim first and only read closely if the skim looks promising, the same first-impression principle behind good documentation everywhere.

Why this closes out the deployment module: A working, deployed project without a clear README undersells the work behind it, while a live link paired with a well-written README that explains the what, why, and how is what turns a coding exercise into something that reads as a genuinely professional, presentable piece of work, the final piece needed before the course's graduation checkpoint.`,
  "vc-8-7": `Overview: This final checkpoint closes Module 8, and the course, by combining Git workflow, environment variables, a clean production build, live deployment, domain and SEO basics, and a clear README into one genuinely finished, shippable, presentable project. The goal is proving you can take a project all the way from local code to a real, discoverable, professionally documented product, the complete arc this entire course has been building toward.

What a strong graduation submission demonstrates: A live, working deployment on a real URL (custom domain if pursued), a clean Git history of meaningful, well-described commits with no secrets ever committed, correctly configured environment variables in the deployment platform (verified by the live site actually working, not just a successful build status), accurate per-page metadata and a working sitemap, and a README that lets a stranger understand, run, and evaluate the project within a couple of minutes of reading.

Common mistakes to catch before submitting: A live site that shows a broken feature because an environment variable was set locally but never configured on the deployment platform, generic or missing metadata left over from earlier in the project's development, a README that is out of date relative to what the project actually does now, and forgetting to personally test the live production URL end-to-end rather than only trusting that the build succeeded.

Final self-review checklist: **Open the live URL in an incognito window (removing any local session or cache assumptions) and walk through every core feature exactly as a first-time visitor would.** Check the browser tab title and a shared-link preview for accurate metadata. Read the README start to finish as if you had never seen the project before, does it actually explain what this is and why it exists. Confirm the Git history has no committed secrets and tells a coherent story of how the project was built.

How this connects to what comes after: This checkpoint is not really about this one project, it is proof that you can repeat this entire process, plan, build, connect data, polish, and ship, on your own for a future project, a client engagement, or a job application, which is precisely why this course is structured as a full arc from HTML fundamentals through to a genuinely live, documented, professional product rather than stopping at a working local demo.`,
};

const aiPromptContent: Record<string, string> = {
  "ape-1-1": `Overview: **An AI assistant like ChatGPT, Claude, or Gemini does not "know" things the way a person does.** It is a large language model trained to predict the most likely next word given everything that came before it, based on patterns learned from enormous amounts of text. The most important idea in this lesson is that fluent, confident-sounding text is not the same thing as correct text, and understanding how responses actually form is what separates someone who gets lucky with prompts from someone who can direct AI reliably.

How a response actually forms: When you send a prompt, the model breaks your text into tokens (word pieces), then generates a reply one token at a time, each new token chosen based on probability given the tokens before it. There is no separate "thinking" step happening behind the scenes unless a model is specifically designed to reason before answering. This is why a prompt's exact wording, order, and structure change the output: you are shaping a probability distribution, not filing a request with a researcher.

Fluency is not the same as accuracy: Because the model is optimized to produce plausible-sounding continuations, it can generate text that reads as authoritative and well-organized while being factually wrong. This is called hallucination, and it happens most often with specific facts, dates, citations, statistics, and niche topics where the training data was thin or contradictory. A student's job is to treat every confident answer as a draft to verify, not a finished fact.

Responses are not fixed: The same prompt sent twice can produce different answers, because most assistants sample from a range of likely next tokens rather than always picking the single most probable one. This variability (often controlled by a setting called temperature) means you should not judge a prompt's quality from one output alone; test it a few times before deciding it works.

Context window and memory: An assistant only "knows" what is inside its current context window (your prompt, any attached files, and the conversation so far) plus whatever was baked into it during training, which has a cutoff date. It does not automatically know about very recent events, your company's internal documents, or earlier conversations unless that information is fed back in.

Why this matters for prompting: Because the model is filling in the most statistically likely continuation, vague or ambiguous prompts get filled in with the model's best guess about what you probably meant, which is often generic. Precise prompts narrow that guessing, which is the foundation every later lesson in this module builds on.`,
  "ape-1-2": `Overview: **A strong prompt is not a single sentence, it is a small set of building blocks assembled in a deliberate order.** The most useful mental model is that every effective prompt is made up of some combination of task, context, constraints, format, and examples, and knowing these parts by name lets you diagnose why a prompt is failing instead of just rewriting it randomly and hoping.

The task: This is the actual instruction, the verb-driven core of what you want done: "summarize," "rewrite," "generate five options," "critique this." A weak prompt often buries the task inside a paragraph of background; a strong prompt states it clearly, usually near the start, so the model does not have to infer what action you actually want.

Context: Context is the background information the model needs to do the task well: who the audience is, what the content is for, what has already been tried, or what business the request sits inside. Without context, the model defaults to generic, average answers pulled from its training data rather than answers tailored to your actual situation.

Constraints and format: **Constraints tell the model the boundaries of an acceptable answer, such as length, tone, reading level, or things to avoid.** Format tells it how to structure the output, such as a bulleted list, a table, a fixed word count, or a specific heading structure. Leaving these out is one of the most common reasons a first draft from AI feels "almost right but not quite usable."

Examples: Showing the model one or two examples of the kind of output you want (covered in depth in Few Shot Examples) is often more powerful than describing the style in words, because the model can copy patterns directly from the example rather than interpreting an abstract description.

Order and clarity: **Within these parts, order matters less than completeness, but a common effective pattern is context first, then task, then constraints and format, then examples last.** Reviewing a weak prompt against this five-part checklist (task, context, constraints, format, examples) is usually the fastest way to work out what is missing before you try to fix it by guessing.`,
  "ape-1-3": `Overview: Role and context design is about deliberately telling the assistant who it should act as and what situation it is operating in, rather than letting it default to a generic, all-purpose voice. This is one of the highest-leverage techniques in prompting because it reshapes the entire tone, vocabulary, and priorities of a response with a single sentence.

Role (persona) prompting: Assigning a role, such as "act as a senior brand strategist" or "you are a patient junior-level design tutor," nudges the model toward the vocabulary, priorities, and level of detail associated with that role in its training data. This is genuinely useful for shaping tone and expertise level, but it does not grant the model real credentials or guaranteed accuracy; a prompt that says "act as a lawyer" does not make the legal advice correct, so role prompting should be treated as a style and framing tool, not a truth guarantee.

Providing background context: Beyond role, tell the assistant what it needs to know about your actual situation: the client, the brand, the platform, the constraints of the project, or what has already been tried. Context can be given inline in the prompt or, in tools that support it, set once as a system-level instruction that persists across a whole conversation so you are not repeating it every message.

Audience and purpose framing: Naming who the output is for (a first-year design student, a busy client, a technical developer) and what it will be used for (a pitch, an internal note, a social caption) changes word choice and depth far more reliably than asking for a vague quality like "make it professional."

Managing context across a conversation: Every assistant has a limited context window, so in long conversations earlier details can get crowded out or the assistant can lose track of an instruction given many messages ago. Restating key constraints periodically, or summarizing the conversation so far before continuing, keeps long sessions on track.

Risks to watch for: Overly strong personas can push a model toward exaggerated, stereotyped, or overconfident answers because it is play-acting a character rather than reasoning carefully, so role prompts work best combined with clear constraints and a habit of fact-checking, not used as a substitute for them.`,
  "ape-1-4": `Overview: **Constraints and output formats are how you convert a general-purpose answer into something that fits directly into your actual workflow.** Without them, an assistant will guess at length, structure, and tone, and that guess is optimized to look like an average, generic answer rather than one that fits your specific use case.

Length and structure constraints: **Specifying word count, number of options, number of sections, or a maximum length stops the model from either padding an answer with filler or cutting it too short.** Structural constraints, like "three sections with headings" or "a single paragraph, no bullet points," control the shape of the response so it slots into a document, a slide, or a caption box without heavy editing.

Format constraints for downstream use: Asking for output as a numbered list, a markdown table, JSON, or a specific template makes the response usable directly by another tool, spreadsheet, or person, instead of prose that has to be manually restructured. This matters especially for business workflows where an AI output feeds into a template, a CMS field, or another automated step.

Tone and voice constraints: Naming a tone (warm but concise, formal and neutral, playful for a youth audience) and giving one or two reference adjectives is more reliable than asking the model to "sound good," because tone words without anchoring examples are interpreted inconsistently across different requests.

Negative constraints: Telling the model what to avoid, such as "do not use jargon," "do not mention pricing," or "avoid exclamation marks," is often as important as positive instructions, because it closes off the generic defaults the model would otherwise reach for.

The over-constraining trap: Piling on too many rigid constraints at once can degrade quality, because the model spends its effort satisfying format rules instead of producing genuinely useful content, and contradictory constraints (short but comprehensive, formal but playful) force it to guess which one you meant. The practical habit is to add constraints deliberately, test the result, and drop any constraint that is not actually needed.`,
  "ape-1-5": `Overview: **Few-shot prompting means showing the model one or more worked examples of the input-output pattern you want, instead of only describing it in words.** This works because language models are strong at in-context learning: they can pick up a pattern from examples placed directly in the prompt and continue it, often more reliably than they can follow an abstract written description of the same pattern.

Zero-shot, one-shot, and few-shot: **A zero-shot prompt gives only an instruction with no examples, which works fine for simple, common tasks a model has seen many times in training.** A one-shot prompt gives a single example, and a few-shot prompt gives several (typically two to five), which is usually the sweet spot for tasks with a specific style, structure, or edge case the model would not guess correctly on its own.

Why examples outperform description: It is often easier to show a model a caption written in your brand's voice than to describe that voice in adjectives, because tone, rhythm, and word choice are hard to specify precisely in language but easy to demonstrate directly. This is especially valuable for formatting quirks, house style rules, or classification tasks with fuzzy categories.

Selecting good examples: **Examples should be genuinely representative of the range of inputs you expect, including at least one that covers a tricky or edge case, not just the easiest cases.** Two or three well-chosen, varied examples generally beat five near-identical ones, because near-identical examples teach the model a narrower pattern than you intended.

Formatting consistency: Keep the structure of every example identical (same labels, same order of fields, same punctuation style), because the model will also copy inconsistencies in your examples, not just the content you intended it to learn.

Limits and cost: **Each example consumes space in the context window, so few-shot prompts are longer and can hit length limits in some tools or interfaces.** There is also a risk of overfitting the output too closely to the exact examples given, such as the model reusing your example's numbers or names by mistake, so review outputs for unwanted copying, not just pattern-following.`,
  "ape-1-6": `Overview: **A prompt is not finished the moment it produces one good-looking answer.** Testing prompt quality means treating a prompt like a small tool you build, run against a few different real inputs, and refine, because a prompt that works once can fail silently on a slightly different case. The most important idea in this lesson is that prompt engineering is an iterative loop, not a one-shot guess.

Define success before you test: **Before judging any output, decide what "good" actually means for this task: correct facts, the right tone, a specific format, a specific length, or all of these.** Without a definition of success, it is easy to be impressed by fluent writing that is actually missing what you needed.

Run the same prompt more than once: **Because model outputs vary between runs, run a prompt two or three times before concluding it reliably works.** A prompt that produces a great answer once and a mediocre one the next time is not yet reliable enough to reuse in a real workflow.

Test across varied and edge-case inputs: **A prompt tuned on one example can quietly break on a different input, such as a shorter brief, an unusual client name, or a topic outside the model's comfort zone.** Deliberately testing a prompt against two or three different realistic scenarios, including an awkward one, reveals weaknesses that a single happy-path test hides.

Compare outputs side by side: When refining a prompt, change one thing at a time (the instruction, the example, a constraint) and compare the new output against the previous version, rather than changing several things at once and losing track of what actually caused the improvement. Simple rubrics, such as scoring accuracy, tone fit, and format compliance out of five, make this comparison less subjective.

Document what works: **Once a prompt reliably produces good output across your test cases, save it with a short note on what it is for and why it is worded the way it is.** This turns a one-off success into a reusable asset, which is exactly the habit Module 2's Workflow Templates lesson builds on.`,
  "ape-1-7": `Overview: This checkpoint lesson pulls together everything from Module 1: how assistants actually generate responses, the five building blocks of a prompt, role and context design, constraints and format, few-shot examples, and disciplined testing. A strong checkpoint submission should show that you can combine all five skills in a single, deliberate prompt, not just demonstrate them one at a time in isolation.

Revisiting how responses form: Everything else in this module depends on remembering that an assistant generates the most statistically likely continuation of your prompt, and that fluent output still needs verification. A checkpoint submission should show awareness of this, for example by noting where you would fact-check a claim rather than accepting it as given.

Assembling the full prompt anatomy: A strong submission clearly contains a task, relevant context, explicit constraints, a specified output format, and, where useful, one or two examples, all working together rather than a single vague instruction. Reviewers should be able to point at your prompt and label each part.

Deliberate role and context choices: Show that you chose a role or persona (or deliberately chose not to) for a reason connected to the task's audience and purpose, not just because "act as an expert" is a common template line copied without thought.

Constraints that match a real use case: The format and constraints in your prompt should map to an actual downstream need, such as a specific word count for a caption, a table for a comparison, or a tone matched to a named audience, rather than generic constraints added for the sake of having some.

Evidence of testing and iteration: A strong checkpoint includes a short note on how you tested the prompt: what you ran it against, what you changed, and why the final version is better than your first draft. Showing one "before" and one "after" version, with a sentence explaining the change, is usually more convincing to a reviewer than a single polished final prompt with no visible process.`,
  "ape-2-1": `Overview: Content planning is one of the highest-value, lowest-risk uses of AI in a creative business, because ideation and structure benefit from volume and speed while the final judgment about what actually gets published stays with a human who understands the brand and audience. This lesson focuses on prompting AI as a brainstorming and organizing partner for content calendars, campaigns, and post series.

Brainstorming at volume: Asking for a large batch of ideas ("give me 20 content angles for a skincare brand targeting university students in Nairobi") and then filtering down is usually more productive than asking for "the best idea," because the model's first suggestion is often the most generic one available and better ideas frequently surface further down a long list.

Structuring a content calendar prompt: Effective content planning prompts specify the platform (Instagram, TikTok, a blog), the posting cadence, the campaign goal, and the audience, because a content idea that works as a blog post rarely works unchanged as a fifteen-second video script. Asking the model to organize ideas into a calendar format (date, platform, format, hook, caption) turns raw ideas into something a team can actually schedule.

Matching brand voice: **A content plan only looks right if it sounds like the brand it is for.** Feeding in a short brand voice description, or a few examples of past captions, and asking the model to match that voice consistently across the batch produces far more usable drafts than requesting generic "engaging social captions."

Iterating for freshness: AI-generated content ideas can converge on the same handful of common angles (a giveaway, a behind-the-scenes post, a "did you know" fact) especially for well-covered industries. Explicitly asking for unconventional angles, or feeding in a competitor's recent content to avoid overlap, pushes past the obvious first layer of ideas.

Originality and human review: Because content ideas are pattern-completions of what already exists across the internet, a planner should always screen a batch for ideas that are too close to a specific existing campaign, and add the local, cultural, or brand-specific detail that makes generic ideas feel genuinely original before they go into a real calendar.`,
  "ape-2-2": `Overview: A design brief translates a client's often vague request into a clear document a designer can actually work from, and AI can be a genuinely useful drafting partner for this because briefs follow a fairly predictable structure. The goal of this lesson is prompting AI to turn scattered client input into an organized, professional brief, not to let AI invent project details the client never actually gave.

Structuring the brief prompt: A useful design brief prompt asks the model to organize information into a standard set of fields: project goal, target audience, deliverables, brand guidelines or references, timeline, and success criteria. Feeding raw notes from a client call or email and asking the model to sort them into this structure is far more reliable than asking it to "write a design brief" from scratch with no real input.

Translating vague client language: Clients often describe what they want in fuzzy, subjective terms like "make it pop" or "something modern but not too corporate." A good use of AI here is asking it to convert these phrases into more concrete design directions (color intensity, typography weight, layout density) as a starting point for a conversation, not as a final decision, since only the human designer and client can confirm what the vague phrase actually meant.

Surfacing missing information: Before drafting a full brief, prompting the model with "what questions should I ask this client before starting design work" is often more valuable than the brief itself, because it flags gaps (budget, exact dimensions, print versus digital use, deadline) that are easy to miss in a fast client conversation.

Protecting client data: **Client briefs often contain sensitive business details: unreleased product names, pricing, internal strategy, or personal contact information.** Before pasting client notes into a general-purpose AI tool, check what that tool's data policy actually says about whether inputs are stored or used for training, and strip out anything sensitive that is not needed for the brief itself.

Human review before sending: An AI-drafted brief should always be checked against the actual client conversation for accuracy before it is sent to a designer or back to the client, since the model can smooth over ambiguity by quietly inventing plausible-sounding details that were never actually confirmed.`,
  "ape-2-3": `Overview: Prompting an AI image generator is a different skill from prompting a text assistant, because image models respond most reliably to a fairly consistent formula of descriptive building blocks rather than open-ended conversation. A dependable starting structure covers subject, style, composition, lighting, and technical detail, and understanding each part lets you troubleshoot a weak result instead of just rewording the whole prompt.

Subject specificity: **Image prompts work best with concrete, specific subjects rather than abstract concepts.** "A young Kenyan graphic designer sketching on a tablet at a wooden desk" gives the model far more to work with than "a creative person," because specific nouns and details anchor the generation in a recognizable scene.

Style and aesthetic direction: Naming a visual style (flat illustration, risograph print texture, cinematic photorealism, low-poly 3D, watercolor) has an outsized effect on the result, often more than adding extra descriptive adjectives does. A short, sharp style instruction generally beats a long, vague one, so it is worth testing a few named styles rather than layering on adjectives like "beautiful" or "amazing," which most models cannot act on meaningfully.

Composition and camera language: Borrowing photography and framing terms, such as close-up, wide shot, bird's-eye view, rule of thirds, or Dutch angle, gives the model concrete instructions about how the subject should be framed, which plain description often fails to convey.

Lighting and mood: **Specific lighting terms produce more consistent results than vague ones.** Phrases like soft natural light, golden hour, studio lighting with a softbox, rim lighting, or overcast diffused light reliably shift the mood and quality of a generated image, while a vague instruction like "good lighting" tends to be ignored or interpreted inconsistently.

Iteration and known limitations: Image models still commonly struggle with rendering readable text inside an image, exact counts of objects or fingers, and precise brand logos, so these should be treated as areas to check carefully and often fix by hand afterward. It is also worth being deliberate about originality and copyright: avoid prompting for a named living artist's exact style or for the likeness of a specific real person without permission, since both raise ethical and legal concerns in professional design work.`,
  "ape-2-4": `Overview: AI is genuinely useful for condensing long documents, articles, or research into a usable summary, but research summaries are exactly the kind of output where hallucination risk is highest, because a fluent, well-organized summary can quietly contain a fact, statistic, or attribution the source never actually stated. This lesson is about prompting for useful summaries while building in the verification the task demands.

Summarization prompting techniques: Good summary prompts specify the target length, the intended reader, and what to prioritize, for example "summarize this report in 150 words for a non-technical client, focusing on the recommendations, not the methodology." Asking for a structured summary (key findings, implications, open questions) is usually more useful than asking for a plain paragraph, because it forces the output into a shape a reader can scan quickly.

Grounding the summary in the actual source: Wherever possible, paste the source text directly into the prompt or use a tool that can read an attached document, rather than asking the assistant to summarize a topic from memory. A summary generated purely from the model's training data is far more likely to include outdated or invented details than one generated from text actually provided in the prompt.

Asking for citations, carefully: **You can ask a model to note which part of the source text supports each summary point, which helps you trace claims back to the original.** However, if a model is not actually grounded in a real document (for example, when asked to "find studies about X"), it can still fabricate plausible-looking citations, titles, and even page numbers, so any AI-generated citation needs independent verification before it is used or shared.

Verifying claims independently: **Treat any specific number, date, name, or quote in an AI summary as unverified until you have checked it against the original source or another independent reference.** This is especially important for anything that will appear in client-facing material, since a wrong statistic in a report undermines trust in the whole document.

Structuring for the audience: A summary meant for an internal team can stay technical; one meant for a client or a general audience should translate jargon and lead with implications rather than methodology. Naming the audience in the prompt is the single fastest way to get the right register.`,
  "ape-2-5": `Overview: Drafting customer or client responses is a strong fit for AI assistance because many messages follow repeatable patterns, but every draft needs a human check before it goes out, since a wrong or tone-deaf reply damages trust faster than a slow one. This lesson focuses on prompting for drafts that speed up response time without sacrificing accuracy or empathy.

Structuring a response draft: A reliable structure for customer replies is acknowledge the issue, address it directly (an answer, a fix, or a clear next step), and close with an appropriate tone for the situation. Asking the model to follow this structure, rather than just "write a reply," produces drafts that read as complete rather than as a vague, generic apology.

Matching brand tone: Feed the model a short description of the brand's customer service voice, or a couple of example replies that represent it well, so drafts do not default to a flat, corporate-sounding tone. This matters most in messages that need warmth, such as complaints or delays, where a generic AI tone can come across as dismissive.

Personalization versus templates: AI drafts work best as a strong starting point that a human then personalizes with the specific details of the actual customer situation (their name, their specific order, what was actually promised to them), rather than being sent unedited, since an unedited generic-feeling reply is often more damaging than a slower, more personal one.

Accuracy and promise-checking: Never let an AI-drafted response commit to a policy, refund, discount, or timeline that has not been confirmed as accurate, because the model does not know your company's actual current policies unless you explicitly provide them in the prompt, and it will otherwise generate a plausible-sounding but potentially wrong commitment.

Data privacy when drafting: Be careful about pasting a customer's personal details, such as full name, phone number, address, or account information, into a general-purpose AI tool, since this may be stored or processed outside your control. Draft with placeholders where possible ("the customer") and insert real personal details only after the draft is otherwise finalized, or use a tool with a clear enterprise data policy for handling personal information.`,
  "ape-2-6": `Overview: A workflow template is a reusable prompt built once and used repeatedly by a person or a whole team for a recurring task, such as writing product descriptions, drafting social captions, or summarizing meeting notes. The value of a template comes from encoding what Module 1 already taught (clear task, context, constraints, format, and examples) into a fixed structure that does not need to be rebuilt from scratch every time.

Designing with placeholders: A well-built template separates the fixed instruction from the variable details using clear placeholders, for example "[PRODUCT NAME]" or "[TARGET AUDIENCE]," so a team member can fill in the specifics without needing to understand or rewrite the underlying prompt engineering. This is the same principle as a design template with locked layout elements and editable text boxes.

Building in consistency: Because the same template is reused across many requests, it is worth spending extra effort getting the constraints, format, and tone instructions exactly right once, since that effort then pays off every time the template is used, rather than being redone from scratch by each team member with slightly different results.

Documenting purpose and usage: Every template should include a short note on what it is for, when to use it, what inputs it expects, and any known limitations, so a new team member can use it correctly without trial and error. A template with no documentation quietly becomes unreliable as people misuse it for tasks it was not actually designed for.

Versioning and iteration: Templates should be treated as living documents, updated when a limitation is discovered or when the underlying task changes, with old versions kept or dated so a team can track why a template changed and roll back if a new version performs worse.

Flexibility versus rigidity: The best templates are structured enough to guarantee a consistent baseline quality but leave room for a human to adjust tone or add situational detail, since an overly rigid template produces outputs that all sound the same regardless of context, which becomes obvious and repetitive to an audience seeing them across many posts or messages.`,
  "ape-2-7": `Overview: This checkpoint lesson brings together Module 2's focus: using AI to support real creative and business workflows (content planning, design briefs, image prompting, research summaries, customer responses, and reusable templates) while keeping human judgment in charge of anything client-facing, factual, or brand-defining. A strong checkpoint submission demonstrates that you can apply AI across a realistic multi-step workflow, not just produce one isolated draft.

Choosing a realistic scenario: The strongest submissions are built around one coherent, specific scenario, such as planning a small business's month of social content, or handling an incoming client brief end-to-end, rather than a set of disconnected, generic prompt examples with no shared context.

Showing the full chain: A good checkpoint shows more than one workflow skill working together, for example a design brief prompt that then feeds into content planning prompts and an image prompt for the resulting campaign, so a reviewer can see how the pieces connect into a real working process, not just isolated exercises.

Demonstrating human judgment points: Explicitly mark where you, the human, stepped in: where you edited an AI draft, rejected an idea for being too generic, fact-checked a claim, or removed sensitive client data before pasting a prompt. This is what distinguishes a professional workflow from simply copying whatever AI produced.

Handling data and originality responsibly: Show awareness of the risks covered across this module, such as not pasting sensitive client data unnecessarily, checking AI-summarized research against sources, and screening content ideas or image prompts for originality and appropriate use, rather than treating AI output as automatically safe to publish.

Reflecting on what worked: Include a short reflection on which prompts needed the most iteration, what constraints made the biggest quality difference, and what you would change if you ran this workflow again for a different client or brand. This reflection is often what separates a checkpoint that shows real understanding from one that just shows a finished product.`,
  "ape-3-1": `Overview: Fact-checking AI outputs is not an optional extra step, it is a required part of any responsible AI workflow, because the same mechanism that makes language models fluent (predicting the most statistically plausible next word) is also what makes them capable of stating false information with total confidence. The most important idea in this lesson is that confidence in an AI's tone carries no information about whether a specific claim is actually true.

Why hallucination happens: When a model is asked about something it has limited or ambiguous training data on, it does not have a built-in "I don't know" signal the way a careful human researcher does; instead, it generates the most plausible-sounding continuation, which can include invented statistics, invented citations, invented dates, or a real person attributed with something they never said. This happens most in narrow, technical, recent, or obscure topics.

Outdated training data: Every model has a training cutoff date, and unless it is explicitly connected to a live search or document tool, it cannot know about anything that happened after that point, and it may not reliably say so unprompted. Treat any claim about recent events, current prices, current policies, or current statistics as needing a live source check regardless of how the model phrases it.

Red flags to watch for: Oddly specific numbers with no clear source, citations to papers or articles that cannot be found when searched, quotes attributed to real people, and confident claims about very recent events are all common hallucination patterns worth treating with extra suspicion.

Practical verification techniques: **Cross-reference any specific factual claim against at least one independent, reliable source before using it professionally.** For research tasks, prefer tools that can search the live web or read an attached document over asking the model to answer purely from memory, and explicitly ask the model to flag any part of its answer it is less certain about.

Building fact-checking into the workflow, not after it: The most reliable systems treat verification as a required step in the process, not a task performed only when something looks suspicious, since hallucinated content is often written in exactly the same confident, well-organized style as accurate content, making it genuinely hard to spot by tone alone.`,
  "ape-3-2": `Overview: AI models learn patterns from huge amounts of human-generated text and images, which means they also absorb the biases, stereotypes, and imbalances present in that training data. A responsible AI workflow includes a deliberate bias and safety review step, because unreviewed AI output can reproduce harmful assumptions even when nobody involved intended that outcome.

How bias enters AI output: Training data reflects who wrote the most online content, in which languages, from which regions and perspectives, so outputs can default to assumptions that overrepresent some groups and underrepresent or stereotype others, for example defaulting to a particular gender for a profession, or assuming a Western context when a prompt does not specify one. This is a known, documented limitation of how these systems are built, not an occasional bug.

Common patterns to check for: Watch for stereotyped assumptions about gender, ethnicity, age, or profession in generated text or images; culturally narrow defaults (assuming names, holidays, or settings from one region as the default); and oversimplified or one-sided framing of a topic where multiple legitimate perspectives exist.

Building a safety review checklist: Before publishing AI-assisted content, check it for harmful stereotypes, factually or ethically sensitive claims, content that could be read as excluding or offending a group of your actual audience, and anything that misrepresents a real person or brand. A short, repeatable checklist is more reliable than an ad hoc read-through, because bias in fluent text is often subtle rather than obvious.

Diverse review as a safeguard: Having more than one person, ideally from different backgrounds, review AI-assisted output before it goes out catches assumptions that a single reviewer, especially one similar to the tool's dominant training data perspective, might not notice.

Making it part of the pipeline: Like fact-checking, bias and safety review works best as a defined step in a workflow (for example, before any AI-assisted content moves from draft to approved), rather than something reviewers only remember to do when a piece of content feels obviously risky, since the least obvious bias is usually the kind that causes the most damage.`,
  "ape-3-3": `Overview: A prompt library is an organized, documented collection of tested prompts a person or team can reuse, rather than reinventing prompts from scratch for every recurring task. Where Workflow Templates in Module 2 focused on building one reusable prompt well, this lesson focuses on organizing many of them into a system that scales across a team or a growing business.

What belongs in a library entry: Each entry should include the prompt itself, a short description of its purpose, the expected inputs, an example of good output, and any known limitations or common failure cases. An entry with just the raw prompt text and nothing else forces every new user to rediscover its quirks through trial and error.

Categorization: Organizing prompts by task type (content, design briefs, customer responses, research) or by team function makes a library actually usable as it grows past a handful of entries; an unorganized list of prompts becomes effectively unsearchable once it passes ten or twenty entries.

Maintenance and versioning: **Prompts that worked well with one AI model version can behave differently after a model update, so a library needs periodic review, not just one-time creation.** Keeping a simple changelog per entry (what changed, why, when) helps a team understand why a prompt evolved and revert if a new version underperforms.

Access and permissions: In a business setting, decide who can edit shared prompts versus who can only use them, since an unreviewed edit to a widely used prompt can silently degrade output quality across every future use of that template until someone notices.

Onboarding value: A well-maintained prompt library is one of the fastest ways to bring a new team member up to speed, since it transfers not just finished prompts but the accumulated lessons about what worked, what did not, and why, which otherwise lives only in individual people's heads and gets lost when they move on.`,
  "ape-3-4": `Overview: Automation planning is about deciding deliberately where AI fits into a real workflow and where it does not, rather than either avoiding AI entirely or automating a whole process end-to-end without checkpoints. The core judgment call in this lesson is separating steps that are safe to hand to AI from steps that genuinely require human judgment, and planning for what happens when AI gets a step wrong.

Mapping the existing workflow: Before automating anything, write out the actual current steps of the process as it exists today, including the parts that feel too obvious to mention, because automation plans that skip this step often miss a small manual step that turns out to matter (like a quality check someone does out of habit).

Separating automatable from judgment-required steps: Steps that are repetitive, follow a clear pattern, and have low consequences if imperfect (a first-draft caption, a summary to be reviewed) are good automation candidates. Steps involving final decisions, sensitive client communication, legal or financial commitments, or anything hard to reverse should stay human-led even if AI assists with a draft.

Planning for failure modes: A realistic automation plan asks "what happens when this AI step produces something wrong or unusable" for every automated step, and defines what the fallback is, whether that is a human review checkpoint, an error flag, or a retry with different input, rather than assuming the AI step will always work.

Tool and integration considerations: Different tasks suit different tools (a general chat assistant, a workflow automation platform, an API integration), and connecting AI steps to the rest of a business's existing tools (a spreadsheet, a form, a messaging platform) usually matters more for real usefulness than which specific AI model is used.

Piloting before full rollout: Test an automation plan on a small, low-stakes slice of real work before rolling it out across an entire team or client base, and build in a way to measure whether it is actually saving time or introducing new errors, since automation that quietly creates more review work than it saves is a net loss even if it looks efficient on paper.`,
  "ape-3-5": `Overview: Human-in-the-loop design means deliberately placing approval checkpoints in an AI-assisted workflow so that a person reviews and signs off before an output reaches a customer, client, or public audience. This lesson is about designing where those checkpoints go and what a good approval actually checks for, since a checkpoint that exists in name only provides no real protection.

Where to place approval steps: Approval checkpoints matter most before anything client-facing, financially binding, or difficult to reverse, such as a message that promises a refund, a public social post, or a document representing the business externally. Lower-stakes internal drafts, like a first-pass brainstorm, need lighter or no formal approval.

Defining approval criteria: A checkpoint is only useful if the reviewer knows what to check for, so define a short, specific rubric (accuracy of any factual claims, correct tone and brand voice, no unintended promises or commitments, no bias or safety issues) rather than a vague "does this look okay" review, which different reviewers will apply inconsistently.

Escalation paths for uncertain cases: Build in a clear next step for when a reviewer is unsure whether an AI output is acceptable, such as escalating to a senior team member or subject-matter expert, rather than leaving the reviewer to guess or approve out of time pressure.

Accountability and sign-off: Make it clear who is accountable for an AI-assisted output once it is approved, the same as it would be for any other work product, since "the AI wrote it" is not a valid explanation if an approved output turns out to be wrong, offensive, or damaging; the human approver owns that decision.

Balancing speed against oversight: The purpose of using AI in the first place is usually speed, so approval steps should be designed to be fast and focused (a short rubric check) rather than a slow bottleneck that erases the time savings; over-engineering the review process is its own failure mode, just as under-engineering it is.`,
  "ape-3-6": `Overview: The AI portfolio project is where you demonstrate, with a real piece of work, that you can design, test, and responsibly deploy an AI-assisted system, not just write a single good prompt. This is the project future employers or clients will actually look at, so it should read as a small case study of your judgment, not just a folder of prompts.

Choosing a project worth showing: The strongest portfolio pieces solve a real, specific problem (a content system for a real or realistic small business, a client-response workflow, a research-to-brief pipeline) rather than a generic demonstration of "I can use AI," because a specific, well-scoped problem shows judgment in a way a broad, shallow demo cannot.

Documenting the system, not just the output: Show your prompt structure, your template design, and the reasoning behind key choices (why this constraint, why this role, why this format), the same way a designer presents a process alongside a final visual. A reviewer should be able to see the thinking, not just the finished result.

Demonstrating iteration: Include at least one clear before-and-after example showing how a prompt improved through testing, referencing the testing habits from Module 1, since this is concrete evidence you can refine a system rather than just get lucky once.

Showing safety and fact-check awareness: Explicitly show where you fact-checked an AI claim, caught a biased default, protected sensitive data, or added a human approval step, referencing the practices from this module. This is often what distinguishes a portfolio piece built by someone who understands responsible AI use from one that simply showcases flashy output.

What stands out to employers and clients: A portfolio piece that shows a real problem, a documented system, evidence of testing, and visible judgment about risk and accuracy signals someone who can be trusted with AI in a professional setting, which is a genuinely scarce and valuable skill as more businesses adopt these tools without a clear process for using them responsibly.`,
  "ape-3-7": `Overview: This final checkpoint asks you to demonstrate a complete, responsible AI system, pulling together every skill from the course: prompt construction, context and role design, constraints and formats, few-shot examples, creative and business workflow prompting, fact-checking, bias and safety review, prompt libraries, automation planning, and human approval steps. "Ready" here means the system could genuinely be handed to a small business or team and trusted, not just that it produces impressive-looking output once.

What a ready system looks like: A ready AI system has well-tested prompts or templates for its core tasks, a clear map of which steps are automated and which require a human, defined approval checkpoints before anything reaches a client or the public, and a documented plan for what happens when the AI gets something wrong. Missing any one of these leaves a real gap, even if the individual prompts are well written.

The full readiness checklist: Prompts are tested against varied inputs, not just one happy case; outputs have a defined fact-checking step for factual claims; there is a bias and safety review built into the process; sensitive data handling has been considered; prompts are documented in a library or template format a new team member could pick up; and there is a named human accountable for final approval.

Presenting the system to stakeholders: When presenting a completed system, lead with the real problem it solves and the risk it manages, not just the AI capability it uses, since a non-technical stakeholder (a small business owner, a client) cares about reliability, cost, and trust far more than which specific technique was used to build it.

What happens after graduation: Prompting practice and model capabilities will keep changing, so a genuinely ready system also includes a plan for periodic review, since prompts, templates, and workflows built today will need revisiting as tools update, exactly like the versioning habit covered in Prompt Libraries.

Closing note: Finishing this course means you can build AI-assisted systems responsibly, not that AI oversight becomes unnecessary; the habits of testing, verifying, and reviewing built across this course are the actual, durable skill, and they remain necessary regardless of how much more capable future tools become.`,
};

const photoshopExpansionContent: Record<string, string> = {
  "ps-6": `Overview: **Color is the fastest signal a poster or social media post sends before anyone reads a word.** This lesson builds a working vocabulary for hue, saturation, and contrast so you can choose colors on purpose instead of by accident, and shows how to build small palettes that feel calm, energetic, or premium depending on what the client is selling.

Hue, saturation, and value: **Hue is the color itself (red, blue, orange) as it sits on the color wheel in the Color Picker or the Hue/Saturation adjustment.** Saturation is how intense or washed-out that color looks, and value (brightness) is how light or dark it is. In Photoshop, open Image > Adjustments > Hue/Saturation (or add it as a non-destructive adjustment layer from the Layers panel) to push a color toward vivid or muted without repainting anything. Muted, lower-saturation palettes usually read as premium or calm; high-saturation combinations read as energetic and youthful.

Contrast and legibility: **Contrast is the difference in lightness between elements, and it is what actually makes text readable over a background, not font size alone.** A light headline needs a dark backing shape, image area, or a semi-transparent rectangle behind it; checking this in grayscale (Image > Adjustments > Black & White as a temporary adjustment layer) quickly reveals whether text will disappear into a busy photo.

Color temperature: **Warm colors (reds, oranges, yellows) advance and feel active or urgent, which suits sales and event posters.** Cool colors (blues, greens, purples) recede and feel trustworthy or calm, which suits corporate, tech, or wellness campaigns. Mixing warm and cool without a reason usually produces a poster that feels indecisive, so pick one temperature to dominate and use the other only as an accent.

Color harmony schemes: **Complementary schemes (colors opposite each other on the wheel, like orange and blue) create high energy and strong contrast, ideal for sale banners.** Analogous schemes (colors next to each other, like blue-green-teal) feel calm and cohesive, good for lifestyle or wellness brands. Triadic schemes (three evenly spaced colors) give variety while staying balanced, and monochromatic schemes (one hue in different tints and shades) feel the most premium and controlled.

Building a working palette: A practical poster palette has one dominant color (60% of the design), one secondary color (30%), and one accent color (10%) reserved for calls to action or highlights, similar to interior design's 60-30-10 rule. Build this as a set of small color swatches saved in the Swatches panel (Window > Swatches) at the start of a project so every layer you add afterward pulls from the same limited set instead of drifting into random colors.`,
  "ps-7": `Overview: **A poster with good colors can still fail if the layout feels crowded or unbalanced.** This lesson focuses on composition: how margins, alignment, the rule of thirds, and consistent spacing turn a pile of elements into a layout the eye can follow, and walks through the process of taking a crowded flyer and rebalancing it.

Margins and safe space: **Every poster needs a consistent margin between its content and the edge of the canvas so nothing feels like it is falling off the page.** Set this up early using View > New Guide Layout or by dragging guides from the rulers (View > Rulers, or Ctrl/Cmd+R), and keep the same margin distance on all sides unless there is a deliberate design reason to break it. Cramped or inconsistent margins are one of the fastest ways a flyer looks amateur.

Alignment: Photoshop's Move tool options bar includes alignment buttons (align left, center horizontally, align top, center vertically, and so on) that work once multiple layers are selected in the Layers panel. Elements that share an edge or a center line read as intentional; elements scattered at slightly different positions read as sloppy, even if the difference is only a few pixels. Distribute Spacing (also in the Move tool options bar) evens out gaps between three or more selected layers.

Rule of thirds and focal points: **Enable View > Show > Grid, or the rule-of-thirds overlay in the Crop tool options bar, to divide the canvas into a 3x3 grid.** Placing the main subject, headline, or logo near one of the four intersection points is generally more dynamic than dead-centering everything, and it leaves room for supporting text and negative space to breathe around the focal point.

Hierarchy through spacing and size: Visual hierarchy means the most important element (usually the headline or the main subject) should be the largest and highest-contrast, with supporting details (date, venue, contact info) smaller and quieter. Consistent spacing between groups of related text (using the Character and Paragraph panels for line and paragraph spacing) signals what belongs together, following the same proximity principle used in general design.

From crowded to balanced: **When a flyer feels overloaded, the fix is rarely to shrink everything; it is to cut or group.** Group related items with Ctrl/Cmd+G into layer groups, remove decorative elements that do not support the message, increase the margin, and make sure only one element competes for the viewer's first glance. Reviewing the layout at 25% zoom (View > Zoom Out, or the zoom percentage box) helps reveal whether the composition still reads clearly from a distance.`,
  "ps-8": `Overview: **Client-supplied photos are rarely perfect straight out of the camera or phone.** This lesson covers correcting exposure, contrast, white balance, highlights and shadows, sharpness, and noise, using Camera Raw and Photoshop's core adjustment tools, so a dull or low-quality photo becomes usable in a poster or campaign.

Opening Camera Raw: Any photo layer can be sent through Filter > Camera Raw Filter (shortcut Ctrl/Cmd+Shift+A), which opens the same correction engine used for RAW camera files, but applied directly to a pixel layer inside Photoshop. Converting the layer to a Smart Object first (right-click the layer > Convert to Smart Object) makes the Camera Raw Filter re-editable later instead of baking the correction in permanently.

Exposure and contrast: **The Exposure slider in Camera Raw's Basic panel brightens or darkens the overall image, while Contrast increases or decreases the gap between light and dark tones.** A photo that looks flat usually needs a moderate contrast increase; a photo that looks too dark or too bright needs exposure correction first, before touching color, since a wrong exposure throws off every later judgment.

White balance: The White Balance tool (the eyedropper in Camera Raw's Basic panel, or the Temperature and Tint sliders) corrects color casts caused by mixed lighting, such as an orange cast from indoor bulbs or a blue cast from shade. Clicking the White Balance eyedropper on something that should be neutral gray or white in the photo is the fastest way to correct an off color cast before fine-tuning Temperature and Tint manually.

Highlights, shadows, and detail: The Highlights slider pulls back blown-out bright areas (like an overexposed sky), and the Shadows slider lifts detail out of dark areas without brightening the whole image, giving photos more dynamic range. The Texture and Clarity sliders add midtone definition, while Dehaze cuts through flat, hazy-looking shots.

Sharpness and noise: The Detail panel in Camera Raw controls Sharpening (which adds edge definition, useful after resizing) and Noise Reduction (which smooths the grainy speckling common in low-light or high-ISO phone photos). Noise reduction and sharpening pull in opposite directions, so both should be applied conservatively and checked at 100% zoom, since oversharpening emphasizes noise and over-smoothing softens real detail.`,
  "ps-9": `Overview: **A social media campaign only works if it looks like one connected set, not three unrelated posts.** This lesson covers keeping colors, typography, logo placement, spacing, and hierarchy consistent across square, story, and status formats, and builds a 3-post campaign from one shared design system.

Setting up multi-format documents: **Start each format as its own document sized to its platform: a square post at 1080x1080px, a story or status format at 1080x1920px, both usually at 72 DPI for screen.** Rather than rebuilding each one from scratch, design the square post first, then use Image > Canvas Size or File > New from the same PSD, or drag layer groups between documents, to reuse the same logo, color, and type layers across formats.

Consistent color and typography: **Save the campaign's colors as swatches (Window > Swatches) and reuse the same two or three fonts across every post, controlled through the Character panel.** Mixing fonts or colors between posts breaks the sense that they belong to the same campaign, even if each individual post looks fine on its own; consistency is what makes a set of posts read as one campaign rather than three separate flyers.

Logo placement and spacing: Pick one consistent position for the logo (for example, top-left or bottom-right) and one consistent size relative to the canvas, then keep that position across every format in the campaign. Use guides (View > New Guide) to mark the exact logo position once, and reuse those guide positions when building the next format so the brand mark does not visually jump between posts.

Hierarchy across formats: The story and status formats are taller and viewed briefly while scrolling, so the most important message needs to sit in the upper two-thirds where thumbs and UI overlays (captions, reply bars) are less likely to cover it. The square post has more balanced space, so hierarchy there can rely more on size and placement than on vertical positioning alone.

Building the 3-post set: A simple, effective 3-post campaign structure is: one announcement post (what/when), one benefit or feature post (why it matters), and one call-to-action post (how to act, such as a link or contact). Keep the same background treatment, color palette, and logo placement across all three, and organize each format's layers into named groups (double-click a group name to rename it) so the file stays easy to hand off or revise later.`,
  "ps-10": `Overview: **Product mockups let a client see their design on a phone screen, t-shirt, package, poster, or billboard before anything is printed.** This lesson covers using Smart Objects to place artwork into mockup templates while preserving shadows, perspective, and full editability.

What a Smart Object does here: **A Smart Object is a layer that keeps its contents as an embedded, editable unit rather than flattened pixels.** Most mockup templates (phone screens, t-shirts, packaging) are built with a placeholder Smart Object layer, usually labeled something like Your Design Here. Double-clicking that Smart Object's thumbnail opens it in its own document; pasting or placing the design inside that document and saving (Ctrl/Cmd+S) automatically updates the design back in the mockup, wrapped in the template's existing lighting and perspective.

Placing your own design as a Smart Object: **When building a mockup from scratch, use File > Place Embedded to bring the design in as a Smart Object rather than pasting flat pixels.** This keeps the design scalable without quality loss and re-editable later; Free Transform (Ctrl/Cmd+T) on a Smart Object can be undone and redone without degrading the image, unlike repeated transforms on a rasterized layer.

Preserving perspective: **Many mockups need the design warped to match a surface, such as a t-shirt fold or an angled phone screen.** Edit > Transform > Warp, or Edit > Puppet Warp for more complex bends, lets the design bend around the surface. For flat-angle perspective (like a poster on a tilted wall), Edit > Transform > Distort or Perspective aligns the corners of the design to the corners of the mockup's surface guide.

Shadows, texture, and blending modes: **Realistic mockups need the original texture and shadow information from the product photo to show through the new design.** Placing the shadow/texture layer above the design layer and setting its blend mode to Multiply (for shadows) or Overlay/Soft Light (for fabric texture or folds) lets the surface detail show through while the design colors stay visible underneath.

Delivering editable mockups: Because the design lives inside a Smart Object, a client can later request a color change or new text without re-doing the whole mockup: reopen the Smart Object, edit, save, and the mockup updates automatically. Always deliver the final mockup as both a flattened JPEG or PNG for quick viewing and the layered PSD so future edits do not start from scratch.`,
  "ps-11": `Overview: **A design that looks perfect on screen can fail at the print shop if the size, bleed, resolution, or color mode is wrong.** This lesson covers preparing files for correct output size, bleed, safe margins, 300 DPI resolution, CMYK awareness, and professional PDF delivery.

Document size and resolution: **Print documents should be set up in File > New at their final physical size (in inches, cm, or mm) with Resolution set to 300 pixels/inch, not 72.** Checking Image > Image Size mid-project confirms the resolution has not dropped, since scaling a low-resolution screen graphic up to 300 DPI will not add real detail, only blur it.

Bleed and safe margins: **Bleed is extra artwork, typically 3mm (about 0.125in), that extends past the trim edge so that no white sliver appears if the cut shifts slightly.** Set this up when creating the document by adding the bleed amount to the canvas size (Image > Canvas Size) beyond the final trim dimensions, and keep any background color or image extending fully into that bleed area. Safe margin is the opposite: important text and logos should stay a comfortable distance inside the trim edge, typically 3-5mm, so nothing gets cut off by trimming variance.

Color mode for print: RGB is built for screens; CMYK is the standard color model most commercial printers expect, since it corresponds to the four inks (cyan, magenta, yellow, black) used on press. Switching a finished design via Image > Mode > CMYK Color lets you preview how colors shift, since CMYK has a smaller color range than RGB and bright saturated colors (especially neon-like tones) can look duller after conversion; it's best to check this conversion before final delivery, not after.

Marks and bleed in the Print dialog: When printing directly from Photoshop, File > Print opens a dialog with a Marks & Bleed section on the left side, where Corner Crop Marks can be enabled to show the trim line, and a Bleed option lets you specify the bleed amount so it prints correctly outside the trim marks.

Professional PDF delivery: For sending files to a print shop, File > Save As (or File > Export > Export As, depending on version) with the Photoshop PDF format, using a Press Quality or print-ready preset, embeds fonts, keeps resolution at 300 DPI, and can include crop marks and bleed settings in the PDF export dialog. Always label the delivered file clearly with size and version, for example Poster_A3_Print_v2.pdf, so the print shop and client both know exactly what they are opening.`,
  "ps-12": `Overview: **Cutting a subject out of a photo is easy; making it look like it was actually photographed in the new scene is the real skill.** This lesson covers matching light direction, adding contact shadows, balancing color, and controlling depth, blur, and edges so a composite reads as real rather than pasted.

Reading the direction of light: Before placing a cut-out subject into a new background, study where the light source falls in the background image: which side has highlights, which side has shadow, and how long shadows fall. The subject's own lighting (visible in the original photo) needs to roughly match; a subject lit from the left placed into a scene lit from the right will always look pasted, no matter how clean the cutout edges are.

Contact shadows: **A contact shadow is the small, soft, dark shadow where an object touches the ground or surface beneath it; without it, subjects appear to float.** Create one on a new layer beneath the subject, painted or filled with a soft-edged black brush at low opacity, or built from a duplicated silhouette of the subject that is filled black, blurred with Filter > Blur > Gaussian Blur, and reduced in opacity around 30-50%. Set the shadow layer's blend mode to Multiply so it darkens naturally instead of covering the background.

Color balance and depth: Use Image > Adjustments > Color Balance or a Color Balance/Curves adjustment layer clipped to the subject (Alt/Option-click between the layers to clip) to shift the subject's color temperature to match the background's ambient light, such as adding warmth if the background is a golden-hour scene. Distant elements typically appear slightly desaturated and cooler due to atmospheric haze, so subjects meant to sit far away can be pushed slightly cooler and less saturated to read as further back.

Blur for depth of field: If the background photo has a shallow depth of field (blurred background, sharp foreground), the composited subject needs matching sharpness, and any new background layers behind it may need Filter > Blur > Gaussian Blur or Lens Blur applied to match the amount of blur already present, so the focus plane stays believable.

Edge cleanup: Even a good selection (made with the Select Subject button, Object Selection Tool, or Select and Mask workspace) often leaves a slight color fringe from the original background. Select and Mask's Decontaminate Colors option removes this fringe, and a very subtle Gaussian blur (1-2px) on the mask edge, or a soft eraser pass at low opacity along the outline, prevents a hard cutout line from giving the composite away.`,
  "ps-13": `Overview: **Editorial and expressive design often calls for effects beyond simple photo correction, such as double exposure, textured overlays, or dramatic color grading.** This lesson covers using masks, gradients, blending modes, textures, and adjustment layers together to build these creative effects in a controlled, non-destructive way.

Double exposure with layer masks: **A classic double exposure blends a portrait silhouette with a second image (often a landscape or texture) so the second image appears to fill the silhouette.** Place the portrait and the second image as separate layers, select the portrait's silhouette (Select Subject or a manual selection), and add a layer mask (Layer > Layer Mask > Reveal Selection) to the top image so it only shows through the silhouette shape. Painting on the mask with a soft black or white brush at varying opacity fine-tunes where the second image blends in and fades out.

Gradients for direction and mood: The Gradient Tool (G) can be applied to a layer mask, not just to color, to fade one image or effect smoothly into another; dragging a black-to-white gradient across a mask creates a soft transition instead of a hard edge. A Gradient Map adjustment layer (Image > Adjustments > Gradient Map, or as an adjustment layer) remaps an image's tones to a chosen gradient of colors, which is a fast way to build a cohesive, moody color grade across a whole composite.

Blending modes for texture and light: **Blending modes control how a layer's pixels interact with the layers beneath it.** Screen brightens and is useful for adding light leaks, sparks, or glowing elements over a dark image. Multiply darkens and works well for adding texture or grunge overlays. Overlay and Soft Light both increase contrast while letting midtones show through, useful for adding paper or fabric texture without hiding the image underneath.

Texture overlays: A scanned paper, grunge, or noise texture placed above the composite and set to Overlay, Soft Light, or Multiply (tested to see which looks best for that image) adds tactile depth. Reducing that texture layer's opacity, or masking it so it only affects certain areas, keeps the effect from overwhelming the main subject.

Adjustment layers for cohesive grading: Curves (Image > Adjustments > Curves, or as an adjustment layer) gives the most precise control over tone and color, letting you lift shadows, crush highlights, or introduce a color cast by moving individual channel curves. Stacking a Curves layer above the whole composite, followed by a subtle Gradient Map at low opacity, ties every element (portrait, texture, background) together under one consistent mood.`,
  "ps-14": `Overview: This graduation project for the Advanced Compositing module pulls together everything from the last three lessons: realistic light and shadow blending, expressive masking and color effects, and the layout, typography, and print skills from earlier in the course, into one finished brand poster ready for delivery.

Planning the poster around a brief: Before opening Photoshop, define the poster's single goal (announce an event, promote a product, build brand mood), its final size (screen or print, which decides DPI and color mode from Lesson 11), and its one dominant focal point. A poster trying to say five things at once usually says nothing clearly, so the planning stage should force a single headline message.

Composite and lighting: If the poster uses a product or model cut from one photo and placed into another background, apply the lighting-matching, contact-shadow, and color-balance techniques from Lesson 12 (Multiply-mode shadows, clipped Color Balance or Curves adjustments, and Select and Mask's Decontaminate Colors) so the composite reads as one photographed scene rather than a visible cutout.

Creative color and texture pass: Layer in the expressive techniques from Lesson 13, such as a Gradient Map at reduced opacity for overall mood, a texture overlay set to Overlay or Soft Light for tactile depth, and blending modes like Screen for any highlight or glow effects, keeping every creative layer subtle enough that it supports the message instead of fighting the headline for attention.

Layout, hierarchy, and color palette: Apply the composition principles from earlier lessons: consistent margins, alignment using the Move tool's align and distribute options, a rule-of-thirds focal point, and a 60-30-10 color palette built from Swatches. The headline should be the largest, highest-contrast element; supporting details (date, venue, contact, logo) should be smaller and placed with consistent spacing.

Mockup and export: Present the finished poster inside a realistic mockup (a framed poster, a billboard, or a phone/tablet screen, per Lesson 10) using a Smart Object so the design stays swappable, and prepare the final files per Lesson 11's standards: 300 DPI and CMYK if it is going to print, with bleed and safe margins built into the canvas, plus a Press Quality PDF export, or 72 DPI RGB PNG/JPEG if it is a digital poster. Label deliverables clearly (for example BrandPoster_v3_Print.pdf and BrandPoster_v3_Web.png) and keep the full layered PSD for future edits.`,
  "ps-15": `Overview: **Great design work starts before Photoshop is even open.** This lesson covers translating a client's goals into clear creative direction: asking better questions, studying competitors, gathering references, and defining concrete deliverables so the design phase starts with clarity instead of guesswork.

Asking better questions: A vague brief like "make it look modern" needs to be turned into specifics through direct questions: Who is the audience? What action should they take after seeing this? Where will it be used (WhatsApp status, printed banner, Instagram feed)? What has worked or failed in past materials? Asking about the goal and the audience first, before asking about colors or style, prevents building a beautiful design that solves the wrong problem.

Competitor and market study: Looking at what similar businesses or events are already producing reveals the visual norms of that space (colors, tone, typical layouts) and where there's room to stand out. This is not about copying; it's about knowing what blending in looks like in that market so a deliberate choice can be made to either fit in or break the pattern for a reason.

Gathering references: Collecting 3-5 reference images (saved in a folder or a moodboard) that show a desired mood, color palette, or layout style gives the client and designer a shared visual language before any pixels are placed. References should be discussed with the client early, since terms like modern or premium can mean very different things to different people, and confirming a direction with references avoids wasted revision rounds later.

Translating goals into a creative brief: A useful internal brief captures: the single core message, the target audience, the required formats and sizes (tying back to output standards like DPI and dimensions from earlier lessons), the brand colors and fonts if any exist, and the deadline. Writing this down, even briefly, before opening Photoshop keeps the design decisions grounded in the client's actual goal rather than personal preference.

Setting deliverable expectations upfront: Before starting, confirm exactly what will be delivered: how many concepts, which file formats, whether both print and digital versions are needed, and how many rounds of revision are included. Agreeing on this early, as covered further in the next lesson on revision management, prevents scope confusion once design work is underway.`,
  "ps-16": `Overview: **Professional design work rarely ends after one draft.** This lesson covers managing revisions cleanly: labeling versions so nothing gets overwritten by mistake, separating genuine corrections from personal preference requests, and delivering an organized final file set to the client.

Version labeling: Every saved revision should have a clear, consistent filename that includes the project name, a version number, and sometimes the date or stage, for example ClientName_Poster_v1.psd, ClientName_Poster_v2.psd, ClientName_Poster_FINAL.psd. Never overwrite a previous version by saving over it with the same filename; instead use File > Save As to create a new version number, so earlier drafts stay available if the client wants to revert or compare.

Using layer comps and groups for versions: Rather than duplicating an entire document for small variations (like two headline options), Photoshop's Layer Comps panel (Window > Layer Comps) can save different combinations of layer visibility, position, and style within one file, making it easy to flip between design options for a client without managing multiple separate files. Naming layer groups clearly (double-click the group name) also makes it obvious what each part of the file controls when revisiting it weeks later.

Corrections versus preferences: **A correction is fixing something objectively wrong: a misspelled word, wrong date, low-resolution logo, or incorrect contact details.** A preference is a subjective request, such as making the blue a bit brighter or trying a different font. Both are valid, but they should be tracked separately, since corrections are usually non-negotiable and quick, while preference changes may need discussion about how they affect the layout, brand consistency, or hierarchy established earlier in the project.

Tracking feedback: Keeping a simple running list (even a basic text note per revision round) of what feedback was requested and what was changed prevents feedback from getting lost or a client re-requesting something already addressed. Each revision round should be summarized briefly to the client to confirm exactly what changed, reducing back-and-forth confusion.

Organizing the final handover: Once approved, the final deliverable folder should be organized clearly: the layered PSD, the final flattened exports (JPEG/PNG for digital, PDF for print, following the standards from Lesson 11), and any mockup files, each clearly named and dated. Removing old, unused draft versions from the delivery folder (while keeping them in a personal archive) keeps the client's final package clean and unambiguous about which file is the approved one.`,
  "ps-17": `Overview: This capstone lesson closes out the whole Photoshop Masterclass by teaching how to package and present finished work as a portfolio piece: showing the goal, the process, before-and-after comparisons, mockups, and captions that explain the thinking, not just the final image.

Starting with the goal: Every portfolio case study should open with a short statement of the original brief or goal, similar to the client-brief thinking from Lesson 15: who the piece was for, what problem it solved, and what format it needed to work in. A finished poster shown with no context asks a viewer to guess why decisions were made; a finished poster shown with its goal stated demonstrates that the designer solves problems, not just makes pretty images.

Showing process, not just results: Including a few in-progress screenshots (the Layers panel with named groups, a Camera Raw correction before/after, an early rough layout) shows how the final piece was built, which is often more convincing to potential clients or employers than the final image alone. Screenshots can be captured with Photoshop's own screen tools or the operating system's screenshot function, then placed into a simple portfolio layout as supporting images around the main piece.

Before-and-after comparisons: For photo correction work (Lesson 8) and composite work (Lesson 12), a clear side-by-side or split before/after image is one of the most persuasive portfolio formats, since it makes the designer's specific contribution obvious rather than assumed. These can be built directly in Photoshop by placing the original and corrected versions side by side on one canvas with a simple divider line and small labels.

Presenting with mockups: Rather than showing a flat poster or graphic on a plain background, presenting it inside a realistic mockup (a framed poster, a phone screen, a printed flyer in someone's hand) using the Smart Object mockup skills from Lesson 10 makes the work feel real-world and applied, not just a digital file. Consistency in how each project is mockup-presented across the whole portfolio makes the collection feel professional and cohesive.

Writing captions that explain thinking: **A short caption under each piece (2-3 sentences) explaining the brief, one key design decision, and the outcome gives context that the image alone cannot.** For example: Brand poster for a Nairobi coffee pop-up. Used a warm monochromatic palette and rule-of-thirds placement to keep the focus on the product photo. Delivered as both a 300 DPI print PDF and a 72 DPI social version. This kind of caption, applied consistently across the graduation project and other course work, turns a folder of images into a portfolio that explains why the designer made the choices they did.`,
};

const illustratorExpansionContent: Record<string, string> = {
  "ai-4": `Overview: Fill and stroke are the two properties that define how every shape looks in Illustrator: fill is the color or pattern inside a path, and stroke is the color and weight applied to the path's outline. The Appearance panel (Window > Appearance) is the control center for both, and mastering it is what separates flat, generic vector shapes from a polished, consistent icon set.

Fill and stroke basics: **Every path can carry one fill and one stroke, set from the Fill and Stroke swatches near the bottom of the Toolbar.** Clicking the small arrow icon in that same area swaps fill and stroke instantly, and clicking the tiny black-and-white icon resets both to default. A shape with no fill (just an outline) or no stroke (just solid color) is common in icon work, so always check both boxes before assuming a shape is broken.

Stroke weight, caps, and corners: **The Stroke panel (Window > Stroke) controls weight in points, plus cap and corner style.** Butt Cap ends a line flush at the anchor point, Round Cap adds a semicircle beyond it, and Projecting Cap extends a square edge past the point. Corner options are Miter (sharp), Round, and Bevel (flattened). For an icon set, picking one stroke weight (for example 2pt) and one cap/corner combination and reusing it on every icon is what makes the set read as a single family rather than mismatched pieces.

Opacity and blending: The Transparency panel (Window > Transparency) sets opacity per object or per appearance attribute, and also offers blending modes like Multiply and Screen for layering colors. Lowering opacity on a fill while keeping the stroke at 100% is a common way to create tints or shadow layers without duplicating artwork.

The Appearance panel: The Appearance panel lists every fill, stroke, and effect applied to a selected object, stacked in editing order, and lets you add multiple strokes or fills to a single path (for example, a thick stroke behind a thin one to fake an outline effect). Because these are live attributes, not baked-in edits, you can change a stroke weight or fill color later and it updates everywhere that appearance is used, which is essential when a client asks for a color change across an entire icon set.

Building a consistent icon set: **When building an icon set, define the fill/stroke rules once (weight, cap, corner, color) and apply them consistently to every new icon rather than eyeballing each one.** Using the same rules keeps icons visually unified even when drawn on different days or by different team members, and it is one of the first things a design reviewer checks in a submitted icon pack.`,
  "ai-5": `Overview: **Typography in Illustrator is not just picking a font; it is choosing type that stays legible, spaces correctly, and behaves reliably once a file leaves your machine.** This lesson covers using the Type Tool professionally, reading and adjusting spacing, and knowing exactly when to convert text to outlines.

Using the Type Tool professionally: **The Type Tool (T) creates point text (click once, type freely) or area text (click-drag a box, text wraps inside it).** Point text suits short labels like a logotype or a single headline; area text suits paragraphs like a brand guide description. The Character panel (Window > Type > Character) controls font, size, leading (line spacing), tracking (overall letter spacing), and kerning (spacing between a specific pair of letters), while the Paragraph panel controls alignment and spacing between paragraphs.

Choosing readable fonts: A readable font has clear letterforms at the size it will actually be used, consistent stroke weight, and enough distinction between similar characters (like uppercase I and lowercase l). For body text and instructional graphics, simple sans-serif fonts usually read faster than decorative display fonts, which should be reserved for logos, headlines, or short accents.

Spacing and tracking control: Tight tracking (negative values) can make large display headlines feel bold and confident, but body text needs looser, more even tracking to stay readable, especially at small sizes. Kerning matters most in logotypes, where pairs of letters (like AV or To) can look awkward without manual adjustment, since automatic spacing is built for paragraphs, not custom lockups.

Converting text to outlines: **Type > Create Outlines converts live, editable text into vector paths, so the shapes no longer depend on the font being installed on whichever computer opens the file.** This is essential for final logo and print files, because a missing font on a printer's or client's machine can silently substitute a different typeface or break the layout entirely. However, outlined text can no longer be edited as text (spell-checked, retyped, or have its font swapped), so you only outline text on a final, checked copy while keeping the original editable AI file with live text intact for future changes.

Workflow discipline: A safe professional workflow is: finish and proofread all text as live type, save that editable master file, then duplicate it, run Create Outlines on the duplicate, and export that outlined version for delivery or print. This way you always retain an editable source if changes are needed later.`,
  "ai-6": `Overview: **A brand rarely uses just one color correctly by accident; it uses the same exact colors every time on purpose.** This lesson covers building reusable swatches, understanding global colors, and using gradients and tints in a controlled way so brand artwork stays consistent across every file.

The Swatches panel: **The Swatches panel (Window > Swatches) stores colors, gradients, and patterns you plan to reuse.** Dragging a color from the Color panel into the Swatches panel saves it permanently for that document, and naming swatches clearly (like "Brand Blue" instead of leaving the default color code as the name) makes them easy to find later, especially in files with dozens of colors.

Global colors and why they matter: **A Global Color is a swatch that, when edited, automatically updates every object using it throughout the document.** You create one by checking the "Global" checkbox when creating or editing a swatch (indicated by a small white triangle in the corner of the swatch icon). Global colors are essential for brand work because if a client changes their brand color, you edit the swatch once and every logo variation, icon, and layout using that swatch updates instantly, instead of manually reselecting and recoloring dozens of objects.

Tints without breaking the brand color: **A tint is a percentage of a global color's full strength (for example, a 50% tint of Brand Blue is a lighter, softer version of the exact same hue).** The Color panel lets you drag a tint slider on a global color to create these lighter variants, and because they are tied to the original global swatch, editing the base color still updates every tint automatically. This is how brand systems create a full palette from one core color without introducing random, unrelated shades.

Gradients: **The Gradient panel (Window > Gradient) builds smooth transitions between two or more colors along a linear or radial path.** Gradient stops can be built from global colors too, so a gradient can stay on-brand and update automatically if the base colors change. Gradients work well for depth and dimension in illustrations, but should be used sparingly in flat, systemized icon or logo work where flat color usually reads cleaner.

Consistency across files: For multi-file brand projects, the most reliable method is building one master swatch library and reusing it (via copy-paste or the Swatch Libraries menu) across every new file, rather than rebuilding colors from scratch each time, which is the most common source of small, inconsistent brand color mismatches.`,
  "ai-7": `Overview: **A strong logo is not the first shape you draw; it is the result of research done before you ever open Illustrator.** This lesson covers understanding a brand's audience and message, exploring symbols and concepts, and sketching roughly before committing to any final vector.

Starting with research: Before sketching, gather what the brand actually stands for: its name, industry, target audience, competitors, and any personality words the client uses to describe it (modern, playful, trustworthy, premium). Looking at competitor logos in the same industry helps you avoid accidentally creating something too similar, while also revealing visual conventions the audience already expects (like shields for security brands or leaves for organic products).

Understanding the audience: **A logo aimed at children's education should not use the same visual language as a logo for a law firm, even if both are well designed.** Ask who will see this logo most often, where (app icon, storefront sign, business card), and what feeling it needs to create in under two seconds, since most people process a logo's first impression almost instantly.

Symbol exploration: **List multiple possible symbols connected to the brand's name, industry, or values before drawing any of them politely.** For a coffee brand this might include a cup, a bean, steam, a sunrise, or a mountain (for origin). Writing this list first, even ten or fifteen rough ideas, prevents fixating on the first idea that comes to mind, which is rarely the strongest one.

Rough sketching before vectors: **Sketching by hand or with the Pencil Tool at a small, rough scale forces you to focus on the overall shape and silhouette rather than perfecting curves too early.** Good logo sketches should work as a small, simplified silhouette; if a concept only makes sense with fine detail, it will likely fail at small sizes like a favicon or app icon later.

Narrowing concepts before building: After sketching many rough options, narrow to two or three concepts that best represent the brand's audience and personality, and only then move into Illustrator to begin building clean vector versions. Skipping straight to polished vector work before this narrowing step usually wastes time refining an idea that should have been discarded early.`,
  "ai-8": `Overview: **A rough sketch becoming a professional logo happens in the refinement stage, where loose ideas are rebuilt with precise vector control.** This lesson covers using grids and alignment tools, adjusting for optical balance, and testing a logo in black-and-white to confirm it works without relying on color.

Rebuilding on a grid: **Once a concept is chosen, rebuild it in Illustrator using the Pen Tool and basic shapes rather than tracing the sketch loosely.** Turning on View > Show Grid, or building a simple guide grid with the Line Segment Tool and Align panel, gives consistent reference points for width, height, and spacing between logo elements, which a freehand sketch cannot guarantee.

Alignment and the Align panel: The Align panel (Window > Align) distributes and aligns selected objects relative to each other, to the artboard, or to a key object (select multiple objects, then click one again to set it as the alignment anchor). Precise alignment of a symbol against a wordmark, such as centering it vertically or matching left edges, is what makes a logo lockup feel deliberate rather than accidental.

Optical balance versus mathematical balance: **Perfectly centering shapes mathematically does not always look centered to the eye.** Circular or angular shapes often need to sit slightly higher, lower, or larger than a mathematically centered position to appear balanced, because human perception weighs shapes differently based on their form. Zooming out and viewing the logo small, or flipping it horizontally to spot asymmetry, are quick ways to catch optical imbalance that is easy to miss up close.

Black-and-white testing: A professional logo must work in pure black on white (and reversed, white on black) because it will eventually appear on invoices, stamps, engravings, or low-cost print where color is not available. Select the logo and temporarily apply solid black fill to every element (or use View > Overprint Preview mentally as a check) to confirm the design still reads clearly and the shapes remain distinct without relying on color to separate them.

Final refinement pass: Once alignment, optical balance, and black-and-white legibility are confirmed, do a last check of stroke weights and corner consistency (tying back to Appearance panel skills) so the refined logo is ready to move into building the brand guide.`,
  "ai-9": `Overview: **A logo alone is not a brand system; a brand guide is what tells everyone else how to use that logo correctly.** This lesson covers the essential pieces of a simple brand guide: logo versions, clear space, color codes, fonts, examples of wrong usage, and sample applications.

Logo versions: A usable brand guide documents every approved version of the logo: the full lockup (symbol plus wordmark), the symbol alone (for small spaces like app icons or social avatars), a horizontal layout, and sometimes a stacked or vertical layout for different placements. Each version should be shown clearly labeled so anyone using the brand knows which file to grab for which situation.

Clear space rules: **Clear space defines the minimum empty margin that must surround a logo so it never touches other text, images, or the edge of a layout.** A common method is to measure clear space using a part of the logo itself as a unit (for example, using the height of the symbol as the minimum margin on all sides), which scales correctly no matter how large or small the logo is placed.

Color codes: The brand guide must list exact, reproducible color values for every brand color: HEX for web and screen use, RGB for digital design, and CMYK for print, since a color that looks correct on screen (RGB) can shift noticeably when printed in CMYK if not specified precisely. These values tie directly back to the global color swatches built during the color systems stage, so the guide simply documents the values already defined in the file.

Approved fonts: **List the exact typeface names (and weights, like Regular, Bold, or Semibold) approved for headlines and body text, plus any specific typography used in the logo itself.** This prevents a team member from substituting a similar-looking but different font, which subtly breaks visual consistency across materials.

Wrong usage and sample applications: Showing clear "do not" examples, like stretching the logo, changing its colors, rotating it, adding a drop shadow, or placing it on a low-contrast background, prevents common misuse more effectively than only showing the correct version. Pairing these rules with a few sample applications (business card, social post, signage) helps whoever uses the guide see the system working in a real, practical context rather than as an abstract set of rules.`,
  "ai-10": `Overview: **A single great icon is easy; twenty icons that all look like they belong together is the actual skill.** This lesson focuses on the specific consistency rules that hold an icon set together: shared stroke weight, corner style, visual size, spacing, and level of detail.

Consistent stroke weight: **Every icon in a set should use the same stroke weight (for example, always 2pt), set once in the Stroke panel and reused rather than adjusted per icon.** Mixing a 1pt icon next to a 3pt icon in the same row immediately looks like an error, even if both icons are individually well drawn, because the eye notices weight mismatches faster than shape differences.

Corner style consistency: **Decide once whether the set uses sharp corners, fully rounded corners, or a specific rounded radius, and apply that decision everywhere.** The Stroke panel's corner options (Miter, Round, Bevel) combined with the Round Corners effect (Effect > Stylize > Round Corners) can standardize corner treatment across icons drawn at different times.

Visual size matching: Icons drawn at the same artboard dimensions (say, 24x24px) do not automatically look the same size, because a circle and a square of identical bounding-box dimensions read as different visual weights; a circle typically needs to extend slightly past a square's edges to feel equally sized. Checking icons side by side at final display size, not just zoomed in individually, is the only reliable way to catch this.

Spacing and alignment within the grid: Working inside a consistent pixel or point grid (often using Illustrator's Transform panel to set exact width and height, or the Align panel to center content within each artboard) keeps visual margins consistent so icons do not appear to "float" unevenly relative to each other when placed in a row or grid layout.

Level of detail: All icons in a set should commit to the same level of simplification: either all icons are simple, geometric, and flat, or all icons include finer detail and shading, but never a mix of both styles in one set. A detailed, shaded email icon next to a flat, single-line calendar icon breaks the set's consistency even if stroke weight and corners match, because detail level is itself a visual signal the eye reads as a style choice.`,
  "ai-11": `Overview: **An infographic takes raw facts, steps, comparisons, or numbers and makes them understandable at a glance, using visual hierarchy instead of paragraphs of text.** This lesson covers turning data into layouts using hierarchy, icons, simple charts, labels, and spacing.

Establishing hierarchy first: **Before placing any icon or chart, decide what the single most important piece of information is, and make it the largest or most visually dominant element on the layout.** Supporting details should be visually smaller or lower in the reading order, using size, weight, and color (not just position) to guide the eye through the information in the order it should be understood.

Using icons to represent ideas: Icons should represent a concept instantly without needing a caption to explain them, so choose familiar, simple symbols (a clock for time, an arrow for growth) rather than obscure or overly creative ones that force the viewer to guess. Icons used in an infographic should follow the same consistency rules from icon set design: matching stroke weight, corner style, and level of detail throughout the piece.

Simple charts and data shapes: For comparing values, bar charts are usually clearer than pie charts once there are more than three or four categories, because bar length is easier for the eye to compare accurately than pie slice angle. In Illustrator, charts can be built manually with rectangles sized proportionally to their data value, or with the built-in Graph tools (Column Graph, Bar Graph, Pie Graph, found in the Toolbar's graph tool group), which generate editable chart objects from entered data.

Labels and numbers: Every number in an infographic needs a label close enough to it that the connection is unambiguous; a large "47%" floating with no nearby text is confusing no matter how well designed. Keep numeral formatting consistent (same font weight and decimal style) across every statistic in the piece so the numbers read as one coherent data set rather than pieces from different sources.

Spacing and grouping: Related information (an icon, a number, and its label) should sit closer together than unrelated groups, using the Gestalt principle of proximity so viewers instinctively understand what belongs together without needing dividing lines or boxes around every section.`,
  "ai-12": `Overview: **Patterns and reusable graphic assets extend a brand beyond just the logo, giving it backgrounds, badges, and stickers that feel like part of the same visual family.** This lesson covers building repeatable patterns and supporting assets that reinforce a brand system rather than distract from it.

Building a repeatable pattern: Illustrator's Pattern Options panel (select artwork, then Object > Pattern > Make) lets you define a tile that repeats automatically, previewing the repeat live on the canvas while you edit. Key settings include Tile Type (Grid, Brick by Row, Brick by Column, Hex by Column, Hex by Row) and spacing (H Spacing and V Spacing) between repeating copies; a well-built pattern should have no obvious seams where one tile meets the next.

Designing elements that repeat cleanly: Elements placed near the edge of a pattern tile need to be planned so they connect visually to the matching element on the opposite edge, otherwise the seam becomes visible once the pattern repeats across a large area. Keeping pattern elements simple and using the brand's existing color palette (via global swatches) ensures the pattern reads as an extension of the brand rather than a separate, unrelated graphic.

Badges and stickers: Badges (circular or shield-shaped elements often containing a short phrase or icon, like "Est. 2020" or "Handmade") and stickers (standalone decorative graphics, often with a white or colored outline for a die-cut effect) are built using the same shape, stroke, and Pathfinder skills as icons and logos, but are intended as flexible, secondary brand assets rather than the primary identity mark.

Supporting brand-system graphics: Background elements, dividers, and small decorative marks (like a repeated symbol from the logo used as a subtle background texture) should stay visually quieter than the logo itself, using lighter tints or lower opacity so they support layouts without competing with primary content or the logo for attention.

Organizing reusable assets: All patterns, badges, and reusable elements should be saved as swatches or symbols (Window > Symbols) within a shared asset file, so any future designer working on the brand can drag in an approved pattern or badge instead of recreating it inconsistently from scratch.`,
  "ai-13": `Overview: This lesson closes the Professional Delivery module by tying together everything from logo research through brand-system assets into one skill: exporting files correctly for print and web while keeping the original editable AI source organized. A brand system is only as useful as the files delivered around it.

Knowing your export formats: **SVG is a scalable vector format ideal for web use and icons, since it stays sharp at any size and has a small file size for simple graphics.** PNG is a raster format best for web use requiring transparency, like a logo placed over a colored background. PDF is widely used for sharing layouts and for print, since it can preserve vector quality, embedded fonts, and multiple pages or artboards in one file. EPS is an older but still print-industry-standard vector format, valued because it preserves vector data reliably across different design programs, though it is not offered through the Asset Export panel and instead requires File > Save As.

Export for Screens and Asset Export: The Asset Export panel (Window > Asset Export) lets you drag in objects, groups, or entire artboards and batch-export them as PNG, JPG, SVG, or PDF at multiple scales (1x, 2x, 3x) in one action, which Illustrator organizes into separate subfolders per scale. File > Export > Export for Screens opens the same workflow at the artboard level, useful when an entire multi-artboard file (like a full icon set or brand kit) needs to be exported at once in multiple formats and resolutions.

Preparing artwork before export: Before exporting, convert final logo text to outlines (from the typography lesson), verify colors are correct for the destination (RGB for screen, CMYK for print), and check that stray anchor points or hidden layers are not accidentally included, since the Asset Export panel exports exactly what is selected or placed in the panel, mistakes included.

Keeping the editable source organized: **The original AI file, with live text, layers named clearly, and global color swatches intact, should always be preserved separately from exported deliverables.** A clear folder structure (for example, a Source folder for the editable AI file and an Exports folder for delivered PNG/SVG/PDF/EPS files) prevents a client or teammate from accidentally editing or losing the only editable master copy.

Delivery checklist mindset: **Before sending files, confirm every required format has been exported, filenames are clear and consistent, and the editable AI source is backed up separately.** This habit protects both the designer's future ability to make revisions and the client's ability to use the brand assets correctly across different applications.`,
  "ai-14": `Overview: **A client rarely sees your raw Illustrator file; they see a presentation board that tells the story of your design decisions.** This lesson covers structuring vector work into a clean, professional presentation: the problem, the concept, logo variations, colors, fonts, and mockups, all laid out for someone seeing the work for the first time.

Starting with the problem and concept: A presentation board should open by briefly restating the brand problem or goal (who the client is, what they needed) before showing any visuals, since a viewer who does not understand the goal cannot properly judge whether the design solves it. Follow this with a short concept explanation connecting the research and symbol choices (from the logo research lesson) to the final design, so the logo is not just shown, but justified.

Showing logo variations: Present the full lockup, the symbol-only mark, and any horizontal or vertical layout variations together on one board, clearly spaced apart using the Align and Artboards panels so the client can compare versions at a glance rather than flipping between separate files. Using Illustrator's Artboards panel (Window > Artboards) to create multiple same-size boards keeps each presentation page consistent in dimension and easy to export together.

Colors and fonts on the board: Display the finalized color palette as labeled swatches (tying back to the global colors and hex/RGB/CMYK values from the brand guide lesson) and the approved fonts as labeled type samples, so the presentation doubles as an early, visual preview of the brand guide the client will eventually receive.

Mockups for context: Placing the logo into realistic contexts, like a business card, a signage mockup, or a product label, using File > Place to bring in a mockup template and Clipping Masks (Object > Clipping Mask > Make) to fit the logo neatly inside a shape, helps a client see the logo functioning in real life rather than as an isolated flat graphic, which is often what actually sells a concept.

Layout and consistency of the board itself: **The presentation board itself should follow the same alignment, spacing, and consistency principles taught throughout the course.** A cluttered, inconsistent board undermines confidence in a designer's work even if the logo itself is strong, so treat the board layout with the same care as the logo.`,
  "ai-15": `Overview: **This final lesson is the graduation capstone of the Illustrator Training course: combining everything learned into one complete, portfolio-ready brand kit.** Instead of introducing new tools, it asks you to apply logo design, icons, color systems, typography, patterns, brand guidelines, and export preparation together as one cohesive project.

Assembling the logo system: Start from the refined, grid-aligned, optically balanced logo built during the logo refinement stage, complete with its outlined final version and its editable live-text master kept separately, exactly as covered in the typography and file-preparation lessons. Confirm all logo variations (full lockup, symbol-only, horizontal, vertical) are present and consistent before building anything else around them.

Icons and supporting graphics: Build a small icon set (five to ten icons) that follows the consistency rules from the icon design lesson: shared stroke weight, shared corner style, matched visual size, and one committed level of detail. Add at least one supporting asset from the pattern lesson, such as a simple repeatable pattern or a badge, built using the brand's global color swatches so every piece pulls from the same color system.

Color and typography system: Assemble the finished global color palette with documented HEX, RGB, and CMYK values, and pair it with the approved typography choices (font names and weights) exactly as they would appear in the brand guide lesson. This is the piece that proves the whole kit is a system, not a collection of unrelated graphics made to look similar by coincidence.

Brand guide and presentation board: Compile a simple brand guide page (logo versions, clear space, color codes, fonts, wrong usage) and a presentation board (problem, concept, logo variations, mockups) using the Artboards and Align panels to keep everything consistent, exactly as practiced in the two prior lessons. Together these two pieces are what make the kit look like a professional deliverable rather than a loose folder of files.

Final export package: Finish by exporting the complete kit using the Asset Export panel or Export for Screens: SVG and PNG for web/app use, PDF for sharing and print-ready layouts, and EPS (via Save As) for print-industry compatibility, while keeping the original editable AI source files organized separately in a clearly labeled folder. This final, organized package is the portfolio piece: it should look, on its own, like something a real client received and could use immediately.`,
};

const solidworksExpansionContent: Record<string, string> = {
  "sw-3": `Overview: **Reference planes and origins are the invisible scaffolding that everything else in a SolidWorks model is built on.** The default Front, Top, and Right planes all intersect at the origin, and every sketch you draw should have a clear, deliberate relationship to that scaffolding rather than floating at some arbitrary location. Getting this right early is what separates a model with real design intent from one that quietly falls apart the first time a dimension changes.

Default planes and the origin: **Every new part starts with three default reference planes (Front, Top, Right) meeting at a single origin point.** Sketching directly on one of these planes, or dimensioning key sketch entities back to the origin, anchors the geometry so it has a fixed, predictable location in space. Skipping the origin and just sketching wherever the cursor happens to land is a common beginner mistake that makes a part awkward to mate later, since assemblies often rely on the origin and default planes to align parts.

Creating custom reference planes: Beyond the three defaults, you can insert additional reference planes offset from an existing plane by a distance, at an angle to an edge, through three points, or tangent to a curved face. These custom planes let you sketch features in locations the default planes cannot reach, such as an angled mounting boss or a rib partway up a tapered wall. A good habit is naming custom planes descriptively (for example "Mount Plane") instead of leaving them as Plane1, Plane2, so the feature tree stays readable months later.

Symmetry and the Mirror relation: **Many real parts are symmetric about a centerline, and modeling that symmetry explicitly, rather than drawing both halves by hand, keeps the part honest.** Sketching one half and applying a Symmetric relation about a centerline (or using the Mirror Entities tool) guarantees the two sides stay identical even after a dimension changes. This is stronger design intent than eyeballing matching dimensions on each side, because a typo on one side can no longer make the part lopsided.

Why planning ahead matters: Before sketching a single line, it pays to decide which plane a feature belongs on and how it should reference existing geometry, rather than sketching first and fixing problems later. A part built with a deliberate plane strategy responds predictably when a customer requests a wider base or a taller boss: the right dimensions change and everything downstream updates cleanly. A part built without that plan often requires rebuilding sketches from scratch because they were never properly anchored to a plane, an edge, or the origin in the first place.

Design intent as a habit, not a rule: Design intent is less a single command and more a mindset applied at every sketch: what should stay centered, what should stay parallel, what should scale together, and what should never move. Engineers who build this way produce models that survive revisions; engineers who don't produce models that need to be rebuilt every time a spec changes.`,
  "sw-4": `Overview: **Once a part has solid, well-defined features, the next skill is reproducing repeated geometry efficiently instead of sketching the same hole or rib over and over.** SolidWorks gives you dedicated tools for this: the Hole Wizard for standard fastener holes, Linear and Circular Patterns for repeating features in a grid or around a center, and Mirror for duplicating features across a plane. Using the right tool keeps the feature tree short, keeps spacing exact, and means a single edit updates every instance at once.

Hole Wizard: The Hole Wizard creates standardized holes (counterbore, countersink, tapped, or simple drilled holes) sized to match real fastener standards like ANSI or ISO, rather than a generic circle you sketch and extrude-cut by hand. You pick the hole type, standard, and fastener size, then place it on a face; the resulting hole carries real manufacturing information that can flow into a drawing's hole callout. This matters on a production part, because a hole cut with the wrong tool has no size data attached and has to be manually annotated on every drawing.

Linear Pattern: Linear Pattern repeats a seed feature (such as a Hole Wizard hole) along one or two directions at a fixed spacing and instance count, for example a row of six bolt holes spaced 20 mm apart along an edge. Because the pattern references the original feature, changing the seed hole's size or the spacing value updates every instance simultaneously, which is far safer than copying and pasting sketches by hand. You can also skip specific instances in the pattern when a hole would land somewhere unwanted, like over a rib.

Circular Pattern: Circular Pattern repeats a feature around an axis at a specified angle and number of instances, which is the natural tool for bolt circles, spoke patterns, or any feature arranged radially around a center. You select an axis (often a cylindrical face's implied axis or a sketched centerline) and set whether the instances span the full 360 degrees evenly or a specific angular spacing. This produces mathematically exact, evenly spaced holes that would be nearly impossible to sketch by eye with any confidence.

Mirror feature: The Mirror feature duplicates one or more existing features across a selected plane, which is different from mirroring a sketch because it works on fully-formed 3D geometry, not just 2D lines. A bracket with matching features on both sides of a centerline plane can be built once on one side and mirrored, guaranteeing both sides stay identical automatically. Combining Mirror with a symmetric reference plane from earlier lessons keeps a part's geometry provably matched on both sides through every future revision.

Controlling spacing and avoiding collisions: All of these pattern tools let you preview instance locations before finishing the feature, which is the moment to check for collisions with ribs, walls, or other features. Good practice is patterning from a feature that is itself fully defined and dimensioned from a fixed reference, since a pattern built on loose geometry inherits that same unpredictability across every copy.`,
  "sw-5": `Overview: Real manufactured parts are rarely solid blocks of material; they are shelled out, ribbed for strength, and drafted so they can be molded or cast without getting stuck in a tool. This lesson covers the features that turn a solid design study into something that could actually be manufactured: Shell for hollowing a part, Rib for adding strength without adding much weight, and Draft for angling walls so a mold can release the part.

Shell feature: **The Shell feature hollows out a solid part, leaving a wall of a specified thickness and removing one or more selected faces to create an opening.** This is how a solid block becomes a housing or enclosure, since molding or casting a fully solid part would waste material, add weight, and often crack from uneven cooling. You can also give different faces different wall thicknesses in the same Shell operation, which is useful when one wall needs to be stronger than the others.

Rib feature: The Rib feature adds a thin wall of material connecting two existing faces, following a sketched profile, to reinforce a part without the weight cost of making the whole wall thicker. Ribs are extremely common inside plastic enclosures and cast brackets, where a thin rib perpendicular to a bending load adds significant stiffness for very little added material. You control the rib's thickness and whether it is centered on the sketch or offset to one side, and the rib automatically extends to meet the surrounding geometry.

Draft feature: **The Draft feature angles a face by a specified draft angle relative to a pull direction, which is essential for any part that will be removed from a mold or die.** Without draft, a straight vertical wall creates a vacuum-like grip against the mold cavity that can damage the part or the tool when it is pulled free. Draft can be applied directly as its own feature, or built into an Extruded Boss/Cut by entering a draft angle in the feature's dialog while extruding.

Why these features matter together: Shell, Rib, and Draft are frequently used in combination on the same part: a shelled housing needs draft on its outer walls to be moldable, and often needs internal ribs to stay rigid now that most of its material has been hollowed out. Designing them independently without considering how they interact can produce a part that is light and strong on paper but impossible to actually pull from a mold. Thinking about manufacturing method while modeling, rather than after the design is finished, avoids expensive redesign late in a project.

Order matters in the feature tree: **Because Shell, Rib, and Draft each depend on the geometry that exists at that point in the model, the order they are applied in the feature tree affects the result.** Applying Draft before Shell, for example, changes the wall thickness distribution differently than applying Shell first, so it is worth planning the sequence rather than adding features in a random order.`,
  "sw-6": `Overview: **An assembly is where individual parts stop being independent models and start behaving like a real mechanism.** Mates are the constraints that position parts relative to each other and, just as importantly, define what motion is still allowed between them. Getting mates right is the difference between an assembly that behaves like the real product and one that either can't move at all or moves in ways that would be physically impossible.

Standard mates: Standard mates are the core building blocks: Coincident makes faces, edges, or points touch or align exactly; Concentric aligns two circular features (like a pin and a hole) around the same axis; Distance holds two entities a fixed distance apart; Angle holds two entities at a fixed angle; and Parallel keeps two faces or edges from ever tilting relative to each other. Most everyday assemblies, like a bracket bolted to a frame, can be built almost entirely from combinations of these standard mates.

Mechanical mates and motion: Beyond standard mates, mechanical mates model real mechanical relationships directly, such as a Hinge mate (which combines concentric and coincident behavior to allow rotation about an axis, optionally with a limited angle) or a Gear mate (which links the rotation of two parts at a set ratio, so one component spins the other even though they are not physically touching). These let an assembly demonstrate actual mechanism behavior, like a hinge swinging open or gears turning together, rather than just parts frozen in a fixed pose.

Limit mates: A Limit mate (available for distance and angle) allows movement between a minimum and maximum value instead of locking a part rigidly in place, which is exactly how a drawer slide or an adjustable arm should behave in a model. Setting realistic limits means the assembly can be dragged to check its full range of travel and confirm it doesn't collide with anything else, which is far more useful than an assembly that only shows one static position.

Degrees of freedom: **Every unmated part starts with six degrees of freedom (three translations, three rotations), and every mate you add removes some of them.** A well-mated assembly leaves exactly the degrees of freedom the real mechanism should have, no more and no less; over-mating can make SolidWorks report an error or silently prevent intended motion, while under-mating leaves a part floating loosely when it should be fixed. Watching how a part responds when you try to drag it in the assembly is a quick way to check whether its degrees of freedom match the real design.

Building assemblies deliberately: Because later parts and subassemblies often mate to earlier ones, it pays to mate foundational components (a base plate or frame) first and build outward, rather than mating parts in a random order. This keeps the mate list logical and makes it far easier to diagnose the problem when the assembly doesn't move the way it should.`,
  "sw-7": `Overview: A real product is rarely one machined block; it's a structured collection of parts, fasteners, and subassemblies that all have to fit together and clear each other during motion. This lesson covers organizing a complex assembly so it stays manageable, adding fasteners correctly, grouping related parts into subassemblies, and using SolidWorks' Interference Detection tool to catch physical clashes before they become an expensive manufacturing surprise.

Adding fasteners: Bolts, nuts, and washers can be added to an assembly like any other part, mated with Concentric and Coincident mates to seat them in their holes, though many designers also use the SolidWorks Toolbox library of standard hardware to avoid modeling every fastener from scratch. Placing fasteners accurately matters beyond appearance, since their mates confirm that a bolt's length actually clears the stack of material it passes through and that its head has room to seat against the surface.

Subassemblies: A subassembly is an assembly file that is itself inserted as a component into a larger, top-level assembly, which lets you group a functional unit (like a hinge mechanism or a pump housing) and treat it as a single object at the top level. This keeps the top-level assembly's feature tree readable and lets a subassembly be designed, tested, and mated independently before it's dropped into the full product. Subassemblies can be rigid (moving as one unit in the parent) or flexible (retaining their internal motion) depending on how they're configured.

Exploded structure and organization: Grouping components into logical folders and subassemblies also sets up an assembly for a clean exploded view later, since parts that belong together conceptually (a fastener set, a bracket assembly) should generally move together as a group when exploded. Naming components and subassemblies clearly, rather than leaving default file names, makes both the mate list and the eventual Bill of Materials far easier for someone else to read.

Interference Detection: The Interference Detection tool checks a fully mated assembly for any pair of components that physically overlap in space, which is not something you can reliably catch just by looking at a 3D model on screen. Running it highlights interfering volumes directly and lists which components clash, so you can fix a mate, adjust a dimension, or reposition a part before the design goes anywhere near a manufacturing quote. Catching an interference here, in the model, is dramatically cheaper than catching it after parts have actually been machined and don't fit.

Why this discipline matters on real projects: A production assembly can easily involve dozens of fasteners and several subassemblies, and without deliberate organization and interference checking, small clashes hide easily in a large, busy assembly tree. Running Interference Detection as a routine step, not just at the very end, catches problems while they are still cheap and easy to fix.`,
  "sw-8": `Overview: **A finished assembly is often hard for a non-technical viewer to understand when every part is shown fitted tightly together.** An exploded view pulls components apart along logical directions so a viewer can see how each part relates to the others and how the assembly goes together, which is exactly why exploded views appear in assembly instructions, sales materials, and service manuals.

Creating explode steps: An exploded view is built from a series of explode steps, where each step moves one component or a selected group of components away from the rest of the assembly along a chosen direction and distance. Building the explosion in stages, moving related fasteners together in one step and a housing panel in another, keeps the final result readable rather than a chaotic scattering of parts with no visual logic.

Grouping components in explode steps: Components that belong together conceptually, such as a bolt, washer, and nut for one joint, should usually be exploded together in a single step rather than each getting its own separate movement. This mirrors how a person would mentally group the parts anyway, and it keeps the total number of explode steps manageable even on an assembly with many fasteners.

Explode lines: Explode lines (added through the Route Line tool) draw connector lines between exploded components to show which part reconnects to which, which is especially useful when a small part like a screw has moved far from its final destination. These lines make an exploded view readable at a glance instead of requiring the viewer to guess which floating part belongs where.

Using exploded views for presentation: Because an exploded view is saved as a configuration of the assembly, it can be switched back to the collapsed, assembled state at any time without losing the explode step data, and it can be used to generate an assembly drawing view or an animation showing the parts moving into place. This makes it valuable for both static documentation, like an installation guide, and for marketing or training material where showing the assembly process communicates value to someone with no engineering background.

Why this matters for non-technical viewers: **A tightly assembled model, however accurate, communicates very little to someone who cannot mentally X-ray the parts to see what's inside or how they connect.** An exploded view translates the engineering model into something a client, an assembly technician, or a service tech can actually read and act on, which is often the real deliverable a client remembers from a project.`,
  "sw-9": `Overview: **A 3D model alone doesn't tell a machine shop or a client what they need to build or approve a part; an engineering drawing does.** This lesson covers building a drawing from standard view types (front, top, side, section, detail, and isometric) and dimensioning it correctly according to drawing standards, so the drawing reads as an unambiguous instruction rather than just a picture.

Standard orthographic views: Front, top, and side (right) views are the core orthographic projections that show a part's true shape and proportions from three perpendicular directions, and together they let a reader mentally reconstruct the 3D part from flat 2D views. These views are typically generated directly from the 3D model rather than drawn from scratch, so they stay in sync automatically if the model changes after the drawing is created.

Isometric view: The isometric view shows the part in a pictorial 3D-like orientation, which doesn't carry the precise dimensional accuracy of an orthographic view but helps a reader quickly understand the part's overall shape before studying the more technical flat views. Including an isometric view on a drawing, usually in a corner of the sheet, is standard practice because it dramatically speeds up how fast someone can orient themselves to the part.

Section views: A Section View cuts through the part along a defined cutting line to reveal internal geometry, such as a hidden bore, wall thickness, or an internal rib, that would otherwise be invisible or shown only as dashed hidden lines. Section views are essential whenever a part's important geometry is on the inside, since dashed hidden-line views are difficult to dimension accurately and easy to misread.

Detail views: A Detail View circles a small area of an existing view and displays it at a larger scale on the same sheet, which is how a drawing shows a small feature, like a tight fillet radius or a small slot, with enough clarity to dimension it precisely. Without a detail view, a small feature on a large part can become too cramped to dimension legibly at the drawing's main scale.

Dimensioning standards: Dimensions on a drawing should be placed on the view where the feature's true shape and size are most clearly shown, avoid duplicating the same dimension on multiple views, and follow consistent conventions for extension lines, dimension lines, and leader placement so the drawing is unambiguous to a machinist. Poor dimensioning practice, like dimensioning to a hidden edge or duplicating a dimension inconsistently across two views, is a common source of parts being manufactured incorrectly even when the 3D model itself was correct.`,
  "sw-10": `Overview: A drawing that shows correct geometry still isn't complete until it tells a manufacturer what material to use, how precise each dimension needs to be, and what quantity of which parts make up the assembly. This lesson covers the information layer that sits on top of geometry: tolerances, manufacturing notes, material callouts, hole information, and the Bill of Materials (BOM) that lists every component in an assembly.

Tolerances: **A tolerance defines the acceptable range of variation for a dimension, since no manufacturing process produces a perfectly exact size every time.** Tolerances can be applied to individual dimensions directly (for example, a hole diameter given as 10.00 +0.05/-0.00) or governed by a general tolerance note on the drawing that applies to any dimension without its own explicit tolerance. Choosing tolerances that are too tight drives up manufacturing cost unnecessarily, while tolerances that are too loose risk parts that don't fit or function correctly.

Manufacturing notes and material callouts: Drawing notes communicate information that can't be captured by geometry alone, such as required surface finish, heat treatment, coating, or general fabrication instructions like "break all sharp edges." The material callout, usually placed in or near the title block, specifies exactly what the part should be manufactured from (for example, 6061-T6 aluminum), which directly affects strength, weight, and cost and must match whatever material was actually applied to the 3D model for accurate mass properties.

Hole information: Because Hole Wizard holes carry real size and type data, a drawing can generate an automatic hole callout (or a hole table for many holes) that lists diameter, depth, and thread information without the drafter typing each value by hand. This keeps the drawing accurate to the model and removes a common source of transcription errors where a drafter manually types a hole size that no longer matches after the model was updated.

Bill of Materials: The BOM is a table, usually generated directly from an assembly drawing, that lists every component in the assembly along with its part number, description, material, and quantity. An accurate BOM is what a purchasing or manufacturing team actually orders and builds from, so it needs to reflect the real, final assembly, including every fastener and subassembly, not just the major structural parts.

Why this information layer matters: **A perfectly modeled part with no tolerances, no material callout, and no BOM entry is not actually manufacturable or purchasable from the drawing alone.** This annotation layer is what turns a 3D model into a legal, actionable manufacturing document that a shop or supplier can quote, build, and inspect against.`,
  "sw-11": `Overview: Sheet metal parts are made differently from machined or molded parts: they start as a flat sheet, get cut, and then get bent into shape, so SolidWorks models them with dedicated sheet metal features that understand bending rather than treating the part as an arbitrary solid. This lesson covers building a sheet metal part from a Base Flange, adding material with Edge Flanges, controlling bends and reliefs, and producing the flat pattern that a fabricator actually cuts from stock.

Base Flange: The Base Flange (or Base Tab) feature is the starting feature for a sheet metal part, created by extruding a sketched profile with a defined material thickness, which simultaneously sets the part's default sheet metal parameters like thickness and bend radius for the whole part. Every other sheet metal feature added afterward inherits these part-level settings unless it's specifically overridden, which keeps the part physically consistent with what a single sheet of stock can actually produce.

Edge Flange: The Edge Flange feature adds a flange to a selected, straight edge of existing sheet metal, letting you build up a part wall by wall rather than sketching every wall from scratch. In the Edge Flange PropertyManager you set the flange's length, angle, bend position, direction, and can override the bend allowance or relief type just for that flange, which is how a design builds up an enclosure or bracket edge by edge from a single starting flat.

Bend allowance and K-factor: Because bending metal stretches the material on the outside of the bend, the flat, unbent length of a part is not simply the sum of its finished leg lengths; SolidWorks accounts for this using a Bend Allowance calculation, and by default calculates the flat pattern using the K-factor, a value representing where the neutral bend axis sits within the material thickness. Other options include Bend Table, Bend Allowance, and Bend Deduction, and picking the right one (often based on the fabricator's own bend data) is what makes the resulting flat pattern accurate to real bending results rather than just a rough estimate.

Relief types: Auto relief settings control how the software cuts small notches at the corners where bends meet, which prevents the material from tearing or deforming at that corner during the actual bending operation. Choosing the correct relief type (such as rectangular, obround, or tear relief) matters especially in tight corners or complex, multi-bend geometry, since the wrong relief choice can produce a flat pattern that looks fine on screen but tears when a fabricator actually bends the part.

Flat pattern output: The Flat Pattern feature unfolds every bend in the part back to its flat state, producing the exact 2D shape that gets cut from sheet stock before bending, and this flat pattern can be exported as a DXF or DWG file for a laser cutter, punch, or waterjet. Because the flat pattern is generated directly from the same model as the bent, finished part, any later change to a flange length or bend angle automatically updates the flat pattern, keeping the cutting file and the finished design in agreement.`,
  "sw-12": `Overview: A model isn't just a shape; once it's assigned a real material, SolidWorks can calculate genuine physical properties like mass, volume, and center of mass, which is often the fastest way to check whether a design actually meets its real-world requirements before it's ever built. This lesson covers applying materials correctly, using the Mass Properties tool, understanding center of mass, and checking calculated results against project requirements.

Applying materials: Materials are applied through the Material editor, either by right-clicking the part's Material entry in the feature tree or through the Edit Material dialog, where you pick from the built-in SolidWorks materials library (organized by category like steel, aluminum alloys, and plastics) or define a custom material with your own density and mechanical properties. The assigned material directly drives every mass-related calculation, so a part left as "Default" material (with an arbitrary assumed density) will produce mass and center of mass values that mean nothing for the real design.

Mass Properties tool: The Mass Properties tool calculates a part or assembly's mass, volume, surface area, and center of mass directly from the model geometry and assigned material densities, without requiring any separate calculation. Running it on an assembly accounts for every component's actual material, so it gives a realistic total mass for the finished product, which is often one of the first hard numbers a client or reviewer wants to see on a new design.

Center of mass: The center of mass is the point where the object's mass is considered to be concentrated for purposes of balance and stability, and SolidWorks reports its X, Y, Z coordinates relative to a chosen coordinate system. Center of mass matters directly for real engineering decisions, such as whether a cart will tip over, where a lifting eye should be placed on a heavy assembly, or whether a handheld product feels balanced in the hand; a design that looks fine visually can still have a center of mass in a genuinely problematic location.

Checking against requirements: Once mass properties are calculated, they should be checked against the actual project requirements, such as a maximum allowed weight for a shipping product or a target center of mass location for stability, rather than just noted and forgotten. If a calculated mass exceeds a target, that's the signal to revisit earlier decisions, like adding a Shell feature to hollow out a solid section or swapping to a lighter material, before the design moves further along.

Why this matters early, not late: Because Mass Properties updates live as the model or material changes, checking it early and often during design, not just at the end, means problems like excess weight or a shifted center of mass get caught while they're still cheap and easy to fix with a design change rather than after tooling or parts have already been committed to.`,
  "sw-13": `Overview: **A part can be dimensionally correct and still fail in the real world if it can't handle the loads it will actually see.** This lesson introduces basic stress thinking: how loads and fixtures are applied to a model, how SimulationXpress (SolidWorks' built-in basic stress analysis tool) estimates stress and factor of safety, and how design choices like wall thickness, fillets, and material selection change a part's failure risk.

Fixtures: **A fixture defines which faces of a part are held in place during analysis, representing however the real part is actually mounted, bolted, or clamped in service.** In SimulationXpress specifically, fixed geometry constrains the selected faces in all degrees of freedom, which is a simplification of reality (a real bolted joint isn't perfectly rigid) but is a reasonable starting approximation for identifying likely weak points.

Loads: A load represents an external force, pressure, or torque applied to specific faces, and choosing realistic load values and locations is what makes the resulting stress results meaningful rather than misleading. Underestimating a load produces a falsely reassuring result, while wildly overestimating one can make an otherwise fine design look like it needs unnecessary reinforcement, so it's worth basing load values on actual expected service conditions rather than guessing.

Running SimulationXpress: SimulationXpress walks through fixtures, loads, and material in a guided wizard, then meshes the part and runs a linear static analysis, producing plots for stress, displacement, and factor of safety directly on the model. The factor of safety is calculated by dividing the material's yield strength by the equivalent stress at each point, so a factor of safety below 1 at any location means the material is predicted to yield there under the applied load.

Interpreting weak points: Areas that show a low factor of safety, high stress concentrations, are frequently found at sharp internal corners, sudden changes in wall thickness, or small cross-sections carrying a disproportionate share of the load. Sharp internal corners in particular concentrate stress far more than a rounded transition, which is one of the most common and cheapest fixes available once a weak point is identified.

Design improvements: Once a weak point is identified, practical fixes include adding a fillet to a sharp internal corner to spread stress over a larger area, increasing wall thickness or adding a rib in the affected region, or switching to a stronger material if geometry changes alone aren't enough. Because SimulationXpress lets you adjust fixtures, loads, or geometry and simply re-run the analysis, this becomes an iterative loop: analyze, identify the weak point, make a targeted change, and re-check the factor of safety rather than over-building the entire part out of caution.`,
  "sw-14": `Overview: **This capstone lesson brings every skill from the course together into one real mechanical project, taken from first sketch through a presentation-ready drawing package.** Rather than practicing an isolated feature or tool, you will plan, model, assemble, document, and check a small mechanical assembly the way an engineer would deliver it to a client or a shop, using sketching, features, assemblies, drawings, BOM, material notes, and a presentation render as one connected workflow.

Planning before modeling: A strong graduation project starts with a plan, not a sketch: which parts need reference planes anchored to the origin for design intent, which features will use patterns or mirrors, which parts are fasteners versus custom components, and how the assembly will need to move. Planning this up front, the way earlier lessons on reference planes and design intent emphasized, prevents the rebuild-from-scratch problem that comes from sketching first and thinking about structure later.

Modeling with real features: Each part should use the appropriate manufacturing-aware features from this course: Shell and Rib if a part is a housing, Hole Wizard and patterns for fastener holes, Draft if any part will realistically be molded, and Sheet Metal tools if a part is genuinely meant to be fabricated from flat stock. Choosing features that match how the part would really be manufactured, rather than just whatever shape looks right, is what separates a graduation project that reads as production-aware from one that reads as a generic 3D exercise.

Assembling with intent: The assembly should be built with the mate strategy from earlier lessons: foundational components mated first, Concentric and Coincident mates for fitted parts, Limit or mechanical mates anywhere real motion exists, and an Interference Detection check run before the assembly is considered finished. Any fasteners should be organized sensibly, using subassemblies where a functional group of parts makes sense, so the final assembly tree reads as a real product structure, not a flat pile of parts.

Documenting for delivery: The final package needs a drawing set with correct standard views, section or detail views wherever internal or small geometry needs to be shown, dimensions and tolerances that are actually manufacturable, material callouts that match what was assigned in the model, and a Bill of Materials generated from the real assembly, not typed by hand. An exploded view or presentation render, with realistic materials applied and appearances set, communicates the finished design to a non-technical audience the way a client actually experiences a project.

Final checks before calling it done: Before the project is finished, run Mass Properties to confirm the design meets any weight or balance target, check calculated stress and factor of safety on any load-bearing part using SimulationXpress, and re-run Interference Detection on the final assembly state. A graduation project that passes all of these checks demonstrates not just that you can operate SolidWorks, but that you can deliver a design that is accurate, manufacturable, and ready for someone else to act on.`,
};

const capcutExpansionContent: Record<string, string> = {
  "cc-3": `Overview: **Story planning happens before a single clip touches the CapCut timeline.** This lesson covers the pre-production questions that determine whether an edit has direction: who is watching, where they are watching, what makes them stop scrolling, and what you want them to do afterward. Skipping this step is the main reason edits feel aimless even when the footage is good.

Defining the viewer: **Every video should be planned for one specific viewer, not a generic audience.** A design-school promo aimed at a 19-year-old scrolling TikTok on a lunch break needs a different pace, language, and hook than the same message aimed at a parent researching options on a laptop. Naming the viewer narrows every later decision, from clip length to the words used in captions.

Platform shapes the plan: TikTok, Instagram Reels, and YouTube Shorts all favor vertical 9:16 delivery, but their audiences behave differently - TikTok rewards raw, fast-cut authenticity, Reels rewards polish and trending audio, and Shorts rewards a clear payoff within the first ten seconds because autoplay loops aggressively. Planning the platform first prevents shooting or selecting footage that has to be reworked later.

The hook as a planning decision: **A strong hook is chosen during planning, not discovered by accident in the edit bay.** Before filming or reviewing footage, write down the single most surprising, useful, or visually striking moment available, and plan to place it in the opening seconds regardless of when it actually happened during filming or the story's natural chronology.

Proof points and call to action: **Proof points are the specific evidence - a testimonial line, a before-and-after shot, a number - that back up the claim made in the hook.** Planning should list two or three proof points in priority order so the strongest evidence survives if the final cut needs to be shortened. The call to action is the single next step the viewer should take, stated plainly near the end, and it should be decided before editing so B-roll and captions can support it rather than compete with it.

Selecting shots that move the story forward: **Not every clip that looks good belongs in the edit.** During shot selection, each candidate clip should be tested against one question: does it advance the hook, provide proof, or support the call to action? Clips that are only visually pleasing but do not serve one of those three jobs are set aside for a highlight reel or B-roll library rather than forced into the main story.`,
  "cc-4": `Overview: The rough cut is the first complete assembly of a video - every planned beat is in place, in order, at roughly the right length, but without music, color work, or motion graphics. Its purpose is to prove the story works before time is spent polishing it. Building a rough cut in CapCut means working on structure and pacing only, resisting the urge to add effects too early.

**Assembling hook, context, value, proof, and call to action: A rough cut follows a five-beat structure.** The hook opens the video in the first few seconds. Context briefly explains what the viewer is looking at. Value delivers the main content - the technique, story, or information promised by the hook. Proof backs up the value with evidence. The call to action closes the video with one clear next step. Laying clips onto CapCut's timeline in this order, even roughly trimmed, reveals whether the story holds together before any polish is applied.

Working without heavy effects: **During the rough cut, effects, transitions, filters, and animated text are deliberately left out.** Adding them early makes it hard to judge pacing honestly, because a flashy transition can disguise a weak cut. Keeping the rough cut plain - straight cuts only - forces every editing decision to be justified by the story rather than hidden behind decoration.

Trimming dead space: **Raw footage almost always contains false starts, pauses, filler words, and repeated points.** Trimming in the rough cut means removing this dead space clip by clip on the timeline, tightening each cut until only the material that earns its place remains. A rough cut is often thirty to sixty percent shorter than the combined raw footage it was built from.

Judging pacing before polish: **Once the five beats are assembled and trimmed, the rough cut should be watched start to finish without stopping.** This full playback is the fastest way to catch a slow opening, a confusing middle, or a call to action that arrives too abruptly. Because there is no music or color grading yet to create false energy, any pacing problem in the rough cut is a real structural problem, not a symptom that can be fixed with a better soundtrack.

Locking structure before moving on: **A rough cut is considered locked when the beats are in the right order, each one is roughly the right length, and the full playback feels coherent.** Only after the structure is locked should the next stages - audio cleanup, captions, color, and motion - begin, since changing beat order later forces rework across every layer added on top.`,
  "cc-5": `Overview: Once a rough cut is locked, audio becomes the next priority - before captions or color - because clean, well-balanced sound holds attention even through imperfect visuals, while messy audio loses viewers no matter how polished the video looks. This lesson covers balancing voice, music, and sound effects, and timing cuts to match music.

Balancing voice against music: **Dialogue or voiceover should always be the clearest, most prominent element in the mix.** A common mistake is choosing music that is exciting on its own but competes with speech for attention. In CapCut this is managed by keeping the voice track's volume consistently higher than the music track, and applying volume automation, sometimes called ducking, so the music dips automatically under any spoken line rather than staying at a constant level throughout the video.

Choosing music that supports rather than fights the message: Music tempo and mood should match the energy of the content - a fast, aggressive track under a calm explanation feels mismatched, and a slow ambient track under an exciting reveal drains energy from the moment. Previewing music against the rough cut, rather than picking a track in isolation, is the only reliable way to catch a mismatch before it is locked into the edit.

Using sound effects with restraint: **Sound effects such as whooshes, clicks, and impacts can emphasize a cut or a moment of proof, but only when used sparingly.** Overusing sound effects makes an edit feel cluttered and distracts from the message. A useful rule is to reserve sound effects for moments that genuinely need extra emphasis, such as a hard cut to a proof point, rather than adding one to every transition.

Timing cuts to the beat: Editing cuts on the beat of the music, so a hard cut, a zoom, or a text reveal lands exactly on a musical downbeat, creates a sense of rhythm and intentionality that random cut timing lacks. Not every single cut needs to land on-beat, but key structural moments such as the hook, the reveal of a proof point, and the call to action benefit noticeably from landing on or near a beat.

Cleaning up recorded voice: **Raw voice recordings often carry background hum, room echo, or inconsistent volume between takes.** Before adding music at all, the voice track should be leveled so quiet and loud lines sit at a similar volume, and any harsh background noise reduced, since music and sound effects layered on top of uneven dialogue only amplify the problem instead of covering it.`,
  "cc-6": `Overview: **Text on screen - captions, lower thirds, and titles - is one of the most-seen elements in short-form video, since a large share of viewers watch with sound off.** This lesson covers making captions readable on a phone screen, using lower thirds to identify people, and building a text hierarchy so viewers know what to look at first.

Captions sized and timed for a phone screen: **Captions need to be legible on a screen a few inches wide, often glanced at quickly.** This means larger font sizes than would be used on a desktop-oriented video, short line lengths of roughly one to two lines at a time, and high contrast between text and background - CapCut's auto-caption tool transcribes speech onto the timeline as an editable text track, but the generated captions should always be checked for timing drift and misheard words before publishing.

Positioning captions to avoid platform UI: Each platform overlays its own interface elements - usernames, like buttons, captions written by the platform itself - in predictable screen zones, usually the bottom and right edges. Captions placed too low or too close to the edge get covered by this UI on the actual app, even though they look fine in CapCut's preview, so captions are generally kept in the safe middle-to-lower-third area of the frame rather than the very bottom edge.

Lower thirds for identifying speakers: A lower third is a text graphic, typically a name and title or role, placed in the lower area of the frame to identify who is speaking without requiring narration to introduce them. Lower thirds should appear briefly when a new speaker is introduced and then disappear, rather than staying on screen for the whole video, since a persistent label stops adding information after the first few seconds and starts cluttering the frame.

Building text hierarchy: **Text hierarchy means using size, weight, and color consistently so a viewer can tell at a glance which text is most important.** A hook headline should be the largest and boldest text in the video, captions should be a consistent mid-size used throughout, and supporting labels like a lower third or a small callout should be smallest. Mixing font sizes randomly, or making every piece of text equally bold, removes the visual cue that tells a viewer where to look first.

**Keeping text legible against changing backgrounds: Because footage backgrounds change constantly, text that is legible over one clip can disappear over another.** Adding a subtle background box, outline, or drop shadow behind caption and title text keeps it readable regardless of what is happening behind it, which matters more in fast-cut edits where the background changes every second or two.`,
  "cc-7": `Overview: **B-roll and overlays are the supporting footage and graphics that prove what the main clip is claiming, rather than just illustrating it.** This lesson covers choosing and placing B-roll, using screenshots and logos as overlays, and building before-and-after comparisons that give a claim visual evidence.

What B-roll is for: **B-roll is supplementary footage - close-ups, cutaways, establishing shots, or process shots - layered over or cut between the main talking clip.** Its job is not decoration; it is proof. If the main clip says 'this technique saves time,' B-roll showing the actual technique being performed gives the viewer visual evidence of the claim rather than asking them to take the speaker's word for it.

Placing overlays on higher tracks: In CapCut, overlay clips are placed on a video track stacked above the main footage track, so they visually cover the layer beneath at that timestamp without replacing the underlying audio. This is how a screenshot, a logo, or a B-roll clip can appear 'on top of' a talking-head shot while the original voiceover continues uninterrupted underneath.

Screenshots and logos as proof: When a claim references something visual and specific - an app interface, a document, a brand - a screenshot or logo overlay makes that reference concrete instead of leaving it to the viewer's imagination. Screenshots should be readable at a glance, meaning cropped tightly to the relevant area and held on screen long enough to actually be read, not flashed for a fraction of a second.

Before-and-after overlays: A before-and-after comparison, shown as a split screen, a quick cut, or a slide transition between two overlay clips, is one of the strongest forms of visual proof available because it lets the viewer judge the result directly rather than trusting a description of it. The 'before' state should be shown first and held briefly, then the 'after' state, so the contrast reads clearly rather than blending together.

Matching B-roll to the pacing already set in the rough cut: Because B-roll is layered in after the rough cut's structure is locked, its length and placement should follow the pacing already established rather than dictate new pacing. A B-roll clip is generally trimmed to match the length of the voiceover segment it is supporting, so it disappears before the viewer's attention drifts but stays long enough to register as proof.`,
  "cc-8": `Overview: Color correction fixes technical problems in footage - exposure, contrast, white balance, and saturation - so clips look accurate and consistent, which is a different job from stylized color grading. This lesson covers the core corrections and how to match clips shot under different lighting so a finished edit doesn't look like it was stitched together from different videos.

Exposure and contrast: **Exposure controls how bright or dark a clip appears overall, and footage that is noticeably underexposed or overexposed loses visible detail in shadows or highlights.** Contrast controls the difference between the darkest and lightest parts of the image; too little contrast makes footage look flat and washed out, while too much can crush shadow detail into pure black. Correcting exposure first, before touching any other setting, establishes a usable base the other adjustments build on.

White balance: White balance corrects unwanted color casts caused by different light sources - footage shot under indoor tungsten lighting often reads too orange, while footage shot in shade or under cloudy skies often reads too blue. Adjusting white balance means shifting the color temperature until whites in the frame actually look white and skin tones look natural, rather than tinted toward orange or blue.
Saturation: Saturation controls how intense or muted the colors in a clip appear. Oversaturated footage can look artificial and fatiguing to watch, especially in skin tones, while undersaturated footage can look lifeless. Saturation is typically adjusted after exposure, contrast, and white balance are already correct, since pushing saturation on footage with an unfixed color cast just intensifies the wrong colors.

Matching clips shot in different lighting: A single video often combines clips filmed at different times of day, indoors and outdoors, or under different light sources, and each of those clips can have a different exposure level and color cast even if they are part of the same story. Matching means adjusting each clip so that skin tones, whites, and overall brightness look consistent from one cut to the next, so the viewer's eye is not pulled toward a jarring color shift every time the shot changes.

Working clip by clip, not globally: **Because lighting conditions vary between clips, color correction in CapCut is usually applied per clip rather than as one blanket adjustment across the whole timeline.** Applying a single correction to every clip assumes they all started from the same lighting conditions, which is rarely true, and can make a good clip look worse while barely helping a bad one.`,
  "cc-9": `Overview: Keyframes let an editor animate a property - position, scale, rotation, or opacity - over time by setting values at two or more points and letting CapCut calculate the smooth motion between them. This lesson covers how keyframe animation works on the timeline and how to use motion with intention so it guides attention rather than distracting from it.

How keyframes work on the timeline: To animate a clip or text layer, the playhead is moved to the point where the animation should begin, and a keyframe - marked by a small diamond icon next to the property being animated - is set on that property. The playhead is then moved forward, and the property's value is changed; CapCut automatically creates a second keyframe at that new point and interpolates a smooth transition between the two values across the time in between.

**Animating position, scale, rotation, and opacity: These four properties cover most motion needs.** Position keyframes move a clip or text element across the frame, useful for sliding a title into view. Scale keyframes grow or shrink an element, often used for a slow zoom that adds subtle energy to a static shot. Rotation keyframes spin an element, generally used sparingly for a specific stylistic effect. Opacity keyframes fade an element in or out, which is one of the most common uses since it creates a soft entrance or exit rather than an element appearing or disappearing abruptly.

Easing and the speed curve: **A raw keyframe animation moves at a constant, mechanical speed by default, which can look stiff.** CapCut's speed curve or graph editor near the keyframe points lets an editor adjust the timing of the motion, commonly easing out - fast at the start and slow at the end - so movement feels more natural, similar to how objects in the physical world decelerate rather than stopping instantly.

Using motion with intention: **Every keyframe animation should have a reason tied to the story, not be added simply because the feature exists.** Motion that draws the eye toward a proof point, emphasizes a hook headline, or smooths a hard cut is doing a job. Motion added to every single clip regardless of content quickly becomes noise, and can actually work against a video's pacing by giving equal visual weight to unimportant and important moments alike.

Keeping motion readable on a small screen: Because most viewers watch on a phone, subtle motion is usually more effective than dramatic motion - a large spin or an aggressive zoom can feel disorienting on a small screen in a way it would not on a larger display. Restrained keyframe values, checked by previewing at actual phone size rather than a full desktop preview window, keep motion feeling intentional rather than overwhelming.`,
  "cc-10": `Overview: Speed control shapes how time feels within a video - compressing weak moments, stretching strong ones, and using clean cuts when a straight transition communicates timing better than any speed effect. This lesson covers CapCut's speed ramp and curve tools, and how to decide between fast motion, slow motion, and a plain cut.

Speeding up to skip weak time: Fast motion, sometimes called a speed ramp toward the high end, compresses a stretch of footage that is necessary to show but not interesting enough to hold at normal speed - walking to a location, setting up a tool, waiting for a process to finish. Rather than cutting that footage entirely and losing continuity, speeding it up keeps the viewer oriented while respecting their time.

Slowing down to emphasize a moment: **Slow motion stretches a specific moment - a reveal, a reaction, a key action - giving the viewer more time to register its importance.** Overusing slow motion dilutes its effect, since a technique that is supposed to signal 'this moment matters more' stops working if every moment gets the same treatment. Slow motion is most effective when reserved for the single strongest moment in a sequence rather than applied broadly.

Using the speed curve for smooth ramps: CapCut's speed tool includes a curve or velocity option, found in the Speed panel's Curve section, that lets an editor click along a graph to add or remove speed points and drag the curve between them to control how gradually or abruptly the speed changes, rather than jumping instantly between a fast segment and a slow one. Built-in presets exist for common ramp shapes, and a custom curve can be built by hand for more specific timing. When an abrupt speed change looks choppy, CapCut's smooth slow-motion option using optical flow can generate additional in-between frames to make the transition look more fluid.

When a clean cut is the better choice: **Not every transition needs a speed effect.** When the timing of a moment is already communicated clearly by a straight cut - the story reads fine, the pacing is already right - adding a speed ramp on top adds complexity without adding clarity. A clean, unramped cut is often the stronger choice precisely because it does not call attention to itself.

Matching speed changes to the story's pacing, not the footage's limitations: Speed effects should be chosen based on what the story needs to communicate, not used to disguise weak footage or fill time. A speed ramp added only because a clip is too short or too long for its slot usually looks like what it is - a fix for a length problem rather than an intentional storytelling choice.`,
  "cc-11": `Overview: This lesson closes the Motion and Effects module by turning keyframe animation and speed control into a reusable brand template - a consistent set of caption styles, colors, title movement, and logo placement that can be applied to every future Reel or Short instead of rebuilding decisions from scratch each time.

Why templates matter for repeat content: **A creator or brand publishing regularly benefits from viewers recognizing their content style within the first second, before the hook even lands.** A consistent visual system - the same caption font and color, the same intro motion, the same logo placement - builds that recognition across many videos, which a one-off edit built from scratch every time cannot achieve no matter how good any single video looks.

Reusable caption styles and text hierarchy: The text hierarchy principles from captions and lower thirds work - hook text largest, captions a consistent mid-size, labels smallest - become a template once the exact font, size, color, and background treatment are locked in and reused on every video, rather than re-decided project by project. This consistency also speeds up editing significantly, since caption styling becomes a matter of applying a saved preset rather than a new design decision each time.

Color and title movement as brand signals: A consistent color palette applied to captions, lower thirds, and title cards, combined with a consistent style of title movement built from the keyframe techniques covered earlier - the same easing, the same entrance direction - creates a visual signature. This is the same logic as color correction and matching clips: consistency, applied deliberately across every video rather than varying scene to scene, is what makes a channel or brand feel professional rather than improvised.

Logo placement and intro or outro structure: A logo overlay, placed in the same corner or the same moment in every video using the overlay-track technique from earlier in the course, reinforces brand identity without requiring the viewer to read anything. A short, consistent intro (often under one second, sometimes just a fast zoom or wipe) and a consistent outro card with the call to action give every video the same beginning and ending shape, which viewers come to recognize even if the middle content varies widely.

Building the template once, applying it many times: The practical output of this lesson is a saved set of decisions - caption preset, color values, motion timing, logo position, intro and outro structure - that gets applied to every new Reel or Short rather than reinvented. This is the same discipline as locking a rough cut's structure before polishing: decide once, deliberately, then reuse, rather than making fresh creative decisions under time pressure on every single upload.`,
  "cc-12": `Overview: **Export is where every editing decision either survives or gets undermined by the wrong technical settings.** This lesson covers matching aspect ratio and resolution to the destination platform, and naming exported files so drafts and final versions stay identifiable through a review process.

Vertical 9:16 for short-form platforms: TikTok, Instagram Reels, YouTube Shorts, and WhatsApp Status are all built around vertical 9:16 video that fills a phone screen without black bars. Exporting anything else - even a well-edited video - to these platforms usually results in the platform cropping or padding it automatically in ways that were not planned during editing, cutting off captions or framing that looked correct in CapCut's preview.
Landscape 16:9 for YouTube long-form and presentations: Traditional YouTube uploads and any video intended for a projector, TV, or presentation screen should be exported in landscape 16:9, since that is the format those viewing contexts are built around. A video edited in 9:16 and then exported to fit a 16:9 slot forces large black bars on either side, which looks unfinished compared to footage actually planned and shot for the wider frame.

Resolution and frame rate choices: CapCut supports export resolutions from 480p up through 4K, and frame rates roughly between 24 and 60 frames per second on typical mobile exports, with higher options available on more capable devices. For most social platforms, 1080p at 30 frames per second is a reliable default that balances visible quality with reasonable file size and processing time. Footage that was actually shot in 4K can be exported at 4K to preserve detail, but upscaling footage that was only ever shot in 1080p to a 4K export does not add real detail - it just produces a larger file with the same softness.

Matching resolution to how footage was actually shot: Choosing an export resolution higher than the source footage's original resolution creates a false sense of quality improvement while actually introducing visible artifacting, since the export process has to invent pixel detail that was never captured. The safest rule is to export at or below the resolution the footage was originally recorded in, never above it.

Versioned filenames for review and delivery: **Exporting multiple drafts during a review process without a clear naming system quickly leads to confusion about which file is current.** A versioned filename - including the project name, a version number, and the date - such as client-promo-v2-2026-09-16, keeps drafts distinguishable from each other and makes it obvious at a glance which exported file is the most recent one to send or upload.`,
  "cc-13": `Overview: A finished export is not the end of a paid project - it goes to a client for review, and how that review is structured determines whether revisions are quick and focused or slow and circular. This lesson covers sending labelled drafts, requesting time-coded feedback, separating genuine mistakes from subjective preferences, and setting revision deadlines.

Sending labelled drafts: Every draft sent to a client should carry a clear label identifying the version and its purpose - a versioned filename from the export lesson, paired with a short message stating what changed since the last draft. A client receiving an unlabelled file with no context about what is new has no efficient way to know what to focus their feedback on, which produces vague, unfocused comments.

Requesting time-coded comments: **Feedback like 'the middle feels off' is nearly impossible to act on.** Asking clients directly for time-coded comments - 'at 0:14 the text is hard to read' - turns vague impressions into specific, actionable notes tied to an exact point on the timeline, which maps directly onto where changes need to be made in CapCut. Providing a simple template or example in the request message noticeably improves the quality of feedback that comes back.

Separating mistakes from preferences: **Client feedback falls into two different categories that need to be handled differently.** A mistake is something objectively wrong - a misspelled name, a logo in the wrong color, an audio dropout - and should always be fixed. A preference is a subjective creative choice - a different color, a different piece of music, a different pace - and is worth discussing rather than automatically implementing, especially if it conflicts with the plan agreed during story planning. Treating every preference as a mandatory fix leads to an edit that drifts away from what actually works.

Setting revision deadlines: **An open-ended revision window invites feedback to trickle in indefinitely, which stalls delivery and makes it hard to plan work around other projects.** Agreeing on a specific deadline for feedback on each draft - and being clear about how many rounds of revision are included - keeps the review process moving and sets a shared expectation about when a project is actually finished.

Closing the loop after each revision: After making requested changes, sending a short summary of exactly what was changed, referencing the original time-coded comments, confirms nothing was missed and gives the client an easy way to verify the fix without rewatching the entire video from the start.`,
  "cc-14": `Overview: A portfolio built only from final exported videos shows what an editor produced but not how they think - the planning, the decisions, and the improvements made along the way are invisible unless they are documented separately. This lesson covers building a case study around each portfolio piece rather than just uploading the finished file.

Documenting the original brief: A case study starts with the brief or goal the project was meant to solve - who asked for the video, what problem it needed to address, and what constraints existed, such as a tight deadline or limited footage. Writing this down before describing any editing decision gives a reviewer, such as a potential client or employer, the context needed to judge whether the choices that followed actually made sense.

Audience and platform decisions: Recording who the intended viewer was and which platform the video was built for - the same viewer and platform questions from story planning - shows that format and pacing choices, like a 9:16 export or a fast-cut TikTok style, were deliberate rather than default. This is often the part of a case study that best demonstrates understanding of platform-specific editing, since it connects a visible choice in the final video back to a specific reason.

Documenting timeline decisions and improvements made: A case study should describe specific choices made during editing - why a particular hook was chosen over another option, how audio was balanced, why a speed ramp was used at one moment and not another - and, where possible, name a genuine improvement made between an early draft and the final version. This is the part of a portfolio that final exports alone can never show, since a finished video only displays the last decision made, not the reasoning or the alternatives considered along the way.

Including the final file and supporting screenshots: The finished export still belongs in the case study, but alongside it, screenshots of the CapCut timeline - showing track layout, keyframes, or the speed curve on a key moment - give a reviewer visual evidence of the actual editing process, not just the polished result. A screenshot of a rough cut next to the final version can also demonstrate the scale of the improvement made during revision.

Writing for the reviewer, not just the client: **Unlike a client deliverable, a case study is written for someone evaluating editing skill and decision-making, such as a future client or employer.** It should be honest about constraints and trade-offs rather than presenting the process as flawless, since specific, credible detail about a real decision is more convincing than a vague claim of a perfect process.`,
  "cc-15": `Overview: This final lesson is a capstone - it does not introduce new CapCut techniques, but asks a student to combine everything covered across the course into one graduation edit that is ready to show as a portfolio piece: planning, story structure, audio, captions, motion, color, export, and presentation, working together in a single finished video.

Starting from planning, not from the timeline: Just as in story planning, the graduation edit should begin with a defined viewer, platform, hook, proof points, and call to action written down before any clip is placed. Skipping straight to editing at this stage repeats the exact mistake the course opened by warning against, and it is more visible in a capstone project than anywhere else, because a capstone is meant to demonstrate the full process, not just a finished result.

Building and locking the rough cut before polish: The rough cut - hook, context, value, proof, call to action, assembled and trimmed without effects - should be completed and watched in full before any audio cleanup, captions, color, or motion work begins. This ordering, covered early in the course, matters most here because a graduation project is the one place where skipping it and jumping straight to polish will be most obvious to anyone reviewing the finished work and the process behind it.

Layering audio, captions, and B-roll onto the locked structure: With structure locked, voice is balanced against music with ducking, sound effects are used sparingly, captions are sized and positioned for a phone screen using the auto-caption tool as a starting point, and B-roll or overlays are added specifically where they provide proof rather than just filling space. Each of these layers should be checked against the plan from the first stage - does this caption, this piece of B-roll, this music choice actually serve the hook, proof, or call to action that was defined at the start.

Applying color, motion, and speed with intention: Color correction should make clips consistent across any lighting differences in the footage, keyframe animation should be used only where it guides attention toward something specific, and speed ramps or clean cuts should be chosen based on what the story needs at each moment rather than applied uniformly. If a brand template was built in the Motion and Effects module, applying it here demonstrates the reusable system working on a real finished project rather than only in isolation.

Exporting, reviewing, and packaging as a portfolio piece: The final export should match the intended platform's aspect ratio and resolution, use a versioned filename, and be checked on an actual phone screen before being considered final, since a preview inside CapCut is not the same as how it will actually be watched. The finished video should then be packaged the way the portfolio lesson described - with the brief, audience, platform, key decisions, and a screenshot or two of the process - so the graduation edit demonstrates not just a finished video, but the complete editing judgment built across the entire course.`,
};

const enhancedContent: Record<string, string> = {
  "ps-1": `Overview: **Photoshop is a raster image editor, which means it builds images using pixels.** This is perfect for photo editing, posters, banners, mockups, social media graphics, and digital artwork. The most important idea in this lesson is workspace control: when you know where tools, panels, and document settings live, you stop guessing and start working like a designer.

Toolbar and options bar: **The Toolbar holds the tools you use directly on the canvas.** The Move Tool (V) positions layers, the Brush Tool (B) paints, the Type Tool (T) creates text, and selection tools help isolate parts of an image. The Options Bar changes depending on the selected tool, so always check it before assuming a tool is not working.

Layers panel: **The Layers panel is where professional Photoshop work happens.** Each image, text object, shape, or adjustment can sit on its own layer. This allows you to edit one part without damaging the rest of the design. The History panel helps you step backward, but good designers rely more on layers, masks, and smart objects than on undo.

Document setup: **Document setup matters before design begins.** Use 72 DPI for screen graphics like WhatsApp posters and social media posts. Use 300 DPI for print work such as flyers, certificates, posters, banners, and business cards. RGB is normally for screens; CMYK is safer for print. Always name your file properly and save a PSD copy so you can edit layers later.

Why design matters: **Graphic design is not just decoration.** It communicates, persuades, builds identity, and captures attention. A poster, flyer, or social media advert should have a clear message, a target audience, and a reason for every visual decision.

Design elements and principles: **The main design elements are line, shape, color, typography, texture, and space.** Lines guide the eye, shapes structure information, color creates emotion, typography controls readability, texture adds feeling, and white space gives the design breathing room. The core principles are balance, contrast, emphasis, alignment, proximity, repetition, movement, and unity. Before opening Photoshop, ask: What should the viewer notice first? What should they do after seeing the design?

File formats: **File formats matter in professional delivery.** Save editable work as PSD. Export JPEG for photos and online sharing, PNG for transparent graphics and logos, PDF/TIFF for print, GIF for simple animation, and SVG only when preserving vector-style web graphics. A good workflow is: save the PSD first, then export the final version required by the client or platform.`,
  "ps-2": `Overview: **Layers are the foundation of non-destructive editing.** A layer is like a transparent sheet placed above or below other sheets. The order matters: layers at the top of the panel appear in front on the canvas, while layers below appear behind.

Good habits: **Good layer habits make your work faster and cleaner.** Rename important layers, group related items with Ctrl+G, and keep text, images, backgrounds, and effects separated. When a client asks for changes, organized layers save time and make you look professional.

Blending modes: **Blending modes change how a layer interacts with the layers underneath it.** Multiply is useful when you want to darken or remove white areas, such as adding paper texture or shadows. Screen is useful for removing black areas, especially light leaks, sparks, glows, and lens effects. Overlay increases contrast by combining light and dark information.

Opacity vs fill: **Opacity affects the whole layer, including effects.** Fill affects the layer content but can leave layer styles such as shadows or strokes visible. This difference is useful when creating advanced text effects, watermarks, and subtle overlays.

Layer types: **Layer types include normal raster layers, text layers, shape layers, adjustment layers, fill layers, smart objects, and the locked background layer.** Text and shape layers remain editable until rasterized. Adjustment layers are especially important because they change brightness, contrast, hue, saturation, and tone without permanently damaging the image.

Layer styles: **Layer styles are non-destructive effects added from the fx button or Blending Options.** Drop Shadow separates an object from the background. Inner Shadow creates an engraved feeling. Outer Glow and Inner Glow help with neon, light, and emphasis. Stroke adds an outline. Gradient Overlay and Pattern Overlay add stylish fills. Bevel and Emboss can create a raised or carved 3D look, but should be used carefully so the design does not look cheap.

Organization tip: **Use layer groups when a design becomes complex.** Group backgrounds, images, text, effects, and call-to-action elements separately. Copy and paste layer styles when several elements need the same visual treatment. This keeps posters, mockups, and social media templates consistent and easier to edit.`,
  "ps-3": `Overview: **Selections allow you to work on one part of an image without affecting everything else.** A strong designer knows when to use fast tools and when to use precise tools. Quick Selection is useful for simple subjects with clear edges. The Pen Tool is better for products, logos, hard edges, and professional cutouts.

Masking vs erasing: **Masking is better than erasing.** When you erase, pixels are destroyed. When you mask, pixels are only hidden. In a layer mask, white reveals and black hides. Gray partially hides. This means you can correct mistakes later, soften edges, and blend images naturally.

Select and Mask workspace: **Select and Mask is especially important for hair, fur, fabric, and soft edges.** Tools like Refine Edge help Photoshop detect fine details that normal selections miss. After cutting out a subject, check the edges against both light and dark backgrounds because mistakes often hide on one background but show on another.

Believable compositing: **A clean cutout should match the lighting, color, sharpness, and shadows of the new background.** Selection is only the first step; believable compositing also needs adjustment layers, shadows, and edge cleanup.

Modifying selections: **Selections can be modified after creation.** Feather softens the edge, invert selects the opposite area, and expand or contract adjusts the selection boundary. Ctrl+T opens Free Transform, where you can resize, rotate, flip, warp, distort, and change perspective. These tools are useful when placing products, people, or text into a composition.

Repair tools: **Content-Aware Fill, Healing Brush, Spot Healing Brush, and Patch Tool help remove unwanted objects and repair image areas.** Spot Healing automatically blends small marks. Healing Brush lets you choose a clean source area. Patch Tool is useful for larger repairs where texture must match the surrounding area.

Filters: **Filters are creative and corrective tools.** Gaussian Blur softens backgrounds and shadows. Motion Blur creates speed. Smart Sharpen and High Pass improve detail. Add Noise adds grain or realism. Reduce Noise cleans low-light photos. Emboss, Oil Paint, Lens Flare, Clouds, Lighting Effects, and Displace can create special visual styles. Convert a layer to a Smart Object before applying filters so the effect stays editable as a Smart Filter.`,
  "ps-4": `Overview: **Professional skin retouching is about improving a portrait while keeping the person natural.** The goal is not to remove all texture. Real skin has pores, small lines, and tone variation. Over-smoothing makes a face look plastic and unprofessional.

Basic cleanup: **Start with basic cleanup.** Use Spot Healing Brush for small blemishes, dust, or temporary marks. Use Clone Stamp when you need more control over the source area. Work on a separate empty layer where possible so the original photo remains safe.

Frequency separation: **Frequency separation separates texture from color and tone.** The high-frequency layer keeps pores and fine details. The low-frequency layer holds color transitions and smoothness. This allows you to even out blotchy tones without destroying natural texture.

Dodge and burn: **Dodge and Burn is used to shape light.** Dodging brightens; burning darkens. With careful low-opacity strokes, you can reduce harsh shadows, enhance cheekbones, and guide attention to the face. Always zoom out often to avoid over-editing.

Blending modes and filters: **Retouching connects to blending modes and filters.** Soft Light and Overlay are useful for subtle skin tone enhancement, while Gaussian Blur can support controlled softening when applied carefully through masks or Smart Filters. Avoid applying blur directly to the whole face; protect eyes, lips, eyebrows, hair, and important texture.

Retouching workflow: A clean retouching workflow is: duplicate or create a safe working layer, remove temporary marks with healing tools, correct tone with adjustment layers, refine texture carefully, then shape light with Dodge and Burn. Work at low opacity, compare before and after often, and stop before the person starts looking artificial.

Final sharpening: **For product or portrait work, final sharpening should be selective.** High Pass with Overlay or Soft Light can sharpen important details, but too much sharpening creates halos and rough skin. The goal is clean, believable improvement, not an obvious filter effect.`,
  "ps-5": `Overview: **Typography is visual communication.** A poster can have beautiful images and still fail if the text is hard to read. Good type design uses hierarchy: the most important message should be seen first, then supporting information, then details.

Tracking, kerning, and leading: **Tracking controls space across a group of letters.** Kerning controls space between individual letter pairs. Leading controls space between lines. Adjust these carefully to make headlines feel polished and body text comfortable to read.

Layer styles for text: **Layer styles can help text stand out, but they must be controlled.** Drop shadows, strokes, glows, and gradients should support readability, not distract from it. If the background is busy, add contrast with a dark overlay, a soft shadow, or a simple shape behind the text.

Layout and balance: **Poster layout depends on balance and alignment.** Use grids, margins, and the rule of thirds to position elements. Keep related information close together, leave breathing space, and avoid putting every element at the same size. A strong poster guides the eye deliberately.

Typography detail: **Text spacing is part of professional typography.** Kerning adjusts space between two specific letters, tracking adjusts spacing across a word or phrase, leading controls line spacing, and paragraph spacing controls the gap before or after text blocks. Baseline shift moves selected characters up or down for special effects such as superscripts, subscripts, or stylized titles.

Logo and brand projects: **For logo and brand projects, begin with research, rough sketches, color psychology, and font pairing before designing in Photoshop.** Keep logos simple, memorable, versatile, relevant, and original. Test the logo in black and white first, then apply color. Use guides, rulers, shape tools, the Pen Tool, Smart Objects, and layer styles carefully.

Export sizes: **Poster and social media work should use the correct size and export settings.** Instagram square posts are commonly 1080x1080, stories and vertical reels are 1080x1920, and print posters need 300 DPI with safe margins. Use high-quality images, readable fonts, a clear focal point, and enough spacing. For mockups, place artwork into Smart Objects so the design updates naturally on t-shirts, business cards, billboards, or phone screens.

Final project workflow: create the logo, poster, and social media design in organized folders; save PSD files for future editing; export PNG for transparent designs, JPG for photos, and PDF/TIFF for print. Keep separate folders for project files, assets, and final exports so client work stays professional.`,
  "ai-1": `Overview: **Illustrator is a vector design tool.** Vector artwork is built from paths, anchor points, curves, and fills instead of pixels. This means a logo can scale from a small social media icon to a billboard without becoming blurry.

Why vectors matter: **Raster images depend on resolution.** If you enlarge a small raster image too much, it pixelates. Vector artwork stays sharp because Illustrator recalculates the shape mathematically. This is why logos, icons, typography, packaging marks, and brand assets are usually created in Illustrator.

Artboards: **Artboards work like separate pages inside one document.** You can create a logo, business card, letterhead, and social media layout in the same file using different artboards. This keeps a brand project organized.

Color modes: **Use RGB for screen work and CMYK for print work.** RGB is built for light on screens, while CMYK is built for ink. For logos that will be printed in Kenya, CMYK setup helps reduce unexpected color shifts.`,
  "ai-2": `Overview: **The Pen Tool is one of the most powerful tools in Illustrator because it gives exact control over paths.** Clicking creates corner points. Clicking and dragging creates curved points with handles. The direction and length of handles control the smoothness of a curve.

Fewer points, cleaner curves: **Good Pen Tool work uses fewer points, not more.** Too many points create bumpy curves and make editing difficult. Place anchor points at major direction changes, then use handles to shape the curve between them.

Handle control: **Holding Alt lets you break or adjust handles when a path needs to change direction sharply.** Direct Selection (A) lets you move individual anchor points and handles after drawing. This is how you refine rough paths into clean professional shapes.

Practice tip: **Tracing logos is excellent practice because it trains your eye to see curves, corners, spacing, and symmetry.** Start slowly. Accuracy matters more than speed. With time, your hand becomes faster because your eye understands the shape.`,
  "ai-3": `Overview: **Most strong logos are built from simple shapes.** Circles, rectangles, triangles, and lines can combine into memorable marks when spacing, proportion, and alignment are controlled.

Shape Builder: **Shape Builder (Shift+M) lets you merge or remove overlapping shapes visually.** Drag through regions to combine them. Hold Alt and click to delete unwanted parts. It is often faster and more intuitive than using Pathfinder buttons.

Pathfinder: **Pathfinder performs similar operations through commands such as Unite, Minus Front, Intersect, and Divide.** Use it when you need precise boolean operations. After combining shapes, inspect anchor points and clean any unnecessary complexity.

Logo construction checklist: **Logo construction should consider balance, readability, and scalability.** A logo must work in one color, at small sizes, and on different backgrounds. Before adding color effects, test the mark in black and white.`,
  "cc-1": `Overview: **Short-form video succeeds when the viewer understands the message quickly.** The first few seconds matter most. A strong opening hook, clear subject, and fast rhythm help keep people watching.

Aspect ratio: **Aspect ratio controls where the video fits.** Use 9:16 for TikTok, Instagram Reels, YouTube Shorts, and WhatsApp Status. Use 16:9 for YouTube landscape, presentations, and TV-style content. Choosing the wrong ratio can crop important details.

Timeline editing: **Good timeline editing removes dead space.** Cut pauses, repeated words, and weak moments. Keep the strongest clips and arrange them so the video keeps moving. Audio also matters: clean sound, beat timing, and captions can make a simple edit feel professional.

Captions: **Captions help viewers understand even when sound is off.** Use readable fonts, strong contrast, and short caption lines. Avoid covering faces, products, or important action with text.`,
  "cc-2": `Overview: **Keyframes create motion over time.** You set a starting value and an ending value, and CapCut animates the change between them. This can control position, scale, rotation, opacity, and other effects.

Simple over complex: **Simple keyframe moves often look more professional than random transitions.** A slow zoom can add focus. A small slide can introduce text. A controlled opacity change can reveal information cleanly.

Overlays: **Overlays place one video, image, or graphic above another.** They are useful for reaction clips, logos, screenshots, subtitles, texture effects, and before-after comparisons. Blending modes and opacity help overlays feel integrated instead of pasted on.

Velocity editing: **Velocity editing changes clip speed for impact.** Speed ramps can emphasize action, music beats, or transitions. Use them carefully: too much speed change can confuse the viewer. The best edits support the story.`,
  "sw-1": `Overview: **SolidWorks sketching is the base of accurate 3D modeling.** A weak sketch creates weak parts. A strong sketch is clear, fully defined, and controlled by dimensions and relations.

Relations: **Relations describe how sketch entities behave.** Horizontal and vertical relations control direction. Tangent relations create smooth contact between curves and lines. Coincident relations connect points. Concentric relations make circles share the same center.

Smart Dimensions: **Smart Dimensions give exact size to geometry.** A professional model should not depend on dragging shapes by eye. Dimensions make the design repeatable, editable, and ready for manufacturing.

Fully defined sketches: **A fully defined sketch turns black, meaning its size and position are controlled.** Blue geometry is under-defined and can move unexpectedly. Before creating 3D features, make sure important sketches are fully defined so later changes do not break the model.`,
  "sw-2": `Overview: **Extrude Boss/Base turns a 2D sketch into a 3D solid by adding depth.** It is one of the most common features in SolidWorks. The sketch profile controls the shape, and the extrusion distance controls thickness.

Revolve: **Revolve creates a 3D shape by rotating a sketch around an axis.** This is ideal for circular or cylindrical objects such as bottles, shafts, wheels, pulleys, and knobs. The axis must be chosen carefully because it controls the center of rotation.

Extrude Cut: **Extrude Cut removes material from a part.** It is used for holes, slots, pockets, vents, and clearances. Cuts should be dimensioned properly so they match the design requirement rather than being placed by guesswork.

Fillets and chamfers: **Fillets and chamfers improve both appearance and function.** Fillets round edges, while chamfers create angled edges. In engineering, these features can reduce sharp edges, improve manufacturability, and help parts assemble smoothly.`,
  ...vibeDesigningContent,
  ...vibeCodingContent,
  ...aiPromptContent,
  ...photoshopExpansionContent,
  ...illustratorExpansionContent,
  ...solidworksExpansionContent,
  ...capcutExpansionContent,
};

const photoshopExpansionQuizzes: Record<string, NonNullable<Lesson["quiz"]>> = {
  "ps-6": { questions: [
      { id: "ps-6-q1", question: "In the 60-30-10 palette rule, what does the 10% typically represent?", options: ["The dominant background color","The secondary supporting color","A color that should never be used","An accent color for highlights or calls to action"], answer: 3, explanation: "The smallest portion, 10%, is reserved as an accent for highlights or call-to-action elements." },
      { id: "ps-6-q2", question: "Which color harmony uses colors directly opposite each other on the color wheel?", options: ["Analogous","Monochromatic","Complementary","Triadic"], answer: 2, explanation: "Complementary schemes pair opposite colors, like orange and blue, for high contrast and energy." },
      { id: "ps-6-q3", question: "A quick way to check whether text will stay legible over a busy photo is to temporarily view the design in what mode?", options: ["Grayscale, using a Black & White adjustment layer","CMYK preview","Perspective warp","Lens Blur"], answer: 0, explanation: "Converting to grayscale with a temporary Black & White adjustment layer isolates contrast, showing whether text will disappear into the image." },
      { id: "ps-6-q4", question: "Which type of color scheme feels the most premium and controlled?", options: ["Complementary","Monochromatic","Triadic","Warm-and-cool mixed with no dominant temperature"], answer: 1, explanation: "Monochromatic palettes use one hue in different tints and shades, producing a controlled, premium look." },
      { id: "ps-6-q5", question: "Where can a designer save a limited set of poster colors so every new layer pulls from the same palette?", options: ["The History panel","The Swatches panel","The Character panel","The Paths panel"], answer: 1, explanation: "The Swatches panel (Window > Swatches) stores a project's approved colors so the palette stays consistent." },
    ] },
  "ps-7": { questions: [
      { id: "ps-7-q1", question: "Where can a designer enable a rule-of-thirds style grid overlay in Photoshop?", options: ["The History panel","View > Show > Grid, or the Crop tool's overlay options","The Character panel","The Print dialog"], answer: 1, explanation: "The grid can be turned on via View > Show > Grid or through the Crop tool's rule-of-thirds overlay option." },
      { id: "ps-7-q2", question: "What is the main fix recommended for turning a crowded flyer into a balanced one?", options: ["Shrink every element equally","Increase saturation on all layers","Group related items and cut elements that don't support the message","Add more decorative shapes for texture"], answer: 2, explanation: "The lesson recommends grouping related items and removing non-essential decoration rather than just shrinking everything." },
      { id: "ps-7-q3", question: "Which Move tool feature evens out the gaps between three or more selected layers?", options: ["Distribute Spacing","Free Transform","Content-Aware Fill","Auto-Blend Layers"], answer: 0, explanation: "Distribute Spacing, found in the Move tool's options bar, spaces multiple selected layers evenly." },
      { id: "ps-7-q4", question: "In visual hierarchy, what should typically be the largest and highest-contrast element on a poster?", options: ["The venue address","The smallest decorative icon","The background texture","The most important element, such as the headline or main subject"], answer: 3, explanation: "Hierarchy directs the largest, highest-contrast treatment to the most important message so it is seen first." },
      { id: "ps-7-q5", question: "Zooming out to around 25% is suggested for what purpose?", options: ["To increase the canvas resolution","To check whether the composition still reads clearly from a distance","To convert the file to CMYK","To flatten all layers automatically"], answer: 1, explanation: "Viewing the layout small mimics how a poster is seen from a distance, revealing whether the composition still holds together." },
    ] },
  "ps-8": { questions: [
      { id: "ps-8-q1", question: "What is the fastest way to correct an off color cast in Camera Raw?", options: ["Click the White Balance eyedropper on something that should be neutral gray or white","Increase Contrast","Apply Noise Reduction","Increase Clarity"], answer: 0, explanation: "Clicking the White Balance eyedropper on a neutral point quickly removes an unwanted color cast." },
      { id: "ps-8-q2", question: "What must be done to a layer before applying Camera Raw Filter so the correction stays editable later?", options: ["Flatten the image","Convert the layer to a Smart Object","Rasterize all type layers","Delete the layer mask"], answer: 1, explanation: "Converting to a Smart Object first makes the Camera Raw Filter a re-editable Smart Filter instead of a permanent change." },
      { id: "ps-8-q3", question: "Why should exposure be corrected before color adjustments?", options: ["Exposure has no effect on color","Color adjustments must come first by Adobe's rules","Wrong exposure throws off every later color and contrast judgment","Exposure can only be changed after export"], answer: 2, explanation: "Getting exposure right first ensures later color and contrast decisions are being made on accurate tonal information." },
      { id: "ps-8-q4", question: "Which Camera Raw Detail panel setting reduces grainy speckling from low-light or high-ISO photos?", options: ["Dehaze","Temperature","Vibrance","Noise Reduction"], answer: 3, explanation: "Noise Reduction in the Detail panel smooths grainy speckling common in low-light or high-ISO shots." },
      { id: "ps-8-q5", question: "What is the keyboard shortcut to open the Camera Raw Filter on Windows?", options: ["Ctrl+Shift+A","Ctrl+Alt+I","Ctrl+T","Ctrl+Shift+N"], answer: 0, explanation: "Ctrl+Shift+A (Cmd+Shift+A on Mac) opens the Camera Raw Filter on a selected layer." },
    ] },
  "ps-9": { questions: [
      { id: "ps-9-q1", question: "What is a typical pixel size for a square social media post?", options: ["1080x1080px","1920x1080px","600x800px","300x300px"], answer: 0, explanation: "1080x1080px is a standard square social media post size, usually at 72 DPI." },
      { id: "ps-9-q2", question: "Why does keeping the same fonts and colors across all three posts matter?", options: ["It reduces file size","It is required for PNG export","It is what makes a set of posts read as one connected campaign","It prevents layers from being renamed"], answer: 2, explanation: "Consistency in color and typography across posts is what makes them feel like one campaign rather than unrelated designs." },
      { id: "ps-9-q3", question: "Why should key content sit in the upper two-thirds of a story or status format?", options: ["Because that area prints better","Because Photoshop requires it","Because that area has higher resolution","Because captions and reply bar UI overlays are more likely to cover the bottom"], answer: 3, explanation: "Platform UI elements like captions and reply bars commonly sit near the bottom of story/status formats, so key content is placed higher to stay visible." },
      { id: "ps-9-q4", question: "What are the three posts in the suggested simple campaign structure?", options: ["Teaser, teaser, teaser","Announcement, benefit/feature, call-to-action","Logo, product, price only","Three identical reposts"], answer: 1, explanation: "The suggested structure covers what/when, why it matters, and how to act." },
      { id: "ps-9-q5", question: "Where should a campaign's approved colors be saved for reuse across posts?", options: ["The Swatches panel","The History panel","The Paths panel","The Channels panel"], answer: 0, explanation: "Window > Swatches stores the campaign's palette so it can be reused consistently across every post." },
    ] },
  "ps-10": { questions: [
      { id: "ps-10-q1", question: "What happens when you save changes inside a mockup's placeholder Smart Object?", options: ["Nothing changes until the file is closed","The template's shadows are deleted","The mockup automatically updates with the new design","The file converts to CMYK"], answer: 2, explanation: "Saving inside the Smart Object's embedded document pushes the update back to the mockup automatically." },
      { id: "ps-10-q2", question: "Which command brings artwork into a document as a Smart Object rather than flat pixels?", options: ["Edit > Paste","File > Place Embedded","Image > Duplicate","Select > All"], answer: 1, explanation: "File > Place Embedded inserts the artwork as a Smart Object, keeping it scalable and non-destructive." },
      { id: "ps-10-q3", question: "Which tool is best suited for bending a design around a fabric fold or curved surface?", options: ["Puppet Warp","Crop Tool","Hue/Saturation","Lasso Tool"], answer: 0, explanation: "Puppet Warp allows complex, flexible bending of a design to follow curves like fabric folds." },
      { id: "ps-10-q4", question: "Which blend mode is commonly used to let shadow information show through a placed design?", options: ["Normal","Dissolve","Color Dodge","Multiply"], answer: 3, explanation: "Multiply darkens based on the layer beneath it, making it suitable for letting shadows show through." },
      { id: "ps-10-q5", question: "Why should a mockup be delivered as both a flattened image and a layered PSD?", options: ["PSD files cannot be viewed by clients","The flattened file is for quick viewing; the PSD keeps future edits fast via the Smart Object","JPEG files preserve Smart Objects better than PSD","It is required for print bleed"], answer: 1, explanation: "A flattened export is easy to view immediately, while the layered PSD preserves the Smart Object for fast future edits." },
    ] },
  "ps-11": { questions: [
      { id: "ps-11-q1", question: "What resolution should a print document be set to in Photoshop?", options: ["72 pixels/inch","150 pixels/inch","300 pixels/inch","96 pixels/inch"], answer: 2, explanation: "300 pixels/inch is the standard resolution for sharp commercial print output." },
      { id: "ps-11-q2", question: "What is the purpose of bleed in a print-ready file?", options: ["To make the file smaller","To extend artwork past the trim edge so no white sliver appears after cutting","To increase DPI automatically","To convert RGB to CMYK"], answer: 1, explanation: "Bleed is extra artwork beyond the trim line that prevents white edges from appearing if the cut shifts slightly." },
      { id: "ps-11-q3", question: "Why might bright, saturated colors look duller after converting a file to CMYK?", options: ["CMYK has a smaller color range than RGB","CMYK always increases saturation","CMYK removes all color information","CMYK only supports grayscale"], answer: 0, explanation: "CMYK's printable color range (gamut) is smaller than RGB's, so very saturated screen colors can shift or dull on press." },
      { id: "ps-11-q4", question: "In Photoshop's Print dialog, where are crop marks and bleed settings found?", options: ["The Character panel","The Marks & Bleed section","The Layers panel","The History panel"], answer: 1, explanation: "The Marks & Bleed section of the Print dialog lets you enable corner crop marks and set the bleed amount." },
      { id: "ps-11-q5", question: "What should safe margins keep clear of the trim edge?", options: ["Nothing; safe margins apply only to background images","The bleed area only","The entire canvas","Important text and logos, typically 3-5mm inside the trim edge"], answer: 3, explanation: "Safe margins keep important content like text and logos a comfortable distance inside the trim line so trimming variance doesn't cut them off." },
    ] },
  "ps-12": { questions: [
      { id: "ps-12-q1", question: "What is described as the single biggest factor in making a composite look believable?", options: ["File format","Canvas size","Matching the direction of light between subject and background","Font choice"], answer: 2, explanation: "If the subject's lighting direction doesn't match the background's light source, the composite looks pasted no matter how clean the cutout is." },
      { id: "ps-12-q2", question: "Which blend mode should a contact shadow layer typically use?", options: ["Screen","Multiply","Difference","Dissolve"], answer: 1, explanation: "Multiply darkens the layers beneath it naturally, which suits how a contact shadow should behave." },
      { id: "ps-12-q3", question: "Why might a subject meant to appear far in the background be pushed slightly cooler and less saturated?", options: ["To match atmospheric haze, which makes distant elements appear cooler and less saturated","Because CMYK requires it","Because it increases file resolution","Because Select and Mask requires desaturation"], answer: 0, explanation: "Atmospheric haze naturally cools and desaturates distant objects, so mimicking that effect helps sell depth." },
      { id: "ps-12-q4", question: "Which Select and Mask feature removes leftover color fringe from a subject's original background?", options: ["Feather","Smart Radius","Output To","Decontaminate Colors"], answer: 3, explanation: "Decontaminate Colors specifically targets and removes background color fringing along a selection's edge." },
      { id: "ps-12-q5", question: "What indicates a subject appears to be floating in a composite?", options: ["A missing contact shadow where the object should touch the ground","Too much color saturation","Using CMYK instead of RGB","A large canvas size"], answer: 0, explanation: "Without a contact shadow anchoring the subject to the surface below it, the subject reads as floating." },
    ] },
  "ps-13": { questions: [
      { id: "ps-13-q1", question: "What Photoshop feature lets a second image show only through a portrait's silhouette in a double exposure effect?", options: ["A layer mask set to Reveal Selection","The Crop tool","The History panel","CMYK conversion"], answer: 0, explanation: "Adding a layer mask from the silhouette selection (Reveal Selection) restricts the second image to only that shape." },
      { id: "ps-13-q2", question: "Which blending mode is best suited for adding light leaks or glowing elements over a dark image?", options: ["Multiply","Color Burn","Screen","Linear Burn"], answer: 2, explanation: "Screen brightens the image beneath it, making it ideal for glows, sparks, and light leaks." },
      { id: "ps-13-q3", question: "What does a Gradient Map adjustment layer do?", options: ["Sharpens edges automatically","Remaps an image's tones to a chosen gradient of colors for a cohesive color grade","Removes noise from photos","Converts layers to Smart Objects"], answer: 1, explanation: "Gradient Map replaces tonal values with colors from a chosen gradient, producing a unified color grade." },
      { id: "ps-13-q4", question: "Which tool, when applied directly to a layer mask, creates a soft transition instead of a hard edge between two images?", options: ["The Gradient Tool (G)","The Type Tool (T)","The Eyedropper Tool","The Crop Tool"], answer: 0, explanation: "Dragging the Gradient Tool across a mask fades from fully visible to fully hidden, creating a smooth blend." },
      { id: "ps-13-q5", question: "Which blend modes are recommended for adding paper or fabric texture without hiding the image underneath?", options: ["Difference and Exclusion","Normal and Dissolve","Hue and Saturation","Overlay and Soft Light"], answer: 3, explanation: "Overlay and Soft Light increase contrast and let texture show while allowing midtones of the image beneath to remain visible." },
    ] },
  "ps-14": { questions: [
      { id: "ps-14-q1", question: "What should be defined before opening Photoshop to start the brand poster project?", options: ["The exact brush size to use","The poster's single goal, final size/DPI, and dominant focal point","The number of layers to create","The RAM allocation in Preferences"], answer: 1, explanation: "Planning the poster's single message, output size, and focal point prevents a cluttered design that tries to say too much." },
      { id: "ps-14-q2", question: "Which module's techniques are used to make a composited subject look photographed rather than pasted into the poster?", options: ["Lesson 12's lighting-match, contact-shadow, and color-balance techniques","Lesson 6's color harmony only","Lesson 9's campaign format sizes","Lesson 16's revision labeling"], answer: 0, explanation: "Lesson 12 covers matching light direction, contact shadows, and color balance, which are directly applied here for realism." },
      { id: "ps-14-q3", question: "What color mode and resolution should the poster use if it is going to print?", options: ["RGB at 72 DPI","Grayscale at 150 DPI","CMYK at 300 DPI, with bleed and safe margins","Indexed color at 96 DPI"], answer: 2, explanation: "Print output follows Lesson 11's standard: 300 DPI, CMYK awareness, and built-in bleed and safe margins." },
      { id: "ps-14-q4", question: "Why should the creative color/texture pass (Gradient Map, textures, glows) stay subtle?", options: ["Because Photoshop limits the number of adjustment layers","Because texture layers cannot be exported","Because subtle effects load faster on mobile","So the effects support the headline message instead of competing with it"], answer: 3, explanation: "Creative effects should reinforce the poster's single message rather than distract from it with overpowering treatment." },
      { id: "ps-14-q5", question: "How should the final poster be presented before delivery, according to this lesson?", options: ["As a flat screenshot only","Inside a realistic Smart Object mockup, such as a framed poster or billboard","Only as a low-resolution thumbnail","Without any file labeling"], answer: 1, explanation: "Presenting the poster inside a Smart Object mockup, as covered in Lesson 10, lets the client see it in context while keeping the design swappable." },
    ] },
  "ps-15": { questions: [
      { id: "ps-15-q1", question: "What should a designer ask about first when clarifying a vague brief like \"make it look modern\"?", options: ["The audience and desired action","The exact font to use","The file format","The canvas resolution"], answer: 0, explanation: "Understanding the audience and the action they should take comes before style decisions like colors or fonts." },
      { id: "ps-15-q2", question: "What is the purpose of studying competitors in the same market?", options: ["To copy their exact designs","To understand visual norms so you can deliberately fit in or stand out","To determine the file's DPI","To choose a print shop"], answer: 1, explanation: "Competitor research reveals the market's visual norms, informing a deliberate choice to blend in or differentiate." },
      { id: "ps-15-q3", question: "How many reference images does the lesson suggest gathering to build a shared visual language with a client?", options: ["1","20","3-5","None are needed"], answer: 2, explanation: "The lesson recommends collecting 3-5 reference images to align on mood, palette, and layout style before design work begins." },
      { id: "ps-15-q4", question: "What should a written creative brief capture?", options: ["Only the client's favorite color","Nothing; briefs should stay verbal","Only the software version used","The core message, audience, required formats/sizes, brand assets, and deadline"], answer: 3, explanation: "A useful internal brief documents the core message, audience, formats, brand assets, and deadline to ground design decisions." },
      { id: "ps-15-q5", question: "Why should the number of revision rounds be agreed upon before design work starts?", options: ["It has no real impact on the project","To prevent scope confusion once design work is underway","Because Photoshop limits revisions automatically","Because clients never ask for revisions"], answer: 1, explanation: "Confirming deliverables and revision rounds upfront avoids disputes and scope creep later in the project." },
    ] },
  "ps-16": { questions: [
      { id: "ps-16-q1", question: "What is the recommended way to save a new revision instead of overwriting the previous file?", options: ["File > Save, using the same filename","File > Save As, with an incremented version number in the filename","Deleting the old file first","Exporting only a JPEG"], answer: 1, explanation: "File > Save As with a new version number preserves earlier drafts instead of destroying them." },
      { id: "ps-16-q2", question: "Which Photoshop panel lets you save different layer visibility/position combinations within a single file for comparing options?", options: ["Layer Comps panel","History panel","Channels panel","Paths panel"], answer: 0, explanation: "The Layer Comps panel (Window > Layer Comps) stores different layer states within one document." },
      { id: "ps-16-q3", question: "How does the lesson distinguish a 'correction' from a 'preference'?", options: ["There is no difference","Corrections are always more expensive","A correction fixes something objectively wrong; a preference is a subjective style request","Preferences must always be ignored"], answer: 2, explanation: "Corrections (like a misspelled word) are objective fixes, while preferences (like a brighter blue) are subjective and may need discussion." },
      { id: "ps-16-q4", question: "What should the final client handover folder contain?", options: ["Every draft version ever saved, unsorted","Only a screenshot of the design","Nothing; files should be emailed individually with no folder structure","Only the approved layered PSD, flattened exports, and mockups, clearly named"], answer: 3, explanation: "A clean handover keeps only the approved final files, clearly labeled, rather than a mix of old drafts." },
      { id: "ps-16-q5", question: "Why keep a running list of feedback across revision rounds?", options: ["It is required by Photoshop","To prevent feedback from getting lost or a client re-requesting something already addressed","To increase the file's DPI","To automatically generate a PDF"], answer: 1, explanation: "Tracking feedback avoids confusion and repeated requests by keeping a clear record of what was asked for and changed." },
    ] },
  "ps-17": { questions: [
      { id: "ps-17-q1", question: "What should each portfolio case study open with, according to this lesson?", options: ["A short statement of the original brief or goal","A list of Photoshop shortcuts used","The file size of the PSD","The designer's favorite color"], answer: 0, explanation: "Stating the original goal or brief gives context for why design decisions were made, similar to the brief-gathering approach from Lesson 15." },
      { id: "ps-17-q2", question: "Why is showing in-progress screenshots valuable in a portfolio?", options: ["It increases file resolution","It demonstrates how the final piece was built, which is often more convincing than the result alone","It is required by Photoshop's export settings","It replaces the need for a final image"], answer: 1, explanation: "Process screenshots like a named Layers panel or a Camera Raw before/after show the designer's working method, adding credibility." },
      { id: "ps-17-q3", question: "Which type of portfolio piece is described as one of the most persuasive formats for photo correction and composite work?", options: ["A blank color swatch","A list of fonts used","A before-and-after comparison","An unedited RAW file"], answer: 2, explanation: "Before-and-after comparisons make the designer's specific contribution obvious, which is highly persuasive for correction and composite work." },
      { id: "ps-17-q4", question: "What lesson's Smart Object skills are reused to present finished work inside a realistic mockup?", options: ["Lesson 6 (Color Theory)","Lesson 15 (Client Briefs)","Lesson 7 (Composition)","Lesson 10 (Product Mockups and Smart Object Workflow)"], answer: 3, explanation: "Lesson 10's Smart Object mockup techniques are reused here to present finished pieces in realistic, real-world contexts." },
      { id: "ps-17-q5", question: "What should a good portfolio caption include, according to this lesson?", options: ["Only the software version number","The brief, a key design decision, and the outcome","A generic compliment with no specifics","Nothing; images should stand alone"], answer: 1, explanation: "A caption covering the brief, a key decision, and the outcome gives viewers context the image alone cannot provide." },
    ] },
};

const illustratorExpansionQuizzes: Record<string, NonNullable<Lesson["quiz"]>> = {
  "ai-4": { questions: [
      { id: "ai-4-q1", question: "What happens when Round Cap is applied to a stroke?", options: ["A semicircle extends beyond the anchor point","The line ends flush at the anchor point","The corner becomes sharp","The fill color is removed"], answer: 0, explanation: "Round Cap adds a semicircular extension beyond the endpoint of a stroked line." },
      { id: "ai-4-q2", question: "Where do you view and edit every fill, stroke, and effect applied to a selected object?", options: ["The Swatches panel","The Artboards panel","The Appearance panel","The Character panel"], answer: 2, explanation: "The Appearance panel lists all live fill, stroke, and effect attributes on an object in editing order." },
      { id: "ai-4-q3", question: "Which panel controls object opacity and blending modes like Multiply?", options: ["Stroke panel","Transparency panel","Pathfinder panel","Links panel"], answer: 1, explanation: "The Transparency panel sets opacity and blending modes for objects or individual appearance attributes." },
      { id: "ai-4-q4", question: "Why is it useful that a path can hold multiple strokes in the Appearance panel?", options: ["It deletes the fill automatically","It converts the path to a raster image","It locks the path from editing","It lets you fake effects like a thick outline behind a thin stroke without duplicating artwork"], answer: 3, explanation: "Stacking multiple strokes in the Appearance panel lets you layer effects on one path instead of drawing extra copies." },
      { id: "ai-4-q5", question: "What makes an icon set look like a unified family rather than mismatched pieces?", options: ["Using a different stroke weight on every icon","Reusing the same stroke weight and cap/corner rules across every icon","Randomizing corner styles for variety","Removing all strokes from half the icons"], answer: 1, explanation: "Applying consistent stroke weight, cap, and corner rules across every icon is what unifies a set visually." },
    ] },
  "ai-5": { questions: [
      { id: "ai-5-q1", question: "What is the key difference between point text and area text?", options: ["Point text is typed freely from a click, area text wraps inside a drawn box","Point text always uses bold, area text never does","Area text cannot be resized","Point text is only for numbers"], answer: 0, explanation: "Point text is created with a single click and flows freely; area text is created by dragging a box and wraps inside it." },
      { id: "ai-5-q2", question: "What does kerning specifically adjust?", options: ["The color of the text","The overall paragraph alignment","The spacing between a specific pair of letters","The font's file size"], answer: 2, explanation: "Kerning fine-tunes the spacing between two specific adjacent characters, unlike tracking which affects a whole range evenly." },
      { id: "ai-5-q3", question: "Why is Type > Create Outlines used on final logo and print files?", options: ["It makes the text spell-check itself","It converts text to paths so the file displays correctly without the original font installed","It increases the font size automatically","It adds a drop shadow to the text"], answer: 1, explanation: "Outlining text turns it into vector shapes independent of font installation, preventing font-substitution problems." },
      { id: "ai-5-q4", question: "What is lost once text has been converted to outlines?", options: ["The vector shape of the letters","The fill color","The artboard it sits on","The ability to edit it as text, such as spell-checking or retyping"], answer: 3, explanation: "Outlined text becomes plain vector paths and can no longer be edited, spell-checked, or have its font swapped." },
      { id: "ai-5-q5", question: "What is the recommended workflow for handling text before final delivery?", options: ["Outline the text before proofreading it","Keep an editable live-text master, then outline only a duplicate for delivery","Delete the original file after outlining","Never use the Character panel"], answer: 1, explanation: "Keeping the live-text master intact and outlining a duplicate preserves future editability while ensuring safe delivery." },
    ] },
  "ai-6": { questions: [
      { id: "ai-6-q1", question: "What visually indicates a swatch has been made a Global Color?", options: ["A small white triangle in the corner of the swatch icon","A red border around the swatch","The swatch turns black and white","The swatch is automatically renamed"], answer: 0, explanation: "Illustrator marks global color swatches with a small white triangle in the corner of the swatch icon." },
      { id: "ai-6-q2", question: "Why are global colors especially useful for brand work?", options: ["They cannot be edited once created","They only work on gradients","Editing the swatch once updates every object using it throughout the document","They convert automatically to CMYK"], answer: 2, explanation: "A global color propagates any edit to every object using that swatch, avoiding manual recoloring of dozens of objects." },
      { id: "ai-6-q3", question: "What is a tint in the context of global colors?", options: ["A completely unrelated new color","A percentage of a global color's full strength, staying tied to the original hue","A type of gradient stop only","A pattern swatch"], answer: 1, explanation: "A tint is a lighter percentage variant of a global color that updates automatically if the base color changes." },
      { id: "ai-6-q4", question: "In systemized icon or logo work, why is flat color often preferred over gradients?", options: ["Gradients cannot be saved as swatches","Flat color is the only exportable format","Gradients are not visible in the Swatches panel","Flat color usually reads cleaner in that context"], answer: 3, explanation: "The lesson notes flat color typically reads cleaner than gradients in flat, systemized icon or logo work." },
      { id: "ai-6-q5", question: "What is the most reliable way to keep colors consistent across multiple brand files?", options: ["Rebuilding colors from scratch in each new file","Reusing one master swatch library across every file","Using only the default swatch library","Avoiding the Swatches panel entirely"], answer: 1, explanation: "Reusing a master swatch library prevents the small color mismatches that come from rebuilding palettes by memory each time." },
    ] },
  "ai-7": { questions: [
      { id: "ai-7-q1", question: "Why should you study competitor logos before sketching your own?", options: ["To avoid accidental similarity and understand visual conventions the audience expects","To copy their exact shapes","Because it is required by Illustrator","To pick the same font automatically"], answer: 0, explanation: "Competitor research helps avoid unintentional similarity while revealing conventions the target audience already recognizes." },
      { id: "ai-7-q2", question: "What is the purpose of listing many possible symbols before drawing any of them?", options: ["To fill space in a sketchbook","Because Illustrator requires a symbol list file","To prevent fixating on the first idea, which is rarely the strongest","To reduce the number of colors used later"], answer: 2, explanation: "Brainstorming a long list of symbols first avoids settling prematurely on a weak first idea." },
      { id: "ai-7-q3", question: "Why should rough logo sketches be tested as small, simplified silhouettes?", options: ["Because color cannot be added later","Because a concept that only works with fine detail will likely fail at small sizes like a favicon","Because silhouettes are required for print","Because Illustrator cannot handle detailed shapes"], answer: 1, explanation: "A logo must remain recognizable at very small sizes, so testing the rough silhouette early catches concepts that rely too much on fine detail." },
      { id: "ai-7-q4", question: "According to this lesson, how many concepts should you narrow down to before building clean vectors?", options: ["Exactly one, chosen at random","All sketched concepts, ten or more","None, sketching is skipped entirely","Two or three strong concepts"], answer: 3, explanation: "The lesson recommends narrowing to two or three concepts that best fit the brand before moving into Illustrator." },
      { id: "ai-7-q5", question: "What personality-related information should be gathered during logo research?", options: ["The client's favorite font only","Words the client uses to describe the brand's personality, like modern or playful","The exact RGB values of competitors' logos","The file size limit for the final export"], answer: 1, explanation: "Personality words guide visual decisions and should be gathered as part of research before sketching begins." },
    ] },
  "ai-8": { questions: [
      { id: "ai-8-q1", question: "Why is a logo rebuilt on a grid rather than traced loosely from the sketch?", options: ["A grid gives consistent reference points for width, height, and spacing that a freehand sketch cannot guarantee","Grids are required by Illustrator's file format","Tracing sketches is not possible in Illustrator","Grids automatically choose the brand colors"], answer: 0, explanation: "A grid provides precise, repeatable reference points that a rough sketch cannot offer." },
      { id: "ai-8-q2", question: "What does the Align panel's 'key object' option let you do?", options: ["Delete all other selected objects","Automatically convert text to outlines","Set one selected object as the anchor that others align relative to","Change the artboard size"], answer: 2, explanation: "Selecting a key object lets other selected objects align or distribute relative to that specific object instead of the group average." },
      { id: "ai-8-q3", question: "Why might a shape need to sit slightly off mathematical center to look balanced?", options: ["Because Illustrator's grid is inaccurate","Because human perception weighs shapes differently based on their form, creating optical imbalance at true center","Because color always shifts the visual center","Because the Pen Tool cannot place points precisely"], answer: 1, explanation: "Optical balance accounts for how the eye perceives different shapes, which can differ from exact mathematical centering." },
      { id: "ai-8-q4", question: "Why must a logo be tested in pure black-and-white?", options: ["Because color logos cannot be exported","Because Illustrator only supports black and white files","Because clients always prefer black and white","Because it will eventually appear in contexts like stamps or engravings where color is unavailable"], answer: 3, explanation: "A logo needs to remain legible in single-color contexts like stamps, engravings, or low-cost print." },
      { id: "ai-8-q5", question: "What is a quick way to catch optical imbalance in a logo design?", options: ["Increasing the artboard size","Flipping the logo horizontally or viewing it small to spot asymmetry","Adding more anchor points","Changing the file format to PDF"], answer: 1, explanation: "Flipping the logo or zooming out reveals imbalance that is easy to miss when working zoomed in." },
    ] },
  "ai-9": { questions: [
      { id: "ai-9-q1", question: "Why does a brand guide typically include a symbol-only version of the logo separate from the full lockup?", options: ["For small spaces like app icons or social avatars where the full lockup would not fit clearly","Because full lockups cannot be exported","Because clients dislike wordmarks","Because symbol-only logos are always higher resolution"], answer: 0, explanation: "A symbol-only version is needed for small-format placements where a full lockup with wordmark would not read clearly." },
      { id: "ai-9-q2", question: "How is clear space around a logo commonly measured?", options: ["In a fixed number of pixels regardless of logo size","By the size of the artboard only","Using a part of the logo itself, like the symbol's height, as the unit of measurement","It is not measured, only estimated by eye"], answer: 2, explanation: "Using a proportion of the logo itself as the clear space unit ensures the margin scales correctly at any size." },
      { id: "ai-9-q3", question: "Why must a brand guide list color codes in HEX, RGB, and CMYK rather than just one format?", options: ["Because Illustrator requires all three to open a file","Because a color that looks correct on screen in RGB can shift when printed in CMYK if not specified precisely","Because HEX and RGB are the same value written differently","Because CMYK is only used for social media"], answer: 1, explanation: "Screen-based RGB and print-based CMYK can render a color differently, so both must be specified for accurate reproduction." },
      { id: "ai-9-q4", question: "Why include 'do not' examples like a stretched or recolored logo in a brand guide?", options: ["To show off Illustrator's distortion tools","Because it is a required legal disclaimer","To reduce the file size of the guide","Because showing wrong usage prevents common misuse more effectively than only showing correct versions"], answer: 3, explanation: "Explicit examples of incorrect usage more effectively prevent mistakes than correct examples alone." },
      { id: "ai-9-q5", question: "What is the purpose of including sample applications like a business card or social post in a brand guide?", options: ["To replace the need for color codes","To show the brand system working in a real, practical context","Because Illustrator cannot export a guide without them","To demonstrate font installation"], answer: 1, explanation: "Sample applications help the guide's user see the abstract rules applied in realistic, practical layouts." },
    ] },
  "ai-10": { questions: [
      { id: "ai-10-q1", question: "Why does mixing a 1pt icon with a 3pt icon in the same set look like an error?", options: ["The eye notices stroke weight mismatches faster than shape differences","Illustrator does not allow different stroke weights","It changes the file format","It only affects the fill, not the stroke"], answer: 0, explanation: "Stroke weight inconsistency is one of the fastest things the eye picks up on when comparing icons side by side." },
      { id: "ai-10-q2", question: "Why might a circle icon need to extend slightly past the edges of a same-sized square icon?", options: ["To increase the file size","Because Illustrator resizes circles automatically","Because identical bounding-box dimensions can still create different visual weights between shapes","Because circles cannot use strokes"], answer: 2, explanation: "A circle and square with identical bounding boxes read as different visual sizes, so circles often need slight adjustment to feel equally sized." },
      { id: "ai-10-q3", question: "Which effect can help standardize corner treatment across icons drawn at different times?", options: ["Effect > Distort > Twist","Effect > Stylize > Round Corners","Effect > 3D > Extrude","Effect > Warp > Arc"], answer: 1, explanation: "The Round Corners effect under Effect > Stylize applies a consistent corner radius that can standardize icons drawn separately." },
      { id: "ai-10-q4", question: "What is the risk of mixing a detailed, shaded icon with a flat, single-line icon in the same set?", options: ["There is no risk, detail level does not affect consistency","It only affects export file size","It automatically fixes stroke weight mismatches","It breaks the set's consistency because detail level is itself a visual style signal"], answer: 3, explanation: "Level of detail is a visual style choice on its own, so mixing detailed and flat icons breaks the set's unity even if other attributes match." },
      { id: "ai-10-q5", question: "Why should icons be compared side by side at final display size rather than only zoomed in?", options: ["Zooming in is not possible in Illustrator","Some size and weight inconsistencies are only visible at the icon's actual display size","It changes the color mode automatically","It is required before saving any file"], answer: 1, explanation: "Visual size and weight mismatches can be invisible when zoomed in but obvious when icons are viewed together at real size." },
    ] },
  "ai-11": { questions: [
      { id: "ai-11-q1", question: "What should be decided before placing any icon or chart in an infographic layout?", options: ["The single most important piece of information, so it can be made visually dominant","The final export file format","The exact CMYK values of the background","The artboard's print bleed size"], answer: 0, explanation: "Establishing what matters most first lets you build hierarchy around it before adding supporting elements." },
      { id: "ai-11-q2", question: "Why are bar charts usually preferred over pie charts for more than three or four categories?", options: ["Pie charts cannot be created in Illustrator","Bar charts require less color","Bar length is easier for the eye to compare accurately than pie slice angle","Pie charts are only for print, not screen"], answer: 2, explanation: "Comparing bar lengths is visually more accurate than comparing pie slice angles, especially with many categories." },
      { id: "ai-11-q3", question: "Where in Illustrator can you find tools to generate an editable chart from entered data?", options: ["The Swatches panel","The Graph tool group in the Toolbar (Column, Bar, Pie Graph)","The Character panel","The Artboards panel"], answer: 1, explanation: "Illustrator's Graph tools, grouped in the Toolbar, generate editable chart objects from data you enter." },
      { id: "ai-11-q4", question: "Why is a large percentage number floating with no nearby text considered a design problem?", options: ["Because Illustrator cannot export standalone numbers","Because numbers must always be in a chart","Because it increases file size significantly","Because the connection between the number and what it represents becomes ambiguous"], answer: 3, explanation: "A number without a clearly nearby label leaves viewers unsure what the statistic actually refers to." },
      { id: "ai-11-q5", question: "What Gestalt principle explains why an icon, number, and label should be grouped close together?", options: ["Similarity","Proximity","Closure","Continuation"], answer: 1, explanation: "Proximity is the principle that elements placed close together are perceived as related, without needing dividing lines." },
    ] },
  "ai-12": { questions: [
      { id: "ai-12-q1", question: "Where do you access Illustrator's tool for building a repeating pattern?", options: ["Object > Pattern > Make","File > New Pattern","Effect > Stylize > Pattern","Window > Pattern Library"], answer: 0, explanation: "Object > Pattern > Make opens Pattern Options, where a selected tile can be turned into a live, repeating pattern." },
      { id: "ai-12-q2", question: "What causes a visible seam in a repeating pattern?", options: ["Using too many colors","Setting the Tile Type to Hex by Column","Elements near a tile's edge not connecting visually to the matching element on the opposite edge","Saving the pattern as a swatch"], answer: 2, explanation: "If edge elements don't align with their counterparts on the opposite side of the tile, the repeat creates a visible seam." },
      { id: "ai-12-q3", question: "Why should a brand pattern use the brand's existing global color swatches?", options: ["Global swatches are required for the Pattern panel to work","So the pattern reads as an extension of the brand rather than an unrelated graphic","Because patterns cannot use custom colors","To reduce the pattern's file size"], answer: 1, explanation: "Using the brand's established colors keeps the pattern visually tied to the rest of the brand system." },
      { id: "ai-12-q4", question: "How should background and decorative elements relate visually to the logo?", options: ["They should be brighter and larger than the logo","They should use a completely different color palette","They should always be animated","They should stay visually quieter, using lighter tints or lower opacity"], answer: 3, explanation: "Supporting decorative elements should stay subdued so they do not compete with the logo or primary content for attention." },
      { id: "ai-12-q5", question: "Where should reusable patterns and badges be stored for consistency across future work?", options: ["Only in the designer's personal sketchbook","Saved as swatches or symbols within a shared asset file","Printed out and archived physically","Embedded only inside the final client PDF"], answer: 1, explanation: "Saving reusable assets as swatches or symbols in a shared file lets any designer reuse them consistently instead of recreating them." },
    ] },
  "ai-13": { questions: [
      { id: "ai-13-q1", question: "Which vector format is print-industry-standard but is NOT available through the Asset Export panel?", options: ["EPS","SVG","PNG","JPG"], answer: 0, explanation: "EPS is a standard print vector format but must be exported via File > Save As rather than the Asset Export panel." },
      { id: "ai-13-q2", question: "What does the Asset Export panel allow you to do in one batch action?", options: ["Convert all text to a single font","Automatically create global color swatches","Export objects, groups, or artboards as PNG, JPG, SVG, or PDF at multiple scales","Merge multiple AI files into one"], answer: 2, explanation: "Asset Export batch-exports selected assets across formats and scales like 1x, 2x, and 3x into organized subfolders." },
      { id: "ai-13-q3", question: "Why should final logo text be converted to outlines before export?", options: ["Outlines reduce the number of export formats needed","It ensures the design displays correctly without depending on the font being installed elsewhere","It automatically changes RGB to CMYK","It is required to open the Asset Export panel"], answer: 1, explanation: "This carries forward the typography lesson: outlining prevents font-substitution issues once the file leaves your machine." },
      { id: "ai-13-q4", question: "Why should the editable AI source file be kept separate from exported deliverables?", options: ["Because AI files cannot be opened after export","Because exported files are always higher quality","Because Illustrator deletes the source file after export","To prevent a client or teammate from accidentally editing or losing the only editable master copy"], answer: 3, explanation: "Keeping source and exports separated, such as in distinct folders, protects the one editable master file that future revisions depend on." },
      { id: "ai-13-q5", question: "Which color mode should generally be verified before exporting artwork intended for print?", options: ["RGB","CMYK","Grayscale only","Web-safe colors only"], answer: 1, explanation: "CMYK is the safer, print-accurate color mode, while RGB is intended for screen-based destinations." },
    ] },
  "ai-14": { questions: [
      { id: "ai-14-q1", question: "Why should a presentation board open with the brand problem or goal before showing visuals?", options: ["Because a viewer who doesn't understand the goal cannot judge whether the design solves it","Because Illustrator requires text before images","Because it reduces file size","Because clients only read text, not images"], answer: 0, explanation: "Framing the problem first lets the viewer evaluate the design against an actual goal rather than judging it blind." },
      { id: "ai-14-q2", question: "Which panel helps keep multiple presentation pages consistent in size for export?", options: ["The Swatches panel","The Character panel","The Artboards panel","The Stroke panel"], answer: 2, explanation: "The Artboards panel (Window > Artboards) manages multiple same-size boards, keeping presentation pages uniform." },
      { id: "ai-14-q3", question: "What tool combination is used to fit a logo neatly inside a mockup shape like a product label?", options: ["The Pen Tool alone","File > Place plus Clipping Masks","The Gradient panel","The Character panel"], answer: 1, explanation: "File > Place brings in a mockup template, and Object > Clipping Mask > Make fits the logo cleanly within a shape." },
      { id: "ai-14-q4", question: "Why does the presentation include labeled color swatches and font samples?", options: ["To replace the need for a separate brand guide entirely","Because Illustrator requires labels on all swatches","To reduce the number of logo variations shown","Because it doubles as an early, visual preview of the brand guide the client will eventually receive"], answer: 3, explanation: "Showing finalized colors and fonts on the board previews the eventual brand guide content for the client." },
      { id: "ai-14-q5", question: "Why does the layout of the presentation board itself matter as much as the logo design?", options: ["It does not matter, only the logo matters","A cluttered, inconsistent board can undermine confidence in the designer's work even if the logo is strong","Boards are never seen by clients","Board layout affects the logo's file format"], answer: 1, explanation: "The board should follow the same alignment and consistency principles as the logo itself, since poor presentation can weaken perception of good work." },
    ] },
  "ai-15": { questions: [
      { id: "ai-15-q1", question: "What should the logo portion of the graduation kit include, based on earlier lessons?", options: ["An outlined final version plus a separately kept editable live-text master","Only a rough sketch version","Only the symbol with no wordmark version","A version with no color applied"], answer: 0, explanation: "This follows the typography and export lessons: outline the final version for delivery while preserving an editable live-text master." },
      { id: "ai-15-q2", question: "What consistency rules should the icon set in the final kit follow?", options: ["Random stroke weights for variety","Different fonts for each icon label","Shared stroke weight, corner style, matched visual size, and one committed level of detail","No shared rules are needed at this stage"], answer: 2, explanation: "These are the exact consistency rules taught in the icon design lesson, applied here to the final kit." },
      { id: "ai-15-q3", question: "What proves the graduation kit is a genuine system rather than a coincidental collection of similar graphics?", options: ["Using as many different colors as possible","A documented color and typography system with HEX/RGB/CMYK values and approved fonts applied consistently","Skipping the brand guide entirely","Using a different font for each asset"], answer: 1, explanation: "A documented, consistently applied color and type system is what demonstrates true design system thinking." },
      { id: "ai-15-q4", question: "Which two deliverables make the kit look like a professional package rather than a loose folder of files?", options: ["Only the icon set and pattern","Only the exported PNG files","The sketch phase notes","The brand guide page and the presentation board"], answer: 3, explanation: "The brand guide and presentation board, built using Artboards and Align panels, package the work into a professional deliverable." },
      { id: "ai-15-q5", question: "Which formats should the final export package include, based on the file preparation lesson?", options: ["Only JPG files","SVG and PNG for web, PDF for sharing/print, and EPS via Save As for print-industry compatibility","Only the raw AI source file","Only a single flattened PDF"], answer: 1, explanation: "The complete export package spans SVG, PNG, PDF, and EPS, while the editable AI source is kept organized separately." },
    ] },
};

const solidworksExpansionQuizzes: Record<string, NonNullable<Lesson["quiz"]>> = {
  "sw-3": { questions: [
      { id: "sw-3-q1", question: "How many default reference planes does a new SolidWorks part start with?", options: ["Three","One","Two","Five"], answer: 0, explanation: "Every new part includes the Front, Top, and Right default planes, all meeting at the origin." },
      { id: "sw-3-q2", question: "Which relation keeps one half of a sketch identical to the other half about a centerline?", options: ["Tangent","Concentric","Symmetric","Collinear"], answer: 2, explanation: "A Symmetric relation (or the Mirror Entities tool) forces matching geometry on both sides of a centerline." },
      { id: "sw-3-q3", question: "Besides an offset distance, what is another way to create a custom reference plane?", options: ["By renaming the origin","Through three points","By deleting the Front plane","By hiding the Top plane"], answer: 1, explanation: "Custom planes can be created offset from a plane, at an angle to an edge, through three points, or tangent to a curved face." },
      { id: "sw-3-q4", question: "Why is naming custom planes descriptively recommended?", options: ["It speeds up rendering","It changes the material","It is required by the software to save the file","It keeps the feature tree readable later"], answer: 3, explanation: "Descriptive names like \"Mount Plane\" are easier to understand than generic Plane1, Plane2 labels months later." },
      { id: "sw-3-q5", question: "What commonly happens to a part that was sketched without a deliberate plane strategy?", options: ["It saves faster","It usually needs sketches rebuilt from scratch during revisions","It automatically fixes itself","It becomes lighter in mass"], answer: 1, explanation: "Without anchoring sketches to planes, edges, or the origin, revisions often force sketches to be rebuilt rather than simply updated." },
    ] },
  "sw-4": { questions: [
      { id: "sw-4-q1", question: "What advantage does a Hole Wizard hole have over a hand-sketched circle cut?", options: ["It carries standard fastener size data usable in drawing callouts","It renders in a different color","It cannot be resized","It automatically deletes nearby ribs"], answer: 0, explanation: "Hole Wizard holes are sized to real fastener standards and carry data that flows into drawing hole callouts." },
      { id: "sw-4-q2", question: "Which tool would you use to create a bolt circle of evenly spaced holes around a center?", options: ["Linear Pattern","Mirror","Circular Pattern","Shell"], answer: 2, explanation: "Circular Pattern repeats a feature around a selected axis, which is the natural tool for bolt circles." },
      { id: "sw-4-q3", question: "What can you do in a Linear Pattern if a hole instance would land on top of a rib?", options: ["Delete the entire pattern","Skip that specific instance","Change the part's material","Convert it to a Circular Pattern"], answer: 1, explanation: "Linear Pattern lets you skip specific instances so holes are not placed where they would collide with other geometry." },
      { id: "sw-4-q4", question: "How does the Mirror feature differ from mirroring a sketch?", options: ["It only works on assemblies","It cannot use a plane as reference","It deletes the original feature","It works on fully-formed 3D features, not just 2D sketch lines"], answer: 3, explanation: "The Mirror feature duplicates complete 3D geometry across a plane, unlike a sketch-level mirror of 2D lines." },
      { id: "sw-4-q5", question: "Why should a seed feature be fully defined before patterning it?", options: ["Patterns require a fully defined seed to be enabled at all","Under-defined geometry passes its unpredictability on to every copy in the pattern","It changes the part's mass","It is only a cosmetic preference"], answer: 1, explanation: "A pattern built on loose, under-defined geometry inherits that same unpredictable behavior across every instance." },
    ] },
  "sw-5": { questions: [
      { id: "sw-5-q1", question: "What does the Shell feature do to a solid part?", options: ["Hollows it out to a set wall thickness","Adds a mirrored copy","Rounds all its edges","Changes its material properties"], answer: 0, explanation: "Shell removes selected faces and hollows the remaining body to a specified wall thickness." },
      { id: "sw-5-q2", question: "What is the main purpose of a Rib feature?", options: ["To reduce the part's overall size","To create fastener holes","To reinforce a part without the weight cost of thickening the whole wall","To assign a new material"], answer: 2, explanation: "A rib is a thin connecting wall that adds stiffness for much less added material than thickening an entire wall." },
      { id: "sw-5-q3", question: "Why does a moldable part need Draft applied to its walls?", options: ["To make the part heavier","So the part can be pulled from the mold cavity without sticking or damage","To increase wall thickness","To reduce the number of features"], answer: 1, explanation: "Draft angles a wall relative to the pull direction so the part releases cleanly from a mold or die." },
      { id: "sw-5-q4", question: "Where can draft angle be applied besides as its own standalone Draft feature?", options: ["Only in the Bill of Materials","Only in an assembly mate","Only through the Shell feature","Directly within an Extruded Boss/Cut's dialog"], answer: 3, explanation: "A draft angle can be entered directly while creating an Extruded Boss/Cut, not only as a separate Draft feature." },
      { id: "sw-5-q5", question: "Why does the order of Shell, Rib, and Draft in the feature tree matter?", options: ["It doesn't matter as long as all three are used","Each feature depends on the geometry present at that point, so sequence changes the result","Only Shell can be reordered","The feature tree order only affects file size"], answer: 1, explanation: "Because each feature builds on existing geometry, applying Draft before or after Shell changes the resulting wall thickness distribution." },
    ] },
  "sw-6": { questions: [
      { id: "sw-6-q1", question: "Which standard mate aligns a pin and a hole around the same axis?", options: ["Distance","Concentric","Parallel","Angle"], answer: 1, explanation: "A Concentric mate aligns two circular features, such as a pin and a hole, around a shared axis." },
      { id: "sw-6-q2", question: "What does a Gear mate do that a standard mate cannot?", options: ["It links rotation between two parts at a set ratio without them physically touching","It fixes a part permanently in place","It changes a part's material","It hides a component from view"], answer: 0, explanation: "A Gear mate links the rotation of two components at a defined ratio even though the parts are not in contact." },
      { id: "sw-6-q3", question: "What is the purpose of a Limit mate?", options: ["To delete unused mates","To allow movement between a set minimum and maximum instead of locking a part rigidly","To merge two parts into one body","To assign a fastener size"], answer: 1, explanation: "A Limit mate permits travel between a minimum and maximum value, modeling things like a drawer slide's range." },
      { id: "sw-6-q4", question: "How many degrees of freedom does an unmated part start with?", options: ["Three","Four","Six","Twelve"], answer: 2, explanation: "An unmated part has six degrees of freedom: three translations and three rotations." },
      { id: "sw-6-q5", question: "What is a recommended order for mating parts in a new assembly?", options: ["Mate parts in random order for speed","Mate the smallest part first regardless of role","Mate foundational components like a base plate first, then build outward","Mate all parts simultaneously in one operation"], answer: 2, explanation: "Mating foundational components first and building outward keeps the mate list logical and easier to troubleshoot." },
    ] },
  "sw-7": { questions: [
      { id: "sw-7-q1", question: "What is the SolidWorks Toolbox library used for?", options: ["Providing standard hardware like bolts and nuts to avoid modeling them from scratch","Rendering photorealistic images","Detecting interferences","Creating exploded views"], answer: 0, explanation: "Toolbox is a library of standard fastener and hardware components that can be inserted directly into an assembly." },
      { id: "sw-7-q2", question: "What is a subassembly?", options: ["A single part with no features","A type of drawing view","An assembly file inserted as a component into a larger top-level assembly","A material property setting"], answer: 2, explanation: "A subassembly groups a functional unit of parts and is itself inserted into a larger top-level assembly." },
      { id: "sw-7-q3", question: "What does the Interference Detection tool identify?", options: ["Mass properties of a part","Pairs of components that physically overlap in space","The color of each component","Which mates are unused"], answer: 1, explanation: "Interference Detection highlights components that occupy the same physical space in a mated assembly." },
      { id: "sw-7-q4", question: "What is the difference between a rigid and flexible subassembly?", options: ["Rigid subassemblies cost more to manufacture","Flexible subassemblies cannot contain fasteners","There is no functional difference","A flexible subassembly retains its internal motion in the parent assembly, while rigid moves as one unit"], answer: 3, explanation: "A rigid subassembly behaves as a single fixed unit in the parent, while a flexible one retains its own internal motion." },
      { id: "sw-7-q5", question: "Why is it better to run Interference Detection routinely rather than only at the very end?", options: ["It makes the file smaller","Clashes are cheaper and easier to fix earlier than after parts are already machined","It is required to save the file","It automatically fixes all mates"], answer: 1, explanation: "Catching interferences early in the model is far cheaper than discovering a physical clash after manufacturing." },
    ] },
  "sw-8": { questions: [
      { id: "sw-8-q1", question: "What is an exploded view built from?", options: ["A series of explode steps that move components apart","A single mate","A Bill of Materials entry","A material callout"], answer: 0, explanation: "An exploded view consists of a sequence of explode steps, each moving one component or group along a direction." },
      { id: "sw-8-q2", question: "How should a bolt, washer, and nut for one joint typically be exploded?", options: ["Each in its own separate explode step","They cannot be exploded","Together in a single explode step","Only the bolt is exploded, the rest stay hidden"], answer: 2, explanation: "Related fastener components are usually grouped together in a single explode step to keep the view readable." },
      { id: "sw-8-q3", question: "What tool adds connector lines showing which exploded part reconnects to which?", options: ["Interference Detection","Route Line","Hole Wizard","Shell"], answer: 1, explanation: "Explode lines are added with the Route Line tool to visually connect a moved part to its destination." },
      { id: "sw-8-q4", question: "Can an exploded view be collapsed back to the normal assembled state?", options: ["No, it permanently changes the assembly","Only by deleting all mates","Only in a new assembly file","Yes, because it is saved as a configuration"], answer: 3, explanation: "An exploded view is stored as a configuration, so the assembly can switch back to its collapsed state without losing the explode data." },
      { id: "sw-8-q5", question: "What is the main value of an exploded view for a non-technical viewer?", options: ["It reduces the assembly's file size","It shows how parts fit together in a way a tightly assembled model cannot","It changes the part material automatically","It removes the need for a Bill of Materials"], answer: 1, explanation: "Exploded views translate an assembled model into something readable by clients, technicians, or trainees with no engineering background." },
    ] },
  "sw-9": { questions: [
      { id: "sw-9-q1", question: "Why are front, top, and side views generated directly from the 3D model rather than drawn from scratch?", options: ["They stay in sync automatically if the model changes","It is required by law","It makes the file smaller","It removes the need for dimensions"], answer: 0, explanation: "Views generated from the model update automatically to reflect any later changes to the 3D geometry." },
      { id: "sw-9-q2", question: "What does a Section View reveal that a standard view with hidden lines does not show clearly?", options: ["The part's material","The part's mass","Internal geometry like a bore or wall thickness, shown as solid cut geometry","The Bill of Materials"], answer: 2, explanation: "A section view cuts through the part to reveal internal features as visible, dimensionable geometry instead of dashed hidden lines." },
      { id: "sw-9-q3", question: "What is the purpose of a Detail View?", options: ["To hide a feature from the drawing","To show a small area of an existing view at a larger scale for clear dimensioning","To assign a material to the part","To create an exploded view"], answer: 1, explanation: "A Detail View circles a small feature and displays it enlarged so it can be dimensioned clearly." },
      { id: "sw-9-q4", question: "Where should a dimension generally be placed?", options: ["On any view regardless of clarity","Only on the isometric view","Duplicated identically on every view","On the view where the feature's true shape and size are most clearly shown"], answer: 3, explanation: "Good dimensioning practice places each dimension on the view that shows the feature's true size and shape most clearly, without duplication." },
      { id: "sw-9-q5", question: "What is a common cause of parts being manufactured incorrectly even when the 3D model is correct?", options: ["Using an isometric view","Poor dimensioning practice such as duplicated or inconsistent dimensions","Using a section view","Saving the file too often"], answer: 1, explanation: "Inconsistent or duplicated dimensioning across views is a common real-world cause of manufacturing errors." },
    ] },
  "sw-10": { questions: [
      { id: "sw-10-q1", question: "What does a tolerance define on a drawing dimension?", options: ["The acceptable range of variation for that dimension","The part's color","The material of the part","The number of instances in a pattern"], answer: 0, explanation: "A tolerance specifies how much a manufactured dimension is allowed to vary from its nominal value." },
      { id: "sw-10-q2", question: "What is the risk of setting a tolerance too tight?", options: ["Parts will not fit together","The drawing will not save","Manufacturing cost increases unnecessarily","The BOM will be missing entries"], answer: 2, explanation: "Overly tight tolerances require more precise, costlier manufacturing processes than the part actually needs." },
      { id: "sw-10-q3", question: "Why must the material callout match the material applied to the 3D model?", options: ["It has no real effect on anything","Mass properties calculated from the model depend on the assigned material matching what's built","It only affects the drawing's color scheme","It changes the tolerance values automatically"], answer: 1, explanation: "Accurate mass properties rely on the model's assigned material matching the material actually specified for manufacturing." },
      { id: "sw-10-q4", question: "What advantage does an automatic hole callout generated from a Hole Wizard hole provide?", options: ["It removes the need for a BOM","It changes the part's tolerance automatically","It hides the hole from the drawing","It avoids transcription errors since it reflects the model's real hole data"], answer: 3, explanation: "Because the callout is generated from the model's actual hole data, it stays accurate and avoids manual typing errors." },
      { id: "sw-10-q5", question: "What should a Bill of Materials include?", options: ["Only the largest structural parts","Every component including fasteners and subassemblies, with quantity and material","Only the part with the lowest cost","Only parts made from metal"], answer: 1, explanation: "An accurate BOM lists every component of the final assembly, including fasteners and subassemblies, not just major parts." },
    ] },
  "sw-11": { questions: [
      { id: "sw-11-q1", question: "What does the Base Flange feature set for the whole sheet metal part?", options: ["The default thickness and bend radius","Only the part's color","The Bill of Materials","The assembly mates"], answer: 0, explanation: "The Base Flange establishes part-level sheet metal parameters like thickness and bend radius that later features inherit." },
      { id: "sw-11-q2", question: "What must an Edge Flange be added to?", options: ["A curved surface only","The origin","A selected straight edge of existing sheet metal","A mate reference"], answer: 2, explanation: "Edge Flange requires selecting a straight edge on existing sheet metal geometry to build up a new wall." },
      { id: "sw-11-q3", question: "What does SolidWorks use by default to calculate the flat pattern's bend allowance?", options: ["Bend Table","K-factor","Bend Deduction","Material color"], answer: 1, explanation: "SolidWorks defaults to the K-factor method, representing where the neutral bend axis sits within the material thickness." },
      { id: "sw-11-q4", question: "What is the purpose of a relief type at a bend corner?", options: ["To add a decorative pattern","To change the part's overall mass","To generate the Bill of Materials","To prevent the material from tearing or deforming during bending"], answer: 3, explanation: "Relief settings cut small notches at bend corners to prevent tearing or deformation when the part is actually bent." },
      { id: "sw-11-q5", question: "What file formats can a flat pattern be exported to for cutting?", options: ["Only STL","DXF or DWG","Only PDF","Only JPG"], answer: 1, explanation: "The flat pattern can be exported as a DXF or DWG file for use by a laser cutter, punch, or waterjet." },
    ] },
  "sw-12": { questions: [
      { id: "sw-12-q1", question: "What happens if a part is left on the Default material when checking mass properties?", options: ["The mass and center of mass values are meaningless for the real design","The model fails to open","The part automatically becomes lighter","SolidWorks assigns steel automatically"], answer: 0, explanation: "Default material uses an arbitrary assumed density, so calculated mass and center of mass don't reflect the real design." },
      { id: "sw-12-q2", question: "What does the Mass Properties tool calculate directly from the model?", options: ["Only the part number","The tolerance values","Mass, volume, surface area, and center of mass","The Bill of Materials"], answer: 2, explanation: "Mass Properties calculates mass, volume, surface area, and center of mass from geometry and assigned material density." },
      { id: "sw-12-q3", question: "How is center of mass reported in SolidWorks?", options: ["As a single weight value only","As X, Y, Z coordinates relative to a chosen coordinate system","As a percentage of total volume","As a color-coded heat map"], answer: 1, explanation: "Center of mass is reported as coordinates (X, Y, Z) relative to a selected coordinate system." },
      { id: "sw-12-q4", question: "Why does center of mass matter for a real design like a handheld product?", options: ["It has no practical effect","It only matters for the BOM","It determines the drawing scale","It affects whether the product feels balanced or whether something might tip over"], answer: 3, explanation: "Center of mass affects real-world behavior such as tipping risk, balance, and where a lifting eye should be placed." },
      { id: "sw-12-q5", question: "Why should Mass Properties be checked early and often during design rather than only at the end?", options: ["It is required to save the file","Problems like excess weight are cheaper to fix earlier than after tooling is committed","It changes the assigned tolerances automatically","It has no effect on timing"], answer: 1, explanation: "Because Mass Properties updates live, checking it early catches weight or balance issues while a design change is still cheap." },
    ] },
  "sw-13": { questions: [
      { id: "sw-13-q1", question: "What does a fixture represent in SimulationXpress?", options: ["The faces that are held in place, representing how the part is actually mounted","The applied external force","The part's material","The Bill of Materials entry"], answer: 0, explanation: "A fixture defines which faces are constrained, representing the part's real mounting or clamping condition." },
      { id: "sw-13-q2", question: "How is factor of safety calculated in SimulationXpress?", options: ["Mass divided by volume","Applied load divided by part thickness","Yield strength divided by the equivalent stress at a point","Surface area divided by mass"], answer: 2, explanation: "SimulationXpress calculates factor of safety by dividing the material's yield strength by the equivalent stress at each point." },
      { id: "sw-13-q3", question: "What does a factor of safety below 1 at a location indicate?", options: ["The part is overbuilt","The material is predicted to yield there under the applied load","The mesh failed to generate","The part has no material assigned"], answer: 1, explanation: "A factor of safety under 1 means the predicted stress exceeds the material's yield strength at that point." },
      { id: "sw-13-q4", question: "Where do stress concentrations commonly occur?", options: ["Evenly across the entire part","Only at the center of mass","Only on painted surfaces","At sharp internal corners and sudden changes in wall thickness"], answer: 3, explanation: "Sharp internal corners and abrupt thickness transitions concentrate stress far more than smooth, gradual geometry." },
      { id: "sw-13-q5", question: "What is a common, low-cost fix for a stress concentration at a sharp internal corner?", options: ["Deleting the feature entirely","Adding a fillet to spread stress over a larger area","Increasing the load applied","Removing the fixture"], answer: 1, explanation: "Adding a fillet to a sharp internal corner is one of the most common and cheapest ways to reduce stress concentration." },
    ] },
  "sw-14": { questions: [
      { id: "sw-14-q1", question: "What should happen before any sketching begins on the graduation project?", options: ["A plan covering reference planes, patterns, fasteners, and required motion","Nothing, sketching should start immediately","The Bill of Materials should be finalized","The final render should be created"], answer: 0, explanation: "Planning the reference plane strategy, patterns, fasteners, and motion requirements up front prevents rebuild problems later." },
      { id: "sw-14-q2", question: "What should determine which features (Shell, Draft, Sheet Metal, etc.) a part uses in the project?", options: ["Whichever feature is fastest to apply","The part's color only","How the part would realistically be manufactured","Random selection for variety"], answer: 2, explanation: "Features should match how the part would genuinely be manufactured, which is what makes the project production-aware." },
      { id: "sw-14-q3", question: "What assembly check should be run before the assembly is considered finished?", options: ["Mass Properties only","Interference Detection","Material callout review only","Drawing scale check"], answer: 1, explanation: "Interference Detection confirms no components physically overlap before the assembly is considered complete." },
      { id: "sw-14-q4", question: "How should the final Bill of Materials be produced?", options: ["Typed by hand from memory","Copied from a previous unrelated project","Estimated without checking the assembly","Generated from the real, completed assembly"], answer: 3, explanation: "The BOM should be generated directly from the real assembly so it accurately reflects every component and quantity." },
      { id: "sw-14-q5", question: "What two analysis checks are recommended before calling the graduation project done?", options: ["Spell-check and file size check","Mass Properties and SimulationXpress stress/factor of safety checks","Drawing color scheme and font check","Material cost estimate only"], answer: 1, explanation: "Running Mass Properties and a SimulationXpress stress check on load-bearing parts confirms the design meets weight, balance, and strength requirements." },
    ] },
};

const capcutExpansionQuizzes: Record<string, NonNullable<Lesson["quiz"]>> = {
  "cc-3": { questions: [
      { id: "cc-3-q1", question: "Why should a video be planned for one specific viewer rather than a general audience?", options: ["It narrows pacing, language, and clip choices to what that viewer responds to","It reduces file size","It is required by CapCut's export settings","It removes the need for captions"], answer: 0, explanation: "Naming a specific viewer gives every later decision, from pace to wording, a clear target." },
      { id: "cc-3-q2", question: "According to the lesson, how do TikTok, Reels, and Shorts audiences differ even though they share the same aspect ratio?", options: ["They do not differ at all","Only Shorts supports vertical video","TikTok rewards raw authenticity, Reels rewards polish, Shorts rewards a fast payoff","Reels does not allow captions"], answer: 2, explanation: "Each platform's audience behaves differently, so planning for the platform shapes pacing and tone decisions." },
      { id: "cc-3-q3", question: "When should the strongest, most surprising moment in the footage be chosen as the hook?", options: ["After the final export","During planning, before editing begins","Only if it happened first chronologically","During color correction"], answer: 1, explanation: "The hook is a planning decision made in advance, regardless of where that moment falls in the raw footage's timeline." },
      { id: "cc-3-q4", question: "Why are proof points ranked in priority order during planning?", options: ["So editors know which effects to apply first","Because CapCut only allows three proof points","To decide the export resolution","So the strongest evidence survives if the final cut needs to be shortened"], answer: 3, explanation: "Ranking proof points means the most important evidence is protected even under time pressure to shorten the edit." },
      { id: "cc-3-q5", question: "What test should a candidate clip pass before being included in the main story?", options: ["It must be the longest clip available","It must advance the hook, provide proof, or support the call to action","It must be filmed in landscape","It must include music"], answer: 1, explanation: "Shot selection keeps only clips that serve one of the three planned story jobs; the rest are set aside." },
    ] },
  "cc-4": { questions: [
      { id: "cc-4-q1", question: "What are the five beats a rough cut is built around?", options: ["Hook, context, value, proof, call to action","Intro, music, captions, export, credits","Trim, color, keyframe, speed, export","Draft, review, revise, approve, deliver"], answer: 0, explanation: "The rough cut assembles these five structural beats in order before any polish is applied." },
      { id: "cc-4-q2", question: "Why are transitions and animated text deliberately left out of the rough cut?", options: ["CapCut disables them on unlicensed projects","They slow down export speed","A flashy transition can disguise a weak cut and make pacing hard to judge honestly","They are added automatically at export"], answer: 2, explanation: "Keeping the rough cut plain forces editing decisions to be judged on story and pacing, not decoration." },
      { id: "cc-4-q3", question: "Roughly how much shorter is a rough cut compared to the combined raw footage it came from?", options: ["It is usually longer than the raw footage","About thirty to sixty percent shorter after trimming dead space","Exactly half, always","Trimming does not reduce length"], answer: 1, explanation: "Trimming dead air, false starts, and repeats typically removes a large share of the original footage." },
      { id: "cc-4-q4", question: "Why is a full, uninterrupted playback of the rough cut useful for judging pacing?", options: ["It checks export file size","It tests whether captions are spelled correctly","It verifies the aspect ratio","Without music or color grading, any pacing problem revealed is a genuine structural issue"], answer: 3, explanation: "With no music or grading to create false energy, pacing problems found in playback are real story problems." },
      { id: "cc-4-q5", question: "Why should beat order be locked before starting audio cleanup, captions, or color work?", options: ["Those tools cannot be used until export","Changing beat order later forces rework across every layer built on top of the structure","CapCut requires it as a technical limitation","Locking is only cosmetic and has no real effect"], answer: 1, explanation: "Locking the structure first avoids redoing audio, caption, and color work every time the story order changes." },
    ] },
  "cc-5": { questions: [
      { id: "cc-5-q1", question: "In the audio mix, which element should always remain the clearest and most prominent?", options: ["Voice or dialogue","Background music","Sound effects","Ambient room tone"], answer: 0, explanation: "Voice should stay clear and prominent since it usually carries the video's core message." },
      { id: "cc-5-q2", question: "What does 'ducking' refer to in audio editing?", options: ["Removing all music from a video","Speeding up a clip","Automatically lowering music volume under spoken lines","Adding a sound effect to every cut"], answer: 2, explanation: "Ducking is volume automation that dips the music track under dialogue so it doesn't compete with speech." },
      { id: "cc-5-q3", question: "Why should music be previewed against the actual rough cut rather than chosen in isolation?", options: ["CapCut requires it before export","It's the only reliable way to catch a mismatch in tempo or mood before it's locked in","It reduces the file size of the project","It automatically generates captions"], answer: 1, explanation: "Music that feels right on its own can still clash with the pacing and mood of the actual edit." },
      { id: "cc-5-q4", question: "What is the recommended approach to using sound effects like whooshes and clicks?", options: ["Add one to every single transition for consistency","Avoid them entirely in all edits","Only use them during color correction","Use them sparingly, reserved for moments that need extra emphasis"], answer: 3, explanation: "Overusing sound effects clutters an edit; they work best reserved for moments needing real emphasis." },
      { id: "cc-5-q5", question: "What should happen to the voice track before music is layered on top of it?", options: ["Nothing, music should be added first","It should be leveled and cleaned of background noise","It should be muted","It should be sped up"], answer: 1, explanation: "Uneven or noisy dialogue gets worse once music and effects are layered on top, so voice is cleaned up first." },
    ] },
  "cc-6": { questions: [
      { id: "cc-6-q1", question: "What should always be checked after using CapCut's auto-caption tool?", options: ["Timing drift and misheard words in the generated transcript","The export resolution","The music track volume","The aspect ratio"], answer: 0, explanation: "Auto-captions transcribe speech automatically but can misfire on timing or specific words, so they need review." },
      { id: "cc-6-q2", question: "Why should captions avoid being placed at the very bottom edge of the frame?", options: ["CapCut does not allow it","It looks better in landscape videos","Platform UI elements like usernames and buttons often cover that zone on the live app","Bottom-edge text cannot be exported"], answer: 2, explanation: "Captions that look fine in CapCut's preview can be covered by the platform's own interface once published." },
      { id: "cc-6-q3", question: "How long should a lower third identifying a speaker typically remain on screen?", options: ["For the entire video","Briefly when the speaker is introduced, then it disappears","Only during the call to action","It should never disappear once shown"], answer: 1, explanation: "A persistent lower third stops adding information after the introduction and starts cluttering the frame." },
      { id: "cc-6-q4", question: "What does 'text hierarchy' refer to in this lesson?", options: ["The order captions appear in the export queue","The folder structure for text files in a project","A CapCut subscription tier","Using size, weight, and color consistently so viewers know what to look at first"], answer: 3, explanation: "Text hierarchy is a consistent visual system - hook text largest, captions mid-size, labels smallest - guiding attention." },
      { id: "cc-6-q5", question: "Why add a background box, outline, or drop shadow behind caption text?", options: ["To make captions harder to read","To keep text legible as the footage behind it changes, especially in fast-cut edits","It is required for auto-captions to work","To increase export file size"], answer: 1, explanation: "A subtle background treatment keeps text readable regardless of what is happening in the shifting footage behind it." },
    ] },
  "cc-7": { questions: [
      { id: "cc-7-q1", question: "What is the primary purpose of B-roll according to this lesson?", options: ["To serve as visual proof for a claim made in the main clip","To fill time when there is nothing else to show","To replace the need for a voiceover","To reduce the video's export size"], answer: 0, explanation: "B-roll gives visual evidence for a claim rather than just adding decorative footage." },
      { id: "cc-7-q2", question: "How does an overlay clip appear 'on top of' the main footage in CapCut without losing the original audio?", options: ["It replaces the main track entirely","It mutes the main clip automatically","It sits on a video track stacked above the main footage track, covering it visually only","Overlays cannot include audio-bearing tracks"], answer: 2, explanation: "A higher track visually covers the layer beneath at that timestamp while the underlying audio track continues playing." },
      { id: "cc-7-q3", question: "How should a screenshot overlay be prepared to work as proof?", options: ["Shown for a fraction of a second to keep pace fast","Cropped tightly to the relevant area and held long enough to be read","Left at full, uncropped resolution regardless of relevance","Placed only in the video's final second"], answer: 1, explanation: "A screenshot only works as proof if the viewer can actually read the relevant part of it." },
      { id: "cc-7-q4", question: "In a before-and-after overlay, what is the recommended order and timing?", options: ["Show both simultaneously with no distinction","Show the 'after' first to grab attention","Randomize the order each time","Show the 'before' state first and hold it briefly, then the 'after' state"], answer: 3, explanation: "Showing 'before' first and holding it briefly lets the contrast with 'after' read clearly instead of blending together." },
      { id: "cc-7-q5", question: "How should the length of a B-roll clip generally be determined?", options: ["It should always be exactly five seconds","It should match the length of the voiceover segment it supports","It should be as long as possible to fill the timeline","B-roll length is unrelated to pacing"], answer: 1, explanation: "B-roll is trimmed to follow the pacing already locked in the rough cut, matching the voiceover it supports." },
    ] },
  "cc-8": { questions: [
      { id: "cc-8-q1", question: "Which correction should generally be addressed first before other color adjustments?", options: ["Exposure and contrast","Saturation","Adding a color filter","Lower third placement"], answer: 0, explanation: "Exposure and contrast establish a usable base image that other corrections, like white balance and saturation, build on." },
      { id: "cc-8-q2", question: "What problem does white balance correction address?", options: ["Shaky footage","Low audio volume","Unwanted orange or blue color casts caused by different light sources","Slow export speed"], answer: 2, explanation: "White balance shifts color temperature so whites and skin tones look natural instead of tinted orange or blue." },
      { id: "cc-8-q3", question: "Why is saturation typically adjusted last, after exposure, contrast, and white balance?", options: ["CapCut locks saturation controls until export","Pushing saturation on footage with an uncorrected color cast just intensifies the wrong colors","Saturation has no visible effect on footage","It must match the music's mood first"], answer: 1, explanation: "Correcting the color cast first means saturation then intensifies accurate colors rather than a wrong tint." },
      { id: "cc-8-q4", question: "What does 'matching' clips across a video mean in this lesson?", options: ["Making every clip exactly the same length","Applying the same music to every clip","Using identical captions on every clip","Adjusting each clip so skin tones and brightness look consistent across cuts filmed in different lighting"], answer: 3, explanation: "Matching keeps brightness and color consistent from clip to clip so lighting shifts don't jar the viewer." },
      { id: "cc-8-q5", question: "Why is color correction usually applied per clip rather than as one blanket adjustment across the whole timeline?", options: ["CapCut does not support timeline-wide adjustments","Different clips were often shot under different lighting conditions, so one correction rarely suits them all","Per-clip correction exports faster","It is required for auto-captions to function"], answer: 1, explanation: "A single blanket correction assumes uniform lighting across all clips, which is rarely true, so per-clip work is more reliable." },
    ] },
  "cc-9": { questions: [
      { id: "cc-9-q1", question: "What happens after a first keyframe is set and the playhead is moved forward to change a property's value?", options: ["CapCut automatically creates a second keyframe and interpolates smooth motion between the two","The animation is deleted","The clip is automatically trimmed","Nothing happens until export"], answer: 0, explanation: "CapCut generates the second keyframe automatically and calculates the smooth transition between the two set values." },
      { id: "cc-9-q2", question: "Which keyframe property is described as one of the most common because it creates a soft entrance or exit?", options: ["Rotation","Scale","Opacity","Saturation"], answer: 2, explanation: "Opacity keyframes fade elements in or out smoothly rather than having them appear or disappear abruptly." },
      { id: "cc-9-q3", question: "What does easing, such as fast-at-the-start and slow-at-the-end, do to a keyframe animation?", options: ["It deletes the keyframes","It makes constant-speed motion feel more natural, similar to physical deceleration","It changes the video's aspect ratio","It mutes the audio during the animation"], answer: 1, explanation: "The speed curve adjusts timing so motion decelerates naturally instead of moving at a stiff, constant speed." },
      { id: "cc-9-q4", question: "According to the lesson, what problem occurs when motion is added to every clip regardless of content?", options: ["It reduces export quality","CapCut blocks the export","It automatically disables captions","It becomes noise and gives equal visual weight to unimportant and important moments alike"], answer: 3, explanation: "Motion without a story-driven reason stops guiding attention and can undermine a video's pacing instead." },
      { id: "cc-9-q5", question: "Why should keyframe motion be previewed at actual phone size rather than only in a full desktop preview window?", options: ["Phone previews load faster","Dramatic motion that looks fine on a large screen can feel disorienting on a small screen","CapCut only renders keyframes on phone-sized previews","It is required to save the project"], answer: 1, explanation: "Since most viewers watch on a phone, restrained motion checked at actual phone size keeps animation feeling intentional." },
    ] },
  "cc-10": { questions: [
      { id: "cc-10-q1", question: "What kind of footage is best suited to being sped up rather than cut entirely?", options: ["Necessary but uninteresting footage, like walking to a location or setting up a tool","The video's strongest reveal moment","Dialogue with important information","The call to action"], answer: 0, explanation: "Speeding up compresses necessary transitional footage while keeping the viewer oriented, without cutting it out entirely." },
      { id: "cc-10-q2", question: "Why does the lesson caution against overusing slow motion across many moments in one video?", options: ["CapCut limits how many slow-motion clips can be used","Slow motion always reduces export resolution","It dilutes the effect, since a technique meant to signal importance stops working if applied to everything","It removes captions from the affected clip"], answer: 2, explanation: "Slow motion is most effective reserved for a single strongest moment; overuse makes every moment feel equally emphasized, which cancels the effect." },
      { id: "cc-10-q3", question: "In CapCut, where is the tool that lets an editor control how gradually speed changes between points on a clip?", options: ["The audio mixer","The Speed panel's Curve section","The caption editor","The export resolution menu"], answer: 1, explanation: "The Curve section of the Speed panel lets an editor add, remove, and drag speed points to shape a smooth or abrupt ramp." },
      { id: "cc-10-q4", question: "What can be used when an abrupt speed change looks choppy instead of smooth?", options: ["A lower third","A white balance adjustment","An auto-caption regeneration","Optical flow smoothing"], answer: 3, explanation: "CapCut's smooth slow-motion option using optical flow generates additional in-between frames for a more fluid transition." },
      { id: "cc-10-q5", question: "According to the lesson, when is a plain, unramped cut often the stronger editing choice?", options: ["Whenever the footage is too short for its slot","When the timing of a moment is already communicated clearly and a speed effect would add complexity without clarity","Only during the call to action","Never - every cut should have a speed ramp"], answer: 1, explanation: "A clean cut can be the stronger choice specifically because it doesn't call attention to itself when timing already reads well." },
    ] },
  "cc-11": { questions: [
      { id: "cc-11-q1", question: "Why does a consistent visual template help a creator publishing regularly?", options: ["It helps viewers recognize the content style within the first second, before the hook even lands","It reduces the need for a hook","It automatically increases video length","It removes the need for a call to action"], answer: 0, explanation: "Recognition from a consistent visual system builds across many videos in a way a one-off edit cannot." },
      { id: "cc-11-q2", question: "What makes caption styling faster to apply once it becomes part of a brand template?", options: ["Captions are generated without review","CapCut disables auto-captions for templated projects","Styling becomes a matter of applying a saved preset rather than a new design decision each time","Templates remove the need for captions entirely"], answer: 2, explanation: "Locking in font, size, color, and background treatment once turns future styling into applying a preset, not a fresh decision." },
      { id: "cc-11-q3", question: "Which earlier-lesson technique is reused to create consistent title movement as part of a brand template?", options: ["Auto-caption transcription","Keyframe easing and entrance direction","White balance correction","Beat-timed cuts"], answer: 1, explanation: "Consistent title movement reuses keyframe techniques - the same easing and entrance direction - across every video." },
      { id: "cc-11-q4", question: "How does logo placement typically reinforce brand identity in a template?", options: ["By changing corner and timing on every video for variety","By replacing the need for an intro or outro","By only appearing in the final export preview","By appearing in the same corner or moment in every video using the overlay-track technique"], answer: 3, explanation: "A consistent logo position, placed via the overlay track, reinforces identity without requiring the viewer to read text." },
      { id: "cc-11-q5", question: "What is the practical output of building a brand template, according to this lesson?", options: ["A single unused draft","A saved set of decisions - caption preset, colors, motion timing, logo position, intro/outro - reused on every new video","A new hook written for every video","A longer rough cut"], answer: 1, explanation: "The template packages these decisions once so they can be applied repeatedly instead of remade under time pressure each upload." },
    ] },
  "cc-12": { questions: [
      { id: "cc-12-q1", question: "What typically happens when a 9:16 platform like TikTok or Reels receives a video exported in the wrong aspect ratio?", options: ["The platform crops or pads it automatically in ways not planned during editing","The video plays at a higher resolution","The export fails completely","Captions are automatically regenerated to fit"], answer: 0, explanation: "Platforms built around vertical 9:16 will crop or pad a mismatched export, cutting off framing or captions that looked correct in CapCut." },
      { id: "cc-12-q2", question: "Which export format is recommended for traditional YouTube uploads and presentation screens?", options: ["Vertical 9:16","Square 1:1","Landscape 16:9","A rotated 9:16"], answer: 2, explanation: "YouTube long-form and projector or TV presentation contexts are built around landscape 16:9." },
      { id: "cc-12-q3", question: "What is described as a reliable default resolution and frame rate for most social platform exports?", options: ["480p at 15fps","1080p at 30fps","8K at 120fps","720p at 10fps"], answer: 1, explanation: "1080p at 30 frames per second balances visible quality with reasonable file size and processing time for most platforms." },
      { id: "cc-12-q4", question: "Why does exporting 1080p source footage at a 4K resolution not actually improve quality?", options: ["CapCut blocks 4K export for 1080p footage","4K export removes captions","It changes the aspect ratio automatically","The export process has to invent pixel detail that was never captured, producing a larger file with the same softness"], answer: 3, explanation: "Exporting above the source footage's real resolution creates a false sense of quality while introducing artifacting rather than real detail." },
      { id: "cc-12-q5", question: "What does a versioned filename like client-promo-v2-2026-09-16 help with during a review process?", options: ["It compresses the file automatically","It keeps drafts distinguishable so the most recent exported file is obvious at a glance","It changes the video's resolution","It is required by CapCut to enable export"], answer: 1, explanation: "Including project name, version number, and date prevents confusion about which exported draft is current." },
    ] },
  "cc-13": { questions: [
      { id: "cc-13-q1", question: "What should accompany every draft sent to a client for review?", options: ["A versioned filename and a short message stating what changed since the last draft","Nothing, the video should speak for itself","A new hook and call to action","An auto-generated caption file only"], answer: 0, explanation: "Labelled drafts with context about what changed give the client an efficient starting point for focused feedback." },
      { id: "cc-13-q2", question: "Why does the lesson recommend requesting time-coded comments from clients?", options: ["Time codes are required by CapCut for import","It reduces the video's file size","Vague feedback like 'the middle feels off' is hard to act on, while a specific timestamp maps to an exact edit point","It replaces the need for a rough cut"], answer: 2, explanation: "Time-coded comments turn vague impressions into specific, actionable notes tied to an exact point in the edit." },
      { id: "cc-13-q3", question: "How does the lesson distinguish a 'mistake' from a 'preference' in client feedback?", options: ["There is no difference - both must always be implemented","A mistake is objectively wrong and should be fixed; a preference is subjective and worth discussing first","Preferences should always be fixed, mistakes are optional","Mistakes only apply to audio, preferences only apply to color"], answer: 1, explanation: "Objective errors like a misspelled name should always be fixed, while subjective creative choices are worth discussing rather than automatically implemented." },
      { id: "cc-13-q4", question: "What risk does the lesson describe if every client preference is treated as a mandatory fix?", options: ["The export will fail","Captions will stop working","The file will exceed CapCut's size limit","The edit can drift away from the plan agreed during story planning"], answer: 3, explanation: "Automatically implementing every subjective preference can pull an edit away from what was originally planned to work." },
      { id: "cc-13-q5", question: "Why does the lesson recommend agreeing on a specific revision deadline and a set number of revision rounds?", options: ["It is a CapCut export requirement","An open-ended review window invites feedback to trickle in indefinitely and stalls delivery","It removes the need for time-coded comments","It automatically resolves preference disagreements"], answer: 1, explanation: "A defined deadline and revision count keeps the review process moving and sets a shared expectation of when a project is finished." },
    ] },
  "cc-14": { questions: [
      { id: "cc-14-q1", question: "What should a portfolio case study document before describing any specific editing decision?", options: ["The original brief - who asked for the video and what problem it needed to solve","The export file size","The music license","The CapCut version number used"], answer: 0, explanation: "Starting with the brief gives a reviewer the context needed to judge whether later editing choices actually made sense." },
      { id: "cc-14-q2", question: "Why does documenting the intended audience and platform strengthen a case study?", options: ["It is required by CapCut before export","It replaces the need for a final exported file","It shows format and pacing choices, like a 9:16 export, were deliberate rather than default","It automatically improves the video's resolution"], answer: 2, explanation: "Connecting a visible choice in the final video back to a specific audience or platform reason demonstrates deliberate decision-making." },
      { id: "cc-14-q3", question: "What can a case study show that a final exported video alone cannot?", options: ["The video's resolution","The reasoning behind decisions and the improvements made between an early draft and the final version","The platform the video was uploaded to","The aspect ratio used"], answer: 1, explanation: "A finished video only displays the last decision made; a case study can show the reasoning and alternatives considered along the way." },
      { id: "cc-14-q4", question: "What kind of supporting material does the lesson recommend including alongside the final exported file?", options: ["A copy of the client's invoice","A list of unrelated past projects","The original camera's technical manual","Screenshots of the CapCut timeline, keyframes, or speed curve on a key moment"], answer: 3, explanation: "Timeline and keyframe screenshots give a reviewer visual evidence of the actual editing process, not just the polished result." },
      { id: "cc-14-q5", question: "Who is a portfolio case study primarily written for, as distinct from a client deliverable?", options: ["The original client only","A reviewer evaluating editing skill and decision-making, such as a future client or employer","CapCut's support team","No one - it is purely archival"], answer: 1, explanation: "Unlike the deliverable itself, the case study is framed for someone judging the editor's process and decisions." },
    ] },
  "cc-15": { questions: [
      { id: "cc-15-q1", question: "What should the graduation edit begin with, according to this capstone lesson?", options: ["The same planning steps from the course's start: viewer, platform, hook, proof points, call to action","Choosing music first","Applying color correction to raw footage","Exporting a placeholder file"], answer: 0, explanation: "The capstone opens with defined planning, mirroring the course's first lesson on story planning, before any clip is placed." },
      { id: "cc-15-q2", question: "Why does the lesson emphasize locking the rough cut's structure before starting audio, caption, color, or motion work?", options: ["CapCut requires it technically","It reduces the export file size","Skipping straight to polish is the mistake the course warned against early on, and it's most visible in a capstone project","It is unrelated to the final grade"], answer: 2, explanation: "A graduation project makes any shortcut around locking structure first especially visible to a reviewer." },
      { id: "cc-15-q3", question: "When layering audio, captions, and B-roll onto the locked structure, what question should each element be checked against?", options: ["Whether it uses the most CapCut effects possible","Whether it actually serves the hook, proof, or call to action defined during planning","Whether it matches a competitor's video","Whether it increases the video's total length"], answer: 1, explanation: "Every added layer is checked against the original plan to confirm it serves the story rather than existing for its own sake." },
      { id: "cc-15-q4", question: "What does applying a previously built brand template to the graduation edit demonstrate?", options: ["That templates are unnecessary for a final project","That the student skipped the planning stage","That color correction is not needed","That the reusable system built earlier works on a real finished project, not just in isolation"], answer: 3, explanation: "Reusing the brand template from the Motion and Effects module shows the system functioning on an actual complete edit." },
      { id: "cc-15-q5", question: "Besides matching the correct aspect ratio and using a versioned filename, what final check does the lesson recommend before considering the export finished?", options: ["Re-recording all voiceover","Checking the video on an actual phone screen, since CapCut's preview is not the same as how it will be watched","Deleting the rough cut file","Removing all captions"], answer: 1, explanation: "A CapCut preview differs from real playback conditions, so checking on an actual phone screen confirms the export truly works." },
    ] },
};

const checkpointQuizzes: Record<string, NonNullable<Lesson["quiz"]>> = {
  "vd-1-7": { questions: [
      { id: "vd-1-7-q1", question: "What does Jakob's Law say about how users approach a new product?", options: ["They arrive with expectations formed by other products they already use","They always prefer completely novel interfaces","They ignore navigation patterns entirely","They read every instruction before acting"], answer: 0, explanation: "Jakob's Law states users spend most of their time on other products, so they bring those expectations with them - familiar patterns reduce friction." },
      { id: "vd-1-7-q2", question: "What are the four quadrants of an empathy map?", options: ["Goals, Risks, Budget, Timeline","Persona, Journey, Flow, Screen","Says, Thinks, Does, Feels","Research, Design, Build, Test"], answer: 2, explanation: "Empathy maps use four quadrants - Says, Thinks, Does, Feels - tied to a specific task, not a whole life." },
      { id: "vd-1-7-q3", question: "Why are the 'emotional dip' points on a journey map the most useful part to study?", options: ["They are the only part reviewers check","They show exactly where to focus redesign effort","They indicate where to add more screens","They show which colors to use"], answer: 1, explanation: "Emotional dips are the most diagnostic points on a journey map - they show precisely where friction and frustration happen." },
      { id: "vd-1-7-q4", question: "What is the difference between an open and a closed card sort?", options: ["Open sorts are faster; closed sorts take longer","Closed sorts only work on paper","There is no meaningful difference","Open sorts reveal a user's own mental model; closed sorts validate a structure you've already proposed"], answer: 3, explanation: "Open card sorts surface how users naturally group content; closed sorts test whether a proposed structure makes sense to them." },
      { id: "vd-1-7-q5", question: "What is the recommended minimum mobile touch target size?", options: ["Exactly 10x10px","Roughly 44x44pt / 48x48dp","200x200px","There is no standard"], answer: 1, explanation: "Minimum touch targets of roughly 44x44pt (iOS) / 48x48dp (Android) exist because Fitts's Law shows size and distance affect how reliably a target can be tapped." },
    ] },
  "vd-2-7": { questions: [
      { id: "vd-2-7-q1", question: "What is the \"Crazy 8s\" sketching exercise?", options: ["Eight screen variations sketched in eight minutes","Eight hours of wireframing","Eight rounds of client feedback","Eight fonts tested on one screen"], answer: 0, explanation: "Crazy 8s forces genuinely different directions fast, rather than small tweaks on one idea." },
      { id: "vd-2-7-q2", question: "What is the \"fidelity trap\"?", options: ["Spending too long choosing fonts","Using too many wireframing tools","Showing polished visuals too early, which triggers surface-level feedback and hides structural problems","Skipping low fidelity entirely"], answer: 2, explanation: "Adding color and polish too early causes reviewers to comment on visuals instead of catching real structural issues." },
      { id: "vd-2-7-q3", question: "When mapping a flow's branch points, what should be drawn?", options: ["Only the ideal happy path","Both outcomes - success and failure - not just the ideal one","Only error states","Nothing, branches are implied"], answer: 1, explanation: "Branch points need both outcomes drawn, since skipping failure paths hides real structural gaps." },
      { id: "vd-2-7-q4", question: "When does a hamburger menu make more sense than a bottom tab bar?", options: ["Always, since it looks cleaner","Never, tab bars are always better","Only on desktop","When there are more sections than a tab bar can comfortably fit"], answer: 3, explanation: "Tab bars suit a small number of frequent destinations; hamburger menus hide items at the cost of discoverability when there are more sections." },
      { id: "vd-2-7-q5", question: "What is the best practice for form field labels?", options: ["Use placeholder text only, no separate label","Use persistent labels above fields so context doesn't disappear once typing starts","Hide labels until the user hovers","Labels are optional if the field name is obvious"], answer: 1, explanation: "Placeholder-only labels vanish once a user starts typing, losing context - persistent labels stay visible." },
    ] },
  "vd-3-7": { questions: [
      { id: "vd-3-7-q1", question: "What WCAG 2.2 AA contrast ratio is required for normal body text?", options: ["4.5:1","2:1","3:1","10:1"], answer: 0, explanation: "WCAG 2.2 AA requires at least 4.5:1 contrast for normal text (3:1 for large text and UI components)." },
      { id: "vd-3-7-q2", question: "What is the recommended line-height range for readable body text?", options: ["0.8-1.0x","2.5-3.0x","1.4-1.6x","There is no useful range"], answer: 2, explanation: "Body text reads best around 1.4-1.6x line height with roughly 45-75 characters per line." },
      { id: "vd-3-7-q3", question: "A spacing scale is usually built from what?", options: ["Random values chosen by eye","A base unit (commonly 4px or 8px) and its multiples","The screen's full pixel width","Whatever value looks closest to the mockup"], answer: 1, explanation: "A consistent spacing scale built from a base unit and its multiples prevents spacing drift across a project." },
      { id: "vd-3-7-q4", question: "Why is having two equally prominent \"primary\" buttons on one screen a problem?", options: ["It uses too much screen space","It is not allowed in Figma","It only matters on mobile","It undermines hierarchy and slows decisions, per Hick's Law"], answer: 3, explanation: "More choices slow decisions (Hick's Law) - a screen needs one clear primary action, with secondary/tertiary styles for the rest." },
      { id: "vd-3-7-q5", question: "What should decide whether content is shown as a card grid, a list, or a table?", options: ["Whichever the designer prefers visually","Cards suit browsable distinct content, lists suit dense linear scanning, tables suit structured comparable data","Cards are always correct for any content","Tables should never be used in UI design"], answer: 1, explanation: "Each collection pattern fits a different content shape and task, not a single default choice." },
    ] },
  "vd-4-7": { questions: [
      { id: "vd-4-7-q1", question: "What is the difference between a Figma main component and an instance?", options: ["The main component is the editable source; instances are linked copies that update automatically","There is no difference","Instances are the source; main components are copies","Main components cannot be reused"], answer: 0, explanation: "Editing the main component updates every instance; editing an instance directly only overrides that one copy." },
      { id: "vd-4-7-q2", question: "What does Figma's Auto Layout behave like?", options: ["A fixed grid with no flexibility","A raster image filter","CSS Flexbox - stacking children with a direction, gap, padding, and alignment","A font-pairing tool"], answer: 2, explanation: "Auto Layout frames stack children much like CSS Flexbox, and it's what actually enforces a project's spacing scale." },
      { id: "vd-4-7-q3", question: "What does Smart Animate do in a Figma prototype?", options: ["Automatically writes microcopy","Automatically animates matching layers between frames","Automatically fixes color contrast","Automatically generates user personas"], answer: 1, explanation: "Smart Animate is the basis for realistic button, tab, and transition interactions between frames." },
      { id: "vd-4-7-q4", question: "Roughly how many usability testing participants typically surface most major problems?", options: ["1","50","500","5"], answer: 3, explanation: "Around 5 participants is enough to surface most major usability problems for a realistic student project." },
      { id: "vd-4-7-q5", question: "What should a button's microcopy describe?", options: ["A generic verb like \"Confirm\"","The actual outcome of the action","The name of the developer","Nothing - icons are always clearer than text"], answer: 1, explanation: "Specific, outcome-describing labels beat generic system language like a bare \"Confirm\" or \"OK\"." },
    ] },
  "vd-5-7": { questions: [
      { id: "vd-5-7-q1", question: "What is the recommended scope for a capstone brief?", options: ["Roughly 5-8 core screens covering one complete flow, designed deeply","A whole app designed shallowly","A single screen only","As many screens as possible"], answer: 0, explanation: "A focused scope with real complexity produces stronger, deeper work than a shallow pass across an entire app." },
      { id: "vd-5-7-q2", question: "What is the most commonly weak or skipped section in a design case study?", options: ["The final screens","The title","The Process section, which hides the reasoning behind the final result","The contact information"], answer: 2, explanation: "Skipping Process is the most common weakness - it hides the reasoning that makes the final screens credible." },
      { id: "vd-5-7-q3", question: "Which export format should be avoided for flat-color UI screenshots?", options: ["PNG","JPG, because compression artifacts show clearly around sharp edges and text","SVG","PDF"], answer: 1, explanation: "JPG compression creates visible artifacts on flat UI screens; PNG is lossless and the correct choice." },
      { id: "vd-5-7-q4", question: "At what scale should screens typically be exported for portfolio and web use?", options: ["0.5x","1x only","10x","2x or 3x"], answer: 3, explanation: "Exporting at 2x or 3x avoids screens looking soft on modern high-density displays." },
      { id: "vd-5-7-q5", question: "What should you do with critical feedback you disagree with?", options: ["Apply all feedback automatically","Weigh it against your problem statement and document both what was incorporated and what was declined, and why","Ignore it completely","Remove the reviewer from future critiques"], answer: 1, explanation: "Not all feedback should be applied - the reasoning behind what you kept and what you rejected is itself worth documenting." },
    ] },
  "vc-1-7": { questions: [
      { id: "vc-1-7-q1", question: "What does box-sizing: border-box change about an element's width and height?", options: ["Width and height include padding and border, avoiding surprise overflow","Nothing, it's purely visual","It removes margins entirely","It only works inside flexbox"], answer: 0, explanation: "border-box makes declared width/height include padding and border, which is why * { box-sizing: border-box; } is standard practice." },
      { id: "vc-1-7-q2", question: "Which HTML element is the semantic choice for a page's primary navigation links?", options: ["<div>","<span>","<nav>","<b>"], answer: 2, explanation: "<nav> describes meaning, not just appearance, unlike a generic <div> wrapper." },
      { id: "vc-1-7-q3", question: "What is the key difference between px and rem units?", options: ["They are identical","px is absolute and ignores zoom/font preferences; rem is relative to the root font size and scales predictably","rem only works in Safari","px is newer than rem"], answer: 1, explanation: "rem scales with the user's root font size, which is why it's the default for accessible text sizing." },
      { id: "vc-1-7-q4", question: "In CSS specificity, which of these wins when rules conflict?", options: ["Type selector beats everything","The last rule in the file always wins regardless of specificity","Specificity does not exist in modern CSS","Inline styles beat ID, which beats class, which beats type"], answer: 3, explanation: "Specificity ranks inline > ID > class > type, with later rules only breaking ties at equal specificity." },
      { id: "vc-1-7-q5", question: "What are the two most commonly forgotten items when building a foundational HTML page?", options: ["The <title> tag and favicon","The viewport meta tag and alt text on images","The DOCTYPE and charset","CSS and JavaScript files"], answer: 1, explanation: "The viewport meta tag and image alt text are easy to forget but essential for mobile display and accessibility." },
    ] },
  "vc-2-7": { questions: [
      { id: "vc-2-7-q1", question: "Which CSS builds a responsive card grid without writing any media queries?", options: ["grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))","display: block","float: left everywhere","position: absolute on every card"], answer: 0, explanation: "auto-fit with minmax lets Grid reflow the number of columns automatically as the viewport changes." },
      { id: "vc-2-7-q2", question: "Which position value keeps a nav bar visible on scroll without the jump issues of position: fixed?", options: ["position: static","position: relative","position: sticky","position: inherit"], answer: 2, explanation: "position: sticky with top: 0 keeps a nav visible on scroll while staying part of the document flow." },
      { id: "vc-2-7-q3", question: "Uneven card heights in a flex row are usually fixed by which pattern?", options: ["Adding more margin","flex-direction: column plus flex: 1 on the content area","Switching to inline elements","Removing the gap property"], answer: 1, explanation: "That pattern keeps card footers aligned across a row even when content length varies." },
      { id: "vc-2-7-q4", question: "What usually causes unexpected horizontal scroll on a page?", options: ["Too much padding on the body","Using CSS Grid instead of Flexbox","Having more than 3 sections on a page","A fixed-width element, an unconstrained image, long text, or negative margins"], answer: 3, explanation: "These are the standard culprits - a temporary outline on all elements is the fastest way to spot which one." },
      { id: "vc-2-7-q5", question: "How should a responsive layout actually be tested?", options: ["Only at a couple of fixed device-preset breakpoints","Continuously across the full width range, not just fixed breakpoints","Only at the widest possible screen size","Testing responsiveness is unnecessary if it looks fine on desktop"], answer: 1, explanation: "Dragging the viewport width freely catches breakage between presets that fixed-breakpoint testing misses." },
    ] },
  "vc-3-7": { questions: [
      { id: "vc-3-7-q1", question: "Why should === be used instead of == in JavaScript?", options: ["=== avoids type coercion bugs that == can silently introduce","=== is faster to type","== does not exist in modern JavaScript","There is no real difference"], answer: 0, explanation: "Strict equality (===) avoids surprising results from JavaScript's automatic type coercion." },
      { id: "vc-3-7-q2", question: "What is a closure?", options: ["A syntax error in a function","A way to close a browser tab from JavaScript","A function that retains access to variables from its defining scope even after that scope has finished executing","A CSS property"], answer: 2, explanation: "Closures explain common patterns in event handlers and, later, React hooks." },
      { id: "vc-3-7-q3", question: "What must you do to use array methods like map() or filter() on the result of querySelectorAll()?", options: ["Nothing, NodeList already supports them","Convert it with Array.from()","Call .toArray() on it","It's impossible"], answer: 1, explanation: "querySelectorAll returns a NodeList, which supports forEach but needs Array.from() for map/filter." },
      { id: "vc-3-7-q4", question: "Why does data saved to localStorage need JSON.stringify() and JSON.parse()?", options: ["It's optional but recommended","JSON is required for all JavaScript variables","localStorage automatically converts objects","localStorage only stores strings, so objects and arrays must be converted"], answer: 3, explanation: "Without stringify/parse, an object saved directly to localStorage becomes the useless string \"[object Object]\"." },
      { id: "vc-3-7-q5", question: "Which array operations create a new array instead of mutating the original in place?", options: ["push() and splice()","slice() and the spread operator","pop() and shift()","sort() and reverse()"], answer: 1, explanation: "slice() and the spread operator produce new arrays, which matters directly for how React detects state changes." },
    ] },
  "vc-4-7": { questions: [
      { id: "vc-4-7-q1", question: "What happens when you call a useState setter function?", options: ["It updates the state value and triggers a re-render","Only the variable updates, no re-render happens","It deletes the component","It only works inside useEffect"], answer: 0, explanation: "Calling the setter both updates state and triggers React to re-render with the new value." },
      { id: "vc-4-7-q2", question: "Why does every item in a rendered list need a unique, stable key prop?", options: ["It's purely cosmetic","Keys are required by HTML, not React","So React can correctly track additions, removals, and reorders - wrong keys can attach state to the wrong row","To make the list load faster over the network"], answer: 2, explanation: "Using the array index as a key is only safe for lists that never reorder or filter; a real data ID is preferred." },
      { id: "vc-4-7-q3", question: "Which direction do props flow in React?", options: ["Two-way, child can modify parent props directly","One-way, from parent to child, and are read-only","Bottom to top only","Props don't have a direction"], answer: 1, explanation: "Props are read-only and flow one-way; a child never modifies the props it receives." },
      { id: "vc-4-7-q4", question: "What makes a React input \"controlled\"?", options: ["It uses a ref instead of state","It has no value attribute at all","It only works with checkboxes","Its value is set from state and updated via onChange on every keystroke"], answer: 3, explanation: "Controlled inputs keep React state as the single source of truth for what the user has typed." },
      { id: "vc-4-7-q5", question: "What problem do CSS Modules solve in a Next.js project?", options: ["They make CSS load faster over the network","They automatically scope class names per component, avoiding global naming collisions","They replace the need for any JavaScript","They only work with inline styles"], answer: 1, explanation: "Importing a .module.css file gives each class name automatic per-component scoping." },
    ] },
  "vc-5-7": { questions: [
      { id: "vc-5-7-q1", question: "What directive is required at the top of an error.tsx file?", options: ["\"use client\"","\"use server\"","\"use strict\"","No directive is needed"], answer: 0, explanation: "error.tsx must be a client component, or the error boundary will not work." },
      { id: "vc-5-7-q2", question: "Which component enables fast client-side navigation with automatic prefetching in the App Router?", options: ["A plain <a> tag","<img>","The Link component from next/link","useState"], answer: 2, explanation: "Plain <a> tags still work for internal links but force a full page reload, losing prefetching." },
      { id: "vc-5-7-q3", question: "What does app/layout.tsx uniquely render that no other layout in the app can?", options: ["The favicon","<html> and <body>, as the required root layout","The homepage content","Nothing unique"], answer: 1, explanation: "Only the root layout renders <html> and <body>; nested layouts wrap only the pages within their folder." },
      { id: "vc-5-7-q4", question: "What does the next/image component automatically handle?", options: ["Writing the alt text for you","Choosing the page's color scheme","Generating captions","Resizing, format conversion, lazy-loading, and reserving layout space for images"], answer: 3, explanation: "next/image optimizes delivery automatically, but alt text is still the developer's responsibility." },
      { id: "vc-5-7-q5", question: "Which function is used when a page's metadata depends on runtime data, like a specific post's title?", options: ["useEffect","generateMetadata","getStaticProps","useRouter"], answer: 1, explanation: "generateMetadata is an async function used when metadata can't be a static object because it depends on fetched data." },
    ] },
  "vc-6-7": { questions: [
      { id: "vc-6-7-q1", question: "Why must response.ok be checked after a fetch() call?", options: ["fetch() resolves successfully even for 404/500 responses, so the status must be checked before trusting the result","It's optional, fetch always succeeds","response.ok only exists in older browsers","It replaces the need for try/catch"], answer: 0, explanation: "A fetch only rejects on genuine network failure - a 404 or 500 still resolves, so response.ok must be checked explicitly." },
      { id: "vc-6-7-q2", question: "What does exporting an async function named GET from a route.ts file do?", options: ["Nothing unless imported elsewhere","It only works in the Pages Router","It handles GET requests to that folder's URL path as an API endpoint","It automatically creates a database"], answer: 2, explanation: "Named exports like GET, POST, PUT, DELETE handle each HTTP method at that route." },
      { id: "vc-6-7-q3", question: "Why must server-side validation never be skipped, even if the client already validates?", options: ["It isn't necessary if the client validates well","Client-side validation can always be bypassed, so the server must independently validate everything","Server validation is only needed for login forms","Both perform the same check so one is redundant"], answer: 1, explanation: "A user can call an API directly, bypassing any client-side checks entirely." },
      { id: "vc-6-7-q4", question: "What should an API route return for invalid input?", options: ["A 200 status with an error buried in the body","A silent empty response","A 500 status always","A 400 status with a clear JSON error message describing what was wrong"], answer: 3, explanation: "A 400 status with a specific message makes client-side error handling predictable." },
      { id: "vc-6-7-q5", question: "Why is localStorage not sufficient for real student progress persistence?", options: ["It's too slow","It is device-specific and does not survive a cleared cache or a switch to a different device","It cannot store numbers","It requires a paid plan"], answer: 1, explanation: "Real persistence needs an API route that validates and writes to a database tied to the user's account." },
    ] },
  "vc-7-7": { questions: [
      { id: "vc-7-7-q1", question: "Why do icon-only buttons need an aria-label?", options: ["The icon alone conveys nothing to a screen reader","To improve SEO ranking","It's required by CSS","To make the button bigger"], answer: 0, explanation: "Without a text label or aria-label, a screen reader user has no way to know what an icon-only button does." },
      { id: "vc-7-7-q2", question: "What does the Core Web Vital LCP measure, and what's the target?", options: ["Visual stability, target under 0.1","Interaction responsiveness","Loading performance, target under 2.5 seconds","Number of DOM elements"], answer: 2, explanation: "LCP (Largest Contentful Paint) measures loading speed; CLS measures visual stability and INP measures responsiveness." },
      { id: "vc-7-7-q3", question: "Which metric replaced First Input Delay as the standard responsiveness measure?", options: ["CLS","INP","LCP","TTFB"], answer: 1, explanation: "INP (Interaction to Next Paint) is now the standard Core Web Vital for responsiveness." },
      { id: "vc-7-7-q4", question: "Which CSS technique helps content avoid being obscured by device notches or rounded corners?", options: ["overflow: hidden","z-index: 9999","box-sizing: border-box","env(safe-area-inset-*)"], answer: 3, explanation: "env(safe-area-inset-*) accounts for notches, rounded corners, and similar device-specific screen intrusions." },
      { id: "vc-7-7-q5", question: "What is a genuinely achievable bar for a \"clean\" finished codebase?", options: ["No comments anywhere in the code","A zero-warning build with no leftover console.log statements or dead code","Exactly 100 lines per file","No use of third-party libraries"], answer: 1, explanation: "Treating linter warnings as real problems and removing debug logging is a concrete, checkable bar." },
    ] },
  "vc-8-7": { questions: [
      { id: "vc-8-7-q1", question: "What is the core three-step Git cycle for saving and sharing work?", options: ["add, commit, push","clone, fork, merge","pull, branch, delete","init, status, log"], answer: 0, explanation: "git add stages changes, git commit snapshots them, and git push uploads to the remote repository." },
      { id: "vc-8-7-q2", question: "In Next.js, which environment variables are exposed to client-side browser code?", options: ["All of them by default","Only variables listed in .gitignore","Only those prefixed with NEXT_PUBLIC_","None, ever"], answer: 2, explanation: "Accidentally prefixing a secret with NEXT_PUBLIC_ exposes it to every visitor's browser, so this distinction matters for security." },
      { id: "vc-8-7-q3", question: "What does tree-shaking do during a production build?", options: ["Adds extra debugging code","Removes unused code, making the deployed bundle smaller and faster","Renames all variables randomly","Converts JavaScript to Python"], answer: 1, explanation: "Tree-shaking is part of why a production build (next build) differs meaningfully from the dev server." },
      { id: "vc-8-7-q4", question: "What must a genuinely missing page return?", options: ["A 200 status with an \"error\" message inside normal-looking content","A 500 status","No response at all","A real 404 status"], answer: 3, explanation: "A fake 200 for a missing page misleads both users and search engines - it needs a real 404." },
      { id: "vc-8-7-q5", question: "What should a project README open with?", options: ["A full commit history","A clear description, a live demo link, and ideally a screenshot","The developer's resume","A list of every dependency version"], answer: 1, explanation: "First impressions form within seconds, so the opening of a README carries real weight." },
    ] },
  "ape-1-7": { questions: [
      { id: "ape-1-7-q1", question: "What are AI assistants actually doing when they generate a response?", options: ["Predicting the next likely token based on patterns in training data","Retrieving verified facts from a database","Running a live web search every time","Copying answers from a fixed script"], answer: 0, explanation: "This is why fluent, confident output can still be factually wrong - it's prediction, not retrieval of verified facts." },
      { id: "ape-1-7-q2", question: "What five parts is a strong prompt typically built from?", options: ["Title, author, date, length, tone","Greeting, body, signature, footer, disclaimer","Task, context, constraints, format, examples","Keywords, hashtags, links, images, emojis"], answer: 2, explanation: "When a prompt underperforms, checking it against these five parts usually reveals what's missing." },
      { id: "ape-1-7-q3", question: "Does assigning an AI a role or persona guarantee accurate expertise?", options: ["Yes, always","No - it reshapes tone and vocabulary but does not guarantee accuracy","Only for coding tasks","Only if the role is a real person's name"], answer: 1, explanation: "A strong persona can even produce overconfident answers, so it should be paired with fact-checking, not trusted alone." },
      { id: "ape-1-7-q4", question: "How many well-chosen few-shot examples is usually most effective?", options: ["Zero, examples confuse the model","Fifty or more","Exactly one is always ideal","Two to five"], answer: 3, explanation: "Two to five well-chosen examples is usually more effective than one, or many near-duplicates." },
      { id: "ape-1-7-q5", question: "Why should you run the same prompt multiple times when testing its quality?", options: ["To make the AI learn faster","Because output quality can vary between identical runs","It's not useful, one run is always sufficient","To reduce the AI's token cost"], answer: 1, explanation: "A prompt should be tested against varied and awkward inputs, and across repeated runs, not judged on a single lucky result." },
    ] },
  "ape-2-7": { questions: [
      { id: "ape-2-7-q1", question: "What is a more effective approach than asking AI for \"the best\" single content idea?", options: ["Asking for a large batch of ideas and filtering them yourself","Accepting the very first suggestion","Asking the same question twice","Avoiding brainstorming prompts entirely"], answer: 0, explanation: "Asking for a batch and screening for originality produces better results than expecting one perfect answer immediately." },
      { id: "ape-2-7-q2", question: "What should you check before pasting sensitive client details into a general-purpose AI tool?", options: ["The tool's font options","The tool's pricing plan","The tool's data policy","Nothing, it's always safe"], answer: 2, explanation: "Client pricing, unreleased products, or other sensitive details need a data-policy check before being pasted in." },
      { id: "ape-2-7-q3", question: "What is the recommended formula for structuring an AI image-generation prompt?", options: ["Price, length, deadline, budget","Subject, style, composition, lighting, technical detail","Title, author, date, category","Keywords only, no full sentences"], answer: 1, explanation: "Concrete subjects and specific lighting terms (like golden hour or rim lighting) work far more reliably than vague adjectives." },
      { id: "ape-2-7-q4", question: "Why must AI-generated citations always be independently verified?", options: ["They are always correct","Citations are not needed in research summaries","Only citations from images need checking","They can be fabricated even when they look precise and specific"], answer: 3, explanation: "A specific-looking, confidently stated citation can still be entirely invented." },
      { id: "ape-2-7-q5", question: "What should an AI never be allowed to commit to in a customer response draft?", options: ["A greeting","A policy, refund, or timeline it was not explicitly given as accurate","The customer's name","A closing sentence"], answer: 1, explanation: "AI-drafted replies must be personalized and checked - the model should never invent binding commitments on the business's behalf." },
    ] },
  "ape-3-7": { questions: [
      { id: "ape-3-7-q1", question: "On what kind of topics does AI hallucination happen most often?", options: ["Narrow, technical, recent, or obscure topics","Simple arithmetic","Common greetings","Topics with a single, well-known answer"], answer: 0, explanation: "Limited or ambiguous training data on a topic increases the chance of a confidently stated but false answer." },
      { id: "ape-3-7-q2", question: "Where do biases in AI model output come from?", options: ["Random hardware errors","The user's own typing speed","The human-generated text the model was trained on","The model's file size"], answer: 2, explanation: "Models absorb the biases present in their training data, including stereotyped assumptions - a repeatable safety checklist catches this better than an ad hoc read-through." },
      { id: "ape-3-7-q3", question: "What should a documented prompt-library entry include beyond the raw prompt text?", options: ["Nothing else is needed","Purpose, expected inputs, an example output, and known limitations","Only the author's name","The AI model's version number and nothing else"], answer: 1, explanation: "Raw prompt text alone doesn't transfer the reasoning and limitations a new team member needs." },
      { id: "ape-3-7-q4", question: "Where should human approval checkpoints be placed in an AI-assisted workflow?", options: ["Nowhere, full automation is always better","Only at the very end of the year","Only when the AI itself flags uncertainty","Before anything client-facing, binding, or hard to reverse"], answer: 3, explanation: "Keeping sensitive or hard-to-reverse decisions human-led is the core of responsible automation planning." },
      { id: "ape-3-7-q5", question: "What is described as the durable skill from this whole course, beyond any single prompt technique?", options: ["Memorizing exact prompt wording","The habit of testing, verifying, and reviewing","Writing the longest possible prompts","Avoiding AI tools once tools change"], answer: 1, explanation: "Prompts and tools will keep changing after graduation - the testing/verifying/reviewing habit is what transfers." },
    ] },
};

const quizEnhancements: Record<string, NonNullable<Lesson["quiz"]>> = {
  "ps-1": {
    questions: [
      { id: "ps-1-q1", question: "What is the industry standard DPI for high-quality printing?", options: ["72 DPI", "150 DPI", "300 DPI", "600 DPI"], answer: 2, explanation: "300 DPI gives print designs enough pixel detail for sharp flyers, posters, banners, and certificates." },
      { id: "ps-1-q2", question: "Which tool is used to move objects around the canvas?", options: ["Brush Tool", "Move Tool (V)", "Eraser Tool", "Zoom Tool"], answer: 1, explanation: "The Move Tool, shortcut V, is used to position layers and objects on the Photoshop canvas." },
      { id: "ps-1-q3", question: "Why should a designer save a PSD copy?", options: ["To flatten all layers", "To preserve editable layers", "To reduce image quality", "To remove masks"], answer: 1, explanation: "PSD keeps layers, masks, text, and effects editable so client changes are easier later." },
      { id: "ps-1-q4", question: "Which design principle groups related information together?", options: ["Contrast", "Proximity", "Movement", "Texture"], answer: 1, explanation: "Proximity means placing related items close together so the viewer understands what belongs together." },
      { id: "ps-1-q5", question: "Which format is best when a logo needs a transparent background for web use?", options: ["PNG", "BMP", "JPEG", "GIF"], answer: 0, explanation: "PNG supports transparency and is commonly used for logos, icons, and web graphics." }
    ]
  },
  "ps-2": {
    questions: [
      { id: "ps-2-q1", question: "Which blending mode is best for removing a black background from a light effect?", options: ["Multiply", "Screen", "Overlay", "Color Burn"], answer: 1, explanation: "Screen hides black areas and keeps bright pixels, making it useful for sparks, glows, and light leaks." },
      { id: "ps-2-q2", question: "What is the shortcut to group selected layers?", options: ["Ctrl+T", "Ctrl+J", "Ctrl+G", "Ctrl+E"], answer: 2, explanation: "Ctrl+G groups selected layers, helping keep a Photoshop file organized." },
      { id: "ps-2-q3", question: "Which statement best describes layer order?", options: ["Lower layers appear in front", "Top layers appear in front", "Layer order affects only text", "Layer order only matters in print"], answer: 1, explanation: "Layers higher in the panel appear above layers below them on the canvas." },
      { id: "ps-2-q4", question: "Which layer style adds an outline around text or a shape?", options: ["Stroke", "Satin", "Inner Glow", "Color Overlay"], answer: 0, explanation: "Stroke adds an outline around a layer and is useful for bold text, logos, and emphasis." },
      { id: "ps-2-q5", question: "Why are adjustment layers important?", options: ["They permanently delete pixels", "They make non-destructive color and tone edits", "They only work on videos", "They flatten layer groups"], answer: 1, explanation: "Adjustment layers let you change brightness, contrast, hue, saturation, and tone while keeping the original image editable." }
    ]
  },
  "ps-3": {
    questions: [
      { id: "ps-3-q1", question: "In a Layer Mask, what color is used to hide parts of the layer?", options: ["White", "Black", "Grey", "Red"], answer: 1, explanation: "Black hides pixels on a mask, white reveals them, and gray partially hides them." },
      { id: "ps-3-q2", question: "Why are masks preferred over the Eraser Tool?", options: ["They permanently delete pixels", "They make edits reversible", "They lower resolution", "They only work with text"], answer: 1, explanation: "Masks are non-destructive, so hidden areas can be restored later." },
      { id: "ps-3-q3", question: "Which command selects the opposite area of an active selection?", options: ["Feather", "Invert", "Rasterize", "Merge"], answer: 1, explanation: "Invert changes the active selection to the opposite area, which is useful when isolating backgrounds or subjects." },
      { id: "ps-3-q4", question: "Why convert a layer to a Smart Object before applying filters?", options: ["So filters remain editable", "So the image becomes smaller only", "So layers disappear", "So text cannot be changed"], answer: 0, explanation: "Smart Objects allow filters to behave like Smart Filters, meaning they can be adjusted or removed later." },
      { id: "ps-3-q5", question: "Which workspace helps refine complex edges such as hair?", options: ["Select and Mask", "Save for Web", "Paragraph Panel", "Timeline"], answer: 0, explanation: "Select and Mask includes edge refinement tools for soft or complex cutouts like hair, fabric, and fur." }
    ]
  },
  "ps-4": {
    questions: [
      { id: "ps-4-q1", question: "What should professional skin retouching preserve?", options: ["Natural skin texture", "Only shadows", "All blemishes", "Plastic smoothness"], answer: 0, explanation: "Good retouching improves the portrait while keeping natural pores and texture." },
      { id: "ps-4-q2", question: "What does frequency separation help separate?", options: ["Text and shapes", "Texture and color/tone", "RGB and CMYK", "Video and audio"], answer: 1, explanation: "Frequency separation lets you work on texture separately from skin color and tone." },
      { id: "ps-4-q3", question: "Which blending modes are commonly useful for subtle retouching and light shaping?", options: ["Overlay and Soft Light", "Difference and Exclusion", "Dissolve and Hard Mix", "Bitmap and Indexed"], answer: 0, explanation: "Overlay and Soft Light are often used at low opacity for controlled highlights, shadows, and subtle tone work." },
      { id: "ps-4-q4", question: "Which tool is best for quickly removing small temporary blemishes?", options: ["Spot Healing Brush", "Type Tool", "Crop Tool", "Gradient Tool"], answer: 0, explanation: "Spot Healing Brush quickly blends small marks with the surrounding skin or texture." },
      { id: "ps-4-q5", question: "What is Dodge and Burn mainly used for in portraits?", options: ["Shaping highlights and shadows", "Deleting layers", "Changing canvas size", "Exporting files"], answer: 0, explanation: "Dodge and Burn controls light and shadow to add depth while keeping the portrait natural." }
    ]
  },
  "ps-5": {
    questions: [
      { id: "ps-5-q1", question: "What is visual hierarchy in poster design?", options: ["Making all text the same size", "Guiding what the viewer sees first", "Using only one font", "Removing spacing"], answer: 1, explanation: "Hierarchy controls importance so the main message is noticed before supporting details." },
      { id: "ps-5-q2", question: "What does kerning adjust?", options: ["Space between individual letter pairs", "Canvas resolution", "Layer opacity", "Image sharpness"], answer: 0, explanation: "Kerning fine-tunes spacing between specific letters to make type look polished." },
      { id: "ps-5-q3", question: "Which Photoshop feature is best for inserting artwork into a reusable mockup?", options: ["Smart Object", "Eraser Tool", "History Panel", "Bitmap Mode"], answer: 0, explanation: "Mockups usually use Smart Objects so you can replace the design while keeping perspective, shadows, and effects." },
      { id: "ps-5-q4", question: "Which export choice is best for a print-ready document?", options: ["Low-quality JPEG only", "PDF or TIFF", "GIF only", "A screenshot"], answer: 1, explanation: "PDF and TIFF are common high-quality print delivery formats, while PSD should be kept as the editable working file." },
      { id: "ps-5-q5", question: "What does leading control in typography?", options: ["Space between lines", "Image brightness", "Canvas rotation", "Layer opacity"], answer: 0, explanation: "Leading controls the vertical space between lines of text, which affects readability." }
    ]
  },
  "ai-1": {
    questions: [
      { id: "ai-1-q1", question: "What happens to a vector image when you scale it up 1000%?", options: ["It becomes blurry", "It remains perfectly sharp", "It changes color", "It disappears"], answer: 1, explanation: "Vector artwork is calculated from paths and points, so it can scale without pixelation." },
      { id: "ai-1-q2", question: "Which color mode is usually safer for print work?", options: ["RGB", "CMYK", "HSL", "Indexed Color"], answer: 1, explanation: "CMYK is designed for ink-based printing, while RGB is designed for screens." },
      { id: "ai-1-q3", question: "What is an Illustrator artboard most similar to?", options: ["A separate page or canvas", "A brush preset", "A password field", "A video timeline"], answer: 0, explanation: "Artboards let designers organize multiple layouts or brand items in one Illustrator document." },
      { id: "ai-1-q4", question: "Which tool selects individual anchor points?", options: ["Direct Selection Tool", "Eyedropper Tool", "Rectangle Tool", "Zoom Tool"], answer: 0, explanation: "Direct Selection, shortcut A, edits individual points and handles on a vector path." },
      { id: "ai-1-q5", question: "Why are logos commonly created as vectors?", options: ["They scale cleanly at any size", "They can only be used online", "They cannot be printed", "They remove all colors"], answer: 0, explanation: "Vector logos remain sharp from small icons to large banners because they are path-based." }
    ]
  },
  "ai-2": {
    questions: [
      { id: "ai-2-q1", question: "What action creates a curved point with the Pen Tool?", options: ["Single click", "Click and drag", "Press Delete", "Double-click the artboard"], answer: 1, explanation: "Clicking and dragging creates handles that control the curve." },
      { id: "ai-2-q2", question: "Why should paths avoid too many anchor points?", options: ["They become harder to edit smoothly", "They cannot be colored", "They stop being vectors", "They export only as video"], answer: 0, explanation: "Fewer well-placed points create cleaner curves and easier editing." },
      { id: "ai-2-q3", question: "What do Pen Tool handles control?", options: ["Curve direction and smoothness", "Video speed", "Font installation", "File passwords"], answer: 0, explanation: "Handles control how curves enter and leave anchor points." },
      { id: "ai-2-q4", question: "Which key is used to break or adjust Pen Tool handles in many workflows?", options: ["Alt", "Caps Lock", "Tab", "F12"], answer: 0, explanation: "Alt is commonly used to adjust or break handles for sharper direction changes." },
      { id: "ai-2-q5", question: "What is the best reason to trace logos for practice?", options: ["It trains precision with curves and spacing", "It deletes anchor points automatically", "It replaces learning color", "It only exports images"], answer: 0, explanation: "Tracing helps build control over curves, corners, spacing, and symmetry." }
    ]
  },
  "ai-3": {
    questions: [
      { id: "ai-3-q1", question: "What does Shape Builder help you do?", options: ["Edit video speed", "Merge or remove overlapping shapes", "Change DPI", "Export audio"], answer: 1, explanation: "Shape Builder combines or removes parts of overlapping vector shapes." },
      { id: "ai-3-q2", question: "Why test a logo in black and white?", options: ["To check if it works without color effects", "To reduce file size only", "To remove paths", "To convert it to raster"], answer: 0, explanation: "A strong logo should remain clear and recognizable without relying on color." },
      { id: "ai-3-q3", question: "Which Pathfinder command combines selected shapes into one?", options: ["Unite", "Divide", "Crop Image", "Gaussian Blur"], answer: 0, explanation: "Unite merges selected vector shapes into one combined shape." },
      { id: "ai-3-q4", question: "Why should a logo work at small sizes?", options: ["It may appear on icons, labels, and profiles", "It should only be used on billboards", "It removes the need for typography", "It changes the brand name"], answer: 0, explanation: "A practical logo must stay recognizable on small digital and printed applications." },
      { id: "ai-3-q5", question: "What does holding Alt with Shape Builder usually do?", options: ["Remove selected regions", "Add video audio", "Lock the computer", "Change CMYK to RGB"], answer: 0, explanation: "Alt lets you subtract or delete unwanted shape regions while using Shape Builder." }
    ]
  },
  "cc-1": {
    questions: [
      { id: "cc-1-q1", question: "Which aspect ratio is best for Instagram Reels?", options: ["16:9", "4:3", "9:16", "2:1"], answer: 2, explanation: "9:16 is the vertical format used by Reels, TikTok, Shorts, and mobile-first video." },
      { id: "cc-1-q2", question: "Why are captions useful in short-form video?", options: ["They help viewers understand with sound off", "They replace all editing", "They lower video quality", "They only work in landscape"], answer: 0, explanation: "Many viewers watch without sound, so readable captions keep the message clear." },
      { id: "cc-1-q3", question: "What should the first seconds of a short video do?", options: ["Hook attention quickly", "Show only the ending", "Stay silent and blank", "Hide the subject"], answer: 0, explanation: "A strong hook gives viewers a reason to keep watching immediately." },
      { id: "cc-1-q4", question: "What does timeline trimming help remove?", options: ["Dead space and weak moments", "All captions", "The final export button", "Every transition"], answer: 0, explanation: "Trimming keeps the pace tight by removing pauses, mistakes, and low-energy sections." },
      { id: "cc-1-q5", question: "Which format is best for YouTube Shorts and TikTok?", options: ["Vertical 9:16", "Square only", "Landscape 21:9 only", "A printed PDF"], answer: 0, explanation: "Vertical 9:16 fills mobile screens on TikTok, Reels, Shorts, and status platforms." }
    ]
  },
  "cc-2": {
    questions: [
      { id: "cc-2-q1", question: "What do keyframes create?", options: ["Motion or change over time", "A fixed screenshot", "Only audio noise", "A deleted clip"], answer: 0, explanation: "Keyframes set start and end values so CapCut can animate between them." },
      { id: "cc-2-q2", question: "What is an overlay?", options: ["A layer placed above another clip", "A type of bank payment", "A deleted transition", "A video aspect ratio"], answer: 0, explanation: "Overlays place video, images, text, or graphics above the main clip." },
      { id: "cc-2-q3", question: "What can keyframes control in CapCut?", options: ["Scale, position, rotation, and opacity", "Only file names", "Only comments", "Bank account numbers"], answer: 0, explanation: "Keyframes can animate many properties including position, scale, rotation, opacity, and effects." },
      { id: "cc-2-q4", question: "What does velocity editing change?", options: ["Clip speed over time", "The phone battery", "Canvas DPI", "The font license"], answer: 0, explanation: "Velocity editing speeds up or slows down parts of a clip for rhythm and impact." },
      { id: "cc-2-q5", question: "Why should transitions be controlled?", options: ["They should support the story, not distract", "They must hide all captions", "They replace all editing skill", "They only work in photos"], answer: 0, explanation: "Professional transitions guide the viewer smoothly without overpowering the message." }
    ]
  },
  "sw-1": {
    questions: [
      { id: "sw-1-q1", question: "What color does a sketch turn when it is fully defined?", options: ["Blue", "Red", "Black", "Green"], answer: 2, explanation: "Black sketch geometry means size and position are fully controlled by dimensions and relations." },
      { id: "sw-1-q2", question: "Which relation makes two circles share the same center point?", options: ["Tangent", "Concentric", "Coincident", "Parallel"], answer: 1, explanation: "A concentric relation aligns circular entities around the same center." },
      { id: "sw-1-q3", question: "Why is under-defined blue geometry risky?", options: ["It may move unexpectedly", "It cannot be extruded at all", "It is always hidden", "It means the part is finished"], answer: 0, explanation: "Under-defined geometry can shift when the model updates, causing inaccurate parts." },
      { id: "sw-1-q4", question: "What do Smart Dimensions control?", options: ["Exact sketch size", "Video captions", "Website reviews", "Layer opacity"], answer: 0, explanation: "Smart Dimensions define exact lengths, angles, diameters, and distances in a sketch." },
      { id: "sw-1-q5", question: "Which relation makes a line lie flat from left to right?", options: ["Horizontal", "Concentric", "Tangent", "Pierce"], answer: 0, explanation: "A horizontal relation controls a line so it remains level from left to right." }
    ]
  },
  "sw-2": {
    questions: [
      { id: "sw-2-q1", question: "What does Extrude Boss/Base do?", options: ["Adds depth to a sketch", "Deletes all material", "Changes the file name", "Only adds color"], answer: 0, explanation: "Extrude Boss/Base turns a closed 2D sketch into a 3D solid by adding thickness." },
      { id: "sw-2-q2", question: "Which feature is best for bottle-like circular forms?", options: ["Revolve", "Mirror only", "Text Tool", "Crop"], answer: 0, explanation: "Revolve rotates a profile around an axis, making it ideal for round objects." },
      { id: "sw-2-q3", question: "What does Extrude Cut do?", options: ["Removes material", "Creates captions", "Changes the course price", "Deletes all sketches"], answer: 0, explanation: "Extrude Cut removes material to create holes, slots, pockets, and clearances." },
      { id: "sw-2-q4", question: "What is a fillet used for?", options: ["Rounding edges", "Making passwords", "Cropping videos", "Changing color mode"], answer: 0, explanation: "Fillets round sharp edges to improve appearance, safety, and manufacturability." },
      { id: "sw-2-q5", question: "What is a chamfer?", options: ["An angled edge", "A video transition", "A raster image", "A quiz score"], answer: 0, explanation: "A chamfer creates a flat angled edge instead of a rounded edge." }
    ]
  },
  ...photoshopExpansionQuizzes,
  ...illustratorExpansionQuizzes,
  ...solidworksExpansionQuizzes,
  ...capcutExpansionQuizzes,
  ...checkpointQuizzes,
};

const lessonVisuals: Record<string, Pick<Lesson, "image" | "imageAlt">> = {
  "ps-1": {
    image: "/images/course-photoshop.png",
    imageAlt: "Photoshop workspace and design tools overview",
  },
  "ps-2": {
    image: "/images/course-photoshop.png",
    imageAlt: "Photoshop class project being designed on screen",
  },
  "ps-3": {
    image: "/images/graphic-design.png",
    imageAlt: "Graphic design composition showing image manipulation concepts",
  },
  "ps-4": {
    image: "/images/graphic-design.png",
    imageAlt: "Graphic design project visual for Photoshop retouching and effects practice",
  },
  "ps-5": {
    image: "/images/course-photoshop.png",
    imageAlt: "Photoshop poster and typography design lesson visual",
  },
};

const vibeDesigningKeyPoints: Record<string, string[]> = {
  "vd-1-1": ["UI is the visual/interactive layer; UX is the full journey around it — both must work together", "Product design starts with framing the problem before opening any design tool", "Jakob's Law: users bring expectations from every other product they use, so familiar patterns reduce friction", "Ask who the user is, what job they're hiring the product for, and what business goal a screen serves", "This mindset — problem first, screens second — is the thread running through all five course modules"],
  "vd-1-2": ["Separate the stated symptom from the real underlying problem using techniques like the 5 Whys", "Every feature has both a user goal and a business goal — name them explicitly and watch where they conflict", "Use the problem statement format: [user] needs [need] because [insight], but [obstacle]", "A problem statement should be one or two sentences — if longer, it isn't narrow enough yet", "Validate problems against real signals (tickets, reviews, analytics, quick user conversations) before designing"],
  "vd-1-3": ["Personas are composite, evidence-based profiles — not fictional biographies with invented hobbies", "Every persona trait should trace back to real research: interviews, support data, surveys, or credible secondary sources", "Empathy maps use four quadrants — Says, Thinks, Does, Feels — tied to a specific task, not a whole life", "Says/Does are observable evidence; Thinks/Feels are inferences the team should be able to challenge", "Treat personas as living hypotheses to revise, not fixed stereotypes used to end debate"],
  "vd-1-4": ["Journey maps track stages (Awareness, Onboarding, Usage, Support...), not individual screens", "Each stage records actions, touchpoints, thoughts, and an emotional high/low curve", "The emotional dip points are the most diagnostic — they show exactly where to focus redesign effort", "Mark 'moments of truth' where users decide whether to trust the product", "A finished journey map should output a prioritized friction list that feeds directly into wireframing"],
  "vd-1-5": ["Card sorting (open or closed) reveals how real users naturally group and label content", "Open card sorts surface a user's own mental model; closed sorts validate a structure you've already proposed", "Prefer shallow, broad hierarchies over deep, narrow ones — fewer clicks beats more nested menus", "Labels should match the user's own vocabulary, not internal jargon — verify with tree testing", "A validated site map is the skeleton that screen flows and navigation patterns get built on in Module 2"],
  "vd-1-6": ["Design for the smallest screen first, then progressively enhance upward to tablet and desktop", "Minimum touch targets: roughly 44x44pt (iOS) / 48x48dp (Android) — Fitts's Law explains why size and distance matter", "Thumb zones matter for one-handed use: bottom-of-screen actions are easier to reach than top corners", "Treat performance (image weight, loading states, offline handling) as a real UX feature, not an engineering afterthought", "Mobile-first uses a base layout plus upward breakpoints, rather than shrinking a desktop design down"],
  "vd-1-7": ["A strong checkpoint bundles problem statement, persona/empathy map, journey map, IA sketch, and mobile-context notes into one coherent story", "Check for internal consistency — persona traits, journey behavior, and IA structure must not contradict each other", "Reviewers grade the reasoning behind decisions, not visual polish — there are no screens yet", "Be ready to justify each choice with a specific piece of evidence, not just intuition", "This checkpoint becomes the brief that Module 2's wireframes and flows will be built against"],
  "vd-2-1": ["Sketching trades artistic polish for speed — the goal is generating and discarding ideas fast", "Crazy 8s: eight screen variations in eight minutes forces genuinely different directions, not small tweaks", "Sketch structure and flow only — no color, fonts, or exact spacing at this stage", "Sketch the arrows between screens, not just the screens, to catch flow problems early", "Use dot voting or similar quick group review to select directions, then annotate why before moving to wireframes"],
  "vd-2-2": ["Low fidelity is deliberate: grayscale, placeholder text, and rough shapes keep feedback on structure, not color", "Communicate hierarchy through size and position, not decoration, at this stage", "Showing polished visuals too early triggers surface-level feedback and hides structural problems — the 'fidelity trap'", "Figma's basic shapes and one font weight are enough — the discipline matters more than the tool", "Annotate non-obvious behavior (scrollable areas, disabled states) so intent survives into flow mapping"],
  "vd-2-3": ["A flow diagram connects wireframes with labeled arrows showing the exact action that triggers each transition", "Map the happy path first, then deliberately add edge cases: errors, timeouts, empty states, permission denials", "Branch points (success/failure) need both outcomes drawn, not just the ideal one", "Map realistic entry points (notifications, shared links, search) and graceful exits, not just a fresh app launch", "Use consistent diagram conventions (screens, decision diamonds, labeled arrows) so it's readable without narration"],
  "vd-2-4": ["Bottom tab bars suit a small number of frequent top-level destinations; hamburger menus hide items at the cost of discoverability", "A hybrid tab bar + 'More' tab handles more sections than a tab bar can comfortably fit", "Default toward flatter hierarchies — deep nested navigation gets users lost faster", "Respect iOS/Android platform conventions for navigation and back behavior rather than inventing new patterns", "Always show a clear 'you are here' signal (highlighted tab, breadcrumb, title) per Nielsen's visibility of system status"],
  "vd-2-5": ["Removing unnecessary fields is usually the biggest form improvement — not better styling of existing ones", "Use persistent labels above fields, not placeholder-only text, so context doesn't disappear once typing starts", "Validate on blur or submit, not every keystroke, and write specific, actionable inline error messages", "Match input types to data (numeric keypad, date picker) so the right mobile keyboard appears automatically", "Design distinct empty, focused, filled, error, disabled, and loading states — don't leave them to defaults"],
  "vd-2-6": ["Design loading, empty, success, and error states on purpose for every data-dependent screen", "A blank or frozen screen with no explanation reads as broken even when the app is technically fine", "Write specific, blame-free error messages with a concrete next step, not generic codes or vague banners", "Treat empty states as onboarding opportunities — explain the feature's value and offer a clear first action", "Match feedback mechanism to severity: toasts for minor confirmations, banners for must-act issues, inline for form errors"],
  "vd-2-7": ["A submission needs a full flow diagram, matching low-fi wireframes, a justified navigation choice, and designed form/feedback states", "Run a cold walkthrough with someone unfamiliar with the project — their hesitations reveal real structural gaps", "Tie every structural decision explicitly back to Module 1 research, not aesthetic preference", "Reviewers grade whether structure serves the defined problem, not resemblance to an admired app", "Stay in low fidelity — adding color or polish now hides remaining structural problems from reviewers"],
  "vd-3-1": ["Define a limited type scale (a handful of sizes on a consistent ratio) rather than sizing text by eye", "Hierarchy comes from size, weight, and color together, not size alone", "Body text reads best around 1.4-1.6x line height and roughly 45-75 characters per line", "One or two well-contrasted typefaces are usually enough — avoid similar-looking font pairs", "Keep mobile body text at 16px+ to avoid auto-zoom issues and preserve legibility"],
  "vd-3-2": ["Build a palette with clear roles: primary, accent, neutral gray scale, and semantic success/warning/error colors", "WCAG 2.2 AA requires 4.5:1 contrast for normal text, 3:1 for large text and UI components — verify with a checker", "Never use color as the only signal for meaning — pair it with icons or text for color-blind accessibility", "Each color should have a range of tints/shades (e.g. numbered 100-900 steps) for consistent reuse across states", "Dark mode needs remapped colors (off-white on dark gray, desaturated accents), not a simple color inversion"],
  "vd-3-3": ["Use a spacing scale built from a base unit (commonly 4px or 8px) and its multiples, not arbitrary values", "Layout grids (e.g. 4 columns/mobile, 12 columns/desktop) with defined gutters and margins give consistent structure", "White space is a design tool — it groups and separates elements via the Gestalt principle of proximity", "Figma's Layout Grid overlays a grid on a frame so alignment can be checked while designing", "Auto Layout enforces spacing values automatically, preventing spacing drift as a project scales across screens"],
  "vd-3-4": ["Establish a clear button hierarchy: one primary action per screen, secondary and tertiary for everything else", "Two primary-style buttons on one screen undermines hierarchy and slows decisions (Hick's Law)", "Use Figma Variants to group component states (default, hover, pressed, disabled) into one manageable component set", "Interactive Components let prototypes demonstrate real hover/press behavior, not just static states", "Build components with Auto Layout so they resize gracefully when real copy replaces placeholder text"],
  "vd-3-5": ["Cards suit visually distinct, browsable content; lists suit dense linear scanning; tables suit structured, comparable data", "Test every card/list/table with worst-case content: long titles, missing images, large numbers", "Row density is a real trade-off between scannability and how much fits on screen — match it to platform and task", "Touch target sizing (Fitts's Law) still applies inside dense list and table rows on mobile", "Collections need their own empty state, loading skeleton, and a deliberate overflow strategy (pagination, infinite scroll, show more)"],
  "vd-3-6": ["Breakpoints are deliberate layout-change points, chosen from where content actually breaks, not copied generically", "Decide per breakpoint what structurally changes: columns, navigation pattern, image sizing, visible content", "Mix fluid elements (text columns, card grids) with fixed ones (touch targets, base font size, max line length)", "Use Auto Layout plus constraints, and separate frames per breakpoint, to show intentional structural change in Figma", "Keep the mobile-priority content most prominent at every breakpoint — extra desktop space isn't an invitation for clutter"],
  "vd-3-7": ["Judge the submission on consistency across the whole flow, not the quality of a single hero screen", "Include a documented type scale, color palette with roles, and spacing scale applied consistently", "Run real color pairings through a WCAG contrast checker (4.5:1 normal text, 3:1 large text/UI) before calling it done", "Confirm no meaning relies on color alone anywhere in the flow", "Clean component structure (real Variants, Auto Layout, consistent naming) now to avoid friction in Module 4 prototyping"],
  "vd-4-1": ["Organize files with Pages and Sections, and name every frame descriptively — names surface later in prototypes and handoff", "Define color/text Styles or Variables once and apply them everywhere, rather than repeating raw values per screen", "Publish a shared Library for multi-file or team projects to keep components and styles in sync", "Use Figma's device frame presets matching your Lesson 3-6 breakpoints, arranged in the order a user experiences them", "Name key version history milestones so you can return to a known-good state as the file grows"],
  "vd-4-2": ["Main components are the editable source (purple diamond icon); instances are linked copies that update automatically", "Editing an instance directly overrides just that copy — useful for exceptions, risky if done accidentally at scale", "Use Variants to group related states/sizes into one component set, selectable from a single dropdown", "Component Properties (text, boolean, instance swap) let others customize a component without digging into its layers", "Clean, well-named components now are what make Auto Layout and interactive prototyping actually work well later"],
  "vd-4-3": ["Auto Layout frames stack children with a direction, gap, padding, and alignment, behaving like CSS Flexbox", "Per-child resizing (Fixed, Hug contents, Fill container) determines how elements handle real, variable-length content", "Nesting Auto Layout frames inside each other keeps complex layouts responsive at every level, not just the outer frame", "Auto Layout is the mechanism that actually enforces the spacing scale from Lesson 3-3, not just a visual convenience", "Combining Auto Layout with Variables lets a single spacing change propagate through nested frames like real design tokens"],
  "vd-4-4": ["Connections are defined by a trigger (click, hover, drag...), an action (navigate, open overlay, swap variant...), and a transition", "Smart Animate automatically animates matching layers between frames — the basis for realistic button and tab interactions", "Overlays handle modals, menus, and bottom sheets without full-screen navigation, with configurable outside-click-to-close", "Interactive Components let a single component demonstrate its own state changes inside the prototype", "Wire up the full flow including error paths from your Lesson 2-3 map, not just the happy path — test it in Present mode"],
  "vd-4-5": ["Microcopy is a UI material like color or spacing — specific, user-vocabulary wording beats generic system language", "Button labels should describe the actual outcome of the action, not just a generic verb like 'Confirm'", "Write real final copy for loading, success, error, and empty states — don't leave prototypes with Lorem ipsum", "A strong empty state answers: what belongs here, why it's empty, and what to do next", "Use locally appropriate formatting (KSh currency, local phone/date formats) and keep sentences simple for future localization"],
  "vd-4-6": ["Write task scenarios as goals ('send KSh 500 to a friend'), not step-by-step instructions, to test real discoverability", "Around 5 participants typically surface most major usability problems — enough for a realistic student project", "Use think-aloud moderated testing with a Present-mode Figma link, observing without helping mid-task", "Record completion, time, wrong turns, and direct participant quotes — not just a paraphrased summary", "Prioritize fixes by severity and frequency, then retest the changed flow rather than treating testing as a one-off event"],
  "vd-4-7": ["Submit a cleanly organized file, real Variants/Auto Layout components, and a fully wired prototype with error paths included", "Replace all placeholder microcopy with final, specific text before this checkpoint", "Include a usability test summary (3+ participants) showing findings and the changes made in response", "Send only the Present-mode link for a cold-share test — no narration — to check real discoverability", "Start capturing before/after screenshots and decision reasoning now to make Module 5's case study easier to write"],
  "vd-5-1": ["A strong brief names a specific product, context, and user — not a vague or overly broad category", "Choose a brief with enough real-world complexity to require genuine trade-offs, not a trivially simple screen", "Good sources: a real personal frustration, a local business that would benefit, or a specific weak flow in an existing product", "Scope to roughly 5-8 core screens covering one complete flow, designed deeply, rather than a whole app designed shallowly", "Write an explicit scope statement naming what's in and out of scope — that judgment call is itself worth showing later"],
  "vd-5-2": ["Use an honest, representative 'before' — not a cherry-picked worst-case screenshot of the original", "If there's no existing product, your own early Module 2 wireframes can serve as a legitimate 'before'", "Caption each change with the specific problem it solved and the evidence behind it, not vague adjectives", "Report real before/after usability numbers (completion rate, time, errors) where available; be honest if it's qualitative only", "Present before/after screens at matching scale and cropping so the visual comparison is genuinely fair"],
  "vd-5-3": ["Structure the case study as Context, Problem, Process, Solution, Outcome/Reflection — not a screen gallery with captions", "Skipping the Process section is the most common weakness — it hides the reasoning behind the final screens", "Show at least one rejected direction and why it changed — it builds more credibility than a suspiciously perfect result", "Lead each section with its most important sentence; a skimming reviewer reads openings closely and skims the rest", "Alternate text and visuals so reasoning and the screen it refers to sit close together"],
  "vd-5-4": ["Choose export format deliberately: PNG for lossless UI screenshots, JPG for photos, SVG for icons/logos, PDF for print", "Avoid JPG for flat-color UI screens — compression artifacts show clearly around sharp edges and text", "Export at 2x or 3x scale for portfolio and web use, since 1x looks soft on modern high-density displays", "Use Figma's Dev Mode to inspect exact spacing, colors, and code snippets for any real developer handoff", "Name exported files clearly and consistently — it pays off directly when assembling the presentation deck"],
  "vd-5-5": ["A deck supports live presentation — dense, text-heavy slides work against a spoken narrative, not with it", "Mirror the case study structure (Context, Problem, Process, Solution, Outcome) but compress to roughly 10-15 slides", "Apply Module 3's typography, spacing, and hierarchy principles directly to slide design", "Size screens large enough to read live — spread a flow across multiple slides rather than cramming it onto one", "Figma Slides can pull directly from your existing screens/components, keeping visual consistency without re-exporting"],
  "vd-5-6": ["Bring 2-4 specific questions to a review rather than a vague 'what do you think' request", "Lead with the problem in the first 30 seconds so reviewers evaluate everything that follows with the right context", "Fully understand a piece of critical feedback before defending against it — resist reacting immediately", "Not all feedback should be applied — weigh it against your actual problem statement and user", "Document both the feedback you incorporated and what you consciously rejected, and why, in your reflection"],
  "vd-5-7": ["This checkpoint is judged as a finished professional artifact, not a class assignment — CV/portfolio ready", "Include brief, before/after, full written case study, presentation deck, and a reflection covering accepted and declined feedback", "Trace an explicit thread from Module 1's problem statement through to the final Module 3-5 design and flow", "Check exported assets, proofread the full case study, and time your deck presentation before submitting", "Treat this as a living document — update it and be ready to defend the reasoning behind every decision in an interview"],
};

const vibeCodingKeyPoints: Record<string, string[]> = {
  "vc-1-1": ["A URL request travels through DNS lookup, HTTP request/response, then DOM and CSSOM construction before anything appears on screen", "HTTP methods (GET, POST) and status codes (200, 404, 500) describe what a request wants and what happened", "HTTPS encrypts the client-server conversation using TLS", "The browser builds the DOM from HTML and the CSSOM from CSS, then merges them into a render tree to paint the page", "Client-side work (browser) and server-side work (server) are distinct, and frameworks like Next.js let you choose which runs where", "Browser DevTools' Network and Performance tabs make this whole pipeline visible for debugging"],
  "vc-1-2": ["Every HTML document needs <!DOCTYPE html>, a <head> for metadata, and a <body> for visible content", "meta charset=\"UTF-8\" and the viewport meta tag are essential first lines inside <head>", "Tags must open, nest, and close correctly, a broken structure causes downstream CSS and JS bugs", "Attributes (href, src, alt, class, id) live inside opening tags and carry extra information or hooks", "Void elements like img, br, and input never need a closing tag", "Clean markup is the foundation that CSS, JavaScript, and accessibility tools all depend on"],
  "vc-1-3": ["Semantic elements (header, nav, main, section, article, aside, footer) describe meaning, not just appearance", "Use exactly one main per page, and nest headings h1 through h6 in logical order without skipping levels for styling", "strong and em carry semantic importance and emphasis, unlike purely visual bold or italic styling", "div and span are correct when an element has no semantic meaning, such as a layout wrapper", "Screen readers use landmarks and headings to let users skim and jump around a page", "Search engines weigh content inside semantic elements like main and article more heavily for SEO"],
  "vc-1-4": ["Class selectors (.card) are reusable and preferred for styling, IDs (#header) are best reserved for JS hooks", "Combinators (space, >, +, ~) target elements based on their relationship in the document", "Pseudo-classes like :hover, :focus-visible, and :nth-child target state or position without extra markup", "::before and ::after insert generated content without adding new HTML elements", "Specificity determines which conflicting rule wins: inline > ID > class > type, with later rules breaking ties", "Keep specificity low and consistent by favoring classes and avoiding !important"],
  "vc-1-5": ["Every element is content, padding, border, and margin, nested from the inside out", "box-sizing: border-box makes width and height include padding and border, avoiding surprise overflow", "Applying * { box-sizing: border-box; } globally is standard practice in modern CSS", "Vertical margins between block elements can collapse to the larger value, but not inside flex or grid containers", "Padding, margin, and border all accept shorthand syntax (1, 2, or 4 values)", "DevTools' box model diagram is the fastest way to debug unexpected spacing"],
  "vc-1-6": ["px is absolute and ignores user zoom/font preferences, rem is relative to the root font size and scales predictably", "em compounds with nesting because it is relative to the parent, which can cause unpredictable sizing", "vw and vh are percentages of the viewport, powerful for fluid sections but risky alone for font sizes", "clamp(min, preferred, max) sets a fluid value with hard minimum and maximum bounds in one declaration", "Combining rem with vw inside clamp() preserves browser zoom accessibility, unlike vw alone", "Default to rem for text/spacing, percentages for flexible widths, and clamp() to avoid abrupt breakpoint jumps"],
  "vc-1-7": ["A strong checkpoint page combines semantic landmarks, a logical heading outline, class-based selectors, and border-box sizing", "The viewport meta tag and alt text on images are the two most commonly forgotten items", "Self-review by reading the HTML outline without CSS, and by resizing the browser to check for overflow", "Habits locked in now (border-box, semantic tags, rem units) carry forward directly into flexbox and grid work", "Being able to explain your structural choices matters as much as the code itself for a portfolio submission"],
  "vc-2-1": ["display: flex creates a flex container; flex-direction sets the main axis as row or column", "justify-content aligns items along the main axis, align-items aligns along the cross axis", "flex: 1 makes an item grow to share available space equally with sibling flex items", "flex-wrap: wrap combined with gap is the standard way to build a wrapping row of items", "align-self overrides align-items for one specific item", "Flexbox is for one-dimensional layouts (a single row or column); use Grid for two-dimensional layouts"],
  "vc-2-2": ["display: grid plus grid-template-columns/rows defines a two-dimensional track layout", "The fr unit distributes remaining space proportionally between tracks", "repeat(auto-fit, minmax(200px, 1fr)) builds a responsive card grid with no media queries", "gap sets spacing between tracks cleanly, without margin-collapsing issues", "grid-column: span 2 and grid-template-areas control item placement and readable page shells", "Use Grid for two-dimensional layouts, flexbox for one-dimensional groupings, often nested together"],
  "vc-2-3": ["Wrap navigation in a <nav> element with a <ul> of links, not bare <a> tags side by side", "justify-content: space-between plus align-items: center is the standard flex pattern for logo-plus-links", "position: sticky with top: 0 keeps a nav bar visible on scroll without the jump issues of fixed", "Mobile nav toggles must be real <button> elements with an accessible label and aria-expanded state", "aria-current=\"page\" marks the active link for both sighted and assistive-technology users", "Every link needs a visible :focus-visible style for keyboard navigation"],
  "vc-2-4": ["A max-width wrapper with margin-inline: auto keeps hero text from stretching uncomfortably wide on large screens", "background-size: cover with an overlay gradient keeps text legible over background images", "Consistent section padding (often via a CSS custom property) gives a page visual rhythm", "Two-column hero layouts commonly stack to one column on mobile via a media query changing flex-direction or grid-template-columns", "clamp()-based heading sizes scale smoothly instead of jumping at breakpoints", "A hero's real job is fast communication: clear message, readable contrast, and an obvious call-to-action"],
  "vc-2-5": ["Use <article> for cards, since each one is a self-contained piece of repeated content", "display: flex with flex-direction: column and flex: 1 on the content area keeps card footers aligned across a row", "grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) builds a responsive card grid without media queries", "aspect-ratio combined with object-fit: cover keeps card images uniform without distortion", "Reserve card grids for visually grouped content; use ul/ol for sequential text content", "list-style: none resets a semantic list's appearance while keeping its meaning for assistive technology"],
  "vc-2-6": ["Drag the DevTools viewport width freely rather than only testing fixed device presets", "Unexpected horizontal scroll is usually a fixed-width element, an unconstrained image, long text, or negative margins", "A temporary red outline on all elements quickly reveals which one is causing overflow", "Check the DevTools box model panel for computed width, padding, and margin once the culprit is found", "Mobile-first CSS (base styles plus min-width media queries) produces fewer bugs than desktop-first overrides", "Test at higher browser zoom and with network throttling, not just on a fast desktop connection"],
  "vc-2-7": ["A strong submission combines a flexbox nav, a constrained hero, and an auto-fit grid of cards with consistent section spacing", "Test continuously across the full width range, not just at a couple of fixed breakpoints", "Uneven card alignment usually traces back to a missing flex-direction: column plus flex: 1 pattern", "Layout technique (flex/grid) and semantic HTML underneath it are not in conflict, keep both", "Keyboard tab order and focus visibility on the nav bar are part of a complete review, not optional extras", "Being able to narrate a layout decision and a debugging fix matters for how the work is evaluated"],
  "vc-3-1": ["Use const by default and let only when a variable genuinely needs to be reassigned; avoid var", "const prevents reassigning the variable itself but does not make objects or arrays immutable", "JavaScript's primitive types are string, number, boolean, undefined, and null", "Template literals (backticks with ${}) are the modern way to build dynamic strings", "Type coercion with + and - can produce surprising results across strings and numbers", "Always use === and !== (strict equality) instead of == and != to avoid coercion bugs"],
  "vc-3-2": ["Arrow functions are the common modern syntax and, unlike regular functions, don't create their own this binding", "Default parameters provide fallback values when an argument is omitted; a function with no return gives undefined", "let and const are block-scoped to the nearest {}, while var is function-scoped and can leak out of blocks", "A closure is a function that retains access to variables from its defining scope even after that scope has finished executing", "Closures explain common patterns in event handlers and, later, React hooks", "Small, well-named functions with clear inputs and outputs are the same discipline React components are built on"],
  "vc-3-3": ["querySelector and querySelectorAll accept any CSS selector, making them the standard modern DOM selection tools", "querySelectorAll returns a NodeList, which supports forEach but needs Array.from() for map/filter", "textContent sets plain text safely; innerHTML inserts markup but is risky with untrusted user input", "classList.add/remove/toggle/contains is the standard way to change styling via classes from JavaScript", "closest(selector) walks up the DOM tree to find the nearest matching ancestor element", "Run selection code after the DOM has parsed, via script placement or a DOMContentLoaded listener"],
  "vc-3-4": ["addEventListener is preferred over inline onclick attributes because it separates behavior from markup", "event.preventDefault() stops a form's default full-page-reload submission so JavaScript can handle it instead", "Event delegation (one listener on a parent, checking event.target) is efficient and works for dynamically added elements", "input fires on every keystroke, change fires once a control's value is committed, submit fires on form submission", "Every input needs an associated label, via wrapping or a matching for/id pair, for accessibility and usability", "Native HTML validation attributes (required, type=\"email\", pattern) should be the first line of defense before custom JS validation"],
  "vc-3-5": ["Arrays are ordered, index-based lists; objects store data under named keys accessed via dot or bracket notation", "map() transforms each item into a new array, filter() keeps items passing a test, reduce() collapses to a single value", "push(), pop(), and splice() mutate an array in place; slice() and the spread operator create a new array instead", "Destructuring ({ name, age } = user) extracts values into variables in one concise line", "The spread operator ({...obj, key: value}) is the standard pattern for immutable updates", "Producing new arrays/objects instead of mutating in place matters because React detects changes by reference"],
  "vc-3-6": ["localStorage.setItem/getItem/removeItem/clear persist string data on the user's device across sessions", "localStorage only stores strings, so objects and arrays must go through JSON.stringify() and JSON.parse()", "getItem returns null for missing keys; always guard against null and wrap JSON.parse in try/catch", "sessionStorage shares the same API but clears when the browser tab closes, unlike localStorage", "Storage is limited (roughly 5-10MB) and scoped per-browser/per-device, not synced to a user account", "Wrapping storage logic in small save/load helper functions keeps JSON conversion out of the rest of the app"],
  "vc-3-7": ["Keep a single source of truth in an array/object and re-render from it, rather than reading state back out of the DOM", "Use event.preventDefault() on form submissions and defensive JSON.parse when restoring from localStorage", "Prefer array methods (map, filter, spread) that produce new data over in-place mutation like push/splice", "Trace one full user action end-to-end: event, data update, re-render, persistence", "Test refresh behavior and edge cases (empty input, first visit with no stored data)", "This data-driven render pattern is the direct precursor to React's state and JSX model in Module 4"],
  "vc-4-1": ["React is declarative: you describe the UI for a given state, and React updates the DOM to match, rather than manually manipulating elements", "JSX embeds HTML-like syntax inside JavaScript and compiles to function calls, not real HTML strings", "JSX uses className instead of class and camelCase event handlers like onClick", "A React component is a JavaScript function, capitalized by convention, that returns JSX", "Components compose by nesting inside one another to build complex UIs from small pieces", "React's virtual DOM lets it update only the real DOM nodes that actually changed between renders"],
  "vc-4-2": ["Props pass data from a parent component into a child, similar to HTML attributes", "Destructuring props directly in the function signature is the standard modern style", "Props are read-only and flow one-way, parent to child, never modified by the child that receives them", "The children prop represents nested JSX content, enabling reusable wrapper components", "Default prop values can be set directly in the destructured function signature", "A well-designed component asks only for the props it needs and stays focused on one responsibility"],
  "vc-4-3": ["useState(initialValue) returns a [value, setter] pair; calling the setter both updates state and triggers a re-render", "Pass a function reference to event props (onClick={handleClick}), not a function call (onClick={handleClick()})", "Use the functional updater form (setCount(prev => prev + 1)) when new state depends on previous state", "State that holds an object or array must be updated immutably via spread, never mutated in place", "State is scoped per component instance, so separate instances of a component have independent state", "Updating state and letting JSX re-render replaces the manual DOM-finding-and-updating pattern from vanilla JavaScript"],
  "vc-4-4": ["Use array.map() to transform data into a list of JSX elements, typically nested inside a container like ul", "Every item in a rendered list needs a unique, stable key prop so React can correctly track additions, removals, and reorders", "Prefer a real data ID as the key; using the array index is only safe for lists that never reorder or filter", "Chain filter() before map() to conditionally render a subset of a list, same as plain JavaScript array methods", "Always handle the empty-array case explicitly with a clear message rather than rendering nothing", "Getting keys wrong causes state to attach to the wrong row, a subtle and common React bug"],
  "vc-4-5": ["Controlled inputs set value from state and update that state via onChange on every keystroke", "A single state object with a generic onChange handler, keyed by the input's name attribute, scales cleanly to many fields", "Call event.preventDefault() in onSubmit, then work directly with existing state rather than reading the DOM", "Store validation errors in their own state and render them conditionally near the relevant field", "Controlled components keep React state as the single source of truth for what the user has entered", "Uncontrolled inputs (via refs) exist for simple or non-React-integrated cases but are not the default pattern"],
  "vc-4-6": ["className applies CSS classes in JSX exactly as class does in HTML, since class is a reserved JavaScript word", "CSS Modules (.module.css) automatically scope class names per component, avoiding global naming collisions", "Import a CSS Module as an object and apply classes via styles.className", "Conditional classes are commonly built with template literals or a small class-joining utility", "The style prop takes a camelCased JS object and suits runtime-computed values, but cannot use :hover or media queries", "Next.js supports CSS Modules out of the box, making them a natural default going into Module 5"],
  "vc-4-7": ["State should live in the closest common parent of every component that needs to read or update it", "Components should be split by responsibility, with data and callbacks passed down as props rather than components reaching into shared state directly", "Every list needs stable, unique keys; every input should be a controlled component backed by state", "Trace one piece of state end-to-end: declaration, prop passing, and the handler that updates it", "Test list operations (filter, sort, remove) specifically for key-related state bugs", "This component architecture carries directly into Next.js pages and layouts starting in Module 5"],
  "vc-5-1": ["This course uses the App Router (the app/ directory), the current standard since Next.js 13, not the older Pages Router", "A page.tsx file inside an app/ folder makes that folder's path a real route; folders like [slug] create dynamic routes", "Every component is a Server Component by default, rendering on the server with no added client JavaScript bundle", "The \"use client\" directive at the top of a file opts that component into browser rendering and interactivity (useState, event handlers)", "Reserved filenames like layout.tsx, loading.tsx, and error.tsx have automatic, built-in meaning per folder", "Default to server components and add \"use client\" only where interactivity is genuinely required"],
  "vc-5-2": ["app/layout.tsx is the required root layout and is the only layout that renders <html> and <body>", "Any folder can have its own layout.tsx, nesting inside parent layouts and wrapping only pages within that folder", "Layouts receive a children prop and persist across navigations within their scope, preserving state and scroll position", "Next.js composes every layout from root to route automatically based on folder structure, with page.tsx rendered innermost", "A folder name in parentheses, like (dashboard), creates a route group that organizes files and layouts without affecting the URL", "Shared UI defined once in a layout avoids duplicating it across every individual page"],
  "vc-5-3": ["The Link component from next/link enables fast client-side navigation with automatic background prefetching", "Plain <a> tags still work for internal links but force a full page reload, losing prefetching benefits", "useRouter (from next/navigation) enables programmatic navigation, such as redirecting after a form submission", "usePathname (from next/navigation) reads the current route, used to highlight the active link in a nav bar", "App Router hooks import from next/navigation, not the older next/router used by the Pages Router", "Client-side navigation swaps only the changed content, keeping shared layout UI like nav bars mounted across page changes"],
  "vc-5-4": ["The Image component (next/image) automatically resizes, converts formats, lazy-loads, and reserves layout space for images", "alt text is still required and just as important with Image as with plain HTML img, Next.js optimizes delivery, not accessibility", "Local imported images get automatic width/height; remote images need manual dimensions and an allowed domain in config", "Static files needing a stable URL (favicons, downloads) go in the public/ folder, served from the root path", "next/font self-hosts and preloads fonts automatically, avoiding layout shift from external font requests", "Unoptimized images are a major cause of slow page loads, and Next.js handles much of this automatically"],
  "vc-5-5": ["loading.tsx automatically shows while a route segment's data is loading, via an automatic Suspense boundary Next.js sets up for you", "error.tsx automatically catches runtime errors in its segment and must be a client component (\"use client\")", "The error component receives an error object and a reset function, commonly used for a \"Try again\" button", "Both files are scoped per route segment, so different parts of a page can load or fail independently", "This file-based approach replaces a large amount of manual isLoading state and try/catch boilerplate", "loading.tsx and error.tsx are two of the App Router's reserved filenames with automatic, built-in behavior"],
  "vc-5-6": ["Exporting a metadata object from page.tsx or layout.tsx lets Next.js automatically build the correct <head> tags", "generateMetadata is an async function used when metadata depends on runtime data, like a specific post's title", "Metadata from a layout applies to nested pages unless overridden, following the same nesting as layouts", "A title template in a layout combines with each page's own title for consistent branding across tabs", "The openGraph field controls how a page's preview looks when shared on social and messaging platforms", "Accurate, code-managed metadata directly affects search visibility and how professional a shared link looks"],
  "vc-5-7": ["A strong submission uses Link for internal navigation, a dynamic route, loading.tsx/error.tsx, Image with alt text, and per-page metadata", "error.tsx must include \"use client\" or the error boundary will not work", "Page-specific UI belongs in the page component, not the root layout, or it will incorrectly persist across routes", "Test loading.tsx under throttled network conditions and error.tsx by intentionally triggering a failure", "Verify each page has a unique, descriptive browser tab title rather than generic defaults", "API routes and real data fetching in Module 6 build directly on this same app/ file structure"],
  "vc-6-1": ["HTTP methods signal intent: GET reads, POST creates, PUT/PATCH update, DELETE removes", "Status code ranges indicate outcome at a glance: 2xx success, 4xx client error, 5xx server error", "Checking the status code first is the fastest way to narrow down whether a bug is in the request or the server", "The Content-Type header (commonly application/json) tells the receiver how to interpret the request or response body", "JSON syntax requires double-quoted keys, no trailing commas, and only string/number/boolean/null/object/array values", "JSON.stringify() and JSON.parse() convert between JavaScript values and JSON text for both storage and network requests"],
  "vc-6-2": ["fetch() resolves successfully even for 404/500 responses, so response.ok must be checked before trusting the result", "await response.json() parses the response body, and typically requires its own separate await", "async/await is the standard modern syntax; errors from awaited Promises are caught with try/catch", "Async server components can await fetch() directly in the component body with no useEffect needed", "Client components fetch inside useEffect, storing results in useState and tracking loading/error state explicitly", "Prefer fetching in server components by default; use client-side fetching for data driven by post-load user interaction"],
  "vc-6-3": ["A route.ts file inside app/ defines an API endpoint at that folder's URL path, with no separate backend server needed", "Export async functions named GET, POST, PUT, DELETE etc. to handle each HTTP method at that route", "NextResponse.json(data, { status }) returns a properly formatted JSON response with the correct status code", "await request.json() reads a POST/PUT request's body; searchParams reads GET query string values from the URL", "Bracketed folder names ([id]) create dynamic API routes, exactly like dynamic page routes", "API routes let a Next.js app own its backend logic in the same codebase, making it a full-stack framework"],
  "vc-6-4": ["Submitting a form sends the current state as a JSON body via fetch, with Content-Type: application/json explicitly set", "Track an isSubmitting state to disable the button and prevent duplicate submissions while a request is in flight", "Check response.ok to branch between a success state (clear/confirm/redirect) and an error state (show the server's message)", "Wrap the request in try/catch to handle genuine network failures separately from server-returned error responses", "Pessimistic updates (wait for server confirmation) are the safer default versus optimistic updates that roll back on failure", "Next.js Server Actions (\"use server\") are an alternative to manual fetch calls, worth knowing about though not the course's default pattern"],
  "vc-6-5": ["Client-side validation improves user experience but can always be bypassed; the server must independently validate everything", "API routes should check required fields, types, and formats before further processing, returning early on failure", "Invalid input should return a 400 status with a clear JSON error message describing exactly what was wrong", "A consistent error response shape across all API routes makes client-side error handling predictable", "Wrap core route logic in try/catch, returning a generic 500 to the client while logging full details server-side", "Never expose raw stack traces or internal error details to the client; surface specific, human-readable messages instead"],
  "vc-6-6": ["localStorage is device-specific and does not survive a cleared cache or a switch to a different device", "Real progress persistence sends data to an API route, which validates it and writes it to a database tied to the user's account", "Update only the specific field that changed (like one completed lesson) rather than overwriting an entire progress record", "Failed save operations should be retried or clearly surfaced as errors, never silently dropped", "Debouncing frequent updates or showing a lightweight \"saving...\" indicator keeps the UI responsive without sacrificing reliability", "Saving progress is a write operation where correctness directly affects user trust, unlike lower-stakes read-only fetching"],
  "vc-6-7": ["A strong submission has server-side validation independent of client checks, proper status codes, and a consistent JSON error shape", "The client form tracks isSubmitting, disables itself during requests, and shows distinct success versus specific-failure feedback", "Test the happy path first, then deliberately test empty fields, malformed data, and simulated network failure", "Confirm saved data is genuinely retrievable after a refresh, not just reflected in local component state", "Common gaps: skipping server validation, not checking response.ok, missing Content-Type headers, allowing duplicate submits", "Module 7's polish work builds directly on refining this same form and data-loading feature, not introducing a new one"],
  "vc-7-1": ["Real semantic elements (button, nav, etc.) come with built-in keyboard support and screen reader behavior for free", "Meaningful images need descriptive alt text; purely decorative images should use alt=\"\" to be skipped by screen readers", "Icon-only buttons need an aria-label since the icon alone conveys nothing to a screen reader", "WCAG recommends a minimum 4.5:1 contrast ratio for normal text, 3:1 for large text", "Never convey information (like a form error) through color alone; pair it with visible text", "Most accessibility comes from applying Module 1's semantic HTML habits consistently, not from a separate add-on step"],
  "vc-7-2": ["Interactive elements are focusable and tab-reachable in the order they appear in the HTML, favoring logical markup order", "tabindex=\"0\" adds a custom element to the natural tab order; positive tabindex values should generally be avoided", ":focus-visible shows a focus ring specifically for keyboard interaction, and removing it with no replacement is a serious accessibility mistake", "A skip link, hidden until focused, lets keyboard users bypass repeated navigation and jump to main content", "Opening dynamic UI like a modal should move focus into it, and closing it should return focus to the trigger element", "Testing with the mouse unplugged, using only Tab/Shift+Tab/Enter/Space, is the fastest honest accessibility check"],
  "vc-7-3": ["Core Web Vitals measure real-world performance: LCP (loading, target under 2.5s), CLS (visual stability, target under 0.1), INP (interaction responsiveness)", "Lighthouse in browser DevTools runs an automated performance, accessibility, and SEO audit with specific recommendations", "Network tab throttling (e.g. Slow 4G) reveals how a page behaves for users without a fast connection", "Common culprits: unoptimized images, render-blocking scripts, excessive third-party scripts, and unreserved space causing layout shift", "INP has replaced First Input Delay as the standard responsiveness metric", "Always ground performance claims in a real measurement (Lighthouse, throttled testing), not a subjective impression on ideal hardware"],
  "vc-7-4": ["An empty list or dashboard with no explanatory message is indistinguishable to users from a broken page", "A good empty state explains what's being shown and suggests a next action, not just a blank space", "Distinguish error types (network, permission, not-found) with specific messages rather than one generic error for everything", "Error states should include a recoverable action where possible, like a working \"Try again\" retry button", "Loading, empty, error, and the happy path are the complete set of states any data-dependent UI can be in", "Empty and error states should be styled consistently with the rest of the app, not left as unstyled placeholders"],
  "vc-7-5": ["Touch targets need roughly 44x44 to 48x48 CSS pixels minimum to be reliably tappable, per Apple and Google guidance", "Check that device notches, rounded corners, and the on-screen keyboard don't obscure content, using env(safe-area-inset-*) where relevant", "DevTools device mode is a fast first check but does not fully replicate real touch behavior or on-device performance", "Hover-only interactions like tooltips don't work on touch devices and need a tap-based alternative", "Use appropriate input types (email, tel, number) so mobile browsers show the matching, more convenient keyboard", "Mobile-first testing matters because mobile traffic is often the majority of real users, especially across the Kenyan market"],
  "vc-7-6": ["Remove unused variables, commented-out old code, and leftover console.log statements before considering a project done", "Treat linter warnings (unused variables, missing useEffect dependencies) as real problems to fix, not noise to ignore", "Use clear, descriptive names for variables and functions, and enforce consistent formatting automatically with a tool like Prettier", "Identify and remove unused dependencies and files left over from earlier approaches", "A clean, zero-warning build is a genuinely achievable and meaningful bar for a finished project", "Clean code is directly evaluated during Module 8's deployment and portfolio work, not just the running demo"],
  "vc-7-7": ["Run Lighthouse before and after the polish pass and record the specific score improvement, not a vague impression", "Confirm every core action is keyboard-reachable with visible focus states by testing with the mouse unplugged", "Design deliberate, styled empty and error states rather than leaving them as an afterthought", "Check touch target sizing and layout on an actual mobile viewport or real device, not just DevTools emulation", "Ship a clean, warning-free codebase with no leftover console.log statements or dead code", "This checkpoint is about polishing an existing project, not building something new, directly preparing it for Module 8's deployment work"],
  "vc-8-1": ["The core cycle is git add (stage), git commit -m \"message\" (snapshot), git push (upload to remote)", "Commit frequently in small, logical chunks; a good commit message explains why, not just what changed", "Branches (git checkout -b) allow independent work without touching main until it's ready, typically merged via pull request", "A .gitignore file (covering node_modules, .env, build output) prevents unwanted files from ever being tracked", "Never commit secrets like API keys; once pushed, they remain in project history even after later deletion", "A clean, well-described commit history is itself part of what a portfolio project demonstrates to a reviewer"],
  "vc-8-2": ["Environment variables store configuration and secrets separately from code, avoiding hardcoded values and Git commits", ".env.local holds development environment variables and must be listed in .gitignore so it's never committed", "Only variables prefixed with NEXT_PUBLIC_ are exposed to client-side browser code in Next.js; everything else stays server-only", "Deployment platforms (like Vercel) need the same environment variables configured separately in their project settings", "Accidentally prefixing a sensitive value with NEXT_PUBLIC_ exposes it to every visitor's browser", "Correct environment variable handling is a real security practice, not just a configuration convenience"],
  "vc-8-3": ["Development mode (next dev) prioritizes fast rebuilds and debugging; production mode (next build) prioritizes minified, optimized final output", "Tree-shaking removes unused code during the production build, making the deployed bundle smaller and faster", "A production build surfaces real problems, like TypeScript errors, that the more forgiving dev server can silently tolerate", "next start serves the already-built production output locally, letting you verify it before deploying", "The build output directory (.next) is regenerated on every build and should never be committed to Git", "\"It worked in dev\" is not proof it will work in production; a clean local production build is the honest final check"],
  "vc-8-4": ["Modern platforms (like Vercel) connect directly to a Git repository and auto-detect a Next.js project with no manual server config", "Every push to the production branch automatically triggers a new build and deployment", "Preview deployments give every pull request or branch its own live URL for testing before merging to production", "Environment variables must be configured separately in the deployment platform's settings, a local .env.local has no effect there", "Always verify the actual live URL after deployment rather than trusting a green success status alone", "Automatic Git-connected deployment removes manual steps but also means broken code can reach production quickly if checks are skipped"],
  "vc-8-5": ["A custom domain is connected by configuring DNS records (A or CNAME) to point at the hosting platform, which also handles HTTPS", "robots.txt tells crawlers what they can index; sitemap.xml lists pages to help crawlers discover content, both generatable via Next.js special files", "Every page needs a unique, accurate title and description; generic or duplicate metadata hurts both SEO and shared-link appearance", "A genuinely missing page must return a real 404 status, not a 200 with an error message inside normal-looking content", "Core Web Vitals from Module 7 are themselves a search ranking factor, connecting performance directly to discoverability", "A custom domain plus accurate metadata and good performance is what makes a portfolio project read as genuinely shipped"],
  "vc-8-6": ["A README should open with a clear description, a live demo link, and ideally a screenshot, since first impressions form within seconds", "Setup instructions (clone, install, environment variables, run command) should be tested on a fresh checkout for accuracy", "Documenting key technical decisions and tradeoffs demonstrates the reasoning a reviewer is often specifically trying to assess", "Use clear Markdown headings, bullet points, and code blocks to keep a README scannable rather than a dense wall of text", "List required environment variable names without exposing their actual secret values", "A well-written README turns a working deployed project into something that reads as genuinely professional"],
  "vc-8-7": ["A strong submission has a live deployment, a clean secret-free Git history, correctly configured production environment variables, and accurate metadata", "Verify the deployment platform's environment variables by testing the actual live site, not just trusting a successful build status", "Test the live URL in an incognito window and walk through every core feature as a genuine first-time visitor would", "A README should be read start to finish as if by a stranger, confirming it still accurately explains the finished project", "Common failure: features that work locally but silently break live due to a missing deployment-platform environment variable", "This checkpoint proves you can repeat the full plan-build-connect-polish-ship process independently on future real projects"],
};

const aiPromptKeyPoints: Record<string, string[]> = {
  "ape-1-1": ["AI assistants predict the next likely token, they do not retrieve verified facts from memory", "Fluent, confident writing can still be factually wrong (hallucination)", "The same prompt can produce different answers each time you run it", "An assistant only knows what is in its context window plus its training cutoff", "Vague prompts get filled in with generic guesses, precise prompts narrow the guessing"],
  "ape-1-2": ["Every effective prompt is built from some mix of task, context, constraints, format, and examples", "State the task clearly and early instead of burying it in background text", "Missing context forces the model to default to generic, average answers", "Constraints and format turn a vague draft into something actually usable", "When a prompt underperforms, check it against the five parts to find what is missing"],
  "ape-1-3": ["Assigning a role reshapes tone and vocabulary but does not guarantee accurate expertise", "Give background context inline or as a system-level instruction so it persists", "Naming the audience and purpose sharpens output more than vague quality words like 'professional'", "Long conversations can lose earlier context as the context window fills up", "Strong personas can produce overconfident answers, so pair them with fact-checking"],
  "ape-1-4": ["Without stated constraints, AI defaults to a generic-length, generic-tone answer", "Format constraints like tables or JSON make output usable by other tools directly", "Anchor tone requests with concrete adjectives rather than vague words like 'good'", "Negative constraints (what to avoid) close off unwanted defaults", "Too many or contradictory constraints can actually reduce output quality"],
  "ape-1-5": ["Few-shot prompting shows the model worked examples instead of only describing the goal", "Two to five well-chosen examples is usually more effective than one or many near-duplicates", "Examples work better than adjectives for capturing tone, style, and formatting quirks", "Keep example formatting perfectly consistent, the model copies structure as well as content", "Watch for the model accidentally reusing specific details from your examples in its output"],
  "ape-1-6": ["Decide what 'good' means for the task before judging any AI output", "Run a prompt multiple times, output quality varies between identical runs", "Test prompts against varied and awkward inputs, not just the easiest example", "Change one variable at a time so you know what actually improved the output", "Save working prompts with notes so testing effort turns into a reusable asset"],
  "ape-1-7": ["A strong checkpoint combines all Module 1 skills in one deliberate prompt, not in isolation", "Show the task, context, constraints, format, and examples clearly labeled in your submission", "Justify role and persona choices by audience and purpose, not by habit", "Match constraints and format to a real downstream use, not generic defaults", "Include a short before-and-after showing how testing improved the prompt"],
  "ape-2-1": ["Ask for a large batch of ideas and filter, rather than asking for 'the best' single idea", "Specify platform, cadence, goal, and audience so ideas match the actual format", "Feed in brand voice examples so drafts sound like the brand, not generic marketing copy", "Explicitly request unconventional angles to avoid the most obvious, overused ideas", "Screen AI-generated ideas for originality before adding them to a real content calendar"],
  "ape-2-2": ["Feed raw client notes into a structured brief template rather than asking AI to invent one", "Use AI to translate vague client phrases like 'make it pop' into concrete design directions", "Ask AI what questions to ask the client, this often matters more than the draft brief itself", "Check a tool's data policy before pasting sensitive client details like pricing or unreleased products", "Always verify an AI-drafted brief against the real client conversation before it goes out"],
  "ape-2-3": ["Use the subject, style, composition, lighting, technical-detail formula as a starting structure", "Concrete, specific subjects generate better results than abstract descriptions", "A sharp named style beats vague adjectives like 'beautiful' or 'amazing'", "Specific lighting terms (golden hour, rim lighting, softbox) work more reliably than 'good lighting'", "Image models still struggle with readable text, exact object counts, and precise logos, so check these by hand", "Avoid prompting for a named living artist's style or a real person's likeness without permission"],
  "ape-2-4": ["Specify target length, audience, and what to prioritize when asking for a summary", "Paste the actual source text into the prompt rather than asking AI to summarize from memory", "AI-generated citations can be fabricated even when they look precise and specific", "Verify every specific number, date, or quote against the original source before using it", "Name the intended audience so the summary uses the right tone and technical depth"],
  "ape-2-5": ["Structure drafts as acknowledge, address, and close rather than a vague generic reply", "Feed in brand voice examples so replies do not sound flat or overly corporate", "Always personalize an AI draft with real customer details before sending", "Never let AI commit to a policy, refund, or timeline it was not explicitly given as accurate", "Avoid pasting customer personal details into general-purpose AI tools, use placeholders instead"],
  "ape-2-6": ["A template encodes a well-tested prompt structure so it does not need to be rebuilt each time", "Use clear placeholders so teammates can fill in specifics without editing the prompt itself", "Document each template's purpose, expected inputs, and known limitations", "Version templates over time and keep track of why changes were made", "Leave room for human adjustment so outputs do not all sound identical across many uses"],
  "ape-2-7": ["Build the checkpoint around one coherent, realistic scenario rather than disconnected examples", "Show multiple workflow skills connecting into a real end-to-end process", "Clearly mark where human judgment edited, rejected, or verified an AI draft", "Demonstrate responsible handling of client data and original content", "Include a short reflection on what needed the most iteration and why"],
  "ape-3-1": ["Confident, fluent tone carries no information about whether a claim is actually true", "Hallucination is most common on narrow, technical, recent, or obscure topics", "Models cannot know about events after their training cutoff unless connected to live search", "Watch for oddly specific numbers, unverifiable citations, and quotes attributed to real people", "Treat fact-checking as a required workflow step, not a spot-check for suspicious-looking claims"],
  "ape-3-2": ["AI models absorb biases present in the human-generated text they were trained on", "Watch for stereotyped assumptions about gender, ethnicity, age, and culturally narrow defaults", "Use a repeatable safety checklist rather than an ad hoc read-through", "Diverse reviewers catch assumptions a single reviewer might not notice", "Make bias and safety review a defined pipeline step, not an occasional spot-check"],
  "ape-3-3": ["A library entry needs purpose, expected inputs, an example output, and known limitations, not just raw prompt text", "Categorize prompts by task type or team function so a growing library stays searchable", "Review and version prompts periodically since model updates can change how they perform", "Control who can edit shared prompts to prevent silent quality degradation", "A documented library transfers accumulated lessons, speeding up new team member onboarding"],
  "ape-3-4": ["Map the current real workflow in detail before deciding what to automate", "Keep sensitive, final, or hard-to-reverse decisions human-led even with AI drafting assistance", "Plan a fallback for every automated step in case the AI output is wrong or unusable", "Match tools to tasks and connect AI steps into existing business systems", "Pilot on a small, low-stakes slice of work and measure whether it actually saves time"],
  "ape-3-5": ["Place approval checkpoints before anything client-facing, binding, or hard to reverse", "Give reviewers a specific rubric to check, not a vague 'does this look okay'", "Build an escalation path for cases a reviewer is unsure about", "The human approver is accountable for an AI-assisted output once they sign off on it", "Design approval steps to be fast and focused so they do not erase AI's speed advantage"],
  "ape-3-6": ["Choose a specific, realistic problem rather than a generic 'I can use AI' demo", "Document your prompt system and reasoning, not just the finished output", "Include a concrete before-and-after example showing iteration improved a prompt", "Show explicit evidence of fact-checking, bias review, or a human approval step", "Demonstrated judgment about risk and accuracy is what makes a portfolio piece stand out"],
  "ape-3-7": ["A ready AI system combines tested prompts, defined automation boundaries, approval checkpoints, and a failure plan", "Run through the full readiness checklist: testing, fact-checking, bias review, data handling, documentation, accountability", "Present the system around the real problem and risk it manages, not just the AI technique used", "Build in periodic review since prompts and tools will keep changing after graduation", "The durable skill from this course is the habit of testing, verifying, and reviewing, not any single prompt"],
};

const photoshopExpansionKeyPoints: Record<string, string[]> = {
  "ps-6": ["Hue, saturation, and value are controlled non-destructively via Hue/Saturation adjustment layers.", "Contrast, not font size, is what keeps text legible over a photo or color background.", "Warm colors advance and feel urgent; cool colors recede and feel calm or trustworthy.", "Complementary, analogous, triadic, and monochromatic schemes each create a different emotional effect.", "The 60-30-10 rule keeps a poster palette dominant, secondary, and accent colors from feeling random."],
  "ps-7": ["Consistent margins on all sides prevent a poster from feeling cramped or unfinished.", "The Move tool's alignment and distribute-spacing options make layers line up and space out evenly.", "The rule-of-thirds grid overlay helps place focal points off-center for a more dynamic layout.", "Visual hierarchy means the most important element is largest and highest contrast; supporting details are smaller.", "Fixing a crowded flyer usually means grouping and cutting elements, not shrinking everything."],
  "ps-8": ["Filter > Camera Raw Filter (Ctrl/Cmd+Shift+A) applies RAW-style corrections to any pixel layer.", "Converting a layer to a Smart Object first keeps the Camera Raw Filter edit reopenable and non-destructive.", "Exposure and Contrast should be corrected before color, since wrong exposure skews every later judgment.", "The White Balance eyedropper corrects color casts by clicking a point that should be neutral gray.", "Highlights and Shadows sliders recover blown-out or blocked-up detail without changing overall brightness.", "Sharpening and Noise Reduction pull in opposite directions and should be applied conservatively at 100% zoom."],
  "ps-9": ["Square posts are typically 1080x1080px and stories/status are 1080x1920px, both at 72 DPI for screen.", "Reusing the same swatches and two or three fonts across posts is what makes a set read as a campaign.", "Logo placement and size should stay identical across every format using saved guide positions.", "Story/status formats need key content in the upper two-thirds to avoid UI overlays like captions and reply bars.", "A simple 3-post campaign structure is announcement, benefit/feature, and call-to-action."],
  "ps-10": ["Smart Objects keep mockup artwork embedded and editable instead of flattened into pixels.", "Double-clicking a placeholder Smart Object opens it for editing; saving updates the mockup automatically.", "File > Place Embedded brings artwork in as a Smart Object so transforms stay non-destructive.", "Warp and Puppet Warp bend a design to match folds or curved surfaces; Distort/Perspective match flat angled surfaces.", "Shadow and texture layers set to Multiply or Overlay/Soft Light let surface detail show through the design.", "Delivering both a flattened export and the layered PSD keeps future mockup edits fast."],
  "ps-11": ["Print documents are set up at final physical size with Resolution at 300 pixels/inch, not 72.", "Bleed (about 3mm) extends artwork past the trim edge so no white sliver appears after cutting.", "Safe margin keeps important text and logos a few millimeters inside the trim edge.", "CMYK is the standard color mode for commercial print and has a smaller range than RGB, so colors can shift.", "The Print dialog's Marks & Bleed section adds corner crop marks and bleed for direct printing.", "Press-quality PDF export embeds fonts and keeps 300 DPI for professional handoff to a print shop."],
  "ps-12": ["Matching the direction of light between subject and background is the single biggest factor in a believable composite.", "Contact shadows, set to Multiply blend mode, prevent a subject from looking like it is floating.", "Color Balance or clipped adjustment layers shift a subject's color temperature to match the background's light.", "Distant elements read as further back when pushed slightly cooler, desaturated, and blurred to match depth of field.", "Select and Mask's Decontaminate Colors option removes background color fringe left on a subject's edges."],
  "ps-13": ["A layer mask set to Reveal Selection lets a second image show only through a portrait's silhouette for double exposure.", "The Gradient Tool applied to a mask creates a soft fade instead of a hard-edged blend between images.", "Screen brightens (good for light effects), Multiply darkens (good for texture/grunge), and Overlay/Soft Light add contrast while preserving midtones.", "Texture overlays are typically set to Overlay, Soft Light, or Multiply and have their opacity reduced to stay subtle.", "Curves and Gradient Map adjustment layers stacked above a composite create one cohesive color mood across every element."],
  "ps-14": ["A strong brand poster starts with one defined goal, one final size/DPI decision, and one dominant focal point.", "Composite elements use Lesson 12's lighting-match, contact-shadow, and color-balance techniques to look photographed, not pasted.", "Creative color/texture passes from Lesson 13 (Gradient Map, texture overlays, Screen glows) should support the message, not overpower it.", "Layout follows earlier composition rules: consistent margins, alignment tools, rule-of-thirds, and a 60-30-10 palette.", "Final delivery uses a Smart Object mockup plus correctly prepared exports (300 DPI/CMYK/bleed for print, 72 DPI/RGB for digital) and a retained layered PSD."],
  "ps-15": ["Ask about audience and desired action before asking about colors or style, to avoid solving the wrong problem.", "Competitor and market study reveals visual norms so a designer can deliberately fit in or stand out.", "3-5 reference images build a shared visual language with the client before design work starts.", "A written creative brief should capture the core message, audience, required formats/sizes, brand assets, and deadline.", "Confirming deliverables and revision rounds upfront prevents scope confusion later in the project."],
  "ps-16": ["File > Save As with clear version numbers (v1, v2, FINAL) prevents overwriting earlier drafts.", "The Layer Comps panel stores different layer visibility/position combinations within one file for quick client comparisons.", "Corrections (objectively wrong facts) and preferences (subjective style requests) should be tracked and handled separately.", "A simple running feedback log prevents requests from being lost or repeated across revision rounds.", "The final handover folder should contain only the approved layered PSD, flattened exports, and mockups, clearly named."],
  "ps-17": ["Each portfolio piece should open with the original goal or brief, not just the finished image.", "Including in-progress screenshots (Layers panel, Camera Raw before/after) demonstrates process, not just outcome.", "Before-and-after comparisons are one of the most persuasive formats for photo correction and composite work.", "Presenting work inside consistent Smart Object mockups makes a portfolio feel real-world and cohesive.", "Short captions explaining the brief, a key decision, and the outcome give context an image alone cannot provide."],
};

const illustratorExpansionKeyPoints: Record<string, string[]> = {
  "ai-4": ["Every path can carry a fill and a stroke, both editable from the Toolbar and the Appearance panel", "Stroke weight is set in the Stroke panel, along with cap style (Butt, Round, Projecting) and corner style (Miter, Round, Bevel)", "The Transparency panel controls opacity per object and offers blending modes like Multiply and Screen", "The Appearance panel lists every fill, stroke, and effect on an object as live, editable attributes", "A single path can hold multiple strokes or fills stacked in the Appearance panel for layered effects", "Consistent stroke weight and corner style across all icons is what makes a set look unified"],
  "ai-5": ["Point text suits short labels; area text (click-drag box) wraps paragraphs inside a defined shape", "The Character panel controls font, size, leading, tracking, and kerning; the Paragraph panel controls alignment", "Tight tracking suits bold display headlines; body text needs looser, more even tracking for readability", "Kerning adjusts spacing between specific letter pairs and matters most in custom logotypes", "Type > Create Outlines converts live text to vector paths so it displays correctly without the font installed", "Always keep an editable live-text master file and only outline a duplicate for final delivery"],
  "ai-6": ["The Swatches panel stores reusable colors, gradients, and patterns, and swatches should be named clearly", "A Global Color updates every object using it automatically when the swatch itself is edited", "Tints are percentage variations of a global color's strength, and they update automatically with the base color", "The Gradient panel builds linear or radial color transitions, and gradient stops can use global colors", "Flat color usually reads cleaner than gradients in systemized icon and logo work", "Reusing one master swatch library across files prevents small, inconsistent brand color mismatches"],
  "ai-7": ["Research the brand's name, industry, audience, competitors, and personality words before sketching", "Study competitor logos to avoid similarity and to identify visual conventions the audience expects", "List many possible symbols connected to the brand before committing to drawing any of them", "Rough sketches should test whether a concept works as a simple silhouette at small size", "A logo that only works with fine detail will likely fail at small sizes like a favicon", "Narrow to two or three strong concepts from sketches before starting clean vector work in Illustrator"],
  "ai-8": ["Rebuild the chosen sketch in Illustrator with the Pen Tool and shapes on a grid, rather than tracing it loosely", "The Align panel aligns and distributes objects relative to each other, the artboard, or a chosen key object", "Optical balance can differ from mathematical centering because perception weighs shapes differently", "Flipping a logo horizontally or viewing it small helps catch optical imbalance", "A professional logo must remain legible and distinct in pure black-and-white, since it will appear without color in some contexts", "A final refinement pass checks stroke weight and corner consistency before moving to the brand guide"],
  "ai-9": ["A brand guide documents approved logo versions: full lockup, symbol alone, horizontal, and vertical layouts", "Clear space defines the minimum empty margin around a logo, often measured using a part of the logo itself as a unit", "Color codes must be listed as HEX (web), RGB (digital), and CMYK (print) since color can shift between screen and print", "Approved fonts should be listed by exact name and weight to prevent substitution with similar-looking fonts", "Showing 'do not' examples (stretching, recoloring, rotating) prevents misuse more effectively than only showing correct usage", "Sample applications like business cards or social posts show the brand system working in real, practical context"],
  "ai-10": ["Every icon in a set should share the same stroke weight, set once and reused consistently", "Corner style (sharp, rounded, or a specific radius) should be decided once and applied to all icons", "Icons with identical bounding-box dimensions can still look different sizes; circles often need to extend slightly past square edges to feel equal", "A consistent grid and the Align/Transform panels keep spacing and margins even across an icon set", "All icons should commit to the same level of detail; mixing flat and detailed styles breaks consistency", "Comparing icons side by side at final display size catches inconsistencies that are invisible when zoomed in"],
  "ai-11": ["Establish hierarchy first by deciding the single most important fact and making it visually dominant", "Icons in an infographic should represent ideas instantly and follow the same consistency rules as an icon set", "Bar charts are usually clearer than pie charts for comparing more than three or four categories", "Illustrator's built-in Graph tools (Column, Bar, Pie) generate editable charts from entered data", "Every number needs a label placed close enough that the connection is unambiguous", "Proximity (grouping related icon, number, and label together) helps viewers understand relationships without extra dividers"],
  "ai-12": ["The Pattern Options panel (Object > Pattern > Make) builds a repeating tile with live preview and adjustable Tile Type and spacing", "Elements near a pattern tile's edge must connect visually to the opposite edge to avoid visible seams", "Patterns should use the brand's existing global color swatches so they read as an extension of the brand", "Badges and stickers reuse icon and logo construction skills but serve as flexible, secondary brand assets", "Background and decorative elements should stay visually quieter than the logo, using lighter tints or lower opacity", "Reusable patterns and badges should be saved as swatches or symbols in a shared asset file for consistency"],
  "ai-13": ["SVG suits scalable web graphics and icons; PNG suits web graphics needing transparency; PDF preserves vector quality and multiple artboards for sharing and print; EPS is a print-industry-standard vector format not available through Asset Export", "The Asset Export panel batch-exports objects, groups, or artboards as PNG, JPG, SVG, or PDF at multiple scales into organized subfolders", "File > Export > Export for Screens applies the same batch workflow at the full multi-artboard file level", "Convert final logo text to outlines and verify color mode (RGB vs CMYK) before exporting", "The editable AI source file with live text and named layers should always be kept separate from exported deliverables", "A clear Source/Exports folder structure protects the only editable master copy from being lost or overwritten"],
  "ai-14": ["A presentation board should open with the brand problem or goal before showing any visuals", "A short concept explanation connects research and symbol choices to the final logo design", "Logo variations (full lockup, symbol-only, horizontal/vertical) should be shown together for easy comparison", "The Artboards panel keeps multiple presentation pages consistent in size for easy export", "Color palettes and fonts should be shown as labeled swatches and type samples on the board", "Mockups (business cards, signage) placed with File > Place and Clipping Masks show the logo functioning in real context"],
  "ai-15": ["The graduation kit combines logo, icons, colors, typography, pattern assets, brand guide, and export package into one project", "The logo system must include outlined final versions plus a separately kept editable live-text master", "The icon set must follow consistent stroke weight, corner style, visual size, and level of detail", "The color and typography system, with documented HEX/RGB/CMYK values, proves the kit is a coherent system, not coincidental similarity", "The brand guide and presentation board make the kit look like a professional deliverable, not a loose folder of files", "The final export package includes SVG, PNG, PDF, and EPS formats, with the editable AI source kept organized separately"],
};

const solidworksExpansionKeyPoints: Record<string, string[]> = {
  "sw-3": ["The Front, Top, and Right default planes intersect at the origin and anchor a part's geometry in space", "Custom reference planes can be offset, angled, through three points, or tangent to a curved face", "Naming custom planes descriptively keeps the feature tree readable", "The Symmetric relation (or Mirror Entities) keeps two halves of a sketch identical when dimensions change", "Deciding which plane and reference a feature depends on before sketching prevents costly rebuilds later", "Strong design intent means the model updates predictably when specifications change"],
  "sw-4": ["Hole Wizard creates standard-sized holes (counterbore, countersink, tapped) that carry real fastener data for drawings", "Linear Pattern repeats a seed feature at fixed spacing along one or two directions", "Circular Pattern repeats a feature around an axis, ideal for bolt circles and spoke arrangements", "Mirror duplicates fully-formed 3D features across a plane, unlike mirroring a 2D sketch", "Patterns reference the original feature, so editing the seed or spacing updates every instance", "Individual instances in a Linear Pattern can be skipped to avoid collisions with other features"],
  "sw-5": ["Shell hollows a solid part to a set wall thickness and can assign different thicknesses to different faces", "Rib adds a thin reinforcing wall between faces along a sketched profile, stiffening a part cheaply", "Draft angles a wall relative to a pull direction so a part can be removed from a mold or die", "Draft can be a standalone feature or built into an Extruded Boss/Cut", "Shelled housings commonly need both draft on outer walls and internal ribs for rigidity", "The order features are applied in the feature tree changes the resulting geometry"],
  "sw-6": ["Coincident, Concentric, Distance, Angle, and Parallel are the core standard mates used in most assemblies", "Mechanical mates like Hinge and Gear model real mechanism behavior, including geared rotation ratios", "Limit mates allow movement between a minimum and maximum value rather than locking a part rigidly", "Every unmated part starts with six degrees of freedom; each mate removes some of them", "Over-mating and under-mating both produce assemblies that don't behave like the real mechanism", "Mating foundational parts first and building outward keeps the mate list logical and easier to debug"],
  "sw-7": ["Fasteners are mated with Concentric and Coincident mates, and the Toolbox library provides standard hardware", "A subassembly is inserted into a top-level assembly as a single component and can be rigid or flexible", "Subassemblies keep large assembly feature trees organized and can be tested independently", "Grouping related components sets up a cleaner exploded view later", "Interference Detection checks a mated assembly for components that physically overlap", "Running interference checks early catches clashes far more cheaply than discovering them after parts are machined"],
  "sw-8": ["Exploded views are built from a series of explode steps that move components apart along chosen directions", "Related components like a bolt, washer, and nut should generally be exploded together in one step", "Explode lines drawn with the Route Line tool show which part reconnects to which", "An exploded view is saved as a configuration and can be collapsed back to the assembled state", "Exploded views can drive drawing views or animations showing parts moving into place", "Exploded views translate an engineering model into something non-technical viewers can understand"],
  "sw-9": ["Front, top, and side views are core orthographic projections generated directly from the 3D model", "The isometric view gives a quick pictorial understanding of the part's overall shape", "Section views cut through a part to reveal internal geometry that hidden lines can't dimension clearly", "Detail views enlarge a small area of an existing view so small features can be dimensioned legibly", "Dimensions should be placed on the view where a feature's true size and shape are clearest", "Duplicating or misplacing dimensions across views is a common cause of manufacturing errors"],
  "sw-10": ["A tolerance defines the acceptable range of variation for a dimension, either individually or via a general note", "Tolerances too tight raise cost unnecessarily; tolerances too loose risk parts that don't fit or function", "Manufacturing notes cover surface finish, heat treatment, coating, and general fabrication instructions", "The material callout must match the material actually applied to the 3D model for accurate mass properties", "Hole Wizard holes can generate automatic hole callouts or tables, avoiding manual transcription errors", "The Bill of Materials lists every component, material, and quantity that purchasing and manufacturing build from"],
  "sw-11": ["The Base Flange feature starts a sheet metal part and sets its default thickness and bend radius", "Edge Flange adds a flange to a straight edge, building up walls edge by edge with adjustable length, angle, and bend position", "SolidWorks calculates the flat pattern using a Bend Allowance, defaulting to the K-factor method", "Other bend calculation options include Bend Table, Bend Allowance, and Bend Deduction", "Relief types (rectangular, obround, tear) prevent tearing or deformation at bend corners", "The Flat Pattern feature unfolds the part and can be exported as DXF/DWG for cutting"],
  "sw-12": ["Materials are assigned through the Material editor and directly drive all mass-related calculations", "A part left on Default material produces meaningless mass and center of mass results", "The Mass Properties tool calculates mass, volume, surface area, and center of mass from geometry and material density", "Center of mass is reported as X, Y, Z coordinates and matters for stability, tipping risk, and balance", "Calculated mass properties should be checked against real project requirements like maximum weight", "Checking Mass Properties early and often catches weight or balance problems while they're still cheap to fix"],
  "sw-13": ["A fixture defines which faces are held in place, representing how the real part is mounted", "SimulationXpress fixed geometry constrains selected faces in all degrees of freedom", "Loads should be based on realistic expected service conditions, not guesses", "Factor of safety is yield strength divided by equivalent stress; below 1 predicts yielding", "Sharp internal corners and sudden thickness changes are common stress concentration points", "Fillets, added thickness, ribs, or a stronger material are practical ways to fix a low factor of safety"],
  "sw-14": ["A graduation project starts with a plan covering reference planes, patterns, fasteners, and required motion before any sketching", "Parts should use manufacturing-aware features (Shell, Rib, Draft, Hole Wizard, Sheet Metal) matching how they would really be built", "Assemblies should follow a deliberate mate strategy with foundational parts first and Interference Detection run before completion", "The final documentation package needs correct drawing views, manufacturable tolerances, matching material callouts, and a generated BOM", "An exploded view or presentation render communicates the design to a non-technical audience", "Mass Properties and SimulationXpress checks confirm the finished design meets real weight, balance, and strength requirements"],
};

const capcutExpansionKeyPoints: Record<string, string[]> = {
  "cc-3": ["Define the specific viewer and platform before selecting any footage", "TikTok, Reels, and Shorts share 9:16 format but reward different pacing and tone", "Choose the strongest, most surprising moment as the hook during planning, not editing", "Rank proof points in priority order so the strongest survive a shorter cut", "Decide the call to action before editing so other elements support it", "Test every candidate clip against hook, proof, or call-to-action before including it"],
  "cc-4": ["The rough cut assembles hook, context, value, proof, and call to action in order", "Effects, filters, and animated text are deliberately left out of the rough cut", "Trimming removes dead air, false starts, and repeated points from raw footage", "A full uninterrupted playback is the fastest way to judge real pacing problems", "Music and color grading are added later and should not be used to mask structural issues", "The rough cut should be locked for structure before audio, captions, color, or motion work begins"],
  "cc-5": ["Voice should stay the clearest, most prominent element in the audio mix", "Ducking automatically lowers music volume under spoken lines", "Music tempo and mood should be previewed against the cut to check it matches the content's energy", "Sound effects should be reserved for moments that genuinely need emphasis, not every transition", "Timing key cuts to land on musical beats creates a sense of intentional rhythm", "Voice should be leveled and cleaned up before music is layered on top"],
  "cc-6": ["Captions need large font sizes, short line lengths, and high contrast for phone screens", "CapCut's auto-caption tool transcribes speech to an editable text track but should be checked for errors", "Captions should avoid the bottom and edge zones where platform UI overlays appear", "Lower thirds identify speakers briefly and should not stay on screen the whole video", "Text hierarchy uses size, weight, and color to show viewers what matters most", "A background box, outline, or drop shadow keeps text legible over changing footage"],
  "cc-7": ["B-roll functions as visual proof for a claim, not just decoration", "Overlay clips sit on a video track above the main footage, covering it visually without replacing the audio", "Screenshots and logos should be cropped tightly and held long enough to be read", "Before-and-after overlays let viewers judge a result directly instead of trusting a description", "The 'before' state is shown and held briefly before the 'after' state for clear contrast", "B-roll length should follow the pacing already locked in the rough cut, not set new pacing"],
  "cc-8": ["Exposure and contrast are corrected first to establish a usable base for other adjustments", "White balance removes unwanted orange or blue color casts caused by different light sources", "Saturation is adjusted only after exposure, contrast, and white balance are already correct", "Matching clips means making skin tones and brightness consistent across cuts filmed in different lighting", "Color correction is generally applied per clip rather than as one blanket timeline-wide adjustment", "The goal of correction is technical accuracy and consistency, not a stylized look"],
  "cc-9": ["A keyframe is set by moving the playhead and marking a value on a property like position or scale", "CapCut interpolates a smooth transition automatically between two keyframes", "Position, scale, rotation, and opacity cover most common motion needs", "Easing, such as fast-start slow-end, makes keyframe motion feel more natural than constant-speed movement", "Every keyframe animation should serve the story, not be added just because the feature exists", "Motion should stay restrained and be checked at phone size since dramatic motion can disorient on a small screen"],
  "cc-10": ["Speeding up footage compresses necessary but uninteresting time, like a transition or setup", "Slow motion should be reserved for the single strongest moment, not overused across a sequence", "CapCut's Speed panel Curve section lets an editor control how gradually speed changes between points", "Optical flow smoothing can be used when an abrupt speed change looks choppy", "A clean, unramped cut is often the stronger choice when timing is already communicated clearly", "Speed effects should serve the story, not disguise footage that is the wrong length"],
  "cc-11": ["A consistent visual template helps viewers recognize content style within the first second", "Caption styling becomes a reusable preset rather than a new decision on every video", "A consistent color palette and title-movement style, using keyframe easing and direction, builds a visual signature", "Logo placement in a consistent position reinforces brand identity without requiring the viewer to read anything", "A short, consistent intro and outro structure give every video the same recognizable shape", "The goal is deciding template elements once and reusing them, rather than rebuilding decisions on every upload"],
  "cc-12": ["TikTok, Reels, Shorts, and Status all use vertical 9:16 to fill a phone screen without black bars", "YouTube long-form and presentation screens use landscape 16:9 instead", "CapCut supports resolutions from 480p to 4K and frame rates roughly 24-60fps on mobile", "1080p at 30fps is a reliable default balancing quality, file size, and processing time", "Export resolution should match or stay below the resolution footage was actually recorded in", "Versioned filenames with project name, version number, and date keep drafts identifiable during review"],
  "cc-13": ["Labelled drafts with versioned filenames and a summary of changes give clients clear context", "Requesting time-coded comments turns vague feedback into specific, actionable notes", "Mistakes are objective errors that should always be fixed; preferences are subjective and worth discussing", "Treating every preference as mandatory can drift an edit away from the original plan", "Agreeing on a revision deadline and a set number of rounds keeps the review process moving", "Summarizing exactly what changed after a revision helps the client verify fixes efficiently"],
  "cc-14": ["A case study documents the original brief, audience, and platform before describing editing decisions", "Recording audience and platform choices shows format and pacing decisions were deliberate, not default", "Timeline decisions and improvements between drafts show reasoning that a final export alone cannot show", "Screenshots of the timeline, keyframes, or speed curve give visual evidence of the actual process", "The final exported file still belongs in the case study alongside supporting documentation", "A case study is written for a reviewer judging skill and decision-making, not for the original client"],
  "cc-15": ["The graduation edit starts with the same planning steps as the first module: viewer, platform, hook, proof, call to action", "The rough cut must be built and locked for structure before any audio, caption, color, or motion work begins", "Audio, captions, and B-roll are layered onto the locked structure and checked against the original plan", "Color, keyframe motion, and speed choices should be applied with intention, not uniformly across every clip", "A brand template built earlier in the course can be applied here to show the reusable system on a real project", "The final export should be checked on an actual phone screen and packaged with a case study for the portfolio"],
};

const enhancedKeyPoints: Record<string, string[]> = {
  ...vibeDesigningKeyPoints,
  ...vibeCodingKeyPoints,
  ...aiPromptKeyPoints,
  ...photoshopExpansionKeyPoints,
  ...illustratorExpansionKeyPoints,
  ...solidworksExpansionKeyPoints,
  ...capcutExpansionKeyPoints,
};

// Per-lesson video overrides so each lesson gets a distinct, individually
// researched video instead of the single shared video its generator plan
// was created with. Populated course-by-course as videos are researched.
const videoOverrides: Record<string, string> = {
  "ps-1": youtubeEmbed("v0j6JFufdiM"),
  "ps-2": youtubeEmbed("MsukMXtEYFQ"),
  "ps-3": youtubeEmbed("VNSe8BglAHs"),
  "ps-4": youtubeEmbed("dBqhAIoQkdU"),
  "ps-5": youtubeEmbed("WUqASG_y1x4"),
  "ps-6": youtubeEmbed("Tznnrjkhp7E"),
  "ps-7": youtubeEmbed("mPwvZA4Xbd8"),
  "ps-8": youtubeEmbed("11jwSwUu2WI"),
  "ps-9": youtubeEmbed("NaiUhziolfs"),
  "ps-10": youtubeEmbed("haCtIHbd0gw"),
  "ps-11": youtubeEmbed("VPv8-alBjvs"),
  "ps-12": youtubeEmbed("hi5DufAc3ro"),
  "ps-13": youtubeEmbed("r1OoH9lo3Oo"),
  "ps-14": youtubeEmbed("G2OhLub-yCA"),
  "ps-15": youtubeEmbed("eHi_Y64tiYE"),
  "ps-16": youtubeEmbed("pfur6mP1Z3U"),
  "ps-17": youtubeEmbed("i8WNvjLDzfQ"),

  "ai-1": youtubeEmbed("LTqXn3qT5H0"),
  "ai-2": youtubeEmbed("I7CoMhF6pQ8"),
  "ai-3": youtubeEmbed("IpFyYahyPmE"),
  "ai-4": youtubeEmbed("y9ySa3y85qw"),
  "ai-5": youtubeEmbed("c1afVPG32yA"),
  "ai-6": youtubeEmbed("zWzWtqCtRIw"),
  "ai-7": youtubeEmbed("ngdasKemfl4"),
  "ai-8": youtubeEmbed("GLPANT_FC7c"),
  "ai-9": youtubeEmbed("ofFyRI6ROTI"),
  "ai-10": youtubeEmbed("KYiAImHbMvM"),
  "ai-11": youtubeEmbed("JHfQUSOPCu4"),
  "ai-12": youtubeEmbed("ITRZ75OKrG0"),
  "ai-13": youtubeEmbed("T8xAXeP3-kw"),
  "ai-14": youtubeEmbed("4LgPxxAaJAE"),
  "ai-15": youtubeEmbed("mhUMNu7XeTE"),

  "vd-1-1": youtubeEmbed("HL1-Be71URU"),
  "vd-1-2": youtubeEmbed("oeSsyb-tzfo"),
  "vd-1-3": youtubeEmbed("Tz0dpeqcO60"),
  "vd-1-4": youtubeEmbed("NdJV8yuqBEA"),
  "vd-1-5": youtubeEmbed("OJLfjgVlwDo"),
  "vd-1-6": youtubeEmbed("q6qA_609UOE"),
  "vd-1-7": youtubeEmbed("_3k7uaT4km0"),
  "vd-2-1": youtubeEmbed("5p1WoXx8w3M"),
  "vd-2-2": youtubeEmbed("_syykYZ3WOo"),
  "vd-2-3": youtubeEmbed("GbG_lp5B6PQ"),
  "vd-2-4": youtubeEmbed("nyoyDXc0Rw0"),
  "vd-2-5": youtubeEmbed("KgXSeWM50vU"),
  "vd-2-6": youtubeEmbed("dUYW7vEWDWg"),
  "vd-2-7": youtubeEmbed("9AZ2mbH4VKg"),
  "vd-3-1": youtubeEmbed("f5iEAeUMFZA"),
  "vd-3-2": youtubeEmbed("mp1PfL3m_hI"),
  "vd-3-3": youtubeEmbed("cf95Z7Ngg8k"),
  "vd-3-4": youtubeEmbed("VZSXq7VgeGU"),
  "vd-3-5": youtubeEmbed("7ldadk1yVMs"),
  "vd-3-6": youtubeEmbed("NJLId-Uf-9I"),
  "vd-3-7": youtubeEmbed("YUMdv4yFlQU"),
  "vd-4-1": youtubeEmbed("aerHboWAG1E"),
  "vd-4-2": youtubeEmbed("xo7ezJGrxFw"),
  "vd-4-3": youtubeEmbed("WxSYc5afjDY"),
  "vd-4-4": youtubeEmbed("AZUj_IEoKiM"),
  "vd-4-5": youtubeEmbed("TOTsxwquAN0"),
  "vd-4-6": youtubeEmbed("xuq4mTh50p4"),
  "vd-4-7": youtubeEmbed("X5qiBwqptek"),
  "vd-5-1": youtubeEmbed("N-34Q9mhwvs"),
  "vd-5-2": youtubeEmbed("f2NR7xL8jAc"),
  "vd-5-3": youtubeEmbed("W6RF-IJuO50"),
  "vd-5-4": youtubeEmbed("npmXjAn-F3E"),
  "vd-5-5": youtubeEmbed("wlY65y5Dj2g"),
  "vd-5-6": youtubeEmbed("JqsGReLZccQ"),
  "vd-5-7": youtubeEmbed("wN7ThtueEpM"),

  "vc-1-1": youtubeEmbed("nuUNgsQGU9g"),
  "vc-1-2": youtubeEmbed("bzZfpdSVLZk"),
  "vc-1-3": youtubeEmbed("MFOU30UJKuo"),
  "vc-1-4": youtubeEmbed("QgxkYbGr2II"),
  "vc-1-5": youtubeEmbed("rIO5326FgPE"),
  "vc-1-6": youtubeEmbed("SPR0uTEmm94"),
  "vc-1-7": youtubeEmbed("qz0aGYrrlhU"),
  "vc-2-1": youtubeEmbed("vQAvjof1oe4"),
  "vc-2-2": youtubeEmbed("eHaZlFcGl6k"),
  "vc-2-3": youtubeEmbed("G4LYPf8isVg"),
  "vc-2-4": youtubeEmbed("e1u44nvIvdQ"),
  "vc-2-5": youtubeEmbed("Eqfz3RFo890"),
  "vc-2-6": youtubeEmbed("dkOj_GDtlwQ"),
  "vc-2-7": youtubeEmbed("9zA8cB-54SA"),
  "vc-3-1": youtubeEmbed("edlFjlzxkSI"),
  "vc-3-2": youtubeEmbed("gNhdufVqXeE"),
  "vc-3-3": youtubeEmbed("U8Klu6oqnjc"),
  "vc-3-4": youtubeEmbed("YiOlaiscqDY"),
  "vc-3-5": youtubeEmbed("FLGzeTHAbqQ"),
  "vc-3-6": youtubeEmbed("-ZRDZyUjEEI"),
  "vc-3-7": youtubeEmbed("hdI2bqOjy3c"),
  "vc-4-1": youtubeEmbed("cLPyx7rpqRU"),
  "vc-4-2": youtubeEmbed("tMc_VSt6Cco"),
  "vc-4-3": youtubeEmbed("K0q-8ytGlVA"),
  "vc-4-4": youtubeEmbed("skMXlZfX8qo"),
  "vc-4-5": youtubeEmbed("JgeZF_2GcOc"),
  "vc-4-6": youtubeEmbed("Bv-Sa8CtD0s"),
  "vc-4-7": youtubeEmbed("tqjJrXd27m4"),
  "vc-5-1": youtubeEmbed("pZ4mSs6KoE4"),
  "vc-5-2": youtubeEmbed("CiDVWaumBXI"),
  "vc-5-3": youtubeEmbed("oNDuKwsQkfQ"),
  "vc-5-4": youtubeEmbed("gpJKj45AikY"),
  "vc-5-5": youtubeEmbed("-ucobnxYxVE"),
  "vc-5-6": youtubeEmbed("a2ovCcxXqNo"),
  "vc-5-7": youtubeEmbed("mTz0GXj8NN0"),
  "vc-6-1": youtubeEmbed("iiADhChRriM"),
  "vc-6-2": youtubeEmbed("37vxWr0WgQk"),
  "vc-6-3": youtubeEmbed("F6t9JkQspyQ"),
  "vc-6-4": youtubeEmbed("4_epZIxqCho"),
  "vc-6-5": youtubeEmbed("wqzv-CzJy5k"),
  "vc-6-6": youtubeEmbed("eBGqJyo0LwI"),
  "vc-6-7": youtubeEmbed("-mN3VyJuCjM"),
  "vc-7-1": youtubeEmbed("-X1L81xpBtc"),
  "vc-7-2": youtubeEmbed("BzeU7_ceIQI"),
  "vc-7-3": youtubeEmbed("Bu_TzYis_K0"),
  "vc-7-4": youtubeEmbed("_0iFVd_bC9w"),
  "vc-7-5": youtubeEmbed("Y2MHNnWOznQ"),
  "vc-7-6": youtubeEmbed("626BcUO84og"),
  "vc-7-7": youtubeEmbed("wj3b6-YzYGU"),
  "vc-8-1": youtubeEmbed("r8jQ9hVA2qs"),
  "vc-8-2": youtubeEmbed("v5n96CX339g"),
  "vc-8-3": youtubeEmbed("gOKPgSR5EUs"),
  "vc-8-4": youtubeEmbed("2HBIzEx6IZA"),
  "vc-8-5": youtubeEmbed("lKOnNYekWCw"),
  "vc-8-6": youtubeEmbed("dQpfZZZ9h0Q"),
  "vc-8-7": youtubeEmbed("Cxftp90K_ek"),

  "ape-1-1": youtubeEmbed("LPZh9BOjkQs"),
  "ape-1-2": youtubeEmbed("bCgVLhKjgk4"),
  "ape-1-3": youtubeEmbed("XvCq4nPqE0Y"),
  "ape-1-4": youtubeEmbed("h6RFksMw99Q"),
  "ape-1-5": youtubeEmbed("Ns7oxTn5U6A"),
  "ape-1-6": youtubeEmbed("JojcJe5dJTI"),
  "ape-1-7": youtubeEmbed("QnZYrD5ia7c"),
  "ape-2-1": youtubeEmbed("Mumbdm0A7W0"),
  "ape-2-2": youtubeEmbed("bVk1_MWXs9o"),
  "ape-2-3": youtubeEmbed("w8EcDV3tOCI"),
  "ape-2-4": youtubeEmbed("AeCexQR4L3w"),
  "ape-2-5": youtubeEmbed("CQM_p9k6eQ8"),
  "ape-2-6": youtubeEmbed("C2Ap8UglnjA"),
  "ape-2-7": youtubeEmbed("OA4UP4O1hz0"),
  "ape-3-1": youtubeEmbed("4S5rnN3meFw"),
  "ape-3-2": youtubeEmbed("gLf3-jX08Uk"),
  "ape-3-3": youtubeEmbed("Zv_tUYPG2NA"),
  "ape-3-4": youtubeEmbed("fSaTtJJUz5U"),
  "ape-3-5": youtubeEmbed("YCFGjLjNOyw"),
  "ape-3-6": youtubeEmbed("rI1FcpKi0Lc"),
  "ape-3-7": youtubeEmbed("HVi0F3YT13I"),

  "cc-1": youtubeEmbed("j5_471mO14c"),
  "cc-2": youtubeEmbed("2q2TuJ_Bz8E"),
  "cc-3": youtubeEmbed("ovgbuoeAPDs"),
  "cc-4": youtubeEmbed("UuwIAPhvcJQ"),
  "cc-5": youtubeEmbed("LKeyhTQMFoE"),
  "cc-6": youtubeEmbed("EeU6Og9lRhc"),
  "cc-7": youtubeEmbed("uJPG4_jgmDw"),
  "cc-8": youtubeEmbed("c_yUkyAdrx8"),
  "cc-9": youtubeEmbed("pp8ICDf8Go0"),
  "cc-10": youtubeEmbed("5EgNDG9h3O4"),
  "cc-11": youtubeEmbed("sMf-rNE8xQU"),
  "cc-12": youtubeEmbed("8G0udS0ut5o"),
  "cc-13": youtubeEmbed("lDIix00jVuI"),
  "cc-14": youtubeEmbed("hScFAHgXIFw"),
  "cc-15": youtubeEmbed("Eapm0SOGvng"),

  "sw-1": youtubeEmbed("ZynPfr0gGYw"),
  "sw-2": youtubeEmbed("H3_NcpCEkCU"),
  "sw-3": youtubeEmbed("G7AP7giy6t8"),
  "sw-4": youtubeEmbed("LC-PwGtOMsA"),
  "sw-5": youtubeEmbed("Ufmx1VkiauI"),
  "sw-6": youtubeEmbed("y90KCBmnXH0"),
  "sw-7": youtubeEmbed("VlzBeWPEexE"),
  "sw-8": youtubeEmbed("lEv7pktIzqg"),
  "sw-9": youtubeEmbed("85iYUxN1bkk"),
  "sw-10": youtubeEmbed("UlltrlJt08g"),
  "sw-11": youtubeEmbed("KTnCuDoFJQs"),
  "sw-12": youtubeEmbed("fF6BcSlWhhI"),
  "sw-13": youtubeEmbed("bEePwuqsEBs"),
  "sw-14": youtubeEmbed("CSYqOFStOns"),
};

export const lessons: Lesson[] = [
  ...baseLessons,
  ...photoshopProfessionalLessons,
  ...illustratorProfessionalLessons,
  ...capcutProfessionalLessons,
  ...solidworksProfessionalLessons,
  ...vibeDesigningLessons,
  ...vibeCodingLessons,
  ...aiPromptLessons,
].map((lesson) => ({
  ...lesson,
  ...lessonVisuals[lesson.id],
  content: enhancedContent[lesson.id] ?? lesson.content,
  keyPoints: enhancedKeyPoints[lesson.id] ?? lesson.keyPoints,
  quiz: quizEnhancements[lesson.id] ?? lesson.quiz,
  videoUrl: videoOverrides[lesson.id] ?? lesson.videoUrl,
  resources: [
    { name: `${lesson.title} Notes.pdf`, url: `/api/notes/${lesson.id}`, type: "pdf" },
    ...lesson.resources.filter((resource) => resource.url !== "#"),
  ],
}));
