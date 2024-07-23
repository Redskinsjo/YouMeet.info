import dynamic from "next/dynamic";
import React from "react";

const HomeSquares = dynamic(() => import("../_homeComponents/HomeSquares"), {
  ssr: false,
});

export default function SquareSection() {
  return (
    <section className="flex xs:flex-col sm:flex-col md:flex-col homeImgBg dark:darkHomeSectionBg">
      <HomeSquares />
    </section>
  );
}
