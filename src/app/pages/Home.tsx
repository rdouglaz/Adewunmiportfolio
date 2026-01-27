import { Link } from 'react-router';
import { ExpandableSection } from '@/app/components/ExpandableSection';
import { RequestAccessModal } from '@/app/components/RequestAccessModal';
import { TechMarquee } from '@/app/components/TechMarquee';
import { ArrowRight } from 'lucide-react';
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
    subtitle: "Internal systems that help businesses operate more efficiently",
    items: [
      {
        title: "Internal Dashboards & Admin Systems",
        description: "Custom admin panels and operational dashboards that give teams real-time visibility into their business data and workflows."
      },
      {
        title: "Property & Operations Management",
        description: "End-to-end systems for managing properties, tenants, leases, maintenance requests, and operational workflows."
      },
      {
        title: "Reporting & Analytics Tools",
        description: "Clear, actionable reporting systems that transform raw data into insights teams can actually use to make decisions."
      },
      {
        title: "Subscription-Based SaaS Systems",
        description: "Multi-tenant platforms with role-based access, subscription billing logic, and scalable architecture."
      },
      {
        title: "AI-Powered Internal Tools",
        description: "Intelligent automation and AI integrations that reduce repetitive tasks and improve operational efficiency."
      },
      {
        title: "Workflow Automation",
        description: "Automated processes that handle routine operations, notifications, and data synchronization across systems."
      }
    ]
  };

  const howIWork = {
    title: "How I work",
    subtitle: "A practical approach focused on real business outcomes",
    items: [
      {
        title: "Understand the Workflow",
        description: "I start by mapping your actual business operations, not assumptions. Understanding how work really flows is essential before building anything."
      },
      {
        title: "Design System Logic",
        description: "Clear data structure, role definitions, and workflow logic. The architecture needs to make sense before implementation begins."
      },
      {
        title: "Build with No-Code + AI",
        description: "Using modern no-code platforms and AI tools to build faster without sacrificing quality or functionality."
      },
      {
        title: "Test with Real Scenarios",
        description: "Testing with actual use cases and edge cases from your business. Systems need to work in practice, not just theory."
      },
      {
        title: "Iterate Based on Feedback",
        description: "Continuous improvement based on user feedback and changing business needs. Systems evolve as your business evolves."
      }
    ]
  };

  const whoIWorkWith = {
    title: "Who I work with",
    subtitle: "Businesses that need practical internal systems, not complexity",
    items: [
      {
        title: "Property Managers",
        description: "Real estate professionals managing multiple properties, tenants, and maintenance workflows who need centralized operations."
      },
      {
        title: "Real Estate Firms",
        description: "Companies handling property portfolios, lease management, and client operations that require structured systems."
      },
      {
        title: "Operations Teams",
        description: "Internal operations teams looking to streamline workflows, improve visibility, and reduce manual processes."
      },
      {
        title: "Small to Mid-Sized Businesses",
        description: "Growing companies that need custom internal tools but don't have dedicated development teams."
      },
      {
        title: "Founders & Entrepreneurs",
        description: "Business owners who understand their operations need better systems but don't want generic off-the-shelf solutions."
      }
    ]
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 opacity-30">
          <DecorativeCircle size={100} withPulse />
        </div>
        <div className="absolute bottom-32 left-10 opacity-20">
          <DecorativeCircle size={60} color="bg-blue-400" />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 py-32 relative z-10">
          <ScrollFadeIn blur>
            <div className="max-w-4xl">
              <ScrollFadeIn direction="down" delay={0.2}>
                <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
                  Business Systems Builder
                </div>
              </ScrollFadeIn>
              
              <ScrollFadeIn blur delay={0.3}>
                <h1 className="text-6xl font-semibold mb-8 tracking-tight leading-tight">
                  I build internal systems that help businesses run better
                </h1>
              </ScrollFadeIn>
              
              <ScrollFadeIn direction="up" delay={0.4}>
                <p className="text-xl text-neutral-600 mb-12 leading-relaxed max-w-2xl">
                  Property operations, reporting, workflows & automation — built with AI, no-code, and real operational thinking.
                </p>
              </ScrollFadeIn>
              
              <ScrollFadeIn direction="up" delay={0.5}>
                <div className="flex gap-4">
                  <BeamButton onClick={() => setShowAccessModal(true)} variant="primary">
                    View Live Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BeamButton>
                  <Link to="/contact">
                    <BeamButton variant="outline" className="border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50">
                      Contact Me
                    </BeamButton>
                  </Link>
                </div>
              </ScrollFadeIn>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* What I Build - Expandable */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <ExpandableSection {...whatIBuild} />
      </section>

      {/* Featured Project */}
      <section className="bg-neutral-50 py-32 relative">
        {/* Decorative sonar pulse */}
        <div className="absolute top-10 left-10 opacity-20">
          <SonarPulse size={150} />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <ScrollFadeIn>
            <div className="mb-8">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Featured Project
              </span>
              <h2 className="text-4xl font-semibold mt-3 tracking-tight">
                POD (Property Operations Dashboard)
              </h2>
            </div>
          </ScrollFadeIn>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollFadeIn direction="left" delay={0.2}>
              <div>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  POD is a multi-tenant internal system for property managers and real estate teams to manage properties, tenants, rent, maintenance, and reporting — all in one place.
                </p>
                
                <div className="bg-white border border-neutral-200 p-8 mb-8 shadow-sm">
                  <h3 className="text-xl font-semibold mb-6">System Highlights</h3>
                  <StaggerContainer className="space-y-4">
                    {[
                      'Multi-company system with isolated data',
                      'Role-based access control',
                      'Subscription billing logic',
                      'Tenant & maintenance workflows',
                      'Financial reporting dashboard',
                      'Live demo available'
                    ].map((item, index) => (
                      <StaggerItem key={index}>
                        <div className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                          <span className="text-base text-neutral-700">{item}</span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
                
                <BeamButton onClick={() => setShowAccessModal(true)} variant="primary">
                  Explore Live Demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </BeamButton>
              </div>
            </ScrollFadeIn>
            
            <ScrollFadeIn direction="right" delay={0.3}>
              <div>
                {/* Demo Video */}
                <div className="bg-neutral-900 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden aspect-video relative">
                  <iframe
                    src="https://www.youtube.com/embed/kE6DWpnOkUE"
                    title="POD System Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* How I Work - Expandable */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <ExpandableSection {...howIWork} />
      </section>

      {/* Who I Work With - Expandable */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <ExpandableSection {...whoIWorkWith} />
      </section>

      {/* Tech Stack Marquee */}
      <section className="-mx-8">
        <TechMarquee />
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-32 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-32 opacity-10">
          <SonarPulse size={200} color="rgb(255, 255, 255)" />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <ScrollFadeIn>
            <div className="max-w-3xl">
              <ScrollFadeIn delay={0.1}>
                <h2 className="text-4xl font-semibold mb-6 tracking-tight">
                  Want to see what I'm building?
                </h2>
              </ScrollFadeIn>
              
              <ScrollFadeIn delay={0.2}>
                <p className="text-lg text-neutral-300 mb-12 leading-relaxed">
                  I'm actively building and improving real operational systems. If you want feedback, collaboration, or a custom internal tool — let's talk.
                </p>
              </ScrollFadeIn>
              
              <ScrollFadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <BeamButton 
                    onClick={() => setShowAccessModal(true)}
                    variant="secondary"
                  >
                    Request Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BeamButton>
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