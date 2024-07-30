import React, { useState } from "react";
import { Box } from "@mui/material";
import { BetaCompany, BetaUser, Offer } from "@youmeet/gql/generated";
import FrontCardRecruiter from "./FrontCardRecruiter";
import BackCardRecruiter from "./BackCardRecruiter";
import FrontCardOffer from "./src/offres/offresComponent/FrontCardOffer";
import BackCardOffer from "./src/offres/offresComponent/BackCardOffer";
import { CardTurnUp } from "@youmeet/types/Header";

const Card = ({
  d,
  type,
  styles,
}: {
  d: BetaUser | BetaCompany | Offer;
  type?: string;
  styles?: { [key: string]: number | string | undefined };
}) => {
  const [frontShouldTurnUp, setFrontShouldTurnUp] = useState<
    false | CardTurnUp
  >(false);

  return (
    <Box
      key={d.id}
      className={
        (frontShouldTurnUp as { id: string })?.id === d.id
          ? "lockedCard w-full max-w-[390px] group appear-fastly relative rounded-[14px] box-border shadow-custom dark:shadow-black"
          : "lockedCard w-full max-w-[390px] appear-fastly relative rounded-[14px] box-border shadow-custom dark:shadow-black"
      }
      sx={{
        ...styles,
      }}
      onMouseLeave={() => setFrontShouldTurnUp(false)}
      data-test="card"
    >
      <div
        className="h-[480px] shadow-lg text-center bg-transparent transition-transform duration-300 perspective-1000"
        onMouseEnter={() => setFrontShouldTurnUp(false)}
      >
        {type === "recruiters" && d && (
          <div className="relative w-full h-full text-center tranform-style-preserve3d backface-hidden">
            <FrontCardRecruiter
              company={d as BetaCompany}
              setFrontShouldTurnUp={setFrontShouldTurnUp}
              frontShouldTurnUp={frontShouldTurnUp}
            />
            <BackCardRecruiter
              company={d as BetaCompany}
              setFrontShouldTurnUp={setFrontShouldTurnUp}
            />
          </div>
        )}
        {type === "offers" && d && (
          <div className="relative w-full h-full text-center tranform-style-preserve3d backface-hidden">
            <FrontCardOffer
              offer={d as Offer}
              setFrontShouldTurnUp={setFrontShouldTurnUp}
              frontShouldTurnUp={frontShouldTurnUp}
            />
            <BackCardOffer
              offer={d as Offer}
              setFrontShouldTurnUp={setFrontShouldTurnUp}
            />
          </div>
        )}
      </div>
    </Box>
  );
};

export default Card;
