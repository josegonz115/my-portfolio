import { useRef, useEffect } from 'react';

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  drift: number;
}

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  phase: number;
}

export function XMBBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rain: RainDrop[] = [];
    let particles: FloatingParticle[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initRain();
      initParticles();
    };

    const initRain = () => {
      const count = Math.floor(canvas.width / 4);
      rain = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 15 + Math.random() * 35,
        speed: 4 + Math.random() * 8,
        opacity: 0.02 + Math.random() * 0.05,
        drift: -0.3 + Math.random() * 0.1, // slight wind
      }));
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 30000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: -0.15 + Math.random() * 0.3,
        vy: -0.1 + Math.random() * 0.05,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0,
        maxOpacity: 0.1 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    // Draw distant landscape silhouette
    const drawLandscape = () => {
      const { width, height } = canvas;
      const horizonY = height * 0.55;

      // Distant mountains — barely visible, desaturated
      ctx.beginPath();
      ctx.moveTo(0, horizonY);

      for (let x = 0; x <= width; x += 2) {
        const y =
          horizonY -
          Math.sin(x * 0.002 + 0.5) * 60 -
          Math.sin(x * 0.005 + 2.1) * 25 -
          Math.sin(x * 0.001) * 40;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      const mountainGrad = ctx.createLinearGradient(0, horizonY - 100, 0, height);
      mountainGrad.addColorStop(0, 'rgba(25, 28, 22, 0.4)');
      mountainGrad.addColorStop(0.3, 'rgba(18, 20, 16, 0.6)');
      mountainGrad.addColorStop(1, 'rgba(13, 13, 13, 0.95)');
      ctx.fillStyle = mountainGrad;
      ctx.fill();

      // Fog layer along the horizon
      const fogGrad = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 80);
      fogGrad.addColorStop(0, 'transparent');
      fogGrad.addColorStop(0.4, 'rgba(40, 38, 32, 0.08)');
      fogGrad.addColorStop(0.6, 'rgba(40, 38, 32, 0.06)');
      fogGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, horizonY - 40, width, 120);
    };

    // Draw atmospheric fog that drifts slowly
    const drawFog = () => {
      const { width, height } = canvas;

      for (let layer = 0; layer < 2; layer++) {
        const baseY = height * (0.3 + layer * 0.25);
        const alpha = 0.015 - layer * 0.005;
        const drift = time * (0.08 + layer * 0.03);

        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const y =
            baseY +
            Math.sin((x + drift) * 0.003) * 30 +
            Math.sin((x + drift * 1.3) * 0.007) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - 30, 0, baseY + 100);
        grad.addColorStop(0, `rgba(60, 55, 45, ${alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fill();
      }
    };

    // Rain
    const drawRain = () => {
      for (const drop of rain) {
        drop.y += drop.speed;
        drop.x += drop.drift;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.drift * 3, drop.y + drop.length);
        ctx.strokeStyle = `rgba(160, 165, 170, ${drop.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    // Drifting particles (dust, ash, spores)
    const drawParticles = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.008;

        // Breathe opacity
        p.opacity = p.maxOpacity * (0.5 + 0.5 * Math.sin(p.phase));

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 170, 150, ${p.opacity})`;
        ctx.fill();
      }
    };

    // Ambient light — subtle gradient glow from bottom center
    const drawAmbientLight = () => {
      const { width, height } = canvas;

      // Warm amber glow from bottom
      const glow = ctx.createRadialGradient(
        width * 0.5, height * 1.1, 0,
        width * 0.5, height * 1.1, height * 0.8,
      );
      glow.addColorStop(0, 'rgba(200, 164, 78, 0.03)');
      glow.addColorStop(0.5, 'rgba(200, 164, 78, 0.01)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Cold blue from top-left
      const blueGlow = ctx.createRadialGradient(
        width * 0.1, 0, 0,
        width * 0.1, 0, height * 0.6,
      );
      blueGlow.addColorStop(0, 'rgba(74, 110, 130, 0.02)');
      blueGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = blueGlow;
      ctx.fillRect(0, 0, width, height);
    };

    let lastFrame = 0;
    const throttledRender = (timestamp: number) => {
      if (timestamp - lastFrame >= 33) {
        lastFrame = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawLandscape();
        drawFog();
        drawAmbientLight();
        drawRain();
        drawParticles();

        time += 1;
      }
      animationId = requestAnimationFrame(throttledRender);
    };

    resize();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(throttledRender);

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
