"use client";

import { Skeleton } from "@mui/material";
import { Reference } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const NewReferencesComponent = dynamic(
  () => import("./NewReferencesComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="flex-center flex-col w-full">
        <Skeleton width={"100%"} height={18} />
        <Skeleton width={"65%"} height={18} />
      </div>
    ),
  }
);

export default function fnc({ references }: { references: Reference[] }) {
  return <NewReferencesComponent references={references} />;
}
