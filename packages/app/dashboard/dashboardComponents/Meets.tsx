import SubPartContainer from "@youmeet/components/SubPartContainer";
import { BetaUser } from "@youmeet/gql/generated";
import CandidatesTitle from "./CandidatesTitle";
import dynamic from "next/dynamic";
import MeetsLoading from "./MeetsLoading";
import React from "react";

const CardsComponent = dynamic(() => import("./CardsComponent"), {
  ssr: false,
  loading: () => <MeetsLoading />,
});

export default function Meets({
  type,
  dataType,
  profil,
}: {
  type?: "suggested" | "favorite";
  dataType: "candidates" | "favorites";
  profil: BetaUser;
}) {
  return (
    <SubPartContainer
      radius="14px"
      newStyles={{
        padding: "12px",
        border: "unset",
      }}
    >
      <>
        <div className="flex flex-col items-center pb-[12px] box-border w-full">
          <div className="flex justify-start items-center w-full">
            <div className="flex ml-[38px] items-center">
              <CandidatesTitle type={type} dataType={dataType} />
            </div>
          </div>
          <div className="w-main border-box flex-center hide-scrollbar h-full w-full overflow flex-wrap gap-[24px]">
            <CardsComponent dataType={dataType} profil={profil} />
          </div>
        </div>
      </>
    </SubPartContainer>
  );
}
