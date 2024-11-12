import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import dynamic from "next/dynamic";

const FrontCardOffer = dynamic(
  () => import("./offres/offresComponent/FrontCardOfferChild")
);
const FTCardOffer = dynamic(
  () => import("./offres/offresComponent/FTCardOfferChild")
);
const FrontCardRecruiter = dynamic(() => import("./FrontCardRecruiterChild"));

export default function Card({
  d,
  type,
  length,
}: {
  d: BetaUser | BetaCompany | Offer;
  type?: string;
  length?: number;
}) {
  return (
    <>
      {type === "recruiters" && d && (
        <FrontCardRecruiter company={d as BetaCompany} />
      )}
      {type === "offers" && d && (
        <FTCardOffer el={d as Offer} length={length} />
      )}
    </>
  );
}
