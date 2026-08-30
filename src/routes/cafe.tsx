import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArenaBackground } from "@/components/arena/Background";
import { ArenaCursor } from "@/components/arena/Cursor";
import { PageTransition } from "@/components/arena/PageTransition";
import { Header } from "@/components/gaming/Header";
import { Footer } from "@/components/gaming/Footer";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { type CafeItem } from "@/data/gamingZone";
import { Coffee, Flame, UtensilsCrossed, Wine, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const TITLE = "Gaming Café & Station Fuel | Ace Forge Lounge Ahmedabad";
const DESCRIPTION =
  "Gourmet snacks, signature cold brew coffees, loaded peri-peri fries, and sourdough melts delivered straight to your gaming rig.";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
    ],
  }),
  component: CafePage,
});

const CATEGORIES = [
  { id: "all", label: "All Refuels" },
  { id: "drinks", label: "Cold Brew & Energy" },
  { id: "snacks", label: "Loaded Snacks" },
  { id: "food", label: "Sourdough Melts" },
  { id: "combos", label: "Squad Combos" },
];

function CafePage() {
  const { cafeItems } = useArenaStore();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? cafeItems
      : cafeItems.filter((item) => item.category === activeCategory);

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#08080a] text-foreground font-ui selection:bg-primary/30 selection:text-white">
        <ArenaBackground />
        <ArenaCursor />
        <Header />

        <main className="pt-28 sm:pt-36 pb-20 relative z-10 space-y-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header Banner */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1 font-mono text-[0.68rem] font-bold tracking-widest text-amber-400 uppercase shadow-lg shadow-amber-500/15">
                <Coffee className="size-3.5" />
                <span>Station Table Service // Rig Delivery</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-foreground">
                Gourmet Gaming Café
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Order artisan cold brews, handcrafted snacks, and loaded fries delivered directly to your battle station without interrupting your match.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex justify-center mb-10">
              <div className="flex flex-wrap gap-2 bg-[#14141e] p-1.5 rounded-2xl border border-[#242436] shadow-xl">
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
                      "px-4 py-2.5 rounded-xl font-ui text-xs font-bold uppercase tracking-wider transition-all",
                      activeCategory === cat.id
                        ? "bg-amber-500 text-black font-black shadow-md shadow-amber-500/30 scale-102"
                        : "text-muted-foreground hover:text-foreground hover:bg-[#1f1f2e]",
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item: CafeItem) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between p-5 rounded-3xl border border-[#242436] bg-[#111118] hover:border-amber-400/60 hover:shadow-[0_10px_35px_-10px_rgba(251,191,36,0.3)] transition-all duration-300 overflow-hidden shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="relative h-44 rounded-2xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-95"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/30 to-transparent" />
                      <span className="absolute top-3 right-3 rounded-lg bg-[#09090e]/95 px-2.5 py-1 font-mono text-[0.6rem] text-amber-400 font-bold border border-amber-400/40">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold uppercase text-foreground group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1f1f2e] flex items-center justify-between mt-4">
                    <div>
                      <span className="text-[0.6rem] font-mono text-muted-foreground uppercase font-bold block">
                        Price
                      </span>
                      <span className="font-display text-2xl font-black text-gradient-neon">
                        ₹{item.price}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                      <CheckCircle2 className="size-3" />
                      <span>Station Delivery</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Service Notice */}
            <div className="mt-14 p-6 rounded-3xl border border-[#242436] bg-[#111118] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/20 border border-primary/40 text-primary grid place-items-center shrink-0">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <span className="font-display text-base font-bold uppercase text-foreground">
                    Zero-Interruption Ordering
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Scan the QR tag on your station keyboard tray to order any snack or beverage without leaving your chair.
                  </p>
                </div>
              </div>

              <Link
                to="/book"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 shadow-lg shadow-primary/30"
              >
                <span>Book a Station</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
