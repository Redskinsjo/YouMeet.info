"use client";

import dynamic from "next/dynamic";
import { TabPanelProps } from "./CustomTabPanel";
import OneLineSkeleton from "../OneLineSkeleton";

const CustomTabPanel = dynamic(() => import("./CustomTabPanel"), {
  ssr: false,
});

export default function fnc(props: TabPanelProps) {
  return <CustomTabPanel {...props} />;
}
