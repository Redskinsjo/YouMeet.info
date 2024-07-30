import OneLineSkeleton from "../../../OneLineSkeleton";
import { GptCompetency } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import React from "react";

const BoldText = dynamic(() => import("../../../BoldText"), {
  ssr: false,
  loading: () => <OneLineSkeleton count={3} />,
});
const CompetencyTitle = dynamic(() => import("./CompetencyTitle"));

export default function CompetencyAdvantagesAndRelatedSkills({
  competency,
}: {
  competency: GptCompetency;
}) {
  return (
    <section className="bg-grey50 dark:lightDarkBg flex-center gap-[48px] w-full p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px] box-border xs:flex-col sm:flex-col md:flex-col md2:flex-col">
      {competency?.advantages && competency.advantages[0] ? (
        <div className="flex flex-col flex-[2] items-start justify-start w-full">
          <CompetencyTitle type="advantages" />
          <ul
            className="indent-8 p-0 list-none w-full flex flex-col gap-[12px]"
            style={{
              textRendering: "geometricPrecision",
            }}
          >
            {((competency?.advantages as string[]) || []).map(
              (adv: string, i: number) => (
                <li className="darkLi" key={`${adv?.slice(0, 9)} ${i}`}>
                  <BoldText
                    links
                    containerStyle={{ fontSize: "16px", textIndent: "0px" }}
                    align="justify"
                    text={adv}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="flex-1" />
      )}
      <div className="flex-1 px-[48px] xs:px-[12px] sm:px-[12px]">
        {competency?.relatedSkills && competency.relatedSkills[0] ? (
          <div className="flex-col flex-1 items-start justify-start w-full flex-center">
            <CompetencyTitle type="relatedSkills" />
            <ul
              className="indent-8 p-0 w-full"
              style={{ textRendering: "geometricPrecision" }}
            >
              {((competency.relatedSkills as string[]) || []).map(
                (skill: string, i: number) => (
                  <li className="darkLi" key={`${skill?.slice(0, 9)} ${i}`}>
                    <BoldText
                      links
                      containerStyle={{ fontSize: "16px", textIndent: "0px" }}
                      align="justify"
                      text={skill[0].toUpperCase() + skill.slice(1)}
                    />
                  </li>
                )
              )}
            </ul>
          </div>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </section>
  );
}
