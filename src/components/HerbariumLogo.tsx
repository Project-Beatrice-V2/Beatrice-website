import React from 'react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../utils/osDetect';

interface HerbariumLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  useImageOnly?: boolean;
}

export const HerbariumLogo: React.FC<HerbariumLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  useImageOnly = false,
}) => {
  const sizeClasses = {
    sm: { textMain: 'text-lg', textSub: 'text-[10px]', imgSize: 'w-7 h-7' },
    md: { textMain: 'text-2xl md:text-3xl', textSub: 'text-xs tracking-widest', imgSize: 'w-10 h-10 md:w-11 md:h-11' },
    lg: { textMain: 'text-4xl md:text-5xl', textSub: 'text-sm tracking-widest', imgSize: 'w-16 h-16 md:w-20 md:h-20' },
  };

  const logoSrc = getAssetUrl('/beatrice-logo.png');

  if (useImageOnly) {
    return (
      <Link to="/" className="group inline-block select-none">
        <img
          src={logoSrc}
          alt="Project Beatrice V2 Logo"
          className={`rounded-lg border border-sepia-ink/30 shadow-ink-sm group-hover:scale-105 transition-transform duration-300 object-cover ${sizeClasses[size].imgSize}`}
        />
      </Link>
    );
  }

  return (
    <Link to="/" className="group inline-flex items-center gap-3 select-none">
      {/* Official Antique Botanical Logo Thumbnail */}
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <img
          src={logoSrc}
          alt="Project Beatrice V2 Official Botanical Logo"
          className={`rounded-lg border border-sepia-ink/30 shadow-ink-sm object-cover ${sizeClasses[size].imgSize}`}
        />
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        {showSubtitle && (
          <span className={`font-mono uppercase text-sepia-ink/80 tracking-widest font-semibold ${sizeClasses[size].textSub}`}>
            PROJECT
          </span>
        )}
        <div className="flex items-baseline gap-1.5">
          <span className={`font-display font-bold tracking-tight text-ink-primary group-hover:text-sepia-ink transition-colors ${sizeClasses[size].textMain}`}>
            Beatrice
          </span>
          <span className="font-mono text-xs md:text-sm font-bold px-1.5 py-0.5 rounded bg-sepia-ink/10 text-sepia-dark border border-sepia-ink/20">
            V2
          </span>
        </div>
      </div>
    </Link>
  );
};
