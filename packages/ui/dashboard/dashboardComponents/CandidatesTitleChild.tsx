"use client";
import dynamic from "next/dynamic";
import MeetsLoading from "./MeetsLoading";
import { BetaUser } from "@youmeet/gql/generated";

const CandidatesTitle = dynamic(() => import("./CandidatesTitle"), {
  ssr: false,
  loading: () => <MeetsLoading />,
});

export default function fnc({
  type,
  dataType,
}: {
  type?: "suggested" | "favorite";
  dataType: "candidates" | "favorites";
}) {
  return <CandidatesTitle dataType={dataType} type={type} />;
}
