import { GptCompetency, Offer } from "@youmeet/gql/generated";
import React from "react";
import OfferSection from "@youmeet/app/_sections/OfferSection";
import CompetencySection from "@youmeet/app/_sections/CompetencySection";
import DividerSection from "@youmeet/app/_components/DividerSection";
import PromotionSection from "@youmeet/app/_sections/PromotionSection";
import HeroSection from "@youmeet/app/_sections/HeroSection";
import InsightSection from "@youmeet/app/_sections/InsightSection";
import BandSection from "@youmeet/app/_sections/BandSection";
import SquareSection from "@youmeet/app/_sections/SquareSection";
import WhatsappSection from "@youmeet/app/_sections/WhatsappSection";
import dynamic from "next/dynamic";

const BigHeaderSection = dynamic(
  () => import("@youmeet/app/_sections/BigHeaderSection")
);
const BrandsSection = dynamic(
  () => import("@youmeet/app/_sections/BrandsSection")
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
