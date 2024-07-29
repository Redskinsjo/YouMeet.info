import { logoUrl, uri } from "@youmeet/functions/imports";
import { Metadata, ResolvingMetadata } from "next";
import Custom404 from "@/app/not-found";
import {
  getArticle,
  getArticleMetadata,
  getArticles,
  getArticlesParams,
} from "@youmeet/functions/request";
import MediaChild from "./mediaChild";
import {
  formatForDb,
  inFormatForDb,
} from "@youmeet/utils/resolvers/formatGptCompetencyTitle";
import { Article } from "@youmeet/gql/generated";

type Props = {
  params: { media: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const articles = (await getArticlesParams<Article[]>()) as Article[];
  return articles?.map((article) => {
    return {
      media: article.slug,
    };
  });
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const article = (await getArticleMetadata({
    slug: decodeURIComponent(params.media),
  })) as Article;

  if (article?.title?.fr) {
    const title = article.title.fr;
    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    const ogImages = [...previousImages, logoUrl];

    return {
      title: `YouMeet - ${title}`,
      description:
        "Découvrez ce nouvel article, informez-vous des dernières actualités dans le recrutement pour être toujours le premier sur les nouvelles tendances.",
      openGraph: {
        url: `${uri}/medias/${decodeURIComponent(params.media)}`,
        title: `YouMeet - ${title}`,
        images: ogImages,
        type: "article",
        description:
          "Découvrez ce nouvel article, informez-vous des dernières actualités dans le recrutement pour être toujours le premier sur les nouvelles tendances.",
      },
      keywords: [
        title as string,
        "article à caractère informatif",
        "CV vidéo",
        "compétences",
        "connaissances",
      ],
      authors: [
        { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
        {
          name: "Jonathan Carnos",
          url: "https://www.linkedin.com/in/jonathancarnos123/",
        },
      ],
      category: "Article à caractère informatif",
      creator: "Jonathan Carnos",
    };
  }
  let media = decodeURIComponent(inFormatForDb(params.media).split(" ")[0]);
  media = formatForDb(media);
  return {
    title: `YouMeet - ${media}`,
    description: `Découvrez ce nouvel article sr ${media}, informez-vous des dernières actualités dans le recrutement pour être toujours le premier sur les nouvelles tendances.`,
    openGraph: {
      title: `YouMeet - ${media}`,
      type: "article",
      description: `Découvrez ce nouvel article sur ${media}, informez-vous des dernières actualités dans le recrutement pour être toujours le premier sur les nouvelles tendances.`,
    },
    keywords: [
      "nouvel article",
      media,
      "article à caractère informatif",
      "CV vidéo",
      "compétences",
      "connaissances",
    ],
    authors: [
      { name: "Jonathan Carnos", url: "https://github.com/Redskinsjo" },
      {
        name: "Jonathan Carnos",
        url: "https://www.linkedin.com/in/jonathancarnos123/",
      },
    ],
    category: "Article à caractère informatif",
    creator: "Jonathan Carnos",
  };
}

export default async function Page({ params }: { params: { media: string } }) {
  const media = (await getArticle<Article>({
    slug: decodeURIComponent(params.media),
  })) as Article;
  const articles = (await getArticles<Article[]>()) as Article[];

  if (media) return <MediaChild media={media} articles={articles} />;
  return <Custom404 />;
}
