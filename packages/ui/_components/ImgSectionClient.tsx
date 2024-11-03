"use client";

import dynamic from "next/dynamic";

const ImgSection = dynamic(() => import("../_components/ImgSection"), {
  ssr: false,
});

type Type = "offer" | "competency" | "square1" | "square2";

export default function fnc({ type }: { type: Type }) {
  return <ImgSection type={type} />;
}
