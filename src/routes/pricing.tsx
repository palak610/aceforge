import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArenaBackground } from "@/components/arena/Background";
import { ArenaCursor } from "@/components/arena/Cursor";
import { PageTransition, AnimatedNumber, TiltCard } from "@/components/arena/PageTransition";
import { Header } from "@/components/gaming/Header";
import { Footer } from "@/components/gaming/Footer";
import { PricingComparison } from "@/components/gaming/PricingComparison";
import { ExperienceSelector } from "@/components/gaming/ExperienceSelector";
import { useArenaStore } from "@/lib/arenaStore";
import { soundEngine } from "@/lib/soundEngine";
import { Zap, Calculator, Crown, Star, Package, ChevronRight, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TITLE = "Transparent Gaming Pricing & Passes | Ace Forge Ahmedabad";
const DESCRIPTION =
  "Compare hourly rates, duration packages, and squad passes across PS5, PC Rigs, Sim Racing, and VR with no hidden costs.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
    ],
  }),
  component: PricingPage,
});

const FAQS = [
  {
    q: "Can I bring my own gaming peripherals (mouse, keyboard, headset)?",
    a: "Yes. All our PC battlestations feature accessible top-mount USB 3.2 Gen 2 ports and 3.5mm audio jacks for plug-and-play tournament peripherals.",
  },
  {
    q: "How does peak and off-peak timing work?",
    a: "Standard rates apply from 11:00 AM to 5:00 PM on weekdays. Peak rates apply from 5:00 PM to 11:00 PM, and Weekend Rush rates apply on Saturdays and Sundays.",
  },
  {
    q: "What happens if I need to reschedule my booked session?",
    a: "You can reschedule your slot up to 2 hours before the start time directly from your Session History page with zero penalty.",
  },
  {
    q: "Do you offer squad packages for clan battles?",
    a: "Yes. Our multi-hour passes give up to 33% discount on consecutive hours, and custom VIP LAN arena hire is available in the Events section.",
  },
];

function PricingPage() {
  const { experiences } = useArenaStore();
  const [selectedExpId, setSelectedExpId] = useState("ps5");

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-[#08080a] text-foreground font-ui selection:bg-primary/30 selection:text-white">
        <ArenaBackground />
        <ArenaCursor />
        <Header />

        <main className="pt-28 sm:pt-36 pb-20 relative z-10 space-y-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header Banner */}
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 font-mono text-[0.68rem] font-bold tracking-widest text-primary uppercase shadow-lg shadow-primary/15">
                <Zap className="size-3.5" />
                <span>100% Transparent Rates // Zero Hidden Fees</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-foreground">
                Pricing & Session Passes
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Whether you are jumping in for a 30-minute quick duel or booking an all-day squad grind, we offer simple, predictable rates across all platforms.
              </p>
            </div>

            {/* Pricing Comparison Component */}
            <PricingComparison
              onBookNow={() => {
                window.location.href = "/book";
              }}
            />

            {/* Interactive Calculator Section */}
            <div className="mt-16">
              <ExperienceSelector
                selectedExpId={selectedExpId}
                onProceedToBooking={() => {
                  window.location.href = "/book";
                }}
              />
            </div>

            {/* Pricing FAQ Section */}
            <div className="mt-20 max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2 mb-8">
                <div className="inline-flex items-center gap-1.5 text-primary text-xs font-mono font-bold uppercase tracking-wider">
                  <HelpCircle className="size-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-foreground">
                  Everything You Need to Know
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FAQS.map((faq) => (
                  <div
                    key={faq.q}
                    className="p-6 rounded-3xl border border-[#242436] bg-[#111118] space-y-2 hover:border-primary/50 transition-colors shadow-lg"
                  >
                    <h3 className="font-display text-sm sm:text-base font-bold uppercase text-foreground">
                      {faq.q}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-ui">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
