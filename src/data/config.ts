const config = {
  title: "Adewunmi Saliu | AI Product Builder",
  description: {
    long: "I'm Adewunmi Saliu, an AI Product Builder and founder designing AI-native products — from LLM-powered knowledge systems to internal business platforms. I turn ideas into products through product thinking, AI workflows, rapid prototyping, and execution.",
    short:
      "Adewunmi Saliu — AI Product Builder. Building AI products people actually use.",
  },
  keywords: [
    "Adewunmi Saliu",
    "AI Product Builder",
    "AI products",
    "product strategy",
    "LLM integration",
    "prompt engineering",
    "RAG systems",
    "AI workflow design",
    "rapid prototyping",
    "founder",
    "React",
    "Next.js",
    "AI-native products",
    "knowledge systems",
  ],
  author: "Adewunmi Saliu",
  tagline: "Build AI products people actually use.",
  location: "Lagos, Nigeria",
  // TODO: replace with your real email address — the contact form sends to this.
  email: "your-email@example.com",
  // TODO: replace with your real site URL once you have a domain.
  site: "https://adewunmisaliu.dev",

  // for github stars button — left empty until you add your repo.
  githubUsername: "",
  githubRepo: "",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    // TODO: replace these placeholders with your real profile URLs.
    twitter: "https://x.com/your-handle",
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-username",
  },
};
export { config };
