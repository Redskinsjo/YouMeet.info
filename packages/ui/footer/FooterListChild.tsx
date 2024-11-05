"use client";

import dynamic from "next/dynamic";
const FooterList = dynamic(() => import("../_homeComponents/FooterList"), {
  ssr: false,
});

export default function fnc() {
  return <FooterList />;
}
