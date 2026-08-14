import React, { useState } from 'react';
import { getOrgRepoUrl } from '../utils/githubData';
import { BotanicalDivider } from '../components/BotanicalDivider';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, ExternalLink, HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export const Docs: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryOptions: Array<{ key: string; label: string }> = [
    { key: 'all', label: t.docsPage.faqCats.all },
    { key: 'general', label: t.docsPage.faqCats.general },
    { key: 'hardware', label: t.docsPage.faqCats.hardware },
    { key: 'training', label: t.docsPage.faqCats.training },
    { key: 'streaming', label: t.docsPage.faqCats.streaming },
  ];

  const filteredFaqs = t.docsPage.faqs.filter((item) => {
    const matchesCat = selectedCategoryKey === 'all' || item.categoryKey === selectedCategoryKey;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block">
          {t.docsPage.tag}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary">
          {t.docsPage.title}
        </h1>
        <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
          {t.docsPage.subtitle}
        </p>
      </div>

      {/* Quick Start Guides Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* macOS Quickstart */}
        <div className="parchment-card rounded-3xl p-8 parchment-border space-y-4 shadow-ink-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-sepia-ink/10 text-sepia-ink border border-sepia-ink/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-ink-primary">{t.docsPage.macQuickTitle}</h3>
              <span className="font-mono text-xs text-botanical-forest font-semibold">Apple Silicon Metal / MPS</span>
            </div>
          </div>
          <p className="font-sans text-xs text-ink-secondary leading-relaxed">
            {t.docsPage.macQuickDesc}
          </p>
          <a
            href={getOrgRepoUrl('Beatrice-voicechanger-macos')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-sepia-ink hover:text-sepia-deep"
          >
            <span>{t.docsPage.macQuickBtn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Windows Quickstart */}
        <div className="parchment-card rounded-3xl p-8 parchment-border space-y-4 shadow-ink-md">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-sepia-ink/10 text-sepia-ink border border-sepia-ink/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-ink-primary">{t.docsPage.winQuickTitle}</h3>
              <span className="font-mono text-xs text-botanical-forest font-semibold">NVIDIA CUDA &amp; DirectML</span>
            </div>
          </div>
          <p className="font-sans text-xs text-ink-secondary leading-relaxed">
            {t.docsPage.winQuickDesc}
          </p>
          <a
            href={getOrgRepoUrl('Beatrice-voicechanger-windows')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-sepia-ink hover:text-sepia-deep"
          >
            <span>{t.docsPage.winQuickBtn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <BotanicalDivider label={t.docsPage.hardwareDivider} />

      {/* Hardware Comparison Table */}
      <section className="max-w-5xl mx-auto overflow-x-auto">
        <div className="parchment-card rounded-3xl p-6 parchment-border shadow-ink-lg">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-sepia-ink/20 font-mono text-[11px] uppercase tracking-wider text-sepia-ink">
                {t.docsPage.tableHeaders.map((header, idx) => (
                  <th key={idx} className="py-3 px-4">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sepia-ink/10 text-ink-primary">
              {t.docsPage.tableRows.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3.5 px-4 font-semibold text-sepia-ink">{row.label}</td>
                  <td className={`py-3.5 px-4 ${idx === 4 ? 'text-botanical-forest font-bold' : ''}`}>{row.mac}</td>
                  <td className={`py-3.5 px-4 ${idx === 4 ? 'text-botanical-forest font-bold' : ''}`}>{row.win}</td>
                  <td className="py-3.5 px-4">{row.cloud}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <BotanicalDivider label={t.docsPage.faqDivider} />

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {categoryOptions.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategoryKey(cat.key)}
                className={`px-4 py-2 rounded-full font-sans text-xs font-semibold transition-all ${
                  selectedCategoryKey === cat.key
                    ? 'bg-sepia-ink text-parchment-light shadow-ink-sm'
                    : 'bg-parchment-muted text-ink-secondary hover:text-sepia-ink border border-sepia-ink/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-sepia-ink absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.docsPage.faqSearchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-parchment-light border border-sepia-ink/20 rounded-xl font-sans text-xs text-ink-primary focus:outline-none focus:border-sepia-ink placeholder:text-ink-muted"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="parchment-card rounded-2xl border border-sepia-ink/15 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between font-sans text-base font-bold text-ink-primary hover:text-sepia-ink transition-colors text-left gap-4"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-sepia-ink shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-sepia-ink shrink-0" /> : <ChevronDown className="w-5 h-5 text-ink-muted shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 font-sans text-sm text-ink-secondary leading-relaxed border-t border-sepia-ink/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
