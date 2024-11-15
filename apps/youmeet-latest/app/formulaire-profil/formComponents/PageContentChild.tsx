"use client";
import { ProfileFormDefaultValues } from "@youmeet/types/form/useFormDefaultValues";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PageContent = dynamic(() => import("./PageContent"), {
  ssr: false,
});

export default function fnc({
  defaultValues,
}: {
  defaultValues: Partial<ProfileFormDefaultValues> | undefined;
}) {
  return (
    <Suspense>
      <PageContent defaultValues={defaultValues} />;
    </Suspense>
  );
}
