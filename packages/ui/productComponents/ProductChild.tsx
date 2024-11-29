"use client";
import dynamic from "next/dynamic";
const ProductComponent = dynamic(
  () => import("@youmeet/ui/productComponents/ProductComponent"),
  { ssr: false }
);

export default function fnc() {
  return <ProductComponent />;
}
