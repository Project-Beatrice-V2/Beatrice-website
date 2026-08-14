import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HerbariumLogo } from './HerbariumLogo';
import { InkButton } from './InkButton';
import { GithubIcon } from './GithubIcon';
import { useLanguage } from '../context/LanguageContext';
import { detectOS, getLatestReleaseUrl } from '../utils/osDetect';
import { Download, Menu, X, ChevronRight, Globe } from 'lucide-react';
import type { OperatingSystem } from '../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [detectedOS, setDetectedOS] = useState<OperatingSystem>('macOS');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    setDetectedOS(detectOS());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/how-it-works', label: t.nav.howItWorks },
    { path: '/download', label: t.nav.downloads },
    { path: '/modules', label: t.nav.modules },
    { path: '/showcase', label: t.nav.showcase },
    { path: '/docs', label: t.nav.docs },
    { path: '/about', label: t.nav.about },
  ];

  const targetReleaseRepo =
    detectedOS === 'Windows'
      ? 'Beatrice-voicechanger-windows'
      : 'Beatrice-voicechanger-macos';

  const downloadUrl = getLatestReleaseUrl(targetReleaseRepo);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-parchment-base/90 backdrop-blur-md border-b border-sepia-ink/15 shadow-ink-sm py-2.5'
          : 'bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <HerbariumLogo size="md" />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-parchment-muted/60 px-4 py-1.5 rounded-full border border-sepia-ink/15 shadow-ink-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full font-sans text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-parchment-light text-sepia-ink shadow-ink-sm font-semibold border border-sepia-ink/20'
                    : 'text-ink-secondary hover:text-sepia-ink hover:bg-parchment-light/50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions: Language Selector, GitHub, Download */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Multilingual Selector Toggle (English / 日本語 / 中文) */}
          <div className="flex items-center bg-parchment-muted/80 rounded-full border border-sepia-ink/20 p-1 text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-sepia-ink ml-2 mr-1" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                language === 'en'
                  ? 'bg-sepia-ink text-parchment-light shadow-ink-sm'
                  : 'text-ink-muted hover:text-sepia-ink'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ja')}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                language === 'ja'
                  ? 'bg-sepia-ink text-parchment-light shadow-ink-sm'
                  : 'text-ink-muted hover:text-sepia-ink'
              }`}
            >
              日本語
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`px-2 py-0.5 rounded-full font-semibold transition-all ${
                language === 'zh'
                  ? 'bg-sepia-ink text-parchment-light shadow-ink-sm'
                  : 'text-ink-muted hover:text-sepia-ink'
              }`}
            >
              中文
            </button>
          </div>

          <a
            href="https://github.com/Project-Beatrice-V2"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-sepia-ink hover:bg-sepia-ink/10 transition-colors border border-sepia-ink/20 flex items-center justify-center"
            title="Project Beatrice V2 on GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <InkButton
            asLink={downloadUrl}
            external
            variant="primary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
          >
            {detectedOS === 'Windows' ? 'Windows' : 'macOS'}
          </InkButton>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-sepia-ink hover:bg-sepia-ink/10 transition-colors border border-sepia-ink/20"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-parchment-base/98 backdrop-blur-xl border-b border-sepia-ink/20 p-6 shadow-ink-lg space-y-4 animate-in slide-in-from-top duration-300">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between p-2 bg-parchment-muted rounded-xl border border-sepia-ink/15">
            <span className="font-mono text-xs font-semibold text-sepia-ink flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> Language / 言語 / 语言:
            </span>
            <div className="flex gap-1 font-mono text-xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  language === 'en' ? 'bg-sepia-ink text-parchment-light' : 'text-ink-muted'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ja')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  language === 'ja' ? 'bg-sepia-ink text-parchment-light' : 'text-ink-muted'
                }`}
              >
                日本語
              </button>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  language === 'zh' ? 'bg-sepia-ink text-parchment-light' : 'text-ink-muted'
                }`}
              >
                中文
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-sans text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-sepia-ink/15 text-sepia-ink font-semibold border border-sepia-ink/30'
                      : 'text-ink-primary hover:bg-parchment-muted'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-sepia-ink/60" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-sepia-ink/15 space-y-3">
            <InkButton
              asLink={downloadUrl}
              external
              variant="primary"
              size="md"
              className="w-full"
              icon={<Download className="w-4 h-4" />}
            >
              {detectedOS === 'Windows' ? 'Download for Windows' : 'Download for macOS'}
            </InkButton>

            <a
              href="https://github.com/Project-Beatrice-V2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-sepia-ink/30 font-sans text-sm font-semibold text-sepia-ink hover:bg-sepia-ink/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View GitHub Organization</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
