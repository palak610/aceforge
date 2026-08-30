import { useState, useEffect } from "react";
import { Coffee, Flame, UtensilsCrossed, Wine, ArrowRight, Sparkles, CheckCircle2, X } from "lucide-react";
import { type CafeItem } from "@/data/gamingZone";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Refuels" },
  { id: "drinks", label: "Cold Brew & Energy" },
  { id: "snacks", label: "Loaded Snacks" },
  { id: "food", label: "Sourdough Melts" },
  { id: "combos", label: "Squad Combos" },
];

export function CafePreview() {
  const { cafeItems } = useArenaStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFullMenu, setShowFullMenu] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showFullMenu) {
        soundEngine.playClick();
        setShowFullMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFullMenu]);

  const filteredItems =
    activeCategory === "all"
      ? cafeItems
      : cafeItems.filter((item) => item.category === activeCategory);

  return (
    <section id="cafe" className="py-12 sm:py-16 border-t border-[#1a1a28] bg-[#0c0c12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary uppercase mb-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Fuel Station // Station Table Service</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
              Gaming Café & Refreshments
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#14141e] p-1.5 rounded-2xl border border-[#242436] shadow-lg">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat.id);
                }}
                className={cn(
                  "px-3.5 py-2 rounded-xl font-ui text-xs font-bold uppercase tracking-wider transition-all",
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#1c1c28]",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Gourmet Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item: CafeItem) => (
            <div
              key={item.id}
              className="group flex gap-4 p-4 rounded-2xl border border-[#242436] bg-[#111118] hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-lg"
            >
              {/* Image */}
              <div className="relative size-24 sm:size-28 rounded-xl overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-95"
                  loading="lazy"
                />
                <span className="absolute bottom-1.5 right-1.5 rounded bg-[#09090e]/95 px-2 py-0.5 font-mono text-[0.58rem] text-primary font-bold border border-primary/30">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Meta */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold uppercase text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1 font-ui">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-[#1f1f2e]">
                  <span className="font-mono text-base font-black text-gradient-neon">
                    ₹{item.price}
                  </span>
                  <span className="text-[0.62rem] font-mono text-emerald-400 font-bold uppercase">
                    Delivered to Station
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Menu CTA */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => {
              soundEngine.playClick();
              setShowFullMenu(true);
            }}
            className="px-7 py-3 rounded-xl border border-[#2e2e42] bg-[#14141e] hover:bg-[#1c1c2b] text-foreground font-ui text-xs font-bold uppercase tracking-wider hover:border-primary/50 transition-colors shadow-lg inline-flex items-center gap-2 active:scale-95"
          >
            <span>View Full Gourmet Café Menu ({cafeItems.length} Items)</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Full Menu Modal (Instant & Click Outside to Close) */}
        {showFullMenu && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                soundEngine.playClick();
                setShowFullMenu(false);
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          >
            <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl border border-primary/50 bg-[#111118] p-6 sm:p-8 shadow-2xl flex flex-col overflow-hidden animate-scale-in">
              <div className="flex items-center justify-between border-b border-[#242436] pb-4 mb-4">
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-foreground">
                    Café Menu & Station Refreshments
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    ALL SNACKS & BEVERAGES DELIVERED DIRECTLY TO YOUR RIG
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setShowFullMenu(false);
                  }}
                  className="size-9 rounded-xl bg-[#161624] border border-[#27273c] grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 space-y-3 pr-1">
                {cafeItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-[#242436] bg-[#161624] hover:border-primary/40 transition-colors"
                  >
                    <div>
                      <div className="font-display text-sm font-bold uppercase text-foreground">
                        {item.name}
                      </div>
                      <div className="text-xs text-muted-foreground font-ui mt-0.5">
                        {item.description}
                      </div>
                    </div>
                    <span className="font-mono text-base font-black text-gradient-neon shrink-0 ml-4">
                      ₹{item.price}
                    </span>
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
