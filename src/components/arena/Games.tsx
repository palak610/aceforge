import { useState } from "react";
import { Reveal, SectionHeading, NeonButton } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";
import { Swords, Flame, Trophy, Crosshair, Gamepad2, Play } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const SHOWCASE_GAMES = [
  {
    id: "gta5",
    title: "GTA V / ONLINE",
    tagline: "Open World. No Limits.",
    category: "Open World",
    zone: "pc",
    rate: "₹120 / hr",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    badge: "MOST POPULAR",
  },
  {
    id: "val",
    title: "VALORANT",
    tagline: "Precision. Strategy. Victory.",
    category: "Tactical FPS",
    zone: "pc",
    rate: "₹120 / hr",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    badge: "500+ FPS",
  },
  {
    id: "cod",
    title: "CALL OF DUTY: MW3",
    tagline: "Lock. Load. Dominate.",
    category: "Action FPS",
    zone: "pc",
    rate: "₹120 / hr",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    badge: "WARZONE READY",
  },
  {
    id: "cs2",
    title: "COUNTER-STRIKE 2",
    tagline: "Competitive Starts Here.",
    category: "Esports FPS",
    zone: "pc",
    rate: "₹120 / hr",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    badge: "360Hz TOURNAMENT",
  },
  {
    id: "eafc",
    title: "EA SPORTS FC 24 / 25",
    tagline: "Control The Game.",
    category: "Sports",
    zone: "ps5",
    rate: "₹120 / hr",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    badge: "4-PLAYER CO-OP",
  },
  {
    id: "f1",
    title: "SIM RACING & F1",
    tagline: "Feel Every Turn.",
    category: "Sim Racing",
    zone: "racing",
    rate: "₹150 / hr",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
    badge: "DIRECT DRIVE COCKPIT",
  },
];

const FILTERS = [
  "ALL",
  "Tactical FPS",
  "Esports FPS",
  "Action FPS",
  "Sports",
  "Open World",
  "Sim Racing",
];

export function Games() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filtered =
    activeFilter === "ALL"
      ? SHOWCASE_GAMES
      : SHOWCASE_GAMES.filter((g) => g.category === activeFilter);

  const handleFilterClick = (f: string) => {
    soundEngine.playClick();
    setActiveFilter(f);
  };

  return (
    <section
      id="battle"
      className="relative mx-auto max-w-7xl px-5 py-16 md:py-20 lg:py-24 scroll-mt-20"
    >
      <Reveal>
        <SectionHeading
          kicker="Player 01 // Select Title"
          title="Choose Your Battle"
          subtitle="Ahmedabad's highest specification hardware ready for your squad."
        />
      </Reveal>

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => handleFilterClick(f)}
            onMouseEnter={() => soundEngine.playHover()}
            className={cn(
              "px-3.5 py-1.5 font-ui text-xs font-bold uppercase clip-notch transition-all",
              activeFilter === f
                ? "border border-primary bg-primary text-primary-foreground shadow-[0_0_18px_-2px_var(--neon)]"
                : "border border-border/70 bg-card/60 text-muted-foreground hover:text-foreground hover:border-primary/50",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g, i) => (
          <Reveal as="li" key={g.id} delay={i * 60}>
            <Link
              to="/book"
              data-cursor="PLAY"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              className="group relative block aspect-16/11 overflow-hidden border border-border/80 bg-card/90 clip-angular transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:shadow-[0_20px_70px_-25px_var(--neon)]"
            >
              <img
                src={g.image}
                alt={g.title}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="holo-foil absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
              <div className="scanlines absolute inset-0 opacity-20 pointer-events-none" />
              <span className="absolute inset-x-0 top-0 h-px w-0 bg-linear-to-r from-primary to-accent transition-all duration-700 group-hover:w-full" />

              <div className="relative flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between gap-2">
                  <span className="hud-label border border-primary/50 bg-primary/20 px-2.5 py-1 text-primary font-mono font-bold">
                    {g.category}
                  </span>
                  <span className="border border-accent/60 bg-background/80 px-2 py-0.5 font-mono text-[0.65rem] font-bold text-accent clip-notch">
                    {g.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-black tracking-tight uppercase transition-transform duration-500 group-hover:-translate-y-1 sm:text-3xl text-foreground">
                    {g.title}
                  </h3>
                  <p className="mt-1 font-ui text-sm font-semibold tracking-wide text-primary transition-transform duration-500 group-hover:-translate-y-1">
                    "{g.tagline}"
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                    <span className="font-mono text-xs text-muted-foreground">{g.rate}</span>
                    <span className="flex items-center gap-1.5 font-ui text-xs font-bold tracking-[0.2em] text-accent uppercase group-hover:text-primary transition-colors">
                      <Play className="size-3 fill-current" /> Play Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <div className="mt-14 text-center">
        <NeonButton
          href="/games"
          variant="ghost"
          onMouseEnter={() => soundEngine.playHover()}
          onClick={() => soundEngine.playClick()}
        >
          View Full 50+ Game Library →
        </NeonButton>
      </div>
    </section>
  );
}
