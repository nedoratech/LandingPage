"use client";

import { LandingTemplate } from "@/components/templates/LandingTemplate";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { HeroSection } from "@/components/organisms/HeroSection";
import { FactsFiguresSection } from "@/components/organisms/FactsFiguresSection";
import { CoreValuesSection } from "@/components/organisms/CoreValuesSection";
import { SolutionsSection } from "@/components/organisms/SolutionsSection";
import { WhyNedoraSection } from "@/components/organisms/WhyNedoraSection";
import { ProcessSection } from "@/components/organisms/ProcessSection";
import { EngagementSection } from "@/components/organisms/EngagementSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { ScrollSectionButton } from "@/components/molecules/ScrollSectionButton";

export function LandingPage() {
  return (
    <LandingTemplate>
      <div className="relative">
        <HeroSection />
        <SiteHeader overlay />
      </div>
      <main>
        <FactsFiguresSection />
        <CoreValuesSection />
        <SolutionsSection />
        <WhyNedoraSection />
        <ProcessSection />
        <EngagementSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ScrollSectionButton />
    </LandingTemplate>
  );
}
