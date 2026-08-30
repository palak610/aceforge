import { Gamepad2 } from "lucide-react";
import { NeonButton, Reveal } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";

export function Squad() {
  return (
    <section id="multiplayer" className="relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/10 to-background" />
      <div className="grid-bg absolute inset-0 opacity-25" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <Reveal>
          <div className="relative overflow-hidden border border-primary/50 bg-card/85 p-5 sm:p-8 md:p-12 backdrop-blur-md clip-angular shadow-[0_0_60px_-20px_var(--neon)]">
            <div className="animate-drift-a pointer-events-none absolute -top-24 -right-16 size-[26rem] rounded-full bg-primary/25 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[20, 45, 70].map((top, i) => (
                <span
                  key={top}
                  className="absolute h-px w-1/2 bg-linear-to-r from-transparent via-accent to-transparent"
                  style={{
                    top: `${top}%`,
                    animation: `line-run ${6 + i * 2}s linear ${i}s infinite`,
                  }}
                />
              ))}
            </div>

            <div className="relative grid items-center gap-6 sm:gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <span className="hud-label border border-accent/60 bg-background/80 px-2.5 sm:px-3 py-1 font-mono text-[0.62rem] sm:text-[0.68rem] font-bold text-accent clip-notch">
                  ● MULTIPLAYER SQUAD SPECIAL
                </span>
                <h2 className="mt-4 sm:mt-5 font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-foreground leading-[1.05]">
                  Bring Your <span className="text-gradient-neon">Squad.</span>
                </h2>
                <p className="mt-2.5 sm:mt-3 font-ui text-sm sm:text-base tracking-wide text-muted-foreground">
                  Four players. One big screen. Maximum couch co-op rivalry.
                </p>

                <div className="mt-5 sm:mt-6 flex gap-2 sm:gap-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="grid size-9 sm:size-11 place-items-center border border-primary/50 bg-background/80 text-primary clip-notch"
                      style={{ animation: `pulse-dot 2.4s ease-in-out ${i * 0.25}s infinite` }}
                    >
                      <Gamepad2 className="size-4 sm:size-5" strokeWidth={1.6} />
                    </span>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8">
                  <NeonButton
                    href="/book"
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => soundEngine.playClick()}
                  >
                    Book Squad Pass
                  </NeonButton>
                </div>
              </div>

              <div className="relative border border-primary/50 bg-background/90 p-5 sm:p-8 text-center clip-angular shadow-[0_0_30px_-10px_var(--neon)]">
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-primary" />
                <div className="hud-label text-muted-foreground font-mono text-[0.65rem] sm:text-xs">
                  4 Players • 1 Screen
                </div>
                <div
                  className="mt-2 sm:mt-3 font-display text-5xl sm:text-7xl lg:text-8xl font-black text-gradient-neon"
                  style={{
                    filter:
                      "drop-shadow(0 0 34px color-mix(in oklab, var(--neon) 55%, transparent))",
                  }}
                >
                  ₹400
                </div>
                <div className="mt-1 font-mono text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.24em] text-accent uppercase">
                  FLAT ARENA RATE
                </div>
                <div className="mt-4 sm:mt-5 border-t border-border/60 pt-3 sm:pt-4 font-ui text-[0.68rem] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] text-muted-foreground uppercase">
                  Includes 4 DualSense Wireless Controllers
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
