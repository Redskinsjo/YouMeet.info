import React from "react";
import { BetaDetails, BetaUser, Reference } from "@youmeet/gql/generated";
import Layout from "@youmeet/components/Layout";
import ProfilePartLoading from "@youmeet/app/profils/[candidateName]/candidateProfileComponents/ProfilePartLoading";
import VideoPartLoading from "@youmeet/app/profils/[candidateName]/candidateProfileComponents/VideoPartLoading";
import dynamic from "next/dynamic";

const ProfilePartComponent = dynamic(
  () =>
    import(
      "@youmeet/app/profils/[candidateName]/candidateProfileComponents/ProfilePartComponent"
    ),
  { ssr: false, loading: () => <ProfilePartLoading /> }
);
const VideoPartComponent = dynamic(
  () =>
    import(
      "@youmeet/app/profils/[candidateName]/candidateProfileComponents/VideoPartComponent"
    ),
  { ssr: false, loading: () => <VideoPartLoading /> }
);

export default function Profil({
  profil,
  references,
}: {
  profil: BetaUser;
  references: Reference[];
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Layout
        newStyles={{
          maxWidth: "100vw",
          flex: 1,
          margin: "0px",
          justifyContent: "flex-start",
          padding: "6px 6px 24px 6px",
        }}
      >
        <div className="flex w-full gap-[6px] xs:flex-col sm:flex-col md:flex-col overflow-hidden">
          <ProfilePartComponent
            profil={profil}
            details={profil.details as BetaDetails}
            references={references}
          />
          <VideoPartComponent profil={profil} />
        </div>
      </Layout>
    </div>
  );
}