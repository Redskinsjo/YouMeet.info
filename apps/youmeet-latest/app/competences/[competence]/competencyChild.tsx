import React from "react";
import { GptCompetency } from "@youmeet/gql/generated";
import PublicPageContainer from "@youmeet/components/PublicPage/PublicPageContainer";
import Footer from "@youmeet/components/Footer";
import BigHeaderSection from "@youmeet/app/_sections/BigHeaderSection";
import CompetencyComponent from "@youmeet/app/competences/[competence]/competencyComponents/CompetencyComponent";
import DividerSection from "@youmeet/app/_components/DividerSection";

export default function CompetencyChild({
  competency,
}: {
  competency: GptCompetency;
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
