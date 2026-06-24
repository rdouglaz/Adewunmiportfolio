import { ArrowRight, ExternalLink, ShoppingBag, Mail, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { RequestAccessModal } from '@/app/components/RequestAccessModal';
import { DashboardMockup } from '@/app/components/DashboardMockup';
import {
  BeamButton, 
  ScrollFadeIn, 
  StaggerContainer, 
  StaggerItem,
  DecorativeCircle 
} from '@/app/components/animations';

export function Projects() {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const projects = [
    {
      title: 'POD (Property Operations Dashboard)',
      description: 'A comprehensive multi-tenant internal system for property managers and real estate teams. Handles properties, tenants, rent collection, maintenance workflows, and operational reporting in one unified platform.',
      features: [
        'Multi-company & multi-user system with role-based access control',
        'Property and tenant management with detailed records',
        'Rent tracking, payment reminders, and financial reporting',
        'Maintenance request workflows and assignment system',
        'Subscription billing logic for SaaS delivery',
        'Real-time dashboard with operational insights',
        'Automated notifications and alerts',
        'Document management and storage'
      ],
      techStack: ['No-code platforms', 'AI automation', 'API integrations', 'Database design'],
      demo: 'https://demo.podsystem.ng',
      status: 'Live',
      tag: 'Property Management SaaS',
      requiresAccess: true
    },
    {
      title: 'POD Website',
      description: 'A professional marketing website for the POD system, designed to communicate value propositions, showcase features, and convert prospects into qualified leads. Built from scratch to establish market presence and drive demo requests.',
      features: [
        'Clean, conversion-focused design with clear CTAs',
        'Responsive layout optimized for all devices',
        'Feature sections highlighting key system capabilities',
        'Trust signals and social proof elements',
        'Lead capture forms integrated with CRM',
        'Fast loading performance and SEO optimization',
        'Professional copywriting aligned with target audience',
        'Consistent branding and visual identity'
      ],
      techStack: ['React', 'Tailwind CSS', 'Modern web standards', 'Performance optimization'],
      demo: 'https://podsystem.ng',
      status: 'Live',
      tag: 'Marketing Website',
      requiresAccess: false,
      ctaText: 'A publicly accessible website showcasing the POD system to potential customers and driving conversions.'
    },
    {
      title: "Oyken's Global Stores",
      description: 'A modern e-commerce platform built for a global retail brand. Features a clean, conversion-optimized storefront with product browsing, category filtering, cart management, and a seamless checkout experience — designed to drive sales and deliver a premium shopping experience.',
      features: [
        'Clean, modern storefront with intuitive navigation',
        'Product catalog with category filtering and search',
        'Shopping cart with real-time updates',
        'Responsive design optimized for mobile and desktop',
        'Fast page loads and smooth user experience',
        'Product detail pages with image galleries',
        'Secure checkout flow',
        'Brand-consistent design and visual identity'
      ],
      techStack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'E-commerce Integration'],
      demo: 'https://oykensglobalstores.vercel.app/',
      status: 'Live',
      tag: 'E-commerce Platform',
      requiresAccess: false,
      icon: 'shopping',
      ctaText: 'A fully functional e-commerce storefront built for a global retail brand, delivering a seamless shopping experience across all devices.',
      previewVideo: 'https://chwjguxldansjzauqqwz.supabase.co/storage/v1/object/public/videos/oyenkan.webm'
    },
    {
      title: 'MailOps',
      description: 'A streamlined email automation and campaign management tool built for teams that want to send smarter. MailOps lets you design, schedule, and track email campaigns with ease — from one-off broadcasts to multi-step automated sequences — without the bloat of enterprise platforms.',
      features: [
        'Drag-and-drop email campaign builder',
        'Multi-step automated drip sequences',
        'Audience segmentation and list management',
        'Scheduled and triggered email delivery',
        'Email template library with dynamic variables',
        'Real-time delivery, open rate, and click tracking',
        'A/B testing for subject lines and content',
        'Simple, clean dashboard for campaign performance'
      ],
      techStack: ['Node.js', 'Email API Integration', 'React', 'Tailwind CSS', 'Vercel', 'Automation Workflows'],
      demo: 'https://mailops.podsystem.ng/',
      status: 'Live',
      tag: 'Email Automation Tool',
      requiresAccess: false,
      icon: 'mail',
      ctaText: 'A no-fuss email automation tool for teams that need reliable campaign delivery, audience segmentation, and performance tracking — all in one clean interface.'
    },
    {
      title: 'MeetSummary',
      description: 'A meeting intelligence platform built for Virtual Assistants who manage client relationships at scale. Upload or record any meeting — from Zoom, Google Meet, WhatsApp, phone, or any audio source — and within minutes get a full transcript, AI-generated summary, extracted action items, and a ready-to-send follow-up email.',
      features: [
        'Full, speaker-labelled transcript — searchable word by word',
        'AI-generated executive summary with key points, decisions, and risks',
        'Action items automatically extracted with owners and due dates',
        'Ready-to-send follow-up email drafted by AI, edited by you',
        'CRM sync — pushed straight to HubSpot or Salesforce, no copy-paste',
        'Slack or Teams notification to keep client teams informed instantly',
        'Supports Zoom, Google Meet, WhatsApp, phone, and any audio source',
        'Structured, searchable records for every client meeting'
      ],
      techStack: ['React', 'TypeScript', 'AI / LLM Integration', 'CRM APIs', 'Vercel', 'Audio Processing'],
      demo: 'https://meetsummary-one.vercel.app/',
      status: 'Live',
      tag: 'Meeting Intelligence Platform',
      requiresAccess: false,
      icon: 'message',
      ctaText: 'MeetSummary turns every client meeting into a structured, searchable, action-ready record — automatically. Built for VAs who need to stay on top of every detail without losing hours to manual transcription.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 relative">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-20 pointer-events-none">
        <DecorativeCircle size={80} withPulse />
      </div>
      
      <ScrollFadeIn blur>
        <div className="mb-16">
          <h1 className="text-5xl font-semibold mb-6 tracking-tight">Projects</h1>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
            Real internal systems built to solve operational challenges
          </p>
        </div>
      </ScrollFadeIn>

      <div className="space-y-16">
        {projects.map((project, index) => (
          <ScrollFadeIn key={index} delay={0.2}>
            <article className="bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold tracking-wide rounded-full">
                        {project.status}
                      </span>
                      <span className="text-sm text-neutral-500 font-medium">{project.tag}</span>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">{project.title}</h2>
                  </div>
                  {project.requiresAccess ? (
                    <BeamButton
                      onClick={() => setShowAccessModal(true)}
                      variant="primary"
                      className="shrink-0"
                    >
                      View Live Demo
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </BeamButton>
                  ) : (
                    <BeamButton
                      href={project.demo}
                      variant="primary"
                      className="shrink-0"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </BeamButton>
                  )}
                </div>

                <div className="grid lg:grid-cols-12 gap-10 mb-10">
                   {/* Main Content Column */}
                   <div className="lg:col-span-7 space-y-8">
                      {/* Description */}
                      <p className="text-lg text-neutral-600 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Demo Screenshot or Website Preview */}
                      {project.requiresAccess ? (
                        <>
                          {/* Dashboard Mockup */}
                          <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
                            <DashboardMockup />
                          </div>
                          <p className="text-sm text-neutral-500 italic text-center -mt-4">Live dashboard interface</p>
                          
                          {/* Demo Video */}
                          <div className="bg-neutral-900 border border-neutral-200 shadow-sm overflow-hidden aspect-video relative rounded-lg mt-8">
                            <video
                              controls
                              preload="metadata"
                              className="absolute inset-0 w-full h-full"
                              poster="https://chwjguxldansjzauqqwz.supabase.co/storage/v1/object/public/videos/Screenshot%202026-01-21%20140504.png"
                            >
                              <source src="https://chwjguxldansjzauqqwz.supabase.co/storage/v1/object/public/videos/202601270841(1).mp4" type="video/mp4" />
                              <p className="text-neutral-500 p-8 text-center">
                                Your browser doesn't support video playback. Please contact us for a demo.
                              </p>
                            </video>
                          </div>
                          <p className="text-sm text-neutral-500 italic text-center">Watch the full system walkthrough</p>
                        </>
                      ) : project.previewVideo ? (
                        <>
                          <div className="border border-neutral-200 shadow-sm overflow-hidden rounded-lg bg-neutral-900 relative group">
                            <div className="aspect-video relative overflow-hidden">
                              <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="absolute inset-0 w-full h-full object-cover"
                              >
                                <source src={project.previewVideo} type="video/webm" />
                              </video>
                              {/* Overlay with visit button on hover */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 font-medium text-sm shadow-lg"
                                >
                                  Visit Website
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-neutral-500 italic text-center">Live preview — hover to visit</p>
                        </>
                      ) : (
                        <>
                          <div className="border border-neutral-200 shadow-sm overflow-hidden rounded-lg bg-neutral-50 p-8">
                            <div className="bg-white border border-neutral-200 rounded shadow-lg overflow-hidden">
                              <div className="aspect-video bg-gradient-to-br from-blue-50 to-neutral-100 flex items-center justify-center">
                                <div className="text-center space-y-4 p-8">
                                  <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                                    <ExternalLink className="w-8 h-8 text-white" />
                                  </div>
                                  <p className="text-lg font-semibold text-neutral-900">Live Website Preview</p>
                                  <a 
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors text-sm"
                                  >
                                    Visit Website
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-neutral-500 italic text-center">Visit the live website to explore</p>
                        </>
                      )}
                   </div>

                   {/* Sidebar Column */}
                   <div className="lg:col-span-5 space-y-8">
                      {/* Tech Stack */}
                      <div className="bg-neutral-50 border border-neutral-100 p-6 rounded-lg">
                        <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, tIndex) => (
                            <span 
                              key={tIndex} 
                              className="px-3 py-1.5 bg-white border border-neutral-200 text-neutral-700 text-sm font-medium rounded shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                        <StaggerContainer className="space-y-3">
                          {project.features.map((feature, fIndex) => (
                            <StaggerItem key={fIndex}>
                              <div className="flex items-start gap-3 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                <span className="text-base text-neutral-700 leading-relaxed">{feature}</span>
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>

                      {/* CTA Box */}
                      {project.requiresAccess ? (
                        <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
                          <p className="text-sm text-blue-900 mb-4 font-medium leading-relaxed">
                            Built for real property management workflows with role-based access and multi-tenant architecture.
                          </p>
                          <button
                            onClick={() => setShowAccessModal(true)}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group"
                          >
                            Explore the live system
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>
                      ) : (
                        <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
                          <p className="text-sm text-blue-900 mb-4 font-medium leading-relaxed">
                            {project.ctaText}
                          </p>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group"
                          >
                            Visit the live website
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      )}
                   </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-neutral-100">
                  {project.requiresAccess ? (
                    <BeamButton
                      href="mailto:Adewunmi@podsystem.ng?subject=POD System Inquiry"
                      variant="outline"
                      className="border-neutral-200 text-neutral-600 hover:text-neutral-900"
                    >
                      Inquire About POD
                    </BeamButton>
                  ) : (
                    <BeamButton
                      href={project.demo}
                      variant="outline"
                      className="border-neutral-200 text-neutral-600 hover:text-neutral-900"
                    >
                      View Live Site
                      <ExternalLink className="w-4 h-4" />
                    </BeamButton>
                  )}
                </div>
              </div>
            </article>
          </ScrollFadeIn>
        ))}
      </div>

      {/* More Projects Coming */}
      <ScrollFadeIn delay={0.4}>
        <div className="mt-20 bg-neutral-50 border border-neutral-200 p-12 text-center rounded-xl">
          <h3 className="text-2xl font-semibold mb-4 tracking-tight">More Projects Coming Soon</h3>
          <p className="text-base text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            I'm continuously building and refining internal systems. Check back for updates or reach out to discuss your project.
          </p>
          <BeamButton
            href="mailto:Adewunmi@podsystem.ng"
            variant="outline"
            className="border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-white"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </BeamButton>
        </div>
      </ScrollFadeIn>

      {/* Request Access Modal */}
      <RequestAccessModal
        open={showAccessModal}
        onOpenChange={setShowAccessModal}
      />
    </div>
  );
}