"use client";

import OneLineSkeleton from "../OneLineSkeleton";
import { Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const OfferContent = dynamic(() => import("./OfferContent"), {
  ssr: false,
  loading: () => (
    <div className="h-full p-[6px] shadow-custom flex flex-col gap-[24px] w-full box-border">
      <div className="flex-center">
        <OneLineSkeleton width="110px" height="22px" />
      </div>
      <OneLineSkeleton count={7} height="18px" />
    </div>
  ),
});

export default function fnc({ offre }: { offre: Offer }) {
  return <OfferContent offre={offre} />;
}
