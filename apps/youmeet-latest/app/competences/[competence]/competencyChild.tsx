import React from "react";
import { Competency } from "@youmeet/gql/generated";
import CompetencyChildComponent from "@youmeet/ui/competencyComponents/CompetencyChildComponent";

export default function CompetencyChild({
  competency,
}: {
  competency: Competency;
}) {
  return <CompetencyChildComponent competency={competency} />;
}
