import { Link } from 'react-router-dom';
import { ExpandableSection } from '@/app/components/ExpandableSection';
import { RequestAccessModal } from '@/app/components/RequestAccessModal';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

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
      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-8 py-32">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Business Systems Builder
            </motion.div>
            <motion.h1 
              className="text-6xl font-semibold mb-8 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I build internal systems that help businesses run better
            </motion.h1>
            <motion.p 
              className="text-xl text-neutral-600 mb-12 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Property operations, reporting, workflows & automation — built with AI, no-code, and real operational thinking.
            </motion.p>
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                onClick={() => setShowAccessModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-base font-medium hover:bg-blue-700 transition-all hover:shadow-lg group"
              >
                View Live Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-neutral-300 text-base font-medium hover:border-neutral-400 hover:bg-neutral-50 transition-all"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What I Build - Expandable */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <ExpandableSection {...whatIBuild} />
      </section>

      {/* Featured Project */}
      <section className="bg-neutral-50 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Featured Project
            </span>
            <h2 className="text-4xl font-semibold mt-3 tracking-tight">
              POD (Property Operations Dashboard)
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                POD is a multi-tenant internal system for property managers and real estate teams to manage properties, tenants, rent, maintenance, and reporting — all in one place.
              </p>
              
              <div className="bg-white border border-neutral-200 p-8 mb-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-6">System Highlights</h3>
                <div className="space-y-4">
                  {[
                    'Multi-company system with isolated data',
                    'Role-based access control',
                    'Subscription billing logic',
                    'Tenant & maintenance workflows',
                    'Financial reporting dashboard',
                    'Live demo available'
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span className="text-base text-neutral-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.button
                onClick={() => setShowAccessModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-base font-medium hover:bg-blue-700 transition-all hover:shadow-lg group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Live Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
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
            </motion.div>
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

      {/* CTA Section */}
      <section className="bg-neutral-900 text-white py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl font-semibold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Want to see what I'm building?
            </motion.h2>
            <motion.p 
              className="text-lg text-neutral-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I'm actively building and improving real operational systems. If you want feedback, collaboration, or a custom internal tool — let's talk.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button
                onClick={() => setShowAccessModal(true)}
                className="px-8 py-4 bg-white text-neutral-900 text-base font-medium hover:bg-neutral-100 transition-all inline-flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Request Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <a
                href="mailto:Adewunmi@podsystem.ng"
                className="px-8 py-4 border-2 border-white text-base font-medium hover:bg-white hover:text-neutral-900 transition-all inline-flex items-center justify-center"
              >
                Send Email
              </a>
              <a
                href="https://wa.me/2349067626445"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-white text-base font-medium hover:bg-white hover:text-neutral-900 transition-all inline-flex items-center justify-center"
              >
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
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