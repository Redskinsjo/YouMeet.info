"use client";

import dynamic from "next/dynamic";

const OtherOfferLimitDate = dynamic(() => import("./OtherOfferLimitDate"));

export default function fnc({
  limitDate,
  revenue,
}: {
  limitDate: string;
  revenue?: string;
}) {
  return <OtherOfferLimitDate limitDate={limitDate} revenue={revenue} />;
}
