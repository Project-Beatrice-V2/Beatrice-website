import { useCallback, useEffect, useRef, useState } from 'react';
import { sceneBus } from '../three/sceneBus';

// Lets the visitor's own voice drive the background orb. Audio is analysed
// locally with the Web Audio API and never leaves the browser.
export function useMicLevel() {
  const [state, setState] = useState<'off' | 'starting' | 'on' | 'denied'>('off');
  const stopRef = useRef<() => void>(() => {});

  const stop = useCallback(() => {
    stopRef.current();
    stopRef.current = () => {};
    sceneBus.setLevel(0);
    setState('off');
  }, []);

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setState('denied'); return; }
    setState('starting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      src.connect(analyser);
      const buf = new Float32Array(analyser.fftSize);
      let raf = 0;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        analyser.getFloatTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
        const rms = Math.sqrt(sum / buf.length);
        sceneBus.setLevel(Math.min(1, Math.max(0, (rms - 0.01) * 9)));
      };
      tick();
      stopRef.current = () => {
        cancelAnimationFrame(raf);
        stream.getTracks().forEach((t) => t.stop());
        ctx.close();
      };
      setState('on');
    } catch {
      setState('denied');
    }
  }, []);

  useEffect(() => () => stopRef.current(), []);

  return { state, start, stop };
}
