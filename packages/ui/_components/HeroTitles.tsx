"use client";
import { useTranslation } from "react-i18next";

export default function HeroTitles() {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return language === "fr" ? (
    <h1
      role="heading"
      className="text-white flex flex-col text-wrap font-bold whitespace-nowrap xs:whitespace-normal sm:whitespace-normal md:whitespace-normal text-[36px] w-full"
    >
      <div className="flex flex-wrap">
        <span className="ml-[3px] text-cyan200 shadow-lg px-[6px]">
          {t("informations")}
        </span>
        {t("reliable-pro-infos")}
      </div>
      <span className="text-[20px] text-grey200 font-extralight ml-[6px]">
        {t("about-candidates")}
      </span>
    </h1>
  ) : (
    <h1
      role="heading"
      className="text-white flex flex-col text-wrap font-bold whitespace-nowrap xs:whitespace-normal sm:whitespace-normal md:whitespace-normal text-[36px] w-full"
    >
      <div className="flex flex-wrap">
        {t("reliable-pro-infos")}
        <span className="ml-[3px] text-cyan200 shadow-lg px-[6px]">
          {t("information")}
        </span>
      </div>
      <span className="text-[20px] text-grey200 font-extralight ml-[6px]">
        {t("about-candidates")}
      </span>
    </h1>
  );
}
