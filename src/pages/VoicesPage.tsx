import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useCopy } from '../content';
import { VOICES, voiceTag } from '../data/voices';
import { VoiceAvatar } from '../components/VoiceAvatar';
import { RevealLines, FadeIn, Eyebrow } from '../components/ui';
import { sceneAttr } from '../three/sceneBus';

type Tab = 'all' | 'female' | 'male' | 'official' | 'retro';

export const VoicesPage: React.FC = () => {
  const c = useCopy();
  const [params] = useSearchParams();
  const initial: Tab = params.get('model') === 'official_1' ? 'official' : params.get('model') === 'old_tts' ? 'retro' : 'all';
  const [tab, setTab] = useState<Tab>(initial);
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VOICES.filter((v) => {
      if (tab === 'female' && v.gender !== 'female') return false;
      if (tab === 'male' && v.gender !== 'male') return false;
      if (tab === 'official' && v.model !== 'official_1') return false;
      if (tab === 'retro' && v.model !== 'old_tts') return false;
      return !q || v.name.toLowerCase().includes(q) || (v.code ?? '').toLowerCase().includes(q);
    });
  }, [tab, query]);

  const tabs: { key: Tab; count: number }[] = [
    { key: 'all', count: VOICES.length },
    { key: 'female', count: VOICES.filter((v) => v.gender === 'female').length },
    { key: 'male', count: VOICES.filter((v) => v.gender === 'male').length },
    { key: 'official', count: VOICES.filter((v) => v.model === 'official_1').length },
    { key: 'retro', count: VOICES.filter((v) => v.model === 'old_tts').length },
  ];

  return (
    <section className="relative z-10 pb-36 pt-40" {...sceneAttr({ morph: 1, chaos: 0.1, z: 9, opacity: 0.3, y: 2.2 })}>
      <div className="shell">
        <Eyebrow>{c.library.label}</Eyebrow>
        <RevealLines as="h1" immediate className="display mt-6 text-[calc(var(--display-scale)*clamp(56px,9vw,140px))]" lines={[c.library.title]} />
        <FadeIn immediate delay={0.3}><p className="mt-6 max-w-lg text-[17px] text-fg-2">{c.library.sub}</p></FadeIn>

        <div className="glass sticky top-20 z-20 mt-12 flex flex-col gap-3 rounded-card p-2 sm:top-24 md:flex-row md:items-center md:justify-between">
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist">
            {tabs.map((t) => (
              <button key={t.key} role="tab" aria-selected={tab === t.key} onClick={() => setTab(t.key)}
                className={`h-9 shrink-0 rounded-full px-4 text-[14px] transition-colors ${tab === t.key ? 'bg-white text-black' : 'text-fg-2 hover:text-white'}`}>
                {c.voices.tabs[t.key]} <span className={`ml-1 font-mono text-[11px] ${tab === t.key ? 'text-black/50' : 'text-fg-3'}`}>{t.count}</span>
              </button>
            ))}
          </div>
          <label className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-hairline px-4 md:w-72">
            <Search className="h-4 w-4 text-fg-3" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={c.library.search}
              className="w-full bg-transparent text-[14px] text-white placeholder:text-fg-3 focus:outline-none" />
          </label>
        </div>

        {list.length === 0 ? (
          <p className="mt-20 text-center text-fg-3">{c.library.empty}</p>
        ) : (
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {list.map((v) => (
              <li key={v.id} className="card group flex flex-col items-center px-4 pb-5 pt-6 text-center">
                <VoiceAvatar voice={v} size={84} className="transition-transform duration-300 group-hover:scale-105" />
                <span className="mt-4 text-[15px] font-medium">{v.name}</span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">{voiceTag(v)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
