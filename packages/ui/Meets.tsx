import React from "react";
import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";
import CardLoading from "./offres/offresComponent/offresChildLoading";

const Card = dynamic(() => import("./Card"), {
  ssr: false,
  loading: () => <CardLoading />,
});

const Meets = ({
  data,
  type,
}: {
  data: (BetaUser | BetaCompany | Offer)[];
  type?: string;
}) => {
  return (
    <div className="w-main border-box flex-center hide-scrollbar h-full w-full overflow flex-wrap gap-[24px]">
      {data?.map((d: BetaUser | BetaCompany | Offer) => (
        <Card key={d.id} d={d} type={type} />
      ))}
    </div>
  );
};

export default Meets;
