"use client";
import dynamic from "next/dynamic";
import ProfilePartLoading from "./ProfilePartLoading";
import { BetaDetails, BetaUser, Reference } from "@youmeet/gql/generated";

const ProfilePartComponent = dynamic(
  () => import("@youmeet/ui/ProfilePartComponent"),
  { ssr: false, loading: () => <ProfilePartLoading /> }
);

export default function fnc({
  profil,
  details,
  account,
  users,
  references,
}: {
  profil?: BetaUser;
  details?: BetaDetails;
  account?: boolean;
  users?: BetaUser[];
  references: Reference[];
}) {
  return (
    <ProfilePartComponent
      profil={profil}
      details={details}
      account={account}
      users={users}
      references={references}
    />
  );
}
