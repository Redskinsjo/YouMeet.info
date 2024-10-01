import { Competency } from "@youmeet/gql/generated";
import DataSection from "../_components/DataSection";
import dynamic from "next/dynamic";

const ImgSection = dynamic(() => import("../_components/ImgSection"));

export default function CompetencySection({
  competences,
}: {
  competences: Competency[];
}) {
  return (
    <section className="flex xs:flex-col sm:flex-col md:flex-col">
      <DataSection data={competences} />
      <ImgSection type="competency" />
    </section>
  );
}
