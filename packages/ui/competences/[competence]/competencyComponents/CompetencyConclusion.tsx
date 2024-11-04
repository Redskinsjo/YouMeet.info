import OneLineSkeleton from "../../../OneLineSkeleton";
import { Competency } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const BoldText = dynamic(() => import("../../../TextChild"), {
  loading: () => <OneLineSkeleton count={3} />,
});
const CompetencyTitle = dynamic(() => import("./CompetencyTitleChild"));

export default function CompetencyConclusion({
  competency,
}: {
  competency: Competency;
}) {
  return (
    <section className="flex-center w-full">
      <div className="bg-grey50 dark:lightDarkBg w-[50%] p-[48px] xs:p-[12px] sm:p-[12px] md:p-[24px] xs:w-full sm:w-full md:w-full">
        {competency?.conclusion ? (
          <div>
            <CompetencyTitle type="conclusion" />
            <BoldText
              links
              containerStyle={{ fontSize: "16px" }}
              align="justify"
              text={competency.conclusion}
            />
          </div>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </section>
  );
}
