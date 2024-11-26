"use client";

import dynamic from "next/dynamic";
import { BetaUser } from "@youmeet/gql/generated";

const ProfileViewsComponent = dynamic(() => import("./ProfileViewsComponent"), {
  ssr: false,
});

export default function fnc({ profil }: { profil: BetaUser }) {
  return (
    <ProfileViewsComponent
      profil={profil}
      hideTooltip={() => {}}
      showTooltip={() => {}}
      updateTooltip={() => {}}
      tooltipOpen={false}
    />
  );
}
