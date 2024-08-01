"use client";
import BoldText from "../BoldText";
import { Article } from "@youmeet/gql/generated";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function HomeMediaCard({ article }: { article: Article }) {
  const [loading, setLoading] = useState(true);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    !loading && (
      <div
        key={article?.id}
        style={{
          background: article.bgImage
            ? `linear-gradient(#fff, #fff, #fff), url(${article.bgImage})`
            : `radial-gradient(rgb(56, 56, 188), rgb(1, 6, 101))`,
          backgroundBlendMode: "hue",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-[550px] xs:w-full sm:w-full box-border h-[360px] xs:h-[240px] sm:h-[240px] p-[24px] box-border flex-bet flex-col gap-[12px] border-[1px] border-solid border-deepPurple900 rounded-[14px] relative"
      >
        {article.new && (
          <div className="absolute top-[12px] left-[12px] text-purple500 dark:text-grey300">
            {t("new-article")}
          </div>
        )}
        <h2
          role="heading"
          className="text-white text-center h-[72px] min-h-[72px] text-ellipsis overflow-hidden xs:m-0 sm:m-0 md:-0"
        >
          {(article?.title as { [key: string]: string })[language]}
        </h2>
        <BoldText
          text={`${
            (article?.description as { [key: string]: string })[language]
          }+`}
          align="justify"
          fontSizeClass="overflow-hidden overflow-y-scroll max-h-[159px] box-border overflow-y-scroll"
          containerStyle={{
            backgroundColor: "white",
            fontWeight: "normal",
            color: "black",
            padding: "6px 12px",
            borderRadius: "7px",
            border: `0.5px solid white`,
            margin: "0px",
          }}
        />
        <Link
          href={`/medias/${article?.slug}`}
          className="w-full no-underline text-black"
        >
          <div className="w-full h-[36px] flex-center px-[24px] box-border cursor-pointer bg-deepPurple900 hover:bg-deepPurple300 text-white hover:text-black">
            <span>{t("read")}</span>
          </div>
        </Link>
      </div>
    )
  );
}
