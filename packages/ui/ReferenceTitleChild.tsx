"use client";
import dynamic from "next/dynamic";
const ReferenceComponentTitle = dynamic(
  () => import("./ReferenceComponentTitle"),
  { ssr: false }
);

export default function fnc() {
  return <ReferenceComponentTitle />;
}
