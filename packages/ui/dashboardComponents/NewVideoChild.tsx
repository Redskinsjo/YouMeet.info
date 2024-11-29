"use client";

import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const NewVideoComponent = dynamic(() => import("./NewVideoComponent"), {
  ssr: false,
});

export default function fnc({ profil }: { profil: BetaUser }) {
  return <NewVideoComponent profil={profil} />;
}
