"use client";
import dynamic from "next/dynamic";
const InsightImg = dynamic(() => import("../_homeComponents/InsightImg"), {
  ssr: false,
});

export default function fnc() {
  return <InsightImg />;
}
