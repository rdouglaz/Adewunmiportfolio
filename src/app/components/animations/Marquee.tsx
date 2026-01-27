import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  gradientColor?: string; // Allow custom gradient color
}

export function Marquee({ 
  children, 
  duration = 40,
  pauseOnHover = true,
  reverse = false,
  className = '',
  gradientColor = 'white'
}: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient masks for fade effect */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${gradientColor}, transparent)`
        }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to left, ${gradientColor}, transparent)`
        }}
      />
      
      <motion.div
        className="flex gap-8 w-fit"
        animate={{
          x: reverse ? ['0%', '100%'] : ['0%', '-100%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        style={{
          willChange: 'transform',
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
      >
        {/* Original items */}
        {children}
        {/* Duplicated items for seamless loop */}
        {children}
      </motion.div>
    </div>
  );
}

// Helper component for logo items
export function MarqueeItem({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div className={`flex-shrink-0 ${className}`}>
      {children}
    </div>
  );
}