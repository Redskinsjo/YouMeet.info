import React from "react";
import Layout from "@youmeet/components/Layout";
import { BetaDetails, BetaUser, Reference } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import ProfilePartLoading from "@youmeet/components/ProfilePartLoading";
import VideoPartLoading from "@youmeet/components/VideoPartLoading";
import Discussions from "@youmeet/components/_homeComponents/Discussions";

const ProfilePartComponent = dynamic(
  () => import("@youmeet/components/ProfilePartComponent"),
  { ssr: false, loading: () => <ProfilePartLoading /> }
);
const DashboardPartComponent = dynamic(
  () =>
    import(
      "@youmeet/components/dashboard/dashboardComponents/DashboardPartComponent"
    ),
  { ssr: false, loading: () => <VideoPartLoading /> }
);

export default function DashboardChild({
  profil,
  references,
}: {
  profil: BetaUser;
  references: Reference[];
}) {
  return (
    <div
      className="min-h-screen flex flex-col gap-[6px]"
      data-testid="compte-container"
    >
      <Layout
        newStyles={{
          maxWidth: "100vw",
          margin: "0px",
          justifyContent: "flex-start",
          padding: "0px",
        }}
      >
        <div className="flex md:flex-wrap w-full gap-[6px] xs:gap-[1px] sm:gap-[1px] md:gap-[1px] relative xs:flex-col sm:flex-col md:flex-col">
          <ProfilePartComponent
            profil={profil}
            details={profil?.details as BetaDetails}
            account
            references={references}
          />

          <DashboardPartComponent profil={profil} />
        </div>
      </Layout>
      <Discussions />
    </div>
  );
}
