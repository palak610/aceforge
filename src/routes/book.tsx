import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArenaBackground } from "@/components/arena/Background";
import { ArenaCursor } from "@/components/arena/Cursor";
import { PageTransition } from "@/components/arena/PageTransition";
import { Header } from "@/components/gaming/Header";
import { Footer } from "@/components/gaming/Footer";
import { BookingWidget } from "@/components/gaming/BookingWidget";
import { ShieldCheck, Activity, Zap, CheckCircle2 } from "lucide-react";

const TITLE = "Book a Battle Station | Ace Forge Gaming Lounge";
const DESCRIPTION =
  "Reserve your PS5, PC Battlestation, Sim Racing, or VR session in seconds. Instant booking voucher confirmation.";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#08080a] text-foreground font-ui selection:bg-primary/30 selection:text-white">
        <ArenaBackground />
        <ArenaCursor />
        <Header />

        <main className="pt-28 sm:pt-36 pb-20 relative z-10 space-y-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Dedicated Booking Widget Terminal */}
            <BookingWidget />

            {/* Guarantee / Policy strip */}
            <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-[#242436] bg-[#111118] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                  <CheckCircle2 className="size-4" />
                  <span>Instant Dispatch</span>
                </div>
                <p className="text-xs text-muted-foreground font-ui">
                  Station reserved immediately upon booking token generation with zero waiting line.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-[#242436] bg-[#111118] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                  <Zap className="size-4" />
                  <span>Zero Lag Guarantee</span>
                </div>
                <p className="text-xs text-muted-foreground font-ui">
                  Dedicated gigabit fiber LAN line with sub-3ms local server ping.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-[#242436] bg-[#111118] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-primary font-bold uppercase">
                  <ShieldCheck className="size-4" />
                  <span>Free Rescheduling</span>
                </div>
                <p className="text-xs text-muted-foreground font-ui">
                  Reschedule anytime up to 2 hours before your slot directly from your History dashboard.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
