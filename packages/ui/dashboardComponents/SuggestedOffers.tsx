import { BetaUser } from "@youmeet/gql/generated";
import OtherOfferComponent from "../OtherOfferComponent";
import dynamic from "next/dynamic";

const TransmitOffers = dynamic(() => import("./TransmitOffersChild"));

export default function SuggestedOffers({ profil }: { profil: BetaUser }) {
  return (
    <div>
      <TransmitOffers />
      <div className="flex flex-col gap-[6px]">
        {profil.candidate?.suggestedOpportunities?.map((opp) => {
          return opp ? (
            <OtherOfferComponent
              key={opp?.id}
              offer={opp}
            ></OtherOfferComponent>
          ) : undefined;
        })}
      </div>
    </div>
  );
}
