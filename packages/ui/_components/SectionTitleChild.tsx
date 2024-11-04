"use client";
import OneLineSkeleton from "../OneLineSkeleton";
import { Translated } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
const SectionTitle = dynamic(() => import("./SectionTitle"), {
  ssr: false,
  loading: () => <OneLineSkeleton height="20px" width="200px" />,
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
      translation={translation}
      component={component}
      className={className}
      lang={lang}
    />
  );
}
