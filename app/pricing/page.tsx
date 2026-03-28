"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingSection } from "@/sections/PricingSection";

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
