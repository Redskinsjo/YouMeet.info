import BackofficeOffersChild from "./backofficeOffersChild";
import { getOffers } from "@youmeet/functions/request";
import { Offer } from "@youmeet/gql/generated";
import Custom404 from "@/app/not-found";
import verifyTokenServer from "@youmeet/utils/verifyTokenServer";

export default async function BackofficeUsers() {
  const verified = await verifyTokenServer();
  if (
    verified &&
    verified.email.toLowerCase() === "jonathan.carnos@gmail.com"
  ) {
    const offers = (await getOffers(undefined, 0)) as Offer[];
    if (offers) return <BackofficeOffersChild offers={offers} />;
  }
  return <Custom404 />;
}
