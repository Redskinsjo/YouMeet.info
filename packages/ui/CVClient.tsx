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

export default function fnc({
  account,
  profil,
}: {
  account?: boolean;
  profil?: BetaUser | undefined;
}) {
  return <NewCVUpload account={account} profil={profil} />;
}
