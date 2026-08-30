import { createFileRoute, Link } from "@tanstack/react-router";
import { ArenaBackground } from "@/components/arena/Background";
import { ArenaCursor } from "@/components/arena/Cursor";
import { PageTransition } from "@/components/arena/PageTransition";
import { Header } from "@/components/gaming/Header";
import { Hero } from "@/components/gaming/Hero";
import { QuickPricing } from "@/components/gaming/QuickPricing";
import { GamesShowcase } from "@/components/gaming/GamesShowcase";
import { LocationSection } from "@/components/gaming/LocationSection";
import { Footer } from "@/components/gaming/Footer";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { ArrowRight, Coffee, Trophy, Sparkles, Shield, Zap, Gamepad2 } from "lucide-react";

const TITLE = "Ace Forge Gaming Lounge | Premium PS5, PC, VR & Sim Racing in Ahmedabad";
const DESCRIPTION =
  "Experience premium gaming in Ahmedabad. 4K PS5 consoles, high-FPS PC battle stations, direct-drive racing simulators, virtual reality pods, and gaming café.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const { experiences, games, cafeItems, events } = useArenaStore();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#08080a] text-foreground font-ui selection:bg-primary/30 selection:text-white">
        <ArenaBackground />
        <ArenaCursor />
        <Header />

        <main className="space-y-0 relative z-10">
          {/* Hero Section */}
          <Hero
            onBookClick={() => {
              window.location.href = "/book";
            }}
            onExploreClick={() => {
              window.location.href = "/zones";
            }}
          />

          {/* Quick Experience Preview Strip */}
          <QuickPricing
            onSelectExperience={() => {
              window.location.href = "/book";
            }}
          />

          {/* Feature Highlight Banners: Games, Cafe, Tournaments */}
          <section className="py-14 sm:py-20 border-t border-[#1a1a28] bg-[#0c0c14]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 font-mono text-[0.68rem] font-bold tracking-widest text-primary uppercase mb-2">
                  <Sparkles className="size-3.5" />
                  <span>The Complete Arena Experience</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
                  Everything Under One Roof
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Explore dedicated spaces designed for competitive esports, gourmet fuel, and private squad showdowns.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Banner 1: Games Library */}
                <Link
                  to="/games"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                  className="group relative rounded-3xl border border-[#242436] bg-[#111118] p-7 flex flex-col justify-between space-y-6 hover:border-primary hover:shadow-[0_0_35px_-5px_rgba(123,44,255,0.4)] transition-all duration-300 overflow-hidden"
                >
                  <div className="size-12 rounded-2xl bg-primary/20 border border-primary/40 text-primary grid place-items-center group-hover:scale-110 transition-transform">
                    <Gamepad2 className="size-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[0.65rem] font-mono text-primary uppercase font-bold tracking-widest">
                      {games.length}+ Pre-Loaded Titles
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-foreground group-hover:text-primary transition-colors">
                      Games Vault
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Instant access to top-tier AAA esports titles, multiplayer co-ops, and VR immersion experiences.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold uppercase text-primary tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Browse All Games</span>
                    <ArrowRight className="size-3.5" />
                  </div>
                </Link>

                {/* Banner 2: Gourmet Cafe */}
                <Link
                  to="/cafe"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                  className="group relative rounded-3xl border border-[#242436] bg-[#111118] p-7 flex flex-col justify-between space-y-6 hover:border-amber-400 hover:shadow-[0_0_35px_-5px_rgba(251,191,36,0.3)] transition-all duration-300 overflow-hidden"
                >
                  <div className="size-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 grid place-items-center group-hover:scale-110 transition-transform">
                    <Coffee className="size-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[0.65rem] font-mono text-amber-400 uppercase font-bold tracking-widest">
                      {cafeItems.length} Signature Refuels
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-foreground group-hover:text-amber-400 transition-colors">
                      Gaming Café
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Signature cold brews, loaded peri-peri fries, and sourdough melts delivered directly to your station.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold uppercase text-amber-400 tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Explore Menu</span>
                    <ArrowRight className="size-3.5" />
                  </div>
                </Link>

                {/* Banner 3: Transparent Pricing & Passes */}
                <Link
                  to="/pricing"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                  className="group relative rounded-3xl border border-[#242436] bg-[#111118] p-7 flex flex-col justify-between space-y-6 hover:border-cyan-400 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)] transition-all duration-300 overflow-hidden"
                >
                  <div className="size-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 grid place-items-center group-hover:scale-110 transition-transform">
                    <Zap className="size-6" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[0.65rem] font-mono text-cyan-400 uppercase font-bold tracking-widest">
                      Zero Hidden Fees
                    </span>
                    <h3 className="font-display text-2xl font-black uppercase text-foreground group-hover:text-cyan-400 transition-colors">
                      Pricing & Passes
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Compare platforms, multi-hour squad discount passes, and off-peak standard rates from ₹100/h.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold uppercase text-cyan-400 tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Compare Pricing</span>
                    <ArrowRight className="size-3.5" />
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Popular Games Teaser Strip */}
          <GamesShowcase />

          {/* Location & Contact Section */}
          <LocationSection
            onBookClick={() => {
              window.location.href = "/book";
            }}
          />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
