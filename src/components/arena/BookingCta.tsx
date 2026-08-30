import { NeonButton, Reveal } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";

export function BookingCta() {
  return (
    <section
      id="book-cta"
      className="relative overflow-hidden border-y border-primary/25 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-linear-to-b from-primary/15 via-background to-accent/10" />
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[14, 32, 56, 74, 88].map((top, i) => (
          <span
            key={top}
            className="absolute h-px w-1/2 bg-linear-to-r from-transparent via-primary to-transparent"
            style={{
              top: `${top}%`,
              animation: `line-run ${5 + i * 1.4}s linear ${i * 0.9}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24 text-center">
        <Reveal>
          <span className="hud-label border border-primary/50 bg-primary/20 px-3 sm:px-3.5 py-1 text-primary font-mono font-bold clip-notch text-[0.62rem] sm:text-[0.68rem]">
            ● ARENA READY // SESSION SLOTS OPEN
          </span>
          <h2 className="mt-5 sm:mt-6 font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase text-foreground leading-tight">
            YOUR NEXT GAME <span className="text-gradient-neon">STARTS HERE.</span>
          </h2>
          <p className="mt-3 sm:mt-4 font-ui text-sm sm:text-base md:text-lg tracking-wide text-muted-foreground max-w-xl mx-auto">
            Bring your squad. Pick your game. Enter the arena.
          </p>
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <NeonButton
              href="/book"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
            >
              Book Your Session
            </NeonButton>
            <NeonButton
              href="/pricing"
              variant="ghost"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
            >
              Explore Pricing
            </NeonButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
