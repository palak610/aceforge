import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArenaBackground } from "@/components/arena/Background";
import { ArenaCursor } from "@/components/arena/Cursor";
import { PageTransition, TiltCard } from "@/components/arena/PageTransition";
import { Header } from "@/components/gaming/Header";
import { Footer } from "@/components/gaming/Footer";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { type GameItem } from "@/data/gamingZone";
import { Search, Gamepad2, Sparkles, Monitor, Car, Glasses, Star, Zap, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TITLE = "Games Vault Catalog | Ace Forge Lounge Ahmedabad";
const DESCRIPTION =
  "Browse all installed games across PC Battlestations, PS5 consoles, Direct-Drive Sim Racing, and 6DoF VR Pods.";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
    ],
  }),
  component: GamesPage,
});

const PLATFORM_FILTERS = [
  { id: "all", label: "All Titles" },
  { id: "ps5", label: "PS5 Lounge" },
  { id: "pc", label: "PC Battlestations" },
  { id: "racing", label: "Sim Racing" },
  { id: "vr", label: "VR Pods" },
];

function GamesPage() {
  const { games } = useArenaStore();
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all");

  const filteredGames = games.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(query.toLowerCase()) ||
      g.genre.toLowerCase().includes(query.toLowerCase());
    const matchesPlatform = platform === "all" || g.platform === platform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#08080a] text-foreground font-ui selection:bg-primary/30 selection:text-white">
        <ArenaBackground />
        <ArenaCursor />
        <Header />

        <main className="pt-28 sm:pt-36 pb-20 relative z-10 space-y-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header Banner */}
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 font-mono text-[0.68rem] font-bold tracking-widest text-primary uppercase shadow-lg shadow-primary/15">
                <Gamepad2 className="size-3.5" />
                <span>Installed Vault // {games.length} Titles Ready</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-foreground">
                Game Vault Catalog
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every title is fully patched, updated to the latest seasonal build, and pre-installed on high-speed NVMe Gen4 storage.
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search games, genres, or titles..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#14141e] border border-[#262638] text-foreground placeholder:text-muted-foreground text-xs font-ui focus:outline-none focus:border-primary shadow-lg"
                />
              </div>

              {/* Platform Tabs */}
              <div className="flex flex-wrap gap-1.5 bg-[#14141e] p-1.5 rounded-2xl border border-[#242436] shadow-xl">
                {PLATFORM_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => {
                      soundEngine.playClick();
                      setPlatform(f.id);
                    }}
                    className={cn(
                      "px-3.5 py-2 rounded-xl font-ui text-xs font-bold uppercase tracking-wider transition-all",
                      platform === f.id
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-102"
                        : "text-muted-foreground hover:text-foreground hover:bg-[#1f1f2e]",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredGames.map((game: GameItem) => (
                <TiltCard key={game.id} intensity={6}>
                  <div className="group relative rounded-3xl border border-[#242436] bg-[#111118] overflow-hidden hover:border-primary hover:shadow-[0_10px_35px_-10px_rgba(123,44,255,0.35)] transition-all duration-300 flex flex-col justify-between h-full shadow-lg">
                    {/* Cover */}
                    <div className="relative aspect-16/10 overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="size-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-90"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/30 to-transparent" />

                      <span className="absolute top-2.5 left-2.5 rounded-md bg-[#09090e]/95 border border-primary/40 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-primary backdrop-blur-md uppercase">
                        {game.platformLabel}
                      </span>

                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-[#09090e]/95 px-2 py-0.5 font-mono text-[0.62rem] text-yellow-400 font-bold backdrop-blur-md">
                        <Star className="size-2.5 fill-current" />
                        <span>{game.rating}</span>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-bold uppercase text-foreground group-hover:text-primary transition-colors truncate">
                          {game.name}
                        </h3>
                        <p className="font-ui text-xs text-muted-foreground mt-0.5 truncate">
                          {game.genre}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-[#1f1f2e] flex items-center justify-between text-[0.68rem] font-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Users className="size-3 text-primary" />
                          <span>{game.playerCount}</span>
                        </span>

                        <Link
                          to="/book"
                          onMouseEnter={() => soundEngine.playHover()}
                          onClick={() => soundEngine.playClick()}
                          className="text-primary font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform flex items-center gap-1"
                        >
                          <span>Play</span>
                          <ArrowRight className="size-2.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>

            {filteredGames.length === 0 && (
              <div className="p-12 text-center rounded-3xl border border-[#242436] bg-[#111118] space-y-2">
                <span className="font-display text-lg font-bold uppercase text-foreground">
                  No matching titles found
                </span>
                <p className="text-xs text-muted-foreground">
                  Try searching for another genre, title, or platform.
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
