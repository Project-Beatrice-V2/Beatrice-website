import React, { useLayoutEffect, useRef } from 'react';
import { useCopy } from '../content';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { sceneAttr } from '../three/sceneBus';
import { useIsDesktop } from '../hooks/useMedia';
import { Eyebrow } from '../components/ui';

// A pinned chapter: four scroll "beats" while the orb goes from a raw, grey,
// turbulent voice to a smooth aurora voice.
const BEATS = [
  { chaos: 1.35, mono: 0.9 },
  { chaos: 0.95, mono: 0.55 },
  { chaos: 0.55, mono: 0.2 },
  { chaos: 0.12, mono: 0 },
];

export const Conversion: React.FC = () => {
  const c = useCopy();
  const desktop = useIsDesktop();
  const root = useRef<HTMLElement>(null);
  const steps = c.conversion.steps;

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.beat');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      });
      items.forEach((el, i) => {
        if (i > 0) tl.fromTo(el, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, i);
        if (i < items.length - 1) tl.to(el, { autoAlpha: 0, y: -60, duration: 0.5, ease: 'power2.in' }, i + 0.6);
      });
      tl.fromTo('.beat-progress', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: items.length }, 0);
    }, root);
    return () => ctx.revert();
  }, [steps.length]);

  const x = desktop ? -2.1 : 0;
  const y = desktop ? 0 : 1.05;

  if (prefersReducedMotion()) {
    return (
      <section id="conversion" className="relative z-10 py-32">
        <div className="shell">
          <Eyebrow className="mb-12">{c.conversion.label}</Eyebrow>
          <ol className="grid gap-12 md:grid-cols-2">
            {steps.map((s) => (
              <li key={s.k}>
                <div className="font-mono text-[12px] text-fg-3">{s.k}</div>
                <h3 className="display mt-3 text-[48px]">{s.title}</h3>
                <p className="mt-4 max-w-md text-[17px] leading-relaxed text-fg-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="conversion" ref={root} className="relative z-10" style={{ height: `${steps.length * 100}svh` }}>
      {BEATS.map((b, i) => (
        <div key={i} aria-hidden className="pointer-events-none absolute inset-x-0 h-[100svh]" style={{ top: `${i * 100}svh` }}
          {...sceneAttr({ morph: 0, chaos: b.chaos, mono: b.mono, x, y, z: desktop ? 8.6 : 10, opacity: 1 })} />
      ))}

      <div className="sticky top-0 flex h-[100svh] items-end pb-16 lg:items-center lg:pb-0">
        <div className="shell grid w-full lg:grid-cols-2">
          <div className="hidden lg:block" />
          <div className="relative">
            <Eyebrow className="mb-8">{c.conversion.label}</Eyebrow>
            <div className="relative flex gap-8">
              <div className="relative w-px shrink-0 bg-white/10">
                <div className="beat-progress absolute inset-0 origin-top bg-white/70" />
              </div>
              <div className="relative min-h-[260px] flex-1 sm:min-h-[300px]">
                {steps.map((s, i) => (
                  <div key={s.k} className="beat absolute inset-0" style={i > 0 ? { opacity: 0, visibility: 'hidden' } : undefined}>
                    <div className="font-mono text-[12px] text-fg-3">{s.k} / {String(steps.length).padStart(2, '0')}</div>
                    <h3 className="display mt-4 text-[calc(var(--display-scale)*clamp(44px,5.6vw,84px))]">{s.title}</h3>
                    <p className="mt-6 max-w-md text-[17px] leading-relaxed text-fg-2">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
