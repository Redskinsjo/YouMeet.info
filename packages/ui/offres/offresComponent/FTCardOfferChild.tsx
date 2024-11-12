"use client";

import { Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const FTCardOffer = dynamic(() => import("./FTCardOffer"), { ssr: false });

export default function fnc({ el, length }: { el: Offer; length?: number }) {
  return <FTCardOffer el={el} length={length} />;
}
