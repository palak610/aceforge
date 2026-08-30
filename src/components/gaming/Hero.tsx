import { Gamepad2, Monitor, Car, Glasses, ArrowRight, ShieldCheck, Zap, Activity, Radio, ChevronRight, Sparkles } from "lucide-react";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { TiltCard } from "@/components/arena/PageTransition";

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

const EXPERIENCE_ICONS: Record<string, typeof Gamepad2> = {
  ps5: Gamepad2,
  pc: Monitor,
  racing: Car,
  vr: Glasses,
};

export function Hero({ onBookClick, onExploreClick }: HeroProps) {
  const { experiences } = useArenaStore();

  return (
    <section className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
      {/* Dynamic Ambient Glows & Cyber Grid */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[750px] rounded-full bg-gradient-to-b from-primary/25 via-primary/5 to-transparent blur-[160px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/4 right-0 size-[450px] rounded-full bg-cyan-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-[350px] rounded-full bg-purple-600/15 blur-[120px]" />

      {/* Cyber Grid Lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Horizontal Laser Sweep Beam */}
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition & Telemetry */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Arena Status Pill with Ping Animation */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-primary/15 animate-stagger-up">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
              </span>
              <span className="text-[0.68rem] font-mono font-bold tracking-widest text-foreground uppercase">
                ARENA ONLINE // AHMEDABAD HIGH-STREET
              </span>
              <span className="text-[0.65rem] font-mono text-primary font-bold hidden sm:inline">
                • 16 STATIONS READY
              </span>
            </div>

            {/* Main Headline with Animated Cyber Gradient */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-foreground leading-[1.04]">
                Play. Compete. <br />
                <span className="text-gradient-neon filter drop-shadow-[0_0_30px_rgba(123,44,255,0.6)] animate-pulse">
                  Experience.
                </span>
              </h1>
              <p className="font-mono text-xs sm:text-sm text-primary tracking-wider uppercase font-bold flex items-center gap-2">
                <span className="size-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <span>HIGH-FPS PC RIGS • 4K 120Hz PS5 • DIRECT-DRIVE RACING • 6DoF VR</span>
              </p>
            </div>

            {/* Subtitle */}
            <p className="max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed font-ui">
              Ahmedabad premier gaming lounge engineered for solo grinders, squad battles, and competitive LAN showdowns. Instant booking, transparent pricing, and tournament-grade peripherals.
            </p>

            {/* Action Buttons with Sound FX */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  onBookClick();
                }}
                className="group relative px-7 py-4 rounded-xl bg-gradient-to-r from-primary via-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-primary-foreground font-ui text-xs font-black uppercase tracking-widest shadow-[0_0_35px_-5px_var(--neon)] active:scale-95 transition-all flex items-center gap-2.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                <span className="relative z-10">Book a Session</span>
                <ArrowRight className="relative z-10 size-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  onExploreClick();
                }}
                className="px-6 py-4 rounded-xl border border-[#2e2e42] bg-[#14141d]/90 hover:bg-[#1c1c2b] text-foreground font-ui text-xs font-bold uppercase tracking-wider hover:border-primary/50 shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <span>View Experiences</span>
                <ChevronRight className="size-3.5 text-primary" />
              </button>
            </div>

            {/* Live Telemetry Tickers */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#1f1f2e] max-w-lg">
              <div className="p-3 rounded-xl bg-[#111117] border border-[#222230] hover:border-emerald-500/40 transition-colors shadow-md">
                <div className="flex items-center gap-1.5 text-[0.62rem] font-mono text-muted-foreground uppercase font-bold">
                  <Activity className="size-3 text-emerald-400 animate-pulse" />
                  <span>LAN Latency</span>
                </div>
                <div className="font-mono text-xs sm:text-sm font-black text-emerald-400 mt-1">
                  &lt; 3ms Ping
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#111117] border border-[#222230] hover:border-cyan-500/40 transition-colors shadow-md">
                <div className="flex items-center gap-1.5 text-[0.62rem] font-mono text-muted-foreground uppercase font-bold">
                  <Radio className="size-3 text-cyan-400" />
                  <span>Display Panels</span>
                </div>
                <div className="font-mono text-xs sm:text-sm font-black text-foreground mt-1">
                  360Hz / 4K
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#111117] border border-[#222230] hover:border-primary/40 transition-colors shadow-md">
                <div className="flex items-center gap-1.5 text-[0.62rem] font-mono text-muted-foreground uppercase font-bold">
                  <Zap className="size-3 text-yellow-400" />
                  <span>Rates</span>
                </div>
                <div className="font-mono text-xs sm:text-sm font-black text-gradient-neon mt-1">
                  From ₹{experiences[0]?.startingPrice ?? 100}/h
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D TiltCard Hero Frame */}
          <div className="lg:col-span-5 relative">
            <TiltCard intensity={8}>
              <div className="relative rounded-3xl border border-[#2a2a3c] bg-[#111118]/95 p-3.5 sm:p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden group">
                {/* Corner Cyber Accents */}
                <div className="absolute top-0 left-0 size-5 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 size-5 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 size-5 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 size-5 border-b-2 border-r-2 border-primary" />

                {/* Main Image with Radar Scanline */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop"
                    alt="Ace Forge Gaming Lounge Rigs"
                    className="size-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-95"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-[#0e0e14]/40 to-transparent" />

                  {/* Animated Holographic Shimmer */}
                  <div className="animate-holo absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Live Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-[#09090e]/95 border border-primary/50 rounded-xl px-3 py-1 text-[0.65rem] font-mono text-primary font-bold backdrop-blur-md shadow-lg">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>FLAGSHIP BATTLE ARENA</span>
                  </div>

                  {/* Bottom Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[0.65rem] font-mono text-primary uppercase font-bold tracking-widest">
                      TOURNAMENT-GRADE HARDWARE
                    </span>
                    <div className="font-display text-xl font-black uppercase text-foreground">
                      Next-Gen Gaming Lounge
                    </div>
                  </div>
                </div>

                {/* Integrated Quick Rates Strip */}
                <div className="mt-3.5 p-3.5 bg-[#161624] rounded-2xl border border-[#262638] space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono border-b border-[#232334] pb-2">
                    <span className="uppercase text-[0.62rem] tracking-wider text-muted-foreground font-bold flex items-center gap-1">
                      <Sparkles className="size-3 text-primary" />
                      <span>Dynamic Live Rates</span>
                    </span>
                    <span className="text-primary font-bold text-[0.65rem] uppercase">
                      Admin Configured
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {experiences.map((exp) => {
                      const Icon = EXPERIENCE_ICONS[exp.id] || Gamepad2;
                      return (
                        <button
                          key={exp.id}
                          type="button"
                          onMouseEnter={() => soundEngine.playHover()}
                          onClick={() => {
                            soundEngine.playClick();
                            onBookClick();
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#0e0e16] border border-[#20202e] hover:border-primary/50 hover:bg-[#151522] transition-all text-left"
                        >
                          <div className="flex items-center gap-1.5">
                            <Icon className="size-3.5 text-primary shrink-0" />
                            <span className="font-ui text-xs font-bold text-foreground truncate max-w-[65px]">
                              {exp.id.toUpperCase()}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-black text-gradient-neon">
                            ₹{exp.startingPrice}
                            <span className="text-[0.58rem] font-normal text-muted-foreground">/h</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
