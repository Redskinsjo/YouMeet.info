"use client";
import dynamic from "next/dynamic";

const MoreFeaturesLeads = dynamic(() => import("./MoreFeaturesLeads"), {
  ssr: false,
});

export default function fnc() {
  return <MoreFeaturesLeads />;
}
