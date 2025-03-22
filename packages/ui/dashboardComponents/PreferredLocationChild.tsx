"use client";

import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const PreferredLocation = dynamic(() => import("./PreferredLocation"), {
  ssr: false,
});

export default function fnc({ profil }: { profil: BetaUser }) {
  return <PreferredLocation profil={profil} />;
}
