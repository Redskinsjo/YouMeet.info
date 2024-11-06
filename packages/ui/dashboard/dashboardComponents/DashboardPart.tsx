import DashboardVideoPartLoading from "@/profils/[candidateName]/candidateProfileComponents/DashboardVideoPartLoading";
import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const DashboardPartComponent = dynamic(
  () => import("./DashboardPartComponent"),
  { ssr: false, loading: () => <DashboardVideoPartLoading /> }
);

export default function DashboardPart({ profil }: { profil: BetaUser }) {
  return <DashboardPartComponent profil={profil} />;
}
