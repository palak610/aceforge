import { useState, useEffect } from "react";
import { useArenaStore } from "@/lib/arenaStore";
import { ShieldCheck, Phone, KeyRound, Sparkles, X, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type OtpLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export function OtpLoginModal({ isOpen, onClose, onSuccess }: OtpLoginModalProps) {
  const { loginUser, currentUser } = useArenaStore();

  const [step, setStep] = useState<"phone" | "otp" | "profile" | "success">("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState(currentUser?.name || "");

  // 60-second resend countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, timer]);

  if (!isOpen) return null;

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) {
      setMobile(val);
      setErrorMsg("");
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsSending(true);
    setErrorMsg("");
    setTimeout(() => {
      setIsSending(false);
      setStep("otp");
      setTimer(60);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    const val = value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    setErrorMsg("");

    // Auto-focus next field
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setErrorMsg("Enter full 6-digit OTP passcode.");
      return;
    }

    setIsVerifying(true);
    setErrorMsg("");

    setTimeout(() => {
      setIsVerifying(false);
      // Demo OTP accept 123456 or any 6 digits for smooth prototype testing
      if (enteredOtp === "123456" || enteredOtp.length === 6) {
        if (!currentUser?.name) {
          setStep("profile");
        } else {
          loginUser(currentUser.name, mobile || currentUser.mobile);
          setStep("success");
          setTimeout(() => {
            onSuccess?.();
            onClose();
          }, 1200);
        }
      } else {
        setErrorMsg("Incorrect OTP. Enter 123456 for instant demo access.");
      }
    }, 800);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    loginUser(name.trim(), mobile || "9876543210");
    setStep("success");
    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 1200);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setIsSending(true);
    setErrorMsg("");
    setTimeout(() => {
      setIsSending(false);
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2.5 sm:p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md border border-primary/50 bg-card/95 p-4 sm:p-6 md:p-8 shadow-[0_0_60px_-10px_var(--neon)] clip-notch my-auto max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 text-muted-foreground hover:text-foreground p-1"
        >
          <X className="size-5" />
        </button>

        {/* STEP 1: MOBILE NUMBER INPUT */}
        {step === "phone" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <div className="mx-auto grid size-10 sm:size-12 place-items-center border border-primary/60 bg-primary/10 text-primary clip-notch">
                <ShieldCheck className="size-5 sm:size-6 animate-pulse" />
              </div>
              <h2 className="mt-2.5 sm:mt-3 font-display text-xl sm:text-2xl font-black uppercase text-foreground tracking-tight">
                Player Login
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your mobile number to continue to AceForge Arena
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="hud-label text-muted-foreground block mb-1.5 text-[0.62rem] sm:text-[0.68rem]">Mobile Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 font-mono text-sm font-bold text-accent">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={handleMobileChange}
                    className="w-full border border-border bg-background py-2.5 sm:py-3 pl-12 pr-4 font-mono text-sm sm:text-base tracking-wider text-foreground clip-notch focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {errorMsg && <p className="text-xs font-semibold text-destructive">{errorMsg}</p>}

              <button
                type="submit"
                disabled={isSending || mobile.length !== 10}
                className="cyber-button w-full bg-primary py-3 sm:py-3.5 font-ui text-xs font-bold uppercase tracking-widest text-primary-foreground clip-notch shadow-[0_0_24px_-4px_var(--neon)] hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                {isSending ? (
                  <span>SENDING OTP...</span>
                ) : (
                  <>
                    SEND OTP PASSCODE <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>

            <div className="border-t border-border/40 pt-2.5 sm:pt-3 text-center font-mono text-[0.6rem] sm:text-[0.65rem] text-muted-foreground">
              DEVELOPMENT MODE // OTP INTEGRATION READY (MSG91 / TWILIO)
            </div>
          </div>
        )}

        {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
        {step === "otp" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <div className="mx-auto grid size-10 sm:size-12 place-items-center border border-accent/60 bg-accent/10 text-accent clip-notch">
                <KeyRound className="size-5 sm:size-6" />
              </div>
              <h2 className="mt-2.5 sm:mt-3 font-display text-xl sm:text-2xl font-black uppercase text-foreground tracking-tight">
                Verify Access
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                OTP sent to <strong className="text-accent">+91 {mobile}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="hud-label text-muted-foreground block text-center mb-2 text-[0.62rem] sm:text-[0.68rem]">
                  Enter 6-Digit Passcode (Demo OTP: 123456)
                </label>
                <div className="flex justify-center gap-1.5 sm:gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="size-9 sm:size-11 border border-border bg-background text-center font-display text-base sm:text-lg font-bold text-primary focus:border-primary focus:outline-none clip-notch shadow-inner"
                    />
                  ))}
                </div>
                {errorMsg && (
                  <p className="mt-2 text-center text-xs font-bold text-destructive">{errorMsg}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-[0.65rem] sm:text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-muted-foreground hover:text-foreground underline"
                >
                  Change Mobile
                </button>

                {timer > 0 ? (
                  <span className="text-muted-foreground">RESEND IN {timer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-accent font-bold hover:underline"
                  >
                    RESEND NOW
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isVerifying || otp.join("").length !== 6}
                className="w-full bg-primary py-2.5 sm:py-3 font-ui text-xs font-bold uppercase tracking-wider sm:tracking-widest text-primary-foreground clip-notch shadow-[0_0_20px_-4px_var(--neon)] hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {isVerifying ? "VERIFYING PASSCODE..." : "VERIFY & LOGIN →"}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: CREATE PROFILE IF NEW */}
        {step === "profile" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center">
              <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-foreground">
                Welcome to AceForge
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your gamer tag to initialize your player profile
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="hud-label text-muted-foreground block mb-1 text-[0.62rem] sm:text-[0.68rem]">
                  Gamer / Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Falgun / AceSniper"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-border bg-background py-2 sm:py-2.5 px-3 font-ui text-xs sm:text-sm text-foreground focus:border-primary focus:outline-none clip-notch"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary py-2.5 sm:py-3 font-ui text-xs font-bold uppercase tracking-wider sm:tracking-widest text-primary-foreground clip-notch shadow-[0_0_20px_-4px_var(--neon)] flex items-center justify-center gap-2 active:scale-95"
              >
                Create Player Profile <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: SUCCESS VERIFICATION */}
        {step === "success" && (
          <div className="py-6 text-center space-y-3 sm:space-y-4 animate-scale-in">
            <CheckCircle2 className="mx-auto size-12 sm:size-16 text-accent animate-bounce" />
            <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-gradient-neon">
              ACCESS GRANTED
            </h2>
            <p className="text-[0.68rem] sm:text-xs font-mono text-muted-foreground">
              AUTHENTICATED // REDIRECTING TO DASHBOARD...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
