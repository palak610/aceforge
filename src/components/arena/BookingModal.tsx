import { useState } from "react";
import { useArenaStore, type Booking } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import {
  Gamepad2,
  Monitor,
  Car,
  Glasses,
  Check,
  Calendar,
  Clock,
  Users,
  Tag,
  ArrowRight,
  ArrowLeft,
  X,
  Lock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RazorpayModal } from "./RazorpayModal";
import { BookingSuccessModal } from "./BookingSuccessModal";

type BookingModalProps = {
  isOpen: boolean;
  initialCategory?: "ps5" | "pc" | "racing" | "vr";
  onClose: () => void;
};

const DURATION_OPTIONS = {
  ps5: [
    { label: "1 Hour", mins: 60 },
    { label: "2 Hours", mins: 120 },
    { label: "3 Hours", mins: 180 },
    { label: "5 Hours", mins: 300 },
  ],
  pc: [
    { label: "1 Hour", mins: 60 },
    { label: "2 Hours", mins: 120 },
    { label: "3 Hours (Best Value ₹240!)", mins: 180, highlight: true },
    { label: "5 Hours", mins: 300 },
  ],
  racing: [
    { label: "1 Hour", mins: 60 },
    { label: "2 Hours", mins: 120 },
    { label: "3 Hours", mins: 180 },
  ],
  vr: [
    { label: "30 Minutes (₹100)", mins: 30 },
    { label: "1 Hour (₹150)", mins: 60 },
  ],
};

const TIME_PERIODS = [
  { id: "morning", label: "Morning", slots: ["10:00 AM", "11:00 AM", "12:00 PM"] },
  {
    id: "afternoon",
    label: "Afternoon",
    slots: ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  { id: "evening", label: "Evening", slots: ["05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"] },
  { id: "night", label: "Night", slots: ["09:00 PM", "10:00 PM", "11:00 PM"] },
  { id: "latenight", label: "Late Night", slots: ["11:59 PM", "01:00 AM"] },
];

export function BookingModal({ isOpen, initialCategory = "ps5", onClose }: BookingModalProps) {
  const { currentUser, calculatePrice, getAvailableStation, lockStation, createBooking } =
    useArenaStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<"ps5" | "pc" | "racing" | "vr">(initialCategory);

  // Step 2 State
  const [durationMins, setDurationMins] = useState<number>(120);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0] || "";
  });
  const [timePeriod, setTimePeriod] = useState<string>("evening");
  const [timeSlot, setTimeSlot] = useState<string>("08:00 PM");
  const [players, setPlayers] = useState<number>(1);

  // Step 3 State
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string>("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; success: boolean } | null>(null);

  // Payment & Success Modal state
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  // Generate next 7 dates for horizontal date cards
  const dateCards = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayStr = d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
    const monthStr = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const dateNum = d.getDate();
    const fullDate = d.toISOString().split("T")[0] || "";
    return { dayStr, monthStr, dateNum, fullDate, formatted: `${dayStr} ${dateNum} ${monthStr}` };
  });

  // Calculate live dynamic pricing using store pricing engine
  const pricing = calculatePrice({
    category,
    durationMinutes: durationMins,
    promoCodeStr: appliedPromo,
  });

  const assignedStationObj = getAvailableStation(category);
  const assignedStation = assignedStationObj ? assignedStationObj.name : "STATION-01";

  const handleApplyPromo = () => {
    if (!promoCodeInput.trim()) return;
    const res = calculatePrice({
      category,
      durationMinutes: durationMins,
      promoCodeStr: promoCodeInput.trim(),
    });

    if (res.promoDiscount > 0) {
      setAppliedPromo(promoCodeInput.trim().toUpperCase());
      setPromoMsg({
        text: `Promo code ${promoCodeInput.toUpperCase()} applied! Saved ₹${res.promoDiscount}`,
        success: true,
      });
    } else {
      setPromoMsg({ text: "Invalid or expired promo code.", success: false });
    }
  };

  const handleProceedToPayment = () => {
    if (assignedStationObj) {
      lockStation(assignedStationObj.id);
    }
    setShowRazorpay(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    setShowRazorpay(false);

    const categoryNames = {
      ps5: "PS5 Console Gaming",
      pc: "High-End PC Battlestation",
      racing: "Racing Simulator Cockpit",
      vr: "VR Immersion Experience",
    };

    const newBooking = createBooking({
      userId: currentUser?.id || "GUEST",
      customerName: currentUser?.name || "Falgun",
      customerPhone: currentUser?.mobile ? `+91 ${currentUser.mobile}` : "+91 98765 43210",
      category,
      categoryName: categoryNames[category],
      stationId: assignedStation,
      stationName: assignedStation,
      date: selectedDate,
      timeSlot,
      duration: `${durationMins / 60} Hour(s)`,
      durationMinutes: durationMins,
      players,
      basePrice: pricing.rawBasePrice,
      packageDiscount: pricing.packageDiscount,
      onlineDiscount: pricing.onlineDiscount,
      promoDiscount: pricing.promoDiscount,
      promoCodeApplied: appliedPromo,
      membershipDiscount: pricing.membershipDiscount,
      finalAmount: pricing.finalPayable,
      paymentStatus: "PAID",
      bookingStatus: "CONFIRMED",
    });

    soundEngine.playSuccess();
    setConfirmedBooking(newBooking);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
        <div className="relative w-full max-w-2xl border border-primary/50 bg-card/95 p-4 sm:p-6 md:p-8 shadow-[0_0_80px_-10px_var(--neon)] clip-notch my-auto max-h-[92vh] overflow-y-auto space-y-4 sm:space-y-6">
          {/* Header & Close */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3 sm:pb-4">
            <div>
              <h2 className="font-display text-lg sm:text-2xl font-black uppercase text-foreground tracking-tight">
                Book Your Session
              </h2>
              <p className="text-[0.68rem] sm:text-xs text-muted-foreground">
                AceForge Arena Ahmedabad // Instant Confirmation
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-1.5"
            >
              <X className="size-5 sm:size-6" />
            </button>
          </div>

          {/* STEP PROGRESS INDICATOR */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
            {[
              { num: 1, label: "1 GAME" },
              { num: 2, label: "2 SCHEDULE" },
              { num: 3, label: "3 CONFIRM" },
            ].map((s) => (
              <div
                key={s.num}
                className={cn(
                  "py-1.5 sm:py-2 font-ui text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-wider clip-notch transition-all border",
                  step === s.num
                    ? "border-primary bg-primary/20 text-primary shadow-[0_0_16px_-4px_var(--neon)]"
                    : step > s.num
                      ? "border-accent/60 bg-accent/10 text-accent"
                      : "border-border/60 bg-background/50 text-muted-foreground",
                )}
              >
                {s.label}
              </div>
            ))}
          </div>

          {/* STEP 1: SELECT GAMING CATEGORY */}
          {step === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                {[
                  {
                    id: "ps5",
                    name: "PS5",
                    desc: "Console Gaming",
                    icon: Gamepad2,
                    rate: "₹120 / Hour",
                  },
                  {
                    id: "pc",
                    name: "PC Gaming",
                    desc: "High-End PC Battlestation",
                    icon: Monitor,
                    rate: "₹120 / Hour (3h ₹240 Pkg)",
                  },
                  {
                    id: "racing",
                    name: "Racing Simulator",
                    desc: "Racing Cockpit Sim",
                    icon: Car,
                    rate: "₹150 / Hour",
                  },
                  {
                    id: "vr",
                    name: "VR Experience",
                    desc: "Virtual Reality Immersion",
                    icon: Glasses,
                    rate: "₹150 / Hour (30m ₹100)",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = category === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id as "ps5" | "pc" | "racing" | "vr")}
                      className={cn(
                        "cyber-card group relative flex flex-col justify-between border p-3 sm:p-4 text-left clip-notch transition-all hover:scale-[1.01]",
                        isSelected
                          ? "border-primary bg-primary/10 shadow-[0_0_24px_-4px_var(--neon)] animate-pulse-glow"
                          : "border-border/80 bg-background/60 text-muted-foreground hover:border-foreground/50",
                      )}
                    >
                      {isSelected && (
                        <div className="absolute right-3 top-3 grid size-5 sm:size-6 place-items-center bg-primary text-primary-foreground clip-notch shadow-[0_0_10px_var(--neon)]">
                          <Check className="size-3.5 sm:size-4" />
                        </div>
                      )}
                      <div>
                        <Icon
                          className={cn(
                            "size-6 sm:size-8 mb-1.5 sm:mb-2",
                            isSelected ? "text-primary animate-pulse" : "text-muted-foreground",
                          )}
                        />
                        <h3 className="font-display text-base sm:text-lg font-black uppercase text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>

                      <div className="mt-3 sm:mt-4 border-t border-border/40 pt-1.5 sm:pt-2 font-mono text-[0.62rem] sm:text-[0.65rem] font-bold text-accent">
                        {item.rate}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="cyber-button w-full bg-primary py-3 sm:py-3.5 font-ui text-xs font-bold uppercase tracking-widest text-primary-foreground clip-notch shadow-[0_0_24px_-4px_var(--neon)] hover:bg-primary/90 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                CONTINUE TO SCHEDULE <ArrowRight className="size-4" />
              </button>
            </div>
          )}

          {/* STEP 2: DURATION, DATE, TIME PERIOD, TIME SLOTS, PLAYERS */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Duration selection */}
              <div>
                <label className="hud-label text-muted-foreground block mb-1.5">
                  Select Duration
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DURATION_OPTIONS[category].map((opt) => (
                    <button
                      key={opt.mins}
                      type="button"
                      onClick={() => setDurationMins(opt.mins)}
                      className={cn(
                        "border p-2.5 text-center font-ui text-xs font-bold clip-notch transition-all",
                        durationMins === opt.mins
                          ? "border-primary bg-primary/20 text-primary shadow-[0_0_16px_-4px_var(--neon)]"
                          : "border-border bg-background/60 text-muted-foreground hover:border-foreground/50",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontal Date Picker */}
              <div>
                <label className="hud-label text-muted-foreground block mb-1.5">Select Date</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {dateCards.map((d) => (
                    <button
                      key={d.fullDate}
                      type="button"
                      onClick={() => setSelectedDate(d.fullDate)}
                      className={cn(
                        "flex min-w-[75px] flex-col items-center border p-2 font-ui clip-notch transition-all shrink-0",
                        selectedDate === d.fullDate
                          ? "border-primary bg-primary/20 text-primary shadow-[0_0_16px_-4px_var(--neon)]"
                          : "border-border bg-background/50 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span className="text-[0.6rem] font-bold text-muted-foreground">
                        {d.dayStr}
                      </span>
                      <span className="font-display text-lg font-black">{d.dateNum}</span>
                      <span className="text-[0.6rem] font-bold">{d.monthStr}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Period Filter */}
              <div>
                <label className="hud-label text-muted-foreground block mb-1.5">Time Period</label>
                <div className="flex flex-wrap gap-1.5">
                  {TIME_PERIODS.map((period) => (
                    <button
                      key={period.id}
                      type="button"
                      onClick={() => setTimePeriod(period.id)}
                      className={cn(
                        "px-3 py-1.5 font-ui text-xs font-bold uppercase clip-notch transition-colors",
                        timePeriod === period.id
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background/50 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="hud-label text-muted-foreground block mb-1.5">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {(TIME_PERIODS.find((p) => p.id === timePeriod)?.slots || []).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={cn(
                        "border py-2 text-center font-mono text-xs font-bold clip-notch transition-all",
                        timeSlot === slot
                          ? "border-accent bg-accent/20 text-accent shadow-[0_0_16px_-4px_var(--neon-blue)]"
                          : "border-border bg-background/50 text-muted-foreground hover:border-foreground/50",
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Station Availability Counter & Player Count */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between border border-accent/40 bg-accent/10 p-3 clip-notch">
                  <span className="text-xs font-bold text-accent flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" /> STATIONS AVAILABLE
                  </span>
                  <span className="font-mono text-xs font-bold text-foreground">
                    Unit: {assignedStation}
                  </span>
                </div>

                <div className="flex items-center justify-between border border-border bg-background/60 p-3 clip-notch">
                  <span className="hud-label text-muted-foreground">Player Count</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPlayers(Math.max(1, players - 1))}
                      className="size-7 border border-border bg-card font-bold text-foreground clip-notch hover:bg-accent hover:text-black"
                    >
                      -
                    </button>
                    <span className="font-display font-black text-sm text-foreground w-4 text-center">
                      {players}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPlayers(Math.min(4, players + 1))}
                      className="size-7 border border-border bg-card font-bold text-foreground clip-notch hover:bg-accent hover:text-black"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* LIVE PRICE PREVIEW BADGE */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/60 pt-3">
                <div>
                  <span className="hud-label text-muted-foreground text-[0.62rem] sm:text-[0.68rem]">Estimated Payable</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl sm:text-2xl font-black text-gradient-neon">
                      ₹{pricing.finalPayable}
                    </span>
                    {pricing.packageDiscount > 0 && (
                      <span className="text-[0.68rem] sm:text-xs text-accent font-bold">
                        (Saved ₹{pricing.packageDiscount} Package Deal!)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-border bg-card px-3 sm:px-4 py-2.5 sm:py-3 font-ui text-xs font-bold uppercase text-muted-foreground hover:text-foreground clip-notch shrink-0"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 sm:flex-initial bg-primary px-4 sm:px-6 py-2.5 sm:py-3 font-ui text-xs font-bold uppercase tracking-wider sm:tracking-widest text-primary-foreground clip-notch shadow-[0_0_20px_-4px_var(--neon)] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    CONTINUE <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRM BOOKING & PRICE BREAKDOWN */}
          {step === 3 && (
            <div className="space-y-4 sm:space-y-5">
              {/* Summary Card */}
              <div className="border border-primary/40 bg-background/80 p-3.5 sm:p-4 clip-notch space-y-2 text-xs">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="hud-label text-muted-foreground text-[0.62rem] sm:text-[0.68rem]">Session Summary</span>
                  <span className="font-bold text-accent font-mono text-[0.68rem] sm:text-xs">STATION {assignedStation}</span>
                </div>
                <div className="flex justify-between font-ui">
                  <span className="text-muted-foreground">Game Category:</span>
                  <strong className="text-foreground uppercase">{category} Gaming</strong>
                </div>
                <div className="flex justify-between font-ui">
                  <span className="text-muted-foreground">Schedule:</span>
                  <strong className="text-foreground">
                    {selectedDate} • {timeSlot}
                  </strong>
                </div>
                <div className="flex justify-between font-ui">
                  <span className="text-muted-foreground">Duration & Players:</span>
                  <strong className="text-foreground">
                    {durationMins / 60} Hour(s) • {players} Player(s)
                  </strong>
                </div>
              </div>

              {/* Promo Code Input */}
              <div>
                <label className="hud-label text-muted-foreground block mb-1 text-[0.62rem] sm:text-[0.68rem]">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. ACE50 or GAMER20"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="flex-1 border border-border bg-background py-2 px-3 font-mono text-xs uppercase text-foreground focus:border-primary focus:outline-none clip-notch"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-accent px-3 sm:px-4 py-2 font-ui text-xs font-bold uppercase text-accent-foreground clip-notch hover:bg-accent/90 shrink-0"
                  >
                    APPLY
                  </button>
                </div>
                {promoMsg && (
                  <p
                    className={cn(
                      "mt-1 text-xs font-bold",
                      promoMsg.success ? "text-accent" : "text-destructive",
                    )}
                  >
                    {promoMsg.text}
                  </p>
                )}
              </div>

              {/* COMPLETE PRICE BREAKDOWN */}
              <div className="border-t border-b border-border/60 py-3 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-muted-foreground">
                  <span>Base Price</span>
                  <span>₹{pricing.rawBasePrice}</span>
                </div>

                {pricing.packageDiscount > 0 && (
                  <div className="flex justify-between text-accent font-bold">
                    <span>Package Discount</span>
                    <span>-₹{pricing.packageDiscount}</span>
                  </div>
                )}

                {pricing.onlineDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Online Booking Discount</span>
                    <span>-₹{pricing.onlineDiscount}</span>
                  </div>
                )}

                {pricing.promoDiscount > 0 && (
                  <div className="flex justify-between text-primary font-bold">
                    <span>Promo Discount ({appliedPromo})</span>
                    <span>-₹{pricing.promoDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-border/40 pt-2 text-sm sm:text-base font-display font-black text-foreground">
                  <span>TOTAL PAYABLE</span>
                  <span className="text-gradient-neon">₹{pricing.finalPayable}</span>
                </div>
              </div>

              {/* Station Lock Countdown Alert */}
              <div className="flex items-center gap-2 border border-accent/40 bg-accent/10 p-2.5 clip-notch text-[0.65rem] sm:text-[0.7rem] font-mono text-accent">
                <Lock className="size-3.5 sm:size-4 shrink-0" />
                <span>Station {assignedStation} temporarily locked for payment completion.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto border border-border bg-card px-4 py-2.5 sm:py-3 font-ui text-xs font-bold uppercase text-muted-foreground hover:text-foreground clip-notch text-center"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="flex-1 bg-primary py-3 sm:py-3.5 font-ui text-xs font-bold uppercase tracking-wider sm:tracking-widest text-primary-foreground clip-notch shadow-[0_0_24px_-4px_var(--neon)] hover:bg-primary/90 flex items-center justify-center gap-2 active:scale-95 transition-all text-center"
                >
                  PAY ₹{pricing.finalPayable} & CONFIRM
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Gateway Dialog */}
      <RazorpayModal
        isOpen={showRazorpay}
        amount={pricing.finalPayable}
        customerName={currentUser?.name || "Falgun"}
        customerPhone={currentUser?.mobile || "9876543210"}
        stationName={assignedStation}
        onClose={() => setShowRazorpay(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Success Booking Pass */}
      <BookingSuccessModal
        isOpen={!!confirmedBooking}
        booking={confirmedBooking}
        onClose={() => {
          setConfirmedBooking(null);
          onClose();
        }}
        onBookAnother={() => {
          setConfirmedBooking(null);
          setStep(1);
        }}
      />
    </>
  );
}
