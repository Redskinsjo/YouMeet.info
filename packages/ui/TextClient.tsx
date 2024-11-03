"use client";

import { Translated } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const BoldText = dynamic(() => import("./BoldText"), {
  ssr: false,
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
      text={text}
      containerStyle={containerStyle}
      fontSizeClass={fontSizeClass}
      noEnding={noEnding}
      component={component}
      formatDisplay={formatDisplay}
      lang={lang}
      questionsHighlight={questionsHighlight}
      links={links}
      align={align}
      skeleton={skeleton}
    />
  );
}
