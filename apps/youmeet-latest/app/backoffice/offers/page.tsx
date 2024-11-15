import BackofficeOffersChild from "./backofficeOffersChild";
import { getOffers } from "@youmeet/functions/request";
import { Offer } from "@youmeet/gql/generated";
import verifyTokenServer from "@youmeet/utils/basics/verifyTokenServer";
import { notFound } from "next/navigation";

export default async function BackofficeUsers() {
  const verified = await verifyTokenServer();
  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const offers = (await getOffers(undefined, 0)) as Offer[];
    if (offers) return <BackofficeOffersChild offers={offers} />;
  }
  return notFound();
}
