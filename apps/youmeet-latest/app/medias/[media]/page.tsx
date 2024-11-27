import { logoUrl, uri } from "@youmeet/functions/imports";
import { Metadata, ResolvingMetadata } from "next";
import {
  getArticle,
  getArticleMetadata,
  getArticles,
  getArticlesParams,
} from "@youmeet/functions/request";
import MediaChild from "@youmeet/ui/mediaComponents/mediaChild";
import { formatForDb } from "@youmeet/utils/resolvers/formatCompetencyTitle";
import { Article } from "@youmeet/gql/generated";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ media: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
  const prms = await params;
  const decoded = decodeURIComponent(prms.media);
  if (!decoded) return {};
  const media = formatForDb(decoded);
  const article = (await getArticleMetadata({
    slug: decoded,
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
        url: `${uri}/medias/${decoded}`,
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

export default async function Page({
  params,
}: {
  params: Promise<{ media: string }>;
}) {
  const prms = await params;
  const media = (await getArticle<Article>({
    slug: decodeURIComponent(prms.media),
  })) as Article;
  const articles = (await getArticles<Article[]>()) as Article[];

  if (media) return <MediaChild media={media} articles={articles} />;
  return notFound();
}
