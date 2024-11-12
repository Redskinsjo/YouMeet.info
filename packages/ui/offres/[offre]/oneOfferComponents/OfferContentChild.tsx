"use client";

import { Skeleton } from "@mui/material";
import { Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const OfferContent = dynamic(() => import("./OfferContent"), {
  ssr: false,
  loading: () => (
    <div className="h-[140px] p-[6px] shadow-custom">
      <div className="flex-bet">
        <Skeleton width={60} height={18} />
        <Skeleton width={48} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={48} height={18} />
        <Skeleton width={60} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={60} height={18} />
        <Skeleton width={120} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={48} height={18} />
        <Skeleton width={48} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={48} height={18} />
        <Skeleton width={48} height={18} />
      </div>
      <div className="flex-bet">
        <Skeleton width={48} height={18} />
        <Skeleton width={96} height={18} />
      </div>
    </div>
  ),
});

export default function fnc({ offre }: { offre: Offer }) {
  return <OfferContent offre={offre} />;
}
