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
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  videoUrl: string;
  content: string;
  resources: { name: string; url: string; type: "pdf" | "zip" | "link" }[];
  quiz?: { questions: QuizQuestion[] };
  order: number;
}

export const lessons: Lesson[] = [
  // ─── PHOTOSHOP MASTERCLASS ───────────────────────────────────────────────
  {
    id: "ps-1", courseId: "photoshop-masterclass", order: 1,
    title: "Introduction to the Photoshop Workspace",
    duration: "18:30",
    videoUrl: "https://www.youtube.com/embed/ZByhs9mcpdg",
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
    videoUrl: "https://www.youtube.com/embed/S_8qveG6iC0",
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
    videoUrl: "https://www.youtube.com/embed/8v_C9fP06-g",
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
    videoUrl: "https://www.youtube.com/embed/58E62v_6_10",
    content: "Learn the secrets of high-end beauty retouching. 1. Spot Healing Brush: Best for quick blemish removal. 2. Clone Stamp (S): Copying pixels from one area to another. 3. Frequency Separation: Splitting the image into Texture (High) and Color (Low) layers. This lets you smooth skin tones without losing the natural texture. 4. Dodge & Burn: Adding highlights and shadows to give the face more depth and structure.",
    resources: [{ name: "Retouching Workflow.pdf", url: "#", type: "pdf" }],
  },
  {
    id: "ps-5", courseId: "photoshop-masterclass", order: 5,
    title: "Dynamic Typography & Poster Design",
    duration: "31:20",
    videoUrl: "https://www.youtube.com/embed/IyR_uYsbekU",
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
    videoUrl: "https://www.youtube.com/embed/2u7ijgxFOHc",
    content: "If you master the Pen Tool, you can design anything. 1. Anchor Points: Click for sharp corners, Click and Drag for curves. 2. Handle Management: Hold Alt to break a handle for a sharp change in direction. 3. Curvature Tool: A faster way to make smooth curves for beginners. 4. Practice: Tracing logos is the best way to train your hand and eye for precision.",
    resources: [{ name: "Pen Tool Tracing Pack.pdf", url: "#", type: "pdf" }],
  },
  {
    id: "ai-3", courseId: "illustrator-training", order: 3,
    title: "Shape Builder & Logo Construction",
    duration: "25:30",
    videoUrl: "https://www.youtube.com/embed/k9YQ_C8wR9E",
    content: "Most great logos are just simple shapes combined. 1. Shape Builder (Shift+M): Drag over parts of shapes to join them, or Alt+Click to delete them. 2. Pathfinder: A panel version of the shape builder—Unite, Minus Front, Intersect. 3. Grids: Using circles and lines to create a balanced 'Golden Ratio' logo. 4. Expanding: Turning strokes into shapes so they scale correctly.",
    resources: [{ name: "Logo Grid Template.zip", url: "#", type: "zip" }],
  },

  // ─── CAPCUT MASTERCLASS ──────────────────────────────────────────────────
  {
    id: "cc-1", courseId: "capcut-masterclass", order: 1,
    title: "Viral Video Foundations",
    duration: "14:20",
    videoUrl: "https://www.youtube.com/embed/YIByq6-uQ4g",
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
    videoUrl: "https://www.youtube.com/embed/oQ3-Mlyr3pU",
    content: "Motion is emotion. 1. Keyframes: Setting a 'Start' and 'End' point for an effect. Use them for custom zooms and sliding text. 2. Overlays: Putting one video on top of another. 3. Blending: Making overlays look like they are part of the original scene. 4. Velocity Editing: Speeding up and slowing down clips for dramatic impact.",
    resources: [],
  },

  // ─── SOLIDWORKS ──────────────────────────────────────────────────────────
  {
    id: "sw-1", courseId: "solidworks-engineers", order: 1,
    title: "Precision Sketching & Smart Dimensions",
    duration: "26:00",
    videoUrl: "https://www.youtube.com/embed/qsy7T-3TshA",
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
    videoUrl: "https://www.youtube.com/embed/v9S_P7w_q_Y",
    content: "Turning 2D into 3D. 1. Extrude Boss/Base: Giving thickness to a sketch. 2. Revolve: Spinning a profile around an axis (great for bottles, wheels, and gears). 3. Extrude Cut: Removing material. 4. Fillet & Chamfer: Rounding or flattening edges for safety and aesthetics in manufacturing.",
    resources: [{ name: "Part Design Brief.pdf", url: "#", type: "pdf" }],
  }
];
