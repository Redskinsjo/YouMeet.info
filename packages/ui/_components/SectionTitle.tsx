"use client";
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
}: {
  translation: string;
  component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}) {
  const { t } = useTranslation();

  const Component = createElement(
    component,
    {
      className: `${
        className ? `${classnames[component]} ` : `${classnames[component]}`
      }${className}`,
      role: "heading",
    },
    t(translation)
  );

  return Component;
}
