"use client";

import OneLineSkeleton from "../OneLineSkeleton";
import { BetaUser, Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const DashboardContent = dynamic(() => import("./DashboardContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full p-[12px] px-[24px] flex flex-col gap-[12px] box-border">
      <div>
        <OneLineSkeleton width="120px" height="18px" />
        <div className="w-full flex-center">
          <OneLineSkeleton width="300px" height="200px" />
        </div>
      </div>
      <div className="flex-bet">
        <OneLineSkeleton width="90px" height="18px" />
        <OneLineSkeleton width="220px" height="22px" />
      </div>
      <div className="flex-bet">
        <OneLineSkeleton width="90px" height="18px" />
        <OneLineSkeleton width="220px" height="22px" />
      </div>
    </div>
  ),
});

export default function fnc({
  profil,
  opps,
}: {
  profil: BetaUser;
  opps: Offer[];
}) {
  return <DashboardContent profil={profil} opps={opps} />;
}
