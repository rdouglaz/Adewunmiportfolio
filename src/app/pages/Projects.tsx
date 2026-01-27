import { ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { RequestAccessModal } from '@/app/components/RequestAccessModal';
import { motion } from 'motion/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel"
import { 
  BeamButton, 
  ScrollFadeIn, 
  StaggerContainer, 
  StaggerItem,
  DecorativeCircle 
} from '@/app/components/animations';

// POD System Screenshots
import podOverview from 'figma:asset/53116b53e241783a05034f48bb8a7135caea9c81.png';
import podPortfolio from 'figma:asset/512d107fefb7536d15a12389ca5753bfb8b592fe.png';
import podTenants from 'figma:asset/c776012da308ccdaaf238c8206e5bfab54b74653.png';
import podReports from 'figma:asset/e250188935cf573c85d10c76c68dd9ce30e7becb.png';
import podExpenses from 'figma:asset/11b1ad1eb91ba65540710f729236d29be60bca19.png';

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
      images: [
        { src: podOverview, alt: "Dashboard Overview" },
        { src: podPortfolio, alt: "Properties Portfolio" },
        { src: podTenants, alt: "Tenant Registry" },
        { src: podReports, alt: "Reports & Analytics" },
        { src: podExpenses, alt: "Expense Analytics" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 relative">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-20">
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
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold tracking-wide">
                        {project.status}
                      </span>
                      <span className="text-sm text-neutral-500">{project.tag}</span>
                    </div>
                    <h2 className="text-3xl font-semibold tracking-tight">{project.title}</h2>
                  </div>
                </div>

                {/* Demo Video */}
                <ScrollFadeIn delay={0.1}>
                  <div className="mb-10">
                    <div className="bg-neutral-900 border border-neutral-200 shadow-sm overflow-hidden aspect-video relative">
                      <iframe
                        src="https://www.youtube.com/embed/kE6DWpnOkUE"
                        title="POD System Demo Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <p className="text-sm text-neutral-600 mt-3 text-center">Watch the full system walkthrough</p>
                  </div>
                </ScrollFadeIn>

                <ScrollFadeIn delay={0.2}>
                  <div className="mb-10">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {project.images.map((img, idx) => (
                          <CarouselItem key={idx}>
                            <div className="border border-neutral-200 shadow-sm overflow-hidden aspect-[16/9] bg-neutral-100 relative group">
                                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                                 <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    {img.alt}
                                 </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  </div>
                </ScrollFadeIn>

                <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
                  {project.description}
                </p>

                <div className="grid lg:grid-cols-2 gap-10 mb-10">
                  <ScrollFadeIn direction="left" delay={0.3}>
                    <div className="bg-neutral-50 border border-neutral-200 p-8">
                      <h3 className="text-xl font-semibold mb-6">Key Features</h3>
                      <StaggerContainer className="space-y-3">
                        {project.features.map((feature, fIndex) => (
                          <StaggerItem key={fIndex}>
                            <div className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                              <span className="text-base text-neutral-700 leading-relaxed">{feature}</span>
                            </div>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </ScrollFadeIn>

                  <ScrollFadeIn direction="right" delay={0.3}>
                    <div>
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Tech Approach</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, tIndex) => (
                            <span 
                              key={tIndex} 
                              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-100 p-6">
                        <p className="text-sm text-blue-900 mb-4 font-medium">
                          Built for real property management workflows with role-based access and multi-tenant architecture.
                        </p>
                        <button
                          onClick={() => setShowAccessModal(true)}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-base group"
                        >
                          Explore the live system
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </ScrollFadeIn>
                </div>

                <div className="flex gap-4 pt-6 border-t border-neutral-200">
                  <BeamButton
                    onClick={() => setShowAccessModal(true)}
                    variant="primary"
                  >
                    View Live Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </BeamButton>
                  <BeamButton
                    href="mailto:Adewunmi@podsystem.ng?subject=POD System Inquiry"
                    variant="outline"
                    className="border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50"
                  >
                    Inquire About POD
                  </BeamButton>
                </div>
              </div>
            </article>
          </ScrollFadeIn>
        ))}
      </div>

      {/* More Projects Coming */}
      <ScrollFadeIn delay={0.4}>
        <div className="mt-20 bg-neutral-50 border border-neutral-200 p-12 text-center">
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