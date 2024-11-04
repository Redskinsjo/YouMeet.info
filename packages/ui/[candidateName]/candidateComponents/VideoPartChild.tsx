"use client";
import VideoPartLoading from "../../VideoPartLoading";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const VideoPartComponent = dynamic(
  () =>
    import(
      "@youmeet/ui/[candidateName]/candidateComponents/VideoPartComponent"
    ),
  { ssr: false, loading: () => <VideoPartLoading /> }
);

export default function fnc({ profil }: { profil: BetaUser }) {
  return <VideoPartComponent profil={profil} />;
}
