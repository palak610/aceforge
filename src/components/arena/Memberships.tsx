import { useState } from "react";
import { PC_PLANS, PS5_PLANS, type Plan } from "@/data/arena";
import { Reveal, SectionHeading } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";
import { Link } from "@tanstack/react-router";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function PlanCard({ p, i }: { p: Plan; i: number }) {
  return (
    <Reveal delay={i * 80}>
      <div
        data-cursor="VIEW"
        className={cn(
          "group relative flex h-full flex-col justify-between overflow-hidden p-7 clip-angular transition-all duration-400",
          p.popular
            ? "border-2 border-primary bg-card/95 shadow-[0_0_60px_-15px_var(--neon)] lg:-translate-y-2"
            : "panel hover:-translate-y-1 hover:border-accent/70",
        )}
      >
        {p.popular ? (
          <>
            <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
            <span className="hud-label absolute top-5 right-5 border border-primary bg-primary/20 px-2.5 py-0.5 text-[0.65rem] font-bold text-primary clip-notch flex items-center gap-1">
              <Sparkles className="size-3" /> BEST VALUE
            </span>
          </>
        ) : null}

        <div>
          <div className="hud-label text-muted-foreground font-mono text-[0.65rem]">
            Pass Tier // 0{i + 1}
          </div>
          <div className="mt-4 font-display text-4xl font-black text-gradient-neon">{p.price}</div>
          <div className="mt-2 font-display text-lg font-black tracking-wide uppercase text-foreground">
            {p.hours}
          </div>
          <div className="mt-1.5 font-mono text-xs font-bold text-accent uppercase flex items-center gap-1">
            <CheckCircle2 className="size-3.5" />
            {p.free}
          </div>
          <div className="mt-4 font-mono text-[0.7rem] text-muted-foreground border-t border-border/40 pt-3">
            {p.note}
          </div>
        </div>

        <Link
          to="/book"
          onMouseEnter={() => soundEngine.playHover()}
          onClick={() => soundEngine.playClick()}
          data-cursor="BOOK"
          className={cn(
            "mt-7 inline-flex items-center justify-center gap-2 px-5 py-3 font-ui text-xs font-bold tracking-[0.2em] uppercase clip-notch transition-all duration-300",
            p.popular
              ? "bg-primary text-primary-foreground hover:shadow-[0_0_35px_-6px_var(--neon)]"
              : "border border-border bg-card/60 text-foreground hover:border-primary hover:text-primary",
          )}
        >
          <span>Claim Pass</span> <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </Reveal>
  );
}

export function Memberships() {
  const [platform, setPlatform] = useState<"ps5" | "pc">("ps5");
  const plans = platform === "ps5" ? PS5_PLANS : PC_PLANS;

  const handleTabChange = (p: "ps5" | "pc") => {
    soundEngine.playClick();
    setPlatform(p);
  };

  return (
    <section
      id="memberships"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <Reveal>
          <SectionHeading
            kicker="Loyalty // Passes"
            title="Membership Passes"
            subtitle="Preload gaming hours in advance and enjoy bonus playtime on the house."
          />
        </Reveal>

        {/* Tab Switcher */}
        <Reveal delay={80}>
          <div className="flex items-center gap-2 border border-border/80 bg-background/80 p-1.5 clip-notch w-full sm:w-auto justify-center sm:justify-start">
            <button
              type="button"
              onClick={() => handleTabChange("ps5")}
              onMouseEnter={() => soundEngine.playHover()}
              className={cn(
                "flex-1 sm:flex-initial px-4 sm:px-5 py-2 font-ui text-xs font-bold uppercase clip-notch transition-all text-center",
                platform === "ps5"
                  ? "bg-primary text-primary-foreground shadow-[0_0_16px_var(--neon)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              PS5 Passes
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("pc")}
              onMouseEnter={() => soundEngine.playHover()}
              className={cn(
                "flex-1 sm:flex-initial px-4 sm:px-5 py-2 font-ui text-xs font-bold uppercase clip-notch transition-all text-center",
                platform === "pc"
                  ? "bg-primary text-primary-foreground shadow-[0_0_16px_var(--neon)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              PC Passes
            </button>
          </div>
        </Reveal>
      </div>

      <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, i) => (
          <PlanCard key={`${platform}-${p.price}`} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
