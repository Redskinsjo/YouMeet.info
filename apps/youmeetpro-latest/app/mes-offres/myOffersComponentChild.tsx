"use client";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const MyOffersChild = dynamic(() => import("./myOffersChild"), { ssr: false });

export default function fnc({ profil }: { profil: BetaUser }) {
  return <MyOffersChild profil={profil} />;
}
