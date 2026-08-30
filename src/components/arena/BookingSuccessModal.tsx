import { useState } from "react";
import { CheckCircle2, Calendar, MessageSquare } from "lucide-react";
import { WhatsAppModal } from "./WhatsAppModal";
import type { Booking } from "@/lib/arenaStore";

type BookingSuccessModalProps = {
  isOpen: boolean;
  booking: Booking | null;
  onClose: () => void;
  onBookAnother: () => void;
};

export function BookingSuccessModal({
  isOpen,
  booking,
  onClose,
  onBookAnother,
}: BookingSuccessModalProps) {
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  if (!isOpen || !booking) return null;

  const handleDownloadCalendar = () => {
    // Generate .ics iCalendar file for instant phone / desktop calendar sync
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AceForge Arena//Booking System//EN
BEGIN:VEVENT
SUMMARY:Ace Forge Arena Session (${booking.categoryName || booking.category})
DESCRIPTION:Station ${booking.stationName || booking.stationId}. Booking ID: ${booking.id}. Amount Paid: ₹${booking.finalAmount}.
LOCATION:B-202, Money Plant High Street, Jagatpur Road, SG Highway, Ahmedabad
DTSTART:${booking.date.replace(/-/g, "")}T180000Z
DTEND:${booking.date.replace(/-/g, "")}T200000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `AceForge_${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2.5 sm:p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
        <div className="relative w-full max-w-lg border border-primary/60 bg-card/95 p-4 sm:p-6 md:p-8 shadow-[0_0_80px_-10px_var(--neon)] clip-notch text-center space-y-4 sm:space-y-5 my-auto max-h-[92vh] overflow-y-auto">
          {/* Animated Success Badge */}
          <div className="relative mx-auto grid size-16 sm:size-20 place-items-center border-2 border-primary/80 bg-primary/20 text-primary clip-notch animate-bounce shadow-[0_0_30px_var(--neon)]">
            <CheckCircle2 className="size-8 sm:size-10 text-primary" />
          </div>

          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-gradient-neon tracking-tight">
              BOOKING CONFIRMED
            </h2>
            <p className="mt-1 font-mono text-[0.65rem] sm:text-xs text-muted-foreground">
              SESSION PASS GENERATED // STATION ASSIGNED
            </p>
          </div>

          {/* Ticket Summary Card */}
          <div className="border border-border/80 bg-background/80 p-3.5 sm:p-4 clip-notch text-left space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-border/40 pb-2">
              <span className="text-muted-foreground">BOOKING ID</span>
              <strong className="text-primary text-xs sm:text-sm">{booking.id}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">GAMING TYPE:</span>
              <strong className="text-foreground truncate max-w-[60%] text-right">
                {booking.categoryName || booking.category?.toUpperCase()}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">ASSIGNED STATION:</span>
              <strong className="text-accent">{booking.stationName || booking.stationId}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">DATE & TIME:</span>
              <strong className="text-foreground">
                {booking.date} • {booking.timeSlot}
              </strong>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">PLAYERS:</span>
              <strong className="text-foreground">{booking.players} Player(s)</strong>
            </div>

            <div className="flex justify-between border-t border-border/40 pt-2 text-xs sm:text-sm font-display font-black">
              <span className="text-muted-foreground">TOTAL PAID:</span>
              <span className="text-gradient-neon">₹{booking.finalAmount}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 sm:pt-2">
            <button
              type="button"
              onClick={handleDownloadCalendar}
              className="flex items-center justify-center gap-1.5 border border-border bg-card/80 py-2.5 font-ui text-xs font-bold uppercase text-foreground hover:border-primary clip-notch text-center"
            >
              <Calendar className="size-3.5 text-primary" /> Add to Calendar
            </button>

            <button
              type="button"
              onClick={() => setShowWhatsApp(true)}
              className="flex items-center justify-center gap-1.5 border border-emerald-500/50 bg-emerald-950/40 py-2.5 font-ui text-xs font-bold uppercase text-emerald-400 hover:bg-emerald-900/60 clip-notch text-center"
            >
              <MessageSquare className="size-3.5" /> Send WhatsApp
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/2 border border-border bg-card/60 py-2.5 sm:py-3 font-ui text-xs font-bold uppercase text-muted-foreground hover:text-foreground clip-notch text-center"
            >
              View Dashboard
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookAnother();
              }}
              className="w-full sm:w-1/2 bg-primary py-2.5 sm:py-3 font-ui text-xs font-bold uppercase tracking-wider sm:tracking-widest text-primary-foreground clip-notch shadow-[0_0_20px_-4px_var(--neon)] hover:bg-primary/90 text-center"
            >
              Book Another Session
            </button>
          </div>
        </div>
      </div>

      <WhatsAppModal
        isOpen={showWhatsApp}
        booking={booking}
        onClose={() => setShowWhatsApp(false)}
      />
    </>
  );
}
