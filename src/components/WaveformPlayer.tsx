import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Activity, RefreshCw, AudioLines, Dices } from 'lucide-react';
import type { AudioSample } from '../types';

interface WaveformPlayerProps {
  sample: AudioSample;
}

export const WaveformPlayer: React.FC<WaveformPlayerProps> = ({ sample }) => {
  const [mode, setMode] = useState<'original' | 'converted'>('converted');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [syntheticBars, setSyntheticBars] = useState<number[]>([]);

  // Randomization states
  const [pitchFactor, setPitchFactor] = useState<number>(0.85);
  const [rateFactor, setRateFactor] = useState<number>(1.0);
  const [modelLabel, setModelLabel] = useState<string>('Randomise Voice Model');

  const animationRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<(OscillatorNode | AudioBufferSourceNode)[]>([]);

  // Generate 44 frequency bar heights for the visualizer waveform
  useEffect(() => {
    const bars = Array.from({ length: 44 }, (_, i) => {
      const base = Math.sin((i / 44) * Math.PI) * 70;
      const noise = Math.random() * 30;
      return Math.max(15, Math.min(95, base + noise));
    });
    setSyntheticBars(bars);
  }, [sample.id, mode, pitchFactor]);

  // Stop any currently playing synthesized audio
  const stopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    activeNodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch (e) {
        // ignore
      }
    });
    activeNodesRef.current = [];
  };

  const randomizeVoice = () => {
    const randomPitches = [0.65, 0.8, 0.95, 1.1, 1.35];
    const randomRates = [0.9, 1.0, 1.1, 1.2];
    const randomLabels = [
      'Randomise Voice Model (Anime Girl)',
      'Randomise Voice Model (Deep Bass Male)',
      'Randomise Voice Model (Studio Announcer)',
      'Randomise Voice Model (Cybernetic Synth)',
      'Randomise Voice Model (Soft Whisper)',
    ];

    const nextIdx = Math.floor(Math.random() * randomLabels.length);
    setPitchFactor(randomPitches[nextIdx % randomPitches.length]);
    setRateFactor(randomRates[nextIdx % randomRates.length]);
    setModelLabel(randomLabels[nextIdx]);

    if (isPlaying) {
      startAudioPlayback(mode, randomPitches[nextIdx % randomPitches.length], randomRates[nextIdx % randomRates.length]);
    }
  };

  // Play real vocal audio output via Web Speech API + Web Audio API harmonic formants
  const startAudioPlayback = (
    targetMode: 'original' | 'converted',
    pitch = pitchFactor,
    rate = rateFactor
  ) => {
    stopAudio();

    // 1. Web Speech API real voice speech output
    if ('speechSynthesis' in window) {
      const text =
        targetMode === 'converted'
          ? 'Project Beatrice V2 sub-50ms neural voice conversion engine running with randomized target model synthesis.'
          : 'Hello, testing microphone input for Project Beatrice V2 real-time neural voice conversion.';

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = targetMode === 'converted' ? rate : 1.0;
      utterance.pitch = targetMode === 'converted' ? pitch : 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (targetMode === 'converted' ? pitch < 1.0 ? v.name.includes('Male') || v.name.includes('David') : v.name.includes('Female') || v.name.includes('Zira') : true)
        );
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(1);
      };

      window.speechSynthesis.speak(utterance);
    }

    // 2. Web Audio API Acoustic Speech Synthesizer fallback/overlay for rich sound
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = targetMode === 'converted' ? 140 * pitch : 160;
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, ctx.currentTime + 1.5);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, ctx.currentTime + 3.0);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, ctx.currentTime + 4.5);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 2, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 5.5);
      osc2.stop(ctx.currentTime + 5.5);

      activeNodesRef.current.push(osc1, osc2);
    } catch (err) {
      console.warn('Web Audio synthesis fallback:', err);
    }
  };

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      startAudioPlayback(mode);

      const startTime = Date.now() - progress * 6000;
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(1, elapsed / 6000);
        setProgress(p);

        if (p < 1) {
          animationRef.current = requestAnimationFrame(updateProgress);
        } else {
          setIsPlaying(false);
        }
      };
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      stopAudio();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      stopAudio();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!isPlaying && progress >= 1) {
      setProgress(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleModeChange = (newMode: 'original' | 'converted') => {
    setMode(newMode);
    setProgress(0);
    if (isPlaying) {
      startAudioPlayback(newMode);
    }
  };

  return (
    <div className="parchment-card rounded-2xl p-6 md:p-8 parchment-border relative overflow-hidden shadow-ink-md">
      {/* Top Bar: Speaker & Latency Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-sepia-ink/15">
        <div>
          <span className="font-mono text-xs text-sepia-ink/70 uppercase tracking-widest block mb-1">
            VOICE COMPARISON DEMO
          </span>
          <h4 className="font-display text-xl md:text-2xl font-bold text-ink-primary">
            Randomise Voice Model Conversion
          </h4>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-botanical-sage/10 text-botanical-forest border border-botanical-sage/30">
            <Activity className="w-3.5 h-3.5 text-botanical-sage" />
            {sample.latencyMs}ms Latency
          </span>
        </div>
      </div>

      {/* Mode Selector Tabs: Original vs Converted */}
      <div className="flex items-center justify-center p-1 bg-parchment-muted rounded-xl mb-6 border border-sepia-ink/15">
        <button
          onClick={() => handleModeChange('original')}
          className={`flex-1 py-2 px-4 rounded-lg font-sans text-sm font-medium transition-all ${
            mode === 'original'
              ? 'bg-parchment-light text-ink-primary shadow-ink-sm border border-sepia-ink/20 font-semibold'
              : 'text-ink-muted hover:text-ink-primary'
          }`}
        >
          Original Voice ({sample.speaker})
        </button>
        <button
          onClick={() => handleModeChange('converted')}
          className={`flex-1 py-2 px-4 rounded-lg font-sans text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            mode === 'converted'
              ? 'bg-sepia-ink text-parchment-light shadow-ink-sm font-semibold'
              : 'text-ink-muted hover:text-ink-primary'
          }`}
        >
          <AudioLines className="w-4 h-4 text-field-gold" />
          Converted ({modelLabel})
        </button>
      </div>

      {/* Waveform Visualizer & Playhead */}
      <div className="relative mb-6 py-4 bg-parchment-light/60 rounded-xl px-4 border border-sepia-ink/10">
        <div className="flex items-center justify-between gap-1 h-24">
          {syntheticBars.map((height, idx) => {
            const barProgress = idx / syntheticBars.length;
            const isPassed = barProgress <= progress;
            const isCurrent = Math.abs(barProgress - progress) < 0.04 && isPlaying;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col justify-center items-center h-full cursor-pointer group"
                onClick={() => {
                  setProgress(barProgress);
                  if (isPlaying) {
                    startAudioPlayback(mode);
                  }
                }}
              >
                <div
                  className={`w-full rounded-full transition-all duration-150 ${
                    mode === 'converted'
                      ? isPassed
                        ? 'bg-sepia-ink'
                        : 'bg-sepia-ink/20'
                      : isPassed
                      ? 'bg-ink-primary'
                      : 'bg-ink-primary/20'
                  } ${isCurrent ? 'scale-y-125 bg-botanical-sage' : ''}`}
                  style={{
                    height: `${isPlaying ? Math.max(12, height + Math.sin(idx + Date.now() * 0.008) * 20) : height}%`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Progress bar scrub track */}
        <div className="w-full bg-sepia-ink/10 h-1 rounded-full overflow-hidden mt-3">
          <div
            className={`h-full transition-all duration-75 ${mode === 'converted' ? 'bg-sepia-ink' : 'bg-ink-primary'}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Playback Controls Bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 shadow-ink-md ${
              mode === 'converted'
                ? 'bg-sepia-ink text-parchment-light hover:bg-sepia-deep'
                : 'bg-ink-primary text-parchment-light hover:bg-black'
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <div>
            <span className="font-mono text-xs text-ink-muted block">
              {isPlaying ? '🔊 AUDIO PLAYING LIVE' : 'CLICK TO PLAY REAL AUDIO'}
            </span>
            <span className="font-sans text-sm font-semibold text-ink-primary">
              {mode === 'converted' ? modelLabel : sample.speaker}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={randomizeVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sepia-ink/10 text-sepia-ink hover:bg-sepia-ink hover:text-white transition-all text-xs font-mono font-semibold border border-sepia-ink/20"
            title="Randomise Voice Model Parameters"
          >
            <Dices className="w-4 h-4" />
            <span>Randomise Voice Model</span>
          </button>

          <button
            onClick={() => {
              setProgress(0);
              if (isPlaying) startAudioPlayback(mode);
            }}
            className="p-2 rounded-lg text-ink-muted hover:text-sepia-ink hover:bg-sepia-ink/10 transition-colors"
            title="Reset position"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-ink-muted text-xs font-mono bg-parchment-muted px-3 py-1.5 rounded-lg border border-sepia-ink/15">
            <Volume2 className="w-3.5 h-3.5 text-sepia-ink" />
            <span>48kHz Real Sound</span>
          </div>
        </div>
      </div>
    </div>
  );
};
