import OneLineSkeleton from "../OneLineSkeleton";
import { Competency } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import CompetencyImg from "./CompetencyImg";

const BoldText = dynamic(() => import("../TextChild"), {
  loading: () => <OneLineSkeleton count={3} />,
});
const CompetencyTitle = dynamic(() => import("./CompetencyTitleChild"));

export default function CompetencyDevelopment({
  competency,
}: {
  competency: Competency;
}) {
  return (
    <section className="bg-grey50 dark:lightDarkBg flex-bet gap-[24px] box-border xs:flex-col sm:flex-col md:flex-col md2:flex-col w-full">
      {competency?.development ? (
        <div className="flex-1 px-[48px] xs:px-[12px] sm:px-[12px]">
          <CompetencyTitle type="development" />
          <BoldText
            links
            containerStyle={{ fontSize: "16px" }}
            align="justify"
            text={competency?.development}
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}
      <CompetencyImg type="development" />
    </section>
  );
}
