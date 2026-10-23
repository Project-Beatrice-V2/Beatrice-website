import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { useCopy } from '../content';
import { RevealLines, FadeIn, Eyebrow } from '../components/ui';
import { sceneAttr } from '../three/sceneBus';
import { scrollToTarget } from '../lib/motion';

interface Section {
  id: string;
  title: string;
  body?: string;
  steps?: string[];
  tip?: string;
  head?: string[];
  rows?: string[][];
  items?: { q: string; a: string }[];
  code?: string;
}

export const DocsPage: React.FC = () => {
  const c = useCopy();
  const sections = c.docs.sections as Section[];
  const [active, setActive] = useState(sections[0]?.id);

  // Highlight the section currently in the upper part of the viewport.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <>
      <section className="relative z-10 pb-12 pt-40" {...sceneAttr({ morph: 1, chaos: 0.1, z: 9, opacity: 0.35, y: 1.8 })}>
        <div className="shell">
          <Eyebrow>{c.docs.label}</Eyebrow>
          <RevealLines as="h1" immediate className="display mt-6 text-[calc(var(--display-scale)*clamp(56px,9vw,140px))]" lines={[c.docs.title]} />
          <FadeIn immediate delay={0.3}><p className="mt-6 max-w-lg text-[17px] text-fg-2">{c.docs.sub}</p></FadeIn>
        </div>
      </section>

      <section className="relative z-10 pb-36" {...sceneAttr({ morph: 1, chaos: 0.1, z: 9, opacity: 0.12, y: -2.8 })}>
        <div className="shell grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label={c.docs.toc} className="hidden lg:block">
            <div className="sticky top-28">
              <div className="eyebrow mb-4">{c.docs.toc}</div>
              <ul className="space-y-1 border-l border-hairline">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button onClick={() => scrollToTarget(`#${s.id}`)}
                      className={`-ml-px block border-l py-1.5 pl-4 text-left text-[14px] transition-colors ${active === s.id ? 'border-white text-white' : 'border-transparent text-fg-3 hover:text-fg-2'}`}>
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="min-w-0 max-w-3xl">
            {sections.map((s, idx) => (
              <article key={s.id} id={s.id} className={`scroll-mt-28 ${idx > 0 ? 'mt-20 border-t border-hairline pt-20' : ''}`}>
                <div className="font-mono text-[12px] text-fg-3">{String(idx + 1).padStart(2, '0')}</div>
                <h2 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.035em] sm:text-[40px]">{s.title}</h2>
                {s.body && <p className="mt-5 text-[17px] leading-relaxed text-fg-2">{s.body}</p>}

                {s.steps && (
                  <ol className="mt-8 space-y-5">
                    {s.steps.map((step, i) => (
                      <li key={i} className="flex gap-4 text-[16px] leading-relaxed text-fg-2">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline font-mono text-[12px] text-white">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {s.rows && (
                  <div className="mt-8 overflow-x-auto rounded-card border border-hairline">
                    <table className="w-full min-w-[520px] text-left text-[15px]">
                      {s.head && (
                        <thead>
                          <tr className="border-b border-hairline">
                            {s.head.map((h, i) => <th key={i} className="px-5 py-3.5 font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-fg-3">{h}</th>)}
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {s.rows.map((row, i) => (
                          <tr key={i} className="border-b border-hairline last:border-0">
                            {row.map((cell, j) => (
                              <td key={j} className={`px-5 py-4 align-top ${j === 0 ? 'font-medium text-white' : 'text-fg-2'} ${!s.head && j === 1 ? 'whitespace-nowrap font-mono text-[13px]' : ''}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {s.code && (
                  <pre className="mt-8 overflow-x-auto rounded-card border border-hairline bg-ink-900 p-5 font-mono text-[13px] leading-relaxed text-fg-2"><code>{s.code}</code></pre>
                )}

                {s.items && (
                  <dl className="mt-8 divide-y divide-hairline rounded-card border border-hairline">
                    {s.items.map((it) => (
                      <div key={it.q} className="p-5 sm:p-6">
                        <dt className="text-[16px] font-medium text-white">{it.q}</dt>
                        <dd className="mt-2 text-[15px] leading-relaxed text-fg-2">{it.a}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {s.tip && (
                  <p className="mt-8 flex gap-3 rounded-card border border-signal/25 bg-signal/[0.06] p-5 text-[15px] leading-relaxed text-fg-2">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                    {s.tip}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
