import React from 'react';
import {
  siDiscord, siObsstudio, siZoom, siTwitch, siGooglemeet, siVrchat, siStreamlabs,
  siYoutube, siTiktok, siKick, siValorant, siRoblox, siSteam, siWhatsapp,
  type SimpleIcon,
} from 'simple-icons';
import { useCopy } from '../content';

// Official brand marks (Simple Icons). Brand colours too dark to see on the
// black canvas are drawn in white instead.
const APPS: { icon: SimpleIcon; name: string }[] = [
  { icon: siDiscord, name: 'Discord' },
  { icon: siObsstudio, name: 'OBS Studio' },
  { icon: siZoom, name: 'Zoom' },
  { icon: siTwitch, name: 'Twitch' },
  { icon: siGooglemeet, name: 'Google Meet' },
  { icon: siVrchat, name: 'VRChat' },
  { icon: siStreamlabs, name: 'Streamlabs' },
  { icon: siYoutube, name: 'YouTube' },
  { icon: siTiktok, name: 'TikTok' },
  { icon: siKick, name: 'Kick' },
  { icon: siValorant, name: 'Valorant' },
  { icon: siRoblox, name: 'Roblox' },
  { icon: siSteam, name: 'Steam' },
  { icon: siWhatsapp, name: 'WhatsApp' },
];

function visibleColor(hex: string) {
  const n = parseInt(hex, 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.25 ? '#FFFFFF' : `#${hex}`;
}

export const WorksMarquee: React.FC = () => {
  const c = useCopy();
  const row = [...APPS, ...APPS];
  return (
    <section className="relative z-10 py-14" aria-label={c.works.label}>
      <div className="eyebrow mb-8 justify-center text-center">{c.works.label}</div>
      <div className="fade-edges-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-14 pr-14 hover:[animation-play-state:paused]">
          {row.map(({ icon, name }, i) => (
            <li key={i} className="flex items-center gap-3 whitespace-nowrap" aria-hidden={i >= APPS.length}>
              <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill={visibleColor(icon.hex)} role="img" aria-label={name}>
                <path d={icon.path} />
              </svg>
              <span className="text-[22px] font-medium tracking-tightish text-white/90 sm:text-[24px]">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
