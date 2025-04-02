import { Metadata } from "next";
import BlogChild from "./blogChild";
import {
  githubUrl,
  linkedinUrl,
  logoUrl,
  NAME,
  uri,
} from "@youmeet/functions/imports";
import { getVideos } from "@youmeet/functions/request";
import { Article, Video } from "@youmeet/gql/generated";

export const metadata: Metadata = {
  title: "YouMeet - Biographies",
  description:
    "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
  openGraph: {
    title: "YouMeet - Biographies",
    url: `${uri}/biographies`,
    images: [logoUrl],
    type: "article",
    description:
      "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
  },
  keywords: [
    "biographies",
    "cv vidéo",
    "compétences",
    "informations",
    "profil",
  ],
  authors: [
    { name: NAME, url: githubUrl },
    {
      name: NAME,
      url: linkedinUrl,
    },
  ],
  category: "Articles d'informations",
  creator: NAME,
};

export default async function Blog() {
  const videos = (await getVideos<Video[]>()) as Video[];
  const display = Object.values(
    videos
      .filter((video) => video && video.id)
      .reduce((acc: any, curr: any) => {
        if (!acc[curr.id]) {
          acc[curr.id] = curr;
        }
        return acc;
      }, {})
  ) as Video[];
  return <BlogChild videos={display} />;
}
