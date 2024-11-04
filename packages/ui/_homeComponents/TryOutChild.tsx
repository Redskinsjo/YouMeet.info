"use client";
import dynamic from "next/dynamic";
const TryOut = dynamic(() => import("../_homeComponents/TryOut"), {
  ssr: false,
});

export default function fnc() {
  return <TryOut />;
}
