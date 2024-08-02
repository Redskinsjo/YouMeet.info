import React from "react";
import { Offer } from "@youmeet/gql/generated";
import PublicPageContainer from "@youmeet/ui/PublicPage/PublicPageContainer";
import OfferContent from "@youmeet/ui/offres/[offre]/oneOfferComponents/OfferContent";
import OtherOffersComponent from "@youmeet/ui/offres/[offre]/oneOfferComponents/OtherOffersComponent";

export default function OfferChild({
  offre,
  offers,
}: {
  offre: Offer;
  offers: Offer[];
}) {
  return (
    <div
      className="flex-center xs:flex-col-reverse sm:flex-col-reverse md:flex-col-reverse pb-[48px] w-screen gap-[6px] min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${offre.job?.topSector?.bgImage})`,
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "hue",
      }}
    >
      <div className="flex items-center flex-col gap-[6px] w-full">
        <PublicPageContainer
          apply
          offre={offre}
          newStyles={{ margin: "0px", borderRadius: "0px" }}
        >
          <OfferContent offre={offre} />
        </PublicPageContainer>
        <PublicPageContainer noReturnHeader newStyles={{ margin: "0px" }}>
          <OtherOffersComponent offers={offers} offre={offre} />
        </PublicPageContainer>
      </div>
    </div>
  );
}
