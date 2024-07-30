import { useState } from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import { BetaUser, Favorite } from "@youmeet/gql/generated";
import { CardTurnUp } from "@youmeet/types/Header";
import React from "react";

export default function Card({
  d,
  type,
  styles,
  isSubscribedPro,
  refetch,
  unlocked,
}: {
  d: BetaUser | Favorite;
  type: "candidates" | "favorites";
  styles?: { [key: string]: number | string | undefined };
  isSubscribedPro: boolean;
  refetch?: () => void;
  unlocked?: string[];
  finishedLoadings?: boolean;
}) {
  const [frontShouldTurnUp, setFrontShouldTurnUp] = useState<
    false | CardTurnUp
  >(false);

  const shouldSee =
    unlocked?.includes(d.id as string) || isSubscribedPro ? true : false;

  return (
    <div
      className={
        (frontShouldTurnUp as { id: string })?.id === d.id
          ? "lockedCard xs:max-w-screen sm:max-w-screen w-[297px] group appear-fastly bg-white relative border-solid border-deepPurple900 border-[2px] rounded-lg box-border"
          : "lockedCard xs:max-w-screen sm:max-w-screen w-[297px] appear-fastly bg-white relative border-solid border-deepPurple900 border-[2px] rounded-lg box-border"
      }
      style={{
        ...styles,
      }}
      onMouseLeave={() => {
        if (!(frontShouldTurnUp as CardTurnUp).waiting)
          setFrontShouldTurnUp(false);
      }}
      data-test="card"
    >
      <div
        className="h-[400px] shadow-lg text-center bg-transparent"
        onMouseEnter={() => {
          if (!(frontShouldTurnUp as CardTurnUp).waiting)
            setFrontShouldTurnUp(false);
        }}
      >
        {d && type === "candidates" && (
          <div className="relative w-full h-full text-center">
            <FrontCard
              user={d as BetaUser}
              type={type}
              setFrontShouldTurnUp={setFrontShouldTurnUp}
              frontShouldTurnUp={frontShouldTurnUp}
              isSubscribed={isSubscribedPro}
              refetch={refetch}
              unlocked={unlocked}
              shouldSee={shouldSee}
            />
            <BackCard
              type={type}
              user={d as BetaUser}
              setFrontShouldTurnUp={setFrontShouldTurnUp}
              frontShouldTurnUp={frontShouldTurnUp}
              isSubscribed={isSubscribedPro}
              shouldSee={shouldSee}
            />
          </div>
        )}
      </div>
    </div>
  );
}
