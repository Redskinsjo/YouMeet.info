"use client";

import OneLineSkeleton from "../../OneLineSkeleton";
import { Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const width = "w-[300px] xs:w-[49%] sm:w-[49%]";

const elClassName = `fadeIn bg-white p-[12px] box-border flex-bet flex-col gap-[24px] xs:gap-[12px] sm:gap-[12px] h-[300px] shadow-xl border-[0.5px] border-grey300 border-solid rounded-xl xs:overflow-hidden xs:overflow-y-scroll sm:overflow-hidden sm:overflow-y-scroll ${width}`;

const FTCardOffer = dynamic(() => import("./FTCardOffer"), {
  ssr: false,
  loading: () => (
    <div className={elClassName}>
      <div className="w-full p-[4px] flex flex-col gap-[3px] flex flex-col gap-[6px]">
        <OneLineSkeleton width="90%" height="20px" />
        <OneLineSkeleton width="70%" />
      </div>

      <div className="w-full text-grey900 font-semilight text-[16px] xs:text-[13px] sm:text-[13px] flex flex-col gap-[6px]">
        <OneLineSkeleton width="60px" />
        <OneLineSkeleton width="60px" />
      </div>

      <div className="w-full flex-bet text-grey900 font-semilight text-[16px] xs:text-[13px] sm:text-[13px] gap-[6px]">
        <div className="flex">
          <OneLineSkeleton width="30px" />
          <OneLineSkeleton width="50px" />
        </div>
        <div className="flex flex-col gap-[6px]">
          <OneLineSkeleton width="50px" />
          <OneLineSkeleton width="50px" />
          <OneLineSkeleton width="50px" />
        </div>
      </div>
      <div className="flex-bet w-full xs:flex-col-reverse sm:flex-col-reverse">
        <OneLineSkeleton width="35px" />
        <OneLineSkeleton width="35px" />
      </div>
    </div>
  ),
});

export default function fnc({ el, length }: { el: Offer; length?: number }) {
  return <FTCardOffer el={el} length={length} />;
}
