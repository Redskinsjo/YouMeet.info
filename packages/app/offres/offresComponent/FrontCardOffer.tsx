import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FrontCardProps } from "@youmeet/types/FrontCardProps";
import { Offer, Translated } from "@youmeet/gql/generated";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { formatToDatetime } from "@youmeet/utils/formatToDatetime";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import Link from "next/link";
import CustomIcon from "@youmeet/components/CustomIcon";
import { CustomIconName } from "@youmeet/types/CustomIconProps";
import { CardTurnUp } from "@youmeet/types/Header";

export default function FrontCardOffer({
  offer,
  setFrontShouldTurnUp,
  frontShouldTurnUp,
}: FrontCardProps) {
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    if ((frontShouldTurnUp as CardTurnUp).waiting) {
      clearTimeout(timerId);
      setTimerId(undefined);
    }
  }, [frontShouldTurnUp, timerId]);

  const job = offer?.job;
  const jobTitle = job?.title;
  const company = offer?.company;
  const requirs = offer?.requirements;

  return offer ? (
    <div className="absolute h-full w-full backface-hidden group group-hover:invisible flex flex-col dark:lightDarkBg bg-white justify-between box-border rounded-[14px]">
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-start justify-between gap-[12px] w-full p-[16px] box-border min-h-[92px]">
          <div className="flex flex-col items-start justify-between h-full">
            {jobTitle && (jobTitle as Translated)[language as "fr" | "en"] && (
              <h3 className="my-0 dark:text-white font-bold">
                {(jobTitle as Translated)[language as "fr" | "en"]}
              </h3>
            )}
            {offer.location && (
              <div className="dark:text-grey300 text-left text-[14px]">
                {offer.location}
              </div>
            )}
          </div>
          <div className="text-[18px] cursor-pointer flex-bet h-full flex-col">
            {offer.contractType && (
              <span className="dark:text-grey300 font-normal text-[14px]">
                {offer?.contractType}
              </span>
            )}
            <div>
              <TooltipedAsset asset={t("see-more-info")}>
                <Link href={`/offres/${(offer as Offer).slug}`}>
                  <div>
                    <CustomIcon onClick={() => {}} name={CustomIconName.file} />
                  </div>
                </Link>
              </TooltipedAsset>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-grey300 dark:bg-black" />
        <div className="flex-center flex-col w-full gap-[6px]">
          <div className="flex-bet w-full gap-[6px]">
            {!!offer.limitDate && (
              <TooltipedAsset asset={t("limitDate")}>
                <div className="flex-1 legend bg-deepPurple50 dark:extraLightDarkBg rounded-lg dark:text-grey200">
                  {formatToDatetime(
                    offer.limitDate,
                    true,
                    true,
                    true,
                    language
                  )}
                </div>
              </TooltipedAsset>
            )}
            <div className="flex-1 text-[9px] text-grey500 xs:hidden sm:hidden md:hidden">
              {t("hover-for-swaping")}
            </div>
            {!!offer.revenue && (
              <TooltipedAsset asset={t("income-offered")}>
                <div className="flex-1 legend bg-deepPurple50 dark:extraLightDarkBg rounded-lg dark:text-grey200">
                  {`${offer.revenue}€`}
                </div>
              </TooltipedAsset>
            )}
          </div>
          <div className="flex-bet w-full gap-[6px]">
            {!!offer.remote && (
              <TooltipedAsset asset={t("remote")}>
                <div className="flex-1 legend bg-deepPurple50 dark:extraLightDarkBg rounded-lg dark:text-grey200">
                  {t(offer.remote)}
                </div>
              </TooltipedAsset>
            )}
          </div>
        </div>
      </div>

      <div className="flex-center box-border"></div>

      {offer.rebroadcast ? (
        <div className="flex-center flex-col">
          <span className="bg-deepPurple50 text-deepPurple900 w-fit rounded-[12px] py-[6px] max-w-[160px] text-[14px]">
            <span className="mx-[3px] font-bold">Offre rediffusée</span>
            par YouMeet
          </span>
        </div>
      ) : company?.name && company.logo && company.logo.secure_url ? (
        <div className="flex-center flex-col">
          <Image
            src={company.logo.secure_url as string}
            alt={`Le logo de l'entreprise ${company.name}`}
            width={70}
            height={70}
            style={{ objectFit: "contain" }}
          />
          <span className="font-light dark:text-white">{company.name}</span>
        </div>
      ) : undefined}
      <div
        onMouseEnter={() => {
          const timerId = setTimeout(() => {
            if (!xs && !sm) {
              setFrontShouldTurnUp({ id: offer?.id as string });
            }
          }, 300);
          setTimerId(timerId);
        }}
        onClick={() => {
          if (xs || sm || md) setFrontShouldTurnUp({ id: offer?.id as string });
        }}
        className="group relative box-border border-[1px] border-solid border-blueGrey50 dark:border-black rounded-[14px] bg-grey50 dark:lightDarkBg dark:hover:extraLightDarkBg relative h-[40%]"
      >
        <div className="dark:text-grey400 text-[14px]">
          {t("requirements-skills")}
        </div>
        {requirs && requirs.length > 0 ? (
          <div className="absolute bottom-0 flex group-hover:hidden flex-wrap gap-[1px] p-[3px]">
            {requirs.map(
              (req) =>
                req?.title && (
                  <div
                    key={req?.id}
                    className="p-[4px] bg-deepPurple50 dark:extraLightDarkBg dark:text-grey200 text-[14px] rounded-[7px]"
                  >
                    {req?.title[0].toUpperCase() + req?.title?.slice(1)}
                  </div>
                )
            )}
          </div>
        ) : undefined}
        <div className="absolute top-0 w-full hidden flex-center h-full">
          <div className="w-full hidden flex-center h-full relative">
            <span className="absolute text-[8px] hidden group-hover:block group-hover:animate-ping dark:text-white">
              {t("return")}
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center mx-[24px] flex-1 items-end">
          <div className="flex flex-col w-full"></div>
        </div>
      </div>
    </div>
  ) : undefined;
}
