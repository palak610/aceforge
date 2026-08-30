import { useState, useEffect } from "react";
import {
  Gamepad2,
  Monitor,
  Car,
  Glasses,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  X,
  QrCode,
  Sparkles,
} from "lucide-react";
import { type PricingTier } from "@/data/gamingZone";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { AnimatedNumber } from "@/components/arena/PageTransition";
import { cn } from "@/lib/utils";

interface BookingWidgetProps {
  initialExpId?: string;
  initialDurationId?: string;
  initialTier?: PricingTier;
}

const ICONS: Record<string, typeof Gamepad2> = {
  ps5: Gamepad2,
  pc: Monitor,
  racing: Car,
  vr: Glasses,
};

const TIME_SLOTS = [
  "11:00 AM",
  "12:30 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
  "06:30 PM",
  "08:00 PM",
  "09:30 PM",
  "11:00 PM",
];

export function BookingWidget({
  initialExpId = "ps5",
  initialDurationId = "1h",
  initialTier = "regular",
}: BookingWidgetProps) {
  const { experiences, calculateExperiencePrice } = useArenaStore();

  const [selectedExpId, setSelectedExpId] = useState(initialExpId);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split("T")[0] || "";
  });
  const [selectedDurationId, setSelectedDurationId] = useState(initialDurationId);
  const [selectedSlot, setSelectedSlot] = useState("07:00 PM");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showConfirmation) {
        soundEngine.playClick();
        setShowConfirmation(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showConfirmation]);

  const activeExp = experiences.find((e) => e.id === selectedExpId) || experiences[0]!;

  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayStr = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    const dateNum = d.getDate();
    const monthStr = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const iso = d.toISOString().split("T")[0] || "";
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    return { dayStr, dateNum, monthStr, iso, isWeekend };
  });

  const selectedDateObj = next7Days.find((d) => d.iso === selectedDate);
  const currentTier: PricingTier = selectedDateObj?.isWeekend ? "weekend" : initialTier;
  const totalPrice = calculateExperiencePrice(selectedExpId, selectedDurationId, currentTier);
  const activeDurationObj = activeExp.durationOptions.find((d) => d.id === selectedDurationId);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSuccess();
    setShowConfirmation(true);
  };

  return (
    <section id="booking-widget" className="py-12 sm:py-16 border-t border-[#1a1a28] bg-[#09090e] relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-[0.68rem] font-mono font-bold tracking-widest uppercase mb-2 shadow-lg shadow-primary/15 animate-pulse">
            <ShieldCheck className="size-3.5" />
            <span>Interactive Terminal // Live Dispatch</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black uppercase text-foreground">
            Reserve Your Battle Station
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-ui">
            Select your platform, pick your date and time slot, and preview your instant booking voucher.
          </p>
        </div>

        {/* Cyberpunk Booking Card */}
        <form
          onSubmit={handleBookingSubmit}
          className="rounded-3xl border border-[#27273c] bg-[#111118]/95 p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] space-y-8 relative overflow-hidden"
        >
          {/* Corner Cyber Accents */}
          <div className="absolute top-0 left-0 size-6 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 size-6 border-t-2 border-r-2 border-primary" />

          {/* STEP 1: CHOOSE EXPERIENCE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-ui text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="size-6 rounded-lg bg-primary/20 border border-primary/40 text-primary grid place-items-center text-xs font-mono font-black">
                  01
                </span>
                <span>Select Battle Platform</span>
              </label>
              <span className="text-[0.68rem] font-mono text-muted-foreground">
                Active: <strong className="text-primary font-bold">{activeExp.name}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {experiences.map((exp) => {
                const Icon = ICONS[exp.id] || Gamepad2;
                const isSelected = selectedExpId === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => {
                      soundEngine.playActivate();
                      setSelectedExpId(exp.id);
                      if (!exp.durationOptions.some((d) => d.id === selectedDurationId)) {
                        setSelectedDurationId(exp.durationOptions[0]?.id || "1h");
                      }
                    }}
                    className={cn(
                      "p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3",
                      isSelected
                        ? "border-primary bg-primary/20 shadow-[0_0_20px_-5px_var(--neon)] text-primary-foreground scale-102"
                        : "border-[#242436] bg-[#151520] hover:border-[#35354e]",
                    )}
                  >
                    <Icon className={cn("size-5", isSelected ? "text-primary" : "text-muted-foreground")} />
                    <div>
                      <div className="font-ui text-xs font-black uppercase text-foreground">{exp.id.toUpperCase()}</div>
                      <div className="font-mono text-[0.62rem] text-muted-foreground">From ₹{exp.startingPrice}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: CHOOSE DATE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-ui text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="size-6 rounded-lg bg-primary/20 border border-primary/40 text-primary grid place-items-center text-xs font-mono font-black">
                  02
                </span>
                <span>Select Date</span>
              </label>
              <span className="text-[0.68rem] font-mono text-emerald-400 font-bold">
                {selectedDateObj?.isWeekend ? "WEEKEND RATES ACTIVE" : "STANDARD RATES ACTIVE"}
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {next7Days.map((d) => {
                const isSelected = selectedDate === d.iso;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedDate(d.iso);
                    }}
                    className={cn(
                      "flex min-w-[76px] sm:min-w-[88px] flex-col items-center p-3 rounded-2xl border transition-all shrink-0",
                      isSelected
                        ? "border-primary bg-primary/25 text-primary shadow-[0_0_20px_-5px_var(--neon)] scale-104"
                        : "border-[#242436] bg-[#151520] text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span className="text-[0.6rem] font-mono font-bold uppercase">{d.dayStr}</span>
                    <span className="font-display text-xl sm:text-2xl font-black text-foreground my-0.5">{d.dateNum}</span>
                    <span className="text-[0.6rem] font-mono">{d.monthStr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3 & STEP 4: DURATION & TIME */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* DURATION */}
            <div className="space-y-3">
              <label className="font-ui text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="size-6 rounded-lg bg-primary/20 border border-primary/40 text-primary grid place-items-center text-xs font-mono font-black">
                  03
                </span>
                <span>Select Duration</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {activeExp.durationOptions.map((dur) => {
                  const isSelected = selectedDurationId === dur.id;
                  const price = calculateExperiencePrice(activeExp.id, dur.id, currentTier);
                  return (
                    <button
                      key={dur.id}
                      type="button"
                      onMouseEnter={() => soundEngine.playHover()}
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedDurationId(dur.id);
                      }}
                      className={cn(
                        "p-3 rounded-2xl border text-left transition-all",
                        isSelected
                          ? "border-primary bg-primary/20 text-primary shadow-sm scale-102"
                          : "border-[#242436] bg-[#151520] text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <div className="font-ui text-xs font-bold text-foreground">{dur.label}</div>
                      <div className="font-mono text-sm font-black text-gradient-neon mt-0.5">₹{price}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TIME SLOT */}
            <div className="space-y-3">
              <label className="font-ui text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <span className="size-6 rounded-lg bg-primary/20 border border-primary/40 text-primary grid place-items-center text-xs font-mono font-black">
                  04
                </span>
                <span>Select Time Slot</span>
              </label>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onMouseEnter={() => soundEngine.playHover()}
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedSlot(slot);
                      }}
                      className={cn(
                        "py-2.5 px-2 rounded-xl border text-center font-mono text-xs font-bold transition-all",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-102"
                          : "border-[#242436] bg-[#151520] text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 5: REVIEW & SUMMARY */}
          <div className="pt-6 border-t border-[#202030] bg-[#0c0c14] rounded-2xl p-5 border border-[#222234]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-emerald-400 animate-pulse" />
                  <span className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold tracking-wider">
                    Session Telemetry Summary
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-foreground">
                  <span className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary font-bold border border-primary/30">
                    {activeExp.name}
                  </span>
                  <span>•</span>
                  <span>{activeDurationObj?.label}</span>
                  <span>•</span>
                  <span>{selectedDate}</span>
                  <span>•</span>
                  <span className="text-accent font-bold">{selectedSlot}</span>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-right">
                  <span className="text-[0.62rem] font-mono text-muted-foreground block uppercase font-bold">
                    Payable Amount
                  </span>
                  <span className="font-display text-3xl font-black text-gradient-neon filter drop-shadow-[0_0_15px_rgba(123,44,255,0.4)]">
                    <AnimatedNumber value={totalPrice} prefix="₹" />
                  </span>
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundEngine.playHover()}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary via-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-primary-foreground font-ui text-xs font-black uppercase tracking-widest shadow-[0_0_25px_-5px_var(--neon)] active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Continue Booking</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                soundEngine.playClick();
                setShowConfirmation(false);
              }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          >
            <div className="relative w-full max-w-md rounded-3xl border border-primary/60 bg-[#111118] p-6 sm:p-8 shadow-[0_0_60px_-10px_rgba(123,44,255,0.5)] text-center space-y-6 animate-scale-in">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setShowConfirmation(false);
                }}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>

              <div className="size-16 rounded-2xl bg-primary/20 border-2 border-primary text-primary mx-auto grid place-items-center shadow-lg shadow-primary/40 animate-pulse">
                <CheckCircle2 className="size-9" />
              </div>

              <div>
                <h3 className="font-display text-2xl font-black uppercase text-foreground">
                  Session Confirmed
                </h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  DISPATCH TOKEN: #AF-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>

              {/* Digital Pass Receipt */}
              <div className="p-4 rounded-2xl bg-[#161624] border border-[#262638] text-left space-y-2.5 text-xs font-mono">
                <div className="flex justify-between border-b border-[#262638] pb-2">
                  <span className="text-muted-foreground">Experience:</span>
                  <strong className="text-foreground">{activeExp.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <strong className="text-foreground">{selectedDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <strong className="text-foreground">{activeDurationObj?.label}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slot:</span>
                  <strong className="text-accent">{selectedSlot}</strong>
                </div>
                <div className="flex justify-between border-t border-[#262638] pt-2 text-sm font-bold">
                  <span className="text-muted-foreground">Total Price:</span>
                  <span className="text-gradient-neon text-lg">₹{totalPrice}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setShowConfirmation(false);
                }}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30"
              >
                Done Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
