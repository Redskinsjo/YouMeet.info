"use client";

import dynamic from "next/dynamic";

const DashboardFT = dynamic(() => import("./DashboardFT"), { ssr: false });

export default function fnc() {
  return <DashboardFT />;
}
