const config = {
  title: "Adewunmi Editorial Lab | AI Product Builder",
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
    "Supabase",
    "knowledge systems",
  ],
  author: "Adewunmi Saliu",
  tagline: "Build AI products people actually use.",
  location: "Lagos, Nigeria",
  // Contact inbox — the contact form sends to this address via Resend.
  email: "Adewunmi@podsystem.ng",
  // TODO: replace with your real site URL once you have a domain.
  site: "https://adewunmilab.podsystem.ng, https://adewunmilab.podsystem.ng",

  // for github stars button — left empty until you add your repo.
  githubUsername: "",
  githubRepo: "",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/WatchingD_World",
    linkedin: "https://www.linkedin.com/in/adewunmisaliu/",
    // TODO: replace with your real GitHub profile URL.
    github: "https://github.com/rdouglaz/Adewunmi",
  },
};
export { config };
