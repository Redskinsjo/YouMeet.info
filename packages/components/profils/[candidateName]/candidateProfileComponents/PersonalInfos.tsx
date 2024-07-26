"use client";
import { useState } from "react";
import TogglePersonalInfo from "./TogglePersonalInfo";
import NewProfileComponent from "./NewProfileComponent";
import isProfileEmpty from "@youmeet/utils/isProfileEmpty";
import { BetaDetails, BetaUser } from "@youmeet/gql/generated";
import ProfileDescription from "./ProfileDescription";
import React from "react";

export default function PersonalInfos({
  profil,
  details,
  account,
}: {
  profil?: BetaUser;
  details?: BetaDetails;
  account?: boolean;
}) {
  const [personalInfo, setPersonalInfo] = useState<boolean>(false);
  return (
    <>
      <TogglePersonalInfo setPersonalInfo={setPersonalInfo} />

      {!!personalInfo && !!profil && !isProfileEmpty(profil) ? (
        <NewProfileComponent
          details={details as BetaDetails}
          profil={profil}
          account={account}
        />
      ) : undefined}

      {!!personalInfo &&
        !!profil?.description &&
        (!profil?.hiddenFields?.includes("description") || !account) && (
          <ProfileDescription profil={profil} account={account} />
        )}
    </>
  );
}
