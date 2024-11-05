"use client";
import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("@youmeet/ui/NotFound"));

export default function fnc() {
  return <NotFound />;
}
