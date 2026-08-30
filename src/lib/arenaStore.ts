import { useState, useEffect } from "react";
import {
  EXPERIENCES,
  POPULAR_GAMES,
  CAFE_ITEMS,
  EVENT_PACKAGES,
  type Experience,
  type GameItem,
  type CafeItem,
  type EventOption,
  type PricingTier,
} from "@/data/gamingZone";

// --- TYPES ---
export type CustomerUser = {
  id: string;
  name: string;
  mobile: string;
  avatar: string;
  totalSessions: number;
  totalHours: number;
  amountSpent: number;
  membership: "STANDARD" | "PLAYER" | "VIP" | "ACE ELITE";
  createdAt: string;
};

export type Station = {
  id: string;
  name: string;
  category: "ps5" | "pc" | "racing" | "vr";
  status: "AVAILABLE" | "BOOKED" | "LOCKED" | "MAINTENANCE";
  lockedUntil?: number | null;
};

export type PricingRule = {
  id: string;
  category: "ps5" | "pc" | "racing" | "vr";
  durationMinutes: number;
  hourlyRate: number;
  packagePrice?: number | null;
  ruleType: "STANDARD" | "PACKAGE" | "PEAK" | "WEEKEND";
  active: boolean;
};

export type OnlineDiscountConfig = {
  enabled: boolean;
  type: "flat" | "percentage";
  value: number;
  minAmount: number;
};

export type PromoCode = {
  id: string;
  code: string;
  discountType: "flat" | "percentage";
  discountValue: number;
  minAmount: number;
  maxDiscount?: number;
  expiry: string;
  usageLimit: number;
  usageCount: number;
  category?: "all" | "ps5" | "pc" | "racing" | "vr";
  active: boolean;
};

export type Booking = {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  category: "ps5" | "pc" | "racing" | "vr";
  categoryName: string;
  stationId: string;
  stationName: string;
  date: string;
  timeSlot: string;
  duration: string;
  durationMinutes: number;
  players: number;
  basePrice: number;
  packageDiscount: number;
  onlineDiscount: number;
  promoDiscount: number;
  promoCodeApplied?: string;
  membershipDiscount: number;
  finalAmount: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  bookingStatus: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  rescheduledCount?: number;
};

export type WhatsAppLog = {
  id: string;
  bookingId: string;
  mobile: string;
  message: string;
  status: "SENT" | "DELIVERED" | "FAILED";
  sentAt: string;
};

// --- INITIAL DEFAULT DATA ---
export const INITIAL_USER: CustomerUser = {
  id: "USR-9901",
  name: "Falgun",
  mobile: "9876543210",
  avatar:
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
  totalSessions: 4,
  totalHours: 8,
  amountSpent: 1240,
  membership: "PLAYER",
  createdAt: "2026-08-01",
};

export const INITIAL_STATIONS: Station[] = [
  // PS5
  { id: "PS5-01", name: "PS5-01", category: "ps5", status: "AVAILABLE" },
  { id: "PS5-02", name: "PS5-02", category: "ps5", status: "BOOKED" },
  { id: "PS5-03", name: "PS5-03", category: "ps5", status: "AVAILABLE" },
  { id: "PS5-04", name: "PS5-04", category: "ps5", status: "AVAILABLE" },

  // PC (1 to 8)
  { id: "PC-01", name: "PC-01", category: "pc", status: "AVAILABLE" },
  { id: "PC-02", name: "PC-02", category: "pc", status: "BOOKED" },
  { id: "PC-03", name: "PC-03", category: "pc", status: "MAINTENANCE" },
  { id: "PC-04", name: "PC-04", category: "pc", status: "AVAILABLE" },
  { id: "PC-05", name: "PC-05", category: "pc", status: "AVAILABLE" },
  { id: "PC-06", name: "PC-06", category: "pc", status: "AVAILABLE" },
  { id: "PC-07", name: "PC-07", category: "pc", status: "AVAILABLE" },
  { id: "PC-08", name: "PC-08", category: "pc", status: "AVAILABLE" },

  // RACING (1 to 4)
  { id: "RACING-01", name: "RACING-01", category: "racing", status: "AVAILABLE" },
  { id: "RACING-02", name: "RACING-02", category: "racing", status: "BOOKED" },
  { id: "RACING-03", name: "RACING-03", category: "racing", status: "AVAILABLE" },
  { id: "RACING-04", name: "RACING-04", category: "racing", status: "AVAILABLE" },

  // VR (1 to 2)
  { id: "VR-01", name: "VR-01", category: "vr", status: "AVAILABLE" },
  { id: "VR-02", name: "VR-02", category: "vr", status: "AVAILABLE" },
];

export const INITIAL_PRICING_RULES: PricingRule[] = [
  { id: "pr-ps5-std", category: "ps5", durationMinutes: 60, hourlyRate: 120, ruleType: "STANDARD", active: true },
  { id: "pr-racing-std", category: "racing", durationMinutes: 60, hourlyRate: 150, ruleType: "STANDARD", active: true },
  { id: "pr-vr-30", category: "vr", durationMinutes: 30, hourlyRate: 200, packagePrice: 100, ruleType: "PACKAGE", active: true },
  { id: "pr-vr-60", category: "vr", durationMinutes: 60, hourlyRate: 150, packagePrice: 150, ruleType: "STANDARD", active: true },
  { id: "pr-pc-std", category: "pc", durationMinutes: 60, hourlyRate: 100, ruleType: "STANDARD", active: true },
  { id: "pr-pc-pkg-3h", category: "pc", durationMinutes: 180, hourlyRate: 100, packagePrice: 240, ruleType: "PACKAGE", active: true },
];

export const INITIAL_ONLINE_DISCOUNT: OnlineDiscountConfig = {
  enabled: true,
  type: "flat",
  value: 20,
  minAmount: 50,
};

export const INITIAL_PROMO_CODES: PromoCode[] = [
  { id: "promo-1", code: "ACE50", discountType: "flat", discountValue: 50, minAmount: 150, expiry: "2026-12-31", usageLimit: 1000, usageCount: 42, category: "all", active: true },
  { id: "promo-2", code: "GAMER20", discountType: "percentage", discountValue: 20, minAmount: 100, maxDiscount: 100, expiry: "2026-12-31", usageLimit: 500, usageCount: 18, category: "all", active: true },
  { id: "promo-3", code: "FIRSTSESSION", discountType: "flat", discountValue: 40, minAmount: 100, expiry: "2026-12-31", usageLimit: 1000, usageCount: 89, category: "all", active: true },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "AFA-48291",
    userId: "USR-9901",
    customerName: "Falgun",
    customerPhone: "+91 98765 43210",
    category: "ps5",
    categoryName: "PS5 Console",
    stationId: "PS5-03",
    stationName: "PS5-03",
    date: "2026-08-15",
    timeSlot: "8:00 PM – 10:00 PM",
    duration: "2 Hours",
    durationMinutes: 120,
    players: 2,
    basePrice: 240,
    packageDiscount: 0,
    onlineDiscount: 20,
    promoDiscount: 0,
    membershipDiscount: 0,
    finalAmount: 220,
    paymentStatus: "PAID",
    bookingStatus: "CONFIRMED",
    createdAt: "2026-08-13 14:20",
  },
  {
    id: "AFA-10204",
    userId: "USR-9901",
    customerName: "Falgun",
    customerPhone: "+91 98765 43210",
    category: "pc",
    categoryName: "High-End PC",
    stationId: "PC-01",
    stationName: "PC-01",
    date: "2026-08-10",
    timeSlot: "4:00 PM – 7:00 PM",
    duration: "3 Hours",
    durationMinutes: 180,
    players: 1,
    basePrice: 300,
    packageDiscount: 60,
    onlineDiscount: 20,
    promoDiscount: 0,
    membershipDiscount: 0,
    finalAmount: 220,
    paymentStatus: "PAID",
    bookingStatus: "COMPLETED",
    createdAt: "2026-08-10 12:00",
  },
];

const STORAGE_KEYS = {
  USER: "ace_forge_current_user",
  STATIONS: "ace_forge_stations",
  PRICING_RULES: "ace_forge_pricing_rules",
  ONLINE_DISCOUNT: "ace_forge_online_discount",
  PROMO_CODES: "ace_forge_promo_codes",
  BOOKINGS: "ace_forge_bookings",
  WHATSAPP_LOGS: "ace_forge_whatsapp_logs",
  STACKING_ENABLED: "ace_forge_stacking_enabled",
  EXPERIENCES: "ace_forge_experiences_v2",
  GAMES: "ace_forge_games_v2",
  CAFE: "ace_forge_cafe_v2",
  EVENTS: "ace_forge_events_v2",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error("Failed to load state from localStorage:", e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("arena-store-update"));
  } catch (e) {
    console.error("Failed to save state to localStorage:", e);
  }
}

export function useArenaStore() {
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(INITIAL_USER);
  const [stations, setStations] = useState<Station[]>(INITIAL_STATIONS);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>(INITIAL_PRICING_RULES);
  const [onlineDiscount, setOnlineDiscount] = useState<OnlineDiscountConfig>(INITIAL_ONLINE_DISCOUNT);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(INITIAL_PROMO_CODES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [whatsappLogs, setWhatsappLogs] = useState<WhatsAppLog[]>([]);
  const [allowStacking, setAllowStacking] = useState<boolean>(true);

  // Dynamic Content Data
  const [experiences, setExperiences] = useState<Experience[]>(EXPERIENCES);
  const [games, setGames] = useState<GameItem[]>(POPULAR_GAMES);
  const [cafeItems, setCafeItems] = useState<CafeItem[]>(CAFE_ITEMS);
  const [events, setEvents] = useState<EventOption[]>(EVENT_PACKAGES);

  // Client hydration
  useEffect(() => {
    setCurrentUser(loadFromStorage(STORAGE_KEYS.USER, INITIAL_USER));
    setStations(loadFromStorage(STORAGE_KEYS.STATIONS, INITIAL_STATIONS));
    setPricingRules(loadFromStorage(STORAGE_KEYS.PRICING_RULES, INITIAL_PRICING_RULES));
    setOnlineDiscount(loadFromStorage(STORAGE_KEYS.ONLINE_DISCOUNT, INITIAL_ONLINE_DISCOUNT));
    setPromoCodes(loadFromStorage(STORAGE_KEYS.PROMO_CODES, INITIAL_PROMO_CODES));
    setBookings(loadFromStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS));
    setWhatsappLogs(loadFromStorage(STORAGE_KEYS.WHATSAPP_LOGS, []));
    setAllowStacking(loadFromStorage(STORAGE_KEYS.STACKING_ENABLED, true));
    setExperiences(loadFromStorage(STORAGE_KEYS.EXPERIENCES, EXPERIENCES));
    setGames(loadFromStorage(STORAGE_KEYS.GAMES, POPULAR_GAMES));
    setCafeItems(loadFromStorage(STORAGE_KEYS.CAFE, CAFE_ITEMS));
    setEvents(loadFromStorage(STORAGE_KEYS.EVENTS, EVENT_PACKAGES));
  }, []);

  // Cross-tab sync
  useEffect(() => {
    const handleUpdate = () => {
      setCurrentUser(loadFromStorage(STORAGE_KEYS.USER, INITIAL_USER));
      setStations(loadFromStorage(STORAGE_KEYS.STATIONS, INITIAL_STATIONS));
      setPricingRules(loadFromStorage(STORAGE_KEYS.PRICING_RULES, INITIAL_PRICING_RULES));
      setOnlineDiscount(loadFromStorage(STORAGE_KEYS.ONLINE_DISCOUNT, INITIAL_ONLINE_DISCOUNT));
      setPromoCodes(loadFromStorage(STORAGE_KEYS.PROMO_CODES, INITIAL_PROMO_CODES));
      setBookings(loadFromStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS));
      setWhatsappLogs(loadFromStorage(STORAGE_KEYS.WHATSAPP_LOGS, []));
      setAllowStacking(loadFromStorage(STORAGE_KEYS.STACKING_ENABLED, true));
      setExperiences(loadFromStorage(STORAGE_KEYS.EXPERIENCES, EXPERIENCES));
      setGames(loadFromStorage(STORAGE_KEYS.GAMES, POPULAR_GAMES));
      setCafeItems(loadFromStorage(STORAGE_KEYS.CAFE, CAFE_ITEMS));
      setEvents(loadFromStorage(STORAGE_KEYS.EVENTS, EVENT_PACKAGES));
    };
    window.addEventListener("arena-store-update", handleUpdate);
    return () => window.removeEventListener("arena-store-update", handleUpdate);
  }, []);

  // --- DYNAMIC PRICING ENGINE ---
  const calculateExperiencePrice = (
    experienceId: string,
    durationId: string,
    tier: PricingTier = "regular",
  ): number => {
    const exp = experiences.find((e) => e.id === experienceId);
    if (!exp) return 100;
    const tierPricing = exp.pricing[tier] || exp.pricing.regular;
    if (tierPricing && typeof tierPricing[durationId] === "number") {
      return tierPricing[durationId]!;
    }
    return exp.startingPrice;
  };

  // --- EXPERIENCES MANAGEMENT ---
  const updateExperience = (id: string, partial: Partial<Experience>) => {
    setExperiences((prev) => {
      const next = prev.map((exp) => (exp.id === id ? { ...exp, ...partial } : exp));
      saveToStorage(STORAGE_KEYS.EXPERIENCES, next);
      return next;
    });
  };

  const updateExperiencePricing = (
    id: string,
    durationId: string,
    tier: PricingTier,
    price: number,
  ) => {
    setExperiences((prev) => {
      const next = prev.map((exp) => {
        if (exp.id !== id) return exp;
        const currentTierPricing = { ...exp.pricing[tier] };
        currentTierPricing[durationId] = price;
        return {
          ...exp,
          pricing: {
            ...exp.pricing,
            [tier]: currentTierPricing,
          },
        };
      });
      saveToStorage(STORAGE_KEYS.EXPERIENCES, next);
      return next;
    });
  };

  // --- GAMES MANAGEMENT ---
  const addGame = (newGame: Omit<GameItem, "id">) => {
    setGames((prev) => {
      const item: GameItem = {
        ...newGame,
        id: `game-${Date.now()}`,
      };
      const next = [item, ...prev];
      saveToStorage(STORAGE_KEYS.GAMES, next);
      return next;
    });
  };

  const updateGame = (id: string, partial: Partial<GameItem>) => {
    setGames((prev) => {
      const next = prev.map((g) => (g.id === id ? { ...g, ...partial } : g));
      saveToStorage(STORAGE_KEYS.GAMES, next);
      return next;
    });
  };

  const deleteGame = (id: string) => {
    setGames((prev) => {
      const next = prev.filter((g) => g.id !== id);
      saveToStorage(STORAGE_KEYS.GAMES, next);
      return next;
    });
  };

  // --- CAFE MENU MANAGEMENT ---
  const addCafeItem = (newItem: Omit<CafeItem, "id">) => {
    setCafeItems((prev) => {
      const item: CafeItem = {
        ...newItem,
        id: `cafe-${Date.now()}`,
      };
      const next = [...prev, item];
      saveToStorage(STORAGE_KEYS.CAFE, next);
      return next;
    });
  };

  const updateCafeItem = (id: string, partial: Partial<CafeItem>) => {
    setCafeItems((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, ...partial } : item));
      saveToStorage(STORAGE_KEYS.CAFE, next);
      return next;
    });
  };

  const deleteCafeItem = (id: string) => {
    setCafeItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveToStorage(STORAGE_KEYS.CAFE, next);
      return next;
    });
  };

  // --- EVENTS MANAGEMENT ---
  const addEvent = (newEvent: Omit<EventOption, "id">) => {
    setEvents((prev) => {
      const item: EventOption = {
        ...newEvent,
        id: `event-${Date.now()}`,
      };
      const next = [...prev, item];
      saveToStorage(STORAGE_KEYS.EVENTS, next);
      return next;
    });
  };

  const updateEvent = (id: string, partial: Partial<EventOption>) => {
    setEvents((prev) => {
      const next = prev.map((ev) => (ev.id === id ? { ...ev, ...partial } : ev));
      saveToStorage(STORAGE_KEYS.EVENTS, next);
      return next;
    });
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => {
      const next = prev.filter((ev) => ev.id !== id);
      saveToStorage(STORAGE_KEYS.EVENTS, next);
      return next;
    });
  };

  // --- STATIONS & DISCOUNTS & PROMOS ---
  const updateStationStatus = (id: string, status: Station["status"]) => {
    setStations((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, status } : s));
      saveToStorage(STORAGE_KEYS.STATIONS, next);
      return next;
    });
  };

  const addPromoCode = (promo: Omit<PromoCode, "id" | "usageCount">) => {
    setPromoCodes((prev) => {
      const item: PromoCode = {
        ...promo,
        id: `promo-${Date.now()}`,
        usageCount: 0,
      };
      const next = [...prev, item];
      saveToStorage(STORAGE_KEYS.PROMO_CODES, next);
      return next;
    });
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveToStorage(STORAGE_KEYS.PROMO_CODES, next);
      return next;
    });
  };

  const updateOnlineDiscount = (discount: OnlineDiscountConfig) => {
    setOnlineDiscount(discount);
    saveToStorage(STORAGE_KEYS.ONLINE_DISCOUNT, discount);
  };

  const toggleStacking = () => {
    setAllowStacking((prev) => {
      const next = !prev;
      saveToStorage(STORAGE_KEYS.STACKING_ENABLED, next);
      return next;
    });
  };

  const updateBookingStatus = (id: string, status: Booking["bookingStatus"]) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, bookingStatus: status } : b));
      saveToStorage(STORAGE_KEYS.BOOKINGS, next);
      return next;
    });
  };

  // --- USER AUTH & BOOKING HELPERS ---
  const loginUser = (name: string, mobile: string) => {
    const user: CustomerUser = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || "Gamer",
      mobile,
      avatar:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
      totalSessions: 1,
      totalHours: 2,
      amountSpent: 220,
      membership: "PLAYER",
      createdAt: new Date().toISOString().split("T")[0] ?? "",
    };
    setCurrentUser(user);
    saveToStorage(STORAGE_KEYS.USER, user);
    return user;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    saveToStorage(STORAGE_KEYS.USER, null);
  };

  const getAvailableStation = (category: Station["category"]): Station | null => {
    const matched = stations.filter(
      (s) => s.category === category && s.status === "AVAILABLE" && (!s.lockedUntil || s.lockedUntil < Date.now())
    );
    return matched[0] || null;
  };

  const lockStation = (stationId: string, durationMinutes = 10): boolean => {
    const station = stations.find((s) => s.id === stationId);
    if (!station || station.status !== "AVAILABLE") return false;
    updateStationStatus(stationId, "LOCKED");
    return true;
  };

  const calculatePrice = ({
    category,
    durationMinutes,
    promoCodeStr = "",
  }: {
    category: "ps5" | "pc" | "racing" | "vr";
    durationMinutes: number;
    promoCodeStr?: string;
  }) => {
    const hourlyRate = category === "racing" ? 150 : category === "vr" ? 150 : category === "pc" ? 100 : 120;
    const hours = durationMinutes / 60;
    let basePrice = Math.round(hourlyRate * hours);
    let packageDiscount = 0;

    if (category === "pc" && durationMinutes === 180) {
      basePrice = 300;
      packageDiscount = 60;
    } else if (category === "vr" && durationMinutes === 30) {
      basePrice = 100;
    }

    const onlineDiscountAmount = onlineDiscount.enabled && basePrice >= onlineDiscount.minAmount ? onlineDiscount.value : 0;
    let promoDiscount = 0;
    if (promoCodeStr) {
      const code = promoCodes.find((p) => p.code === promoCodeStr.toUpperCase() && p.active);
      if (code && basePrice >= code.minAmount) {
        promoDiscount = code.discountType === "flat" ? code.discountValue : Math.round((basePrice * code.discountValue) / 100);
      }
    }

    const finalAmount = Math.max(0, basePrice - packageDiscount - onlineDiscountAmount - promoDiscount);
    return {
      basePrice,
      rawBasePrice: basePrice,
      packageDiscount,
      onlineDiscount: onlineDiscountAmount,
      promoDiscount,
      membershipDiscount: 0,
      finalAmount,
      finalPayable: finalAmount,
    };
  };

  const createBooking = (bookingData: Omit<Booking, "id" | "createdAt">) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `AFA-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
    };
    setBookings((prev) => {
      const next = [newBooking, ...prev];
      saveToStorage(STORAGE_KEYS.BOOKINGS, next);
      return next;
    });
    updateStationStatus(bookingData.stationId, "BOOKED");
    return newBooking;
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTimeSlot: string) => {
    setBookings((prev) => {
      const next = prev.map((b) =>
        b.id === bookingId ? { ...b, date: newDate, timeSlot: newTimeSlot, rescheduledCount: (b.rescheduledCount || 0) + 1 } : b
      );
      saveToStorage(STORAGE_KEYS.BOOKINGS, next);
      return next;
    });
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      updateStationStatus(booking.stationId, "AVAILABLE");
    }
    updateBookingStatus(bookingId, "CANCELLED");
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveToStorage(STORAGE_KEYS.BOOKINGS, next);
      return next;
    });
  };

  const resetToDefault = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    setExperiences(EXPERIENCES);
    setGames(POPULAR_GAMES);
    setCafeItems(CAFE_ITEMS);
    setEvents(EVENT_PACKAGES);
    setStations(INITIAL_STATIONS);
    setPricingRules(INITIAL_PRICING_RULES);
    setPromoCodes(INITIAL_PROMO_CODES);
    setOnlineDiscount(INITIAL_ONLINE_DISCOUNT);
    setBookings(INITIAL_BOOKINGS);
  };

  return {
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
    loginUser,
    logoutUser,
    getAvailableStation,
    lockStation,
    calculatePrice,
    createBooking,
    rescheduleBooking,
    cancelBooking,
    calculateExperiencePrice,
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
    updateStationStatus,
    addPromoCode,
    deletePromoCode,
    updateOnlineDiscount,
    toggleStacking,
    updateBookingStatus,
    deleteBooking,
    resetToDefault,
  };
}
