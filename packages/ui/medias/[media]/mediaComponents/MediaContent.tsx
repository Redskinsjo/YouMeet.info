"use client";
import { Article, Translated } from "@youmeet/gql/generated";
import { Skeleton, useMediaQuery } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { deepPurple } from "@mui/material/colors";
import BoldText from "../../../BoldText";
import Link from "next/link";
import { outfit } from "@youmeet/functions/fonts";
import { useTranslation } from "react-i18next";
import SectionTitle from "../../../_components/SectionTitle";

export default function MediaContent({ media }: { media: Article }) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const {
    i18n: { language },
  } = useTranslation();
  const [loading, setLoading] = React.useState(true);

  const paragraphs = useMemo(() => {
    const paragraphsFormatted: any[] = [];
    if (media.paragraphs) {
      for (let i = 0; i < media.paragraphs?.length; i++) {
        const title = (media.paragraphs[i]?.title as { [key: string]: string })[
          language
        ];
        const content = (
          media.paragraphs[i]?.content as { [key: string]: string }
        )[language];

        const toPush = { title, content };
        paragraphsFormatted.push(toPush);
      }
    }

    return paragraphsFormatted;
  }, [media, language]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && (
      <div className="flex w-full bg-grey200 flex-col items-center xs:p-0 sm:p-0 md:p-0 p-[24px] box-border gap-[12px] mt-[12px] dark:lightDarkBg rounded-[14px] h-full shadow-custom">
        {!!media.bgImage && (
          <Image
            width={0}
            height={0}
            src={media.bgImage}
            alt={media.alt ?? "image représentant l'article de blog"}
            title={`${media.alt ?? "image représentant l'article de blog"}`}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: xs || sm || md ? "350px" : "500px",
              objectFit: "cover",
            }}
          />
        )}
        <div className="flex-center w-full p-[12px] box-border">
          {media?.title ? (
            <SectionTitle
              component="h1"
              translation={
                (media?.title as { [key: string]: string })[language]
              }
              className="m-[24px] text-[24px] font-bold dark:text-white"
            />
          ) : (
            <div
              className="m-[24px] w-[15%] flex-center flex-col italic"
              style={{
                ...outfit.style,
              }}
            >
              {[0].map((line) => (
                <Skeleton
                  key={line}
                  className="fadeIn"
                  animation="wave"
                  variant="rounded"
                  width="100%"
                  height="10px"
                  style={{
                    margin: "4px",
                    gap: "4px",
                    backgroundColor: deepPurple[50],
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex-center w-full p-[12px] box-border">
          {(media.introduction as { [key: string]: string })[language] ? (
            <BoldText
              formatDisplay
              links
              align="justify"
              text={`${
                (media.introduction as { [key: string]: string })[language]
              }`}
              containerStyle={{
                textIndent: "24px",
                fontSize: "18px",
                lineHeight: 1.6,
              }}
            />
          ) : (
            <div
              className="m-[24px] w-[45%] flex-center flex-col italic"
              style={{
                ...outfit.style,
              }}
            >
              {[0, 1, 2, 3].map((line) => (
                <Skeleton
                  key={line}
                  className="fadeIn"
                  animation="wave"
                  variant="rounded"
                  width="100%"
                  height="10px"
                  style={{
                    margin: "6px",
                    gap: "4px",
                    backgroundColor: deepPurple[50],
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex-center flex-col w-full p-[12px] box-border">
          {paragraphs.map((par, i) => (
            <div
              className="w-full m-[24px]"
              key={par.title + i}
              style={{
                ...outfit.style,
              }}
            >
              <SectionTitle
                component="h2"
                className="dark:text-white font-bold my-[24px]"
                translation={par.title}
              />
              <BoldText
                formatDisplay
                links
                align="justify"
                text={`${par.content}+`}
                containerStyle={{
                  textIndent: "24px",
                  fontSize: "18px",
                  lineHeight: 1.6,
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex-center w-full p-[12px] box-border">
          {(media.conclusion as { [key: string]: string })[language] ? (
            <BoldText
              formatDisplay
              links
              align="justify"
              text={`${
                (media.conclusion as { [key: string]: string })[language]
              }`}
              containerStyle={{
                textIndent: "24px",
                fontSize: "18px",
                lineHeight: 1.6,
              }}
            />
          ) : (
            <div
              className="m-[24px] w-[45%] flex-center flex-col italic"
              style={{
                ...outfit.style,
              }}
            >
              {[0, 1, 2, 3].map((line) => (
                <Skeleton
                  key={line}
                  className="fadeIn"
                  animation="wave"
                  variant="rounded"
                  width="100%"
                  height="10px"
                  style={{
                    margin: "6px",
                    gap: "4px",
                    backgroundColor: deepPurple[50],
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[24px] p-[12px] box-border">
          {media.links?.map((link, i) =>
            link ? (
              <Link
                key={`${link.href}${link.label}`}
                href={link.href as string}
                className="no-underline text-deepPurple900 dark:text-white"
              >
                {(link.label as Translated)[language as "fr" | "en"] as string}
              </Link>
            ) : undefined
          )}
        </div>
      </div>
    )
  );
}
