"use client";

import { HeaderComponentProps } from "@youmeet/types/Header";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });

export default function fnc({ classes, newStyles }: HeaderComponentProps) {
  return <Header classes={classes} newStyles={newStyles} />;
}
