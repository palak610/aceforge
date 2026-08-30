import { useState } from "react";
import pcImg from "@/assets/pc-arena.jpg";
import { Counter, Reveal, SectionHeading, NeonButton } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";
import { Cpu, Zap, Monitor, Activity, CheckCircle2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const BENCHMARKS = [
  {
    id: "valorant",
    game: "VALORANT",
    fps: 540,
    fps1Low: 420,
    frametime: "1.8ms",
    temp: "56°C",
    preset: "Competitive Low (MAX FPS)",
    hertz: "240Hz",
    specs: "RTX 4080 Super • 240Hz 0.5ms • Wooting 60HE",
  },
  {
    id: "cs2",
    game: "COUNTER-STRIKE 2",
    fps: 410,
    fps1Low: 310,
    frametime: "2.4ms",
    temp: "59°C",
    preset: "High Preset / Reflex ON",
    hertz: "240Hz",
    specs: "RTX 4080 Super • G-Sync Pro • G Pro X Superlight",
  },
  {
    id: "cyberpunk",
    game: "CYBERPUNK 2077",
    fps: 145,
    fps1Low: 118,
    frametime: "6.9ms",
    temp: "64°C",
    preset: "4K Ray Tracing Overdrive + DLSS 3.5",
    hertz: "180Hz",
    specs: "RTX 4090 Rig • 32GB DDR5 6000MHz",
  },
  {
    id: "warzone",
    game: "CALL OF DUTY: WARZONE",
    fps: 220,
    fps1Low: 175,
    frametime: "4.5ms",
    temp: "61°C",
    preset: "Ultra 1440p / FidelityFX CAS",
    hertz: "240Hz",
    specs: "Fiber 1Gbps Dedicated LAN Line",
  },
];

const FEATURES = [
  "High Performance Gaming PCs (RTX 4080 / 4090 Tier)",
  "240Hz – 360Hz Fast-IPS & OLED Displays",
  "Rapid Trigger & Optical Mechanical Keyboards",
  "Esports-Grade Ultra-Lightweight Mice (Sub-60g)",
  "Studio-Grade Spatial Audio Headsets with Noise Isolation",
  "Dedicated Ultra-Low Ping 1 Gbps Fiber Dual-Link",
];

export function PcArena() {
  const [activeBench, setActiveBench] = useState<(typeof BENCHMARKS)[0]>(BENCHMARKS[0]!);
  const bench = activeBench || BENCHMARKS[0]!;

  const handleSelectGame = (b: (typeof BENCHMARKS)[0]) => {
    soundEngine.playClick();
    setActiveBench(b);
  };

  return (
    <section id="pc-arena" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20">
      <Reveal>
        <SectionHeading
          kicker="Zone // PC Arena"
          title="The PC Arena"
          subtitle="Built to run your game at its peak competitive potential."
        />
      </Reveal>

      <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2">
        {/* Left Visual & Interactive HUD Benchmark Card */}
        <Reveal>
          <div className="group relative overflow-hidden border border-primary/40 bg-card/80 clip-angular shadow-[0_0_40px_-15px_var(--neon)]">
            <img
              src={pcImg}
              alt="Premium gaming PC battlestation with ultrawide monitor and mechanical keyboard"
              width={1280}
              height={900}
              loading="lazy"
              className="aspect-4/3 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
            <div className="scanlines absolute inset-0 opacity-25 pointer-events-none" />

            <div className="absolute top-3 sm:top-5 left-3 sm:left-5 flex flex-wrap gap-1.5 sm:gap-2">
              <span className="hud-label border border-accent/60 bg-background/80 px-2 sm:px-2.5 py-0.5 sm:py-1 text-accent font-mono font-bold text-[0.6rem] sm:text-[0.68rem]">
                RIG // 01-08 ESPORTS SPEC
              </span>
              <span className="hud-label border border-primary/60 bg-background/80 px-2 sm:px-2.5 py-0.5 sm:py-1 text-primary font-mono font-bold flex items-center gap-1 text-[0.6rem] sm:text-[0.68rem]">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>

            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20">
              <NeonButton
                href="/book"
                variant="primary"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
              >
                Book PC Station
              </NeonButton>
            </div>
          </div>

          {/* Interactive Benchmark Game Tabs */}
          <div className="mt-4 border border-border/80 bg-background/80 p-3 sm:p-4 clip-notch space-y-3">
            <div className="flex items-center justify-between">
              <span className="hud-label text-muted-foreground flex items-center gap-1.5 text-[0.62rem] sm:text-[0.68rem]">
                <Activity className="size-3 text-primary" /> Live Benchmark Telemetry
              </span>
              <span className="font-mono text-[0.62rem] sm:text-[0.65rem] text-primary truncate max-w-[150px] sm:max-w-none">{bench.preset}</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {BENCHMARKS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelectGame(b)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={cn(
                    "px-2 sm:px-2.5 py-1.5 sm:py-2 text-left font-ui text-[0.65rem] sm:text-[0.7rem] font-bold uppercase clip-notch transition-all",
                    bench.id === b.id
                      ? "border border-primary bg-primary/20 text-primary shadow-[0_0_14px_var(--neon)]"
                      : "border border-border/60 bg-card/60 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <div className="truncate font-display">{b.game}</div>
                  <div className="text-[0.58rem] sm:text-[0.62rem] font-mono text-accent font-normal">
                    {b.fps} FPS AVG
                  </div>
                </button>
              ))}
            </div>

            {/* Live Performance HUD Gauges */}
            <div className="grid grid-cols-2 gap-px border border-primary/30 bg-primary/20 sm:grid-cols-4 pt-1">
              <div className="bg-background/90 p-2 sm:p-3 text-center">
                <div className="font-display text-lg sm:text-2xl font-black text-gradient-neon">
                  {bench.fps}
                </div>
                <div className="hud-label text-[0.55rem] sm:text-[0.6rem] text-muted-foreground mt-0.5">AVG FPS</div>
              </div>

              <div className="bg-background/90 p-2 sm:p-3 text-center">
                <div className="font-display text-lg sm:text-2xl font-black text-accent">{bench.fps1Low}</div>
                <div className="hud-label text-[0.55rem] sm:text-[0.6rem] text-muted-foreground mt-0.5">1% LOWS</div>
              </div>

              <div className="bg-background/90 p-2 sm:p-3 text-center">
                <div className="font-display text-lg sm:text-2xl font-black text-emerald-400">
                  {bench.frametime}
                </div>
                <div className="hud-label text-[0.55rem] sm:text-[0.6rem] text-muted-foreground mt-0.5">
                  FRAME TIME
                </div>
              </div>

              <div className="bg-background/90 p-2 sm:p-3 text-center">
                <div className="font-display text-lg sm:text-2xl font-black text-primary">{bench.hertz}</div>
                <div className="hud-label text-[0.55rem] sm:text-[0.6rem] text-muted-foreground mt-0.5">
                  REFRESH RATE
                </div>
              </div>
            </div>

            <div className="text-center font-mono text-[0.62rem] sm:text-[0.68rem] text-muted-foreground pt-1 border-t border-border/40 truncate">
              Tested Station Config: <strong className="text-foreground">{bench.specs}</strong>
            </div>
          </div>
        </Reveal>

        {/* Right Feature Breakdown & Hardware Roster */}
        <div className="space-y-4">
          <ul className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 50}>
                <div className="group relative flex h-full items-start gap-3 border border-border bg-card/60 p-4 clip-notch transition-all duration-300 hover:border-primary/70 hover:bg-card/90 hover:shadow-[0_0_20px_-8px_var(--neon)]">
                  <span className="hud-label mt-0.5 text-primary font-mono font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-ui text-sm font-semibold tracking-wide text-foreground/90">
                    {f}
                  </p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Pricing Highlight for PC Special 3H Package */}
          <Reveal delay={300}>
            <div className="border border-primary/60 bg-gradient-to-r from-primary/20 via-background to-accent/10 p-5 clip-notch space-y-2 relative overflow-hidden">
              <div className="holo-foil absolute inset-0 opacity-20 pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="hud-label text-primary font-bold">SPECIAL PC GAMER OFFER</span>
                <span className="border border-primary/60 bg-primary/30 px-2 py-0.5 font-mono text-xs font-bold text-primary clip-notch">
                  SAVE ₹120
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <h4 className="font-display text-lg font-black uppercase text-foreground">
                    3-Hour PC Power Session
                  </h4>
                  <p className="text-xs text-muted-foreground font-ui">
                    Standard ₹120/hr • Special 3 Hours Package Only
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-muted-foreground line-through mr-1.5">
                    ₹360
                  </span>
                  <span className="font-display text-2xl font-black text-gradient-neon">₹240</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
