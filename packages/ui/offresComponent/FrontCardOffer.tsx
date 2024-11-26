import Image from "next/image";
import { FrontCardProps } from "@youmeet/types/FrontCardProps";
import { CompetenceFt, Competency, Translated } from "@youmeet/gql/generated";
import { useTranslation } from "react-i18next";
import { formatToDatetime } from "@youmeet/utils/basics/formatToDatetime";
import TooltipedAsset from "../TooltipedAsset";
import Link from "next/link";
import CustomIcon from "../CustomIcon";
import { CustomIconName } from "@youmeet/types/CustomIconProps";
import setFileUrl from "@youmeet/utils/basics/setFileUrl";

export default function FrontCardOffer({ offer }: FrontCardProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const job = offer?.job;
  const company = offer?.company;
  const required = (title: string | null | undefined) =>
    title ? title[0].toUpperCase() + title?.slice(1) : undefined;

  const listReqs = (
    list: (Competency | null)[] | (CompetenceFt | null)[] | undefined | null
  ) => (list ? list.map((c: any) => required(c?.title || c?.libelle)) : []);
  const requirements =
    listReqs(offer?.requirements) || listReqs(offer?.competences);

  const jobTitle =
    (job?.title && (job?.title as Translated)[language as "fr" | "en"]) ||
    offer?.romeLibelle;
  const location = offer?.location || offer?.lieuTravail?.libelle;
  const contractType = offer?.contractType || offer?.typeContratLibelle;
  const slug = offer?.slug;
  const limitDate = offer?.limitDate;
  const revenue = offer?.revenue || offer?.salaire?.libelle;
  const remote = offer?.remote;
  const rebroadcast = offer?.rebroadcast || !offer?.entreprise?.logo;
  const logo = setFileUrl(company?.logo) || offer?.entreprise?.logo;

  return offer ? (
    <div className="absolute h-full w-full backface-hidden group group-hover:invisible flex flex-col dark:lightDarkBg bg-white justify-between box-border rounded-[14px]">
      <div className="flex flex-col gap-[6px]">
        <div className="flex items-start justify-between gap-[12px] w-full p-[16px] box-border min-h-[92px]">
          <div className="flex flex-col items-start justify-between h-full">
            {!!jobTitle && (
              <h3 className="my-0 dark:text-white font-bold">{jobTitle}</h3>
            )}
            {!!location && (
              <div className="dark:text-grey300 text-left text-[14px]">
                {location}
              </div>
            )}
          </div>
          <div className="text-[18px] cursor-pointer flex-bet h-full flex-col">
            {!!contractType && (
              <span className="dark:text-grey300 font-normal text-[14px]">
                {contractType}
              </span>
            )}
            {!!slug && (
              <div>
                <TooltipedAsset asset={t("see-more-info")}>
                  <Link href={`/offres/${slug}`}>
                    <div>
                      <CustomIcon
                        onClick={() => {}}
                        name={CustomIconName.file}
                      />
                    </div>
                  </Link>
                </TooltipedAsset>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-grey300 dark:bg-black" />
        <div className="flex-center flex-col w-full gap-[6px]">
          <div className="flex-bet w-full gap-[6px]">
            {!!limitDate && (
              <TooltipedAsset asset={t("limitDate")}>
                <div className="flex-1 legend bg-deepPurple50 dark:extraLightDarkBg rounded-lg dark:text-grey200">
                  {formatToDatetime(limitDate, true, true, true, language)}
                </div>
              </TooltipedAsset>
            )}
            <div className="flex-1 text-[9px] text-grey500 xs:hidden sm:hidden md:hidden">
              {t("hover-for-swaping")}
            </div>
            {!!revenue && (
              <TooltipedAsset asset={t("income-offered")}>
                <div className="flex-1 legend bg-deepPurple50 dark:extraLightDarkBg rounded-lg dark:text-grey200">
                  {`${revenue}€`}
                </div>
              </TooltipedAsset>
            )}
          </div>
          <div className="flex-bet w-full gap-[6px]">
            {!!remote && (
              <TooltipedAsset asset={t("remote")}>
                <div className="flex-1 legend bg-deepPurple50 dark:extraLightDarkBg rounded-lg dark:text-grey200">
                  {t(remote)}
                </div>
              </TooltipedAsset>
            )}
          </div>
        </div>
      </div>

      <div className="flex-center box-border"></div>

      {!!rebroadcast ? (
        <div className="flex-center flex-col">
          <span className="bg-deepPurple50 text-deepPurple900 w-fit rounded-[12px] py-[6px] max-w-[160px] text-[14px]">
            <span className="mx-[3px] font-bold">Offre rediffusée</span>
            par YouMeet
          </span>
        </div>
      ) : company?.name && logo ? (
        <div className="flex-center flex-col">
          <Image
            src={logo as string}
            alt={`Le logo de l'entreprise ${company.name}`}
            width={70}
            height={70}
            style={{ objectFit: "contain" }}
          />
          <span className="font-light dark:text-white">{company.name}</span>
        </div>
      ) : undefined}
      <div className="group relative box-border border-[1px] border-solid border-blueGrey50 dark:border-black rounded-[14px] bg-grey50 dark:lightDarkBg dark:hover:extraLightDarkBg relative h-[40%]">
        <div className="dark:text-grey400 text-[14px]">
          {t("requirements-skills")}
        </div>
        {requirements && requirements.length > 0 ? (
          <div className="absolute bottom-0 flex group-hover:hidden flex-wrap gap-[1px] p-[3px]">
            {requirements.map(
              (req, i) =>
                req && (
                  <div
                    key={req + i}
                    className="p-[4px] bg-deepPurple50 dark:extraLightDarkBg dark:text-grey200 text-[14px] rounded-[7px]"
                  >
                    {req}
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
