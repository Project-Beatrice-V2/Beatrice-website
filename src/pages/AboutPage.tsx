import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useCopy } from '../content';
import { RevealLines, FadeIn, Eyebrow, LogoMark, GithubMark } from '../components/ui';
import { sceneAttr } from '../three/sceneBus';
import { CONTRIBUTORS } from '../data/contributors';
import { getAssetUrl } from '../utils/osDetect';

const avatar = (url?: string) => (!url ? '' : url.startsWith('/') ? getAssetUrl(url) : url);

export const AboutPage: React.FC = () => {
  const c = useCopy();
  const a = c.about;

  return (
    <>
      <section className="relative z-10 flex min-h-[86svh] flex-col items-center justify-center pb-20 pt-40 text-center"
        {...sceneAttr({ morph: 2, chaos: 0.1, z: 8.6, opacity: 0.7, y: 0.9 })}>
        <FadeIn immediate>
          <LogoMark detail className="mx-auto h-36 w-36 text-white drop-shadow-[0_0_40px_rgba(168,135,220,0.35)] sm:h-44 sm:w-44" />
        </FadeIn>
        <div className="shell">
          <Eyebrow className="mt-10 justify-center">{a.label}</Eyebrow>
          <RevealLines as="h1" immediate delay={0.1}
            className="display mt-6 text-[calc(var(--display-scale)*clamp(56px,9vw,140px))]"
            lines={[a.titleA, <em key="b" className="text-aurora">{a.titleB}</em>]} />
        </div>
      </section>

      <section className="relative z-10 py-28" {...sceneAttr({ morph: 2, chaos: 0.1, z: 11, opacity: 0.2, y: 1.5 })}>
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="eyebrow lg:pt-3">{a.logoNote}</div>
          <FadeIn stagger className="space-y-8">
            {a.story.map((p, i) => (
              <p key={i} className={`leading-[1.45] tracking-[-0.02em] ${i === 0 ? 'text-[26px] text-white sm:text-[30px]' : 'text-[19px] text-fg-2 sm:text-[21px]'}`}>{p}</p>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <FadeIn stagger className="shell grid gap-4 md:grid-cols-3">
          {a.principles.map((p, i) => (
            <article key={p.title} className="card p-8">
              <div className="font-mono text-[12px] text-fg-3">0{i + 1}</div>
              <h3 className="mt-12 text-[24px] font-semibold tracking-tightish">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{p.body}</p>
            </article>
          ))}
        </FadeIn>
      </section>

      <section className="relative z-10 pb-36 pt-20" {...sceneAttr({ morph: 1, chaos: 0.1, z: 9, opacity: 0.25, y: -2.6 })}>
        <div className="shell">
          <Eyebrow>{a.peopleLabel}</Eyebrow>
          <RevealLines className="display mt-6 text-[calc(var(--display-scale)*clamp(44px,6.4vw,100px))]" lines={[a.peopleTitle]} />
          <FadeIn stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTRIBUTORS.map((p) => (
              <article key={p.id} className="card flex flex-col p-6">
                <div className="flex items-center gap-4">
                  <img src={avatar(p.avatarUrl)} alt="" width={52} height={52} loading="lazy"
                    className="h-[52px] w-[52px] shrink-0 rounded-full bg-white/5 object-cover ring-1 ring-white/15"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }} />
                  <div className="min-w-0">
                    <h3 className="truncate text-[17px] font-semibold tracking-tightish">{p.name}</h3>
                    {p.isYou && <span className="mt-1 inline-block rounded-full border border-live/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-live">{a.you}</span>}
                  </div>
                </div>
                <p className="mt-5 text-[14px] leading-relaxed text-fg-2">{p.role}</p>
                <div className="mt-auto flex gap-4 pt-6 text-[13px]">
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-fg-2 hover:text-white"><GithubMark className="h-3.5 w-3.5" /> GitHub</a>}
                  {p.websiteUrl && <a href={p.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-fg-2 hover:text-white">Web <ArrowUpRight className="h-3.5 w-3.5" /></a>}
                </div>
              </article>
            ))}
          </FadeIn>
        </div>
      </section>
    </>
  );
};
