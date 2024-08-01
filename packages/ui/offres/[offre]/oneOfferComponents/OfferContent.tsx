"use client";
import { deepPurple } from "@mui/material/colors";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import BoldText from "../../../BoldText";
import DetailComponent from "../../../DetailComponent";
import CompetencyLink from "../../../CompetencyLink";
import { formatToDatetime } from "@youmeet/utils/formatToDatetime";
import { OfferContentValues } from "@youmeet/types/OfferContentValues";
import Link from "next/link";
import { CiLink } from "react-icons/ci";
import { createElement, useEffect, useState } from "react";
import setFileUrl from "@youmeet/utils/setFileUrl";
import Image from "next/image";
import { Offer } from "@youmeet/gql/generated";
import getOfferOrPreviewValues from "@youmeet/utils/getOfferOrPreviewValues";
import React from "react";

export default function OfferContent({ offre }: { offre: Offer }) {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const xs = useMediaQuery("(max-width:600px)");
  const sm = useMediaQuery("(max-width:720px)");
  const md = useMediaQuery("(max-width:900px)");
  const [values, setValues] = useState<OfferContentValues | undefined>();
  const [loading, setLoading] = useState(true);

  const getValues = async () => {
    if (offre.company?.id) {
      const values = await getOfferOrPreviewValues(
        offre,
        language as "fr" | "en",
        offre.company?.id
      );
      setValues(values);
    }
  };

  useEffect(() => {
    getValues();
    setLoading(false);
  }, []);

  if (loading) return undefined;

  return (
    !!values && (
      <div className="dark:mediumDarkBg bg-white flex w-full flex-col items-center py-[12px] px-[24px] xs:p-[6px] sm:p-[6px] md:p-[6px] box-border gap-[24px] rounded-[16px] shadow-custom h-full">
        <div>
          {values.rebroadcast && (
            <div className="flex-1 text-[16px] flex-center flex-col gap-[6px] p-[6px] bg-grey50 dark:lightDarkBg text-deepPurple500 dark:text-deepPurple200 text-center">
              <span className="mt-[12px] bg-deepPurple50 text-deepPurple900 rounded-[14px] p-[12px] xs:p-[8px] sm:p-[8px] md:p-[8px] text-[16px] flex flex-col">
                <span className="mx-[3px] font-bold whitespace-nowrap">
                  Offre rediffusée
                </span>
                <span>par YouMeet</span>
              </span>
              <BoldText
                text={t("youmeet-not-recruiting")}
                fontSizeClass="text-[13px] text-grey600 dark:text-grey200"
              />
            </div>
          )}

          {values.companyLogo &&
            setFileUrl(values.companyLogo) &&
            values.companyName !== "YouMeet" && (
              <Image
                src={setFileUrl(values.companyLogo) as string}
                width={60}
                height={60}
                alt="logo de l'entreprise qui recrute et qui diffuse cette opportunité de travail"
                style={{ objectFit: "contain" }}
              />
            )}
          <div className="flex-center w-full">
            {values.jobTitle ? (
              <div className="m-[6px] flex w-full">
                <div className="flex-1" />
                <h1 className="flex-[2] text-[24px] dark:text-white text-black font-bold text-center">
                  {values.jobTitle}
                </h1>
                <div className="flex-1" />
              </div>
            ) : (
              <div className="m-[24px] w-[15%] flex-center flex-col italic">
                {t("jobTitle")}
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
        </div>

        {values.content && (
          <div className="flex-center flex-col w-full box-border px-[6px]">
            <DetailComponent
              labelInBold
              labelUnderline
              fontSize={"16px"}
              valueInBold
              labelComponent="h2"
              label={t("me-profile-infos-label-description")}
              noLabelColon
              conversation
              newStyles={{ display: "flex", alignItems: "center" }}
              fullWidth
              value={
                <div className="w-full">
                  <BoldText
                    formatDisplay
                    fontSizeClass="bg-grey50 rounded-xl py-[6px] px-[2px] dark:lightDarkBg"
                    skeletonCount={3}
                    links
                    align="justify"
                    text={values.content || ""}
                    containerStyle={{
                      lineHeight: 1.5,
                      fontSize: "16px",
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
          <div className="flex-center flex-col w-full box-border px-[6px]">
            <DetailComponent
              labelInBold
              labelUnderline
              fontSize={"16px"}
              valueInBold
              labelComponent="h2"
              label={t("profileSearched")}
              noLabelColon
              conversation
              newStyles={{ display: "flex", alignItems: "center" }}
              fullWidth
              value={
                <div className="w-full">
                  <BoldText
                    formatDisplay
                    fontSizeClass="bg-grey50 rounded-xl py-[6px] px-[2px] dark:lightDarkBg"
                    links
                    skeletonCount={3}
                    align="justify"
                    text={values.profileSearched || ""}
                    containerStyle={{
                      lineHeight: 1.5,
                      fontSize: "16px",
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
                fontSize={"16px"}
                valueInBold
                labelComponent="h2"
                labelUnderline
                label={t("offerRequirements")}
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
                    {values.requirements.map((req) =>
                      req ? (
                        <CompetencyLink key={req?.id} requirement={req} />
                      ) : undefined
                    )}
                  </div>
                }
              />
            </div>
          ) : undefined}
        </div>

        <div className="w-full">
          <h2 className="font-bold dark:text-white text-center">
            {t("more-details")}
          </h2>
          <div className="w-full flex flex-wrap xs:flex-col sm:flex-col md:flex-col xs:items-start sm:items-start md:items-start items-center justify-between px-[6px] box-border">
            <div className="flex gap-[12px] w-full flex-wrap">
              {values.revenue && Number(values.revenue) > 0 && (
                <DetailComponent
                  conversation={xs || sm || md}
                  labelComponent="h3"
                  newStyles={{ minWidth: "unset", maxWidth: "400px" }}
                  fontSize={"16px"}
                  valueInBold
                  noLabelColon
                  label={t("offerRevenue")}
                  value={String(
                    Math.round(Number(Number(values.revenue).toFixed(0)))
                  )}
                  type="modal"
                />
              )}
              {values.contractType && (
                <DetailComponent
                  conversation={xs || sm || md}
                  labelComponent="h3"
                  newStyles={{ minWidth: "unset", maxWidth: "400px" }}
                  fontSize={"16px"}
                  valueInBold
                  noLabelColon
                  type="modal"
                  label={t("contractType")}
                  value={t(values.contractType)}
                />
              )}
              {values.remote && (
                <DetailComponent
                  conversation={xs || sm || md}
                  labelComponent="h3"
                  newStyles={{ minWidth: "unset", maxWidth: "400px" }}
                  fontSize={"16px"}
                  valueInBold
                  noLabelColon
                  type="modal"
                  label={t("remote")}
                  value={t(values.remote)}
                />
              )}
            </div>
            <div className="flex gap-[12px] w-full flex-wrap">
              {values.limitDate && (
                <DetailComponent
                  conversation={xs || sm || md}
                  labelComponent="h3"
                  newStyles={{ minWidth: "unset", maxWidth: "400px" }}
                  fontSize={"16px"}
                  valueInBold
                  noLabelColon
                  type="modal"
                  label={t("limitDate")}
                  value={formatToDatetime(
                    values.limitDate,
                    true,
                    true,
                    true,
                    language
                  )}
                />
              )}
              {values.jobDescriptionLink && (
                <DetailComponent
                  conversation={xs || sm || md}
                  labelComponent="h3"
                  newStyles={{ minWidth: "unset", maxWidth: "400px" }}
                  fontSize={"16px"}
                  valueInBold
                  noLabelColon
                  type="modal"
                  label={t("jobDescriptionLink")}
                  value={
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
                />
              )}
            </div>
            <div className="flex gap-[12px] w-full flex-wrap">
              {values.companyName && (
                <DetailComponent
                  conversation={xs || sm || md}
                  labelComponent="h3"
                  newStyles={{ minWidth: "unset", maxWidth: "400px" }}
                  fontSize={"16px"}
                  valueInBold
                  noLabelColon
                  type="modal"
                  label={"Nom de l'entreprise"}
                  value={values.companyName}
                />
              )}
              {values.location && (
                <DetailComponent
                  conversation={xs || sm || md}
                  labelComponent="h3"
                  newStyles={{ minWidth: "unset", maxWidth: "400px" }}
                  fontSize={"16px"}
                  valueInBold
                  noLabelColon
                  type="modal"
                  label={"Localisation"}
                  value={values.location}
                />
              )}
              {values.createdAt && (
                <DetailComponent
                  conversation={xs || sm || md}
                  labelComponent="h3"
                  newStyles={{ minWidth: "unset", maxWidth: "400px" }}
                  fontSize={"16px"}
                  valueInBold
                  noLabelColon
                  type="modal"
                  label={t("createdAt")}
                  value={
                    values.createdAt
                      ? formatToDatetime(
                          values.createdAt,
                          true,
                          false,
                          false,
                          language
                        )
                      : formatToDatetime(
                          new Date().toString(),
                          true,
                          false,
                          false,
                          language
                        )
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
