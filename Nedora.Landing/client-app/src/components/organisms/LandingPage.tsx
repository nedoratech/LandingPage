"use client";

import { LandingTemplate } from "@/components/templates/LandingTemplate";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { HeroSection } from "@/components/organisms/HeroSection";
import { SolutionsSection } from "@/components/organisms/SolutionsSection";
import { WhyNedoraSection } from "@/components/organisms/WhyNedoraSection";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { EngagementSection } from "@/components/organisms/EngagementSection";
import { ShowcaseSection } from "@/components/organisms/ShowcaseSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { SiteFooter } from "@/components/organisms/SiteFooter";

export function LandingPage() {
  return (
    <LandingTemplate>
      <SiteHeader />
      <main>
        <HeroSection />
        <SolutionsSection />
        <WhyNedoraSection />
        <ProcessSection />
        <EngagementSection />
        <ShowcaseSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </LandingTemplate>
  );
}
