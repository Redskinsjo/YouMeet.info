"use client";
import dynamic from "next/dynamic";
const HeroStyledText = dynamic(() => import("./HeroStyledText"), {
  ssr: false,
});

export default function fnc() {
  return <HeroStyledText />;
}
