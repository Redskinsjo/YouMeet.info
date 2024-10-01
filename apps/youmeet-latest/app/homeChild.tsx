import { Competency, Offer } from "@youmeet/gql/generated";
import React from "react";
import OfferSection from "@youmeet/ui/_sections/OfferSection";
import CompetencySection from "@youmeet/ui/_sections/CompetencySection";
import DividerSection from "@youmeet/ui/_components/DividerSection";
import PromotionSection from "@youmeet/ui/_sections/PromotionSection";
import HeroSection from "@youmeet/ui/_sections/HeroSection";
import InsightSection from "@youmeet/ui/_sections/InsightSection";
import BandSection from "@youmeet/ui/_sections/BandSection";
import SquareSection from "@youmeet/ui/_sections/SquareSection";
import WhatsappSection from "@youmeet/ui/_sections/WhatsappSection";
import dynamic from "next/dynamic";

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSection")
);
const BrandsSection = dynamic(
  () => import("@youmeet/ui/_sections/BrandsSection")
);
const Footer = dynamic(() => import("@youmeet/ui/Footer"));

export default async function Home({
  offers,
  competences,
}: {
  offers: Offer[];
  competences: Competency[];
}) {
  return (
    <main>
      <BigHeaderSection />
      <HeroSection />
      <DividerSection />
      <PromotionSection />
      <DividerSection />
      <OfferSection offers={offers} />
      <DividerSection />
      <CompetencySection competences={competences} />
      <DividerSection />
      <InsightSection />
      <BandSection />
      <BrandsSection />
      <DividerSection />
      <SquareSection />
      <DividerSection />
      <WhatsappSection />
      <Footer />
    </main>
  );
}
