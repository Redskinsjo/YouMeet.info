"use client";
import { BetaUser } from "@youmeet/gql/generated";
import BoldText from "./BoldText";
import { useTranslation } from "react-i18next";
import NewLinkComponent from "./NewLinkComponent";
import ProfileCV from "./ProfileCV";
import React from "react";

export default function ProfileCVComponent({
  account,
  profil,
}: {
  account?: boolean;
  profil?: BetaUser;
}) {
  const { t } = useTranslation();

  return account && !!profil ? (
    <div className="flex-center flex-col">
      <BoldText
        text={t("use-this-link")}
        align="justify"
        containerStyle={{ marginBottom: "3px", lineHeight: 1.3 }}
      />
      <NewLinkComponent profil={profil} />
    </div>
  ) : !!profil?.cvFile ? (
    <ProfileCV profil={profil} />
  ) : undefined;
}
