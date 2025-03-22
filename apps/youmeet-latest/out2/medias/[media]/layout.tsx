import { getArticle } from "@youmeet/functions/request";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import { Article } from "@youmeet/gql/generated";
import Script from "next/script";
import { ReactNode } from "react";
import { uri } from "@youmeet/functions/imports";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ media: string }>;
}) {
  const prms = await params;
  const article = (await getArticle<Article>({
    slug: decodeURIComponent(prms.media),
  })) as Article;
  return (
    <div className="dark:mediumDarkBg mediumBg">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/medias/${article?.slug}`} />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <GoogleTagAndHotjarComponent />

      <Script
        id="ld-json"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            title: article?.title,
            description:
              "Découvrez ce nouvel article, informez-vous des dernières actualités dans le recrutement pour être toujours le premier sur les nouvelles tendances.",
            url: `${uri}/medias/${article?.slug}`,
            datePosted: article?.createdAt,
            identifier: article?.id,
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
