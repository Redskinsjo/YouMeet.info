"use client";
import { BetaUser } from "@youmeet/gql/generated";
import DetailComponent from "./DetailComponent";
import BoldText from "./BoldText";
import { useTranslation } from "react-i18next";
import React from "react";

export default function ProfileDescription({
  profil,
  account,
}: {
  profil: BetaUser;
  account?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div className="infos-component">
      <DetailComponent
        type="modal"
        noLabelColon
        noPadding
        labelFullWidth
        fullWidth
        name="description"
        conversation
        account={account}
        label={t("me-organisation-infos-label-resume")}
        value={
          profil?.description ? (
            <BoldText
              text={`${profil?.description}+`}
              align="justify"
              fontSizeClass="leading-[1.37] font-normal indent-4 xs:indent-0 sm:indent-0 md:indent-0"
              containerStyle={{
                fontSize: "unset",
                fontWeight: "normal",
              }}
              links
            />
          ) : (
            <div className="w-full flex justify-start italic legend font-extralight dark:text-grey300">
              {"-"}
            </div>
          )
        }
      />
    </div>
  );
}
