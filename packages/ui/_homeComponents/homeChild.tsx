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
import Image from "next/image";

const HeroStyledText = dynamic(() => import("../_components/HeroTextChild"));

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSectionChild")
);
const BrandsSection = dynamic(
  () => import("@youmeet/ui/_sections/BrandsSectionChild")
);
const MasterSearch = dynamic(
  () => import("@youmeet/ui/_sections/MasterSearchChild")
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
    <main className="homeLightning">
      <BigHeaderSection />
      <DividerSection />
      <div className="flex-center flex-col">
        <div className="flex xs:flex-col sm:flex-col md:flex-col">
          <div className="box-border w-3/4 xs:w-full sm:w-full md:w-full p-[72px] xs:p-[12px] sm:p-[12px] md:p-[12px]">
            <HeroSection />
            <MasterSearch />
          </div>
          <HeroStyledText />
        </div>

        {/* <PromotionSection /> */}
        {/* <DataSection data={videos} /> */}
      </div>
      {/* <OfferSection offers={offers} /> */}
      {/* <CompetencySection competences={competences} /> */}
      <Image
        src={
          "https://res.cloudinary.com/de822mdsy/image/upload/v1743799457/dgvqhkl2armpoxl8gn6f.png"
        }
        alt="divider"
        width={0}
        height={0}
        style={{
          width: "100%",
          height: "100px",
          objectFit: "cover",
          opacity: 0.5,
          position: "absolute",
        }}
      />
      <InsightSection />
      <BandSection />
      <DividerSection />
      <div className="bg-black">
        <BrandsSection />
        {/* <SquareSection /> */}
        {/* <WhatsappSection /> */}
      </div>
      <DividerSection />
      <Footer />
    </main>
  );
}
