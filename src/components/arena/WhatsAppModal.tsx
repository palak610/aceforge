import { useState } from "react";
import { CheckCheck, Copy, ExternalLink, X, MapPin } from "lucide-react";
import { ADDRESS } from "@/data/arena";
import type { Booking } from "@/lib/arenaStore";

type WhatsAppModalProps = {
  isOpen: boolean;
  booking: Booking | null;
  onClose: () => void;
};

export function WhatsAppModal({ isOpen, booking, onClose }: WhatsAppModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !booking) return null;

  const fullMessage = `Ace Forge Arena — Booking Confirmed!\n\nBooking ID: ${booking.id}\nGame: ${booking.categoryName || booking.category?.toUpperCase()}\nStation: ${booking.stationName || booking.stationId}\nDate: ${booking.date}\nTime: ${booking.timeSlot}\nPlayers: ${booking.players}\nAmount Paid: ₹${booking.finalAmount}\n\nAce Forge Arena\n${ADDRESS.lines.join(", ")}\n\nSee you at Ace Forge Arena!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2.5 sm:p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md border border-emerald-500/50 bg-[#0d1418] text-white shadow-[0_0_60px_-10px_rgba(16,185,129,0.3)] clip-notch overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* WhatsApp Top Header Bar */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 bg-[#1f2c34] p-3 sm:p-3.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="grid size-8 sm:size-9 place-items-center bg-emerald-500 text-black font-display font-black text-xs clip-notch">
              WA
            </div>
            <div>
              <h4 className="font-ui text-xs sm:text-sm font-bold text-emerald-400">AceForge Arena Bot</h4>
              <span className="block text-[0.55rem] sm:text-[0.6rem] text-emerald-200/70 font-mono">
                AUTOMATED WHATSAPP CONFIRMATION
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-white p-1"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* WhatsApp Chat Body */}
        <div className="p-3 sm:p-4 space-y-3 bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px] overflow-y-auto flex-1">
          <div className="relative max-w-[92%] sm:max-w-[85%] border border-emerald-900/40 bg-[#005c4b] p-3 sm:p-3.5 text-xs text-emerald-50 rounded-lg shadow-md space-y-2">
            <div className="font-bold text-emerald-200 text-xs sm:text-sm flex items-center gap-1.5">
              <span>[CONFIRMED]</span> Ace Forge Arena — Booking Confirmed!
            </div>
            <div className="space-y-1 font-mono text-[0.65rem] sm:text-[0.7rem]">
              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>
              <p>
                <strong>Game:</strong> {booking.categoryName || booking.category?.toUpperCase()}
              </p>
              <p>
                <strong>Station:</strong> {booking.stationName || booking.stationId}
              </p>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Time:</strong> {booking.timeSlot}
              </p>
              <p>
                <strong>Players:</strong> {booking.players}
              </p>
              <p className="text-emerald-300 font-bold">
                <strong>Amount Paid:</strong> ₹{booking.finalAmount}
              </p>
            </div>

            <div className="border-t border-emerald-400/30 pt-1.5 sm:pt-2 text-[0.6rem] sm:text-[0.65rem] space-y-0.5">
              <p className="font-bold flex items-center gap-1 text-emerald-200">
                <MapPin className="size-3" /> Ace Forge Arena
              </p>
              <p className="text-emerald-100/80">
                B-202, Money Plant High Street, Jagatpur Road, SG Highway, Ahmedabad
              </p>
            </div>

            <p className="font-bold text-amber-300 pt-1 text-[0.65rem] sm:text-[0.7rem]">
              See you at Ace Forge Arena!
            </p>

            <div className="flex items-center justify-end gap-1 text-[0.55rem] text-emerald-200/80 pt-0.5">
              <span>Just now</span>
              <CheckCheck className="size-3.5 text-emerald-300" />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-emerald-900/60 bg-[#1f2c34] p-2.5 sm:p-3 flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 border border-emerald-700/60 bg-emerald-950/60 py-2 font-ui text-xs font-bold text-emerald-300 hover:bg-emerald-900 clip-notch"
          >
            <Copy className="size-3.5" /> {copied ? "Copied!" : "Copy Text"}
          </button>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 py-2 font-ui text-xs font-bold uppercase text-black hover:bg-emerald-400 clip-notch shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          >
            <ExternalLink className="size-3.5" /> Open WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
