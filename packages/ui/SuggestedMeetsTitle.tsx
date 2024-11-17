"use client";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";

const SectionTitle = dynamic(() => import("./_components/SectionTitleChild"));

export default function SuggestedMeetsTitle({
  type,
  dataType,
}: {
  type?: SuggestedMeetsType;
  dataType: "candidates" | "recruiters" | "offers";
}) {
  const search = useSearchParams();
  const searching = search.get("s") || "";
  return (
    <SectionTitle
      component="h2"
      searching={type === "all" ? searching : undefined}
      translation={
        type === "suggested"
          ? "suggested-" + dataType
          : type === "favorite"
          ? "all-favorites"
          : type === "in-paris" ||
            type === "in-marseille" ||
            type === "in-bordeaux" ||
            type === "in-lyon"
          ? `all-${type}`
          : "all-" + dataType
      }
    />
  );
}
