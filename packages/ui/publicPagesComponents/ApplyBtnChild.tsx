"use client";
import { Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const ApplyBtn = dynamic(() => import("./ApplyBtn"), { ssr: false });

export default function fnc({ offre }: { offre?: Offer }) {
  return (
    <Suspense>
      <ApplyBtn offre={offre} />
    </Suspense>
  );
}
