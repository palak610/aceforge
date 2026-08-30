import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { CONTACT, SERVICES } from "@/data/arena";
import { cn } from "@/lib/utils";
import { Instagram, LogIn, Phone, Volume2, VolumeX, Activity } from "lucide-react";
import { OtpLoginModal } from "./OtpLoginModal";
import logoSrc from "@/assets/logo.png";

const PUBLIC_NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Booking", to: "/book" },
  { label: "History", to: "/history" },
  { label: "Games", to: "/games" },
  { label: "Pricing", to: "/pricing" },
  { label: "Zones", to: "/zones" },
  { label: "Admin", to: "/admin" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const location = useLocation();
  const { currentUser, stations } = useArenaStore();

  useEffect(() => {
    setSoundActive(soundEngine.getSoundEnabled());
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggleSound = () => {
    const enabled = soundEngine.toggleMute();
    setSoundActive(enabled);
  };

  const activeCount = stations.filter((s) => s.status === "BOOKED" || s.status === "LOCKED").length;

  // Do not render public header on standalone admin route
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-primary/20 bg-background/85 backdrop-blur-xl shadow-[0_12px_40px_-18px_var(--neon)]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => soundEngine.playClick()}
            className="group flex items-center gap-2 sm:gap-3 shrink-0"
            aria-label="Ace Forge Arena home"
          >
            <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-accent/40 shadow-[0_0_18px_-4px_var(--neon-blue)] sm:size-12">
              <img
                src={logoSrc}
                alt="Ace Forge Arena wolf emblem"
                width={96}
                height={96}
                className="size-full scale-125 object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-[1.35]"
              />
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-primary/30" />
            </span>
            <span className="leading-none">
              <span className="font-display text-[0.72rem] font-black tracking-[0.18em] uppercase sm:text-sm sm:tracking-[0.22em]">
                <span className="text-gradient-neon">Ace</span> Forge
              </span>
              <span className="mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5 text-[0.52rem] sm:text-[0.58rem] font-semibold tracking-[0.35em] sm:tracking-[0.42em] text-primary/80 uppercase">
                <span className="h-px w-2 sm:w-3.5 bg-linear-to-r from-accent to-primary" />
                Arena
                <span className="h-px w-2 sm:w-3.5 bg-linear-to-r from-primary to-accent" />
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-5 lg:flex">
            {PUBLIC_NAV_LINKS.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => soundEngine.playClick()}
                    className={cn(
                      "group relative font-ui text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-colors",
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px transition-all duration-300 bg-linear-to-r from-primary to-accent",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Live Arena Status Pill */}
            <div className="hidden items-center gap-1.5 border border-primary/30 bg-background/60 px-2.5 py-1 font-mono text-[0.62rem] text-muted-foreground clip-notch 2xl:flex">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">ONLINE</span>
              <span>•</span>
              <span>
                {activeCount}/{stations.length} Active
              </span>
            </div>

            {/* Cyber Sound FX Switch */}
            <button
              type="button"
              onClick={handleToggleSound}
              title={soundActive ? "Mute Cyber FX" : "Enable Cyber FX"}
              className={cn(
                "flex items-center gap-1 border px-2 py-1.5 font-ui text-xs font-bold clip-notch transition-all",
                soundActive
                  ? "border-primary/60 bg-primary/20 text-primary shadow-[0_0_12px_var(--neon)]"
                  : "border-border/60 bg-card/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {soundActive ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
              <span className="hidden md:inline text-[0.65rem] font-mono">
                {soundActive ? "FX ON" : "FX OFF"}
              </span>
            </button>

            <a
              href={CONTACT.phoneHref}
              onMouseEnter={() => soundEngine.playHover()}
              className="hidden items-center gap-1.5 border border-accent/30 bg-card/70 px-2.5 py-1.5 font-ui text-[0.65rem] font-bold tracking-wide text-foreground clip-notch hover:border-accent xl:flex"
            >
              <Phone className="size-3.5 text-accent" />
              {CONTACT.phone}
            </a>

            {/* User Profile / OTP Login button */}
            {currentUser ? (
              <Link
                to="/book"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className="hidden sm:flex items-center gap-2 border border-accent/50 bg-card px-2.5 sm:px-3 py-1.5 font-ui text-xs font-bold text-accent clip-notch hover:border-accent"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="size-5 rounded-full object-cover"
                />
                <span className="hidden md:inline font-mono">{currentUser.name}</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setShowLoginModal(true);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="hidden sm:flex items-center gap-1.5 border border-primary/50 bg-card px-2.5 sm:px-3 py-1.5 font-ui text-xs font-bold uppercase text-primary clip-notch hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <LogIn className="size-3.5" /> <span className="hidden md:inline">OTP Login</span>
              </button>
            )}

            <Link
              to="/book"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              className="bg-primary px-2.5 sm:px-4 py-1.5 sm:py-2 font-ui text-[0.68rem] sm:text-xs font-bold tracking-[0.1em] sm:tracking-[0.2em] text-primary-foreground uppercase clip-notch transition-all hover:shadow-[0_0_24px_-4px_var(--neon)] active:scale-95 shrink-0"
            >
              Book
            </Link>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid size-9 sm:size-10 place-items-center border border-primary/30 clip-notch bg-card/60 lg:hidden shrink-0"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 bg-foreground transition-all duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-1.5 left-0 h-0.5 w-5 bg-foreground transition-all duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-5 bg-foreground transition-all duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <span className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-accent to-primary [animation:line-run_5s_linear_infinite]" />
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={cn(
            "overflow-hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden",
            open ? "max-h-[42rem] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <ul className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {PUBLIC_NAV_LINKS.map((l, i) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-border/40 py-3 font-ui text-xs font-semibold tracking-[0.2em] uppercase",
                    location.pathname === l.to ? "text-primary font-bold" : "text-muted-foreground",
                  )}
                >
                  {l.label}
                  <span className="hud-label text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-5">
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((service) => (
                <span
                  key={service}
                  className="rounded-md bg-primary/80 px-2.5 py-1 font-ui text-[0.65rem] font-bold tracking-wide text-primary-foreground uppercase"
                >
                  {service}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 font-ui text-xs font-bold text-background"
              >
                <Phone className="size-3.5" />
                {CONTACT.phone}
              </a>
              <a
                href={CONTACT.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 font-ui text-xs font-bold text-background"
              >
                <Instagram className="size-3.5" />
                {CONTACT.instagram}
              </a>
            </div>
          </div>
        </div>
      </header>

      <OtpLoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
