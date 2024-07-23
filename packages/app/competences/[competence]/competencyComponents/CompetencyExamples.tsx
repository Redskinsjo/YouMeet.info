import OneLineSkeleton from "@youmeet/components/OneLineSkeleton";
import { GptCompetency } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import CompetencyImg from "./CompetencyImg";
import React from "react";

const BoldText = dynamic(() => import("@youmeet/components/BoldText"), {
  ssr: false,
  loading: () => <OneLineSkeleton count={3} />,
});
const CompetencyTitle = dynamic(() => import("./CompetencyTitle"));

export default function CompetencyExamples({
  competency,
}: {
  competency: GptCompetency;
}) {
  return (
    <section className="bg-grey50 dark:lightDarkBg flex-center gap-[48px] w-full box-border xs:flex-col sm:flex-col md:flex-col md2:flex-col">
      <CompetencyImg type="examples" />
      {competency?.examples ? (
        <div className="flex-1 px-[48px] xs:px-[12px] sm:px-[12px]">
          <CompetencyTitle type="examples" />
          <ul
            className={
              competency?.examples &&
              competency?.examples[0] &&
              competency?.examples[0][0] === "-"
                ? "indent-0 w-full box-border"
                : "indent-8 p-0 w-full box-border"
            }
            style={{
              textRendering: "geometricPrecision",
              listStyleType:
                competency?.examples &&
                competency?.examples[0] &&
                competency?.examples[0][0] === "-"
                  ? "none"
                  : "initial",
            }}
          >
            {((competency?.examples as string[]) || [])?.map(
              (example: string, i: number) => (
                <li className="darkLi" key={`${example?.slice(0, 9)} ${i}`}>
                  <BoldText
                    links
                    containerStyle={{ fontSize: "16px", textIndent: "0px" }}
                    align="justify"
                    text={example}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="flex-1" />
      )}
    </section>
  );
}
