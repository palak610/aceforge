import { useState } from "react";
import racingImg from "@/assets/racing-sim.png";
import vrImg from "@/assets/vr.jpg";
import { RACING_GAMES, VR_GAMES } from "@/data/arena";
import { NeonButton, Reveal } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";
import { Gauge, Sparkles, Glasses, Zap, Compass, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const VR_MODES = [
  {
    name: "Beat Saber",
    desc: "120 FPS 6DoF Laser Rhythm Immersion",
    fov: "120° FOV",
    motion: "Full Room-Scale",
  },
  {
    name: "Half-Life: Alyx",
    desc: "Photorealistic Physics & Hand Tracking",
    fov: "Dual 4K OLED",
    motion: "Spatial Audio 3D",
  },
  {
    name: "Sim Racing VR",
    desc: "Direct Cockpit Depth Perception",
    fov: "90Hz Low-Latency",
    motion: "Cockpit Bound",
  },
];

export function RacingVr() {
  // Racing Cockpit Interactive State
  const [gear, setGear] = useState(4);
  const [rpm, setRpm] = useState(82);
  const [speed, setSpeed] = useState(268);
  const [isRevving, setIsRevving] = useState(false);

  // VR Interactive State
  const [activeVrMode, setActiveVrMode] = useState<(typeof VR_MODES)[0]>(VR_MODES[0]!);
  const vrMode = activeVrMode || VR_MODES[0]!;

  const handleThrottle = () => {
    setIsRevving(true);
    soundEngine.playEngineRev(0.9);
    setRpm(98);
    setSpeed((s) => Math.min(320, s + 18));
    setTimeout(() => {
      setRpm(82);
      setIsRevving(false);
    }, 450);
  };

  const handleGearShift = (direction: "up" | "down") => {
    soundEngine.playClick();
    if (direction === "up" && gear < 6) {
      setGear((g) => g + 1);
      soundEngine.playEngineRev(0.7);
      setSpeed((s) => s + 15);
    } else if (direction === "down" && gear > 1) {
      setGear((g) => g - 1);
      soundEngine.playEngineRev(0.85);
      setSpeed((s) => Math.max(80, s - 20));
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* RACING COCKPIT */}
        <Reveal>
          <article
            id="racing"
            className="group relative min-h-[32rem] sm:min-h-[38rem] overflow-hidden border border-primary/40 clip-angular scroll-mt-24 bg-card/80 shadow-[0_0_40px_-15px_var(--neon)]"
          >
            <img
              src={racingImg}
              alt="Ace Forge Arena racing cockpits with neon F1 wall"
              width={1280}
              height={900}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/30" />
            <div className="grid-bg absolute inset-0 opacity-20 pointer-events-none" />

            {/* speed lines accelerate on hover */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 transition-opacity duration-500 group-hover:opacity-100">
              {[18, 34, 52, 68, 82].map((top, i) => (
                <span
                  key={top}
                  className="absolute h-px w-1/3 bg-linear-to-r from-transparent via-accent to-transparent"
                  style={{
                    top: `${top}%`,
                    animation: `line-run ${2.4 + i * 0.6}s linear ${i * 0.4}s infinite`,
                  }}
                />
              ))}
            </div>

            <div className="relative flex h-full min-h-[32rem] sm:min-h-[38rem] flex-col justify-end p-4 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="hud-label border border-primary/50 bg-background/80 px-2 py-0.5 text-primary font-mono font-bold text-[0.6rem] sm:text-[0.68rem]">
                  ZONE // SIM RACING COCKPIT
                </span>
                <span className="hud-label border border-accent/50 bg-background/80 px-2 py-0.5 text-accent font-mono font-bold text-[0.6rem] sm:text-[0.68rem]">
                  DIRECT DRIVE
                </span>
              </div>

              <h3 className="mt-2.5 sm:mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-foreground">
                Buckle Up.
              </h3>
              <p className="mt-1.5 sm:mt-2 max-w-sm text-xs sm:text-sm text-muted-foreground font-ui">
                Direct-drive force feedback, hydraulic load-cell pedals, and immersive curved triple
                screens.
              </p>

              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
                {RACING_GAMES.map((g) => (
                  <span
                    key={g}
                    className="hud-label border border-primary/30 bg-background/70 px-2 sm:px-2.5 py-0.5 sm:py-1 clip-notch font-mono text-[0.6rem] sm:text-[0.65rem]"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Interactive Telemetry HUD with Throttle & Shift */}
              <div className="mt-4 sm:mt-5 max-w-md border border-primary/40 bg-background/90 p-3 sm:p-3.5 backdrop-blur-md clip-notch space-y-2 sm:space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground flex items-center gap-1 text-[0.65rem] sm:text-xs">
                    <Gauge className="size-3.5 text-accent" /> RPM TACHOMETER
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="text-primary font-bold text-[0.68rem] sm:text-xs">GEAR // {gear}</span>
                    {rpm > 92 && (
                      <span className="animate-rpm-shift font-bold text-destructive text-[0.6rem] sm:text-[0.65rem] uppercase">
                        SHIFT!
                      </span>
                    )}
                  </div>
                </div>

                {/* Animated RPM Bar */}
                <div className="h-2.5 sm:h-3 w-full overflow-hidden bg-muted/60 clip-notch flex p-0.5 gap-0.5">
                  {Array.from({ length: 18 }).map((_, idx) => {
                    const threshold = (idx / 18) * 100;
                    const isLit = rpm >= threshold;
                    const isRed = idx >= 15;
                    const isYellow = idx >= 11 && idx < 15;
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "h-full flex-1 transition-all duration-75",
                          isLit
                            ? isRed
                              ? "bg-destructive shadow-[0_0_8px_#ef4444]"
                              : isYellow
                                ? "bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                                : "bg-emerald-400 shadow-[0_0_6px_#10b981]"
                            : "bg-background/40",
                        )}
                      />
                    );
                  })}
                </div>

                {/* Telemetry Stats & Shifter Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-border/40 font-mono text-xs">
                  <div className="flex gap-2.5 sm:gap-3 text-[0.65rem] sm:text-xs">
                    <span>
                      SPD: <strong className="text-accent">{speed} KM/H</strong>
                    </span>
                    <span className="text-muted-foreground">LAP: 01:24.89</span>
                  </div>

                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleGearShift("down")}
                      className="border border-border bg-card px-2 py-0.5 text-[0.62rem] sm:text-[0.65rem] font-bold text-muted-foreground hover:text-foreground clip-notch"
                    >
                      ▼ SHIFT
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGearShift("up")}
                      className="border border-border bg-card px-2 py-0.5 text-[0.62rem] sm:text-[0.65rem] font-bold text-primary hover:bg-primary/20 clip-notch"
                    >
                      ▲ SHIFT
                    </button>
                    <button
                      type="button"
                      onClick={handleThrottle}
                      onMouseEnter={() => soundEngine.playHover()}
                      className={cn(
                        "bg-primary px-2 sm:px-2.5 py-0.5 text-[0.62rem] sm:text-[0.65rem] font-bold uppercase text-primary-foreground clip-notch transition-all shadow-[0_0_12px_var(--neon)] active:scale-95",
                        isRevving && "scale-105 bg-accent",
                      )}
                    >
                      REV ENGINE
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
                <div>
                  <div className="hud-label text-muted-foreground text-[0.62rem] sm:text-[0.68rem]">Standard Hourly Rate</div>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-black text-gradient-neon">
                      ₹150
                    </span>
                    <span className="hud-label text-muted-foreground">/ Hour</span>
                  </div>
                </div>

                <NeonButton
                  href="/book"
                  variant="primary"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                >
                  Book Racing Cockpit
                </NeonButton>
              </div>
            </div>
          </article>
        </Reveal>

        {/* VR IMMERSION */}
        <Reveal delay={120}>
          <article
            id="vr"
            className="group relative min-h-[32rem] sm:min-h-[38rem] overflow-hidden border border-accent/40 clip-angular scroll-mt-24 bg-card/80 shadow-[0_0_40px_-15px_rgba(0,168,255,0.2)]"
          >
            <img
              src={vrImg}
              alt="Gamer wearing a VR headset surrounded by purple and blue light"
              width={1280}
              height={900}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-background/25" />
            <div className="grid-bg absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_75%)] pointer-events-none" />

            <div className="relative flex h-full min-h-[32rem] sm:min-h-[38rem] flex-col justify-end p-4 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="hud-label border border-accent/60 bg-background/80 px-2 py-0.5 text-accent font-mono font-bold text-[0.6rem] sm:text-[0.68rem]">
                  ZONE // VIRTUAL REALITY
                </span>
                <span className="hud-label border border-primary/60 bg-background/80 px-2 py-0.5 text-primary font-mono font-bold text-[0.6rem] sm:text-[0.68rem]">
                  6DoF SPATIAL
                </span>
              </div>

              <h3 className="mt-2.5 sm:mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-foreground">
                Reality Is Optional.
              </h3>
              <p className="mt-1.5 sm:mt-2 max-w-sm text-xs sm:text-sm text-muted-foreground font-ui">
                Room-scale spatial boundaries, dual 4K resolution displays, and haptic controllers.
              </p>

              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5">
                {VR_GAMES.map((g) => (
                  <span
                    key={g}
                    className="hud-label border border-accent/30 bg-background/70 px-2 sm:px-2.5 py-0.5 sm:py-1 clip-notch font-mono text-[0.6rem] sm:text-[0.65rem]"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Interactive VR Mode Selector */}
              <div className="mt-4 sm:mt-5 max-w-md border border-accent/40 bg-background/90 p-3 sm:p-3.5 backdrop-blur-md clip-notch space-y-2 sm:space-y-2.5">
                <span className="hud-label text-muted-foreground flex items-center gap-1.5 text-[0.62rem] sm:text-[0.68rem]">
                  <Glasses className="size-3.5 text-primary" /> Immersion Matrix Selector
                </span>

                <div className="grid grid-cols-3 gap-1.5">
                  {VR_MODES.map((mode) => (
                    <button
                      key={mode.name}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setActiveVrMode(mode);
                      }}
                      onMouseEnter={() => soundEngine.playHover()}
                      className={cn(
                        "p-1.5 sm:p-2 text-left font-ui text-[0.62rem] sm:text-[0.68rem] font-bold uppercase clip-notch transition-all",
                        vrMode.name === mode.name
                          ? "border border-accent bg-accent/20 text-accent shadow-[0_0_12px_rgba(0,168,255,0.4)]"
                          : "border border-border/60 bg-card/60 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <div className="truncate font-display">{mode.name}</div>
                      <div className="text-[0.55rem] sm:text-[0.58rem] font-mono text-muted-foreground">
                        {mode.fov}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-2 border border-border/40 bg-background/60 font-mono text-[0.62rem] sm:text-[0.68rem] flex justify-between items-center gap-2">
                  <span className="text-muted-foreground truncate">{vrMode.desc}</span>
                  <span className="text-accent font-bold shrink-0">{vrMode.motion}</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
                <div>
                  <div className="hud-label text-muted-foreground text-[0.62rem] sm:text-[0.68rem]">Rate Options</div>
                  <div className="mt-0.5 flex flex-wrap items-baseline gap-1.5 sm:gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-black text-gradient-neon">
                      ₹150
                    </span>
                    <span className="hud-label text-muted-foreground">/ Hour</span>
                    <span className="text-[0.68rem] sm:text-xs font-mono text-accent ml-1 sm:ml-2">
                      (Quick 30m: <strong>₹100</strong>)
                    </span>
                  </div>
                </div>

                <NeonButton
                  href="/book"
                  variant="ghost"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                >
                  Enter VR Arena
                </NeonButton>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
