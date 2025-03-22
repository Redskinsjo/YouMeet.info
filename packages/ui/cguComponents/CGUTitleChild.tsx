"use client";
import dynamic from "next/dynamic";

const CGUTitle = dynamic(
  () => import("@youmeet/ui/cguComponents/CGUTitleChild")
);

export default function CGUTitleChild() {
  return <CGUTitle />;
}
