"use client";

import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const DiscoverMoreUsers = dynamic(() => import("./DiscoverMoreUsers"), {
  ssr: false,
});

export default function fnc({
  users,
  profil,
}: {
  users: BetaUser[];
  profil?: BetaUser | undefined;
}) {
  return <DiscoverMoreUsers users={users} profil={profil} />;
}
