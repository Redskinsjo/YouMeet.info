"use client";
import { Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
const ApplyBtn = dynamic(() => import("./ApplyBtn"), { ssr: false });

export default function fnc({ offre }: { offre?: Offer }) {
  return <ApplyBtn offre={offre} />;
}
