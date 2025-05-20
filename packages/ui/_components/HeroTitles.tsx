"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function HeroTitles() {
  const { t } = useTranslation();

  return (
    <div>
      <h1
        role="heading"
        className="text-white flex flex-col text-wrap font-bold whitespace-nowrap xs:whitespace-normal sm:whitespace-normal md:whitespace-normal text-[36px] w-full gap-[12px]"
      >
        <div className="flex flex-wrap gap-[6px]">
          <span className="ml-[3px] text-cyan200 shadow-lg shadow-cyan200 px-[6px]">
            {t("gain-visibility")}
          </span>
          {t("in-your-day-to-day-life")}
        </div>
        <span className="sentences text-grey200 font-extralight ml-[6px]">
          {t("incredible-opportunity-to-find-job")}
        </span>
      </h1>
      <Image
        src={
          "https://res.cloudinary.com/de822mdsy/image/upload/v1743874072/a0xwabimmbo6odoc6iys.svg"
        }
        alt="signature"
        width={0}
        height={0}
        style={{
          width: "100%",
          height: "50px",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
