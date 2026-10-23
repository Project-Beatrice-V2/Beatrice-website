import React from 'react';
import { Headphones, FolderUp, Languages } from 'lucide-react';
import { useCopy } from '../content';
import { RevealLines, FadeIn, Eyebrow } from '../components/ui';
import { sceneAttr } from '../three/sceneBus';

const PADS = ['Airhorn', 'Applause', 'Bruh', 'Drumroll', 'Rimshot', 'Wow', 'Crickets', 'Tada'];
const THEMES = [
  { name: 'Obsidian', c: '#1b1b22' },
  { name: 'Midnight', c: '#1c2a5a' },
  { name: 'Teal', c: '#0f6b6b' },
  { name: 'Amber', c: '#b26a12' },
  { name: 'Rose', c: '#a8395d' },
  { name: 'Cyberpunk', c: '#c01ad6' },
];

const Slider: React.FC<{ label: string; value: string; pos: number }> = ({ label, value, pos }) => (
  <div>
    <div className="flex justify-between font-mono text-[11px] text-fg-3"><span>{label}</span><span className="text-white">{value}</span></div>
    <div className="relative mt-2 h-1 rounded-full bg-white/10">
      <div className="absolute inset-y-0 left-0 rounded-full bg-white/60" style={{ width: `${pos}%` }} />
      <div className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" style={{ left: `${pos}%` }} />
    </div>
  </div>
);

export const Features: React.FC = () => {
  const c = useCopy();
  const f = c.features.items;
  return (
    <section id="features" className="relative z-10 py-36" {...sceneAttr({ morph: 0, chaos: 0.2, x: 2.6, y: 1.4, z: 11, opacity: 0.35 })}>
      <div className="shell">
        <Eyebrow>{c.features.label}</Eyebrow>
        <RevealLines className="display mt-6 text-[calc(var(--display-scale)*clamp(48px,7vw,110px))]" lines={[c.features.title]} />

        <FadeIn stagger className="mt-16 grid gap-4 md:grid-cols-6">
          {/* Soundboard */}
          <article className="card p-7 md:col-span-4">
            <h3 className="text-[22px] font-semibold tracking-tightish">{f.soundboard.title}</h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-fg-2">{f.soundboard.body}</p>
            <div className="mt-8 grid grid-cols-4 gap-2.5">
              {PADS.map((p, i) => (
                <div key={p} className={`flex h-16 flex-col justify-between rounded-xl border p-2.5 ${i === 1 ? 'border-white/30 bg-white/10' : 'border-white/10 bg-white/[0.03]'}`}>
                  <span className="font-mono text-[10px] text-fg-3">⌥{i + 1}</span>
                  <span className="text-[13px] text-white/85">{p}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Pitch & formant */}
          <article className="card p-7 md:col-span-2">
            <h3 className="text-[22px] font-semibold tracking-tightish">{f.tune.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{f.tune.body}</p>
            <div className="mt-8 space-y-6">
              <Slider label="PITCH" value="+3.0 st" pos={62} />
              <Slider label="FORMANT" value="−0.4" pos={37} />
            </div>
          </article>

          {/* Noise gate */}
          <article className="card p-7 md:col-span-2">
            <h3 className="text-[22px] font-semibold tracking-tightish">{f.gate.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{f.gate.body}</p>
            <div className="mt-8 flex h-16 items-end gap-1" aria-hidden>
              {Array.from({ length: 28 }, (_, i) => {
                const h = [18, 30, 22, 64, 80, 72, 90, 58, 40, 20, 12, 10, 8, 12, 70, 88, 76, 60, 34, 14, 9, 8, 10, 50, 66, 44, 20, 10][i];
                return <span key={i} className={`flex-1 rounded-sm ${h > 30 ? 'bg-white/70' : 'bg-white/15'}`} style={{ height: `${h}%` }} />;
              })}
            </div>
            <div className="mt-2 h-px border-t border-dashed border-white/25" />
          </article>

          {/* Hear yourself */}
          <article className="card p-7 md:col-span-2">
            <Headphones className="h-6 w-6 text-signal" />
            <h3 className="mt-5 text-[22px] font-semibold tracking-tightish">{f.monitor.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{f.monitor.body}</p>
          </article>

          {/* Custom models */}
          <article className="card p-7 md:col-span-2">
            <FolderUp className="h-6 w-6 text-signal" />
            <h3 className="mt-5 text-[22px] font-semibold tracking-tightish">{f.custom.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{f.custom.body}</p>
          </article>

          {/* Themes & languages */}
          <article className="card flex flex-col justify-between gap-8 p-7 md:col-span-6 md:flex-row md:items-center">
            <div className="max-w-md">
              <Languages className="h-6 w-6 text-signal" />
              <h3 className="mt-5 text-[22px] font-semibold tracking-tightish">{f.themes.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{f.themes.body}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {THEMES.map((t) => (
                <div key={t.name} className="flex flex-col items-center gap-2">
                  <span className="h-14 w-14 rounded-2xl border border-white/15" style={{ background: `linear-gradient(140deg, ${t.c}, #000 120%)` }} />
                  <span className="font-mono text-[10px] uppercase text-fg-3">{t.name}</span>
                </div>
              ))}
            </div>
          </article>
        </FadeIn>
      </div>
    </section>
  );
};
