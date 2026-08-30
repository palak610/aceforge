/** All Ace Forge Arena content lives here — edit prices, games and plans in one place. */

export type PriceCard = {
  id: string;
  name: string;
  price: string;
  unit: string;
  was?: string;
  extra?: string;
  badge?: string;
};

export const PRICE_LIST: PriceCard[] = [
  {
    id: "ps5",
    name: "PS5",
    price: "₹120",
    unit: "/ Hour",
    was: "₹150 / Hour",
    badge: "Discount Price",
  },
  {
    id: "racing",
    name: "Racing Cockpit",
    price: "₹150",
    unit: "/ Hour",
    was: "₹200 / Hour",
    badge: "Discount Price",
  },
  {
    id: "vr",
    name: "VR Experience",
    price: "₹150",
    unit: "/ Hour",
    extra: "₹100 / 30 Min Special Session",
  },
  {
    id: "pc",
    name: "High-End PC",
    price: "₹100",
    unit: "/ Hour",
    was: "₹120 / Hour",
    extra: "₹240 / 3 Hours Special Session",
    badge: "Discount Price",
  },
];

export type Plan = {
  price: string;
  hours: string;
  free: string;
  note: string;
  popular?: boolean;
};

export const PS5_PLANS: Plan[] = [
  { price: "₹1,200", hours: "10 Hours", free: "+2 Hours Free", note: "₹120 × 10" },
  { price: "₹2,400", hours: "20 Hours", free: "+5 Hours Free", note: "₹120 × 20", popular: true },
  { price: "₹3,600", hours: "30 Hours", free: "+8 Hours Free", note: "₹120 × 30" },
];

export const PC_PLANS: Plan[] = [
  { price: "₹1,000", hours: "10 Hours", free: "+3 Hours Free", note: "₹100 × 10" },
  { price: "₹2,000", hours: "20 Hours", free: "+8 Hours Free", note: "₹100 × 20", popular: true },
  { price: "₹3,000", hours: "30 Hours", free: "+13 Hours Free", note: "₹100 × 30" },
];

export type Game = { name: string; genre: string; hero?: boolean; image?: string };

export const PC_GAMES: Game[] = [
  {
    name: "Valorant",
    genre: "Tactical FPS",
    hero: true,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "GTA V",
    genre: "Open World",
    hero: true,
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Call of Duty: Modern Warfare 3",
    genre: "Warfare FPS",
    hero: true,
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Counter-Strike 2",
    genre: "Competitive FPS",
    hero: true,
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Battlefield 6",
    genre: "Large-Scale FPS",
    image:
      "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "DOTA 2",
    genre: "MOBA",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "PUBG",
    genre: "Battle Royale",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Pacify",
    genre: "Co-op Horror",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Human Fall Flat",
    genre: "Co-op Physics",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Chained Together",
    genre: "Co-op Platformer",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Getting Over It",
    genre: "Rage Platformer",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "REPO",
    genre: "Co-op Horror",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Roblox",
    genre: "Sandbox",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Freedom Fighters 2",
    genre: "Action Shooter",
    image:
      "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop",
  },
];

export const PS5_SINGLE: Game[] = [
  {
    name: "Resident Evil 9",
    genre: "Survival Horror",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Fortnite",
    genre: "Battle Royale",
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Black Myth: Wukong",
    genre: "Action RPG",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Marvel's Spider-Man: Miles Morales",
    genre: "Action Adventure",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Red Dead Redemption II",
    genre: "Open World",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Marvel's Spider-Man Remastered",
    genre: "Action Adventure",
    image:
      "https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Little Nightmares II",
    genre: "Puzzle Horror",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "GTA V",
    genre: "Open World",
    image:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "God of War Ragnarök",
    genre: "Action Adventure",
    image:
      "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ghost of Tsushima",
    genre: "Open World",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687990d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Marvel's Spider-Man 2",
    genre: "Action Adventure",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "The Last of Us Part II",
    genre: "Action Survival",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Uncharted: Lost Legacy",
    genre: "Adventure",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Uncharted: A Thief's End",
    genre: "Adventure",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Resident Evil Village (VR)",
    genre: "VR Horror",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Splitgate",
    genre: "Arena FPS",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Cyberpunk 2077",
    genre: "Open World RPG",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ghost of Yotei",
    genre: "Open World",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687990d?q=80&w=800&auto=format&fit=crop",
  },
];

export const PS5_MULTI: Game[] = [
  {
    name: "Tekken 8",
    genre: "Fighting",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mortal Kombat 11",
    genre: "Fighting",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mortal Kombat 1",
    genre: "Fighting",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Asphalt",
    genre: "Arcade Racing",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "It Takes Two",
    genre: "Co-op Adventure",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Unravel Two",
    genre: "Co-op Puzzle",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "FC 26",
    genre: "Football",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Cricket 26 (C26)",
    genre: "Cricket",
    image:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Split Fiction",
    genre: "Co-op Adventure",
    image:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "UFC 5",
    genre: "Combat Sports",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "WWE 2K26",
    genre: "Wrestling",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "A Way Out",
    genre: "Co-op Story",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop",
  },
];

export const RACING_GAMES = ["F1", "Forza Horizon 5", "Gran Turismo 7"];
export const VR_GAMES = ["I Am Security", "Cricket", "First Hand", "Boxing"];

export const ZONES = [
  { name: "PC Zone", detail: "High-end battlestations", tag: "// 01" },
  { name: "PS5 Zone", detail: "Big-screen console bays", tag: "// 02" },
  { name: "Racing Zone", detail: "2 full racing cockpits", tag: "// 03" },
  { name: "VR Zone", detail: "1 room-scale VR station", tag: "// 04" },
  { name: "Lounge", detail: "Chill, queue up, respawn", tag: "// 05" },
  { name: "Food & Beverages", detail: "Fuel between matches", tag: "// 06" },
];

export const FOOD = ["Snacks", "Fries", "Sandwiches", "Milkshakes", "Beverages", "Energy Drinks"];

export const ADDRESS = {
  name: "Ace Forge Arena",
  lines: ["Money Plant High Street", "Jagatpur Road, SG Highway", "Ahmedabad, Gujarat"],
};

export const CONTACT = {
  phone: "9274745757",
  phoneDisplay: "92747 45757",
  phoneHref: "tel:+919274745757",
  instagram: "@aceforgearena",
  instagramHref: "https://www.instagram.com/aceforgearena",
  whatsappHref: "https://wa.me/919274745757",
};

export const SERVICES = ["High End PC", "PS5", "VR", "Racing Cockpit"];
