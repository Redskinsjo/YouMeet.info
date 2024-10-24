import { Metadata } from "next";
import OffresChild from "./offresChild";
import { getOffers } from "@youmeet/functions/request";
import { Offer } from "@youmeet/gql/generated";
import { logoUrl } from "@youmeet/functions/imports";
import { getOffresEmploiFT } from "@youmeet/functions/browserRequests";
import {
  OffreEmploiFT,
  OffreEmploiFTParams,
} from "@youmeet/types/api/OffreEmploiFT";
import { PayloadBackendError, withData } from "@youmeet/types/api/backend";
import { isPayloadError } from "@youmeet/types/TypeGuards";
import { BackendError } from "@youmeet/utils/BackendErrorClass";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

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

export default async function Offres(request: {
  params: any;
  searchParams: any;
}) {
  // const offers = (await getOffers<Offer[]>({
  //   params: { take: 50 },
  // })) as Offer[];

  const reqSearch = request.searchParams;

  const body = {
    type: reqSearch.type ?? "search",
    id: reqSearch.id,
  };
  delete reqSearch.type;
  delete reqSearch.id;
  const searchParams: OffreEmploiFTParams = {
    ...reqSearch,
    range: reqSearch.range ?? "0-10",
  };

  try {
    if ((body.type === "id" && body.id) || Object.keys(reqSearch).length > 0) {
      const result = (await getOffresEmploiFT<{ resultats: OffreEmploiFT[] }>(
        body,
        searchParams
      )) as withData<{ resultats: OffreEmploiFT[] }> | PayloadBackendError;

      if (result && isPayloadError(result)) {
        throw new BackendError(result.type, result.message);
      } else {
        const data = result.data.resultats;
        const offres = data.length > 0 ? data : [];
        return <OffresChild offres={offres} />;
      }
    } else {
      return <OffresChild offres={[]} />;
    }
  } catch (error) {
    notFound();
  }
}
