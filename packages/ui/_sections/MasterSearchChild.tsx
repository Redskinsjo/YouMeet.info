"use client";

import dynamic from "next/dynamic";
const MasterSearch = dynamic(
  () => import("@youmeet/ui/_sections/MasterSearch"),
  { ssr: false }
);

export default function fnc() {
  return <MasterSearch />;
}
