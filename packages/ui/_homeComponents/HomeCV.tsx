import BoldText from "../BoldText";
import { mate } from "@youmeet/functions/fonts";
import SectionTitle from "../_components/SectionTitle";
import React from "react";

export default function HomeCV() {
  return (
    <section className="flex-1 flex-bet flex-col gap-[24px] p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px] homeSectionBg dark:darkHomeSectionBg">
      <div>
        <SectionTitle
          component="h2"
          className="text-left dark:text-white"
          translation="professional-connecting"
        />
        <BoldText text={"cv-not-enough"} align="left" />
      </div>

      <BoldText
        text={"no-job-without-a-meeting"}
        align="center"
        containerStyle={{
          ...mate.style,
          maxWidth: "400px",
          fontSize: "20px",
        }}
      />
    </section>
  );
}
