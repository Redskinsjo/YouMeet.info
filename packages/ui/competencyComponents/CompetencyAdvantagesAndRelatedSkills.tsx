import OneLineSkeleton from "../OneLineSkeleton";
import { Competency } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const BoldText = dynamic(() => import("../TextChild"), {
  loading: () => <OneLineSkeleton count={3} />,
});
const CompetencyTitle = dynamic(() => import("./CompetencyTitleChild"));

export default function CompetencyAdvantagesAndRelatedSkills({
  competency,
}: {
  competency: Competency;
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
                <BoldText
                  links
                  key={`${adv?.slice(0, 9)} ${i}`}
                  containerStyle={{ fontSize: "16px", textIndent: "0px" }}
                  align="justify"
                  text={adv}
                  component="li"
                  fontSizeClass="darkLi"
                />
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
                  <BoldText
                    key={`${skill?.slice(0, 9)} ${i}`}
                    links
                    fontSizeClass="darkLi"
                    component="li"
                    containerStyle={{ fontSize: "16px", textIndent: "0px" }}
                    align="justify"
                    text={skill[0].toUpperCase() + skill.slice(1)}
                  />
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
