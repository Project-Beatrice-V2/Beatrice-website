import React from 'react';
import { Link } from 'react-router-dom';
import { useCopy } from '../content';
import { LogoMark } from './ui';
import { LanguageSwitch } from './SiteNav';
import { ORG_URL, repoUrl } from '../lib/downloads';

export const SiteFooter: React.FC = () => {
  const c = useCopy();
  const f = c.footer;
  const col = (title: string, items: { label: string; href: string; internal?: boolean }[]) => (
    <div>
      <div className="eyebrow mb-5">{title}</div>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.label}>
            {it.internal ? (
              <Link to={it.href} className="text-[15px] text-fg-2 transition-colors hover:text-white">{it.label}</Link>
            ) : (
              <a href={it.href} target="_blank" rel="noreferrer" className="text-[15px] text-fg-2 transition-colors hover:text-white">{it.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="relative z-10 overflow-hidden border-t border-hairline bg-black">
      <div className="shell grid gap-12 pb-10 pt-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link to="/" className="flex items-center gap-2.5">
            <LogoMark className="h-8 w-8" />
            <span className="text-[19px] font-semibold tracking-tightish">Beatrice</span>
          </Link>
          <p className="mt-4 text-[15px] leading-relaxed text-fg-2">{f.tagline}</p>
          <div className="mt-6">
            <div className="eyebrow mb-3">{f.language}</div>
            <LanguageSwitch />
          </div>
        </div>
        {col(f.product, [
          { label: f.links.download, href: '/download', internal: true },
          { label: f.links.voices, href: '/voices', internal: true },
          { label: f.links.how, href: '/#how', internal: true },
          { label: f.links.faq, href: '/#faq', internal: true },
        ])}
        {col(f.ecosystem, [
          { label: f.links.trainer, href: repoUrl('Beatrice-trainer-macos') },
          { label: f.links.colab, href: repoUrl('Beatrice-colab') },
          { label: f.links.dataset, href: repoUrl('Beatrice-dataset-webui-macos') },
          { label: f.links.models, href: repoUrl('Beatrice-voice-models') },
        ])}
        {col(f.project, [
          { label: f.links.org, href: ORG_URL },
          { label: f.links.issues, href: repoUrl('Beatrice-voicechanger-macos') + '/issues' },
          { label: f.links.license, href: repoUrl('Beatrice-voicechanger-macos') + '/blob/main/LICENSE' },
          { label: f.links.original, href: 'https://prj-beatrice.com/' },
        ])}
      </div>
      <div className="shell flex flex-col gap-3 border-t border-hairline py-6 text-[13px] text-fg-3 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Project Beatrice V2 · MIT License</span>
        <span className="max-w-xl md:text-right">{f.credits}</span>
      </div>
      <div aria-hidden className="pointer-events-none select-none px-2 text-center font-serif font-semibold leading-[0.8] text-transparent"
        style={{ fontSize: 'clamp(96px, 22vw, 360px)', letterSpacing: '-0.05em', backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0))', WebkitBackgroundClip: 'text', backgroundClip: 'text', marginBottom: '-0.12em' }}>
        Beatrice
      </div>
    </footer>
  );
};
