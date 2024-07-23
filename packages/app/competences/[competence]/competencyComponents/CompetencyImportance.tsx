import { GptCompetency } from "@youmeet/gql/generated";
import CompetencyImg from "./CompetencyImg";
import OneLineSkeleton from "@youmeet/components/OneLineSkeleton";
import dynamic from "next/dynamic";
import React from "react";

const BoldText = dynamic(() => import("@youmeet/components/BoldText"), {
  ssr: false,
  loading: () => <OneLineSkeleton count={3} />,
});
const CompetencyTitle = dynamic(() => import("./CompetencyTitle"));

export default function CompetencyImportance({
  competency,
}: {
  competency: GptCompetency;
}) {
  return (
    <section className="bg-grey50 dark:lightDarkBg flex-bet gap-[24px] box-border xs:flex-col sm:flex-col md:flex-col md2:flex-col w-full">
      <CompetencyImg type="importance" />
      {competency?.importance ? (
        <div className="flex-1 px-[48px] xs:px-[12px] sm:px-[12px]">
          <CompetencyTitle type="importance" />
          <BoldText
            links
            containerStyle={{ fontSize: "16px" }}
            text={competency.importance}
            align="justify"
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </section>
  );
}
