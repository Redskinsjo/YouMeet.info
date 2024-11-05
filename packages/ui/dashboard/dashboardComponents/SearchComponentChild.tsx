"use client";
import dynamic from "next/dynamic";

const SearchComponentField = dynamic(() => import("./SearchComponentField"), {
  ssr: false,
});

export default function fnc() {
  return <SearchComponentField />;
}
