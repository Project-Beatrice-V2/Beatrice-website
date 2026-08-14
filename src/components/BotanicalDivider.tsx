import React from 'react';
import { motion } from 'framer-motion';

interface BotanicalDividerProps {
  className?: string;
  label?: string;
}

export const BotanicalDivider: React.FC<BotanicalDividerProps> = ({ className = '', label }) => {
  return (
    <div className={`w-full flex items-center justify-center my-8 md:my-12 py-2 select-none ${className}`}>
      <motion.div 
        className="w-full max-w-4xl flex items-center justify-center gap-4 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Left Rule */}
        <motion.div 
          className="h-px flex-1 bg-gradient-to-r from-transparent via-sepia-ink/30 to-sepia-ink/60"
          variants={{
            hidden: { scaleX: 0, originX: 1 },
            visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } }
          }}
        />

        {/* Center Ornamental Diamond & Optional Label */}
        <div className="flex items-center gap-3 px-2 text-sepia-ink">
          <motion.svg 
            viewBox="0 0 24 24" 
            className="w-4 h-4 fill-sepia-ink/20 stroke-sepia-ink"
            variants={{
              hidden: { scale: 0, rotate: -45 },
              visible: { scale: 1, rotate: 0, transition: { duration: 0.5, delay: 0.4 } }
            }}
          >
            <polygon points="12,2 22,12 12,22 2,12" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" fill="#8B4513" stroke="none" />
          </motion.svg>

          {label && (
            <motion.span 
              className="font-serif italic text-sm text-sepia-ink/90 font-medium tracking-wide"
              variants={{
                hidden: { opacity: 0, y: 4 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }
              }}
            >
              {label}
            </motion.span>
          )}

          {label && (
            <motion.svg 
              viewBox="0 0 24 24" 
              className="w-4 h-4 fill-sepia-ink/20 stroke-sepia-ink"
              variants={{
                hidden: { scale: 0, rotate: 45 },
                visible: { scale: 1, rotate: 0, transition: { duration: 0.5, delay: 0.4 } }
              }}
            >
              <polygon points="12,2 22,12 12,22 2,12" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="3" fill="#8B4513" stroke="none" />
            </motion.svg>
          )}
        </div>

        {/* Right Rule */}
        <motion.div 
          className="h-px flex-1 bg-gradient-to-l from-transparent via-sepia-ink/30 to-sepia-ink/60"
          variants={{
            hidden: { scaleX: 0, originX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } }
          }}
        />
      </motion.div>
    </div>
  );
};
