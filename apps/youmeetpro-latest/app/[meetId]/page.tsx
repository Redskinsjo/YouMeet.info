import { Meet, MeetCandidate, Video } from "@youmeet/gql/generated";
import { uri } from "@youmeet/functions/imports";
import MeetChild from "./meetChild";
import { setName } from "@youmeet/utils/setName";
import { Metadata, ResolvingMetadata } from "next";
import { getMeetsParams, getOneMeet } from "@youmeet/functions/request";
import Custom404 from "@/app/not-found";

type Props = {
  params: { meetId: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
  const id = decodeURIComponent(params.meetId);
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

export default async function Profil({
  params,
}: {
  params: { meetId: string };
}) {
  const id = decodeURIComponent(params.meetId);
  const meet = (await getOneMeet({
    id,
  })) as Meet;

  if (meet) return <MeetChild meet={meet} />;
  return <Custom404 />;
}
