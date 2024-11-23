import OffresChild from "./offresChild";
import { getOffers } from "@youmeet/functions/request";
import { Offer, OfferInput, PageParamsInput } from "@youmeet/gql/generated";
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
import { SuggestedMeetsType } from "@youmeet/types/SuggestedMeetsType";

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
  searchParams?: Promise<{ [key: string]: string }>;
}) {
  const prms = await searchParams;
  if (!prms) return notFound();
  const getIfExist = (oneParam: string) => (oneParam ? oneParam : "");
  const getSkip = (skip: string) => {
    if (!skip || Number.isNaN(skip)) return 0;
    else return parseInt(skip) * 5;
  };
  const getDepartments = (l: string) => {
    if (l) {
      return l.split(",");
    } else return [];
  };
  const search = getIfExist(prms.s);
  const skipAll = getSkip(prms["all-skip"]);
  const skipInParis = getSkip(prms["in-paris-skip"]);
  const skipInMarseille = getSkip(prms["in-marseille-skip"]);
  const skipInLyon = getSkip(prms["in-lyon-skip"]);
  const skipInBordeaux = getSkip(prms["in-bordeaux-skip"]);
  const departments = getDepartments(prms.l);

  type Filter = { data: OfferInput; params: PageParamsInput };

  const get = async (params: Filter) => await getOffers(params);

  const filter = async (type: SuggestedMeetsType) => {
    let params = {} as Filter;

    const t = type;

    const buildPrms = (
      codes: string[],
      search: string | undefined,
      skip: number
    ) => {
      const result = {
        params: { take: 5, skip: skip },
      } as Filter;
      if (search) result.params = { ...result.params, search };
      if (codes.length > 0)
        result.data = { ...result.data, lieuTravail: { codePostal: codes } };

      return result;
    };

    if (t === "all") {
      let deps = [] as string[];
      if (departments.length > 0) deps = departments;
      params = buildPrms(deps, search, skipAll);
    }
    if (t === "in-paris") params = buildPrms(["75"], undefined, skipInParis);
    if (t === "in-marseille")
      params = buildPrms(["13"], undefined, skipInMarseille);
    if (t === "in-lyon") params = buildPrms(["69"], undefined, skipInLyon);
    if (t === "in-bordeaux")
      params = buildPrms(["33"], undefined, skipInBordeaux);
    return await get(params);
  };
  try {
    const offers = (await filter("all")) as Offer[];
    const offersInParis = (await filter("in-paris")) as Offer[];
    const offersInMarseille = (await filter("in-marseille")) as Offer[];
    const offersInLyon = (await filter("in-lyon")) as Offer[];
    const offersInBordeaux = (await filter("in-bordeaux")) as Offer[];

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
