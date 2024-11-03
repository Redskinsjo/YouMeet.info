import { Competency, Offer, Video } from "@youmeet/gql/generated";
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
import Footer from "@youmeet/ui/Footer";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
import DataSection from "@youmeet/ui/_components/DataSection";

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSection"),
  { ssr: false }
);
const BrandsSection = dynamic(
  () => import("@youmeet/ui/_sections/BrandsSection"),
  { ssr: false }
);
const MasterSearch = dynamic(
  () => import("@youmeet/ui/_sections/MasterSearch"),
  { ssr: false }
);

export default async function Home({
  offers,
  competences,
  videos,
}: {
  offers: Offer[];
  competences: Competency[];
  videos: Video[];
}) {
  return (
    <main>
      <BigHeaderSection />
      <div className="flex-center flex-col">
        <div className="box-border w-3/4 xs:w-full sm:w-full md:w-full p-[72px] xs:p-[12px] sm:p-[12px] md:p-[12px]">
          <HeroSection />
          <DividerSection />
          <MasterSearch />
        </div>

        <DividerSection />
        {/* <PromotionSection /> */}
        <DataSection data={videos} />
      </div>
      <DividerSection />
      {/* <OfferSection offers={offers} /> */}
      <DividerSection />
      {/* <CompetencySection competences={competences} /> */}
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
