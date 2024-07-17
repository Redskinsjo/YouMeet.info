import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import { Dispatch, SetStateAction } from "react";
import { CardTurnUp } from "./Header";

export type FrontCardProps = {
  user?: BetaUser;
  company?: BetaCompany;
  setFrontShouldTurnUp: Dispatch<SetStateAction<false | CardTurnUp>>;
  frontShouldTurnUp: false | CardTurnUp;
  offer?: Offer;
  isSubscribed: boolean;
  type: "favorites" | "candidates";
  refetch?: () => void;
  unlocked?: string[];
  shouldSee: boolean;
};
