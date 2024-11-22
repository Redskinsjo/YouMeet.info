"use client";
import { useTranslation } from "react-i18next";
import CompetencyLink from "../../../CompetencyLink";
import { formatToDatetime } from "@youmeet/utils/basics/formatToDatetime";
import { OfferContentValues } from "@youmeet/types/OfferContentValues";
import Link from "next/link";
import { CiLink } from "react-icons/ci";
import { createElement, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Offer } from "@youmeet/gql/generated";
import getOfferOrPreviewValues from "@youmeet/utils/basics/getOfferOrPreviewValues";
import dynamic from "next/dynamic";
import TooltipedAsset from "../../../TooltipedAsset";

const DoubleDetails = dynamic(() => import("./DoubleDetails"));
const BoldText = dynamic(() => import("../../../TextChild"));
const DetailComponent = dynamic(() => import("../../../DetailComponent"));

export default function OfferContent({ offre }: { offre: Offer }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [values, setValues] = useState<OfferContentValues | undefined>();

  const getValues = useCallback(async () => {
    const values = await getOfferOrPreviewValues(
      offre,
      language as "fr" | "en",
      offre?.company?.id || undefined
    );

    setValues(values);
  }, [offre, language]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return (
    !!values && (
      <div className="dark:mediumDarkBg bg-grey50 flex w-full flex-col items-center p-[12px] xs:p-[6px] sm:p-[6px] md:p-[6px] box-border gap-[24px] xs:gap-[12px] sm:gap-[12px] rounded-[16px] shadow-custom h-full overflow-hidden overflow-y-scroll">
        <div className="flex-center flex-col">
          {values.rebroadcast && (
            <div className="flex-1 text-[16px] flex-center flex-col gap-[6px] p-[6px] bg-grey50 dark:lightDarkBg text-deepPurple500 dark:text-deepPurple200 text-center">
              <TooltipedAsset
                asset={
                  <BoldText
                    text={"youmeet-not-recruiting"}
                    fontSizeClass="text-[13px]"
                  />
                }
              >
                <span className="mt-[12px] bg-deepPurple50 text-deepPurple900 rounded-[14px] p-[12px] xs:p-[8px] sm:p-[8px] md:p-[8px] text-[16px] flex flex-col">
                  <span className="mx-[3px] font-bold whitespace-nowrap">
                    Offre rediffusée
                  </span>
                </span>
              </TooltipedAsset>
            </div>
          )}

          {values.logo && values.companyName !== "YouMeet" && (
            <Image
              src={values.logo}
              width={60}
              height={60}
              alt="logo de l'entreprise qui recrute et qui diffuse cette opportunité de travail"
              style={{ objectFit: "contain" }}
            />
          )}
          <div className="flex-center w-full">
            {values.jobTitle && (
              <div className="flex-center w-full">
                <h1 className="flex-[2] text-[24px] dark:text-white text-black font-bold text-center">
                  <div className="bg-white p-[12px] border-[0.5px] border-solid border-grey300 rounded-xl">
                    {values.jobTitle}
                  </div>
                </h1>
              </div>
            )}
          </div>
        </div>

        {values.content && (
          <div className="flex-center flex-col w-full box-border h-fit">
            <DetailComponent
              labelInBold
              labelUnderline
              valueInBold
              labelComponent="h2"
              label={"me-profile-infos-label-description"}
              noLabelColon
              conversation
              newStyles={{ display: "flex", alignItems: "center" }}
              fullWidth
              value={
                <div className="w-full">
                  <BoldText
                    formatDisplay
                    fontSizeClass="bg-white p-[12px] border-[0.5px] border-solid border-grey300 rounded-xl dark:lightDarkBg text-[16px] xs:text-[13px] sm:text-[14px] md:text-[14px]"
                    skeleton={{ count: 3 }}
                    links
                    align="justify"
                    text={values.content || ""}
                    containerStyle={{
                      lineHeight: 1.5,
                      margin: "0px",
                    }}
                  />
                </div>
              }
              type="modal2"
              noPadding
            />
          </div>
        )}
        {values.profileSearched && (
          <div className="flex-center flex-col w-full box-border h-fit">
            <DetailComponent
              labelInBold
              labelUnderline
              valueInBold
              labelComponent="h2"
              label={"profileSearched"}
              noLabelColon
              conversation
              newStyles={{ display: "flex", alignItems: "center" }}
              fullWidth
              value={
                <div className="w-full">
                  <BoldText
                    formatDisplay
                    fontSizeClass="bg-white p-[12px] border-[0.5px] border-solid border-grey300 rounded-xl dark:lightDarkBg text-[16px] xs:text-[13px] sm:text-[13px] md:text-[13px]"
                    links
                    skeleton={{ count: 3 }}
                    align="justify"
                    text={values.profileSearched || ""}
                    containerStyle={{
                      lineHeight: 1.5,
                      margin: "0px",
                    }}
                  />
                </div>
              }
              type="modal2"
              noPadding
            />
          </div>
        )}
        <div className="w-full box-border">
          {values.requirements && values.requirements?.length > 0 ? (
            <div className="flex-center w-full px-[6px] box-border">
              <DetailComponent
                valueInBold
                labelComponent="h2"
                labelUnderline
                label={"offerRequirements"}
                noPadding
                type="modal2"
                fullWidth
                labelFullWidth
                noLabelColon
                conversation={true}
                newStyles={{
                  boxSizing: "border-box",
                }}
                value={
                  <div className="w-full flex gap-[6px] flex-wrap p-[2px] dark:lightDarkBg">
                    {values.requirements.map((req, i) =>
                      req ? (
                        <CompetencyLink key={req + i} str={req} />
                      ) : undefined
                    )}
                  </div>
                }
              />
            </div>
          ) : undefined}
        </div>

        <div className="w-full">
          <h2 className="font-bold dark:text-white text-center text-[18px] underline underline-offset-4">
            {t("more-details")}
          </h2>
          <div className="w-full flex flex-wrap xs:flex-col sm:flex-col md:flex-col xs:items-start sm:items-start md:items-start items-center justify-between box-border bg-white p-[12px] border-[0.5px] border-solid border-grey300 rounded-xl">
            {!!Number(Number(values.revenue).toFixed(0)) && (
              <DoubleDetails
                value1={String(
                  Math.round(Number(Number(values.revenue).toFixed(0)))
                )}
                label1="offerRevenue"
              />
            )}
            <DoubleDetails
              value1={values.secteurActivite}
              label1="Secteur d'activité"
            />
            <DoubleDetails
              label1="contractType"
              value1={values.contractType}
              label2="remote"
              value2={values.remote}
            />
            <DoubleDetails
              value1={formatToDatetime(
                values.limitDate,
                true,
                true,
                true,
                language
              )}
              label1="limitDate"
              value2={
                !!values?.jobDescriptionLink ? (
                  <Link
                    href={values?.jobDescriptionLink}
                    target="_blank"
                    className="flex-center text-blue700 dark:text-blue100 text-[18px]"
                  >
                    {createElement(CiLink)}
                  </Link>
                ) : (
                  ""
                )
              }
              label2="jobDescriptionLink"
            />
            <DoubleDetails
              value1={values.companyName}
              value2={values.location}
              label1="Nom de l'entreprise"
              label2="Localisation"
            />
            <DoubleDetails
              label1="Accessible Travailleur handicapé"
              value1={values.accessibleTH}
              value2={values.alternance}
              label2="Alternance"
            />
            <DoubleDetails
              label1="Appellation"
              value1={values.appellationlibelle}
              value2={values.dureeTravail}
              label2="Durée de travail"
            />
            <DoubleDetails
              label1="Format de travail"
              value1={values.dureeTravailConverti}
              label2="Nombre de postes"
              value2={values.nombrePostes}
            />
            <DoubleDetails
              label1="Qualification"
              value1={values.qualification}
              label2="Outils informatiques"
              value2={values.tools.length > 1 ? values.tools : undefined}
            />
            <DoubleDetails label1="Contact" value1={values.contact} />
          </div>
        </div>
      </div>
    )
  );
}
