import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/** Beatrice mark: the app icon's circle with a sine wave through it. */
export const LogoMark: React.FC<{ className?: string }> = ({ className = 'h-7 w-7' }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden>
    <circle cx="16" cy="16" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 16 Q11.6 10.2 14.2 16 T19.4 16 T24 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AppleIcon: React.FC<{ className?: string }> = ({ className = 'h-[18px] w-[18px]' }) => (
  <svg viewBox="0 0 384 512" className={className} fill="currentColor" aria-hidden>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

export const WindowsIcon: React.FC<{ className?: string }> = ({ className = 'h-[16px] w-[16px]' }) => (
  <svg viewBox="0 0 448 512" className={className} fill="currentColor" aria-hidden>
    <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
  </svg>
);

export const GithubMark: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

/** Headline that rises in line by line as it enters the viewport. */
export const RevealLines: React.FC<{
  lines: React.ReactNode[];
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  immediate?: boolean;
}> = ({ lines, as = 'h2', className = '', delay = 0, immediate = false }) => {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const spans = ref.current.querySelectorAll('.reveal-line > span');
    const ctx = gsap.context(() => {
      gsap.from(spans, {
        yPercent: 110,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 85%' },
      });
    });
    return () => ctx.revert();
  }, [delay, immediate]);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line"><span>{line}</span></span>
      ))}
    </Tag>
  );
};

/** Children fade and rise in as they enter; `stagger` animates direct children one by one. */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  y?: number;
  immediate?: boolean;
}> = ({ children, className = '', stagger = false, delay = 0, y = 28, immediate = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const targets = stagger ? Array.from(ref.current.children) : ref.current;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay,
        stagger: stagger ? 0.07 : 0,
        scrollTrigger: immediate ? undefined : { trigger: ref.current, start: 'top 88%' },
      });
    });
    return () => ctx.revert();
  }, [stagger, delay, y, immediate]);
  return <div ref={ref} className={className}>{children}</div>;
};

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`eyebrow flex items-center gap-3 ${className}`}>
    <span className="h-px w-6 bg-white/25" />
    {children}
  </div>
);
