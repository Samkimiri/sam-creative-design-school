// Content for the daily games (Term Guess and Design Trivia). Kept separate from the
// components so the word/question pools are easy to extend without touching game logic.

export type WordCategory = "Design" | "Code" | "Video" | "CAD" | "AI";

export interface DailyWord {
  word: string;
  category: WordCategory;
  hint: string;
}

// Every entry is a real 5-letter English word so guesses stay checkable without
// shipping a full dictionary - see isPlausibleGuess() in DailyGames.tsx.
export const DAILY_WORDS: DailyWord[] = [
  { word: "LAYER", category: "Design", hint: "Stack independent pieces of a Photoshop or Illustrator file" },
  { word: "PIXEL", category: "Design", hint: "The smallest square of color in a raster image" },
  { word: "BLEND", category: "Design", hint: "A mode that changes how one layer mixes with the one below it" },
  { word: "SHAPE", category: "Design", hint: "A vector object built from points and paths" },
  { word: "GLYPH", category: "Design", hint: "A single printable character in a typeface" },
  { word: "BRUSH", category: "Design", hint: "The tool you paint with in Photoshop" },
  { word: "TRACE", category: "Design", hint: "Converting a raster image into vector paths" },
  { word: "MOTIF", category: "Design", hint: "A repeated visual idea that ties a design together" },
  { word: "FRAME", category: "Video", hint: "One still image in a video, 24 to 60 of these per second" },
  { word: "SCALE", category: "Design", hint: "Resizing an element up or down" },
  { word: "TILES", category: "Design", hint: "Repeating units that make up a seamless pattern" },
  { word: "ICONS", category: "Design", hint: "Small symbols standing in for an action or object" },
  { word: "ARRAY", category: "Code", hint: "An ordered list of values in JavaScript" },
  { word: "QUERY", category: "Code", hint: "A request sent to an API or a database" },
  { word: "STATE", category: "Code", hint: "Data a React component remembers between renders" },
  { word: "CACHE", category: "Code", hint: "A temporary store that speeds up repeat requests" },
  { word: "DEBUG", category: "Code", hint: "Finding and fixing an error in code" },
  { word: "STYLE", category: "Code", hint: "CSS rules that control how HTML looks" },
  { word: "ROUTE", category: "Code", hint: "A URL path mapped to a page in Next.js" },
  { word: "TOKEN", category: "Code", hint: "A unit of text an AI model reads or generates" },
  { word: "FETCH", category: "Code", hint: "The browser API used to call a server" },
  { word: "ASYNC", category: "Code", hint: "Code that keeps running while it waits on something slow" },
  { word: "CLASS", category: "Code", hint: "A reusable CSS selector, or a blueprint for an object" },
  { word: "INPUT", category: "Code", hint: "A form field that collects a value from a user" },
  { word: "EVENT", category: "Code", hint: "Something a browser fires, like a click" },
  { word: "MEDIA", category: "Code", hint: "The CSS rule type used to build responsive layouts" },
  { word: "SOLID", category: "CAD", hint: "A fully three-dimensional body in SolidWorks" },
  { word: "MODEL", category: "CAD", hint: "The 3D part or assembly you're designing" },
  { word: "CLIPS", category: "Video", hint: "The short pieces of footage you cut together" },
  { word: "AUDIO", category: "Video", hint: "The sound track of an edited video" },
  { word: "TITLE", category: "Video", hint: "Text on screen at the start of a video" },
  { word: "SPEED", category: "Video", hint: "Ramping this up or down changes how fast footage plays" },
  { word: "PATHS", category: "Design", hint: "The lines a Pen Tool anchor point connects" },
  { word: "MASKS", category: "Design", hint: "Hide part of a layer without deleting any pixels" },
  { word: "FONTS", category: "Design", hint: "The typefaces used across a design" },
  { word: "COLOR", category: "Design", hint: "Hue, saturation, and brightness together" },
  { word: "SHADE", category: "Design", hint: "A color mixed with black to make it darker" },
  { word: "PANEL", category: "Design", hint: "A dockable window like Layers or Swatches" },
  { word: "BOARD", category: "Design", hint: "Short for the surface a Pinterest mood collection lives on" },
  { word: "SLIDE", category: "Design", hint: "One page of a presentation deck" },
  { word: "VIDEO", category: "Video", hint: "Moving images with sound" },
  { word: "PHOTO", category: "Design", hint: "A raster image captured with a camera" },
  { word: "IMAGE", category: "Design", hint: "A general word for a picture file" },
  { word: "CURVE", category: "Design", hint: "A smooth bend drawn with the Pen Tool" },
  { word: "ANGLE", category: "CAD", hint: "The measurement between two intersecting lines" },
  { word: "DEPTH", category: "CAD", hint: "How far an extrude pushes a sketch into 3D" },
  { word: "LIGHT", category: "Design", hint: "A source that creates highlights and shadows in a render" },
  { word: "GLOSS", category: "Design", hint: "A shiny material finish" },
  { word: "MATTE", category: "Design", hint: "A flat, non-shiny material finish" },
  { word: "ALIGN", category: "Design", hint: "Snapping objects to the same edge or center" },
  { word: "GROUP", category: "Design", hint: "Combining several layers so they move together" },
];

export interface TriviaQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const TRIVIA_POOL: TriviaQuestion[] = [
  { question: "What does DPI stand for in a print document?", options: ["Digital Pixel Index", "Dots Per Inch", "Design Print Interval", "Data Per Image"], answer: 1, explanation: "DPI measures print resolution - 300 DPI is the standard for high-quality printing." },
  { question: "Which Photoshop blending mode is best for removing black to add a glow effect?", options: ["Multiply", "Screen", "Normal", "Darken"], answer: 1, explanation: "Screen brightens by ignoring black, which is why it's used for lens flares and light leaks." },
  { question: "In Illustrator, what does the Pen Tool create?", options: ["Raster pixels", "Vector paths", "Text frames", "Gradients"], answer: 1, explanation: "The Pen Tool draws vector paths made of anchor points and handles." },
  { question: "What color mode should you use for a logo headed to a printer?", options: ["RGB", "CMYK", "HSB", "Grayscale"], answer: 1, explanation: "CMYK matches how printers mix ink, avoiding color shifts you'd get from RGB." },
  { question: "Which CSS property controls the space inside an element, between its content and its border?", options: ["margin", "padding", "gap", "inset"], answer: 1, explanation: "Padding is inside the border; margin is outside it." },
  { question: "In React, what hook lets a component remember a value between renders?", options: ["useEffect", "useState", "useRef only", "useMemo only"], answer: 1, explanation: "useState stores a value and re-renders the component when it changes." },
  { question: "What does API stand for?", options: ["Application Programming Interface", "Automated Page Index", "Applied Program Instruction", "App Process Integration"], answer: 0, explanation: "An API is the interface one program exposes for another program to call." },
  { question: "In SolidWorks, what turns a 2D sketch into a solid by spinning it around an axis?", options: ["Extrude", "Revolve", "Sweep", "Loft"], answer: 1, explanation: "Revolve spins a profile around an axis - perfect for bottles, wheels, and knobs." },
  { question: "What color are sketch lines in SolidWorks when they are fully defined?", options: ["Blue", "Black", "Red", "Green"], answer: 1, explanation: "Black means every line's position is locked down; blue means something can still move." },
  { question: "In CapCut, which aspect ratio is correct for a TikTok or Reels video?", options: ["16:9", "4:3", "9:16", "1:1"], answer: 2, explanation: "9:16 is vertical, filling a phone screen without black bars." },
  { question: "What does 'few-shot prompting' mean when writing AI prompts?", options: ["Asking a very short question", "Giving the AI a few examples of the output you want", "Limiting the AI to 5 words", "Using 5 different AI tools"], answer: 1, explanation: "Few-shot prompting shows the AI 2-3 examples of the style or format you want before it answers." },
  { question: "Which HTML tag is the semantically correct choice for a page's main navigation links?", options: ["<div>", "<nav>", "<section>", "<header>"], answer: 1, explanation: "<nav> tells browsers and screen readers this block is navigation, not generic content." },
  { question: "In Photoshop, what does a layer mask's black area do?", options: ["Deletes the pixels permanently", "Hides that part of the layer", "Inverts the colors", "Locks the layer"], answer: 1, explanation: "Black hides, white reveals - and you can always paint it back later since nothing is deleted." },
  { question: "What is the main advantage of a vector graphic over a raster one?", options: ["It loads faster always", "It can scale to any size without blurring", "It uses fewer colors", "It can't be edited"], answer: 1, explanation: "Vectors are built from math, not pixels, so they stay sharp at any size." },
  { question: "In CSS, what does the Flexbox property `justify-content: center` do?", options: ["Centers items on the cross axis", "Centers items on the main axis", "Stretches items to fill the row", "Reverses the item order"], answer: 1, explanation: "justify-content controls alignment along Flexbox's main axis (horizontal by default)." },
  { question: "What is a certificate ID used for on this site's Verify Certificate page?", options: ["Logging in as a student", "Confirming a certificate is genuine", "Resetting a password", "Enrolling in a course"], answer: 1, explanation: "Anyone can paste a certificate ID there to confirm it was really issued by SCDS." },
  { question: "In Illustrator, what does expanding a stroke do?", options: ["Deletes the stroke", "Converts the stroke outline into a filled shape", "Makes the stroke dashed", "Rounds the stroke corners"], answer: 1, explanation: "Expanding turns a stroke into real vector geometry, so it scales correctly everywhere." },
  { question: "What does a 404 status code mean when calling an API?", options: ["Success", "The server is down", "Not found", "Unauthorized"], answer: 2, explanation: "404 means the server couldn't find whatever the request asked for." },
  { question: "In video editing, what is a 'jump cut'?", options: ["A cut with a smooth crossfade", "An abrupt cut between two similar shots", "A slow-motion effect", "A color grading technique"], answer: 1, explanation: "A jump cut skips time abruptly between near-identical shots, often used deliberately for pace." },
  { question: "What SolidWorks feature removes material from a solid, like drilling a hole?", options: ["Extrude Boss", "Extrude Cut", "Mirror", "Fillet"], answer: 1, explanation: "Extrude Cut removes material; Extrude Boss/Base adds it." },
  { question: "In UX design, what is a 'wireframe'?", options: ["A finished visual design", "A low-detail layout showing structure, not style", "A type of font", "A marketing document"], answer: 1, explanation: "Wireframes focus on layout and flow before any color or typography decisions are made." },
  { question: "What does the CSS `border-radius` property control?", options: ["Border color", "Border thickness", "How rounded the corners are", "Border position"], answer: 2, explanation: "border-radius rounds the corners of an element's box." },
  { question: "In prompt engineering, what is 'chain-of-thought' prompting?", options: ["Asking multiple AIs the same question", "Asking the AI to reason step by step before answering", "Chaining several apps together", "Repeating the same prompt"], answer: 1, explanation: "It asks the model to show its reasoning steps first, which often improves the final answer." },
  { question: "What Illustrator tool combines overlapping shapes into one custom shape?", options: ["Pathfinder / Shape Builder", "Eyedropper", "Type Tool", "Gradient Tool"], answer: 0, explanation: "Shape Builder (and the Pathfinder panel) merge, subtract, or intersect overlapping shapes." },
  { question: "What does 'responsive design' mean?", options: ["A site that loads instantly", "A layout that adapts to different screen sizes", "A site with animations", "A site that responds to voice commands"], answer: 1, explanation: "Responsive layouts reflow content so a page works on phones, tablets, and desktops alike." },
];
