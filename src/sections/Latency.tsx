import React, { useLayoutEffect, useRef } from 'react';
import { useCopy } from '../content';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { sceneAttr } from '../three/sceneBus';
import { FadeIn, Eyebrow } from '../components/ui';

// The page's single warm band (V7-style amber light through vertical drapery),
// with the particle voice unspooled into a waveform behind the number.
export const Latency: React.FC = () => {
  const c = useCopy();
  const l = c.latency;
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.curtain', { opacity: 0 }, {
        opacity: 1, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 30%', scrub: true },
      });
      gsap.fromTo('.curtain', { opacity: 1 }, {
        opacity: 0, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: root.current, start: 'bottom 70%', end: 'bottom top', scrub: true },
      });
      gsap.from('.latency-number', {
        scale: 0.82, opacity: 0, ease: 'expo.out', duration: 1.4,
        scrollTrigger: { trigger: '.latency-number', start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="latency" className="relative z-10 overflow-hidden py-40"
      {...sceneAttr({ morph: 1, chaos: 0.12, hue: 1, z: 9, opacity: 0.95, y: -0.2 })}>
      <div aria-hidden className="curtain pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(90% 70% at 50% 100%, rgba(255,106,43,0.55) 0%, rgba(255,106,43,0.18) 40%, rgba(0,0,0,0) 75%)',
        }} />
        <div className="absolute inset-0 opacity-60 mix-blend-screen" style={{
          background: 'repeating-linear-gradient(90deg, rgba(255,179,107,0) 0px, rgba(255,179,107,0.10) 22px, rgba(255,179,107,0) 54px, rgba(255,140,60,0.06) 80px, rgba(255,179,107,0) 118px)',
          filter: 'blur(6px)',
          maskImage: 'linear-gradient(180deg, transparent 0%, #000 45%, #000 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, #000 45%, #000 85%, transparent 100%)',
        }} />
      </div>

      <div className="shell text-center">
        <Eyebrow className="justify-center">{l.label}</Eyebrow>
        <div className="latency-number display mt-6 flex items-baseline justify-center gap-3 text-[calc(var(--display-scale)*clamp(120px,24vw,340px))] leading-[0.85]">
          <span>{l.value}</span>
          <span className="font-sans text-[0.2em] font-medium tracking-tightish text-white/70">{l.unit}</span>
        </div>
        <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-white/75">{l.caption}</p>

        <FadeIn stagger className="mx-auto mt-24 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-card border border-white/10 bg-white/10 md:grid-cols-4">
          {l.stats.map((s) => (
            <div key={s.label} className="bg-black/70 px-6 py-8 text-left backdrop-blur-md">
              <div className="text-[34px] font-semibold tracking-tightish">{s.value}</div>
              <div className="mt-1 text-[14px] text-fg-2">{s.label}</div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
};
