"use client";

import dynamic from "next/dynamic";

const SettingsComponent = dynamic(() => import("./SettingsComponent"), {
  ssr: false,
});

export default function fnc() {
  return <SettingsComponent />;
}
