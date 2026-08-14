import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MODULES, ORG_URL } from '../utils/githubData';
import { BotanicalDivider } from '../components/BotanicalDivider';
import { InkButton } from '../components/InkButton';
import { GithubIcon } from '../components/GithubIcon';
import { useLanguage } from '../context/LanguageContext';
import { useGitHubStars } from '../hooks/useGitHubStars';
import { Star, ArrowUpRight, Loader2 } from 'lucide-react';
import type { RepositoryModule } from '../types';

export const Modules: React.FC = () => {
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categoryMap: Record<string, string> = {
    All: t.modulesPage.cats.all,
    'Voice Changer': t.modulesPage.cats.vc,
    'Model Trainer': t.modulesPage.cats.trainer,
    'Dataset Web UI': t.modulesPage.cats.dataset,
    Cloud: t.modulesPage.cats.cloud,
  };

  const categories = ['All', 'Voice Changer', 'Model Trainer', 'Dataset Web UI', 'Cloud'];

  const filteredModules =
    filterCategory === 'All'
      ? MODULES
      : MODULES.filter((m) => m.category === filterCategory);

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block">
          {t.modulesPage.tag}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary">
          {t.modulesPage.title}
        </h1>
        <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
          {t.modulesPage.subtitle}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((catKey) => (
          <button
            key={catKey}
            onClick={() => setFilterCategory(catKey)}
            className={`px-4 py-2 rounded-full font-sans text-xs font-semibold transition-all ${
              filterCategory === catKey
                ? 'bg-sepia-ink text-parchment-light shadow-ink-sm'
                : 'bg-parchment-muted text-ink-secondary hover:text-sepia-ink hover:bg-parchment-dark/60 border border-sepia-ink/15'
            }`}
          >
            {categoryMap[catKey] || catKey}
          </button>
        ))}
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModules.map((module) => (
          <ModuleCard key={module.id} module={module} categoryMap={categoryMap} />
        ))}
      </div>

      <BotanicalDivider label="GitHub Organization Profile" />

      {/* Org Profile Card */}
      <section className="max-w-4xl mx-auto">
        <div className="parchment-card rounded-3xl p-8 parchment-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-ink-lg">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-ink-primary">
              {t.modulesPage.orgTitle}
            </h3>
            <p className="font-sans text-xs text-ink-secondary max-w-lg">
              {t.modulesPage.orgDesc}
            </p>
          </div>

          <InkButton
            asLink={ORG_URL}
            external
            variant="primary"
            size="md"
            icon={<GithubIcon className="w-4 h-4" />}
          >
            {t.modulesPage.orgBtn}
          </InkButton>
        </div>
      </section>
    </div>
  );
};

const ModuleCard: React.FC<{ module: RepositoryModule; categoryMap: Record<string, string> }> = ({
  module,
  categoryMap,
}) => {
  const { t } = useLanguage();
  const repoFullName = module.isHuggingFace
    ? 'SatiricalGuru/beatrice-voice-models'
    : `Project-Beatrice-V2/${module.repoName}`;

  const liveStars = useGitHubStars(repoFullName);
  const localizedDesc = t.modulesPage.descriptions[module.id] || module.description;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="parchment-card rounded-3xl p-6 md:p-8 parchment-border flex flex-col justify-between shadow-ink-md space-y-6"
    >
      <div className="space-y-4">
        {/* Top Row: Category & Stars */}
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sepia-ink/10 text-sepia-ink border border-sepia-ink/20">
            {categoryMap[module.category] || module.category}
          </span>

          <span className="font-mono text-xs text-ink-muted flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-field-gold text-field-gold" />
            {liveStars !== null ? (
              <span>{liveStars} stars</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted">
                <Loader2 className="w-3 h-3 animate-spin text-sepia-ink" /> Live GitHub Stars
              </span>
            )}
          </span>
        </div>

        {/* Module Name */}
        <h3 className="font-display text-2xl font-bold text-ink-primary">
          {module.name}
        </h3>

        {/* Repo Identifier */}
        <span className="font-mono text-xs text-sepia-ink font-semibold block">
          {repoFullName}
        </span>

        {/* Description */}
        <p className="font-sans text-xs text-ink-secondary leading-relaxed">
          {localizedDesc}
        </p>

        {/* Hardware Specs Card */}
        <div className="p-3 bg-parchment-muted/80 rounded-xl border border-sepia-ink/15 space-y-1.5 font-mono text-[11px] text-ink-primary">
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Platform:</span>
            <span className="font-semibold text-sepia-ink">{module.platform}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Acceleration:</span>
            <span className="font-semibold text-botanical-forest">{module.acceleration}</span>
          </div>
        </div>
      </div>

      {/* Footer Action Links */}
      <div className="pt-4 border-t border-sepia-ink/15 flex items-center justify-between gap-2">
        <a
          href={module.releaseUrl}
          download
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-sepia-ink hover:text-sepia-deep"
        >
          <span>{t.common.latestRelease}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <a
          href={module.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-parchment-muted hover:bg-sepia-ink hover:text-white transition-colors text-sepia-ink border border-sepia-ink/20 flex items-center justify-center"
          title="View Repository"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};
