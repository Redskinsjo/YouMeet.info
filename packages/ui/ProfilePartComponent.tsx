import React from "react";
import { BetaDetails, BetaUser, Reference } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const NewReferencesComponent = dynamic(
  () => import("./NewReferencesComponent")
);
const ProfileNameAndJob = dynamic(() => import("./ProfileNameAndJob"));
const ProfileAvatar = dynamic(() => import("./ProfileAvatar"));
const ProfileCVComponent = dynamic(() => import("./ProfileCVComponent"));
const PersonalInfos = dynamic(() => import("./PersonalInfos"));
const NewCVUpload = dynamic(() => import("@youmeet/ui/NewCVUpload"));
const DiscoverMoreUsers = dynamic(() => import("./DiscoverMoreUsers"));

export default function ProfilePartComponent({
  profil,
  details,
  account,
  users,
  references,
}: {
  profil?: BetaUser;
  details?: BetaDetails;
  account?: boolean;
  users?: BetaUser[];
  references: Reference[];
}) {
  return (
    <div className="flex flex-col w-[22%] xs:w-full sm:w-full md:w-full min-w-[390px] xs:min-w-full sm:min-w-full md:min-w-full h-auto">
      <div className="sticky top-0 left-0 h-full flex flex-col gap-[6px] xs:gap-[1px] sm:gap-[1px] md:gap-[1px] h-full">
        {!!profil && <ProfileNameAndJob profil={profil} account={account} />}

        <div className="flex-center flex-col gap-[12px] p-[12px] border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
          <ProfileAvatar profil={profil} />
          <ProfileCVComponent profil={profil} account={account} />
        </div>

        {account ? (
          <NewCVUpload account={account} profil={profil} />
        ) : undefined}

        <PersonalInfos account={account} profil={profil} details={details} />

        {!account && !!profil ? (
          <NewReferencesComponent references={references} />
        ) : undefined}

        {!!users && <DiscoverMoreUsers users={users} profil={profil} />}
      </div>
    </div>
  );
}
