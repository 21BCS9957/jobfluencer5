import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/sections/HeroSection";
import { TopCreatorsSection } from "@/sections/TopCreatorsSection";
import { LiveOpportunitiesSection } from "@/sections/LiveOpportunitiesSection";
import { TrustLocalSection } from "@/sections/TrustLocalSection";
import { SplitAudienceSection } from "@/sections/SplitAudienceSection";
import { ExploreMapSection } from "@/sections/ExploreMapSection";

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
        <ExploreMapSection />
      </main>
      <Footer />
    </ExperienceShell>
  );
}
