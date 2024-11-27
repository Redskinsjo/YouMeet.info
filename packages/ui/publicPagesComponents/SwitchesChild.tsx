"use client";
import dynamic from "next/dynamic";
const Switches = dynamic(() => import("./Switches"), { ssr: false });

export default function fnc() {
  return <Switches />;
}
