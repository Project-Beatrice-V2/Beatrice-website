import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCopy } from '../content';
import { VOICES, voiceTag, type Voice } from '../data/voices';
import { VoiceAvatar } from '../components/VoiceAvatar';
import { RevealLines, FadeIn, Eyebrow } from '../components/ui';
import { sceneAttr } from '../three/sceneBus';

const Pill: React.FC<{ v: Voice }> = ({ v }) => (
  <li className="card flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5">
    <VoiceAvatar voice={v} size={44} />
    <span className="flex flex-col leading-tight">
      <span className="text-[15px] font-medium text-white">{v.name}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">{voiceTag(v)}</span>
    </span>
  </li>
);

const Row: React.FC<{ voices: Voice[]; reverse?: boolean }> = ({ voices, reverse }) => (
  <div className="fade-edges-x overflow-hidden py-1.5">
    <ul className={`flex w-max gap-3 pr-3 hover:[animation-play-state:paused] ${reverse ? 'animate-[marquee_80s_linear_infinite_reverse]' : 'animate-[marquee_90s_linear_infinite]'}`}>
      {[...voices, ...voices].map((v, i) => <Pill key={`${v.id}-${i}`} v={v} />)}
    </ul>
  </div>
);

export const VoicesShowcase: React.FC = () => {
  const c = useCopy();
  const vc = c.voices;
  const jvs = VOICES.filter((v) => v.model === 'jvs');
  const others = VOICES.filter((v) => v.model !== 'jvs');
  const rowA = [...jvs.slice(0, 50)];
  const rowB = [...others, ...jvs.slice(50)];
  const models = [
    { key: 'jvs' as const, count: jvs.length, sample: jvs.slice(0, 5) },
    { key: 'official_1' as const, count: VOICES.filter((v) => v.model === 'official_1').length, sample: VOICES.filter((v) => v.model === 'official_1') },
    { key: 'old_tts' as const, count: VOICES.filter((v) => v.model === 'old_tts').length, sample: VOICES.filter((v) => v.model === 'old_tts').slice(0, 5) },
  ];

  return (
    <section id="voices" className="relative z-10 py-36" {...sceneAttr({ morph: 1, chaos: 0.12, hue: 0, z: 9, opacity: 0.3, y: -2.3 })}>
      <div className="shell">
        <Eyebrow>{vc.label}</Eyebrow>
        <RevealLines className="display mt-6 text-[calc(var(--display-scale)*clamp(48px,7vw,110px))]" lines={[vc.titleA, <em key="b" className="text-fg-2">{vc.titleB}</em>]} />
        <FadeIn className="mt-6 max-w-lg"><p className="text-[17px] leading-relaxed text-fg-2">{vc.sub}</p></FadeIn>
      </div>

      <FadeIn className="mt-16 space-y-1">
        <Row voices={rowA} />
        <Row voices={rowB} reverse />
      </FadeIn>

      <div className="shell mt-16">
        <FadeIn stagger className="grid gap-4 md:grid-cols-3">
          {models.map((m) => (
            <Link key={m.key} to={`/voices?model=${m.key}`} className="card group flex items-center justify-between p-6">
              <div>
                <div className="eyebrow">{vc.models[m.key]}</div>
                <div className="mt-3 text-[40px] font-semibold leading-none tracking-tightish">{m.count}</div>
              </div>
              <div className="flex -space-x-3">
                {m.sample.slice(0, 4).map((v) => <VoiceAvatar key={v.id} voice={v} size={40} className="ring-2 ring-black" />)}
              </div>
            </Link>
          ))}
        </FadeIn>
        <FadeIn className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-[15px] text-fg-3">{vc.custom}</p>
          <Link to="/voices" className="btn-ghost btn-md">{vc.browse} <ArrowRight className="h-4 w-4" /></Link>
        </FadeIn>
      </div>
    </section>
  );
};
