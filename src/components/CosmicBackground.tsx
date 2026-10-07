import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  depth: number; // 0..1, higher = closer (more parallax)
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  driftX: number;
  driftY: number;
  phase: number;
  depth: number;
}

export function CosmicBackground({ subtle = false }: { subtle?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let visible = true;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tokens = getComputedStyle(document.documentElement);
    const starColor = tokens.getPropertyValue("--foreground").trim();
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Pointer + scroll state (with smoothing)
    const pointer = { tx: 0, ty: 0, x: 0, y: 0, active: false };
    let scrollY = window.scrollY;
    let smoothScroll = scrollY;

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resize();

    const makeStars = () => {
      const count = Math.min(subtle ? 130 : 500, Math.floor((width * height) / (subtle ? 10500 : 4000)));
      const arr: Star[] = [];
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        const base = 0.15 + Math.random() * 0.55;
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.05 ? 1.4 + Math.random() : 0.4 + Math.random() * 1,
          depth,
          baseOpacity: base,
          twinkleSpeed: 0.5 + Math.random() * 1.5,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        });
      }
      return arr;
    };

    let stars = makeStars();

    const nebulas: Nebula[] = [
      {
        x: width * 0.5,
        y: height * 0.35,
        radius: Math.min(width, height) * 0.5,
        color: tokens.getPropertyValue("--cosmic-copper").trim(),
        driftX: 0.15,
        driftY: 0.08,
        phase: 0,
        depth: 0.3,
      },
      {
        x: width * 0.2,
        y: height * 0.6,
        radius: Math.min(width, height) * 0.35,
        color: tokens.getPropertyValue("--cosmic-cool").trim(),
        driftX: -0.1,
        driftY: 0.12,
        phase: Math.PI,
        depth: 0.5,
      },
      {
        x: width * 0.8,
        y: height * 0.5,
        radius: Math.min(width, height) * 0.4,
        color: tokens.getPropertyValue("--cosmic-warm").trim(),
        driftX: 0.08,
        driftY: -0.06,
        phase: Math.PI * 1.5,
        depth: 0.7,
      },
    ];

    let time = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      if (!motion.matches) time += subtle ? 0.004 : 0.008;

      // Smooth pointer + scroll
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      smoothScroll += (scrollY - smoothScroll) * 0.1;

      const scrollOffset = (subtle ? smoothScroll - (canvas?.parentElement?.getBoundingClientRect().top ?? 0) - window.scrollY : smoothScroll) * 0.15; // parallax from scroll

      // Nebulas (react to pointer)
      for (const n of nebulas) {
        const nx =
          n.x +
          Math.sin(time * n.driftX + n.phase) * 30 +
          pointer.x * n.depth * 40;
        const ny =
          n.y +
          Math.cos(time * n.driftY + n.phase) * 20 +
          pointer.y * n.depth * 40 -
          scrollOffset * n.depth;
        const pulse = 1 + Math.sin(time * 0.5 + n.phase) * 0.08;

        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.radius * pulse);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Mouse influence radius
      const mouseWorldX = (pointer.x * 0.5 + 0.5) * width;
      const mouseWorldY = (pointer.y * 0.5 + 0.5) * height;
      const influenceR = Math.min(width, height) * 0.25;
      const influenceR2 = influenceR * influenceR;

      // Stars: drift + parallax + subtle attraction toward cursor
      for (const s of stars) {
        if (!motion.matches) { s.x += s.vx; s.y += s.vy; }

        // wrap
        if (s.x < -5) s.x = width + 5;
        if (s.x > width + 5) s.x = -5;
        if (s.y < -5) s.y = height + 5;
        if (s.y > height + 5) s.y = -5;

        const parallaxX = pointer.x * s.depth * 25;
        const parallaxY = pointer.y * s.depth * 25 - scrollOffset * s.depth;

        let px = s.x + parallaxX;
        let py = s.y + parallaxY;

        // subtle pull toward mouse for close stars
        if (pointer.active) {
          const dx = mouseWorldX - s.x;
          const dy = mouseWorldY - s.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < influenceR2) {
            const f = (1 - d2 / influenceR2) * s.depth * 8;
            px += (dx / Math.sqrt(d2 + 0.01)) * f;
            py += (dy / Math.sqrt(d2 + 0.01)) * f;
          }
        }

        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const opacity = Math.max(0, s.baseOpacity + twinkle * 0.2);
        const size = s.size * (0.7 + s.depth * 0.6);

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.globalAlpha = opacity * (subtle ? 0.55 : 1);
        ctx.fill();

        if (size > 1.1) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, size * 3.5);
          glow.addColorStop(0, `color-mix(in oklab, ${starColor} ${opacity * 35}%, transparent)`);
          glow.addColorStop(1, "transparent");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      // Occasional shooting star
      if (!subtle && !motion.matches && Math.random() < 0.003) {
        const sx = Math.random() * width;
        const sy = Math.random() * height * 0.5;
        const len = 40 + Math.random() * 60;
        const angle = Math.PI * 0.25 + (Math.random() - 0.5) * 0.3;

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx - Math.cos(angle) * len, sy - Math.sin(angle) * len);
        ctx.strokeStyle = starColor;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      if (visible && !motion.matches) animationId = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      cancelAnimationFrame(animationId);
      if (visible) draw();
    });
    observer.observe(canvas);
    const onMotionChange = () => { cancelAnimationFrame(animationId); if (visible) draw(); };
    motion.addEventListener("change", onMotionChange);
    draw();

    const onPointerMove = (e: PointerEvent) => {
      if (motion.matches || !visible) return;
      // normalize -1..1 relative to viewport
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      pointer.active = false;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onResize = () => {
      resize();
      stars = makeStars();
      if (motion.matches) draw();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [subtle]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
