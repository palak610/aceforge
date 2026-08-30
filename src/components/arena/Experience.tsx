import { Cpu, Gamepad2, Headset, Trophy } from "lucide-react";
import { Counter, Reveal, SectionHeading } from "./primitives";

const ZONES = [
  {
    icon: Cpu,
    title: "High-End PC Gaming",
    copy: "Competitive gaming PCs with high refresh-rate monitors and premium peripherals.",
  },
  {
    icon: Gamepad2,
    title: "PS5 Gaming",
    copy: "Premium PS5 setups for multiplayer and console gaming.",
  },
  { icon: Trophy, title: "Racing Simulator", copy: "Immersive racing cockpit experience." },
  { icon: Headset, title: "VR Gaming", copy: "Step into another reality." },
];

const STATS = [
  { label: "High FPS", value: 240, suffix: "+" },
  { label: "Low Latency", value: 4, suffix: "ms" },
  { label: "4K Gaming", value: 4, suffix: "K" },
  { label: "Refresh", value: 180, suffix: "Hz" },
];

export function Experience() {
  return (
    <section id="hardware" className="relative border-y border-border/60 bg-card/25">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-32">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            kicker="System Online"
            title="Built For Gamers"
            subtitle="Every zone is tuned like a competitive rig — hardware, lighting, sound and seating engineered together."
          />
          <div className="mt-10 grid grid-cols-2 gap-px border border-primary/20 bg-primary/15">
            {STATS.map((s) => (
              <div key={s.label} className="bg-background/80 px-5 py-6">
                <div className="font-display text-3xl font-black text-gradient-neon">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="hud-label mt-2 text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2">
          {ZONES.map((z, i) => (
            <Reveal as="li" key={z.title} delay={i * 90}>
              <div className="group panel relative h-full overflow-hidden p-7 clip-angular transition-all duration-500 hover:-translate-y-1 hover:border-accent/60">
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <z.icon
                  className="size-8 text-accent transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.4}
                />
                <h3 className="mt-6 font-display text-lg font-black tracking-tight uppercase">
                  {z.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{z.copy}</p>
                <div className="hud-label mt-6 text-muted-foreground/70">
                  Zone // {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
