"use client";

import { create } from "zustand";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type DashboardTab =
  | "dashboard"
  | "messages"
  | "my-jobs"
  | "explore"
  | "profile"
  | "settings";

export type JobStatus = "applied" | "accepted" | "completed";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  brandName: string;
  brandAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
  messages: Message[];
}

export interface Job {
  id: string;
  brandName: string;
  brandAvatar: string;
  title: string;
  description: string;
  platform: string;
  niche: string;
  location: string;
  budget: string;
  status: JobStatus;
  postedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: "freelancer";
  avatar: string;
  bio: string;
  categories: string[];
  socialLinks: { platform: string; url: string }[];
  profileViews: number;
}

/* ------------------------------------------------------------------ */
/* Mock Data                                                           */
/* ------------------------------------------------------------------ */

const MOCK_PROFILE: UserProfile = {
  id: "u1",
  name: "Satyam Tripathi",
  role: "freelancer",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  bio: "Content creator & social media strategist specializing in fashion and lifestyle brands. 5+ years of experience creating viral Instagram reels and YouTube shorts.",
  categories: ["Fashion", "Lifestyle", "Photography"],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/satyam" },
    { platform: "YouTube", url: "https://youtube.com/@satyam" },
  ],
  profileViews: 1247,
};

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    brandName: "Nike India",
    brandAvatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
    lastMessage: "Looking forward to the content deliverables",
    lastTimestamp: "2 min ago",
    unread: 2,
    messages: [
      { id: "m1", senderId: "brand", text: "Hi! We loved your portfolio", timestamp: "10:30 AM", isOwn: false },
      { id: "m2", senderId: "me", text: "Thank you! I'd love to collaborate with Nike", timestamp: "10:32 AM", isOwn: true },
      { id: "m3", senderId: "brand", text: "Great! We have an upcoming campaign for Air Max", timestamp: "10:35 AM", isOwn: false },
      { id: "m4", senderId: "me", text: "That sounds exciting! What's the timeline?", timestamp: "10:38 AM", isOwn: true },
      { id: "m5", senderId: "brand", text: "We're looking at 2 weeks for the reels. Budget is ₹50K per reel", timestamp: "10:40 AM", isOwn: false },
      { id: "m6", senderId: "brand", text: "Looking forward to the content deliverables", timestamp: "10:42 AM", isOwn: false },
    ],
  },
  {
    id: "c2",
    brandName: "Myntra",
    brandAvatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop",
    lastMessage: "Can you share your rate card?",
    lastTimestamp: "1 hr ago",
    unread: 1,
    messages: [
      { id: "m7", senderId: "brand", text: "Hey! We're planning our summer collection campaign", timestamp: "9:15 AM", isOwn: false },
      { id: "m8", senderId: "me", text: "Sounds interesting! Tell me more", timestamp: "9:20 AM", isOwn: true },
      { id: "m9", senderId: "brand", text: "Can you share your rate card?", timestamp: "9:25 AM", isOwn: false },
    ],
  },
  {
    id: "c3",
    brandName: "Boat Lifestyle",
    brandAvatar: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    lastMessage: "Campaign completed! Payment processed ✅",
    lastTimestamp: "Yesterday",
    unread: 0,
    messages: [
      { id: "m10", senderId: "brand", text: "All deliverables received. Amazing work!", timestamp: "Yesterday", isOwn: false },
      { id: "m11", senderId: "me", text: "Thank you so much! Was a great experience", timestamp: "Yesterday", isOwn: true },
      { id: "m12", senderId: "brand", text: "Campaign completed! Payment processed ✅", timestamp: "Yesterday", isOwn: false },
    ],
  },
  {
    id: "c4",
    brandName: "Zara",
    brandAvatar: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=80&h=80&fit=crop",
    lastMessage: "Let's schedule a call this week",
    lastTimestamp: "2 days ago",
    unread: 0,
    messages: [
      { id: "m13", senderId: "brand", text: "We'd love to discuss a long-term partnership", timestamp: "2 days ago", isOwn: false },
      { id: "m14", senderId: "me", text: "Absolutely! I'm interested", timestamp: "2 days ago", isOwn: true },
      { id: "m15", senderId: "brand", text: "Let's schedule a call this week", timestamp: "2 days ago", isOwn: false },
    ],
  },
];

const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    brandName: "Nike India",
    brandAvatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
    title: "Instagram Reels for Air Max Campaign",
    description: "Create 3 engaging reels showcasing the new Air Max collection. Focus on lifestyle and street fashion.",
    platform: "Instagram",
    niche: "Fashion",
    location: "Delhi",
    budget: "₹1,50,000",
    status: "accepted",
    postedAt: "2 days ago",
  },
  {
    id: "j2",
    brandName: "Myntra",
    brandAvatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop",
    title: "Summer Collection UGC Content",
    description: "Produce authentic UGC content for the upcoming summer collection launch.",
    platform: "Instagram",
    niche: "Fashion",
    location: "Mumbai",
    budget: "₹75,000",
    status: "applied",
    postedAt: "5 days ago",
  },
  {
    id: "j3",
    brandName: "Boat Lifestyle",
    brandAvatar: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
    title: "YouTube Shorts for Wireless Earbuds",
    description: "Create 5 YouTube Shorts highlighting the new wireless earbuds features.",
    platform: "YouTube",
    niche: "Tech",
    location: "Bangalore",
    budget: "₹2,00,000",
    status: "completed",
    postedAt: "2 weeks ago",
  },
];

const MOCK_EXPLORE_JOBS: Job[] = [
  {
    id: "e1",
    brandName: "Puma India",
    brandAvatar: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=80&h=80&fit=crop",
    title: "Fitness Influencer for Running Campaign",
    description: "Looking for fitness creators to promote new running shoes through reels and stories.",
    platform: "Instagram",
    niche: "Fitness",
    location: "Delhi",
    budget: "₹80,000",
    status: "applied",
    postedAt: "1 day ago",
  },
  {
    id: "e2",
    brandName: "Nykaa",
    brandAvatar: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop",
    title: "Beauty Creator for Product Reviews",
    description: "Create honest, engaging product review videos for our new skincare line.",
    platform: "YouTube",
    niche: "Beauty",
    location: "Mumbai",
    budget: "₹1,20,000",
    status: "applied",
    postedAt: "3 days ago",
  },
  {
    id: "e3",
    brandName: "Swiggy",
    brandAvatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop",
    title: "Food Content Creator for Campaign",
    description: "We need food bloggers to create mouth-watering content for our new restaurant partners.",
    platform: "Instagram",
    niche: "Food",
    location: "Bangalore",
    budget: "₹60,000",
    status: "applied",
    postedAt: "5 days ago",
  },
  {
    id: "e4",
    brandName: "Apple India",
    brandAvatar: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=80&h=80&fit=crop",
    title: "Tech Reviewer for iPhone Campaign",
    description: "Looking for established tech reviewers to create detailed, cinematic reviews.",
    platform: "YouTube",
    niche: "Tech",
    location: "Remote",
    budget: "₹3,00,000",
    status: "applied",
    postedAt: "1 week ago",
  },
  {
    id: "e5",
    brandName: "H&M",
    brandAvatar: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop",
    title: "Fashion Photographer for Lookbook",
    description: "Professional product and lifestyle photography for our new seasonal collection.",
    platform: "Instagram",
    niche: "Fashion",
    location: "Jaipur",
    budget: "₹90,000",
    status: "applied",
    postedAt: "4 days ago",
  },
  {
    id: "e6",
    brandName: "OnePlus",
    brandAvatar: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=80&h=80&fit=crop",
    title: "TikTok Creator for Phone Launch",
    description: "Create trending TikTok videos to build hype around our new phone launch.",
    platform: "TikTok",
    niche: "Tech",
    location: "Hyderabad",
    budget: "₹1,00,000",
    status: "applied",
    postedAt: "6 days ago",
  },
];

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

interface DashboardState {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;

  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;

  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversation: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;

  myJobs: Job[];
  exploreJobs: Job[];

  stats: {
    activeJobs: number;
    unreadMessages: number;
    profileViews: number;
    earnings: string;
  };

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  activeTab: "dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),

  profile: MOCK_PROFILE,
  updateProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),

  conversations: MOCK_CONVERSATIONS,
  activeConversationId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  sendMessage: (conversationId, text) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text,
              lastTimestamp: "Just now",
              messages: [
                ...c.messages,
                {
                  id: `m${Date.now()}`,
                  senderId: "me",
                  text,
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  isOwn: true,
                },
              ],
            }
          : c
      ),
    })),

  myJobs: MOCK_JOBS,
  exploreJobs: MOCK_EXPLORE_JOBS,

  stats: {
    activeJobs: MOCK_JOBS.filter((j) => j.status === "accepted").length,
    unreadMessages: MOCK_CONVERSATIONS.reduce((acc, c) => acc + c.unread, 0),
    profileViews: MOCK_PROFILE.profileViews,
    earnings: "₹4,25,000",
  },

  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
