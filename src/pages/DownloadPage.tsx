import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useCopy } from '../content';
import { RevealLines, FadeIn, Eyebrow, AppleIcon, WindowsIcon } from '../components/ui';
import { sceneAttr } from '../three/sceneBus';
import { MAC_URL, WIN_URL, MAC_RELEASES, WIN_RELEASES, primaryOS } from '../lib/downloads';

export const DownloadPage: React.FC = () => {
  const c = useCopy();
  const d = c.download;
  const os = primaryOS();
  const cards = [
    { key: 'mac' as const, info: d.mac, url: MAC_URL, releases: MAC_RELEASES, icon: <AppleIcon className="h-7 w-7" /> },
    { key: 'win' as const, info: d.win, url: WIN_URL, releases: WIN_RELEASES, icon: <WindowsIcon className="h-6 w-6" /> },
  ];
  if (os === 'win') cards.reverse();

  return (
    <>
      <section className="relative z-10 pb-20 pt-40" {...sceneAttr({ morph: 0, chaos: 0.35, y: 1.7, z: 10, opacity: 0.8 })}>
        <div className="shell text-center">
          <Eyebrow className="justify-center">{d.label}</Eyebrow>
          <RevealLines as="h1" immediate className="display mt-6 text-[calc(var(--display-scale)*clamp(64px,10vw,156px))]" lines={[d.title]} />
          <FadeIn immediate delay={0.3}><p className="mt-6 text-[18px] text-fg-2">{d.sub}</p></FadeIn>
        </div>
      </section>

      <section className="relative z-10 pb-24" {...sceneAttr({ morph: 0, chaos: 0.3, y: 2.6, z: 12, opacity: 0.4 })}>
        <FadeIn stagger className="shell grid gap-4 lg:grid-cols-2">
          {cards.map((card) => {
            const detected = card.key === os;
            const info = card.info as typeof d.mac;
            return (
              <article key={card.key} className={`card flex flex-col p-8 sm:p-10 ${detected ? 'border-white/25' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-hairline bg-white/[0.04]">{card.icon}</div>
                  {detected && <span className="chip text-white"><span className="h-1.5 w-1.5 rounded-full bg-live" />{d.detected}</span>}
                </div>
                <h2 className="display mt-10 text-[64px]">{info.name}</h2>
                <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.08em] text-fg-3">{info.req}</p>
                <a href={card.url} download className={`${detected ? 'btn-primary' : 'btn-ghost'} btn-lg mt-8 w-full sm:w-auto sm:self-start`}>
                  {card.key === 'mac' ? <AppleIcon /> : <WindowsIcon />} {info.button}
                </a>
                <p className="mt-3 text-[13px] text-fg-3">{info.file}</p>
                <ol className="mt-10 space-y-4 border-t border-hairline pt-8">
                  {info.steps.map((s, i) => (
                    <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-fg-2">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-hairline font-mono text-[11px] text-white">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
                {'intel' in info && info.intel && <p className="mt-6 text-[13px] text-fg-3">{info.intel}</p>}
                <a href={card.releases} target="_blank" rel="noreferrer" className="mt-auto flex items-center gap-1.5 pt-10 text-[14px] text-fg-2 hover:text-white">
                  {d.older} <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </FadeIn>
      </section>

      <section className="relative z-10 pb-36">
        <FadeIn className="shell">
          <div className="card flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-[24px] font-semibold tracking-tightish">{d.virtual}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{d.virtualBody}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a className="btn-ghost btn-md" href="https://existential.audio/blackhole/" target="_blank" rel="noreferrer"><Check className="h-4 w-4" /> {d.blackhole}</a>
              <a className="btn-ghost btn-md" href="https://vb-audio.com/Cable/" target="_blank" rel="noreferrer"><Check className="h-4 w-4" /> {d.vbcable}</a>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
};
