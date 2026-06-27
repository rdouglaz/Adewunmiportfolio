import { Link } from 'react-router';
import { ExpandableSection } from '@/app/components/ExpandableSection';
import { RequestAccessModal } from '@/app/components/RequestAccessModal';
import { TechMarquee } from '@/app/components/TechMarquee';
import { DashboardMockup } from '@/app/components/DashboardMockup';
import { ArrowRight, ExternalLink, Zap } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BeamButton,
  ScrollFadeIn,
  StaggerContainer,
  StaggerItem,
  SonarPulse,
  DecorativeCircle
} from '@/app/components/animations';

export function Home() {
  const [showAccessModal, setShowAccessModal] = useState(false);

  const whatIBuild = {
    title: "What I build",
    subtitle: "AI-native products and systems people actually use",
    items: [
      {
        title: "LLM Applications",
        description: "Products built on top of large language models — from knowledge retrieval systems to AI writing assistants grounded in specific domains."
      },
      {
        title: "Retrieval-Augmented Generation (RAG)",
        description: "Systems that combine LLMs with structured knowledge bases to produce accurate, context-aware outputs rather than hallucinated ones."
      },
      {
        title: "AI-Assisted Productivity Tools",
        description: "Products that take repetitive, cognitively expensive tasks — transcription, summarisation, drafting — and eliminate them entirely."
      },
      {
        title: "Multi-Tenant SaaS Platforms",
        description: "Internal platforms with role-based access, subscription logic, isolated data, and operational reporting — built to scale from day one."
      },
      {
        title: "AI Agents & Automation Workflows",
        description: "Autonomous systems that monitor, process, and act — replacing manual loops with intelligent pipelines."
      },
      {
        title: "Rapid MVPs",
        description: "Fast, working products validated with real users. Product thinking first, perfect architecture later."
      }
    ]
  };

  const howIThink = {
    title: "How I think",
    subtitle: "Product philosophy over process",
    items: [
      {
        title: "Understand users before technology",
        description: "The problem always comes before the stack. I start with who is experiencing friction and what that friction actually costs them."
      },
      {
        title: "Product thinking over feature building",
        description: "Features are easy. Deciding which features not to build is the hard, important work. Every addition should earn its place."
      },
      {
        title: "AI-first design",
        description: "Not AI as a bolt-on feature — AI as the core mechanic. I design around what the model can do, not what traditional software would do."
      },
      {
        title: "Rapid iteration",
        description: "A working version in users' hands beats a perfect version on a whiteboard. I build, ship, observe, and improve."
      },
      {
        title: "Shipping instead of perfection",
        description: "Done ships. Perfect doesn't. The fastest path to a real product is a real product, not a roadmap."
      },
      {
        title: "Systems that solve operational problems",
        description: "I'm drawn to the messy, high-friction workflows — meeting chaos, knowledge silos, manual operations — where AI can create compound leverage."
      }
    ]
  };

  const products = [
    {
      title: "The Scribe",
      tag: "AI Writing Platform",
      status: "Live",
      problem: "Christian authors, pastors, and ministry leaders spend enormous time turning theological knowledge into written content that sounds authentically like them.",
      approach: "An AI writing platform grounded in Scripture and theological resources that captures an author's unique voice through a guided interview process, then produces manuscripts, devotionals, and books in their style.",
      features: ["Voice DNA — personalized author voice capture", "Scripture-grounded research and theological resources", "Sermon manuscripts, devotionals, Bible studies, and books", "Intelligent writing workflows for ministry leaders"],
      tech: ["LLMs", "RAG", "React", "Vercel"],
      demo: "https://thescribeai.vercel.app",
      requiresAccess: false
    },
    {
      title: "POD System",
      tag: "Operations Platform",
      status: "Live",
      problem: "Property managers handling multiple companies, properties, and tenants rely on spreadsheets and disconnected tools, creating operational blindness.",
      approach: "A multi-tenant platform that unifies property management, tenant workflows, rent tracking, maintenance, and financial reporting under role-based access control.",
      features: ["Multi-company, multi-tenant architecture", "Role-based access and subscription billing", "Maintenance workflows and financial reporting", "Real-time operational dashboard"],
      tech: ["No-code platforms", "AI automation", "API integrations", "Database design"],
      demo: null,
      requiresAccess: true
    },
    {
      title: "MeetSummary AI",
      tag: "Meeting Intelligence",
      status: "Live",
      problem: "Virtual Assistants spend hours per week manually transcribing meetings, writing summaries, extracting action items, and drafting follow-up emails.",
      approach: "Upload any meeting recording and get a speaker-labelled transcript, AI-generated summary, extracted action items with owners, a ready-to-send follow-up email, and automatic CRM sync.",
      features: ["Speaker-labelled transcript, searchable word by word", "Action items extracted with owners and due dates", "One-click follow-up email drafting", "CRM sync to HubSpot or Salesforce"],
      tech: ["AI / LLM Integration", "React", "TypeScript", "Vercel"],
      demo: "https://meetsummary-one.vercel.app/",
      requiresAccess: false
    },
    {
      title: "Nonfiction AI",
      tag: "Long-form Writing",
      status: "Live",
      problem: "Writing long-form nonfiction is slow, non-linear, and difficult to structure — most AI writing tools are optimised for short content, not books.",
      approach: "An AI-assisted platform designed specifically for the long-form nonfiction writing process — research, outlining, drafting, and editing in one coherent workflow.",
      features: ["Long-form structure and chapter management", "AI-assisted drafting and research", "Designed for books, not blog posts", "Iterative writing and revision workflows"],
      tech: ["LLMs", "React", "Vercel"],
      demo: "https://nonfictionai.vercel.app/",
      requiresAccess: false
    }
  ];

  const skillGroups = [
    {
      category: "Product",
      skills: ["Product Strategy", "Product Discovery", "Roadmapping", "User Research"]
    },
    {
      category: "AI",
      skills: ["LLMs", "Prompt Engineering", "RAG", "AI Agents", "AI UX", "Automation"]
    },
    {
      category: "Technical",
      skills: ["React", "API Integration", "Databases", "System Design", "Multi-Tenant SaaS", "No-Code"]
    },
    {
      category: "Business",
      skills: ["Workflow Design", "Operations", "Analytics", "Automation"]
    }
  ];

  const nowItems = [
    "Building The Scribe, an AI-native writing platform for ministry leaders.",
    "Experimenting with local LLMs and AI agents for knowledge retrieval.",
    "Participating in AI hackathons and rapid prototyping experiments.",
    "Exploring AI product workflows — from idea to shipped product in days."
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        <div className="absolute top-20 right-20 opacity-30">
          <DecorativeCircle size={100} withPulse />
        </div>
        <div className="absolute bottom-32 left-10 opacity-20">
          <DecorativeCircle size={60} color="bg-blue-400" />
        </div>

        <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollFadeIn blur>
              <div>
                <ScrollFadeIn direction="down" delay={0.2}>
                  <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
                    AI Product Builder
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn blur delay={0.3}>
                  <h1 className="text-5xl lg:text-6xl font-semibold mb-8 tracking-tight leading-tight">
                    Build AI products people actually use.
                  </h1>
                </ScrollFadeIn>

                <ScrollFadeIn direction="up" delay={0.4}>
                  <p className="text-xl text-neutral-600 mb-12 leading-relaxed">
                    I'm Adewunmi Saliu, an AI Product Builder and founder designing AI-native products — from LLM-powered knowledge systems to internal business platforms. I turn ideas into products through product thinking, AI workflows, rapid prototyping, and execution.
                  </p>
                </ScrollFadeIn>

                <ScrollFadeIn direction="up" delay={0.5}>
                  <div className="flex gap-4 flex-wrap">
                    <Link to="/projects">
                      <BeamButton variant="primary">
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </BeamButton>
                    </Link>
                    <Link to="/contact">
                      <BeamButton variant="outline" className="border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50">
                        Let's Connect
                      </BeamButton>
                    </Link>
                  </div>
                </ScrollFadeIn>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn direction="right" delay={0.6}>
              <div className="relative">
                <DashboardMockup className="w-full" />

                <motion.div
                  className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white border-2 border-neutral-200 rounded-lg shadow-lg p-3 sm:p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs text-neutral-500">AI Products</div>
                      <div className="text-xs sm:text-sm font-semibold">Shipping in Production</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* What I Build */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <ExpandableSection {...whatIBuild} />
      </section>

      {/* Featured Products */}
      <section className="bg-neutral-50 py-32 relative">
        <div className="absolute top-10 left-10 opacity-20">
          <SonarPulse size={150} />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <ScrollFadeIn>
            <div className="mb-12">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Products
              </span>
              <h2 className="text-4xl font-semibold mt-3 tracking-tight">
                Things I've shipped
              </h2>
              <p className="text-lg text-neutral-600 mt-4 max-w-2xl leading-relaxed">
                Each one started as a real problem. Each one is in production.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <ScrollFadeIn key={index} delay={0.1 * index}>
                <div className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold tracking-wide rounded-full">
                        {product.status}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">{product.tag}</span>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight mb-4">{product.title}</h3>

                    <div className="space-y-4 mb-6">
                      <div>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Problem</p>
                        <p className="text-sm text-neutral-600 leading-relaxed">{product.problem}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Approach</p>
                        <p className="text-sm text-neutral-600 leading-relaxed">{product.approach}</p>
                      </div>
                    </div>

                    <StaggerContainer className="space-y-2 mb-6">
                      {product.features.map((f, fi) => (
                        <StaggerItem key={fi}>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                            <span className="text-sm text-neutral-700">{f}</span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>

                    <div className="flex flex-wrap gap-2">
                      {product.tech.map((t, ti) => (
                        <span key={ti} className="px-2.5 py-1 bg-neutral-50 border border-neutral-200 text-neutral-600 text-xs font-medium rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-8 pb-8">
                    {product.requiresAccess ? (
                      <BeamButton onClick={() => setShowAccessModal(true)} variant="primary" className="w-full justify-center">
                        Request Access
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </BeamButton>
                    ) : (
                      <BeamButton href={product.demo!} variant="primary" className="w-full justify-center">
                        Visit Product
                        <ExternalLink className="w-4 h-4" />
                      </BeamButton>
                    )}
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>

          <ScrollFadeIn delay={0.4}>
            <div className="mt-10 text-center">
              <Link to="/projects">
                <BeamButton variant="outline" className="border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-white">
                  See all projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </BeamButton>
              </Link>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* How I Think */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <ExpandableSection {...howIThink} />
      </section>

      {/* Skills */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollFadeIn>
            <div className="mb-12">
              <h2 className="text-3xl font-semibold tracking-tight mb-3">Skills</h2>
              <p className="text-lg text-neutral-600">What I bring to every product.</p>
            </div>
          </ScrollFadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillGroups.map((group, gi) => (
              <ScrollFadeIn key={gi} delay={0.1 * gi}>
                <div className="bg-white border border-neutral-200 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4 pb-3 border-b border-neutral-100">
                    {group.category}
                  </h3>
                  <div className="space-y-2">
                    {group.skills.map((skill, si) => (
                      <div key={si} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Now */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <ScrollFadeIn>
          <div className="bg-white border border-neutral-200 p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <h2 className="text-2xl font-semibold tracking-tight">Now</h2>
            </div>
            <p className="text-sm text-neutral-500 mb-6">What I'm focused on right now.</p>
            <StaggerContainer className="space-y-3">
              {nowItems.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-base text-neutral-700 leading-relaxed">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </ScrollFadeIn>
      </section>

      {/* Tech Stack Marquee */}
      <section className="-mx-8">
        <TechMarquee />
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-32 relative overflow-hidden">
        <div className="absolute top-20 right-32 opacity-10">
          <SonarPulse size={200} color="rgb(255, 255, 255)" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <ScrollFadeIn>
            <div className="max-w-3xl">
              <ScrollFadeIn delay={0.1}>
                <h2 className="text-4xl font-semibold mb-6 tracking-tight">
                  Have an idea worth building?
                </h2>
              </ScrollFadeIn>

              <ScrollFadeIn delay={0.2}>
                <p className="text-lg text-neutral-300 mb-12 leading-relaxed">
                  I work with founders and teams who want to ship AI products — not PowerPoints about AI products. If you have a real problem that AI can solve, let's talk.
                </p>
              </ScrollFadeIn>

              <ScrollFadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <BeamButton variant="secondary">
                      Let's Connect
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </BeamButton>
                  </Link>
                  <BeamButton
                    href="mailto:Adewunmi@podsystem.ng"
                    variant="outline"
                  >
                    Send Email
                  </BeamButton>
                  <BeamButton
                    href="https://wa.me/2349067626445"
                    variant="outline"
                  >
                    WhatsApp
                  </BeamButton>
                </div>
              </ScrollFadeIn>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Request Access Modal */}
      <RequestAccessModal
        open={showAccessModal}
        onOpenChange={setShowAccessModal}
      />
    </div>
  );
}
