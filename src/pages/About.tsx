import React from 'react';
import { BotanicalDivider } from '../components/BotanicalDivider';
import { useLanguage } from '../context/LanguageContext';
import { GithubIcon } from '../components/GithubIcon';
import { CONTRIBUTORS, ORIGINAL_WEBSITE_URL } from '../utils/githubData';
import { getAssetUrl } from '../utils/osDetect';
import { Shield, Users, Code, ExternalLink, UserCheck } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block">
          {t.aboutPage.tag}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary">
          {t.aboutPage.title}
        </h1>
        <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* Mission Story Section */}
      <section className="max-w-4xl mx-auto">
        <div className="parchment-card rounded-3xl p-8 md:p-12 parchment-border space-y-6 shadow-ink-lg">
          <span className="font-mono text-xs text-sepia-ink uppercase tracking-widest font-semibold block">
            {t.aboutPage.philosophyTag}
          </span>
          <h2 className="font-display text-3xl font-bold text-ink-primary">
            {t.aboutPage.philosophyTitle}
          </h2>
          <p className="font-sans text-base text-ink-secondary leading-relaxed">
            {t.aboutPage.philosophyDesc1}
          </p>
          <p className="font-sans text-base text-ink-secondary leading-relaxed">
            {t.aboutPage.philosophyDesc2}
          </p>
        </div>
      </section>

      <BotanicalDivider label={t.aboutPage.contributorsDivider} />

      {/* Core Contributors & Authors Grid */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-sage/10 text-botanical-forest font-mono text-xs font-semibold border border-botanical-sage/30">
            <Users className="w-3.5 h-3.5 text-botanical-forest" />
            <span>{t.aboutPage.contributorsTag}</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-ink-primary">
            {t.aboutPage.contributorsTitle}
          </h2>
          <p className="font-sans text-xs text-ink-muted">
            {t.aboutPage.contributorsSubtitle}{' '}
            <a
              href={ORIGINAL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-sepia-ink font-semibold"
            >
              prj-beatrice.com
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTRIBUTORS.map((c) => (
            <div
              key={c.id}
              className={`parchment-card rounded-2xl p-6 parchment-border flex flex-col justify-between shadow-ink-md space-y-4 transition-all ${
                c.isYou ? 'ring-2 ring-sepia-ink/40 bg-sepia-ink/5' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {c.avatarUrl ? (
                      <img
                        src={getAssetUrl(c.avatarUrl)}
                        alt={c.name}
                        className="w-10 h-10 rounded-full border border-sepia-ink/20 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-sepia-ink/10 flex items-center justify-center font-mono text-xs font-bold text-sepia-ink border border-sepia-ink/20">
                        {c.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink-primary leading-tight">
                        {c.name}
                      </h3>
                      <span className="font-mono text-[11px] text-sepia-ink font-medium block">
                        {c.role}
                      </span>
                    </div>
                  </div>

                  {c.isYou && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sepia-ink text-parchment-light font-bold flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> {t.aboutPage.maintainerBadge}
                    </span>
                  )}
                </div>

                <p className="font-sans text-xs text-ink-secondary leading-relaxed pt-1">
                  {c.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-sepia-ink/15 flex items-center gap-3 text-xs font-mono">
                {c.githubUrl && (
                  <a
                    href={c.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sepia-ink hover:text-sepia-deep font-semibold"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>{t.aboutPage.githubProfileBtn}</span>
                  </a>
                )}
                {c.websiteUrl && (
                  <a
                    href={c.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sepia-ink hover:text-sepia-deep font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t.aboutPage.websiteBtn}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <BotanicalDivider label={t.aboutPage.licenseDivider} />

      {/* MIT License & Open Source Principles Grid */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.aboutPage.principles.map((p, idx) => {
          const icons = [
            <Shield className="w-5 h-5 text-sepia-ink" />,
            <Users className="w-5 h-5 text-botanical-forest" />,
            <Code className="w-5 h-5 text-sepia-ink" />,
          ];
          const bgColors = [
            'bg-sepia-ink/10',
            'bg-botanical-sage/15',
            'bg-sepia-ink/10',
          ];
          return (
            <div key={idx} className="parchment-card rounded-2xl p-6 parchment-border space-y-3 shadow-ink-md">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColors[idx]}`}>
                {icons[idx]}
              </div>
              <h3 className="font-display text-xl font-bold text-ink-primary">{p.title}</h3>
              <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                {p.desc}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};
