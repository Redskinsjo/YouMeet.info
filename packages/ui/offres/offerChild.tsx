import React from "react";
import { Offer } from "@youmeet/gql/generated";
import PublicPageContainer from "@youmeet/ui/PublicPage/PublicPageContainer";
import dynamic from "next/dynamic";

const OfferContent = dynamic(
  () =>
    import("@youmeet/ui/offres/[offre]/oneOfferComponents/OfferContentChild")
);
const OtherOffersComponent = dynamic(
  () => import("@youmeet/ui/offres/[offre]/oneOfferComponents/OtherOffersChild")
);

export default function OfferChild({
  offre,
  view,
}: {
  offre: Offer;
  view?: true;
}) {
  const viewClassName = view
    ? "offerView sticky top-[24px] border-[0.5px] border-solid border-grey300"
    : "sticky top-[24px] border-[0.5px] border-solid border-grey300";
  return (
    <div
      className="flex justify-center"
      style={{
        width: view ? "initial" : "100vw",
      }}
    >
      <div
        className={viewClassName}
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${offre.job?.topSector?.bgImage})`,
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "hue",
          maxWidth: view ? "600px" : "900px",
        }}
      >
        <div
          className="flex flex-col pb-[48px] gap-[6px] h-full box-border"
          style={{
            overflow: view ? "hidden" : "initial",
            overflowY: view ? "scroll" : "initial",
          }}
        >
          <PublicPageContainer
            apply
            view={view}
            offre={offre}
            newStyles={{
              margin: "0px",
              borderRadius: "0px",
            }}
          >
            <OfferContent offre={offre} />
          </PublicPageContainer>
          <PublicPageContainer
            noReturnHeader
            newStyles={{ margin: "0px", height: "fit-content" }}
          >
            <OtherOffersComponent offre={offre} />
          </PublicPageContainer>
        </div>
      </div>
    </div>
  );
}