import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  driftX: number;
  driftY: number;
  phase: number;
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
    }

    resize();

    const starCount = Math.floor((width * height) / 5000);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const base = 0.15 + Math.random() * 0.55;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.05 ? 1.5 + Math.random() : 0.5 + Math.random() * 1,
        opacity: base,
        baseOpacity: base,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const nebulas: Nebula[] = [
      {
        x: width * 0.5,
        y: height * 0.35,
        radius: Math.min(width, height) * 0.45,
        color: "oklch(0.72 0.16 55 / 0.04)",
        driftX: 0.15,
        driftY: 0.08,
        phase: 0,
      },
      {
        x: width * 0.2,
        y: height * 0.6,
        radius: Math.min(width, height) * 0.3,
        color: "oklch(0.65 0.12 280 / 0.025)",
        driftX: -0.1,
        driftY: 0.12,
        phase: Math.PI,
      },
      {
        x: width * 0.8,
        y: height * 0.5,
        radius: Math.min(width, height) * 0.35,
        color: "oklch(0.7 0.14 50 / 0.03)",
        driftX: 0.08,
        driftY: -0.06,
        phase: Math.PI * 1.5,
      },
    ];

    let time = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // Draw nebulas
      for (const n of nebulas) {
        const nx = n.x + Math.sin(time * n.driftX + n.phase) * 30;
        const ny = n.y + Math.cos(time * n.driftY + n.phase) * 20;
        const pulse = 1 + Math.sin(time * 0.5 + n.phase) * 0.08;

        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius * pulse);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw stars
      for (const s of stars) {
        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        s.opacity = s.baseOpacity + twinkle * 0.15;
        if (s.opacity < 0) s.opacity = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.98 0.005 85 / ${s.opacity})`;
        ctx.fill();

        // Subtle glow for larger stars
        if (s.size > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
          glow.addColorStop(0, `oklch(0.98 0.005 85 / ${s.opacity * 0.3})`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      // Occasional shooting star (rare)
      if (Math.random() < 0.003) {
        const sx = Math.random() * width;
        const sy = Math.random() * height * 0.5;
        const len = 40 + Math.random() * 60;
        const angle = Math.PI * 0.25 + (Math.random() - 0.5) * 0.3;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx - Math.cos(angle) * len, sy - Math.sin(angle) * len);
        ctx.strokeStyle = "oklch(0.98 0.005 85 / 0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
      stars.length = 0;
      const newCount = Math.floor((width * height) / 5000);
      for (let i = 0; i < newCount; i++) {
        const base = 0.15 + Math.random() * 0.55;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.05 ? 1.5 + Math.random() : 0.5 + Math.random() * 1,
          opacity: base,
          baseOpacity: base,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
