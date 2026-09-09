export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  status: "Live" | "In progress";
  problem: string;
  approach: string;
  features: string[];
  tech: string[];
  links: ProjectLink[];
};

const projects: Project[] = [
  {
    id: "the-scribe",
    title: "The Scribe",
    category: "AI Writing Platform",
    status: "Live",
    problem:
      "Christian authors, pastors, and ministry leaders spend enormous time turning theological knowledge into written content that sounds authentically like them.",
    approach:
      "An AI writing platform grounded in Scripture and theological resources that captures an author's unique voice through a guided interview process, then produces manuscripts, devotionals, and books in their style.",
    features: [
      "Voice DNA",
      "Scripture-grounded research",
      "Sermon manuscripts",
      "Devotionals",
      "Bible studies",
    ],
    tech: ["LLMs", "RAG", "React", "Vercel"],
    links: [
      { label: "Open App", href: "https://thescribeai.vercel.app" },
      { label: "Marketing Site", href: "https://thescribe-ai.vercel.app" },
    ],
  },
  {
    id: "pod-system",
    title: "POD System",
    category: "Operations Platform",
    status: "Live",
    problem:
      "Property managers handling multiple companies, properties, and tenants rely on spreadsheets and disconnected tools, creating operational blindness.",
    approach:
      "A multi-tenant platform that unifies property management, tenant workflows, rent tracking, maintenance, and financial reporting under role-based access control.",
    features: [
      "Multi-company architecture",
      "Role-based access",
      "Subscription billing",
      "Maintenance workflows",
      "Real-time dashboard",
    ],
    tech: [
      "No-code platforms",
      "AI automation",
      "API integrations",
      "Database design",
    ],
    links: [
      { label: "Management App", href: "https://app.podsystem.ng" },
      { label: "Tenant App", href: "https://tenant.podsystem.ng" },
      { label: "Marketplace", href: "https://marketplace.podsystem.ng" },
      { label: "Website", href: "https://podsystem.ng" },
    ],
  },
  {
    id: "meetsummary-ai",
    title: "MeetSummary AI",
    category: "Meeting Intelligence",
    status: "Live",
    problem:
      "Virtual Assistants spend hours per week manually transcribing meetings, writing summaries, extracting action items, and drafting follow-up emails.",
    approach:
      "Upload any meeting recording and get a speaker-labelled transcript, AI-generated summary, extracted action items with owners, a ready-to-send follow-up email, and automatic CRM sync.",
    features: [
      "Speaker-labelled transcript",
      "Action items with owners",
      "One-click follow-up email",
      "CRM sync (HubSpot / Salesforce)",
    ],
    tech: ["AI / LLM Integration", "React", "TypeScript", "Vercel"],
    links: [{ label: "Open App", href: "https://meetsummary-one.vercel.app/" }],
  },
  {
    id: "nonfiction-ai",
    title: "Nonfiction AI",
    category: "Long-form Writing",
    status: "Live",
    problem:
      "Writing long-form nonfiction is slow, non-linear, and difficult to structure — most AI writing tools are optimised for short content, not books.",
    approach:
      "An AI-assisted platform designed specifically for the long-form nonfiction writing process — research, outlining, drafting, and editing in one coherent workflow.",
    features: [
      "Long-form structure",
      "Chapter management",
      "AI-assisted drafting",
      "AI-assisted research",
    ],
    tech: ["AI writing systems", "LLMs", "React", "Vercel"],
    links: [{ label: "Open App", href: "https://nonfictionai.vercel.app/" }],
  },
];

export default projects;
