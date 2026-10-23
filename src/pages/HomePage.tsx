import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../sections/Hero';
import { WorksMarquee } from '../sections/WorksMarquee';
import { Conversion } from '../sections/Conversion';
import { Latency } from '../sections/Latency';
import { VoicesShowcase } from '../sections/VoicesShowcase';
import { Features } from '../sections/Features';
import { Showcase } from '../sections/Showcase';
import { Setup, Uses, Create, Faq, FinalCta } from '../sections/Closing';
import { scrollToTarget } from '../lib/motion';

export const HomePage: React.FC = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => scrollToTarget(hash), 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <Hero />
      <WorksMarquee />
      <Conversion />
      <Latency />
      <VoicesShowcase />
      <Features />
      <Showcase />
      <Setup />
      <Uses />
      <Create />
      <Faq />
      <FinalCta />
    </>
  );
};
