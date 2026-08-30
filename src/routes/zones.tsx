import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArenaBackground } from "@/components/arena/Background";
import { ArenaCursor } from "@/components/arena/Cursor";
import { PageTransition, TiltCard } from "@/components/arena/PageTransition";
import { Header } from "@/components/gaming/Header";
import { Footer } from "@/components/gaming/Footer";
import { ExperienceSelector } from "@/components/gaming/ExperienceSelector";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { Gamepad2, Monitor, Car, Glasses, ArrowRight, CheckCircle2, Cpu, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const TITLE = "Gaming Zones & Platforms | Ace Forge Lounge Ahmedabad";
const DESCRIPTION =
  "Deep dive into our 4 dedicated gaming platforms: PS5 Lounge, High-FPS PC Battlestations, Sim Racing Cockpits, and VR Pods.";

export const Route = createFileRoute("/zones")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
    ],
  }),
  component: ZonesPage,
});

const ICONS: Record<string, typeof Gamepad2> = {
  ps5: Gamepad2,
  pc: Monitor,
  racing: Car,
  vr: Glasses,
};

function ZonesPage() {
  const { experiences } = useArenaStore();
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ps5");

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#08080a] text-foreground font-ui selection:bg-primary/30 selection:text-white">
        <ArenaBackground />
        <ArenaCursor />
        <Header />

        <main className="pt-28 sm:pt-36 pb-20 relative z-10 space-y-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 font-mono text-[0.68rem] font-bold tracking-widest text-primary uppercase shadow-lg shadow-primary/15">
                <Activity className="size-3.5" />
                <span>Battle Environments // 16 Live Units</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-foreground">
                Battle Stations & Zones
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Tour our tournament-grade PC rigs, 4K PS5 console lounges, direct-drive racing simulators, and wireless 6DoF VR pods.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {experiences.map((exp) => {
                const Icon = ICONS[exp.id] || Gamepad2;
                return (
                  <TiltCard key={exp.id} intensity={6}>
                    <div className="group rounded-3xl border border-[#242436] bg-[#111118] p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-primary hover:shadow-[0_0_40px_-10px_rgba(123,44,255,0.35)] transition-all duration-300 overflow-hidden shadow-2xl h-full">
                      <div className="space-y-4">
                        <div className="relative h-56 rounded-2xl overflow-hidden">
                          <img
                            src={exp.image}
                            alt={exp.name}
                            className="size-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-95"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/30 to-transparent" />
                          <span className="absolute top-3.5 right-3.5 rounded-lg bg-[#09090e]/95 px-3 py-1 font-mono text-[0.62rem] text-primary font-bold border border-primary/40">
                            {exp.badge}
                          </span>
                          <div className="absolute bottom-3.5 left-3.5 size-10 rounded-xl bg-[#09090e]/95 border border-[#2e2e42] grid place-items-center text-primary">
                            <Icon className="size-5" />
                          </div>
                        </div>

                        <div>
                          <span className="font-mono text-[0.62rem] text-primary uppercase font-bold tracking-widest">
                            {exp.type}
                          </span>
                          <h3 className="font-display text-2xl font-black uppercase text-foreground group-hover:text-primary transition-colors">
                            {exp.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>

                        {/* Hardware Specs list */}
                        <div className="space-y-2 pt-2 border-t border-[#1f1f2e]">
                          <span className="text-[0.62rem] font-mono text-muted-foreground uppercase font-bold block">
                            Hardware Configuration:
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {exp.hardware.map((hw) => (
                              <div
                                key={hw}
                                className="flex items-center gap-2 p-2 rounded-xl bg-[#161622] border border-[#262638] font-mono text-[0.68rem] text-foreground"
                              >
                                <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                                <span className="truncate">{hw}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Direct Booking Link */}
                      <div className="pt-4 border-t border-[#1f1f2e] flex items-center justify-between">
                        <div>
                          <span className="text-[0.6rem] font-mono text-muted-foreground uppercase font-bold block">
                            Starting Rates
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-display text-2xl font-black text-gradient-neon">
                              ₹{exp.startingPrice}
                            </span>
                            <span className="text-[0.65rem] font-mono text-muted-foreground">/ session</span>
                          </div>
                        </div>

                        <Link
                          to="/book"
                          onMouseEnter={() => soundEngine.playHover()}
                          onClick={() => soundEngine.playClick()}
                          className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30 flex items-center gap-2"
                        >
                          <span>Book {exp.name.split(" ")[0]}</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <ExperienceSelector
            selectedExpId={selectedPlatform}
            onProceedToBooking={() => {
              window.location.href = "/book";
            }}
          />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
