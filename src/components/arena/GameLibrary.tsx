import { useState } from "react";
import { PC_GAMES, PS5_MULTI, PS5_SINGLE, type Game } from "@/data/arena";
import { Reveal, SectionHeading } from "./primitives";
import { soundEngine } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

function GameCard({ g, platform }: { g: Game; platform: string }) {
  return (
    <article
      data-cursor="PLAY"
      className={cn(
        "group relative flex min-h-[220px] flex-col justify-between overflow-hidden border border-border bg-card/80 clip-notch transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/80 hover:shadow-[0_18px_60px_-24px_var(--neon)]",
        g.hero && "sm:col-span-2 min-h-[280px] sm:min-h-[320px]",
      )}
    >
      {/* Background Cover Image */}
      {g.image && (
        <img
          src={g.image}
          alt={g.name}
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30 opacity-90 transition-opacity duration-500 group-hover:opacity-75" />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-accent/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="grid-bg absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-25" />

      {/* Top Header info */}
      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="hud-label border border-primary/40 bg-background/80 px-2.5 py-1 text-[0.65rem] text-primary backdrop-blur-md clip-notch">
            {g.genre}
          </span>
          {g.hero && (
            <span className="hud-label border border-accent/50 bg-accent/20 px-2.5 py-1 text-[0.65rem] text-accent backdrop-blur-md clip-notch">
              FEATURED
            </span>
          )}
        </div>
        <h3
          className={cn(
            "mt-3 font-display font-black uppercase tracking-tight text-foreground transition-transform duration-400 group-hover:-translate-y-0.5 drop-shadow-md",
            g.hero ? "text-2xl sm:text-3xl" : "text-base sm:text-lg",
          )}
        >
          {g.name}
        </h3>
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 flex items-center justify-between border-t border-border/50 bg-background/60 p-4 px-5 backdrop-blur-md">
        <span className="hud-label text-muted-foreground">{platform}</span>
        <span className="flex items-center gap-2 font-ui text-[0.65rem] font-bold tracking-[0.28em] text-accent uppercase transition-all duration-300 group-hover:text-primary">
          <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
          Play
        </span>
      </div>
    </article>
  );
}

const TABS = [
  { id: "pc", label: "PC Games", platform: "PC // Available" },
  { id: "ps5-single", label: "PS5 Single Player", platform: "PS5 // Solo" },
  { id: "ps5-multi", label: "PS5 Multiplayer", platform: "PS5 // Squad" },
] as const;

export function GameLibrary() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("pc");
  const games = tab === "pc" ? PC_GAMES : tab === "ps5-single" ? PS5_SINGLE : PS5_MULTI;
  const platform = TABS.find((t) => t.id === tab)!.platform;

  return (
    <section id="games" className="mx-auto max-w-7xl px-5 py-16 md:py-20 lg:py-24 scroll-mt-20">
      <Reveal>
        <SectionHeading
          kicker="Library // Loaded"
          title="Game Library"
          subtitle="Everything installed and ready across PC and PS5. Play with your squad."
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setTab(t.id);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              data-cursor="VIEW"
              className={cn(
                "px-4 py-2 font-ui text-xs font-bold tracking-[0.2em] uppercase clip-notch transition-all duration-300",
                tab === t.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_24px_-6px_var(--neon)]"
                  : "border border-border/80 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      <ul className="mt-10 grid animate-fade-in grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {games.map((g) => (
          <li key={g.name} className={cn(g.hero && "sm:col-span-2")}>
            <GameCard g={g} platform={platform} />
          </li>
        ))}
      </ul>
    </section>
  );
}
