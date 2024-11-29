import { getOffer, getOffers } from "@youmeet/functions/request";
import { Offer } from "@youmeet/gql/generated";
import OfferChild from "@youmeet/ui/oneOfferComponents/offerChild";
import { notFound } from "next/navigation";
import React from "react";

export default async function OfferComponent({
  params,
}: {
  params: Promise<{ offre: string }>;
}) {
  const prms = await params;
  const decoded = decodeURIComponent(prms.offre);
  if (!decoded) return notFound();

  const offer = (await getOffer({
    slug: decoded,
  })) as Offer;

  let offers = [] as Offer[];
  if (offer) {
    offers = (await getOffers<Offer[]>({
      params: {
        search:
          offer?.job?.title && offer?.job?.title.fr
            ? offer?.job?.title.fr
            : offer?.intitule,
      },
    })) as Offer[];
  }

  if (offer) return <OfferChild offre={offer} view />;
  return notFound();
}
