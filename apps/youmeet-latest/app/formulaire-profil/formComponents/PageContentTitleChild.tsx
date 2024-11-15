"use client";
import dynamic from "next/dynamic";

const PageContentTitle = dynamic(() => import("./PageContentTitle"), {
  ssr: false,
});

export default function fnc() {
  return <PageContentTitle />;
}
