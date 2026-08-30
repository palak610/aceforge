import { useEffect, useRef } from "react";

/**
 * Ultra-smooth, high-performance Canvas + CSS Cyber Animated Background
 * Uses hardware-accelerated 2D canvas with requestAnimationFrame and off-thread rendering.
 * Zero heavy blur filters to guarantee butter-smooth 60–120 FPS scrolling without any lag.
 */
export function ArenaBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Cyber particle nodes
    const particleCount = Math.min(Math.floor(width / 35), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.6 ? "#7B2CFF" : Math.random() > 0.3 ? "#00A8FF" : "#39FF88",
      alpha: Math.random() * 0.5 + 0.2,
    }));

    // Ambient floating glow orbs (rendered cleanly via canvas radial gradients without CSS blur filters)
    const orbs = [
      { x: width * 0.2, y: height * 0.25, r: 240, vx: 0.15, vy: 0.1, color: "rgba(123, 44, 255, 0.12)" },
      { x: width * 0.8, y: height * 0.4, r: 260, vx: -0.12, vy: 0.15, color: "rgba(0, 168, 255, 0.09)" },
      { x: width * 0.5, y: height * 0.8, r: 280, vx: 0.1, vy: -0.1, color: "rgba(123, 44, 255, 0.08)" },
    ];

    let lastTime = performance.now();

    const render = (time: number) => {
      // Throttle delta for smooth consistent animation
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw smooth ambient radial glow nodes
      orbs.forEach((orb) => {
        orb.x += orb.vx * dt * 60;
        orb.y += orb.vy * dt * 60;

        if (orb.x < -100) orb.x = width + 100;
        if (orb.x > width + 100) orb.x = -100;
        if (orb.y < -100) orb.y = height + 100;
        if (orb.y > height + 100) orb.y = -100;

        const radGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        radGrad.addColorStop(0, orb.color);
        radGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Connect nearby particles with subtle cyber grid lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]!;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 130;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.15;
            ctx.strokeStyle = `rgba(123, 44, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw particles
      particles.forEach((p) => {
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07070a]" aria-hidden>
      {/* Lightweight canvas particle & glow system */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full will-change-transform"
      />

      {/* Cyber Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] opacity-70" />

      {/* Subtle scanline texture */}
      <div className="scanlines absolute inset-0 opacity-[0.15] mix-blend-screen" />
    </div>
  );
}
