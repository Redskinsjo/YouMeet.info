"use client";

import dynamic from "next/dynamic";

const FooterProposedBy = dynamic(() => import("./FooterProposedBy"), {
  ssr: false,
});

export default function fnc() {
  return <FooterProposedBy />;
}
