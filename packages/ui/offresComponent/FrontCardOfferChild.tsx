"use client";

import { FrontCardProps } from "@youmeet/types/FrontCardProps";
import dynamic from "next/dynamic";
import CardLoading from "./offresChildLoading";

const FrontCardOffer = dynamic(() => import("./FrontCardOffer"), {
  ssr: false,
  loading: () => <CardLoading />,
});

export default function fnc({ offer }: FrontCardProps) {
  return <FrontCardOffer offer={offer} />;
}
