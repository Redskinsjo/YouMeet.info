"use client";

import OneLineSkeleton from "../OneLineSkeleton";
import dynamic from "next/dynamic";

const SearchFilter = dynamic(() => import("./SearchFilter"), {
  ssr: false,
  loading: () => <OneLineSkeleton height="45px" />,
});

export default function fnc() {
  return <SearchFilter />;
}
