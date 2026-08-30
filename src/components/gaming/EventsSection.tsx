import { useState, useEffect } from "react";
import { Trophy, Cake, Users, Building, ArrowRight, CheckCircle2, X, Sparkles } from "lucide-react";
import { LOCATION_CONFIG, type EventOption } from "@/data/gamingZone";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";

const ICONS: Record<string, typeof Trophy> = {
  tournaments: Trophy,
  birthdays: Cake,
  "corporate-college": Building,
};

export function EventsSection() {
  const { events } = useArenaStore();
  const [selectedEvent, setSelectedEvent] = useState<EventOption | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedEvent) {
        soundEngine.playClick();
        setSelectedEvent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent]);

  const handlePlanEvent = (event: EventOption) => {
    soundEngine.playClick();
    setSelectedEvent(event);
  };

  return (
    <section id="events" className="py-12 sm:py-16 border-t border-[#1a1a28] bg-[#09090e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-primary uppercase mb-1.5">
              <span className="size-1.5 rounded-full bg-primary" />
              <span>Squad Bookings // Private Arena Hire</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
              Tournaments, Parties & Events
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md font-ui leading-relaxed">
            Host esports brackets, birthday squads, or corporate rivalry nights with spectator feeds, custom leaderboards, and lounge catering.
          </p>
        </div>

        {/* Dynamic Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {events.map((event: EventOption) => {
            const Icon = ICONS[event.id] || Trophy;

            return (
              <div
                key={event.id}
                className="rounded-3xl border border-[#242436] bg-[#111118] p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-primary/60 transition-all duration-300 shadow-xl group"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-2xl bg-[#171724] border border-[#27273c] p-3 text-primary group-hover:border-primary transition-colors">
                      <Icon className="size-5" />
                    </span>
                    {event.badge && (
                      <span className="rounded-md bg-primary/20 text-primary border border-primary/40 px-2.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase">
                        {event.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-black uppercase text-foreground">
                    {event.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-ui">
                    {event.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 py-4 border-y border-[#1f1f2e]">
                  <span className="font-mono text-[0.65rem] text-primary uppercase font-bold tracking-wider block">
                    Capacity: {event.capacity}
                  </span>
                  {event.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[0.62rem] font-mono text-muted-foreground uppercase block font-bold">
                      Starting from
                    </span>
                    <span className="font-display text-2xl font-black text-gradient-neon">
                      ₹{event.startingPrice}
                    </span>
                  </div>

                  <button
                    type="button"
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => handlePlanEvent(event)}
                    className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Plan Event</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plan Event Modal (Instant & Click Outside to Close) */}
        {selectedEvent && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                soundEngine.playClick();
                setSelectedEvent(null);
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          >
            <div className="relative w-full max-w-md rounded-3xl border border-primary/50 bg-[#111117] p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-in">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedEvent(null);
                }}
                className="size-9 rounded-xl bg-[#161624] border border-[#27273c] grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors absolute top-4 right-4"
              >
                <X className="size-4" />
              </button>

              <h3 className="font-display text-xl font-black uppercase text-foreground">
                Plan {selectedEvent.title}
              </h3>
              <p className="text-xs text-muted-foreground font-ui">
                Contact our arena manager for bracket formats, reserved VIP zones, and customized food & beverage packages.
              </p>

              <div className="p-4 rounded-2xl bg-[#161624] border border-[#262638] text-xs font-mono space-y-2">
                <div>
                  <strong>Phone:</strong> {LOCATION_CONFIG.phone}
                </div>
                <div>
                  <strong>WhatsApp:</strong> {LOCATION_CONFIG.whatsapp}
                </div>
                <div>
                  <strong>Hours:</strong> {LOCATION_CONFIG.hours.weekdays}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${LOCATION_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                    `Hello Ace Forge, I would like to plan an event: ${selectedEvent.title}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-ui text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
