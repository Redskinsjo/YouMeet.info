import OffresChild from "./offresChild";
import { getOffers } from "@youmeet/functions/request";
import { Offer } from "@youmeet/gql/generated";
import { notFound } from "next/navigation";
import PageFilters from "@youmeet/ui/PageFilters";
import { Metadata } from "next";
import {
  bgImageBordeaux,
  bgImageLyon,
  bgImageMarseille,
  bgImageParis,
  logoUrl,
} from "@youmeet/functions/imports";
import dynamic from "next/dynamic";
import DividerSection from "@youmeet/ui/_components/DividerSection";

const SuggestedMeets = dynamic(() => import("@youmeet/ui/SuggestedMeets"));

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
  const getIfExist = (oneParam: string) => (oneParam ? oneParam : "");
  const getSkip = (skip: string) => {
    if (!skip || Number.isNaN(skip)) return 0;
    else return parseInt(skip) * 5;
  };
  const search = getIfExist(prms.s);
  const skipAll = getSkip(prms["all-skip"]);
  const skipInParis = getSkip(prms["in-paris-skip"]);
  const skipInMarseille = getSkip(prms["in-marseille-skip"]);
  const skipInLyon = getSkip(prms["in-lyon-skip"]);
  const skipInBordeaux = getSkip(prms["in-bordeaux-skip"]);
  try {
    const offers = (await getOffers({
      params: { take: 5, search, skip: skipAll },
    })) as Offer[];
    const offersInParis = (await getOffers({
      data: { lieuTravail: { codePostal: "75" } },
      params: { take: 5, skip: skipInParis },
    })) as Offer[];
    const offersInMarseille = (await getOffers({
      data: { lieuTravail: { codePostal: "13" } },
      params: { take: 5, skip: skipInMarseille },
    })) as Offer[];
    const offersInLyon = (await getOffers({
      data: { lieuTravail: { codePostal: "69" } },
      params: { take: 5, skip: skipInLyon },
    })) as Offer[];
    const offersInBordeaux = (await getOffers({
      data: { lieuTravail: { codePostal: "33" } },
      params: { take: 5, skip: skipInBordeaux },
    })) as Offer[];

    return (
      <div className="w-full">
        <PageFilters />
        <OffresChild offres={offers} type="all" />
        <DividerSection height="1px" bg="grey300" />
        <SuggestedMeets
          data={offersInParis as Offer[]}
          dataType="offers"
          type={"in-paris"}
          bgImage={bgImageParis}
        />
        <DividerSection height="1px" bg="grey300" />
        <SuggestedMeets
          data={offersInMarseille as Offer[]}
          dataType="offers"
          type={"in-marseille"}
          bgImage={bgImageMarseille}
        />
        <DividerSection height="1px" bg="grey300" />
        <SuggestedMeets
          data={offersInLyon as Offer[]}
          dataType="offers"
          type={"in-lyon"}
          bgImage={bgImageLyon}
        />
        <DividerSection height="1px" bg="grey300" />
        <SuggestedMeets
          data={offersInBordeaux as Offer[]}
          dataType="offers"
          type={"in-bordeaux"}
          bgImage={bgImageBordeaux}
        />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
