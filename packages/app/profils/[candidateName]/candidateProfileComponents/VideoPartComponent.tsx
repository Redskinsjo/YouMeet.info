import { BetaUser } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import React from "react";

const MainVideoComponent = dynamic(() => import("./MainVideoComponent"));
const ConversationComponent = dynamic(() => import("./ConversationComponent"));

export default function VideoPartComponent({ profil }: { profil: BetaUser }) {
  return (
    <div className="flex flex-col gap-[6px] flex-1">
      <MainVideoComponent
        profil={profil}
        containerNewStyles={{ maxHeight: "77vh" }}
      />

      <ConversationComponent profil={profil} />
    </div>
  );
}
