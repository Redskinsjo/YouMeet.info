import { ReactElement } from "react";
import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { getOffer } from "@youmeet/functions/request";
import { Offer, Translated } from "@youmeet/gql/generated";

export default async function Layout({
  children,
  params,
}: {
  children: ReactElement;
  params: { offre: string };
}) {
  const offre = (await getOffer<Offer>({
    slug: decodeURIComponent(params.offre),
  })) as Offer;
  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link
        rel="canonical"
        href={`https://www.youmeet.info/offres/${offre?.slug}`}
      />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      ></meta>
      <GoogleTagAndHotjarComponent />
      <Script
        id="ld-json"
        strategy="afterInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title:
              offre?.job &&
              offre?.job.title &&
              offre.company?.name &&
              offre.location
                ? `${(offre?.job?.title as Translated)["fr"]} chez ${
                    offre?.company?.name
                  } à ${offre?.location}`
                : "",
            description: offre?.content,
            url: `https://www.youmeet.info/offres/${offre?.slug}`,
            datePosted: offre?.createdAt,
            validThrough: offre?.limitDate,
            employmentType: offre?.contractType,
            hiringOrganization: {
              "@type": "Organization",
              name: offre?.company?.name,
              sameAs: "https://www.youmeet.info",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                // streetAddress: "Adresse de l'Entreprise",
                addressLocality: offre?.location,
                // postalCode: "Code Postal",
                // addressCountry: "Pays",
              },
            },
            qualifications: offre?.requirements?.map((req) => req?.title),
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "EUR",
              value: {
                "@type": "QuantitativeValue",
                minValue: offre?.revenue,
              },
            },
            identifier: offre?.id,
          }),
        }}
        key="product-jsonld"
      />

      {children}
    </div>
  );
}
