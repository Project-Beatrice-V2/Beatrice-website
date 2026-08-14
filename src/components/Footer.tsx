import React from 'react';
import { Link } from 'react-router-dom';
import { HerbariumLogo } from './HerbariumLogo';
import { BotanicalDivider } from './BotanicalDivider';
import { GithubIcon } from './GithubIcon';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Terminal, ArrowUpRight } from 'lucide-react';
import { ORG_URL, LICENSE } from '../utils/githubData';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const sitemapItems = [
    { path: '/', label: t.nav.home },
    { path: '/how-it-works', label: t.nav.howItWorks },
    { path: '/download', label: t.nav.downloads },
    { path: '/modules', label: t.nav.modules },
    { path: '/showcase', label: t.nav.showcase },
    { path: '/docs', label: t.nav.docs },
    { path: '/about', label: t.nav.about },
  ];

  return (
    <footer className="w-full bg-parchment-muted/60 border-t border-sepia-ink/20 pt-12 pb-16 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BotanicalDivider label="Ex Herbarium Naturalis" className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-8">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <HerbariumLogo size="lg" />
            <p className="font-sans text-sm text-ink-secondary leading-relaxed max-w-md">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sepia-ink/10 text-sepia-ink border border-sepia-ink/20">
                <Shield className="w-3.5 h-3.5" />
                {LICENSE} License
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-botanical-sage/10 text-botanical-forest border border-botanical-sage/30">
                <Terminal className="w-3.5 h-3.5 text-botanical-sage" />
                v2.4.0 Release
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-sepia-ink">
              {t.footer.sitemapTitle}
            </h4>
            <ul className="space-y-2 text-sm font-sans font-medium text-ink-secondary">
              {sitemapItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="hover:text-sepia-ink transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Repositories & Resources */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-sepia-ink">
              {t.footer.githubTitle}
            </h4>
            <ul className="space-y-2 text-sm font-sans font-medium text-ink-secondary">
              <li>
                <a href="https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-macos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-sepia-ink transition-colors">
                  <span>Beatrice Voice Changer (macOS)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Project-Beatrice-V2/Beatrice-voicechanger-windows" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-sepia-ink transition-colors">
                  <span>Beatrice Voice Changer (Windows)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Project-Beatrice-V2/Beatrice-trainer-macos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-sepia-ink transition-colors">
                  <span>Beatrice Model Trainer (macOS)</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Project-Beatrice-V2/Beatrice-dataset-webui-macos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-sepia-ink transition-colors">
                  <span>Dataset Web UI</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Project-Beatrice-V2/Beatrice-colab" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-sepia-ink transition-colors">
                  <span>Beatrice Cloud Colab</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-sepia-ink/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-muted">
          <div className="flex items-center gap-1.5">
            <span>{t.footer.builtWith}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={ORG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-sepia-ink">
              <GithubIcon className="w-4 h-4" />
              <span>Project-Beatrice-V2</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
