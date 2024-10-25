import { Skeleton } from "@mui/material";
import { BetaDetails, BetaUser, Reference } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import PersonalInfos from "./PersonalInfos";

const NewReferencesComponent = dynamic(
  () => import("./NewReferencesComponent"),
  { ssr: false }
);
const ProfileNameAndJob = dynamic(() => import("./ProfileNameAndJob"), {
  ssr: false,
  loading: () => (
    <div className="h-[93.5px] flex-center flex-col shadow-custom">
      <Skeleton width={"40%"} height={24} />
      <Skeleton width={"20%"} height={14} />
    </div>
  ),
});
const ProfileAvatar = dynamic(() => import("./ProfileAvatar"));
const ProfileCVComponent = dynamic(() => import("./ProfileCVComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex-center flex-col w-full">
      <Skeleton width={"100%"} height={18} />
      <Skeleton width={"65%"} height={18} />
    </div>
  ),
});

const NewCVUpload = dynamic(() => import("@youmeet/ui/NewCVUpload"), {
  ssr: false,
  loading: () => (
    <div className="flex-bet w-full px-[12px] box-border">
      <div />
      <Skeleton width={65} height={18} />
    </div>
  ),
});
const DiscoverMoreUsers = dynamic(() => import("./DiscoverMoreUsers"), {
  ssr: false,
});

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
    <div className="flex flex-col w-[22%] xs:w-full sm:w-full md:w-full min-w-[390px] xs:min-w-full sm:min-w-full md:min-w-full h-auto bg-white dark:extraLightDarkBg">
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
