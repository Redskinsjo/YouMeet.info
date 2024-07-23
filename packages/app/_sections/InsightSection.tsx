import dynamic from "next/dynamic";
import React from "react";

const InsightImg = dynamic(() => import("../_homeComponents/InsightImg"));
const InsightText = dynamic(() => import("../_components/InsightText"));

export default function InsightSection() {
  return (
    <section className="flex-center xs:flex-col sm:flex-col md:flex-col homeLightning dark:darkHomeSectionBg">
      <InsightText />
      <InsightImg />
    </section>
  );
}
