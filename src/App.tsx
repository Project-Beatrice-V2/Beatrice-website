import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { SiteNav } from './components/SiteNav';
import { SiteFooter } from './components/SiteFooter';
import { SceneCanvas } from './components/SceneCanvas';
import { HomePage } from './pages/HomePage';
import { DownloadPage } from './pages/DownloadPage';
import { VoicesPage } from './pages/VoicesPage';
import { DocsPage } from './pages/DocsPage';
import { AboutPage } from './pages/AboutPage';
import { startSmoothScroll, scrollToTopInstant, ScrollTrigger } from './lib/motion';
import { useCopy, useHtmlLang } from './content';

const RouteEffects: React.FC = () => {
  const { pathname, hash } = useLocation();
  useHtmlLang();
  useEffect(() => {
    if (!hash) scrollToTopInstant();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);
  return null;
};

const NotFoundPage: React.FC = () => {
  const c = useCopy();
  return (
    <section className="relative z-10 flex min-h-[80svh] flex-col items-center justify-center text-center" data-scene='{"morph":2,"opacity":0.8}'>
      <div className="eyebrow">404</div>
      <h1 className="display mt-6 text-[calc(var(--display-scale)*clamp(56px,9vw,140px))]">Lost the signal.</h1>
      <Link to="/" className="btn-primary btn-md mt-10">{c.nav.download === 'Download' ? 'Back home' : '←'}</Link>
    </section>
  );
};

export const App: React.FC = () => {
  useEffect(() => startSmoothScroll(), []);

  return (
    <LanguageProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <RouteEffects />
        <SceneCanvas />
        <SiteNav />
        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/voices" element={<VoicesPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Old routes, folded into the new single-page story */}
            <Route path="/how-it-works" element={<Navigate to="/#how" replace />} />
            <Route path="/modules" element={<Navigate to="/#create" replace />} />
            <Route path="/showcase" element={<Navigate to="/voices" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <SiteFooter />
        <div className="grain" aria-hidden />
      </Router>
    </LanguageProvider>
  );
};

export default App;
