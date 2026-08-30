import { FOOD } from "@/data/arena";
import { Reveal, SectionHeading } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";
import { Coffee, Flame, UtensilsCrossed, Zap, Wine, ShieldCheck } from "lucide-react";

const FOOD_ICONS: Record<string, React.ElementType> = {
  Monster: Zap,
  "Red Bull": Flame,
  "Cold Coffee": Coffee,
  Snacks: UtensilsCrossed,
  Noodles: UtensilsCrossed,
  Mocktails: Wine,
};

export function Food() {
  return (
    <section id="food" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20">
      <Reveal>
        <SectionHeading
          kicker="Refuel // Cafe"
          title="Fuel Your Game"
          subtitle="Keep your reaction speeds high. Chilled energy drinks, gourmet coffee, and hot snacks served right to your station."
        />
      </Reveal>

      <ul className="mt-8 sm:mt-10 grid grid-cols-2 gap-2.5 sm:gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
        {FOOD.map((f, i) => {
          const Icon = FOOD_ICONS[f] || Zap;
          return (
            <Reveal as="li" key={f} delay={i * 50}>
              <div
                data-cursor="VIEW"
                onMouseEnter={() => soundEngine.playHover()}
                className="group relative flex h-28 sm:h-32 flex-col justify-between overflow-hidden border border-border/70 bg-card/80 p-3 sm:p-4 clip-notch transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_10px_30px_-15px_var(--neon-blue)]"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-4 sm:size-5 text-accent transition-transform group-hover:scale-110" />
                  <span className="font-mono text-[0.55rem] sm:text-[0.6rem] text-muted-foreground">0{i + 1}</span>
                </div>
                <div>
                  <span className="font-display text-xs sm:text-sm font-black tracking-wide uppercase text-foreground">
                    {f}
                  </span>
                  <div className="font-mono text-[0.58rem] sm:text-[0.62rem] text-muted-foreground mt-0.5">
                    Available at Bar
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
