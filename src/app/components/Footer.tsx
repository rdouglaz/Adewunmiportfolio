import { ScrollFadeIn, StaggerContainer, StaggerItem } from '@/app/components/animations';
import { Link } from 'react-router';
import { Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <ScrollFadeIn>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div>
              <div className="text-2xl font-semibold mb-3 tracking-tight">Adewunmi Saliu</div>
              <div className="text-base text-neutral-600 leading-relaxed max-w-md">
                Business System and Automation Specialist (AI Builder)
              </div>
            </div>
            
            <StaggerContainer className="flex flex-col gap-3">
              <StaggerItem>
                <a 
                  href="https://demo.podsystem.ng" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base text-neutral-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Live Demo →
                </a>
              </StaggerItem>
              <StaggerItem>
                <a 
                  href="https://x.com/watchingd_world" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base text-neutral-600 hover:text-blue-600 transition-colors"
                >
                  X (@watchingd_world)
                </a>
              </StaggerItem>
              <StaggerItem>
                <a 
                  href="mailto:Adewunmi@podsystem.ng"
                  className="text-base text-neutral-600 hover:text-blue-600 transition-colors"
                >
                  Adewunmi@podsystem.ng
                </a>
              </StaggerItem>
              <StaggerItem>
                <Link 
                  to="/feedback"
                  className="text-base text-neutral-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Send Feedback
                </Link>
              </StaggerItem>
              <StaggerItem>
                <div className="pt-3 mt-3 border-t border-neutral-200">
                  <Link 
                    to="/admin"
                    className="text-sm text-neutral-500 hover:text-blue-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Admin Dashboard
                  </Link>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </ScrollFadeIn>
      </div>
    </footer>
  );
}