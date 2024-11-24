"use client";

import { CustomModalProps } from "@youmeet/types/CustomModal";
import dynamic from "next/dynamic";

const WhenForgotten = dynamic(() => import("./WhenForgotten"), { ssr: false });

export default function fnc({ type, setIsForgotten }: CustomModalProps) {
  return <WhenForgotten type={type} setIsForgotten={setIsForgotten} />;
}
