import type { Metadata } from "next";
import { HireFlow } from "@/components/hire/HireFlow";

export const metadata: Metadata = {
  title: "Hire Creators | Jobfluencer",
  description:
    "Hire top influencers, photographers, videographers, and UGC creators for your brand campaigns.",
};

export default function HirePage() {
  return <HireFlow />;
}
