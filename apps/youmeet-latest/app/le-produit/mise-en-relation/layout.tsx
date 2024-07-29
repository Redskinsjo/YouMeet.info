import GoogleTagAndHotjarComponent from "@youmeet/components/GoogleTagAndHotjarComponent";
import Script from "next/script";
import { ReactNode } from "react";
import { Metadata } from "next";
import { logoUrl } from "@youmeet/functions/imports";

export const metadata: Metadata = {
  title: `YouMeet - Mise En Relation`,
  description:
    "Découvrez les fonctionnalités de notre plateforme de recrutement, facilitant la mise en relation optimale entre candidats et recruteurs. Explorez comment nous innovons pour rendre le processus de recrutement plus efficace et transparent.",
  keywords: [
    "plateforme",
    "détails concurrentiels",
    "explications sur le service",
    "utilisation",
    "avantages",
    "informations",
  ],
  openGraph: {
    title: `YouMeet - Mise En Relation`,
    images: [logoUrl],
    url: `le-produit`,
    type: "website",
    description:
      "Découvrez les fonctionnalités de notre plateforme de recrutement, facilitant la mise en relation optimale entre candidats et recruteurs. Explorez comment nous innovons pour rendre le processus de recrutement plus efficace et transparent.",
  },
  category: "Gratuit",
  creator: "Jonathan Carnos",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <link rel="preconnect" href="https://vitals.vercel-insights.com/" />
      <link rel="preconnect" href="https://region1.google-analytics.com/" />
      <link rel="preconnect" href="https://www.googletagmanager.com/" />
      <link
        rel="canonical"
        href="https://www.youmeet.info/le-produit/mise-en-relation"
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
            "@context": "http://schema.org",
            "@type": "WebPage",
            name: "Solution Complète de Visibilité pour les Candidats",
            description:
              "Optimisez vos candidatures avec notre application de visibilité pour candidats. Découvrez ses fonctionnalités et avantages.",
            url: "https://www.youmeet.info/le-produit/mise-en-relation",
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
