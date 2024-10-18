import { Competency } from "@youmeet/gql/generated";
import CompetencyDefinition from "./CompetencyDefinition";
import CompetencyImportance from "./CompetencyImportance";
import CompetencyDevelopment from "./CompetencyDevelopment";
import CompetencyAdvantagesAndRelatedSkills from "./CompetencyAdvantagesAndRelatedSkills";
import CompetencyExamples from "./CompetencyExamples";
import CompetencyConclusion from "./CompetencyConclusion";
import CompetencyMainTitle from "./CompetencyMainTitle";

export default function CompetencyComponent({
  competency,
}: {
  competency: Competency;
}) {
  return (
    <main className="flex flex-col items-center gap-[96px] w-full h-full">
      <CompetencyMainTitle competency={competency} />
      <CompetencyDefinition competency={competency} />
      <CompetencyImportance competency={competency} />
      <CompetencyDevelopment competency={competency} />
      <CompetencyAdvantagesAndRelatedSkills competency={competency} />
      <CompetencyExamples competency={competency} />
      <CompetencyConclusion competency={competency} />
    </main>
  );
}
