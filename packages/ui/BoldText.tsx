"use client";
import { setBoldWords, useLinksRegex } from "@youmeet/utils/setBoldWords";
import Link from "next/link";
import {
  createElement,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import OneLineSkeleton from "./OneLineSkeleton";
import {
  isFakeDash,
  isFakePoint,
  isSuspensionPoint,
} from "@youmeet/utils/textToFormat";
import { Attr } from "@youmeet/types/attributes";

export default function BoldText({
  text,
  fontSizeClass = "",
  containerStyle = {},
  align = "left",
  links,
  noEnding = false,
  skeletonCount = 1,
  formatDisplay = false,
  questionsHighlight,
  component = "p",
}: {
  fontSizeClass?: string;
  text: string;
  containerStyle?: Attr;
  align?: "left" | "justify" | "right" | "center";
  links?: boolean;
  noEnding?: boolean;
  skeletonCount?: number;
  formatDisplay?: boolean;
  questionsHighlight?: boolean;
  component?: "p" | "li" | "span";
}) {
  const { t } = useTranslation();
  const regex = useLinksRegex();
  const [loading, setLoading] = useState(false);
  const [textSlugs, setTextSlugs] = useState({});
  const [textToFormat, setTextToFormat] = useState("");

  const preFormatText = useCallback(async () => {
    if (textToFormat && regex) {
      const res = await setBoldWords(t(text), regex, noEnding);
      if (res?.text) {
        setTextToFormat(res?.text);
      }
      if (res?.slugs) setTextSlugs(res.slugs);
    }
  }, [text, regex, textToFormat]);

  const paragraph = useMemo(() => {
    if (!textToFormat) return undefined;
    const followUp: string[] = [];
    let lastIndex = 0;
    const list: (string | ReactElement)[] = [];
    for (let i = 0; i < textToFormat.length; i++) {
      if (textToFormat[i] === "@") {
        list.push(textToFormat.slice(lastIndex, i));
        lastIndex = i + 1;
        followUp.push("@");
      } else if (textToFormat[i] === "+") {
        list.push(textToFormat.slice(lastIndex, i));
        lastIndex = i + 1;
        followUp.push("+");
      } else if (textToFormat[i] === "=") {
        if (followUp[followUp.length - 1] === "=") {
          list.push(textToFormat.slice(lastIndex, i));
          lastIndex = i + 1;
        } else if (followUp[followUp.length - 1] === "@") {
          const index = Number(textToFormat[i - 1]);
          if (Number.isInteger(index)) {
            const slug = (textSlugs as any)[index];

            const word = textToFormat.slice(lastIndex, i - 1);
            list.push(
              <Link
                target="_blank"
                className="dark:text-cyan200 text-cyan900 font-bold no-underline"
                href={`/competences${slug ? `/${slug}` : ""}`}
                key={textToFormat[i] + i}
              >
                {word}
              </Link>
            );
            lastIndex = i + 1 < textToFormat.length ? i + 1 : 0;
            followUp.push("=");
          }
        } else if (followUp[followUp.length - 1] === "+") {
          const word = textToFormat.slice(lastIndex, i);
          const element = (
            <span className="font-bold" key={textToFormat[i] + i}>
              {word}
            </span>
          );
          list.push(element);

          lastIndex = i + 1 < textToFormat.length ? i + 1 : 0;
          followUp.push("=");
        }
      } else if (
        formatDisplay &&
        textToFormat[i] === "." &&
        !isFakePoint(textToFormat, i) &&
        !isSuspensionPoint(textToFormat, i)
      ) {
        list.push(
          <span key={textToFormat[i] + i}>
            <span className="whitespace-break-spaces">
              {textToFormat.slice(lastIndex, i + 1)}
            </span>
          </span>
        );
        lastIndex = i + 2;
      } else if (
        formatDisplay &&
        textToFormat[i] === "." &&
        isSuspensionPoint(textToFormat, i) &&
        followUp[followUp.length - 1] !== "..."
      ) {
        const end = (isSuspensionPoint(textToFormat, i) as { end: number }).end;

        list.push(
          <span key={textToFormat[i] + i}>
            <span className="whitespace-break-spaces">
              {textToFormat.slice(lastIndex, end + 1)}
            </span>
          </span>
        );
        lastIndex = i + 2;
      } else if (formatDisplay && textToFormat[i] === ":") {
        list.push(
          <span key={textToFormat[i] + i}>
            <span className="whitespace-break-spaces font-semibold">
              {textToFormat.slice(lastIndex, i + 1)}
            </span>
          </span>
        );
        lastIndex = i + 2;
      } else if (formatDisplay && textToFormat[i] === "!") {
        list.push(
          <span key={textToFormat[i] + i}>
            <span className="whitespace-break-spaces">
              {textToFormat.slice(lastIndex, i + 1)}
            </span>
          </span>
        );
        lastIndex = i + 2;
      } else if (textToFormat[i].charCodeAt(0) === 10) {
        list.push(
          <span key={textToFormat[i] + i}>
            <span className="whitespace-break-spaces">
              {textToFormat.slice(lastIndex, i)}
            </span>
            <br />
          </span>
        );
        lastIndex = i + 1;
      } else if (
        formatDisplay &&
        textToFormat[i] === "-" &&
        !isFakeDash(textToFormat, i)
      ) {
        list.push(
          <span key={textToFormat[i] + i}>
            <span className="whitespace-break-spaces">
              {textToFormat.slice(lastIndex, i)}
            </span>
          </span>
        );
        lastIndex = i;
      } else if (questionsHighlight && textToFormat[i] === "?") {
        list.push(
          <span key={textToFormat[i] + i}>
            <span className="font-bold italic quickHighlight px-[4px] rounded-[14px]">
              {textToFormat.slice(lastIndex, i + 1)}
            </span>
          </span>
        );
        lastIndex = i + 2;
      }
    }
    if (lastIndex === 0) list.push(textToFormat);

    const returnedElement = createElement(
      component,
      {
        className: formatDisplay
          ? `break-words font-[300] mb-[12px] w-full text-wrap list-outside box-border dark:text-white text-[15px] ${fontSizeClass}`
          : `leading-[1.9] xs:leading-[1.6] sm:leading-[1.6] break-words font-[300] mb-[12px] w-full text-wrap list-outside box-border dark:text-white text-[15px] ${fontSizeClass}`,
        style: {
          listStyle: component === "li" ? "lower-greek" : "none",
          textRendering: "geometricPrecision",
          textAlign: align,
          overflowWrap: "break-word",
          ...containerStyle,
        },
      },
      list
    );

    return returnedElement;
  }, [text, links, containerStyle, fontSizeClass, textToFormat, textSlugs]);

  useEffect(() => {
    if (links) preFormatText();
    if (!textToFormat) setTextToFormat(t(text));
    setLoading(false);
  }, [links, regex]);

  return (
    <>
      {!loading && paragraph ? (
        paragraph
      ) : (
        <OneLineSkeleton count={skeletonCount} />
      )}
    </>
  );
}
