import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useArenaStore, type Booking } from "@/lib/arenaStore";
import { ArenaBackground } from "@/components/arena/Background";
import { ArenaCursor } from "@/components/arena/Cursor";
import { PageTransition } from "@/components/arena/PageTransition";
import { Header } from "@/components/gaming/Header";
import { Footer } from "@/components/gaming/Footer";
import { soundEngine } from "@/lib/soundEngine";
import {
  Calendar,
  Clock,
  RotateCcw,
  CheckCircle2,
  XCircle,
  PlayCircle,
  Gamepad2,
  Plus,
  ArrowRight,
  ShieldCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Session History & Passes | Ace Forge Arena" },
      {
        name: "description",
        content: "Track all your past, upcoming, and active gaming session passes at Ace Forge Lounge.",
      },
    ],
  }),
  component: HistoryPage,
});

type FilterType = "ALL" | "UPCOMING" | "COMPLETED" | "CANCELLED";

function HistoryPage() {
  const { bookings, rescheduleBooking, cancelBooking } = useArenaStore();
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [activeReschedule, setActiveReschedule] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("08:00 PM – 10:00 PM");

  const filteredBookings = bookings.filter((b) => {
    if (filter === "ALL") return true;
    const status = (b.bookingStatus || "CONFIRMED").toUpperCase();
    if (filter === "UPCOMING") return status === "CONFIRMED";
    return status === filter;
  });

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReschedule || !rescheduleDate) return;
    soundEngine.playSuccess();
    rescheduleBooking(activeReschedule.id, rescheduleDate, rescheduleTime);
    setActiveReschedule(null);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#08080a] text-foreground font-ui selection:bg-primary/30 selection:text-white">
        <ArenaBackground />
        <ArenaCursor />
        <Header />

        <main className="pt-28 sm:pt-36 pb-20 relative z-10 space-y-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 font-mono text-[0.68rem] font-bold tracking-widest text-primary uppercase mb-2">
                  <ShieldCheck className="size-3.5" />
                  <span>Session History // Digital Vouchers</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-black uppercase text-foreground">
                  Your Battle Passes
                </h1>
              </div>

              <Link
                to="/book"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary/30 self-start active:scale-95 transition-all"
              >
                <Plus className="size-4" />
                <span>Book New Session</span>
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-8">
              {(["ALL", "UPCOMING", "COMPLETED", "CANCELLED"] as const).map((f) => {
                const count =
                  f === "ALL"
                    ? bookings.length
                    : bookings.filter((b) =>
                        f === "UPCOMING" ? b.bookingStatus === "CONFIRMED" : b.bookingStatus === f,
                      ).length;
                return (
                  <button
                    key={f}
                    type="button"
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => {
                      soundEngine.playClick();
                      setFilter(f);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl font-ui text-xs font-bold uppercase tracking-wider transition-all border",
                      filter === f
                        ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30"
                        : "bg-[#111118] text-muted-foreground border-[#242436] hover:text-foreground hover:bg-[#161622]",
                    )}
                  >
                    {f} ({count})
                  </button>
                );
              })}
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.map((b) => {
                const isConfirmed = b.bookingStatus === "CONFIRMED";
                const isCompleted = b.bookingStatus === "COMPLETED";
                const isCancelled = b.bookingStatus === "CANCELLED";

                return (
                  <div
                    key={b.id}
                    className="p-6 rounded-3xl border border-[#242436] bg-[#111118] space-y-4 shadow-xl hover:border-primary/40 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#202030] pb-4">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-display text-lg font-bold uppercase text-foreground">
                            {b.categoryName}
                          </span>
                          <span className="font-mono text-xs text-primary font-bold">
                            [{b.id}]
                          </span>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                          Station: <strong>{b.stationName}</strong>
                        </span>
                      </div>

                      <span
                        className={cn(
                          "px-3 py-1 rounded-full font-mono text-[0.68rem] font-bold uppercase self-start sm:self-auto border",
                          isConfirmed && "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
                          isCompleted && "border-cyan-500/40 bg-cyan-500/10 text-cyan-400",
                          isCancelled && "border-rose-500/40 bg-rose-500/10 text-rose-400",
                        )}
                      >
                        {b.bookingStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-muted-foreground text-[0.62rem] block uppercase">Date</span>
                        <strong className="text-foreground">{b.date}</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-[0.62rem] block uppercase">Slot</span>
                        <strong className="text-foreground">{b.timeSlot}</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-[0.62rem] block uppercase">Duration</span>
                        <strong className="text-foreground">{b.duration}</strong>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-[0.62rem] block uppercase">Amount Paid</span>
                        <strong className="text-gradient-neon text-sm">₹{b.finalAmount}</strong>
                      </div>
                    </div>

                    {isConfirmed && (
                      <div className="pt-3 border-t border-[#1f1f2e] flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            setActiveReschedule(b);
                            setRescheduleDate(b.date);
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-[#2e2e42] bg-[#161624] text-xs font-mono font-bold text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                        >
                          Reschedule Slot
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playClick();
                            cancelBooking(b.id);
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs font-mono font-bold text-rose-400 hover:bg-rose-500/20 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredBookings.length === 0 && (
                <div className="p-12 text-center rounded-3xl border border-[#242436] bg-[#111118] space-y-3">
                  <span className="font-display text-lg font-bold uppercase text-foreground">
                    No sessions found
                  </span>
                  <p className="text-xs text-muted-foreground">
                    You have no {filter.toLowerCase()} battle passes recorded.
                  </p>
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-bold uppercase"
                  >
                    <span>Reserve Station</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Reschedule Modal */}
            {activeReschedule && (
              <div
                onClick={(e) => {
                  if (e.target === e.currentTarget) setActiveReschedule(null);
                }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
              >
                <div className="relative w-full max-w-md rounded-3xl border border-primary/50 bg-[#111118] p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-in">
                  <button
                    type="button"
                    onClick={() => setActiveReschedule(null)}
                    className="size-8 rounded-xl bg-[#181826] grid place-items-center text-muted-foreground hover:text-foreground absolute top-4 right-4"
                  >
                    <X className="size-4" />
                  </button>

                  <h3 className="font-display text-xl font-black uppercase text-foreground">
                    Reschedule Session
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Token: {activeReschedule.id} • {activeReschedule.categoryName}
                  </p>

                  <form onSubmit={handleRescheduleSubmit} className="space-y-4 text-xs font-ui">
                    <div className="space-y-1">
                      <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                        New Date
                      </label>
                      <input
                        type="date"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary font-mono"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                        New Time Slot
                      </label>
                      <select
                        value={rescheduleTime}
                        onChange={(e) => setRescheduleTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary font-mono"
                      >
                        <option value="11:00 AM – 01:00 PM">11:00 AM – 01:00 PM</option>
                        <option value="02:00 PM – 04:00 PM">02:00 PM – 04:00 PM</option>
                        <option value="05:00 PM – 07:00 PM">05:00 PM – 07:00 PM</option>
                        <option value="08:00 PM – 10:00 PM">08:00 PM – 10:00 PM</option>
                        <option value="10:00 PM – 12:00 AM">10:00 PM – 12:00 AM</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/30 mt-2"
                    >
                      Confirm Rescheduled Slot
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
