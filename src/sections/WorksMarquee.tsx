import React from 'react';
import { useCopy } from '../content';

export const WorksMarquee: React.FC = () => {
  const c = useCopy();
  const row = [...c.works.apps, ...c.works.apps];
  return (
    <section className="relative z-10 hairline-t hairline-b bg-black/40 py-10 backdrop-blur-sm" aria-label={c.works.label}>
      <div className="eyebrow mb-6 justify-center text-center">{c.works.label}</div>
      <div className="fade-edges-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused]">
          {row.map((name, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className={`text-[28px] sm:text-[34px] ${i % 2 ? 'font-serif [font-style:var(--display-italic)] text-fg-2' : 'font-semibold tracking-tightish text-white/85'}`}>{name}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
