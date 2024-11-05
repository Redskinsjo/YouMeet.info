"use client";
import { BetaUser, UnlockedUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const MyCandidatesChild = dynamic(() => import("./myCandidatesChild"), {
  ssr: false,
});

export default function fnc({
  profil,
  unlockedUsers,
}: {
  profil: BetaUser;
  unlockedUsers: UnlockedUser[];
}) {
  return <MyCandidatesChild profil={profil} unlockedUsers={unlockedUsers} />;
}
