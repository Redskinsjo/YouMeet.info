"use client";

import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const DiscoverMoreUsers = dynamic(() => import("./DiscoverMoreUsers"), {
  ssr: false,
});

export default function ProfilePartComponent({
  users,
  profil,
}: {
  users: BetaUser[];
  profil?: BetaUser;
}) {
  return <DiscoverMoreUsers users={users} profil={profil} />;
}
