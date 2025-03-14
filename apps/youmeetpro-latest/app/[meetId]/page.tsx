import { Meet, MeetCandidate } from "@youmeet/gql/generated";
import { githubUrl, linkedinUrl, NAME, uri } from "@youmeet/functions/imports";
import MeetChild from "./meetChild";
import { setName } from "@youmeet/utils/basics/setName";
import { Metadata, ResolvingMetadata } from "next";
import { getMeetsParams, getOneMeet } from "@youmeet/functions/request";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ meetId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const meets = (await getMeetsParams<Meet[]>({
    data: {
      expired: false,
    },
  })) as Meet[];

  return meets?.map((meet: Meet) => ({ meetId: meet.id as string }));
}

export const maxDuration = 60;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const prms = await params;
  const id = decodeURIComponent(prms.meetId);
  const meet = (await getOneMeet<Meet>({ id })) as Meet;

  const name = setName(meet.meetCandidate as MeetCandidate);
  if (name) {
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const previousVideos = (await parent).openGraph?.videos || [];

    return {
      title: `YouMeet - ${name}`,
      robots: "noindex,nofollow",
      description:
        "Découvrez le profil du candidat, visionnez sa vidéo de présentation, consultez ses références professionnelles et académiques, et notifiez-le d'une proposition d'entretien sur notre plateforme de recrutement.",
      openGraph: {
        url: `${uri}/${meet.id}`,
        title: `YouMeet - ${name}`,
        images: previousImages,
        type: "video.other",
        locale: "fr_FR",
        videos: previousVideos,
        description:
          "Découvrez le profil du candidat, visionnez sa vidéo de présentation, consultez ses références professionnelles et académiques, et notifiez-le d'une proposition d'entretien sur notre plateforme de recrutement.",
      },
      keywords: [
        meet?.meetCandidate?.firstname as string,
        meet?.meetCandidate?.lastname as string,
        "cv vidéo",
        "présentation",
        "profil public",
      ],
      authors: [
        { name: NAME, url: githubUrl },
        {
          name: NAME,
          url: linkedinUrl,
        },
      ],
      category: "Profil public",
      creator: NAME,
    };
  }

  return {
    title: `YouMeet - Voici quelqu'un qui va peut-être travailler avec vous`,
    description:
      "Découvrez le profil du candidat, visionnez sa vidéo de présentation, consultez ses références professionnelles et académiques, et notifiez-le d'une proposition d'entretien sur notre plateforme de recrutement.",
    openGraph: {
      title: `YouMeet - Voici quelqu'un qui va peut-être travailler avec vous`,
      type: "video.other",
      locale: "fr_FR",
      description:
        "Découvrez le profil du candidat, visionnez sa vidéo de présentation, consultez ses références professionnelles et académiques, et notifiez-le d'une proposition d'entretien sur notre plateforme de recrutement.",
    },
    authors: [
      { name: NAME, url: githubUrl },
      {
        name: NAME,
        url: linkedinUrl,
      },
    ],

    category: "Profil public",
    creator: NAME,
  };
}

export default async function Profil({
  params,
}: {
  params: Promise<{ meetId: string }>;
}) {
  const prms = await params;
  const id = decodeURIComponent(prms.meetId);
  const meet = (await getOneMeet({
    id,
  })) as Meet;

  if (meet) return <MeetChild meet={meet} />;
  return notFound();
}
