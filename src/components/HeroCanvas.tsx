import React, { useEffect, useRef } from 'react';

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    let step = 0;
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Floating botanical ink dust particles
    const numParticles = 60;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.2 + 0.8,
      opacity: Math.random() * 0.45 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      step += 0.012;

      // 5 Multi-Layered Audio Ribbon Waveforms
      const waveLayers = [
        {
          yRatio: 0.42,
          amplitude: 45,
          frequency: 0.005,
          phase: step * 0.9,
          colorStroke: 'rgba(139, 69, 19, 0.28)',
          colorFill: 'rgba(139, 69, 19, 0.04)',
          lineWidth: 2.2,
          harmonics: [1, 0.5, 0.25],
        },
        {
          yRatio: 0.50,
          amplitude: 60,
          frequency: 0.007,
          phase: step * 1.3,
          colorStroke: 'rgba(63, 98, 18, 0.24)',
          colorFill: 'rgba(63, 98, 18, 0.035)',
          lineWidth: 1.8,
          harmonics: [1, 0.7, 0.3],
        },
        {
          yRatio: 0.56,
          amplitude: 35,
          frequency: 0.010,
          phase: step * 1.6,
          colorStroke: 'rgba(200, 147, 52, 0.30)',
          colorFill: 'rgba(200, 147, 52, 0.04)',
          lineWidth: 2.0,
          harmonics: [1, 0.4, 0.6],
        },
        {
          yRatio: 0.62,
          amplitude: 50,
          frequency: 0.006,
          phase: step * 0.7,
          colorStroke: 'rgba(107, 52, 16, 0.20)',
          colorFill: 'rgba(107, 52, 16, 0.03)',
          lineWidth: 1.5,
          harmonics: [1, 0.3, 0.2],
        },
        {
          yRatio: 0.48,
          amplitude: 25,
          frequency: 0.014,
          phase: step * 2.1,
          colorStroke: 'rgba(45, 62, 48, 0.22)',
          colorFill: 'rgba(45, 62, 48, 0.025)',
          lineWidth: 1.2,
          harmonics: [1, 0.8, 0.4],
        },
      ];

      waveLayers.forEach((wave) => {
        const baseY = height * wave.yRatio;
        ctx.beginPath();

        // Start path at bottom left for ribbon wash
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 4) {
          // Calculate harmonic Fourier-like wave equation
          const h1 = Math.sin(x * wave.frequency + wave.phase) * wave.harmonics[0];
          const h2 = Math.sin(x * wave.frequency * 2 + wave.phase * 1.4) * wave.harmonics[1];
          const h3 = Math.cos(x * wave.frequency * 3.5 + wave.phase * 0.8) * wave.harmonics[2];

          // Dynamic mouse wave disruption bell curve (wave disruption on hover)
          const distToMouse = Math.abs(x - mouse.x);
          const mouseBell = Math.exp(-Math.pow(distToMouse / 200, 2));
          const interactiveAmp = wave.amplitude + mouseBell * 45;

          const y = baseY + (h1 + h2 * 0.5 + h3 * 0.25) * interactiveAmp;

          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Close path to canvas bottom for ink wash fill
        ctx.lineTo(width, height);
        ctx.closePath();

        // Create gradient fill under wave ribbon
        const grad = ctx.createLinearGradient(0, baseY - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.colorFill);
        grad.addColorStop(1, 'rgba(250, 246, 237, 0)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke main wave line
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.colorStroke;
        ctx.stroke();
      });

      // Render floating particle dust & hairline connections
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 69, 19, ${p.opacity})`;
        ctx.fill();
      });

      // Hairline constellation links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 69, 19, ${0.18 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
    />
  );
};
