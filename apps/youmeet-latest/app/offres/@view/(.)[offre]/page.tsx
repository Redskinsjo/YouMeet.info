import { getOffer, getOffers } from "@youmeet/functions/request";
import { Offer } from "@youmeet/gql/generated";
import OfferChild from "@youmeet/ui/offres/offerChild";
import { notFound } from "next/navigation";
import React from "react";

export default async function OfferComponent({
  params,
}: {
  params: Promise<{ offre: string }>;
}) {
  const prms = await params;
  console.log(decodeURIComponent(prms.offre), "decodeURIComponent(prms.offre)");
  const offer = (await getOffer({
    slug: decodeURIComponent(prms.offre),
  })) as Offer;

  let offers = [] as Offer[];
  if (offer) {
    offers = (await getOffers<Offer[]>({
      params: {
        search:
          offer.job?.title && offer.job?.title.fr
            ? offer.job?.title.fr
            : offer.intitule,
      },
    })) as Offer[];
  }

  if (offer) return <OfferChild offre={offer} view />;
  return notFound();
}
