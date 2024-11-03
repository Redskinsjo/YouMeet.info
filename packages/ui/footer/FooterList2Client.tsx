"use client";

import dynamic from "next/dynamic";

const FooterList2 = dynamic(() => import("./FooterList2"), {
  ssr: false,
});

export default function fnc() {
  return <FooterList2 />;
}
