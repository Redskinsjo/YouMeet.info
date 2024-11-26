"use client";
import dynamic from "next/dynamic";

const CompetencyTitle = dynamic(() => import("./CompetencyTitle"), {
  ssr: false,
});

export default function fnc({
  type,
}: {
  type:
    | "definition"
    | "importance"
    | "development"
    | "advantages"
    | "relatedSkills"
    | "examples"
    | "conclusion";
}) {
  return <CompetencyTitle type={type} />;
}
