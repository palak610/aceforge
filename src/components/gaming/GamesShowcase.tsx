import { useState, useEffect } from "react";
import { Gamepad2, Monitor, Car, Glasses, Users, ArrowRight, Star, Sparkles, Filter, X } from "lucide-react";
import { type GameItem } from "@/data/gamingZone";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

const FILTER_TABS = [
  { id: "all", label: "All Titles" },
  { id: "ps5", label: "PS5 Lounge" },
  { id: "pc", label: "PC Battlestations" },
  { id: "vr", label: "VR Pods" },
  { id: "racing", label: "Sim Racing" },
];

export function GamesShowcase() {
  const { games } = useArenaStore();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAllModal, setShowAllModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showAllModal) {
        soundEngine.playClick();
        setShowAllModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAllModal]);

  const filteredGames =
    activeFilter === "all"
      ? games
      : games.filter((g) => g.platform === activeFilter);

  return (
    <section id="games" className="py-12 sm:py-16 border-t border-[#1a1a28] bg-[#0c0c12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary uppercase mb-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Library // Pre-Loaded & Ready ({games.length} Total Titles)</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
              Popular Installed Games
            </h2>
          </div>

          {/* Platform Filters */}
          <div className="flex flex-wrap gap-1.5 bg-[#14141e] p-1.5 rounded-2xl border border-[#242436] shadow-lg">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveFilter(tab.id);
                }}
                className={cn(
                  "px-3.5 py-2 rounded-xl font-ui text-xs font-bold uppercase tracking-wider transition-all",
                  activeFilter === tab.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#1a1a26]",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredGames.slice(0, 8).map((game: GameItem) => (
            <div
              key={game.id}
              className="group relative rounded-2xl border border-[#242436] bg-[#111118] overflow-hidden hover:border-primary/60 hover:shadow-[0_10px_35px_-10px_rgba(123,44,255,0.3)] transition-all duration-500 flex flex-col justify-between"
            >
              {/* Cover Image */}
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.name}
                  className="size-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/30 to-transparent" />

                {/* Platform Tag */}
                <span className="absolute top-2.5 left-2.5 rounded-md bg-[#09090e]/95 border border-primary/40 px-2 py-0.5 font-mono text-[0.6rem] font-bold text-primary backdrop-blur-md uppercase">
                  {game.platformLabel}
                </span>

                {/* Rating Badge */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-[#09090e]/95 px-2 py-0.5 font-mono text-[0.62rem] text-yellow-400 font-bold backdrop-blur-md">
                  <Star className="size-2.5 fill-current" />
                  <span>{game.rating}</span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
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
                  <span className="text-primary font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Play <ArrowRight className="size-2.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Action Button */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => {
              soundEngine.playClick();
              setShowAllModal(true);
            }}
            className="px-7 py-3 rounded-xl border border-[#2e2e42] bg-[#14141e] hover:bg-[#1c1c2b] text-foreground font-ui text-xs font-bold uppercase tracking-wider hover:border-primary/50 transition-colors shadow-lg active:scale-95"
          >
            <span>View All {games.length} Games in Vault</span>
          </button>
        </div>

        {/* View All Games Modal (Instant & Click Outside to Close) */}
        {showAllModal && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                soundEngine.playClick();
                setShowAllModal(false);
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          >
            <div className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl border border-primary/50 bg-[#111117] p-6 sm:p-8 shadow-2xl flex flex-col overflow-hidden animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#242436] pb-4 mb-4">
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-foreground">
                    Complete Game Vault ({games.length} Dynamic Titles)
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    ALL TITLES INSTALLED & MANAGED FROM ADMIN PANEL
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setShowAllModal(false);
                  }}
                  className="size-9 rounded-xl bg-[#161624] border border-[#27273c] grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {games.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center gap-3 p-3 rounded-2xl border border-[#242436] bg-[#161624] hover:border-primary/40 transition-colors"
                  >
                    <img
                      src={game.image}
                      alt={game.name}
                      className="size-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-display text-xs font-bold uppercase text-foreground truncate">
                        {game.name}
                      </div>
                      <div className="text-[0.68rem] text-muted-foreground font-ui truncate">
                        {game.genre}
                      </div>
                      <span className="inline-block mt-1 rounded-md bg-primary/20 text-primary px-2 py-0.5 font-mono text-[0.58rem] font-bold">
                        {game.platformLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
