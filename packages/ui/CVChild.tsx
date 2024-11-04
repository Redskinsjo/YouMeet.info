"use client";

import { Skeleton } from "@mui/material";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const NewCVUpload = dynamic(() => import("@youmeet/ui/NewCVUpload"), {
  ssr: false,
  loading: () => (
    <div className="flex-bet w-full px-[12px] box-border">
      <div />
      <Skeleton width={65} height={18} />
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
  return <NewCVUpload profil={profil} account={account} />;
}
