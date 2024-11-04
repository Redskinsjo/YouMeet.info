"use client";

import { Skeleton } from "@mui/material";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const ProfileCVComponent = dynamic(() => import("./ProfileCVComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex-center flex-col w-full">
      <Skeleton width={"100%"} height={18} />
      <Skeleton width={"65%"} height={18} />
    </div>
  ),
});

export default function ProfilePartComponent({
  profil,
  account,
}: {
  profil: BetaUser | undefined;
  account?: boolean;
}) {
  return <ProfileCVComponent profil={profil} account={account} />;
}
