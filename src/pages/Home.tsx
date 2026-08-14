import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroCanvas } from '../components/HeroCanvas';
import { InkButton } from '../components/InkButton';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { BotanicalDivider } from '../components/BotanicalDivider';
import { WaveformPlayer } from '../components/WaveformPlayer';
import { GithubIcon } from '../components/GithubIcon';
import { useLanguage } from '../context/LanguageContext';
import { useGitHubStars } from '../hooks/useGitHubStars';
import { detectOS, getLatestReleaseUrl, getAssetUrl } from '../utils/osDetect';
import { MODULES, AUDIO_SAMPLES } from '../utils/githubData';
import { Download, ArrowRight, CheckCircle2, Globe, Star, Loader2, Sliders, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { OperatingSystem } from '../types';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const [userOS, setUserOS] = useState<OperatingSystem>('macOS');

  useEffect(() => {
    setUserOS(detectOS());
  }, []);

  const macReleaseUrl = getLatestReleaseUrl('Beatrice-voicechanger-macos');
  const winReleaseUrl = getLatestReleaseUrl('Beatrice-voicechanger-windows');

  const featuredModules = MODULES.filter((m) => m.featured);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-4 pb-14 md:pt-6 md:pb-20 text-center overflow-hidden">
        <HeroCanvas />

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          {/* Unboxed Architectural Brand Mark */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3"
          >
            <img
              src={getAssetUrl('/beatrice-logo.png')}
              alt="Project Beatrice V2 Logo"
              className="w-12 h-12 object-contain rounded-xl border border-sepia-ink/15 shadow-sm"
            />
            <div className="text-left">
              <span className="font-mono text-xs text-sepia-ink font-bold tracking-[0.2em] uppercase block">
                PROJECT BEATRICE V2
              </span>
              <span className="font-mono text-[11px] text-ink-muted tracking-wider uppercase block">
                Sub-50ms Neural Voice Conversion Engine
              </span>
            </div>
          </motion.div>

          {/* Animated Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-primary leading-[1.1]"
          >
            {t.hero.title1} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sepia-dark via-sepia-ink to-field-gold bg-clip-text text-transparent italic font-serif">
              {t.hero.title2}
            </span>
          </motion.h1>

          {/* Value Proposition Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-lg sm:text-xl text-ink-secondary max-w-3xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Primary Call To Action Buttons (OS Aware) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <InkButton
              asLink={macReleaseUrl}
              external
              variant={userOS === 'macOS' || userOS === 'unknown' ? 'primary' : 'outline'}
              size="lg"
              icon={<Download className="w-5 h-5" />}
            >
              {t.common.downloadMac}
            </InkButton>

            <InkButton
              asLink={winReleaseUrl}
              external
              variant={userOS === 'Windows' ? 'primary' : 'outline'}
              size="lg"
              icon={<Download className="w-5 h-5" />}
            >
              {t.common.downloadWin}
            </InkButton>

            <InkButton
              asLink="https://github.com/Project-Beatrice-V2"
              external
              variant="secondary"
              size="lg"
              icon={<GithubIcon className="w-5 h-5" />}
            >
              {t.common.githubOrg}
            </InkButton>
          </motion.div>

          {/* Platform Compatibility Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-ink-muted pt-6"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-sage" /> macOS Metal / MPS
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-botanical-sage" /> Windows CUDA / DirectML
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-botanical-sage" /> {t.common.supportedLangs}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Marquee Strip */}
      <MarqueeStrip />

      {/* Botanical Section Divider */}
      <BotanicalDivider label={t.pillars.sectionTag} />

      {/* What It Does / Value Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block mb-2">
            {t.pillars.sectionTag}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-primary">
            {t.pillars.sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="parchment-card rounded-3xl p-8 parchment-border space-y-4 shadow-ink-md"
          >
            <div className="w-14 h-14 rounded-2xl bg-sepia-ink/10 flex items-center justify-center text-sepia-ink border border-sepia-ink/20">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink-primary">
              {t.pillars.p1Title}
            </h3>
            <p className="font-sans text-sm text-ink-secondary leading-relaxed">
              {t.pillars.p1Desc}
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="parchment-card rounded-3xl p-8 parchment-border space-y-4 shadow-ink-md"
          >
            <div className="w-14 h-14 rounded-2xl bg-botanical-sage/15 flex items-center justify-center text-botanical-forest border border-botanical-sage/30">
              <Sliders className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink-primary">
              {t.pillars.p2Title}
            </h3>
            <p className="font-sans text-sm text-ink-secondary leading-relaxed">
              {t.pillars.p2Desc}
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="parchment-card rounded-3xl p-8 parchment-border space-y-4 shadow-ink-md"
          >
            <div className="w-14 h-14 rounded-2xl bg-sepia-ink/10 flex items-center justify-center text-sepia-ink border border-sepia-ink/20">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink-primary">
              {t.pillars.p3Title}
            </h3>
            <p className="font-sans text-sm text-ink-secondary leading-relaxed">
              {t.pillars.p3Desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Botanical Section Divider */}
      <BotanicalDivider label={t.audition.sectionTag} />

      {/* Live Demo / Waveform Teaser Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block mb-2">
            {t.audition.sectionTag}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-primary">
            {t.audition.sectionTitle}
          </h2>
          <p className="font-sans text-base text-ink-secondary mt-2">
            {t.audition.subtitle}
          </p>
        </div>

        <WaveformPlayer sample={AUDIO_SAMPLES[0]} />

        <div className="text-center mt-6">
          <Link
            to="/showcase"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-sepia-ink hover:text-sepia-deep group"
          >
            <span>{t.audition.moreBtn}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Botanical Section Divider */}
      <BotanicalDivider label={t.featuredModules.sectionTag} />

      {/* Featured Repositories Teaser Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block mb-1">
              {t.featuredModules.sectionTag}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-primary">
              {t.featuredModules.sectionTitle}
            </h2>
          </div>

          <Link
            to="/modules"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-sepia-ink hover:text-sepia-deep"
          >
            <span>{t.featuredModules.exploreBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredModules.map((module) => (
            <HomeFeaturedModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      {/* Final Call To Action Band */}
      <section className="w-full bg-sepia-ink text-parchment-light py-16 md:py-24 my-16 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="font-mono text-xs text-field-gold tracking-widest uppercase font-semibold block">
            {t.cta.tag}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            {t.cta.title}
          </h2>
          <p className="font-sans text-base sm:text-lg text-parchment-muted/90 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <InkButton
              asLink={macReleaseUrl}
              external
              variant="secondary"
              size="lg"
              icon={<Download className="w-5 h-5" />}
            >
              {t.cta.btnMac}
            </InkButton>
            <InkButton
              asLink={winReleaseUrl}
              external
              variant="secondary"
              size="lg"
              icon={<Download className="w-5 h-5" />}
            >
              {t.cta.btnWin}
            </InkButton>
          </div>
        </div>
      </section>
    </div>
  );
};

const HomeFeaturedModuleCard: React.FC<{ module: any }> = ({ module }) => {
  const repoFullName = `Project-Beatrice-V2/${module.repoName}`;
  const liveStars = useGitHubStars(repoFullName, module.stars);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="parchment-card rounded-2xl p-6 parchment-border flex flex-col justify-between shadow-ink-md space-y-4"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-sepia-ink/10 text-sepia-ink border border-sepia-ink/20">
            {module.platform}
          </span>
          <span className="font-mono text-xs text-ink-muted flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-field-gold text-field-gold" />
            {liveStars !== null ? (
              <span>{liveStars} stars</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-muted">
                <Loader2 className="w-3 h-3 animate-spin text-sepia-ink" /> Live Stars
              </span>
            )}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-ink-primary mb-2">
          {module.name}
        </h3>

        <p className="font-sans text-xs text-ink-secondary leading-relaxed">
          {module.description}
        </p>
      </div>

      <div className="pt-4 border-t border-sepia-ink/15 flex items-center justify-between">
        <span className="font-mono text-[11px] text-botanical-forest font-medium">
          {module.acceleration}
        </span>
        <a
          href={module.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-sepia-ink hover:bg-sepia-ink/10 transition-colors flex items-center justify-center"
          title="View Repository"
        >
          <GithubIcon className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};
