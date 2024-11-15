import {
  getOffer,
  getOfferMetadata,
  getOffers,
  getOffersParams,
} from "@youmeet/functions/request";
import { Metadata, ResolvingMetadata } from "next";
import { Offer } from "@youmeet/gql/generated";
import { logoUrl, uri } from "@youmeet/functions/imports";
import OfferChild from "@youmeet/ui/offres/offerChild";
import {
  formatForDb,
  inFormatForDb,
} from "@youmeet/utils/resolvers/formatCompetencyTitle";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ offre: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const offers = (await getOffersParams<Offer[]>()) as Offer[];
  return offers?.map((offer: Offer) => ({ offre: offer.slug }));
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const prms = await params;
  const offre = (await getOfferMetadata({
    slug: decodeURIComponent(prms.offre),
  })) as Offer;

  if (offre) {
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    const jobTitle = offre?.job?.title?.fr || "Nouvelle offre";
    const companyName = offre?.company?.name || "";

    return {
      title: `YouMeet - ${jobTitle} - ${companyName}`,
      description:
        "Découvrez les détails de cette offre d'emploi, y compris les qualifications requises, les responsabilités, et les informations sur l'entreprise. Candidatez dès maintenant sur notre plateforme de recrutement.",
      openGraph: {
        url: `${uri}/offres/${offre?.slug}`,
        title: `YouMeet - ${jobTitle} - ${companyName}`,
        images: [...previousImages, logoUrl],
        type: "video.other",
        description:
          "Découvrez les détails de cette offre d'emploi, y compris les qualifications requises, les responsabilités, et les informations sur l'entreprise. Candidatez dès maintenant sur notre plateforme de recrutement.",
      },
      keywords: [
        jobTitle,
        "offre d'emploi",
        "candidate CV vidéo",
        offre?.contractType as string,
        offre?.location as string,
        String(offre?.revenue),
        ...(offre?.requirements?.map((re) => re?.title) as string[]),
      ],
      authors: [
        { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
        {
          name: "Jonathan Carnos",
          url: "https://www.linkedin.com/in/jonathancarnos123/",
        },
      ],
      category: "Profil public",
      creator: "Jonathan Carnos",
    };
  }
  let title = decodeURIComponent(inFormatForDb(prms.offre).split(" ")[0]);
  title = formatForDb(title);
  return {
    title: `YouMeet - ${title}`,
    description:
      "Découvrez les détails de cette offre d'emploi, y compris les qualifications requises, les responsabilités, et les informations sur l'entreprise. Candidatez dès maintenant sur notre plateforme de recrutement.",
    openGraph: {
      url: `${uri}/offres/${decodeURIComponent(prms.offre)}`,
      title: `YouMeet - ${title}`,
      images: [logoUrl],
      type: "video.other",
      description:
        "Découvrez les détails de cette offre d'emploi, y compris les qualifications requises, les responsabilités, et les informations sur l'entreprise. Candidatez dès maintenant sur notre plateforme de recrutement.",
    },
    keywords: [title, "offre d'emploi", "candidate CV vidéo"],
    authors: [
      { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
      {
        name: "Jonathan Carnos",
        url: "https://www.linkedin.com/in/jonathancarnos123/",
      },
    ],
    category: "Profil public",
    creator: "Jonathan Carnos",
  };
}

export default async function OfferComponent({
  params,
}: {
  params: Promise<{ offre: string }>;
}) {
  const prms = await params;
  const offer = (await getOffer({
    slug: decodeURIComponent(prms.offre),
  })) as Offer;

  let offers = [] as Offer[];
  if (offer) {
    offers = (await getOffers<Offer[]>({
      data: {
        title:
          offer.job?.title && offer.job?.title.fr ? offer.job?.title.fr : "",
        language: "fr",
      },
    })) as Offer[];
  }

  if (offer) return <OfferChild offre={offer} />;
  return notFound();
}
