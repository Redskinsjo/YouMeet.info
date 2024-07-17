import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import { Dispatch, SetStateAction } from "react";
import { CardTurnUp } from "./Header";

export type BackCardType = {
  user?: BetaUser;
  setFrontShouldTurnUp: Dispatch<SetStateAction<false | CardTurnUp>>;
  company?: BetaCompany;
  offer?: Offer;
  isSubscribed: boolean;
  frontShouldTurnUp: false | CardTurnUp;
  type: "favorites" | "candidates";
  shouldSee: boolean;
};
