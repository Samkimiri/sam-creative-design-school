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
  explanation?: string;
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

const baseLessons: Lesson[] = [
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

const enhancedContent: Record<string, string> = {
  "ps-1": `Photoshop is a raster image editor, which means it builds images using pixels. This is perfect for photo editing, posters, banners, mockups, social media graphics, and digital artwork. The most important idea in this lesson is workspace control: when you know where tools, panels, and document settings live, you stop guessing and start working like a designer.

The Toolbar holds the tools you use directly on the canvas. The Move Tool (V) positions layers, the Brush Tool (B) paints, the Type Tool (T) creates text, and selection tools help isolate parts of an image. The Options Bar changes depending on the selected tool, so always check it before assuming a tool is not working.

The Layers panel is where professional Photoshop work happens. Each image, text object, shape, or adjustment can sit on its own layer. This allows you to edit one part without damaging the rest of the design. The History panel helps you step backward, but good designers rely more on layers, masks, and smart objects than on undo.

Document setup matters before design begins. Use 72 DPI for screen graphics like WhatsApp posters and social media posts. Use 300 DPI for print work such as flyers, certificates, posters, banners, and business cards. RGB is normally for screens; CMYK is safer for print. Always name your file properly and save a PSD copy so you can edit layers later.`,
  "ps-2": `Layers are the foundation of non-destructive editing. A layer is like a transparent sheet placed above or below other sheets. The order matters: layers at the top of the panel appear in front on the canvas, while layers below appear behind.

Good layer habits make your work faster and cleaner. Rename important layers, group related items with Ctrl+G, and keep text, images, backgrounds, and effects separated. When a client asks for changes, organized layers save time and make you look professional.

Blending modes change how a layer interacts with the layers underneath it. Multiply is useful when you want to darken or remove white areas, such as adding paper texture or shadows. Screen is useful for removing black areas, especially light leaks, sparks, glows, and lens effects. Overlay increases contrast by combining light and dark information.

Opacity affects the whole layer, including effects. Fill affects the layer content but can leave layer styles such as shadows or strokes visible. This difference is useful when creating advanced text effects, watermarks, and subtle overlays.`,
  "ps-3": `Selections allow you to work on one part of an image without affecting everything else. A strong designer knows when to use fast tools and when to use precise tools. Quick Selection is useful for simple subjects with clear edges. The Pen Tool is better for products, logos, hard edges, and professional cutouts.

Masking is better than erasing. When you erase, pixels are destroyed. When you mask, pixels are only hidden. In a layer mask, white reveals and black hides. Gray partially hides. This means you can correct mistakes later, soften edges, and blend images naturally.

Select and Mask is especially important for hair, fur, fabric, and soft edges. Tools like Refine Edge help Photoshop detect fine details that normal selections miss. After cutting out a subject, check the edges against both light and dark backgrounds because mistakes often hide on one background but show on another.

A clean cutout should match the lighting, color, sharpness, and shadows of the new background. Selection is only the first step; believable compositing also needs adjustment layers, shadows, and edge cleanup.`,
  "ps-4": `Professional skin retouching is about improving a portrait while keeping the person natural. The goal is not to remove all texture. Real skin has pores, small lines, and tone variation. Over-smoothing makes a face look plastic and unprofessional.

Start with basic cleanup. Use Spot Healing Brush for small blemishes, dust, or temporary marks. Use Clone Stamp when you need more control over the source area. Work on a separate empty layer where possible so the original photo remains safe.

Frequency separation separates texture from color and tone. The high-frequency layer keeps pores and fine details. The low-frequency layer holds color transitions and smoothness. This allows you to even out blotchy tones without destroying natural texture.

Dodge and Burn is used to shape light. Dodging brightens; burning darkens. With careful low-opacity strokes, you can reduce harsh shadows, enhance cheekbones, and guide attention to the face. Always zoom out often to avoid over-editing.`,
  "ps-5": `Typography is visual communication. A poster can have beautiful images and still fail if the text is hard to read. Good type design uses hierarchy: the most important message should be seen first, then supporting information, then details.

Tracking controls space across a group of letters. Kerning controls space between individual letter pairs. Leading controls space between lines. Adjust these carefully to make headlines feel polished and body text comfortable to read.

Layer styles can help text stand out, but they must be controlled. Drop shadows, strokes, glows, and gradients should support readability, not distract from it. If the background is busy, add contrast with a dark overlay, a soft shadow, or a simple shape behind the text.

Poster layout depends on balance and alignment. Use grids, margins, and the rule of thirds to position elements. Keep related information close together, leave breathing space, and avoid putting every element at the same size. A strong poster guides the eye deliberately.`,
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
      { id: "ps-1-q3", question: "Why should a designer save a PSD copy?", options: ["To flatten all layers", "To preserve editable layers", "To reduce image quality", "To remove masks"], answer: 1, explanation: "PSD keeps layers, masks, text, and effects editable so client changes are easier later." }
    ]
  },
  "ps-2": {
    questions: [
      { id: "ps-2-q1", question: "Which blending mode is best for removing a black background from a light effect?", options: ["Multiply", "Screen", "Overlay", "Color Burn"], answer: 1, explanation: "Screen hides black areas and keeps bright pixels, making it useful for sparks, glows, and light leaks." },
      { id: "ps-2-q2", question: "What is the shortcut to group selected layers?", options: ["Ctrl+T", "Ctrl+J", "Ctrl+G", "Ctrl+E"], answer: 2, explanation: "Ctrl+G groups selected layers, helping keep a Photoshop file organized." },
      { id: "ps-2-q3", question: "Which statement best describes layer order?", options: ["Lower layers appear in front", "Top layers appear in front", "Layer order affects only text", "Layer order only matters in print"], answer: 1, explanation: "Layers higher in the panel appear above layers below them on the canvas." }
    ]
  },
  "ps-3": {
    questions: [
      { id: "ps-3-q1", question: "In a Layer Mask, what color is used to hide parts of the layer?", options: ["White", "Black", "Grey", "Red"], answer: 1, explanation: "Black hides pixels on a mask, white reveals them, and gray partially hides them." },
      { id: "ps-3-q2", question: "Why are masks preferred over the Eraser Tool?", options: ["They permanently delete pixels", "They make edits reversible", "They lower resolution", "They only work with text"], answer: 1, explanation: "Masks are non-destructive, so hidden areas can be restored later." }
    ]
  },
  "ps-4": {
    questions: [
      { id: "ps-4-q1", question: "What should professional skin retouching preserve?", options: ["Natural skin texture", "Only shadows", "All blemishes", "Plastic smoothness"], answer: 0, explanation: "Good retouching improves the portrait while keeping natural pores and texture." },
      { id: "ps-4-q2", question: "What does frequency separation help separate?", options: ["Text and shapes", "Texture and color/tone", "RGB and CMYK", "Video and audio"], answer: 1, explanation: "Frequency separation lets you work on texture separately from skin color and tone." }
    ]
  },
  "ps-5": {
    questions: [
      { id: "ps-5-q1", question: "What is visual hierarchy in poster design?", options: ["Making all text the same size", "Guiding what the viewer sees first", "Using only one font", "Removing spacing"], answer: 1, explanation: "Hierarchy controls importance so the main message is noticed before supporting details." },
      { id: "ps-5-q2", question: "What does kerning adjust?", options: ["Space between individual letter pairs", "Canvas resolution", "Layer opacity", "Image sharpness"], answer: 0, explanation: "Kerning fine-tunes spacing between specific letters to make type look polished." }
    ]
  },
  "ai-1": {
    questions: [
      { id: "ai-1-q1", question: "What happens to a vector image when you scale it up 1000%?", options: ["It becomes blurry", "It remains perfectly sharp", "It changes color", "It disappears"], answer: 1, explanation: "Vector artwork is calculated from paths and points, so it can scale without pixelation." },
      { id: "ai-1-q2", question: "Which color mode is usually safer for print work?", options: ["RGB", "CMYK", "HSL", "Indexed Color"], answer: 1, explanation: "CMYK is designed for ink-based printing, while RGB is designed for screens." }
    ]
  },
  "ai-2": {
    questions: [
      { id: "ai-2-q1", question: "What action creates a curved point with the Pen Tool?", options: ["Single click", "Click and drag", "Press Delete", "Double-click the artboard"], answer: 1, explanation: "Clicking and dragging creates handles that control the curve." },
      { id: "ai-2-q2", question: "Why should paths avoid too many anchor points?", options: ["They become harder to edit smoothly", "They cannot be colored", "They stop being vectors", "They export only as video"], answer: 0, explanation: "Fewer well-placed points create cleaner curves and easier editing." }
    ]
  },
  "ai-3": {
    questions: [
      { id: "ai-3-q1", question: "What does Shape Builder help you do?", options: ["Edit video speed", "Merge or remove overlapping shapes", "Change DPI", "Export audio"], answer: 1, explanation: "Shape Builder combines or removes parts of overlapping vector shapes." },
      { id: "ai-3-q2", question: "Why test a logo in black and white?", options: ["To check if it works without color effects", "To reduce file size only", "To remove paths", "To convert it to raster"], answer: 0, explanation: "A strong logo should remain clear and recognizable without relying on color." }
    ]
  },
  "cc-1": {
    questions: [
      { id: "cc-1-q1", question: "Which aspect ratio is best for Instagram Reels?", options: ["16:9", "4:3", "9:16", "2:1"], answer: 2, explanation: "9:16 is the vertical format used by Reels, TikTok, Shorts, and mobile-first video." },
      { id: "cc-1-q2", question: "Why are captions useful in short-form video?", options: ["They help viewers understand with sound off", "They replace all editing", "They lower video quality", "They only work in landscape"], answer: 0, explanation: "Many viewers watch without sound, so readable captions keep the message clear." }
    ]
  },
  "cc-2": {
    questions: [
      { id: "cc-2-q1", question: "What do keyframes create?", options: ["Motion or change over time", "A fixed screenshot", "Only audio noise", "A deleted clip"], answer: 0, explanation: "Keyframes set start and end values so CapCut can animate between them." },
      { id: "cc-2-q2", question: "What is an overlay?", options: ["A layer placed above another clip", "A type of bank payment", "A deleted transition", "A video aspect ratio"], answer: 0, explanation: "Overlays place video, images, text, or graphics above the main clip." }
    ]
  },
  "sw-1": {
    questions: [
      { id: "sw-1-q1", question: "What color does a sketch turn when it is fully defined?", options: ["Blue", "Red", "Black", "Green"], answer: 2, explanation: "Black sketch geometry means size and position are fully controlled by dimensions and relations." },
      { id: "sw-1-q2", question: "Which relation makes two circles share the same center point?", options: ["Tangent", "Concentric", "Coincident", "Parallel"], answer: 1, explanation: "A concentric relation aligns circular entities around the same center." },
      { id: "sw-1-q3", question: "Why is under-defined blue geometry risky?", options: ["It may move unexpectedly", "It cannot be extruded at all", "It is always hidden", "It means the part is finished"], answer: 0, explanation: "Under-defined geometry can shift when the model updates, causing inaccurate parts." }
    ]
  },
  "sw-2": {
    questions: [
      { id: "sw-2-q1", question: "What does Extrude Boss/Base do?", options: ["Adds depth to a sketch", "Deletes all material", "Changes the file name", "Only adds color"], answer: 0, explanation: "Extrude Boss/Base turns a closed 2D sketch into a 3D solid by adding thickness." },
      { id: "sw-2-q2", question: "Which feature is best for bottle-like circular forms?", options: ["Revolve", "Mirror only", "Text Tool", "Crop"], answer: 0, explanation: "Revolve rotates a profile around an axis, making it ideal for round objects." }
    ]
  }
};

export const lessons: Lesson[] = baseLessons.map((lesson) => ({
  ...lesson,
  content: enhancedContent[lesson.id] ?? lesson.content,
  quiz: quizEnhancements[lesson.id] ?? lesson.quiz,
  resources: [
    { name: `${lesson.title} Notes.pdf`, url: `/api/notes/${lesson.id}`, type: "pdf" },
    ...lesson.resources.filter((resource) => resource.url !== "#"),
  ],
}));
