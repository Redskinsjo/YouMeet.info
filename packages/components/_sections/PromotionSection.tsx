import dynamic from "next/dynamic";
import React from "react";

const HomeCV = dynamic(() => import("../_homeComponents/HomeCV"));
const HomeVideo = dynamic(() => import("../_homeComponents/HomeVideo"));

export default function PromotionSection() {
  return (
    <section className="flex xs:flex-col sm:flex-col md:flex-col">
      <HomeCV />
      <HomeVideo />
    </section>
  );
}
