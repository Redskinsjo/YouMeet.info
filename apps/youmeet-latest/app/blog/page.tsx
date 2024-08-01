import { Metadata } from "next";
import BlogChild from "./blogChild";
import { logoUrl } from "@youmeet/functions/imports";
import { getArticles } from "@youmeet/functions/request";
import { Article } from "@youmeet/gql/generated";

export const metadata: Metadata = {
  title: "YouMeet - Blog",
  description:
    "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
  openGraph: {
    title: "YouMeet - Blog",
    url: "https://www.youmeet.info/blog",
    images: [logoUrl],
    type: "article",
    description:
      "Découvrez des articles exclusives et modernes sur l'évolution du recrutement par vidéo et IA dans différents secteurs d'activité.",
  },
  keywords: ["blog", "cv vidéo", "compétences", "informations", "profil"],
  authors: [
    { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
    {
      name: "Jonathan Carnos",
      url: "https://www.linkedin.com/in/jonathancarnos123/",
    },
  ],
  category: "Articles d'informations",
  creator: "Jonathan Carnos",
};

export default async function Blog() {
  const articles = (await getArticles<Article[]>()) as Article[];
  return <BlogChild articles={articles} />;
}
