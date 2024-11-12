"use client";

import { FrontCardProps } from "@youmeet/types/FrontCardProps";
import dynamic from "next/dynamic";

const FrontCardRecruiter = dynamic(() => import("./FrontCardRecruiter"), {
  ssr: false,
});

export default function fnc({ company }: FrontCardProps) {
  return <FrontCardRecruiter company={company} />;
}
