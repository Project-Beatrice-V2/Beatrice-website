import React from 'react';
import { PipelinePinned } from '../components/PipelinePinned';
import { BotanicalDivider } from '../components/BotanicalDivider';
import { InkButton } from '../components/InkButton';
import { useLanguage } from '../context/LanguageContext';
import { Download, ExternalLink, CheckCircle2, Sliders, Mic, Cpu } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block">
          {t.howItWorksPage.tag}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary">
          {t.howItWorksPage.title}
        </h1>
        <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
          {t.howItWorksPage.subtitle}
        </p>
      </div>

      {/* GSAP Pinned / Stacked Pipeline Animation Component */}
      <PipelinePinned />

      <BotanicalDivider label="End-to-End Step-by-Step Workflow" />

      {/* Step-by-Step Written Walkthrough Section */}
      <section className="max-w-4xl mx-auto space-y-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-ink-primary">
            {t.howItWorksPage.guideTitle}
          </h2>
          <p className="font-sans text-sm text-ink-muted mt-1">
            Replicated from the official Project Beatrice V2 org documentation.
          </p>
        </div>

        <div className="space-y-8">
          {t.howItWorksPage.steps.map((step, idx) => (
            <div key={idx} className="parchment-card rounded-2xl p-6 md:p-8 parchment-border flex flex-col md:flex-row gap-6 shadow-ink-md">
              <div className={`w-12 h-12 rounded-2xl ${idx === 1 ? 'bg-botanical-sage text-white' : 'bg-sepia-ink text-parchment-light'} flex items-center justify-center font-mono font-bold text-xl shrink-0`}>
                {step.num}
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-2xl font-bold text-ink-primary">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                  {step.desc}
                </p>
                <ul className="space-y-1.5 font-sans text-xs text-ink-primary font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-botanical-sage" /> {step.f1}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-botanical-sage" /> {step.f2}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BotanicalDivider label="Technical System Architecture Diagram" />

      {/* Interactive SVG Architecture Diagram */}
      <section className="max-w-5xl mx-auto">
        <div className="parchment-card rounded-3xl p-6 md:p-10 parchment-border space-y-6 shadow-ink-lg">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block mb-1">
              {t.howItWorksPage.diagramSub}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-ink-primary">
              {t.howItWorksPage.diagramTitle}
            </h3>
          </div>

          <div className="relative py-8 px-4 bg-parchment-light rounded-2xl border border-sepia-ink/15 overflow-x-auto">
            <div className="min-w-[680px] flex items-center justify-between gap-4">
              {/* Node 1: Input Mic */}
              <div className="flex flex-col items-center p-4 bg-parchment-muted rounded-xl border border-sepia-ink/20 w-40 text-center">
                <Mic className="w-8 h-8 text-sepia-ink mb-2" />
                <span className="font-sans text-xs font-bold text-ink-primary">{t.howItWorksPage.nodes[0].title}</span>
                <span className="font-mono text-[10px] text-ink-muted">{t.howItWorksPage.nodes[0].sub}</span>
              </div>

              <div className="flex-1 h-0.5 bg-sepia-ink/30 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-8 border-l-sepia-ink" />
              </div>

              {/* Node 2: Beatrice Engine */}
              <div className="flex flex-col items-center p-5 bg-sepia-ink text-parchment-light rounded-2xl border border-sepia-deep w-48 text-center shadow-ink-md">
                <Cpu className="w-9 h-9 text-field-gold mb-2" />
                <span className="font-sans text-sm font-bold">{t.howItWorksPage.nodes[1].title}</span>
                <span className="font-mono text-[10px] text-parchment-muted/80 mt-1">{t.howItWorksPage.nodes[1].sub}</span>
              </div>

              <div className="flex-1 h-0.5 bg-sepia-ink/30 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-8 border-l-sepia-ink" />
              </div>

              {/* Node 3: Virtual Cable */}
              <div className="flex flex-col items-center p-4 bg-parchment-muted rounded-xl border border-sepia-ink/20 w-40 text-center">
                <Sliders className="w-8 h-8 text-botanical-forest mb-2" />
                <span className="font-sans text-xs font-bold text-ink-primary">{t.howItWorksPage.nodes[2].title}</span>
                <span className="font-mono text-[10px] text-ink-muted">{t.howItWorksPage.nodes[2].sub}</span>
              </div>

              <div className="flex-1 h-0.5 bg-sepia-ink/30 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-8 border-l-sepia-ink" />
              </div>

              {/* Node 4: Stream Target */}
              <div className="flex flex-col items-center p-4 bg-parchment-muted rounded-xl border border-sepia-ink/20 w-40 text-center">
                <ExternalLink className="w-8 h-8 text-sepia-ink mb-2" />
                <span className="font-sans text-xs font-bold text-ink-primary">{t.howItWorksPage.nodes[3].title}</span>
                <span className="font-mono text-[10px] text-ink-muted">{t.howItWorksPage.nodes[3].sub}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTAs */}
      <div className="text-center pt-8">
        <InkButton
          asLink="/download"
          variant="primary"
          size="lg"
          icon={<Download className="w-5 h-5" />}
        >
          {t.common.downloadMac}
        </InkButton>
      </div>
    </div>
  );
};
