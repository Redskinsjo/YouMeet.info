"use client";

import dynamic from "next/dynamic";

const OtherOfferLimitDate = dynamic(() => import("./OtherOfferLimitDate"));

export default function fnc({ limitDate }: { limitDate: string }) {
  return <OtherOfferLimitDate limitDate={limitDate} />;
}
