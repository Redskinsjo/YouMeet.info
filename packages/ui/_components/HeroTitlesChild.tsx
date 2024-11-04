"use client";
import dynamic from "next/dynamic";
const HeroTitles = dynamic(() => import("./HeroTitles"), { ssr: false });

export default function fnc() {
  return <HeroTitles />;
}
