import { ArrowRight } from 'lucide-react';
import {
  BeamButton,
  ScrollFadeIn,
  StaggerContainer,
  StaggerItem,
  DecorativeCircle
} from '@/app/components/animations';

export function About() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20 relative">
      <div className="absolute top-10 right-10 opacity-20">
        <DecorativeCircle size={70} withPulse />
      </div>

      <ScrollFadeIn blur>
        <h1 className="text-5xl font-semibold mb-6 tracking-tight">About</h1>
        <p className="text-xl text-neutral-600 mb-16 leading-relaxed">
          AI Product Builder. Founder. Someone who turns ideas into products.
        </p>
      </ScrollFadeIn>

      <div className="space-y-16">
        <ScrollFadeIn delay={0.1}>
          <section>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 mb-8">
              <p className="text-xl text-neutral-900 leading-relaxed font-medium">
                I design and build AI-native products — from LLM-powered knowledge systems to internal business platforms.
              </p>
            </div>

            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              I didn't start in AI. I started in operations — watching businesses run on spreadsheets, scattered tools, and manual processes that burned everyone's time. That frustration pushed me toward building. First internal systems, then smarter systems, and eventually AI-native products where the model is the mechanic, not the add-on.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Today I build at the intersection of product thinking, AI, and real operational problems. The goal is always the same: something people actually use, not something that looks good in a pitch.
            </p>
          </section>
        </ScrollFadeIn>

        <section className="grid md:grid-cols-2 gap-12">
          <ScrollFadeIn direction="left" delay={0.2}>
            <div className="bg-white border border-neutral-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 tracking-tight">Why I build</h2>
              <p className="text-base text-neutral-600 leading-relaxed mb-4">
                Most AI hype is about the technology. I care about the problem. AI is only interesting to me when it eliminates a real workflow bottleneck — hours of manual work, knowledge locked in someone's head, processes that break when one person is unavailable.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed">
                I build because there are operational problems that deserve better tools than what currently exists, and because AI has reached a point where building those tools is actually feasible without a team of twenty.
              </p>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn direction="right" delay={0.2}>
            <div className="bg-white border border-neutral-200 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 tracking-tight">How I think</h2>
              <p className="text-base text-neutral-600 leading-relaxed mb-4">
                Product thinking first. I try to understand the user's actual workflow before touching any technology. What decision are they trying to make? What information do they need? What slows them down?
              </p>
              <p className="text-base text-neutral-600 leading-relaxed">
                From there, I work backwards to the simplest AI-native approach that solves it — not the most impressive one, the most useful one. Then I ship it, watch what happens, and improve.
              </p>
            </div>
          </ScrollFadeIn>
        </section>

        <ScrollFadeIn delay={0.3}>
          <section>
            <h2 className="text-3xl font-semibold mb-8 tracking-tight">Principles I build by</h2>
            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Understand before you build",
                  description: "The worst products are built by people who never talked to users. I map real workflows before writing a single line."
                },
                {
                  title: "AI as the core, not the feature",
                  description: "An AI badge on a traditional product is a marketing move. I design around what the model can actually do — that's an AI product."
                },
                {
                  title: "Ship early, improve always",
                  description: "A working version in someone's hands is worth more than a perfect version on a whiteboard. Feedback is the real roadmap."
                },
                {
                  title: "Simplicity is a product decision",
                  description: "If users need a tutorial to get started, the product failed. Clarity is not an aesthetic choice — it's a functional one."
                }
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <div className="bg-neutral-50 border border-neutral-200 p-6 hover:shadow-sm transition-shadow">
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-base text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.4}>
          <section className="bg-white border border-neutral-200 p-10 shadow-sm">
            <h2 className="text-3xl font-semibold mb-6 tracking-tight">What I'm working on</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">The Scribe</h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  An AI writing platform for Christian authors and ministry leaders. It captures a writer's voice through a guided interview, then produces manuscripts, devotionals, and books that sound authentically like them — grounded in Scripture and theological resources.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-semibold mb-3">AI agents and local LLMs</h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Experimenting with autonomous workflows and local model deployments — exploring where AI agents can replace repeated human decisions without losing reliability.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-xl font-semibold mb-3">Rapid prototyping</h3>
                <p className="text-base text-neutral-600 leading-relaxed">
                  Participating in AI hackathons and building fast MVPs to sharpen the speed at which I can go from problem to working product.
                </p>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.5}>
          <section className="bg-neutral-50 border border-neutral-200 p-10">
            <h2 className="text-3xl font-semibold mb-6 tracking-tight">My philosophy</h2>
            <div className="space-y-4">
              <p className="text-lg text-neutral-700 leading-relaxed">
                I'm not trying to build the most technically impressive AI product. I'm trying to build the most useful one.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed">
                The best AI tools are invisible — they just remove friction. You stop noticing the tool and start noticing how much time you have back.
              </p>
              <p className="text-lg text-neutral-700 leading-relaxed font-medium">
                If you have a real problem that AI can solve, and you want someone who thinks about products before they think about technology, I'd like to talk.
              </p>
            </div>
          </section>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.6}>
          <section className="bg-neutral-900 text-white p-12 -mx-8 relative overflow-hidden">
            <div className="absolute bottom-10 right-10 opacity-10">
              <DecorativeCircle size={150} color="bg-white" />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-semibold mb-6 tracking-tight">Let's build something</h3>
              <p className="text-lg text-neutral-300 mb-10 leading-relaxed max-w-2xl">
                I work with founders and teams at the idea-to-product stage. If you want someone who can think through the problem, design the AI approach, and ship it — reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <BeamButton
                  href="mailto:Adewunmi@podsystem.ng"
                  variant="secondary"
                >
                  Email Me
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </BeamButton>
                <BeamButton
                  href="https://wa.me/2349067626445"
                  variant="outline"
                >
                  WhatsApp
                </BeamButton>
              </div>
            </div>
          </section>
        </ScrollFadeIn>
      </div>
    </div>
  );
}
