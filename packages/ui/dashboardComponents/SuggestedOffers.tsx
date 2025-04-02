import { BetaUser, Offer } from "@youmeet/gql/generated";
import OtherOfferComponent from "../OtherOfferComponent";
import dynamic from "next/dynamic";
import { Skeleton } from "@mui/material";

const TransmitOffers = dynamic(() => import("./TransmitOffersChild"));
const SearchFilter = dynamic(
  () => import("../offresComponent/SearchFilterChild")
);
const DividerSection = dynamic(() => import("../_components/DividerSection"));

export default function SuggestedOffers({
  opps,
  profil,
}: {
  opps: Offer[];
  profil: BetaUser;
}) {
  const oppsList = opps.map((opp) => opp.id);

  return (
    <div>
      <TransmitOffers />
      <DividerSection bg="bg-transparent" />
      <SearchFilter dashboard />
      <DividerSection bg="bg-transparent" />
      <div className="flex flex-col gap-[6px]">
        {opps?.map((opp) => {
          return opp ? (
            <OtherOfferComponent
              key={opp?.id}
              offer={opp}
            ></OtherOfferComponent>
          ) : undefined;
        })}
        {profil.candidate?.suggestedOpportunities
          ?.filter((opp) => !oppsList.includes(opp?.id))
          .map((opp) => {
            return opp ? (
              <div className="opacity-30" key={opp?.id}>
                <OtherOfferComponent offer={opp}></OtherOfferComponent>
              </div>
            ) : undefined;
          })}
      </div>
    </div>
  );
}
