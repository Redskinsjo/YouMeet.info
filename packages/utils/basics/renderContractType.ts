const mapping: { [value: string]: { fr: string; en: string } } = {
  cdi: { fr: "CDI", en: "CDI" },
  interim: { fr: "Interim", en: "Interim" },
  stage: { fr: "Stage", en: "Internship" },
  cdd: { fr: "CDD", en: "CDD" },
  alternance: { fr: "Alternance", en: "Alternance" },
  freelance: { fr: "Freelance", en: "Freelance" },
  other: { fr: "Autre", en: "Other" },
};

export const renderContractType = (value: string, language: "fr" | "en") =>
  mapping[value][language];
