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
    content: "Welcome to SCDS! Photoshop is a Raster-based image editor. Lesson Key Points: 1. Workspace: The Toolbar (V for Move, B for Brush), Options Bar (contextual settings), and Panels (Layers, History). 2. Pixels vs Vectors: Photoshop deals with pixels—tiny squares of color. 3. DPI Standards: Use 72 DPI for web/social media. Use 300 DPI for high-quality printing (Flyers, Posters, Banners). 4. New Document: Press Ctrl+N to start. Always name your files properly from the start.",
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
    content: "Layers are the foundation of non-destructive editing. 1. Layer Order: Elements on top in the panel appear in front on the canvas. 2. Blending Modes: 'Multiply' removes whites (great for textures), 'Screen' removes blacks (great for light effects), and 'Overlay' adds contrast. 3. Opacity vs Fill: Opacity affects the whole layer; Fill doesn't affect layer styles like drop shadows. 4. Organization: Always Group (Ctrl+G) your layers to stay organized.",
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
    content: "Cutting out subjects is a core skill. 1. Quick Selection Tool (W): Fast for simple backgrounds. 2. Pen Tool (P): The most precise for smooth edges. 3. Select & Mask Workspace: Use 'Refine Edge' for complex things like hair or fur. 4. Layer Masks: Never use the Eraser tool! Use a mask—White reveals, Black hides. This allows you to bring back parts you've hidden later if you make a mistake.",
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
    content: "Learn the secrets of high-end beauty retouching. 1. Spot Healing Brush: Best for quick blemish removal. 2. Clone Stamp (S): Copying pixels from one area to another. 3. Frequency Separation: Splitting the image into Texture (High) and Color (Low) layers. This lets you smooth skin tones without losing the natural texture. 4. Dodge & Burn: Adding highlights and shadows to give the face more depth and structure.",
    resources: [{ name: "Retouching Workflow.pdf", url: "#", type: "pdf" }],
  },
  {
    id: "ps-5", courseId: "photoshop-masterclass", order: 5,
    title: "Dynamic Typography & Poster Design",
    duration: "31:20",
    videoUrl: "https://www.youtube.com/embed/IyR_uYsRdPs",
    content: "Design 101: Hierarchy and Balance. 1. Tracking and Kerning: Adjusting space between letters for better readability. 2. Layer Styles: Using Drop Shadows, Glows, and Inner Shadows to make text pop. 3. Clipping Masks: Putting an image inside your text (Ctrl+Alt+G). 4. Layout: Using the Rule of Thirds to place your elements in a way that catches the eye immediately.",
    resources: [{ name: "Poster Templates.zip", url: "#", type: "zip" }],
  },

  // ─── ILLUSTRATOR TRAINING ─────────────────────────────────────────────────
  {
    id: "ai-1", courseId: "illustrator-training", order: 1,
    title: "Vector vs Raster & UI Layout",
    duration: "16:40",
    videoUrl: "https://www.youtube.com/embed/Ib8UBwu3yGA",
    content: "Illustrator is the king of branding. 1. Vectors: Made of points and paths. They never pixelate, no matter how big you scale them. 2. Artboards: Like separate pages in one file. 3. Selection (V) vs Direct Selection (A): Use A to select individual points on a path. 4. Print vs Web: Always use CMYK color mode for logos that will be printed in Kenya. RGB is for screens only.",
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
    content: "If you master the Pen Tool, you can design anything. 1. Anchor Points: Click for sharp corners, Click and Drag for curves. 2. Handle Management: Hold Alt to break a handle for a sharp change in direction. 3. Curvature Tool: A faster way to make smooth curves for beginners. 4. Practice: Tracing logos is the best way to train your hand and eye for precision.",
    resources: [{ name: "Pen Tool Tracing Pack.pdf", url: "#", type: "pdf" }],
  },
  {
    id: "ai-3", courseId: "illustrator-training", order: 3,
    title: "Shape Builder & Logo Construction",
    duration: "25:30",
    videoUrl: "https://www.youtube.com/embed/Ib8UBwu3yGA",
    content: "Most great logos are just simple shapes combined. 1. Shape Builder (Shift+M): Drag over parts of shapes to join them, or Alt+Click to delete them. 2. Pathfinder: A panel version of the shape builder—Unite, Minus Front, Intersect. 3. Grids: Using circles and lines to create a balanced 'Golden Ratio' logo. 4. Expanding: Turning strokes into shapes so they scale correctly.",
    resources: [{ name: "Logo Grid Template.zip", url: "#", type: "zip" }],
  },

  // ─── CAPCUT MASTERCLASS ──────────────────────────────────────────────────
  {
    id: "cc-1", courseId: "capcut-masterclass", order: 1,
    title: "Viral Video Foundations",
    duration: "14:20",
    videoUrl: "https://www.youtube.com/embed/nEwHL9GRuFk",
    content: "TikTok and Reels are taking over. 1. Aspect Ratios: 9:16 is for mobile (Shorts/Reels). 16:9 is for YouTube/TV. 2. The Timeline: Scrubbing, cutting, and trimming. 3. Audio Extraction: Taking music from one video and using it on yours. 4. Smooth Cuts: Removing gaps between words to keep the energy high and the audience watching.",
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
    content: "Motion is emotion. 1. Keyframes: Setting a 'Start' and 'End' point for an effect. Use them for custom zooms and sliding text. 2. Overlays: Putting one video on top of another. 3. Blending: Making overlays look like they are part of the original scene. 4. Velocity Editing: Speeding up and slowing down clips for dramatic impact.",
    resources: [],
  },

  // ─── SOLIDWORKS ──────────────────────────────────────────────────────────
  {
    id: "sw-1", courseId: "solidworks-engineers", order: 1,
    title: "Precision Sketching & Smart Dimensions",
    duration: "26:00",
    videoUrl: "https://www.youtube.com/embed/1du6w97Rsm4",
    content: "Engineering requires 100% accuracy. 1. Relations: Horizontal, Vertical, Tangent, and Coincident. These tell lines how to behave. 2. Smart Dimensions: Driving the size of your sketch with numbers. 3. Fully Defined Sketches: When your lines turn Black, it means they can't move accidentally. Blue lines are dangerous in engineering! 4. Mirror Entities: Designing one half and mirroring it to save time and ensure symmetry.",
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
    content: "Turning 2D into 3D. 1. Extrude Boss/Base: Giving thickness to a sketch. 2. Revolve: Spinning a profile around an axis (great for bottles, wheels, and gears). 3. Extrude Cut: Removing material. 4. Fillet & Chamfer: Rounding or flattening edges for safety and aesthetics in manufacturing.",
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

function createModuleLessons(
  courseId: string,
  prefix: string,
  courseLabel: string,
  image: string,
  imageAlt: string,
  modules: ModulePlan[],
): Lesson[] {
  return modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lessonTitle, lessonIndex) => {
      const order = moduleIndex * 7 + lessonIndex + 1;
      const id = `${prefix}-${moduleIndex + 1}-${lessonIndex + 1}`;
      const isModuleCheckpoint = lessonIndex === module.lessons.length - 1;

      return {
        id,
        courseId,
        order,
        title: `Module ${moduleIndex + 1}: ${lessonTitle}`,
        duration: `${16 + ((moduleIndex + lessonIndex) % 7) * 2}:00`,
        videoUrl: getGeneratedLessonVideo(courseId, moduleIndex, lessonTitle),
        image,
        imageAlt,
        content: `${courseLabel} - ${module.title}.

${module.theme} In this lesson, you will learn ${lessonTitle.toLowerCase()} through a practical school-style project. Focus on the core concept, build a small deliverable, review your decisions, and save evidence of your work for your portfolio.

Production practice: write down the goal, the target user or client, the tool settings you used, and what you would improve in the next version. By the end of this lesson you should have a concrete checkpoint that can be reviewed by a tutor or included in your graduation project.`,
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
                    question: "What should every portfolio checkpoint include?",
                    options: ["A goal, process notes, and final evidence", "Only a screenshot", "Only the software name", "Nothing until graduation"],
                    answer: 0,
                    explanation: "Portfolio work is stronger when it shows the brief, process, choices, and finished result.",
                  },
                  {
                    id: `${id}-q3`,
                    question: "Why is tutor feedback important before certification?",
                    options: ["It makes the project slower only", "It helps improve weak choices before final delivery", "It replaces practice", "It removes the need for a portfolio"],
                    answer: 1,
                    explanation: "Feedback helps students correct gaps and present cleaner graduation work.",
                  },
                  {
                    id: `${id}-q4`,
                    question: "Which habit makes work easier to revise?",
                    options: ["Naming files and layers clearly", "Deleting all drafts", "Avoiding notes", "Saving only screenshots"],
                    answer: 0,
                    explanation: "Clear naming and organized files make revision, feedback, and final presentation easier.",
                  },
                  {
                    id: `${id}-q5`,
                    question: "What is the best next step after finishing a module project?",
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

const capcutProfessionalLessons: Lesson[] = capcutProfessionalPlans.map((plan, index) => {
  const order = index + 3;
  const id = `cc-${order}`;

  return {
    id,
    courseId: "capcut-masterclass",
    order,
    title: `Module ${Math.floor(index / 3) + 2}: ${plan.title}`,
    duration: `${18 + (index % 6)}:00`,
    videoUrl: "https://www.youtube.com/embed/nEwHL9GRuFk",
    image: "/images/course-capcut.png",
    imageAlt: "CapCut professional video editing lesson workspace",
    content: `CapCut Video Editing Masterclass - ${plan.module}.

${plan.theme}

Professional notes: start with a clear objective, organize raw clips before editing, make one decision at a time, and review the video on a phone before export. Strong editing is not about using every effect. It is about making the message easy to understand, pleasant to watch, and suitable for the platform.

Production workflow: create folders for raw footage, audio, graphics, captions, drafts, and final exports. Keep filenames clear, save project evidence, and write down the choices you made so a tutor or client can review your process.

Practice task: ${plan.practice}

Portfolio checkpoint: save the final export, one timeline screenshot, one before-after comparison where relevant, and three notes explaining what improved in this lesson.`,
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
          question: "What should every CapCut portfolio checkpoint include?",
          options: ["Final export, evidence, and process notes", "Only an unnamed draft", "Only the app icon", "Nothing until graduation"],
          answer: 0,
          explanation: "Portfolio evidence shows the brief, process, improvements, and final result.",
        },
        {
          id: `${id}-q3`,
          question: "Why should exports be reviewed on a phone?",
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

function createProfessionalExpansionLessons(plan: CourseExpansionPlan): Lesson[] {
  return plan.lessons.map((lesson, index) => {
    const order = plan.startOrder + index;
    const id = `${plan.prefix}-${order}`;

    return {
      id,
      courseId: plan.courseId,
      order,
      title: `Module ${Math.floor(index / 3) + 2}: ${lesson.title}`,
      duration: `${20 + (index % 7) * 2}:00`,
      videoUrl: plan.videoUrl,
      image: plan.image,
      imageAlt: plan.imageAlt,
      content: `${plan.courseLabel} - ${lesson.module}.

${lesson.theme}

Professional notes: begin with a clear brief, collect references, set up files correctly, and work in organized stages. Keep source files editable, name layers or features clearly, and save evidence of each important decision so tutor feedback can be specific.

Production workflow: define the goal, build the first version, review it against the brief, improve weak areas, and export a clean final version. Do not rush to effects before the structure is correct. Strong work is planned, editable, reviewed, and presented professionally.

Practice task: ${lesson.practice}

Portfolio checkpoint: save the working file, final export, one screenshot of the process, and three short notes explaining what improved in this lesson.`,
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
            question: "What should a strong lesson submission include?",
            options: ["Working file, final export, process evidence, and notes", "Only a screenshot", "Only a file name", "Nothing until graduation"],
            answer: 0,
            explanation: "A complete submission shows both the final result and the process used to create it.",
          },
          {
            id: `${id}-q3`,
            question: "Why should files remain editable?",
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
);

const enhancedContent: Record<string, string> = {
  "ps-1": `Photoshop is a raster image editor, which means it builds images using pixels. This is perfect for photo editing, posters, banners, mockups, social media graphics, and digital artwork. The most important idea in this lesson is workspace control: when you know where tools, panels, and document settings live, you stop guessing and start working like a designer.

The Toolbar holds the tools you use directly on the canvas. The Move Tool (V) positions layers, the Brush Tool (B) paints, the Type Tool (T) creates text, and selection tools help isolate parts of an image. The Options Bar changes depending on the selected tool, so always check it before assuming a tool is not working.

The Layers panel is where professional Photoshop work happens. Each image, text object, shape, or adjustment can sit on its own layer. This allows you to edit one part without damaging the rest of the design. The History panel helps you step backward, but good designers rely more on layers, masks, and smart objects than on undo.

Document setup matters before design begins. Use 72 DPI for screen graphics like WhatsApp posters and social media posts. Use 300 DPI for print work such as flyers, certificates, posters, banners, and business cards. RGB is normally for screens; CMYK is safer for print. Always name your file properly and save a PSD copy so you can edit layers later.

From the full Photoshop Masterclass notes, remember that graphic design is not just decoration. It communicates, persuades, builds identity, and captures attention. A poster, flyer, or social media advert should have a clear message, a target audience, and a reason for every visual decision.

The main design elements are line, shape, color, typography, texture, and space. Lines guide the eye, shapes structure information, color creates emotion, typography controls readability, texture adds feeling, and white space gives the design breathing room. The core principles are balance, contrast, emphasis, alignment, proximity, repetition, movement, and unity. Before opening Photoshop, ask: What should the viewer notice first? What should they do after seeing the design?

File formats matter in professional delivery. Save editable work as PSD. Export JPEG for photos and online sharing, PNG for transparent graphics and logos, PDF/TIFF for print, GIF for simple animation, and SVG only when preserving vector-style web graphics. A good workflow is: save the PSD first, then export the final version required by the client or platform.`,
  "ps-2": `Layers are the foundation of non-destructive editing. A layer is like a transparent sheet placed above or below other sheets. The order matters: layers at the top of the panel appear in front on the canvas, while layers below appear behind.

Good layer habits make your work faster and cleaner. Rename important layers, group related items with Ctrl+G, and keep text, images, backgrounds, and effects separated. When a client asks for changes, organized layers save time and make you look professional.

Blending modes change how a layer interacts with the layers underneath it. Multiply is useful when you want to darken or remove white areas, such as adding paper texture or shadows. Screen is useful for removing black areas, especially light leaks, sparks, glows, and lens effects. Overlay increases contrast by combining light and dark information.

Opacity affects the whole layer, including effects. Fill affects the layer content but can leave layer styles such as shadows or strokes visible. This difference is useful when creating advanced text effects, watermarks, and subtle overlays.

Layer types include normal raster layers, text layers, shape layers, adjustment layers, fill layers, smart objects, and the locked background layer. Text and shape layers remain editable until rasterized. Adjustment layers are especially important because they change brightness, contrast, hue, saturation, and tone without permanently damaging the image.

Layer styles are non-destructive effects added from the fx button or Blending Options. Drop Shadow separates an object from the background. Inner Shadow creates an engraved feeling. Outer Glow and Inner Glow help with neon, light, and emphasis. Stroke adds an outline. Gradient Overlay and Pattern Overlay add stylish fills. Bevel and Emboss can create a raised or carved 3D look, but should be used carefully so the design does not look cheap.

Use layer groups when a design becomes complex. Group backgrounds, images, text, effects, and call-to-action elements separately. Copy and paste layer styles when several elements need the same visual treatment. This keeps posters, mockups, and social media templates consistent and easier to edit.`,
  "ps-3": `Selections allow you to work on one part of an image without affecting everything else. A strong designer knows when to use fast tools and when to use precise tools. Quick Selection is useful for simple subjects with clear edges. The Pen Tool is better for products, logos, hard edges, and professional cutouts.

Masking is better than erasing. When you erase, pixels are destroyed. When you mask, pixels are only hidden. In a layer mask, white reveals and black hides. Gray partially hides. This means you can correct mistakes later, soften edges, and blend images naturally.

Select and Mask is especially important for hair, fur, fabric, and soft edges. Tools like Refine Edge help Photoshop detect fine details that normal selections miss. After cutting out a subject, check the edges against both light and dark backgrounds because mistakes often hide on one background but show on another.

A clean cutout should match the lighting, color, sharpness, and shadows of the new background. Selection is only the first step; believable compositing also needs adjustment layers, shadows, and edge cleanup.

Selections can be modified after creation. Feather softens the edge, invert selects the opposite area, and expand or contract adjusts the selection boundary. Ctrl+T opens Free Transform, where you can resize, rotate, flip, warp, distort, and change perspective. These tools are useful when placing products, people, or text into a composition.

Content-Aware Fill, Healing Brush, Spot Healing Brush, and Patch Tool help remove unwanted objects and repair image areas. Spot Healing automatically blends small marks. Healing Brush lets you choose a clean source area. Patch Tool is useful for larger repairs where texture must match the surrounding area.

Filters are creative and corrective tools. Gaussian Blur softens backgrounds and shadows. Motion Blur creates speed. Smart Sharpen and High Pass improve detail. Add Noise adds grain or realism. Reduce Noise cleans low-light photos. Emboss, Oil Paint, Lens Flare, Clouds, Lighting Effects, and Displace can create special visual styles. Convert a layer to a Smart Object before applying filters so the effect stays editable as a Smart Filter.`,
  "ps-4": `Professional skin retouching is about improving a portrait while keeping the person natural. The goal is not to remove all texture. Real skin has pores, small lines, and tone variation. Over-smoothing makes a face look plastic and unprofessional.

Start with basic cleanup. Use Spot Healing Brush for small blemishes, dust, or temporary marks. Use Clone Stamp when you need more control over the source area. Work on a separate empty layer where possible so the original photo remains safe.

Frequency separation separates texture from color and tone. The high-frequency layer keeps pores and fine details. The low-frequency layer holds color transitions and smoothness. This allows you to even out blotchy tones without destroying natural texture.

Dodge and Burn is used to shape light. Dodging brightens; burning darkens. With careful low-opacity strokes, you can reduce harsh shadows, enhance cheekbones, and guide attention to the face. Always zoom out often to avoid over-editing.

The masterclass notes connect retouching to blending modes and filters. Soft Light and Overlay are useful for subtle skin tone enhancement, while Gaussian Blur can support controlled softening when applied carefully through masks or Smart Filters. Avoid applying blur directly to the whole face; protect eyes, lips, eyebrows, hair, and important texture.

A clean retouching workflow is: duplicate or create a safe working layer, remove temporary marks with healing tools, correct tone with adjustment layers, refine texture carefully, then shape light with Dodge and Burn. Work at low opacity, compare before and after often, and stop before the person starts looking artificial.

For product or portrait work, final sharpening should be selective. High Pass with Overlay or Soft Light can sharpen important details, but too much sharpening creates halos and rough skin. The goal is clean, believable improvement, not an obvious filter effect.`,
  "ps-5": `Typography is visual communication. A poster can have beautiful images and still fail if the text is hard to read. Good type design uses hierarchy: the most important message should be seen first, then supporting information, then details.

Tracking controls space across a group of letters. Kerning controls space between individual letter pairs. Leading controls space between lines. Adjust these carefully to make headlines feel polished and body text comfortable to read.

Layer styles can help text stand out, but they must be controlled. Drop shadows, strokes, glows, and gradients should support readability, not distract from it. If the background is busy, add contrast with a dark overlay, a soft shadow, or a simple shape behind the text.

Poster layout depends on balance and alignment. Use grids, margins, and the rule of thirds to position elements. Keep related information close together, leave breathing space, and avoid putting every element at the same size. A strong poster guides the eye deliberately.

Text spacing is part of professional typography. Kerning adjusts space between two specific letters, tracking adjusts spacing across a word or phrase, leading controls line spacing, and paragraph spacing controls the gap before or after text blocks. Baseline shift moves selected characters up or down for special effects such as superscripts, subscripts, or stylized titles.

For logo and brand projects, begin with research, rough sketches, color psychology, and font pairing before designing in Photoshop. Keep logos simple, memorable, versatile, relevant, and original. Test the logo in black and white first, then apply color. Use guides, rulers, shape tools, the Pen Tool, Smart Objects, and layer styles carefully.

Poster and social media work should use the correct size and export settings. Instagram square posts are commonly 1080x1080, stories and vertical reels are 1080x1920, and print posters need 300 DPI with safe margins. Use high-quality images, readable fonts, a clear focal point, and enough spacing. For mockups, place artwork into Smart Objects so the design updates naturally on t-shirts, business cards, billboards, or phone screens.

Final project workflow: create the logo, poster, and social media design in organized folders; save PSD files for future editing; export PNG for transparent designs, JPG for photos, and PDF/TIFF for print. Keep separate folders for project files, assets, and final exports so client work stays professional.`,
  "ai-1": `Illustrator is a vector design tool. Vector artwork is built from paths, anchor points, curves, and fills instead of pixels. This means a logo can scale from a small social media icon to a billboard without becoming blurry.

Raster images depend on resolution. If you enlarge a small raster image too much, it pixelates. Vector artwork stays sharp because Illustrator recalculates the shape mathematically. This is why logos, icons, typography, packaging marks, and brand assets are usually created in Illustrator.

Artboards work like separate pages inside one document. You can create a logo, business card, letterhead, and social media layout in the same file using different artboards. This keeps a brand project organized.

Use RGB for screen work and CMYK for print work. RGB is built for light on screens, while CMYK is built for ink. For logos that will be printed in Kenya, CMYK setup helps reduce unexpected color shifts.`,
  "ai-2": `The Pen Tool is one of the most powerful tools in Illustrator because it gives exact control over paths. Clicking creates corner points. Clicking and dragging creates curved points with handles. The direction and length of handles control the smoothness of a curve.

Good Pen Tool work uses fewer points, not more. Too many points create bumpy curves and make editing difficult. Place anchor points at major direction changes, then use handles to shape the curve between them.

Holding Alt lets you break or adjust handles when a path needs to change direction sharply. Direct Selection (A) lets you move individual anchor points and handles after drawing. This is how you refine rough paths into clean professional shapes.

Tracing logos is excellent practice because it trains your eye to see curves, corners, spacing, and symmetry. Start slowly. Accuracy matters more than speed. With time, your hand becomes faster because your eye understands the shape.`,
  "ai-3": `Most strong logos are built from simple shapes. Circles, rectangles, triangles, and lines can combine into memorable marks when spacing, proportion, and alignment are controlled.

Shape Builder (Shift+M) lets you merge or remove overlapping shapes visually. Drag through regions to combine them. Hold Alt and click to delete unwanted parts. It is often faster and more intuitive than using Pathfinder buttons.

Pathfinder performs similar operations through commands such as Unite, Minus Front, Intersect, and Divide. Use it when you need precise boolean operations. After combining shapes, inspect anchor points and clean any unnecessary complexity.

Logo construction should consider balance, readability, and scalability. A logo must work in one color, at small sizes, and on different backgrounds. Before adding color effects, test the mark in black and white.`,
  "cc-1": `Short-form video succeeds when the viewer understands the message quickly. The first few seconds matter most. A strong opening hook, clear subject, and fast rhythm help keep people watching.

Aspect ratio controls where the video fits. Use 9:16 for TikTok, Instagram Reels, YouTube Shorts, and WhatsApp Status. Use 16:9 for YouTube landscape, presentations, and TV-style content. Choosing the wrong ratio can crop important details.

Good timeline editing removes dead space. Cut pauses, repeated words, and weak moments. Keep the strongest clips and arrange them so the video keeps moving. Audio also matters: clean sound, beat timing, and captions can make a simple edit feel professional.

Captions help viewers understand even when sound is off. Use readable fonts, strong contrast, and short caption lines. Avoid covering faces, products, or important action with text.`,
  "cc-2": `Keyframes create motion over time. You set a starting value and an ending value, and CapCut animates the change between them. This can control position, scale, rotation, opacity, and other effects.

Simple keyframe moves often look more professional than random transitions. A slow zoom can add focus. A small slide can introduce text. A controlled opacity change can reveal information cleanly.

Overlays place one video, image, or graphic above another. They are useful for reaction clips, logos, screenshots, subtitles, texture effects, and before-after comparisons. Blending modes and opacity help overlays feel integrated instead of pasted on.

Velocity editing changes clip speed for impact. Speed ramps can emphasize action, music beats, or transitions. Use them carefully: too much speed change can confuse the viewer. The best edits support the story.`,
  "sw-1": `SolidWorks sketching is the base of accurate 3D modeling. A weak sketch creates weak parts. A strong sketch is clear, fully defined, and controlled by dimensions and relations.

Relations describe how sketch entities behave. Horizontal and vertical relations control direction. Tangent relations create smooth contact between curves and lines. Coincident relations connect points. Concentric relations make circles share the same center.

Smart Dimensions give exact size to geometry. A professional model should not depend on dragging shapes by eye. Dimensions make the design repeatable, editable, and ready for manufacturing.

A fully defined sketch turns black, meaning its size and position are controlled. Blue geometry is under-defined and can move unexpectedly. Before creating 3D features, make sure important sketches are fully defined so later changes do not break the model.`,
  "sw-2": `Extrude Boss/Base turns a 2D sketch into a 3D solid by adding depth. It is one of the most common features in SolidWorks. The sketch profile controls the shape, and the extrusion distance controls thickness.

Revolve creates a 3D shape by rotating a sketch around an axis. This is ideal for circular or cylindrical objects such as bottles, shafts, wheels, pulleys, and knobs. The axis must be chosen carefully because it controls the center of rotation.

Extrude Cut removes material from a part. It is used for holes, slots, pockets, vents, and clearances. Cuts should be dimensioned properly so they match the design requirement rather than being placed by guesswork.

Fillets and chamfers improve both appearance and function. Fillets round edges, while chamfers create angled edges. In engineering, these features can reduce sharp edges, improve manufacturability, and help parts assemble smoothly.`
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
  quiz: quizEnhancements[lesson.id] ?? lesson.quiz,
  resources: [
    { name: `${lesson.title} Notes.pdf`, url: `/api/notes/${lesson.id}`, type: "pdf" },
    ...lesson.resources.filter((resource) => resource.url !== "#"),
  ],
}));
