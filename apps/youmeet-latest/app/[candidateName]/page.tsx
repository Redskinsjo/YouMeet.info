import { BetaUser, Reference, Video } from "@youmeet/gql/generated";
import { uri } from "@youmeet/functions/imports";
import CandidateChild from "./candidateChild";
import { setName } from "@youmeet/utils/setName";
import { getPrincipalVideo } from "@youmeet/utils/getPrincipalVideo";
import { Metadata, ResolvingMetadata } from "next";
import {
  getMyReferences,
  getUser,
  getUserMetadata,
  getUsersParams,
} from "@youmeet/functions/request";
import React from "react";
import { notFound } from "next/navigation";

type Props = {
  params: { candidateName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const users = (await getUsersParams<BetaUser[]>({
    data: {
      user: true,
      isScrapped: false,
      isVideo: true,
    },
  })) as BetaUser[];

  return users?.map((user: BetaUser) => ({ candidateName: user.uniqueName }));
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uniqueName = decodeURIComponent(params.candidateName);

  const user = (await getUserMetadata<BetaUser>({ uniqueName })) as BetaUser;

  const name = setName(user);
  if (name) {
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const previousVideos = (await parent).openGraph?.videos || [];

    let ogImages: any[] = [];
    const avatar =
      user?.candidate?.avatars &&
      user?.candidate?.avatars[0] &&
      user.candidate.avatars[0]?.secure_url
        ? user.candidate.avatars[0]?.secure_url
        : undefined;
    if (avatar) ogImages.push(avatar);
    ogImages = [...ogImages, ...previousImages];

    let ogVideos: any[] = [];
    const video = user?.videos
      ? getPrincipalVideo(user?.videos as Video[])?.file?.secure_url
      : undefined;
    if (video) ogVideos.push(video);
    ogVideos = [...ogVideos, ...previousVideos];

    return {
      title: `YouMeet - ${name}`,
      description:
        "Découvrez le profil du candidat, visionnez sa vidéo de présentation, consultez ses références professionnelles et académiques, et notifiez-le d'une proposition d'entretien sur notre plateforme de recrutement.",
      openGraph: {
        url: `${uri}/${uniqueName}`,
        title: `YouMeet - ${name}`,
        images: ogImages,
        type: "video.other",
        locale: "fr_FR",
        videos: ogVideos,
        description:
          "Découvrez le profil du candidat, visionnez sa vidéo de présentation, consultez ses références professionnelles et académiques, et notifiez-le d'une proposition d'entretien sur notre plateforme de recrutement.",
      },
      keywords: [
        user?.firstname as string,
        user?.lastname as string,
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
  params: { candidateName: string };
}) {
  const user = (await getUser(
    {
      uniqueName: decodeURIComponent(params.candidateName),
    },
    10
  )) as BetaUser;
  const users = (await getUsersParams<BetaUser[]>(
    {
      data: {
        user: true,
        isScrapped: false,
        isPublic: true,
        isVideo: true,
      },
    },
    0
  )) as BetaUser[];

  const principalVideo = getPrincipalVideo(
    user?.videos?.filter((d) => d) as Video[]
  );

  if (user && principalVideo) {
    const references = (await getMyReferences<Reference[]>({
      userId: user.id,
    })) as Reference[];
    return (
      <CandidateChild profil={user} users={users} references={references} />
    );
  }
  return notFound();
}
