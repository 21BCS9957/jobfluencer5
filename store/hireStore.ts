"use client";

import { create } from "zustand";

export type CreatorType =
  | "Social Media Influencer"
  | "Photographer"
  | "Videographer"
  | "UGC Creator";

export type Platform = "Instagram" | "YouTube" | "TikTok" | "Others";

export type Niche =
  | "Fashion"
  | "Beauty"
  | "Fitness"
  | "Tech"
  | "Food"
  | "Lifestyle";

export type HireStep =
  | "intent"
  | "creatorType"
  | "platform"
  | "location"
  | "niche"
  | "generating"
  | "result"
  | "login";

type HireState = {
  step: HireStep;
  direction: 1 | -1;
  intent: string;
  creatorType: CreatorType | null;
  platform: Platform | null;
  platformOther: string;
  city: string;
  niche: Niche | null;
  generatedTitle: string;
  generatedDescription: string;
  setStep: (step: HireStep, direction?: 1 | -1) => void;
  setIntent: (value: string) => void;
  setCreatorType: (value: CreatorType) => void;
  setPlatform: (value: Platform) => void;
  setPlatformOther: (value: string) => void;
  setCity: (value: string) => void;
  setNiche: (value: Niche) => void;
  setGenerated: (title: string, description: string) => void;
  reset: () => void;
  goNext: () => void;
  goBack: () => void;
};

const STEP_ORDER: HireStep[] = [
  "intent",
  "creatorType",
  "platform",
  "location",
  "niche",
  "generating",
  "result",
  "login",
];

export const useHireStore = create<HireState>((set, get) => ({
  step: "intent",
  direction: 1,
  intent: "",
  creatorType: null,
  platform: null,
  platformOther: "",
  city: "",
  niche: null,
  generatedTitle: "",
  generatedDescription: "",

  setStep: (step, direction = 1) => set({ step, direction }),
  setIntent: (value) => set({ intent: value }),
  setCreatorType: (value) => set({ creatorType: value }),
  setPlatform: (value) => set({ platform: value }),
  setPlatformOther: (value) => set({ platformOther: value }),
  setCity: (value) => set({ city: value }),
  setNiche: (value) => set({ niche: value }),
  setGenerated: (title, description) =>
    set({ generatedTitle: title, generatedDescription: description }),
  reset: () =>
    set({
      step: "intent",
      direction: 1,
      intent: "",
      creatorType: null,
      platform: null,
      platformOther: "",
      city: "",
      niche: null,
      generatedTitle: "",
      generatedDescription: "",
    }),

  goNext: () => {
    const { step } = get();
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) {
      set({ step: STEP_ORDER[idx + 1], direction: 1 });
    }
  },

  goBack: () => {
    const { step } = get();
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) {
      set({ step: STEP_ORDER[idx - 1], direction: -1 });
    }
  },
}));
