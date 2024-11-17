"use client";
import { Translated } from "@youmeet/gql/generated";
import { createElement } from "react";
import { useTranslation } from "react-i18next";

const classnames = {
  h1: "",
  h2: "",
  h3: "dark:text-white sentences",
  h4: "",
  h5: "",
  h6: "",
};

export default function SectionTitle({
  translation,
  component,
  className = "",
  lang = false,
  searching = "",
}: {
  translation: string | Translated;
  component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  lang?: boolean;
  searching?: string;
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const Component = createElement(
    component,
    {
      className: `${
        className ? `${classnames[component]} ` : `${classnames[component]}`
      }${className}`,
      role: "heading",
    },
    t(
      lang
        ? `${(translation as Translated)[language as "fr" | "en"]} ${
            searching ? `${t("for")} "${searching}"` : ""
          }`
        : `${t(translation as string)} ${
            searching ? `${t("for")} "${searching}"` : ""
          }`
    )
  );

  return Component;
}
