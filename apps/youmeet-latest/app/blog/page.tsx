import { Metadata } from "next";
import BlogChild from "./blogChild";
import {
  githubUrl,
  linkedinUrl,
  logoUrl,
  NAME,
  uri,
} from "@youmeet/functions/imports";
import { getArticles } from "@youmeet/functions/request";
import { Article } from "@youmeet/gql/generated";

export const metadata: Metadata = {
  title: "YouMeet - Blog",
  description:
    "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
  openGraph: {
    title: "YouMeet - Blog",
    url: `${uri}/blog`,
    images: [logoUrl],
    type: "article",
    description:
      "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
  },
  keywords: ["blog", "cv vidéo", "compétences", "informations", "profil"],
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
  const articles = (await getArticles<Article[]>()) as Article[];
  return <BlogChild articles={articles} />;
}
