"use client";
import dynamic from "next/dynamic";
import MeetsLoading from "./MeetsLoading";
import { BetaUser } from "@youmeet/gql/generated";

const CardsComponent = dynamic(() => import("./CardsComponent"), {
  ssr: false,
  loading: () => <MeetsLoading />,
});

export default function fnc({
  dataType,
  profil,
}: {
  dataType: "candidates" | "favorites";
  profil: BetaUser;
}) {
  return <CardsComponent dataType={dataType} profil={profil} />;
}
