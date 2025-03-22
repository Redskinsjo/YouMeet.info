"use client";

import OneLineSkeleton from "../OneLineSkeleton";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const DashboardTabs = dynamic(() => import("./DashboardTabs"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-wrap gap-[24px] p-[12px] px-[24px]">
      <OneLineSkeleton width="90px" height="20px" />
      <OneLineSkeleton width="90px" height="20px" />
      <div className="xs:hidden sm:hidden flex flex-wrap gap-[24px]">
        <OneLineSkeleton width="90px" height="20px" />
        <OneLineSkeleton width="90px" height="20px" />
      </div>
      <div className="xs:flex sm:flex hidden flex-wrap gap-[24px]">
        <OneLineSkeleton width="50px" height="20px" />
      </div>
    </div>
  ),
});

export default function fnc({ profil }: { profil: BetaUser }) {
  return <DashboardTabs profil={profil} />;
}
