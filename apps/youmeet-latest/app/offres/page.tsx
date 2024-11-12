import OffresChild from "./offresChild";
import { getOffers } from "@youmeet/functions/request";
import { Offer } from "@youmeet/gql/generated";
import { notFound } from "next/navigation";
import PageFilters from "@youmeet/ui/PageFilters";
import { Metadata } from "next";
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

export default async function Offres({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const prms = await searchParams;
  let search = "";
  if (prms?.s) {
    search = prms.s;
  }
  try {
    const offers = (await getOffers({
      params: { take: 30, search },
    })) as Offer[];

    return (
      <div className="w-full">
        <PageFilters />
        <OffresChild offres={offers} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
