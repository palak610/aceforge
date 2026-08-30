import { useState } from "react";
import { useArenaStore, type Booking } from "@/lib/arenaStore";
import {
  User,
  Clock,
  Calendar,
  Gamepad2,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  LogOut,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingModal } from "./BookingModal";
import { OtpLoginModal } from "./OtpLoginModal";

type CustomerDashboardProps = {
  onOpenBookingModal?: () => void;
};

export function CustomerDashboard({ onOpenBookingModal }: CustomerDashboardProps) {
  const { currentUser, bookings, logoutUser, rescheduleBooking, cancelBooking } = useArenaStore();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeReschedule, setActiveReschedule] = useState<Booking | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState("");
  const [newRescheduleTime, setNewRescheduleTime] = useState("8:00 PM – 10:00 PM");

  if (!currentUser) {
    return (
      <div className="border border-primary/40 bg-card/80 p-8 text-center clip-notch space-y-4">
        <div className="mx-auto grid size-12 place-items-center border border-primary bg-primary/10 text-primary clip-notch">
          <User className="size-6" />
        </div>
        <h3 className="font-display text-xl font-bold uppercase text-foreground">
          PLAYER SESSION DISCONNECTED
        </h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Log in with your 10-digit mobile number to view your gaming history, upcoming bookings,
          and membership status.
        </p>
        <button
          type="button"
          onClick={() => setShowLoginModal(true)}
          className="bg-primary px-8 py-3 font-ui text-xs font-bold uppercase tracking-widest text-primary-foreground clip-notch shadow-[0_0_20px_-4px_var(--neon)] hover:bg-primary/90"
        >
          PLAYER LOGIN WITH OTP
        </button>

        <OtpLoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>
    );
  }

  // Find upcoming booking
  const upcomingBooking =
    bookings.find((b) => b.userId === currentUser.id && b.bookingStatus === "CONFIRMED") ||
    bookings[0];

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReschedule || !newRescheduleDate) return;
    rescheduleBooking(activeReschedule.id, newRescheduleDate, newRescheduleTime);
    setActiveReschedule(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HERO PLAYER PROFILE HEADER CARD */}
      <div className="cyber-card relative overflow-hidden border border-primary/50 bg-card/90 p-6 clip-notch md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="size-16 object-cover border-2 border-primary clip-notch shadow-[0_0_20px_-2px_var(--neon)] animate-cyber-badge"
              />
              <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center bg-accent text-accent-foreground text-[0.55rem] font-bold clip-notch shadow-[0_0_8px_var(--neon-blue)]">
                OK
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-black uppercase text-foreground tracking-wide">
                  {currentUser.name}
                </h2>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{currentUser.mobile}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="border border-border/80 bg-background/60 px-3.5 py-2 clip-notch text-center">
              <span className="text-[0.6rem] font-mono text-muted-foreground uppercase block font-bold">
                RANK
              </span>
              <span className="font-display text-xs font-black text-primary uppercase">
                {currentUser.membership}
              </span>
            </div>

            <div className="border border-border/80 bg-background/60 px-3.5 py-2 clip-notch text-center">
              <span className="text-[0.6rem] font-mono text-muted-foreground uppercase block font-bold">
                SESSIONS
              </span>
              <span className="font-display text-xs font-black text-foreground">
                {currentUser.totalSessions}
              </span>
            </div>

            <div className="border border-border/80 bg-background/60 px-3.5 py-2 clip-notch text-center">
              <span className="text-[0.6rem] font-mono text-muted-foreground uppercase block font-bold">
                HOURS
              </span>
              <span className="font-display text-xs font-black text-foreground">
                {currentUser.totalHours}h
              </span>
            </div>

            <div className="border border-border/80 bg-background/60 px-3.5 py-2 clip-notch text-center">
              <span className="text-[0.6rem] font-mono text-muted-foreground uppercase block font-bold">
                TOTAL XP SPENT
              </span>
              <span className="font-display text-xs font-black text-gradient-neon">
                ₹{currentUser.amountSpent}
              </span>
            </div>
          </div>
        </div>

        {/* PROFILE ACTION BUTTONS */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 border-t border-border/40 pt-4">
          <button
            type="button"
            onClick={() => {
              if (onOpenBookingModal) onOpenBookingModal();
              else setShowBookingModal(true);
            }}
            className="cyber-button flex-1 bg-primary py-3.5 font-ui text-xs font-bold uppercase tracking-widest text-primary-foreground clip-notch shadow-[0_0_24px_-4px_var(--neon)] hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            BOOK YOUR SESSION NOW
          </button>

          <button
            type="button"
            onClick={logoutUser}
            className="cyber-button border border-destructive/40 bg-destructive/10 px-4 py-3 font-ui text-xs font-bold uppercase text-destructive hover:bg-destructive hover:text-destructive-foreground clip-notch transition-colors flex items-center justify-center gap-1.5"
          >
            <LogOut className="size-3.5" /> Disconnect
          </button>
        </div>
      </div>

      {/* UPCOMING SESSION CARD WITH AUDIO EQUALIZER VISUALIZER */}
      {upcomingBooking && (
        <div className="cyber-card border border-accent/60 bg-card/80 p-5 clip-notch space-y-3">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <div className="flex items-center gap-2">
              <span className="hud-label text-accent font-bold flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> UPCOMING SESSION
              </span>

              {/* Animated Audio Equalizer Visualizer */}
              <div className="flex items-end gap-0.5 h-3 px-1.5 py-0.5 bg-accent/10 border border-accent/30 rounded">
                <span className="w-0.5 bg-accent animate-equalizer-1 rounded-full" />
                <span className="w-0.5 bg-accent animate-equalizer-2 rounded-full" />
                <span className="w-0.5 bg-accent animate-equalizer-3 rounded-full" />
                <span className="w-0.5 bg-accent animate-equalizer-4 rounded-full" />
              </div>
            </div>

            <span className="font-mono text-xs font-bold text-foreground">
              ID: {upcomingBooking.id}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold uppercase text-foreground">
                {upcomingBooking.categoryName} ({upcomingBooking.stationName})
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                {upcomingBooking.date} • {upcomingBooking.timeSlot} ({upcomingBooking.players}{" "}
                Players)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-black text-gradient-neon mr-2">
                ₹{upcomingBooking.finalAmount} PAID
              </span>

              <button
                type="button"
                onClick={() => setActiveReschedule(upcomingBooking)}
                className="border border-border bg-background px-3 py-1.5 font-ui text-xs font-bold uppercase text-muted-foreground hover:text-foreground clip-notch"
              >
                Reschedule
              </button>

              <button
                type="button"
                onClick={() => cancelBooking(upcomingBooking.id)}
                className="border border-destructive/40 bg-destructive/10 px-3 py-1.5 font-ui text-xs font-bold uppercase text-destructive hover:bg-destructive hover:text-white clip-notch"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {activeReschedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md border border-primary/50 bg-card/95 p-6 clip-notch space-y-4">
            <h3 className="font-display text-lg font-bold uppercase text-foreground">
              Reschedule Session {activeReschedule.id}
            </h3>
            <form onSubmit={handleRescheduleSubmit} className="space-y-3">
              <div>
                <label className="hud-label text-muted-foreground block mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full border border-border bg-background py-2 px-3 font-ui text-xs text-foreground clip-notch"
                />
              </div>

              <div>
                <label className="hud-label text-muted-foreground block mb-1">New Time Slot</label>
                <select
                  value={newRescheduleTime}
                  onChange={(e) => setNewRescheduleTime(e.target.value)}
                  className="w-full border border-border bg-background py-2 px-3 font-ui text-xs text-foreground clip-notch"
                >
                  <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
                  <option value="4:00 PM – 6:00 PM">4:00 PM – 6:00 PM</option>
                  <option value="8:00 PM – 10:00 PM">8:00 PM – 10:00 PM</option>
                  <option value="10:00 PM – 12:00 AM">10:00 PM – 12:00 AM</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveReschedule(null)}
                  className="w-1/2 border border-border py-2 font-ui text-xs font-bold uppercase text-muted-foreground clip-notch"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-primary py-2 font-ui text-xs font-bold uppercase text-primary-foreground clip-notch"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </div>
  );
}
