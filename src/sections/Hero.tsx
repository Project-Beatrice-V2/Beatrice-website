import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, MicOff, ArrowRight } from 'lucide-react';
import { useCopy } from '../content';
import { RevealLines, FadeIn, AppleIcon, WindowsIcon } from '../components/ui';
import { useMicLevel } from '../hooks/useMicLevel';
import { sceneAttr } from '../three/sceneBus';
import { MAC_URL, WIN_URL, primaryOS } from '../lib/downloads';

export const DownloadButtons: React.FC<{ size?: 'lg' | 'md'; center?: boolean }> = ({ size = 'lg', center = true }) => {
  const c = useCopy();
  const os = primaryOS();
  const mac = (
    <a key="mac" href={MAC_URL} className={os === 'mac' ? `btn-primary btn-${size}` : `btn-ghost btn-${size}`} download>
      <AppleIcon /> {c.hero.downloadMac}
    </a>
  );
  const win = (
    <a key="win" href={WIN_URL} className={os === 'win' ? `btn-primary btn-${size}` : `btn-ghost btn-${size}`} download>
      <WindowsIcon /> {c.hero.downloadWin}
    </a>
  );
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${center ? 'items-center justify-center' : 'items-start'}`}>
      {os === 'mac' ? [mac, win] : [win, mac]}
    </div>
  );
};

export const Hero: React.FC = () => {
  const c = useCopy();
  const mic = useMicLevel();
  const micLabel = c.hero.mic[mic.state];

  return (
    <section id="hero" className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-24 pt-32"
      {...sceneAttr({ morph: 0, chaos: 0.6, y: 0.2, z: 8.2, opacity: 1 })}>
      <div className="shell relative flex flex-col items-center text-center">
        <FadeIn immediate delay={0.1}>
          <Link to="/download" className="chip mb-8 bg-black/50 backdrop-blur-md hover:border-white/25 hover:text-white">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
            {c.hero.badge}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </FadeIn>

        <RevealLines
          as="h1"
          immediate
          delay={0.15}
          className="display text-[calc(var(--display-scale)*clamp(56px,10.5vw,164px))] [text-shadow:0_0_80px_rgba(0,0,0,0.6)]"
          lines={[c.hero.titleA, <em key="b" className="text-aurora">{c.hero.titleB}</em>]}
        />

        <FadeIn immediate delay={0.55} className="mt-8 max-w-[620px]">
          <p className="text-[17px] leading-relaxed text-fg-2 sm:text-[19px]">{c.hero.sub}</p>
        </FadeIn>

        <FadeIn immediate delay={0.7} className="mt-10">
          <DownloadButtons />
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">{c.hero.fine}</p>
        </FadeIn>
      </div>

      <FadeIn immediate delay={1} className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 sm:left-8 sm:translate-x-0">
        <button
          onClick={mic.state === 'on' ? mic.stop : mic.start}
          disabled={mic.state === 'starting'}
          className={`glass group flex h-11 items-center gap-2.5 rounded-full pl-2 pr-4 text-[13px] transition-colors ${mic.state === 'on' ? 'text-white' : 'text-fg-2 hover:text-white'}`}
          title={c.hero.mic.note}
        >
          <span className={`flex h-7 w-7 items-center justify-center rounded-full ${mic.state === 'on' ? 'bg-live text-black' : 'bg-white/10'}`}>
            {mic.state === 'denied' ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
          </span>
          {micLabel}
        </button>
      </FadeIn>

      <div className="absolute bottom-8 right-8 hidden flex-col items-center gap-3 sm:flex" aria-hidden>
        <span className="eyebrow [writing-mode:vertical-rl]">{c.hero.scroll}</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-white/70" />
        </span>
      </div>
    </section>
  );
};
