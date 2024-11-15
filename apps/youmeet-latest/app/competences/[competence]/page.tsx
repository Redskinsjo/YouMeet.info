import { logoUrl, uri } from "@youmeet/functions/imports";
import {
  formatForDb,
  inFormatForDb,
} from "@youmeet/utils/resolvers/formatCompetencyTitle";
import { Metadata, ResolvingMetadata } from "next";
import CompetencyChild from "./competencyChild";
import {
  getCompetenciesParams,
  getCompetency,
  getCompetencyMetadata,
} from "@youmeet/functions/request";
import { Competency } from "@youmeet/gql/generated";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ competence: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const competencies = (await getCompetenciesParams<
    Competency[]
  >()) as Competency[];
  return competencies?.map((competency) => {
    return {
      competence: competency.slug,
    };
  });
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const prms = await params;
  const competency = (await getCompetencyMetadata({
    slug: decodeURIComponent(prms.competence),
  })) as Competency;

  const title = competency?.title;

  if (title) {
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    const ogImages = [...previousImages, logoUrl];

    return {
      title: `YouMeet - ${title}`,
      description: `Découvrez notre expertise en ${title}. Obtenez des informations détaillées, des exemples concrets et des ressources pour approfondir vos connaissances dans le domaine de ${title}.`,
      openGraph: {
        url: `${uri}/competences/${prms.competence}`,
        title: `YouMeet - ${title}`,
        images: ogImages,
        type: "article",
        description: `Découvrez notre expertise en ${title}. Obtenez des informations détaillées, des exemples concrets et des ressources pour approfondir vos connaissances dans le domaine de ${title}.`,
      },
      keywords: [
        title as string,
        "cv vidéo",
        "compétences",
        "informations",
        "profil",
      ],
      authors: [
        { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
        {
          name: "Jonathan Carnos",
          url: "https://www.linkedin.com/in/jonathancarnos123/",
        },
      ],

      category: "Article élogieux sur une compétence",
      creator: "Jonathan Carnos",
    };
  }
  let competence = decodeURIComponent(
    inFormatForDb(prms.competence).split(" ")[0]
  );
  competence = formatForDb(competence);
  return {
    title: `YouMeet - Voici une compétence que vous allez maitriser`,
    description: `Découvrez la définition de ${competence} Obtenez des informations détaillées, des exemples concrets et des ressources pour approfondir vos connaissances dans le domaine de ${competence}.`,
    openGraph: {
      url: `${uri}/competences/${decodeURIComponent(prms.competence)}`,
      title: `YouMeet - Voici une compétence que vous allez maitriser`,
      type: "article",
      description: `Découvrez la définition de ${competence} Obtenez des informations détaillées, des exemples concrets et des ressources pour approfondir vos connaissances dans le domaine de ${competence}.`,
    },
    keywords: [
      competence as string,
      "cv vidéo",
      "compétences",
      "informations",
      "profil",
    ],
    authors: [
      { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
      {
        name: "Jonathan Carnos",
        url: "https://www.linkedin.com/in/jonathancarnos123/",
      },
    ],
    category: "Article élogieux sur une compétence",
    creator: "Jonathan Carnos",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ competence: string }>;
}) {
  const competency = (await getCompetency({
    slug: decodeURIComponent((await params).competence),
  })) as Competency;

  if (competency) return <CompetencyChild competency={competency} />;
  return notFound();
}
