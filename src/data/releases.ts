export type Release = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  license: "Open source" | "Commercial" | "Upcoming";
  version: string;
  tech: string[];
  // TODO: paste the GitHub release/tag URL when you cut a release,
  // e.g. "https://github.com/rdouglaz/Nonfictionai/releases/latest".
  // Leave "" and the card shows "Release coming soon" instead of a button.
  releaseUrl: string;
  // TODO: paste the source repo URL, or leave "" to hide the button.
  repoUrl: string;
  // Live product links (shown when present).
  links: { label: string; href: string }[];
};

const releases: Release[] = [
  {
    id: "the-scribe",
    name: "The Scribe",
    tagline: "AI Writing Platform",
    description:
      "AI writing platform for Christian authors and ministry leaders — Voice DNA, Scripture-grounded research, sermon manuscripts, devotionals, and books in the author's own voice.",
    license: "Commercial",
    version: "v1.0",
    tech: ["LLMs", "RAG", "React", "Vercel"],
    releaseUrl: "",
    repoUrl: "",
    links: [
      { label: "Open App", href: "https://thescribeai.vercel.app" },
      { label: "Marketing Site", href: "https://thescribe-ai.vercel.app" },
    ],
  },
  {
    id: "pod-system",
    name: "POD System",
    tagline: "Operations Platform",
    description:
      "Multi-tenant property operations platform — companies, tenants, rent tracking, maintenance workflows, and financial reporting under role-based access control.",
    license: "Commercial",
    version: "v1.0",
    tech: ["No-code platforms", "AI automation", "API integrations"],
    releaseUrl: "",
    repoUrl: "",
    links: [
      { label: "Management App", href: "https://app.podsystem.ng" },
      { label: "Tenant App", href: "https://tenant.podsystem.ng" },
      { label: "Marketplace", href: "https://marketplace.podsystem.ng" },
      { label: "Website", href: "https://podsystem.ng" },
    ],
  },
  {
    id: "meetsummary-ai",
    name: "MeetSummary AI",
    tagline: "Meeting Intelligence",
    description:
      "Upload any meeting recording and get a speaker-labelled transcript, AI summary, action items with owners, a ready-to-send follow-up email, and CRM sync.",
    license: "Open source",
    version: "v1.0",
    tech: ["AI / LLM Integration", "React", "TypeScript", "Vercel"],
    releaseUrl: "",
    repoUrl: "https://github.com/rdouglaz/Meetsummary",
    links: [{ label: "Open App", href: "https://meetsummary-one.vercel.app/" }],
  },
  {
    id: "nonfiction-ai",
    name: "Nonfiction AI",
    tagline: "Long-form Writing",
    description:
      "AI-assisted platform for the long-form nonfiction process — research, outlining, chapter drafting, and editing in one coherent workflow. Built for books, not blog posts.",
    license: "Open source",
    version: "v1.0",
    tech: ["AI writing systems", "LLMs", "React", "Vercel"],
    releaseUrl: "",
    repoUrl: "https://github.com/rdouglaz/Nonfictionai",
    links: [{ label: "Open App", href: "https://nonfictionai.vercel.app/" }],
  },
  {
    id: "clipforge-ai",
    name: "ClipForge AI",
    tagline: "Local Video Clipping",
    description:
      "Local AI clipping app for Windows. Download the v1.0.0 installer below to get started.",
    license: "Open source",
    version: "v1.0.0",
    tech: ["TypeScript", "Windows"],
    releaseUrl:
      "https://github.com/rdouglaz/ClipForge-AI/releases/download/v1.0.0/ClippingAI-Setup-1.0.0.exe",
    repoUrl: "https://github.com/rdouglaz/ClipForge-AI",
    links: [],
  },
  {
    id: "ai-book-formatter-studio",
    name: "AI Book Formatter Studio",
    tagline: "Book Formatting",
    description:
      "Upcoming studio for AI-assisted book formatting — release details coming soon.",
    license: "Upcoming",
    version: "TBA",
    tech: [],
    releaseUrl: "",
    repoUrl: "",
    links: [],
  },
  {
    id: "local-ai-voice-studio",
    name: "Local AI Voice Studio",
    tagline: "Voice Studio",
    description:
      "Upcoming studio for local AI voice work — release details coming soon.",
    license: "Upcoming",
    version: "TBA",
    tech: [],
    releaseUrl: "",
    repoUrl: "",
    links: [],
  },
  {
    id: "ai-video-editing-studio",
    name: "AI Video Editing Studio",
    tagline: "Video Editing",
    description:
      "Upcoming studio for AI video editing — release details coming soon.",
    license: "Upcoming",
    version: "TBA",
    tech: [],
    releaseUrl: "",
    repoUrl: "",
    links: [],
  },
];

export default releases;
