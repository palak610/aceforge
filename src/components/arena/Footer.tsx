import { Instagram, MessageCircle, Phone, Youtube } from "lucide-react";
import { CONTACT, SERVICES } from "@/data/arena";
import logoSrc from "@/assets/logo.png";

const LINKS = [
  ["Home", "#home"],
  ["Experience", "#experience"],
  ["PC", "#pc-arena"],
  ["PS5", "#ps5"],
  ["Racing", "#racing"],
  ["VR", "#vr"],
  ["Games", "#games"],
  ["Pricing", "#pricing"],
  ["Location", "#location"],
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: CONTACT.instagramHref, external: true },
  { icon: Youtube, label: "YouTube", href: "#location", external: false },
  { icon: MessageCircle, label: "WhatsApp", href: CONTACT.whatsappHref, external: true },
];

export function Footer() {
  return (
    <footer className="relative pb-24 md:pb-0">
      <div className="relative h-px w-full overflow-hidden bg-border">
        <span className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-primary to-accent [animation:line-run_6s_linear_infinite]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.2fr_1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="Ace Forge Arena"
                width={72}
                height={72}
                className="size-12 sm:size-14 rounded-full object-cover object-[center_30%] scale-125 border border-accent/40 shadow-[0_0_22px_-6px_var(--neon-blue)]"
              />
              <div>
                <div className="font-display text-lg sm:text-xl font-black tracking-[0.2em] uppercase">
                  <span className="text-gradient-neon">Ace</span> Forge
                </div>
                <div className="hud-label mt-0.5 tracking-[0.42em] text-[0.6rem] sm:text-[0.68rem]">Arena</div>
              </div>
            </div>
            <div className="hud-label mt-2.5 sm:mt-3 text-[0.6rem] sm:text-[0.68rem]">Level Beyond Reality</div>
            <p className="mt-4 max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ahmedabad&rsquo;s high-end gaming arena — PCs, PS5, racing cockpits, VR and
              multiplayer under one roof.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {SERVICES.map((service) => (
                <span
                  key={service}
                  className="rounded-md bg-primary/80 px-2 sm:px-2.5 py-0.5 sm:py-1 font-ui text-[0.6rem] sm:text-[0.65rem] font-bold tracking-wide text-primary-foreground uppercase"
                >
                  {service}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 font-ui text-[0.7rem] sm:text-xs font-bold text-background"
              >
                <Phone className="size-3" />
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 font-ui text-[0.7rem] sm:text-xs font-bold text-background"
              >
                <Instagram className="size-3" />
                {CONTACT.instagram}
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <div className="hud-label text-muted-foreground text-[0.65rem] sm:text-xs">Navigate</div>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 sm:gap-y-3">
              {LINKS.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-1.5 sm:gap-2 font-ui text-xs sm:text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="size-1 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="hud-label text-muted-foreground text-[0.65rem] sm:text-xs">Connect</div>
            <div className="mt-4 flex gap-2.5 sm:gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noreferrer" : undefined}
                  aria-label={s.label}
                  className="grid size-10 sm:size-11 place-items-center border border-border clip-notch transition-all hover:border-primary hover:text-primary hover:shadow-[0_0_28px_-10px_var(--neon)]"
                >
                  <s.icon className="size-4 sm:size-4.5" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 flex flex-col gap-2.5 sm:gap-3 border-t border-border/60 pt-5 sm:pt-6 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <p className="text-[0.68rem] sm:text-xs text-muted-foreground">
            © 2026 Ace Forge Arena. All Rights Reserved.
          </p>
          <span className="hud-label text-muted-foreground/70 text-[0.58rem] sm:text-[0.65rem]">System Online // Player 01</span>
        </div>
      </div>
    </footer>
  );
}
