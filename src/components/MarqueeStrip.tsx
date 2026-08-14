import React from 'react';
import { ShieldCheck, Cpu, AudioLines, Terminal, Layers, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MarqueeStrip: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <Cpu className="w-3.5 h-3.5" />,
    <Zap className="w-3.5 h-3.5" />,
    <AudioLines className="w-3.5 h-3.5" />,
    <ShieldCheck className="w-3.5 h-3.5" />,
    <Terminal className="w-3.5 h-3.5" />,
    <Layers className="w-3.5 h-3.5" />,
  ];

  const items = t.marquee.map((text, index) => ({
    icon: icons[index % icons.length],
    text,
  }));

  return (
    <div className="w-full bg-parchment-muted/80 border-y border-sepia-ink/15 py-3 overflow-hidden select-none">
      <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 mx-6 text-xs font-mono font-semibold text-sepia-ink/80 tracking-widest uppercase">
            <span className="text-sepia-ink">{item.icon}</span>
            <span>{item.text}</span>
            <span className="mx-4 text-sepia-ink/30">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
