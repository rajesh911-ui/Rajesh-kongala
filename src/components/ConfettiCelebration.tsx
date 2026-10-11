import React, { useEffect, useRef } from 'react';

interface ConfettiCelebrationProps {
  durationMs?: number;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  shape: 'rect' | 'circle' | 'ribbon' | 'star';
  opacity: number;
  decay: number;
  gravity: number;
  drag: number;
  wobble: number;
  wobbleSpeed: number;
}

export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  durationMs = 4500,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play a soft pleasant celebratory chime using Web Audio API
  useEffect(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (major chord arpeggio)
        notes.forEach((freq, index) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + index * 0.08);

          gain.gain.setValueAtTime(0, audioCtx.currentTime + index * 0.08);
          gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + index * 0.08 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + index * 0.08 + 0.45);

          osc.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(audioCtx.currentTime + index * 0.08);
          osc.stop(audioCtx.currentTime + index * 0.08 + 0.5);
        });
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Confetti Physics simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    const w = (canvas.width = window.innerWidth * dpr);
    const h = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const colors = [
      '#4cd7f6', // cyan
      '#c0c1ff', // lavender
      '#3131c0', // electric blue
      '#fbbf24', // golden amber
      '#34d399', // mint emerald
      '#f43f5e', // rose
      '#acedff', // light cyan
      '#e1e0ff', // soft violet
      '#ffffff'  // white sparkle
    ];

    const particles: Particle[] = [];
    const totalParticles = 140;

    // Burst origins: Left cannon, Right cannon, and Center explosion
    const origins = [
      { x: (w / dpr) * 0.2, y: (h / dpr) * 0.65, angleMin: -80, angleMax: -20, power: 18 },
      { x: (w / dpr) * 0.8, y: (h / dpr) * 0.65, angleMin: -160, angleMax: -100, power: 18 },
      { x: (w / dpr) * 0.5, y: (h / dpr) * 0.45, angleMin: -180, angleMax: 0, power: 14 }
    ];

    origins.forEach((orig) => {
      const count = totalParticles / origins.length;
      for (let i = 0; i < count; i++) {
        const rad = ((orig.angleMin + Math.random() * (orig.angleMax - orig.angleMin)) * Math.PI) / 180;
        const speed = Math.random() * orig.power + 8;
        const shapeRand = Math.random();
        const shape: Particle['shape'] = shapeRand < 0.45 ? 'rect' : shapeRand < 0.7 ? 'circle' : shapeRand < 0.88 ? 'ribbon' : 'star';

        particles.push({
          x: orig.x,
          y: orig.y,
          vx: Math.cos(rad) * speed + (Math.random() - 0.5) * 4,
          vy: Math.sin(rad) * speed - Math.random() * 4,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          width: shape === 'ribbon' ? Math.random() * 6 + 4 : Math.random() * 10 + 6,
          height: shape === 'ribbon' ? Math.random() * 18 + 10 : Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape,
          opacity: 1,
          decay: Math.random() * 0.003 + 0.002,
          gravity: 0.38,
          drag: 0.965,
          wobble: Math.random() * 10,
          wobbleSpeed: Math.random() * 0.1 + 0.05
        });
      }
    });

    const startTime = performance.now();

    const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, fillStyle: string) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
    };

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w / dpr, h / dpr);

      let activeParticles = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.opacity <= 0.01) continue;
        activeParticles++;

        // Update physics
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;

        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;
        p.opacity = Math.max(0, p.opacity - p.decay);

        const wobbleX = p.x + Math.sin(p.wobble) * 8;

        ctx.save();
        ctx.translate(wobbleX, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.shape === 'rect') {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(-p.width / 2, -p.height / 2);
          ctx.quadraticCurveTo(0, 0, p.width / 2, -p.height / 2);
          ctx.lineTo(p.width / 2, p.height / 2);
          ctx.quadraticCurveTo(0, 0, -p.width / 2, p.height / 2);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'star') {
          drawStar(0, 0, 5, p.width, p.width * 0.45, p.color);
        }

        ctx.restore();
      }

      ctx.restore();

      if (elapsed < durationMs && activeParticles > 0) {
        animId = requestAnimationFrame(render);
      } else {
        if (onComplete) onComplete();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [durationMs, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Floating Sparkle Emoticons that float upwards */}
      <div className="absolute inset-x-0 top-1/4 flex justify-around pointer-events-none opacity-90 animate-in fade-in duration-500">
        <span className="text-4xl animate-bounce [animation-delay:100ms]">🎉</span>
        <span className="text-3xl animate-bounce [animation-delay:300ms]">✨</span>
        <span className="text-4xl animate-bounce [animation-delay:200ms]">🚀</span>
        <span className="text-3xl animate-bounce [animation-delay:400ms]">🎓</span>
        <span className="text-4xl animate-bounce [animation-delay:150ms]">⭐</span>
      </div>
    </div>
  );
};
