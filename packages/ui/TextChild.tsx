"use client";
import { Translated } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import OneLineSkeleton from "./OneLineSkeleton";
const BoldText = dynamic(() => import("@youmeet/ui/BoldText"), {
  ssr: false,
  loading: () => <OneLineSkeleton height="12px" width="500px" />,
});

export default function fnc({
  text,
  fontSizeClass = "",
  containerStyle = {},
  align = "left",
  links,
  noEnding = false,
  skeleton = {
    width: "100%",
    count: 1,
    height: "10px",
  },
  formatDisplay = false,
  questionsHighlight,
  component = "p",
  lang = false,
}: {
  fontSizeClass?: string;
  text: string | Translated;
  containerStyle?: Attr | {};
  align?: "left" | "justify" | "right" | "center";
  links?: boolean;
  noEnding?: boolean;
  skeleton?: {
    count?: number;
    width?: string;
    height?: string;
  };
  formatDisplay?: boolean;
  questionsHighlight?: boolean;
  component?: "p" | "li" | "span";
  lang?: boolean;
}) {
  return (
    <BoldText
      fontSizeClass={fontSizeClass}
      text={text}
      containerStyle={containerStyle}
      align={align}
      links={links}
      noEnding={noEnding}
      skeleton={skeleton}
      formatDisplay={formatDisplay}
      questionsHighlight={questionsHighlight}
      component={component}
      lang={lang}
    />
  );
}
