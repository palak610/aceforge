import { MapPin, Phone, Instagram, ExternalLink, Navigation } from "lucide-react";
import { ADDRESS, CONTACT } from "@/data/arena";
import { NeonButton, Reveal, SectionHeading } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";

export function Location() {
  return (
    <section id="location" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20">
      <Reveal>
        <SectionHeading
          kicker="Coordinates // Arena 001"
          title="Find The Arena"
          subtitle="Walk in, take your station, and load in. Open all 7 days."
        />
      </Reveal>

      <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <div className="panel h-full p-5 sm:p-8 clip-angular flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="hud-label text-muted-foreground font-mono text-[0.62rem] sm:text-xs">
                  Physical Hub // Ahmedabad
                </span>
                <span className="hud-label border border-primary/50 bg-primary/20 px-2 sm:px-2.5 py-0.5 text-[0.6rem] sm:text-[0.65rem] font-bold text-primary clip-notch">
                  OPEN NOW
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl font-black tracking-tight uppercase text-foreground">
                {ADDRESS.name}
              </h3>
              <address className="mt-2 sm:mt-3 space-y-1 not-italic font-ui text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {ADDRESS.lines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </address>

              <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-2.5">
                <a
                  href={CONTACT.phoneHref}
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-primary/40 bg-card/80 px-3 sm:px-4 py-1.5 sm:py-2 font-ui text-[0.7rem] sm:text-xs font-bold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Phone className="size-3 sm:size-3.5 text-primary" />
                  {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-accent/40 bg-card/80 px-3 sm:px-4 py-1.5 sm:py-2 font-ui text-[0.7rem] sm:text-xs font-bold text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  <Instagram className="size-3 sm:size-3.5 text-accent" />
                  {CONTACT.instagram}
                </a>
              </div>

              <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-px overflow-hidden border border-primary/20 bg-primary/15">
                {[
                  ["Network", "1 Gbps Dual Fiber"],
                  ["Stations", "20+ Rigs Online"],
                  ["Timings", "11:00 AM – 11:00 PM"],
                  ["Parking", "Available On-Site"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-card/90 p-2.5 sm:px-4 sm:py-3">
                    <div className="hud-label text-muted-foreground font-mono text-[0.58rem] sm:text-[0.65rem]">
                      {k}
                    </div>
                    <div className="mt-0.5 font-display text-[0.68rem] sm:text-xs font-bold tracking-wider uppercase text-foreground">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/40">
              <NeonButton
                href="https://maps.google.com/?q=Money+Plant+High+Street+Jagatpur+Road+SG+Highway+Ahmedabad"
                variant="primary"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
              >
                Navigate On Google Maps
              </NeonButton>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative min-h-[18rem] sm:min-h-[22rem] h-full overflow-hidden border border-accent/30 clip-angular flex flex-col justify-between p-5 sm:p-8 bg-card/70 backdrop-blur-md">
            <div className="absolute inset-0 bg-linear-to-br from-background via-card/90 to-background" />
            <div className="grid-bg absolute inset-0 opacity-40" />
            <div className="animate-drift-b absolute top-1/3 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[90px]" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="hud-label text-muted-foreground font-mono text-[0.6rem] sm:text-xs">RADAR LOCK</span>
              <span className="hud-label text-accent font-mono text-[0.6rem] sm:text-xs">23.0975° N, 72.5348° E</span>
            </div>

            <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-3 sm:gap-4 py-6 sm:py-8">
              <span className="relative grid size-16 sm:size-20 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                <span className="relative grid size-12 sm:size-14 place-items-center rounded-full border border-primary bg-background/90 text-primary shadow-[0_0_30px_var(--neon)]">
                  <MapPin className="size-5 sm:size-6" strokeWidth={1.8} />
                </span>
              </span>
              <div className="text-center">
                <div className="font-display text-lg sm:text-xl font-black uppercase text-foreground">
                  Ace Forge Arena
                </div>
                <div className="mt-1 font-mono text-xs text-primary font-bold">
                  SG Highway, Jagatpur, Ahmedabad
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-border/40 pt-3 sm:pt-4 font-mono text-[0.65rem] sm:text-xs text-muted-foreground">
              <span>Station: Flagship</span>
              <span className="text-accent">Walking Distance from SG Highway</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
