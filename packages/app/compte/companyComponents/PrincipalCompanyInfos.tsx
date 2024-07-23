"use client";
import { uri } from "@youmeet/functions/imports";
import DetailComponent from "@youmeet/components/DetailComponent";
import TooltipedAsset from "@youmeet/components/TooltipedAsset";
import { BetaCompany } from "@youmeet/gql/generated";
import { getLinkedinUrlFromPage } from "@youmeet/utils/formatLinkedin";
import { setUpCase } from "@youmeet/utils/resolveFullname";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaLinkedin } from "react-icons/fa";
import React from "react";

export default function PrincipalCompanyInfos({
  company,
}: {
  company: BetaCompany | null | undefined;
}) {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`${uri}/formulaire-profil?step=1`);
  }, []);
  return (
    <>
      <h3 className="font-bold sentences m-0 dark:text-white flex-center">
        {t("company-infos")}
      </h3>

      <div className="h-[24px] flex-center item h-full">
        <TooltipedAsset asset={`${t("modify-perso-info")}.`}>
          <div>
            <Button
              onClick={() => router.push(`${uri}/formulaire-profil?step=1`)}
              className="dark:extraLightDarkBg dark:text-white"
            >
              {t("modify-company-info")}
            </Button>
          </div>
        </TooltipedAsset>
      </div>

      {!company?.name &&
      !company?.location &&
      !company?.resume &&
      !company?.linkedinProfilePage ? (
        <div className="w-full flex-center italic legend my-[24px] text-grey500">
          {t("no-data")}
        </div>
      ) : undefined}

      {company?.name && (
        <DetailComponent
          type="modal2"
          newClasses="border-[1px] border-solid border-white rounded-xl dark:mediumDarkBg rounded-xl"
          label={t("me-organisation-infos-label-name")}
          value={setUpCase(company?.name)}
          labelFullWidth
        />
      )}
      {company?.location && (
        <DetailComponent
          type="modal2"
          newClasses="border-[1px] border-solid border-white rounded-xl dark:mediumDarkBg rounded-xl"
          label={t("me-organisation-infos-label-location")}
          value={setUpCase(company?.location)}
        />
      )}

      {company?.linkedinProfilePage && (
        <DetailComponent
          type="modal2"
          newClasses="border-[1px] border-solid border-white rounded-xl dark:mediumDarkBg rounded-xl"
          labelFullWidth
          label={t("linkedin-profile-link")}
          value={
            <Link
              href={getLinkedinUrlFromPage(company?.linkedinProfilePage)}
              className="flex-center text-blue600 dark:text-blue200"
            >
              {createElement(FaLinkedin)}
            </Link>
          }
        />
      )}
    </>
  );
}
