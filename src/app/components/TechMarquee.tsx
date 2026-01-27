import { Marquee, MarqueeItem } from '@/app/components/animations';

export function TechMarquee() {
  const technologies = [
    'AI Automation',
    'No-Code Platforms',
    'Database Design',
    'API Integration',
    'React',
    'System Architecture',
    'Workflow Design',
    'Multi-Tenant SaaS',
    'Property Management',
    'Real Estate Tech'
  ];

  return (
    <div className="w-full py-8 bg-neutral-900">
      <Marquee duration={30} gradientColor="rgb(23, 23, 23)">
        {technologies.map((tech, index) => (
          <MarqueeItem key={index} className="px-8">
            <div className="text-white text-lg font-medium whitespace-nowrap">
              {tech}
            </div>
          </MarqueeItem>
        ))}
      </Marquee>
    </div>
  );
}