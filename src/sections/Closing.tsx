import React, { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useCopy } from '../content';
import { RevealLines, FadeIn, Eyebrow } from '../components/ui';
import { sceneAttr } from '../three/sceneBus';
import { repoUrl } from '../lib/downloads';
import { DownloadButtons } from './Hero';

export const Setup: React.FC = () => {
  const c = useCopy();
  return (
    <section id="how" className="relative z-10 py-36" {...sceneAttr({ morph: 0, chaos: 0.25, x: -3, y: 1.6, z: 11, opacity: 0.4 })}>
      <div className="shell">
        <Eyebrow>{c.setup.label}</Eyebrow>
        <RevealLines className="display mt-6 text-[calc(var(--display-scale)*clamp(48px,7vw,110px))]" lines={[c.setup.title]} />
        <FadeIn stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {c.setup.steps.map((s, i) => (
            <article key={s.title} className="card relative flex flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-fg-3">0{i + 1}</span>
                <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] ${s.time === 'OPTIONAL' || s.time === '任意' || s.time === '可选' ? 'border-white/10 text-fg-3' : 'border-live/30 text-live'}`}>{s.time}</span>
              </div>
              <h3 className="mt-14 text-[22px] font-semibold leading-tight tracking-tightish">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{s.body}</p>
            </article>
          ))}
        </FadeIn>
      </div>
    </section>
  );
};

export const Uses: React.FC = () => {
  const c = useCopy();
  return (
    <section className="relative z-10 py-36" {...sceneAttr({ morph: 0, chaos: 0.3, x: 3, y: -1, z: 12, opacity: 0.35 })}>
      <div className="shell">
        <Eyebrow>{c.uses.label}</Eyebrow>
        <RevealLines className="display mt-6 max-w-4xl text-[calc(var(--display-scale)*clamp(44px,6.4vw,100px))]" lines={[c.uses.title]} />
        <FadeIn stagger className="mt-16 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {c.uses.items.map((u) => (
            <article key={u.title} className="group bg-black p-8 transition-colors hover:bg-ink-900">
              <div className="font-mono text-[10px] tracking-[0.1em] text-fg-3">{u.tags}</div>
              <h3 className="display mt-10 text-[44px]">{u.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-fg-2">{u.body}</p>
            </article>
          ))}
        </FadeIn>
      </div>
    </section>
  );
};

export const Create: React.FC = () => {
  const c = useCopy();
  const cr = c.create;
  return (
    <section id="create" className="relative z-10 py-36" {...sceneAttr({ morph: 1, chaos: 0.1, hue: 0, z: 9, opacity: 0.3, y: -2.6 })}>
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>{cr.label}</Eyebrow>
            <RevealLines className="display mt-6 text-[calc(var(--display-scale)*clamp(44px,6.4vw,100px))]" lines={[cr.title, <em key="b" className="text-aurora">{cr.titleB}</em>]} />
          </div>
          <FadeIn><p className="max-w-md text-[17px] leading-relaxed text-fg-2">{cr.sub}</p></FadeIn>
        </div>
        <FadeIn stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cr.steps.map((s, i) => (
            <a key={s.title} href={repoUrl(s.repo)} target="_blank" rel="noreferrer" className="card group flex min-h-[220px] flex-col justify-between p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-fg-3">0{i + 1}</span>
                <ArrowUpRight className="h-4 w-4 text-fg-3 transition-colors group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-[22px] font-semibold tracking-tightish">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{s.body}</p>
              </div>
            </a>
          ))}
        </FadeIn>
        <p className="mt-8 text-[13px] text-fg-3">{cr.ethics}</p>
      </div>
    </section>
  );
};

export const Faq: React.FC = () => {
  const c = useCopy();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative z-10 py-36" {...sceneAttr({ morph: 1, chaos: 0.1, z: 9, opacity: 0.15, y: -2.5 })}>
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{c.faq.label}</Eyebrow>
          <RevealLines className="display mt-6 text-[calc(var(--display-scale)*clamp(44px,6vw,92px))]" lines={[c.faq.title]} />
        </div>
        <ul className="border-t border-hairline">
          {c.faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.q} className="border-b border-hairline">
                <button className="flex w-full items-center justify-between gap-6 py-6 text-left" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                  <span className="text-[19px] font-medium tracking-tightish">{it.q}</span>
                  <Plus className={`h-5 w-5 shrink-0 text-fg-3 transition-transform duration-300 ${isOpen ? 'rotate-45 text-white' : ''}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-[16px] leading-relaxed text-fg-2">{it.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export const FinalCta: React.FC = () => {
  const c = useCopy();
  return (
    <section id="cta" className="relative z-10 flex min-h-[100svh] items-center justify-center py-32" {...sceneAttr({ morph: 2, chaos: 0.1, z: 8.6, opacity: 1, y: 0.1 })}>
      <div className="shell text-center">
        <RevealLines className="display text-[calc(var(--display-scale)*clamp(52px,8.4vw,136px))]" lines={[c.cta.titleA, <em key="b" className="text-aurora">{c.cta.titleB}</em>]} />
        <FadeIn className="mt-6"><p className="text-[17px] text-fg-2">{c.cta.sub}</p></FadeIn>
        <FadeIn className="mt-10"><DownloadButtons /></FadeIn>
      </div>
    </section>
  );
};
