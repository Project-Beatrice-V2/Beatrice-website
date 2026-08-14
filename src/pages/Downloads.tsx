import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InkButton } from '../components/InkButton';
import { BotanicalDivider } from '../components/BotanicalDivider';
import { useLanguage } from '../context/LanguageContext';
import { detectOS, getOrgRepoUrl } from '../utils/osDetect';
import { MODULES } from '../utils/githubData';
import { Download, Cpu, HardDrive, CheckCircle2, ChevronDown, ChevronUp, CloudLightning, Terminal } from 'lucide-react';

export const Downloads: React.FC = () => {
  const { t } = useLanguage();
  const [selectedOS, setSelectedOS] = useState<'macOS' | 'Windows'>('macOS');
  const [openStep, setOpenStep] = useState<number | null>(1);

  useEffect(() => {
    const os = detectOS();
    if (os === 'Windows') {
      setSelectedOS('Windows');
    } else {
      setSelectedOS('macOS');
    }
  }, []);

  const macModules = MODULES.filter((m) => m.platform === 'macOS' || m.platform === 'Cross-platform');
  const winModules = MODULES.filter((m) => m.platform === 'Windows' || m.platform === 'Cross-platform');

  const activeModules = selectedOS === 'macOS' ? macModules : winModules;
  const activeSteps = selectedOS === 'macOS' ? t.downloadsPage.macSteps : t.downloadsPage.winSteps;

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block">
          {t.downloadsPage.tag}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary">
          {t.downloadsPage.title}
        </h1>
        <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
          {t.downloadsPage.subtitle}
        </p>
      </div>

      {/* OS Switcher Tabs */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 bg-parchment-muted rounded-2xl border border-sepia-ink/20 shadow-ink-sm">
          <button
            onClick={() => setSelectedOS('macOS')}
            className={`px-8 py-3 rounded-xl font-sans text-sm font-semibold transition-all flex items-center gap-2 ${
              selectedOS === 'macOS'
                ? 'bg-sepia-ink text-parchment-light shadow-ink-md'
                : 'text-ink-secondary hover:text-sepia-ink'
            }`}
          >
            <AppleIcon className="w-4 h-4" />
            <span>macOS (Apple Silicon MPS)</span>
          </button>

          <button
            onClick={() => setSelectedOS('Windows')}
            className={`px-8 py-3 rounded-xl font-sans text-sm font-semibold transition-all flex items-center gap-2 ${
              selectedOS === 'Windows'
                ? 'bg-sepia-ink text-parchment-light shadow-ink-md'
                : 'text-ink-secondary hover:text-sepia-ink'
            }`}
          >
            <WindowsIcon className="w-4 h-4" />
            <span>Windows (CUDA / DirectML)</span>
          </button>
        </div>
      </div>

      {/* Downloads Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {activeModules.map((mod) => {
          const localizedDesc = t.modulesPage.descriptions[mod.id] || mod.description;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="parchment-card rounded-3xl p-6 md:p-8 parchment-border flex flex-col justify-between shadow-ink-lg space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sepia-ink/10 text-sepia-ink border border-sepia-ink/20">
                    {mod.category}
                  </span>
                  <span className="font-mono text-xs text-botanical-forest font-bold">
                    {mod.platform}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-ink-primary">
                  {mod.name}
                </h3>

                <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                  {localizedDesc}
                </p>

                {/* Hardware Specs List */}
                <div className="p-4 bg-parchment-muted/60 rounded-2xl border border-sepia-ink/15 space-y-2 font-mono text-[11px] text-ink-primary">
                  <div className="flex items-start gap-2">
                    <Cpu className="w-3.5 h-3.5 text-sepia-ink shrink-0 mt-0.5" />
                    <span><strong>{t.downloadsPage.specLabels.acceleration}</strong> {mod.requirements.chipGpu}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-sepia-ink shrink-0 mt-0.5" />
                    <span><strong>{t.downloadsPage.specLabels.memory}</strong> {mod.requirements.ram}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-botanical-sage shrink-0 mt-0.5" />
                    <span><strong>{t.downloadsPage.specLabels.os}</strong> {mod.requirements.osVersion}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <InkButton
                  asLink={mod.releaseUrl}
                  external
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={<Download className="w-4 h-4" />}
                >
                  {t.common.downloadLatest}
                </InkButton>

                <a
                  href={mod.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center font-mono text-xs font-semibold text-sepia-ink hover:text-sepia-deep pt-1"
                >
                  {t.common.viewSource}
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      <BotanicalDivider label={t.downloadsPage.colabDivider} />

      {/* Cloud Training Colab Card */}
      <section className="max-w-4xl mx-auto">
        <div className="parchment-card rounded-3xl p-8 md:p-10 parchment-border grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-ink-lg bg-gradient-to-br from-parchment-light via-parchment-base to-parchment-muted">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field-gold/15 text-sepia-dark font-mono text-xs font-semibold border border-field-gold/30">
              <CloudLightning className="w-3.5 h-3.5 text-field-gold" />
              <span>{t.downloadsPage.colabBadge}</span>
            </div>

            <h3 className="font-display text-3xl font-bold text-ink-primary">
              {t.downloadsPage.colabTitle}
            </h3>

            <p className="font-sans text-sm text-ink-secondary leading-relaxed">
              {t.downloadsPage.colabDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-muted">
              {t.downloadsPage.colabBullets.map((bullet, idx) => (
                <span key={idx}>{bullet}</span>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3">
            <InkButton
              asLink={getOrgRepoUrl('Beatrice-colab')}
              external
              variant="primary"
              size="md"
              icon={<Terminal className="w-4 h-4" />}
            >
              {t.downloadsPage.colabBtn}
            </InkButton>
            <span className="font-mono text-[11px] text-ink-muted">Project-Beatrice-V2/Beatrice-colab</span>
          </div>
        </div>
      </section>

      <BotanicalDivider label={t.downloadsPage.stepperDivider} />

      {/* Installation Quick Steps Stepper */}
      <section className="max-w-3xl mx-auto space-y-4">
        <div className="text-center mb-6">
          <h3 className="font-display text-2xl font-bold text-ink-primary">
            {t.downloadsPage.stepperTitle} {selectedOS}
          </h3>
          <p className="font-sans text-xs text-ink-muted">
            {t.downloadsPage.stepperSub}
          </p>
        </div>

        <div className="space-y-3">
          {activeSteps.map((step) => (
            <AccordionStep
              key={step.step}
              step={step.step}
              isOpen={openStep === step.step}
              onClick={() => setOpenStep(openStep === step.step ? null : step.step)}
              title={step.title}
              content={step.content}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const AccordionStep: React.FC<{ step: number; title: string; content: string; isOpen: boolean; onClick: () => void }> = ({
  title,
  content,
  isOpen,
  onClick,
}) => {
  return (
    <div className="parchment-card rounded-2xl border border-sepia-ink/15 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between font-sans text-base font-semibold text-ink-primary hover:text-sepia-ink transition-colors text-left"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-sepia-ink" /> : <ChevronDown className="w-5 h-5 text-ink-muted" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 font-sans text-xs text-ink-secondary leading-relaxed border-t border-sepia-ink/10 pt-3">
          {content}
        </div>
      )}
    </div>
  );
};

const AppleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.2.67-2.91 1.5-.64.74-1.2 1.92-1.05 3.06 1.12.09 2.3-.62 2.97-1.44z"/>
  </svg>
);

const WindowsIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
    <path d="M0 3.449L9.75 2.1v9.451H0m10.95-9.6L24 0v11.4H10.95M0 12.6h9.75v9.451L0 20.699M10.95 12.6H24V24l-13.05-1.8"/>
  </svg>
);
