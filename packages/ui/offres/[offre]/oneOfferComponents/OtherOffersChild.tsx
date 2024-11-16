"use client";

import { Skeleton } from "@mui/material";
import { Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import OneLineSkeleton from "../../../OneLineSkeleton";

const OtherOffersComponent = dynamic(() => import("./OtherOffersComponent"), {
  ssr: false,
  loading: () => (
    <div className="p-[6px] shadow-custom flex flex-col gap-[12px] w-full">
      <div className="flex-bet">
        <OneLineSkeleton width={"48px"} height={"18px"} />
        <OneLineSkeleton width={"60px"} height={"18px"} />
      </div>
      <div className="flex-bet">
        <OneLineSkeleton width={"60px"} height={"18px"} />
        <OneLineSkeleton width={"120px"} height={"18px"} />
      </div>
      <div className="flex-bet">
        <OneLineSkeleton width={"48px"} height={"18px"} />
        <OneLineSkeleton width={"48px"} height={"18px"} />
      </div>
      <div className="flex-bet">
        <OneLineSkeleton width={"48px"} height={"18px"} />
        <OneLineSkeleton width={"48px"} height={"18px"} />
      </div>
      <div className="flex-bet">
        <OneLineSkeleton width={"48px"} height={"18px"} />
        <OneLineSkeleton width={"96px"} height={"18px"} />
      </div>
    </div>
  ),
});

export default function fnc({ offre }: { offre: Offer }) {
  return <OtherOffersComponent offre={offre} />;
}
