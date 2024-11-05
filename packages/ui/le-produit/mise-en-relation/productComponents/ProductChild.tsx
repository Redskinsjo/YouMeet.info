"use client";
import dynamic from "next/dynamic";
const ProductComponent = dynamic(
  () =>
    import(
      "@youmeet/ui/le-produit/mise-en-relation/productComponents/ProductComponent"
    ),
  { ssr: false }
);

export default function fnc() {
  return <ProductComponent />;
}
