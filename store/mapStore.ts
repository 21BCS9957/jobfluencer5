import { create } from "zustand";

/* ─── Types ─── */
export type Creator = {
  id: string;
  name: string;
  handle: string;
  followers: string;
  niche: string;
  avatar: string;
};

export type Campaign = {
  id: string;
  title: string;
  brand: string;
  budget: string;
  type: string;
  urgent?: boolean;
};

export type StateData = {
  id: string;
  name: string;
  capital: string;
  creatorsCount: number;
  campaignsCount: number;
  activity: "high" | "medium" | "low";
  creators: Creator[];
  campaigns: Campaign[];
};

type MapStore = {
  selectedState: string | null;
  hoveredState: string | null;
  panelTab: "campaigns" | "creators";
  setSelectedState: (id: string | null) => void;
  setHoveredState: (id: string | null) => void;
  setPanelTab: (tab: "campaigns" | "creators") => void;
};

export const useMapStore = create<MapStore>((set) => ({
  selectedState: null,
  hoveredState: null,
  panelTab: "campaigns",
  setSelectedState: (id) => set({ selectedState: id, panelTab: "campaigns" }),
  setHoveredState: (id) => set({ hoveredState: id }),
  setPanelTab: (tab) => set({ panelTab: tab }),
}));

/* ─── Mock Data ─── */
const AVATARS = ["🎬", "📸", "🎨", "✍️", "💡", "🎭", "🎤", "📱"];

function makeCreators(city: string, count: number): Creator[] {
  const niches = ["Fashion", "Tech", "Food", "Travel", "Fitness", "Beauty", "Finance", "Education"];
  const names = [
    "Aarav Sharma", "Priya Patel", "Rohan Mehta", "Ananya Gupta",
    "Vikram Singh", "Neha Reddy", "Arjun Nair", "Diya Iyer",
  ];
  return Array.from({ length: Math.min(count, 6) }, (_, i) => ({
    id: `${city}-c-${i}`,
    name: names[i % names.length],
    handle: `@${names[i % names.length].split(" ")[0].toLowerCase()}_${city.toLowerCase().slice(0, 3)}`,
    followers: `${(Math.floor(Math.random() * 900) + 100)}K`,
    niche: niches[i % niches.length],
    avatar: AVATARS[i % AVATARS.length],
  }));
}

function makeCampaigns(city: string, count: number): Campaign[] {
  const titles = [
    "Instagram Reel Campaign", "YouTube Review", "Brand Ambassador",
    "Product Launch", "Festival Campaign", "Lifestyle Collab",
  ];
  const brands = ["Myntra", "Swiggy", "PhonePe", "boAt", "Mamaearth", "Nykaa"];
  const types = ["Reel", "Story", "Video", "Post", "Live"];
  return Array.from({ length: Math.min(count, 6) }, (_, i) => ({
    id: `${city}-j-${i}`,
    title: titles[i % titles.length],
    brand: brands[i % brands.length],
    budget: `₹${Math.floor(Math.random() * 40 + 10)}K`,
    type: types[i % types.length],
    urgent: i < 2,
  }));
}

/* ─── State Data — IDs match @svg-maps/india ─── */
export const STATES_DATA: Record<string, StateData> = {
  dl: { id: "dl", name: "Delhi", capital: "New Delhi", creatorsCount: 320, campaignsCount: 85, activity: "high", creators: makeCreators("Delhi", 6), campaigns: makeCampaigns("Delhi", 6) },
  mh: { id: "mh", name: "Maharashtra", capital: "Mumbai", creatorsCount: 480, campaignsCount: 120, activity: "high", creators: makeCreators("Mumbai", 6), campaigns: makeCampaigns("Mumbai", 6) },
  ka: { id: "ka", name: "Karnataka", capital: "Bengaluru", creatorsCount: 290, campaignsCount: 72, activity: "high", creators: makeCreators("Bangalore", 6), campaigns: makeCampaigns("Bangalore", 6) },
  tg: { id: "tg", name: "Telangana", capital: "Hyderabad", creatorsCount: 220, campaignsCount: 58, activity: "high", creators: makeCreators("Hyderabad", 6), campaigns: makeCampaigns("Hyderabad", 6) },
  tn: { id: "tn", name: "Tamil Nadu", capital: "Chennai", creatorsCount: 210, campaignsCount: 55, activity: "medium", creators: makeCreators("Chennai", 6), campaigns: makeCampaigns("Chennai", 6) },
  wb: { id: "wb", name: "West Bengal", capital: "Kolkata", creatorsCount: 190, campaignsCount: 48, activity: "medium", creators: makeCreators("Kolkata", 6), campaigns: makeCampaigns("Kolkata", 6) },
  up: { id: "up", name: "Uttar Pradesh", capital: "Lucknow", creatorsCount: 180, campaignsCount: 42, activity: "medium", creators: makeCreators("Lucknow", 6), campaigns: makeCampaigns("Lucknow", 6) },
  gj: { id: "gj", name: "Gujarat", capital: "Ahmedabad", creatorsCount: 160, campaignsCount: 38, activity: "medium", creators: makeCreators("Ahmedabad", 6), campaigns: makeCampaigns("Ahmedabad", 6) },
  rj: { id: "rj", name: "Rajasthan", capital: "Jaipur", creatorsCount: 140, campaignsCount: 35, activity: "medium", creators: makeCreators("Jaipur", 6), campaigns: makeCampaigns("Jaipur", 6) },
  pb: { id: "pb", name: "Punjab", capital: "Chandigarh", creatorsCount: 110, campaignsCount: 28, activity: "medium", creators: makeCreators("Chandigarh", 6), campaigns: makeCampaigns("Chandigarh", 6) },
  ap: { id: "ap", name: "Andhra Pradesh", capital: "Amaravati", creatorsCount: 145, campaignsCount: 32, activity: "medium", creators: makeCreators("Vizag", 6), campaigns: makeCampaigns("Vizag", 6) },
  kl: { id: "kl", name: "Kerala", capital: "Thiruvananthapuram", creatorsCount: 130, campaignsCount: 30, activity: "medium", creators: makeCreators("Kerala", 6), campaigns: makeCampaigns("Kerala", 6) },
  mp: { id: "mp", name: "Madhya Pradesh", capital: "Bhopal", creatorsCount: 95, campaignsCount: 22, activity: "low", creators: makeCreators("Bhopal", 6), campaigns: makeCampaigns("Bhopal", 6) },
  hr: { id: "hr", name: "Haryana", capital: "Gurugram", creatorsCount: 90, campaignsCount: 20, activity: "low", creators: makeCreators("Gurugram", 6), campaigns: makeCampaigns("Gurugram", 6) },
  br: { id: "br", name: "Bihar", capital: "Patna", creatorsCount: 75, campaignsCount: 15, activity: "low", creators: makeCreators("Patna", 6), campaigns: makeCampaigns("Patna", 6) },
  or: { id: "or", name: "Odisha", capital: "Bhubaneswar", creatorsCount: 70, campaignsCount: 14, activity: "low", creators: makeCreators("Bhubaneswar", 6), campaigns: makeCampaigns("Bhubaneswar", 6) },
  jh: { id: "jh", name: "Jharkhand", capital: "Ranchi", creatorsCount: 50, campaignsCount: 10, activity: "low", creators: makeCreators("Ranchi", 6), campaigns: makeCampaigns("Ranchi", 6) },
  ct: { id: "ct", name: "Chhattisgarh", capital: "Raipur", creatorsCount: 45, campaignsCount: 8, activity: "low", creators: makeCreators("Raipur", 6), campaigns: makeCampaigns("Raipur", 6) },
  as: { id: "as", name: "Assam", capital: "Dispur", creatorsCount: 60, campaignsCount: 12, activity: "low", creators: makeCreators("Guwahati", 6), campaigns: makeCampaigns("Guwahati", 6) },
  ut: { id: "ut", name: "Uttarakhand", capital: "Dehradun", creatorsCount: 55, campaignsCount: 11, activity: "low", creators: makeCreators("Dehradun", 6), campaigns: makeCampaigns("Dehradun", 6) },
  hp: { id: "hp", name: "Himachal Pradesh", capital: "Shimla", creatorsCount: 40, campaignsCount: 8, activity: "low", creators: makeCreators("Shimla", 6), campaigns: makeCampaigns("Shimla", 6) },
  jk: { id: "jk", name: "Jammu & Kashmir", capital: "Srinagar", creatorsCount: 35, campaignsCount: 6, activity: "low", creators: makeCreators("Srinagar", 6), campaigns: makeCampaigns("Srinagar", 6) },
  ga: { id: "ga", name: "Goa", capital: "Panaji", creatorsCount: 85, campaignsCount: 25, activity: "medium", creators: makeCreators("Goa", 6), campaigns: makeCampaigns("Goa", 6) },
  sk: { id: "sk", name: "Sikkim", capital: "Gangtok", creatorsCount: 15, campaignsCount: 3, activity: "low", creators: makeCreators("Gangtok", 6), campaigns: makeCampaigns("Gangtok", 6) },
  mn: { id: "mn", name: "Manipur", capital: "Imphal", creatorsCount: 18, campaignsCount: 4, activity: "low", creators: makeCreators("Imphal", 6), campaigns: makeCampaigns("Imphal", 6) },
  ml: { id: "ml", name: "Meghalaya", capital: "Shillong", creatorsCount: 20, campaignsCount: 5, activity: "low", creators: makeCreators("Shillong", 6), campaigns: makeCampaigns("Shillong", 6) },
  mz: { id: "mz", name: "Mizoram", capital: "Aizawl", creatorsCount: 12, campaignsCount: 3, activity: "low", creators: makeCreators("Aizawl", 6), campaigns: makeCampaigns("Aizawl", 6) },
  nl: { id: "nl", name: "Nagaland", capital: "Kohima", creatorsCount: 14, campaignsCount: 3, activity: "low", creators: makeCreators("Kohima", 6), campaigns: makeCampaigns("Kohima", 6) },
  tr: { id: "tr", name: "Tripura", capital: "Agartala", creatorsCount: 16, campaignsCount: 4, activity: "low", creators: makeCreators("Agartala", 6), campaigns: makeCampaigns("Agartala", 6) },
  ar: { id: "ar", name: "Arunachal Pradesh", capital: "Itanagar", creatorsCount: 10, campaignsCount: 2, activity: "low", creators: makeCreators("Itanagar", 6), campaigns: makeCampaigns("Itanagar", 6) },
};
