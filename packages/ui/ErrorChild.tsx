"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Error = dynamic(() => import("./Error"), { ssr: false });

export default function fnc({
  error = { name: "Error", message: "Error", digest: "Error" },
  reset = () => {},
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <Suspense>
      <Error error={error} reset={reset} />;
    </Suspense>
  );
}
