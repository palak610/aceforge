import { useState } from "react";
import ps5Img from "@/assets/ps5-lounge.png";
import { NeonButton, Reveal, SectionHeading } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";
import { Gamepad2, Tv, Volume2, Users2, Sparkles, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const POINTS = [
  "PlayStation 5 Pro & Standard Pods",
  "65-inch 4K 120Hz OLED HDR Displays",
  "DualSense Adaptive Triggers & Haptic Feedback",
  "Ultra-Plush Ergonomic Lounge Sofas",
  "PlayStation Ambient Ceiling Neon Canopy",
  "Couch Co-op, FIFA/EA FC & Mortal Kombat Tournaments",
];

export function Ps5() {
  const [triggerPulled, setTriggerPulled] = useState(false);
  const [hapticIntensity, setHapticIntensity] = useState("DYNAMIC TENSION");

  const handlePullTrigger = () => {
    setTriggerPulled(true);
    soundEngine.playActivate();
    setHapticIntensity("HAPTIC RUMBLE ACTIVE // 120Hz");
    setTimeout(() => {
      setTriggerPulled(false);
      setHapticIntensity("DYNAMIC TENSION");
    }, 600);
  };

  return (
    <section id="ps5" className="relative border-y border-border/60 bg-card/25 scroll-mt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <Reveal className="order-2 lg:order-1">
          <SectionHeading
            kicker="Zone // PlayStation Lounge"
            title="Console. Redefined."
            subtitle="Grab the DualSense controller. Pick your squad game. Own the arena."
          />

          <ul className="mt-6 sm:mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li
                key={p}
                className="group flex items-center gap-2.5 sm:gap-3 border border-border/70 bg-background/60 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-semibold clip-notch transition-all hover:border-accent/70 hover:shadow-[0_0_30px_-14px_var(--neon-blue)]"
              >
                <span className="size-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150 shrink-0" />
                <span className="font-ui text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>

          {/* Interactive DualSense Haptic Tester */}
          <div className="mt-6 border border-primary/40 bg-background/80 p-3.5 sm:p-4 clip-notch space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground flex items-center gap-1.5 text-[0.65rem] sm:text-xs">
                <Gamepad2 className="size-3.5 sm:size-4 text-primary" /> DualSense Haptic Simulator
              </span>
              <span
                className={cn(
                  "font-bold text-[0.62rem] sm:text-[0.68rem] truncate max-w-[140px] sm:max-w-none",
                  triggerPulled ? "text-accent animate-pulse" : "text-muted-foreground",
                )}
              >
                {hapticIntensity}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pt-1">
              <div className="relative flex-1 h-3 bg-muted/50 clip-notch overflow-hidden">
                <div
                  className={cn(
                    "h-full bg-gradient-to-r from-primary to-accent transition-all duration-300",
                    triggerPulled ? "w-full shadow-[0_0_12px_var(--neon)]" : "w-1/3",
                  )}
                />
              </div>

              <button
                type="button"
                onClick={handlePullTrigger}
                onMouseEnter={() => soundEngine.playHover()}
                className="bg-primary/20 border border-primary/60 px-3 py-1.5 text-xs font-ui font-bold uppercase text-primary clip-notch hover:bg-primary hover:text-primary-foreground transition-all shadow-[0_0_12px_-2px_var(--neon)] active:scale-95 text-center"
              >
                Test Adaptive Trigger
              </button>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <NeonButton
              href="/book"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
            >
              Book PS5 Lounge
            </NeonButton>
            <span className="font-mono text-xs text-muted-foreground text-center sm:text-left">
              Rate: <strong className="text-foreground text-sm font-display">₹120 / Hour</strong>
            </span>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <div className="group relative overflow-hidden border border-accent/40 bg-card/80 clip-angular shadow-[0_0_40px_-15px_rgba(0,168,255,0.2)]">
            <img
              src={ps5Img}
              alt="Ace Forge Arena PS5 lounge with neon PlayStation symbols"
              width={1280}
              height={900}
              loading="lazy"
              className="aspect-4/3 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-background/90 via-transparent to-primary/15" />
            <div className="holo-foil absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />

            <div className="absolute right-5 bottom-5 flex gap-2">
              <span className="hud-label border border-accent/60 bg-background/80 px-2.5 py-1 text-accent font-mono font-bold">
                PODS // 01-04 ACTIVE
              </span>
              <span className="hud-label border border-primary/60 bg-background/80 px-2.5 py-1 text-primary font-mono font-bold">
                1-4 PLAYERS
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
