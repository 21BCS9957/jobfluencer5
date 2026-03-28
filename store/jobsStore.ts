"use client";

import { create } from "zustand";

/* ------------------------------------------------------------------ */
/* Types — Supabase-ready                                              */
/* ------------------------------------------------------------------ */

export type JobCategory =
  | "Influencer"
  | "Photographer"
  | "Videographer"
  | "Content Writer"
  | "UGC Creator"
  | "Social Media Manager";

export type JobPlatform =
  | "Instagram"
  | "YouTube"
  | "TikTok"
  | "LinkedIn"
  | "Twitter";

export type JobNiche =
  | "Fashion"
  | "Tech"
  | "Food"
  | "Beauty"
  | "Fitness"
  | "Travel"
  | "Lifestyle"
  | "Finance"
  | "Education";

export type JobCity =
  | "Mumbai"
  | "Delhi"
  | "Bangalore"
  | "Hyderabad"
  | "Jaipur"
  | "Pune"
  | "Chennai"
  | "Kolkata"
  | "Remote";

export interface BrowseJob {
  id: string;
  title: string;
  brand: string;
  brandLogo: string;
  brandDescription: string;
  budget: number;
  budgetDisplay: string;
  platform: JobPlatform;
  city: JobCity;
  category: JobCategory;
  niche: JobNiche;
  description: string;
  fullDescription: string;
  deliverables: string[];
  timeline: string;
  expectations: string[];
  postedAt: string;
  applicants: number;
  avgBidLow: number;
  avgBidHigh: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  bidAmount: number;
  proposal: string;
  portfolioLinks: {
    instagram?: string;
    website?: string;
    previousWork?: string;
  };
  timeline: string;
  submittedAt: string;
}

export interface JobFilters {
  category: JobCategory | null;
  platform: JobPlatform | null;
  city: JobCity | null;
  niche: JobNiche | null;
  budgetMin: number | null;
  budgetMax: number | null;
  search: string;
}

/* ------------------------------------------------------------------ */
/* Mock Data                                                           */
/* ------------------------------------------------------------------ */

const MOCK_BROWSE_JOBS: BrowseJob[] = [
  {
    id: "bj1",
    title: "Instagram Reels for Air Max Campaign",
    brand: "Nike India",
    brandLogo:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop",
    brandDescription:
      "Nike is the world's leading athletic brand, inspiring innovation and performance for every athlete. We bring trendsetting campaigns to Indian creators.",
    budget: 150000,
    budgetDisplay: "₹1,50,000",
    platform: "Instagram",
    city: "Delhi",
    category: "Influencer",
    niche: "Fashion",
    description:
      "Create 3 engaging reels showcasing the new Air Max collection. Focus on lifestyle and street fashion.",
    fullDescription:
      "We're looking for a dynamic content creator to produce 3 high-quality Instagram Reels that capture the essence of street culture and the new Air Max collection. The content should feel authentic, energetic, and aspirational — not overly polished. Think urban landscapes, real moments, and genuine style expression.\n\nYou'll have creative freedom within our brand guidelines. We want your unique voice and perspective to shine through. The campaign targets 18–30 year olds who are passionate about sneaker culture and self-expression.",
    deliverables: [
      "3 Instagram Reels (30–60 seconds each)",
      "6 Instagram Stories (supporting content)",
      "Raw footage files",
      "Behind-the-scenes content",
    ],
    timeline: "2 weeks from campaign start",
    expectations: [
      "Minimum 10K followers on Instagram",
      "Previous fashion/lifestyle content experience",
      "Must be based in or willing to travel to Delhi NCR",
      "Own professional recording equipment",
    ],
    postedAt: "2 hours ago",
    applicants: 24,
    avgBidLow: 120000,
    avgBidHigh: 180000,
  },
  {
    id: "bj2",
    title: "Beauty Creator for Product Reviews",
    brand: "Nykaa",
    brandLogo:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop",
    brandDescription:
      "Nykaa is India's leading beauty and personal care platform, offering the best in skincare, makeup, and wellness products.",
    budget: 120000,
    budgetDisplay: "₹1,20,000",
    platform: "YouTube",
    city: "Mumbai",
    category: "UGC Creator",
    niche: "Beauty",
    description:
      "Create honest, engaging product review videos for our new skincare line launching this spring.",
    fullDescription:
      "Nykaa is launching a premium skincare line and we need authentic content creators to produce in-depth review videos. The focus is on honest, detailed reviews that build trust with our audience.\n\nWe're not looking for scripted content — we want genuine reactions and thorough testing over a 7-day period. Each product should be tested and reviewed with real before/after results when applicable.",
    deliverables: [
      "2 YouTube videos (8–12 minutes each)",
      "4 YouTube Shorts",
      "Product photography (minimum 10 images)",
      "Social media cross-posts",
    ],
    timeline: "3 weeks total (7 days testing + 2 weeks production)",
    expectations: [
      "Active beauty/skincare content creator",
      "Minimum 5K YouTube subscribers",
      "Professional lighting setup",
      "Ability to demonstrate products on camera",
    ],
    postedAt: "5 hours ago",
    applicants: 38,
    avgBidLow: 90000,
    avgBidHigh: 150000,
  },
  {
    id: "bj3",
    title: "Tech Reviewer for iPhone Campaign",
    brand: "Apple India",
    brandLogo:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=80&h=80&fit=crop",
    brandDescription:
      "Apple designs and creates the world's most innovative products and technology. We're looking for creators who match our standard of excellence.",
    budget: 300000,
    budgetDisplay: "₹3,00,000",
    platform: "YouTube",
    city: "Remote",
    category: "Influencer",
    niche: "Tech",
    description:
      "Looking for established tech reviewers to create detailed, cinematic reviews of our latest iPhone lineup.",
    fullDescription:
      "Apple is seeking top-tier tech creators to produce cinematic, in-depth review content for our latest iPhone series. This is a premium campaign requiring exceptional production value.\n\nThe content should demonstrate key features through real-world scenarios — not studio benchmarks. We want audiences to feel the experience of using the device in everyday life, showcasing camera capabilities, performance, and design.",
    deliverables: [
      "1 Main review video (12–20 minutes)",
      "3 Short-form videos (Camera, Performance, Design focus)",
      "5 Social media teasers",
      "All raw footage and project files",
    ],
    timeline: "4 weeks from device delivery",
    expectations: [
      "Minimum 50K YouTube subscribers",
      "Proven track record of tech reviews",
      "Cinema-grade camera equipment",
      "Professional editing skills",
      "NDA compliance required",
    ],
    postedAt: "1 day ago",
    applicants: 12,
    avgBidLow: 250000,
    avgBidHigh: 400000,
  },
  {
    id: "bj4",
    title: "Food Content Creator for Campaign",
    brand: "Swiggy",
    brandLogo:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop",
    brandDescription:
      "Swiggy is India's leading food delivery platform, connecting millions with their favorite restaurants every day.",
    budget: 60000,
    budgetDisplay: "₹60,000",
    platform: "Instagram",
    city: "Bangalore",
    category: "Content Writer",
    niche: "Food",
    description:
      "We need food bloggers to create mouth-watering content for our new restaurant partners in Bangalore.",
    fullDescription:
      "Swiggy is partnering with 5 premium restaurants in Bangalore and we need a talented food content creator to produce stunning visual content. The campaign focuses on showcasing the dining experience, food presentation, and ambiance.\n\nYou'll visit each restaurant, experience their signature dishes, and create content that makes viewers want to order immediately. Think ASMR-style food close-ups mixed with lifestyle moments.",
    deliverables: [
      "5 Instagram Reels (one per restaurant)",
      "10 Instagram Stories",
      "5 carousel posts with professional food photography",
      "Restaurant reviews and captions",
    ],
    timeline: "2 weeks (visiting 2–3 restaurants per week)",
    expectations: [
      "Must be based in Bangalore",
      "Strong food photography skills",
      "Minimum 3K Instagram followers",
      "Own camera equipment (phone is fine if quality is proven)",
    ],
    postedAt: "3 days ago",
    applicants: 56,
    avgBidLow: 45000,
    avgBidHigh: 75000,
  },
  {
    id: "bj5",
    title: "Fitness Influencer for Running Campaign",
    brand: "Puma India",
    brandLogo:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=80&h=80&fit=crop",
    brandDescription:
      "Puma is one of the world's leading sports brands, designing products for the fastest athletes. We push the boundaries of sport and culture.",
    budget: 80000,
    budgetDisplay: "₹80,000",
    platform: "Instagram",
    city: "Delhi",
    category: "Influencer",
    niche: "Fitness",
    description:
      "Looking for fitness creators to promote new running shoes through reels and stories. Authentic, real runners preferred.",
    fullDescription:
      "Puma is launching a new range of running shoes designed for Indian terrain and climate. We need fitness-focused creators who actually run regularly and can showcase the shoes in their natural training environment.\n\nThis isn't about posed gym shots — we want real running content. Morning runs through city streets, trail runs, marathon prep, and recovery moments. We want the audience to trust that you actually use these shoes.",
    deliverables: [
      "4 Instagram Reels showing different running scenarios",
      "8 Instagram Stories (day-in-the-life format)",
      "Honest review post with detailed feedback",
      "Performance comparison content (optional bonus)",
    ],
    timeline: "10 days from product delivery",
    expectations: [
      "Must be an active runner (marathons preferred)",
      "Minimum 5K Instagram followers",
      "Fitness niche content history",
      "Available for an in-person shoot at Puma store (1 day)",
    ],
    postedAt: "6 hours ago",
    applicants: 31,
    avgBidLow: 60000,
    avgBidHigh: 100000,
  },
  {
    id: "bj6",
    title: "Fashion Photographer for Lookbook",
    brand: "H&M",
    brandLogo:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop",
    brandDescription:
      "H&M offers fashion and quality at the best price in a sustainable way. Our campaigns celebrate diversity and individual style.",
    budget: 90000,
    budgetDisplay: "₹90,000",
    platform: "Instagram",
    city: "Jaipur",
    category: "Photographer",
    niche: "Fashion",
    description:
      "Professional product and lifestyle photography for our new seasonal collection. Jaipur heritage locations preferred.",
    fullDescription:
      "H&M is creating a special India Heritage Collection and we need a skilled fashion photographer based in or near Jaipur to shoot the lookbook. The concept blends modern fashion with Jaipur's iconic architecture and culture.\n\nWe'll provide the collection pieces, models, and creative direction. You'll bring your photography expertise, location knowledge, and artistic vision. This is a prestige project that will be featured on our India homepage and social channels.",
    deliverables: [
      "60 edited photographs (lookbook quality)",
      "10 behind-the-scenes photos",
      "5 Instagram-optimized carousel sets",
      "Location scouting and coordination",
    ],
    timeline: "1 week (2 shoot days + post-production)",
    expectations: [
      "Professional fashion photography portfolio",
      "Must own professional camera equipment",
      "Knowledge of Jaipur locations and lighting",
      "Experience with model direction",
      "Ability to handle post-production editing",
    ],
    postedAt: "4 days ago",
    applicants: 19,
    avgBidLow: 70000,
    avgBidHigh: 120000,
  },
  {
    id: "bj7",
    title: "TikTok Creator for Phone Launch",
    brand: "OnePlus",
    brandLogo:
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=80&h=80&fit=crop",
    brandDescription:
      "OnePlus creates beautifully designed products with premium build quality, delivering a fast and smooth experience that sets new standards.",
    budget: 100000,
    budgetDisplay: "₹1,00,000",
    platform: "TikTok",
    city: "Hyderabad",
    category: "UGC Creator",
    niche: "Tech",
    description:
      "Create trending TikTok videos to build hype around our new phone launch. Creative, viral content that feels native.",
    fullDescription:
      "OnePlus is dropping a new midrange phone targeting Gen Z, and we want to create buzz on TikTok before the launch. We need creators who understand the platform's culture — trending sounds, formats, and engagement hooks.\n\nThe content should feel organic, not like an ad. We want unboxing reactions, first impression moments, camera comparisons with daily scenarios, and creative tech-lifestyle crossover content.",
    deliverables: [
      "6 TikTok videos (various trending formats)",
      "3 transition/creative edit videos",
      "Live stream unboxing (30 min minimum)",
      "Community engagement (respond to comments for 72 hours)",
    ],
    timeline: "2 weeks (pre-launch through launch day)",
    expectations: [
      "Active TikTok creator with proven viral reach",
      "Minimum 15K TikTok followers",
      "Understanding of tech trends on TikTok",
      "Quick turnaround capability",
    ],
    postedAt: "12 hours ago",
    applicants: 42,
    avgBidLow: 75000,
    avgBidHigh: 130000,
  },
  {
    id: "bj8",
    title: "Travel Vlogger for Heritage Campaign",
    brand: "Incredible India",
    brandLogo:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=80&h=80&fit=crop",
    brandDescription:
      "Incredible India promotes India's rich cultural heritage and diverse tourist destinations to the world.",
    budget: 200000,
    budgetDisplay: "₹2,00,000",
    platform: "YouTube",
    city: "Jaipur",
    category: "Videographer",
    niche: "Travel",
    description:
      "Create a cinematic travel series showcasing Rajasthan's lesser-known heritage sites and cultural experiences.",
    fullDescription:
      "The Ministry of Tourism is commissioning a premium content series highlighting Rajasthan's hidden gems — beyond the usual Amber Fort and Hawa Mahal. We want to showcase lesser-known palaces, artisan villages, local cuisine traditions, and cultural experiences.\n\nThe series should be cinematic quality with drone footage, time-lapses, and storytelling narration. This content will be used across official tourism channels and international promotional campaigns.",
    deliverables: [
      "5 YouTube episodes (10–15 minutes each)",
      "10 YouTube Shorts (vertical highlights)",
      "Drone footage of 8+ locations",
      "Full travel guide blog post series (optional)",
    ],
    timeline: "6 weeks (2 weeks on-location + 4 weeks post-production)",
    expectations: [
      "Professional videography and drone operation",
      "Previous travel content portfolio",
      "Minimum 20K YouTube subscribers",
      "Own cinema camera and licensed drone",
      "Willingness to travel extensively in Rajasthan",
    ],
    postedAt: "2 days ago",
    applicants: 8,
    avgBidLow: 175000,
    avgBidHigh: 280000,
  },
  {
    id: "bj9",
    title: "LinkedIn Thought Leadership Content",
    brand: "Razorpay",
    brandLogo:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop",
    brandDescription:
      "Razorpay is India's leading full-stack financial solutions company, powering business banking, payments, and more.",
    budget: 75000,
    budgetDisplay: "₹75,000",
    platform: "LinkedIn",
    city: "Pune",
    category: "Content Writer",
    niche: "Finance",
    description:
      "Looking for a thought leadership content creator for our executive team's LinkedIn presence. Fintech expertise required.",
    fullDescription:
      "Razorpay wants to amplify the LinkedIn presence of our executive team through well-crafted thought leadership content. This includes industry insights, company milestone narratives, and fintech trend analysis.\n\nThe ideal creator understands the fintech ecosystem, can translate complex topics into engaging LinkedIn posts, and can maintain a consistent executive voice across multiple profiles.",
    deliverables: [
      "20 LinkedIn posts (mix of short and long-form)",
      "4 LinkedIn articles (in-depth thought pieces)",
      "Content calendar for 1 month",
      "Performance analytics report",
    ],
    timeline: "1 month delivery with weekly batches",
    expectations: [
      "Strong understanding of fintech and B2B space",
      "Excellent English writing skills",
      "LinkedIn content strategy experience",
      "Ability to match different executive voices",
    ],
    postedAt: "1 week ago",
    applicants: 67,
    avgBidLow: 50000,
    avgBidHigh: 90000,
  },
  {
    id: "bj10",
    title: "Social Media Manager for Launch",
    brand: "Mamaearth",
    brandLogo:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=80&h=80&fit=crop",
    brandDescription:
      "Mamaearth is an Asia's first brand with Made Safe certified products, offering toxin-free skincare and beauty solutions.",
    budget: 45000,
    budgetDisplay: "₹45,000",
    platform: "Instagram",
    city: "Mumbai",
    category: "Social Media Manager",
    niche: "Beauty",
    description:
      "Manage our Instagram account for 1 month during a major product launch. Strategy, content calendar, and engagement included.",
    fullDescription:
      "Mamaearth is launching 3 new products in our Vitamin C range and we need a dedicated social media manager to handle our Instagram account for the launch month. This includes creating a content strategy, managing the content calendar, engagement, and community management.\n\nYou'll work closely with our marketing team and have access to product samples, brand assets, and our design team for graphics.",
    deliverables: [
      "Complete content strategy document",
      "30-day content calendar",
      "Daily posting and engagement (2 posts/day)",
      "Weekly performance reports",
      "Community management (respond within 2 hours)",
    ],
    timeline: "1 month full management",
    expectations: [
      "Previous social media management experience",
      "Understanding of beauty/skincare industry",
      "Available for daily coordination calls",
      "Knowledge of Instagram analytics",
    ],
    postedAt: "3 hours ago",
    applicants: 89,
    avgBidLow: 35000,
    avgBidHigh: 55000,
  },
  {
    id: "bj11",
    title: "Education Content for Online Course",
    brand: "Unacademy",
    brandLogo:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=80&h=80&fit=crop",
    brandDescription:
      "Unacademy is India's largest learning platform with world-class educators and cutting-edge technology.",
    budget: 55000,
    budgetDisplay: "₹55,000",
    platform: "YouTube",
    city: "Chennai",
    category: "Videographer",
    niche: "Education",
    description:
      "Create promotional video content for our new skill-building courses. Professional, inspiring, and motivational tone.",
    fullDescription:
      "Unacademy is launching a new vertical focused on professional skill-building courses (coding, design, marketing) and needs compelling video content to promote these courses across YouTube and social platforms.\n\nThe content should inspire potential learners, showcase student success stories, and highlight the quality of our educators. Visual style should be modern, clean, and aspirational.",
    deliverables: [
      "3 promotional videos (60–90 seconds each)",
      "6 YouTube Shorts (student testimonial style)",
      "2 course preview videos (2–3 minutes each)",
      "Motion graphics and title sequences",
    ],
    timeline: "3 weeks total production",
    expectations: [
      "Video production and editing expertise",
      "Motion graphics capability (After Effects preferred)",
      "Previous educational/corporate content experience",
      "Professional voiceover equipment or connections",
    ],
    postedAt: "5 days ago",
    applicants: 23,
    avgBidLow: 40000,
    avgBidHigh: 70000,
  },
  {
    id: "bj12",
    title: "Twitter / X Growth Strategy Creator",
    brand: "Zerodha",
    brandLogo:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&h=80&fit=crop",
    brandDescription:
      "Zerodha is India's largest stockbroker, pioneering discount broking in India and making investing accessible to everyone.",
    budget: 85000,
    budgetDisplay: "₹85,000",
    platform: "Twitter",
    city: "Bangalore",
    category: "Content Writer",
    niche: "Finance",
    description:
      "Create engaging Twitter/X content around investing, personal finance, and market trends. Thread-based storytelling preferred.",
    fullDescription:
      "Zerodha wants to strengthen its Twitter/X presence with high-quality thought leadership content around investing, personal finance, and market education. We're looking for creators who can simplify complex financial concepts into engaging, shareable threads and tweets.\n\nThe content should educate without being preachy, use data and infographics where relevant, and drive meaningful engagement from our target audience of young investors (22–35 age group).",
    deliverables: [
      "12 detailed Twitter threads (8–15 tweets each)",
      "30 standalone tweets (informational and engaging)",
      "8 infographic-style data tweets",
      "Weekly engagement reports and trend analysis",
    ],
    timeline: "1 month with weekly content batches",
    expectations: [
      "Deep understanding of Indian stock market and investing",
      "Active Twitter/X presence in finance niche",
      "Strong data visualization skills",
      "Ability to simplify complex financial concepts",
    ],
    postedAt: "8 hours ago",
    applicants: 45,
    avgBidLow: 65000,
    avgBidHigh: 110000,
  },
];

/* ------------------------------------------------------------------ */
/* Filter options                                                      */
/* ------------------------------------------------------------------ */

export const CATEGORIES: JobCategory[] = [
  "Influencer",
  "Photographer",
  "Videographer",
  "Content Writer",
  "UGC Creator",
  "Social Media Manager",
];

export const PLATFORMS: JobPlatform[] = [
  "Instagram",
  "YouTube",
  "TikTok",
  "LinkedIn",
  "Twitter",
];

export const CITIES: JobCity[] = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Jaipur",
  "Pune",
  "Chennai",
  "Kolkata",
  "Remote",
];

export const NICHES: JobNiche[] = [
  "Fashion",
  "Tech",
  "Food",
  "Beauty",
  "Fitness",
  "Travel",
  "Lifestyle",
  "Finance",
  "Education",
];

export const BUDGET_RANGES = [
  { label: "Under ₹50K", min: 0, max: 50000 },
  { label: "₹50K – ₹1L", min: 50000, max: 100000 },
  { label: "₹1L – ₹2L", min: 100000, max: 200000 },
  { label: "₹2L+", min: 200000, max: Infinity },
];

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

interface JobsState {
  /* Data */
  jobs: BrowseJob[];
  filteredJobs: BrowseJob[];

  /* Filters */
  filters: JobFilters;
  setFilter: <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => void;
  clearFilters: () => void;
  activeFilterCount: () => number;

  /* Detail */
  selectedJob: BrowseJob | null;
  setSelectedJob: (job: BrowseJob | null) => void;

  /* Apply */
  applyingJob: BrowseJob | null;
  setApplyingJob: (job: BrowseJob | null) => void;
  applications: JobApplication[];
  submitApplication: (app: Omit<JobApplication, "id" | "submittedAt">) => void;
  hasApplied: (jobId: string) => boolean;

  /* Bookmarks */
  bookmarkedIds: Set<string>;
  toggleBookmark: (jobId: string) => void;
  isBookmarked: (jobId: string) => boolean;

  /* Recently Viewed */
  recentlyViewed: string[];
  addToRecentlyViewed: (jobId: string) => void;
}

const DEFAULT_FILTERS: JobFilters = {
  category: null,
  platform: null,
  city: null,
  niche: null,
  budgetMin: null,
  budgetMax: null,
  search: "",
};

function applyFilters(jobs: BrowseJob[], filters: JobFilters): BrowseJob[] {
  return jobs.filter((job) => {
    if (filters.category && job.category !== filters.category) return false;
    if (filters.platform && job.platform !== filters.platform) return false;
    if (filters.city && job.city !== filters.city) return false;
    if (filters.niche && job.niche !== filters.niche) return false;
    if (filters.budgetMin !== null && job.budget < filters.budgetMin)
      return false;
    if (
      filters.budgetMax !== null &&
      filters.budgetMax !== Infinity &&
      job.budget > filters.budgetMax
    )
      return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack =
        `${job.title} ${job.brand} ${job.description} ${job.niche} ${job.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: MOCK_BROWSE_JOBS,
  filteredJobs: MOCK_BROWSE_JOBS,

  filters: { ...DEFAULT_FILTERS },

  setFilter: (key, value) => {
    const newFilters = { ...get().filters, [key]: value };
    set({
      filters: newFilters,
      filteredJobs: applyFilters(get().jobs, newFilters),
    });
  },

  clearFilters: () => {
    set({
      filters: { ...DEFAULT_FILTERS },
      filteredJobs: get().jobs,
    });
  },

  activeFilterCount: () => {
    const f = get().filters;
    let count = 0;
    if (f.category) count++;
    if (f.platform) count++;
    if (f.city) count++;
    if (f.niche) count++;
    if (f.budgetMin !== null || f.budgetMax !== null) count++;
    if (f.search) count++;
    return count;
  },

  selectedJob: null,
  setSelectedJob: (job) => {
    set({ selectedJob: job });
    if (job) get().addToRecentlyViewed(job.id);
  },

  applyingJob: null,
  setApplyingJob: (job) => set({ applyingJob: job }),

  applications: [],
  submitApplication: (app) => {
    const application: JobApplication = {
      ...app,
      id: `app_${Date.now()}`,
      submittedAt: new Date().toISOString(),
    };
    set((state) => ({
      applications: [...state.applications, application],
      applyingJob: null,
    }));
  },
  hasApplied: (jobId) => get().applications.some((a) => a.jobId === jobId),

  bookmarkedIds: new Set(),
  toggleBookmark: (jobId) => {
    set((state) => {
      const next = new Set(state.bookmarkedIds);
      if (next.has(jobId)) next.delete(jobId);
      else next.add(jobId);
      return { bookmarkedIds: next };
    });
  },
  isBookmarked: (jobId) => get().bookmarkedIds.has(jobId),

  recentlyViewed: [],
  addToRecentlyViewed: (jobId) => {
    set((state) => {
      const filtered = state.recentlyViewed.filter((id) => id !== jobId);
      return { recentlyViewed: [jobId, ...filtered].slice(0, 10) };
    });
  },
}));
