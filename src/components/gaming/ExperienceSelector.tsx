import { useState } from "react";
import { Gamepad2, Monitor, Car, Glasses, ArrowRight, CheckCircle2, Clock, Zap, Cpu, Sparkles, Activity } from "lucide-react";
import { type PricingTier } from "@/data/gamingZone";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { AnimatedNumber } from "@/components/arena/PageTransition";
import { cn } from "@/lib/utils";

interface ExperienceSelectorProps {
  selectedExpId?: string;
  onProceedToBooking: (experienceId: string, durationId: string, tier: PricingTier) => void;
}

const ICONS: Record<string, typeof Gamepad2> = {
  ps5: Gamepad2,
  pc: Monitor,
  racing: Car,
  vr: Glasses,
};

export function ExperienceSelector({
  selectedExpId = "ps5",
  onProceedToBooking,
}: ExperienceSelectorProps) {
  const { experiences, calculateExperiencePrice } = useArenaStore();

  const [activeExpId, setActiveExpId] = useState(selectedExpId);
  const activeExp = experiences.find((e) => e.id === activeExpId) || experiences[0]!;

  const [activeDurationId, setActiveDurationId] = useState(activeExp.durationOptions[0]?.id || "1h");
  const [activeTier, setActiveTier] = useState<PricingTier>("regular");

  const handleExpChange = (expId: string) => {
    soundEngine.playActivate();
    setActiveExpId(expId);
    const exp = experiences.find((e) => e.id === expId);
    if (exp && !exp.durationOptions.some((d) => d.id === activeDurationId)) {
      setActiveDurationId(exp.durationOptions[0]?.id || "1h");
    }
  };

  const handleDurationChange = (durId: string) => {
    soundEngine.playClick();
    setActiveDurationId(durId);
  };

  const handleTierChange = (tier: PricingTier) => {
    soundEngine.playClick();
    setActiveTier(tier);
  };

  const calculatedPrice = calculateExperiencePrice(activeExp.id, activeDurationId, activeTier);
  const activeDurationObj = activeExp.durationOptions.find((d) => d.id === activeDurationId);

  return (
    <section id="experience-selector" className="py-12 sm:py-16 border-t border-[#1a1a28] bg-[#0c0c12] relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/15 blur-[150px] animate-pulse" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 font-mono text-[0.68rem] font-bold tracking-widest text-primary uppercase mb-2 shadow-lg">
            <Zap className="size-3.5" />
            <span>Interactive Terminal // Real-Time Rates</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
            Experience & Duration Matrix
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-ui">
            Select your platform, pick your session duration, and toggle timing tiers to calculate transparent pricing instantly.
          </p>
        </div>

        {/* Platform Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#14141e]/95 border border-[#262638] p-2 rounded-2xl w-full max-w-2xl shadow-xl">
            {experiences.map((exp) => {
              const Icon = ICONS[exp.id] || Gamepad2;
              const isSelected = activeExpId === exp.id;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => handleExpChange(exp.id)}
                  className={cn(
                    "flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-ui text-xs font-black uppercase tracking-wider transition-all",
                    isSelected
                      ? "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-[0_0_25px_-3px_var(--neon)] scale-102"
                      : "text-muted-foreground hover:text-foreground hover:bg-[#1a1a28]",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{exp.id.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Calculator Card */}
        <div className="rounded-3xl border border-[#27273c] bg-[#111118]/95 overflow-hidden shadow-2xl relative">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Left Image & Specs */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] overflow-hidden">
              <img
                src={activeExp.image}
                alt={activeExp.name}
                className="size-full object-cover object-center brightness-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#111118]/60 to-[#111118]" />

              <div className="absolute top-4 left-4">
                <span className="rounded-xl bg-[#09090e]/95 border border-primary/50 px-3 py-1 font-mono text-[0.65rem] font-bold text-primary backdrop-blur-md uppercase shadow-lg flex items-center gap-1.5">
                  <Activity className="size-3 text-emerald-400 animate-pulse" />
                  <span>{activeExp.type}</span>
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
                <h3 className="font-display text-2xl font-black uppercase text-foreground">
                  {activeExp.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-ui">
                  {activeExp.description}
                </p>
              </div>
            </div>

            {/* Right Interactive Configuration */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Hardware Specs */}
                <div>
                  <span className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold tracking-widest block mb-2.5">
                    Hardware Specification
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {activeExp.hardware.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-2 rounded-xl border border-[#242436] bg-[#161622] p-2.5 font-mono text-xs text-foreground hover:border-primary/40 transition-colors"
                      >
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Options */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold tracking-widest">
                      Select Session Duration
                    </span>
                    <span className="text-[0.65rem] font-mono text-primary font-bold">
                      {activeDurationObj?.label} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {activeExp.durationOptions.map((dur) => {
                      const isSelected = activeDurationId === dur.id;
                      const price = calculateExperiencePrice(activeExp.id, dur.id, activeTier);
                      return (
                        <button
                          key={dur.id}
                          type="button"
                          onMouseEnter={() => soundEngine.playHover()}
                          onClick={() => handleDurationChange(dur.id)}
                          className={cn(
                            "p-3 rounded-2xl border text-left transition-all relative overflow-hidden",
                            isSelected
                              ? "border-primary bg-primary/15 shadow-[0_0_20px_-5px_var(--neon)] scale-102"
                              : "border-[#242436] bg-[#151520] hover:border-[#35354e]",
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <Clock className={cn("size-3.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                            {dur.minutes >= 120 && (
                              <span className="text-[0.55rem] font-mono font-bold text-accent uppercase">
                                Best Value
                              </span>
                            )}
                          </div>
                          <div className="mt-2 font-ui text-xs font-bold text-foreground">
                            {dur.label}
                          </div>
                          <div className="mt-1 font-mono text-sm font-black text-gradient-neon">
                            ₹{price}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timing Tier Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold tracking-widest">
                      Timing Tier
                    </span>
                    <span className="text-[0.65rem] font-mono text-emerald-400 font-bold">
                      {activeTier === "regular" && "Standard Off-Peak (11 AM - 5 PM)"}
                      {activeTier === "peak" && "Rush Peak Hours (5 PM - 11 PM)"}
                      {activeTier === "weekend" && "Weekend Super Rush (Sat - Sun)"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: "regular", label: "Standard (Off-Peak)" },
                        { id: "peak", label: "Peak (Evening)" },
                        { id: "weekend", label: "Weekend Rush" },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onMouseEnter={() => soundEngine.playHover()}
                        onClick={() => handleTierChange(t.id)}
                        className={cn(
                          "py-2.5 px-3 rounded-xl border text-center font-ui text-xs font-bold uppercase tracking-wider transition-all",
                          activeTier === t.id
                            ? "border-primary bg-primary/20 text-primary shadow-sm"
                            : "border-[#222234] bg-[#14141e] text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Price Bar with AnimatedNumber Counter */}
              <div className="pt-6 border-t border-[#1f1f2e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[0.62rem] font-mono text-muted-foreground uppercase font-bold block">
                    Calculated Total ({activeDurationObj?.label} • {activeTier.toUpperCase()})
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-display text-4xl font-black text-gradient-neon filter drop-shadow-[0_0_20px_rgba(123,44,255,0.4)]">
                      <AnimatedNumber value={calculatedPrice} prefix="₹" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      / {activeExp.name}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => {
                    soundEngine.playActivate();
                    onProceedToBooking(activeExp.id, activeDurationId, activeTier);
                  }}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-primary-foreground font-ui text-xs font-black uppercase tracking-widest shadow-[0_0_25px_-5px_var(--neon)] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Select & Book Session</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
