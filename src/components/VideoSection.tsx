import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Activity } from 'lucide-react';

interface VideoSectionProps {
  title?: string;
  subtitle?: string;
  posterImage?: string;
  videoSrc?: string;
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  subtitle,
  posterImage = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
  videoSrc = '/media/pipeline-demo.mp4',
}) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('00:00');
  const [durationTime, setDurationTime] = useState<string>('00:10');
  const [showControls, setShowControls] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  const displayTitle = title || t.showcasePage.videoTitle;
  const displaySubtitle = subtitle || t.showcasePage.videoSubtitle;

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPlay = () => {
    setHasStarted(true);
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.warn('Video play error:', err);
    });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Video play error:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 10;
    setProgress((current / duration) * 100);
    setCurrentTime(formatTime(current));
    setDurationTime(formatTime(duration));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 10);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.warn(err));
    } else {
      document.exitFullscreen().catch((err) => console.warn(err));
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="w-full my-12">
      <div className="parchment-card rounded-3xl p-4 md:p-8 parchment-border relative overflow-hidden shadow-ink-lg">
        {/* Video Header info */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-2">
          <div>
            <span className="font-mono text-xs text-sepia-ink tracking-widest uppercase font-semibold block mb-1">
              {t.showcasePage.videoTag}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-ink-primary">
              {displayTitle}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-botanical-sage/10 text-botanical-forest border border-botanical-sage/30">
              <Activity className="w-3.5 h-3.5 text-botanical-sage" />
              {t.showcasePage.videoLatencyBadge}
            </span>
          </div>
        </div>

        {/* Video Player Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-sepia-ink/30 shadow-inner group"
        >
          {/* Native HTML5 Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterImage}
            playsInline
            loop
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={hasStarted ? togglePlay : handleStartPlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Initial Splash / Play Screen (shown only before starting) */}
          {!hasStarted && (
            <div
              onClick={handleStartPlay}
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 flex flex-col justify-between p-6 md:p-8 cursor-pointer transition-all duration-300 hover:bg-black/50 group/splash"
            >
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-field-gold font-mono text-xs border border-field-gold/30">
                  BEATRICE V2 ENGINE
                </span>
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-parchment-light font-mono text-xs border border-white/20">
                  4K 60FPS METAL PREVIEW
                </span>
              </div>

              {/* Centered Large Play Button */}
              <div className="flex flex-col items-center justify-center space-y-3 my-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartPlay();
                  }}
                  className="w-20 h-20 rounded-full bg-sepia-ink/90 text-parchment-light flex items-center justify-center shadow-ink-xl transition-all duration-300 group-hover/splash:scale-110 group-hover/splash:bg-sepia-ink border-2 border-field-gold/40"
                  aria-label="Play demo video"
                >
                  <Play className="w-9 h-9 fill-current ml-1.5 text-field-gold" />
                </button>
                <span className="font-mono text-xs text-parchment-light/80 tracking-wider uppercase font-semibold">
                  {t.showcasePage.videoWatchDemo}
                </span>
              </div>

              <div className="text-left">
                <p className="text-white font-display text-xl md:text-2xl font-semibold max-w-lg leading-snug">
                  {t.showcasePage.videoOverlayTitle}
                </p>
                <span className="font-mono text-xs text-parchment-muted/80 block mt-1">
                  {t.showcasePage.videoOverlaySub}
                </span>
              </div>
            </div>
          )}

          {/* Dedicated Control Bar (active once playback begins) */}
          {hasStarted && (
            <div
              className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 md:p-6 transition-opacity duration-300 z-20 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Scrubbable Progress Timeline Bar */}
              <div
                onClick={handleSeek}
                className="w-full h-1.5 hover:h-2.5 bg-white/20 rounded-full cursor-pointer transition-all mb-3 relative overflow-hidden group/bar"
              >
                <div
                  className="h-full bg-field-gold rounded-full transition-all relative"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-white font-mono text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-field-gold transition-colors focus:outline-none"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-field-gold transition-colors focus:outline-none"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="text-white/80">
                    {currentTime} / {durationTime}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        if (!isPlaying) togglePlay();
                      }
                    }}
                    className="p-1.5 hover:text-field-gold transition-colors"
                    title="Restart video"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:text-field-gold transition-colors"
                    title="Toggle Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="font-sans text-xs text-ink-muted text-center mt-4">
          {displaySubtitle}
        </p>
      </div>
    </div>
  );
};
