import { Metadata } from "next";
import OffresChild from "./offresChild";
import { getOffers } from "@youmeet/functions/request";
import { Offer } from "@youmeet/gql/generated";
import { logoUrl } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: "YouMeet - Offres",
  keywords: [
    "offres d'emploi",
    "postes à pourvoir",
    "plateforme de candidatures",
    "CV vidéo",
  ],
  description:
    "Explorez les offres d'emplois sur notre plateforme de recrutement. Trouvez l'emploi qui vous correspond parmis de nombreux choix.",
  openGraph: {
    title: "YouMeet - Offres",
    type: "website",
    url: "https://www.youmeet.info/offres",
    images: [logoUrl],
    description:
      "Explorez les offres d'emplois sur notre plateforme de recrutement. Trouvez l'emploi qui vous correspond parmis de nombreux choix.",
  },
};

export default async function Offres() {
  const offers = (await getOffers<Offer[]>({
    params: { take: 50 },
  })) as Offer[];
  return <OffresChild offres={offers} />;
}
