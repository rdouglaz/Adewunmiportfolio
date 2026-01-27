import { ArrowRight } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-20">
      <h1 className="text-5xl font-semibold mb-6 tracking-tight">About</h1>
      <p className="text-xl text-neutral-600 mb-16 leading-relaxed">
        Building practical internal systems for real business operations
      </p>
      
      <div className="space-y-16">
        <section>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-8 mb-8">
            <p className="text-xl text-neutral-900 leading-relaxed font-medium">
              I build internal systems that help businesses see clearly and operate better.
            </p>
          </div>
          
          <p className="text-lg text-neutral-600 leading-relaxed mb-6">
            Most businesses don't need flashy interfaces or complex features. They need systems that match how they actually work — clear, organized, and built for the people who use them every day.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-white border border-neutral-200 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 tracking-tight">My Background</h2>
            <p className="text-base text-neutral-600 leading-relaxed mb-4">
              I come from operations, not just development. I've seen firsthand how good systems make work easier and how bad ones create chaos. That perspective shapes everything I build.
            </p>
            <p className="text-base text-neutral-600 leading-relaxed">
              I focus on property management, real estate operations, and internal business tools because these areas need practical solutions more than polish.
            </p>
          </div>

          <div className="bg-white border border-neutral-200 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 tracking-tight">Why AI + No-Code</h2>
            <p className="text-base text-neutral-600 leading-relaxed mb-4">
              AI and no-code tools let me focus on what matters: understanding the business problem and designing the right system.
            </p>
            <p className="text-base text-neutral-600 leading-relaxed">
              This approach means faster builds, easier updates, and systems that can adapt as businesses change. It's practical, not trendy.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-8 tracking-tight">What Makes My Approach Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Workflows First",
                description: "I start with workflows, not features. I map how the business actually operates before building anything."
              },
              {
                title: "Designed for Clarity",
                description: "If a user has to think hard about how to use it, it's not done right. Clarity is non-negotiable."
              },
              {
                title: "Built to Scale",
                description: "Multi-user, multi-company, role-based — all the structure businesses need as they grow."
              },
              {
                title: "Data Visibility",
                description: "Good reporting isn't a bonus feature — it's essential. Systems need to show what's happening."
              }
            ].map((item, index) => (
              <div key={index} className="bg-neutral-50 border border-neutral-200 p-6 hover:shadow-sm transition-shadow">
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-base text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-neutral-200 p-10 shadow-sm">
          <h2 className="text-3xl font-semibold mb-6 tracking-tight">What I'm Working On</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">POD (Property Operations Dashboard)</h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                A system built for property managers and real estate teams. It handles properties, tenants, maintenance, reporting, and subscriptions in one platform.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-200">
              <h3 className="text-xl font-semibold mb-3">Operational Automation</h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                Exploring more automation and AI integrations for operational workflows — anything that reduces repetitive tasks and gives teams better control.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 border border-neutral-200 p-10">
          <h2 className="text-3xl font-semibold mb-6 tracking-tight">My Philosophy</h2>
          <div className="space-y-4">
            <p className="text-lg text-neutral-700 leading-relaxed">
              I care more about systems working than looking fancy.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed">
              The best internal tool is the one people actually use without training.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed font-medium">
              If you need something built right, with real operational thinking behind it, I'm your person.
            </p>
          </div>
        </section>

        <section className="bg-neutral-900 text-white p-12 -mx-8">
          <h3 className="text-3xl font-semibold mb-6 tracking-tight">Let's Work Together</h3>
          <p className="text-lg text-neutral-300 mb-10 leading-relaxed max-w-2xl">
            If you're looking for someone who understands both business operations and system design, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:Adewunmi@podsystem.ng"
              className="px-8 py-4 bg-white text-neutral-900 text-base font-medium hover:bg-neutral-100 transition-all inline-flex items-center justify-center gap-2 group"
            >
              Email Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://wa.me/2349067626445"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-base font-medium hover:bg-white hover:text-neutral-900 transition-all inline-flex items-center justify-center"
            >
              WhatsApp
            </a>
            <a
              href="https://demo.podsystem.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-base font-medium hover:bg-white hover:text-neutral-900 transition-all inline-flex items-center justify-center"
            >
              View Demo
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
