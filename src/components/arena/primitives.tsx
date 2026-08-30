import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Scroll-triggered reveal wrapper (IntersectionObserver, GPU transforms only). */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </Comp>
  );
}

/** Small HUD chip: "STATUS // READY" */
export function HudChip({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "hud-label inline-flex items-center gap-2 border border-primary/30 bg-card/60 px-3 py-1 clip-notch",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
      {label}
    </span>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  className,
  align = "left",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {kicker ? (
        <div className="mb-3 inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[0.68rem] font-bold tracking-[0.2em] text-primary uppercase clip-notch">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          {kicker}
        </div>
      ) : null}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase text-foreground leading-[1.1]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl font-ui text-sm sm:text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

/** Animated number that counts up when scrolled into view. */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry || !entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/** Primary neon button with magnetic-ish glow + arrow motion. */
export function NeonButton({
  children,
  href,
  variant = "primary",
  className,
  onMouseEnter,
  onClick,
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "ghost";
  className?: string;
  onMouseEnter?: () => void;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      data-cursor={variant === "primary" ? "ENTER" : "VIEW"}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5 font-ui text-sm font-bold tracking-[0.22em] uppercase clip-notch transition-all duration-300",
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:shadow-[0_0_50px_-8px_var(--neon)]"
          : "border border-accent/40 bg-card/40 text-foreground backdrop-blur-md hover:border-accent hover:shadow-[0_0_45px_-12px_var(--neon-blue)]",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        aria-hidden
      />
      <span className="relative">{children}</span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-1.5">
        →
      </span>
    </a>
  );
}
