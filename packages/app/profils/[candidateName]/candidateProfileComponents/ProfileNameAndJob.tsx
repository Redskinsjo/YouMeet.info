"use client";
import { BetaUser } from "@youmeet/gql/generated";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProfileNameAndJob({
  profil,
  account,
}: {
  profil: BetaUser;
  account?: boolean;
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <div className="h-fit border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
      <div className="px-[12px] py-[12px] xs:px-[24px] sm:px-[24px] md:px-[24px] flex-center flex-col">
        {account && <span className="dark:text-grey300">{t("welcome")}</span>}
        <h1
          className={
            account
              ? "my-0 font-bold item flex-center dark:text-white"
              : "my-0 font-bold text-[15px] flex-center dark:text-white"
          }
        >
          {profil && profil?.firstname ? profil.firstname : ""}{" "}
          {profil && profil?.lastname?.toUpperCase()
            ? profil.lastname.toUpperCase()
            : ""}
        </h1>
        {profil &&
          !account &&
          profil.candidate?.targetJob?.title &&
          !profil.hiddenFields?.includes("targetJob") && (
            <h2 className="my-0 item font-medium text-center dark:text-white">
              {profil.candidate?.targetJob?.title[language as "fr" | "en"]}
            </h2>
          )}
      </div>
    </div>
  );
}
