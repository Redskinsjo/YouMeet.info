import { ReactElement } from "react";
import { logoUrl, uri } from "@youmeet/functions/imports";
import { formatForUrl } from "@youmeet/utils/resolvers/formatCompetencyTitle";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { getCompetency } from "@youmeet/functions/request";
import { Competency } from "@youmeet/gql/generated";

export default async function Layout({
  children,
  params,
}: {
  children: ReactElement;
  params: Promise<{ competence: string }>;
}) {
  const prms = await params;
  const competency = (await getCompetency<Competency>({
    slug: decodeURIComponent(prms.competence),
  })) as Competency;
  if (competency?.title) {
    const title = competency?.title
      ? competency?.title[0].toUpperCase() + competency?.title.slice(1)
      : "";
    return (
      <div className="dark:mediumDarkBg mediumBg">
        <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
        <link rel="preconnect" href="https://region1.google-analytics.com/" />
        <link rel="preconnect" href="https://www.googletagmanager.com/" />
        <link
          rel="canonical"
          href={`${uri}/competences/${formatForUrl(title as string)}`}
        />
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
              "@context": "http://schema.org",
              "@type": "Skill",
              name: `${competency?.title}`,
              sameAs: (competency?.relatedSkills as string[])?.map(
                (sk) => `${uri}/competences/${formatForUrl(sk as string)}`
              ),
              skills: (competency?.relatedSkills as string[])?.map((sk) => ({
                "@type": "Skill",
                name: sk,
              })),
              image: logoUrl,
              comment: competency?.development,
              inLanguage: "fr-FR",
              keywords: competency?.keywords,
              description: `${competency?.definition}`,
              url: `${uri}/competences/${competency?.slug}`,
              author: {
                "@type": "Organization",
                name: "YouMeet",
              },
              potentialAction: [
                {
                  "@type": "Action",
                  name: `Voir les Détails et Explications concernant la compétence de ${competency?.title}`,
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${uri}/competences/${competency?.slug}`,
                  },
                },
                {
                  "@type": "Action",
                  name: "Développer cette compétence",
                },
              ],
            }),
          }}
          key="product-jsonld"
        />

        {children}
      </div>
    );
  }
  return <div>{children}</div>;
}
