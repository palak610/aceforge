import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * PageTransition — instantaneous lightweight page wrapper with zero artificial boot delays.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="relative animate-fade-in">
      {children}
    </div>
  );
}

/**
 * useStaggerReveal — IntersectionObserver hook that adds 'is-in' class to
 * children of a container element, staggered by `delayMs`.
 */
export function useStaggerReveal(delayMs = 80) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    children.forEach((child) => {
      child.classList.add("reveal");
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        children.forEach((child, i) => {
          setTimeout(() => child.classList.add("is-in"), i * delayMs);
        });
        io.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(container);
    return () => io.disconnect();
  }, [delayMs]);

  return ref;
}

/** Animated 3D Tilt card wrapper */
export function TiltCard({
  children,
  className,
  intensity = 8,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rafId.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(4px)`;
    });
  };

  const handleLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (ref.current) {
      ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    }
  };

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out will-change-transform", className)}
      style={{ transformStyle: "preserve-3d", ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

/** AnimatedCounter that flips numbers when value changes */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => {
      setDisplayValue(value);
      setAnimating(false);
    }, 250);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <span
      className={cn(
        "inline-block transition-all duration-250",
        animating && "scale-110 blur-sm",
        className,
      )}
    >
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
