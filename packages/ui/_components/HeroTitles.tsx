"use client";
import { useTranslation } from "react-i18next";

export default function HeroTitles() {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <h1
      role="heading"
      className="text-white flex flex-col text-wrap font-bold whitespace-nowrap xs:whitespace-normal sm:whitespace-normal md:whitespace-normal text-[36px] w-full"
    >
      <div className="flex flex-wrap">
        <span className="ml-[3px] text-cyan200 shadow-lg px-[6px]">
          {t("present-yourself")}
        </span>
        {t("to-recruiters")}
      </div>
      <span className="sentences text-grey200 font-extralight ml-[6px]">
        {t("incredible-opportunity-to-find-job")}
      </span>
    </h1>
  );
}
