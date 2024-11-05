"use client";

import dynamic from "next/dynamic";
const BigHeaderSection = dynamic(
  () => import("@youmeet/ui/_sections/BigHeaderSection"),
  { ssr: false }
);

export default function fnc() {
  return <BigHeaderSection />;
}
