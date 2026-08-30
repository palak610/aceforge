import { Cpu, Gamepad2, Layers, Sparkles, Trophy, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";

const ITEMS = [
  {
    icon: Cpu,
    title: "PREMIUM HARDWARE",
    body: "High-end RTX 4080/4090 gaming machines and esports peripherals.",
  },
  {
    icon: Trophy,
    title: "COMPETITIVE EXPERIENCE",
    body: "Built for gamers who take FPS, frame rates and latency seriously.",
  },
  {
    icon: Users,
    title: "SQUAD GAMING",
    body: "Multiplayer setups designed for groups, teams and tournaments.",
  },
  {
    icon: Layers,
    title: "MULTIPLE ZONES",
    body: "PC, PS5, Sim Racing, VR and Lounge under one roof.",
  },
  {
    icon: Sparkles,
    title: "IMMERSIVE VIBE",
    body: "Designed from lighting to spatial acoustics for deep game flow.",
  },
  {
    icon: Gamepad2,
    title: "GAMER-FIRST",
    body: "Built and operated by passionate gamers, for gamers.",
  },
];

export function Why() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
      <Reveal>
        <SectionHeading
          kicker="Level // Max"
          title="Why Ace Forge?"
          subtitle="Everything here is tuned for one thing — better games, played properly."
        />
      </Reveal>

      <ul className="mt-8 sm:mt-10 grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it, i) => (
          <Reveal as="li" key={it.title} delay={i * 60}>
            <div className="panel group relative h-full flex flex-col justify-between overflow-hidden p-5 sm:p-6 clip-angular transition-all duration-400 hover:-translate-y-1.5 hover:border-primary/80 hover:shadow-[0_20px_60px_-30px_var(--neon)]">
              <span className="absolute inset-x-0 top-0 h-px w-0 bg-linear-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
              <div>
                <it.icon
                  className="size-5 sm:size-6 text-primary transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                />
                <h3 className="mt-3 sm:mt-4 font-display text-sm sm:text-base font-black tracking-tight uppercase text-foreground">
                  {it.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{it.body}</p>
              </div>
              <div className="hud-label text-[0.6rem] sm:text-[0.62rem] text-muted-foreground/60 font-mono mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border/30">
                Pillar // 0{i + 1}
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
