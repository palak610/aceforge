import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Gamepad2, Menu, X, ArrowRight, Phone, Volume2, VolumeX, Shield, User } from "lucide-react";
import { LOCATION_CONFIG } from "@/data/gamingZone";
import { soundEngine } from "@/lib/soundEngine";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSoundEnabled(soundEngine.getSoundEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAudio = () => {
    const newState = soundEngine.toggleMute();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Zones", href: "/zones" },
    { label: "Games", href: "/games" },
    { label: "Pricing", href: "/pricing" },
    { label: "Café", href: "/cafe" },
    { label: "Book", href: "/book" },
    { label: "History", href: "/history" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#09090e]/95 backdrop-blur-xl border-b border-[#242436] py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-[#09090e]/90 to-transparent py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Glowing Pulse */}
        <Link
          to="/"
          onMouseEnter={() => soundEngine.playHover()}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative size-9 rounded-xl bg-gradient-to-br from-primary via-primary to-purple-600 grid place-items-center text-primary-foreground font-black shadow-[0_0_20px_-3px_var(--neon)] group-hover:scale-110 transition-transform">
            <Gamepad2 className="size-5" />
            <span className="absolute -inset-0.5 rounded-xl border border-primary opacity-0 group-hover:opacity-100 animate-ping pointer-events-none" />
          </div>
          <div>
            <span className="font-display text-lg font-black tracking-wider uppercase text-foreground group-hover:text-primary transition-colors">
              Ace Forge
            </span>
            <span className="block font-mono text-[0.6rem] font-bold tracking-widest text-primary uppercase">
              Gaming Lounge
            </span>
          </div>
        </Link>

        {/* Desktop Multi-Page Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#14141e]/90 border border-[#242436] rounded-full px-3 py-1.5 backdrop-blur-xl shadow-lg">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 font-black"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#1f1f2c]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* Audio FX Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            title={soundEnabled ? "Mute sound FX" : "Unmute sound FX"}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono font-bold uppercase transition-all",
              soundEnabled
                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_-3px_rgba(52,211,153,0.4)]"
                : "border-[#242436] bg-[#14141e] text-muted-foreground hover:text-foreground",
            )}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="size-3.5" />
                <div className="flex items-end gap-0.5 h-3">
                  {[0.4, 0.8, 0.6, 1].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-emerald-400 rounded-full animate-pulse"
                      style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <VolumeX className="size-3.5" />
                <span className="text-[0.62rem] hidden sm:inline">SOUND OFF</span>
              </>
            )}
          </button>

          <Link
            to="/admin"
            onMouseEnter={() => soundEngine.playHover()}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#262638] bg-[#14141e] text-muted-foreground hover:text-primary hover:border-primary/40 font-mono text-xs font-bold uppercase transition-colors"
            title="Admin Command Center"
          >
            <Shield className="size-3.5 text-primary" />
            <span>Admin</span>
          </Link>

          <Link
            to="/book"
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => soundEngine.playClick()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-primary-foreground font-ui text-xs font-black uppercase tracking-wider shadow-[0_0_20px_-5px_var(--neon)] active:scale-95 transition-all"
          >
            <span>Book Station</span>
            <ArrowRight className="size-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden size-9 rounded-xl border border-[#242436] bg-[#14141e] grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#0d0d14]/98 border-b border-[#242436] p-5 shadow-2xl backdrop-blur-2xl animate-fade-in space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => {
                    soundEngine.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "p-3 text-left font-ui text-xs font-bold uppercase tracking-wider rounded-xl transition-colors border",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary font-black"
                      : "text-muted-foreground hover:text-foreground bg-[#161622] hover:bg-[#1e1e2e] border-[#242436]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/book"
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-ui text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30 text-center flex items-center justify-center gap-2"
            >
              <span>Book Session Now</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/admin"
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl border border-[#242436] bg-[#14141e] text-muted-foreground font-mono text-xs text-center flex items-center justify-center gap-2"
            >
              <Shield className="size-3.5 text-primary" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
