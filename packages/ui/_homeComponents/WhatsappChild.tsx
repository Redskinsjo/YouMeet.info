"use client";
import dynamic from "next/dynamic";
const HomeWhatsapp = dynamic(() => import("./HomeWhatsapp"), { ssr: false });

export default function fnc() {
  return <HomeWhatsapp />;
}
