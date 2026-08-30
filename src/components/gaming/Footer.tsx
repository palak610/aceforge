import { Link } from "@tanstack/react-router";
import { Gamepad2, Phone, Mail, MapPin } from "lucide-react";
import { LOCATION_CONFIG, EXPERIENCES } from "@/data/gamingZone";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a1a24] bg-[#07070a] text-muted-foreground pt-12 pb-16 md:pb-12 text-xs font-ui">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#1a1a24]">
          {/* Brand Col */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 grid place-items-center text-primary-foreground font-black">
                <Gamepad2 className="size-4" />
              </div>
              <span className="font-display text-base font-black tracking-wider uppercase text-foreground">
                Ace Forge
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ahmedabad premier console and PC esports gaming destination. High-refresh battle stations, 4K PS5 rigs, direct-drive racing cockpits, and virtual reality pods.
            </p>
          </div>

          {/* Experiences Links */}
          <div className="space-y-2.5">
            <h4 className="font-display text-xs font-bold uppercase text-foreground tracking-wider">
              Gaming Experiences
            </h4>
            <ul className="space-y-1.5 font-mono text-[0.68rem]">
              {EXPERIENCES.map((exp) => (
                <li key={exp.id}>
                  <a
                    href="#experience-selector"
                    className="hover:text-primary transition-colors"
                  >
                    {exp.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-display text-xs font-bold uppercase text-foreground tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 font-mono text-[0.68rem]">
              <li>
                <a href="#experiences" className="hover:text-primary transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#games" className="hover:text-primary transition-colors">
                  Game Vault
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary transition-colors">
                  Rates & Pricing
                </a>
              </li>
              <li>
                <a href="#cafe" className="hover:text-primary transition-colors">
                  Café & Refreshments
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-primary transition-colors">
                  Tournaments & Parties
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-primary transition-colors">
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-2.5">
            <h4 className="font-display text-xs font-bold uppercase text-foreground tracking-wider">
              Contact & Lounge Hours
            </h4>
            <div className="space-y-1.5 font-mono text-[0.68rem]">
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-primary shrink-0" />
                <a href={`tel:${LOCATION_CONFIG.phoneRaw}`} className="hover:text-foreground">
                  {LOCATION_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-primary shrink-0" />
                <span>{LOCATION_CONFIG.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 text-primary shrink-0 mt-0.5" />
                <span>{LOCATION_CONFIG.city}</span>
              </div>
              <div className="pt-2 text-emerald-400 font-bold">
                Mon - Sun: {LOCATION_CONFIG.hours.weekdays}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.65rem] font-mono text-muted-foreground">
          <div>
            © {currentYear} Ace Forge Gaming Lounge. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer">Fair Play Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
