import { MapPin, Clock, Phone, MessageSquare, ArrowRight, Navigation, ShieldCheck, Activity } from "lucide-react";
import { LOCATION_CONFIG } from "@/data/gamingZone";

interface LocationSectionProps {
  onBookClick: () => void;
}

export function LocationSection({ onBookClick }: LocationSectionProps) {
  return (
    <section id="location" className="py-12 sm:py-16 border-t border-[#1a1a28] bg-[#0c0c12]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#28283e] bg-[#111118]/95 p-6 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -bottom-10 right-0 size-96 rounded-full bg-primary/15 blur-[120px]" />
          <div className="pointer-events-none absolute -top-10 left-0 size-64 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary uppercase mb-2">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Visit The Lounge // Walk-Ins Welcome</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-foreground">
                  Ready to Play?
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-ui max-w-lg leading-relaxed">
                  Walk in today or reserve your battle station in advance. Ahmedabad premier destination for competitive gaming and casual weekend squads.
                </p>
              </div>

              {/* Detail Grid */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
                {/* Address */}
                <div className="p-4 rounded-2xl bg-[#161624] border border-[#242438] space-y-1.5 shadow-md">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-[0.68rem] tracking-wider">
                    <MapPin className="size-4" />
                    <span>Lounge Coordinates</span>
                  </div>
                  {LOCATION_CONFIG.addressLines.map((line) => (
                    <div key={line} className="text-muted-foreground">
                      {line}
                    </div>
                  ))}
                  <div className="text-foreground font-bold pt-1">{LOCATION_CONFIG.city} - {LOCATION_CONFIG.pincode}</div>
                </div>

                {/* Operating Hours */}
                <div className="p-4 rounded-2xl bg-[#161624] border border-[#242438] space-y-1.5 shadow-md">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-[0.68rem] tracking-wider">
                    <Clock className="size-4" />
                    <span>Operating Hours</span>
                  </div>
                  <div className="text-muted-foreground">
                    Mon - Fri: <strong className="text-foreground">{LOCATION_CONFIG.hours.weekdays}</strong>
                  </div>
                  <div className="text-muted-foreground">
                    Sat - Sun: <strong className="text-foreground">{LOCATION_CONFIG.hours.weekends}</strong>
                  </div>
                  <div className="text-emerald-400 text-[0.68rem] font-bold pt-1">Open 7 Days a Week</div>
                </div>
              </div>

              {/* Quick Communication Bar */}
              <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-muted-foreground pt-1">
                <a
                  href={`tel:${LOCATION_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="size-4 text-primary" />
                  <span>Call: {LOCATION_CONFIG.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${LOCATION_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageSquare className="size-4 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 justify-center">
              <button
                type="button"
                onClick={onBookClick}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary via-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-primary-foreground font-ui text-xs font-black uppercase tracking-widest shadow-[0_0_30px_-5px_var(--neon)] active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <span>Book a Session</span>
                <ArrowRight className="size-4" />
              </button>

              <a
                href={LOCATION_CONFIG.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-2xl border border-[#2e2e42] bg-[#161622] hover:bg-[#1f1f2e] text-foreground font-ui text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <Navigation className="size-4 text-primary" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
