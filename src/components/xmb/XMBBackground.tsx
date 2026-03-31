import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
  size: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]()<>/\\|;:=+-*&^%$#@!~`';

export function XMBBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.7,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        opacity: 0.03 + Math.random() * 0.06,
        size: 10 + Math.random() * 6,
      }));
    };

    const drawWaves = () => {
      const { width, height } = canvas;

      // Draw 3 wave layers
      for (let wave = 0; wave < 3; wave++) {
        const baseY = height * 0.4 + wave * 40;
        const amplitude = 30 + wave * 15;
        const frequency = 0.003 - wave * 0.0005;
        const speed = 0.02 + wave * 0.005;
        const alpha = 0.06 - wave * 0.015;

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 3) {
          const y =
            baseY +
            Math.sin(x * frequency + time * speed) * amplitude +
            Math.sin(x * frequency * 2.5 + time * speed * 1.5) * (amplitude * 0.3);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, baseY - amplitude, 0, height);
        gradient.addColorStop(0, `rgba(0, 255, 65, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(0, 180, 50, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    const drawParticles = () => {
      ctx.font = '12px "IBM Plex Mono", monospace';

      for (const p of particles) {
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        ctx.fillStyle = `rgba(0, 255, 65, ${p.opacity})`;
        ctx.font = `${p.size}px "IBM Plex Mono", monospace`;
        ctx.fillText(p.char, p.x, p.y);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawWaves();
      drawParticles();

      time += 1;
      animationId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);

    // Throttle to ~30fps
    let lastFrame = 0;
    const throttledRender = (timestamp: number) => {
      if (timestamp - lastFrame >= 33) {
        lastFrame = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWaves();
        drawParticles();
        time += 1;
      }
      animationId = requestAnimationFrame(throttledRender);
    };

    animationId = requestAnimationFrame(throttledRender);

    // Pause when tab not visible
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        lastFrame = 0;
        animationId = requestAnimationFrame(throttledRender);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
