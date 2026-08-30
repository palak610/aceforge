import { Gamepad2, Monitor, Car, Glasses, ArrowRight, Sparkles, Cpu } from "lucide-react";
import { type Experience } from "@/data/gamingZone";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { TiltCard } from "@/components/arena/PageTransition";

interface QuickPricingProps {
  onSelectExperience: (experienceId: string) => void;
}

const ICONS: Record<string, typeof Gamepad2> = {
  ps5: Gamepad2,
  pc: Monitor,
  racing: Car,
  vr: Glasses,
};

const UNIT_LABELS: Record<string, string> = {
  ps5: "/ hour",
  pc: "/ hour",
  racing: "/ session",
  vr: "/ session",
};

const THEME_ACCENTS: Record<string, { border: string; glow: string; text: string; badgeBg: string }> = {
  ps5: {
    border: "group-hover:border-primary",
    glow: "group-hover:shadow-[0_0_35px_-5px_rgba(123,44,255,0.4)]",
    text: "text-primary",
    badgeBg: "bg-primary/20 text-primary border-primary/40",
  },
  pc: {
    border: "group-hover:border-cyan-400",
    glow: "group-hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.4)]",
    text: "text-cyan-400",
    badgeBg: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
  },
  racing: {
    border: "group-hover:border-amber-400",
    glow: "group-hover:shadow-[0_0_35px_-5px_rgba(251,191,36,0.4)]",
    text: "text-amber-400",
    badgeBg: "bg-amber-500/20 text-amber-400 border-amber-500/40",
  },
  vr: {
    border: "group-hover:border-purple-400",
    glow: "group-hover:shadow-[0_0_35px_-5px_rgba(192,132,252,0.4)]",
    text: "text-purple-400",
    badgeBg: "bg-purple-500/20 text-purple-400 border-purple-500/40",
  },
};

export function QuickPricing({ onSelectExperience }: QuickPricingProps) {
  const { experiences } = useArenaStore();

  return (
    <section id="experiences" className="py-12 sm:py-16 border-t border-[#1a1a28] bg-[#09090d] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary uppercase mb-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Core Platforms // 4 Battle Environments</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
              Gaming Experiences
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md font-ui leading-relaxed">
            All stations feature individual high-speed LAN feeds, air-conditioned acoustic zoning, and tournament peripherals.
          </p>
        </div>

        {/* 4 Interactive 3D Tilt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {experiences.map((exp: Experience) => {
            const Icon = ICONS[exp.id] || Gamepad2;
            const unit = UNIT_LABELS[exp.id] || "/ hour";
            const theme = THEME_ACCENTS[exp.id] || THEME_ACCENTS["ps5"]!;

            return (
              <TiltCard key={exp.id} intensity={8}>
                <div
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`group relative flex flex-col justify-between rounded-3xl border border-[#242436] bg-[#111118]/95 overflow-hidden transition-all duration-500 h-full ${theme.border} ${theme.glow}`}
                >
                  {/* Top Image Box */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.name}
                      className="size-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/40 to-transparent" />

                    {/* Holographic Shimmer on hover */}
                    <div className="animate-holo absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Corner Cyber Accent */}
                    <div className="absolute top-0 right-0 size-8 border-t-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors" />

                    {/* Badge */}
                    <span
                      className={`absolute top-3 right-3 rounded-lg px-2.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase backdrop-blur-md border ${theme.badgeBg}`}
                    >
                      {exp.badge}
                    </span>

                    {/* Icon */}
                    <div className="absolute bottom-3 left-3 size-9 rounded-xl bg-[#09090e]/95 border border-[#2e2e42] grid place-items-center text-primary backdrop-blur-md group-hover:border-primary transition-colors shadow-lg">
                      <Icon className="size-4.5" />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-black uppercase text-foreground group-hover:text-primary transition-colors">
                        {exp.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed font-ui">
                        {exp.tagline}
                      </p>

                      {/* Hardware Pills */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {exp.hardware.slice(0, 2).map((hw) => (
                          <span
                            key={hw}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#171724] border border-[#262638] px-2 py-0.5 text-[0.62rem] font-mono text-muted-foreground"
                          >
                            <Cpu className="size-2.5 text-primary" />
                            <span className="truncate max-w-[120px]">{hw}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="pt-3.5 border-t border-[#1f1f2e] flex items-center justify-between">
                      <div>
                        <span className="text-[0.62rem] font-mono text-muted-foreground block uppercase font-bold">
                          Starting from
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-2xl font-black text-gradient-neon">
                            ₹{exp.startingPrice}
                          </span>
                          <span className="font-mono text-[0.65rem] text-muted-foreground font-bold">
                            {unit}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          onSelectExperience(exp.id);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/25 hover:shadow-primary/45 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <span>Book</span>
                        <ArrowRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
