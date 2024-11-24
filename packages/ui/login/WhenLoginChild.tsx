"use client";

import { CustomModalProps } from "@youmeet/types/CustomModal";
import dynamic from "next/dynamic";

const WhenLogin = dynamic(() => import("./WhenLogin"), { ssr: false });

export default function fnc({
  type,
  setIsForgotten,
  setIsSubscribing,
}: CustomModalProps) {
  return (
    <WhenLogin
      type={type}
      setIsForgotten={setIsForgotten}
      setIsSubscribing={setIsSubscribing}
    />
  );
}
