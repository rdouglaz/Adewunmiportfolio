import { ArrowRight, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { 
  BeamButton, 
  ScrollFadeIn, 
  StaggerContainer, 
  StaggerItem,
  SonarPulse 
} from '@/app/components/animations';

export function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-20 relative">
      {/* Decorative sonar pulse */}
      <div className="absolute top-20 right-20 opacity-20">
        <SonarPulse size={120} />
      </div>
      
      <ScrollFadeIn blur>
        <h1 className="text-5xl font-semibold mb-6 tracking-tight">Contact</h1>
        <p className="text-xl text-neutral-600 mb-16 leading-relaxed max-w-2xl">
          Have a project in mind? Need feedback on your internal systems? Let's talk.
        </p>
      </ScrollFadeIn>
      
      <StaggerContainer className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Email */}
        <StaggerItem>
          <a
            href="mailto:Adewunmi@podsystem.ng"
            className="bg-white border border-neutral-200 p-8 hover:shadow-md transition-all group block h-full"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-base text-neutral-600 mb-3">
              Adewunmi@podsystem.ng
            </p>
            <span className="text-blue-600 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Send email
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </StaggerItem>

        {/* WhatsApp */}
        <StaggerItem>
          <a
            href="https://wa.me/2349067626445"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-neutral-200 p-8 hover:shadow-md transition-all group block h-full"
          >
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-base text-neutral-600 mb-3">
              +234 906 762 6445
            </p>
            <span className="text-green-600 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Chat on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </StaggerItem>

        {/* X (Twitter) */}
        <StaggerItem>
          <a
            href="https://x.com/watchingd_world"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-neutral-200 p-8 hover:shadow-md transition-all group block h-full"
          >
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-neutral-200 transition-colors">
              <svg className="w-5 h-5 text-neutral-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">X (Twitter)</h3>
            <p className="text-base text-neutral-600 mb-3">
              @watchingd_world
            </p>
            <span className="text-neutral-700 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Follow on X
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </StaggerItem>
      </StaggerContainer>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Join Waitlist */}
        <ScrollFadeIn direction="left" delay={0.3}>
          <div className="bg-blue-50 border border-blue-200 p-10 h-full">
            <h3 className="text-2xl font-semibold mb-4 tracking-tight">Join the Waitlist</h3>
            <p className="text-base text-neutral-700 mb-6 leading-relaxed">
              Get early access to POD and other tools as they're released. Be the first to know about new features and updates.
            </p>
            <BeamButton
              href="https://forms.gle/3XQZ6kwDzD3uFXi3A"
              variant="primary"
            >
              Join Waitlist
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </BeamButton>
          </div>
        </ScrollFadeIn>

        {/* Send Feedback */}
        <ScrollFadeIn direction="right" delay={0.3}>
          <div className="bg-neutral-50 border border-neutral-200 p-10 h-full">
            <h3 className="text-2xl font-semibold mb-4 tracking-tight">Send Feedback</h3>
            <p className="text-base text-neutral-600 mb-6 leading-relaxed">
              Have suggestions, ideas, or feedback about POD or other projects? I'd love to hear from you.
            </p>
            <BeamButton
              href="https://forms.gle/s3gkz5pxeGEdw21H7"
              variant="outline"
              className="border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-white"
            >
              Send Feedback
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </BeamButton>
          </div>
        </ScrollFadeIn>
      </div>

      {/* Quick Contact Section */}
      <ScrollFadeIn delay={0.4}>
        <div className="bg-white border border-neutral-200 p-12 shadow-sm">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold mb-4 tracking-tight">Quick Contact</h2>
            <p className="text-base text-neutral-600 mb-8 leading-relaxed">
              For direct inquiries about custom systems, collaborations, or POD implementation, use the buttons below to reach out immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <BeamButton
                href="mailto:Adewunmi@podsystem.ng"
                variant="primary"
              >
                Email Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </BeamButton>
              <BeamButton
                href="https://wa.me/2349067626445"
                variant="outline"
                className="border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50"
              >
                WhatsApp
              </BeamButton>
              <BeamButton
                href="https://demo.podsystem.ng"
                variant="outline"
                className="border-2 border-neutral-300 text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50"
              >
                View Demo
              </BeamButton>
            </div>
          </div>
        </div>
      </ScrollFadeIn>

      {/* Response Time Notice */}
      <ScrollFadeIn delay={0.5}>
        <div className="mt-12 p-6 bg-neutral-50 border-l-4 border-blue-600">
          <p className="text-sm text-neutral-600">
            <strong className="font-semibold text-neutral-900">Response time:</strong> I typically respond to inquiries within 24-48 hours. For urgent matters, WhatsApp is the fastest option.
          </p>
        </div>
      </ScrollFadeIn>
    </div>
  );
}