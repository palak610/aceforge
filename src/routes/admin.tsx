import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useArenaStore,
  type PromoCode,
  type Station,
  type Booking,
} from "@/lib/arenaStore";
import {
  type Experience,
  type GameItem,
  type CafeItem,
  type EventOption,
  type PricingTier,
} from "@/data/gamingZone";
import { soundEngine } from "@/lib/soundEngine";
import { ArenaBackground } from "@/components/arena/Background";
import {
  Activity,
  Monitor,
  CalendarCheck,
  Tag,
  Trophy,
  Percent,
  Users,
  Database,
  Search,
  Plus,
  Trash2,
  Lock,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Radio,
  Gamepad2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  DollarSign,
  TrendingUp,
  Star,
  MessageSquare,
  Sparkles,
  Zap,
  Flame,
  Shield,
  Layers,
  ArrowUpRight,
  Send,
  Eye,
  Filter,
  Car,
  Glasses,
  Coffee,
  Edit3,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: StandaloneAdminPage,
});

export const DATABASE_SCHEMA_TABLES = [
  {
    name: "experiences",
    description: "Gaming platforms, hardware specs, starting prices, duration matrices",
    columns: ["id (PK)", "name", "type", "tagline", "starting_price", "hardware", "pricing_json"],
  },
  {
    name: "games_vault",
    description: "Installed gaming titles, platform assignments, ratings, player counts",
    columns: ["id (PK)", "name", "platform", "genre", "player_count", "rating", "image_url"],
  },
  {
    name: "cafe_menu",
    description: "Café food & beverages, pricing, category classification",
    columns: ["id (PK)", "name", "category", "price", "description", "image_url"],
  },
  {
    name: "event_packages",
    description: "Group party packages, esports tournament brackets, corporate LAN hire",
    columns: ["id (PK)", "title", "description", "capacity", "starting_price", "features_json"],
  },
  {
    name: "stations",
    description: "Physical hardware units and live booking availability status",
    columns: ["id (PK)", "name", "category", "status (AVAILABLE/BOOKED/MAINTENANCE)"],
  },
  {
    name: "bookings",
    description: "Customer session reservations and live dispatch tokens",
    columns: ["id (PK)", "customer_name", "category", "station_name", "date", "time_slot", "final_amount", "booking_status"],
  },
];

function StandaloneAdminPage() {
  const {
    currentUser,
    stations,
    pricingRules,
    onlineDiscount,
    promoCodes,
    bookings,
    whatsappLogs,
    allowStacking,
    experiences,
    games,
    cafeItems,
    events,
    updateExperience,
    updateExperiencePricing,
    addGame,
    updateGame,
    deleteGame,
    addCafeItem,
    updateCafeItem,
    deleteCafeItem,
    addEvent,
    updateEvent,
    deleteEvent,
    updateOnlineDiscount,
    addPromoCode,
    deletePromoCode,
    updateStationStatus,
    toggleStacking,
    updateBookingStatus,
    deleteBooking,
    resetToDefault,
  } = useArenaStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "pricing"
    | "games"
    | "cafe"
    | "events"
    | "stations"
    | "bookings"
    | "promos"
    | "database"
  >("dashboard");

  const [soundOn, setSoundOn] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Game creation / edit modal
  const [showAddGame, setShowAddGame] = useState(false);
  const [editingGameId, setEditingGameId] = useState<string | null>(null);
  const [gameForm, setGameForm] = useState({
    name: "",
    platform: "pc" as GameItem["platform"],
    genre: "Action / FPS",
    playerCount: "1-10 Players",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    rating: "4.8",
  });

  // Café creation / edit modal
  const [showAddCafe, setShowAddCafe] = useState(false);
  const [editingCafeId, setEditingCafeId] = useState<string | null>(null);
  const [cafeForm, setCafeForm] = useState({
    name: "",
    category: "drinks" as CafeItem["category"],
    categoryLabel: "Cold Brew & Energy",
    price: 120,
    description: "Slow-steeped Arabica coffee served over ice.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop",
  });

  // Promo creation
  const [showAddPromo, setShowAddPromo] = useState(false);
  const [promoForm, setPromoForm] = useState({
    code: "",
    type: "flat" as "flat" | "percentage",
    val: "50",
    min: "100",
  });

  useEffect(() => {
    setSoundOn(soundEngine.getSoundEnabled());
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-IN", { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    const next = soundEngine.toggleMute();
    setSoundOn(next);
  };

  const handleTabSelect = (tab: typeof activeTab) => {
    soundEngine.playClick();
    setActiveTab(tab);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1234" || passcode === "admin" || passcode.length >= 4) {
      soundEngine.playSuccess();
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // --- GAME HANDLERS ---
  const handleOpenAddGame = () => {
    soundEngine.playClick();
    setEditingGameId(null);
    setGameForm({
      name: "",
      platform: "pc",
      genre: "Action / Competitive",
      playerCount: "1-5 Players",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
      rating: "4.9",
    });
    setShowAddGame(true);
  };

  const handleOpenEditGame = (g: GameItem) => {
    soundEngine.playClick();
    setEditingGameId(g.id);
    setGameForm({
      name: g.name,
      platform: g.platform,
      genre: g.genre,
      playerCount: g.playerCount,
      image: g.image,
      rating: g.rating,
    });
    setShowAddGame(true);
  };

  const handleSaveGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameForm.name) return;
    soundEngine.playSuccess();

    const platformLabel =
      gameForm.platform === "ps5"
        ? "PS5 Console"
        : gameForm.platform === "pc"
        ? "PC Rig"
        : gameForm.platform === "vr"
        ? "VR Pod"
        : "Sim Rig";

    if (editingGameId) {
      updateGame(editingGameId, {
        ...gameForm,
        platformLabel,
      });
    } else {
      addGame({
        ...gameForm,
        platformLabel,
      });
    }
    setShowAddGame(false);
  };

  // --- CAFE HANDLERS ---
  const handleOpenAddCafe = () => {
    soundEngine.playClick();
    setEditingCafeId(null);
    setCafeForm({
      name: "",
      category: "drinks",
      categoryLabel: "Cold Brew & Energy",
      price: 120,
      description: "Slow-steeped Arabica coffee served over ice.",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop",
    });
    setShowAddCafe(true);
  };

  const handleOpenEditCafe = (item: CafeItem) => {
    soundEngine.playClick();
    setEditingCafeId(item.id);
    setCafeForm({
      name: item.name,
      category: item.category,
      categoryLabel: item.categoryLabel,
      price: item.price,
      description: item.description,
      image: item.image,
    });
    setShowAddCafe(true);
  };

  const handleSaveCafeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cafeForm.name) return;
    soundEngine.playSuccess();

    const categoryLabel =
      cafeForm.category === "drinks"
        ? "Cold Brew & Energy"
        : cafeForm.category === "snacks"
        ? "Loaded Snacks"
        : cafeForm.category === "food"
        ? "Sourdough Melts"
        : "Squad Combos";

    if (editingCafeId) {
      updateCafeItem(editingCafeId, {
        ...cafeForm,
        categoryLabel,
      });
    } else {
      addCafeItem({
        ...cafeForm,
        categoryLabel,
      });
    }
    setShowAddCafe(false);
  };

  // --- PROMO HANDLER ---
  const handleAddPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoForm.code || !promoForm.val) return;
    soundEngine.playSuccess();
    addPromoCode({
      code: promoForm.code.toUpperCase().trim(),
      discountType: promoForm.type,
      discountValue: parseFloat(promoForm.val) || 0,
      minAmount: parseFloat(promoForm.min) || 0,
      expiry: "2026-12-31",
      usageLimit: 500,
      category: "all",
      active: true,
    });
    setPromoForm({ code: "", type: "flat", val: "50", min: "100" });
    setShowAddPromo(false);
  };

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "PAID")
    .reduce((sum, b) => sum + b.finalAmount, 0);

  const availableStationsCount = stations.filter((s) => s.status === "AVAILABLE").length;
  const occupancyRate = Math.round(
    ((stations.length - availableStationsCount) / stations.length) * 100,
  );

  // Passcode Lock screen
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-[#07070a] text-foreground flex items-center justify-center p-4">
        <ArenaBackground />
        <div className="relative w-full max-w-md rounded-3xl border border-primary/50 bg-[#101018]/95 p-8 shadow-[0_0_60px_-10px_rgba(123,44,255,0.4)] backdrop-blur-xl text-center space-y-6">
          <div className="size-16 rounded-2xl bg-primary/20 border border-primary/50 text-primary mx-auto grid place-items-center shadow-lg shadow-primary/30 animate-pulse">
            <Lock className="size-8" />
          </div>

          <div>
            <span className="font-mono text-[0.68rem] text-primary uppercase font-bold tracking-widest block mb-1">
              COMMAND AUTHORIZATION
            </span>
            <h1 className="font-display text-2xl font-black uppercase text-foreground">
              Ace Forge Admin Console
            </h1>
            <p className="text-xs text-muted-foreground mt-1 font-ui">
              Live management for pricing matrices, games catalog, café menus, events, and station telemetry.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                Admin Passcode (Default: 1234)
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full px-4 py-3 rounded-xl bg-[#161622] border border-[#242436] text-foreground font-mono text-center text-lg tracking-widest focus:outline-none focus:border-primary"
                autoFocus
              />
              {authError && (
                <p className="text-[0.7rem] text-rose-400 font-mono">
                  Access denied. Enter 1234 or admin.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-ui text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:scale-102 active:scale-95 transition-all"
            >
              Authorize Access
            </button>
          </form>

          <div className="pt-2 border-t border-[#1f1f2e]">
            <Link
              to="/"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              <ChevronLeft className="size-3.5" />
              <span>Return to Customer Arena</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#08080c] text-foreground font-ui selection:bg-primary/30">
      <ArenaBackground />

      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#0c0c14]/95 border-b border-[#222234] backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 grid place-items-center text-primary-foreground font-black shadow-md shadow-primary/40">
            <Shield className="size-5" />
          </div>
          <div>
            <div className="font-display text-base font-black uppercase text-foreground flex items-center gap-2">
              <span>Ace Forge Command</span>
              <span className="rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 font-mono text-[0.62rem] font-bold">
                LIVE PERSISTENCE
              </span>
            </div>
            <span className="font-mono text-[0.62rem] text-muted-foreground">
              TIME: {currentTime} • AHMEDABAD HQ
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio FX Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            className={cn(
              "p-2 rounded-xl border font-mono text-xs font-bold transition-all",
              soundOn
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-[#242436] bg-[#14141e] text-muted-foreground",
            )}
            title="Toggle Audio FX"
          >
            {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>

          <Link
            to="/"
            className="px-4 py-2 rounded-xl border border-[#262638] bg-[#141420] text-muted-foreground hover:text-foreground font-ui text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>View Arena</span>
            <ExternalLink className="size-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="px-3.5 py-2 rounded-xl bg-rose-600/20 border border-rose-500/30 text-rose-400 hover:bg-rose-600/30 font-ui text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Lock</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none bg-[#111118]/90 p-1.5 rounded-2xl border border-[#222234]">
          {(
            [
              { id: "dashboard", label: "Dashboard", icon: Activity },
              { id: "pricing", label: "Dynamic Pricing", icon: DollarSign },
              { id: "games", label: "Games Vault", icon: Gamepad2 },
              { id: "cafe", label: "Café & Refreshments", icon: Coffee },
              { id: "events", label: "Event Packages", icon: Trophy },
              { id: "stations", label: "Live Stations", icon: Monitor },
              { id: "bookings", label: "Live Bookings", icon: CalendarCheck },
              { id: "promos", label: "Promos & Discounts", icon: Percent },
              { id: "database", label: "Data Schema", icon: Database },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => handleTabSelect(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl font-ui text-xs font-black uppercase tracking-wider shrink-0 transition-all",
                  isSelected
                    ? "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-md shadow-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#181824]",
                )}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Telemetry KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#111118] border border-[#242436] space-y-2">
                <span className="text-[0.62rem] font-mono text-muted-foreground uppercase font-bold">
                  Total Paid Revenue
                </span>
                <div className="font-display text-3xl font-black text-gradient-neon">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </div>
                <div className="text-[0.65rem] font-mono text-emerald-400">
                  +18.4% this week
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111118] border border-[#242436] space-y-2">
                <span className="text-[0.62rem] font-mono text-muted-foreground uppercase font-bold">
                  Station Occupancy
                </span>
                <div className="font-display text-3xl font-black text-foreground">
                  {occupancyRate}%
                </div>
                <div className="text-[0.65rem] font-mono text-cyan-400">
                  {availableStationsCount} of {stations.length} Available
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111118] border border-[#242436] space-y-2">
                <span className="text-[0.62rem] font-mono text-muted-foreground uppercase font-bold">
                  Installed Games Vault
                </span>
                <div className="font-display text-3xl font-black text-foreground">
                  {games.length} Titles
                </div>
                <div className="text-[0.65rem] font-mono text-primary">
                  Fully dynamic & pre-loaded
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111118] border border-[#242436] space-y-2">
                <span className="text-[0.62rem] font-mono text-muted-foreground uppercase font-bold">
                  Gourmet Café Items
                </span>
                <div className="font-display text-3xl font-black text-foreground">
                  {cafeItems.length} Refuels
                </div>
                <div className="text-[0.65rem] font-mono text-amber-400">
                  Direct rig delivery active
                </div>
              </div>
            </div>

            {/* Live Station Quick Visualizer */}
            <div className="p-6 rounded-3xl bg-[#111118] border border-[#242436] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-black uppercase text-foreground">
                  Live Battle Arena Floor Map
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  Click any bay to toggle availability
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                {stations.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      const next =
                        st.status === "AVAILABLE"
                          ? "BOOKED"
                          : st.status === "BOOKED"
                          ? "MAINTENANCE"
                          : "AVAILABLE";
                      updateStationStatus(st.id, next);
                    }}
                    className={cn(
                      "p-3 rounded-2xl border text-center transition-all",
                      st.status === "AVAILABLE" && "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
                      st.status === "BOOKED" && "border-primary/40 bg-primary/15 text-primary",
                      st.status === "MAINTENANCE" && "border-amber-500/40 bg-amber-500/10 text-amber-400",
                    )}
                  >
                    <div className="font-mono text-xs font-black">{st.id}</div>
                    <div className="text-[0.6rem] font-mono uppercase mt-1 opacity-80">{st.status}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DYNAMIC PRICING MATRIX */}
        {activeTab === "pricing" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-black uppercase text-foreground">
                  Dynamic Experience Pricing Matrices
                </h3>
                <p className="text-xs text-muted-foreground font-ui">
                  Changes made here update both the Customer Homepage and Booking Terminal immediately.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-3xl border border-[#242436] bg-[#111118] p-6 space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-[#242436] pb-3">
                    <div>
                      <span className="font-display text-lg font-black uppercase text-foreground">
                        {exp.name}
                      </span>
                      <span className="text-[0.65rem] font-mono text-primary block">
                        {exp.type} • {exp.tagline}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[0.6rem] font-mono text-muted-foreground uppercase font-bold block">
                        Starting Price
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono text-muted-foreground">₹</span>
                        <input
                          type="number"
                          value={exp.startingPrice}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            updateExperience(exp.id, { startingPrice: val });
                          }}
                          className="w-20 px-2 py-1 rounded-lg bg-[#161624] border border-[#2e2e42] font-mono text-sm font-black text-gradient-neon text-right focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Duration Pricing Matrix */}
                  <div className="space-y-3">
                    <span className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold tracking-widest block">
                      Duration & Tier Pricing (₹)
                    </span>

                    <div className="space-y-2">
                      {exp.durationOptions.map((dur) => (
                        <div
                          key={dur.id}
                          className="flex items-center justify-between p-3 rounded-2xl border border-[#242436] bg-[#151522] gap-3"
                        >
                          <span className="font-ui text-xs font-bold text-foreground w-28 shrink-0">
                            {dur.label}
                          </span>

                          <div className="flex items-center gap-2 flex-1 justify-end">
                            {(["regular", "peak", "weekend"] as const).map((tier) => (
                              <div key={tier} className="flex flex-col items-center">
                                <span className="text-[0.55rem] font-mono text-muted-foreground uppercase">
                                  {tier}
                                </span>
                                <input
                                  type="number"
                                  value={exp.pricing[tier]?.[dur.id] ?? exp.startingPrice}
                                  onChange={(e) => {
                                    const val = parseFloat(e.target.value) || 0;
                                    updateExperiencePricing(exp.id, dur.id, tier, val);
                                  }}
                                  className="w-16 px-2 py-1 rounded-lg bg-[#0e0e16] border border-[#2b2b3e] font-mono text-xs font-black text-center text-foreground focus:outline-none focus:border-primary"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GAMES VAULT */}
        {activeTab === "games" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-black uppercase text-foreground">
                  Game Vault Manager ({games.length} Installed Titles)
                </h3>
                <p className="text-xs text-muted-foreground font-ui">
                  Add, update, or remove titles available across all 16 battle stations.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddGame}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary/30 self-start active:scale-95 transition-all"
              >
                <Plus className="size-4" />
                <span>Add New Game</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((g) => (
                <div
                  key={g.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl border border-[#242436] bg-[#111118] hover:border-primary/40 transition-colors"
                >
                  <img
                    src={g.image}
                    alt={g.name}
                    className="size-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold uppercase text-foreground truncate">
                          {g.name}
                        </span>
                        <span className="text-[0.58rem] font-mono font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Star className="size-2.5 fill-current" />
                          <span>{g.rating}</span>
                        </span>
                      </div>
                      <div className="text-[0.68rem] text-muted-foreground truncate">{g.genre}</div>
                      <span className="inline-block mt-1 text-[0.58rem] font-mono text-primary font-bold uppercase bg-primary/20 px-2 py-0.5 rounded">
                        {g.platformLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1f1f2e]">
                      <button
                        type="button"
                        onClick={() => handleOpenEditGame(g)}
                        className="p-1.5 rounded-lg bg-[#181826] text-muted-foreground hover:text-foreground hover:bg-[#202034] transition-colors"
                        title="Edit Game"
                      >
                        <Edit3 className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          deleteGame(g.id);
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Game"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CAFE & REFRESHMENTS */}
        {activeTab === "cafe" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-black uppercase text-foreground">
                  Gourmet Café & Station Food Menu ({cafeItems.length} Items)
                </h3>
                <p className="text-xs text-muted-foreground font-ui">
                  Manage beverages, loaded fries, sourdough melts, and squad combos.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddCafe}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary/30 self-start active:scale-95 transition-all"
              >
                <Plus className="size-4" />
                <span>Add Menu Item</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cafeItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-4 rounded-2xl border border-[#242436] bg-[#111118] hover:border-primary/40 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold uppercase text-foreground truncate">
                          {item.name}
                        </span>
                        <span className="font-mono text-sm font-black text-gradient-neon shrink-0">
                          ₹{item.price}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {item.description}
                      </div>
                      <span className="inline-block mt-1 text-[0.58rem] font-mono text-emerald-400 font-bold uppercase bg-emerald-500/15 px-2 py-0.5 rounded">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1f1f2e]">
                      <button
                        type="button"
                        onClick={() => handleOpenEditCafe(item)}
                        className="p-1.5 rounded-lg bg-[#181826] text-muted-foreground hover:text-foreground hover:bg-[#202034] transition-colors"
                        title="Edit Item"
                      >
                        <Edit3 className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          deleteCafeItem(item.id);
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EVENT PACKAGES */}
        {activeTab === "events" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-black uppercase text-foreground">
                  Event & Squad Party Packages ({events.length} Active Packages)
                </h3>
                <p className="text-xs text-muted-foreground font-ui">
                  Manage tournament packages, birthday squad hire, and corporate LAN rates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-3xl border border-[#242436] bg-[#111118] p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-black uppercase text-foreground">
                        {ev.title}
                      </span>
                      {ev.badge && (
                        <span className="text-[0.6rem] font-mono font-bold text-primary bg-primary/20 px-2 py-0.5 rounded">
                          {ev.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground">{ev.description}</p>

                    <div className="space-y-1.5 pt-2">
                      <span className="text-[0.62rem] font-mono text-muted-foreground uppercase font-bold block">
                        Included Features:
                      </span>
                      {ev.features.map((f) => (
                        <div key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1f1f2e] flex items-center justify-between">
                    <div>
                      <span className="text-[0.6rem] font-mono text-muted-foreground uppercase font-bold block">
                        Starting Price
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-mono text-muted-foreground">₹</span>
                        <input
                          type="number"
                          value={ev.startingPrice}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            updateEvent(ev.id, { startingPrice: val });
                          }}
                          className="w-24 px-2 py-1 rounded-lg bg-[#161624] border border-[#2e2e42] font-mono text-base font-black text-gradient-neon focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <span className="text-[0.65rem] font-mono text-primary font-bold">
                      {ev.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STATIONS */}
        {activeTab === "stations" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-black uppercase text-foreground">
                  Battle Station Hardware Units
                </h3>
                <p className="text-xs text-muted-foreground font-ui">
                  16 Live gaming stations across PS5, PC, Racing, and VR bays.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stations.map((st) => (
                <div
                  key={st.id}
                  className="p-5 rounded-2xl border border-[#242436] bg-[#111118] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-foreground">{st.id}</span>
                    <span
                      className={cn(
                        "text-[0.62rem] font-mono font-bold uppercase px-2 py-0.5 rounded",
                        st.status === "AVAILABLE" && "bg-emerald-500/20 text-emerald-400",
                        st.status === "BOOKED" && "bg-primary/20 text-primary",
                        st.status === "MAINTENANCE" && "bg-amber-500/20 text-amber-400",
                      )}
                    >
                      {st.status}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    {(["AVAILABLE", "BOOKED", "MAINTENANCE"] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          updateStationStatus(st.id, status);
                        }}
                        className={cn(
                          "flex-1 py-1.5 rounded-lg font-mono text-[0.6rem] font-bold uppercase transition-all",
                          st.status === status
                            ? "bg-primary text-primary-foreground"
                            : "bg-[#181824] text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {status.slice(0, 5)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display text-xl font-black uppercase text-foreground">
                Customer Bookings & Dispatch Tokens
              </h3>
              <p className="text-xs text-muted-foreground font-ui">
                Active customer reservations made through the terminal.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#242436] bg-[#111118]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#161622] text-muted-foreground border-b border-[#242436] text-[0.68rem] uppercase font-bold">
                  <tr>
                    <th className="p-3.5">Booking ID</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Date & Slot</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f2e]">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#151520] transition-colors">
                      <td className="p-3.5 font-bold text-primary">{b.id}</td>
                      <td className="p-3.5 text-foreground">{b.customerName}</td>
                      <td className="p-3.5 text-muted-foreground uppercase">{b.category}</td>
                      <td className="p-3.5 text-muted-foreground">
                        {b.date} • {b.timeSlot}
                      </td>
                      <td className="p-3.5 text-muted-foreground">{b.duration}</td>
                      <td className="p-3.5 font-black text-gradient-neon">₹{b.finalAmount}</td>
                      <td className="p-3.5">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[0.62rem] font-bold uppercase",
                            b.bookingStatus === "CONFIRMED" && "bg-emerald-500/20 text-emerald-400",
                            b.bookingStatus === "COMPLETED" && "bg-cyan-500/20 text-cyan-400",
                            b.bookingStatus === "CANCELLED" && "bg-rose-500/20 text-rose-400",
                          )}
                        >
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playClick();
                              updateBookingStatus(
                                b.id,
                                b.bookingStatus === "CONFIRMED" ? "COMPLETED" : "CONFIRMED",
                              );
                            }}
                            className="px-2 py-1 rounded bg-[#181826] text-muted-foreground hover:text-foreground text-[0.62rem] font-bold"
                          >
                            Toggle Status
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              soundEngine.playClick();
                              deleteBooking(b.id);
                            }}
                            className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="Delete"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: PROMOS & DISCOUNTS */}
        {activeTab === "promos" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-black uppercase text-foreground">
                  Promo Codes & Online Booking Discounts
                </h3>
                <p className="text-xs text-muted-foreground font-ui">
                  Create discount coupons for tournament campaigns or solo players.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddPromo(true)}
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary/30 self-start active:scale-95 transition-all"
              >
                <Plus className="size-4" />
                <span>Create Promo Code</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {promoCodes.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl border border-[#242436] bg-[#111118] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-primary">{p.code}</span>
                    <span className="text-[0.62rem] font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">
                      {p.discountType === "flat" ? `₹${p.discountValue} FLAT` : `${p.discountValue}% OFF`}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-muted-foreground space-y-1">
                    <div>Min Order: ₹{p.minAmount}</div>
                    <div>Usage: {p.usageCount} applied</div>
                  </div>

                  <div className="pt-2 border-t border-[#1f1f2e] flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        deletePromoCode(p.id);
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                      title="Delete Promo"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: DATABASE SCHEMA */}
        {activeTab === "database" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="font-display text-xl font-black uppercase text-foreground">
                Central Storage & Backend API Schema
              </h3>
              <p className="text-xs text-muted-foreground font-ui">
                All entities follow this normalized SQL/NoSQL schema for zero-friction backend integration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATABASE_SCHEMA_TABLES.map((t) => (
                <div
                  key={t.name}
                  className="p-5 rounded-2xl border border-[#242436] bg-[#111118] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-primary">{t.name}</span>
                    <Database className="size-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground font-ui">{t.description}</p>
                  <div className="p-3 rounded-xl bg-[#161622] font-mono text-[0.68rem] text-muted-foreground space-y-1">
                    {t.columns.map((c) => (
                      <div key={c}>• {c}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-[#27273c] bg-[#111118] flex items-center justify-between">
              <div>
                <span className="font-display text-base font-bold uppercase text-foreground">
                  Reset Mock Data to Factory Defaults
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Clears local storage overrides and restores initial game zone configurations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  resetToDefault();
                }}
                className="px-4 py-2 rounded-xl bg-rose-600/20 border border-rose-500/30 text-rose-400 hover:bg-rose-600/30 font-mono text-xs font-bold uppercase"
              >
                Reset Store
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ADD / EDIT GAME MODAL */}
      {showAddGame && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundEngine.playClick();
              setShowAddGame(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-primary/50 bg-[#111118] p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-in">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setShowAddGame(false);
              }
            }
              className="size-8 rounded-xl bg-[#181826] grid place-items-center text-muted-foreground hover:text-foreground absolute top-4 right-4"
            >
              <X className="size-4" />
            </button>

            <h3 className="font-display text-xl font-black uppercase text-foreground">
              {editingGameId ? "Edit Game Title" : "Add New Game Title"}
            </h3>

            <form onSubmit={handleSaveGameSubmit} className="space-y-4 text-xs font-ui">
              <div className="space-y-1">
                <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                  Game Name
                </label>
                <input
                  type="text"
                  value={gameForm.name}
                  onChange={(e) => setGameForm({ ...gameForm, name: e.target.value })}
                  placeholder="e.g. Tekken 8 / EA Sports FC 25"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                    Platform
                  </label>
                  <select
                    value={gameForm.platform}
                    onChange={(e) =>
                      setGameForm({
                        ...gameForm,
                        platform: e.target.value as GameItem["platform"],
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="ps5">PS5 Console</option>
                    <option value="pc">PC Rig</option>
                    <option value="racing">Sim Racing</option>
                    <option value="vr">VR Pod</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                    Rating (Stars)
                  </label>
                  <input
                    type="text"
                    value={gameForm.rating}
                    onChange={(e) => setGameForm({ ...gameForm, rating: e.target.value })}
                    placeholder="4.9"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                    Genre
                  </label>
                  <input
                    type="text"
                    value={gameForm.genre}
                    onChange={(e) => setGameForm({ ...gameForm, genre: e.target.value })}
                    placeholder="Action / Tactical FPS"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                    Players
                  </label>
                  <input
                    type="text"
                    value={gameForm.playerCount}
                    onChange={(e) => setGameForm({ ...gameForm, playerCount: e.target.value })}
                    placeholder="1-4 Players"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                  Image URL
                </label>
                <input
                  type="url"
                  value={gameForm.image}
                  onChange={(e) => setGameForm({ ...gameForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary font-mono text-[0.7rem]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/30 mt-2"
              >
                {editingGameId ? "Save Changes" : "Create Game"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT CAFE MODAL */}
      {showAddCafe && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundEngine.playClick();
              setShowAddCafe(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-primary/50 bg-[#111118] p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-in">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setShowAddCafe(false);
              }}
              className="size-8 rounded-xl bg-[#181826] grid place-items-center text-muted-foreground hover:text-foreground absolute top-4 right-4"
            >
              <X className="size-4" />
            </button>

            <h3 className="font-display text-xl font-black uppercase text-foreground">
              {editingCafeId ? "Edit Menu Item" : "Add New Menu Item"}
            </h3>

            <form onSubmit={handleSaveCafeSubmit} className="space-y-4 text-xs font-ui">
              <div className="space-y-1">
                <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                  Item Name
                </label>
                <input
                  type="text"
                  value={cafeForm.name}
                  onChange={(e) => setCafeForm({ ...cafeForm, name: e.target.value })}
                  placeholder="e.g. Loaded Truffle Fries"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                    Category
                  </label>
                  <select
                    value={cafeForm.category}
                    onChange={(e) =>
                      setCafeForm({
                        ...cafeForm,
                        category: e.target.value as CafeItem["category"],
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="drinks">Cold Brew & Energy</option>
                    <option value="snacks">Loaded Snacks</option>
                    <option value="food">Sourdough Melts</option>
                    <option value="combos">Squad Combos</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={cafeForm.price}
                    onChange={(e) => setCafeForm({ ...cafeForm, price: parseFloat(e.target.value) || 0 })}
                    placeholder="120"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                  Description
                </label>
                <textarea
                  value={cafeForm.description}
                  onChange={(e) => setCafeForm({ ...cafeForm, description: e.target.value })}
                  placeholder="Crispy fries tossed with seasoning..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                  Image URL
                </label>
                <input
                  type="url"
                  value={cafeForm.image}
                  onChange={(e) => setCafeForm({ ...cafeForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary font-mono text-[0.7rem]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/30 mt-2"
              >
                {editingCafeId ? "Save Changes" : "Create Item"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE PROMO MODAL */}
      {showAddPromo && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              soundEngine.playClick();
              setShowAddPromo(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-primary/50 bg-[#111118] p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-in">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setShowAddPromo(false);
              }}
              className="size-8 rounded-xl bg-[#181826] grid place-items-center text-muted-foreground hover:text-foreground absolute top-4 right-4"
            >
              <X className="size-4" />
            </button>

            <h3 className="font-display text-xl font-black uppercase text-foreground">
              Create Promo Coupon
            </h3>

            <form onSubmit={handleAddPromoSubmit} className="space-y-4 text-xs font-ui">
              <div className="space-y-1">
                <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={promoForm.code}
                  onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value })}
                  placeholder="e.g. SQUAD20"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground uppercase font-mono font-bold focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                    Type
                  </label>
                  <select
                    value={promoForm.type}
                    onChange={(e) =>
                      setPromoForm({ ...promoForm, type: e.target.value as "flat" | "percentage" })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="flat">Flat Amount (₹)</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    value={promoForm.val}
                    onChange={(e) => setPromoForm({ ...promoForm, val: e.target.value })}
                    placeholder="50"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground font-mono font-bold focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[0.65rem] font-mono text-muted-foreground uppercase font-bold">
                  Minimum Order Amount (₹)
                </label>
                <input
                  type="number"
                  value={promoForm.min}
                  onChange={(e) => setPromoForm({ ...promoForm, min: e.target.value })}
                  placeholder="100"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#161624] border border-[#262638] text-foreground font-mono focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-ui text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/30 mt-2"
              >
                Create Promo Code
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
