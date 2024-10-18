"use client";
import { useTranslation } from "react-i18next";

export default function HeroTitles() {
  const { t } = useTranslation();

  return (
    <h1
      role="heading"
      className="text-white font-bold whitespace-nowrap xs:whitespace-normal sm:whitespace-normal md:whitespace-normal text-[36px]"
    >
      {t("productTitleMain")}
      <span className="text-[20px] text-grey200 font-extralight ml-[6px]">
        {t("by")}
      </span>
      <span className="ml-[3px] text-cyan200 shadow-lg px-[6px]">
        {t("video")}
      </span>
    </h1>
  );
}
