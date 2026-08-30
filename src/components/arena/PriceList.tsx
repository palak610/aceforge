import { PRICE_LIST } from "@/data/arena";
import { Reveal, SectionHeading } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";
import { Link } from "@tanstack/react-router";
import { Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PriceList() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20">
      <Reveal>
        <SectionHeading
          kicker="Loadout // Rates"
          title="Price List"
          subtitle="Straight rates, no hidden fees. Special duration discounts applied automatically."
        />
      </Reveal>

      <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRICE_LIST.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <article
              data-cursor="VIEW"
              className="panel group relative flex h-full flex-col justify-between overflow-hidden p-5 sm:p-6 clip-angular transition-all duration-400 hover:-translate-y-1.5 hover:border-primary/80 hover:shadow-[0_20px_60px_-25px_var(--neon)]"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="grid-bg absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="hud-label text-muted-foreground font-mono text-[0.62rem] sm:text-[0.65rem]">
                    Station // 0{i + 1}
                  </span>
                  {p.badge ? (
                    <span className="hud-label border border-primary/50 bg-primary/20 px-2 py-0.5 text-primary clip-notch font-bold text-[0.6rem] sm:text-[0.65rem]">
                      {p.badge}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-2.5 sm:mt-3 font-display text-lg sm:text-xl font-black tracking-tight uppercase text-foreground">
                  {p.name}
                </h3>

                <div className="mt-4 sm:mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-gradient-neon">
                    {p.price}
                  </span>
                  <span className="hud-label text-muted-foreground font-mono text-[0.62rem] sm:text-[0.68rem]">{p.unit}</span>
                </div>

                {p.was ? (
                  <div className="mt-1 font-mono text-xs text-muted-foreground line-through decoration-primary/70">
                    {p.was}
                  </div>
                ) : null}

                {p.extra ? (
                  <div className="mt-3 sm:mt-4 border border-accent/40 bg-accent/10 px-2.5 sm:px-3 py-1.5 sm:py-2 font-mono text-[0.68rem] sm:text-xs text-accent clip-notch">
                    {p.extra}
                  </div>
                ) : null}
              </div>

              <div className="relative mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-border/40">
                <Link
                  to="/book"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                  className="flex items-center justify-between w-full border border-border/70 bg-card/60 px-3.5 sm:px-4 py-2 sm:py-2.5 font-ui text-xs font-bold uppercase text-foreground clip-notch hover:border-primary hover:bg-primary/20 hover:text-primary transition-all group-hover:border-primary/60"
                >
                  <span>Book {p.name}</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
