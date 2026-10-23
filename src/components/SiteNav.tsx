import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Star } from 'lucide-react';
import { useCopy } from '../content';
import { useLanguage, type SupportedLanguage } from '../context/LanguageContext';
import { useGitHubStars } from '../hooks/useGitHubStars';
import { LogoMark, GithubMark } from './ui';
import { scrollToTarget } from '../lib/motion';
import { ORG_URL } from '../lib/downloads';

const LANGS: { code: SupportedLanguage; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
];

export const LanguageSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={`flex items-center rounded-full border border-hairline p-0.5 ${className}`} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLanguage(l.code)}
          aria-pressed={language === l.code}
          className={`h-7 rounded-full px-2.5 text-[12px] transition-colors ${language === l.code ? 'bg-white/10 text-white' : 'text-fg-3 hover:text-white'}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

export const SiteNav: React.FC = () => {
  const c = useCopy();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const stars = useGitHubStars('Project-Beatrice-V2/Beatrice-voicechanger-macos');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const go = (id: string) => {
    setOpen(false);
    if (pathname === '/') scrollToTarget(`#${id}`);
    else navigate(`/#${id}`);
  };

  const links = [
    { id: 'voices', label: c.nav.voices },
    { id: 'how', label: c.nav.how },
    { id: 'features', label: c.nav.features },
    { id: 'create', label: c.nav.create },
    { id: 'faq', label: c.nav.faq },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className={`mx-auto flex h-14 max-w-content items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 ${scrolled || open ? 'glass' : 'border border-transparent'}`}
        aria-label="Main"
      >
        <Link to="/" className="flex items-center gap-2.5 text-white" aria-label="Beatrice home">
          <LogoMark className="h-7 w-7" />
          <span className="text-[17px] font-semibold tracking-tightish">Beatrice</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} className="rounded-full px-3.5 py-2 text-[14px] text-fg-2 transition-colors hover:text-white">
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitch className="hidden md:flex" />
          <a href={ORG_URL} target="_blank" rel="noreferrer" className="btn-ghost btn-sm hidden sm:inline-flex" aria-label="GitHub">
            <GithubMark />
            {stars !== null && (
              <span className="flex items-center gap-1 font-mono text-[12px] text-fg-2">
                <Star className="h-3 w-3" /> {stars}
              </span>
            )}
          </a>
          <Link to="/download" className="btn-primary btn-sm">{c.nav.download}</Link>
          <button className="btn-ghost h-9 w-9 lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 max-w-content rounded-card p-3 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.id}>
                <button onClick={() => go(l.id)} className="w-full rounded-xl px-4 py-3 text-left text-[17px] text-white hover:bg-white/5">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-hairline px-2 pt-3">
            <LanguageSwitch />
            <a href={ORG_URL} target="_blank" rel="noreferrer" className="btn-ghost btn-sm"><GithubMark /> {c.nav.github}</a>
          </div>
        </div>
      )}
    </header>
  );
};
