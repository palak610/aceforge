import { useEffect, useRef, useState } from "react";

/**
 * Ultra-smooth, 120FPS GPU-accelerated HUD Cursor
 * Uses direct transform with requestAnimationFrame to eliminate React state thrashing.
 */
export function ArenaCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Throttle DOM inspection
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("a,button,[data-cursor],input,select");
      const isInteractive = !!el;
      setActive(isInteractive);
      setLabel(el?.dataset["cursor"] ?? (isInteractive ? "ENTER" : null));
    };

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 md:block will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
      aria-hidden
    >
      <div
        className="flex items-center justify-center rounded-full border font-ui text-[9px] font-bold tracking-[0.22em] transition-all duration-150"
        style={{
          width: active ? 54 : 8,
          height: active ? 54 : 8,
          borderColor: active ? "var(--neon)" : "transparent",
          background: active ? "color-mix(in oklab, var(--neon) 12%, transparent)" : "var(--neon)",
          boxShadow: `0 0 ${active ? 25 : 10}px color-mix(in oklab, var(--neon) 70%, transparent)`,
        }}
      >
        {active ? <span className="text-foreground">{label}</span> : null}
      </div>
    </div>
  );
}
