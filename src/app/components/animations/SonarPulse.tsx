import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SonarPulseProps {
  children?: ReactNode;
  color?: string;
  size?: number;
  pulseCount?: number;
  duration?: number;
  className?: string;
}

export function SonarPulse({ 
  children,
  color = 'rgb(59, 130, 246)', // blue-600
  size = 100,
  pulseCount = 3,
  duration = 2,
  className = ''
}: SonarPulseProps) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Sonar pulse rings */}
      {Array.from({ length: pulseCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2"
          style={{
            borderColor: color,
            width: size,
            height: size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 2],
            opacity: [1, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay: i * (duration / pulseCount),
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Center content */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Decorative circle with subtle animations
export function DecorativeCircle({ 
  size = 12,
  color = 'bg-blue-600',
  withPulse = false,
  className = ''
}: { 
  size?: number;
  color?: string;
  withPulse?: boolean;
  className?: string;
}) {
  if (withPulse) {
    return (
      <SonarPulse size={size} className={className}>
        <div 
          className={`rounded-full ${color}`}
          style={{ width: size / 2, height: size / 2 }}
        />
      </SonarPulse>
    );
  }

  return (
    <motion.div
      className={`rounded-full ${color} ${className}`}
      style={{ width: size, height: size }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
