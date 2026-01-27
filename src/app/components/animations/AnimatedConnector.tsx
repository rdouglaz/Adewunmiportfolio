import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface AnimatedConnectorProps {
  from: string; // element ID or ref
  to: string; // element ID or ref
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  curved?: boolean;
}

export function AnimatedConnector({ 
  from, 
  to, 
  color = 'rgb(59, 130, 246)', 
  strokeWidth = 2,
  animated = true,
  curved = true
}: AnimatedConnectorProps) {
  const [path, setPath] = useState('');
  const [pathLength, setPathLength] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updatePath = () => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);
      
      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      const fromPoint: Point = {
        x: fromRect.left + fromRect.width / 2,
        y: fromRect.top + fromRect.height / 2,
      };

      const toPoint: Point = {
        x: toRect.left + toRect.width / 2,
        y: toRect.top + toRect.height / 2,
      };

      // Create SVG path
      let pathString = '';
      
      if (curved) {
        // Calculate control points for bezier curve
        const dx = toPoint.x - fromPoint.x;
        const dy = toPoint.y - fromPoint.y;
        const controlX1 = fromPoint.x + dx * 0.5;
        const controlY1 = fromPoint.y;
        const controlX2 = fromPoint.x + dx * 0.5;
        const controlY2 = toPoint.y;
        
        pathString = `M ${fromPoint.x} ${fromPoint.y} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toPoint.x} ${toPoint.y}`;
      } else {
        pathString = `M ${fromPoint.x} ${fromPoint.y} L ${toPoint.x} ${toPoint.y}`;
      }

      setPath(pathString);

      // Calculate path length for animation
      if (svgRef.current) {
        const pathElement = svgRef.current.querySelector('path');
        if (pathElement) {
          setPathLength(pathElement.getTotalLength());
        }
      }
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    window.addEventListener('scroll', updatePath);

    return () => {
      window.removeEventListener('resize', updatePath);
      window.removeEventListener('scroll', updatePath);
    };
  }, [from, to, curved]);

  if (!path) return null;

  return (
    <svg
      ref={svgRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ position: 'fixed' }}
    >
      <defs>
        <linearGradient id={`gradient-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Static path */}
      <motion.path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        opacity={0.2}
      />
      
      {/* Animated beam */}
      {animated && (
        <motion.path
          d={path}
          stroke={`url(#gradient-${from}-${to})`}
          strokeWidth={strokeWidth + 1}
          fill="none"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            strokeDasharray: pathLength * 0.3,
            strokeDashoffset: 0,
          }}
        />
      )}
    </svg>
  );
}

// Component to wrap elements that can be connected
export function ConnectorNode({ 
  id, 
  children,
  className = ''
}: { 
  id: string; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div id={id} className={`relative ${className}`}>
      {children}
    </div>
  );
}
