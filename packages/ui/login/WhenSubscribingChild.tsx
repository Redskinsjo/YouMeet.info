"use client";

import { CustomModalProps } from "@youmeet/types/CustomModal";
import dynamic from "next/dynamic";

const WhenSubscribing = dynamic(() => import("./WhenSubscribing"), {
  ssr: false,
});

export default function fnc({ type, setIsSubscribing }: CustomModalProps) {
  return <WhenSubscribing type={type} setIsSubscribing={setIsSubscribing} />;
}
