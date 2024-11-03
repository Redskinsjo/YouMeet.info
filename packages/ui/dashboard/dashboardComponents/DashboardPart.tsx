import { BetaUser } from "@youmeet/gql/generated";
import VideoPartLoading from "../../VideoPartLoading";
import dynamic from "next/dynamic";

const DashboardPartComponent = dynamic(
  () => import("./DashboardPartComponent"),
  { ssr: false, loading: () => <VideoPartLoading /> }
);

export default function DashboardPart({ profil }: { profil: BetaUser }) {
  return <DashboardPartComponent profil={profil} />;
}
