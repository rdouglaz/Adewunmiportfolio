import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface BeamButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
}

export function BeamButton({ 
  children, 
  onClick, 
  href, 
  variant = 'primary', 
  className = '',
  type = 'button',
  target
}: BeamButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-base transition-all overflow-hidden";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-neutral-900 hover:bg-neutral-100",
    outline: "border-2 border-white text-white hover:bg-white hover:text-neutral-900"
  };

  const content = (
    <>
      {/* Beam animation border */}
      <motion.span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0%', '-200% 0%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Inner glow on hover */}
      <motion.span
        className="absolute inset-[1px] rounded-full"
        style={{
          background: variant === 'primary' ? '#2563eb' : variant === 'secondary' ? '#ffffff' : 'transparent',
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${className} group`;

  if (href) {
    // Determine if link is external
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    const linkTarget = target || (isExternal ? '_blank' : undefined);
    const linkRel = isExternal && linkTarget === '_blank' ? 'noopener noreferrer' : undefined;
    
    return (
      <motion.a 
        href={href} 
        className={allClasses}
        target={linkTarget}
        rel={linkRel}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={allClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}