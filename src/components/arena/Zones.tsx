import { ZONES } from "@/data/arena";
import { Reveal, SectionHeading } from "./primitives";

export function Zones() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-24 scroll-mt-20 lg:px-8 lg:py-32">
      <Reveal>
        <SectionHeading
          kicker="Floor Plan // Arena 001"
          title="Explore The Arena"
          subtitle="Six zones under one roof. Hover a zone to light it up."
        />
      </Reveal>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ZONES.map((z, i) => (
          <Reveal as="li" key={z.name} delay={i * 70}>
            <article
              data-cursor="ENTER"
              className="group relative h-44 overflow-hidden border border-border bg-card/50 p-6 clip-angular transition-all duration-500 hover:border-primary hover:shadow-[0_0_60px_-22px_var(--neon)]"
            >
              <div className="grid-bg absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-45" />
              <div className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />
              <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-linear-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="hud-label text-muted-foreground">Zone {z.tag}</div>
                <div>
                  <h3 className="font-display text-xl font-black tracking-tight uppercase transition-transform duration-400 group-hover:-translate-y-1">
                    {z.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{z.detail}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
