"use client";
import VideoPartLoading from "../../VideoPartLoading";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
const DashboardPartComponent = dynamic(
  () =>
    import("@youmeet/ui/dashboard/dashboardComponents/DashboardPartComponent"),
  { ssr: false, loading: () => <VideoPartLoading /> }
);

export default function fnc({ profil }: { profil: BetaUser }) {
  return <DashboardPartComponent profil={profil} />;
}
