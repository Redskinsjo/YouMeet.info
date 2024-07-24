import React from "react";
import dynamic from "next/dynamic";
import BackgroundLayout from "@youmeet/components/BackgroundLayout";
import BigHeaderSection from "@youmeet/app/_sections/BigHeaderSection";

const Prices = dynamic(() => import("@/app/les-prix/pricesComponents/Prices"));
const Footer = dynamic(() => import("@youmeet/components/Footer"));

export default function PricesChild() {
  return (
    <div className="bg-white min-h-screen relative">
      <BigHeaderSection />

      <BackgroundLayout>
        <Prices />
      </BackgroundLayout>

      <Footer />
    </div>
  );
}
