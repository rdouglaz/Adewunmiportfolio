import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollFadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  blur?: boolean;
  className?: string;
}

export function ScrollFadeIn({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 0.6,
  blur = false,
  className = ''
}: ScrollFadeInProps) {
  const directionVariants = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: {}
  };

  const initial = {
    opacity: 0,
    ...directionVariants[direction],
    ...(blur && { filter: 'blur(10px)' })
  };

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    ...(blur && { filter: 'blur(0px)' })
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className = ''
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  blur = false,
  className = '' 
}: { 
  children: ReactNode; 
  blur?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { 
          opacity: 0, 
          y: 20,
          ...(blur && { filter: 'blur(10px)' })
        },
        visible: { 
          opacity: 1, 
          y: 0,
          ...(blur && { filter: 'blur(0px)' }),
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        },
      }}
    >
      {children}
    </motion.div>
  );
}