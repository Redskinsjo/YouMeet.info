import dynamic from "next/dynamic";
import { nunito } from "@youmeet/functions/fonts";
import React from "react";

const BoldText = dynamic(() => import("../BoldText"));

export default function TextsSection() {
  return (
    <div className="max-w-full xs:w-screen sm:w-screen p-[48px] py-[72px] xs:p-[24px] xs:py-[48px] sm:p-[24px] sm:py-[48px] flex-bet xs:flex-col sm:flex-col flex gap-[48px] flex-1 box-border">
      <BoldText
        text={"home-recruiter-explain"}
        fontSizeClass="font-medium"
        containerStyle={{ ...nunito.style, fontSize: "28px" }}
      />
      <BoldText
        text={"join-the-wave"}
        fontSizeClass="font-medium"
        containerStyle={{ ...nunito.style, fontSize: "28px" }}
      />
    </div>
  );
}
