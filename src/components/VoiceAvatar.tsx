import React from 'react';
import type { Voice } from '../data/voices';

/** The voice's avatar exactly as the app shows it: a circle with a ring. */
export const VoiceAvatar: React.FC<{ voice: Voice; size?: number; className?: string }> = ({ voice, size = 64, className = '' }) => (
  <span className={`relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-white/15 ${className}`} style={{ width: size, height: size }}>
    <img src={voice.avatar} alt={voice.name} width={size} height={size} loading="lazy" decoding="async" className="h-full w-full object-cover" draggable={false} />
  </span>
);
