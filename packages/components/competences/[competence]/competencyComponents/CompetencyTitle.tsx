"use client";
import { useTranslation } from "react-i18next";

const types = {
  definition: { h2: "definition", h3: "discover-thoroughly-this-competency" },
  importance: { h2: "importance", h3: "why-important-competency" },
  development: {
    h2: "possible-development",
    h3: "some-hints-to-help-get-this-competency",
  },
  advantages: {
    h2: "advantages-to-have",
    h3: "which-interest-to-get-this-competency",
  },
  relatedSkills: { h2: "related-skills", h3: "connect-with-what-you-know" },
  examples: { h2: "situations-examples", h3: "where-to-find-competency" },
  conclusion: { h2: "conclusion", h3: "what-to-remember-from-this" },
};

export default function CompetencyDefinitionTitle({
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
  const { t } = useTranslation();
  return (
    <>
      <h2 role="heading" className="dark:text-white">
        {t(types[type].h2)}
      </h2>
      <h3 role="heading" className="dark:text-blueGrey200 text-blueGrey700">
        {t(types[type].h3)}
      </h3>
    </>
  );
}
