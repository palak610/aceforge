import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  CheckCircle2,
  AlertTriangle,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

type RazorpayModalProps = {
  isOpen: boolean;
  amount: number;
  customerName: string;
  customerPhone: string;
  stationName: string;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
};

export function RazorpayModal({
  isOpen,
  amount,
  customerName,
  customerPhone,
  stationName,
  onClose,
  onSuccess,
}: RazorpayModalProps) {
  const [tab, setTab] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");
  const [upiId, setUpiId] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handlePay = () => {
    setStatus("processing");
    setErrorMsg("");

    setTimeout(() => {
      // 95% simulated payment success for realistic prototype testing
      const paymentId = `pay_${Math.random().toString(36).substring(2, 11)}`;
      setStatus("success");
      setTimeout(() => {
        onSuccess(paymentId);
      }, 1000);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2.5 sm:p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg overflow-hidden border border-primary/50 bg-[#0f0e17] text-white shadow-[0_0_80px_-10px_var(--neon)] clip-notch my-auto max-h-[92vh] overflow-y-auto">
        {/* Header Bar Inspired by Razorpay */}
        <div className="flex items-center justify-between border-b border-border/40 bg-gradient-to-r from-primary/30 to-background p-3.5 sm:p-4">
          <div className="flex items-center gap-2">
            <div className="grid size-7 sm:size-8 place-items-center bg-primary text-primary-foreground font-display font-black text-[0.65rem] sm:text-xs clip-notch">
              RP
            </div>
            <div>
              <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground">
                Razorpay Checkout
              </h3>
              <p className="text-[0.6rem] sm:text-[0.65rem] text-muted-foreground">AceForge Arena Checkout Engine</p>
            </div>
          </div>

          <div className="text-right">
            <span className="hud-label text-muted-foreground block text-[0.55rem] sm:text-[0.6rem]">
              Amount Payable
            </span>
            <span className="font-display text-base sm:text-lg font-black text-gradient-neon">₹{amount}</span>
          </div>
        </div>

        {status === "idle" && (
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Locked Station Info */}
            <div className="flex items-center justify-between border border-accent/40 bg-accent/10 p-2.5 sm:p-3 clip-notch text-xs font-mono">
              <span className="flex items-center gap-1.5 text-accent font-bold text-[0.68rem] sm:text-xs">
                <Lock className="size-3.5" /> Station {stationName} Locked
              </span>
              <span className="text-muted-foreground text-[0.65rem] sm:text-xs">Expires in 09:59</span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {[
                { id: "upi", label: "UPI Instant", icon: Smartphone },
                { id: "card", label: "Credit/Debit", icon: CreditCard },
                { id: "netbanking", label: "Netbanking", icon: Building2 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id as "upi" | "card" | "netbanking" | "wallet")}
                    className={cn(
                      "flex flex-col items-center gap-1 border p-2 sm:p-2.5 font-ui text-[0.65rem] sm:text-[0.7rem] font-bold uppercase clip-notch transition-all",
                      tab === item.id
                        ? "border-primary bg-primary/20 text-primary shadow-[0_0_12px_-2px_var(--neon)]"
                        : "border-border/60 bg-background/50 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="size-3.5 sm:size-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT */}
            {tab === "upi" && (
              <div className="space-y-3">
                <p className="font-ui text-xs font-bold text-muted-foreground">
                  Select Preferred UPI App:
                </p>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {["GPay", "PhonePe", "Paytm"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={handlePay}
                      className="border border-border/80 bg-card p-2 sm:p-2.5 text-center font-display text-xs font-bold text-foreground hover:border-primary clip-notch transition-colors"
                    >
                      {app}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="hud-label text-muted-foreground block mb-1 text-[0.62rem] sm:text-[0.68rem]">
                    Or Enter VPA / UPI ID
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="username@upi"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="flex-1 border border-border bg-background py-2 px-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none clip-notch"
                    />
                  </div>
                </div>
              </div>
            )}

            {tab === "card" && (
              <div className="space-y-3">
                <div>
                  <label className="hud-label text-muted-foreground block mb-1 text-[0.62rem] sm:text-[0.68rem]">Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    className="w-full border border-border bg-background py-2 px-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none clip-notch"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="hud-label text-muted-foreground block mb-1 text-[0.62rem] sm:text-[0.68rem]">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="08/28"
                      className="w-full border border-border bg-background py-2 px-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none clip-notch"
                    />
                  </div>
                  <div>
                    <label className="hud-label text-muted-foreground block mb-1 text-[0.62rem] sm:text-[0.68rem]">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="123"
                      className="w-full border border-border bg-background py-2 px-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none clip-notch"
                    />
                  </div>
                </div>
              </div>
            )}

            {tab === "netbanking" && (
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={handlePay}
                    className="border border-border/80 bg-card p-2.5 sm:p-3 text-left font-ui text-xs font-bold text-foreground hover:border-primary clip-notch"
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}

            {/* ACTION BUTTON */}
            <div className="border-t border-border/40 pt-3 sm:pt-4 flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 border border-border bg-card py-2.5 sm:py-3 font-ui text-xs font-bold uppercase text-muted-foreground hover:text-foreground clip-notch"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePay}
                className="w-2/3 bg-primary py-2.5 sm:py-3 font-ui text-xs font-bold uppercase tracking-wider sm:tracking-widest text-primary-foreground clip-notch shadow-[0_0_20px_-4px_var(--neon)] active:scale-95 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
              >
                PAY ₹{amount} NOW
              </button>
            </div>
          </div>
        )}

        {status === "processing" && (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="mx-auto size-12 sm:size-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-foreground">
              Processing Payment...
            </h4>
            <p className="font-mono text-xs text-muted-foreground">
              COMMUNICATING WITH PAYMENT GATEWAY SERVER // DO NOT CLOSE
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="p-8 sm:p-12 text-center space-y-4 animate-scale-in">
            <CheckCircle2 className="mx-auto size-12 sm:size-16 text-accent animate-bounce" />
            <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-accent">
              PAYMENT SUCCESSFUL
            </h4>
            <p className="font-mono text-xs text-muted-foreground">
              TRANSACTION VERIFIED // GENERATING BOOKING PASS...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
