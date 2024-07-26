import dynamic from "next/dynamic";
import React from "react";

const HomeExplanationsOnReferences = dynamic(
  () => import("../_homeComponents/HomeExplanationsOnReferences")
);

export default function BandSection() {
  return (
    <section>
      <HomeExplanationsOnReferences />
    </section>
  );
}
