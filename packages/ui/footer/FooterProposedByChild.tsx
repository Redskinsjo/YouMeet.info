"use client";

import dynamic from "next/dynamic";
const FooterProposedBy = dynamic(
  () => import("../_homeComponents/FooterProposedBy"),
  {
    ssr: false,
  }
);

export default function fnc() {
  return <FooterProposedBy />;
}
