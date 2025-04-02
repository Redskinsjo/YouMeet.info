import GoogleTagAndHotjarComponent from "@youmeet/ui/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { Metadata } from "next";
import { logoUrl, NAME, uri } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - Biographies`,
  description:
    "Écoutez les histoires passionantes de nos talents en vidéo et profitez d'un format innovant pour découvrir votre potentiel collaborateur.",
  keywords: [
    "biographies",
    "articles",
    "informations",
    "renseignements",
    "suivi",
  ],
  openGraph: {
    title: `YouMeet - biographies`,
    images: [logoUrl],
    url: `${uri}/biographies`,
    type: "website",
    description:
      "Écoutez les histoires passionantes de nos talents en vidéo et profitez d'un format innovant pour découvrir votre potentiel collaborateur.",
  },
  category: "Abonnements",
  creator: NAME,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1">
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link rel="canonical" href={`${uri}/biographies`} />
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
            "@context": "http://schema.org",
            "@type": "WebPage",
            name: "Articles d'informations sur l'écosystème du recrutement selon YouMeet et pour les entreprises",
            description:
              "Écoutez les histoires passionantes de nos talents en vidéo et profitez d'un format innovant pour découvrir votre potentiel collaborateur.",
            url: `${uri}/biographies`,
            image: logoUrl,
            brand: {
              "@type": "Brand",
              name: "YouMeet",
            },
          }),
        }}
        key="product-jsonld"
      />
      {children}
    </div>
  );
}
