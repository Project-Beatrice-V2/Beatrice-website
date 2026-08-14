import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface InkButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  asLink?: string;
  external?: boolean;
  download?: boolean | string;
}

export const InkButton: React.FC<InkButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  asLink,
  external,
  download,
  className = '',
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-sans font-medium rounded-full overflow-hidden transition-all duration-300 ink-bleed-btn select-none group';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-2',
    md: 'px-6 py-3 text-sm gap-2.5',
    lg: 'px-8 py-4 text-base gap-3 font-semibold',
  };

  const variantClasses = {
    primary: 'bg-sepia-ink text-parchment-light shadow-ink-md hover:bg-sepia-deep hover:shadow-ink-lg hover:text-white',
    secondary: 'bg-parchment-muted text-ink-primary border border-sepia-ink/20 shadow-ink-sm hover:bg-parchment-dark hover:border-sepia-ink/40',
    outline: 'bg-transparent text-sepia-ink border border-sepia-ink/40 hover:bg-sepia-ink/10 hover:border-sepia-ink',
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (asLink) {
    const isDirectDownload = Boolean(
      download ||
      asLink.endsWith('.dmg') ||
      asLink.endsWith('.exe') ||
      asLink.endsWith('.zip') ||
      asLink.includes('/archive/')
    );

    return (
      <motion.a
        href={asLink}
        target={isDirectDownload ? undefined : (external ? '_blank' : undefined)}
        rel={external ? 'noopener noreferrer' : undefined}
        download={isDirectDownload ? '' : undefined}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
};
