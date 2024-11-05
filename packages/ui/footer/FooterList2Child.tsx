"use client";

import dynamic from "next/dynamic";
const FooterList2 = dynamic(() => import("../_homeComponents/FooterList2"), {
  ssr: false,
});

export default function fnc() {
  return <FooterList2 />;
}
