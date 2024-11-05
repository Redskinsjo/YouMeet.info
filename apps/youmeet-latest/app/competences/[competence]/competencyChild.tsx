import React from "react";
import { Competency } from "@youmeet/gql/generated";
import PublicPageContainer from "@youmeet/ui/PublicPage/PublicPageContainer";
import Footer from "@youmeet/ui/Footer";
import CompetencyComponent from "@youmeet/ui/competences/[competence]/competencyComponents/CompetencyComponent";
import DividerSection from "@youmeet/ui/_components/DividerSection";
import dynamic from "next/dynamic";

const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSectionChild")
);

export default function CompetencyChild({
  competency,
}: {
  competency: Competency;
}) {
  return (
    <div className="min-h-screen flex-center flex-col">
      <BigHeaderSection />

      <PublicPageContainer
        newStyles={{
          maxWidth: "100vw",
          width: "100%",
          borderRadius: "0px",
          margin: "0px",
          paddingBottom: "0px",
        }}
      >
        <div className="dark:extraLightDarkBg lightBg flex flex-col items-center flex-1 w-full gap-[12px] px-[24px] py-[48px] box-border rounded-[14px] shadow-lg h-full">
          <CompetencyComponent competency={competency} />
        </div>
      </PublicPageContainer>
      <DividerSection />
      <Footer />
    </div>
  );
}
