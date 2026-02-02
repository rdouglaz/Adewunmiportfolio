import { motion } from 'motion/react';

interface DashboardMockupProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function DashboardMockup({ className = '', variant = 'default' }: DashboardMockupProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Laptop Frame */}
      <div className="relative">
        {/* Screen */}
        <div className="bg-neutral-900 rounded-t-lg border-2 border-neutral-800 overflow-hidden shadow-2xl">
          {/* Browser Chrome */}
          <div className="bg-neutral-800 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 border-b border-neutral-700">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 ml-2 sm:ml-3 bg-neutral-700/50 rounded px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] text-neutral-400 truncate">
              podsystem.ng/dashboard
            </div>
          </div>
          
          {/* Dashboard Screenshot */}
          <div className="bg-white">
            <img
              src="/assets/pod-dashboard.webp"
              alt="POD System Dashboard showing property operations overview"
              className="w-full h-auto block"
              loading="lazy"
              onError={(e) => {
                // Fallback to a placeholder if the image fails to load
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = "https://images.unsplash.com/photo-1620221905485-86b2e9e1b594?w=1920&q=80";
              }}
            />
          </div>
        </div>
        
        {/* Laptop Base */}
        <div className="h-2 sm:h-3 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-lg border-x-2 border-b-2 border-neutral-400" />
        <div className="h-0.5 sm:h-1 bg-neutral-500 rounded-b-sm mx-auto w-2/3" />
        
        {/* Shadow */}
        <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 h-6 sm:h-8 bg-gradient-to-b from-neutral-900/20 to-transparent blur-xl -z-10" />
      </div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-blue-500/5 rounded-t-lg blur-3xl -z-20" />
    </motion.div>
  );
}