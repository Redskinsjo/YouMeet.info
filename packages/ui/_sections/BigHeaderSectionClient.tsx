"use client";
import dynamic from "next/dynamic";

const BigHeaderSection = dynamic(() => import("./BigHeaderSection"), {
  ssr: false,
});

export default function fnc() {
  return <BigHeaderSection />;
}
