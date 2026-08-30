export type PricingTier = "regular" | "peak" | "weekend";

export type DurationOption = {
  id: string;
  label: string;
  minutes: number;
};

export interface Experience {
  id: string;
  name: string;
  slug: string;
  type: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  hardware: string[];
  startingPrice: number;
  durationOptions: DurationOption[];
  pricing: {
    regular: Record<string, number>;
    peak: Record<string, number>;
    weekend: Record<string, number>;
  };
}

export interface GameItem {
  id: string;
  name: string;
  platform: "ps5" | "pc" | "vr" | "racing";
  platformLabel: string;
  genre: string;
  playerCount: string;
  image: string;
  rating: string;
  featured?: boolean;
}

export interface CafeItem {
  id: string;
  name: string;
  category: "food" | "drinks" | "snacks" | "combos";
  categoryLabel: string;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
}

export interface EventOption {
  id: string;
  title: string;
  description: string;
  capacity: string;
  startingPrice: number;
  priceUnit: string;
  features: string[];
  badge?: string;
}

export interface LocationInfo {
  name: string;
  tagline: string;
  addressLines: string[];
  city: string;
  pincode: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  mapsUrl: string;
}

// ---------------------------------------------------------------------------
// EXPERIENCES & DYNAMIC PRICING CONFIG
// ---------------------------------------------------------------------------

export const EXPERIENCES: Experience[] = [
  {
    id: "ps5",
    name: "PS5 Console Gaming",
    slug: "ps5-gaming",
    type: "Console Lounge",
    tagline: "4K 120Hz Couch Co-op and Solo Adventures",
    description:
      "Sony PlayStation 5 consoles with ultra-low latency 4K displays, DualSense wireless controllers with haptic feedback, and local multiplayer support for up to 4 players.",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop",
    badge: "Squad Favorite",
    hardware: ["Sony PlayStation 5", "DualSense Haptics", "55-inch 4K HDR 120Hz", "Pulse 3D Audio"],
    startingPrice: 120,
    durationOptions: [
      { id: "30m", label: "30 Minutes", minutes: 30 },
      { id: "1h", label: "1 Hour", minutes: 60 },
      { id: "2h", label: "2 Hours", minutes: 120 },
      { id: "3h", label: "3 Hours", minutes: 180 },
    ],
    pricing: {
      regular: {
        "30m": 70,
        "1h": 120,
        "2h": 220,
        "3h": 300,
      },
      peak: {
        "30m": 90,
        "1h": 150,
        "2h": 280,
        "3h": 390,
      },
      weekend: {
        "30m": 100,
        "1h": 160,
        "2h": 300,
        "3h": 420,
      },
    },
  },
  {
    id: "pc",
    name: "PC Battlestations",
    slug: "pc-gaming",
    type: "Esports Arena",
    tagline: "Competitive 360Hz High-FPS Rigs",
    description:
      "High-end esports battle stations powered by NVIDIA RTX 4080/4090 GPUs, Intel Core i9 processors, 360Hz tournament monitors, and low-latency mechanical gaming peripherals.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    badge: "Tournament Ready",
    hardware: [
      "NVIDIA GeForce RTX 4080",
      "360Hz 0.5ms Gaming Panel",
      "Optical-Mechanical Keyboard",
      "Hi-Res Spatial Headset",
    ],
    startingPrice: 120,
    durationOptions: [
      { id: "1h", label: "1 Hour", minutes: 60 },
      { id: "2h", label: "2 Hours", minutes: 120 },
      { id: "3h", label: "3 Hours Package", minutes: 180 },
      { id: "5h", label: "5 Hours Night Pass", minutes: 300 },
    ],
    pricing: {
      regular: {
        "1h": 120,
        "2h": 220,
        "3h": 240,
        "5h": 380,
      },
      peak: {
        "1h": 150,
        "2h": 280,
        "3h": 320,
        "5h": 480,
      },
      weekend: {
        "1h": 160,
        "2h": 300,
        "3h": 350,
        "5h": 520,
      },
    },
  },
  {
    id: "racing",
    name: "Racing Simulator Cockpits",
    slug: "racing-simulator",
    type: "Sim Racing Rig",
    tagline: "Direct-Drive Force Feedback and Load-Cell Pedals",
    description:
      "Professional sim racing rigs featuring direct-drive wheelbase motors, hydraulic load-cell pedals, sequential shifters, and triple-curved immersive surround displays.",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop",
    badge: "Direct Drive",
    hardware: [
      "Direct Drive Wheel Base",
      "Hydraulic Load-Cell Pedals",
      "Triple Curved Panoramic Display",
      "Bucket Race Seat",
    ],
    startingPrice: 150,
    durationOptions: [
      { id: "15m", label: "15 Min Sprint", minutes: 15 },
      { id: "30m", label: "30 Min Qualifying", minutes: 30 },
      { id: "1h", label: "1 Hour Grand Prix", minutes: 60 },
      { id: "2h", label: "2 Hours Endurance", minutes: 120 },
    ],
    pricing: {
      regular: {
        "15m": 50,
        "30m": 90,
        "1h": 150,
        "2h": 280,
      },
      peak: {
        "15m": 60,
        "30m": 110,
        "1h": 180,
        "2h": 340,
      },
      weekend: {
        "15m": 70,
        "30m": 120,
        "1h": 200,
        "2h": 380,
      },
    },
  },
  {
    id: "vr",
    name: "VR Immersion Pods",
    slug: "vr-immersion",
    type: "Virtual Reality",
    tagline: "6DoF Spatial Boundaries and 4K Per-Eye Clarity",
    description:
      "Room-scale virtual reality arena with 6 Degrees of Freedom tracking, dual 4K OLED optical displays, high-precision haptic touch controllers, and spatial 3D audio.",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?q=80&w=1000&auto=format&fit=crop",
    badge: "Spatial 6DoF",
    hardware: [
      "High-Resolution VR Headset",
      "Room-Scale Guardian Grid",
      "Precision Haptic Controllers",
      "3D Spatial Audio",
    ],
    startingPrice: 100,
    durationOptions: [
      { id: "30m", label: "30 Minutes Quick Dive", minutes: 30 },
      { id: "1h", label: "1 Hour Full Immersion", minutes: 60 },
      { id: "2h", label: "2 Hours Campaign", minutes: 120 },
    ],
    pricing: {
      regular: {
        "30m": 100,
        "1h": 150,
        "2h": 280,
      },
      peak: {
        "30m": 130,
        "1h": 190,
        "2h": 350,
      },
      weekend: {
        "30m": 140,
        "1h": 210,
        "2h": 380,
      },
    },
  },
];

// Helper to compute price dynamically
export function calculateExperiencePrice(
  experienceId: string,
  durationId: string,
  tier: PricingTier = "regular",
): number {
  const exp = EXPERIENCES.find((e) => e.id === experienceId);
  if (!exp) return 0;
  const tierPricing = exp.pricing[tier] || exp.pricing.regular;
  return tierPricing[durationId] ?? exp.startingPrice;
}

// ---------------------------------------------------------------------------
// POPULAR GAMES MOCK DATA (6-8 initially with filters)
// ---------------------------------------------------------------------------

export const POPULAR_GAMES: GameItem[] = [
  {
    id: "gta-v",
    name: "Grand Theft Auto V",
    platform: "pc",
    platformLabel: "PC / Online",
    genre: "Open World Action",
    playerCount: "1 - 30 Players",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    rating: "4.9",
    featured: true,
  },
  {
    id: "valorant",
    name: "Valorant",
    platform: "pc",
    platformLabel: "PC Battlestation",
    genre: "Tactical FPS",
    playerCount: "5v5 Squad",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    rating: "4.8",
    featured: true,
  },
  {
    id: "ea-fc-25",
    name: "EA SPORTS FC 25",
    platform: "ps5",
    platformLabel: "PS5 Console",
    genre: "Sports / Football",
    playerCount: "1 - 4 Players",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    rating: "4.9",
    featured: true,
  },
  {
    id: "cod-warzone",
    name: "Call of Duty: Warzone",
    platform: "pc",
    platformLabel: "PC Battlestation",
    genre: "Battle Royale",
    playerCount: "Squad 4-Player",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
    rating: "4.7",
    featured: true,
  },
  {
    id: "f1-24",
    name: "EA SPORTS F1 24",
    platform: "racing",
    platformLabel: "Sim Cockpit",
    genre: "Formula 1 Racing",
    playerCount: "Direct Drive Solo",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
    rating: "5.0",
    featured: true,
  },
  {
    id: "beat-saber",
    name: "Beat Saber",
    platform: "vr",
    platformLabel: "VR Pod",
    genre: "Rhythm & Precision",
    playerCount: "Room Scale Solo",
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop",
    rating: "4.9",
    featured: true,
  },
  {
    id: "mortal-kombat-1",
    name: "Mortal Kombat 1",
    platform: "ps5",
    platformLabel: "PS5 Console",
    genre: "Fighting / Versus",
    playerCount: "1v1 Head-to-Head",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    rating: "4.8",
  },
  {
    id: "assetto-corsa",
    name: "Assetto Corsa Competizione",
    platform: "racing",
    platformLabel: "Sim Cockpit",
    genre: "GT3 Sim Racing",
    playerCount: "Multiplayer Sim",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    rating: "4.9",
  },
];

// ---------------------------------------------------------------------------
// CAFE MENU ITEMS MOCK DATA
// ---------------------------------------------------------------------------

export const CAFE_ITEMS: CafeItem[] = [
  {
    id: "cold-brew",
    name: "Signature Cold Brew Coffee",
    category: "drinks",
    categoryLabel: "Beverages",
    price: 90,
    description: "Slow-steeped Arabica coffee served over ice for steady focus.",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop",
    popular: true,
  },
  {
    id: "monster-energy",
    name: "Monster Energy Chilled Can",
    category: "drinks",
    categoryLabel: "Energy Drinks",
    price: 120,
    description: "Chilled energy booster for fast twitch reflexes.",
    image:
      "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=600&auto=format&fit=crop",
    popular: true,
  },
  {
    id: "crispy-loaded-fries",
    name: "Loaded Peri-Peri Fries",
    category: "snacks",
    categoryLabel: "Hot Snacks",
    price: 130,
    description: "Crispy skin-on potato fries tossed in fiery Peri-Peri seasoning with melted dip.",
    image:
      "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=600&auto=format&fit=crop",
    popular: true,
  },
  {
    id: "paneer-tikka-sandwich",
    name: "Grilled Paneer Melt Sandwich",
    category: "food",
    categoryLabel: "Meals",
    price: 150,
    description: "Spiced cottage cheese, roasted bell peppers, and melted cheese on sourdough.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop",
    popular: true,
  },
  {
    id: "squad-gaming-combo",
    name: "Squad Gaming Combo Box",
    category: "combos",
    categoryLabel: "Value Combos",
    price: 299,
    description: "2 Signature Beverages, Large Loaded Fries, Gourmet Snack Platter.",
    image:
      "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=600&auto=format&fit=crop",
    popular: true,
  },
  {
    id: "classic-hot-chocolate",
    name: "Belgian Hot Chocolate",
    category: "drinks",
    categoryLabel: "Beverages",
    price: 110,
    description: "Rich dark Belgian cocoa steamed with creamy whole milk.",
    image:
      "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=600&auto=format&fit=crop",
  },
];

// ---------------------------------------------------------------------------
// EVENTS & GROUP PACKAGES MOCK DATA
// ---------------------------------------------------------------------------

export const EVENT_PACKAGES: EventOption[] = [
  {
    id: "tournaments",
    title: "Esports & LAN Tournaments",
    description:
      "Organized esports brackets, spectator casting displays, live stream setups, and official tournament moderation.",
    capacity: "Up to 32 Players",
    startingPrice: 1999,
    priceUnit: "Tournament Bracket",
    features: [
      "Custom tournament bracket management",
      "Dedicated high-FPS tournament rigs",
      "Shoutcaster and spectator monitor feeds",
      "Prize ceremony podium and digital certificates",
    ],
    badge: "Competitive",
  },
  {
    id: "birthdays",
    title: "Birthday & Squad Parties",
    description:
      "Celebrate your special day with unlimited gaming across PS5, PC, VR, and Racing with café food and drink combos included.",
    capacity: "4 to 20 Guests",
    startingPrice: 2499,
    priceUnit: "Party Package",
    features: [
      "Reserved VIP Lounge zone for squad",
      "Full access to PS5, PC and VR setups",
      "Complimentary café snack platters and drinks",
      "Personal lounge coordinator support",
    ],
    badge: "Celebration",
  },
  {
    id: "corporate-college",
    title: "Corporate & College LAN Events",
    description:
      "High-energy team building sessions, intra-college gaming fests, and corporate rivalry showdowns.",
    capacity: "10 to 40 People",
    startingPrice: 4999,
    priceUnit: "Half-Day Arena Hire",
    features: [
      "Full or partial arena reservation",
      "Team-based multiplayer tournaments",
      "Custom beverage and catering service",
      "Branded scoreboards and digital leaderboards",
    ],
    badge: "Enterprise",
  },
];

// ---------------------------------------------------------------------------
// LOCATION & CONTACT DETAILS
// ---------------------------------------------------------------------------

export const LOCATION_CONFIG: LocationInfo = {
  name: "Ace Forge Gaming Lounge",
  tagline: "Ahmedabad Premier Esports and Console Destination",
  addressLines: [
    "B-202, Second Floor, Money Plant High Street",
    "Jagatpur Road, Near SG Highway",
    "Gota / Jagatpur",
  ],
  city: "Ahmedabad, Gujarat",
  pincode: "382481",
  phone: "+91 98765 43210",
  phoneRaw: "9876543210",
  whatsapp: "+91 98765 43210",
  whatsappRaw: "919876543210",
  email: "hello@aceforgearena.com",
  hours: {
    weekdays: "11:00 AM - 11:00 PM",
    weekends: "10:00 AM - 12:00 AM Midnight",
  },
  mapsUrl: "https://maps.google.com/?q=Money+Plant+High+Street+Jagatpur+Road+SG+Highway+Ahmedabad",
};
