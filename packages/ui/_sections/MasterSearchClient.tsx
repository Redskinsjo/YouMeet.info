"use client";
import dynamic from "next/dynamic";

const MasterSearch = dynamic(() => import("./MasterSearch"), {
  ssr: false,
});

export default function fnc() {
  return <MasterSearch />;
}
