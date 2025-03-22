import { BetaUser, Reference, Video } from "@youmeet/gql/generated";
import { githubUrl, linkedinUrl, NAME, uri } from "@youmeet/functions/imports";
import CandidateChild from "@youmeet/ui/candidateProfileComponents/candidateChild";
import { setName } from "@youmeet/utils/basics/setName";
import { getPrincipalVideo } from "@youmeet/utils/basics/getPrincipalVideo";
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
  params: Promise<{ candidateName: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
  const prms = await params;
  const uniqueName = decodeURIComponent(prms.candidateName);

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
        url: `${uri}/on/${uniqueName}`,
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
      url: `${uri}/on/${uniqueName}`,
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
  params: Promise<{ candidateName: string }>;
}) {
  const prms = await params;
  const user = (await getUser(
    {
      uniqueName: decodeURIComponent(prms.candidateName),
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

  if (!!user && !!principalVideo) {
    const references = (await getMyReferences<Reference[]>({
      userId: user.id,
    })) as Reference[];
    return (
      <CandidateChild profil={user} users={users} references={references} />
    );
  }
  return notFound();
}
