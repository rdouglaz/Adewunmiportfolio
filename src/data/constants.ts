// Skill catalogue for Adewunmi Saliu.
//
// IMPORTANT — the 3D keyboard contract: each enum VALUE (e.g. "js") must match
// an object name inside public/assets/skills-keyboard.spline. The Spline scene
// is a fixed binary, so values are stable technical keys; only the displayed
// label / description / color / icon change. `findObjectByName(skill.name)`
// in animated-background.tsx depends on this — do not rename values.
export enum SkillNames {
  PRODUCT_STRATEGY = "js",
  USER_RESEARCH = "ts",
  RAPID_PROTOTYPING = "html",
  PRODUCT_DESIGN = "css",
  GO_TO_MARKET = "react",
  LLM_INTEGRATION = "vue",
  PROMPT_ENGINEERING = "nextjs",
  RAG_SYSTEMS = "tailwind",
  AI_WORKFLOW_DESIGN = "nodejs",
  VOICE_KNOWLEDGE_SYSTEMS = "express",
  AI_AUTOMATION = "git",
  KNOWLEDGE_BASES = "github",
  AI_WRITING_SYSTEMS = "npm",
  REACT_NEXTJS = "postgres",
  TYPESCRIPT = "mongodb",
  VERCEL = "prettier",
  API_DESIGN = "firebase",
  DATABASE_DESIGN = "wordpress",
  NOCODE_PLATFORMS = "linux",
  API_INTEGRATIONS = "docker",
  CRM_INTEGRATIONS = "nginx",
  FOUNDER_MINDSET = "aws",
  OPERATIONS = "gcp",
  MULTITENANT_ARCHITECTURE = "vim",
  SUBSCRIPTION_SYSTEMS = "vercel",
}

export type SkillCategory = "Product" | "AI" | "Technical" | "Business";

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  category: SkillCategory;
};

// Brand icons come from devicons; abstract capability icons come from
// lucide-static (pinned to the installed lucide-react version).
const lucide = (name: string) =>
  `https://cdn.jsdelivr.net/npm/lucide-static@0.416.0/icons/${name}.svg`;

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.PRODUCT_STRATEGY]: {
    id: 1,
    name: "js",
    label: "Product Strategy",
    shortDescription: "Finding the smallest valuable thing to build first — then sequencing what comes next.",
    color: "#3B82F6",
    icon: lucide("target"),
    category: "Product",
  },
  [SkillNames.USER_RESEARCH]: {
    id: 2,
    name: "ts",
    label: "User Research",
    shortDescription: "Talking to real users and turning messy feedback into clear product decisions.",
    color: "#60A5FA",
    icon: lucide("users"),
    category: "Product",
  },
  [SkillNames.RAPID_PROTOTYPING]: {
    id: 3,
    name: "html",
    label: "Rapid Prototyping",
    shortDescription: "From idea to something clickable in days, not quarters.",
    color: "#818CF8",
    icon: lucide("zap"),
    category: "Product",
  },
  [SkillNames.PRODUCT_DESIGN]: {
    id: 4,
    name: "css",
    label: "Product Design",
    shortDescription: "Clean, calm interfaces for complex AI-powered workflows.",
    color: "#A78BFA",
    icon: lucide("pen-tool"),
    category: "Product",
  },
  [SkillNames.GO_TO_MARKET]: {
    id: 5,
    name: "react",
    label: "Go-to-Market",
    shortDescription: "Positioning, launch sequencing, and getting v1 into users' hands.",
    color: "#38BDF8",
    icon: lucide("rocket"),
    category: "Product",
  },
  [SkillNames.LLM_INTEGRATION]: {
    id: 6,
    name: "vue",
    label: "LLM Integration",
    shortDescription: "Wiring frontier models into production features — reliably, not as demos.",
    color: "#2563EB",
    icon: lucide("brain"),
    category: "AI",
  },
  [SkillNames.PROMPT_ENGINEERING]: {
    id: 7,
    name: "nextjs",
    label: "Prompt Engineering",
    shortDescription: "Structured prompts, evals, and guardrails that make model output dependable.",
    color: "#0EA5E9",
    icon: lucide("terminal"),
    category: "AI",
  },
  [SkillNames.RAG_SYSTEMS]: {
    id: 8,
    name: "tailwind",
    label: "RAG Systems",
    shortDescription: "Grounding LLMs in your documents so answers stay accurate and sourced.",
    color: "#06B6D4",
    icon: lucide("database"),
    category: "AI",
  },
  [SkillNames.AI_WORKFLOW_DESIGN]: {
    id: 9,
    name: "nodejs",
    label: "AI Workflow Design",
    shortDescription: "Multi-step AI pipelines — human-in-the-loop where it matters, automated where it doesn't.",
    color: "#3B82F6",
    icon: lucide("workflow"),
    category: "AI",
  },
  [SkillNames.VOICE_KNOWLEDGE_SYSTEMS]: {
    id: 10,
    name: "express",
    label: "Voice & Knowledge Systems",
    shortDescription: "Capturing how someone sounds and knows — then scaling it with AI.",
    color: "#6366F1",
    icon: lucide("mic"),
    category: "AI",
  },
  [SkillNames.AI_AUTOMATION]: {
    id: 11,
    name: "git",
    label: "AI Automation",
    shortDescription: "Removing repetitive operational work with agentic, event-driven automation.",
    color: "#14B8A6",
    icon: lucide("bot"),
    category: "AI",
  },
  [SkillNames.KNOWLEDGE_BASES]: {
    id: 12,
    name: "github",
    label: "Knowledge Bases",
    shortDescription: "Structured, searchable knowledge stores that power AI answers and research.",
    color: "#8B5CF6",
    icon: lucide("book-open"),
    category: "AI",
  },
  [SkillNames.AI_WRITING_SYSTEMS]: {
    id: 13,
    name: "npm",
    label: "AI Writing Systems",
    shortDescription: "Long-form writing workflows — research, outline, draft, and edit in one loop.",
    color: "#0EA5E9",
    icon: lucide("pen-line"),
    category: "AI",
  },
  [SkillNames.REACT_NEXTJS]: {
    id: 14,
    name: "postgres",
    label: "React / Next.js",
    shortDescription: "The app layer — fast, server-rendered product experiences.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Technical",
  },
  [SkillNames.TYPESCRIPT]: {
    id: 15,
    name: "mongodb",
    label: "TypeScript",
    shortDescription: "End-to-end type safety from database to UI.",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Technical",
  },
  [SkillNames.VERCEL]: {
    id: 16,
    name: "prettier",
    label: "Vercel",
    shortDescription: "Preview-per-commit deploys and edge-fast global delivery.",
    color: "#e8e8e8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    category: "Technical",
  },
  [SkillNames.API_DESIGN]: {
    id: 17,
    name: "firebase",
    label: "API Design",
    shortDescription: "Clean, versioned contracts between AI services, apps, and integrations.",
    color: "#3B82F6",
    icon: lucide("braces"),
    category: "Technical",
  },
  [SkillNames.DATABASE_DESIGN]: {
    id: 18,
    name: "wordpress",
    label: "Database Design",
    shortDescription: "Schemas that model the real business — multi-tenant from day one.",
    color: "#38BDF8",
    icon: lucide("server"),
    category: "Technical",
  },
  [SkillNames.NOCODE_PLATFORMS]: {
    id: 19,
    name: "linux",
    label: "No-Code Platforms",
    shortDescription: "Shipping internal tools at no-code speed, hardened with AI automation.",
    color: "#A78BFA",
    icon: lucide("blocks"),
    category: "Technical",
  },
  [SkillNames.API_INTEGRATIONS]: {
    id: 20,
    name: "docker",
    label: "API Integrations",
    shortDescription: "Connecting CRMs, payment rails, and third-party tools into one system.",
    color: "#60A5FA",
    icon: lucide("link"),
    category: "Technical",
  },
  [SkillNames.CRM_INTEGRATIONS]: {
    id: 21,
    name: "nginx",
    label: "CRM Integrations",
    shortDescription: "Two-way sync between products and the CRM the business already runs on.",
    color: "#818CF8",
    icon: lucide("messages-square"),
    category: "Technical",
  },
  [SkillNames.FOUNDER_MINDSET]: {
    id: 22,
    name: "aws",
    label: "Founder Mindset",
    shortDescription: "Owning outcomes end-to-end — strategy, shipping, and everything between.",
    color: "#F59E0B",
    icon: lucide("crown"),
    category: "Business",
  },
  [SkillNames.OPERATIONS]: {
    id: 23,
    name: "gcp",
    label: "Operations",
    shortDescription: "Turning spreadsheets and chaos into systems the whole team can run.",
    color: "#94A3B8",
    icon: lucide("settings"),
    category: "Business",
  },
  [SkillNames.MULTITENANT_ARCHITECTURE]: {
    id: 24,
    name: "vim",
    label: "Multi-tenant Architecture",
    shortDescription: "One platform, many companies — isolated data with role-based access.",
    color: "#3B82F6",
    icon: lucide("building-2"),
    category: "Business",
  },
  [SkillNames.SUBSCRIPTION_SYSTEMS]: {
    id: 25,
    name: "vercel",
    label: "Subscription Systems",
    shortDescription: "Plans, billing, and access control that grow with the customer base.",
    color: "#10B981",
    icon: lucide("credit-card"),
    category: "Business",
  },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Product",
  "AI",
  "Technical",
  "Business",
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
