"use client";
import dynamic from "next/dynamic";

const BrandsSection = dynamic(() => import("./BrandsSection"), {
  ssr: false,
});

export default function fnc() {
  return <BrandsSection />;
}
