import React, { useState } from 'react';
import { VideoSection } from '../components/VideoSection';
import { WaveformPlayer } from '../components/WaveformPlayer';
import { BotanicalDivider } from '../components/BotanicalDivider';
import { AUDIO_SAMPLES, PRETRAINED_MODELS, HF_MODELS_URL } from '../utils/githubData';
import { InkButton } from '../components/InkButton';
import { useLanguage } from '../context/LanguageContext';
import { Radio, MessageSquare, MonitorPlay, Download, ExternalLink, Disc } from 'lucide-react';

export const Showcase: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block">
          {t.showcasePage.tag}
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-primary">
          {t.showcasePage.title}
        </h1>
        <p className="font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
          {t.showcasePage.subtitle}
        </p>
      </div>

      {/* Main Video Demonstration Component */}
      <VideoSection
        title={t.showcasePage.videoTitle}
        subtitle={t.showcasePage.videoSubtitle}
      />

      <BotanicalDivider label={t.showcasePage.auditionDivider} />

      {/* Interactive Voice Sample Selector & Waveform Player */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {AUDIO_SAMPLES.map((sample, idx) => (
            <button
              key={sample.id}
              onClick={() => setSelectedSampleIndex(idx)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold transition-all ${
                selectedSampleIndex === idx
                  ? 'bg-sepia-ink text-parchment-light shadow-ink-sm scale-105'
                  : 'bg-parchment-muted text-ink-secondary hover:text-sepia-ink border border-sepia-ink/15'
              }`}
            >
              {sample.title} ({sample.latencyMs}ms)
            </button>
          ))}
        </div>

        <WaveformPlayer sample={AUDIO_SAMPLES[selectedSampleIndex]} />
      </section>

      <BotanicalDivider label={t.showcasePage.hfDivider} />

      {/* Hugging Face Voice Models Library Grid */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-field-gold/15 text-sepia-dark font-mono text-xs font-semibold border border-field-gold/30">
            <Disc className="w-3.5 h-3.5 text-field-gold" />
            <span>{t.showcasePage.hfBadge}</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-ink-primary">
            {t.showcasePage.hfTitle}
          </h2>
          <p className="font-sans text-xs text-ink-muted">
            {t.showcasePage.hfDesc} <code className="font-mono text-sepia-ink font-semibold">SatiricalGuru/beatrice-voice-models</code>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRETRAINED_MODELS.map((model) => (
            <div
              key={model.id}
              className="parchment-card rounded-2xl p-6 parchment-border flex flex-col justify-between shadow-ink-md space-y-4"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-sepia-ink/10 text-sepia-ink border border-sepia-ink/20 shrink-0">
                    {model.gender} • {model.language}
                  </span>
                  <span className="font-mono text-[11px] text-botanical-forest font-semibold shrink-0">
                    {model.sampleRate}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-ink-primary">
                  {model.name}
                </h3>

                <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                  {model.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {model.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-parchment-muted text-ink-muted border border-sepia-ink/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-sepia-ink/15 flex items-center justify-between">
                <span className="font-mono text-[11px] text-ink-muted">By {model.author}</span>
                <a
                  href={model.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sepia-ink text-parchment-light text-xs font-sans font-semibold hover:bg-sepia-deep transition-colors shadow-ink-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.showcasePage.hfGetWeights}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <InkButton
            asLink={HF_MODELS_URL}
            external
            variant="secondary"
            size="md"
            icon={<ExternalLink className="w-4 h-4" />}
          >
            {t.showcasePage.hfVisitBtn}
          </InkButton>
        </div>
      </section>

      <BotanicalDivider label={t.showcasePage.integrationsDivider} />

      {/* Streaming App Integrations Grid */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-ink-primary">
            {t.showcasePage.integrationsTitle}
          </h2>
          <p className="font-sans text-xs text-ink-muted mt-1">
            {t.showcasePage.integrationsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.showcasePage.apps.map((app, idx) => {
            const icons = [
              <MessageSquare className="w-6 h-6" />,
              <MonitorPlay className="w-6 h-6" />,
              <Radio className="w-6 h-6" />,
            ];
            const colors = [
              'bg-indigo-100 text-indigo-800 border-indigo-200',
              'bg-slate-200 text-slate-900 border-slate-300',
              'bg-amber-100 text-amber-900 border-amber-200',
            ];
            return (
              <div key={idx} className="parchment-card rounded-2xl p-6 parchment-border space-y-4 shadow-ink-md">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colors[idx]}`}>
                  {icons[idx]}
                </div>
                <h3 className="font-display text-xl font-bold text-ink-primary">{app.title}</h3>
                <p className="font-sans text-xs text-ink-secondary leading-relaxed">
                  {app.desc}
                </p>
                <span className="font-mono text-[11px] text-sepia-ink font-semibold block">
                  {app.tag}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call To Action */}
      <div className="text-center pt-6">
        <InkButton
          asLink="/download"
          variant="primary"
          size="lg"
        >
          {t.common.downloadMac}
        </InkButton>
      </div>
    </div>
  );
};
