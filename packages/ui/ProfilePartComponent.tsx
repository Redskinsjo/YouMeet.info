import { BetaDetails, BetaUser, Reference } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import PersonalInfos from "./PersonalInfos";

const NewReferencesComponent = dynamic(
  () => import("./NewReferencesComponent")
);
const ProfileNameAndJob = dynamic(() => import("./ProfileNameAndJobChild"));
const ProfileAvatar = dynamic(() => import("./ProfileAvatar"));
const ProfileCVComponent = dynamic(() => import("./ProfileCVChild"));

const NewCVUpload = dynamic(() => import("@youmeet/ui/CVChild"));
const DiscoverMoreUsers = dynamic(() => import("./MoreUsersChild"));

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
    <div className="dark:extraLightDarkBg flex flex-col gap-[6px] w-[499px] xs:w-full sm:w-full md:w-full box-border">
      {!!profil && <ProfileNameAndJob profil={profil} account={account} />}

      <div className="flex-center flex-col gap-[12px] p-[12px] border-[0.5px] border-solid border-grey300 dark:border-grey900 dark:extraLightDarkBg">
        <ProfileAvatar profil={profil} />
        <ProfileCVComponent profil={profil} account={account} />
      </div>

      {account ? <NewCVUpload account={account} profil={profil} /> : undefined}

      <PersonalInfos account={account} profil={profil} details={details} />

      {!account && !!profil ? (
        <NewReferencesComponent references={references} />
      ) : undefined}

      {!!users && <DiscoverMoreUsers users={users} profil={profil} />}
    </div>
  );
}
