import React, { useLayoutEffect, useRef } from 'react';
import { useCopy } from '../content';
import { gsap, prefersReducedMotion } from '../lib/motion';
import { RevealLines, FadeIn, Eyebrow } from '../components/ui';
import { sceneAttr } from '../three/sceneBus';
import { getAssetUrl } from '../utils/osDetect';

// The app window tilts up out of the page and settles flat as you scroll.
export const Showcase: React.FC = () => {
  const c = useCopy();
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.app-frame',
        { rotateX: 32, scale: 0.86, y: 80 },
        { rotateX: 0, scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '.app-stage', start: 'top 95%', end: 'center 55%', scrub: 0.5 } });
      gsap.fromTo('.app-glow', { opacity: 0 },
        { opacity: 1, ease: 'none', scrollTrigger: { trigger: '.app-stage', start: 'top 80%', end: 'center 50%', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative z-10 py-36" {...sceneAttr({ morph: 0, chaos: 0.15, x: 0, y: -2.4, z: 12, opacity: 0.25 })}>
      <div className="shell text-center">
        <Eyebrow className="justify-center">{c.showcase.label}</Eyebrow>
        <RevealLines className="display mt-6 text-[calc(var(--display-scale)*clamp(44px,6.4vw,100px))]" lines={[c.showcase.title, <em key="b" className="text-fg-2">{c.showcase.titleB}</em>]} />
        <FadeIn className="mx-auto mt-6 max-w-lg"><p className="text-[17px] leading-relaxed text-fg-2">{c.showcase.sub}</p></FadeIn>
      </div>

      <div className="app-stage shell mt-20" style={{ perspective: '1600px' }}>
        <div className="relative">
          <div aria-hidden className="app-glow absolute -inset-x-10 -bottom-16 top-10 -z-10 rounded-[60px] blur-3xl"
            style={{ background: 'radial-gradient(60% 60% at 50% 60%, rgba(124,140,255,0.45), rgba(168,135,220,0.18) 50%, rgba(0,0,0,0) 75%)' }} />
          <figure className="app-frame overflow-hidden rounded-frame border border-white/15 bg-ink-900 p-1.5 [transform-origin:50%_100%] [transform-style:preserve-3d]">
            <img src={getAssetUrl('app/voice-models.png')} alt="The Beatrice voice changer app showing the voice library" className="w-full rounded-[22px]" loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
};
