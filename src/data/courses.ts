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
  "vd-1-1": `Overview: Product design is the discipline of shaping a digital product around real human needs rather than around whatever looks good on a moodboard. UI (user interface) is what a person sees and touches — buttons, screens, colors, type. UX (user experience) is everything they feel while trying to accomplish a goal — whether the app is fast, clear, trustworthy, and worth coming back to. The most important idea in this lesson is that a designer's first job is not decoration, it is problem-solving: every screen you will ever draw exists to help a specific person do a specific thing.

UI vs UX, precisely: UI is the visual and interactive layer — layout, color, iconography, motion, and the components a user directly manipulates. UX is the full journey around that layer — onboarding friction, load times, error recovery, and whether the product's mental model matches what the user already expects. A beautiful UI on top of a confusing UX still fails; a plain UI that removes friction at every step often wins. Treat UI as the outfit and UX as the whole relationship.

The designer's mindset: Product designers work from constraints inward, not from inspiration outward. Before opening Figma, a working designer asks who the user is, what job they are hiring the product to do, what business goal the screen must serve, and what technical constraints (platform, data, existing components) shape the answer. This is called "framing" the problem, and skipping it is the single biggest reason redesigns miss the mark.

Jakob's Law and existing mental models: Jakob's Law states that users spend most of their time on other people's products, so they arrive at yours with expectations already formed — a cart icon means shopping, a hamburger icon means a hidden menu, pull-down means refresh. Good product designers borrow familiar patterns deliberately and save true innovation for the parts of the product that actually differentiate it, rather than reinventing basic navigation for its own sake.

How this course builds the skill: Across five modules you will move from research and structure (Modules 1-2) into visual craft (Module 3) into interactive prototyping in Figma (Module 4) and finally into telling the story of your work as a portfolio case study (Module 5). Each lesson builds on the last, so the mindset habit you build here — always ask "whose problem am I solving and how will I know it's solved" — should follow you into every wireframe, every color choice, and every button you place for the rest of the course.`,
  "vd-1-2": `Overview: No design decision means anything until you know precisely what problem you are solving and for whom. This lesson is about separating a user's stated want from their actual underlying goal, and learning to write problems down in a form that can actually be tested against a design. The most important idea here is that a vague problem produces a vague design — precision at this stage saves weeks of rework later.

Problems vs symptoms: Users usually describe symptoms, not root problems — "the app is slow" might really mean "I can't tell if my payment went through." Good researchers use the "5 Whys" technique, repeatedly asking why a stated frustration exists until they reach a cause a design can actually address. Confusing a symptom for the real problem leads to redesigns that look different but solve nothing.

User goals vs business goals: Every product sits at the intersection of what the user wants (get a task done quickly, feel confident, avoid embarrassment) and what the business needs (revenue, retention, lower support costs). A strong designer states both explicitly for every feature, for example: "User goal: pay a bill in under 60 seconds. Business goal: reduce failed-payment support tickets by 20%." When the two goals conflict, that tension is exactly what design decisions need to resolve.

Writing a problem statement: A usable problem statement follows a simple structure: [user] needs a way to [need] because [insight], but [current obstacle]. This format, borrowed from design-thinking practice, forces you to name a real person, a real need, and a real barrier instead of jumping straight to a solution like "we need a new app." Keep it to one or two sentences — if it needs a paragraph, the problem hasn't been narrowed enough yet.

Validating the problem before designing: Before sketching anything, check the problem against real signals — support tickets, app store reviews, analytics drop-off points, or five minutes of conversation with an actual user. Even informal validation (asking three people the same question) catches wrong assumptions cheaply, while designing first and validating later means the mistake is now baked into components, copy, and flows that are expensive to unwind.`,
  "vd-1-3": `Overview: Personas and empathy maps exist to stop designers from designing for themselves. It is dangerously easy to assume every user thinks the way you do; personas force a team to agree on who they're actually building for, and empathy maps force them to think in that person's context, not just their demographics. The most important idea in this lesson is that these tools are only useful when built from real observation, not guesswork.

What a persona actually is: A persona is a composite, research-grounded profile representing a cluster of real users with shared goals and behaviors — not a fictional biography with a stock photo and a made-up favorite coffee order. A working persona includes a goal, key frustrations (pain points), relevant behavior (device used, tech comfort, context of use), and a representative quote. Skip invented details like hobbies or family status unless they genuinely affect product decisions — extra flavor text that doesn't inform a decision is just decoration.

Building personas from evidence: Strong personas come from interviews, support data, surveys, or analytics segments — never from a single designer's imagination. If you can't point to where a trait came from, question whether it belongs. For a student project without access to real interviews, secondary research (forum threads, reviews of similar apps, published market data) is an acceptable substitute, as long as you cite it rather than presenting it as verified fact.

Empathy maps: An empathy map is a four-quadrant tool — Says, Thinks, Does, Feels — used to capture a user's context around a specific task rather than their whole life story. "Says" and "Does" come from observable, quotable evidence; "Thinks" and "Feels" are informed inferences you make explicit so the team can challenge them. Empathy maps work best filled out immediately after a user interview or usability session, while details are fresh.

Using personas without stereotyping: The risk with personas is turning a research tool into a cardboard stereotype that excuses lazy thinking ("our persona wouldn't like that" used to shut down debate instead of open it). Treat a persona as a living hypothesis: revisit and revise it as you learn more, and always be ready to say which specific research finding backs each trait on the page.`,
  "vd-1-4": `Overview: A user journey maps what a real person experiences over time as they try to accomplish a goal with your product — including the parts outside the screen, like discovering the app exists or getting frustrated enough to quit. The most important idea in this lesson is that journeys reveal problems screens alone can't show: drop-off points, emotional dips, and moments where the product fights the user instead of helping them.

Anatomy of a journey map: A typical journey map has stages (Awareness, Consideration, Onboarding, Usage, Support, Renewal, for example), and for each stage it tracks the user's actions, their touchpoints (app screen, email, customer support, push notification), their thoughts, and their emotional state — often drawn as a rising and falling line. The emotional curve is the most diagnostic part: sharp dips point exactly to where redesign effort should go first.

Stages vs screens: A common beginner mistake is mapping journeys screen-by-screen instead of stage-by-stage. A journey stage like "first payment" might span five screens, a push notification, and a wait for bank confirmation — map the stage as the user experiences it, then zoom into screens afterward during wireframing. Journey mapping happens before screen design specifically so structural problems get caught before visual work begins.

Finding friction and moments of truth: Every journey has "moments of truth" — points where the user decides whether to trust the product (a slow first load, a confusing permission request, a surprise fee). Mark these explicitly on the map. These are the highest-leverage places to invest design and engineering effort, because a bad moment of truth early in a journey can undo good design everywhere else.

From journey to backlog: A completed journey map should produce a prioritized list of problems, not just a pretty diagram. For each friction point, note its severity (does it cause drop-off or just mild annoyance?) and a rough fix direction. This list becomes the input to the wireframing work in Module 2 — you are not sketching screens yet, you are deciding which parts of the journey deserve a screen redesign first.`,
  "vd-1-5": `Overview: Information architecture (IA) is the practice of organizing and labeling content so people can find what they need without thinking hard about it. It is invisible when done well and infuriating when done badly — think of a menu with three different places a user might reasonably look for "Settings." The most important idea in this lesson is that IA decisions made now determine how confusing or effortless every future screen will feel, so they deserve real research, not guesswork.

Card sorting: Card sorting is the core IA research method — you write content items or features on individual cards (physical or digital, using tools like Optimal Workshop or Figma's own sorting templates) and ask real users to group them in ways that make sense to them. An open card sort lets users create and name their own categories, revealing their mental model from scratch; a closed card sort asks users to place items into categories you've already defined, which is useful for testing an existing structure. Run this with 5-15 participants for patterns to emerge reliably.

Site maps and hierarchy: A site map is the resulting tree diagram showing how screens or sections relate — what's a top-level destination, what's nested underneath, and how deep a user has to click to reach something. Keep hierarchies shallow: research on navigation consistently shows users get lost faster in deep, narrow trees than in shallow, broad ones, so prefer more items at one level over many click-throughs to reach content.

Labeling and language: Labels must match the user's own vocabulary, not internal company jargon — if users call it "My Orders" in an interview, don't rename it "Purchase History" in the UI to sound more formal. Test ambiguous labels with a tree test (asking users to find something using only the label hierarchy, no visuals) before committing to it in a wireframe.

How IA feeds the next lessons: A validated site map becomes the skeleton for screen flow mapping and navigation pattern choices in Module 2 — you cannot design a tab bar or menu sensibly until you know what actually needs to live in it. Treat IA as the plumbing behind the walls: unglamorous, but the reason nothing leaks later.`,
  "vd-1-6": `Overview: Mobile-first thinking means designing for the smallest, most constrained screen and context first, then expanding upward to tablet and desktop — not the reverse. In markets like Kenya, where most users access the internet primarily or exclusively through a smartphone, this isn't a stylistic preference, it's a reflection of how the product will actually be used. The most important idea in this lesson is that constraints make you prioritize, and prioritizing on mobile makes every larger screen easier to design well.

Why mobile-first, not mobile-only: Starting with the smallest viewport (roughly 360-430px wide for most Android and iPhone devices) forces hard decisions about what truly matters on a screen, because there is no room for everything. Once the mobile layout is solid, progressive enhancement adds content and secondary actions as screen space grows — this is far easier than starting with a spacious desktop design and then trying to cram it down into a phone, which usually just hides things behind more taps.

Touch targets and thumb zones: Apple's Human Interface Guidelines and Google's Material Design both recommend a minimum touch target of roughly 44-48 points/dp, translating to about 44x44pt on iOS or 48x48dp on Android, so buttons and tap areas need real breathing room, not just visually-sized icons. Fitts's Law explains why this matters: the time to accurately hit a target depends on its size and distance from the current touch point, so small, far-apart buttons cause real, measurable mis-taps, especially for one-handed use where the thumb naturally reaches the bottom half of the screen more easily than the top.

Connectivity and data constraints: Designing for markets with variable mobile data speeds and costs means treating performance as a UX feature: compress images, avoid auto-playing heavy media, design meaningful loading and offline states, and never let a slow network look like a broken app. A skeleton loading state or a clear "no connection" message communicates system status far better than a screen that silently hangs.

Responsive vs adaptive: Responsive design uses flexible grids and breakpoints so one layout reflows across sizes; adaptive design serves distinct fixed layouts per device category. Most modern product teams default to responsive with a mobile-first breakpoint strategy (base styles for small screens, then min-width media queries adding complexity upward), which is also how Module 3's spacing and grid lessons will assume your layouts behave.`,
  "vd-1-7": `Overview: This checkpoint lesson pulls together every skill from Module 1 — problem framing, personas and empathy maps, journey mapping, information architecture, and mobile-first thinking — into a single research deliverable you can defend and later show in a portfolio. The most important idea here is that a checkpoint is not busywork; it is the first real test of whether your research actually holds together as evidence for the design decisions you're about to make in Module 2.

What a strong checkpoint submission includes: A complete submission names a specific product and a specific, validated problem statement (from Lesson 1-2), a persona and empathy map grounded in cited evidence (Lesson 1-3), a journey map showing at least one clear emotional dip and moment of truth (Lesson 1-4), a site map or IA sketch showing your content hierarchy (Lesson 1-5), and a short note on how mobile constraints shape your priorities (Lesson 1-6). Missing any one of these leaves a gap a reviewer will immediately notice.

The consistency check: The single biggest weakness in student checkpoints is internal contradiction — a persona described as impatient and mobile-only, but a journey map that assumes long desktop sessions; or a problem statement about speed, but an IA with six nested menu levels. Before submitting, read your own documents back to back and ask whether every artifact tells the same story about the same user.

How reviewers evaluate this stage: A tutor or peer reviewer at this checkpoint is not grading visual polish — there are no screens yet — they are grading reasoning. Can you explain why this persona, why this journey stage matters most, why this IA structure over an alternative? Being able to say "I chose X over Y because of Z evidence" is worth more than a beautifully formatted document with no justification behind it.

Setting up Module 2 for success: Everything in Module 2 (sketching, wireframes, flows, navigation, forms, error states) will directly reference this research. Treat this checkpoint as the brief you're handing to your future self — the clearer and more specific it is now, the less you'll have to guess or backtrack once you start drawing actual screens.`,
  "vd-2-1": `Overview: Sketching is the fastest, cheapest way to generate and discard ideas before any pixel is placed in Figma. The point of this lesson is not artistic skill — it's speed and volume, because the first idea is rarely the best one, and sketching lets you find that out in minutes instead of hours. The most important idea in this lesson is that low commitment breeds better ideas: a pencil sketch is easy to throw away, a polished mockup is not.

Crazy 8s and rapid ideation: A widely used sketching exercise, popularized by Google Ventures' design sprint process, is "Crazy 8s": fold a sheet of paper into eight sections and sketch eight distinct variations of one screen or flow in eight minutes, roughly one minute per sketch. The time pressure is deliberate — it prevents overthinking any single idea and forces genuinely different directions instead of eight small variations of the same concept.

What to sketch and what to skip: Sketch structure and flow, not visual polish — boxes for content blocks, arrows for navigation, rough labels for buttons. Skip color, exact spacing, and typography entirely at this stage; including them signals false precision and tempts you to fall in love with details before the underlying structure is validated. If you catch yourself picking a font in a sketch, you've moved past sketching into premature visual design.

Sketching for flows, not just single screens: Beyond individual screens, sketch the connections between them — draw a rough screen, an arrow, the next rough screen, labeling what action triggers the transition. This catches structural problems (a dead end, a missing back path, a step that needs information you haven't collected yet) far earlier and cheaper than catching them in a Figma prototype.

From sketch to selection: After a sketching session, don't pick a winner by personal taste alone — hold a quick "dot voting" round with teammates or your tutor, where each person marks the elements they find strongest across all sketches, even if it means combining pieces from different ones. The output of this lesson should be one or two chosen directions, annotated with why they were chosen, feeding directly into the low-fidelity wireframes in the next lesson.`,
  "vd-2-2": `Overview: Low-fidelity wireframes turn a chosen sketch direction into a cleaner, more precise structural layout — still without color, real copy, or final typography — so structure can be evaluated and agreed on before visual design begins. The most important idea in this lesson is that low fidelity is a deliberate choice, not a lack of skill: keeping wireframes rough on purpose keeps feedback focused on layout and hierarchy instead of color opinions.

What belongs in a low-fi wireframe: Grayscale boxes, placeholder text (often labeled "Heading," "Body copy," or Lorem ipsum), simple line icons or labeled rectangles for icons, and basic proportions for buttons, cards, and images. The goal is to communicate what exists on a screen and roughly how important each element is relative to the others, established through size and position, not through color or decoration.

Why fidelity level controls the feedback you get: Showing a stakeholder a polished, colorful mockup too early tends to generate comments about color and font choices, because that's what's easiest for a non-designer to react to — even if the underlying structure is broken. Showing a rough wireframe instead keeps the conversation on the right questions: does this layout make sense, is anything missing, is the priority order right. This is sometimes called the "fidelity trap," and deliberately staying low-fi protects a review session from it.

Tools for low-fi work: Figma's own shape and frame tools are enough for digital low-fi wireframes — rectangles, a default gray fill, and its built-in font at one or two weights. Many teams also use dedicated wireframing kits or plugins, but the core discipline matters more than the tool: constrain yourself to grayscale and generic type even inside a full-featured tool like Figma.

Annotating wireframes: Add short annotations next to non-obvious elements explaining behavior — "this card is horizontally scrollable," "this button is disabled until the form is valid." Annotations let a wireframe communicate interaction intent that a static image alone cannot, which matters most once you move into screen flow mapping in the next lesson, where these individual screens get connected into a full flow.`,
  "vd-2-3": `Overview: Screen flow mapping connects individual wireframes into a navigable diagram showing every path a user can take through a product — the digital equivalent of a floor plan with doors and hallways. The most important idea in this lesson is that a flow diagram exposes structural problems (dead ends, missing back paths, screens with no way in) that are invisible when you only look at screens one at a time.

Building the flow diagram: Lay out each wireframe as a node and connect them with labeled arrows showing the action that causes the transition — "tap Continue," "swipe left," "payment succeeds," "payment fails." Branch points (like a payment succeeding or failing) should show both outcomes as separate arrows, because designing only the happy path and forgetting the failure path is one of the most common and costly mistakes at this stage.

Happy path vs edge cases: The happy path is the ideal sequence where everything goes right — form filled correctly, network available, payment approved. Map that first for clarity, then deliberately map at least the most important edge cases: what happens on a validation error, a timeout, an empty state, or a permission denial. Each edge case you map now is one fewer surprise gap when the flow reaches development.

Entry points and exits: A flow needs more than one entry point mapped realistically — users can land on a product screen from a push notification, a shared link, a search result, or the home screen, not only from a fresh app launch. Similarly map exits: where can a user back out, cancel, or abandon a flow, and does the product handle that gracefully (saved draft, confirmation dialog) or just lose their progress?

Tools and conventions: Figma (using its own frames connected with arrows, or FigJam for a looser diagram), Miro, and Whimsical are common tools for flow mapping. Use consistent shapes — rectangles for screens, diamonds for decision points, arrows labeled with the triggering action — so anyone reading the diagram, including a developer later, can follow it without you narrating it out loud.`,
  "vd-2-4": `Overview: Navigation is the system that lets users move between the destinations mapped in your information architecture and screen flows. Choosing the right navigation pattern is a structural decision, not a visual one — the wrong pattern makes even well-organized content feel lost. The most important idea in this lesson is that navigation choice should follow the shape of your content and the platform's own conventions, not personal preference.

Common mobile patterns: A bottom tab bar (2-5 top-level destinations, always visible, following Jakob's Law expectations from apps like Instagram or M-Pesa) works best for a small number of frequently-used top-level sections. A hamburger menu hides more destinations behind one icon, trading discoverability for screen space — appropriate for secondary or infrequently used items, but risky for anything a user needs often, since hidden items get used less simply because they're hidden. A hybrid pattern (visible tab bar plus a "More" tab that opens a fuller list) is common when there are more sections than a tab bar can comfortably hold.

Hierarchical vs flat navigation: Hierarchical navigation nests content in parent-child relationships (category > subcategory > item), matching a deep site map; flat navigation puts more destinations at one level, trading depth for fewer taps. Given what Lesson 1-5 covered about users getting lost faster in deep trees, default toward flatter structures unless the content genuinely has strong natural hierarchy, like an e-commerce catalog.

Platform conventions matter: iOS and Android have different default patterns and back-navigation behavior (iOS commonly favors a bottom tab bar with a top navigation bar showing a back chevron; Android's system back gesture/button changes what an in-app back button even needs to do). Departing too far from platform convention forces users to relearn basic navigation, which fights Jakob's Law directly.

Signaling current location: Whatever pattern you choose, always give users a clear "you are here" signal — a highlighted tab icon, a breadcrumb, a page title — since Nielsen's heuristic of visibility of system status applies directly to navigation. A user who can't tell where they are in an app loses trust quickly, even if every individual screen is well designed.`,
  "vd-2-5": `Overview: Forms are where products most often lose users, because every additional field or unclear instruction adds friction at the exact moment a user is trying to commit to an action. This lesson is about designing forms and their many states so they guide rather than obstruct. The most important idea in this lesson is that a form's default (empty), focused, filled, error, and disabled states all need to be designed on purpose, not left to whatever the browser or framework does by default.

Field reduction and grouping: The single highest-leverage form improvement is usually removing fields, not styling them better — ask whether each field is truly required now, or could be collected later or inferred. Group related fields logically (name fields together, address fields together) and order them in the sequence a person would naturally think of them, since Hick's Law shows that more choices and more fields presented at once increase decision time and abandonment.

Labels, placeholders, and input types: Use persistent labels above fields rather than relying on placeholder text alone — placeholder text disappears once a user starts typing, which removes context exactly when they might need to double-check what a field wants, especially on longer forms. Match input types to the data (a numeric keypad for a phone number field, a date picker for dates) so mobile users aren't fighting the wrong keyboard.

Validation timing: Validate on blur (when a user leaves a field) or on submit, not on every keystroke, since flagging an email as "invalid" while someone is still mid-typing it feels punishing rather than helpful. Inline, field-level error messages that explain exactly what's wrong and how to fix it ("Enter a valid phone number, e.g. 07XX XXX XXX") perform far better than a generic banner at the top of the form saying "there were errors."

Disabled and loading states: A disabled submit button should visually read as disabled (lower contrast, no hover affordance) so users don't wonder if it's broken, and it should become active the moment requirements are met — not require an extra unrelated action. During submission, show a loading state on the button itself (spinner, "Submitting..." label) so the system status stays visible, directly supporting Nielsen's heuristic that systems should always keep users informed of what's happening.`,
  "vd-2-6": `Overview: Feedback and error states are how a product communicates its own status back to the user — success, failure, loading, or emptiness. Designing these deliberately, rather than leaving them as an afterthought for developers to improvise, is directly tied to Nielsen's heuristic of visibility of system status: users should always know what's happening, what just happened, and what to do next. The most important idea in this lesson is that silence is the worst state a product can be in — an unlabeled blank screen or a frozen button reads as broken even when it technically isn't.

The four core states: Every data-dependent screen needs at minimum a loading state, an empty state, a success state, and an error state designed on purpose. Loading states (skeleton screens, spinners, progress bars) reassure users something is happening during a wait; empty states (a first-use screen with no data yet) should explain what belongs there and how to add it, not just show blank space; success states confirm an action worked, often briefly, before moving on; error states explain what went wrong in plain language and, wherever possible, a concrete next step.

Writing good error messages: A good error message names the problem specifically and avoids blame or jargon — "We couldn't reach the server. Check your connection and try again" beats "Error 500" or "Something went wrong." Where the cause is on the user's side (like an invalid field), point directly at it; where the cause is on the system's side, don't imply the user did something wrong.

Empty states as an opportunity: A well-designed empty state does more than say "nothing here" — it can explain the feature's value and offer a clear first action, functioning as a small piece of onboarding at exactly the moment a user needs direction. A to-do app's empty task list, for instance, is a natural place for a prominent "Add your first task" prompt rather than a bare, unexplained blank list.

Toasts, banners, and inline feedback: Match the feedback mechanism to the severity and scope of the event — a small, temporary toast for a low-stakes confirmation ("Saved"), a persistent banner for something the user must act on (an expired session), and inline, field-level feedback for form-specific issues. Overusing intrusive modals for minor feedback trains users to dismiss dialogs without reading them, weakening feedback for the moments that truly need attention.`,
  "vd-2-7": `Overview: This checkpoint tests whether your Module 2 work — sketches, low-fi wireframes, screen flows, navigation choices, forms, and feedback states — forms one coherent, navigable structure grounded in the Module 1 research. The most important idea here is that a wireframe set is only successful if a stranger could follow it end to end without you explaining anything out loud.

What a strong submission includes: A complete flow diagram covering at least one full happy-path journey plus its major edge cases, low-fidelity wireframes for every screen in that flow, an explicit navigation pattern choice with a one-line justification tied to your content and platform, at least one form screen with its states (empty, error, disabled, success) designed, and at least one non-form screen with loading/empty/error states designed.

The walkthrough test: Before submitting, do a cold walkthrough — hand the wireframes (or a link) to someone who hasn't seen the project and ask them to narrate what they'd tap and why, without your help. Every place they hesitate, ask "what happens if...," or guess wrong is a real structural gap, not a taste disagreement, and it should be fixed before adding any visual polish in Module 3.

Tracing back to research: A strong checkpoint explicitly ties structural decisions back to Module 1 evidence — "bottom tab navigation was chosen because the persona is a frequent, task-focused mobile user," not just "it looked cleaner." Reviewers at this stage are checking whether your structure actually serves the problem you defined, not whether it resembles an app you admire.

What NOT to fix yet: Resist the urge to add color, real typography, or brand personality at this stage even if you're tempted — that's Module 3's job, and doing it now reintroduces the "fidelity trap" from Lesson 2-2, where surface polish distracts reviewers from remaining structural gaps. A wireframe checkpoint that's still gray and rough, but flawless, is a stronger submission than one that looks pretty but hides broken flows underneath.`,
  "vd-3-1": `Overview: Typography carries most of the information in any interface, so it deserves the same systematic thinking as layout or color, not last-minute font-picking. The most important idea in this lesson is that a type system — a small, deliberate set of sizes, weights, and line heights — reads as more professional and is far easier to maintain than a page where every heading was sized by eye.

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

Component states in Figma: Figma's Variants feature groups related versions of a component (e.g. Button/Primary/Default, Button/Primary/Hover, Button/Primary/Disabled) into a single component set, letting designers swap between states from one dropdown in the right panel instead of managing dozens of disconnected duplicate layers. Combined with Interactive Components (prototyping variant swaps triggered by hover, press, or click directly in prototype mode), this lets a button convincingly demonstrate its hover and pressed states inside a clickable prototype.

Building with Auto Layout for resilience: Buttons and cards built with Auto Layout resize gracefully when their label text changes length (a button that says "Continue" vs. "Continue to payment" should stretch, not overflow or clip), which matters enormously once real copy replaces placeholder text later in the project. A component that only looks right with the exact original sample text is fragile and will break in production.

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

Microcopy and localization awareness: For a Kenyan audience, be deliberate about currency formatting (KSh with comma separators, e.g. KSh 12,500), phone number formats, and date conventions, and keep sentences short and direct rather than relying on idioms that may not translate cleanly if the product later supports Swahili or other local languages — clear, simple English microcopy now also makes future localization work significantly easier.`,
  "vd-4-6": `Overview: Usability testing is how you find out whether your prototype actually works for real people, rather than just for you and your assumptions. The most important idea in this lesson is that watching someone struggle silently through a task teaches you more than any amount of internal debate about whether a design "feels right."

Planning a test: Write 3-5 realistic task scenarios phrased as goals, not instructions — "You want to send KSh 500 to a friend" rather than "Tap the Send button" — since instructing the exact steps defeats the purpose of testing whether the flow is discoverable on its own. Recruit 5 participants where possible; usability research popularized by Jakob Nielsen has long shown that around 5 users typically surface most of a design's major usability problems, with diminishing returns from testing many more at once, making it realistic for a student project with limited time.

Moderated testing with a Figma prototype: Share your prototype's Present-mode link and ask the participant to think aloud — narrating what they're looking at, what they expect to happen, and what confuses them — while you observe without helping or hinting, even when you can see them heading toward a wrong path. Figma's own commenting and observation tools can capture notes directly on frames where issues occurred, which keeps findings tied precisely to the screen and element involved rather than a vague general impression.

What to record: For each task, note whether it was completed, how long it took, how many wrong turns or hesitations occurred, and the participant's own words about confusion or frustration — direct quotes are often more persuasive to a reviewer than a designer's paraphrased summary of the same moment. Distinguish between a fatal error (task not completed) and a minor friction point (completed, but with visible hesitation), since they warrant very different levels of fix priority.

From findings to fixes: After testing, group findings by severity and frequency — an issue that stopped 4 of 5 participants outranks a minor visual quibble raised by one person. Update the prototype based on the highest-priority findings and, where time allows, retest the changed flow, since usability testing is most valuable as a short, repeated loop rather than a single one-off event done right before a deadline.`,
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

HTTP requests and responses: HTTP (HyperText Transfer Protocol) is the language browsers and servers use to talk. A request has a method (GET to fetch data, POST to send data, and others like PUT and DELETE), a URL, and headers describing the request. The server replies with a response that includes a status code (200 for success, 404 for not found, 500 for server error) and a body, usually HTML, CSS, JavaScript, JSON, or images. HTTPS adds TLS encryption on top of HTTP so the conversation cannot be read or tampered with in transit.

Rendering the page: Once the browser receives the HTML, it builds the DOM (Document Object Model), a tree structure representing every element on the page. As the browser encounters linked CSS files it builds the CSSOM (CSS Object Model) for styles, and as it encounters script tags it downloads and runs JavaScript, which can further change the DOM. The browser combines DOM and CSSOM into a render tree, calculates layout, and paints pixels to the screen. This sequence explains why a page can appear to load in stages rather than all at once.

Client versus server: Some work happens on the server before anything is sent, such as querying a database or applying business logic. Other work happens on the client, in the browser, such as validating a form before submission or updating the interface without a full page reload. Modern frameworks like Next.js, which this course covers, deliberately blur this line by letting you choose per component whether code runs on the server or the client.

Why this matters for developers: When a site feels slow, the cause is almost always in this pipeline: a slow DNS lookup, a large HTML or JavaScript payload, a blocking script, or a slow server response. Learning to read browser developer tools, particularly the Network and Performance tabs, lets you see each of these steps happening and diagnose real problems instead of guessing.`,
  "vc-1-2": `Overview: HTML (HyperText Markup Language) is the skeleton of every web page. It does not describe how things look, that is CSS's job, it describes what things are: a heading, a paragraph, a list, a link. A correctly structured HTML document is the foundation that makes styling, accessibility, and search engines all work properly, so getting this right early saves pain later.

The document skeleton: Every HTML document starts with a doctype declaration, <!DOCTYPE html>, which tells the browser to render in standards mode. Inside the <html> element sit two children: <head>, which holds metadata not shown directly on the page such as the <title>, <meta charset="UTF-8">, and linked stylesheets, and <body>, which holds everything visible to the user. Every tag that opens must close, and tags must nest properly, an unclosed or mismatched tag is one of the most common sources of layout bugs.

Meta tags and character encoding: The <meta charset="UTF-8"> tag should be the first element inside <head> so the browser reads the rest of the document correctly, especially important for names and text with special characters common in Kenyan and Swahili content. The <meta name="viewport" content="width=device-width, initial-scale=1"> tag tells mobile browsers to render at the device's actual width instead of a shrunk desktop layout, without it responsive design will not work correctly on phones.

Attributes and elements: HTML elements can carry attributes that add information or behavior, such as href on a link, src and alt on an image, or class and id for styling and JavaScript hooks. Void elements like <img>, <br>, and <input> do not wrap content and do not need a closing tag. Understanding the difference between an element (the full tag pair with its content) and an attribute (a property inside the opening tag) makes reading documentation much easier.

Comments and readability: HTML comments, written as <!-- like this -->, are ignored by the browser but help you and teammates understand a file's structure, especially useful for marking where major sections begin in a long page. Consistent indentation, one nested level per tag, also makes structure easy to scan even before adding CSS.

Why structure matters before styling: A page with sloppy, non-nested markup will still often render something in the browser, because browsers are forgiving, but that forgiveness hides bugs that surface later when you add CSS or JavaScript. Starting every project with a clean, valid skeleton means the tools you add next, CSS selectors, JavaScript event listeners, screen readers, all have a reliable structure to work with.`,
  "vc-1-3": `Overview: Semantic HTML means choosing elements based on their meaning, not just their default appearance. A <div> and a <nav> can look identical after styling, but only one tells the browser, screen readers, and search engines what that section actually is. This lesson is about writing markup that communicates, which pays off in accessibility, SEO, and code that other developers can understand at a glance.

Landmark elements: HTML5 introduced structural elements that replace generic <div> soup: <header> for introductory content, <nav> for navigation links, <main> for the primary content of the page (there should only be one per page), <section> for a thematic grouping of content usually with its own heading, <article> for self-contained content like a blog post, <aside> for tangential content like a sidebar, and <footer> for closing information. Screen readers expose these as landmarks, letting users jump directly to the navigation or main content instead of tabbing through everything.

Headings and document outline: Headings from <h1> through <h6> should form a logical outline, one <h1> per page describing its main topic, with <h2> for major sections and <h3> for subsections nested beneath them. Skipping levels purely for font size, such as jumping from <h1> to <h4> because it looks smaller, breaks the outline that assistive technology relies on; font size should be controlled with CSS instead.

Text-level semantics: Not all emphasis is equal. <strong> marks text of strong importance and is announced differently by screen readers, while <em> marks stressed emphasis, both differ from simply styling text bold or italic with CSS, which carries no semantic meaning. <p> for paragraphs, <ul> and <ol> for unordered and ordered lists, and <blockquote> for quoted content all give meaning that a generic <div> cannot.

When div and span are correct: <div> and <span> are not wrong, they are the right choice when an element exists purely for styling or scripting purposes and has no semantic meaning of its own, a wrapping <div> for a CSS grid layout is a perfectly normal use case. The rule of thumb is to reach for a semantic element first and fall back to <div> or <span> only when no meaningful element fits.

Why this matters in practice: Search engines weigh content inside <main>, <article>, and proper headings more heavily when determining what a page is about, directly affecting SEO. Screen reader users navigate by landmarks and headings as their primary way of skimming a page, so semantic markup is not a nice-to-have, it is what makes a site usable at all for a meaningful share of visitors.`,
  "vc-1-4": `Overview: CSS selectors are how you tell the browser which elements a rule applies to. Mastering selectors means you can target exactly the elements you intend, no more and no less, instead of adding classes everywhere or fighting unexpected styles. This lesson builds the vocabulary you will use in every layout from here on.

Basic selectors: A type selector targets an element by tag name, like p or h1. A class selector, written with a leading dot like .card, targets every element carrying that class attribute, and is the most commonly used selector because it is reusable across many elements. An ID selector, written with a leading hash like #site-header, targets a single unique element, since IDs must be unique per page; IDs are best reserved for JavaScript hooks and anchor links rather than styling, because they carry high specificity that is hard to override later.

Combinators: Selectors can be combined to target relationships between elements. A descendant combinator, a space like .card p, selects any p anywhere inside a .card. A child combinator, > like .card > p, selects only direct children. An adjacent sibling combinator, + like h2 + p, selects a p immediately following an h2, and a general sibling combinator, ~, selects all matching siblings that follow. These let you style based on document structure without adding extra classes.

Pseudo-classes and pseudo-elements: Pseudo-classes like :hover, :focus, :first-child, and :nth-child(2) target elements based on state or position rather than an attribute. :focus-visible specifically targets keyboard focus rather than mouse clicks, which matters for accessible focus styles. Pseudo-elements like ::before and ::after let you insert generated content or decorative styling without adding extra markup, commonly used for icons, quotation marks, or decorative shapes.

Specificity and the cascade: When multiple rules target the same element, the browser resolves conflicts using specificity, calculated roughly as inline styles beat IDs, IDs beat classes and attribute selectors, and classes beat type selectors, with later rules in the stylesheet winning ties. Understanding specificity explains why a style you wrote is not applying, usually because another rule elsewhere has a higher specificity score, not because CSS is broken.

Writing maintainable selectors: The best practice for most projects is to keep specificity low and consistent by relying mainly on class selectors, avoiding deeply nested combinators and ID selectors for styling, and avoiding the !important flag except as a last resort, since it overrides the cascade and makes future overrides very difficult.`,
  "vc-1-5": `Overview: The CSS box model describes how every element on a page is structured as nested boxes: content, padding, border, and margin. Nearly every layout bug, from unexpected overflow to mismatched spacing, comes back to misunderstanding how these boxes are measured and combined, so this is one of the most practically important lessons in the whole course.

The four layers: The content box holds the actual text or child elements and is sized by width and height. Padding is space inside the border, between the content and the border edge, and it takes on the element's background color. The border sits outside the padding and can have its own width, style, and color. Margin is space outside the border, between this element and its neighbors, and it is always transparent since it is not part of the element itself, just spacing around it.

box-sizing, the setting that fixes most confusion: By default, the browser uses box-sizing: content-box, meaning width and height apply only to the content box, so padding and border are added on top, making an element wider than its declared width. Setting box-sizing: border-box makes width and height include padding and border, so a 300 pixel wide box stays 300 pixels wide no matter how much padding you add. Most modern CSS resets apply border-box globally with a rule like * { box-sizing: border-box; }, and this course follows that convention because it makes sizing predictable.

Margin collapsing: Vertical margins between adjacent block-level elements can collapse, meaning the space between them becomes the larger of the two margins rather than their sum, a behavior that surprises many beginners. This does not happen with horizontal margins, and it does not happen inside flex or grid containers, only in normal block flow, which is one more reason modern layouts increasingly favor flexbox and grid.

Shorthand properties: Padding and margin accept shorthand values: a single value applies to all four sides, two values apply to vertical then horizontal, and four values apply top, right, bottom, left in that clockwise order. Border shorthand combines width, style, and color in one declaration, like border: 1px solid #ccc.

Debugging spacing issues: When spacing looks wrong, opening browser DevTools and inspecting the box model diagram for that element is the fastest way to see exactly how much padding, border, and margin are being applied, rather than guessing by trial and error in the CSS file.`,
  "vc-1-6": `Overview: Responsive units let a design adapt to different screen sizes instead of breaking. Choosing the right unit for the right job, fixed versus relative, is what separates a layout that looks intentional on a phone, tablet, and desktop from one that only ever looked right on the screen it was designed on.

Absolute units: Pixels (px) are an absolute unit, a fixed number of device pixels regardless of context. Pixels are predictable and useful for things like borders that should genuinely stay one pixel thick, but using them for font sizes and layout widths ignores the user's browser zoom and font size preferences, which is an accessibility problem for anyone who has increased their default text size.

Font-relative units: em is relative to the font size of the current element's parent, which means em values compound as you nest elements, a common source of confusing, unpredictable sizing. rem (root em) is relative to the font size of the root html element only, not any parent, making it predictable and the preferred unit for font sizes, spacing, and even widths in most modern CSS, since it scales cleanly when a user changes their browser's base font size.

Viewport-relative units: vw and vh are percentages of the viewport's width and height respectively, so 50vw is always half the browser window's width. These are powerful for full-bleed sections and fluid typography but risky when used alone for font sizes, because at very narrow or very wide viewports text can become unreadably small or huge.

percent: The % unit is relative to the parent element's corresponding dimension, commonly used for widths in fluid layouts, such as an image set to width: 100% so it never exceeds its container.

clamp() for fluid values: The clamp(min, preferred, max) function lets a single declaration set a minimum, a preferred fluid value, and a maximum, for example font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem) scales smoothly between screen sizes while never going smaller or larger than the bounds you set. Combining a rem term with the vw term in the preferred value, rather than using vw alone, matters for accessibility, because it means the text still responds correctly to the user's browser zoom level even as it also scales with viewport width. This one function has reduced how many media queries are needed purely for typography.

Choosing units in practice: A solid default for this course is rem for font sizes and spacing, percent or fractional units for flexible widths inside flex and grid containers, and clamp() wherever you want smooth scaling across breakpoints instead of abrupt jumps.`,
  "vc-1-7": `Overview: This checkpoint closes Module 1 by pulling together everything you have learned about how the web works, HTML structure, semantic markup, selectors, the box model, and responsive units into a single small project you can show in a portfolio. The goal is not new syntax, it is proving you can combine these foundations cleanly and explain the choices you made.

What a strong submission demonstrates: A strong checkpoint page starts with valid, semantic HTML, a single h1, a logical heading outline, and real landmark elements (header, nav, main, footer) instead of an unlabeled stack of divs. It applies box-sizing: border-box globally, uses class selectors as the primary styling hook rather than IDs or deep combinators, and uses rem and percentage units rather than hardcoded pixel widths so the page does not break when the viewport changes.

Common mistakes to catch before submitting: Missing the viewport meta tag is the single most common reason a page looks fine on desktop and broken on a phone. Others include using a div where a semantic element existed for that exact purpose, skipping heading levels for visual sizing instead of controlling size with CSS, and forgetting alt text on meaningful images, a preview of the accessibility work coming in Module 7 but worth building as a habit now.

Self-review checklist: Before considering the page done, validate the HTML structure by reading it top to bottom without the CSS applied, does it still make sense as an outline? Resize the browser window from narrow to wide and watch for any element that overflows its container or text that becomes unreadably small. Check that every interactive element (links, buttons) is reachable and visibly identifiable.

How this connects forward: Everything from this module becomes the raw material for Module 2's layout work. Flexbox and grid do not replace the box model, semantics, or selectors, they build directly on top of them, so a shaky foundation here will resurface as confusing layout bugs later. Treat this checkpoint as the moment to lock in habits (border-box by default, semantic tags by default, rem by default) that you will not want to rebuild later under deadline pressure.

Presenting the work: When you add this to a portfolio or share it for review, briefly note the structural decisions you made, why you chose a particular landmark element or unit, since being able to explain your reasoning is itself part of what makes a submission look like the work of a developer rather than someone copying a template.`,
  "vc-2-1": `Overview: Flexbox is a one-dimensional layout model built for arranging items in a row or a column and distributing space between them. It solved problems that used to require hacks like floats and negative margins, and it remains the right tool whenever you are laying out a single row or column of items, like a navigation bar, a button group, or a card's internal content.

Container and items: Flexbox has two roles. Setting display: flex on a parent makes it a flex container, and every direct child automatically becomes a flex item, arranged in a row by default. flex-direction controls the main axis: row (default), row-reverse, column, or column-reverse. Understanding that flexbox always has a main axis (the direction items flow) and a cross axis (perpendicular to it) is essential, because alignment properties behave differently depending on which axis they control.

Aligning along the main axis: justify-content controls spacing along the main axis, with common values flex-start, center, flex-end, space-between (equal gaps between items, none at the edges), and space-around (equal gaps including edges, though edge gaps are visually half-size). This single property solves most horizontal centering and spacing problems that used to require manual margin calculations.

Aligning along the cross axis: align-items controls how items align along the cross axis within the container, with values like stretch (default, items fill the cross axis), center, flex-start, and flex-end. align-self overrides align-items for a single individual item when you need one item to behave differently from its siblings.

Controlling item sizing: The flex shorthand property, flex: grow shrink basis, controls how an item grows or shrinks relative to its siblings when there is extra or insufficient space. flex: 1 is a common pattern meaning an item should grow to fill available space equally with any other flex: 1 siblings. flex-wrap: wrap allows items to move to a new line when they no longer fit, which combined with gap for consistent spacing between items (without the collapsing issues of margins) is the standard modern approach to a wrapping row of cards or buttons.

When to reach for flexbox: Flexbox shines for one-dimensional problems: centering a single item, distributing navigation links, aligning a card's icon and text, or building a button row. When you need to control both rows and columns together as a cohesive grid, that is the signal to reach for CSS Grid instead, covered next.`,
  "vc-2-2": `Overview: CSS Grid is a two-dimensional layout system that lets you control rows and columns at the same time, something flexbox cannot do natively. Grid is the right tool whenever a layout has a genuine grid-like structure, a page shell with a header, sidebar, main content, and footer, or a gallery of evenly sized cards, and it dramatically reduces the amount of CSS needed to build layouts that used to require complex float or flexbox workarounds.

Defining the grid: Setting display: grid on a container turns it into a grid container, and its direct children become grid items placed into an implicit single-column grid by default. grid-template-columns and grid-template-rows explicitly define the size of each column and row track, for example grid-template-columns: 1fr 2fr 1fr creates three columns where the middle one is twice as wide as the others, using the fr (fractional) unit which distributes remaining space proportionally.

The repeat() and minmax() functions: Writing out many equal columns by hand is tedious, so repeat(3, 1fr) is shorthand for three equal fr columns. Combined with minmax(), grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) creates a genuinely responsive grid with zero media queries: as many columns as fit at a minimum of 200px each, growing to fill leftover space, and automatically reflowing to fewer columns as the viewport narrows. This single pattern replaces a large amount of manual breakpoint logic for card grids.

Gap and placement: The gap property (with row-gap and column-gap available separately) sets spacing between grid tracks without the margin-collapsing issues of older techniques. Items can be explicitly placed using grid-column and grid-row with line numbers or the span keyword, for example grid-column: span 2 makes an item occupy two column tracks, useful for featured cards or hero sections inside an otherwise uniform grid.

Named template areas: grid-template-areas lets you lay out a page shell by naming regions in a visual ASCII-like map, then assigning each child to a named area with grid-area, which makes complex page layouts like "header / sidebar / main / footer" far more readable in the CSS than a series of line-number placements.

Grid versus flexbox in practice: Grid excels when you are thinking in both rows and columns at once, page shells, photo galleries, dashboards, while flexbox excels for simpler, single-direction groupings. In real projects it is normal and expected to nest flexbox inside grid items, using each tool for the part of the layout it fits best.`,
  "vc-2-3": `Overview: A navigation bar is one of the first real components students build because it combines flexbox alignment, responsive behavior, and semantic HTML in one recognizable piece. A well-built nav bar is not just visually correct, it should be keyboard accessible and adapt sensibly on narrow screens rather than simply shrinking until it breaks.

Semantic structure: A navigation bar belongs inside a <nav> element, ideally with an aria-label such as aria-label="Primary" if there is more than one nav region on the page (a footer nav, for instance). Links live in a <ul> of <li> elements, not bare <a> tags side by side, because a list communicates to assistive technology that these are a set of related navigation options, and CSS then removes the default list bullets and spacing.

Layout with flexbox: The typical structure is a flex container with justify-content: space-between to push a logo to one side and the link list to the other, with align-items: center keeping everything vertically aligned regardless of differing heights between a logo image and text links. The link list itself is also commonly a flex container with a gap between individual links, avoiding the old technique of margin-right which suffers from margin collapsing and awkward last-child handling.

Sticky and fixed positioning: Many nav bars use position: sticky combined with top: 0 so the bar stays visible as the user scrolls, without the layout jump issues position: fixed can cause. Sticky positioning only takes effect within its containing block, so it is worth testing that the nav bar's parent does not have overflow settings that prevent the sticky behavior from working.

Mobile navigation patterns: Below a chosen breakpoint, the common pattern is to collapse links behind a toggle button, often called a hamburger menu, implemented as a real <button> (never a div, for keyboard and screen reader accessibility) that toggles a class or an aria-expanded attribute, which JavaScript then uses to show or hide the link list, commonly as a full-width dropdown or slide-in panel. The toggle button needs a clear accessible name, such as aria-label="Toggle navigation menu", since a hamburger icon alone conveys nothing to a screen reader.

Focus and current-page indication: Every link needs a visible :focus-visible style so keyboard users can see where they are, and marking the active page's link with aria-current="page" gives both sighted and assistive-technology users a reliable way to know where they currently are on the site.`,
  "vc-2-4": `Overview: A hero section is the large, attention-grabbing block at the top of a page, and how you structure it sets the tone for the rest of the page's sections. This lesson focuses on building sections that stay legible and well-proportioned across screen sizes, not just on the designer's original viewport.

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
  "vc-2-6": `Overview: Responsive debugging is the practical skill of finding and fixing layout problems across screen sizes, rather than designing blind and hoping it works. This lesson is less about new CSS properties and more about a systematic process, because most responsive bugs come from a small, recognizable set of causes once you know what to look for.

Using DevTools device mode: Every major browser's DevTools includes a device toolbar that simulates different viewport widths and device pixel ratios. Rather than only checking a handful of fixed device presets, drag the viewport width freely from very narrow to very wide, since real bugs often appear at in-between widths that no preset device happens to match, not just at common breakpoints like 375px or 768px.

The usual suspects for overflow bugs: Horizontal scrollbars appearing unexpectedly are almost always caused by one of a few things: an element with a fixed width or min-width wider than its container, an image without max-width: 100%, long unbroken text or URLs without overflow-wrap: break-word, or negative margins pushing content outside its parent. Setting overflow-x: hidden on the body can hide the symptom but does not fix the underlying cause, so it should be a last resort, not a first response.

Finding the exact offending element: Adding a temporary outline: 1px solid red to * (the universal selector) in DevTools' inline style editor is a fast, low-effort way to visually spot which element is wider than expected, since the outlined boxes make overflow obvious at a glance. Once found, checking that element's computed width, padding, and margin in the DevTools box model panel usually reveals the cause immediately.

Media query strategy: A mobile-first approach, writing base styles for small screens and adding min-width media queries to enhance the layout for larger screens, tends to produce fewer bugs than a desktop-first approach with max-width overrides, because it means every screen size gets an intentional, complete style rather than leftover desktop styles that were never fully unwound.

Testing on real constraints: Beyond DevTools, testing text at larger zoom levels (simulating low-vision users) and testing with a genuinely slow network throttle setting catches problems that a fast desktop connection at 100% zoom will never reveal, both of which are common real-world conditions for site visitors, especially relevant for mobile-heavy audiences.`,
  "vc-2-7": `Overview: This checkpoint closes Module 2 by combining flexbox, grid, navigation, hero sections, cards, and responsive debugging into one complete, multi-section landing page. The goal is demonstrating layout judgment, knowing which tool fits which part of a page, rather than showing off every technique in one cramped design.

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
  "vc-3-3": `Overview: DOM selection is how JavaScript finds elements on a page so it can read or change them. Every interactive feature, showing a menu, updating text, toggling a class, starts with selecting the right element, so precise, efficient selection is a core skill before anything about events or state matters.

Modern selection methods: document.querySelector(selector) returns the first element matching a CSS selector, and document.querySelectorAll(selector) returns all matching elements as a NodeList. Because these accept any valid CSS selector, the exact same selector knowledge from Module 1 (classes, IDs, combinators, pseudo-classes like :first-child) transfers directly into JavaScript, making querySelector the standard, flexible choice for most selection needs today, favored over older methods like getElementById and getElementsByClassName in modern code because of that flexibility and consistency.

NodeList behavior: A NodeList returned by querySelectorAll is not a true array, but it does support forEach directly, so elements.forEach(el => { ... }) works without conversion. If you need array methods like map or filter, wrap it with Array.from(elements) or the spread syntax [...elements] first, since NodeLists lack those array-specific methods.

Reading and changing content: Once an element is selected, element.textContent reads or sets its plain text content, while element.innerHTML reads or sets its HTML markup, allowing new elements to be inserted, though innerHTML should be used cautiously with any content that includes user input, since it can introduce cross-site scripting vulnerabilities if untrusted text is inserted directly as HTML.

Working with classes and attributes: element.classList provides add(), remove(), toggle(), and contains() methods for managing CSS classes, the standard way to change an element's appearance from JavaScript rather than directly manipulating its style property for anything beyond one-off inline adjustments. element.setAttribute() and element.getAttribute() read and write arbitrary HTML attributes, useful for things like aria-expanded when building accessible interactive components.

Traversal and timing: Once you have one element, properties like parentElement, children, and closest(selector) (which walks up the DOM tree to find the nearest matching ancestor) let you navigate relative to it without a fresh query. A common beginner mistake is running selection code before the DOM has finished parsing, placing script tags at the end of the body, or wrapping code in a DOMContentLoaded event listener, avoids selecting elements that do not exist yet.`,
  "vc-3-4": `Overview: Events are how JavaScript responds to what a user does, clicking, typing, submitting a form, and forms are the primary way users send information into a page. Together, event handling and form interaction are what turn a static page into something a user can actually interact with.

Adding event listeners: element.addEventListener("click", handlerFunction) is the standard way to respond to events, preferred over inline onclick attributes in HTML because it keeps behavior separate from markup and allows attaching multiple listeners to the same element. The handler function receives an event object as its argument, which carries useful information such as event.target (the exact element that triggered the event) and methods like event.preventDefault(), essential for stopping a form's default full-page-reload submission behavior.

Event delegation: Rather than attaching a listener to every individual item in a list, event delegation attaches a single listener to a shared parent element and checks event.target inside the handler to determine which child was actually interacted with. This is more efficient and, importantly, automatically works for elements added to the page later, a pattern that becomes especially relevant once you are rendering dynamic lists.

Common events: "click" for buttons and links, "input" for real-time changes as a user types into a text field, "change" for form controls like select and checkbox where the value updates once and on blur/selection rather than every keystroke, and "submit" on the <form> element itself, which should generally be paired with event.preventDefault() when you intend to handle the submission with JavaScript instead of a full page reload.

Reading form values: Each form control exposes its current value through element.value (for text inputs and selects) or element.checked (for checkboxes and radio buttons). A well-structured form pairs every <input> with a <label>, connected either by wrapping the input inside the label or by matching a label's for attribute to the input's id, which is both an accessibility requirement and a usability improvement, since clicking a label then focuses or toggles its associated input.

Basic validation: Before relying entirely on JavaScript, native HTML attributes like required, type="email", minlength, and pattern provide built-in browser validation with no code at all. JavaScript-based validation, checking values in a submit handler, becomes necessary for more complex rules like confirming two password fields match, and should always show clear, specific feedback about what needs to be corrected rather than a generic error.`,
  "vc-3-5": `Overview: Arrays and objects are how JavaScript organizes collections of data, arrays for ordered lists, objects for structured records with named properties. Nearly every piece of real data you will work with, a list of products, a user profile, a set of quiz answers, is represented as some combination of these two structures.

Array fundamentals: An array, const colors = ["red", "green", "blue"], is an ordered list accessed by numeric index starting at 0. Common mutating methods include push() and pop() (add/remove from the end) and splice() (insert or remove at any position), while methods like slice() and the spread operator [...array] create a new array without modifying the original, an important distinction when working with predictable state, especially once you reach React's state model in Module 4.

Array iteration methods: map() transforms every item in an array into a new array of the same length, the standard way to convert raw data into a list of values or UI elements. filter() returns a new array containing only the items that pass a test function, commonly used to remove items matching a condition. reduce() combines every item in an array down to a single value, such as a total or a grouped object, and is the most flexible but also the most complex of the three, worth learning after map and filter feel comfortable. forEach() runs a function for each item purely for side effects, like logging, and does not return a new array, unlike map.

Object fundamentals: An object, const user = { name: "Amina", age: 24 }, stores related values under named keys called properties, accessed with dot notation (user.name) or bracket notation (user["name"]), the latter necessary when the key is dynamic or stored in a variable. Object.keys(), Object.values(), and Object.entries() let you inspect and iterate over an object's structure programmatically.

Destructuring and the spread operator: Destructuring, const { name, age } = user; or const [first, second] = colors;, pulls values out of objects and arrays into standalone variables in one concise line, extremely common in modern JavaScript and in React component code. The spread operator, { ...user, age: 25 } or [...colors, "yellow"], creates a shallow copy with specific properties added or overridden, the standard pattern for updating data immutably rather than mutating the original object or array directly.

Why immutability matters going forward: Frameworks like React detect changes by comparing references, so directly mutating an array or object in place (like calling push() on state) often fails to trigger a re-render. Building the habit now of using map, filter, and spread to produce new arrays and objects instead of mutating existing ones pays off directly once state management begins.`,
  "vc-3-6": `Overview: localStorage is a browser API that lets a website store data on the user's device that persists across page reloads and browser sessions, no backend server required. It is the simplest way to add features like remembering a theme preference, saving a draft, or persisting quiz progress purely on the client side.

The core API: localStorage.setItem(key, value) saves a value under a string key, localStorage.getItem(key) retrieves it (returning null if the key does not exist), and localStorage.removeItem(key) deletes a single entry, while localStorage.clear() removes everything the site has stored. Data persists indefinitely until explicitly cleared by code or by the user through browser settings, unlike sessionStorage, which shares the same API but clears automatically when the browser tab closes.

Strings only, always: localStorage can only store strings. To save anything more structured, an object or array, you must convert it first with JSON.stringify(value) before saving, and convert it back with JSON.parse(storedValue) after retrieving it. Forgetting this conversion is the most common bug with localStorage, either saving "[object Object]" as a literal string, or crashing when trying to call array or object methods on a raw string that was never parsed back.

Handling missing or corrupted data: Because getItem returns null when a key has never been set, and because JSON.parse throws an error on invalid input, defensive code should check for null before parsing and wrap parsing in a try/catch block, falling back to a sensible default value (like an empty array) if anything goes wrong, rather than letting the whole page crash because of one bad stored value.

Limitations to know: localStorage has a storage limit, typically around 5 to 10 megabytes depending on the browser, sufficient for text-based data like preferences or progress but not for large files or images. It is also synchronous, meaning reading or writing blocks the main thread briefly, which matters only for very large amounts of data. Critically, localStorage is per-browser and per-device, not per-user-account, so it is not a substitute for a real backend when data needs to sync across a student's devices or survive a cleared browser cache, a limitation this course revisits directly in Module 6 when building real persistence with an API route.

A practical pattern: A common, safe pattern is a small pair of helper functions, saveProgress(key, data) that stringifies and saves, and loadProgress(key, fallback) that reads, parses defensively, and returns the fallback on any failure, so the rest of the application code never has to think about JSON conversion directly.`,
  "vc-3-7": `Overview: This checkpoint closes Module 3 by combining variables, functions, DOM selection, events, arrays/objects, and localStorage into one small interactive application, commonly a to-do list, quiz, or tracker. The goal is proving you can manage real, changing data in the browser reliably, not just wire up a single button click.

What a strong submission demonstrates: A strong JavaScript checkpoint keeps data as a single source of truth in an array or object, rather than reading values directly out of the DOM to determine state, and re-renders the visible list from that data whenever it changes, rather than manually adding or removing individual DOM nodes in scattered places. It uses const by default, arrow functions for handlers, and array methods (map, filter) instead of manual for loops where they fit naturally. Any data that should survive a page refresh is saved to localStorage with JSON.stringify and safely restored with a defensive JSON.parse.

Common mistakes to catch before submitting: Reading and writing directly to the DOM as the only source of truth, which quickly becomes inconsistent once multiple actions can change the same data. Forgetting event.preventDefault() on a form submit, causing an unwanted page reload. Mutating an array in place with push() or splice() when a fresh array from spread or filter would be safer and easier to reason about. Not handling the case where localStorage is empty on first visit, leaving the page broken until something has been saved once.

Self-review checklist: Trace one full user action, adding an item, for example, from the event listener through to the data update, through to the re-render, through to the localStorage save, and confirm each step actually happens in that order. Refresh the page after adding data and confirm it reappears exactly as expected. Try triggering the same action rapidly or with empty/invalid input, and confirm nothing crashes or silently corrupts the stored data.

How this connects forward: This exact pattern, data as the source of truth, a render function driven by that data, and events that update the data rather than the DOM directly, is precisely the mental model React formalizes with state and JSX starting in Module 4. Getting comfortable with it here in plain JavaScript makes React's approach feel like a natural next step rather than an entirely new way of thinking.`,
  "vc-4-1": `Overview: React is a JavaScript library for building user interfaces out of components, small, reusable pieces of UI that manage their own logic and rendering. This lesson is about the mental shift from the DOM manipulation you practiced in Module 3, where you directly find and change elements, to React's declarative model, where you describe what the UI should look like for a given state, and React figures out how to update the actual DOM to match.

Declarative versus imperative: In vanilla JavaScript, you write imperative instructions: select this element, then change its class, then update its text. In React, you write declarative descriptions: given this piece of state, render this UI. When the state changes, you do not manually update the DOM at all, you simply describe the new UI for the new state, and React calculates the minimal set of actual DOM changes needed and applies them. This shift removes an entire category of bugs where the DOM and your data quietly drift out of sync.

JSX: React components are typically written using JSX, a syntax extension that looks like HTML embedded directly inside JavaScript, for example return <h1>Hello, {name}</h1>;. JSX is not a string or real HTML, it compiles down to function calls that create React elements, and any JavaScript expression can be embedded inside curly braces {}. Because JSX is JavaScript, a few names differ from HTML: className instead of class (since class is a reserved JavaScript word), and event handlers are camelCase, like onClick instead of onclick.

Components as functions: A React component is, at its core, just a JavaScript function that returns JSX describing some UI, and by convention its name starts with a capital letter so React can distinguish it from a regular HTML tag. Components can be composed, nested inside one another, which is how complex interfaces are built from small, focused, reusable pieces rather than one massive template.

The virtual DOM, briefly: React keeps an in-memory representation of the UI, often called the virtual DOM, and when state changes, it compares the new description to the previous one and updates only the real DOM nodes that actually changed, rather than re-rendering the entire page. You do not need to manage this process directly, but understanding that it exists explains why React can be both declarative and performant at the same time.

Why this mental model matters: Every concept in the rest of this module, props, state, rendering lists, forms, builds directly on top of this shift: stop thinking about which DOM nodes to change, and start thinking about what the UI should look like as a function of your data.`,
  "vc-4-2": `Overview: Components and props are how React lets you build one reusable piece of UI and configure it differently each time it is used, exactly the way an HTML <img> tag accepts different src and alt values. This lesson is about designing components that are genuinely reusable rather than one-off copies with slightly different hardcoded text.

What props are: Props (short for properties) are how a parent component passes data down into a child component, similar to how HTML attributes configure an element. A component receives its props as a single object argument, function Card(props) { return <h2>{props.title}</h2>; }, or more commonly destructured directly in the function signature, function Card({ title, description }) { ... }, which is the standard modern style since it makes exactly which props a component expects immediately visible.

Using a component with props: A component is used in JSX like an HTML tag, <Card title="Web Foundations" description="Learn HTML and CSS" />, with each attribute becoming a key on the props object inside the component. Any JavaScript value can be passed as a prop, including numbers, arrays, objects, and even functions, passing a function down as a prop is the standard way a child component notifies its parent that something happened, covered further in the next lesson on state and events.

Props are read-only: A component must never modify its own props directly, props flow one way, from parent to child, and treating them as read-only is what keeps data flow predictable in a React application. If a component needs to change a value over time, that value belongs in state, not in a prop it receives, which is exactly the distinction the next lesson builds on.

The children prop: Every component automatically receives a special children prop representing whatever JSX was nested between its opening and closing tags, <Card>{someContent}</Card>. This is what makes wrapper components, like a reusable Modal, Panel, or Layout component, possible, since the wrapper does not need to know in advance what content it will contain.

Default values and prop validation: Destructured props can specify default values directly in the function signature, function Button({ variant = "primary" }) { ... }, so a sensible fallback applies when a prop is omitted. In TypeScript, which this course's Next.js modules build toward, prop types are explicitly declared, catching an entire category of bugs, like a missing or mistyped prop, before the code ever runs in the browser.

Designing reusable components: A good component asks for exactly the data it needs through props and nothing more, avoids hardcoding text or values that vary between uses, and stays focused on one clear responsibility, the same single-responsibility instinct that makes functions in Module 3 easier to test and reuse.`,
  "vc-4-3": `Overview: State is data that a component manages internally and that can change over time, and events are how user interaction triggers those changes. Together, state and events are what make a React component interactive rather than a static description of UI, and the useState hook is the primary tool for managing that internal data.

The useState hook: const [count, setCount] = useState(0); creates a piece of state, count, initialized to 0, and a function, setCount, used to update it. Calling the setter function does two things: it updates the stored value, and it tells React to re-render the component (and its children) with the new value, this is what actually causes the UI to change on screen, simply reassigning a normal variable would not. State is scoped to the component instance that created it, so two instances of the same component each maintain entirely independent state.

Handling events in JSX: Event handlers are passed as props using camelCase names like onClick, onChange, and onSubmit, and crucially you pass a reference to a function, onClick={handleClick}, not the result of calling it, onClick={handleClick()} would call the function immediately during render instead of waiting for the click. Inline arrow functions, onClick={() => setCount(count + 1)}, are common for short handlers, especially ones that need to pass an argument.

Updating state correctly: When a new state value depends on the previous one, React recommends the functional updater form, setCount(prevCount => prevCount + 1), rather than setCount(count + 1), because state updates can be batched and asynchronous, so referencing the current count variable directly can sometimes use a stale value, while the updater function always receives the true latest state. This matters especially when multiple updates happen close together, such as in rapid clicks or multiple state updates in one handler.

State is not mutated directly: Just as with plain JavaScript arrays and objects in Module 3, state that is an object or array must be updated by creating a new copy with the spread operator and passing that new value to the setter, never by mutating the existing state object or array in place, since React determines whether to re-render by comparing references, and a mutated object still has the same reference.

Why this replaces manual DOM updates: Where Module 3 taught you to manually find an element and update its text after a click, React's model is to update state and let the component's return statement (its JSX) describe what the new UI should look like for that state, React then handles applying the actual DOM changes, which is the declarative shift introduced in the first lesson of this module made concrete.`,
  "vc-4-4": `Overview: Rendering lists is how React turns an array of data into repeated pieces of UI, a list of products, a set of quiz questions, a table of results. This lesson focuses on doing it correctly, particularly around the key prop, since getting keys wrong is one of the most common sources of subtle React bugs.

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

Common mistakes to catch before submitting: Mutating an array or object in state directly instead of using spread to create a new one, which can cause the UI to silently fail to update. Using array index as a key on a list that can be reordered, filtered, or have items removed. Forgetting event.preventDefault() on form submission. Passing too many unrelated props into one component instead of splitting it, a sign a component is doing more than one job.

Self-review checklist: Pick one piece of state and trace it: where it is declared, which components receive it as a prop, and which event handler ultimately calls its setter. Confirm that filtering, sorting, or adding items in the list does not cause any input's typed value to jump to the wrong row, a direct test of whether keys are set correctly. Check that removing all items shows a clear empty state rather than a blank area.

How this connects forward: The component-thinking practiced here, breaking an interface into focused pieces connected by props and state, is exactly the architecture Next.js builds on top of starting in Module 5, where components become pages and layouts within a real file-based routing system, and this same discipline about where state lives becomes even more important once server and client components are both in play.`,
  "vc-5-1": `Overview: Next.js is a React framework that adds file-based routing, built-in performance optimizations, and both server-side and client-side rendering in one coherent system. This course uses the App Router (the app/ directory, current since Next.js 13 and the standard approach going forward), not the older Pages Router, so the file conventions and rendering model covered here reflect how production Next.js apps are actually built today.

File-based routing: Inside the app/ directory, folders define URL segments, and a page.tsx file inside a folder makes that segment a publicly visitable route. For example, app/about/page.tsx becomes the route /about, with no separate router configuration file needed, the file system itself is the route map. Dynamic segments use square brackets, app/blog/[slug]/page.tsx matches any URL like /blog/my-first-post, with the actual value available to the page through its params.

Server components by default: In the App Router, every component is a React Server Component unless explicitly marked otherwise. Server components render on the server and send only the resulting HTML (plus minimal necessary JavaScript) to the browser, which means they can directly access server-only resources like databases or file systems, and they do not increase the JavaScript bundle sent to the client. This is a meaningful shift from the plain React you learned in Module 4, where every component ran in the browser.

Opting into client components: Adding the directive "use client" at the very top of a file marks that component and everything it imports as a client component, meaning it renders in the browser and can use interactive features like useState, useEffect, and event handlers, exactly as in Module 4. The practical rule of thumb is to keep components as server components by default and only add "use client" where interactivity is genuinely needed, keeping the JavaScript sent to the browser as small as possible.

Special files with reserved meaning: Beyond page.tsx, the App Router recognizes several other reserved filenames per folder: layout.tsx wraps a segment and its children with shared UI that persists across navigation, loading.tsx automatically shows while that segment's data is being fetched, and error.tsx catches runtime errors in that segment, all covered in more depth in upcoming lessons this module.

Why this matters for real projects: This file-based, server-first model means routing, data fetching, and rendering strategy are decided largely by where you put a file and whether you add "use client", rather than through separate routing libraries or manual server setup, which is a large part of why Next.js has become the default choice for production React applications.`,
  "vc-5-2": `Overview: Pages and layouts are the building blocks of a Next.js App Router site's structure, pages define the unique content at a route, while layouts define shared UI, like a nav bar or footer, that wraps multiple pages without re-rendering on every navigation. Understanding how they nest is essential for building multi-page sites without duplicating shared UI everywhere.

The root layout: Every Next.js App Router project requires a root layout at app/layout.tsx, and unlike every other layout, it must render the <html> and <body> tags itself, since it is the outermost wrapper for the entire application. It receives a children prop representing whatever page or nested layout is being rendered for the current route, export default function RootLayout({ children }) { return <html><body>{children}</body></html>; }.

Nested layouts: Any folder can contain its own layout.tsx, which wraps only the pages within that folder and its subfolders, nesting inside any parent layouts above it. This is how a section of a site, a dashboard area, for example, can have its own persistent sidebar navigation that stays mounted (preserving its scroll position and internal state) as a user navigates between pages within that section, without affecting the rest of the site.

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

Local versus remote images: Images imported directly from the project's local files, import heroImg from "./hero.jrg";, let Next.js automatically determine width and height from the file itself. Images loaded from an external URL require width and height to be specified manually, and the external domain must be explicitly allowed in the project's Next.js configuration file for security reasons, an intentional safeguard against serving arbitrary external images through the optimization pipeline without the developer's awareness.

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

Common mistakes to catch before submitting: Using plain <a> tags for internal navigation, losing prefetching and client-side transitions. Forgetting "use client" on error.tsx, which will fail since error boundaries require it. Putting page-specific UI inside the root layout instead of the actual page component, which then incorrectly persists across unrelated routes. Leaving default, generic metadata (or none at all) on pages that should have specific, descriptive titles.

Self-review checklist: Click through every internal link and confirm navigation feels instant, without a visible full-page reload flash. Temporarily throttle the network in DevTools to confirm loading.tsx actually appears during a slow load rather than only in theory. Intentionally trigger an error (like requesting nonexistent data) to confirm error.tsx catches it gracefully with a working reset action. Check each page's browser tab title to confirm metadata is unique and descriptive per page, not identical everywhere.

How this connects forward: Everything in this module assumes data eventually comes from somewhere real, an API, a database, a form submission, which is exactly what Module 6 builds on top of this same file-based structure: API routes live alongside pages in the same app/ directory, and the loading and error patterns from this module become directly relevant once real network requests, which can genuinely be slow or fail, are involved.`,
  "vc-6-1": `Overview: HTTP and JSON are the two foundations of how modern web applications exchange data with servers and APIs. Understanding them precisely, not just vaguely, is what makes the difference between confidently debugging a failed request and guessing randomly when something does not work.

HTTP methods and their intent: GET requests retrieve data and should never change anything on the server, making them safe to retry or cache. POST requests submit new data, typically creating something. PUT and PATCH update existing data, with PUT conventionally replacing a full resource and PATCH updating only specific fields. DELETE removes data. Using the semantically correct method, rather than defaulting to GET or POST for everything, matters both for clarity and because browsers, proxies, and caching systems all behave differently depending on the method used.

Status codes as a first debugging signal: Status codes are grouped by their first digit: 2xx means success (200 OK, 201 Created), 3xx means redirection, 4xx means the client made a mistake (400 Bad Request for malformed data, 401 Unauthorized for missing authentication, 403 Forbidden for insufficient permission, 404 Not Found for a missing resource), and 5xx means the server itself failed (500 Internal Server Error). Checking the status code first, before reading any response body, immediately narrows down whether a bug is in the request being sent or in how the server processed it.

Headers: Headers carry metadata about a request or response separate from the actual body content. The Content-Type header tells the receiving side what format the body is in, commonly application/json for API data, and must be set correctly on requests that send a JSON body or the server may fail to parse it. Authorization headers carry credentials like an API token, a pattern this course uses when connecting to real backend services.

JSON as the standard data format: JSON (JavaScript Object Notation) represents structured data as text using a syntax that closely mirrors JavaScript objects and arrays, but with stricter rules: keys must be double-quoted strings, trailing commas are not allowed, and values are limited to strings, numbers, booleans, null, objects, and arrays, functions and undefined have no JSON representation. JSON.stringify() converts a JavaScript value into a JSON string, and JSON.parse() converts a JSON string back into a JavaScript value, the same two functions used with localStorage in Module 3, now applied to network requests and responses instead.

Why this grounding matters before fetching data: Module 6 is entirely about connecting interfaces to real data, and every fetch call, every API route, and every error you will encounter from here forward is expressed in exactly these terms: a method, a status code, headers, and a JSON body, making this lesson's vocabulary the basis for reading any error message you will hit for the rest of the course.`,
  "vc-6-2": `Overview: Fetching data is how a page requests information from a server or API after it has already loaded, the mechanism behind everything from loading a list of posts to checking a login status. This lesson covers the fetch() API and how to fetch data correctly inside React and Next.js components.

The fetch API: fetch(url) sends an HTTP GET request by default and returns a Promise that resolves to a Response object. Critically, that Promise resolves successfully even for error responses like a 404 or 500, fetch only rejects on a network-level failure (like being offline), so checking response.ok (true only for 2xx status codes) is required before trusting the response, a common source of bugs when developers assume a resolved fetch always means success. Calling response.json() reads and parses the body as JSON, itself returning another Promise, so a typical pattern chains two awaits: const response = await fetch(url); const data = await response.json();.

Async/await syntax: Modern JavaScript and React code almost always uses async/await rather than .then() chains for readability, an async function can use the await keyword to pause execution until a Promise resolves, while the rest of the code (and the rest of the page) continues running normally, this is non-blocking. Any function using await must itself be declared async, and errors from a rejected Promise are caught with a standard try/catch block wrapped around the await calls.

Fetching in Server Components: In the App Router, a server component (the default, as covered in Module 5) can be declared async directly and await a fetch call right in the component body, with the resulting data available immediately in the JSX returned, no useEffect or loading state management needed for this case, since the component only renders once the data is ready, on the server.

Fetching in Client Components: A client component (marked "use client") that needs data cannot simply await inside its function body outside of an effect, since components must render synchronously. The standard pattern is the useEffect hook: fetch data inside an effect that runs after the component mounts, store the result in state via useState, and track loading and error states explicitly, since here, unlike a server component, the component renders first (in a loading state) and then updates once the fetch completes.

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

Optimistic versus pessimistic updates: A pessimistic update waits for the server's confirmed response before updating the UI, simpler and safer, the standard default for this course. An optimistic update immediately updates the UI as if the request will succeed, then rolls back if it actually fails, which can feel faster to the user but adds real complexity in handling the rollback case correctly, worth knowing exists but not necessary for every form.

Server Actions, briefly: Next.js also supports Server Actions, async functions marked with "use server" that can be called directly from a form's action prop without manually writing a fetch call or a separate API route, a newer pattern worth being aware of, though this course's API route approach makes the client-server request cycle explicit and is more directly transferable to working with any backend, not just a Next.js one.`,
  "vc-6-5": `Overview: Validation and error handling are what separate a form or API that works in the happy-path demo from one that survives real users, who will submit empty fields, malformed data, and unexpected input constantly. This lesson covers validating on both the client and the server, and returning errors that are actually useful.

Why client-side validation is not enough: Client-side validation (native HTML attributes from Module 3, or JavaScript checks before submission) gives immediate, friendly feedback and reduces unnecessary network requests, but it can always be bypassed, by disabling JavaScript, or by any request sent directly to the API without going through your form at all. Because of this, every API route must independently validate incoming data on the server, treating client-side validation purely as a user experience improvement, never as a security or data-integrity guarantee.

Validating on the server: Inside an API route's handler, after reading the request body with request.json(), each required field should be checked explicitly: is it present, is it the correct type, does it meet length or format constraints, before any further processing happens. If validation fails, the route should return early with a 400 Bad Request status and a clear JSON error message describing exactly what was invalid, rather than allowing bad data to reach a database or crashing with an unrelated error further down the code.

Structuring error responses: A consistent error response shape across every API route in a project, commonly { error: "message" } or { errors: { field: "message" } } for field-specific validation, makes it possible for the client-side code to handle errors predictably in one place rather than needing custom parsing logic for every single endpoint.

Handling unexpected server errors: Beyond validation, an API route should wrap its core logic in a try/catch to handle genuinely unexpected failures, a database being unreachable, for example, returning a generic 500 status with a safe, non-technical message to the client, while logging the actual detailed error on the server for debugging, never exposing raw stack traces or internal error details directly to the client, which can leak sensitive implementation details.

Surfacing errors to the user: On the client, a caught error or a non-ok response should update a piece of error state that the form or page renders as a clear, specific, human-readable message near the relevant field or action, echoing the same principle from Module 4's form validation lesson, generic messages like "Something went wrong" should be the fallback, not the default, whenever a more specific message is available.`,
  "vc-6-6": `Overview: Saving user progress means persisting data tied to a specific user reliably, a step beyond Module 3's localStorage, which only lives in one browser on one device. This lesson covers the shift to server-backed persistence and why it matters for anything meant to scale beyond a single-device demo.

Why localStorage is not enough for real progress: localStorage is scoped to one browser on one device, so a student's progress saved on a phone will not appear when they log in on a laptop, and clearing browser data or switching devices silently loses everything. Real user progress, course completion, quiz scores, saved work, needs to live on a server, typically in a database, associated with that specific user's account, and retrieved through an API route whenever needed.

The save pattern: Saving progress typically follows the same form-submission pattern from earlier in this module: the client sends a POST or PATCH request to an API route with the relevant data (which lesson was completed, what score was achieved), the API route validates that data and the user's identity, then writes it to the database, and returns a confirmation, at which point the client can update its own local state to reflect the save succeeded.

Avoiding lost progress under load: A system built for one student saving progress occasionally behaves very differently once many students are saving simultaneously, at scale, writes should be designed to avoid silently overwriting one field's update with another's, for example updating only the specific lesson marked complete rather than replacing an entire progress record, and any save operation that fails should be retried or clearly surfaced as an error rather than silently dropped, since a student believing their progress was saved when it was not is a serious, trust-breaking failure.

Optimizing for perceived speed without losing reliability: Rather than freezing the interface while every single small save happens, well-built systems often debounce frequent updates (waiting for a short pause in activity before sending a save) or show a lightweight, non-blocking "saving..." indicator, so the interface stays responsive without giving up on confirming that data actually persisted.

Why this closes out the module this way: Fetching data (an earlier lesson this module) is read-only and relatively low-stakes if it is briefly wrong, but saving user progress is a write operation where correctness and reliability directly affect trust in the product, making it the natural, higher-stakes culmination of everything this module has covered: HTTP, fetching, API routes, form submission, and validation, all applied to data that genuinely matters to the person using it.`,
  "vc-6-7": `Overview: This checkpoint closes Module 6 by combining HTTP fundamentals, fetching, API routes, form submission, validation, and progress-saving into one small full-stack feature, commonly a form that saves data through a real API route and displays it back from a data source rather than hardcoded content. The goal is proving you can build a reliable, complete client-to-server round trip, not just a form that looks correct.

What a strong submission demonstrates: A strong API checkpoint has at least one API route (in route.ts) that validates its input on the server independent of any client-side checks, returns proper status codes (200/201 for success, 400 for invalid input, 500 for unexpected failure) with a consistent JSON error shape, and a client form that tracks isSubmitting state, disables itself appropriately during a request, and shows specific, distinct feedback for success versus each kind of failure rather than one generic message covering everything.

Common mistakes to catch before submitting: Trusting only client-side validation and skipping server-side checks entirely, forgetting to check response.ok before treating a fetch result as successful, missing Content-Type: application/json on a POST request's headers, and allowing a form to be submitted multiple times because isSubmitting was never tracked or the button was never disabled.

Self-review checklist: Test the happy path first, does valid data save and confirm correctly. Then deliberately test the unhappy paths: submit with a required field empty, submit malformed data if applicable, and (if feasible) simulate a network failure by throttling to offline in DevTools, confirming each case shows a specific, useful message rather than a silent failure or a crash. Refresh the page after a successful save and confirm the saved data is genuinely retrievable again, not just reflected in local component state.

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

Core Web Vitals: Google's Core Web Vitals are the standard metrics for real-world page performance. Largest Contentful Paint (LCP) measures how long the largest visible element takes to render, a good target is under 2.5 seconds. Cumulative Layout Shift (CLS) measures unexpected visual movement as a page loads, caused by things like images without reserved dimensions or fonts loading late and shifting text, a good target is under 0.1. Interaction to Next Paint (INP) measures how responsive the page feels to actual user interactions like clicks and taps, having replaced the older First Input Delay metric as the standard responsiveness measure. These three together describe loading speed, visual stability, and interactivity.

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

Final self-review checklist: Open the live URL in an incognito window (removing any local session or cache assumptions) and walk through every core feature exactly as a first-time visitor would. Check the browser tab title and a shared-link preview for accurate metadata. Read the README start to finish as if you had never seen the project before, does it actually explain what this is and why it exists. Confirm the Git history has no committed secrets and tells a coherent story of how the project was built.

How this connects to what comes after: This checkpoint is not really about this one project, it is proof that you can repeat this entire process, plan, build, connect data, polish, and ship, on your own for a future project, a client engagement, or a job application, which is precisely why this course is structured as a full arc from HTML fundamentals through to a genuinely live, documented, professional product rather than stopping at a working local demo.`,
};

const aiPromptContent: Record<string, string> = {
  "ape-1-1": `Overview: An AI assistant like ChatGPT, Claude, or Gemini does not "know" things the way a person does. It is a large language model trained to predict the most likely next word given everything that came before it, based on patterns learned from enormous amounts of text. The most important idea in this lesson is that fluent, confident-sounding text is not the same thing as correct text, and understanding how responses actually form is what separates someone who gets lucky with prompts from someone who can direct AI reliably.

How a response actually forms: When you send a prompt, the model breaks your text into tokens (word pieces), then generates a reply one token at a time, each new token chosen based on probability given the tokens before it. There is no separate "thinking" step happening behind the scenes unless a model is specifically designed to reason before answering. This is why a prompt's exact wording, order, and structure change the output: you are shaping a probability distribution, not filing a request with a researcher.

Fluency is not the same as accuracy: Because the model is optimized to produce plausible-sounding continuations, it can generate text that reads as authoritative and well-organized while being factually wrong. This is called hallucination, and it happens most often with specific facts, dates, citations, statistics, and niche topics where the training data was thin or contradictory. A student's job is to treat every confident answer as a draft to verify, not a finished fact.

Responses are not fixed: The same prompt sent twice can produce different answers, because most assistants sample from a range of likely next tokens rather than always picking the single most probable one. This variability (often controlled by a setting called temperature) means you should not judge a prompt's quality from one output alone; test it a few times before deciding it works.

Context window and memory: An assistant only "knows" what is inside its current context window (your prompt, any attached files, and the conversation so far) plus whatever was baked into it during training, which has a cutoff date. It does not automatically know about very recent events, your company's internal documents, or earlier conversations unless that information is fed back in.

Why this matters for prompting: Because the model is filling in the most statistically likely continuation, vague or ambiguous prompts get filled in with the model's best guess about what you probably meant, which is often generic. Precise prompts narrow that guessing, which is the foundation every later lesson in this module builds on.`,
  "ape-1-2": `Overview: A strong prompt is not a single sentence, it is a small set of building blocks assembled in a deliberate order. The most useful mental model is that every effective prompt is made up of some combination of task, context, constraints, format, and examples, and knowing these parts by name lets you diagnose why a prompt is failing instead of just rewriting it randomly and hoping.

The task: This is the actual instruction, the verb-driven core of what you want done: "summarize," "rewrite," "generate five options," "critique this." A weak prompt often buries the task inside a paragraph of background; a strong prompt states it clearly, usually near the start, so the model does not have to infer what action you actually want.

Context: Context is the background information the model needs to do the task well: who the audience is, what the content is for, what has already been tried, or what business the request sits inside. Without context, the model defaults to generic, average answers pulled from its training data rather than answers tailored to your actual situation.

Constraints and format: Constraints tell the model the boundaries of an acceptable answer, such as length, tone, reading level, or things to avoid. Format tells it how to structure the output, such as a bulleted list, a table, a fixed word count, or a specific heading structure. Leaving these out is one of the most common reasons a first draft from AI feels "almost right but not quite usable."

Examples: Showing the model one or two examples of the kind of output you want (covered in depth in Few Shot Examples) is often more powerful than describing the style in words, because the model can copy patterns directly from the example rather than interpreting an abstract description.

Order and clarity: Within these parts, order matters less than completeness, but a common effective pattern is context first, then task, then constraints and format, then examples last. Reviewing a weak prompt against this five-part checklist (task, context, constraints, format, examples) is usually the fastest way to work out what is missing before you try to fix it by guessing.`,
  "ape-1-3": `Overview: Role and context design is about deliberately telling the assistant who it should act as and what situation it is operating in, rather than letting it default to a generic, all-purpose voice. This is one of the highest-leverage techniques in prompting because it reshapes the entire tone, vocabulary, and priorities of a response with a single sentence.

Role (persona) prompting: Assigning a role, such as "act as a senior brand strategist" or "you are a patient junior-level design tutor," nudges the model toward the vocabulary, priorities, and level of detail associated with that role in its training data. This is genuinely useful for shaping tone and expertise level, but it does not grant the model real credentials or guaranteed accuracy; a prompt that says "act as a lawyer" does not make the legal advice correct, so role prompting should be treated as a style and framing tool, not a truth guarantee.

Providing background context: Beyond role, tell the assistant what it needs to know about your actual situation: the client, the brand, the platform, the constraints of the project, or what has already been tried. Context can be given inline in the prompt or, in tools that support it, set once as a system-level instruction that persists across a whole conversation so you are not repeating it every message.

Audience and purpose framing: Naming who the output is for (a first-year design student, a busy client, a technical developer) and what it will be used for (a pitch, an internal note, a social caption) changes word choice and depth far more reliably than asking for a vague quality like "make it professional."

Managing context across a conversation: Every assistant has a limited context window, so in long conversations earlier details can get crowded out or the assistant can lose track of an instruction given many messages ago. Restating key constraints periodically, or summarizing the conversation so far before continuing, keeps long sessions on track.

Risks to watch for: Overly strong personas can push a model toward exaggerated, stereotyped, or overconfident answers because it is play-acting a character rather than reasoning carefully, so role prompts work best combined with clear constraints and a habit of fact-checking, not used as a substitute for them.`,
  "ape-1-4": `Overview: Constraints and output formats are how you convert a general-purpose answer into something that fits directly into your actual workflow. Without them, an assistant will guess at length, structure, and tone, and that guess is optimized to look like an average, generic answer rather than one that fits your specific use case.

Length and structure constraints: Specifying word count, number of options, number of sections, or a maximum length stops the model from either padding an answer with filler or cutting it too short. Structural constraints, like "three sections with headings" or "a single paragraph, no bullet points," control the shape of the response so it slots into a document, a slide, or a caption box without heavy editing.

Format constraints for downstream use: Asking for output as a numbered list, a markdown table, JSON, or a specific template makes the response usable directly by another tool, spreadsheet, or person, instead of prose that has to be manually restructured. This matters especially for business workflows where an AI output feeds into a template, a CMS field, or another automated step.

Tone and voice constraints: Naming a tone (warm but concise, formal and neutral, playful for a youth audience) and giving one or two reference adjectives is more reliable than asking the model to "sound good," because tone words without anchoring examples are interpreted inconsistently across different requests.

Negative constraints: Telling the model what to avoid, such as "do not use jargon," "do not mention pricing," or "avoid exclamation marks," is often as important as positive instructions, because it closes off the generic defaults the model would otherwise reach for.

The over-constraining trap: Piling on too many rigid constraints at once can degrade quality, because the model spends its effort satisfying format rules instead of producing genuinely useful content, and contradictory constraints (short but comprehensive, formal but playful) force it to guess which one you meant. The practical habit is to add constraints deliberately, test the result, and drop any constraint that is not actually needed.`,
  "ape-1-5": `Overview: Few-shot prompting means showing the model one or more worked examples of the input-output pattern you want, instead of only describing it in words. This works because language models are strong at in-context learning: they can pick up a pattern from examples placed directly in the prompt and continue it, often more reliably than they can follow an abstract written description of the same pattern.

Zero-shot, one-shot, and few-shot: A zero-shot prompt gives only an instruction with no examples, which works fine for simple, common tasks a model has seen many times in training. A one-shot prompt gives a single example, and a few-shot prompt gives several (typically two to five), which is usually the sweet spot for tasks with a specific style, structure, or edge case the model would not guess correctly on its own.

Why examples outperform description: It is often easier to show a model a caption written in your brand's voice than to describe that voice in adjectives, because tone, rhythm, and word choice are hard to specify precisely in language but easy to demonstrate directly. This is especially valuable for formatting quirks, house style rules, or classification tasks with fuzzy categories.

Selecting good examples: Examples should be genuinely representative of the range of inputs you expect, including at least one that covers a tricky or edge case, not just the easiest cases. Two or three well-chosen, varied examples generally beat five near-identical ones, because near-identical examples teach the model a narrower pattern than you intended.

Formatting consistency: Keep the structure of every example identical (same labels, same order of fields, same punctuation style), because the model will also copy inconsistencies in your examples, not just the content you intended it to learn.

Limits and cost: Each example consumes space in the context window, so few-shot prompts are longer and can hit length limits in some tools or interfaces. There is also a risk of overfitting the output too closely to the exact examples given, such as the model reusing your example's numbers or names by mistake, so review outputs for unwanted copying, not just pattern-following.`,
  "ape-1-6": `Overview: A prompt is not finished the moment it produces one good-looking answer. Testing prompt quality means treating a prompt like a small tool you build, run against a few different real inputs, and refine, because a prompt that works once can fail silently on a slightly different case. The most important idea in this lesson is that prompt engineering is an iterative loop, not a one-shot guess.

Define success before you test: Before judging any output, decide what "good" actually means for this task: correct facts, the right tone, a specific format, a specific length, or all of these. Without a definition of success, it is easy to be impressed by fluent writing that is actually missing what you needed.

Run the same prompt more than once: Because model outputs vary between runs, run a prompt two or three times before concluding it reliably works. A prompt that produces a great answer once and a mediocre one the next time is not yet reliable enough to reuse in a real workflow.

Test across varied and edge-case inputs: A prompt tuned on one example can quietly break on a different input, such as a shorter brief, an unusual client name, or a topic outside the model's comfort zone. Deliberately testing a prompt against two or three different realistic scenarios, including an awkward one, reveals weaknesses that a single happy-path test hides.

Compare outputs side by side: When refining a prompt, change one thing at a time (the instruction, the example, a constraint) and compare the new output against the previous version, rather than changing several things at once and losing track of what actually caused the improvement. Simple rubrics, such as scoring accuracy, tone fit, and format compliance out of five, make this comparison less subjective.

Document what works: Once a prompt reliably produces good output across your test cases, save it with a short note on what it is for and why it is worded the way it is. This turns a one-off success into a reusable asset, which is exactly the habit Module 2's Workflow Templates lesson builds on.`,
  "ape-1-7": `Overview: This checkpoint lesson pulls together everything from Module 1: how assistants actually generate responses, the five building blocks of a prompt, role and context design, constraints and format, few-shot examples, and disciplined testing. A strong checkpoint submission should show that you can combine all five skills in a single, deliberate prompt, not just demonstrate them one at a time in isolation.

Revisiting how responses form: Everything else in this module depends on remembering that an assistant generates the most statistically likely continuation of your prompt, and that fluent output still needs verification. A checkpoint submission should show awareness of this, for example by noting where you would fact-check a claim rather than accepting it as given.

Assembling the full prompt anatomy: A strong submission clearly contains a task, relevant context, explicit constraints, a specified output format, and, where useful, one or two examples, all working together rather than a single vague instruction. Reviewers should be able to point at your prompt and label each part.

Deliberate role and context choices: Show that you chose a role or persona (or deliberately chose not to) for a reason connected to the task's audience and purpose, not just because "act as an expert" is a common template line copied without thought.

Constraints that match a real use case: The format and constraints in your prompt should map to an actual downstream need, such as a specific word count for a caption, a table for a comparison, or a tone matched to a named audience, rather than generic constraints added for the sake of having some.

Evidence of testing and iteration: A strong checkpoint includes a short note on how you tested the prompt: what you ran it against, what you changed, and why the final version is better than your first draft. Showing one "before" and one "after" version, with a sentence explaining the change, is usually more convincing to a reviewer than a single polished final prompt with no visible process.`,
  "ape-2-1": `Overview: Content planning is one of the highest-value, lowest-risk uses of AI in a creative business, because ideation and structure benefit from volume and speed while the final judgment about what actually gets published stays with a human who understands the brand and audience. This lesson focuses on prompting AI as a brainstorming and organizing partner for content calendars, campaigns, and post series.

Brainstorming at volume: Asking for a large batch of ideas ("give me 20 content angles for a skincare brand targeting university students in Nairobi") and then filtering down is usually more productive than asking for "the best idea," because the model's first suggestion is often the most generic one available and better ideas frequently surface further down a long list.

Structuring a content calendar prompt: Effective content planning prompts specify the platform (Instagram, TikTok, a blog), the posting cadence, the campaign goal, and the audience, because a content idea that works as a blog post rarely works unchanged as a fifteen-second video script. Asking the model to organize ideas into a calendar format (date, platform, format, hook, caption) turns raw ideas into something a team can actually schedule.

Matching brand voice: A content plan only looks right if it sounds like the brand it is for. Feeding in a short brand voice description, or a few examples of past captions, and asking the model to match that voice consistently across the batch produces far more usable drafts than requesting generic "engaging social captions."

Iterating for freshness: AI-generated content ideas can converge on the same handful of common angles (a giveaway, a behind-the-scenes post, a "did you know" fact) especially for well-covered industries. Explicitly asking for unconventional angles, or feeding in a competitor's recent content to avoid overlap, pushes past the obvious first layer of ideas.

Originality and human review: Because content ideas are pattern-completions of what already exists across the internet, a planner should always screen a batch for ideas that are too close to a specific existing campaign, and add the local, cultural, or brand-specific detail that makes generic ideas feel genuinely original before they go into a real calendar.`,
  "ape-2-2": `Overview: A design brief translates a client's often vague request into a clear document a designer can actually work from, and AI can be a genuinely useful drafting partner for this because briefs follow a fairly predictable structure. The goal of this lesson is prompting AI to turn scattered client input into an organized, professional brief, not to let AI invent project details the client never actually gave.

Structuring the brief prompt: A useful design brief prompt asks the model to organize information into a standard set of fields: project goal, target audience, deliverables, brand guidelines or references, timeline, and success criteria. Feeding raw notes from a client call or email and asking the model to sort them into this structure is far more reliable than asking it to "write a design brief" from scratch with no real input.

Translating vague client language: Clients often describe what they want in fuzzy, subjective terms like "make it pop" or "something modern but not too corporate." A good use of AI here is asking it to convert these phrases into more concrete design directions (color intensity, typography weight, layout density) as a starting point for a conversation, not as a final decision, since only the human designer and client can confirm what the vague phrase actually meant.

Surfacing missing information: Before drafting a full brief, prompting the model with "what questions should I ask this client before starting design work" is often more valuable than the brief itself, because it flags gaps (budget, exact dimensions, print versus digital use, deadline) that are easy to miss in a fast client conversation.

Protecting client data: Client briefs often contain sensitive business details: unreleased product names, pricing, internal strategy, or personal contact information. Before pasting client notes into a general-purpose AI tool, check what that tool's data policy actually says about whether inputs are stored or used for training, and strip out anything sensitive that is not needed for the brief itself.

Human review before sending: An AI-drafted brief should always be checked against the actual client conversation for accuracy before it is sent to a designer or back to the client, since the model can smooth over ambiguity by quietly inventing plausible-sounding details that were never actually confirmed.`,
  "ape-2-3": `Overview: Prompting an AI image generator is a different skill from prompting a text assistant, because image models respond most reliably to a fairly consistent formula of descriptive building blocks rather than open-ended conversation. A dependable starting structure covers subject, style, composition, lighting, and technical detail, and understanding each part lets you troubleshoot a weak result instead of just rewording the whole prompt.

Subject specificity: Image prompts work best with concrete, specific subjects rather than abstract concepts. "A young Kenyan graphic designer sketching on a tablet at a wooden desk" gives the model far more to work with than "a creative person," because specific nouns and details anchor the generation in a recognizable scene.

Style and aesthetic direction: Naming a visual style (flat illustration, risograph print texture, cinematic photorealism, low-poly 3D, watercolor) has an outsized effect on the result, often more than adding extra descriptive adjectives does. A short, sharp style instruction generally beats a long, vague one, so it is worth testing a few named styles rather than layering on adjectives like "beautiful" or "amazing," which most models cannot act on meaningfully.

Composition and camera language: Borrowing photography and framing terms, such as close-up, wide shot, bird's-eye view, rule of thirds, or Dutch angle, gives the model concrete instructions about how the subject should be framed, which plain description often fails to convey.

Lighting and mood: Specific lighting terms produce more consistent results than vague ones. Phrases like soft natural light, golden hour, studio lighting with a softbox, rim lighting, or overcast diffused light reliably shift the mood and quality of a generated image, while a vague instruction like "good lighting" tends to be ignored or interpreted inconsistently.

Iteration and known limitations: Image models still commonly struggle with rendering readable text inside an image, exact counts of objects or fingers, and precise brand logos, so these should be treated as areas to check carefully and often fix by hand afterward. It is also worth being deliberate about originality and copyright: avoid prompting for a named living artist's exact style or for the likeness of a specific real person without permission, since both raise ethical and legal concerns in professional design work.`,
  "ape-2-4": `Overview: AI is genuinely useful for condensing long documents, articles, or research into a usable summary, but research summaries are exactly the kind of output where hallucination risk is highest, because a fluent, well-organized summary can quietly contain a fact, statistic, or attribution the source never actually stated. This lesson is about prompting for useful summaries while building in the verification the task demands.

Summarization prompting techniques: Good summary prompts specify the target length, the intended reader, and what to prioritize, for example "summarize this report in 150 words for a non-technical client, focusing on the recommendations, not the methodology." Asking for a structured summary (key findings, implications, open questions) is usually more useful than asking for a plain paragraph, because it forces the output into a shape a reader can scan quickly.

Grounding the summary in the actual source: Wherever possible, paste the source text directly into the prompt or use a tool that can read an attached document, rather than asking the assistant to summarize a topic from memory. A summary generated purely from the model's training data is far more likely to include outdated or invented details than one generated from text actually provided in the prompt.

Asking for citations, carefully: You can ask a model to note which part of the source text supports each summary point, which helps you trace claims back to the original. However, if a model is not actually grounded in a real document (for example, when asked to "find studies about X"), it can still fabricate plausible-looking citations, titles, and even page numbers, so any AI-generated citation needs independent verification before it is used or shared.

Verifying claims independently: Treat any specific number, date, name, or quote in an AI summary as unverified until you have checked it against the original source or another independent reference. This is especially important for anything that will appear in client-facing material, since a wrong statistic in a report undermines trust in the whole document.

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

Practical verification techniques: Cross-reference any specific factual claim against at least one independent, reliable source before using it professionally. For research tasks, prefer tools that can search the live web or read an attached document over asking the model to answer purely from memory, and explicitly ask the model to flag any part of its answer it is less certain about.

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

Maintenance and versioning: Prompts that worked well with one AI model version can behave differently after a model update, so a library needs periodic review, not just one-time creation. Keeping a simple changelog per entry (what changed, why, when) helps a team understand why a prompt evolved and revert if a new version underperforms.

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

const enhancedContent: Record<string, string> = {
  "ps-1": `Overview: Photoshop is a raster image editor, which means it builds images using pixels. This is perfect for photo editing, posters, banners, mockups, social media graphics, and digital artwork. The most important idea in this lesson is workspace control: when you know where tools, panels, and document settings live, you stop guessing and start working like a designer.

Toolbar and options bar: The Toolbar holds the tools you use directly on the canvas. The Move Tool (V) positions layers, the Brush Tool (B) paints, the Type Tool (T) creates text, and selection tools help isolate parts of an image. The Options Bar changes depending on the selected tool, so always check it before assuming a tool is not working.

Layers panel: The Layers panel is where professional Photoshop work happens. Each image, text object, shape, or adjustment can sit on its own layer. This allows you to edit one part without damaging the rest of the design. The History panel helps you step backward, but good designers rely more on layers, masks, and smart objects than on undo.

Document setup: Document setup matters before design begins. Use 72 DPI for screen graphics like WhatsApp posters and social media posts. Use 300 DPI for print work such as flyers, certificates, posters, banners, and business cards. RGB is normally for screens; CMYK is safer for print. Always name your file properly and save a PSD copy so you can edit layers later.

Why design matters: Graphic design is not just decoration. It communicates, persuades, builds identity, and captures attention. A poster, flyer, or social media advert should have a clear message, a target audience, and a reason for every visual decision.

Design elements and principles: The main design elements are line, shape, color, typography, texture, and space. Lines guide the eye, shapes structure information, color creates emotion, typography controls readability, texture adds feeling, and white space gives the design breathing room. The core principles are balance, contrast, emphasis, alignment, proximity, repetition, movement, and unity. Before opening Photoshop, ask: What should the viewer notice first? What should they do after seeing the design?

File formats: File formats matter in professional delivery. Save editable work as PSD. Export JPEG for photos and online sharing, PNG for transparent graphics and logos, PDF/TIFF for print, GIF for simple animation, and SVG only when preserving vector-style web graphics. A good workflow is: save the PSD first, then export the final version required by the client or platform.`,
  "ps-2": `Overview: Layers are the foundation of non-destructive editing. A layer is like a transparent sheet placed above or below other sheets. The order matters: layers at the top of the panel appear in front on the canvas, while layers below appear behind.

Good habits: Good layer habits make your work faster and cleaner. Rename important layers, group related items with Ctrl+G, and keep text, images, backgrounds, and effects separated. When a client asks for changes, organized layers save time and make you look professional.

Blending modes: Blending modes change how a layer interacts with the layers underneath it. Multiply is useful when you want to darken or remove white areas, such as adding paper texture or shadows. Screen is useful for removing black areas, especially light leaks, sparks, glows, and lens effects. Overlay increases contrast by combining light and dark information.

Opacity vs fill: Opacity affects the whole layer, including effects. Fill affects the layer content but can leave layer styles such as shadows or strokes visible. This difference is useful when creating advanced text effects, watermarks, and subtle overlays.

Layer types: Layer types include normal raster layers, text layers, shape layers, adjustment layers, fill layers, smart objects, and the locked background layer. Text and shape layers remain editable until rasterized. Adjustment layers are especially important because they change brightness, contrast, hue, saturation, and tone without permanently damaging the image.

Layer styles: Layer styles are non-destructive effects added from the fx button or Blending Options. Drop Shadow separates an object from the background. Inner Shadow creates an engraved feeling. Outer Glow and Inner Glow help with neon, light, and emphasis. Stroke adds an outline. Gradient Overlay and Pattern Overlay add stylish fills. Bevel and Emboss can create a raised or carved 3D look, but should be used carefully so the design does not look cheap.

Organization tip: Use layer groups when a design becomes complex. Group backgrounds, images, text, effects, and call-to-action elements separately. Copy and paste layer styles when several elements need the same visual treatment. This keeps posters, mockups, and social media templates consistent and easier to edit.`,
  "ps-3": `Overview: Selections allow you to work on one part of an image without affecting everything else. A strong designer knows when to use fast tools and when to use precise tools. Quick Selection is useful for simple subjects with clear edges. The Pen Tool is better for products, logos, hard edges, and professional cutouts.

Masking vs erasing: Masking is better than erasing. When you erase, pixels are destroyed. When you mask, pixels are only hidden. In a layer mask, white reveals and black hides. Gray partially hides. This means you can correct mistakes later, soften edges, and blend images naturally.

Select and Mask workspace: Select and Mask is especially important for hair, fur, fabric, and soft edges. Tools like Refine Edge help Photoshop detect fine details that normal selections miss. After cutting out a subject, check the edges against both light and dark backgrounds because mistakes often hide on one background but show on another.

Believable compositing: A clean cutout should match the lighting, color, sharpness, and shadows of the new background. Selection is only the first step; believable compositing also needs adjustment layers, shadows, and edge cleanup.

Modifying selections: Selections can be modified after creation. Feather softens the edge, invert selects the opposite area, and expand or contract adjusts the selection boundary. Ctrl+T opens Free Transform, where you can resize, rotate, flip, warp, distort, and change perspective. These tools are useful when placing products, people, or text into a composition.

Repair tools: Content-Aware Fill, Healing Brush, Spot Healing Brush, and Patch Tool help remove unwanted objects and repair image areas. Spot Healing automatically blends small marks. Healing Brush lets you choose a clean source area. Patch Tool is useful for larger repairs where texture must match the surrounding area.

Filters: Filters are creative and corrective tools. Gaussian Blur softens backgrounds and shadows. Motion Blur creates speed. Smart Sharpen and High Pass improve detail. Add Noise adds grain or realism. Reduce Noise cleans low-light photos. Emboss, Oil Paint, Lens Flare, Clouds, Lighting Effects, and Displace can create special visual styles. Convert a layer to a Smart Object before applying filters so the effect stays editable as a Smart Filter.`,
  "ps-4": `Overview: Professional skin retouching is about improving a portrait while keeping the person natural. The goal is not to remove all texture. Real skin has pores, small lines, and tone variation. Over-smoothing makes a face look plastic and unprofessional.

Basic cleanup: Start with basic cleanup. Use Spot Healing Brush for small blemishes, dust, or temporary marks. Use Clone Stamp when you need more control over the source area. Work on a separate empty layer where possible so the original photo remains safe.

Frequency separation: Frequency separation separates texture from color and tone. The high-frequency layer keeps pores and fine details. The low-frequency layer holds color transitions and smoothness. This allows you to even out blotchy tones without destroying natural texture.

Dodge and burn: Dodge and Burn is used to shape light. Dodging brightens; burning darkens. With careful low-opacity strokes, you can reduce harsh shadows, enhance cheekbones, and guide attention to the face. Always zoom out often to avoid over-editing.

Blending modes and filters: Retouching connects to blending modes and filters. Soft Light and Overlay are useful for subtle skin tone enhancement, while Gaussian Blur can support controlled softening when applied carefully through masks or Smart Filters. Avoid applying blur directly to the whole face; protect eyes, lips, eyebrows, hair, and important texture.

Retouching workflow: A clean retouching workflow is: duplicate or create a safe working layer, remove temporary marks with healing tools, correct tone with adjustment layers, refine texture carefully, then shape light with Dodge and Burn. Work at low opacity, compare before and after often, and stop before the person starts looking artificial.

Final sharpening: For product or portrait work, final sharpening should be selective. High Pass with Overlay or Soft Light can sharpen important details, but too much sharpening creates halos and rough skin. The goal is clean, believable improvement, not an obvious filter effect.`,
  "ps-5": `Overview: Typography is visual communication. A poster can have beautiful images and still fail if the text is hard to read. Good type design uses hierarchy: the most important message should be seen first, then supporting information, then details.

Tracking, kerning, and leading: Tracking controls space across a group of letters. Kerning controls space between individual letter pairs. Leading controls space between lines. Adjust these carefully to make headlines feel polished and body text comfortable to read.

Layer styles for text: Layer styles can help text stand out, but they must be controlled. Drop shadows, strokes, glows, and gradients should support readability, not distract from it. If the background is busy, add contrast with a dark overlay, a soft shadow, or a simple shape behind the text.

Layout and balance: Poster layout depends on balance and alignment. Use grids, margins, and the rule of thirds to position elements. Keep related information close together, leave breathing space, and avoid putting every element at the same size. A strong poster guides the eye deliberately.

Typography detail: Text spacing is part of professional typography. Kerning adjusts space between two specific letters, tracking adjusts spacing across a word or phrase, leading controls line spacing, and paragraph spacing controls the gap before or after text blocks. Baseline shift moves selected characters up or down for special effects such as superscripts, subscripts, or stylized titles.

Logo and brand projects: For logo and brand projects, begin with research, rough sketches, color psychology, and font pairing before designing in Photoshop. Keep logos simple, memorable, versatile, relevant, and original. Test the logo in black and white first, then apply color. Use guides, rulers, shape tools, the Pen Tool, Smart Objects, and layer styles carefully.

Export sizes: Poster and social media work should use the correct size and export settings. Instagram square posts are commonly 1080x1080, stories and vertical reels are 1080x1920, and print posters need 300 DPI with safe margins. Use high-quality images, readable fonts, a clear focal point, and enough spacing. For mockups, place artwork into Smart Objects so the design updates naturally on t-shirts, business cards, billboards, or phone screens.

Final project workflow: create the logo, poster, and social media design in organized folders; save PSD files for future editing; export PNG for transparent designs, JPG for photos, and PDF/TIFF for print. Keep separate folders for project files, assets, and final exports so client work stays professional.`,
  "ai-1": `Overview: Illustrator is a vector design tool. Vector artwork is built from paths, anchor points, curves, and fills instead of pixels. This means a logo can scale from a small social media icon to a billboard without becoming blurry.

Why vectors matter: Raster images depend on resolution. If you enlarge a small raster image too much, it pixelates. Vector artwork stays sharp because Illustrator recalculates the shape mathematically. This is why logos, icons, typography, packaging marks, and brand assets are usually created in Illustrator.

Artboards: Artboards work like separate pages inside one document. You can create a logo, business card, letterhead, and social media layout in the same file using different artboards. This keeps a brand project organized.

Color modes: Use RGB for screen work and CMYK for print work. RGB is built for light on screens, while CMYK is built for ink. For logos that will be printed in Kenya, CMYK setup helps reduce unexpected color shifts.`,
  "ai-2": `Overview: The Pen Tool is one of the most powerful tools in Illustrator because it gives exact control over paths. Clicking creates corner points. Clicking and dragging creates curved points with handles. The direction and length of handles control the smoothness of a curve.

Fewer points, cleaner curves: Good Pen Tool work uses fewer points, not more. Too many points create bumpy curves and make editing difficult. Place anchor points at major direction changes, then use handles to shape the curve between them.

Handle control: Holding Alt lets you break or adjust handles when a path needs to change direction sharply. Direct Selection (A) lets you move individual anchor points and handles after drawing. This is how you refine rough paths into clean professional shapes.

Practice tip: Tracing logos is excellent practice because it trains your eye to see curves, corners, spacing, and symmetry. Start slowly. Accuracy matters more than speed. With time, your hand becomes faster because your eye understands the shape.`,
  "ai-3": `Overview: Most strong logos are built from simple shapes. Circles, rectangles, triangles, and lines can combine into memorable marks when spacing, proportion, and alignment are controlled.

Shape Builder: Shape Builder (Shift+M) lets you merge or remove overlapping shapes visually. Drag through regions to combine them. Hold Alt and click to delete unwanted parts. It is often faster and more intuitive than using Pathfinder buttons.

Pathfinder: Pathfinder performs similar operations through commands such as Unite, Minus Front, Intersect, and Divide. Use it when you need precise boolean operations. After combining shapes, inspect anchor points and clean any unnecessary complexity.

Logo construction checklist: Logo construction should consider balance, readability, and scalability. A logo must work in one color, at small sizes, and on different backgrounds. Before adding color effects, test the mark in black and white.`,
  "cc-1": `Overview: Short-form video succeeds when the viewer understands the message quickly. The first few seconds matter most. A strong opening hook, clear subject, and fast rhythm help keep people watching.

Aspect ratio: Aspect ratio controls where the video fits. Use 9:16 for TikTok, Instagram Reels, YouTube Shorts, and WhatsApp Status. Use 16:9 for YouTube landscape, presentations, and TV-style content. Choosing the wrong ratio can crop important details.

Timeline editing: Good timeline editing removes dead space. Cut pauses, repeated words, and weak moments. Keep the strongest clips and arrange them so the video keeps moving. Audio also matters: clean sound, beat timing, and captions can make a simple edit feel professional.

Captions: Captions help viewers understand even when sound is off. Use readable fonts, strong contrast, and short caption lines. Avoid covering faces, products, or important action with text.`,
  "cc-2": `Overview: Keyframes create motion over time. You set a starting value and an ending value, and CapCut animates the change between them. This can control position, scale, rotation, opacity, and other effects.

Simple over complex: Simple keyframe moves often look more professional than random transitions. A slow zoom can add focus. A small slide can introduce text. A controlled opacity change can reveal information cleanly.

Overlays: Overlays place one video, image, or graphic above another. They are useful for reaction clips, logos, screenshots, subtitles, texture effects, and before-after comparisons. Blending modes and opacity help overlays feel integrated instead of pasted on.

Velocity editing: Velocity editing changes clip speed for impact. Speed ramps can emphasize action, music beats, or transitions. Use them carefully: too much speed change can confuse the viewer. The best edits support the story.`,
  "sw-1": `Overview: SolidWorks sketching is the base of accurate 3D modeling. A weak sketch creates weak parts. A strong sketch is clear, fully defined, and controlled by dimensions and relations.

Relations: Relations describe how sketch entities behave. Horizontal and vertical relations control direction. Tangent relations create smooth contact between curves and lines. Coincident relations connect points. Concentric relations make circles share the same center.

Smart Dimensions: Smart Dimensions give exact size to geometry. A professional model should not depend on dragging shapes by eye. Dimensions make the design repeatable, editable, and ready for manufacturing.

Fully defined sketches: A fully defined sketch turns black, meaning its size and position are controlled. Blue geometry is under-defined and can move unexpectedly. Before creating 3D features, make sure important sketches are fully defined so later changes do not break the model.`,
  "sw-2": `Overview: Extrude Boss/Base turns a 2D sketch into a 3D solid by adding depth. It is one of the most common features in SolidWorks. The sketch profile controls the shape, and the extrusion distance controls thickness.

Revolve: Revolve creates a 3D shape by rotating a sketch around an axis. This is ideal for circular or cylindrical objects such as bottles, shafts, wheels, pulleys, and knobs. The axis must be chosen carefully because it controls the center of rotation.

Extrude Cut: Extrude Cut removes material from a part. It is used for holes, slots, pockets, vents, and clearances. Cuts should be dimensioned properly so they match the design requirement rather than being placed by guesswork.

Fillets and chamfers: Fillets and chamfers improve both appearance and function. Fillets round edges, while chamfers create angled edges. In engineering, these features can reduce sharp edges, improve manufacturability, and help parts assemble smoothly.`,
  ...vibeDesigningContent,
  ...vibeCodingContent,
  ...aiPromptContent,
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
  }
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

const enhancedKeyPoints: Record<string, string[]> = {
  ...vibeDesigningKeyPoints,
  ...vibeCodingKeyPoints,
  ...aiPromptKeyPoints,
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
  resources: [
    { name: `${lesson.title} Notes.pdf`, url: `/api/notes/${lesson.id}`, type: "pdf" },
    ...lesson.resources.filter((resource) => resource.url !== "#"),
  ],
}));
