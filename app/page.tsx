import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/HeroSection";
import { TopCreatorsSection } from "@/sections/TopCreatorsSection";
import { LiveOpportunitiesSection } from "@/sections/LiveOpportunitiesSection";
import { TrustLocalSection } from "@/sections/TrustLocalSection";
import { SplitAudienceSection } from "@/sections/SplitAudienceSection";
import { PricingSection } from "@/sections/PricingSection";

export default function Home() {
  return (
    <ExperienceShell>
      <Navbar />
      <main className="relative overflow-hidden bg-black">
        <HeroSection />
        <TopCreatorsSection />
        <LiveOpportunitiesSection />
        <TrustLocalSection />
        <SplitAudienceSection />
        <PricingSection />
      </main>
      <Footer />
    </ExperienceShell>
  );
}
