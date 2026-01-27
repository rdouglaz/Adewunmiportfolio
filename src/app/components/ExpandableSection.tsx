import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpandableSectionProps {
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    description: string;
  }>;
}

export function ExpandableSection({ title, subtitle, items }: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="border border-neutral-200 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-8 py-6 flex items-start justify-between gap-4 hover:bg-neutral-50 transition-colors text-left group"
      >
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-2 group-hover:text-neutral-700 transition-colors">
            {title}
          </h3>
          <p className="text-base text-neutral-600">{subtitle}</p>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown 
            className="w-6 h-6 text-neutral-400 flex-shrink-0 mt-1"
          />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="px-8 pb-8 pt-2 border-t border-neutral-100 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 bg-neutral-50 border border-neutral-200 hover:shadow-sm transition-shadow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <h4 className="text-lg font-semibold mb-3">{item.title}</h4>
                  <p className="text-base text-neutral-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}