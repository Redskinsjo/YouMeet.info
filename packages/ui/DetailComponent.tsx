"use client";

import { Suspense } from "react";
import OneLineSkeleton from "./OneLineSkeleton";
import dynamic from "next/dynamic";

const Component = dynamic(() => import("./DetailComponentContent"), {
  ssr: false,
});

export default function DetailComponentWrapper(params: any) {
  return (
    <Suspense fallback={<OneLineSkeleton />}>
      <Component {...params} />
    </Suspense>
  );
}
