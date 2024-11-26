"use client";

import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const NewTargetContractTypeComponent = dynamic(
  () => import("./NewTargetContractTypeComponent"),
  {
    ssr: false,
  }
);

export default function fnc({ profil }: { profil: BetaUser }) {
  return <NewTargetContractTypeComponent profil={profil} />;
}
