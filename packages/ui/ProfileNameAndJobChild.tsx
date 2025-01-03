"use client";

import { Skeleton } from "@mui/material";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const ProfileNameAndJob = dynamic(() => import("./ProfileNameAndJob"), {
  ssr: false,
  loading: () => (
    <div className="h-[93.5px] flex-center flex-col border-[0.5px] border-solid border-grey300">
      <Skeleton width={"40%"} height={24} />
      <Skeleton width={"20%"} height={14} />
    </div>
  ),
});

export default function ProfilePartComponent({
  profil,
  account,
}: {
  profil: BetaUser;
  account?: boolean;
}) {
  return <ProfileNameAndJob profil={profil} account={account} />;
}
