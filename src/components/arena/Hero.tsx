import { useEffect, useState } from "react";
import { Instagram, Phone } from "lucide-react";
import loungeImg from "@/assets/ps5-lounge.png";
import pcImg from "@/assets/pc-arena.jpg";
import racingImg from "@/assets/racing-sim.png";
import vrImg from "@/assets/vr.jpg";
import logoSrc from "@/assets/logo.png";
import { CONTACT } from "@/data/arena";
import { soundEngine } from "@/lib/soundEngine";
import { NeonButton } from "./primitives";
import { cn } from "@/lib/utils";

const HEADLINE = "LEVEL BEYOND REALITY";

const HERO_SHOTS = [
  {
    src: loungeImg,
    alt: "Ace Forge Arena PS5 lounge with neon PlayStation ceiling lights",
    pos: "object-[center_32%]",
  },
  {
    src: pcImg,
    alt: "High-end RGB gaming PC battlestation",
    pos: "object-center",
  },
  {
    src: racingImg,
    alt: "Racing cockpits under neon circuit lighting",
    pos: "object-center",
  },
];

const ZONES = [
  { label: "High End PC", href: "#pc-arena", img: pcImg, price: "₹100 / hr" },
  { label: "PS5", href: "#ps5", img: loungeImg, price: "₹120 / hr" },
  { label: "VR", href: "#vr", img: vrImg, price: "₹150 / hr" },
  { label: "Racing Cockpit", href: "#racing", img: racingImg, price: "₹150 / hr" },
];

export function Hero() {
  const [stage, setStage] = useState(0);
  const [chars, setChars] = useState(0);
  const [fps, setFps] = useState(240);
  const [ping, setPing] = useState(4);
  const [shot, setShot] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage(3);
      setChars(HEADLINE.length);
      return;
    }
    const timers = [
      setTimeout(() => setStage(1), 450),
      setTimeout(() => setStage(2), 1500),
      setTimeout(() => setStage(3), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage < 2 || chars >= HEADLINE.length) return;
    const id = setTimeout(() => setChars((c) => c + 1), 55);
    return () => clearTimeout(id);
  }, [stage, chars]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFps(236 + Math.floor(Math.random() * 9));
      setPing(3 + Math.floor(Math.random() * 4));
    }, 900);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setShot((i) => (i + 1) % HERO_SHOTS.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 transition-all duration-[2200ms] ease-out",
          stage >= 2 ? "scale-100 opacity-100" : "scale-110 opacity-0",
        )}
      >
        {HERO_SHOTS.map((s, i) => (
          <img
            key={s.alt}
            src={s.src}
            alt={s.alt}
            width={1920}
            height={1088}
            className={cn(
              "absolute inset-0 size-full object-cover brightness-125 contrast-110 transition-all duration-[1600ms] ease-out",
              s.pos,
              i === shot ? "opacity-100 scale-105" : "opacity-0 scale-100",
            )}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/35 to-background/55" />
        <div className="hex-honeycomb absolute inset-0 opacity-15 mix-blend-screen" />
        <div className="scanlines absolute inset-0 opacity-15 mix-blend-overlay" />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-30 bg-background transition-opacity duration-700",
          stage >= 2 ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="animate-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-primary/50 to-transparent blur-2xl" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:px-8">
        <div className="grid items-center gap-8 lg:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div
              className={cn(
                "flex items-center gap-3 sm:gap-4 transition-all duration-700",
                stage >= 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <img
                src={logoSrc}
                alt="Ace Forge Arena"
                width={96}
                height={96}
                className="size-14 sm:size-16 md:size-20 rounded-full border border-accent/50 object-cover object-[center_30%] scale-125 shadow-[0_0_28px_-6px_var(--neon-blue)] shrink-0"
              />
              <div>
                <div className="font-display text-xl font-black tracking-[0.15em] sm:tracking-[0.18em] uppercase sm:text-3xl md:text-4xl">
                  <span className="text-gradient-neon">Ace</span> Forge
                </div>
                <div className="mt-1 flex items-center gap-1.5 sm:gap-2 text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.4em] sm:tracking-[0.5em] text-primary uppercase sm:text-xs">
                  <span className="h-px w-6 sm:w-8 bg-linear-to-r from-accent to-primary" />
                  Arena
                  <span className="h-px w-6 sm:w-8 bg-linear-to-r from-primary to-accent" />
                </div>
              </div>
            </div>

            <div
              className={cn(
                "mt-4 sm:mt-5 flex flex-wrap gap-2 transition-all delay-100 duration-700",
                stage >= 1 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 sm:px-3.5 sm:py-1.5 font-ui text-[0.7rem] sm:text-xs font-bold text-background"
              >
                <Phone className="size-3" />
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1 sm:px-3.5 sm:py-1.5 font-ui text-[0.7rem] sm:text-xs font-bold text-background"
              >
                <Instagram className="size-3" />
                {CONTACT.instagram}
              </a>
              <span className="hud-label inline-flex items-center gap-1.5 sm:gap-2 border border-accent/40 bg-background/50 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[0.6rem] sm:text-[0.68rem]">
                <span className="size-1.5 sm:size-2 animate-pulse-dot rounded-full bg-[#39FF88]" />
                FPS {fps} · {ping}ms
              </span>
            </div>

            <h1 className="mt-6 sm:mt-8 font-display text-[1.75rem] sm:text-4xl md:text-6xl xl:text-7xl leading-[1.02] sm:leading-[0.98] font-black tracking-tight uppercase">
              {["LEVEL BEYOND", "REALITY"].map((word, w) => {
                const offset = w === 0 ? 0 : 13;
                return (
                  <span key={word} className={cn("block", w === 1 && "text-gradient-neon")}>
                    {word.split("").map((c, i) => (
                      <span
                        key={i}
                        className={cn(
                          "inline-block transition-all duration-300",
                          offset + i < chars
                            ? "translate-y-0 opacity-100 blur-0"
                            : "translate-y-2 opacity-0 blur-sm",
                        )}
                      >
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                );
              })}
            </h1>

            <div
              className={cn(
                "transition-all delay-200 duration-1000",
                stage >= 3 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <p className="mt-4 sm:mt-5 max-w-lg font-ui text-base sm:text-lg tracking-wide text-foreground/90 md:text-xl">
                Ahmedabad&rsquo;s premium gaming arena.
              </p>
              <p className="mt-1.5 sm:mt-2 max-w-lg text-xs sm:text-sm text-muted-foreground md:text-base">
                High-end PCs. PS5. Racing. VR.
                <br />
                Your game. Your squad. Your arena.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <NeonButton
                  href="/book"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                >
                  Book Your Session
                </NeonButton>
                <NeonButton
                  href="#experience"
                  variant="ghost"
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => soundEngine.playClick()}
                >
                  Explore The Arena
                </NeonButton>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "grid gap-3 transition-all delay-300 duration-1000 sm:grid-cols-2 lg:grid-cols-1",
              stage >= 3 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            {ZONES.map((z) => (
              <a
                key={z.label}
                href={z.href}
                data-cursor="PLAY"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className="group relative flex overflow-hidden rounded-xl border border-primary/40 bg-card/80 clip-notch shadow-[0_0_24px_-12px_var(--neon)] hover:border-primary transition-all duration-300"
              >
                <img
                  src={z.img}
                  alt={z.label}
                  className="absolute inset-0 size-full object-cover opacity-35 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
                <div className="holo-foil absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none" />
                <span className="relative flex w-full items-center justify-between px-5 py-4">
                  <span className="font-display text-sm font-black tracking-[0.18em] text-foreground uppercase sm:text-base group-hover:text-primary transition-colors">
                    {z.label}
                  </span>
                  <span className="font-mono text-xs font-bold tracking-wide text-accent">
                    {z.price}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <dl
          className={cn(
            "mt-12 grid grid-cols-2 gap-px overflow-hidden border border-primary/20 bg-primary/15 sm:grid-cols-4",
            stage >= 3 ? "opacity-100" : "opacity-0",
          )}
        >
          {[
            ["Arena", "// 001"],
            ["Mode", "// Competitive"],
            ["Network", "// Online"],
            ["Status", "// Ready"],
          ].map(([k, v]) => (
            <div key={k} className="bg-card/70 px-4 py-3 backdrop-blur-md">
              <dt className="hud-label text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-display text-xs font-bold tracking-widest uppercase">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="absolute right-8 bottom-8 z-20 hidden gap-1.5 sm:flex">
        {HERO_SHOTS.map((s, i) => (
          <button
            key={s.alt}
            type="button"
            aria-label={`Show ${s.alt}`}
            onClick={() => setShot(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === shot
                ? "w-8 bg-accent shadow-[0_0_12px_var(--neon-blue)]"
                : "w-3 bg-foreground/35 hover:bg-foreground/60",
            )}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
    </section>
  );
}
