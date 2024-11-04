"use client";

import dynamic from "next/dynamic";
const BrandsSection = dynamic(
  () => import("@youmeet/ui/_sections/BrandsSection"),
  { ssr: false }
);

export default function fnc() {
  return <BrandsSection />;
}
