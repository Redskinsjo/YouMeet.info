"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function HeroTitles() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    !loading && (
      <div className="flex flex-col text-white">
        <h1
          role="heading"
          className="font-bold whitespace-nowrap xs:whitespace-normal sm:whitespace-normal md:whitespace-normal"
        >
          {t("productTitleMain")}
          <span className="text-[20px] text-grey200 font-extralight ml-[6px]">
            {t("by")}
          </span>
          <span className="ml-[3px] text-deepPurple900 shadow-lg px-[6px]">
            {t("video")}
          </span>
          <span className="text-[20px] text-grey200 font-extralight ml-[6px]">
            {t("and")}
          </span>
          <span className="ml-[3px] text-deepPurple900 shadow-lg px-[6px]">
            {t("ai")}
          </span>
        </h1>
      </div>
    )
  );
}
