import { GptCompetency } from "@youmeet/gql/generated";
import DataSection from "../_components/DataSection";
import dynamic from "next/dynamic";
import React from "react";

const ImgSection = dynamic(() => import("../_components/ImgSection"));

export default function CompetencySection({
  competences,
}: {
  competences: GptCompetency[];
}) {
  return (
    <section className="flex xs:flex-col sm:flex-col md:flex-col">
      <DataSection data={competences} />
      <ImgSection type="competency" />
    </section>
  );
}
