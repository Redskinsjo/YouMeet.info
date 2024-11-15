"use client";

import OneLineSkeleton from "../../OneLineSkeleton";
import dynamic from "next/dynamic";

const LocationFilter = dynamic(() => import("./LocationFilter"), {
  ssr: false,
  loading: () => <OneLineSkeleton height="45px" />,
});

export default function fnc() {
  return <LocationFilter />;
}
