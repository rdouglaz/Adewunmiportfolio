import { ArrowUpRight, Download, Github } from 'lucide-react';
import {
  BeamButton,
  ScrollFadeIn,
  StaggerContainer,
  StaggerItem,
} from '@/app/components/animations';

type ReleaseLink = { label: string; href: string };

type Release = {
  id: string;
  name: string;
  tag: string;
  description: string;
  license: 'Open source' | 'Commercial' | 'Upcoming';
  version: string;
  tech: string[];
  // TODO: paste the GitHub release/tag URL when you cut a release,
  // e.g. "https://github.com/rdouglaz/Nonfictionai/releases/latest".
  // Leave "" and the card shows "Release coming soon" instead of a button.
  releaseUrl: string;
  // TODO: paste the source repo URL, or leave "" to hide the button.
  repoUrl: string;
  links: ReleaseLink[];
};

const releases: Release[] = [
  {
    id: 'the-scribe',
    name: 'The Scribe',
    tag: 'AI Writing Platform',
    description:
      'AI writing platform for Christian authors and ministry leaders — Voice DNA, Scripture-grounded research, sermon manuscripts, devotionals, and books in the author\u2019s own voice.',
    license: 'Commercial',
    version: 'v1.0',
    tech: ['LLMs', 'RAG', 'React', 'Vercel'],
    releaseUrl: '',
    repoUrl: '',
    links: [
      { label: 'Open App', href: 'https://thescribeai.vercel.app' },
      { label: 'Marketing Site', href: 'https://thescribe-ai.vercel.app' },
    ],
  },
  {
    id: 'pod-system',
    name: 'POD System',
    tag: 'Operations Platform',
    description:
      'Multi-tenant property operations platform — companies, tenants, rent tracking, maintenance workflows, and financial reporting under role-based access control.',
    license: 'Commercial',
    version: 'v1.0',
    tech: ['No-code platforms', 'AI automation', 'API integrations'],
    releaseUrl: '',
    repoUrl: '',
    links: [
      { label: 'Management App', href: 'https://app.podsystem.ng' },
      { label: 'Tenant App', href: 'https://tenant.podsystem.ng' },
      { label: 'Marketplace', href: 'https://marketplace.podsystem.ng' },
      { label: 'Website', href: 'https://podsystem.ng' },
    ],
  },
  {
    id: 'meetsummary-ai',
    name: 'MeetSummary AI',
    tag: 'Meeting Intelligence',
    description:
      'Upload any meeting recording and get a speaker-labelled transcript, AI summary, action items with owners, a ready-to-send follow-up email, and CRM sync.',
    license: 'Open source',
    version: 'v1.0',
    tech: ['AI / LLM Integration', 'React', 'TypeScript', 'Vercel'],
    releaseUrl: '',
    repoUrl: 'https://github.com/rdouglaz/Meetsummary',
    links: [{ label: 'Open App', href: 'https://meetsummary-one.vercel.app/' }],
  },
  {
    id: 'nonfiction-ai',
    name: 'Nonfiction AI',
    tag: 'Long-form Writing',
    description:
      'AI-assisted platform for the long-form nonfiction process — research, outlining, chapter drafting, and editing in one coherent workflow. Built for books, not blog posts.',
    license: 'Open source',
    version: 'v1.0',
    tech: ['AI writing systems', 'LLMs', 'React', 'Vercel'],
    releaseUrl: '',
    repoUrl: 'https://github.com/rdouglaz/Nonfictionai',
    links: [{ label: 'Open App', href: 'https://nonfictionai.vercel.app/' }],
  },
  {
    id: 'clipforge-ai',
    name: 'ClipForge AI',
    tag: 'Local Video Clipping',
    description:
      'Local AI clipping app for Windows. Download the v1.0.0 installer below to get started.',
    license: 'Open source',
    version: 'v1.0.0',
    tech: ['TypeScript', 'Windows'],
    releaseUrl:
      'https://github.com/rdouglaz/ClipForge-AI/releases/download/v1.0.0/ClippingAI-Setup-1.0.0.exe',
    repoUrl: 'https://github.com/rdouglaz/ClipForge-AI',
    links: [],
  },
  {
    id: 'ai-book-formatter-studio',
    name: 'AI Book Formatter Studio',
    tag: 'Book Formatting',
    description:
      'AI-assisted studio for formatting books — structure, layout, and publish-ready output.',
    license: 'Commercial',
    version: 'v1.0',
    tech: ['AI writing systems', 'React', 'Vercel'],
    releaseUrl: '',
    repoUrl: '',
    links: [
      {
        label: 'Open App',
        href: 'https://ai-book-formatter-lime.vercel.app/',
      },
    ],
  },
  {
    id: 'local-ai-voice-studio',
    name: 'Local AI Voice Studio',
    tag: 'Voice Studio',
    description:
      'Upcoming studio for local AI voice work — release details coming soon.',
    license: 'Upcoming',
    version: 'TBA',
    tech: [],
    releaseUrl: '',
    repoUrl: '',
    links: [],
  },
  {
    id: 'ai-video-editing-studio',
    name: 'AI Video Editing Studio',
    tag: 'Video Editing',
    description:
      'Upcoming studio for AI video editing — release details coming soon.',
    license: 'Upcoming',
    version: 'TBA',
    tech: [],
    releaseUrl: '',
    repoUrl: '',
    links: [],
  },
];

export function Releases() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      <ScrollFadeIn blur>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600 mb-4 text-center">
          Shipped &amp; shipping
        </p>
        <h1 className="text-5xl font-semibold mb-6 tracking-tight text-center">
          Releases
        </h1>
        <p className="text-xl text-neutral-600 mb-16 leading-relaxed text-center max-w-2xl mx-auto">
          Products I&apos;ve built and released — open source and commercial.
          Grab the latest release or dig into the source.
        </p>
      </ScrollFadeIn>

      <StaggerContainer className="grid md:grid-cols-2 gap-6">
        {releases.map((release) => (
          <StaggerItem key={release.id}>
            <div className="bg-white border border-neutral-200 p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
                    {release.tag}
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight mt-1">
                    {release.name}
                  </h2>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full border ${
                      release.license === 'Open source'
                        ? 'border-blue-200 bg-blue-50 text-blue-700'
                        : release.license === 'Commercial'
                          ? 'border-violet-200 bg-violet-50 text-violet-700'
                          : 'border-neutral-200 bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {release.license}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded">
                    {release.version}
                  </span>
                </div>
              </div>

              <p className="text-base text-neutral-600 leading-relaxed mb-6">
                {release.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {release.tech.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-neutral-200">
                <div className="flex flex-wrap gap-3">
                  {release.releaseUrl ? (
                    <BeamButton
                      href={release.releaseUrl}
                      variant="primary"
                      className="!px-5 !py-2.5 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Latest Release
                    </BeamButton>
                  ) : (
                    <span
                      title="Add releaseUrl in src/app/pages/Releases.tsx"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-neutral-400 border border-dashed border-neutral-300 rounded cursor-not-allowed"
                    >
                      <Download className="w-4 h-4" />
                      Release coming soon
                    </span>
                  )}
                  {release.repoUrl && (
                    <a
                      href={release.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm border border-neutral-300 rounded hover:border-neutral-900 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source
                    </a>
                  )}
                </div>
                {release.links.length > 0 && (
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                    {release.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
