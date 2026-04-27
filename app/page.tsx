"use client";

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { WhyJoinSection } from "@/components/why-join-section";
import { ApplySection } from "@/components/apply-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-[#0a0705] text-white">

      <Header />

      <HeroSection />

      <ServicesSection />

      <StatsSection />

      <WhyJoinSection />

      <ApplySection />

      <Footer />

    </main>
  );
}