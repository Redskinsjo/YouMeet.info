"use client";

import { Translated } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const SectionTitle = dynamic(() => import("./SectionTitle"), {
  ssr: false,
});

export default function fnc({
  translation,
  component,
  className = "",
  lang = false,
}: {
  translation: string | Translated;
  component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  lang?: boolean;
}) {
  return (
    <SectionTitle
      component="h2"
      translation={translation}
      className={className}
    />
  );
}
