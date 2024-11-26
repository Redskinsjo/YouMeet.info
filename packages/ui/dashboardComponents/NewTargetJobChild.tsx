"use client";

import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const NewTargetJobComponent = dynamic(() => import("./NewTargetJobComponent"), {
  ssr: false,
});

export default function fnc({ profil }: { profil: BetaUser }) {
  return <NewTargetJobComponent profil={profil} />;
}
