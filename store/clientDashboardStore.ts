"use client";

import { create } from "zustand";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ClientDashboardTab =
  | "dashboard"
  | "post-job"
  | "campaigns"
  | "applications"
  | "messages"
  | "payments"
  | "settings";

export type CampaignStatus = "open" | "in_progress" | "completed" | "closed";
export type ApplicationStatus = "pending" | "accepted" | "rejected";
export type EscrowStatus = "pending" | "in_escrow" | "released" | "disputed";

export interface ClientProfile {
  id: string;
  name: string;
  role: "client";
  avatar: string;
  company: string;
  email: string;
  bio: string;
  industry: string;
  website: string;
}

export interface Campaign {
  id: string;
  clientId: string;
  title: string;
  description: string;
  platform: string;
  niche: string;
  city: string;
  budget: string;
  budgetNum: number;
  status: CampaignStatus;
  applicantCount: number;
  createdAt: string;
}

export interface Applicant {
  id: string;
  jobId: string;
  freelancerId: string;
  name: string;
  avatar: string;
  bidAmount: string;
  bidNum: number;
  proposal: string;
  portfolio: string[];
  timeline: string;
  rating: number;
  completedJobs: number;
  categories: string[];
  status: ApplicationStatus;
  appliedAt: string;
}

export interface ClientMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface ClientConversation {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
  campaignTitle: string;
  messages: ClientMessage[];
}

export interface EscrowPayment {
  id: string;
  jobId: string;
  campaignTitle: string;
  creatorName: string;
  creatorAvatar: string;
  amount: string;
  amountNum: number;
  status: EscrowStatus;
  createdAt: string;
  releasedAt: string | null;
}

/* ------------------------------------------------------------------ */
/* Mock Data                                                           */
/* ------------------------------------------------------------------ */

const MOCK_CLIENT_PROFILE: ClientProfile = {
  id: "client-1",
  name: "Arjun Mehta",
  role: "client",
  avatar:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
  company: "Luxe Brands India",
  email: "arjun@luxebrands.in",
  bio: "Leading lifestyle and fashion brand conglomerate. Partnering with top creators across India for authentic storytelling and digital-first campaigns.",
  industry: "Fashion & Lifestyle",
  website: "https://luxebrands.in",
};

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-1",
    clientId: "client-1",
    title: "Instagram Reels for Summer Fashion Drop",
    description:
      "We need 5 high-energy Instagram reels showcasing our summer 2026 collection. Focus on street style, urban aesthetics, and Gen-Z appeal. Each reel should be 30-60 seconds.",
    platform: "Instagram",
    niche: "Fashion",
    city: "Mumbai",
    budget: "₹2,50,000",
    budgetNum: 250000,
    status: "open",
    applicantCount: 12,
    createdAt: "2 days ago",
  },
  {
    id: "camp-2",
    clientId: "client-1",
    title: "YouTube Review Series — Premium Skincare",
    description:
      "Looking for beauty creators to produce a 3-part YouTube review series for our new skincare line. Authentic, unscripted reviews with before/after segments.",
    platform: "YouTube",
    niche: "Beauty",
    city: "Delhi",
    budget: "₹4,00,000",
    budgetNum: 400000,
    status: "in_progress",
    applicantCount: 8,
    createdAt: "1 week ago",
  },
  {
    id: "camp-3",
    clientId: "client-1",
    title: "UGC Content for Running Shoe Launch",
    description:
      "Need UGC creators for our new running shoe line. Real people, real workouts, authentic content.",
    platform: "Instagram",
    niche: "Fitness",
    city: "Bangalore",
    budget: "₹1,80,000",
    budgetNum: 180000,
    status: "completed",
    applicantCount: 20,
    createdAt: "3 weeks ago",
  },
  {
    id: "camp-4",
    clientId: "client-1",
    title: "TikTok Creators for Streetwear Hype Campaign",
    description:
      "Building hype for our streetwear collaboration. Need 3 TikTok creators with a strong following in street fashion.",
    platform: "TikTok",
    niche: "Fashion",
    city: "Hyderabad",
    budget: "₹1,20,000",
    budgetNum: 120000,
    status: "open",
    applicantCount: 5,
    createdAt: "1 day ago",
  },
];

const MOCK_APPLICANTS: Applicant[] = [
  {
    id: "app-1",
    jobId: "camp-1",
    freelancerId: "f1",
    name: "Priya Sharma",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    bidAmount: "₹45,000",
    bidNum: 45000,
    proposal:
      "I've been creating fashion reels for 3 years with an average of 500K views per reel. I specialize in street style and urban fashion content. I can deliver all 5 reels within 10 days with professional editing and trending audio.",
    portfolio: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    ],
    timeline: "10 days",
    rating: 4.9,
    completedJobs: 47,
    categories: ["Fashion", "Lifestyle", "Photography"],
    status: "pending",
    appliedAt: "1 day ago",
  },
  {
    id: "app-2",
    jobId: "camp-1",
    freelancerId: "f2",
    name: "Rahul Verma",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bidAmount: "₹38,000",
    bidNum: 38000,
    proposal:
      "As a professional videographer with 5+ years in fashion content, I bring cinematic quality to every reel. My work has been featured by major fashion brands including H&M and Zara India.",
    portfolio: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    ],
    timeline: "14 days",
    rating: 4.7,
    completedJobs: 32,
    categories: ["Fashion", "Videography", "Editing"],
    status: "pending",
    appliedAt: "2 days ago",
  },
  {
    id: "app-3",
    jobId: "camp-1",
    freelancerId: "f3",
    name: "Anisha Patel",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    bidAmount: "₹52,000",
    bidNum: 52000,
    proposal:
      "I have 1.2M followers on Instagram and my reels consistently hit 1M+ views. I'll bring my audience and creative vision to your summer collection. Premium quality with a quick turnaround.",
    portfolio: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=400",
    ],
    timeline: "7 days",
    rating: 4.8,
    completedJobs: 63,
    categories: ["Fashion", "Lifestyle", "Influencer"],
    status: "pending",
    appliedAt: "6 hours ago",
  },
  {
    id: "app-4",
    jobId: "camp-2",
    freelancerId: "f4",
    name: "Kavya Nair",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    bidAmount: "₹1,20,000",
    bidNum: 120000,
    proposal:
      "Beauty content is my passion. With 800K YouTube subscribers, I create in-depth skincare reviews that viewers trust. I'll deliver authentic, high-production reviews with detailed before/after documentation.",
    portfolio: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
    ],
    timeline: "21 days",
    rating: 4.9,
    completedJobs: 28,
    categories: ["Beauty", "Skincare", "YouTube"],
    status: "accepted",
    appliedAt: "5 days ago",
  },
  {
    id: "app-5",
    jobId: "camp-2",
    freelancerId: "f5",
    name: "Deepak Kumar",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    bidAmount: "₹95,000",
    bidNum: 95000,
    proposal:
      "I've reviewed 200+ skincare products on my channel. My audience trusts my honest opinions. I can create cinematic review content with professional lighting and editing.",
    portfolio: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
    ],
    timeline: "18 days",
    rating: 4.5,
    completedJobs: 19,
    categories: ["Beauty", "Tech Reviews", "YouTube"],
    status: "rejected",
    appliedAt: "6 days ago",
  },
  {
    id: "app-6",
    jobId: "camp-4",
    freelancerId: "f6",
    name: "Aditya Rao",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bidAmount: "₹35,000",
    bidNum: 35000,
    proposal:
      "Streetwear is my thing! 400K TikTok followers, consistently viral content. I know the hype culture inside out and can create content that resonates with the streetwear community.",
    portfolio: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400",
    ],
    timeline: "5 days",
    rating: 4.6,
    completedJobs: 15,
    categories: ["Fashion", "Streetwear", "TikTok"],
    status: "pending",
    appliedAt: "12 hours ago",
  },
];

const MOCK_CLIENT_CONVERSATIONS: ClientConversation[] = [
  {
    id: "cc1",
    creatorName: "Kavya Nair",
    creatorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    lastMessage: "I'll start shooting the first review tomorrow!",
    lastTimestamp: "5 min ago",
    unread: 2,
    campaignTitle: "YouTube Review Series — Premium Skincare",
    messages: [
      {
        id: "cm1",
        senderId: "client",
        text: "Welcome aboard, Kavya! Excited to work with you.",
        timestamp: "10:00 AM",
        isOwn: true,
      },
      {
        id: "cm2",
        senderId: "f4",
        text: "Thank you so much! I've already started planning the content structure.",
        timestamp: "10:05 AM",
        isOwn: false,
      },
      {
        id: "cm3",
        senderId: "client",
        text: "Perfect. We'll send the product samples to your address today.",
        timestamp: "10:10 AM",
        isOwn: true,
      },
      {
        id: "cm4",
        senderId: "f4",
        text: "I'll start shooting the first review tomorrow!",
        timestamp: "10:15 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: "cc2",
    creatorName: "Priya Sharma",
    creatorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    lastMessage: "Here's my revised creative brief for the reels",
    lastTimestamp: "1 hr ago",
    unread: 1,
    campaignTitle: "Instagram Reels for Summer Fashion Drop",
    messages: [
      {
        id: "cm5",
        senderId: "f1",
        text: "Hi! I'd love to discuss the creative direction for the summer campaign.",
        timestamp: "9:00 AM",
        isOwn: false,
      },
      {
        id: "cm6",
        senderId: "client",
        text: "Sure! We're going for a vibrant, Gen-Z aesthetic.",
        timestamp: "9:15 AM",
        isOwn: true,
      },
      {
        id: "cm7",
        senderId: "f1",
        text: "Here's my revised creative brief for the reels",
        timestamp: "9:30 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: "cc3",
    creatorName: "Aditya Rao",
    creatorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    lastMessage: "Sounds great, let's finalize the brief",
    lastTimestamp: "Yesterday",
    unread: 0,
    campaignTitle: "TikTok Creators for Streetwear",
    messages: [
      {
        id: "cm8",
        senderId: "client",
        text: "Hey Aditya, loved your portfolio! Would you be interested in our streetwear campaign?",
        timestamp: "Yesterday",
        isOwn: true,
      },
      {
        id: "cm9",
        senderId: "f6",
        text: "Absolutely! Streetwear is my thing.",
        timestamp: "Yesterday",
        isOwn: false,
      },
      {
        id: "cm10",
        senderId: "f6",
        text: "Sounds great, let's finalize the brief",
        timestamp: "Yesterday",
        isOwn: false,
      },
    ],
  },
];

const MOCK_ESCROW_PAYMENTS: EscrowPayment[] = [
  {
    id: "esc-1",
    jobId: "camp-2",
    campaignTitle: "YouTube Review Series — Premium Skincare",
    creatorName: "Kavya Nair",
    creatorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    amount: "₹1,20,000",
    amountNum: 120000,
    status: "in_escrow",
    createdAt: "5 days ago",
    releasedAt: null,
  },
  {
    id: "esc-2",
    jobId: "camp-3",
    campaignTitle: "UGC Content for Running Shoe Launch",
    creatorName: "Ravi Singh",
    creatorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    amount: "₹1,80,000",
    amountNum: 180000,
    status: "released",
    createdAt: "3 weeks ago",
    releasedAt: "1 week ago",
  },
  {
    id: "esc-3",
    jobId: "camp-1",
    campaignTitle: "Instagram Reels for Summer Fashion Drop",
    creatorName: "Priya Sharma",
    creatorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    amount: "₹45,000",
    amountNum: 45000,
    status: "pending",
    createdAt: "Just now",
    releasedAt: null,
  },
];

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

interface ClientDashboardState {
  activeTab: ClientDashboardTab;
  setActiveTab: (tab: ClientDashboardTab) => void;

  profile: ClientProfile;
  updateProfile: (data: Partial<ClientProfile>) => void;

  campaigns: Campaign[];
  selectedCampaignId: string | null;
  setSelectedCampaign: (id: string | null) => void;

  applicants: Applicant[];
  selectedApplicantId: string | null;
  filterCampaignId: string | null;
  setSelectedApplicant: (id: string | null) => void;
  setFilterCampaign: (id: string | null) => void;
  updateApplicationStatus: (
    applicantId: string,
    status: ApplicationStatus
  ) => void;
  getApplicantsForCampaign: (campaignId: string) => Applicant[];

  conversations: ClientConversation[];
  activeConversationId: string | null;
  setActiveConversation: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;

  escrowPayments: EscrowPayment[];
  releasePayment: (paymentId: string) => void;

  stats: {
    activeCampaigns: number;
    totalApplications: number;
    unreadMessages: number;
    fundsInEscrow: string;
    fundsInEscrowNum: number;
  };

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Post Job flow
  postJobDraft: {
    title: string;
    description: string;
    platform: string;
    niche: string;
    city: string;
    budget: string;
  };
  updatePostJobDraft: (
    data: Partial<ClientDashboardState["postJobDraft"]>
  ) => void;
  publishJob: () => void;
  resetPostJobDraft: () => void;
}

function computeStats(
  campaigns: Campaign[],
  applicants: Applicant[],
  conversations: ClientConversation[],
  escrowPayments: EscrowPayment[]
) {
  const activeCampaigns = campaigns.filter(
    (c) => c.status === "open" || c.status === "in_progress"
  ).length;
  const totalApplications = applicants.filter(
    (a) => a.status === "pending"
  ).length;
  const unreadMessages = conversations.reduce((a, c) => a + c.unread, 0);
  const fundsInEscrowNum = escrowPayments
    .filter((p) => p.status === "in_escrow")
    .reduce((a, p) => a + p.amountNum, 0);

  return {
    activeCampaigns,
    totalApplications,
    unreadMessages,
    fundsInEscrow: `₹${fundsInEscrowNum.toLocaleString("en-IN")}`,
    fundsInEscrowNum,
  };
}

export const useClientDashboardStore = create<ClientDashboardState>(
  (set, get) => ({
    activeTab: "dashboard",
    setActiveTab: (tab) => set({ activeTab: tab }),

    profile: MOCK_CLIENT_PROFILE,
    updateProfile: (data) =>
      set((state) => ({ profile: { ...state.profile, ...data } })),

    campaigns: MOCK_CAMPAIGNS,
    selectedCampaignId: null,
    setSelectedCampaign: (id) => set({ selectedCampaignId: id }),

    applicants: MOCK_APPLICANTS,
    selectedApplicantId: null,
    filterCampaignId: null,
    setSelectedApplicant: (id) => set({ selectedApplicantId: id }),
    setFilterCampaign: (id) => set({ filterCampaignId: id }),
    updateApplicationStatus: (applicantId, status) =>
      set((state) => ({
        applicants: state.applicants.map((a) =>
          a.id === applicantId ? { ...a, status } : a
        ),
      })),
    getApplicantsForCampaign: (campaignId) =>
      get().applicants.filter((a) => a.jobId === campaignId),

    conversations: MOCK_CLIENT_CONVERSATIONS,
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
                    id: `cm${Date.now()}`,
                    senderId: "client",
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

    escrowPayments: MOCK_ESCROW_PAYMENTS,
    releasePayment: (paymentId) =>
      set((state) => ({
        escrowPayments: state.escrowPayments.map((p) =>
          p.id === paymentId
            ? { ...p, status: "released" as EscrowStatus, releasedAt: "Just now" }
            : p
        ),
      })),

    stats: computeStats(
      MOCK_CAMPAIGNS,
      MOCK_APPLICANTS,
      MOCK_CLIENT_CONVERSATIONS,
      MOCK_ESCROW_PAYMENTS
    ),

    sidebarCollapsed: false,
    toggleSidebar: () =>
      set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    postJobDraft: {
      title: "",
      description: "",
      platform: "",
      niche: "",
      city: "",
      budget: "",
    },
    updatePostJobDraft: (data) =>
      set((state) => ({
        postJobDraft: { ...state.postJobDraft, ...data },
      })),
    publishJob: () => {
      const { postJobDraft, campaigns } = get();
      const newCampaign: Campaign = {
        id: `camp-${Date.now()}`,
        clientId: "client-1",
        title: postJobDraft.title,
        description: postJobDraft.description,
        platform: postJobDraft.platform,
        niche: postJobDraft.niche,
        city: postJobDraft.city,
        budget: `₹${parseInt(postJobDraft.budget || "0").toLocaleString("en-IN")}`,
        budgetNum: parseInt(postJobDraft.budget || "0"),
        status: "open",
        applicantCount: 0,
        createdAt: "Just now",
      };
      set({
        campaigns: [newCampaign, ...campaigns],
        postJobDraft: {
          title: "",
          description: "",
          platform: "",
          niche: "",
          city: "",
          budget: "",
        },
        activeTab: "campaigns",
      });
    },
    resetPostJobDraft: () =>
      set({
        postJobDraft: {
          title: "",
          description: "",
          platform: "",
          niche: "",
          city: "",
          budget: "",
        },
      }),
  })
);
