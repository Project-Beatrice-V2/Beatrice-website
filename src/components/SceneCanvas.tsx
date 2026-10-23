import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_STATE, webglAvailable, type SceneState } from '../three/state';
import { sceneBus } from '../three/sceneBus';

interface Anchor { y: number; state: SceneState }

// Sections declare how the background voice should look while they are centred
// in the viewport (`data-scene` + `data-scene-at`). The scroll position is
// mapped onto those keyframes and the scene eases towards the result.
function readAnchors(): Anchor[] {
  const vh = window.innerHeight;
  const anchors: Anchor[] = [];
  document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => {
    try {
      const partial = JSON.parse(el.dataset.scene || '{}');
      const at = parseFloat(el.dataset.sceneAt || '0.5');
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      anchors.push({ y: top + rect.height * at - vh / 2, state: { ...DEFAULT_STATE, ...partial } });
    } catch {
      /* ignore malformed keyframe */
    }
  });
  return anchors.sort((a, b) => a.y - b.y);
}

function stateAt(anchors: Anchor[], y: number): SceneState {
  if (anchors.length === 0) return DEFAULT_STATE;
  if (y <= anchors[0].y) return anchors[0].state;
  const last = anchors[anchors.length - 1];
  if (y >= last.y) return last.state;
  let i = 0;
  while (i < anchors.length - 2 && y > anchors[i + 1].y) i++;
  const a = anchors[i];
  const b = anchors[i + 1];
  const raw = (y - a.y) / Math.max(1, b.y - a.y);
  const t = raw * raw * (3 - 2 * raw);
  const out = { ...a.state };
  (Object.keys(out) as (keyof SceneState)[]).forEach((k) => {
    out[k] = a.state[k] + (b.state[k] - a.state[k]) * t;
  });
  return out;
}

export const SceneCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anchorsRef = useRef<Anchor[]>([]);
  const { pathname } = useLocation();
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !reduced && webglAvailable();
  });

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;
    const canvas = canvasRef.current;
    let cancelled = false;
    let raf = 0;
    let ro: ResizeObserver | null = null;
    let dispose = () => {};

    // three.js is loaded on demand so the page itself paints immediately.
    import('../three/VoiceScene').then(({ VoiceScene }) => {
      if (cancelled) return;
      const scene = new VoiceScene(canvas);
      sceneBus.scene = scene;
      const refresh = () => { anchorsRef.current = readAnchors(); };
      refresh();
      ro = new ResizeObserver(refresh);
      ro.observe(document.body);
      document.fonts?.ready.then(refresh);
      // Start from wherever the visitor already is, without easing in from the top.
      scene.target = stateAt(anchorsRef.current, window.scrollY);
      scene.state = { ...scene.target };
      const tick = () => {
        raf = requestAnimationFrame(tick);
        scene.target = stateAt(anchorsRef.current, window.scrollY);
      };
      tick();
      requestAnimationFrame(() => canvas.classList.add('opacity-100'));
      dispose = () => { sceneBus.scene = null; scene.dispose(); };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      dispose();
    };
  }, [enabled]);

  // New page → new keyframes.
  useEffect(() => {
    if (!enabled) return;
    const id = requestAnimationFrame(() => { anchorsRef.current = readAnchors(); });
    return () => cancelAnimationFrame(id);
  }, [pathname, enabled]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Aurora atmosphere behind the particles */}
      <div className="absolute inset-0 opacity-70" style={{
        background: 'radial-gradient(60% 50% at 50% 40%, rgba(75,82,170,0.28) 0%, rgba(17,45,114,0.12) 45%, rgba(0,0,0,0) 75%)',
      }} />
      {enabled ? (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-[1600ms]" />
      ) : (
        <div className="absolute left-1/2 top-[38%] h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-2xl"
          style={{ background: 'radial-gradient(circle at 40% 35%, #fcdbef 0%, #a887dc 30%, #4b52aa 60%, rgba(17,45,114,0) 75%)' }} />
      )}
    </div>
  );
};
