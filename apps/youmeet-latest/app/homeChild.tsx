import { GptCompetency, Offer } from "@youmeet/gql/generated";
import React from "react";
import OfferSection from "@youmeet/components/_sections/OfferSection";
import CompetencySection from "@youmeet/components/_sections/CompetencySection";
import DividerSection from "@youmeet/components/_components/DividerSection";
import PromotionSection from "@youmeet/components/_sections/PromotionSection";
import HeroSection from "@youmeet/components/_sections/HeroSection";
import InsightSection from "@youmeet/components/_sections/InsightSection";
import BandSection from "@youmeet/components/_sections/BandSection";
import SquareSection from "@youmeet/components/_sections/SquareSection";
import WhatsappSection from "@youmeet/components/_sections/WhatsappSection";
import dynamic from "next/dynamic";

const BigHeaderSection = dynamic(
  () => import("@youmeet/components/_sections/BigHeaderSection")
);
const BrandsSection = dynamic(
  () => import("@youmeet/components/_sections/BrandsSection")
);
const Footer = dynamic(() => import("@youmeet/components/Footer"));

export default async function Home({
  offers,
  competences,
}: {
  offers: Offer[];
  competences: GptCompetency[];
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
