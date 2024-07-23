import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import { Dispatch, SetStateAction } from "react";
import { CardTurnUp } from "./Header";

export type BackCardType = {
  setFrontShouldTurnUp: Dispatch<SetStateAction<false | CardTurnUp>>;
  company?: BetaCompany;
  offer?: Offer;
  frontShouldTurnUp?: false | CardTurnUp;
  type?: "favorites" | "candidates";
  shouldSee?: boolean;
  isSubscribed?: boolean;
  user?: BetaUser;
};
