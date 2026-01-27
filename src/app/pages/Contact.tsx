import { ArrowRight, Mail, MessageCircle, ExternalLink } from 'lucide-react';

export function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-20">
      <h1 className="text-5xl font-semibold mb-6 tracking-tight">Contact</h1>
      <p className="text-xl text-neutral-600 mb-16 leading-relaxed max-w-2xl">
        Have a project in mind? Need feedback on your internal systems? Let's talk.
      </p>
      
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Email */}
        <a
          href="mailto:Adewunmi@podsystem.ng"
          className="bg-white border border-neutral-200 p-8 hover:shadow-md transition-all group"
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

        {/* WhatsApp */}
        <a
          href="https://wa.me/2349067626445"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-neutral-200 p-8 hover:shadow-md transition-all group"
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

        {/* X (Twitter) */}
        <a
          href="https://x.com/watchingd_world"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-neutral-200 p-8 hover:shadow-md transition-all group"
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
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Join Waitlist */}
        <div className="bg-blue-50 border border-blue-200 p-10">
          <h3 className="text-2xl font-semibold mb-4 tracking-tight">Join the Waitlist</h3>
          <p className="text-base text-neutral-700 mb-6 leading-relaxed">
            Get early access to POD and other tools as they're released. Be the first to know about new features and updates.
          </p>
          <a
            href="https://forms.gle/3XQZ6kwDzD3uFXi3A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-base font-medium hover:bg-blue-700 transition-all hover:shadow-lg group"
          >
            Join Waitlist
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Send Feedback */}
        <div className="bg-neutral-50 border border-neutral-200 p-10">
          <h3 className="text-2xl font-semibold mb-4 tracking-tight">Send Feedback</h3>
          <p className="text-base text-neutral-600 mb-6 leading-relaxed">
            Have suggestions, ideas, or feedback about POD or other projects? I'd love to hear from you.
          </p>
          <a
            href="https://forms.gle/s3gkz5pxeGEdw21H7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neutral-300 text-base font-medium hover:border-neutral-400 hover:bg-white transition-all group"
          >
            Send Feedback
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Quick Contact Section */}
      <div className="bg-white border border-neutral-200 p-12 shadow-sm">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">Quick Contact</h2>
          <p className="text-base text-neutral-600 mb-8 leading-relaxed">
            For direct inquiries about custom systems, collaborations, or POD implementation, use the buttons below to reach out immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:Adewunmi@podsystem.ng"
              className="px-8 py-4 bg-blue-600 text-white text-base font-medium hover:bg-blue-700 transition-all hover:shadow-lg inline-flex items-center justify-center gap-2 group"
            >
              Email Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/2349067626445"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-neutral-300 text-base font-medium hover:border-neutral-400 hover:bg-neutral-50 transition-all inline-flex items-center justify-center"
            >
              WhatsApp
            </a>
            <a
              href="https://demo.podsystem.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-neutral-300 text-base font-medium hover:border-neutral-400 hover:bg-neutral-50 transition-all inline-flex items-center justify-center"
            >
              View Demo
            </a>
          </div>
        </div>
      </div>

      {/* Response Time Notice */}
      <div className="mt-12 p-6 bg-neutral-50 border-l-4 border-blue-600">
        <p className="text-sm text-neutral-600">
          <strong className="font-semibold text-neutral-900">Response time:</strong> I typically respond to inquiries within 24-48 hours. For urgent matters, WhatsApp is the fastest option.
        </p>
      </div>
    </div>
  );
}
