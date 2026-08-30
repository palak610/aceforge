import { useState } from "react";
import { Gamepad2, Monitor, Car, Glasses, ArrowRight, Check, Zap, Sparkles, Clock } from "lucide-react";
import { EXPERIENCES, type PricingTier } from "@/data/gamingZone";
import { cn } from "@/lib/utils";

interface PricingComparisonProps {
  onBookNow: (experienceId: string) => void;
}

const ICONS: Record<string, typeof Gamepad2> = {
  ps5: Gamepad2,
  pc: Monitor,
  racing: Car,
  vr: Glasses,
};

export function PricingComparison({ onBookNow }: PricingComparisonProps) {
  const [activeTier, setActiveTier] = useState<PricingTier>("regular");

  return (
    <section id="pricing" className="py-12 sm:py-16 border-t border-[#1a1a28] bg-[#09090e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary uppercase mb-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Transparent Rates // Multi-Tier Architecture</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
              Rate Cards & Comparison
            </h2>
          </div>

          {/* Timing Tier Switcher */}
          <div className="flex items-center gap-1.5 bg-[#14141e] p-1.5 rounded-2xl border border-[#242436] shadow-lg">
            {(
              [
                { id: "regular", label: "Standard (Off-Peak)" },
                { id: "peak", label: "Peak (Evening)" },
                { id: "weekend", label: "Weekend Rush" },
              ] as const
            ).map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setActiveTier(tier.id)}
                className={cn(
                  "px-3.5 py-2 rounded-xl font-ui text-xs font-bold uppercase tracking-wider transition-all",
                  activeTier === tier.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#1c1c28]",
                )}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Pricing Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {EXPERIENCES.map((exp) => {
            const Icon = ICONS[exp.id] || Gamepad2;
            const prices = exp.pricing[activeTier] || exp.pricing.regular;

            return (
              <div
                key={exp.id}
                className="rounded-3xl border border-[#242436] bg-[#111118] p-6 flex flex-col justify-between space-y-6 hover:border-primary/60 transition-all duration-300 shadow-xl group"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-xl bg-[#171724] border border-[#27273c] p-2.5 text-primary group-hover:border-primary transition-colors">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-[0.62rem] text-primary uppercase font-bold tracking-wider rounded-md bg-primary/10 border border-primary/30 px-2 py-0.5">
                      {exp.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-black uppercase text-foreground">
                    {exp.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 font-ui">
                    {exp.tagline}
                  </p>
                </div>

                {/* Duration Price Table */}
                <div className="space-y-2 py-3 border-y border-[#1f1f2e]">
                  {exp.durationOptions.map((opt) => {
                    const price = prices[opt.id] ?? 0;
                    return (
                      <div
                        key={opt.id}
                        className="flex items-center justify-between font-mono text-xs py-1.5 border-b border-[#181824] last:border-0"
                      >
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Clock className="size-3 text-primary/70" />
                          <span>{opt.label}</span>
                        </span>
                        <span className="font-bold text-foreground text-sm">₹{price}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={() => onBookNow(exp.id)}
                  className="w-full py-3 rounded-xl bg-[#181826] hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 text-foreground hover:text-primary-foreground font-ui text-xs font-black uppercase tracking-wider border border-[#28283e] hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-md"
                >
                  <span>Book {exp.id.toUpperCase()}</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bulk Packages Strip */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl border border-primary/40 bg-[#12121e]/90 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-[0_0_40px_-10px_rgba(123,44,255,0.25)] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 size-48 rounded-full bg-primary/20 blur-[80px]" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="size-12 rounded-2xl bg-primary/20 border border-primary text-primary grid place-items-center shrink-0 shadow-lg shadow-primary/30">
              <Zap className="size-6" />
            </div>
            <div>
              <h4 className="font-display text-lg font-black uppercase text-foreground">
                Squad Pass & Multi-Hour Packages
              </h4>
              <p className="text-xs text-muted-foreground font-ui mt-0.5">
                Save up to 35% with pre-loaded gaming hours. Available for PC Battlestations and PS5 Lounges.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBookNow("pc")}
            className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-ui text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/30 transition-all shrink-0 text-center relative z-10"
          >
            Claim 3-Hour Pass (₹240)
          </button>
        </div>
      </div>
    </section>
  );
}
