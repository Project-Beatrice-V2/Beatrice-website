import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Cpu, Mic, ExternalLink, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const PipelinePinned: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = t.howItWorksPage.pipelineStages;

  useEffect(() => {
    // Only initialize GSAP ScrollTrigger pin on desktop screens (>768px)
    if (window.innerWidth < 768) return;

    const pinSection = pinSectionRef.current;
    const container = containerRef.current;
    if (!pinSection || !container) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection,
          pin: true,
          start: 'top top+=80',
          end: '+=1800',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) setActiveStage(0);
            else if (p < 0.66) setActiveStage(1);
            else setActiveStage(2);
          },
        },
      });

      // Animate diagram elements based on progress
      timeline.to('.pipeline-progress-bar', { width: '100%', ease: 'none' });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  const icons = [<Scissors className="w-6 h-6" />, <Cpu className="w-6 h-6" />, <Mic className="w-6 h-6" />];

  return (
    <div ref={containerRef} className="w-full relative py-12">
      {/* Desktop GSAP Pinned Layout */}
      <div ref={pinSectionRef} className="hidden md:block min-h-[580px] w-full max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block mb-2">
            {t.howItWorksPage.pipelineTag}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-primary">
            {t.howItWorksPage.pipelineTitle}
          </h2>
        </div>

        {/* Stage Timeline Indicator */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          {/* Connecting Track Line (Anchored exactly at circle centers) */}
          <div className="absolute top-[18px] -translate-y-1/2 left-10 right-10 h-1 bg-parchment-muted rounded-full overflow-hidden border border-sepia-ink/15 z-0">
            <div
              className="h-full bg-sepia-ink transition-all duration-500 ease-out pipeline-progress-bar"
              style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Stepper Node Circles */}
          <div className="relative z-10 flex justify-between">
            {stages.map((stage, idx) => (
              <button
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                className="flex flex-col items-center gap-2 group transition-all w-20 text-center"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all border shrink-0 ${
                    activeStage === idx
                      ? 'bg-sepia-ink text-parchment-light border-sepia-deep shadow-ink-md scale-110'
                      : activeStage > idx
                      ? 'bg-botanical-sage text-white border-botanical-forest'
                      : 'bg-parchment-light text-sepia-ink border-sepia-ink/30'
                  }`}
                >
                  {stage.step}
                </div>
                <span
                  className={`font-sans text-xs font-semibold whitespace-nowrap ${
                    activeStage === idx ? 'text-sepia-ink font-bold' : 'text-ink-muted'
                  }`}
                >
                  {stage.shortLabel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Card */}
        <div className="relative min-h-[380px]">
          {stages.map((stage, idx) => {
            if (idx !== activeStage) return null;
            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="parchment-card rounded-3xl p-8 md:p-10 parchment-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-ink-lg"
              >
                {/* Left Details */}
                <div className="md:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sepia-ink/10 text-sepia-ink font-mono text-xs font-semibold">
                    <span>STAGE 0{stage.step}</span>
                    <span>•</span>
                    <span>{stage.repoName}</span>
                  </div>

                  <h3 className="font-display text-3xl font-bold text-ink-primary">
                    {stage.title}
                  </h3>

                  <p className="font-sans text-base text-ink-secondary leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {stage.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm font-sans text-ink-primary">
                        <CheckCircle2 className="w-4 h-4 text-botanical-sage shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <a
                      href={stage.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-sepia-ink hover:text-sepia-deep group"
                    >
                      <span>
                        {t.howItWorksPage.pipelineExploreBtn} ({stage.repoName})
                      </span>
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>

                {/* Right Diagram Engraving */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-parchment-muted/60 rounded-2xl border border-sepia-ink/15 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-sepia-ink/10 flex items-center justify-center text-sepia-ink mb-4 border border-sepia-ink/20 shadow-ink-sm">
                    {icons[idx]}
                  </div>
                  <span className="font-serif italic text-lg font-medium text-sepia-dark mb-1">
                    {stage.tagline}
                  </span>
                  <span className="font-mono text-xs text-ink-muted">
                    {t.howItWorksPage.pipelineCoreBadge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stacked Layout (<768px) */}
      <div className="block md:hidden px-4 space-y-6">
        <div className="text-center mb-6">
          <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block mb-1">
            {t.howItWorksPage.pipelineTag}
          </span>
          <h2 className="font-display text-3xl font-bold text-ink-primary">
            {t.howItWorksPage.pipelineTitle}
          </h2>
        </div>

        {stages.map((stage, idx) => (
          <motion.div
            key={stage.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            className="parchment-card rounded-2xl p-6 parchment-border space-y-4 shadow-ink-md"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-sepia-ink/10 flex items-center justify-center text-sepia-ink border border-sepia-ink/20">
                {icons[idx]}
              </div>
              <span className="font-mono text-xs font-bold text-sepia-ink bg-sepia-ink/10 px-2.5 py-1 rounded-full">
                STAGE 0{stage.step}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-ink-primary">
              {stage.title}
            </h3>

            <p className="font-sans text-sm text-ink-secondary leading-relaxed">
              {stage.description}
            </p>

            <ul className="space-y-2 pt-2">
              {stage.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-ink-primary">
                  <CheckCircle2 className="w-3.5 h-3.5 text-botanical-sage shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-sepia-ink/10">
              <a
                href={stage.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sepia-ink"
              >
                <span>
                  {t.howItWorksPage.pipelineExploreBtn} ({stage.repoName})
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
